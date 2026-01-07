import { AIClient } from './client';
import { UserContext } from './types';

export interface ContextAnalyzerConfig {
  client: AIClient;
}

export interface AnalyzedContext {
  intent: string;
  entities: Record<string, string>;
  suggestedActions: string[];
  relevantCategories: string[];
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
}

export interface ConversationContext {
  recentTopics: string[];
  mentionedTasks: string[];
  mentionedDates: string[];
  userMood: 'neutral' | 'frustrated' | 'satisfied' | 'confused';
  sessionGoal?: string;
}

export class ContextAnalyzer {
  private client: AIClient;

  constructor(config: ContextAnalyzerConfig) {
    this.client = config.client;
  }

  private buildSystemPrompt(): string {
    return `당신은 대화 컨텍스트 분석 전문가입니다.

역할:
1. 사용자의 의도를 정확히 파악합니다.
2. 대화에서 중요한 정보(날짜, 업무, 사람 등)를 추출합니다.
3. 적절한 후속 조치를 제안합니다.
4. 긴급도를 판단합니다.

분석 기준:
- 명시적 요청 vs 암시적 필요
- 시간적 긴급성
- 업무 관련성
- 감정 상태`;
  }

  async analyzeQuery(
    query: string,
    userContext?: UserContext
  ): Promise<AnalyzedContext> {
    const prompt = `다음 사용자 질문을 분석해주세요.

질문: "${query}"
${userContext ? `현재 월: ${userContext.currentMonth}월, 학기: ${userContext.currentSemester}학기` : ''}

JSON 형식으로 응답해주세요:
{
  "intent": "사용자의 주요 의도 (질문/요청/정보조회/도움요청/불만 등)",
  "entities": {
    "날짜": "언급된 날짜",
    "업무": "언급된 업무",
    "대상": "언급된 대상"
  },
  "suggestedActions": ["제안할 조치 1", "조치 2"],
  "relevantCategories": ["관련 업무 카테고리"],
  "urgencyLevel": "low/medium/high/critical",
  "confidence": 0.0-1.0
}`;

    const result = await this.client.generateJSON<AnalyzedContext>(
      prompt,
      this.buildSystemPrompt()
    );

    return (
      result || {
        intent: 'unknown',
        entities: {},
        suggestedActions: ['질문을 더 구체적으로 해주세요.'],
        relevantCategories: [],
        urgencyLevel: 'low',
        confidence: 0.3,
      }
    );
  }

  async analyzeConversation(
    messages: Array<{ role: string; content: string }>
  ): Promise<ConversationContext> {
    const conversationText = messages
      .slice(-10)
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n');

    const prompt = `다음 대화를 분석해주세요.

대화 내용:
${conversationText}

JSON 형식으로 응답해주세요:
{
  "recentTopics": ["최근 논의된 주제들"],
  "mentionedTasks": ["언급된 업무들"],
  "mentionedDates": ["언급된 날짜들"],
  "userMood": "neutral/frustrated/satisfied/confused",
  "sessionGoal": "이 대화의 주요 목적"
}`;

    const result = await this.client.generateJSON<ConversationContext>(
      prompt,
      this.buildSystemPrompt()
    );

    return (
      result || {
        recentTopics: [],
        mentionedTasks: [],
        mentionedDates: [],
        userMood: 'neutral',
      }
    );
  }

  async extractDates(text: string): Promise<Array<{ text: string; date: Date | null }>> {
    const prompt = `다음 텍스트에서 날짜 관련 표현을 모두 찾아주세요.
상대적 표현(내일, 다음 주 등)도 포함해주세요.

텍스트: "${text}"

JSON 배열로 응답해주세요:
[
  { "text": "원본 표현", "date": "YYYY-MM-DD 또는 null" }
]`;

    const result = await this.client.generateJSON<Array<{ text: string; date: string | null }>>(
      prompt,
      this.buildSystemPrompt()
    );

    if (!result) {
      return [];
    }

    return result.map((item) => ({
      text: item.text,
      date: item.date ? new Date(item.date) : null,
    }));
  }

  async extractTasks(text: string): Promise<string[]> {
    const prompt = `다음 텍스트에서 언급된 업무나 할 일을 모두 추출해주세요.

텍스트: "${text}"

업무명만 JSON 배열로 응답해주세요.`;

    const result = await this.client.generateJSON<string[]>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || [];
  }

  async classifyQuery(
    query: string
  ): Promise<{
    category: string;
    subcategory: string;
    keywords: string[];
  }> {
    const prompt = `다음 질문을 분류해주세요.

질문: "${query}"

카테고리 옵션:
- 업무관리: 업무 일정, 진행 현황, 마감 관리
- 문서작성: 공문서, 보고서, 가정통신문
- 행사계획: 학교 행사, 학년 행사, 학급 행사
- 학급운영: 생활지도, 학급 행정, 학부모 상담
- 교육과정: 수업, 평가, 교과 운영
- 행정업무: 출장, 결재, 예산
- 기타: 그 외

JSON으로 응답해주세요:
{
  "category": "메인 카테고리",
  "subcategory": "세부 카테고리",
  "keywords": ["핵심 키워드들"]
}`;

    const result = await this.client.generateJSON<{
      category: string;
      subcategory: string;
      keywords: string[];
    }>(prompt, this.buildSystemPrompt());

    return (
      result || {
        category: '기타',
        subcategory: '일반',
        keywords: [],
      }
    );
  }

  async detectSentiment(
    text: string
  ): Promise<{
    sentiment: 'positive' | 'negative' | 'neutral';
    emotions: string[];
    needsSupport: boolean;
  }> {
    const prompt = `다음 텍스트의 감정 상태를 분석해주세요.

텍스트: "${text}"

JSON으로 응답해주세요:
{
  "sentiment": "positive/negative/neutral",
  "emotions": ["감지된 감정들"],
  "needsSupport": true/false (도움이나 위로가 필요한지)
}`;

    const result = await this.client.generateJSON<{
      sentiment: 'positive' | 'negative' | 'neutral';
      emotions: string[];
      needsSupport: boolean;
    }>(prompt, this.buildSystemPrompt());

    return (
      result || {
        sentiment: 'neutral',
        emotions: [],
        needsSupport: false,
      }
    );
  }

  async suggestFollowUp(
    query: string,
    response: string
  ): Promise<string[]> {
    const prompt = `사용자 질문과 AI 응답을 보고, 사용자가 다음에 할 수 있는 후속 질문을 제안해주세요.

질문: "${query}"
응답 요약: "${response.slice(0, 500)}"

3개의 후속 질문을 JSON 배열로 응답해주세요.`;

    const result = await this.client.generateJSON<string[]>(
      prompt,
      this.buildSystemPrompt()
    );

    return result || [];
  }

  async generateContextSummary(
    messages: Array<{ role: string; content: string }>,
    userContext?: UserContext
  ): Promise<string> {
    const conversationText = messages
      .slice(-20)
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n');

    const prompt = `다음 대화의 핵심 내용을 3문장 이내로 요약해주세요.
중요한 결정사항, 약속, 할 일을 포함해주세요.

대화:
${conversationText}`;

    return this.client.complete(prompt, this.buildSystemPrompt());
  }

  inferUserNeeds(userContext: UserContext): string[] {
    const needs: string[] = [];
    const month = userContext.currentMonth;

    // 월별 예상 필요 사항
    const monthlyNeeds: Record<number, string[]> = {
      2: ['학년말 업무 정리', '다음 학년도 준비', '생활기록부 마감'],
      3: ['학기 초 업무', '학급 편성', '교육과정 수립'],
      4: ['학부모 상담', '현장체험학습 준비'],
      5: ['중간 평가', '체육대회 준비'],
      6: ['1학기 성적 처리', '방학 계획'],
      7: ['방학 업무', '1학기 마무리', '연수'],
      8: ['2학기 준비', '방학 과제 점검'],
      9: ['2학기 시작', '운동회 준비'],
      10: ['중간 평가', '학예회 준비'],
      11: ['기말 평가 준비', '진로 상담'],
      12: ['성적 처리', '겨울방학 준비'],
      1: ['새 학년도 준비', '업무 인수인계'],
    };

    needs.push(...(monthlyNeeds[month] || []));

    // 학년별 특수 업무
    if (userContext.gradeInCharge) {
      if (userContext.gradeInCharge === 1) {
        needs.push('신입생 적응 지도');
      } else if (userContext.gradeInCharge === 6) {
        needs.push('졸업 준비', '중학교 연계');
      }
    }

    return needs;
  }
}
