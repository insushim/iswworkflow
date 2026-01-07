'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ChevronRight, Loader2 } from 'lucide-react';
import { useCalendarEvents } from '@/hooks/useFirestore';
import { CalendarEvent } from '@/lib/firebase-db';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

const typeConfig = {
  meeting: { label: '회의', color: 'bg-blue-500', badgeVariant: 'default' as const },
  deadline: { label: '마감', color: 'bg-red-500', badgeVariant: 'destructive' as const },
  event: { label: '행사', color: 'bg-green-500', badgeVariant: 'success' as const },
  holiday: { label: '공휴일', color: 'bg-purple-500', badgeVariant: 'secondary' as const },
};

export function CalendarWidget() {
  const { events, loading, error } = useCalendarEvents();

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const formatEventDate = (date: Timestamp | null): string => {
    if (!date) return '';
    const eventDate = date.toDate();
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '오늘';
    if (diffDays === 1) return '내일';
    if (diffDays > 0 && diffDays <= 7) return `${diffDays}일 후`;
    return eventDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  const formatTime = (date: Timestamp | null): string | null => {
    if (!date) return null;
    return date.toDate().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  // 오늘 이후의 이벤트만 필터링하고 날짜순 정렬, 최대 4개
  const upcomingEvents = events
    .filter((event) => {
      if (!event.startDate) return false;
      const eventDate = event.startDate.toDate();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => {
      const dateA = a.startDate?.toDate().getTime() || 0;
      const dateB = b.startDate?.toDate().getTime() || 0;
      return dateA - dateB;
    })
    .slice(0, 4);

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-blue-500" />
              다가오는 일정
            </CardTitle>
            <span className="text-sm text-muted-foreground">{dateString}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-blue-500" />
              다가오는 일정
            </CardTitle>
            <span className="text-sm text-muted-foreground">{dateString}</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-blue-500" />
            다가오는 일정
          </CardTitle>
          <span className="text-sm text-muted-foreground">{dateString}</span>
        </div>
      </CardHeader>
      <CardContent>
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>예정된 일정이 없습니다.</p>
            <Link href="/calendar">
              <Button variant="outline" className="mt-4">
                일정 추가하기
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const eventType = (event.type || 'event') as keyof typeof typeConfig;
                const config = typeConfig[eventType] || typeConfig.event;

                return (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className={`h-2 w-2 mt-2 rounded-full ${config.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{event.title}</span>
                        <Badge variant={config.badgeVariant} className="text-xs">
                          {config.label}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatEventDate(event.startDate)}
                        </span>
                        {formatTime(event.startDate) && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(event.startDate)}
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
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                );
              })}
            </div>

            <Link href="/calendar" className="block mt-4">
              <Button variant="outline" className="w-full">
                전체 캘린더 보기
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
