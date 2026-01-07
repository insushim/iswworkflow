import { AIClient } from './client';
import { ChatMessage, ChatResponse, UserContext } from './types';

export interface ChatHandlerConfig {
  client: AIClient;
  maxHistoryLength?: number;
}

export class ChatHandler {
  private client: AIClient;
  private maxHistoryLength: number;

  constructor(config: ChatHandlerConfig) {
    this.client = config.client;
    this.maxHistoryLength = config.maxHistoryLength || 20;
  }

  private buildSystemPrompt(context?: UserContext): string {
    const basePrompt = `당신은 대한민국 초등학교 교사를 위한 AI 업무 비서 '에듀플로우'입니다.

당신의 역할:
1. 학교 행정 업무에 대한 질문에 친절하고 정확하게 답변합니다.
2. 공문서 작성, 학급 운영, 교육과정 관련 조언을 제공합니다.
3. 월별/학기별 업무 일정과 체크리스트를 안내합니다.
4. 학교 행사 준비와 진행에 대한 가이드를 제공합니다.

응답 규칙:
- 항상 존댓말을 사용합니다.
- 구체적이고 실용적인 정보를 제공합니다.
- 필요시 단계별 안내나 체크리스트 형태로 정리합니다.
- 법적/행정적 사항은 최신 지침을 확인하도록 안내합니다.
- 불확실한 정보는 추측하지 않고 확인을 권장합니다.`;

    if (context) {
      const contextInfo = `

현재 사용자 정보:
- 학교: ${context.schoolName || '미지정'}
- 직위: ${context.position || '교사'}
- 담당 학년: ${context.gradeInCharge ? `${context.gradeInCharge}학년` : '미지정'}
- 담당 반: ${context.classInCharge ? `${context.classInCharge}반` : '미지정'}
- 담당 교과: ${context.subjects?.join(', ') || '전 교과'}
- 현재 월: ${context.currentMonth}월
- 학기: ${context.currentSemester}학기
- 학년도: ${context.academicYear}년`;

      return basePrompt + contextInfo;
    }

    return basePrompt;
  }

  async chat(
    messages: ChatMessage[],
    context?: UserContext
  ): Promise<ChatResponse> {
    // 시스템 메시지 제외하고 최근 메시지만 유지
    const userAssistantMessages = messages
      .filter((m) => m.role !== 'system')
      .slice(-this.maxHistoryLength);

    const formattedMessages = userAssistantMessages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    const systemPrompt = this.buildSystemPrompt(context);

    const startTime = Date.now();
    const response = await this.client.chat(formattedMessages, systemPrompt);
    const endTime = Date.now();

    // 토큰 수 추정 (한글 기준 대략적 계산)
    const inputTokens = Math.ceil(
      (systemPrompt.length +
        formattedMessages.reduce((acc, m) => acc + m.content.length, 0)) /
        2
    );
    const outputTokens = Math.ceil(response.length / 2);

    return {
      content: response,
      tokensUsed: {
        input: inputTokens,
        output: outputTokens,
      },
      metadata: {
        responseTime: endTime - startTime,
        model: this.client.getModel(),
      },
    };
  }

  async streamChat(
    messages: ChatMessage[],
    context?: UserContext,
    onChunk?: (chunk: string) => void
  ): Promise<ChatResponse> {
    const userAssistantMessages = messages
      .filter((m) => m.role !== 'system')
      .slice(-this.maxHistoryLength);

    const formattedMessages = userAssistantMessages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    const systemPrompt = this.buildSystemPrompt(context);

    const startTime = Date.now();
    const response = await this.client.streamChat(
      formattedMessages,
      systemPrompt,
      onChunk
    );
    const endTime = Date.now();

    const inputTokens = Math.ceil(
      (systemPrompt.length +
        formattedMessages.reduce((acc, m) => acc + m.content.length, 0)) /
        2
    );
    const outputTokens = Math.ceil(response.length / 2);

    return {
      content: response,
      tokensUsed: {
        input: inputTokens,
        output: outputTokens,
      },
      metadata: {
        responseTime: endTime - startTime,
        model: this.client.getModel(),
        streaming: true,
      },
    };
  }

  async quickAnswer(question: string, context?: UserContext): Promise<string> {
    const response = await this.chat(
      [{ role: 'user', content: question }],
      context
    );
    return response.content;
  }
}
