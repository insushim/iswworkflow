'use client';

import { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Info,
  ListChecks,
  Lightbulb,
  ExternalLink,
  Scale,
  Shield,
  BookMarked,
  MonitorSmartphone,
  ArrowRight,
  Link2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { monthlyTasksDatabase, type MonthlyTask } from '@/data/education-database';
import {
  ENHANCED_TEACHER_DB,
  getEnhancedMonthlyTasks,
  getRequiredTrainings,
} from '@/data/teacher-enhanced-db';

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
  neisPath?: string;
  legalBasis?: string;
  isEnhanced?: boolean;
}

const priorityConfig = {
  high: { label: '높음', color: 'bg-red-100 text-red-700 border-red-200' },
  medium: { label: '보통', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  low: { label: '낮음', color: 'bg-green-100 text-green-700 border-green-200' },
};

// 월 키 매핑 (숫자 -> 영어 키)
const monthKeyMap: Record<string, string> = {
  '1': 'january', '2': 'february', '3': 'march', '4': 'april',
  '5': 'may', '6': 'june', '7': 'july', '8': 'august',
  '9': 'september', '10': 'october', '11': 'november', '12': 'december',
};

// 법정 의무교육 timing에서 해당 월과 관련 있는지 판단
function isRelevantToMonth(timing: string, month: number): boolean {
  const monthStr = `${month}월`;
  // "3월", "9월" 같은 직접 언급
  if (timing.includes(monthStr)) return true;
  // "3~6월" 같은 범위
  const rangeMatch = timing.match(/(\d+)~(\d+)월/);
  if (rangeMatch) {
    const start = parseInt(rangeMatch[1]);
    const end = parseInt(rangeMatch[2]);
    if (month >= start && month <= end) return true;
  }
  // "연중" - 모든 월에 해당
  if (timing.includes('연중')) return true;
  // 학기 초: 3월, 9월
  if (timing.includes('학기 초') && (month === 3 || month === 9)) return true;
  // 학기말: 6~7월, 12~1월
  if (timing.includes('학기말') && (month === 6 || month === 7 || month === 12 || month === 1)) return true;
  return false;
}

export default function MonthlyTasksPage() {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(String(currentMonth));
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [completedTrainings, setCompletedTrainings] = useState<Set<string>>(new Set());
  const [selectedTask, setSelectedTask] = useState<MonthlyTask | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');

  // 기존 월별 데이터
  const baseMonthData = monthlyTasksData[selectedMonth];

  // Enhanced 월별 보강 업무 가져오기
  const enhancedTasks = useMemo(() => {
    return getEnhancedMonthlyTasks(parseInt(selectedMonth));
  }, [selectedMonth]);

  // 기존 + 보강 업무 합치기
  const monthData = useMemo(() => {
    if (!baseMonthData) return null;

    const mergedTasks = [...baseMonthData.tasks];

    if (enhancedTasks && enhancedTasks.tasks && enhancedTasks.tasks.length > 0) {
      const enhancedItems: TaskItem[] = enhancedTasks.tasks.map((t: { name: string; deadline: string; detail?: string; neisPath?: string; legalBasis?: string }, idx: number) => ({
        id: `enhanced-${selectedMonth}-${idx}`,
        task: t.name,
        priority: 'medium' as const,
        deadline: t.deadline,
        neisPath: t.neisPath,
        legalBasis: t.legalBasis,
        isEnhanced: true,
      }));

      // "보강 업무" 카테고리로 추가
      mergedTasks.push({
        category: '보강 업무 (놓치기 쉬운 업무)',
        icon: Sparkles,
        color: 'text-amber-500',
        items: enhancedItems,
      });
    }

    return {
      title: baseMonthData.title,
      tasks: mergedTasks,
    };
  }, [baseMonthData, enhancedTasks, selectedMonth]);

  // 해당 월 법정 의무교육 필터
  const monthlyMandatoryEd = useMemo(() => {
    const monthNum = parseInt(selectedMonth);
    return ENHANCED_TEACHER_DB.mandatoryEducation.items.filter(item =>
      isRelevantToMonth(item.timing, monthNum)
    );
  }, [selectedMonth]);

  // 교사 필수 연수 데이터
  const teacherTrainings = useMemo(() => {
    return ENHANCED_TEACHER_DB.teacherTraining.items;
  }, []);

  // 데이터베이스에서 선택된 월의 상세 업무 가져오기
  const detailedTasks = useMemo(() => {
    return monthlyTasksDatabase.filter(task => task.month === parseInt(selectedMonth));
  }, [selectedMonth]);

  // 업무명으로 상세 정보 찾기
  const findDetailedTask = useCallback((taskName: string): MonthlyTask | undefined => {
    return detailedTasks.find(t =>
      taskName.includes(t.title) || t.title.includes(taskName) ||
      t.checklist.some(c => taskName.includes(c))
    );
  }, [detailedTasks]);

  const handleTaskClick = useCallback((taskName: string) => {
    const detailed = findDetailedTask(taskName);
    if (detailed) {
      setSelectedTask(detailed);
      setIsDetailOpen(true);
    }
  }, [findDetailedTask]);

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

  const toggleTraining = useCallback((trainingId: string) => {
    setCompletedTrainings((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(trainingId)) {
        newSet.delete(trainingId);
      } else {
        newSet.add(trainingId);
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

  const trainingStats = useMemo(() => {
    const total = teacherTrainings.length;
    const completed = teacherTrainings.filter(t => completedTrainings.has(t.id)).length;
    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [teacherTrainings, completedTrainings]);

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

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2">
        <Link href="/duties-guide">
          <Button variant="outline" size="sm" className="gap-1.5">
            <BookMarked className="h-4 w-4" />
            업무분장 가이드
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
        <Link href="/documents">
          <Button variant="outline" size="sm" className="gap-1.5">
            <FileText className="h-4 w-4" />
            문서 서식
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
        <Link href="/calendar">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Calendar className="h-4 w-4" />
            학사일정
            <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tasks" className="gap-1.5">
            <ListChecks className="h-4 w-4" />
            <span className="hidden sm:inline">월별 업무</span>
            <span className="sm:hidden">업무</span>
          </TabsTrigger>
          <TabsTrigger value="mandatory" className="gap-1.5">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">법정 의무교육</span>
            <span className="sm:hidden">의무교육</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="gap-1.5">
            <BookMarked className="h-4 w-4" />
            <span className="hidden sm:inline">교사 필수연수</span>
            <span className="sm:hidden">필수연수</span>
          </TabsTrigger>
        </TabsList>

        {/* === TAB 1: 월별 업무 체크리스트 === */}
        <TabsContent value="tasks" className="space-y-6 mt-4">
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
                                'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                                isCompleted
                                  ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                                  : 'hover:bg-accent/50',
                                item.isEnhanced && !isCompleted && 'border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/10'
                              )}
                            >
                              <Checkbox
                                checked={isCompleted}
                                onCheckedChange={() => toggleTask(item.id)}
                                className="mt-0.5 cursor-pointer"
                              />
                              <div className="flex-1 min-w-0">
                                <p
                                  className={cn(
                                    'font-medium cursor-pointer',
                                    isCompleted && 'line-through text-muted-foreground'
                                  )}
                                  onClick={() => toggleTask(item.id)}
                                >
                                  {item.task}
                                  {item.isEnhanced && (
                                    <Badge variant="secondary" className="ml-2 text-[10px] px-1.5 py-0">
                                      보강
                                    </Badge>
                                  )}
                                </p>
                                <div className="flex items-center gap-2 mt-1 flex-wrap">
                                  <Badge variant="outline" className={cn('text-xs', priority.color)}>
                                    {priority.label}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {item.deadline}
                                  </span>
                                  {/* NEIS 경로 표시 */}
                                  {item.neisPath && (
                                    <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-300 dark:border-green-800">
                                      <MonitorSmartphone className="h-2.5 w-2.5 mr-0.5" />
                                      NEIS
                                    </Badge>
                                  )}
                                  {/* 법적 근거 표시 */}
                                  {item.legalBasis && (
                                    <Badge variant="outline" className="text-[10px] bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-300 dark:border-purple-800">
                                      <Scale className="h-2.5 w-2.5 mr-0.5" />
                                      법령
                                    </Badge>
                                  )}
                                  {findDetailedTask(item.task) && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleTaskClick(item.task);
                                      }}
                                    >
                                      <Info className="h-3 w-3 mr-1" />
                                      상세보기
                                    </Button>
                                  )}
                                </div>
                                {/* NEIS 경로 펼치기 */}
                                {item.neisPath && (
                                  <div className="mt-1.5 text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded font-mono">
                                    {item.neisPath}
                                  </div>
                                )}
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
        </TabsContent>

        {/* === TAB 2: 법정 의무교육 일정 === */}
        <TabsContent value="mandatory" className="space-y-6 mt-4">
          {/* 해당 월 안내 */}
          <Card className="bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                  <Shield className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-medium text-indigo-900 dark:text-indigo-100">
                    {selectedMonth}월 법정 의무교육 안내
                  </h4>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                    학교안전교육 실시 기준 등에 관한 고시(교육부고시 제2022-2호) 및 개별 법령에 따라
                    이번 달에 실시가 필요하거나 권장되는 법정 의무교육 {monthlyMandatoryEd.length}건이 있습니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {monthlyMandatoryEd.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {monthlyMandatoryEd.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                          <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{item.name}</CardTitle>
                          <CardDescription className="text-xs mt-0.5">
                            {item.targetGrade} | {item.requiredHours}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-800">
                        {item.timing}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {/* 법적 근거 */}
                    <div className="flex items-start gap-2 text-sm">
                      <Scale className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item.legalBasis}</span>
                    </div>

                    {/* 주요 내용 */}
                    <div className="bg-accent/50 p-3 rounded-lg">
                      <h5 className="text-sm font-medium mb-2 flex items-center gap-1.5">
                        <ListChecks className="h-4 w-4 text-blue-500" />
                        주요 교육 내용
                      </h5>
                      <ul className="space-y-1">
                        {item.details.slice(0, 4).map((detail, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                        {item.details.length > 4 && (
                          <li className="text-xs text-blue-600 dark:text-blue-400">
                            ... 외 {item.details.length - 4}건
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* NEIS 경로 */}
                    {item.neisPath && (
                      <div className="flex items-center gap-2 text-xs">
                        <MonitorSmartphone className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                        <code className="bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded font-mono text-xs">
                          {item.neisPath}
                        </code>
                      </div>
                    )}

                    {/* 담당 & 실수 방지 */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        담당: {item.responsiblePerson}
                      </span>
                    </div>

                    {/* 자주 하는 실수 */}
                    {item.commonMistakes && item.commonMistakes.length > 0 && (
                      <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-100 dark:border-red-900">
                        <h5 className="text-xs font-medium text-red-700 dark:text-red-300 mb-1.5 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          자주 하는 실수
                        </h5>
                        <ul className="space-y-1">
                          {item.commonMistakes.map((mistake, idx) => (
                            <li key={idx} className="text-xs text-red-600 dark:text-red-400 flex items-start gap-1">
                              <span>-</span>
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">이번 달에 특별히 예정된 법정 의무교육이 없습니다.</p>
                <p className="text-xs text-muted-foreground mt-1">"연중" 실시 항목은 학교 일정에 맞춰 분산 운영하세요.</p>
              </CardContent>
            </Card>
          )}

          {/* 관련 페이지 링크 */}
          <Card className="bg-accent/30">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Link2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">업무분장 가이드에서 법정 의무교육의 상세 절차를 확인하세요.</span>
                </div>
                <Link href="/duties-guide">
                  <Button variant="outline" size="sm" className="gap-1">
                    상세 절차 보기
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* === TAB 3: 교사 필수 연수 === */}
        <TabsContent value="training" className="space-y-6 mt-4">
          {/* 연수 진행률 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">교사 법정 필수연수 이수 현황</h3>
                  <p className="text-sm text-muted-foreground">
                    {trainingStats.completed}/{trainingStats.total} 이수 완료 (매년 12월 31일까지)
                  </p>
                </div>
                <div className="text-right">
                  <span className={cn(
                    'text-3xl font-bold',
                    trainingStats.percentage === 100 ? 'text-green-500' : 'text-orange-500'
                  )}>
                    {trainingStats.percentage}%
                  </span>
                  <p className="text-sm text-muted-foreground">이수율</p>
                </div>
              </div>
              <Progress
                value={trainingStats.percentage}
                className={cn('h-3', trainingStats.percentage === 100 && '[&>div]:bg-green-500')}
              />
              {trainingStats.percentage < 100 && (
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  미이수 연수 {trainingStats.total - trainingStats.completed}건 - 연말까지 반드시 이수하세요
                </p>
              )}
            </CardContent>
          </Card>

          {/* 연수 목록 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {teacherTrainings.map((training) => {
              const isComplete = completedTrainings.has(training.id);
              return (
                <Card
                  key={training.id}
                  className={cn(
                    'transition-colors',
                    isComplete && 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                  )}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isComplete}
                        onCheckedChange={() => toggleTraining(training.id)}
                        className="mt-1 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={cn(
                            'font-medium text-sm',
                            isComplete && 'line-through text-muted-foreground'
                          )}>
                            {training.name}
                          </h4>
                          {isComplete ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>

                        <div className="mt-2 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 flex-shrink-0" />
                            <span>{training.requiredHours} | {training.deadline}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Scale className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{training.legalBasis}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <BookOpen className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{training.method}</span>
                          </div>
                          {training.neisPath && (
                            <div className="text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded font-mono">
                              {training.neisPath}
                            </div>
                          )}
                          {training.penalty && (
                            <div className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3 flex-shrink-0" />
                              {training.penalty}
                            </div>
                          )}
                        </div>

                        {/* 연수 팁 */}
                        {training.tips && training.tips.length > 0 && (
                          <div className="mt-2 bg-accent/50 p-2 rounded text-xs space-y-0.5">
                            {training.tips.slice(0, 2).map((tip, idx) => (
                              <div key={idx} className="flex items-start gap-1 text-muted-foreground">
                                <Lightbulb className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span>{tip}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* 이수 체크리스트 안내 */}
          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100">연수 이수 TIP</h4>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                    <li>- 상반기(3~6월)에 미리 이수하면 연말 몰림을 방지할 수 있습니다</li>
                    <li>- 이수 후 확인서/이수증을 출력하여 보관하세요</li>
                    <li>- NEIS 개인연수이력에 모두 등록되었는지 확인하세요</li>
                    <li>- 심폐소생술은 온라인으로 대체 불가 (실습 필수)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tips - 월별 업무 탭에서만 표시 */}
      {activeTab === 'tasks' && (
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">업무 TIP</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                  <li>- 우선순위가 높은 업무부터 처리하세요</li>
                  <li>- 마감일을 캘린더에 등록하여 관리하세요</li>
                  <li>- 완료한 업무는 체크하여 진행 상황을 파악하세요</li>
                  <li>- 학교별로 일정이 다를 수 있으니 학사일정을 확인하세요</li>
                  <li>- "보강" 표시된 업무는 놓치기 쉬운 업무이니 특별히 주의하세요</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 업무 상세 정보 Sheet */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedTask && (
            <>
              <SheetHeader className="pb-4 border-b">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      selectedTask.priority === 'high' && 'bg-red-100 text-red-700 border-red-200',
                      selectedTask.priority === 'medium' && 'bg-yellow-100 text-yellow-700 border-yellow-200',
                      selectedTask.priority === 'low' && 'bg-green-100 text-green-700 border-green-200'
                    )}
                  >
                    {selectedTask.priority === 'high' ? '높음' : selectedTask.priority === 'medium' ? '보통' : '낮음'}
                  </Badge>
                  <Badge variant="secondary">{selectedTask.category}</Badge>
                </div>
                <SheetTitle className="text-xl">{selectedTask.title}</SheetTitle>
                <SheetDescription className="text-base">
                  {selectedTask.description}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 py-6">
                {/* 기본 정보 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">마감:</span>
                    <span className="font-medium">{selectedTask.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">담당:</span>
                    <span className="font-medium">{selectedTask.department}</span>
                  </div>
                </div>

                {/* 체크리스트 */}
                <div>
                  <h4 className="flex items-center gap-2 font-semibold mb-3">
                    <ListChecks className="h-5 w-5 text-blue-500" />
                    업무 체크리스트
                  </h4>
                  <div className="space-y-2">
                    {selectedTask.checklist.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                            {idx + 1}
                          </span>
                        </div>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 업무 TIP */}
                {selectedTask.tips && selectedTask.tips.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold mb-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      업무 TIP
                    </h4>
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <ul className="space-y-2">
                        {selectedTask.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* NEIS 메뉴 경로 */}
                {selectedTask.neisMenu && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold mb-3">
                      <ExternalLink className="h-5 w-5 text-green-500" />
                      NEIS 메뉴 경로
                    </h4>
                    <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                      <code className="text-sm font-mono text-green-700 dark:text-green-300">
                        {selectedTask.neisMenu}
                      </code>
                    </div>
                  </div>
                )}

                {/* 법적 근거 */}
                {selectedTask.legalBasis && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold mb-3">
                      <Scale className="h-5 w-5 text-purple-500" />
                      법적 근거
                    </h4>
                    <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        {selectedTask.legalBasis}
                      </p>
                    </div>
                  </div>
                )}

                {/* 관련 문서 */}
                {selectedTask.relatedDocs && selectedTask.relatedDocs.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold mb-3">
                      <FileText className="h-5 w-5 text-orange-500" />
                      관련 문서
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTask.relatedDocs.map((doc, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                    <Link href="/documents" className="inline-block mt-2">
                      <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700 gap-1">
                        <FileText className="h-3 w-3" />
                        문서 서식 페이지에서 양식 다운로드
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                )}

                {/* 관련 페이지 바로가기 */}
                <div className="pt-2">
                  <h4 className="flex items-center gap-2 font-semibold mb-3">
                    <Link2 className="h-5 w-5 text-blue-500" />
                    관련 페이지
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/duties-guide">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-accent transition-colors gap-1"
                      >
                        <BookMarked className="h-3 w-3" />
                        업무분장 상세 절차
                        <ArrowRight className="h-3 w-3" />
                      </Badge>
                    </Link>
                    <Link href="/documents">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-accent transition-colors gap-1"
                      >
                        <FileText className="h-3 w-3" />
                        문서 서식 양식
                        <ArrowRight className="h-3 w-3" />
                      </Badge>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 하단 버튼 */}
              <div className="pt-4 border-t flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsDetailOpen(false)}
                >
                  닫기
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setIsDetailOpen(false);
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  업무 시작하기
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
