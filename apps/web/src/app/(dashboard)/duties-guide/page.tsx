'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ClipboardList,
  BookOpen,
  Heart,
  Clock,
  Trophy,
  Sparkles,
  AlertCircle,
  Users,
  Search,
  ChevronRight,
  Calendar,
  FileText,
  Lightbulb,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  Star,
  Compass,
  Library,
  Leaf,
  MessageCircle,
  Globe,
  Building2,
  GraduationCap,
  UserCircle,
  Activity,
  AlertTriangle,
  Shield,
  Phone,
  FileCheck,
  Monitor,
  Scale,
  Siren,
  BookMarked,
  ChevronDown,
  Info,
  MapPin,
  Download,
  Link,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  allUltraDetailedDuties,
  getUltraDetailedDutyById,
  searchUltraDetailedDuties,
  ultraDetailedDutiesByCategory,
  ultraDetailedDutiesByDifficulty,
  getMonthlyTasks,
  getAllEmergencyProcedures,
  monthlyCalendar,
} from '@/data/duties-guide-ultra-detailed-all';
import { UltraDetailedDutyGuide, DetailedTask } from '@/data/duties-guide-ultra-detailed';
import { useUserSettings } from '@/hooks/useFirestore';
import { getEducationOfficeById, nationalResources } from '@/data/education-offices';
import { dutyGuideMapping } from '@/data/departments';

// 아이콘 매핑
const iconMap: Record<string, any> = {
  ClipboardList,
  BookOpen,
  Heart,
  Clock,
  Trophy,
  Sparkles,
  AlertCircle,
  Users,
  Calendar,
  FileText,
  Lightbulb,
  HelpCircle,
  Star,
  Compass,
  Library,
  Leaf,
  MessageCircle,
  Globe,
  Building2,
  GraduationCap,
  UserCircle,
  Activity,
  Shield,
  AlertTriangle,
  HeartHandshake: Heart,
  Utensils: Clock,
  HandHeart: Heart,
};

// 색상 매핑
const colorMap: Record<string, string> = {
  blue: 'text-blue-500 bg-blue-50 dark:bg-blue-950',
  purple: 'text-purple-500 bg-purple-50 dark:bg-purple-950',
  pink: 'text-pink-500 bg-pink-50 dark:bg-pink-950',
  orange: 'text-orange-500 bg-orange-50 dark:bg-orange-950',
  green: 'text-green-500 bg-green-50 dark:bg-green-950',
  cyan: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950',
  red: 'text-red-500 bg-red-50 dark:bg-red-950',
  yellow: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950',
  emerald: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950',
  violet: 'text-violet-500 bg-violet-50 dark:bg-violet-950',
  rose: 'text-rose-500 bg-rose-50 dark:bg-rose-950',
  indigo: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950',
  amber: 'text-amber-500 bg-amber-50 dark:bg-amber-950',
  lime: 'text-lime-500 bg-lime-50 dark:bg-lime-950',
  slate: 'text-slate-500 bg-slate-50 dark:bg-slate-950',
  sky: 'text-sky-500 bg-sky-50 dark:bg-sky-950',
  teal: 'text-teal-500 bg-teal-50 dark:bg-teal-950',
};

const difficultyColorMap: Record<number, string> = {
  1: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  2: 'bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-300',
  3: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  4: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  5: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

const difficultyLabels: Record<number, string> = {
  1: '매우 쉬움',
  2: '쉬움',
  3: '보통',
  4: '어려움',
  5: '매우 어려움',
};

const categoryNames: Record<string, string> = {
  core: '핵심 업무',
  support: '지원 업무',
  special: '특별 업무',
  admin: '행정 업무',
  academic: '교과 업무',
  student: '학생 지원',
  class: '학급 업무',
  essential: '필수 업무',
};

const frequencyLabels: Record<string, string> = {
  once: '1회',
  daily: '매일',
  weekly: '매주',
  monthly: '매월',
  quarterly: '분기별',
  biannual: '반기별',
  annual: '연간',
  asNeeded: '수시',
  ongoing: '상시',
};

const taskCategoryColors: Record<string, string> = {
  essential: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  important: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  routine: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  seasonal: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
};

const taskCategoryLabels: Record<string, string> = {
  essential: '필수',
  important: '중요',
  routine: '일상',
  seasonal: '시기별',
};

export default function DutiesGuidePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDuty, setSelectedDuty] = useState<UltraDetailedDutyGuide | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // 사용자 설정에서 교육청 정보와 업무 분장 가져오기
  const { settings } = useUserSettings();
  const selectedOffice = settings?.educationOfficeId
    ? getEducationOfficeById(settings.educationOfficeId)
    : null;

  // 사용자 설정 업무 (roles + customTasks)
  const extSettings = settings as unknown as { roles?: string[]; customTasks?: string[] };
  const userRoles = extSettings?.roles || [];
  const userCustomTasks = extSettings?.customTasks || [];
  const allUserDuties = [...userRoles, ...userCustomTasks];


  // 사용자 업무에 매칭되는 가이드 ID 찾기
  const matchedGuideIds = useMemo(() => {
    if (!allUserDuties || allUserDuties.length === 0) {
      return [];
    }

    const matched: string[] = [];
    Object.entries(dutyGuideMapping).forEach(([guideId, relatedDuties]) => {
      // 정확한 매칭: 사용자 업무가 관련 업무 목록에 정확히 일치하는 경우
      const hasMatch = relatedDuties.some(duty =>
        allUserDuties.some(userDuty => userDuty === duty)
      );
      if (hasMatch) {
        matched.push(guideId);
      }
    });

    return matched;
  }, [allUserDuties]);

  // 업무 가이드가 사용자 설정과 매칭되는지 확인
  const isMatchedDuty = (duty: UltraDetailedDutyGuide) => {
    return matchedGuideIds.includes(duty.id);
  };

  // 필터링 및 정렬된 업무 목록 (사용자 설정 업무 우선)
  const filteredDuties = useMemo(() => {
    let duties = allUltraDetailedDuties;

    if (selectedCategory !== 'all') {
      duties = duties.filter(d => d.category === selectedCategory);
    }

    if (searchQuery) {
      duties = searchUltraDetailedDuties(searchQuery).filter(d =>
        selectedCategory === 'all' || d.category === selectedCategory
      );
    }

    // 사용자 설정 업무가 있으면 매칭되는 업무 우선 정렬
    if (allUserDuties.length > 0) {
      duties = [...duties].sort((a, b) => {
        const aMatched = isMatchedDuty(a);
        const bMatched = isMatchedDuty(b);
        if (aMatched && !bMatched) return -1;
        if (!aMatched && bMatched) return 1;
        return 0;
      });
    }

    return duties;
  }, [searchQuery, selectedCategory, allUserDuties, matchedGuideIds]);

  // 업무 상세 보기
  const openDutyDetail = (duty: UltraDetailedDutyGuide) => {
    setSelectedDuty(duty);
    setSelectedTaskId(null);
    setIsDialogOpen(true);
  };

  // 카테고리별 업무 수
  const categoryCounts = useMemo(() => {
    return {
      all: allUltraDetailedDuties.length,
      core: allUltraDetailedDuties.filter(d => d.category === 'core').length,
      support: allUltraDetailedDuties.filter(d => d.category === 'support').length,
      special: allUltraDetailedDuties.filter(d => d.category === 'special').length,
      admin: allUltraDetailedDuties.filter(d => d.category === 'admin').length,
    };
  }, []);

  // 현재 월 가져오기
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📚 초등교사 업무분장 초상세 가이드</h1>
        <p className="text-muted-foreground">
          16개 업무 영역의 완전 가이드 - 처음 맡는 업무도 완벽하게 수행!
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">100+ 사이트 교차검증</Badge>
          <Badge variant="secondary">단계별 절차</Badge>
          <Badge variant="secondary">나이스 메뉴 경로</Badge>
          <Badge variant="secondary">긴급상황 대응</Badge>
          <Badge variant="secondary">법적 근거</Badge>
          {selectedOffice && (
            <Badge variant="default" className="flex items-center gap-1 bg-blue-600">
              <MapPin className="h-3 w-3" />
              {selectedOffice.shortName}
            </Badge>
          )}
        </div>
      </div>

      {/* 교육청별 업무 매뉴얼 섹션 */}
      {selectedOffice && selectedOffice.manuals.length > 0 && (
        <Card className="mb-6 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                {selectedOffice.name} 업무 매뉴얼
              </CardTitle>
              <Button variant="outline" size="sm" asChild>
                <a href={selectedOffice.homepage} target="_blank" rel="noopener noreferrer">
                  교육청 홈페이지 <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
            <CardDescription>
              선생님의 교육청에서 제공하는 공식 업무 매뉴얼입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {selectedOffice.manuals.slice(0, 6).map((manual, idx) => (
                <a
                  key={idx}
                  href={manual.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 hover:border-blue-300 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                    <Download className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-blue-600 transition-colors line-clamp-2">
                      {manual.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {manual.year}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {manual.category}
                      </Badge>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            {selectedOffice.manuals.length > 6 && (
              <div className="text-center mt-3">
                <Button variant="ghost" size="sm" asChild>
                  <a href={selectedOffice.links.main} target="_blank" rel="noopener noreferrer">
                    +{selectedOffice.manuals.length - 6}개 더 보기
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                </Button>
              </div>
            )}

            {/* 교육청 연락처 */}
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                업무 관련 문의
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">대표:</span>
                  <a href={`tel:${selectedOffice.phone}`} className="text-blue-600 hover:underline">
                    {selectedOffice.phone}
                  </a>
                </div>
                {selectedOffice.emergencyContacts.slice(0, 3).map((contact, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-muted-foreground">{contact.name}:</span>
                    <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 교육청 미선택 안내 */}
      {!selectedOffice && (
        <Card className="mb-6 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-muted rounded-full">
                <MapPin className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">교육청을 선택하면 맞춤 매뉴얼을 확인할 수 있습니다</h3>
                <p className="text-sm text-muted-foreground">
                  설정에서 소속 시도교육청을 선택하시면, 해당 교육청의 공식 업무 매뉴얼과 연락처를 바로 확인할 수 있습니다.
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href="/settings">설정 바로가기</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 이번 달 주요 업무 알림 */}
      <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">{currentMonth}월 주요 업무</h3>
              <div className="flex flex-wrap gap-2">
                {monthlyCalendar[currentMonth as keyof typeof monthlyCalendar]?.map((task, idx) => (
                  <Badge key={idx} variant="outline">{task}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 검색 및 필터 */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="업무 검색... (예: 학교폭력, 생기부, 체육대회, 나이스)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 ({categoryCounts.all})</SelectItem>
                <SelectItem value="core">핵심 업무 ({categoryCounts.core})</SelectItem>
                <SelectItem value="support">지원 업무 ({categoryCounts.support})</SelectItem>
                <SelectItem value="special">특별 업무 ({categoryCounts.special})</SelectItem>
                <SelectItem value="admin">행정 업무 ({categoryCounts.admin})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* 카테고리 탭 */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="core">핵심</TabsTrigger>
          <TabsTrigger value="support">지원</TabsTrigger>
          <TabsTrigger value="special">특별</TabsTrigger>
          <TabsTrigger value="admin">행정</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 나의 업무 안내 */}
      {allUserDuties.length > 0 && matchedGuideIds.length > 0 && (
        <Card className="mb-4 border-primary/50 bg-primary/5">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">설정된 업무 기준으로 관련 가이드가 우선 표시됩니다</p>
                <p className="text-xs text-muted-foreground">
                  설정 → 업무 분장에서 담당 업무를 추가/변경할 수 있습니다
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 업무 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDuties.map((duty) => {
          const IconComponent = iconMap[duty.icon] || ClipboardList;
          const colorClass = colorMap[duty.color] || 'text-gray-500 bg-gray-50';
          const matched = isMatchedDuty(duty);

          // 상세 업무 중 필수/중요 업무만 미리보기
          const essentialTasks = duty.detailedTasks.filter(t => t.category === 'essential' || t.category === 'important').slice(0, 5);
          const otherTasks = duty.detailedTasks.filter(t => t.category !== 'essential' && t.category !== 'important').slice(0, 3);
          const previewTasks = essentialTasks.length > 0 ? essentialTasks : otherTasks;

          return (
            <Card
              key={duty.id}
              className={cn(
                "cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]",
                matched
                  ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                  : "hover:border-primary/50"
              )}
              onClick={() => openDutyDetail(duty)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className={cn('p-2 rounded-lg', colorClass)}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {matched && (
                      <Badge className="text-xs bg-primary">
                        ★ 나의 업무
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {categoryNames[duty.category]}
                    </Badge>
                    <Badge className={cn('text-xs', difficultyColorMap[duty.difficulty])}>
                      난이도 {duty.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{duty.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {duty.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3 space-y-3">
                {/* 상세 업무 미리보기 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-muted-foreground">📋 주요 업무 ({duty.detailedTasks.length}개)</p>
                  </div>
                  <div className="space-y-1">
                    {previewTasks.map((task, idx) => (
                      <div key={task.id} className="flex items-start gap-2 text-xs">
                        <span className={cn(
                          "mt-0.5 flex-shrink-0",
                          task.category === 'essential' ? 'text-red-500' :
                          task.category === 'important' ? 'text-orange-500' :
                          'text-blue-500'
                        )}>●</span>
                        <span className="text-muted-foreground line-clamp-1">{task.task}</span>
                        {task.deadline && (
                          <Badge variant="destructive" className="text-[10px] px-1 py-0 flex-shrink-0">
                            {task.deadline}
                          </Badge>
                        )}
                      </div>
                    ))}
                    {duty.detailedTasks.length > previewTasks.length && (
                      <p className="text-xs text-muted-foreground/70 pl-4">
                        +{duty.detailedTasks.length - previewTasks.length}개 더...
                      </p>
                    )}
                  </div>
                </div>

                {/* 요약 정보 */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <div className="flex gap-2">
                    <span>{duty.detailedFAQ.length}개 FAQ</span>
                    <span>•</span>
                    <span>{duty.emergencyProcedures.length > 0 ? `${duty.emergencyProcedures.length}개 긴급대응` : '나이스 가이드 포함'}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary h-6 px-2">
                    자세히 <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 검색 결과 없음 */}
      {filteredDuties.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">검색 결과가 없습니다</h3>
          <p className="text-muted-foreground">다른 키워드로 검색해보세요</p>
        </div>
      )}

      {/* 업무 상세 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
          {selectedDuty && (
            <>
              <DialogHeader className="flex-shrink-0 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn('p-2 rounded-lg', colorMap[selectedDuty.color])}>
                    {(() => {
                      const Icon = iconMap[selectedDuty.icon] || ClipboardList;
                      return <Icon className="h-6 w-6" />;
                    })()}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedDuty.name}</DialogTitle>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline">
                        {categoryNames[selectedDuty.category]}
                      </Badge>
                      <Badge className={difficultyColorMap[selectedDuty.difficulty]}>
                        난이도 {selectedDuty.difficulty} - {difficultyLabels[selectedDuty.difficulty]}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto -mx-6 px-6">
                <Tabs defaultValue="overview" className="mt-4">
                  <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full mb-4">
                    <TabsTrigger value="overview">개요</TabsTrigger>
                    <TabsTrigger value="tasks">상세업무</TabsTrigger>
                    <TabsTrigger value="monthly">월별플로우</TabsTrigger>
                    <TabsTrigger value="neis">나이스</TabsTrigger>
                    <TabsTrigger value="emergency">긴급대응</TabsTrigger>
                    <TabsTrigger value="legal">법적근거</TabsTrigger>
                    <TabsTrigger value="tips">실무팁</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>

                  {/* 개요 탭 */}
                  <TabsContent value="overview" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5" /> 업무 개요
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                          {selectedDuty.detailedOverview}
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" /> 중요성
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {selectedDuty.importance}
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> 필요 역량
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1">
                            {selectedDuty.requiredSkills.map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" /> 추천 연수
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                          {selectedDuty.recommendedTraining.map((training, idx) => (
                            <li key={idx}>{training}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-500" /> 흔한 어려움 & 해결책
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {selectedDuty.commonChallenges.map((challenge, idx) => (
                            <AccordionItem key={idx} value={`challenge-${idx}`}>
                              <AccordionTrigger className="text-sm text-left">
                                {challenge}
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-sm text-muted-foreground pl-4">
                                  💡 {selectedDuty.challengeSolutions[challenge] || '관련 선배 교사나 부장님께 조언을 구하세요.'}
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>

                    {/* 처음 담당하는 선생님을 위한 가이드 */}
                    <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-500" /> 처음 담당하시는 선생님께
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {selectedDuty.firstYearGuide}
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* 상세업무 탭 */}
                  <TabsContent value="tasks" className="mt-4">
                    <div className="space-y-2">
                      {selectedDuty.detailedTasks.map((task) => (
                        <Card key={task.id} className="overflow-hidden">
                          <Accordion type="single" collapsible>
                            <AccordionItem value={task.id} className="border-0">
                              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                                <div className="flex items-center gap-3 text-left">
                                  <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-medium">{task.task}</span>
                                      <Badge className={cn('text-xs', taskCategoryColors[task.category])}>
                                        {taskCategoryLabels[task.category]}
                                      </Badge>
                                      <Badge variant="outline" className="text-xs">
                                        {frequencyLabels[task.frequency]}
                                      </Badge>
                                      {task.deadline && (
                                        <Badge variant="destructive" className="text-xs">
                                          {task.deadline}
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                      {task.description}
                                    </p>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4">
                                <div className="space-y-4 pt-2">
                                  {/* 상세 설명 */}
                                  <p className="text-sm text-muted-foreground">{task.description}</p>

                                  {/* 법적 근거 */}
                                  {task.legalBasis && (
                                    <div className="flex items-start gap-2">
                                      <Scale className="h-4 w-4 text-muted-foreground mt-0.5" />
                                      <span className="text-sm text-muted-foreground">
                                        법적 근거: {task.legalBasis}
                                      </span>
                                    </div>
                                  )}

                                  {/* 예상 소요 시간 */}
                                  {task.estimatedTime && (
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-sm text-muted-foreground">
                                        예상 소요 시간: {task.estimatedTime}
                                      </span>
                                    </div>
                                  )}

                                  {/* 단계별 절차 */}
                                  {task.procedures.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        단계별 절차
                                      </h4>
                                      <div className="space-y-3 pl-2">
                                        {task.procedures.map((proc) => (
                                          <div key={proc.step} className="border-l-2 border-primary/30 pl-4">
                                            <div className="flex items-center gap-2">
                                              <Badge variant="outline" className="text-xs">
                                                Step {proc.step}
                                              </Badge>
                                              <span className="font-medium text-sm">{proc.title}</span>
                                              {proc.timeRequired && (
                                                <span className="text-xs text-muted-foreground">
                                                  ({proc.timeRequired})
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">
                                              {proc.description}
                                            </p>
                                            {proc.neisPath && (
                                              <div className="flex items-center gap-1 mt-1">
                                                <Monitor className="h-3 w-3 text-blue-500" />
                                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                                  나이스: {proc.neisPath}
                                                </span>
                                              </div>
                                            )}
                                            {proc.tips && proc.tips.length > 0 && (
                                              <div className="mt-1 space-y-0.5">
                                                {proc.tips.map((tip, i) => (
                                                  <p key={i} className="text-xs text-green-600 dark:text-green-400">
                                                    💡 {tip}
                                                  </p>
                                                ))}
                                              </div>
                                            )}
                                            {proc.warnings && proc.warnings.length > 0 && (
                                              <div className="mt-1 space-y-0.5">
                                                {proc.warnings.map((warning, i) => (
                                                  <p key={i} className="text-xs text-orange-600 dark:text-orange-400">
                                                    ⚠️ {warning}
                                                  </p>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* 흔한 실수 */}
                                  {task.commonMistakes && task.commonMistakes.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                                        흔한 실수
                                      </h4>
                                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                                        {task.commonMistakes.map((mistake, idx) => (
                                          <li key={idx}>{mistake}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* 성공 기준 */}
                                  {task.successCriteria && task.successCriteria.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                        <Trophy className="h-4 w-4 text-yellow-500" />
                                        성공 기준
                                      </h4>
                                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                                        {task.successCriteria.map((criteria, idx) => (
                                          <li key={idx}>{criteria}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* 필요 문서 */}
                                  {task.documents && task.documents.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-semibold mb-2">📄 필요 문서</h4>
                                      <div className="flex flex-wrap gap-1">
                                        {task.documents.map((doc, idx) => (
                                          <Badge key={idx} variant="secondary" className="text-xs">
                                            {doc}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* 나이스 메뉴 */}
                                  {task.neisMenus && task.neisMenus.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-semibold mb-2">🖥️ 나이스 메뉴</h4>
                                      <div className="flex flex-wrap gap-1">
                                        {task.neisMenus.map((menu, idx) => (
                                          <Badge key={idx} variant="outline" className="text-xs">
                                            {menu}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* 체크리스트 */}
                                  {task.checklistItems && task.checklistItems.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-semibold mb-2">✅ 체크리스트</h4>
                                      <ul className="space-y-1 pl-2">
                                        {task.checklistItems.map((item, idx) => (
                                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-4 h-4 border rounded flex-shrink-0" />
                                            {item}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* 월별 워크플로우 탭 */}
                  <TabsContent value="monthly" className="mt-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
                        const monthTasks = selectedDuty.weeklyWorkflow.filter(w => w.month === month);
                        const hasHighPriority = monthTasks.some(t => t.priority === 'high');
                        return (
                          <Card
                            key={month}
                            className={cn(
                              "p-3",
                              month === currentMonth && "border-primary border-2",
                              hasHighPriority && "bg-red-50/50 dark:bg-red-950/20"
                            )}
                          >
                            <h4 className={cn(
                              "font-semibold text-center mb-2",
                              month === currentMonth ? "text-primary" : "text-muted-foreground"
                            )}>
                              {month}월
                              {month === currentMonth && (
                                <Badge className="ml-2 text-xs" variant="default">현재</Badge>
                              )}
                            </h4>
                            {monthTasks.length > 0 ? (
                              <ul className="text-sm space-y-1">
                                {monthTasks.flatMap(w =>
                                  w.tasks.map((task, idx) => (
                                    <li key={`${w.week}-${idx}`} className="flex items-start gap-1">
                                      <span className={cn(
                                        "text-xs mt-0.5",
                                        w.priority === 'high' ? 'text-red-500' :
                                        w.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                                      )}>●</span>
                                      <span className="text-muted-foreground text-xs">{task}</span>
                                    </li>
                                  ))
                                ).slice(0, 6)}
                                {monthTasks.flatMap(w => w.tasks).length > 6 && (
                                  <li className="text-xs text-muted-foreground text-center">
                                    +{monthTasks.flatMap(w => w.tasks).length - 6}개 더보기...
                                  </li>
                                )}
                              </ul>
                            ) : (
                              <p className="text-xs text-muted-foreground text-center">
                                정기 업무 진행
                              </p>
                            )}
                          </Card>
                        );
                      })}
                    </div>
                    <Card className="mt-4 p-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <span className="text-red-500">●</span> 긴급/필수
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">●</span> 중요
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-green-500">●</span> 일반
                        </span>
                      </div>
                    </Card>
                  </TabsContent>

                  {/* 나이스 가이드 탭 */}
                  <TabsContent value="neis" className="mt-4 space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Monitor className="h-4 w-4 text-blue-500" /> 자주 사용하는 나이스 메뉴
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedDuty.neisGuide.frequentMenus.map((menu, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-2 bg-muted/50 rounded-lg">
                              <div className="flex-1">
                                <p className="text-sm font-medium">{menu.path}</p>
                                <p className="text-xs text-muted-foreground">{menu.description}</p>
                              </div>
                              <Badge variant="outline" className="text-xs flex-shrink-0">
                                {menu.frequency}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" /> 나이스 활용 팁
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedDuty.neisGuide.tipsAndTricks.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500" /> 흔한 오류 & 해결
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {selectedDuty.neisGuide.commonErrors.map((err, idx) => (
                            <AccordionItem key={idx} value={`error-${idx}`}>
                              <AccordionTrigger className="text-sm text-left text-red-600 dark:text-red-400">
                                ❌ {err.error}
                              </AccordionTrigger>
                              <AccordionContent>
                                <p className="text-sm text-green-600 dark:text-green-400 pl-4">
                                  ✅ {err.solution}
                                </p>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* 긴급대응 탭 */}
                  <TabsContent value="emergency" className="mt-4 space-y-4">
                    {selectedDuty.emergencyProcedures.length > 0 ? (
                      selectedDuty.emergencyProcedures.map((proc, idx) => (
                        <Card key={idx} className="border-red-200 dark:border-red-800">
                          <CardHeader className="pb-2 bg-red-50/50 dark:bg-red-950/20">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Siren className="h-5 w-5 text-red-500" />
                              {proc.situation}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold mb-2 text-red-600 dark:text-red-400">
                                🚨 즉시 조치
                              </h4>
                              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                                {proc.immediateActions.map((action, i) => (
                                  <li key={i}>{action}</li>
                                ))}
                              </ol>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold mb-2">
                                📞 보고 순서
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {proc.reportingChain.map((report, i) => (
                                  <div key={i} className="flex items-center gap-1">
                                    <Badge variant="outline">{report}</Badge>
                                    {i < proc.reportingChain.length - 1 && (
                                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold mb-2">
                                📄 필수 문서화
                              </h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {proc.documentation.map((doc, i) => (
                                  <li key={i}>{doc}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold mb-2">
                                🔄 후속 조치
                              </h4>
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {proc.followUp.map((action, i) => (
                                  <li key={i}>{action}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card className="p-8 text-center">
                        <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                          이 업무에는 특별한 긴급 대응 절차가 없습니다.
                        </p>
                      </Card>
                    )}
                  </TabsContent>

                  {/* 법적 근거 탭 */}
                  <TabsContent value="legal" className="mt-4 space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Scale className="h-4 w-4" /> 관련 법령
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedDuty.legalBasis.map((law, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <FileCheck className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{law}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {selectedDuty.relatedLaws.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <BookMarked className="h-4 w-4" /> 주요 법령 상세
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            {selectedDuty.relatedLaws.map((law, idx) => (
                              <AccordionItem key={idx} value={`law-${idx}`}>
                                <AccordionTrigger className="text-sm text-left">
                                  {law.name} - {law.article}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <p className="text-sm text-muted-foreground pl-4">
                                    {law.content}
                                  </p>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  {/* 실무 팁 탭 */}
                  <TabsContent value="tips" className="mt-4 space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-yellow-500" />
                          성공적인 업무 수행을 위한 팁
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedDuty.successTips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-500" /> 선배 교사 조언
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {selectedDuty.seniorAdvice.map((advice, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground italic">
                              "{advice}"
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {selectedDuty.relatedDuties.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">🔗 관련 업무</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {selectedDuty.relatedDuties.map((duty, idx) => (
                              <Badge key={idx} variant="outline">{duty}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {selectedDuty.externalPartners.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base flex items-center gap-2">
                            <Phone className="h-4 w-4" /> 외부 협력 기관
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedDuty.externalPartners.map((partner, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                                <div>
                                  <p className="text-sm font-medium">{partner.name}</p>
                                  <p className="text-xs text-muted-foreground">{partner.purpose}</p>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {partner.contact}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {selectedDuty.references.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">📚 참고 자료</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1">
                            {selectedDuty.references.map((ref, idx) => (
                              <li key={idx}>
                                <a
                                  href={ref.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline flex items-center gap-1"
                                >
                                  {ref.title}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                                {ref.description && (
                                  <p className="text-xs text-muted-foreground ml-4">{ref.description}</p>
                                )}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}

                    {selectedDuty.documentTemplates.length > 0 && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">📄 필요 문서 양식</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedDuty.documentTemplates.map((doc, idx) => (
                              <div key={idx} className="p-2 bg-muted/50 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">{doc.name}</p>
                                  {doc.deadline && (
                                    <Badge variant="outline" className="text-xs">
                                      {doc.deadline}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{doc.purpose}</p>
                                <p className="text-xs text-muted-foreground">제출: {doc.submissionTo}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  {/* FAQ 탭 */}
                  <TabsContent value="faq" className="mt-4">
                    <Accordion type="single" collapsible className="w-full">
                      {selectedDuty.detailedFAQ.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                          <AccordionTrigger className="text-left">
                            <div className="flex items-start gap-2">
                              <HelpCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{item.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="pl-6 space-y-2">
                              <p className="text-sm text-muted-foreground whitespace-pre-line">
                                {item.answer}
                              </p>
                              {item.category && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.category}
                                </Badge>
                              )}
                              {item.relatedQuestions && item.relatedQuestions.length > 0 && (
                                <div className="pt-2">
                                  <p className="text-xs text-muted-foreground mb-1">관련 질문:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {item.relatedQuestions.map((q, i) => (
                                      <Badge key={i} variant="outline" className="text-xs">
                                        {q}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 하단 안내 */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">처음 맡는 업무가 부담되시나요?</h3>
              <p className="text-muted-foreground text-sm">
                각 업무의 상세 가이드를 참고하세요. 단계별 절차, 나이스 메뉴 경로, 긴급상황 대응까지
                모든 정보가 준비되어 있습니다. 100+ 학교 사이트 교차검증으로 실제 업무에 바로 적용할 수 있습니다!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
