'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ClipboardList,
  Calendar,
  CheckCircle2,
  Circle,
  ChevronRight,
  FileText,
  Users,
  GraduationCap,
  BookOpen,
  Trophy,
  Heart,
  AlertCircle,
  Star,
  Clock,
  Sparkles,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// 월별 업무 데이터 - 실제 초등교사 업무 기반
const monthlyTasksData: Record<string, { title: string; tasks: TaskCategory[] }> = {
  '1': {
    title: '1월 업무',
    tasks: [
      {
        category: '학적 관리',
        icon: GraduationCap,
        color: 'text-blue-500',
        items: [
          { id: '1-1', task: '겨울방학 중 학적 변동 처리', priority: 'high', deadline: '수시' },
          { id: '1-2', task: '차년도 신입생 예비소집 준비', priority: 'high', deadline: '1월 중순' },
          { id: '1-3', task: '졸업예정자 명단 확정', priority: 'high', deadline: '1월 말' },
          { id: '1-4', task: '전출입 학생 서류 정리', priority: 'medium', deadline: '수시' },
        ],
      },
      {
        category: '교육과정',
        icon: BookOpen,
        color: 'text-green-500',
        items: [
          { id: '1-5', task: '차년도 교육과정 편성 준비', priority: 'high', deadline: '1월 말' },
          { id: '1-6', task: '학년별 교과서 수량 파악', priority: 'medium', deadline: '1월 중순' },
          { id: '1-7', task: '방과후학교 프로그램 계획', priority: 'medium', deadline: '1월 말' },
        ],
      },
      {
        category: '생활기록부',
        icon: FileText,
        color: 'text-purple-500',
        items: [
          { id: '1-8', task: '생활기록부 최종 점검', priority: 'high', deadline: '졸업식 전' },
          { id: '1-9', task: '졸업생 생활기록부 마감', priority: 'high', deadline: '졸업식 전' },
          { id: '1-10', task: '생활기록부 출력 및 보관', priority: 'medium', deadline: '2월 초' },
        ],
      },
    ],
  },
  '2': {
    title: '2월 업무',
    tasks: [
      {
        category: '졸업 및 진급',
        icon: GraduationCap,
        color: 'text-blue-500',
        items: [
          { id: '2-1', task: '졸업식 준비 및 진행', priority: 'high', deadline: '2월 중순' },
          { id: '2-2', task: '종업식 준비 및 진행', priority: 'high', deadline: '2월 말' },
          { id: '2-3', task: '졸업장/상장 발급', priority: 'high', deadline: '졸업식' },
          { id: '2-4', task: '졸업앨범 배부', priority: 'medium', deadline: '졸업식' },
        ],
      },
      {
        category: '학년말 정리',
        icon: FileText,
        color: 'text-purple-500',
        items: [
          { id: '2-5', task: '학급 물품 반납 및 정리', priority: 'medium', deadline: '종업식 전' },
          { id: '2-6', task: '교실 환경 정리', priority: 'medium', deadline: '종업식 후' },
          { id: '2-7', task: '학년말 업무 인수인계', priority: 'high', deadline: '2월 말' },
          { id: '2-8', task: '교과서/교구 반납', priority: 'medium', deadline: '종업식' },
        ],
      },
      {
        category: '신학기 준비',
        icon: Star,
        color: 'text-yellow-500',
        items: [
          { id: '2-9', task: '신학기 학급 배정', priority: 'high', deadline: '2월 말' },
          { id: '2-10', task: '신입생 입학식 준비', priority: 'high', deadline: '2월 말' },
          { id: '2-11', task: '새 학년 교과서 확인', priority: 'medium', deadline: '개학 전' },
        ],
      },
    ],
  },
  '3': {
    title: '3월 업무',
    tasks: [
      {
        category: '신학기 시작',
        icon: GraduationCap,
        color: 'text-blue-500',
        items: [
          { id: '3-1', task: '입학식/개학식 진행', priority: 'high', deadline: '3월 첫째주' },
          { id: '3-2', task: '학급 임원 선거', priority: 'high', deadline: '3월 2주차' },
          { id: '3-3', task: '학급 규칙 수립', priority: 'medium', deadline: '3월 2주차' },
          { id: '3-4', task: '자리 배치 및 모둠 구성', priority: 'medium', deadline: '3월 1주차' },
        ],
      },
      {
        category: '학부모 관련',
        icon: Users,
        color: 'text-green-500',
        items: [
          { id: '3-5', task: '학부모 총회 준비 및 진행', priority: 'high', deadline: '3월 2주차' },
          { id: '3-6', task: '학교운영위원회 학부모위원 선출', priority: 'high', deadline: '3월 중' },
          { id: '3-7', task: '가정통신문 발송 (교육과정 안내)', priority: 'medium', deadline: '3월 1주차' },
          { id: '3-8', task: '학부모 상담 일정 안내', priority: 'medium', deadline: '3월 2주차' },
        ],
      },
      {
        category: '학적 및 서류',
        icon: FileText,
        color: 'text-purple-500',
        items: [
          { id: '3-9', task: '학생 기초 조사서 수합', priority: 'high', deadline: '3월 1주차' },
          { id: '3-10', task: '응급처치동의서 수합', priority: 'high', deadline: '3월 1주차' },
          { id: '3-11', task: '개인정보활용동의서 수합', priority: 'high', deadline: '3월 1주차' },
          { id: '3-12', task: 'NEIS 학생 정보 확인', priority: 'medium', deadline: '3월 중' },
        ],
      },
      {
        category: '안전교육',
        icon: AlertCircle,
        color: 'text-red-500',
        items: [
          { id: '3-13', task: '학교안전교육 실시 (7대 표준안)', priority: 'high', deadline: '3월 중' },
          { id: '3-14', task: '재난대응 안전한국훈련', priority: 'medium', deadline: '3월 중' },
          { id: '3-15', task: '학교폭력 예방교육', priority: 'high', deadline: '3월 중' },
        ],
      },
    ],
  },
  '4': {
    title: '4월 업무',
    tasks: [
      {
        category: '교과 운영',
        icon: BookOpen,
        color: 'text-green-500',
        items: [
          { id: '4-1', task: '과학의 날 행사 준비', priority: 'medium', deadline: '4월 21일' },
          { id: '4-2', task: '과학탐구대회 지도', priority: 'medium', deadline: '4월 중' },
          { id: '4-3', task: '독서교육 계획 수립', priority: 'medium', deadline: '4월 중' },
        ],
      },
      {
        category: '학교행사',
        icon: Trophy,
        color: 'text-yellow-500',
        items: [
          { id: '4-4', task: '학교운영위원회 개최', priority: 'high', deadline: '4월 초' },
          { id: '4-5', task: '현장체험학습 계획 수립', priority: 'medium', deadline: '4월 중' },
          { id: '4-6', task: '학부모 공개수업 준비', priority: 'medium', deadline: '4월 중' },
        ],
      },
      {
        category: '학생 관리',
        icon: Users,
        color: 'text-blue-500',
        items: [
          { id: '4-7', task: '학교폭력 실태조사', priority: 'high', deadline: '4월 중' },
          { id: '4-8', task: '건강검진 실시', priority: 'medium', deadline: '4월-5월' },
          { id: '4-9', task: '학업성적관리위원회', priority: 'medium', deadline: '4월 중' },
        ],
      },
      {
        category: '안전교육',
        icon: AlertCircle,
        color: 'text-red-500',
        items: [
          { id: '4-10', task: '교통안전교육', priority: 'high', deadline: '4월 중' },
          { id: '4-11', task: '재난안전교육 (지진)', priority: 'medium', deadline: '4월 중' },
        ],
      },
    ],
  },
  '5': {
    title: '5월 업무',
    tasks: [
      {
        category: '학교행사',
        icon: Trophy,
        color: 'text-yellow-500',
        items: [
          { id: '5-1', task: '어린이날 행사 진행', priority: 'high', deadline: '5월 5일' },
          { id: '5-2', task: '스승의날 행사', priority: 'medium', deadline: '5월 15일' },
          { id: '5-3', task: '학부모 공개수업', priority: 'high', deadline: '5월 중' },
          { id: '5-4', task: '현장체험학습 진행', priority: 'medium', deadline: '5월 중' },
        ],
      },
      {
        category: '가정의 달',
        icon: Heart,
        color: 'text-pink-500',
        items: [
          { id: '5-5', task: '효도 관련 교육활동', priority: 'medium', deadline: '5월 초' },
          { id: '5-6', task: '가정통신문 발송 (가정의 달)', priority: 'low', deadline: '5월 초' },
          { id: '5-7', task: '학부모 참여 수업', priority: 'medium', deadline: '5월 중' },
        ],
      },
      {
        category: '안전교육',
        icon: AlertCircle,
        color: 'text-red-500',
        items: [
          { id: '5-8', task: '물놀이 안전교육', priority: 'high', deadline: '5월 말' },
          { id: '5-9', task: '성폭력 예방교육', priority: 'high', deadline: '5월 중' },
        ],
      },
    ],
  },
  '6': {
    title: '6월 업무',
    tasks: [
      {
        category: '호국보훈',
        icon: Heart,
        color: 'text-red-500',
        items: [
          { id: '6-1', task: '현충일 계기교육', priority: 'high', deadline: '6월 6일' },
          { id: '6-2', task: '호국보훈 관련 교육', priority: 'medium', deadline: '6월 중' },
          { id: '6-3', task: '6.25 계기교육', priority: 'medium', deadline: '6월 25일' },
        ],
      },
      {
        category: '학기말 평가',
        icon: FileText,
        color: 'text-purple-500',
        items: [
          { id: '6-4', task: '1학기 학업성적 산출', priority: 'high', deadline: '6월 말' },
          { id: '6-5', task: '생활기록부 1학기 기록', priority: 'high', deadline: '방학 전' },
          { id: '6-6', task: '학부모 상담주간 운영', priority: 'medium', deadline: '6월 중' },
        ],
      },
      {
        category: '방학 준비',
        icon: Calendar,
        color: 'text-blue-500',
        items: [
          { id: '6-7', task: '여름방학 계획 수립', priority: 'medium', deadline: '6월 말' },
          { id: '6-8', task: '방학 생활 안내문 작성', priority: 'medium', deadline: '방학 전' },
          { id: '6-9', task: '방과후학교 여름 프로그램', priority: 'low', deadline: '6월 말' },
        ],
      },
    ],
  },
  '7': {
    title: '7월 업무',
    tasks: [
      {
        category: '학기말 마무리',
        icon: GraduationCap,
        color: 'text-blue-500',
        items: [
          { id: '7-1', task: '1학기 종업식/방학식', priority: 'high', deadline: '7월 중순' },
          { id: '7-2', task: '생활통지표 발송', priority: 'high', deadline: '방학식' },
          { id: '7-3', task: '교실 물품 정리', priority: 'medium', deadline: '방학식' },
        ],
      },
      {
        category: '방학 업무',
        icon: Calendar,
        color: 'text-green-500',
        items: [
          { id: '7-4', task: '방학 중 학생 생활지도', priority: 'medium', deadline: '방학 중' },
          { id: '7-5', task: '2학기 교육과정 준비', priority: 'medium', deadline: '방학 중' },
          { id: '7-6', task: '교실 환경 구성 계획', priority: 'low', deadline: '방학 중' },
        ],
      },
      {
        category: '안전',
        icon: AlertCircle,
        color: 'text-red-500',
        items: [
          { id: '7-7', task: '물놀이 안전사고 예방 교육', priority: 'high', deadline: '방학 전' },
          { id: '7-8', task: '폭염/감염병 예방 교육', priority: 'high', deadline: '방학 전' },
        ],
      },
    ],
  },
  '8': {
    title: '8월 업무',
    tasks: [
      {
        category: '2학기 준비',
        icon: BookOpen,
        color: 'text-green-500',
        items: [
          { id: '8-1', task: '2학기 개학 준비', priority: 'high', deadline: '개학 전' },
          { id: '8-2', task: '교실 환경 구성', priority: 'medium', deadline: '개학 전' },
          { id: '8-3', task: '2학기 학급경영 계획', priority: 'medium', deadline: '개학 전' },
          { id: '8-4', task: '2학기 교과서 확인', priority: 'medium', deadline: '개학 전' },
        ],
      },
      {
        category: '호국보훈',
        icon: Heart,
        color: 'text-red-500',
        items: [
          { id: '8-5', task: '광복절 계기교육', priority: 'high', deadline: '8월 15일' },
        ],
      },
      {
        category: '학급 운영',
        icon: Users,
        color: 'text-blue-500',
        items: [
          { id: '8-6', task: '2학기 학급 임원 선거', priority: 'high', deadline: '개학 후 1주' },
          { id: '8-7', task: '2학기 모둠 재편성', priority: 'medium', deadline: '개학 후 1주' },
          { id: '8-8', task: '학급 규칙 재확인', priority: 'low', deadline: '개학 후' },
        ],
      },
    ],
  },
  '9': {
    title: '9월 업무',
    tasks: [
      {
        category: '학교행사',
        icon: Trophy,
        color: 'text-yellow-500',
        items: [
          { id: '9-1', task: '운동회/체육대회 준비', priority: 'high', deadline: '9월 중' },
          { id: '9-2', task: '학부모 공개수업', priority: 'medium', deadline: '9월 중' },
        ],
      },
      {
        category: '명절',
        icon: Star,
        color: 'text-orange-500',
        items: [
          { id: '9-3', task: '추석 계기교육', priority: 'medium', deadline: '추석 전' },
          { id: '9-4', task: '전통문화 체험활동', priority: 'medium', deadline: '추석 전' },
        ],
      },
      {
        category: '안전교육',
        icon: AlertCircle,
        color: 'text-red-500',
        items: [
          { id: '9-5', task: '교통안전교육 (명절)', priority: 'high', deadline: '추석 전' },
          { id: '9-6', task: '학교폭력 예방교육 2차', priority: 'high', deadline: '9월 중' },
        ],
      },
    ],
  },
  '10': {
    title: '10월 업무',
    tasks: [
      {
        category: '국경일',
        icon: Heart,
        color: 'text-red-500',
        items: [
          { id: '10-1', task: '개천절 계기교육', priority: 'high', deadline: '10월 3일' },
          { id: '10-2', task: '한글날 계기교육', priority: 'high', deadline: '10월 9일' },
        ],
      },
      {
        category: '학교행사',
        icon: Trophy,
        color: 'text-yellow-500',
        items: [
          { id: '10-3', task: '학예회/발표회 준비', priority: 'high', deadline: '10월 말' },
          { id: '10-4', task: '독서의 달 행사', priority: 'medium', deadline: '10월 중' },
          { id: '10-5', task: '학교폭력 실태조사 2차', priority: 'high', deadline: '10월 중' },
        ],
      },
      {
        category: '진로',
        icon: Target,
        color: 'text-purple-500',
        items: [
          { id: '10-6', task: '진로체험의 날 운영', priority: 'medium', deadline: '10월 중' },
          { id: '10-7', task: '진로탐색 프로그램', priority: 'medium', deadline: '10월 중' },
        ],
      },
    ],
  },
  '11': {
    title: '11월 업무',
    tasks: [
      {
        category: '학부모',
        icon: Users,
        color: 'text-green-500',
        items: [
          { id: '11-1', task: '학부모 상담주간 운영', priority: 'high', deadline: '11월 중' },
          { id: '11-2', task: '학교운영위원회', priority: 'medium', deadline: '11월 중' },
        ],
      },
      {
        category: '학기말 준비',
        icon: FileText,
        color: 'text-purple-500',
        items: [
          { id: '11-3', task: '2학기 학업성적 산출 준비', priority: 'medium', deadline: '11월 말' },
          { id: '11-4', task: '생활기록부 정리', priority: 'medium', deadline: '11월 말' },
        ],
      },
      {
        category: '안전교육',
        icon: AlertCircle,
        color: 'text-red-500',
        items: [
          { id: '11-5', task: '화재안전교육', priority: 'high', deadline: '11월 중' },
          { id: '11-6', task: '겨울철 안전교육', priority: 'medium', deadline: '11월 말' },
        ],
      },
    ],
  },
  '12': {
    title: '12월 업무',
    tasks: [
      {
        category: '학년말 평가',
        icon: FileText,
        color: 'text-purple-500',
        items: [
          { id: '12-1', task: '2학기/학년말 학업성적 산출', priority: 'high', deadline: '12월 중' },
          { id: '12-2', task: '생활기록부 최종 입력', priority: 'high', deadline: '방학 전' },
          { id: '12-3', task: '생활통지표 작성', priority: 'high', deadline: '방학식' },
        ],
      },
      {
        category: '학년말 정리',
        icon: GraduationCap,
        color: 'text-blue-500',
        items: [
          { id: '12-4', task: '겨울방학식', priority: 'high', deadline: '12월 말' },
          { id: '12-5', task: '학급 물품 정리', priority: 'medium', deadline: '방학식' },
          { id: '12-6', task: '차년도 업무 계획', priority: 'medium', deadline: '12월 말' },
        ],
      },
      {
        category: '연말 행사',
        icon: Star,
        color: 'text-yellow-500',
        items: [
          { id: '12-7', task: '송년 행사', priority: 'low', deadline: '12월 말' },
          { id: '12-8', task: '성탄절 계기교육', priority: 'low', deadline: '12월 25일' },
        ],
      },
    ],
  },
};

interface TaskCategory {
  category: string;
  icon: typeof ClipboardList;
  color: string;
  items: TaskItem[];
}

interface TaskItem {
  id: string;
  task: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
}

const priorityConfig = {
  high: { label: '높음', color: 'bg-red-100 text-red-700 border-red-200' },
  medium: { label: '보통', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  low: { label: '낮음', color: 'bg-green-100 text-green-700 border-green-200' },
};

export default function MonthlyTasksPage() {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(String(currentMonth));
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const monthData = monthlyTasksData[selectedMonth];

  const toggleTask = useCallback((taskId: string) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  }, []);

  const stats = useMemo(() => {
    if (!monthData) return { total: 0, completed: 0, percentage: 0 };
    const allTasks = monthData.tasks.flatMap((cat) => cat.items);
    const total = allTasks.length;
    const completed = allTasks.filter((t) => completedTasks.has(t.id)).length;
    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [monthData, completedTasks]);

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" />
            월별 업무 체크리스트
          </h1>
          <p className="text-muted-foreground">
            초등교사 월별 필수 업무를 확인하세요
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {monthNames.map((name, idx) => (
                <SelectItem key={idx + 1} value={String(idx + 1)}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Progress Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">{monthData?.title || `${selectedMonth}월 업무`}</h3>
              <p className="text-sm text-muted-foreground">
                {stats.completed}/{stats.total} 완료
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-primary">{stats.percentage}%</span>
              <p className="text-sm text-muted-foreground">달성률</p>
            </div>
          </div>
          <Progress value={stats.percentage} className="h-3" />
        </CardContent>
      </Card>

      {/* Task Categories */}
      {monthData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {monthData.tasks.map((category) => {
            const Icon = category.icon;
            const categoryCompleted = category.items.filter((t) =>
              completedTasks.has(t.id)
            ).length;

            return (
              <Card key={category.category}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn('p-2 rounded-lg bg-accent', category.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span>{category.category}</span>
                    </div>
                    <Badge variant="outline">
                      {categoryCompleted}/{category.items.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item) => {
                      const isCompleted = completedTasks.has(item.id);
                      const priority = priorityConfig[item.priority];

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            'flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer',
                            isCompleted
                              ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                              : 'hover:bg-accent/50'
                          )}
                          onClick={() => toggleTask(item.id)}
                        >
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => toggleTask(item.id)}
                            className="mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                'font-medium',
                                isCompleted && 'line-through text-muted-foreground'
                              )}
                            >
                              {item.task}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={cn('text-xs', priority.color)}>
                                {priority.label}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.deadline}
                              </span>
                            </div>
                          </div>
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">해당 월의 업무 데이터가 없습니다.</p>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">업무 TIP</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                <li>• 우선순위가 높은 업무부터 처리하세요</li>
                <li>• 마감일을 캘린더에 등록하여 관리하세요</li>
                <li>• 완료한 업무는 체크하여 진행 상황을 파악하세요</li>
                <li>• 학교별로 일정이 다를 수 있으니 학사일정을 확인하세요</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
