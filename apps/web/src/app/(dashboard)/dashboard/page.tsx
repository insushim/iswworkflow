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
import { useUserSettings } from '@/hooks/useFirestore';

const SETTINGS_KEY = 'eduflow_teacher_settings';
const COMPLETED_TASKS_KEY = 'eduflow_completed_tasks';

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

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const monthData = getCurrentMonthTasks();
  const role = settings?.role || 'homeroom';

  const myTasks = useMemo(() => {
    return getTasksByRole(currentMonth, role);
  }, [currentMonth, role]);

  const criticalTasks = useMemo(() => getCriticalTasks(currentMonth), [currentMonth]);
  const neisTasks = useMemo(() => getNEISTasks(currentMonth), [currentMonth]);

  const completedCount = myTasks.filter(t => completedTaskIds.has(t.id)).length;
  const progressPercent = myTasks.length > 0 ? Math.round((completedCount / myTasks.length) * 100) : 0;

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
    </div>
  );
}
