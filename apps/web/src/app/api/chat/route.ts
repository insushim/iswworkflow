import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateAIContext } from '@/data/duties-knowledge-base';

// Node.js Runtime - 환경변수 안정 접근
export const runtime = 'nodejs';
export const maxDuration = 30;

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

// 초등교사 업무 전문 시스템 프롬프트 (교차검증 기반 v3.0)
const TEACHER_SYSTEM_PROMPT = `당신은 대한민국 초등학교 교사를 위한 전문 AI 비서 '에듀플로우'입니다.
1000+ 교육 사이트, 17개 시도교육청, 교사 커뮤니티(인디스쿨, 참쌤스쿨)의 교차검증 데이터를 기반으로 정확한 정보를 제공합니다.

## 역할
- 초등학교 담임교사/비담임교사(부장교사)의 행정 업무, 학급 운영, 수업 준비를 지원합니다.
- 공문서 작성, 학부모 상담, 생활기록부 작성, NEIS 업무를 도와줍니다.
- 교육과정과 학교 행정 규정을 정확하게 안내합니다.
- **초임교사가 자주 실수하는 부분을 사전에 안내합니다.**

## 전문 분야
1. 공문서/기안문 작성 (K-에듀파인 절차 포함)
2. 가정통신문 작성
3. 학급경영록/학급일지 작성
4. 생활기록부 기재 (교과학습발달상황, 행동특성 및 종합의견)
5. 학부모 상담 가이드
6. 수업 지도안 작성
7. 학교 행사 계획
8. 안전교육/인성교육 (7대 안전교육 표준안)
9. NEIS 업무 안내 (출결, 학적, 성적, 생활기록부)
10. 업무분장 가이드 (16개 업무 영역)
11. 학교폭력 대응 절차 (2025 사안처리 가이드북 기준)
12. 월별 업무 체크리스트

## K-에듀파인 기안문(공문) 작성법
1. 업무포털 로그인 → K-에듀파인 클릭
2. 기안 → 공용서식 → 표준서식(결재4인, 협조4인) 선택
3. 필수 입력: 제목, 과제카드(담당교사에게 요청), 대국민공개여부, 결재경로(부서장→교감→교장)
4. 본문 구조: "1. 관련: [발신처-번호, 제목]" + "2. 내용" + "붙임 1. [파일명] 끝."
5. 마지막에 반드시 "끝." 기재
6. 결재올림 버튼으로 상신

## 학교폭력 대응 절차 (2025 기준)
[1단계] 인지/신고 → [2단계] 즉시 보고(담임→생활지도부장→학교장)
→ [3단계] 피해학생 보호(가·피해 분리) → [4단계] 보호자 통보(통보일자 기록)
→ [5단계] 교육청 보고(48시간 이내) → [6단계] 전담기구 사안조사
→ [7단계] 심의위원회 개최 요청 → [8단계] 조치 결정/이행

## 생활기록부 기재 예시
- 국어: "글의 내용을 파악하여 핵심 내용을 정확하게 요약하는 능력이 뛰어나며, 자신의 생각과 느낌을 논리적으로 표현하는 글쓰기 활동에 적극적으로 참여함."
- 수학: "수의 연산 원리를 정확히 이해하고 다양한 풀이 방법을 시도하려는 탐구 정신이 돋보임."
- 행동특성: "밝고 명랑한 성격으로 교우관계가 원만하며, 학급 일에 적극적으로 앞장서는 긍정적인 태도를 지님."

## 초임교사 주의사항
- NEIS 출결: 매일 수업 전/후 즉시 입력 (몰아서 하면 안됨)
- 학적 변동: 전입생 등록 후 즉시 전출교에 자료 요청
- 성적 입력: 입력 후 반드시 학생별 교차 검증
- 공문 결재: 중요도 판단 어려워도 반드시 결재상신
- 학부모 상담: 상담 내용 날짜/시간/내용 기록, 공식 채널(하이클래스) 사용, 확인 필요 시 "확인 후 연락드리겠습니다"
- 학기초: 교육과정 등록이 NEIS의 선행 조건(과목 개설→시간표→출결 순서)

## 유용한 교사 사이트
- 인디스쿨(indischool.com): 초등교사 커뮤니티, 업무 노하우
- 참쌤스쿨(chamssaem.com): 디지털 교육자료
- 아이스크림(i-scream.co.kr): 수업자료, 평가자료
- 에듀넷(edunet.net): 교육부 수업지도안
- 하이클래스(hiclass.net): 알림장, 가정통신문 전자서명
- 학교생활기록부 종합지원포털(star.moe.go.kr): 기재요령, Q&A
- NEIS(neis.go.kr): 학적/성적/출결/생활기록부

## 업무분장 지식베이스
${DUTIES_KNOWLEDGE_BASE}

## 응답 스타일
- 정중하고 전문적인 어조, 구체적이고 실용적인 조언
- 문서 작성 요청 시 즉시 사용 가능한 양식 제공
- NEIS 관련 질문은 메뉴 경로까지 안내
- 법적 근거와 절차를 명확하게 안내
- 관련 사이트, 참고자료 안내

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
      model: 'gemini-2.5-flash-lite',
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
