'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertTriangle,
  ChevronRight,
  FileText,
  Sparkles,
  CalendarDays,
  ClipboardList,
  BookOpen,
  Users,
  GraduationCap,
  Star,
  Bell,
  Target,
  Lightbulb,
  AlertCircle,
  Monitor,
  Calendar,
  Shield,
  Award,
  Coffee,
  Sunrise,
  Sun,
  Sunset,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  type TeacherRole,
  type MonthlyTaskItem,
  getCurrentMonthTasks,
  getTasksByRole,
  getCriticalTasks,
  getNEISTasks,
  dailyRoutineTasks,
  weeklyRoutineTasks,
  newTeacherChecklists,
  departments,
  teacherResources,
} from '@/data/teacher-comprehensive-db';
import {
  ENHANCED_TEACHER_DB,
  getEnhancedMonthlyTasks,
  getSchoolEventsByMonth,
  getDailyRoutineByTime,
} from '@/data/teacher-enhanced-db';
import { useUserSettings } from '@/hooks/useFirestore';

const SETTINGS_KEY = 'eduflow_teacher_settings';
const COMPLETED_TASKS_KEY = 'eduflow_completed_tasks';
const COMPLETED_TRAININGS_KEY = 'eduflow_completed_trainings';

interface TeacherSettings {
  name: string;
  role: TeacherRole;
  grade?: number;
  department?: string;
  isNewTeacher: boolean;
  setupComplete: boolean;
}

const priorityConfig = {
  critical: { label: '필수', color: 'bg-red-500 text-white', textColor: 'text-red-600', icon: AlertTriangle },
  high: { label: '중요', color: 'bg-orange-500 text-white', textColor: 'text-orange-600', icon: AlertCircle },
  medium: { label: '보통', color: 'bg-blue-500 text-white', textColor: 'text-blue-600', icon: Circle },
  low: { label: '낮음', color: 'bg-gray-400 text-white', textColor: 'text-gray-500', icon: Circle },
};

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function DashboardPage() {
  const { settings: firebaseSettings } = useUserSettings();
  const [settings, setSettings] = useState<TeacherSettings | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const [completedTrainingIds, setCompletedTrainingIds] = useState<Set<string>>(new Set());

  // 설정값
  const [setupName, setSetupName] = useState('');
  const [setupRole, setSetupRole] = useState<TeacherRole>('homeroom');
  const [setupGrade, setSetupGrade] = useState<string>('');
  const [setupDepartment, setSetupDepartment] = useState('');
  const [setupIsNew, setSetupIsNew] = useState(false);

  // Firebase 설정에서 대시보드 설정 자동 동기화
  useEffect(() => {
    if (firebaseSettings) {
      const ext = firebaseSettings as unknown as { roles?: string[]; customTasks?: string[]; educationOfficeId?: string };
      const roles = ext.roles || [];
      const displayName = firebaseSettings.displayName || '';

      if (displayName || roles.length > 0) {
        // Firebase 설정에서 역할 자동 매핑
        let role: TeacherRole = 'homeroom';
        let grade: number | undefined;
        let department: string | undefined;

        // 학년부장/업무부장 체크
        if (roles.some(r => ['업무부장', '교무부장', '교감', '교장'].includes(r)) ||
            roles.some(r => r.endsWith('부') || r.endsWith('부장'))) {
          role = 'head-teacher';
          department = roles.find(r => r.endsWith('부') || r.endsWith('부장')) || undefined;
        }
        // 학년부장은 head-teacher이지만 학년도 추출
        if (roles.includes('학년부장')) {
          role = 'head-teacher';
          department = '학년부';
        }
        // 교과전담
        if (roles.includes('교과전담교사')) {
          role = 'non-homeroom';
        }
        // 담임교사 (학년 추출)
        if (roles.includes('학급담임')) {
          role = 'homeroom';
        }
        // 학년별 담임에서 학년 추출
        const gradeRole = roles.find(r => /^(\d)학년 담임$/.test(r));
        if (gradeRole) {
          role = 'homeroom';
          grade = parseInt(gradeRole);
        }

        const classInfo = firebaseSettings.classInfo || '';
        if (!grade && classInfo) {
          const match = classInfo.match(/(\d)학년/);
          if (match) grade = parseInt(match[1]);
        }

        const newSettings: TeacherSettings = {
          name: displayName,
          role,
          grade,
          department,
          isNewTeacher: false,
          setupComplete: true,
        };

        setSettings(newSettings);
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      }
    }
  }, [firebaseSettings]);

  useEffect(() => {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      setSettings(JSON.parse(saved));
    } else {
      setShowSetup(true);
    }

    const savedCompleted = localStorage.getItem(COMPLETED_TASKS_KEY);
    if (savedCompleted) {
      setCompletedTaskIds(new Set(JSON.parse(savedCompleted)));
    }

    const savedTrainings = localStorage.getItem(COMPLETED_TRAININGS_KEY);
    if (savedTrainings) {
      setCompletedTrainingIds(new Set(JSON.parse(savedTrainings)));
    }
  }, []);

  const handleSaveSettings = () => {
    if (!setupName.trim()) {
      toast.error('이름을 입력해주세요.');
      return;
    }
    const newSettings: TeacherSettings = {
      name: setupName,
      role: setupRole,
      grade: setupGrade ? parseInt(setupGrade) : undefined,
      department: setupDepartment || undefined,
      isNewTeacher: setupIsNew,
      setupComplete: true,
    };
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    setShowSetup(false);
    toast.success('설정이 저장되었습니다!');
  };

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      localStorage.setItem(COMPLETED_TASKS_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const toggleTraining = (trainingId: string) => {
    setCompletedTrainingIds(prev => {
      const next = new Set(prev);
      if (next.has(trainingId)) {
        next.delete(trainingId);
      } else {
        next.add(trainingId);
      }
      localStorage.setItem(COMPLETED_TRAININGS_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentHour = now.getHours();
  const monthData = getCurrentMonthTasks();
  const role = settings?.role || 'homeroom';

  const myTasks = useMemo(() => {
    return getTasksByRole(currentMonth, role);
  }, [currentMonth, role]);

  const criticalTasks = useMemo(() => getCriticalTasks(currentMonth), [currentMonth]);
  const neisTasks = useMemo(() => getNEISTasks(currentMonth), [currentMonth]);

  const completedCount = myTasks.filter(t => completedTaskIds.has(t.id)).length;
  const progressPercent = myTasks.length > 0 ? Math.round((completedCount / myTasks.length) * 100) : 0;

  // Enhanced DB data
  const enhancedMonthlyTasks = useMemo(() => getEnhancedMonthlyTasks(currentMonth), [currentMonth]);
  const schoolEvents = useMemo(() => getSchoolEventsByMonth(currentMonth), [currentMonth]);
  const allTrainings = useMemo(() => ENHANCED_TEACHER_DB.teacherTraining.items, []);
  const mandatoryEducationItems = useMemo(() => ENHANCED_TEACHER_DB.mandatoryEducation.items, []);

  // 이번 달 법정 의무교육 필터 (timing 필드에서 현재 월 매칭)
  const monthNames: Record<number, string[]> = {
    1: ['1월'], 2: ['2월'], 3: ['3월'], 4: ['4월'], 5: ['5월'], 6: ['6월'],
    7: ['7월'], 8: ['8월'], 9: ['9월'], 10: ['10월'], 11: ['11월'], 12: ['12월'],
  };
  const currentMonthMandatory = useMemo(() => {
    const monthStr = monthNames[currentMonth]?.[0] || '';
    return mandatoryEducationItems.filter(item => {
      if (item.timing.includes('연중')) return true;
      if (item.timing.includes(monthStr)) return true;
      // 범위 매칭: "3~6월" 패턴
      const rangeMatch = item.timing.match(/(\d+)~(\d+)월/);
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1]);
        const end = parseInt(rangeMatch[2]);
        if (currentMonth >= start && currentMonth <= end) return true;
      }
      return false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMonth, mandatoryEducationItems]);

  // 현재 시간대 루틴
  const currentTimeSlot = useMemo(() => {
    if (currentHour < 8) return null;
    if (currentHour < 9) return 'beforeSchool';
    if (currentHour < 9.5) return 'morningActivity';
    if (currentHour < 12.5) return 'classTime';
    if (currentHour < 13.5) return 'lunchTime';
    if (currentHour < 15) return 'afternoonClass';
    return 'afterSchool';
  }, [currentHour]);

  const currentRoutine = useMemo(() => {
    if (!currentTimeSlot) return null;
    return getDailyRoutineByTime(currentTimeSlot);
  }, [currentTimeSlot]);

  const timeSlotLabels: Record<string, { label: string; icon: typeof Sunrise }> = {
    beforeSchool: { label: '출근~등교 전', icon: Sunrise },
    morningActivity: { label: '아침활동', icon: Coffee },
    classTime: { label: '오전 수업', icon: Sun },
    lunchTime: { label: '점심시간', icon: Coffee },
    afternoonClass: { label: '오후 수업', icon: Sun },
    afterSchool: { label: '방과 후', icon: Sunset },
  };

  const uncompletedTrainingCount = allTrainings.filter(t => !completedTrainingIds.has(t.id)).length;

  if (!settings || showSetup) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">에듀플로우에 오신 것을 환영합니다!</CardTitle>
            <CardDescription>
              맞춤형 업무 도우미를 위해 몇 가지 정보를 알려주세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">선생님 성함</Label>
              <Input
                id="name"
                value={setupName}
                onChange={e => setSetupName(e.target.value)}
                placeholder="예: 김선생"
              />
            </div>

            <div className="space-y-2">
              <Label>담당 역할</Label>
              <Select value={setupRole} onValueChange={(v: TeacherRole) => setSetupRole(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="homeroom">담임교사</SelectItem>
                  <SelectItem value="non-homeroom">비담임교사 (교과전담 등)</SelectItem>
                  <SelectItem value="head-teacher">부장교사 (업무부장/학년부장/보직교사)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(setupRole === 'homeroom' || setupRole === 'non-homeroom') && (
              <div className="space-y-2">
                <Label>담당 학년</Label>
                <Select value={setupGrade} onValueChange={setSetupGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="학년 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(g => (
                      <SelectItem key={g} value={String(g)}>{g}학년</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {setupRole === 'head-teacher' && (
              <div className="space-y-2">
                <Label>소속 부서</Label>
                <Select value={setupDepartment} onValueChange={setSetupDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="부서 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(d => (
                      <SelectItem key={d.id} value={d.nameShort}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="newTeacher"
                checked={setupIsNew}
                onCheckedChange={(checked) => setSetupIsNew(checked === true)}
              />
              <Label htmlFor="newTeacher" className="text-sm">
                올해 처음 발령받은 초임교사입니다
              </Label>
            </div>

            <Button onClick={handleSaveSettings} className="w-full" size="lg">
              시작하기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 상단 인사 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {settings.name} 선생님, 안녕하세요!
          </h1>
          <p className="text-muted-foreground text-sm">
            {now.getFullYear()}년 {currentMonth}월 {now.getDate()}일 ({DAYS[now.getDay()]})
            {settings.role === 'homeroom' && settings.grade && ` · ${settings.grade}학년 담임`}
            {settings.role === 'head-teacher' && settings.department && ` · ${settings.department}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSetup(true)}>
            설정 변경
          </Button>
          <Button asChild size="sm">
            <Link href="/ai-chat">
              <Sparkles className="h-4 w-4 mr-1" />
              AI 도우미
            </Link>
          </Button>
        </div>
      </div>

      {/* 이번 달 진행률 */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold">{monthData?.title || `${currentMonth}월 업무`}</h2>
              <p className="text-sm text-muted-foreground">{monthData?.summary}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-indigo-600">{progressPercent}%</p>
              <p className="text-xs text-muted-foreground">{completedCount}/{myTasks.length} 완료</p>
            </div>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </CardContent>
      </Card>

      {/* 빠른 통계 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{criticalTasks.filter(t => !completedTaskIds.has(t.id)).length}</p>
              <p className="text-xs text-muted-foreground">필수 업무</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Monitor className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{neisTasks.filter(t => !completedTaskIds.has(t.id)).length}</p>
              <p className="text-xs text-muted-foreground">NEIS 입력</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{completedCount}</p>
              <p className="text-xs text-muted-foreground">완료</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{myTasks.length - completedCount}</p>
              <p className="text-xs text-muted-foreground">남은 업무</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 이번 달 업무 체크리스트 - 2 cols */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                {currentMonth}월 업무 체크리스트
              </CardTitle>
              <Badge variant="secondary">
                {role === 'homeroom' ? '담임' : role === 'head-teacher' ? '부장' : '비담임'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-2">
              <div className="space-y-3">
                {myTasks.length > 0 ? myTasks.map(task => {
                  const isCompleted = completedTaskIds.has(task.id);
                  const config = priorityConfig[task.priority];
                  return (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border transition-all ${
                        isCompleted ? 'bg-muted/50 opacity-70' : 'hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className="mt-0.5 flex-shrink-0"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground hover:text-primary" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge className={`text-[10px] px-1.5 py-0 ${config.color}`}>
                              {config.label}
                            </Badge>
                            {task.neisRequired && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-blue-600 border-blue-300">
                                NEIS
                              </Badge>
                            )}
                            {task.department && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                {task.department}
                              </Badge>
                            )}
                            {task.deadline && (
                              <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                                <Clock className="h-3 w-3" />
                                {task.deadline}
                              </span>
                            )}
                          </div>
                          <h3 className={`text-sm font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {task.description}
                          </p>
                          {!isCompleted && task.details.length > 0 && (
                            <ul className="mt-2 space-y-0.5">
                              {task.details.slice(0, 3).map((detail, i) => (
                                <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                                  <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                              {task.details.length > 3 && (
                                <li className="text-xs text-primary cursor-pointer">
                                  + {task.details.length - 3}개 더보기
                                </li>
                              )}
                            </ul>
                          )}
                          {task.neisPath && !isCompleted && (
                            <div className="mt-2 text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                              {task.neisPath}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <CalendarDays className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>이번 달 등록된 업무가 없습니다.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 사이드바 - 1 col */}
        <div className="space-y-4">
          {/* 초임교사 가이드 */}
          {settings.isNewTeacher && (
            <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                  <Star className="h-4 w-4" />
                  초임교사 가이드
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="space-y-2">
                  {newTeacherChecklists.slice(0, 2).map(checklist => (
                    <div key={checklist.category} className="text-sm">
                      <p className="font-medium text-xs mb-1">{checklist.category}</p>
                      {checklist.items.slice(0, 3).map(item => (
                        <div key={item.id} className="flex items-center gap-2 py-0.5">
                          <Circle className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span className="text-xs truncate">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                    <Link href="/duties-guide">
                      전체 가이드 보기
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 일일 루틴 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                일일 루틴
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-1.5">
                {dailyRoutineTasks.filter(t => t.role === role || t.role === 'all').map(task => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-accent/50 cursor-pointer"
                    onClick={() => toggleTask(task.id)}
                  >
                    {completedTaskIds.has(task.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className={`text-xs font-medium ${completedTaskIds.has(task.id) ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </p>
                      {task.estimatedMinutes && (
                        <p className="text-[10px] text-muted-foreground">{task.estimatedMinutes}분</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 바로가기 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">바로가기</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/tasks">
                    <ClipboardList className="h-4 w-4" />
                    <span className="text-[10px]">업무관리</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/documents">
                    <FileText className="h-4 w-4" />
                    <span className="text-[10px]">문서작성</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/ai-chat">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-[10px]">AI 도우미</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/duties-guide">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-[10px]">업무가이드</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/school-record">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-[10px]">생활기록부</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/monthly-tasks">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-[10px]">월별 업무</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 유용한 사이트 */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                유용한 사이트
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-1.5">
                {teacherResources.slice(0, 5).map(resource => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-md hover:bg-accent/50 text-xs group"
                  >
                    <div>
                      <p className="font-medium group-hover:text-primary">{resource.name}</p>
                      <p className="text-[10px] text-muted-foreground">{resource.description}</p>
                    </div>
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ========== 강화형 DB 기반 추가 섹션 ========== */}

      {/* 오늘의 루틴 */}
      {currentRoutine && currentTimeSlot && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              {(() => {
                const SlotIcon = timeSlotLabels[currentTimeSlot]?.icon || Clock;
                return <SlotIcon className="h-5 w-5 text-amber-600" />;
              })()}
              오늘의 루틴 - {timeSlotLabels[currentTimeSlot]?.label}
              <Badge variant="outline" className="ml-auto text-xs border-amber-300 text-amber-700 dark:text-amber-400">
                {currentRoutine.time}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentRoutine.tasks.map((task: { name: string; duration: string; detail: string }, idx: number) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/60 dark:bg-gray-900/40 border border-amber-100 dark:border-amber-900/30"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-400 text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{task.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{task.detail}</p>
                    <Badge variant="secondary" className="mt-1 text-[10px]">
                      <Clock className="h-2.5 w-2.5 mr-0.5" />
                      {task.duration}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 이번 달 법정 의무교육 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                {currentMonth}월 법정 의무교육
              </CardTitle>
              <Badge variant="secondary">{currentMonthMandatory.length}개 해당</Badge>
            </div>
            <CardDescription>이번 달 실시해야 할 학생 대상 법정 의무교육</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[320px] pr-2">
              <div className="space-y-3">
                {currentMonthMandatory.length > 0 ? currentMonthMandatory.map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-semibold">{item.name}</h4>
                      <Badge variant="outline" className="text-[10px] flex-shrink-0">
                        {item.requiredHours}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1.5">
                      {item.targetGrade} | 시기: {item.timing}
                    </p>
                    <div className="text-xs text-muted-foreground bg-emerald-50 dark:bg-emerald-950/30 px-2 py-1 rounded mb-1.5">
                      {item.legalBasis}
                    </div>
                    {item.neisPath && (
                      <div className="text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                        {item.neisPath}
                      </div>
                    )}
                    {item.practicalTips.length > 0 && (
                      <div className="mt-2">
                        <p className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400 mb-0.5">실천 팁:</p>
                        <ul className="space-y-0.5">
                          {item.practicalTips.slice(0, 2).map((tip, i) => (
                            <li key={i} className="text-[10px] text-muted-foreground flex items-start gap-1">
                              <ChevronRight className="h-2.5 w-2.5 mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>이번 달 특별히 지정된 법정 의무교육이 없습니다.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 다가오는 행사 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-violet-600" />
                {currentMonth}월 다가오는 행사
              </CardTitle>
              <Badge variant="secondary">{schoolEvents.length}개 행사</Badge>
            </div>
            <CardDescription>이번 달 학교 행사 및 기념일</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[320px] pr-2">
              <div className="space-y-2.5">
                {schoolEvents.length > 0 ? schoolEvents.map((event, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border transition-colors ${
                      event.required
                        ? 'border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20'
                        : 'hover:border-violet-200 dark:hover:border-violet-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold">{event.name}</h4>
                          {event.required && (
                            <Badge className="text-[10px] px-1.5 py-0 bg-violet-500 text-white">필수</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge variant="outline" className="text-[10px]">{event.category}</Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {event.week}주차
                          </span>
                          {'targetGrade' in event && event.targetGrade && (
                            <Badge variant="secondary" className="text-[10px]">
                              {event.targetGrade}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>이번 달 등록된 행사가 없습니다.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* 필수 연수 미이수 체크 + 보강 업무 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 필수 연수 미이수 체크 위젯 */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-rose-600" />
                필수 연수 이수 현황
              </CardTitle>
              <Badge
                variant={uncompletedTrainingCount > 0 ? 'destructive' : 'default'}
                className={uncompletedTrainingCount === 0 ? 'bg-green-500 text-white' : ''}
              >
                {uncompletedTrainingCount > 0 ? `${uncompletedTrainingCount}개 미이수` : '전체 이수 완료'}
              </Badge>
            </div>
            <CardDescription>
              매년 12월 31일까지 이수해야 하는 법정 필수연수 ({allTrainings.length}개)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-muted-foreground">이수 진행률</span>
                <span className="font-medium">
                  {allTrainings.length - uncompletedTrainingCount}/{allTrainings.length}
                </span>
              </div>
              <Progress
                value={allTrainings.length > 0
                  ? Math.round(((allTrainings.length - uncompletedTrainingCount) / allTrainings.length) * 100)
                  : 0}
                className="h-2"
              />
            </div>
            <ScrollArea className="h-[300px] pr-2">
              <div className="space-y-2">
                {allTrainings.map(training => {
                  const isCompleted = completedTrainingIds.has(training.id);
                  return (
                    <div
                      key={training.id}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        isCompleted
                          ? 'bg-muted/50 opacity-70 border-green-200 dark:border-green-900'
                          : 'hover:border-rose-300 dark:hover:border-rose-700'
                      }`}
                      onClick={() => toggleTraining(training.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground hover:text-rose-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className={`text-sm font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                              {training.name}
                            </h4>
                            <Badge variant="outline" className="text-[10px] px-1 py-0">
                              {training.requiredHours}
                            </Badge>
                          </div>
                          <p className="text-[10px] text-muted-foreground">{training.method}</p>
                          {!isCompleted && training.penalty && (
                            <p className="text-[10px] text-rose-500 mt-0.5 flex items-center gap-1">
                              <AlertTriangle className="h-2.5 w-2.5" />
                              {training.penalty}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 이번 달 보강 업무 (Enhanced Monthly Tasks) */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-sky-600" />
                {currentMonth}월 놓치기 쉬운 업무
              </CardTitle>
              {enhancedMonthlyTasks && (
                <Badge variant="secondary">
                  {enhancedMonthlyTasks.tasks.length}건
                </Badge>
              )}
            </div>
            <CardDescription>기존 업무 외 누락되기 쉬운 보강 업무</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[340px] pr-2">
              <div className="space-y-3">
                {enhancedMonthlyTasks?.tasks && enhancedMonthlyTasks.tasks.length > 0 ? (
                  enhancedMonthlyTasks.tasks.map((task: { name: string; deadline: string; detail: string; legalBasis?: string; neisPath?: string }, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border hover:border-sky-300 dark:hover:border-sky-700 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-semibold">{task.name}</h4>
                        <Badge variant="outline" className="text-[10px] flex-shrink-0 text-sky-600 border-sky-300">
                          <Clock className="h-2.5 w-2.5 mr-0.5" />
                          {task.deadline}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1.5">{task.detail}</p>
                      {task.legalBasis && (
                        <div className="text-[10px] text-muted-foreground bg-sky-50 dark:bg-sky-950/30 px-2 py-0.5 rounded mb-1">
                          {task.legalBasis}
                        </div>
                      )}
                      {task.neisPath && (
                        <div className="text-[10px] bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                          {task.neisPath}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>이번 달 추가 보강 업무가 없습니다.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* 개선된 바로가기 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            주요 기능 바로가기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/tasks">
                <ClipboardList className="h-6 w-6 text-indigo-500" />
                <span className="text-xs font-medium">업무관리</span>
                <span className="text-[10px] text-muted-foreground">할 일 추적 및 체크</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/documents">
                <FileText className="h-6 w-6 text-emerald-500" />
                <span className="text-xs font-medium">문서작성</span>
                <span className="text-[10px] text-muted-foreground">공문서/가정통신문</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/ai-chat">
                <Sparkles className="h-6 w-6 text-purple-500" />
                <span className="text-xs font-medium">AI 도우미</span>
                <span className="text-[10px] text-muted-foreground">업무 질문/상담</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/school-record">
                <GraduationCap className="h-6 w-6 text-amber-500" />
                <span className="text-xs font-medium">생활기록부</span>
                <span className="text-[10px] text-muted-foreground">AI 문구 생성</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/duties-guide">
                <BookOpen className="h-6 w-6 text-sky-500" />
                <span className="text-xs font-medium">업무가이드</span>
                <span className="text-[10px] text-muted-foreground">부서별 상세 안내</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link href="/monthly-tasks">
                <CalendarDays className="h-6 w-6 text-rose-500" />
                <span className="text-xs font-medium">월별 업무</span>
                <span className="text-[10px] text-muted-foreground">월간 업무 캘린더</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
