'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, AlertTriangle, Calendar, Loader2 } from 'lucide-react';
import { useTasks } from '@/hooks/useFirestore';
import { Task } from '@/lib/firebase-db';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

const priorityConfig: Record<string, { label: string; color: string }> = {
  low: { label: '낮음', color: 'bg-slate-500' },
  medium: { label: '보통', color: 'bg-blue-500' },
  high: { label: '높음', color: 'bg-orange-500' },
};

const statusConfig: Record<string, { label: string; variant: 'outline' | 'default' | 'success' }> = {
  pending: { label: '대기', variant: 'outline' },
  in_progress: { label: '진행중', variant: 'default' },
  completed: { label: '완료', variant: 'success' },
};

export function TaskOverview() {
  const { tasks, loading, error } = useTasks();

  const formatDate = (date: Timestamp | null): string => {
    if (!date) return '';
    return date.toDate().toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            이번 달 업무 현황
          </CardTitle>
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
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            이번 달 업무 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const urgentTasks = tasks.filter((t) => t.priority === 'high').length;

  // 최근 4개 업무만 표시
  const recentTasks = tasks.slice(0, 4);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          이번 달 업무 현황
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-accent/50">
            <div className="text-2xl font-bold text-primary">{totalTasks}</div>
            <div className="text-xs text-muted-foreground">전체</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-xs text-muted-foreground">완료</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
            <div className="text-xs text-muted-foreground">진행중</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950">
            <div className="text-2xl font-bold text-orange-600">{urgentTasks}</div>
            <div className="text-xs text-muted-foreground">긴급</div>
          </div>
        </div>

        {/* Task List */}
        {recentTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>등록된 업무가 없습니다.</p>
            <Link href="/tasks">
              <Button variant="outline" className="mt-4">
                업무 추가하기
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${priorityConfig[task.priority]?.color || 'bg-gray-500'}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{task.title}</span>
                      <Badge variant={statusConfig[task.status]?.variant || 'outline'} className="shrink-0">
                        {statusConfig[task.status]?.label || task.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">{task.category}</span>
                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(task.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-20">
                    <Progress value={task.progress} className="h-2" />
                    <span className="text-xs text-muted-foreground">{task.progress}%</span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/tasks" className="block mt-4">
              <Button variant="outline" className="w-full">
                모든 업무 보기
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
