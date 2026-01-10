import { GoogleGenerativeAI } from '@google/generative-ai';

// API 키 확인 함수
export function isGeminiConfigured(): boolean {
  const apiKey = process.env.GEMINI_API_KEY;
  return Boolean(apiKey && apiKey.length > 10 && apiKey !== 'your_gemini_key');
}

// Server-side only - API 키는 서버에서만 사용
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Gemini 2.5 Flash-Lite - 빠르고 비용 효율적인 모델
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

export const geminiProModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

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

// 공문서 자동 생성 함수 (제목만으로 전체 문서 작성)
export async function generateOfficialDocument(title: string) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const docNumber = `${year}-${String(Math.floor(Math.random() * 9000) + 1000)}`;

  const prompt = `당신은 대한민국 초등학교 공문서 작성 전문가입니다.

═══════════════════════════════════════════════════════════════
                    【중요: 공문서의 정의】
═══════════════════════════════════════════════════════════════

공문서는 학부모에게 보내는 것이 아닙니다!
공문서는 다음 두 가지 용도로만 사용됩니다:

1. 내부결재 (기안문)
   - 학교 내부에서 교장/교감에게 승인을 받기 위한 문서
   - 수신: 내부결재
   - 목적: "~을 시행하고자 합니다", "~을 추진하고자 합니다"
   - 예: 학부모 상담 주간 운영, 현장체험학습 실시, 행사 개최 등

2. 대외공문 (시행문)
   - 교육청, 다른 학교, 공공기관 등에 보내는 문서
   - 수신: ○○교육지원청교육장, ○○초등학교장 등
   - 목적: 결과 보고, 협조 요청, 자료 제출, 현황 통보 등

※ 학부모에게 보내는 것은 "가정통신문"이며, 이것은 공문서가 아닙니다!

═══════════════════════════════════════════════════════════════

다음 제목으로 공문서(기안문)를 작성해주세요:
제목: ${title}
작성일: ${year}. ${month}. ${day}.

【기안문 양식】

┌─────────────────────────────────────────────────────────────┐
│  ○○초등학교                                                │
│                                                             │
│  문서번호: ○○초-${docNumber}        기안일: ${year}. ${month}. ${day}.     │
│  결재: 담당 → 부장 → 교감 → 교장                            │
│        (   )  (   )  (   )  (   )                          │
│                                                             │
│  수    신 : 내부결재 (또는 ○○교육지원청교육장)              │
│  (경   유) :                                                │
│  제    목 : ${title}                              │
│                                                             │
│  1. 관련: (관련 근거 공문이나 규정)                          │
│                                                             │
│  2. 위 호와 관련하여 아래와 같이 (시행/보고/요청)하고자 합니다.│
│                                                             │
│                        - 아 래 -                            │
│                                                             │
│    가. 목적:                                                │
│    나. 기간:                                                │
│    다. 대상:                                                │
│    라. 내용:                                                │
│    마. 기대효과:                                            │
│                                                             │
│  붙임  1. (세부계획 또는 관련 자료) 1부.  끝.               │
│                                                             │
│─────────────────────────────────────────────────────────────│
│ 기안자: ○○○(담당)  검토자: ○○○(부장)                    │
│ 협조자:              결재권자: ○○○(교장)                  │
│─────────────────────────────────────────────────────────────│
│ 시행 ○○초-${docNumber}(${year}. ${month}. ${day}.)  접수                    │
│ 우 00000 ○○시 ○○구 ○○로 00                              │
│ 전화 000-000-0000 / 전송 000-000-0000                       │
│ 공개구분: 공개(또는 부분공개/비공개)                         │
└─────────────────────────────────────────────────────────────┘

【작성 규칙】
1. 항목 번호: 1. > 가. > 1) > 가) > (1) > (가) > ①
2. 본문 시작: "~와 관련하여", "~에 따라" 등으로 시작
3. 내부결재: "~하고자 합니다" (승인 요청 어조)
4. 대외공문: "~하여 주시기 바랍니다" (협조 요청 어조)
5. 끝 표시: 본문 또는 붙임 마지막에 "끝."

위 양식에 맞춰 "${title}" 기안문을 작성하세요.
내부결재 형식으로, 학교장에게 승인을 요청하는 어조로 작성하세요.
마크다운 없이 일반 텍스트로 작성하세요.
`;

  const result = await geminiProModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// 계획서 자동 생성 함수
export async function generatePlanDocument(title: string) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const prompt = `당신은 대한민국 초등학교 계획서 작성 전문가입니다.

═══════════════════════════════════════════════════════════════
                    【계획서란?】
═══════════════════════════════════════════════════════════════

계획서는 학교 행사, 프로그램, 교육활동 등을 실시하기 전에 작성하는 문서입니다.
공문서(기안문)와는 다른 별도의 양식을 사용합니다.

계획서는 기안문의 "붙임"으로 첨부되거나, 단독 문서로 작성됩니다.

═══════════════════════════════════════════════════════════════

다음 제목의 계획서를 작성해주세요:
제목: ${title}
작성일: ${year}. ${month}. ${day}.

【계획서 표준 양식】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    ${year}학년도
                ${title}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                                        ○○초등학교

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ⅰ. 목적
  ○ (이 행사/활동을 하는 이유와 목표)
  ○ (학생들에게 기대하는 교육적 효과)

Ⅱ. 방침 (또는 추진방향)
  ○ (운영의 기본 원칙)
  ○ (안전 관련 방침)
  ○ (참여/협력 관련 방침)

Ⅲ. 세부 추진 계획
  1. 개요
    가. 일시: ${year}. ○. ○.(○) 00:00 ~ 00:00
    나. 장소:
    다. 대상: 전교생 (또는 ○학년)
    라. 주최: ○○초등학교
    마. 담당: ○○부

  2. 추진 일정
    ┌────────────┬─────────────────┬──────────┐
    │    일자    │      내용       │   담당   │
    ├────────────┼─────────────────┼──────────┤
    │ ○월 ○일  │ 계획 수립       │ 담당교사 │
    │ ○월 ○일  │ 사전 준비       │ 담당교사 │
    │ ○월 ○일  │ 행사 실시       │ 전교사   │
    │ ○월 ○일  │ 결과 정리       │ 담당교사 │
    └────────────┴─────────────────┴──────────┘

  3. 세부 프로그램 (또는 내용)
    ┌──────┬────────┬─────────────────┬──────────┐
    │ 시간 │  장소  │      내용       │   비고   │
    ├──────┼────────┼─────────────────┼──────────┤
    │09:00│        │                 │          │
    │10:00│        │                 │          │
    │11:00│        │                 │          │
    └──────┴────────┴─────────────────┴──────────┘

  4. 업무 분장
    ┌────────────┬──────────┬─────────────────────┐
    │    역할    │   담당   │       업무 내용     │
    ├────────────┼──────────┼─────────────────────┤
    │ 총괄       │ ○○○   │ 전체 운영 총괄      │
    │ 진행       │ ○○○   │ 프로그램 진행       │
    │ 안전       │ ○○○   │ 학생 안전 지도      │
    └────────────┴──────────┴─────────────────────┘

Ⅳ. 예산 (필요시)
    ┌────────────────┬────────┬────────┬──────────┐
    │     품목       │  단가  │  수량  │   금액   │
    ├────────────────┼────────┼────────┼──────────┤
    │                │        │        │          │
    ├────────────────┴────────┴────────┼──────────┤
    │                          합  계  │          │
    └──────────────────────────────────┴──────────┘

Ⅴ. 기대 효과
  ○ (학생 측면)
  ○ (학교 측면)
  ○ (교육적 측면)

Ⅵ. 행정 사항
  ○ 안전사고 예방에 만전을 기함
  ○ 행사 종료 후 결과 보고서 제출
  ○ (기타 행정 사항)

【붙임】 세부 프로그램 운영 계획 1부. 끝.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【행사 유형별 특성】
- 학교축제/학예회: 프로그램 구성표, 부스 운영 계획, 공연 순서 포함
- 현장체험학습: 이동 경로, 안전 계획, 비상연락망 필수
- 운동회/체육대회: 종목별 규칙, 시상 계획, 안전 대책 포함
- 학부모 상담: 상담 일정표, 상담 내용, 사전 안내 포함
- 방과후학교: 프로그램별 내용, 강사 현황, 시간표 포함
- 졸업식/입학식: 식순, 좌석 배치, 리허설 일정 포함

위 양식에 맞춰 "${title}" 계획서를 작성하세요.
제목에 맞는 행사 유형을 파악하고, 그에 맞는 내용을 구체적으로 작성하세요.
실제 학교에서 바로 사용할 수 있도록 현실적인 내용으로 채워주세요.
마크다운 없이 일반 텍스트로 작성하세요.
`;

  const result = await geminiProModel.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// 문서 종류 자동 감지 (공문서 vs 계획서)
export function detectDocumentType(title: string): { type: string; category: string } {
  // 계획서 키워드
  const planKeywords = [
    '계획', '운영', '축제', '체험학습', '현장학습', '운동회', '체육대회',
    '학예회', '발표회', '전시회', '방과후', '상담', '수련', '캠프',
    '졸업식', '입학식', '행사', '대회', '프로그램', '교육활동'
  ];

  // 가정통신문 키워드
  const homeLetterKeywords = [
    '가정통신', '통신문', '안내장', '학부모님', '가정에'
  ];

  // 보고서 키워드
  const reportKeywords = [
    '결과', '보고', '실적', '평가', '분석'
  ];

  // 계획서인지 확인
  if (planKeywords.some(kw => title.includes(kw)) &&
      (title.includes('계획') || title.includes('운영') || title.includes('실시'))) {
    return { type: '계획서', category: 'plan' };
  }

  // 가정통신문인지 확인
  if (homeLetterKeywords.some(kw => title.includes(kw))) {
    return { type: '가정통신문', category: 'home-letter' };
  }

  // 보고서인지 확인
  if (reportKeywords.some(kw => title.includes(kw))) {
    return { type: '보고서', category: 'report' };
  }

  // 기본은 공문서(기안문)
  return { type: '공문', category: 'official' };
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
