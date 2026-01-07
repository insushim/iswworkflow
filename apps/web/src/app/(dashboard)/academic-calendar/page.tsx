'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
} from 'lucide-react';

// 2024-2025 학사일정 데이터
const academicEvents = {
  '2025-01': [
    { date: 1, title: '신정', type: 'holiday' },
    { date: 6, title: '겨울방학 시작', type: 'vacation' },
    { date: 28, title: '설날 연휴', type: 'holiday' },
    { date: 29, title: '설날', type: 'holiday' },
    { date: 30, title: '설날 연휴', type: 'holiday' },
  ],
  '2025-02': [
    { date: 14, title: '졸업식', type: 'ceremony' },
    { date: 21, title: '종업식', type: 'ceremony' },
    { date: 22, title: '겨울방학 종료', type: 'vacation' },
  ],
  '2025-03': [
    { date: 1, title: '삼일절', type: 'holiday' },
    { date: 2, title: '신학기 개학일', type: 'ceremony' },
    { date: 3, title: '입학식', type: 'ceremony' },
    { date: 10, title: '학부모 총회', type: 'event' },
    { date: 15, title: '학급 임원 선거', type: 'event' },
  ],
  '2025-04': [
    { date: 5, title: '학교운영위원회', type: 'meeting' },
    { date: 10, title: '과학의 날 행사', type: 'event' },
    { date: 15, title: '중간고사 시작', type: 'exam' },
    { date: 18, title: '중간고사 종료', type: 'exam' },
    { date: 22, title: '과학탐구대회', type: 'event' },
  ],
  '2025-05': [
    { date: 1, title: '근로자의 날', type: 'holiday' },
    { date: 5, title: '어린이날', type: 'holiday' },
    { date: 6, title: '대체공휴일', type: 'holiday' },
    { date: 8, title: '학부모 공개수업', type: 'event' },
    { date: 15, title: '스승의 날', type: 'event' },
    { date: 20, title: '현장체험학습', type: 'event' },
  ],
  '2025-06': [
    { date: 6, title: '현충일', type: 'holiday' },
    { date: 16, title: '기말고사 시작', type: 'exam' },
    { date: 19, title: '기말고사 종료', type: 'exam' },
    { date: 25, title: '학부모 상담주간', type: 'event' },
  ],
  '2025-07': [
    { date: 11, title: '여름방학식', type: 'ceremony' },
    { date: 15, title: '여름방학 시작', type: 'vacation' },
    { date: 25, title: '여름 방과후 프로그램', type: 'event' },
  ],
  '2025-08': [
    { date: 15, title: '광복절', type: 'holiday' },
    { date: 18, title: '여름방학 종료', type: 'vacation' },
    { date: 19, title: '2학기 개학', type: 'ceremony' },
    { date: 25, title: '2학기 학급 임원 선거', type: 'event' },
  ],
  '2025-09': [
    { date: 5, title: '추석 연휴', type: 'holiday' },
    { date: 6, title: '추석', type: 'holiday' },
    { date: 7, title: '추석 연휴', type: 'holiday' },
    { date: 15, title: '학부모 공개수업', type: 'event' },
    { date: 25, title: '운동회', type: 'event' },
  ],
  '2025-10': [
    { date: 3, title: '개천절', type: 'holiday' },
    { date: 9, title: '한글날', type: 'holiday' },
    { date: 15, title: '중간고사 시작', type: 'exam' },
    { date: 18, title: '중간고사 종료', type: 'exam' },
    { date: 25, title: '학예회', type: 'event' },
  ],
  '2025-11': [
    { date: 10, title: '학부모 상담주간', type: 'event' },
    { date: 20, title: '학교운영위원회', type: 'meeting' },
    { date: 25, title: '진로체험의 날', type: 'event' },
  ],
  '2025-12': [
    { date: 15, title: '기말고사 시작', type: 'exam' },
    { date: 18, title: '기말고사 종료', type: 'exam' },
    { date: 24, title: '겨울방학식', type: 'ceremony' },
    { date: 25, title: '성탄절', type: 'holiday' },
    { date: 26, title: '겨울방학 시작', type: 'vacation' },
  ],
};

type EventType = 'holiday' | 'vacation' | 'ceremony' | 'event' | 'exam' | 'meeting';

const eventTypeConfig: Record<EventType, { label: string; color: string; icon: typeof Calendar }> = {
  holiday: { label: '공휴일', color: 'bg-red-100 text-red-700 border-red-200', icon: Sun },
  vacation: { label: '방학', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Snowflake },
  ceremony: { label: '행사', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: GraduationCap },
  event: { label: '학교행사', color: 'bg-green-100 text-green-700 border-green-200', icon: Users },
  exam: { label: '시험', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: Trophy },
  meeting: { label: '회의', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Megaphone },
};

export default function AcademicCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
  const events = academicEvents[monthKey as keyof typeof academicEvents] || [];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDayEvents = (day: number) => {
    return events.filter((e) => e.date === day);
  };

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            학사일정
          </h1>
          <p className="text-muted-foreground">
            2025학년도 학사일정을 확인하세요
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            오늘
          </Button>
        </div>
      </div>

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
                  className={`text-center text-sm font-medium py-2 ${
                    i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-muted-foreground'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before the first day of month */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="aspect-square p-1" />
              ))}

              {/* Days of the month */}
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
                    className={`aspect-square p-1 border rounded-lg ${
                      isToday ? 'border-primary bg-primary/5' : 'border-transparent'
                    }`}
                  >
                    <div
                      className={`text-sm font-medium ${
                        dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : ''
                      }`}
                    >
                      {day}
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {dayEvents.slice(0, 2).map((event, idx) => (
                        <div
                          key={idx}
                          className={`text-[10px] px-1 py-0.5 rounded truncate ${
                            eventTypeConfig[event.type as EventType]?.color || 'bg-gray-100'
                          }`}
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
            <CardTitle className="text-lg">
              {monthNames[month]} 일정
            </CardTitle>
          </CardHeader>
          <CardContent>
            {events.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                이번 달 등록된 일정이 없습니다.
              </p>
            ) : (
              <div className="space-y-3">
                {events
                  .sort((a, b) => a.date - b.date)
                  .map((event, idx) => {
                    const config = eventTypeConfig[event.type as EventType];
                    const Icon = config?.icon || Calendar;
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                      >
                        <div className={`p-2 rounded-lg ${config?.color || 'bg-gray-100'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {month + 1}월 {event.date}일
                          </p>
                        </div>
                        <Badge variant="outline" className={config?.color}>
                          {config?.label}
                        </Badge>
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
                  <div className={`p-1.5 rounded ${config.color}`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <span className="text-sm">{config.label}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
