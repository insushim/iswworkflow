'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Search,
  PlayCircle,
  CheckCircle2,
  Circle,
  Clock,
  ChevronRight,
  BookOpen,
  Users,
  FileText,
  Calendar,
  Shield,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  Loader2,
  AlertCircle,
  ChevronLeft,
  Star,
  Sparkles,
} from 'lucide-react';
import { useWorkflows, LocalWorkflow, useUserSettings } from '@/hooks/useFirestore';
import { WorkflowStep } from '@/lib/firebase-db';
import { dutyToWorkflowCategoryMapping, getMatchingCategories } from '@/data/departments';

const categoryIcons: Record<string, React.ElementType> = {
  '학급경영': BookOpen,
  '학부모': Users,
  '문서작성': FileText,
  '행사': Calendar,
  '안전': Shield,
  '평가': GraduationCap,
};

const difficultyConfig = {
  easy: { label: '쉬움', color: 'bg-green-100 text-green-700' },
  medium: { label: '보통', color: 'bg-yellow-100 text-yellow-700' },
  hard: { label: '어려움', color: 'bg-red-100 text-red-700' },
};

const categories = ['전체', '학급경영', '학부모', '행사', '안전', '평가', '문서작성'];

export default function WorkflowsPage() {
  const { workflows, progress, loading, error, updateProgress, getProgressForWorkflow } = useWorkflows();
  const { settings } = useUserSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedWorkflow, setSelectedWorkflow] = useState<LocalWorkflow | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

  // 사용자 설정에서 업무 정보 가져오기
  const extSettings = settings as unknown as { roles?: string[]; customTasks?: string[] };
  const userRoles = extSettings?.roles || [];
  const userCustomTasks = extSettings?.customTasks || [];
  const allUserDuties = [...userRoles, ...userCustomTasks];

  // 사용자 업무에 맞는 카테고리 찾기
  const matchedCategories = useMemo(() => {
    const result = getMatchingCategories(allUserDuties, dutyToWorkflowCategoryMapping);
    return result;
  }, [allUserDuties]);

  // 워크플로우가 사용자 설정과 매칭되는지 확인
  const isMatchedWorkflow = (workflow: LocalWorkflow) => {
    return matchedCategories.includes(workflow.category);
  };

  // 필터링 및 정렬 (사용자 업무 우선)
  const filteredWorkflows = useMemo(() => {
    let result = workflows.filter((workflow) => {
      const matchesSearch = workflow.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '전체' || workflow.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // 사용자 업무가 있으면 매칭되는 워크플로우 우선 정렬
    if (allUserDuties.length > 0) {
      result = [...result].sort((a, b) => {
        const aMatched = isMatchedWorkflow(a);
        const bMatched = isMatchedWorkflow(b);
        if (aMatched && !bMatched) return -1;
        if (!aMatched && bMatched) return 1;
        return 0;
      });
    }

    return result;
  }, [workflows, searchQuery, selectedCategory, allUserDuties, matchedCategories]);

  const getCompletedSteps = (workflowId: string): string[] => {
    const workflowProgress = getProgressForWorkflow(workflowId);
    return workflowProgress?.completedSteps || [];
  };

  const getWorkflowStatus = (workflow: LocalWorkflow) => {
    const completedSteps = getCompletedSteps(workflow.id || '');
    if (completedSteps.length === workflow.totalSteps) return 'completed';
    if (completedSteps.length > 0) return 'in_progress';
    return 'not_started';
  };

  const stats = {
    total: workflows.length,
    inProgress: workflows.filter((w) => getWorkflowStatus(w) === 'in_progress').length,
    completed: workflows.filter((w) => getWorkflowStatus(w) === 'completed').length,
    notStarted: workflows.filter((w) => getWorkflowStatus(w) === 'not_started').length,
  };

  const handleStepToggle = async (workflow: LocalWorkflow, stepId: string) => {
    if (!workflow.id) return;

    const currentCompletedSteps = getCompletedSteps(workflow.id);
    let newCompletedSteps: string[];

    if (currentCompletedSteps.includes(stepId)) {
      newCompletedSteps = currentCompletedSteps.filter((id) => id !== stepId);
    } else {
      newCompletedSteps = [...currentCompletedSteps, stepId];
    }

    await updateProgress(workflow.id, newCompletedSteps, workflow.totalSteps);
  };

  const openWorkflowDetail = (workflow: LocalWorkflow) => {
    setSelectedWorkflow(workflow);
    setIsDetailDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">워크플로우를 불러오는 중...</span>
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
          <h1 className="text-2xl font-bold">업무 워크플로우</h1>
          <p className="text-muted-foreground">
            단계별 가이드를 따라 업무를 쉽게 처리하세요
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <PlayCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">전체 워크플로우</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
                <p className="text-sm text-muted-foreground">진행중</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.completed}</p>
                <p className="text-sm text-muted-foreground">완료</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <Circle className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.notStarted}</p>
                <p className="text-sm text-muted-foreground">시작 전</p>
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
                <h3 className="font-semibold text-primary mb-1">나의 워크플로우 추천</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  설정에서 선택한 업무와 관련된 워크플로우가 우선 표시됩니다.
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
                placeholder="워크플로우 검색..."
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

      {/* Workflow List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWorkflows.map((workflow) => {
          const Icon = categoryIcons[workflow.category] || BookOpen;
          const completedSteps = getCompletedSteps(workflow.id || '');
          const progressValue = Math.round((completedSteps.length / workflow.totalSteps) * 100);
          const status = getWorkflowStatus(workflow);
          const matched = isMatchedWorkflow(workflow);

          return (
            <Card
              key={workflow.id}
              className={`hover:shadow-md transition-all cursor-pointer group ${matched ? 'border-primary/30 ring-1 ring-primary/20' : ''}`}
              onClick={() => openWorkflowDetail(workflow)}
            >
              <CardContent className="pt-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      status === 'completed'
                        ? 'bg-green-100'
                        : status === 'in_progress'
                        ? 'bg-blue-100'
                        : matched
                        ? 'bg-primary/10'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`h-6 w-6 ${
                        status === 'completed'
                          ? 'text-green-600'
                          : status === 'in_progress'
                          ? 'text-blue-600'
                          : matched
                          ? 'text-primary'
                          : 'text-gray-600'
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {matched && (
                        <Badge variant="secondary" className="bg-primary/20 text-primary text-xs px-1.5 py-0">
                          <Star className="h-2.5 w-2.5 mr-0.5 fill-primary" />
                          추천
                        </Badge>
                      )}
                      <h3 className="font-semibold truncate">{workflow.title}</h3>
                      {status === 'completed' && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {workflow.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="secondary">{workflow.category}</Badge>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyConfig[workflow.difficulty].color}`}>
                        {difficultyConfig[workflow.difficulty].label}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {workflow.estimatedTime}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {completedSteps.length}/{workflow.totalSteps} 단계 완료
                        </span>
                        <span className="font-medium">{progressValue}%</span>
                      </div>
                      <Progress value={progressValue} className="h-2" />
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                {status === 'not_started' && (
                  <div className="mt-4 pt-4 border-t">
                    <Button className="w-full" onClick={(e) => { e.stopPropagation(); openWorkflowDetail(workflow); }}>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      시작하기
                    </Button>
                  </div>
                )}

                {status === 'in_progress' && (
                  <div className="mt-4 pt-4 border-t">
                    <Button className="w-full" variant="outline" onClick={(e) => { e.stopPropagation(); openWorkflowDetail(workflow); }}>
                      <ArrowRight className="h-4 w-4 mr-2" />
                      계속하기
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredWorkflows.length === 0 && workflows.length > 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <PlayCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </CardContent>
        </Card>
      )}

      {workflows.length === 0 && !loading && (
        <Card>
          <CardContent className="py-12 text-center">
            <PlayCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">등록된 워크플로우가 없습니다.</p>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="pt-4">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">워크플로우 활용 팁</h3>
              <p className="text-sm text-muted-foreground">
                각 워크플로우는 경험 많은 선배 교사들의 노하우를 바탕으로 구성되어 있습니다.
                단계별 체크리스트를 따라가면 업무를 빠짐없이 처리할 수 있습니다.
                AI 어시스턴트에게 추가 질문을 하며 더 자세한 안내를 받을 수 있습니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Detail Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedWorkflow && (
                <>
                  {(() => {
                    const Icon = categoryIcons[selectedWorkflow.category] || BookOpen;
                    return <Icon className="h-5 w-5 text-primary" />;
                  })()}
                  {selectedWorkflow.title}
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedWorkflow?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedWorkflow && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{selectedWorkflow.category}</Badge>
                <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyConfig[selectedWorkflow.difficulty].color}`}>
                  {difficultyConfig[selectedWorkflow.difficulty].label}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {selectedWorkflow.estimatedTime}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium">진행률</span>
                  <span>
                    {getCompletedSteps(selectedWorkflow.id || '').length}/{selectedWorkflow.totalSteps} 완료
                  </span>
                </div>
                <Progress
                  value={Math.round((getCompletedSteps(selectedWorkflow.id || '').length / selectedWorkflow.totalSteps) * 100)}
                  className="h-2"
                />
              </div>

              <ScrollArea className="max-h-[40vh]">
                <div className="space-y-3">
                  <h4 className="font-medium mb-2">단계별 체크리스트</h4>
                  {selectedWorkflow.steps.map((step, index) => {
                    const isCompleted = getCompletedSteps(selectedWorkflow.id || '').includes(step.id);
                    return (
                      <div
                        key={step.id}
                        className={`p-3 rounded-lg border ${isCompleted ? 'bg-green-50 border-green-200' : 'bg-white'}`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => handleStepToggle(selectedWorkflow, step.id)}
                            className="mt-0.5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Step {index + 1}</span>
                            </div>
                            <p className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                              {step.title}
                            </p>
                            {step.description && (
                              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
