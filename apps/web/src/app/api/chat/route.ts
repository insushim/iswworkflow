import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Node.js runtime으로 변경 (Edge에서 환경변수 문제 해결)
export const runtime = 'nodejs';

// 초등교사 업무 전문 시스템 프롬프트
const TEACHER_SYSTEM_PROMPT = `당신은 대한민국 초등학교 교사를 위한 전문 AI 비서 '에듀플로우'입니다.

## 역할
- 초등학교 교사의 행정 업무, 학급 운영, 수업 준비를 지원합니다.
- 공문서 작성, 학부모 상담, 생활기록부 작성 등을 도와줍니다.
- 교육과정과 학교 행정 규정을 정확하게 안내합니다.

## 전문 분야
1. 공문서/가정통신문 작성
2. 학급경영록/학급일지 작성
3. 생활기록부 문구 추천
4. 학부모 상담 가이드
5. 수업 지도안 작성
6. 학교 행사 계획
7. 안전교육/인성교육 자료
8. NEIS 업무 안내

## 응답 스타일
- 정중하고 전문적인 어조 사용
- 구체적이고 실용적인 조언 제공
- 필요시 예시 문서/양식 제공
- 관련 법규/지침 안내`;

export async function POST(request: NextRequest) {
  try {
    // API 키 직접 확인
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.length < 10 || apiKey === 'your_gemini_key') {
      console.error('Gemini API key not configured. Key length:', apiKey?.length || 0);
      return NextResponse.json(
        { error: 'AI 서비스가 설정되지 않았습니다. 관리자에게 문의해주세요.' },
        { status: 503 }
      );
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'messages 배열이 필요합니다.' },
        { status: 400 }
      );
    }

    // 마지막 사용자 메시지 가져오기
    const lastUserMessage = messages.filter((m: { role: string }) => m.role === 'user').pop();

    if (!lastUserMessage) {
      return NextResponse.json(
        { error: '사용자 메시지가 필요합니다.' },
        { status: 400 }
      );
    }

    // Gemini 클라이언트 초기화 (Gemini 2.5 Flash-Lite - 빠르고 비용 효율적)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // 이전 대화 기록 준비 (마지막 메시지 제외)
    const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.content }],
    }));

    // 채팅 시작
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: TEACHER_SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: '안녕하세요! 에듀플로우 AI 비서입니다. 초등학교 선생님의 업무를 도와드리겠습니다. 어떤 도움이 필요하신가요?' }],
        },
        ...history,
      ],
    });

    // Gemini로 응답 생성
    const result = await chat.sendMessage(lastUserMessage.content);
    const response = await result.response;
    const responseText = response.text();

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: responseText,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';

    console.error('Chat API Error:', {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
    });

    // 특정 에러 유형에 따른 응답
    if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('API key not valid')) {
      return NextResponse.json(
        { error: 'AI API 키가 유효하지 않습니다. 키를 확인해주세요.' },
        { status: 503 }
      );
    }

    if (errorMessage.includes('quota') || errorMessage.includes('rate') || errorMessage.includes('RATE_LIMIT')) {
      return NextResponse.json(
        { error: 'AI 서비스 사용량 한도에 도달했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 429 }
      );
    }

    if (errorMessage.includes('SAFETY')) {
      return NextResponse.json(
        { error: '안전 정책에 의해 응답이 차단되었습니다. 다른 질문을 해주세요.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
