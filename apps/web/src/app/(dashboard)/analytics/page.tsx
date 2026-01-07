'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  TrendingUp,
  Calendar,
  FileText,
  Target,
  Award,
} from 'lucide-react';
import { useTasks, useDocuments, useCalendarEvents } from '@/hooks/useFirestore';

export default function AnalyticsPage() {
  const { tasks } = useTasks();
  const { documents } = useDocuments();
  const { events } = useCalendarEvents();

  // 업무 통계
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // 우선순위별 업무
  const highPriorityTasks = tasks.filter((t) => t.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter((t) => t.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter((t) => t.priority === 'low').length;

  // 카테고리별 업무
  const tasksByCategory = tasks.reduce((acc, task) => {
    const category = task.category || '기타';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 문서 통계
  const totalDocuments = documents.length;
  const documentsByType = documents.reduce((acc, doc) => {
    const type = doc.type || '기타';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 이번 달 일정
  const now = new Date();
  const thisMonthEvents = events.filter((e) => {
    const eventDate = e.startDate?.toDate();
    return eventDate && eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          통계
        </h1>
        <p className="text-muted-foreground">
          업무 현황과 진행 상태를 한눈에 확인하세요
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">전체 업무</p>
                <p className="text-3xl font-bold">{totalTasks}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">완료율</p>
                <p className="text-3xl font-bold">{completionRate}%</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">문서</p>
                <p className="text-3xl font-bold">{totalDocuments}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">이번 달 일정</p>
                <p className="text-3xl font-bold">{thisMonthEvents}</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">업무 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>완료</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{completedTasks}</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>진행중</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{inProgressTasks}</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span>대기</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{pendingTasks}</span>
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-500 rounded-full"
                      style={{ width: `${totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Priority */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">우선순위별 업무</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>높음</span>
                </div>
                <Badge variant="destructive">{highPriorityTasks}</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span>보통</span>
                </div>
                <Badge className="bg-yellow-500">{mediumPriorityTasks}</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>낮음</span>
                </div>
                <Badge className="bg-green-500">{lowPriorityTasks}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">카테고리별 업무</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(tasksByCategory).length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                등록된 업무가 없습니다
              </p>
            ) : (
              <div className="space-y-2">
                {Object.entries(tasksByCategory)
                  .sort((a, b) => b[1] - a[1])
                  .map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                      <span>{category}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Documents by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">유형별 문서</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(documentsByType).length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                등록된 문서가 없습니다
              </p>
            ) : (
              <div className="space-y-2">
                {Object.entries(documentsByType)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent">
                      <span>{type}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Achievement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            업무 달성 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                  진행률
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-primary">
                  {completionRate}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-primary/10">
              <div
                style={{ width: `${completionRate}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              전체 {totalTasks}개 업무 중 {completedTasks}개 완료
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
