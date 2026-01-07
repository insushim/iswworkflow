import { GoogleGenerativeAI } from '@google/generative-ai';

// API 키 확인 함수
export function isGeminiConfigured(): boolean {
  const apiKey = process.env.GEMINI_API_KEY;
  return Boolean(apiKey && apiKey.length > 10 && apiKey !== 'your_gemini_key');
}

// Server-side only - API 키는 서버에서만 사용
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export const geminiProModel = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// 초등교사 업무 전문 시스템 프롬프트
export const TEACHER_SYSTEM_PROMPT = `당신은 대한민국 초등학교 교사를 위한 전문 AI 비서 '에듀플로우'입니다.

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

// AI 채팅 함수
export async function chatWithGemini(
  message: string,
  history: { role: 'user' | 'model'; content: string }[] = []
) {
  const chat = geminiModel.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: TEACHER_SYSTEM_PROMPT }],
      },
      {
        role: 'model',
        parts: [{ text: '안녕하세요! 에듀플로우 AI 비서입니다. 초등학교 선생님의 업무를 도와드리겠습니다. 어떤 도움이 필요하신가요?' }],
      },
      ...history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    ],
  });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  return response.text();
}

// 문서 생성 함수
export async function generateDocument(
  documentType: string,
  context: Record<string, string>
) {
  const prompt = `다음 조건에 맞는 ${documentType}을(를) 작성해주세요.

조건:
${Object.entries(context)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\n')}

문서를 완성된 형태로 작성해주세요. 마크다운 형식을 사용하되, 실제 문서처럼 깔끔하게 작성해주세요.`;

  const result = await geminiProModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// 업무 추천 함수
export async function getTaskSuggestions(
  currentTasks: string[],
  date: string,
  role: string
) {
  const prompt = `현재 날짜: ${date}
담당 업무: ${role}
현재 진행 중인 업무: ${currentTasks.join(', ') || '없음'}

위 정보를 바탕으로 이 시기에 해야 할 초등학교 교사 업무를 5개 추천해주세요.
각 업무에 대해 간단한 설명과 마감일(예상)을 포함해주세요.
JSON 형식으로 응답해주세요:
[{"title": "업무명", "description": "설명", "deadline": "예상 마감일", "priority": "high|medium|low"}]`;

  const result = await geminiModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // JSON 파싱 시도
  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    console.error('Failed to parse task suggestions');
  }
  return [];
}
