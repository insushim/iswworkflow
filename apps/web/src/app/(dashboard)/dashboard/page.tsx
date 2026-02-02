'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Trash2,
  Edit,
  FileText,
  ClipboardList,
  Settings,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

// 일정 타입
interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  time?: string;
  location?: string;
  type: 'deadline' | 'meeting' | 'event' | 'reminder' | 'task';
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
  createdAt: string;
}

// localStorage 키
const EVENTS_STORAGE_KEY = 'eduflow_calendar_events';
const TASKS_STORAGE_KEY = 'eduflow_tasks';

const eventTypeConfig = {
  deadline: { label: '마감', color: 'bg-red-500', textColor: 'text-red-600' },
  meeting: { label: '회의', color: 'bg-blue-500', textColor: 'text-blue-600' },
  event: { label: '행사', color: 'bg-green-500', textColor: 'text-green-600' },
  reminder: { label: '알림', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  task: { label: '업무', color: 'bg-purple-500', textColor: 'text-purple-600' },
};

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

export default function DashboardPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [userName, setUserName] = useState('선생님');

  // 새 일정 폼 상태
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'event' as CalendarEvent['type'],
    priority: 'medium' as CalendarEvent['priority'],
  });

  // localStorage에서 일정 로드
  useEffect(() => {
    const loadEvents = () => {
      try {
        // 일정 로드
        const savedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        const calendarEvents: CalendarEvent[] = savedEvents ? JSON.parse(savedEvents) : [];

        // 업무도 일정으로 변환해서 추가
        const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
        if (savedTasks) {
          const tasks = JSON.parse(savedTasks);
          const taskEvents: CalendarEvent[] = tasks
            .filter((t: any) => t.dueDate)
            .map((t: any) => ({
              id: `task-${t.id}`,
              title: t.title,
              description: t.description,
              date: t.dueDate,
              type: 'task' as const,
              priority: t.priority || 'medium',
              isCompleted: t.status === 'completed',
              createdAt: t.createdAt,
            }));

          setEvents([...calendarEvents, ...taskEvents]);
        } else {
          setEvents(calendarEvents);
        }

        // 사용자 이름 로드
        const userSettings = localStorage.getItem('eduflow_user_settings');
        if (userSettings) {
          const settings = JSON.parse(userSettings);
          if (settings.displayName) {
            setUserName(settings.displayName);
          }
        }
      } catch (error) {
        console.error('일정 로드 실패:', error);
      }
    };

    loadEvents();
  }, []);

  // 일정 저장
  const saveEvents = (newEvents: CalendarEvent[]) => {
    // task 타입은 제외하고 저장 (tasks는 별도 관리)
    const calendarOnlyEvents = newEvents.filter(e => e.type !== 'task');
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(calendarOnlyEvents));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 달력 날짜 생성
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((event) => event.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(year, month + (direction === 'next' ? 1 : -1), 1));
  };

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  // 오늘의 일정
  const todayEvents = events.filter(e => e.date === todayStr);

  // 다가오는 일정 (7일 이내)
  const upcomingEvents = useMemo(() => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);
    const futureDateStr = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

    return events
      .filter((e) => !e.isCompleted && e.date >= todayStr && e.date <= futureDateStr)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 8);
  }, [events, todayStr]);

  // 선택된 날짜의 일정
  const selectedDateEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : [];

  // 일정 추가
  const handleAddEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date) {
      toast.error('일정명과 날짜를 입력해주세요.');
      return;
    }

    const event: CalendarEvent = {
      id: `event-${Date.now()}`,
      ...newEvent,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    const updatedEvents = [...events, event];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);

    setNewEvent({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'event',
      priority: 'medium',
    });
    setIsAddDialogOpen(false);
    toast.success('일정이 추가되었습니다.');
  };

  // 일정 수정
  const handleEditEvent = () => {
    if (!editingEvent) return;

    const updatedEvents = events.map((e) =>
      e.id === editingEvent.id ? editingEvent : e
    );
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    setIsEditDialogOpen(false);
    setEditingEvent(null);
    toast.success('일정이 수정되었습니다.');
  };

  // 일정 삭제
  const handleDeleteEvent = (eventId: string) => {
    if (eventId.startsWith('task-')) {
      toast.error('업무는 업무 관리 페이지에서 삭제해주세요.');
      return;
    }

    const updatedEvents = events.filter((e) => e.id !== eventId);
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    toast.success('일정이 삭제되었습니다.');
  };

  // 일정 완료 토글
  const toggleEventComplete = (event: CalendarEvent) => {
    if (event.id.startsWith('task-')) {
      toast.info('업무 완료는 업무 관리 페이지에서 변경해주세요.');
      return;
    }

    const updatedEvents = events.map((e) =>
      e.id === event.id ? { ...e, isCompleted: !e.isCompleted } : e
    );
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  // 날짜 더블클릭으로 일정 추가
  const openAddDialogForDate = (dateStr: string) => {
    setNewEvent({ ...newEvent, date: dateStr });
    setIsAddDialogOpen(true);
  };

  // D-Day 계산
  const getDaysUntil = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const diff = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="space-y-4">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            안녕하세요, {userName}님! 👋
          </h1>
          <p className="text-muted-foreground text-sm">
            {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일 ({DAYS[today.getDay()]})
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4 mr-2" />
              설정
            </Link>
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            일정 추가
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{todayEvents.length}</p>
                <p className="text-xs text-muted-foreground">오늘 일정</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                <p className="text-xs text-muted-foreground">이번 주 일정</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {events.filter(e => e.type === 'deadline' && !e.isCompleted && e.date >= todayStr).length}
                </p>
                <p className="text-xs text-muted-foreground">마감 예정</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {events.filter(e => e.isCompleted).length}
                </p>
                <p className="text-xs text-muted-foreground">완료</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Calendar - 3 cols */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">
                {year}년 {MONTHS[month]}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  오늘
                </Button>
                <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS.map((day, index) => (
                <div
                  key={day}
                  className={`text-center text-xs font-medium py-2 ${
                    index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-muted-foreground'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="h-20 md:h-24" />;
                }

                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayEvents = getEventsForDate(day);
                const isSelected = selectedDate === dateStr;
                const dayOfWeek = (firstDayOfMonth + day - 1) % 7;

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    onDoubleClick={() => openAddDialogForDate(dateStr)}
                    className={`
                      h-20 md:h-24 p-1 border rounded-lg cursor-pointer transition-all
                      ${isSelected ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:bg-accent/50'}
                      ${isToday(day) ? 'bg-primary/10' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span
                        className={`
                          text-xs md:text-sm font-medium w-5 h-5 md:w-6 md:h-6 flex items-center justify-center rounded-full
                          ${isToday(day) ? 'bg-primary text-primary-foreground' : ''}
                          ${dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : ''}
                        `}
                      >
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <Badge variant="secondary" className="text-[9px] h-4 px-1">
                          {dayEvents.length}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-0.5 overflow-hidden">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`
                            text-[9px] md:text-[10px] px-1 py-0.5 rounded truncate
                            ${eventTypeConfig[event.type].color} text-white
                            ${event.isCompleted ? 'opacity-50 line-through' : ''}
                          `}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[9px] text-muted-foreground px-1">
                          +{dayEvents.length - 2}개
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t">
              {Object.entries(eventTypeConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs">
                  <div className={`w-2.5 h-2.5 rounded ${config.color}`} />
                  <span className="text-muted-foreground">{config.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar - 1 col */}
        <div className="space-y-4">
          {/* Selected Date Events */}
          {selectedDate ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  📅 {selectedDate.replace(/-/g, '.')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                {selectedDateEvents.length > 0 ? (
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2">
                      {selectedDateEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`p-2 rounded-lg border ${event.isCompleted ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-start gap-2">
                            <button
                              onClick={() => toggleEventComplete(event)}
                              className="mt-0.5"
                            >
                              {event.isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <Circle className="h-4 w-4 text-muted-foreground" />
                              )}
                            </button>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1">
                                <Badge className={`${eventTypeConfig[event.type].color} text-white text-[9px] px-1 py-0`}>
                                  {eventTypeConfig[event.type].label}
                                </Badge>
                              </div>
                              <p className={`text-sm font-medium mt-0.5 ${event.isCompleted ? 'line-through' : ''}`}>
                                {event.title}
                              </p>
                              {event.time && (
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                  <Clock className="h-3 w-3" />
                                  {event.time}
                                </p>
                              )}
                            </div>
                            {!event.id.startsWith('task-') && (
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => {
                                    setEditingEvent(event);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-destructive"
                                  onClick={() => handleDeleteEvent(event.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      일정이 없습니다
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddDialogForDate(selectedDate)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      추가
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  다가오는 일정
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <ScrollArea className="h-[200px]">
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-2">
                      {upcomingEvents.map((event) => {
                        const daysUntil = getDaysUntil(event.date);
                        return (
                          <div
                            key={event.id}
                            className="p-2 rounded-lg border hover:bg-accent/50 cursor-pointer"
                            onClick={() => {
                              setSelectedDate(event.date);
                              const [y, m] = event.date.split('-').map(Number);
                              setCurrentDate(new Date(y, m - 1, 1));
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <Badge className={`${eventTypeConfig[event.type].color} text-white text-[9px] px-1 py-0`}>
                                {eventTypeConfig[event.type].label}
                              </Badge>
                              <Badge
                                variant={daysUntil <= 1 ? 'destructive' : daysUntil <= 3 ? 'default' : 'secondary'}
                                className="text-[9px]"
                              >
                                {daysUntil === 0 ? '오늘' : `D-${daysUntil}`}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium mt-1 truncate">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date.replace(/-/g, '.')}
                              {event.time && ` ${event.time}`}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      이번 주 예정된 일정이 없습니다
                    </p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          )}

          {/* Quick Links */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">바로가기</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/tasks">
                    <ClipboardList className="h-4 w-4" />
                    <span className="text-xs">업무관리</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/documents">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs">문서작성</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/ai-chat">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs">AI 도우미</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 flex-col gap-1" asChild>
                  <Link href="/duties-guide">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-xs">업무가이드</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>새 일정 추가</DialogTitle>
            <DialogDescription>
              달력에 새로운 일정을 추가합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">일정명 *</Label>
              <Input
                id="title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="일정명을 입력하세요"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">날짜 *</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">시간</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>유형</Label>
                <Select
                  value={newEvent.type}
                  onValueChange={(value: CalendarEvent['type']) =>
                    setNewEvent({ ...newEvent, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">행사</SelectItem>
                    <SelectItem value="deadline">마감</SelectItem>
                    <SelectItem value="meeting">회의</SelectItem>
                    <SelectItem value="reminder">알림</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>우선순위</Label>
                <Select
                  value={newEvent.priority}
                  onValueChange={(value: CalendarEvent['priority']) =>
                    setNewEvent({ ...newEvent, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">높음</SelectItem>
                    <SelectItem value="medium">보통</SelectItem>
                    <SelectItem value="low">낮음</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">장소</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="장소를 입력하세요"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">메모</Label>
              <Textarea
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="메모를 입력하세요"
                rows={2}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleAddEvent}>
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>일정 수정</DialogTitle>
            <DialogDescription>
              일정 정보를 수정합니다.
            </DialogDescription>
          </DialogHeader>
          {editingEvent && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">일정명 *</Label>
                <Input
                  id="edit-title"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-time">시간</Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={editingEvent.time || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-location">장소</Label>
                  <Input
                    id="edit-location"
                    value={editingEvent.location || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>유형</Label>
                  <Select
                    value={editingEvent.type}
                    onValueChange={(value: CalendarEvent['type']) =>
                      setEditingEvent({ ...editingEvent, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="event">행사</SelectItem>
                      <SelectItem value="deadline">마감</SelectItem>
                      <SelectItem value="meeting">회의</SelectItem>
                      <SelectItem value="reminder">알림</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>우선순위</Label>
                  <Select
                    value={editingEvent.priority}
                    onValueChange={(value: CalendarEvent['priority']) =>
                      setEditingEvent({ ...editingEvent, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">높음</SelectItem>
                      <SelectItem value="medium">보통</SelectItem>
                      <SelectItem value="low">낮음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">메모</Label>
                <Textarea
                  id="edit-description"
                  value={editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  rows={2}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEditEvent}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
