import { AIClient } from './client';
import {
  EventPlanningRequest,
  EventPlanningResponse,
  ChecklistCategory,
  PreparationTask,
  UserContext,
} from './types';

export interface EventPlannerConfig {
  client: AIClient;
}

export class EventPlanner {
  private client: AIClient;

  constructor(config: EventPlannerConfig) {
    this.client = config.client;
  }

  private buildSystemPrompt(): string {
    return `당신은 대한민국 초등학교 행사 기획 전문가입니다.

역할:
1. 학교 행사의 체계적인 준비 체크리스트를 제공합니다.
2. 시간대별 준비 일정을 안내합니다.
3. 행사 진행 시 주의사항과 팁을 제공합니다.
4. 필요한 공문서와 서류를 안내합니다.

응답 형식:
- 구체적이고 실행 가능한 항목으로 작성합니다.
- 담당자, 마감일, 우선순위를 명확히 합니다.
- 초등학교 환경에 맞는 현실적인 제안을 합니다.
- 안전 관련 사항을 강조합니다.`;
  }

  async planEvent(request: EventPlanningRequest): Promise<EventPlanningResponse> {
    const { eventType, eventName, startDate, endDate, context, additionalRequirements } = request;

    const prompt = this.buildPlanningPrompt(
      eventType,
      eventName,
      startDate,
      endDate,
      context,
      additionalRequirements
    );

    const result = await this.client.generateJSON<{
      checklist: ChecklistCategory[];
      preparationTimeline: PreparationTask[];
      tips: string[];
      warnings: string[];
      relatedDocuments: string[];
    }>(prompt, this.buildSystemPrompt());

    if (!result) {
      return this.getDefaultPlanningResponse(eventType, eventName);
    }

    return result;
  }

  private buildPlanningPrompt(
    eventType: string,
    eventName: string,
    startDate: Date,
    endDate?: Date,
    context?: UserContext,
    additionalRequirements?: string
  ): string {
    const startDateStr = startDate.toLocaleDateString('ko-KR');
    const endDateStr = endDate ? endDate.toLocaleDateString('ko-KR') : startDateStr;

    let prompt = `다음 학교 행사의 준비 계획을 JSON 형식으로 작성해주세요.

## 행사 정보:
- 행사 유형: ${eventType}
- 행사명: ${eventName}
- 시작일: ${startDateStr}
- 종료일: ${endDateStr}`;

    if (context) {
      prompt += `
- 학교: ${context.schoolName || '초등학교'}
- 담당 학년: ${context.gradeInCharge ? `${context.gradeInCharge}학년` : '전 학년'}`;
    }

    if (additionalRequirements) {
      prompt += `

## 추가 요구사항:
${additionalRequirements}`;
    }

    prompt += `

## 응답 형식 (JSON):
{
  "checklist": [
    {
      "category": "카테고리명",
      "items": [
        {
          "id": "고유ID",
          "text": "체크 항목",
          "isRequired": true/false
        }
      ]
    }
  ],
  "preparationTimeline": [
    {
      "daysBeforeEvent": 30,
      "tasks": ["해야 할 일 1", "해야 할 일 2"]
    }
  ],
  "tips": ["유용한 팁 1", "팁 2"],
  "warnings": ["주의사항 1", "주의사항 2"],
  "relatedDocuments": ["필요 문서 1", "문서 2"]
}`;

    return prompt;
  }

  private getDefaultPlanningResponse(
    eventType: string,
    eventName: string
  ): EventPlanningResponse {
    return {
      checklist: [
        {
          category: '사전 준비',
          items: [
            { id: 'prep-1', text: '행사 계획서 작성', isRequired: true },
            { id: 'prep-2', text: '관리자 결재 득', isRequired: true },
            { id: 'prep-3', text: '가정통신문 발송', isRequired: true },
            { id: 'prep-4', text: '장소 예약 및 점검', isRequired: true },
          ],
        },
        {
          category: '당일 준비',
          items: [
            { id: 'day-1', text: '장소 최종 점검', isRequired: true },
            { id: 'day-2', text: '필요 물품 확인', isRequired: true },
            { id: 'day-3', text: '안전 점검', isRequired: true },
          ],
        },
        {
          category: '사후 정리',
          items: [
            { id: 'post-1', text: '결과 보고서 작성', isRequired: true },
            { id: 'post-2', text: '사진 및 자료 정리', isRequired: false },
            { id: 'post-3', text: '개선점 기록', isRequired: false },
          ],
        },
      ],
      preparationTimeline: [
        { daysBeforeEvent: 30, tasks: ['행사 계획 수립', '예산 확보'] },
        { daysBeforeEvent: 14, tasks: ['세부 일정 확정', '역할 분담'] },
        { daysBeforeEvent: 7, tasks: ['가정통신문 발송', '최종 점검'] },
        { daysBeforeEvent: 1, tasks: ['현장 준비', '리허설'] },
        { daysBeforeEvent: 0, tasks: ['행사 진행', '안전 관리'] },
      ],
      tips: [
        '충분한 여유 시간을 두고 준비하세요.',
        '비상 연락망을 사전에 준비하세요.',
        '날씨 등 변수에 대한 대안을 마련하세요.',
      ],
      warnings: [
        '안전사고 예방에 최우선 주의를 기울이세요.',
        '알레르기 등 학생 특이사항을 확인하세요.',
        '비상시 대피 계획을 수립하세요.',
      ],
      relatedDocuments: [
        `${eventName} 계획서`,
        '가정통신문',
        '안전 점검표',
        '결과 보고서',
      ],
    };
  }

  async generateChecklist(
    eventType: string,
    requirements?: string
  ): Promise<ChecklistCategory[]> {
    const prompt = `"${eventType}" 행사 준비를 위한 체크리스트를 JSON 배열로 작성해주세요.
${requirements ? `추가 요구사항: ${requirements}` : ''}

형식:
[
  {
    "category": "카테고리명",
    "items": [
      { "id": "고유ID", "text": "체크항목", "isRequired": true/false }
    ]
  }
]`;

    const result = await this.client.generateJSON<ChecklistCategory[]>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || [];
  }

  async generateTimeline(
    eventDate: Date,
    eventType: string
  ): Promise<PreparationTask[]> {
    const dateStr = eventDate.toLocaleDateString('ko-KR');

    const prompt = `${dateStr}에 예정된 "${eventType}" 행사 준비 타임라인을 JSON 배열로 작성해주세요.

형식:
[
  { "daysBeforeEvent": 30, "tasks": ["할 일 1", "할 일 2"] },
  { "daysBeforeEvent": 14, "tasks": ["할 일 3"] }
]`;

    const result = await this.client.generateJSON<PreparationTask[]>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || [];
  }

  async suggestEventIdeas(
    month: number,
    gradeLevel?: number,
    context?: UserContext
  ): Promise<string[]> {
    const prompt = `${month}월에 초등학교${gradeLevel ? ` ${gradeLevel}학년` : ''}에서 진행하면 좋은 행사 아이디어를 10개 추천해주세요.
JSON 배열 형식으로 행사명만 작성해주세요.`;

    const result = await this.client.generateJSON<string[]>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || [];
  }

  async estimateBudget(
    eventType: string,
    participantCount: number,
    requirements?: string
  ): Promise<Record<string, number>> {
    const prompt = `"${eventType}" 행사의 예상 예산을 항목별로 산출해주세요.
- 예상 참가 인원: ${participantCount}명
${requirements ? `- 추가 요구사항: ${requirements}` : ''}

JSON 객체로 항목명과 예상 금액(원)을 작성해주세요.
예: { "간식비": 100000, "재료비": 50000 }`;

    const result = await this.client.generateJSON<Record<string, number>>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || {};
  }
}
