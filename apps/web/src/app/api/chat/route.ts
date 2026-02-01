import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateAIContext } from '@/data/duties-knowledge-base';

// Edge Runtime으로 변경 - Cold Start 제거로 훨씬 빠름
export const runtime = 'edge';
export const preferredRegion = ['icn1', 'hnd1']; // 한국/일본 리전 우선

// 17개 시도교육청 정보 (Edge Runtime에서 사용 가능하도록 인라인)
const EDUCATION_OFFICES: Record<string, {
  name: string;
  shortName: string;
  homepage: string;
  phone: string;
  elementaryDept: string;
  studentLifeDept: string;
  manuals: { title: string; url: string }[];
  emergencyContacts: { name: string; phone: string }[];
}> = {
  seoul: {
    name: '서울특별시교육청',
    shortName: '서울',
    homepage: 'https://www.sen.go.kr/',
    phone: '02-3999-114',
    elementaryDept: 'https://buseo.sen.go.kr/buseo/bu12/',
    studentLifeDept: 'https://buseo.sen.go.kr/buseo/bu15/',
    manuals: [
      { title: '2024 학교폭력 사안처리 가이드북', url: 'https://buseo.sen.go.kr/buseo/bu15/user/bbs/BD_selectBbs.do?q_bbsSn=1331&q_bbsDocNo=20240304145630950' },
      { title: '2024 학적업무 도움자료', url: 'https://buseo.sen.go.kr/buseo/bu12/user/bbs/BD_selectBbs.do?q_bbsSn=1266&q_bbsDocNo=20240911104821454' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '1588-7199' },
    ],
  },
  busan: {
    name: '부산광역시교육청',
    shortName: '부산',
    homepage: 'https://www.pen.go.kr/',
    phone: '051-860-0114',
    elementaryDept: 'https://home.pen.go.kr/elem/',
    studentLifeDept: 'https://home.pen.go.kr/student/',
    manuals: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '051-860-0535' },
    ],
  },
  gyeonggi: {
    name: '경기도교육청',
    shortName: '경기',
    homepage: 'https://www.goe.go.kr/',
    phone: '031-820-0114',
    elementaryDept: 'https://www.goe.go.kr/',
    studentLifeDept: 'https://www.goe.go.kr/',
    manuals: [
      { title: '2024 (초등) 학교업무 매뉴얼', url: 'https://www.goeic.kr/06040500/bbs/formView.do?searchMasterSid=95&sid=20390' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '031-820-0900' },
    ],
  },
  incheon: {
    name: '인천광역시교육청',
    shortName: '인천',
    homepage: 'https://www.ice.go.kr/',
    phone: '032-420-8114',
    elementaryDept: 'https://www.ice.go.kr/',
    studentLifeDept: 'https://www.ice.go.kr/',
    manuals: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '032-420-8100' },
    ],
  },
  daegu: {
    name: '대구광역시교육청',
    shortName: '대구',
    homepage: 'https://www.dge.go.kr/',
    phone: '053-231-0000',
    elementaryDept: 'https://www.dge.go.kr/',
    studentLifeDept: 'https://www.dge.go.kr/',
    manuals: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '053-231-0660' },
    ],
  },
  gwangju: {
    name: '광주광역시교육청',
    shortName: '광주',
    homepage: 'https://www.gen.go.kr/',
    phone: '062-380-4500',
    elementaryDept: 'https://www.gen.go.kr/',
    studentLifeDept: 'https://www.gen.go.kr/',
    manuals: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '062-380-4680' },
    ],
  },
  daejeon: {
    name: '대전광역시교육청',
    shortName: '대전',
    homepage: 'https://www.dje.go.kr/',
    phone: '042-480-7000',
    elementaryDept: 'https://www.dje.go.kr/',
    studentLifeDept: 'https://www.dje.go.kr/',
    manuals: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '042-480-7200' },
    ],
  },
  ulsan: {
    name: '울산광역시교육청',
    shortName: '울산',
    homepage: 'https://www.use.go.kr/',
    phone: '052-210-5400',
    elementaryDept: 'https://www.use.go.kr/',
    studentLifeDept: 'https://www.use.go.kr/',
    manuals: [
      { title: '2024학년도 학적업무 처리 길라잡이', url: 'https://use.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1971&q_bbsDocNo=20240227170215539' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '052-210-5620' },
    ],
  },
  sejong: {
    name: '세종특별자치시교육청',
    shortName: '세종',
    homepage: 'https://www.sje.go.kr/',
    phone: '044-320-2000',
    elementaryDept: 'https://www.sje.go.kr/',
    studentLifeDept: 'https://www.sje.go.kr/',
    manuals: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '044-320-2300' },
    ],
  },
  gangwon: {
    name: '강원특별자치도교육청',
    shortName: '강원',
    homepage: 'https://www.gwe.go.kr/',
    phone: '033-258-5114',
    elementaryDept: 'https://www.gwe.go.kr/',
    studentLifeDept: 'https://www.gwe.go.kr/',
    manuals: [
      { title: '강원도교육청 업무 매뉴얼', url: 'https://www.gwe.go.kr/main/bbs/list.do?key=m2307211199072' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '033-258-5600' },
    ],
  },
  chungbuk: {
    name: '충청북도교육청',
    shortName: '충북',
    homepage: 'https://www.cbe.go.kr/',
    phone: '043-290-2114',
    elementaryDept: 'https://www.cbe.go.kr/',
    studentLifeDept: 'https://www.cbe.go.kr/',
    manuals: [
      { title: '2024학년도 초등학교 학적업무 매뉴얼', url: 'https://www.cbe.go.kr/dept-19/na/ntt/selectNttInfo.do?nttSn=1521791&mi=11134' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '043-290-2580' },
    ],
  },
  chungnam: {
    name: '충청남도교육청',
    shortName: '충남',
    homepage: 'https://www.cne.go.kr/',
    phone: '041-640-7114',
    elementaryDept: 'https://www.cne.go.kr/',
    studentLifeDept: 'https://www.cne.go.kr/',
    manuals: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '041-640-7700' },
    ],
  },
  jeonbuk: {
    name: '전북특별자치도교육청',
    shortName: '전북',
    homepage: 'https://www.jbe.go.kr/',
    phone: '063-239-3114',
    elementaryDept: 'https://office.jbedu.kr/jbime/',
    studentLifeDept: 'https://office.jbedu.kr/jbime/',
    manuals: [
      { title: '2024학년도 학교폭력사안처리 가이드북', url: 'https://office.jbedu.kr/jbime/M01060301/view/5837068' },
      { title: '2024 학교업무지원센터 업무 매뉴얼', url: 'https://office.jbedu.kr/jbime/MABAGAJACAF/view/6038607' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '063-239-3350' },
    ],
  },
  jeonnam: {
    name: '전라남도교육청',
    shortName: '전남',
    homepage: 'https://www.jne.go.kr/',
    phone: '061-260-0114',
    elementaryDept: 'https://www.jne.go.kr/',
    studentLifeDept: 'https://www.jne.go.kr/',
    manuals: [
      { title: '2024 학교폭력 사안처리 가이드북', url: 'https://www.jne.go.kr/upload/sledu/na/bbs_386/ntt_5012646/doc_f79ef736-0c1d-4037-882a-fb9d4f42158c1614a7592b27333.pdf' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '061-260-0570' },
    ],
  },
  gyeongbuk: {
    name: '경상북도교육청',
    shortName: '경북',
    homepage: 'https://www.gbe.kr/',
    phone: '053-805-3114',
    elementaryDept: 'https://www.gbe.kr/',
    studentLifeDept: 'https://www.gbe.kr/',
    manuals: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '053-805-3600' },
    ],
  },
  gyeongnam: {
    name: '경상남도교육청',
    shortName: '경남',
    homepage: 'https://www.gne.go.kr/',
    phone: '055-210-5114',
    elementaryDept: 'https://www.gne.go.kr/',
    studentLifeDept: 'https://www.gne.go.kr/',
    manuals: [
      { title: '2024학년도 초등학교 학적업무 도움자료', url: 'https://www.gne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1464&q_bbsDocNo=1717451' },
      { title: '2024 학교폭력 사안처리 가이드북', url: 'https://www.gne.go.kr/user/bbs/BD_selectBbs.do?q_bbsSn=1464&q_bbsDocNo=1715037' },
    ],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '055-210-5680' },
    ],
  },
  jeju: {
    name: '제주특별자치도교육청',
    shortName: '제주',
    homepage: 'https://www.jje.go.kr/',
    phone: '064-710-0114',
    elementaryDept: 'https://www.jje.go.kr/',
    studentLifeDept: 'https://www.jje.go.kr/',
    manuals: [],
    emergencyContacts: [
      { name: '학교폭력 신고', phone: '117' },
      { name: 'Wee센터', phone: '064-710-0380' },
    ],
  },
};

// 교육청별 맞춤 정보 생성 함수
function getEducationOfficeContext(officeId: string): string {
  const office = EDUCATION_OFFICES[officeId];
  if (!office) return '';

  let context = `\n\n## 선생님의 소속 교육청 정보 (${office.name})
- 홈페이지: ${office.homepage}
- 대표전화: ${office.phone}
- 초등교육과: ${office.elementaryDept}
- 생활지도/학교폭력: ${office.studentLifeDept}
`;

  if (office.manuals.length > 0) {
    context += `\n### ${office.shortName} 교육청 주요 매뉴얼\n`;
    office.manuals.forEach(m => {
      context += `- ${m.title}: ${m.url}\n`;
    });
  }

  context += `\n### ${office.shortName} 긴급 연락처\n`;
  office.emergencyContacts.forEach(c => {
    context += `- ${c.name}: ${c.phone}\n`;
  });

  context += `\n**답변 시 ${office.shortName} 교육청의 자료와 연락처를 우선 안내해 주세요.**`;

  return context;
}

// 업무분장 지식베이스를 동적으로 생성 (duties-knowledge-base.ts에서 가져옴)
const DUTIES_KNOWLEDGE_BASE = generateAIContext();

// 초등교사 업무 전문 시스템 프롬프트
const TEACHER_SYSTEM_PROMPT = `당신은 대한민국 초등학교 교사를 위한 전문 AI 비서 '에듀플로우'입니다.

## 역할
- 초등학교 교사의 행정 업무, 학급 운영, 수업 준비를 지원합니다.
- 공문서 작성, 학부모 상담, 생활기록부 작성 등을 도와줍니다.
- 교육과정과 학교 행정 규정을 정확하게 안내합니다.
- **업무분장에 대한 모든 질문에 아래 지식베이스를 기반으로 정확하게 답변합니다.**

## 전문 분야
1. 공문서/가정통신문 작성
2. 학급경영록/학급일지 작성
3. 생활기록부 문구 추천
4. 학부모 상담 가이드
5. 수업 지도안 작성
6. 학교 행사 계획
7. 안전교육/인성교육 자료
8. NEIS 업무 안내
9. **업무분장 가이드 (16개 업무 영역 전문)**
10. **학교폭력 대응, 감염병 대응, 안전사고 대응**

## 업무분장 지식베이스
${DUTIES_KNOWLEDGE_BASE}

## 응답 스타일
- 정중하고 전문적인 어조 사용
- 구체적이고 실용적인 조언 제공
- 필요시 예시 문서/양식 제공
- **법적 근거와 절차를 명확하게 안내**
- **관련 사이트, 참고자료 링크 제공**
- 질문이 업무분장 관련인 경우 지식베이스의 정보를 활용하여 상세하게 답변

## 주의사항
- 불확실한 정보는 "확인이 필요합니다"라고 명시
- 법령 변경 가능성 안내 (최신 지침 확인 권장)
- 학교마다 세부 절차가 다를 수 있음을 안내`;

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

    const { messages, educationOfficeId } = await request.json();

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

    // 교육청별 맞춤 컨텍스트 추가
    const officeContext = educationOfficeId ? getEducationOfficeContext(educationOfficeId) : '';
    const systemPromptWithOffice = TEACHER_SYSTEM_PROMPT + officeContext;

    // Gemini 클라이언트 초기화
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 4096,
      }
    });

    // 이전 대화 기록 준비 (마지막 메시지 제외, 최근 10개만)
    const history = messages.slice(-11, -1).map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' as const : 'model' as const,
      parts: [{ text: msg.content }],
    }));

    // 채팅 시작 (교육청 맞춤 시스템 프롬프트 사용)
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPromptWithOffice }],
        },
        {
          role: 'model',
          parts: [{ text: '안녕하세요! 에듀플로우 AI 비서입니다. 초등학교 선생님의 업무를 도와드리겠습니다. 업무분장, 학교폭력 대응, 생활기록부 작성, NEIS 사용법 등 어떤 질문이든 상세하게 답변해 드릴게요. 무엇을 도와드릴까요?' }],
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
