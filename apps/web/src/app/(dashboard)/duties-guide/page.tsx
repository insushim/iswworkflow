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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  allDutiesGuide,
  getDutiesByCategory,
  searchDuties,
  getDutyById,
  dutyCategories,
  difficultyLevels,
  DutyGuide,
} from '@/data/duties-guide-all';

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
  HeartHandshake: Heart,
  Utensils: Clock,
  HandHeart: Heart,
};

// 색상 매핑
const colorMap: Record<string, string> = {
  blue: 'text-blue-500 bg-blue-50',
  purple: 'text-purple-500 bg-purple-50',
  pink: 'text-pink-500 bg-pink-50',
  orange: 'text-orange-500 bg-orange-50',
  green: 'text-green-500 bg-green-50',
  cyan: 'text-cyan-500 bg-cyan-50',
  red: 'text-red-500 bg-red-50',
  yellow: 'text-yellow-500 bg-yellow-50',
  emerald: 'text-emerald-500 bg-emerald-50',
  violet: 'text-violet-500 bg-violet-50',
  rose: 'text-rose-500 bg-rose-50',
  indigo: 'text-indigo-500 bg-indigo-50',
  amber: 'text-amber-500 bg-amber-50',
  lime: 'text-lime-500 bg-lime-50',
  slate: 'text-slate-500 bg-slate-50',
  sky: 'text-sky-500 bg-sky-50',
  teal: 'text-teal-500 bg-teal-50',
};

const difficultyColorMap: Record<number, string> = {
  1: 'bg-green-100 text-green-700',
  2: 'bg-lime-100 text-lime-700',
  3: 'bg-yellow-100 text-yellow-700',
  4: 'bg-orange-100 text-orange-700',
  5: 'bg-red-100 text-red-700',
};

export default function DutiesGuidePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDuty, setSelectedDuty] = useState<DutyGuide | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 필터링된 업무 목록
  const filteredDuties = useMemo(() => {
    let duties = allDutiesGuide;

    if (selectedCategory !== 'all') {
      duties = getDutiesByCategory(selectedCategory as DutyGuide['category']);
    }

    if (searchQuery) {
      duties = searchDuties(searchQuery).filter(d =>
        selectedCategory === 'all' || d.category === selectedCategory
      );
    }

    return duties;
  }, [searchQuery, selectedCategory]);

  // 업무 상세 보기
  const openDutyDetail = (duty: DutyGuide) => {
    setSelectedDuty(duty);
    setIsDialogOpen(true);
  };

  // 카테고리별 업무 수
  const categoryCounts = useMemo(() => {
    return {
      all: allDutiesGuide.length,
      core: getDutiesByCategory('core').length,
      support: getDutiesByCategory('support').length,
      special: getDutiesByCategory('special').length,
      admin: getDutiesByCategory('admin').length,
    };
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📚 초등교사 업무분장 가이드</h1>
        <p className="text-muted-foreground">
          20개 이상의 업무에 대한 상세 가이드 - 처음 맡는 업무도 자신있게!
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          100+ 사이트 리서치 기반 | 실무 팁 | 월별 워크플로우 | FAQ
        </p>
      </div>

      {/* 검색 및 필터 */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="업무 검색... (예: 학교폭력, 생기부, 체육대회)"
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

      {/* 업무 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDuties.map((duty) => {
          const IconComponent = iconMap[duty.icon] || ClipboardList;
          const colorClass = colorMap[duty.color] || 'text-gray-500 bg-gray-50';

          return (
            <Card
              key={duty.id}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              onClick={() => openDutyDetail(duty)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={cn('p-2 rounded-lg', colorClass)}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs">
                      {dutyCategories[duty.category].name}
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
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{duty.annualTasks.length}개 주요 업무</span>
                  <Button variant="ghost" size="sm" className="text-primary">
                    자세히 보기 <ChevronRight className="h-4 w-4 ml-1" />
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDuty && (
            <>
              <DialogHeader>
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
                        {dutyCategories[selectedDuty.category].name}
                      </Badge>
                      <Badge className={difficultyColorMap[selectedDuty.difficulty]}>
                        난이도 {selectedDuty.difficulty} - {difficultyLevels[selectedDuty.difficulty].name}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="overview">개요</TabsTrigger>
                  <TabsTrigger value="tasks">업무목록</TabsTrigger>
                  <TabsTrigger value="monthly">월별 플로우</TabsTrigger>
                  <TabsTrigger value="tips">실무 팁</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                {/* 개요 탭 */}
                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> 업무 개요
                    </h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {selectedDuty.overview}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Star className="h-4 w-4" /> 중요성
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedDuty.importance}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> 필요 역량
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDuty.requiredSkills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" /> 흔한 어려움
                    </h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {selectedDuty.commonChallenges.map((challenge, idx) => (
                        <li key={idx}>{challenge}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                {/* 업무목록 탭 */}
                <TabsContent value="tasks" className="mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    {selectedDuty.annualTasks.map((task) => (
                      <AccordionItem key={task.id} value={task.id}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{task.task}</span>
                            {task.deadline && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                {task.deadline}
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pl-6">
                            <p className="text-muted-foreground">{task.description}</p>

                            {task.tips && task.tips.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-1">💡 팁</h4>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                  {task.tips.map((tip, idx) => (
                                    <li key={idx}>{tip}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {task.documents && task.documents.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-1">📄 필요 문서</h4>
                                <div className="flex flex-wrap gap-1">
                                  {task.documents.map((doc, idx) => (
                                    <Badge key={idx} variant="secondary" className="text-xs">
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {task.neis && task.neis.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-1">🖥️ 나이스 메뉴</h4>
                                <div className="flex flex-wrap gap-1">
                                  {task.neis.map((menu, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {menu}
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

                {/* 월별 워크플로우 탭 */}
                <TabsContent value="monthly" className="mt-4">
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedDuty.monthlyWorkflow.map((mw) => (
                      <Card key={mw.month} className="p-3">
                        <h4 className="font-semibold text-center mb-2 text-primary">
                          {mw.month}월
                        </h4>
                        <ul className="text-sm space-y-1">
                          {mw.tasks.map((task, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-primary">•</span>
                              <span className="text-muted-foreground">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* 실무 팁 탭 */}
                <TabsContent value="tips" className="mt-4">
                  <Card className="p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      성공적인 업무 수행을 위한 팁
                    </h3>
                    <ul className="space-y-2">
                      {selectedDuty.successTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  {selectedDuty.relatedDuties.length > 0 && (
                    <Card className="p-4 mt-4">
                      <h3 className="font-semibold mb-2">🔗 관련 업무</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedDuty.relatedDuties.map((duty, idx) => (
                          <Badge key={idx} variant="outline">{duty}</Badge>
                        ))}
                      </div>
                    </Card>
                  )}

                  {selectedDuty.references.length > 0 && (
                    <Card className="p-4 mt-4">
                      <h3 className="font-semibold mb-2">📚 참고 자료</h3>
                      <ul className="space-y-1">
                        {selectedDuty.references.map((ref, idx) => (
                          <li key={idx}>
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              {ref.title}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  )}
                </TabsContent>

                {/* FAQ 탭 */}
                <TabsContent value="faq" className="mt-4">
                  <Accordion type="single" collapsible className="w-full">
                    {selectedDuty.faq.map((item, idx) => (
                      <AccordionItem key={idx} value={`faq-${idx}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center gap-2">
                            <HelpCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="pl-6 text-muted-foreground">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* 하단 안내 */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Lightbulb className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">처음 맡는 업무가 부담되시나요?</h3>
              <p className="text-muted-foreground text-sm">
                각 업무의 상세 가이드를 참고하세요. 월별 워크플로우와 실무 팁을 따라하면
                처음 맡는 업무도 체계적으로 수행할 수 있습니다.
                궁금한 점은 AI 채팅에서 물어보세요!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
