'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  DialogTrigger,
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
  Loader2,
  Trash2,
  Edit,
  AlertCircle,
} from 'lucide-react';
import { useCalendarEvents } from '@/hooks/useFirestore';
import { CalendarEvent } from '@/lib/firebase-db';
import { Timestamp } from 'firebase/firestore';

const eventTypeConfig = {
  deadline: { label: '마감', color: 'bg-red-500', icon: AlertTriangle },
  meeting: { label: '회의', color: 'bg-blue-500', icon: CalendarIcon },
  event: { label: '행사', color: 'bg-green-500', icon: Circle },
  reminder: { label: '알림', color: 'bg-yellow-500', icon: Bell },
  holiday: { label: '공휴일', color: 'bg-purple-500', icon: CalendarIcon },
};

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

export default function CalendarPage() {
  const { events, loading, error, addEvent, editEvent, removeEvent } = useCalendarEvents();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'event' as 'deadline' | 'meeting' | 'event' | 'reminder',
    priority: 'medium' as 'high' | 'medium' | 'low',
    isCompleted: false,
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first day of month and total days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate calendar days
  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const formatDate = (date: Timestamp | null): string => {
    if (!date) return '';
    return date.toDate().toISOString().split('T')[0];
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((event) => formatDate(event.startDate) === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(year, month + (direction === 'next' ? 1 : -1), 1));
  };

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  // Upcoming events
  const upcomingEvents = events
    .filter((e) => !e.isCompleted && e.startDate && e.startDate.toDate() >= today)
    .sort((a, b) => (a.startDate?.toDate().getTime() || 0) - (b.startDate?.toDate().getTime() || 0))
    .slice(0, 5);

  // Selected date events
  const selectedDateEvents = selectedDate
    ? events.filter((e) => formatDate(e.startDate) === selectedDate)
    : [];

  const handleAddEvent = async () => {
    if (!newEvent.title.trim() || !newEvent.date) return;

    setIsSubmitting(true);
    try {
      await addEvent({
        ...newEvent,
        startDate: Timestamp.fromDate(new Date(newEvent.date)),
      });
      setNewEvent({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        type: 'event',
        priority: 'medium',
        isCompleted: false,
      });
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error('일정 추가 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditEvent = async () => {
    if (!editingEvent || !editingEvent.id) return;

    setIsSubmitting(true);
    try {
      await editEvent(editingEvent.id, {
        title: editingEvent.title,
        description: editingEvent.description,
        time: editingEvent.time,
        location: editingEvent.location,
        type: editingEvent.type,
        priority: editingEvent.priority,
        isCompleted: editingEvent.isCompleted,
      });
      setIsEditDialogOpen(false);
      setEditingEvent(null);
    } catch (err) {
      console.error('일정 수정 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      await removeEvent(eventId);
    }
  };

  const toggleEventComplete = async (event: CalendarEvent) => {
    if (!event.id) return;
    await editEvent(event.id, { isCompleted: !event.isCompleted });
  };

  const openEditDialog = (event: CalendarEvent) => {
    setEditingEvent({ ...event });
    setIsEditDialogOpen(true);
  };

  const openAddDialogForDate = (dateStr: string) => {
    setNewEvent({ ...newEvent, date: dateStr });
    setIsAddDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">일정을 불러오는 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-lg font-medium">{error}</p>
        <p className="text-muted-foreground">로그인이 필요하거나 네트워크 문제가 있을 수 있습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">학사 일정</h1>
          <p className="text-muted-foreground">
            주요 업무 일정과 마감일을 관리하세요
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              일정 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>새 일정 추가</DialogTitle>
              <DialogDescription>
                새로운 일정을 추가합니다.
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
              <div className="grid gap-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="일정에 대한 설명을 입력하세요"
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
              <div className="grid gap-2">
                <Label htmlFor="location">장소</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="장소를 입력하세요"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>유형</Label>
                  <Select
                    value={newEvent.type}
                    onValueChange={(value: 'deadline' | 'meeting' | 'event' | 'reminder') =>
                      setNewEvent({ ...newEvent, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deadline">마감</SelectItem>
                      <SelectItem value="meeting">회의</SelectItem>
                      <SelectItem value="event">행사</SelectItem>
                      <SelectItem value="reminder">알림</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>우선순위</Label>
                  <Select
                    value={newEvent.priority}
                    onValueChange={(value: 'high' | 'medium' | 'low') =>
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={handleAddEvent} disabled={isSubmitting || !newEvent.title.trim() || !newEvent.date}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    추가 중...
                  </>
                ) : (
                  '추가'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {year}년 {MONTHS[month]}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentDate(new Date())}
                >
                  오늘
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map((day, index) => (
                <div
                  key={day}
                  className={`text-center text-sm font-medium py-2 ${
                    index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''
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
                  return <div key={`empty-${index}`} className="h-24" />;
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
                      h-24 p-1 border rounded-lg cursor-pointer transition-colors
                      ${isSelected ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-accent'}
                      ${isToday(day) ? 'bg-primary/10' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`
                          text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full
                          ${isToday(day) ? 'bg-primary text-primary-foreground' : ''}
                          ${dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : ''}
                        `}
                      >
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <Badge variant="secondary" className="text-[10px] h-4 px-1">
                          {dayEvents.length}
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-0.5 overflow-hidden">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`
                            text-[10px] px-1 py-0.5 rounded truncate
                            ${eventTypeConfig[event.type].color} text-white
                            ${event.isCompleted ? 'opacity-50 line-through' : ''}
                          `}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[10px] text-muted-foreground px-1">
                          +{dayEvents.length - 2}개 더
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
              {Object.entries(eventTypeConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded ${config.color}`} />
                  <span className="text-muted-foreground">{config.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          {selectedDate && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {selectedDate.replace(/-/g, '.')} 일정
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map((event) => {
                      const EventIcon = eventTypeConfig[event.type].icon;
                      return (
                        <div
                          key={event.id}
                          className={`p-3 rounded-lg border ${event.isCompleted ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-1.5 rounded ${eventTypeConfig[event.type].color}`}>
                              <EventIcon className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-medium ${event.isCompleted ? 'line-through' : ''}`}>
                                {event.title}
                              </h4>
                              <div className="flex flex-col gap-1 mt-1 text-xs text-muted-foreground">
                                {event.time && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {event.time}
                                  </span>
                                )}
                                {event.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {event.location}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => toggleEventComplete(event)}
                              >
                                {event.isCompleted ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Circle className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => openEditDialog(event)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => event.id && handleDeleteEvent(event.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      이 날짜에 예정된 일정이 없습니다.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAddDialogForDate(selectedDate)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      일정 추가
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" />
                다가오는 일정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-3">
                  {upcomingEvents.map((event) => {
                    const EventIcon = eventTypeConfig[event.type].icon;
                    const eventDate = event.startDate?.toDate() || new Date();
                    const daysUntil = Math.ceil(
                      (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                    );

                    return (
                      <div
                        key={event.id}
                        className="p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                        onClick={() => {
                          const dateStr = formatDate(event.startDate);
                          setSelectedDate(dateStr);
                          if (event.startDate) {
                            const d = event.startDate.toDate();
                            setCurrentDate(new Date(d.getFullYear(), d.getMonth(), 1));
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-1.5 rounded ${eventTypeConfig[event.type].color}`}>
                            <EventIcon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {formatDate(event.startDate).replace(/-/g, '.')}
                              {event.time && ` ${event.time}`}
                            </p>
                          </div>
                          <Badge
                            variant={daysUntil <= 3 ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {daysUntil === 0 ? '오늘' : daysUntil < 0 ? '지남' : `D-${daysUntil}`}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}

                  {upcomingEvents.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      {events.length === 0 ? '등록된 일정이 없습니다.' : '예정된 일정이 없습니다.'}
                    </p>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
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
              <div className="grid gap-2">
                <Label htmlFor="edit-description">설명</Label>
                <Textarea
                  id="edit-description"
                  value={editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
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
                    onValueChange={(value: 'deadline' | 'meeting' | 'event' | 'reminder') =>
                      setEditingEvent({ ...editingEvent, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deadline">마감</SelectItem>
                      <SelectItem value="meeting">회의</SelectItem>
                      <SelectItem value="event">행사</SelectItem>
                      <SelectItem value="reminder">알림</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>우선순위</Label>
                  <Select
                    value={editingEvent.priority}
                    onValueChange={(value: 'high' | 'medium' | 'low') =>
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
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEditEvent} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                '저장'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
