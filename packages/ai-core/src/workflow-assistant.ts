import { AIClient } from './client';
import { WorkflowStep, WorkflowGuidance, UserContext } from './types';

export interface WorkflowAssistantConfig {
  client: AIClient;
}

export interface Workflow {
  id: string;
  taskId: string;
  taskTitle: string;
  steps: WorkflowStep[];
  totalSteps: number;
}

export class WorkflowAssistant {
  private client: AIClient;

  constructor(config: WorkflowAssistantConfig) {
    this.client = config.client;
  }

  private buildSystemPrompt(): string {
    return `당신은 대한민국 초등학교 업무 절차 가이드 전문가입니다.

역할:
1. 복잡한 업무를 단계별로 안내합니다.
2. 각 단계에서 확인해야 할 사항을 체크리스트로 제공합니다.
3. 실수하기 쉬운 부분에 대한 경고를 제공합니다.
4. 효율적인 진행을 위한 팁을 제공합니다.

안내 원칙:
1. 명확하고 구체적인 설명
2. 시간 순서에 따른 논리적 배열
3. 관련 서류 및 시스템 안내
4. 예외 상황 대처 방법 포함`;
  }

  async generateWorkflow(
    taskTitle: string,
    taskDescription?: string,
    context?: UserContext
  ): Promise<WorkflowStep[]> {
    const prompt = `"${taskTitle}" 업무의 상세 진행 절차를 JSON 배열로 작성해주세요.
${taskDescription ? `\n업무 설명: ${taskDescription}` : ''}
${context ? `\n담당: ${context.gradeInCharge ? `${context.gradeInCharge}학년` : ''}` : ''}

## 응답 형식:
[
  {
    "order": 1,
    "title": "단계 제목",
    "description": "상세 설명",
    "checkItems": [
      { "id": "고유ID", "text": "확인 항목", "isOptional": false }
    ],
    "tips": ["유용한 팁"],
    "warnings": ["주의사항"],
    "estimatedTime": 소요시간(분),
    "relatedDocs": ["관련 문서"]
  }
]`;

    const result = await this.client.generateJSON<WorkflowStep[]>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || this.getDefaultWorkflow(taskTitle);
  }

  private getDefaultWorkflow(taskTitle: string): WorkflowStep[] {
    return [
      {
        order: 1,
        title: '준비 단계',
        description: '업무 시작 전 필요한 사항을 확인합니다.',
        checkItems: [
          { id: 'prep-1', text: '관련 규정 확인', isOptional: false },
          { id: 'prep-2', text: '필요 서류 준비', isOptional: false },
          { id: 'prep-3', text: '일정 확인', isOptional: false },
        ],
        tips: ['관련 업무 담당자와 사전 협의하세요.'],
        estimatedTime: 30,
      },
      {
        order: 2,
        title: '실행 단계',
        description: '계획에 따라 업무를 진행합니다.',
        checkItems: [
          { id: 'exec-1', text: '계획대로 진행', isOptional: false },
          { id: 'exec-2', text: '중간 점검', isOptional: false },
        ],
        tips: ['진행 상황을 기록해두세요.'],
        estimatedTime: 60,
      },
      {
        order: 3,
        title: '완료 단계',
        description: '업무를 마무리하고 결과를 정리합니다.',
        checkItems: [
          { id: 'done-1', text: '결과 확인', isOptional: false },
          { id: 'done-2', text: '결재 요청', isOptional: false },
          { id: 'done-3', text: '기록 보관', isOptional: true },
        ],
        tips: ['다음 업무에 참고할 사항을 메모하세요.'],
        estimatedTime: 30,
      },
    ];
  }

  async getGuidance(
    workflow: Workflow,
    currentStepOrder: number,
    completedCheckItems: string[] = []
  ): Promise<WorkflowGuidance> {
    const currentStep = workflow.steps.find((s) => s.order === currentStepOrder);
    const nextStep = workflow.steps.find((s) => s.order === currentStepOrder + 1);
    const previousStep = workflow.steps.find((s) => s.order === currentStepOrder - 1);

    if (!currentStep) {
      throw new Error(`Step ${currentStepOrder} not found in workflow`);
    }

    // 현재 단계의 체크 항목 완료 상태 업데이트
    const updatedCurrentStep: WorkflowStep = {
      ...currentStep,
      checkItems: currentStep.checkItems.map((item) => ({
        ...item,
        isCompleted: completedCheckItems.includes(item.id),
      })),
    };

    // 진행률 계산
    const totalCheckItems = workflow.steps.reduce(
      (sum, s) => sum + s.checkItems.length,
      0
    );
    const completedCount = completedCheckItems.length;
    const progress =
      totalCheckItems > 0 ? Math.round((completedCount / totalCheckItems) * 100) : 0;

    // AI 제안 생성
    const aiSuggestions = await this.generateSuggestions(
      workflow.taskTitle,
      updatedCurrentStep,
      progress
    );

    return {
      currentStep: updatedCurrentStep,
      nextStep,
      previousStep,
      progress,
      totalSteps: workflow.totalSteps,
      aiSuggestions,
    };
  }

  private async generateSuggestions(
    taskTitle: string,
    currentStep: WorkflowStep,
    progress: number
  ): Promise<string[]> {
    const incompleteItems = currentStep.checkItems
      .filter((item) => !item.isCompleted && !item.isOptional)
      .map((item) => item.text);

    if (incompleteItems.length === 0) {
      return ['모든 필수 항목을 완료했습니다. 다음 단계로 진행하세요.'];
    }

    const prompt = `"${taskTitle}" 업무의 "${currentStep.title}" 단계를 진행 중입니다.
진행률: ${progress}%

아직 완료하지 않은 항목:
${incompleteItems.map((i) => `- ${i}`).join('\n')}

효율적인 진행을 위한 팁을 3개 이내로 제안해주세요.
JSON 배열로 응답해주세요.`;

    const result = await this.client.generateJSON<string[]>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || ['남은 항목들을 순서대로 완료해주세요.'];
  }

  async explainStep(step: WorkflowStep, context?: UserContext): Promise<string> {
    const prompt = `"${step.title}" 단계에 대해 자세히 설명해주세요.

단계 정보:
- 설명: ${step.description || '없음'}
- 체크 항목: ${step.checkItems.map((i) => i.text).join(', ')}
${step.tips ? `- 팁: ${step.tips.join(', ')}` : ''}
${step.warnings ? `- 주의사항: ${step.warnings.join(', ')}` : ''}

${context?.gradeInCharge ? `담당 학년: ${context.gradeInCharge}학년` : ''}

초보 교사도 이해할 수 있도록 구체적으로 설명해주세요.`;

    return this.client.complete(prompt, this.buildSystemPrompt());
  }

  async estimateRemainingTime(
    workflow: Workflow,
    currentStepOrder: number
  ): Promise<{
    remainingMinutes: number;
    remainingSteps: number;
    estimatedCompletion: string;
  }> {
    const remainingSteps = workflow.steps.filter((s) => s.order >= currentStepOrder);
    const remainingMinutes = remainingSteps.reduce(
      (sum, s) => sum + (s.estimatedTime || 30),
      0
    );

    const now = new Date();
    const completionTime = new Date(now.getTime() + remainingMinutes * 60 * 1000);

    return {
      remainingMinutes,
      remainingSteps: remainingSteps.length,
      estimatedCompletion: completionTime.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  }

  async findBlockers(
    workflow: Workflow,
    currentStepOrder: number
  ): Promise<string[]> {
    const currentStep = workflow.steps.find((s) => s.order === currentStepOrder);

    if (!currentStep) {
      return [];
    }

    const prompt = `"${workflow.taskTitle}" 업무의 "${currentStep.title}" 단계에서
발생할 수 있는 장애 요소나 지연 원인을 분석해주세요.

단계 정보:
${currentStep.description || ''}
체크 항목: ${currentStep.checkItems.map((i) => i.text).join(', ')}

잠재적 문제점을 JSON 배열로 응답해주세요.`;

    const result = await this.client.generateJSON<string[]>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || [];
  }

  async suggestOptimization(workflow: Workflow): Promise<string[]> {
    const prompt = `다음 업무 절차의 효율화 방안을 제안해주세요.

업무: ${workflow.taskTitle}
단계 수: ${workflow.totalSteps}
단계 목록:
${workflow.steps.map((s) => `${s.order}. ${s.title}`).join('\n')}

개선 제안을 5개 이내로 JSON 배열로 응답해주세요.`;

    const result = await this.client.generateJSON<string[]>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || [];
  }
}
