'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  BookOpen,
  Clock,
  Calendar,
  FileText,
  Printer,
  Copy,
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Info,
  LayoutGrid,
  Table,
  GraduationCap,
  RefreshCw,
  ClipboardList,
  Target,
  Star,
  FolderOpen,
  X,
  Download,
  Sparkles,
  ListChecks,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useUserSettings } from '@/hooks/useFirestore';
import {
  gradeHoursData,
  textbookUnits,
  monthlyThemes,
  crossCurricularThemes,
  creativeActivities,
  assessmentMethods,
  weeklyScheduleTemplates,
  subjectColors,
  mandatoryEducations,
  annualSchoolEvents,
  SCHOOL_WEEKS,
  type GradeHours,
  type TextbookUnit,
  type MonthlyTheme,
  type CrossCurricularTheme,
  type WeeklyScheduleTemplate,
  type MandatoryEducation,
  type SchoolEvent,
} from '@/data/curriculum-data';
import { curriculumStandards, type CurriculumStandard } from '@/data/curriculum-standards';

// ============================================
// 타입 정의
// ============================================

interface HoursAllocation {
  subjectName: string;
  subjectCode: string;
  standardWeekly: number;
  customWeekly: number;
  annualHours: number;
  minWeekly: number;
  maxWeekly: number;
  category: string;
}

interface TimetableCell {
  subject: string;
  subjectCode: string;
  topic: string;
}

interface WeeklyTimetable {
  [day: string]: TimetableCell[];
}

interface MonthlyPlan {
  month: number;
  units: { subjectCode: string; unitId: string; unitTitle: string }[];
  crossThemes: string[];
  assessments: string[];
  events: string[];
  notes: string;
  status: 'draft' | 'in-progress' | 'complete';
}

interface WeeklyProgressEntry {
  week: number;
  dateRange: string; // "3/4~3/8" 형식
  subjects: {
    subjectName: string;
    unitTitle: string;
    lessonDetail: string;
    hours: number;
  }[];
  events: string;
  notes: string;
}

interface CreativeActivityPlanItem {
  area: '자율·자치활동' | '동아리활동' | '봉사활동' | '진로활동';
  activityName: string;
  hours: number;
  operationMonths: number[];
  description: string;
}

interface MandatoryEducationPlan {
  educationId: string;
  educationName: string;
  category: string;
  targetHours: number;
  plannedHours: number;
  operationMonths: number[];
  notes: string;
}

interface CurriculumPlan {
  id: string;
  name: string;
  grade: number;
  semester: 'first' | 'second' | 'full';
  year: number;
  className: string;
  teacherName: string;
  hoursAllocation: HoursAllocation[];
  weeklyTimetable: WeeklyTimetable;
  monthlyPlans: MonthlyPlan[];
  educationGoals: string[];
  creativeActivities: string[];
  crossThemePlans: string[];
  assessmentPlans: string[];
  weeklyProgress: WeeklyProgressEntry[];
  creativeActivityPlan: CreativeActivityPlanItem[];
  mandatoryEducationPlan: MandatoryEducationPlan[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// 상수
// ============================================

const STORAGE_KEY = 'eduflow_curriculum_plans';

const PERIOD_TIMES = [
  { period: 1, start: '09:00', end: '09:40' },
  { period: 2, start: '09:50', end: '10:30' },
  { period: 3, start: '10:50', end: '11:30' },
  { period: 4, start: '11:40', end: '12:20' },
  { period: 5, start: '13:20', end: '14:00' },
  { period: 6, start: '14:10', end: '14:50' },
];

const DAYS = ['월', '화', '수', '목', '금'];

const MONTHS_SCHOOL_YEAR = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

const CURRENT_YEAR = new Date().getFullYear();

// ============================================
// 유틸리티 함수
// ============================================

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}

function getSubjectColor(subjectName: string) {
  return subjectColors[subjectName] || {
    bg: 'bg-gray-500',
    text: 'text-gray-700',
    border: 'border-gray-300',
    light: 'bg-gray-50',
  };
}

function getGradeData(grade: number): GradeHours | undefined {
  return gradeHoursData.find((g) => g.grade === grade);
}

function getPeriodsForGrade(grade: number): number {
  return grade <= 2 ? 5 : 6;
}

function getRelatedStandards(unit: TextbookUnit): CurriculumStandard[] {
  const gradeGroup: '1-2' | '3-4' | '5-6' = unit.grade <= 2 ? '1-2' : unit.grade <= 4 ? '3-4' : '5-6';
  return curriculumStandards.filter(s =>
    s.subject === unit.subject &&
    s.gradeGroup === gradeGroup &&
    unit.keywords.some(k => s.keywords.includes(k) || s.content.includes(k))
  );
}

function getUnitsForGrade(grade: number, semester?: 'first' | 'second' | 'full'): TextbookUnit[] {
  return textbookUnits.filter((u) => {
    if (u.grade !== grade) return false;
    if (!semester || semester === 'full') return true;
    return semester === 'first' ? u.semester === 1 : u.semester === 2;
  });
}

function createEmptyTimetable(periodsCount: number): WeeklyTimetable {
  const timetable: WeeklyTimetable = {};
  DAYS.forEach((day) => {
    timetable[day] = Array.from({ length: periodsCount }, () => ({
      subject: '',
      subjectCode: '',
      topic: '',
    }));
  });
  return timetable;
}

function createEmptyMonthlyPlans(): MonthlyPlan[] {
  return MONTHS_SCHOOL_YEAR.map((month) => ({
    month,
    units: [],
    crossThemes: [],
    assessments: [],
    events: [],
    notes: '',
    status: 'draft' as const,
  }));
}

function createDefaultPlan(grade: number, semester: 'first' | 'second' | 'full'): CurriculumPlan {
  const gradeData = getGradeData(grade);
  const periodsCount = getPeriodsForGrade(grade);

  const hoursAllocation: HoursAllocation[] = gradeData
    ? gradeData.subjects.map((s) => ({
        subjectName: s.subject,
        subjectCode: s.subject, // Use subject name as code
        standardWeekly: s.weekly,
        customWeekly: s.weekly,
        annualHours: s.annual,
        minWeekly: s.minWeekly,
        maxWeekly: s.maxWeekly,
        category: s.category,
      }))
    : [];

  return {
    id: generateId(),
    name: `${CURRENT_YEAR}학년도 ${grade}학년 교육과정`,
    grade,
    semester,
    year: CURRENT_YEAR,
    className: `${grade}학년 1반`,
    teacherName: '',
    hoursAllocation,
    weeklyTimetable: createEmptyTimetable(periodsCount),
    monthlyPlans: createEmptyMonthlyPlans(),
    educationGoals: [
      '기본 학력을 신장하고 자기주도적 학습 능력을 기른다.',
      '바른 인성과 창의적 사고력을 갖춘 미래 인재를 기른다.',
      '소통과 협력으로 더불어 살아가는 민주 시민을 기른다.',
    ],
    creativeActivities: [],
    crossThemePlans: [],
    assessmentPlans: [],
    weeklyProgress: Array.from({ length: 34 }, (_, i) => ({
      week: i + 1,
      dateRange: '',
      subjects: [],
      events: '',
      notes: '',
    })),
    creativeActivityPlan: [
      { area: '자율·자치활동', activityName: '학급회의/1인1역', hours: 34, operationMonths: [3,4,5,6,7,9,10,11,12], description: '매주 1시간 학급자치' },
      { area: '동아리활동', activityName: '', hours: 34, operationMonths: [3,4,5,6,9,10,11,12], description: '' },
      { area: '봉사활동', activityName: '', hours: 17, operationMonths: [3,4,5,6,9,10,11,12], description: '' },
      { area: '진로활동', activityName: '', hours: 17, operationMonths: [4,5,10,11], description: '' },
    ],
    mandatoryEducationPlan: (typeof mandatoryEducations !== 'undefined' && Array.isArray(mandatoryEducations) ? mandatoryEducations : []).map((me: any) => ({
      educationId: me.id,
      educationName: me.name,
      category: me.category,
      targetHours: me.minimumHours,
      plannedHours: 0,
      operationMonths: me.monthlyRecommendation || [],
      notes: '',
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ============================================
// localStorage 저장/로드
// ============================================

function savePlans(plans: CurriculumPlan[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (e) {
    console.error('교육과정 저장 실패:', e);
  }
}

function loadPlans(): CurriculumPlan[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// ============================================
// 메인 컴포넌트
// ============================================

export default function CurriculumPage() {
  const { settings } = useUserSettings();

  // 전역 상태
  const [plans, setPlans] = useState<CurriculumPlan[]>([]);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(3);
  const [selectedSemester, setSelectedSemester] = useState<'first' | 'second' | 'full'>('full');
  const [activeTab, setActiveTab] = useState('hours');
  const [showPlanList, setShowPlanList] = useState(false);
  const [showNewPlanDialog, setShowNewPlanDialog] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [newClassName, setNewClassName] = useState('');
  const [newTeacherName, setNewTeacherName] = useState('');
  const [isPrintMode, setIsPrintMode] = useState(false);

  // 초기 로드
  useEffect(() => {
    const loaded = loadPlans();
    setPlans(loaded);
    if (loaded.length > 0) {
      setActivePlanId(loaded[0].id);
      setSelectedGrade(loaded[0].grade);
      setSelectedSemester(loaded[0].semester);
    }
  }, []);

  // 사용자 설정에서 학년 가져오기
  useEffect(() => {
    if (settings) {
      const extSettings = settings as unknown as { grade?: number };
      if (extSettings.grade) {
        setSelectedGrade(extSettings.grade);
      }
    }
  }, [settings]);

  // 현재 활성 플랜
  const activePlan = useMemo(() => {
    return plans.find((p) => p.id === activePlanId) || null;
  }, [plans, activePlanId]);

  // 플랜 저장 함수
  const updateActivePlan = useCallback(
    (updates: Partial<CurriculumPlan>) => {
      setPlans((prev) => {
        const updated = prev.map((p) =>
          p.id === activePlanId
            ? { ...p, ...updates, updatedAt: new Date().toISOString() }
            : p
        );
        savePlans(updated);
        return updated;
      });
    },
    [activePlanId]
  );

  // 새 플랜 생성
  const createNewPlan = () => {
    const plan = createDefaultPlan(selectedGrade, selectedSemester);
    plan.name = newPlanName || plan.name;
    plan.className = newClassName || plan.className;
    plan.teacherName = newTeacherName || '';
    setPlans((prev) => {
      const updated = [...prev, plan];
      savePlans(updated);
      return updated;
    });
    setActivePlanId(plan.id);
    setShowNewPlanDialog(false);
    setNewPlanName('');
    setNewClassName('');
    setNewTeacherName('');
    toast.success('새 교육과정 계획이 생성되었습니다.');
  };

  // 플랜 삭제
  const deletePlan = (id: string) => {
    setPlans((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      savePlans(updated);
      if (activePlanId === id) {
        setActivePlanId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
    toast.success('교육과정 계획이 삭제되었습니다.');
  };

  // 학년 변경 시 새 플랜이 없으면 기본 생성
  const handleGradeChange = (grade: string) => {
    const g = parseInt(grade);
    setSelectedGrade(g);
    // 해당 학년 플랜이 없으면 자동 생성
    const existingPlan = plans.find((p) => p.grade === g);
    if (existingPlan) {
      setActivePlanId(existingPlan.id);
      setSelectedSemester(existingPlan.semester);
    }
  };

  // 학기 변경
  const handleSemesterChange = (sem: string) => {
    const semester = sem as 'first' | 'second' | 'full';
    setSelectedSemester(semester);
    if (activePlan) {
      updateActivePlan({ semester });
    }
  };

  // 완료율 계산
  const completionPercent = useMemo(() => {
    if (!activePlan) return 0;
    let total = 0;
    let done = 0;

    // 시수 배당표 체크
    const hasHours = activePlan.hoursAllocation.length > 0;
    total += 1;
    if (hasHours) done += 1;

    // 주간 시간표 체크
    const hasSchedule = Object.values(activePlan.weeklyTimetable).some((day) =>
      day.some((c) => c.subject !== '')
    );
    total += 1;
    if (hasSchedule) done += 1;

    // 월별 계획 체크
    const completedMonths = activePlan.monthlyPlans.filter(
      (m) => m.status === 'complete'
    ).length;
    total += 12;
    done += completedMonths;

    // 교육 목표 체크
    total += 1;
    if (activePlan.educationGoals.some((g) => g.trim() !== '')) done += 1;

    return Math.round((done / total) * 100);
  }, [activePlan]);

  // 학년별 교과 목록
  const gradeSubjects = useMemo(() => {
    const gradeData = getGradeData(selectedGrade);
    return gradeData?.subjects || [];
  }, [selectedGrade]);

  // 현재 학년의 교과서 단원
  const gradeUnits = useMemo(() => {
    return getUnitsForGrade(selectedGrade, selectedSemester);
  }, [selectedGrade, selectedSemester]);

  // 템플릿 로드
  const loadTemplate = (templateId: string) => {
    const template = weeklyScheduleTemplates.find((t) => t.id === templateId);
    if (!template || !activePlan) return;

    const periodsCount = getPeriodsForGrade(selectedGrade);
    const newTimetable = createEmptyTimetable(periodsCount);

    template.schedule.forEach((daySchedule) => {
      const day = daySchedule.day;
      daySchedule.periods.forEach((p) => {
        if (p.period - 1 < periodsCount && newTimetable[day]) {
          newTimetable[day][p.period - 1] = {
            subject: p.subject,
            subjectCode: p.subject, // Use subject as code
            topic: p.topic || '',
          };
        }
      });
    });

    updateActivePlan({ weeklyTimetable: newTimetable });
    toast.success('시간표 템플릿이 적용되었습니다.');
  };

  // 주간 시간표에서 교과별 시수 집계
  const timetableHoursSummary = useMemo(() => {
    if (!activePlan) return {};
    const summary: Record<string, number> = {};
    Object.values(activePlan.weeklyTimetable).forEach((day) => {
      day.forEach((cell) => {
        if (cell.subject) {
          summary[cell.subject] = (summary[cell.subject] || 0) + 1;
        }
      });
    });
    return summary;
  }, [activePlan]);

  // 시수 검증 경고
  const hoursWarnings = useMemo(() => {
    if (!activePlan) return [];
    const warnings: { subject: string; message: string; type: 'error' | 'warning' }[] = [];

    activePlan.hoursAllocation.forEach((alloc) => {
      const timetableHours = timetableHoursSummary[alloc.subjectName] || 0;
      if (timetableHours > 0 && timetableHours !== alloc.customWeekly) {
        const diff = timetableHours - alloc.customWeekly;
        warnings.push({
          subject: alloc.subjectName,
          message: `${alloc.subjectName}: 시간표(${timetableHours}시간)가 배당(${alloc.customWeekly}시간)과 ${Math.abs(diff)}시간 ${diff > 0 ? '초과' : '부족'}합니다.`,
          type: 'error',
        });
      }
      if (alloc.customWeekly < alloc.minWeekly || alloc.customWeekly > alloc.maxWeekly) {
        warnings.push({
          subject: alloc.subjectName,
          message: `${alloc.subjectName}: 주당 시수(${alloc.customWeekly})가 허용 범위(${alloc.minWeekly}~${alloc.maxWeekly})를 벗어났습니다.`,
          type: 'warning',
        });
      }
    });

    return warnings;
  }, [activePlan, timetableHoursSummary]);

  // ============================================
  // 탭 1: 시수 배당표
  // ============================================

  const HoursAllocationTab = () => {
    if (!activePlan) return null;
    const gradeData = getGradeData(selectedGrade);
    if (!gradeData) return null;

    const totalCustomWeekly = activePlan.hoursAllocation.reduce(
      (sum, a) => sum + a.customWeekly,
      0
    );
    const totalCustomAnnual = activePlan.hoursAllocation.reduce(
      (sum, a) => sum + a.customWeekly * 34,
      0
    );
    const totalStandardWeekly = gradeData.totalWeekly;
    const totalStandardAnnual = gradeData.totalAnnual;

    const handleHoursChange = (index: number, newWeekly: number) => {
      const updated = [...activePlan.hoursAllocation];
      updated[index] = {
        ...updated[index],
        customWeekly: newWeekly,
        annualHours: newWeekly * 34,
      };
      updateActivePlan({ hoursAllocation: updated });
    };

    const resetToStandard = () => {
      const gradeData = getGradeData(selectedGrade);
      if (!gradeData) return;
      const reset = gradeData.subjects.map((s) => ({
        subjectName: s.subject,
        subjectCode: s.subject, // Use subject name as code
        standardWeekly: s.weekly,
        customWeekly: s.weekly,
        annualHours: s.annual,
        minWeekly: s.minWeekly,
        maxWeekly: s.maxWeekly,
        category: s.category,
      }));
      updateActivePlan({ hoursAllocation: reset });
      toast.success('기준 시수로 초기화되었습니다.');
    };

    return (
      <div className="space-y-6">
        {/* 요약 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">주당 총 시수</p>
                  <p className="text-2xl font-bold">{totalCustomWeekly}시간</p>
                </div>
                <div className={cn(
                  'text-sm font-medium px-2 py-1 rounded',
                  totalCustomWeekly === totalStandardWeekly
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
                )}>
                  기준: {totalStandardWeekly}시간
                </div>
              </div>
              <Progress
                value={(totalCustomWeekly / totalStandardWeekly) * 100}
                className="mt-3 h-2"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">연간 총 시수</p>
                  <p className="text-2xl font-bold">{totalCustomAnnual}시간</p>
                </div>
                <div className={cn(
                  'text-sm font-medium px-2 py-1 rounded',
                  totalCustomAnnual === totalStandardAnnual
                    ? 'bg-green-100 text-green-700'
                    : 'bg-orange-100 text-orange-700'
                )}>
                  기준: {totalStandardAnnual}시간
                </div>
              </div>
              <Progress
                value={(totalCustomAnnual / totalStandardAnnual) * 100}
                className="mt-3 h-2"
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">교과 수</p>
                  <p className="text-2xl font-bold">{activePlan.hoursAllocation.length}개</p>
                </div>
                <Button variant="outline" size="sm" onClick={resetToStandard}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  초기화
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 시수 배당 테이블 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Table className="h-5 w-5" />
              {selectedGrade}학년 시수 배당표
            </CardTitle>
            <CardDescription>
              주당 시수를 조정하면 연간 시수가 자동 계산됩니다. 기준 범위를 벗어나면 경고가 표시됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-4 font-semibold">교과</th>
                    <th className="text-center py-3 px-3 font-semibold">기준(주)</th>
                    <th className="text-center py-3 px-3 font-semibold">편성(주)</th>
                    <th className="text-center py-3 px-3 font-semibold">연간 시수</th>
                    <th className="text-center py-3 px-3 font-semibold">허용 범위</th>
                    <th className="text-center py-3 px-3 font-semibold">비교</th>
                  </tr>
                </thead>
                <tbody>
                  {activePlan.hoursAllocation.map((alloc, idx) => {
                    const color = getSubjectColor(alloc.subjectName);
                    const diff = alloc.customWeekly - alloc.standardWeekly;
                    const isOutOfRange =
                      alloc.customWeekly < alloc.minWeekly ||
                      alloc.customWeekly > alloc.maxWeekly;
                    return (
                      <tr
                        key={alloc.subjectCode}
                        className={cn(
                          'border-b transition-colors hover:bg-muted/30',
                          isOutOfRange && 'bg-red-50/50 dark:bg-red-950/20'
                        )}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'w-3 h-3 rounded-full',
                                color.bg
                              )}
                            />
                            <span className="font-medium">{alloc.subjectName}</span>
                            {alloc.category === 'creative' && (
                              <Badge variant="secondary" className="text-[10px] px-1">
                                창체
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="text-center py-3 px-3 text-muted-foreground">
                          {alloc.standardWeekly}
                        </td>
                        <td className="text-center py-3 px-3">
                          <div className="flex items-center justify-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                handleHoursChange(idx, Math.max(0, alloc.customWeekly - 1))
                              }
                            >
                              -
                            </Button>
                            <span className={cn(
                              'w-8 text-center font-bold',
                              isOutOfRange ? 'text-red-600' : ''
                            )}>
                              {alloc.customWeekly}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleHoursChange(idx, alloc.customWeekly + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="text-center py-3 px-3 font-medium">
                          {alloc.customWeekly * 34}
                        </td>
                        <td className="text-center py-3 px-3 text-muted-foreground text-xs">
                          {alloc.minWeekly}~{alloc.maxWeekly}
                        </td>
                        <td className="text-center py-3 px-3">
                          {diff === 0 ? (
                            <Badge variant="secondary" className="text-xs">기준</Badge>
                          ) : diff > 0 ? (
                            <Badge className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-100">
                              +{diff}
                            </Badge>
                          ) : (
                            <Badge className="text-xs bg-orange-100 text-orange-700 hover:bg-orange-100">
                              {diff}
                            </Badge>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/50 font-semibold">
                    <td className="py-3 px-4">합계</td>
                    <td className="text-center py-3 px-3">{totalStandardWeekly}</td>
                    <td className="text-center py-3 px-3">
                      <span className={cn(
                        totalCustomWeekly !== totalStandardWeekly && 'text-red-600'
                      )}>
                        {totalCustomWeekly}
                      </span>
                    </td>
                    <td className="text-center py-3 px-3">{totalCustomAnnual}</td>
                    <td className="text-center py-3 px-3">-</td>
                    <td className="text-center py-3 px-3">
                      {totalCustomWeekly === totalStandardWeekly ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-orange-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 시각적 교과 카드 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5" />
              교과별 시수 비율
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {activePlan.hoursAllocation.map((alloc) => {
                const color = getSubjectColor(alloc.subjectName);
                const percent = Math.round(
                  (alloc.customWeekly / totalCustomWeekly) * 100
                );
                return (
                  <div
                    key={alloc.subjectCode}
                    className={cn(
                      'rounded-lg border p-3 transition-all',
                      color.bg,
                      color.border
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn('w-2.5 h-2.5 rounded-full', color.bg)} />
                      <span className={cn('text-sm font-semibold', color.text)}>
                        {alloc.subjectName}
                      </span>
                    </div>
                    <div className="text-xl font-bold">{alloc.customWeekly}시간</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      연간 {alloc.customWeekly * 34}시간 ({percent}%)
                    </div>
                    <Progress value={percent} className="mt-2 h-1.5" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // ============================================
  // 탭 2: 주간 시간표
  // ============================================

  const WeeklyTimetableTab = () => {
    if (!activePlan) return null;
    const periodsCount = getPeriodsForGrade(selectedGrade);
    const periods = PERIOD_TIMES.slice(0, periodsCount);

    const templates = weeklyScheduleTemplates.filter(
      (t) => t.grade === selectedGrade
    );

    const updateCell = (day: string, periodIdx: number, updates: Partial<TimetableCell>) => {
      const newTimetable = { ...activePlan.weeklyTimetable };
      const dayArray = [...(newTimetable[day] || [])];
      dayArray[periodIdx] = { ...dayArray[periodIdx], ...updates };
      newTimetable[day] = dayArray;
      updateActivePlan({ weeklyTimetable: newTimetable });
    };

    const clearTimetable = () => {
      updateActivePlan({ weeklyTimetable: createEmptyTimetable(periodsCount) });
      toast.success('시간표가 초기화되었습니다.');
    };

    return (
      <div className="space-y-6">
        {/* 도구 바 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-3">
              {templates.length > 0 && (
                <Select onValueChange={loadTemplate}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="템플릿에서 불러오기" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button variant="outline" size="sm" onClick={clearTimetable}>
                <RefreshCw className="h-4 w-4 mr-1" />
                시간표 초기화
              </Button>
              <div className="flex-1" />
              {hoursWarnings.length > 0 && (
                <Badge variant="destructive" className="text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {hoursWarnings.length}건 불일치
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 시수 검증 경고 */}
        {hoursWarnings.length > 0 && (
          <Card className="border-orange-200 dark:border-orange-800">
            <CardContent className="pt-4 pb-4">
              <div className="space-y-2">
                {hoursWarnings.map((w, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-2 text-sm',
                      w.type === 'error' ? 'text-red-600' : 'text-orange-600'
                    )}
                  >
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    {w.message}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 시간표 그리드 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              주간 시간표
            </CardTitle>
            <CardDescription>
              각 셀을 클릭하여 교과와 수업 주제를 입력하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="w-[100px] border bg-muted/50 py-2 px-3 text-left font-semibold">
                      교시
                    </th>
                    {DAYS.map((day) => (
                      <th
                        key={day}
                        className="border bg-muted/50 py-2 px-3 text-center font-semibold min-w-[140px]"
                      >
                        {day}요일
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {periods.map((period, pIdx) => (
                    <React.Fragment key={pIdx}>
                      <tr>
                        <td className="border bg-muted/30 py-2 px-3">
                          <div className="font-medium">{period.period}교시</div>
                          <div className="text-[10px] text-muted-foreground">
                            {period.start}-{period.end}
                          </div>
                        </td>
                        {DAYS.map((day) => {
                          const cell =
                            activePlan.weeklyTimetable[day]?.[pIdx] || {
                              subject: '',
                              subjectCode: '',
                              topic: '',
                            };
                          const cellColor = cell.subject
                            ? getSubjectColor(cell.subject)
                            : null;
                          return (
                            <td
                              key={day}
                              className={cn(
                                'border p-1 transition-colors',
                                cellColor?.bg
                              )}
                            >
                              <Select
                                value={cell.subject || 'empty'}
                                onValueChange={(val) => {
                                  const subj =
                                    val === 'empty' ? '' : val;
                                  const code =
                                    gradeSubjects.find(
                                      (s) => s.subject === subj
                                    )?.subject || '';
                                  updateCell(day, pIdx, {
                                    subject: subj,
                                    subjectCode: code,
                                  });
                                }}
                              >
                                <SelectTrigger className={cn(
                                  'h-8 text-xs border-0 bg-transparent shadow-none focus:ring-0',
                                  cellColor?.text,
                                  cell.subject ? 'font-semibold' : 'text-muted-foreground'
                                )}>
                                  <SelectValue placeholder="교과 선택" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="empty">
                                    <span className="text-muted-foreground">
                                      -- 선택 --
                                    </span>
                                  </SelectItem>
                                  {gradeSubjects.map((s) => {
                                    const sc = getSubjectColor(s.subject);
                                    return (
                                      <SelectItem key={s.subject} value={s.subject}>
                                        <div className="flex items-center gap-2">
                                          <div className={cn('w-2 h-2 rounded-full', sc.bg)} />
                                          {s.subject}
                                        </div>
                                      </SelectItem>
                                    );
                                  })}
                                </SelectContent>
                              </Select>
                              {cell.subject && (
                                <Input
                                  value={cell.topic}
                                  onChange={(e) =>
                                    updateCell(day, pIdx, {
                                      topic: e.target.value,
                                    })
                                  }
                                  placeholder="주제"
                                  className="h-6 text-[10px] mt-0.5 border-0 bg-transparent shadow-none px-2 placeholder:text-muted-foreground/50 focus-visible:ring-0"
                                />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                      {/* 점심 시간 (4교시 후) */}
                      {pIdx === 3 && (
                        <tr>
                          <td
                            colSpan={6}
                            className="border bg-amber-50 dark:bg-amber-950/20 py-1.5 px-3 text-center text-xs text-amber-700 dark:text-amber-400 font-medium"
                          >
                            점심시간 (12:20 ~ 13:20)
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 교과별 시수 집계 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              시간표 교과별 시수 집계
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {activePlan.hoursAllocation.map((alloc) => {
                const actual = timetableHoursSummary[alloc.subjectName] || 0;
                const isMatch = actual === alloc.customWeekly;
                const color = getSubjectColor(alloc.subjectName);
                return (
                  <div
                    key={alloc.subjectCode}
                    className={cn(
                      'rounded-lg border p-2 text-center text-sm',
                      isMatch
                        ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20'
                        : actual === 0
                        ? 'border-gray-200'
                        : 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20'
                    )}
                  >
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <div className={cn('w-2 h-2 rounded-full', color.bg)} />
                      <span className="font-medium text-xs">{alloc.subjectName}</span>
                    </div>
                    <div className="text-lg font-bold">
                      {actual}/{alloc.customWeekly}
                    </div>
                    {isMatch ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mx-auto mt-0.5" />
                    ) : actual > 0 ? (
                      <AlertTriangle className="h-3.5 w-3.5 text-red-500 mx-auto mt-0.5" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // ============================================
  // 탭 3: 교육과정 편성
  // ============================================

  const CurriculumPlanningTab = () => {
    if (!activePlan) return null;
    const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
    const [editingMonth, setEditingMonth] = useState<number | null>(null);

    const getMonthTheme = (month: number): MonthlyTheme | undefined => {
      return monthlyThemes.find((t) => t.month === month);
    };

    const getUnitsForMonth = (month: number): TextbookUnit[] => {
      // TextbookUnit doesn't have expectedMonth, return all units for now
      return gradeUnits;
    };

    const updateMonthlyPlan = (month: number, updates: Partial<MonthlyPlan>) => {
      const newPlans = activePlan.monthlyPlans.map((mp) =>
        mp.month === month ? { ...mp, ...updates } : mp
      );
      updateActivePlan({ monthlyPlans: newPlans });
    };

    const toggleUnit = (month: number, unit: TextbookUnit) => {
      const plan = activePlan.monthlyPlans.find((mp) => mp.month === month);
      if (!plan) return;
      const exists = plan.units.some((u) => u.unitId === unit.id);
      const newUnits = exists
        ? plan.units.filter((u) => u.unitId !== unit.id)
        : [
            ...plan.units,
            {
              subjectCode: unit.subject,
              unitId: unit.id,
              unitTitle: `${unit.subject} ${unit.unitNumber}단원: ${unit.title}`,
            },
          ];
      updateMonthlyPlan(month, { units: newUnits });
    };

    const toggleCrossTheme = (month: number, themeId: string) => {
      const plan = activePlan.monthlyPlans.find((mp) => mp.month === month);
      if (!plan) return;
      const exists = plan.crossThemes.includes(themeId);
      const newThemes = exists
        ? plan.crossThemes.filter((t) => t !== themeId)
        : [...plan.crossThemes, themeId];
      updateMonthlyPlan(month, { crossThemes: newThemes });
    };

    const statusColors = {
      draft: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
      'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      complete: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    };

    const statusLabels = {
      draft: '미작성',
      'in-progress': '작성중',
      complete: '완료',
    };

    return (
      <div className="space-y-4">
        {/* 진행 상태 요약 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">월별 편성 진행률</span>
              <span className="text-sm text-muted-foreground">
                {activePlan.monthlyPlans.filter((m) => m.status === 'complete').length}/
                {MONTHS_SCHOOL_YEAR.length} 완료
              </span>
            </div>
            <div className="grid grid-cols-12 gap-1.5">
              {MONTHS_SCHOOL_YEAR.map((month) => {
                const plan = activePlan.monthlyPlans.find((m) => m.month === month);
                return (
                  <div
                    key={month}
                    className={cn(
                      'text-center py-1.5 rounded text-xs font-medium cursor-pointer transition-colors',
                      plan?.status === 'complete'
                        ? 'bg-green-500 text-white'
                        : plan?.status === 'in-progress'
                        ? 'bg-blue-500 text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                    onClick={() =>
                      setExpandedMonth(expandedMonth === month ? null : month)
                    }
                  >
                    {month}월
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 창의적 체험활동 연간 계획 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              창의적 체험활동 연간 계획
            </CardTitle>
            <CardDescription>자율/동아리/봉사/진로 4영역의 연간 시수와 활동을 편성합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-2 px-3 font-semibold">영역</th>
                    <th className="text-left py-2 px-3 font-semibold">활동명</th>
                    <th className="text-center py-2 px-3 font-semibold w-[80px]">시수</th>
                    <th className="text-left py-2 px-3 font-semibold">운영 시기</th>
                    <th className="text-left py-2 px-3 font-semibold">비고</th>
                  </tr>
                </thead>
                <tbody>
                  {(activePlan.creativeActivityPlan || []).map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-3 font-medium whitespace-nowrap">
                        <Badge variant="outline">{item.area}</Badge>
                      </td>
                      <td className="py-2 px-3">
                        <Input
                          value={item.activityName}
                          onChange={(e) => {
                            const updated = [...(activePlan.creativeActivityPlan || [])];
                            updated[idx] = { ...updated[idx], activityName: e.target.value };
                            updateActivePlan({ creativeActivityPlan: updated });
                          }}
                          placeholder="활동명 입력"
                          className="h-8 text-sm"
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <Input
                          type="number"
                          value={item.hours}
                          onChange={(e) => {
                            const updated = [...(activePlan.creativeActivityPlan || [])];
                            updated[idx] = { ...updated[idx], hours: parseInt(e.target.value) || 0 };
                            updateActivePlan({ creativeActivityPlan: updated });
                          }}
                          className="h-8 text-sm text-center w-[60px]"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex flex-wrap gap-1">
                          {MONTHS_SCHOOL_YEAR.map(m => {
                            const isSelected = item.operationMonths.includes(m);
                            return (
                              <div
                                key={m}
                                className={cn(
                                  'w-7 h-7 rounded text-xs flex items-center justify-center cursor-pointer transition-colors',
                                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                )}
                                onClick={() => {
                                  const updated = [...(activePlan.creativeActivityPlan || [])];
                                  const months = isSelected
                                    ? item.operationMonths.filter(x => x !== m)
                                    : [...item.operationMonths, m];
                                  updated[idx] = { ...updated[idx], operationMonths: months };
                                  updateActivePlan({ creativeActivityPlan: updated });
                                }}
                              >
                                {m}
                              </div>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-2 px-3">
                        <Input
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...(activePlan.creativeActivityPlan || [])];
                            updated[idx] = { ...updated[idx], description: e.target.value };
                            updateActivePlan({ creativeActivityPlan: updated });
                          }}
                          placeholder="비고"
                          className="h-8 text-sm"
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-muted/50 font-semibold">
                    <td className="py-2 px-3" colSpan={2}>합계</td>
                    <td className="py-2 px-3 text-center">
                      {(activePlan.creativeActivityPlan || []).reduce((s, i) => s + i.hours, 0)}시간
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 법정필수교육 시수 현황 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              법정필수교육 시수 현황
            </CardTitle>
            <CardDescription>안전교육 51시간, 성교육 15시간 등 법정 의무교육 시수를 관리합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            {['안전교육', '보건교육', '인성교육', '기타필수교육'].map(category => {
              const items = (activePlan.mandatoryEducationPlan || []).filter(p => p.category === category);
              if (items.length === 0) return null;
              const totalTarget = items.reduce((s, i) => s + i.targetHours, 0);
              const totalPlanned = items.reduce((s, i) => s + i.plannedHours, 0);
              return (
                <div key={category} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold flex items-center gap-2">
                      {category}
                      {category === '안전교육' && <Badge variant="destructive" className="text-[10px]">51시간 필수</Badge>}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Progress value={totalTarget > 0 ? (totalPlanned / totalTarget) * 100 : 0} className="w-24 h-2" />
                      <span className={cn('text-xs font-medium', totalPlanned >= totalTarget ? 'text-green-600' : 'text-orange-600')}>
                        {totalPlanned}/{totalTarget}시간
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {items.map((item) => {
                      const globalIdx = (activePlan.mandatoryEducationPlan || []).indexOf(item);
                      const percent = item.targetHours > 0 ? Math.round((item.plannedHours / item.targetHours) * 100) : 0;
                      return (
                        <div key={item.educationId} className={cn(
                          'rounded-lg border p-3 text-sm',
                          percent >= 100 ? 'border-green-200 bg-green-50/50' : percent > 0 ? 'border-blue-200 bg-blue-50/50' : ''
                        )}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-xs">{item.educationName}</span>
                            <div className="flex items-center gap-1">
                              <Input
                                type="number"
                                value={item.plannedHours}
                                onChange={(e) => {
                                  const updated = [...(activePlan.mandatoryEducationPlan || [])];
                                  updated[globalIdx] = { ...updated[globalIdx], plannedHours: parseInt(e.target.value) || 0 };
                                  updateActivePlan({ mandatoryEducationPlan: updated });
                                }}
                                className="h-6 w-[50px] text-xs text-center"
                              />
                              <span className="text-xs text-muted-foreground">/{item.targetHours}h</span>
                              {percent >= 100 && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
                            </div>
                          </div>
                          <Progress value={Math.min(percent, 100)} className="h-1.5" />
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.operationMonths.map(m => (
                              <span key={m} className="text-[10px] text-muted-foreground">{m}월</span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {(activePlan.mandatoryEducationPlan || []).length === 0 && (
              <div className="text-sm text-muted-foreground text-center py-4">
                법정필수교육 데이터가 아직 로드되지 않았습니다. curriculum-data에 mandatoryEducations를 추가하면 자동으로 표시됩니다.
              </div>
            )}
          </CardContent>
        </Card>

        {/* 월별 카드 */}
        {MONTHS_SCHOOL_YEAR.map((month) => {
          const plan = activePlan.monthlyPlans.find((m) => m.month === month);
          const theme = getMonthTheme(month);
          const suggestedUnits = getUnitsForMonth(month);
          const isExpanded = expandedMonth === month;

          if (!plan) return null;

          return (
            <Card
              key={month}
              className={cn(
                'transition-all',
                isExpanded && 'ring-2 ring-primary/30'
              )}
            >
              <CardHeader
                className="cursor-pointer"
                onClick={() =>
                  setExpandedMonth(isExpanded ? null : month)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {month}월
                        {theme && (
                          <span className="text-sm font-normal text-muted-foreground">
                            - {theme.name}
                          </span>
                        )}
                      </CardTitle>
                      {theme && theme.themes.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {theme.themes.slice(0, 3).map((st, i) => (
                            <Badge key={i} variant="outline" className="text-[10px]">
                              {st}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn('text-xs', statusColors[plan.status])}>
                      {statusLabels[plan.status]}
                    </Badge>
                    {plan.units.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {plan.units.length}단원
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="space-y-4 pt-0">
                  {/* 월 주제/행사 */}
                  {theme && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg bg-muted/30">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">
                          범교과 주제
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {theme.crossCurricular.map((d, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {d}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">
                          학교 행사
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {theme.events.map((e, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {e}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 교과 단원 배정 */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      교과 단원 배정
                    </h4>
                    {suggestedUnits.length > 0 ? (
                      <div className="space-y-1.5">
                        {/* 교과별 그룹핑 */}
                        {Array.from(
                          new Set(suggestedUnits.map((u) => u.subject))
                        ).map((subject) => {
                          const subjectUnits = suggestedUnits.filter(
                            (u) => u.subject === subject
                          );
                          const color = getSubjectColor(subject);
                          return (
                            <div key={subject} className="space-y-1">
                              <div className="flex items-center gap-1.5">
                                <div className={cn('w-2 h-2 rounded-full', color.bg)} />
                                <span className={cn('text-xs font-semibold', color.text)}>
                                  {subject}
                                </span>
                              </div>
                              {subjectUnits.map((unit) => {
                                const isSelected = plan.units.some(
                                  (u) => u.unitId === unit.id
                                );
                                const relatedStds = getRelatedStandards(unit);
                                return (
                                  <div key={unit.id} className="ml-4">
                                    <div
                                      className={cn(
                                        'flex items-center gap-2 p-1.5 rounded text-sm cursor-pointer transition-colors',
                                        isSelected
                                          ? cn(color.bg, 'ring-1', color.border)
                                          : 'hover:bg-muted/50'
                                      )}
                                      onClick={() => toggleUnit(month, unit)}
                                    >
                                      <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => toggleUnit(month, unit)}
                                        className="h-3.5 w-3.5"
                                      />
                                      <span className="text-xs">
                                        {unit.unitNumber}단원: {unit.title}
                                      </span>
                                      <Badge variant="outline" className="text-[10px] ml-auto">
                                        {unit.hours}차시
                                      </Badge>
                                    </div>
                                    {/* 성취기준 연계 배지 */}
                                    {relatedStds.length > 0 && (
                                      <div className="flex flex-wrap gap-1 ml-6 mt-0.5 mb-1">
                                        {relatedStds.slice(0, 3).map(std => (
                                          <Badge
                                            key={std.id}
                                            variant="outline"
                                            className="text-[9px] px-1.5 py-0 bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-700"
                                            title={std.content}
                                          >
                                            {std.standardCode}
                                          </Badge>
                                        ))}
                                        {relatedStds.length > 3 && (
                                          <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                                            +{relatedStds.length - 3}
                                          </Badge>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        이 월에 해당하는 단원 데이터가 없습니다.
                      </p>
                    )}
                  </div>

                  {/* 범교과 학습주제 */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      범교과 학습주제
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                      {crossCurricularThemes.map((theme) => {
                        const isSelected = plan.crossThemes.includes(theme.id);
                        return (
                          <div
                            key={theme.id}
                            className={cn(
                              'flex items-center gap-2 p-1.5 rounded text-xs cursor-pointer transition-colors',
                              isSelected
                                ? 'bg-primary/10 ring-1 ring-primary/30'
                                : 'hover:bg-muted/50'
                            )}
                            onClick={() => toggleCrossTheme(month, theme.id)}
                          >
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleCrossTheme(month, theme.id)}
                              className="h-3 w-3"
                            />
                            <span>{theme.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 평가 계획 */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <ClipboardList className="h-4 w-4" />
                      평가 계획
                    </h4>
                    <Textarea
                      value={plan.assessments.join('\n')}
                      onChange={(e) =>
                        updateMonthlyPlan(month, {
                          assessments: e.target.value
                            .split('\n')
                            .filter((l) => l.trim()),
                        })
                      }
                      placeholder="평가 계획을 입력하세요 (한 줄에 하나씩)"
                      rows={3}
                      className="text-sm"
                    />
                  </div>

                  {/* 특별 활동/행사 */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      특별 활동/행사 메모
                    </h4>
                    <Textarea
                      value={plan.notes}
                      onChange={(e) =>
                        updateMonthlyPlan(month, { notes: e.target.value })
                      }
                      placeholder="이 달의 특별 활동이나 행사 메모를 입력하세요"
                      rows={2}
                      className="text-sm"
                    />
                  </div>

                  {/* 상태 변경 */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">상태:</span>
                      <Select
                        value={plan.status}
                        onValueChange={(val) =>
                          updateMonthlyPlan(month, {
                            status: val as MonthlyPlan['status'],
                          })
                        }
                      >
                        <SelectTrigger className="h-7 w-[100px] text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">미작성</SelectItem>
                          <SelectItem value="in-progress">작성중</SelectItem>
                          <SelectItem value="complete">완료</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    );
  };

  // ============================================
  // 탭 4: 학급 교육과정 문서
  // ============================================

  const ClassCurriculumDocTab = () => {
    if (!activePlan) return null;

    const handleCopyToClipboard = () => {
      const docContent = generateDocumentText();
      navigator.clipboard.writeText(docContent).then(() => {
        toast.success('교육과정 문서가 클립보드에 복사되었습니다.');
      });
    };

    const handlePrint = () => {
      setIsPrintMode(true);
      // 동적 인쇄 스타일 삽입
      const style = document.createElement('style');
      style.id = 'curriculum-print-style';
      style.textContent = `
        @media print {
          body * { visibility: hidden; }
          .print-content, .print-content * { visibility: visible; }
          .print-content { position: absolute; left: 0; top: 0; width: 100%; }
          .print-content > div { break-inside: avoid; page-break-inside: avoid; margin-bottom: 16px; }
          .print-content table { font-size: 10px !important; }
          @page { margin: 15mm; size: A4; }
        }
      `;
      document.head.appendChild(style);
      setTimeout(() => {
        window.print();
        setIsPrintMode(false);
        document.getElementById('curriculum-print-style')?.remove();
      }, 500);
    };

    const generateDocumentText = (): string => {
      const lines: string[] = [];
      lines.push(`${'='.repeat(60)}`);
      lines.push(`${activePlan.year}학년도 학급 교육과정`);
      lines.push(`${'='.repeat(60)}`);
      lines.push('');
      lines.push(`학급: ${activePlan.className}`);
      lines.push(`담임: ${activePlan.teacherName}`);
      lines.push(`학년: ${activePlan.grade}학년`);
      lines.push('');

      lines.push(`--- 1. 교육 목표 ---`);
      activePlan.educationGoals.forEach((g, i) => {
        lines.push(`  ${i + 1}. ${g}`);
      });
      lines.push('');

      lines.push(`--- 2. 시수 배당표 ---`);
      lines.push(`${'교과'.padEnd(12)}${'주당 시수'.padStart(8)}${'연간 시수'.padStart(8)}`);
      activePlan.hoursAllocation.forEach((a) => {
        lines.push(
          `${a.subjectName.padEnd(12)}${String(a.customWeekly).padStart(8)}${String(a.customWeekly * 34).padStart(8)}`
        );
      });
      const totalW = activePlan.hoursAllocation.reduce((s, a) => s + a.customWeekly, 0);
      lines.push(
        `${'합계'.padEnd(12)}${String(totalW).padStart(8)}${String(totalW * 34).padStart(8)}`
      );
      lines.push('');

      lines.push(`--- 3. 주간 시간표 ---`);
      const periodsCount = getPeriodsForGrade(selectedGrade);
      lines.push(`${'교시'.padEnd(8)}${DAYS.map((d) => d.padEnd(12)).join('')}`);
      for (let i = 0; i < periodsCount; i++) {
        const row = `${(i + 1).toString().padEnd(8)}${DAYS.map((day) => {
          const cell = activePlan.weeklyTimetable[day]?.[i];
          return (cell?.subject || '-').padEnd(12);
        }).join('')}`;
        lines.push(row);
      }
      lines.push('');

      lines.push(`--- 4. 월별 교육과정 편성 ---`);
      MONTHS_SCHOOL_YEAR.forEach((month) => {
        const plan = activePlan.monthlyPlans.find((m) => m.month === month);
        if (!plan) return;
        lines.push(`[${month}월]`);
        if (plan.units.length > 0) {
          plan.units.forEach((u) => lines.push(`  - ${u.unitTitle}`));
        }
        if (plan.crossThemes.length > 0) {
          const themeNames = plan.crossThemes
            .map((id) => crossCurricularThemes.find((t) => t.id === id)?.name)
            .filter(Boolean);
          lines.push(`  범교과: ${themeNames.join(', ')}`);
        }
        if (plan.assessments.length > 0) {
          lines.push(`  평가: ${plan.assessments.join(', ')}`);
        }
        if (plan.notes) {
          lines.push(`  비고: ${plan.notes}`);
        }
        lines.push('');
      });

      lines.push(`--- 5. 창의적 체험활동 연간 계획 ---`);
      if ((activePlan.creativeActivityPlan || []).length > 0) {
        lines.push(`${'영역'.padEnd(16)}${'활동명'.padEnd(20)}${'시수'.padStart(6)}${'  운영시기'}`);
        (activePlan.creativeActivityPlan || []).forEach((item) => {
          const monthsStr = item.operationMonths.map(m => `${m}월`).join(',');
          lines.push(`${item.area.padEnd(16)}${(item.activityName || '-').padEnd(20)}${String(item.hours).padStart(6)}  ${monthsStr}`);
          if (item.description) {
            lines.push(`    비고: ${item.description}`);
          }
        });
        const totalHours = (activePlan.creativeActivityPlan || []).reduce((s, i) => s + i.hours, 0);
        lines.push(`${'합계'.padEnd(36)}${String(totalHours).padStart(6)}시간`);
      } else {
        creativeActivities
          .filter((ca) => ca.recommendedGrades.includes(selectedGrade))
          .forEach((ca) => {
            lines.push(`  [${ca.area}] ${ca.name}`);
            lines.push(`    ${ca.description}`);
            if (ca.examples.length > 0) {
              lines.push(`    예시: ${ca.examples.slice(0, 3).join(', ')}`);
            }
          });
      }
      lines.push('');

      lines.push(`--- 6. 법정필수교육 시수 현황 ---`);
      if ((activePlan.mandatoryEducationPlan || []).length > 0) {
        ['안전교육', '보건교육', '인성교육', '기타필수교육'].forEach(category => {
          const items = (activePlan.mandatoryEducationPlan || []).filter(p => p.category === category);
          if (items.length === 0) return;
          lines.push(`  [${category}]`);
          items.forEach(item => {
            const status = item.plannedHours >= item.targetHours ? '(완료)' : `(${item.plannedHours}/${item.targetHours}시간)`;
            lines.push(`    ${item.educationName}: ${status}`);
          });
        });
      } else {
        lines.push('  (법정필수교육 데이터 미설정)');
      }
      lines.push('');

      lines.push(`--- 7. 범교과 학습주제 운영 계획 ---`);
      crossCurricularThemes.forEach((theme) => {
        const planned = activePlan.monthlyPlans.filter((mp) =>
          mp.crossThemes.includes(theme.id)
        );
        if (planned.length > 0) {
          lines.push(
            `  ${theme.name}: ${planned.map((p) => `${p.month}월`).join(', ')}`
          );
        }
      });
      lines.push('');

      lines.push(`--- 8. 평가 계획 ---`);
      const methods = assessmentMethods.filter((a) =>
        a.applicableGrades.includes(selectedGrade)
      );
      if (methods.length > 0) {
        methods.forEach((m) => {
          lines.push(`  - ${m.type}: ${m.name} - ${m.description}`);
        });
      }

      return lines.join('\n');
    };

    const updateGoal = (index: number, value: string) => {
      const newGoals = [...activePlan.educationGoals];
      newGoals[index] = value;
      updateActivePlan({ educationGoals: newGoals });
    };

    const addGoal = () => {
      updateActivePlan({
        educationGoals: [...activePlan.educationGoals, ''],
      });
    };

    const removeGoal = (index: number) => {
      const newGoals = activePlan.educationGoals.filter((_, i) => i !== index);
      updateActivePlan({ educationGoals: newGoals });
    };

    return (
      <div className="space-y-6">
        {/* 도구 바 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard}>
                <Copy className="h-4 w-4 mr-1" />
                클립보드 복사
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                인쇄하기
              </Button>
              <Button variant="outline" size="sm" onClick={exportToExcel}>
                <Download className="h-4 w-4 mr-1" />
                엑셀 내보내기
              </Button>
              <div className="flex-1" />
              <Badge variant="secondary">
                완료율: {completionPercent}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 문서 본문 */}
        <div className={cn('space-y-6', isPrintMode && 'print-content')}>
          {/* 1. 학급 교육과정 개요 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                1. 학급 교육과정 개요
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">학년도</Label>
                  <p className="font-medium">{activePlan.year}학년도</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">학급</Label>
                  <Input
                    value={activePlan.className}
                    onChange={(e) => updateActivePlan({ className: e.target.value })}
                    placeholder="예: 3학년 2반"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">담임 교사</Label>
                  <Input
                    value={activePlan.teacherName}
                    onChange={(e) => updateActivePlan({ teacherName: e.target.value })}
                    placeholder="담임 교사 이름"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">학기</Label>
                  <p className="font-medium">
                    {activePlan.semester === 'first'
                      ? '1학기'
                      : activePlan.semester === 'second'
                      ? '2학기'
                      : '전체'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. 교육 목표 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  2. 교육 목표
                </CardTitle>
                <Button variant="outline" size="sm" onClick={addGoal}>
                  <Plus className="h-4 w-4 mr-1" />
                  목표 추가
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {activePlan.educationGoals.map((goal, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-sm font-medium text-muted-foreground mt-2.5 w-6 flex-shrink-0">
                    {idx + 1}.
                  </span>
                  <Textarea
                    value={goal}
                    onChange={(e) => updateGoal(idx, e.target.value)}
                    placeholder="교육 목표를 입력하세요"
                    rows={2}
                    className="flex-1 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0 mt-1"
                    onClick={() => removeGoal(idx)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 3. 시수 배당표 요약 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Table className="h-5 w-5" />
                3. 시수 배당표
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-2 px-3 font-semibold">교과</th>
                      <th className="text-center py-2 px-3 font-semibold">주당 시수</th>
                      <th className="text-center py-2 px-3 font-semibold">연간 시수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePlan.hoursAllocation.map((alloc) => {
                      const color = getSubjectColor(alloc.subjectName);
                      return (
                        <tr key={alloc.subjectCode} className="border-b">
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <div className={cn('w-2.5 h-2.5 rounded-full', color.bg)} />
                              <span>{alloc.subjectName}</span>
                            </div>
                          </td>
                          <td className="text-center py-2 px-3 font-medium">
                            {alloc.customWeekly}
                          </td>
                          <td className="text-center py-2 px-3">
                            {alloc.customWeekly * 34}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className="bg-muted/50 font-semibold">
                      <td className="py-2 px-3">합계</td>
                      <td className="text-center py-2 px-3">
                        {activePlan.hoursAllocation.reduce(
                          (s, a) => s + a.customWeekly,
                          0
                        )}
                      </td>
                      <td className="text-center py-2 px-3">
                        {activePlan.hoursAllocation.reduce(
                          (s, a) => s + a.customWeekly * 34,
                          0
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 4. 주간 시간표 요약 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                4. 주간 시간표
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="border bg-muted/50 py-2 px-3 text-left w-[80px]">교시</th>
                      {DAYS.map((day) => (
                        <th key={day} className="border bg-muted/50 py-2 px-3 text-center">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PERIOD_TIMES.slice(0, getPeriodsForGrade(selectedGrade)).map(
                      (period, pIdx) => (
                        <React.Fragment key={pIdx}>
                          <tr>
                            <td className="border bg-muted/30 py-1.5 px-3 text-xs">
                              {period.period}교시
                              <br />
                              <span className="text-muted-foreground text-[10px]">
                                {period.start}-{period.end}
                              </span>
                            </td>
                            {DAYS.map((day) => {
                              const cell =
                                activePlan.weeklyTimetable[day]?.[pIdx];
                              const color = cell?.subject
                                ? getSubjectColor(cell.subject)
                                : null;
                              return (
                                <td
                                  key={day}
                                  className={cn(
                                    'border py-1.5 px-2 text-center text-xs',
                                    color?.bg
                                  )}
                                >
                                  {cell?.subject ? (
                                    <span className={cn('font-medium', color?.text)}>
                                      {cell.subject}
                                    </span>
                                  ) : (
                                    <span className="text-muted-foreground">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                          {pIdx === 3 && (
                            <tr>
                              <td
                                colSpan={6}
                                className="border bg-amber-50 dark:bg-amber-950/20 py-1 text-center text-[10px] text-amber-700"
                              >
                                점심 (12:20-13:20)
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 5. 교과별 연간 지도 계획 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                5. 교과별 연간 지도 계획
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      <th className="border bg-muted/50 py-2 px-2 text-left">월</th>
                      <th className="border bg-muted/50 py-2 px-2 text-left">교과 단원</th>
                      <th className="border bg-muted/50 py-2 px-2 text-left">범교과</th>
                      <th className="border bg-muted/50 py-2 px-2 text-left">평가</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MONTHS_SCHOOL_YEAR.map((month) => {
                      const plan = activePlan.monthlyPlans.find(
                        (m) => m.month === month
                      );
                      if (!plan) return null;
                      return (
                        <tr key={month} className="border-b">
                          <td className="border py-2 px-2 font-medium text-center align-top">
                            {month}월
                          </td>
                          <td className="border py-2 px-2 align-top">
                            {plan.units.length > 0 ? (
                              <ul className="space-y-0.5">
                                {plan.units.map((u) => (
                                  <li key={u.unitId}>{u.unitTitle}</li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="border py-2 px-2 align-top">
                            {plan.crossThemes.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {plan.crossThemes.map((id) => {
                                  const theme = crossCurricularThemes.find(
                                    (t) => t.id === id
                                  );
                                  return theme ? (
                                    <Badge
                                      key={id}
                                      variant="outline"
                                      className="text-[10px]"
                                    >
                                      {theme.name}
                                    </Badge>
                                  ) : null;
                                })}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="border py-2 px-2 align-top">
                            {plan.assessments.length > 0
                              ? plan.assessments.join(', ')
                              : '-'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 6. 창의적 체험활동 연간 계획 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                6. 창의적 체험활동 연간 계획
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(activePlan.creativeActivityPlan || []).length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr>
                        <th className="border bg-muted/50 py-2 px-3 text-left">영역</th>
                        <th className="border bg-muted/50 py-2 px-3 text-left">활동명</th>
                        <th className="border bg-muted/50 py-2 px-3 text-center">시수</th>
                        <th className="border bg-muted/50 py-2 px-3 text-left">운영 시기</th>
                        <th className="border bg-muted/50 py-2 px-3 text-left">비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activePlan.creativeActivityPlan || []).map((item, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="border py-2 px-3 font-medium">{item.area}</td>
                          <td className="border py-2 px-3">{item.activityName || '-'}</td>
                          <td className="border py-2 px-3 text-center">{item.hours}</td>
                          <td className="border py-2 px-3 text-xs">
                            {item.operationMonths.map(m => `${m}월`).join(', ')}
                          </td>
                          <td className="border py-2 px-3 text-xs text-muted-foreground">
                            {item.description || '-'}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-muted/50 font-semibold">
                        <td className="border py-2 px-3" colSpan={2}>합계</td>
                        <td className="border py-2 px-3 text-center">
                          {(activePlan.creativeActivityPlan || []).reduce((s, i) => s + i.hours, 0)}시간
                        </td>
                        <td className="border py-2 px-3" colSpan={2}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-3">
                  {['자율활동', '동아리활동', '봉사활동', '진로활동'].map(
                    (area) => {
                      const acts = creativeActivities.filter(
                        (a) => a.area === area && a.recommendedGrades.includes(selectedGrade)
                      );
                      if (acts.length === 0) return null;
                      return (
                        <div key={area}>
                          <h4 className="text-sm font-semibold mb-1.5">{area}</h4>
                          <div className="space-y-1.5 ml-2">
                            {acts.map((act) => (
                              <div
                                key={act.id}
                                className="p-2 rounded bg-muted/30 text-sm"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{act.name}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  {act.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {act.examples.slice(0, 4).map((a, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="text-[10px]"
                                    >
                                      {a}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 7. 법정필수교육 시수 현황 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                7. 법정필수교육 시수 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(activePlan.mandatoryEducationPlan || []).length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr>
                        <th className="border bg-muted/50 py-2 px-3 text-left">분류</th>
                        <th className="border bg-muted/50 py-2 px-3 text-left">교육명</th>
                        <th className="border bg-muted/50 py-2 px-3 text-center">기준시수</th>
                        <th className="border bg-muted/50 py-2 px-3 text-center">편성시수</th>
                        <th className="border bg-muted/50 py-2 px-3 text-center">달성률</th>
                        <th className="border bg-muted/50 py-2 px-3 text-left">운영시기</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activePlan.mandatoryEducationPlan || []).map((item) => {
                        const percent = item.targetHours > 0 ? Math.round((item.plannedHours / item.targetHours) * 100) : 0;
                        return (
                          <tr key={item.educationId} className="border-b">
                            <td className="border py-2 px-3 text-xs">{item.category}</td>
                            <td className="border py-2 px-3 font-medium">{item.educationName}</td>
                            <td className="border py-2 px-3 text-center">{item.targetHours}</td>
                            <td className="border py-2 px-3 text-center">{item.plannedHours}</td>
                            <td className={cn('border py-2 px-3 text-center font-medium', percent >= 100 ? 'text-green-600' : 'text-orange-600')}>
                              {percent}%
                            </td>
                            <td className="border py-2 px-3 text-xs">
                              {item.operationMonths.map(m => `${m}월`).join(', ')}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  법정필수교육 데이터가 아직 설정되지 않았습니다.
                </p>
              )}
            </CardContent>
          </Card>

          {/* 8. 범교과 학습주제 운영 계획 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                8. 범교과 학습주제 운영 계획
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="border bg-muted/50 py-2 px-3 text-left">학습주제</th>
                      <th className="border bg-muted/50 py-2 px-3 text-left">운영 시기</th>
                      <th className="border bg-muted/50 py-2 px-3 text-left">관련 교과</th>
                      <th className="border bg-muted/50 py-2 px-3 text-left">활동 예시</th>
                    </tr>
                  </thead>
                  <tbody>
                    {crossCurricularThemes.map((theme) => {
                      const plannedMonths = activePlan.monthlyPlans
                        .filter((mp) => mp.crossThemes.includes(theme.id))
                        .map((mp) => `${mp.month}월`);
                      return (
                        <tr key={theme.id} className="border-b">
                          <td className="border py-2 px-3 font-medium">{theme.name}</td>
                          <td className="border py-2 px-3 text-xs">
                            {plannedMonths.length > 0
                              ? plannedMonths.join(', ')
                              : '연중'}
                          </td>
                          <td className="border py-2 px-3 text-xs">
                            {theme.relatedSubjects
                              .filter((s) =>
                                gradeSubjects.some((gs) => gs.subject === s)
                              )
                              .join(', ') || theme.relatedSubjects.join(', ')}
                          </td>
                          <td className="border py-2 px-3 text-xs">
                            {theme.requiredActivities.slice(0, 2).join(', ')}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 9. 평가 계획 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                9. 평가 계획
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="border bg-muted/50 py-2 px-3 text-left">평가 유형</th>
                      <th className="border bg-muted/50 py-2 px-3 text-left">평가 내용</th>
                      <th className="border bg-muted/50 py-2 px-3 text-left">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessmentMethods
                      .filter((am) => am.applicableGrades.includes(selectedGrade))
                      .map((method) => (
                        <tr key={method.id} className="border-b">
                          <td className="border py-2 px-3">
                            <Badge variant="outline" className="text-xs">
                              {method.type}
                            </Badge>
                          </td>
                          <td className="border py-2 px-3">{method.name}</td>
                          <td className="border py-2 px-3 text-xs text-muted-foreground">
                            {method.description}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // ============================================
  // 탭 5: 주차별 진도표
  // ============================================

  const WeeklyProgressTab = () => {
    if (!activePlan) return null;
    const [isGenerating, setIsGenerating] = useState(false);
    const [editingCell, setEditingCell] = useState<{ week: number; subjectName: string } | null>(null);
    const [editText, setEditText] = useState('');

    // weeklyProgress가 없으면 초기화
    const weeklyProgress = activePlan.weeklyProgress || Array.from({ length: 34 }, (_, i) => ({
      week: i + 1,
      dateRange: '',
      subjects: [] as WeeklyProgressEntry['subjects'],
      events: '',
      notes: '',
    }));

    const subjectNames = activePlan.hoursAllocation.map(a => a.subjectName);

    const getSubjectEntry = (week: number, subjectName: string) => {
      const weekData = weeklyProgress.find(w => w.week === week);
      return weekData?.subjects.find(s => s.subjectName === subjectName);
    };

    const updateWeeklyProgressData = (weekNum: number, updates: Partial<WeeklyProgressEntry>) => {
      const newProgress = weeklyProgress.map(w =>
        w.week === weekNum ? { ...w, ...updates } : w
      );
      updateActivePlan({ weeklyProgress: newProgress });
    };

    const updateSubjectEntry = (weekNum: number, subjectName: string, unitTitle: string) => {
      const weekData = weeklyProgress.find(w => w.week === weekNum);
      if (!weekData) return;
      const existingIdx = weekData.subjects.findIndex(s => s.subjectName === subjectName);
      const newSubjects = [...weekData.subjects];
      if (existingIdx >= 0) {
        newSubjects[existingIdx] = { ...newSubjects[existingIdx], unitTitle, lessonDetail: unitTitle };
      } else {
        newSubjects.push({ subjectName, unitTitle, lessonDetail: unitTitle, hours: 1 });
      }
      updateWeeklyProgressData(weekNum, { subjects: newSubjects });
      setEditingCell(null);
      setEditText('');
    };

    const startEdit = (week: number, subjectName: string) => {
      const entry = getSubjectEntry(week, subjectName);
      setEditingCell({ week, subjectName });
      setEditText(entry?.unitTitle || '');
    };

    const handleEditKeyDown = (e: React.KeyboardEvent, week: number, subjectName: string) => {
      if (e.key === 'Enter') {
        updateSubjectEntry(week, subjectName, editText);
      } else if (e.key === 'Escape') {
        setEditingCell(null);
        setEditText('');
      }
    };

    // 교과별 셀 배경색 매핑 (연한 버전)
    const subjectBgColors: Record<string, string> = {
      '국어': 'bg-red-50 dark:bg-red-950/20',
      '수학': 'bg-blue-50 dark:bg-blue-950/20',
      '사회': 'bg-yellow-50 dark:bg-yellow-950/20',
      '과학': 'bg-green-50 dark:bg-green-950/20',
      '영어': 'bg-purple-50 dark:bg-purple-950/20',
      '도덕': 'bg-orange-50 dark:bg-orange-950/20',
      '체육': 'bg-cyan-50 dark:bg-cyan-950/20',
      '음악': 'bg-pink-50 dark:bg-pink-950/20',
      '미술': 'bg-indigo-50 dark:bg-indigo-950/20',
      '실과': 'bg-teal-50 dark:bg-teal-950/20',
      '바른생활': 'bg-orange-50 dark:bg-orange-950/20',
      '슬기로운생활': 'bg-green-50 dark:bg-green-950/20',
      '즐거운생활': 'bg-pink-50 dark:bg-pink-950/20',
      '창의적체험활동': 'bg-gray-50 dark:bg-gray-950/20',
    };

    const autoGenerateWithAI = async () => {
      setIsGenerating(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [{
              role: 'user',
              content: `${activePlan.grade}학년 ${activePlan.semester === 'first' ? '1학기' : activePlan.semester === 'second' ? '2학기' : '연간'} 주차별 교육과정 진도표를 만들어주세요.
교과: ${activePlan.hoursAllocation.map(a => `${a.subjectName}(주${a.customWeekly}시간)`).join(', ')}
총 34주. 각 주차별로 교과서 단원명과 차시를 배정해주세요.
반드시 아래 JSON 형식으로만 응답하세요(다른 텍스트 없이):
[{"week":1,"dateRange":"3/4~3/8","subjects":[{"subjectName":"국어","unitTitle":"1단원: ...","lessonDetail":"1-2차시","hours":6}],"events":"시업식","notes":""},...]`
            }],
          }),
        });

        if (!response.ok) {
          throw new Error('AI 응답 실패');
        }

        const data = await response.json();
        const aiText = data.response || data.message || data.content || '';

        // JSON 파싱 시도
        const jsonMatch = aiText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]) as WeeklyProgressEntry[];
            if (Array.isArray(parsed) && parsed.length > 0) {
              const newProgress = weeklyProgress.map(w => {
                const aiWeek = parsed.find(p => p.week === w.week);
                if (aiWeek) {
                  return {
                    ...w,
                    dateRange: aiWeek.dateRange || w.dateRange,
                    subjects: aiWeek.subjects || w.subjects,
                    events: aiWeek.events || w.events,
                    notes: aiWeek.notes || w.notes,
                  };
                }
                return w;
              });
              updateActivePlan({ weeklyProgress: newProgress });
              toast.success('AI가 34주 진도표를 자동 편성했습니다!');
            } else {
              toast.error('AI 응답 파싱 실패: 유효한 배열이 아닙니다.');
            }
          } catch {
            toast.error('AI 응답의 JSON 파싱에 실패했습니다. 다시 시도해주세요.');
          }
        } else {
          toast.error('AI 응답에서 JSON을 찾을 수 없습니다. 다시 시도해주세요.');
        }
      } catch {
        toast.error('AI 자동 편성 중 오류가 발생했습니다.');
      } finally {
        setIsGenerating(false);
      }
    };

    const clearAllProgress = () => {
      if (!confirm('주차별 진도표를 모두 초기화하시겠습니까?')) return;
      updateActivePlan({
        weeklyProgress: Array.from({ length: 34 }, (_, i) => ({
          week: i + 1,
          dateRange: '',
          subjects: [],
          events: '',
          notes: '',
        })),
      });
      toast.success('주차별 진도표가 초기화되었습니다.');
    };

    const autoFillEvents = () => {
      if (typeof annualSchoolEvents === 'undefined' || !Array.isArray(annualSchoolEvents)) {
        toast.error('학교행사 데이터를 불러올 수 없습니다.');
        return;
      }
      const gradeEvents = annualSchoolEvents.filter((ev: any) => ev.grades?.includes(selectedGrade));
      const schoolWeeksData = (typeof SCHOOL_WEEKS !== 'undefined' && SCHOOL_WEEKS?.monthWeeks) ? SCHOOL_WEEKS.monthWeeks : [];
      const newProgress = weeklyProgress.map(w => {
        // 이 주차에 해당하는 월 찾기
        const monthWeek = schoolWeeksData.find((mw: any) => {
          return w.week >= mw.startWeek && w.week < mw.startWeek + mw.weeks;
        });
        if (!monthWeek) return w;

        const weekInMonth = w.week - monthWeek.startWeek + 1;
        const matchingEvents = gradeEvents.filter((ev: any) =>
          ev.month === monthWeek.month && (!ev.week || ev.week === weekInMonth)
        );

        if (matchingEvents.length > 0) {
          const eventNames = matchingEvents.map((ev: any) => ev.name).join(', ');
          return {
            ...w,
            events: w.events ? `${w.events}, ${eventNames}` : eventNames,
          };
        }
        return w;
      });
      updateActivePlan({ weeklyProgress: newProgress });
      toast.success('학년 행사가 자동으로 채워졌습니다!');
    };

    // 진행률 계산
    const filledWeeks = weeklyProgress.filter(w => w.subjects.length > 0).length;
    const progressPercent = Math.round((filledWeeks / 34) * 100);

    return (
      <div className="space-y-6">
        {/* 도구 바 */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={autoGenerateWithAI}
                disabled={isGenerating}
                className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                {isGenerating ? 'AI 편성 중...' : 'AI로 자동 편성'}
              </Button>
              <Button variant="outline" size="sm" onClick={autoFillEvents}>
                <Calendar className="h-4 w-4 mr-1" />
                학년행사 자동채우기
              </Button>
              <Button variant="outline" size="sm" onClick={clearAllProgress}>
                <RefreshCw className="h-4 w-4 mr-1" />
                전체 초기화
              </Button>
              <div className="flex-1" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">편성 진행률</span>
                <Progress value={progressPercent} className="w-24 h-2" />
                <Badge variant={progressPercent >= 80 ? 'default' : 'secondary'} className="text-xs">
                  {filledWeeks}/34주 ({progressPercent}%)
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 진도표 그리드 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" />
              {selectedGrade}학년 주차별 진도표 (34주)
            </CardTitle>
            <CardDescription>
              각 셀을 클릭하여 해당 주차의 교과별 단원/차시를 입력하세요. 교과별 색상이 자동 적용됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="w-full">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse min-w-[900px]">
                  <thead>
                    <tr>
                      <th className="border bg-muted/50 py-2 px-2 text-center font-semibold w-[40px] sticky left-0 z-10 bg-background">주</th>
                      <th className="border bg-muted/50 py-2 px-2 text-center font-semibold w-[80px]">날짜</th>
                      {subjectNames.map(name => {
                        const color = getSubjectColor(name);
                        return (
                          <th key={name} className={cn('border py-2 px-2 text-center font-semibold min-w-[100px]', color.bg)}>
                            <span className={color.text}>{name}</span>
                          </th>
                        );
                      })}
                      <th className="border bg-muted/50 py-2 px-2 text-center font-semibold min-w-[80px]">행사</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyProgress.map((weekData) => (
                      <tr key={weekData.week} className="hover:bg-muted/20 transition-colors">
                        <td className="border bg-muted/30 py-1.5 px-2 text-center font-bold sticky left-0 z-10 bg-background">
                          {weekData.week}
                        </td>
                        <td className="border py-1 px-1">
                          <Input
                            value={weekData.dateRange}
                            onChange={(e) => updateWeeklyProgressData(weekData.week, { dateRange: e.target.value })}
                            placeholder={`${Math.floor((weekData.week - 1) / 4) + 3}/${((weekData.week - 1) % 4) * 7 + 4}~`}
                            className="h-7 text-[11px] border-0 bg-transparent shadow-none px-1 focus-visible:ring-0"
                          />
                        </td>
                        {subjectNames.map(subjectName => {
                          const entry = getSubjectEntry(weekData.week, subjectName);
                          const isEditing = editingCell?.week === weekData.week && editingCell?.subjectName === subjectName;
                          const bgColor = subjectBgColors[subjectName] || '';

                          return (
                            <td
                              key={subjectName}
                              className={cn('border py-1 px-1 cursor-pointer transition-colors', bgColor, entry?.unitTitle && 'font-medium')}
                              onClick={() => !isEditing && startEdit(weekData.week, subjectName)}
                            >
                              {isEditing ? (
                                <div className="flex flex-col gap-0.5">
                                  <Input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyDown={(e) => handleEditKeyDown(e, weekData.week, subjectName)}
                                    onBlur={() => updateSubjectEntry(weekData.week, subjectName, editText)}
                                    autoFocus
                                    placeholder="단원/차시"
                                    className="h-7 text-[11px] border-0 bg-white/80 dark:bg-gray-900/80 shadow-sm px-1 focus-visible:ring-1"
                                  />
                                  {/* 교과서 단원 드롭다운 */}
                                  <div className="max-h-[120px] overflow-y-auto bg-white dark:bg-gray-900 border rounded shadow-sm">
                                    {gradeUnits
                                      .filter(u => u.subject === subjectName)
                                      .map(u => (
                                        <div
                                          key={u.id}
                                          className="px-2 py-1 text-[10px] hover:bg-muted cursor-pointer"
                                          onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            updateSubjectEntry(weekData.week, subjectName, `${u.unitNumber}단원: ${u.title}`);
                                          }}
                                        >
                                          {u.unitNumber}단원: {u.title} ({u.hours}차시)
                                        </div>
                                      ))
                                    }
                                  </div>
                                </div>
                              ) : (
                                <div className="min-h-[24px] text-[11px] px-1 py-0.5">
                                  {entry?.unitTitle || <span className="text-muted-foreground/40">-</span>}
                                </div>
                              )}
                            </td>
                          );
                        })}
                        <td className="border py-1 px-1">
                          <Input
                            value={weekData.events}
                            onChange={(e) => updateWeeklyProgressData(weekData.week, { events: e.target.value })}
                            placeholder=""
                            className="h-7 text-[11px] border-0 bg-transparent shadow-none px-1 focus-visible:ring-0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 범례 */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground mr-2">교과 색상:</span>
              {subjectNames.map(name => {
                const color = getSubjectColor(name);
                return (
                  <div key={name} className="flex items-center gap-1">
                    <div className={cn('w-3 h-3 rounded', color.bg)} />
                    <span className="text-[11px]">{name}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // ============================================
  // CSV 엑셀 내보내기
  // ============================================

  const exportToExcel = () => {
    if (!activePlan) return;
    const BOM = '\uFEFF';
    let csv = BOM;

    // 시수배당표
    csv += '=== 시수 배당표 ===\n';
    csv += '교과,기준시수(주),편성시수(주),연간시수\n';
    activePlan.hoursAllocation.forEach(a => {
      csv += `${a.subjectName},${a.standardWeekly},${a.customWeekly},${a.customWeekly * 34}\n`;
    });
    const totalW = activePlan.hoursAllocation.reduce((s, a) => s + a.customWeekly, 0);
    csv += `합계,,${totalW},${totalW * 34}\n`;
    csv += '\n';

    // 주간 시간표
    csv += '=== 주간 시간표 ===\n';
    csv += `교시,${DAYS.join(',')}\n`;
    const pCount = getPeriodsForGrade(selectedGrade);
    for (let i = 0; i < pCount; i++) {
      const row = DAYS.map(day => {
        const cell = activePlan.weeklyTimetable[day]?.[i];
        return cell?.subject || '';
      });
      csv += `${i + 1}교시,${row.join(',')}\n`;
    }
    csv += '\n';

    // 주차별 진도표
    const wp = activePlan.weeklyProgress || [];
    if (wp.length > 0) {
      csv += '=== 주차별 진도표 ===\n';
      const sNames = activePlan.hoursAllocation.map(a => a.subjectName);
      csv += `주차,날짜,${sNames.join(',')},행사\n`;
      wp.forEach(w => {
        const subjectCells = sNames.map(name => {
          const entry = w.subjects.find(s => s.subjectName === name);
          return (entry?.unitTitle || '').replace(/,/g, ' ');
        });
        csv += `${w.week},${w.dateRange || ''},${subjectCells.join(',')},${(w.events || '').replace(/,/g, ' ')}\n`;
      });
      csv += '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePlan.year}학년도_${activePlan.grade}학년_교육과정.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('엑셀(CSV) 파일이 다운로드되었습니다.');
  };

  // ============================================
  // 메인 렌더
  // ============================================

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      {/* 페이지 헤더 */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-primary" />
              학년/학급 교육과정 편성
            </h1>
            <p className="text-muted-foreground mt-1">
              시수 배당, 주간 시간표, 교육과정 편성, 학급 교육과정 문서, 주차별 진도표를 한 곳에서 관리합니다.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPlanList(true)}
            >
              <FolderOpen className="h-4 w-4 mr-1" />
              내 교육과정 목록
              {plans.length > 0 && (
                <Badge variant="secondary" className="ml-1 text-xs">
                  {plans.length}
                </Badge>
              )}
            </Button>
            <Button size="sm" onClick={() => setShowNewPlanDialog(true)}>
              <Plus className="h-4 w-4 mr-1" />
              새로 만들기
            </Button>
          </div>
        </div>
      </div>

      {/* 설정 바 */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* 학년 선택 */}
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium whitespace-nowrap">학년</Label>
              <Select
                value={String(selectedGrade)}
                onValueChange={handleGradeChange}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map((g) => (
                    <SelectItem key={g} value={String(g)}>
                      {g}학년
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 학기 선택 */}
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium whitespace-nowrap">학기</Label>
              <Select
                value={selectedSemester}
                onValueChange={handleSemesterChange}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">1학기</SelectItem>
                  <SelectItem value="second">2학기</SelectItem>
                  <SelectItem value="full">전체</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 학년도 */}
            <Badge variant="secondary" className="text-sm">
              {CURRENT_YEAR}학년도
            </Badge>

            {/* 구분선 */}
            <div className="flex-1" />

            {/* 완료율 */}
            {activePlan && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">완료율</span>
                <Progress value={completionPercent} className="w-24 h-2" />
                <Badge
                  variant={
                    completionPercent >= 80
                      ? 'default'
                      : completionPercent >= 40
                      ? 'secondary'
                      : 'outline'
                  }
                  className="text-xs"
                >
                  {completionPercent}%
                </Badge>
              </div>
            )}

            {/* 저장 상태 */}
            {activePlan && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                <Save className="h-3 w-3 mr-1" />
                자동 저장
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 플랜이 없을 때 */}
      {!activePlan && (
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">교육과정 계획을 시작하세요</h2>
            <p className="text-muted-foreground mb-6">
              학년과 학기를 선택하고 &quot;새로 만들기&quot; 버튼을 눌러
              학급 교육과정을 편성해 보세요.
            </p>
            <Button onClick={() => setShowNewPlanDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              새 교육과정 만들기
            </Button>
          </div>
        </Card>
      )}

      {/* 메인 탭 */}
      {activePlan && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full mb-6">
            <TabsTrigger value="hours" className="text-xs sm:text-sm">
              <Clock className="h-4 w-4 mr-1 hidden sm:inline" />
              시수 배당표
            </TabsTrigger>
            <TabsTrigger value="timetable" className="text-xs sm:text-sm">
              <Calendar className="h-4 w-4 mr-1 hidden sm:inline" />
              주간 시간표
            </TabsTrigger>
            <TabsTrigger value="planning" className="text-xs sm:text-sm">
              <LayoutGrid className="h-4 w-4 mr-1 hidden sm:inline" />
              교육과정 편성
            </TabsTrigger>
            <TabsTrigger value="document" className="text-xs sm:text-sm">
              <FileText className="h-4 w-4 mr-1 hidden sm:inline" />
              학급 교육과정
            </TabsTrigger>
            <TabsTrigger value="weekly-progress" className="text-xs sm:text-sm">
              <ListChecks className="h-4 w-4 mr-1 hidden sm:inline" />
              주차별 진도표
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hours">
            <HoursAllocationTab />
          </TabsContent>
          <TabsContent value="timetable">
            <WeeklyTimetableTab />
          </TabsContent>
          <TabsContent value="planning">
            <CurriculumPlanningTab />
          </TabsContent>
          <TabsContent value="document">
            <ClassCurriculumDocTab />
          </TabsContent>
          <TabsContent value="weekly-progress">
            <WeeklyProgressTab />
          </TabsContent>
        </Tabs>
      )}

      {/* 새 플랜 생성 다이얼로그 */}
      <Dialog open={showNewPlanDialog} onOpenChange={setShowNewPlanDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>새 교육과정 계획 만들기</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>계획 이름</Label>
              <Input
                value={newPlanName}
                onChange={(e) => setNewPlanName(e.target.value)}
                placeholder={`${CURRENT_YEAR}학년도 ${selectedGrade}학년 교육과정`}
              />
            </div>
            <div className="space-y-2">
              <Label>학급</Label>
              <Input
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder={`${selectedGrade}학년 1반`}
              />
            </div>
            <div className="space-y-2">
              <Label>담임 교사</Label>
              <Input
                value={newTeacherName}
                onChange={(e) => setNewTeacherName(e.target.value)}
                placeholder="교사 이름"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>학년</Label>
                <Select
                  value={String(selectedGrade)}
                  onValueChange={(v) => setSelectedGrade(parseInt(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                      <SelectItem key={g} value={String(g)}>
                        {g}학년
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>학기</Label>
                <Select
                  value={selectedSemester}
                  onValueChange={(v) =>
                    setSelectedSemester(v as 'first' | 'second' | 'full')
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">1학기</SelectItem>
                    <SelectItem value="second">2학기</SelectItem>
                    <SelectItem value="full">전체</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPlanDialog(false)}>
              취소
            </Button>
            <Button onClick={createNewPlan}>
              <Plus className="h-4 w-4 mr-1" />
              만들기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 내 교육과정 목록 다이얼로그 */}
      <Dialog open={showPlanList} onOpenChange={setShowPlanList}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>내 교육과정 목록</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px]">
            {plans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>저장된 교육과정 계획이 없습니다.</p>
              </div>
            ) : (
              <div className="space-y-2 pr-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors',
                      plan.id === activePlanId
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    )}
                    onClick={() => {
                      setActivePlanId(plan.id);
                      setSelectedGrade(plan.grade);
                      setSelectedSemester(plan.semester);
                      setShowPlanList(false);
                    }}
                  >
                    <div>
                      <p className="font-medium text-sm">{plan.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {plan.className} | {plan.teacherName || '담임 미입력'} |{' '}
                        {plan.semester === 'first'
                          ? '1학기'
                          : plan.semester === 'second'
                          ? '2학기'
                          : '전체'}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        최종 수정:{' '}
                        {new Date(plan.updatedAt).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {plan.id === activePlanId && (
                        <Badge variant="default" className="text-xs">
                          현재
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('이 교육과정 계획을 삭제하시겠습니까?')) {
                            deletePlan(plan.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlanList(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 하단 안내 */}
      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full flex-shrink-0">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">교육과정 편성 안내</h3>
              <p className="text-muted-foreground text-sm">
                2022 개정 교육과정 기준으로 학년별 시수 배당 기준이 자동 적용됩니다.
                시수 배당표에서 주당 시수를 조정하고, 주간 시간표를 편성한 후,
                월별 교육과정 편성을 완료하면 학급 교육과정 문서가 자동으로 생성됩니다.
                주차별 진도표 탭에서 AI 자동 편성으로 34주 진도표를 한 번에 생성하거나,
                엑셀(CSV) 내보내기로 교육과정 전체를 파일로 저장할 수 있습니다.
                단원 선택 시 2022 개정 교육과정 성취기준이 자동으로 연계됩니다.
                모든 데이터는 브라우저에 자동 저장됩니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
