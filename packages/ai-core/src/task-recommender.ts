import { AIClient } from './client';
import { TaskRecommendation, UserContext } from './types';

export interface TaskRecommenderConfig {
  client: AIClient;
}

export interface TaskData {
  id: string;
  title: string;
  description?: string;
  category: string;
  month?: number;
  priority?: string;
  estimatedHours?: number;
}

export class TaskRecommender {
  private client: AIClient;

  constructor(config: TaskRecommenderConfig) {
    this.client = config.client;
  }

  private buildSystemPrompt(): string {
    return `당신은 대한민국 초등학교 업무 전문가입니다.

역할:
1. 현재 시점에 필요한 업무를 우선순위에 따라 추천합니다.
2. 교사의 상황(담당 학년, 업무 분장 등)을 고려합니다.
3. 마감 기한과 중요도를 기반으로 판단합니다.
4. 효율적인 업무 처리 순서를 제안합니다.

우선순위 기준:
- URGENT: 즉시 처리 필요 (오늘 또는 내일 마감)
- HIGH: 이번 주 내 처리 필요
- MEDIUM: 이번 달 내 처리
- LOW: 여유 있게 처리 가능

업무 추천 원칙:
1. 법정 기한이 있는 업무 우선
2. 학생 안전 관련 업무 우선
3. 결재 대기 업무 고려
4. 연속성 있는 업무 묶음 처리 권장`;
  }

  async recommendTasks(
    availableTasks: TaskData[],
    context: UserContext,
    limit: number = 5
  ): Promise<TaskRecommendation[]> {
    const prompt = this.buildRecommendationPrompt(availableTasks, context, limit);

    const result = await this.client.generateJSON<TaskRecommendation[]>(
      prompt,
      this.buildSystemPrompt()
    );

    if (!result) {
      return this.getDefaultRecommendations(availableTasks, context, limit);
    }

    return result;
  }

  private buildRecommendationPrompt(
    tasks: TaskData[],
    context: UserContext,
    limit: number
  ): string {
    const taskList = tasks
      .map(
        (t) =>
          `- ID: ${t.id}, 제목: ${t.title}, 카테고리: ${t.category}${t.month ? `, 해당월: ${t.month}월` : ''}`
      )
      .join('\n');

    return `다음 업무 목록에서 현재 상황에 맞는 ${limit}개의 업무를 추천해주세요.

## 현재 상황:
- 현재 월: ${context.currentMonth}월
- 학기: ${context.currentSemester}학기
- 학년도: ${context.academicYear}년
- 담당 학년: ${context.gradeInCharge ? `${context.gradeInCharge}학년` : '미지정'}
- 담당 교과: ${context.subjects?.join(', ') || '전 교과'}

## 가용 업무 목록:
${taskList}

## 응답 형식 (JSON 배열):
[
  {
    "taskId": "업무ID",
    "title": "업무명",
    "description": "간단한 설명",
    "priority": "URGENT/HIGH/MEDIUM/LOW",
    "category": "카테고리",
    "estimatedHours": 예상소요시간(숫자),
    "relevanceScore": 0.0-1.0,
    "reason": "추천 이유"
  }
]`;
  }

  private getDefaultRecommendations(
    tasks: TaskData[],
    context: UserContext,
    limit: number
  ): TaskRecommendation[] {
    // 현재 월에 해당하는 업무 필터링
    const currentMonthTasks = tasks.filter(
      (t) => !t.month || t.month === context.currentMonth
    );

    // 우선순위로 정렬
    const priorityOrder: Record<string, number> = {
      URGENT: 0,
      HIGH: 1,
      MEDIUM: 2,
      LOW: 3,
    };

    const sortedTasks = currentMonthTasks.sort((a, b) => {
      const aPriority = priorityOrder[a.priority || 'MEDIUM'] ?? 2;
      const bPriority = priorityOrder[b.priority || 'MEDIUM'] ?? 2;
      return aPriority - bPriority;
    });

    return sortedTasks.slice(0, limit).map((task, index) => ({
      taskId: task.id,
      title: task.title,
      description: task.description || '',
      priority: (task.priority as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT') || 'MEDIUM',
      category: task.category,
      estimatedHours: task.estimatedHours || 2,
      relevanceScore: 1 - index * 0.1,
      reason: `${context.currentMonth}월 주요 업무`,
    }));
  }

  async prioritizeTasks(
    tasks: TaskData[],
    context: UserContext
  ): Promise<TaskData[]> {
    const prompt = `다음 업무들을 우선순위에 따라 정렬해주세요.
현재 ${context.currentMonth}월, ${context.currentSemester}학기입니다.

업무 목록:
${tasks.map((t) => `- ${t.id}: ${t.title}`).join('\n')}

정렬된 업무 ID만 JSON 배열로 응답해주세요.
예: ["task1", "task3", "task2"]`;

    const orderedIds = await this.client.generateJSON<string[]>(
      prompt,
      this.buildSystemPrompt()
    );

    if (!orderedIds) {
      return tasks;
    }

    const taskMap = new Map(tasks.map((t) => [t.id, t]));
    const orderedTasks: TaskData[] = [];

    for (const id of orderedIds) {
      const task = taskMap.get(id);
      if (task) {
        orderedTasks.push(task);
        taskMap.delete(id);
      }
    }

    // 정렬되지 않은 나머지 업무 추가
    orderedTasks.push(...taskMap.values());

    return orderedTasks;
  }

  async estimateWorkload(
    tasks: TaskData[],
    context: UserContext
  ): Promise<{
    totalHours: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
    recommendation: string;
  }> {
    const totalHours = tasks.reduce((sum, t) => sum + (t.estimatedHours || 2), 0);

    const byCategory: Record<string, number> = {};
    const byPriority: Record<string, number> = {};

    for (const task of tasks) {
      byCategory[task.category] =
        (byCategory[task.category] || 0) + (task.estimatedHours || 2);
      const priority = task.priority || 'MEDIUM';
      byPriority[priority] = (byPriority[priority] || 0) + (task.estimatedHours || 2);
    }

    let recommendation = '';
    if (totalHours > 40) {
      recommendation =
        '업무량이 많습니다. 우선순위가 낮은 업무는 다음 주로 미루는 것을 권장합니다.';
    } else if (totalHours > 20) {
      recommendation = '적정한 업무량입니다. 계획적으로 진행하세요.';
    } else {
      recommendation =
        '업무량에 여유가 있습니다. 미뤄둔 업무를 처리하기 좋은 시기입니다.';
    }

    return {
      totalHours,
      byCategory,
      byPriority,
      recommendation,
    };
  }

  async suggestDelegation(
    tasks: TaskData[],
    teamSize: number
  ): Promise<Record<string, string[]>> {
    const prompt = `다음 ${tasks.length}개의 업무를 ${teamSize}명의 팀원에게 분배해주세요.
균형있게 배분하고, 연관 업무는 같은 사람에게 배정해주세요.

업무 목록:
${tasks.map((t) => `- ${t.id}: ${t.title} (${t.category})`).join('\n')}

JSON 객체로 팀원번호와 업무ID 배열을 응답해주세요.
예: { "팀원1": ["task1", "task2"], "팀원2": ["task3"] }`;

    const result = await this.client.generateJSON<Record<string, string[]>>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || {};
  }

  async findRelatedTasks(
    targetTask: TaskData,
    allTasks: TaskData[]
  ): Promise<TaskData[]> {
    const prompt = `"${targetTask.title}" 업무와 관련된 업무들을 찾아주세요.
함께 처리하면 효율적인 업무들을 선별해주세요.

전체 업무 목록:
${allTasks.map((t) => `- ${t.id}: ${t.title}`).join('\n')}

관련 업무 ID만 JSON 배열로 응답해주세요.`;

    const relatedIds = await this.client.generateJSON<string[]>(
      prompt,
      this.buildSystemPrompt()
    );

    if (!relatedIds) {
      return [];
    }

    return allTasks.filter((t) => relatedIds.includes(t.id));
  }
}
