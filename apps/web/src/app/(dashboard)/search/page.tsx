'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  FileText,
  CheckSquare,
  Calendar,
  Clock,
  Filter,
  X,
} from 'lucide-react';
import { useTasks, useDocuments, useCalendarEvents } from '@/hooks/useFirestore';
import Link from 'next/link';

type SearchCategory = 'all' | 'tasks' | 'documents' | 'events';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const { tasks } = useTasks();
  const { documents } = useDocuments();
  const { events } = useCalendarEvents();

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.description?.toLowerCase().includes(query.toLowerCase()) ||
      t.category?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDocuments = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.content?.toLowerCase().includes(query.toLowerCase()) ||
      d.type?.toLowerCase().includes(query.toLowerCase())
  );

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.description?.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults =
    (category === 'all' || category === 'tasks' ? filteredTasks.length : 0) +
    (category === 'all' || category === 'documents' ? filteredDocuments.length : 0) +
    (category === 'all' || category === 'events' ? filteredEvents.length : 0);

  const categories: { id: SearchCategory; label: string; icon: typeof Search }[] = [
    { id: 'all', label: '전체', icon: Search },
    { id: 'tasks', label: '업무', icon: CheckSquare },
    { id: 'documents', label: '문서', icon: FileText },
    { id: 'events', label: '일정', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Search className="h-6 w-6 text-primary" />
          검색
        </h1>
        <p className="text-muted-foreground">
          업무, 문서, 일정을 한 번에 검색하세요
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="검색어를 입력하세요..."
                className="pl-10"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 mt-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={category === cat.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategory(cat.id)}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {cat.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {query && (
        <div className="text-sm text-muted-foreground">
          &quot;{query}&quot;에 대한 검색 결과: {totalResults}건
        </div>
      )}

      {query && (
        <div className="space-y-6">
          {/* Tasks Results */}
          {(category === 'all' || category === 'tasks') && filteredTasks.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckSquare className="h-5 w-5 text-primary" />
                  업무 ({filteredTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredTasks.slice(0, 5).map((task) => (
                    <Link
                      key={task.id}
                      href="/tasks"
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.category}</p>
                        </div>
                      </div>
                      <Badge variant={task.status === 'completed' ? 'default' : 'outline'}>
                        {task.status === 'completed' ? '완료' : task.status === 'in_progress' ? '진행중' : '대기'}
                      </Badge>
                    </Link>
                  ))}
                  {filteredTasks.length > 5 && (
                    <Link href="/tasks" className="block text-center text-sm text-primary hover:underline py-2">
                      더 보기 ({filteredTasks.length - 5}건)
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents Results */}
          {(category === 'all' || category === 'documents') && filteredDocuments.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  문서 ({filteredDocuments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredDocuments.slice(0, 5).map((doc) => (
                    <Link
                      key={doc.id}
                      href="/documents"
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">{doc.type}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{doc.type}</Badge>
                    </Link>
                  ))}
                  {filteredDocuments.length > 5 && (
                    <Link href="/documents" className="block text-center text-sm text-primary hover:underline py-2">
                      더 보기 ({filteredDocuments.length - 5}건)
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Events Results */}
          {(category === 'all' || category === 'events') && filteredEvents.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  일정 ({filteredEvents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredEvents.slice(0, 5).map((event) => (
                    <Link
                      key={event.id}
                      href="/calendar"
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>
                              {event.startDate?.toDate().toLocaleDateString('ko-KR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {event.type || '일정'}
                      </Badge>
                    </Link>
                  ))}
                  {filteredEvents.length > 5 && (
                    <Link href="/calendar" className="block text-center text-sm text-primary hover:underline py-2">
                      더 보기 ({filteredEvents.length - 5}건)
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {totalResults === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">검색 결과가 없습니다</p>
                <p className="text-sm">다른 검색어로 다시 시도해보세요</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {!query && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">검색어를 입력하세요</p>
            <p className="text-sm">업무, 문서, 일정을 한 번에 검색할 수 있습니다</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
