'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Trophy,
  Users,
  Megaphone,
  Sun,
  Snowflake,
  Upload,
  FileText,
  Plus,
  Trash2,
  Save,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { academicCalendarFull, type AcademicEvent as DbAcademicEvent } from '@/data/academic-calendar-full';

// 데이터베이스 이벤트를 UI 이벤트로 변환
const convertDbEventsToUiEvents = (): Record<string, AcademicEvent[]> => {
  const result: Record<string, AcademicEvent[]> = {};
  const currentYear = new Date().getFullYear();

  // 카테고리 매핑
  const categoryMap: Record<string, AcademicEvent['type']> = {
    ceremony: 'ceremony',
    exam: 'exam',
    event: 'event',
    meeting: 'meeting',
    deadline: 'exam',
    vacation: 'vacation',
    training: 'event',
    inspection: 'meeting',
  };

  academicCalendarFull.forEach((event, index) => {
    // 학사년도 계산 (3월~2월)
    const year = event.month >= 3 ? currentYear : currentYear + 1;
    const monthKey = `${year}-${String(event.month).padStart(2, '0')}`;

    if (!result[monthKey]) {
      result[monthKey] = [];
    }

    // 날짜 계산 (day가 없으면 week 기반으로 추정)
    const day = event.day || (event.week ? event.week * 7 : 1);

    result[monthKey].push({
      id: event.id || `db-${index}`,
      date: day,
      title: event.title,
      type: categoryMap[event.category] || 'event',
      description: event.description,
      checklist: event.checklist,
      tips: event.tips,
      relatedDocuments: event.relatedDocuments,
      department: event.department,
      priority: event.priority,
    });
  });

  return result;
};

// 기본 2024-2025 학사일정 데이터
const defaultAcademicEvents: Record<string, AcademicEvent[]> = {
  '2025-01': [
    { id: '1', date: 1, title: '신정', type: 'holiday' },
    { id: '2', date: 6, title: '겨울방학 시작', type: 'vacation' },
    { id: '3', date: 28, title: '설날 연휴', type: 'holiday' },
    { id: '4', date: 29, title: '설날', type: 'holiday' },
    { id: '5', date: 30, title: '설날 연휴', type: 'holiday' },
  ],
  '2025-02': [
    { id: '6', date: 14, title: '졸업식', type: 'ceremony' },
    { id: '7', date: 21, title: '종업식', type: 'ceremony' },
    { id: '8', date: 22, title: '겨울방학 종료', type: 'vacation' },
  ],
  '2025-03': [
    { id: '9', date: 1, title: '삼일절', type: 'holiday' },
    { id: '10', date: 2, title: '신학기 개학일', type: 'ceremony' },
    { id: '11', date: 3, title: '입학식', type: 'ceremony' },
    { id: '12', date: 10, title: '학부모 총회', type: 'event' },
    { id: '13', date: 15, title: '학급 임원 선거', type: 'event' },
  ],
  '2025-04': [
    { id: '14', date: 5, title: '학교운영위원회', type: 'meeting' },
    { id: '15', date: 10, title: '과학의 날 행사', type: 'event' },
    { id: '16', date: 15, title: '중간고사 시작', type: 'exam' },
    { id: '17', date: 18, title: '중간고사 종료', type: 'exam' },
    { id: '18', date: 22, title: '과학탐구대회', type: 'event' },
  ],
  '2025-05': [
    { id: '19', date: 1, title: '근로자의 날', type: 'holiday' },
    { id: '20', date: 5, title: '어린이날', type: 'holiday' },
    { id: '21', date: 6, title: '대체공휴일', type: 'holiday' },
    { id: '22', date: 8, title: '학부모 공개수업', type: 'event' },
    { id: '23', date: 15, title: '스승의 날', type: 'event' },
    { id: '24', date: 20, title: '현장체험학습', type: 'event' },
  ],
  '2025-06': [
    { id: '25', date: 6, title: '현충일', type: 'holiday' },
    { id: '26', date: 16, title: '기말고사 시작', type: 'exam' },
    { id: '27', date: 19, title: '기말고사 종료', type: 'exam' },
    { id: '28', date: 25, title: '학부모 상담주간', type: 'event' },
  ],
  '2025-07': [
    { id: '29', date: 11, title: '여름방학식', type: 'ceremony' },
    { id: '30', date: 15, title: '여름방학 시작', type: 'vacation' },
    { id: '31', date: 25, title: '여름 방과후 프로그램', type: 'event' },
  ],
  '2025-08': [
    { id: '32', date: 15, title: '광복절', type: 'holiday' },
    { id: '33', date: 18, title: '여름방학 종료', type: 'vacation' },
    { id: '34', date: 19, title: '2학기 개학', type: 'ceremony' },
    { id: '35', date: 25, title: '2학기 학급 임원 선거', type: 'event' },
  ],
  '2025-09': [
    { id: '36', date: 5, title: '추석 연휴', type: 'holiday' },
    { id: '37', date: 6, title: '추석', type: 'holiday' },
    { id: '38', date: 7, title: '추석 연휴', type: 'holiday' },
    { id: '39', date: 15, title: '학부모 공개수업', type: 'event' },
    { id: '40', date: 25, title: '운동회', type: 'event' },
  ],
  '2025-10': [
    { id: '41', date: 3, title: '개천절', type: 'holiday' },
    { id: '42', date: 9, title: '한글날', type: 'holiday' },
    { id: '43', date: 15, title: '중간고사 시작', type: 'exam' },
    { id: '44', date: 18, title: '중간고사 종료', type: 'exam' },
    { id: '45', date: 25, title: '학예회', type: 'event' },
  ],
  '2025-11': [
    { id: '46', date: 10, title: '학부모 상담주간', type: 'event' },
    { id: '47', date: 20, title: '학교운영위원회', type: 'meeting' },
    { id: '48', date: 25, title: '진로체험의 날', type: 'event' },
  ],
  '2025-12': [
    { id: '49', date: 15, title: '기말고사 시작', type: 'exam' },
    { id: '50', date: 18, title: '기말고사 종료', type: 'exam' },
    { id: '51', date: 24, title: '겨울방학식', type: 'ceremony' },
    { id: '52', date: 25, title: '성탄절', type: 'holiday' },
    { id: '53', date: 26, title: '겨울방학 시작', type: 'vacation' },
  ],
};

interface AcademicEvent {
  id: string;
  date: number;
  title: string;
  type: EventType;
  description?: string;
  checklist?: string[];
  tips?: string[];
  relatedDocuments?: string[];
  department?: string[];
  priority?: 'high' | 'medium' | 'low';
}

type EventType = 'holiday' | 'vacation' | 'ceremony' | 'event' | 'exam' | 'meeting';

// 데이터베이스 기반 학사일정 (하드코딩 대체)
const dbAcademicEvents = convertDbEventsToUiEvents();

const eventTypeConfig: Record<EventType, { label: string; color: string; icon: typeof Calendar }> = {
  holiday: { label: '공휴일', color: 'bg-red-100 text-red-700 border-red-200', icon: Sun },
  vacation: { label: '방학', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Snowflake },
  ceremony: { label: '행사', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: GraduationCap },
  event: { label: '학교행사', color: 'bg-green-100 text-green-700 border-green-200', icon: Users },
  exam: { label: '시험', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: Trophy },
  meeting: { label: '회의', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Megaphone },
};

// 파일에서 일정 파싱하는 시뮬레이션 함수
const parseCalendarFile = async (file: File): Promise<AcademicEvent[]> => {
  // 실제로는 서버 API를 통해 HWP/DOCX 파싱
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 파일명에서 힌트를 얻어 샘플 데이터 반환
  const fileName = file.name.toLowerCase();
  const parsedEvents: AcademicEvent[] = [];
  const baseId = Date.now();

  // 학사일정 파일에서 추출된 것처럼 시뮬레이션
  if (fileName.includes('학사') || fileName.includes('calendar') || fileName.includes('일정')) {
    parsedEvents.push(
      { id: `${baseId}-1`, date: 2, title: '개학일', type: 'ceremony' },
      { id: `${baseId}-2`, date: 5, title: '입학식', type: 'ceremony' },
      { id: `${baseId}-3`, date: 10, title: '학부모 총회', type: 'event' },
      { id: `${baseId}-4`, date: 15, title: '학급 임원 선거', type: 'event' },
      { id: `${baseId}-5`, date: 20, title: '현장체험학습', type: 'event' },
      { id: `${baseId}-6`, date: 25, title: '학교운영위원회', type: 'meeting' }
    );
  } else {
    // 기본 샘플 이벤트
    parsedEvents.push(
      { id: `${baseId}-1`, date: 5, title: '교직원 회의', type: 'meeting' },
      { id: `${baseId}-2`, date: 12, title: '학부모 상담', type: 'event' },
      { id: `${baseId}-3`, date: 20, title: '현장체험학습', type: 'event' }
    );
  }

  return parsedEvents;
};

export default function AcademicCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  // 데이터베이스 이벤트를 기본값으로, 하드코딩 데이터와 병합
  const [academicEvents, setAcademicEvents] = useState(() => {
    const merged = { ...defaultAcademicEvents };
    Object.entries(dbAcademicEvents).forEach(([key, events]) => {
      if (!merged[key]) merged[key] = [];
      // 중복 제거하며 병합
      const existingTitles = new Set(merged[key].map(e => e.title));
      events.forEach(e => {
        if (!existingTitles.has(e.title)) {
          merged[key].push(e);
        }
      });
      // 날짜순 정렬
      merged[key].sort((a, b) => a.date - b.date);
    });
    return merged;
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [parsedEvents, setParsedEvents] = useState<AcademicEvent[]>([]);
  const [showParsedDialog, setShowParsedDialog] = useState(false);
  const [targetMonth, setTargetMonth] = useState('');
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ date: '', title: '', type: 'event' as EventType });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const events = academicEvents[monthKey] || [];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  const getDayEvents = (day: number) => events.filter((e) => e.date === day);

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월',
  ];

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  // 파일 업로드 처리
  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ['.hwp', '.hwpx', '.doc', '.docx', '.txt'];
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validExtensions.includes(fileExt)) {
      toast.error('지원하지 않는 파일 형식입니다. (HWP, Word, TXT 지원)');
      return;
    }

    setIsUploading(true);
    setUploadedFileName(file.name);

    try {
      const parsed = await parseCalendarFile(file);
      setParsedEvents(parsed);
      setTargetMonth(monthKey);
      setShowParsedDialog(true);
      toast.success(`${parsed.length}개의 일정이 파싱되었습니다.`);
    } catch (error) {
      toast.error('파일 처리 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [monthKey]);

  // 파싱된 일정 적용
  const applyParsedEvents = useCallback(() => {
    if (!targetMonth || parsedEvents.length === 0) return;

    setAcademicEvents((prev) => {
      const existingEvents = prev[targetMonth] || [];
      const newEvents = [...existingEvents, ...parsedEvents];
      return { ...prev, [targetMonth]: newEvents };
    });

    setShowParsedDialog(false);
    setParsedEvents([]);
    toast.success('일정이 저장되었습니다.');
  }, [targetMonth, parsedEvents]);

  // 새 일정 추가
  const handleAddEvent = useCallback(() => {
    if (!newEvent.date || !newEvent.title) {
      toast.error('날짜와 일정명을 입력해주세요.');
      return;
    }

    const eventToAdd: AcademicEvent = {
      id: `custom-${Date.now()}`,
      date: parseInt(newEvent.date),
      title: newEvent.title,
      type: newEvent.type,
    };

    setAcademicEvents((prev) => {
      const existingEvents = prev[monthKey] || [];
      return { ...prev, [monthKey]: [...existingEvents, eventToAdd] };
    });

    setNewEvent({ date: '', title: '', type: 'event' });
    setIsAddEventOpen(false);
    toast.success('일정이 추가되었습니다.');
  }, [newEvent, monthKey]);

  // 일정 삭제
  const handleDeleteEvent = useCallback((eventId: string) => {
    setAcademicEvents((prev) => {
      const existingEvents = prev[monthKey] || [];
      return { ...prev, [monthKey]: existingEvents.filter((e) => e.id !== eventId) };
    });
    toast.success('일정이 삭제되었습니다.');
  }, [monthKey]);

  // 일정 저장 (로컬스토리지)
  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem('academicCalendar', JSON.stringify(academicEvents));
    toast.success('학사일정이 저장되었습니다.');
  }, [academicEvents]);

  // 일정 내보내기
  const exportCalendar = useCallback(() => {
    const dataStr = JSON.stringify(academicEvents, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `학사일정_${year}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('학사일정이 내보내기되었습니다.');
  }, [academicEvents, year]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            학사일정
          </h1>
          <p className="text-muted-foreground">
            학사일정을 관리하고 파일에서 일정을 가져오세요
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={goToToday}>
            오늘
          </Button>
          <Button variant="outline" size="sm" onClick={saveToLocalStorage}>
            <Save className="h-4 w-4 mr-1" />
            저장
          </Button>
          <Button variant="outline" size="sm" onClick={exportCalendar}>
            <Download className="h-4 w-4 mr-1" />
            내보내기
          </Button>
        </div>
      </div>

      {/* 파일 업로드 영역 */}
      <Card className="border-dashed border-2 bg-accent/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">학사일정 파일 업로드</h3>
                <p className="text-sm text-muted-foreground">
                  HWP, Word, TXT 파일을 업로드하면 자동으로 일정을 파싱합니다
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept=".hwp,.hwpx,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    파싱 중...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    파일 선택
                  </>
                )}
              </Button>
            </div>
          </div>
          {uploadedFileName && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              최근 업로드: {uploadedFileName}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <CardTitle className="text-xl">
                {year}년 {monthNames[month]}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day, i) => (
                <div
                  key={day}
                  className={cn(
                    'text-center text-sm font-medium py-2',
                    i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-muted-foreground'
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="aspect-square p-1" />
              ))}

              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dayOfWeek = (firstDayOfMonth + i) % 7;
                const dayEvents = getDayEvents(day);
                const isToday =
                  day === new Date().getDate() &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear();

                return (
                  <div
                    key={day}
                    className={cn(
                      'aspect-square p-1 border rounded-lg',
                      isToday ? 'border-primary bg-primary/5' : 'border-transparent'
                    )}
                  >
                    <div
                      className={cn(
                        'text-sm font-medium',
                        dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : ''
                      )}
                    >
                      {day}
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={cn(
                            'text-[10px] px-1 py-0.5 rounded truncate',
                            eventTypeConfig[event.type]?.color || 'bg-gray-100'
                          )}
                          title={event.title}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[10px] text-muted-foreground">
                          +{dayEvents.length - 2}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{monthNames[month]} 일정</CardTitle>
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    추가
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>새 일정 추가</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>날짜</Label>
                      <Input
                        type="number"
                        min="1"
                        max={daysInMonth}
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        placeholder={`1 ~ ${daysInMonth}`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>일정명</Label>
                      <Input
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="일정명을 입력하세요"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>유형</Label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value as EventType })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(eventTypeConfig).map(([key, config]) => (
                            <SelectItem key={key} value={key}>
                              {config.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={handleAddEvent}>추가</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                이번 달 등록된 일정이 없습니다.
              </p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {events
                  .sort((a, b) => a.date - b.date)
                  .map((event) => {
                    const config = eventTypeConfig[event.type];
                    const Icon = config?.icon || Calendar;
                    return (
                      <div
                        key={event.id}
                        className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors group"
                      >
                        <div className={cn('p-2 rounded-lg', config?.color || 'bg-gray-100')}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {month + 1}월 {event.date}일
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={config?.color}>
                            {config?.label}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-4">
            {Object.entries(eventTypeConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-2">
                  <div className={cn('p-1.5 rounded', config.color)}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <span className="text-sm">{config.label}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 파싱된 일정 확인 다이얼로그 */}
      <Dialog open={showParsedDialog} onOpenChange={setShowParsedDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              파싱된 일정 확인
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label>적용할 월</Label>
              <Select value={targetMonth} onValueChange={setTargetMonth}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((name, idx) => {
                    const key = `${year}-${String(idx + 1).padStart(2, '0')}`;
                    return (
                      <SelectItem key={key} value={key}>
                        {year}년 {name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {parsedEvents.map((event) => {
                const config = eventTypeConfig[event.type];
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-2 bg-accent rounded-lg"
                  >
                    <Badge variant="outline" className={config?.color}>
                      {event.date}일
                    </Badge>
                    <span className="flex-1">{event.title}</span>
                    <Badge variant="secondary">{config?.label}</Badge>
                  </div>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowParsedDialog(false)}>
              취소
            </Button>
            <Button onClick={applyParsedEvents}>
              <Plus className="h-4 w-4 mr-1" />
              일정 추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 안내 */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">파일 업로드 안내</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                <li>• 지원 형식: HWP, HWPX, DOC, DOCX, TXT</li>
                <li>• 학교에서 배포한 학사일정 파일을 업로드하세요</li>
                <li>• 파싱된 일정은 확인 후 원하는 월에 추가됩니다</li>
                <li>• 저장 버튼을 눌러야 브라우저에 일정이 저장됩니다</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
