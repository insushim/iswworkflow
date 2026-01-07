'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Calendar,
  MessageSquare,
  FolderKanban,
  FileSearch,
  Bell,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const quickActions = [
  {
    icon: MessageSquare,
    label: 'AI에게 질문',
    description: '업무 관련 질문하기',
    href: '/ai-chat',
    color: 'text-violet-500',
    bgColor: 'bg-violet-50 dark:bg-violet-950',
  },
  {
    icon: FileText,
    label: '문서 생성',
    description: '공문서 자동 작성',
    href: '/documents/new',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950',
  },
  {
    icon: FolderKanban,
    label: '워크플로우',
    description: '업무 절차 안내',
    href: '/workflows',
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-950',
  },
  {
    icon: Calendar,
    label: '일정 추가',
    description: '새 일정 등록',
    href: '/calendar/new',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950',
  },
  {
    icon: FileSearch,
    label: '자료 검색',
    description: '커뮤니티 자료 찾기',
    href: '/resources',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950',
  },
  {
    icon: Bell,
    label: '알림 설정',
    description: '마감일 알림 관리',
    href: '/reminders',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50 dark:bg-rose-950',
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5 text-yellow-500" />
          빠른 실행
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.label} href={action.href}>
                <Button
                  variant="outline"
                  className="h-auto w-full flex-col items-start gap-2 p-4 hover:bg-accent"
                >
                  <div className={`p-2 rounded-lg ${action.bgColor}`}>
                    <Icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
