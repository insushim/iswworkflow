'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
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
import { Label } from '@/components/ui/label';
import {
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Calendar,
  ChevronRight,
  PlayCircle,
  Loader2,
  Trash2,
  Edit,
  Star,
  Sparkles,
} from 'lucide-react';
import { useTasks, useUserSettings } from '@/hooks/useFirestore';
import { Task } from '@/lib/firebase-db';
import { Timestamp } from 'firebase/firestore';
import { dutyToTaskCategoryMapping, getMatchingCategories } from '@/data/departments';

const priorityConfig = {
  high: { label: '긴급', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
  medium: { label: '보통', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50' },
  low: { label: '낮음', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
};

const statusConfig = {
  pending: { label: '대기중', icon: Circle, color: 'text-gray-500' },
  in_progress: { label: '진행중', icon: Clock, color: 'text-blue-500' },
  completed: { label: '완료', icon: CheckCircle2, color: 'text-green-500' },
};

const categories = ['전체', '학급경영', '학부모', '체험학습', '안전', '교육과정', '방과후', '생활기록', '기타'];

export default function TasksPage() {
  const { tasks, loading, error, addTask, editTask, removeTask } = useTasks();
  const { settings } = useUserSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 사용자 설정에서 업무 정보 가져오기
  const extSettings = settings as unknown as { roles?: string[]; customTasks?: string[] };
  const userRoles = extSettings?.roles || [];
  const userCustomTasks = extSettings?.customTasks || [];
  const allUserDuties = [...userRoles, ...userCustomTasks];

  // 디버깅용 로그
  console.log('[Tasks] 설정 로드:', { settings, userRoles, userCustomTasks, allUserDuties });

  // 사용자 업무에 맞는 카테고리 찾기
  const matchedCategories = useMemo(() => {
    const result = getMatchingCategories(allUserDuties, dutyToTaskCategoryMapping);
    console.log('[Tasks] 매칭된 카테고리:', result);
    return result;
  }, [allUserDuties]);

  // 업무가 사용자 설정과 매칭되는지 확인
  const isMatchedTask = (task: Task) => {
    return matchedCategories.includes(task.category);
  };

  // New task form state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: '학급경영',
    priority: 'medium' as 'high' | 'medium' | 'low',
    status: 'pending' as 'pending' | 'in_progress' | 'completed',
    dueDate: '',
    progress: 0,
  });

  // 필터링 및 정렬 (사용자 업무 우선)
  const filteredTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '전체' || task.category === selectedCategory;
      const matchesStatus = !selectedStatus || task.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // 사용자 업무가 있으면 매칭되는 업무 우선 정렬
    if (allUserDuties.length > 0) {
      result = [...result].sort((a, b) => {
        const aMatched = isMatchedTask(a);
        const bMatched = isMatchedTask(b);
        if (aMatched && !bMatched) return -1;
        if (!aMatched && bMatched) return 1;
        return 0;
      });
    }

    return result;
  }, [tasks, searchQuery, selectedCategory, selectedStatus, allUserDuties, matchedCategories]);

  const taskStats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    setIsSubmitting(true);
    try {
      await addTask({
        ...newTask,
        dueDate: newTask.dueDate ? Timestamp.fromDate(new Date(newTask.dueDate)) : null,
      });
      setNewTask({
        title: '',
        description: '',
        category: '학급경영',
        priority: 'medium',
        status: 'pending',
        dueDate: '',
        progress: 0,
      });
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error('업무 추가 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTask = async () => {
    if (!editingTask || !editingTask.id) return;

    setIsSubmitting(true);
    try {
      await editTask(editingTask.id, {
        title: editingTask.title,
        description: editingTask.description,
        category: editingTask.category,
        priority: editingTask.priority,
        status: editingTask.status,
        progress: editingTask.progress,
      });
      setIsEditDialogOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error('업무 수정 실패:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('정말로 이 업무를 삭제하시겠습니까?')) {
      await removeTask(taskId);
    }
  };

  const openEditDialog = (task: Task) => {
    setEditingTask({ ...task });
    setIsEditDialogOpen(true);
  };

  const formatDueDate = (dueDate: Timestamp | null): string => {
    if (!dueDate) return '미정';
    return dueDate.toDate().toLocaleDateString('ko-KR');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Skeleton Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2 animate-pulse">
            <div className="h-8 w-32 bg-muted rounded" />
            <div className="h-4 w-48 bg-muted rounded" />
          </div>
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
        {/* Skeleton Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
        {/* Skeleton Filters */}
        <div className="h-16 bg-muted rounded-lg animate-pulse" />
        {/* Skeleton List */}
        <div className="space-y-3 p-4 border rounded-lg">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border rounded-lg animate-pulse">
              <div className="h-5 w-5 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-3 w-1/2 bg-muted rounded" />
              </div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-muted rounded" />
                <div className="h-8 w-8 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
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
          <h1 className="text-2xl font-bold">업무 관리</h1>
          <p className="text-muted-foreground">
            총 {taskStats.total}개의 업무 중 {taskStats.completed}개 완료
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              새 업무 추가
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>새 업무 추가</DialogTitle>
              <DialogDescription>
                새로운 업무를 추가합니다. 필수 항목을 입력해주세요.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">업무명 *</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="업무명을 입력하세요"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="업무에 대한 설명을 입력하세요"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select
                    value={newTask.category}
                    onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== '전체').map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">우선순위</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: 'high' | 'medium' | 'low') =>
                      setNewTask({ ...newTask, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">긴급</SelectItem>
                      <SelectItem value="medium">보통</SelectItem>
                      <SelectItem value="low">낮음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dueDate">마감일</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                취소
              </Button>
              <Button onClick={handleAddTask} disabled={isSubmitting || !newTask.title.trim()}>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className={`cursor-pointer transition-colors ${!selectedStatus ? 'ring-2 ring-primary' : ''}`}
          onClick={() => setSelectedStatus(null)}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">전체 업무</p>
                <p className="text-2xl font-bold">{taskStats.total}</p>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-colors ${selectedStatus === 'pending' ? 'ring-2 ring-gray-500' : ''}`}
          onClick={() => setSelectedStatus(selectedStatus === 'pending' ? null : 'pending')}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">대기중</p>
                <p className="text-2xl font-bold">{taskStats.pending}</p>
              </div>
              <div className="p-3 rounded-full bg-gray-100">
                <Circle className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-colors ${selectedStatus === 'in_progress' ? 'ring-2 ring-blue-500' : ''}`}
          onClick={() => setSelectedStatus(selectedStatus === 'in_progress' ? null : 'in_progress')}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">진행중</p>
                <p className="text-2xl font-bold">{taskStats.inProgress}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-colors ${selectedStatus === 'completed' ? 'ring-2 ring-green-500' : ''}`}
          onClick={() => setSelectedStatus(selectedStatus === 'completed' ? null : 'completed')}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">완료</p>
                <p className="text-2xl font-bold">{taskStats.completed}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 나의 업무 안내 카드 */}
      {matchedCategories.length > 0 && (
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="pt-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-primary mb-1">나의 업무 카테고리</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  설정에서 선택한 업무와 관련된 카테고리가 우선 표시됩니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {matchedCategories.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      className="bg-primary/20 text-primary border-primary/30 cursor-pointer hover:bg-primary/30"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <Star className="h-3 w-3 mr-1 fill-primary" />
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="업무 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap ${matchedCategories.includes(category) && category !== '전체' ? 'ring-1 ring-primary/50' : ''}`}
                >
                  {matchedCategories.includes(category) && category !== '전체' && (
                    <Star className="h-3 w-3 mr-1 fill-primary text-primary" />
                  )}
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>업무 목록</span>
            <Badge variant="secondary">{filteredTasks.length}개</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {filteredTasks.map((task) => {
                const StatusIcon = statusConfig[task.status].icon;
                const priority = priorityConfig[task.priority];
                const matched = isMatchedTask(task);

                return (
                  <div
                    key={task.id}
                    className={`p-4 border rounded-lg hover:bg-accent/50 transition-colors ${matched ? 'border-primary/30 bg-primary/5' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 ${statusConfig[task.status].color}`}>
                        <StatusIcon className="h-5 w-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {matched && (
                            <Badge variant="secondary" className="bg-primary/20 text-primary text-xs px-1.5 py-0">
                              <Star className="h-2.5 w-2.5 mr-0.5 fill-primary" />
                              나의 업무
                            </Badge>
                          )}
                          <h3 className="font-medium truncate">{task.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <Badge variant="secondary">{task.category}</Badge>
                          <span className={`px-2 py-0.5 rounded-full ${priority.bgColor} ${priority.textColor}`}>
                            {priority.label}
                          </span>
                          <span className="flex items-center text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDueDate(task.dueDate)}
                          </span>
                        </div>
                        {task.status === 'in_progress' && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">진행률</span>
                              <span className="font-medium">{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-1.5" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(task)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => task.id && handleDeleteTask(task.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredTasks.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{tasks.length === 0 ? '등록된 업무가 없습니다. 새 업무를 추가해보세요!' : '검색 결과가 없습니다.'}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>업무 수정</DialogTitle>
            <DialogDescription>
              업무 정보를 수정합니다.
            </DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">업무명 *</Label>
                <Input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">설명</Label>
                <Textarea
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>카테고리</Label>
                  <Select
                    value={editingTask.category}
                    onValueChange={(value) => setEditingTask({ ...editingTask, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== '전체').map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>우선순위</Label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value: 'high' | 'medium' | 'low') =>
                      setEditingTask({ ...editingTask, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">긴급</SelectItem>
                      <SelectItem value="medium">보통</SelectItem>
                      <SelectItem value="low">낮음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>상태</Label>
                  <Select
                    value={editingTask.status}
                    onValueChange={(value: 'pending' | 'in_progress' | 'completed') =>
                      setEditingTask({ ...editingTask, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">대기중</SelectItem>
                      <SelectItem value="in_progress">진행중</SelectItem>
                      <SelectItem value="completed">완료</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>진행률 ({editingTask.progress}%)</Label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={editingTask.progress}
                    onChange={(e) => setEditingTask({ ...editingTask, progress: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEditTask} disabled={isSubmitting}>
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
