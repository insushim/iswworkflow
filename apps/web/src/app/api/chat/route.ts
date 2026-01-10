import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

// 초등교사 업무분장 종합 지식베이스 - 교육부/시도교육청 교차검증 기반
const DUTIES_KNOWLEDGE_BASE = `
# 초등교사 업무분장 종합 지식베이스
교육부, 시도교육청, 학교 매뉴얼, 교사 커뮤니티(인디스쿨 등) 교차검증 기반

## 1. 교무기획부 (학사일정, 교육과정, 수업시수, 학적)

### 법적 근거
- 초·중등교육법 제23조: 학교는 교육과정을 운영하여야 한다
- 초·중등교육법 시행령 제25조: 학교생활기록의 작성 및 관리
- 2022 개정 교육과정: 초1~2 2024년, 초3~4 2025년, 초5~6 2026년 시행
- 학교생활기록 작성 및 관리지침(교육부 훈령 제504호, 2024.12.23 개정)

### 연간 업무 흐름
- 1월: 예비소집일, 신입생 배정, 취학통지서 발급
- 2월: 졸업식, 학급편성, 담임배정, 교육과정 확정, NEIS 학년도 전환
- 3월: 입학식, 학사일정 확정(학운위 심의), 학적 정리, 수업일수 확보(190일+)
- 4~6월: 학적 변동 처리(전입/전출), 교육과정 점검
- 7월: 1학기 종업식, 생기부 마감
- 9월: 2학기 시작
- 12월: 학년말 정리, 생기부 최종 마감, 차년도 계획

### 학적 업무 절차
**전입 처리:**
1. 학부모 방문 → 전출학교 서류 확인
2. NEIS > 학적 > 전입학관리에서 전입 승인 (14일 이내)
3. 학급 배정 (학생 수 균형 고려)
4. 특수교육대상, 알레르기 등 확인
5. 오리엔테이션 (급식, 돌봄 신청 안내)

**전출 처리:**
1. 전출 신청서 접수
2. NEIS 전출 신청
3. 생활기록부, 건강기록부 출력 및 원본대조필
4. 전입학교 승인 확인 후 학적 이관 완료

### NEIS 메뉴
- NEIS > 학적 > 전입학관리 / 졸업대장관리 / 학생증발급관리

### 자주 묻는 질문
Q: 취학유예는 어떻게 처리하나요?
A: 취학유예 신청서와 의사 소견서(질병 사유 시)를 받아 학교장 결재 후 교육지원청에 보고. NEIS > 학적 > 취학의무면제/유예관리에서 처리.

Q: 교육과정 시수 증감은 어디까지 가능한가요?
A: 교과(군)별 창의적 체험활동 시수의 20% 범위 내에서 증감 가능. 체육, 예술 교과는 기준 시수 확보 필수.

Q: 수업일수 190일을 채우지 못하면?
A: 특별한 사유(재난, 감염병) 외에는 필수. 부득이한 경우 교육청 승인으로 조정 가능.

### 실무 팁
- 학적 변동은 발생 즉시 NEIS 처리 (미처리 시 상급학교 진학 차질)
- 졸업대장은 영구보존 문서 - 오기재 시 정정 절차 복잡
- 교육과정 편성 시 교육청 지침 반드시 확인
- 입학초기적응활동(초1, 34시간)은 3월 중 집중 편성

---

## 2. 생활지도부/학교폭력 (학폭예방, 대응, 자치위원회)

### 법적 근거
- 학교폭력예방 및 대책에 관한 법률
- 교원의 학생생활지도에 관한 고시(교육부고시 제2023-28호, 2023.9.1 시행)
- 교원의 지위 향상 및 교육활동 보호를 위한 특별법

### 제도 변경사항 (2020.3.1~)
- 학교폭력대책자치위원회 → 교육지원청 학교폭력대책심의위원회로 이관
- 학교 내 학교폭력 전담기구 운영
- 경미한 사안: 학교장 자체해결 가능 (피해학생·보호자 동의 시)

### 학교폭력 사안 처리 절차
1. 사안 인지 → 피해학생 분리 및 보호 (즉시)
2. 전담기구 회부 및 사안 조사 (3일 이내)
3. 전담기구 심의: 학교장 자체해결 or 심의위 회부 결정
4. 심의위원회 회부 (중대사안 시, 48시간 이내)
5. 심의위원회 조치 결정
6. 조치 통보 및 이행
7. 사후 관리 (재발 방지)

### 학교장 자체해결 요건
- 경미한 사안
- 피해학생과 그 보호자의 서면 동의
- 가해학생이 즉시 사과하여 화해
- 신체·금품 피해가 없고, 지속성·고의성이 낮음

### 생기부 기재 (2024년 개정)
- 조치 1~9호 중 결정된 조치가 "학교폭력 조치 상황란"에 일원화 기재
- 졸업 후 4년간 보존
- 삭제 조건: 피해학생 동의 + 불복소송 미진행 + 추가 학교폭력 없음

### 자주 묻는 질문
Q: 학교폭력 사안을 알게 되면 어떻게 해야 하나요?
A: 즉시 피해학생을 분리하여 안전을 확보하고, 학교폭력 전담기구에 보고. 24시간 이내에 교육지원청에 사안 보고 필수.

Q: 사이버폭력도 학교폭력인가요?
A: 네, 인터넷·휴대폰 등을 이용한 모욕, 명예훼손, 따돌림, 성폭력 등도 학교폭력에 해당. 카카오톡, SNS 등에서 발생한 폭력도 동일 처리.

Q: 학교폭력 조치를 삭제하려면?
A: 피해학생(보호자) 동의, 불복소송 미진행, 추가 학교폭력 없음 등 조건 충족 시 삭제 심의 요청 가능. 졸업 후 2년 경과 시 자동 삭제(1~3호, 7호).

### 실무 팁
- 사안 인지 즉시 피해학생 분리 및 심리적 안정 조치가 최우선
- 모든 면담은 기록으로 남기고, 가능하면 2인 이상 동석
- 학부모 상담 시 녹음 가능성 인지하고 신중하게 발언
- SNS, 카톡 등 사이버폭력 증거는 캡처하여 보관

---

## 3. 담임업무 (학급경영, 학부모상담, 생기부)

### 법적 근거
- 초·중등교육법 시행규칙 제25조
- 학교생활기록 작성 및 관리지침(교육부 훈령 제504호)
- 교원의 학생생활지도에 관한 고시

### 학교생활기록부 작성
- 진로활동: 진로희망분야, 진로검사·상담 결과 (초등은 희망분야 생략 가능)
- 창의적 체험활동: 자율·자치활동 특기사항 입력
- 교과학습발달상황: 세부능력 및 특기사항 문장 입력
- 행동특성 및 종합의견: 학년말 종합 의견 작성 (500자 내외)

### 학부모 상담 (교권보호 4법 시행 2023.9.21~)
- 연 2회 이상 학부모 상담주간 운영
- 학부모 면담 사전예약제 시행
- 교사 개인 휴대폰·SNS 민원 거부 가능
- 학교 민원대응팀 일원화 대응

### 출결 관리
- 결석 3일 이상 시 가정 연락 필수
- NEIS 즉시 입력

### 자주 묻는 질문
Q: 생기부 오기재 시 어떻게 정정하나요?
A: 학업성적관리위원회 심의 후 정정. 담임교사(재학생) 또는 업무담당자(졸업생)가 처리. 증빙자료 필수.

Q: 학부모가 교사 개인번호로 연락하면?
A: 교권보호법에 따라 거부 가능. 학교 대표번호나 학교 공식 메신저 이용 안내.

### 실무 팁
- 생기부는 수시로 입력 (학기말 몰아쓰기 방지)
- 학부모 상담 시 긍정적 면 먼저 언급 후 개선점 제시
- 교권 침해 시 즉시 관리자 보고, 교권보호위원회 신고

---

## 4. 보건부 (학교보건, 감염병, 건강검사)

### 법적 근거
- 학교보건법
- 학교건강검사규칙
- 감염병의 예방 및 관리에 관한 법률

### 학생건강검사
- 신체발달 상황 검사: 전 학년 (키, 몸무게, 비만도)
- 건강검진: 초1, 초4 (구강, 시력, 청력 등)
- 소변검사: 초1
- 구강검진: 전 학년

### 감염병 대응 절차
1. 의심 증상 발견 → 격리 (즉시)
2. 보호자 연락 → 귀가 또는 병원 안내
3. 의료기관 진단 확인
4. 법정감염병 확진 시 24시간 이내 보건소 신고
5. 등교중지 조치 (감염병별 기간 상이)
6. 소독 실시
7. 추가 발생 모니터링

### 주요 감염병 등교중지 기간
- 인플루엔자: 해열 후 2일간
- 수두: 모든 수포가 가피 형성될 때까지
- 유행성이하선염: 침샘 부종 후 5일간
- 코로나19(4급): 5일 (해열 후 24시간 경과)

### 자주 묻는 질문
Q: 학생에게 약을 줘도 되나요?
A: 학부모의 투약의뢰서가 있어야 합니다. 의뢰서 없이 약 투약은 의료법 위반.

Q: 응급상황 발생 시 대응은?
A: 119 신고, 응급처치(CPR 등), 보호자 연락. 비상연락망 최신화 필수.

### 실무 팁
- 투약의뢰서 없이 약 투약 절대 금지 (의료법 위반)
- 감염병 발생 시 24시간 이내 보건소 신고 필수
- 응급처치 시 기록은 상세히 (시간, 증상, 조치, 결과)

---

## 5. 안전부 (학교안전, 재난대응, 안전교육)

### 법적 근거
- 학교안전사고 예방 및 보상에 관한 법률 제8조
- 학교 안전교육 7대 표준안

### 안전교육 7대 표준안
1. 재난안전: 화재, 지진, 풍수해 등
2. 생활안전: 시설·장소별 안전
3. 교통안전: 보행자·자전거·대중교통 안전
4. 폭력·신변안전: 학교폭력, 아동학대, 성폭력 예방
5. 약물·사이버중독: 약물 오남용, 인터넷·스마트폰 중독
6. 직업안전: 직업활동 관련 안전
7. 응급처치: 심폐소생술, 응급상황 대처

### 안전교육 시수
- 초1~2: '안전한 생활' 과목으로 연간 64시간 (창체)
- 초3~6: 7대 안전교육 연간 51차시 이상

### 재난대응훈련
- 지진 대피훈련: 연 2회 이상
- 화재 대피훈련: 연 2회 이상
- 침입자 대응훈련

### 화재 대피 요령
1. 비상벨 울림 → 대피 개시
2. 낮은 자세로 질서있게 이동
3. 지정 장소(운동장)로 대피
4. 학급별 인원 점검 및 보고

### 지진 대피 요령
1. 책상 밑으로 대피 (머리 보호)
2. 흔들림 멈추면 운동장으로 대피
3. 창문, 무거운 물건에서 멀리
4. 엘리베이터 사용 금지

### 자주 묻는 질문
Q: 학교에서 다치면 치료비는?
A: 학교안전공제회에서 보상. 담임교사 또는 보건교사에게 사고 사실 알리고 청구 절차 안내받기.

### 실무 팁
- 대피훈련은 사전 예고 없이 실시하면 실제 대응력 향상
- 안전교육은 체험 중심으로 실시 (영상 시청만은 비효과적)
- 안전사고 발생 시 즉시 관리자 보고 및 보호자 연락

---

## 6. 급식부 (급식운영, 식재료, 영양교육)

### 법적 근거
- 학교급식법
- 식품위생법

### 식중독 예방
- 중심온도 75℃ 이상 1분 이상 가열
- 보존식: 매 끼니 100g 이상, -18℃ 이하 144시간 보관
- 조리 후 2시간 이내 배식

### 식중독 발생 시 대응
1. 증상 발생 인지 (5명 이상 유사 증상)
2. 환자 격리, 병원 이송
3. 급식 중단, 잔여 음식 보관
4. 보건소 신고 (즉시)
5. 교육청 보고 (1시간 이내)
6. 역학조사 협조

### 알레르기 관리
- 알레르기 유발 식품 18종 표시 (식단표)
- 알레르기 학생 명단 급식실 공유
- 대체식 제공

### 자주 묻는 질문
Q: 급식비는 얼마인가요?
A: 현재 대부분의 초등학교는 무상급식. 방학 중 급식이나 특별 프로그램은 별도 비용 발생 가능.

### 실무 팁
- 알레르기 학생 명단 급식실과 공유 필수
- 조리원 건강상태 매일 체크 (설사, 구토 시 조리 금지)

---

## 7. 특수교육부 (특수학급, IEP, 통합교육)

### 법적 근거
- 장애인 등에 대한 특수교육법

### 개별화교육계획(IEP)
- 개별화교육지원팀 구성: 학년 시작 2주 이내
- IEP 작성: 매 학기 시작 30일 이내
- IEP 평가: 매 학기말
- 전·입학 시 IEP 이관: 14일 이내

### IEP 작성 절차
1. 준비단계: 개별화교육운영위원회 구성
2. 진단단계: 현행수준 평가
3. 계획단계: 장·단기 목표 설정
4. 지도단계: 개별화 교육 실시
5. 평가단계: 목표 달성도 평가

### 실무 팁
- IEP는 학부모 동의 필수
- 통합학급 담임과 긴밀한 협력 체계 구축

---

## 8. 돌봄/방과후부 (돌봄교실, 방과후학교)

### 법적 근거
- 초·중등교육법 제23조의2

### 돌봄교실 유형
- 오후돌봄: 초1~4학년, 맞벌이·저소득층 우선
- 방과후 연계형 돌봄: 초등 고학년
- 저녁돌봄: 추가 돌봄 필요 학생
- 방학 중 돌봄

### 늘봄학교 (2025년 전면 시행)
- 오전 8시~오후 8시까지 운영
- 희망하는 모든 초등학생 이용 가능
- 돌봄+방과후+에듀테크 통합 운영

### 실무 팁
- 안전사고 예방 최우선
- 저소득층 자유수강권 적극 안내

---

## 9. 상담부/Wee클래스 (학생상담, 심리검사)

### Wee 프로젝트
- 1차 Safe-net: Wee클래스 (학교 내 상담실)
- 2차 Safe-net: Wee센터 (교육지원청 단위)
- 3차 Safe-net: Wee스쿨 (기숙형 위기학생 치유학교)

### 초등학교 주요 심리검사
- HTP (집-나무-사람 그림검사)
- KFD (동적가족화 검사)
- SCT (문장완성검사)
- MMTIC (아동용 성격유형검사)

### 실무 팁
- 상담 내용은 비밀 보장 원칙 (단, 자해·타해 위험 시 보호자 통보)
- 고위기 학생은 Wee센터 연계
- 학급담임과 긴밀한 협조 체계 구축

---

## 10. 연구부 (교원연수, 수업연구)

### 전문적 학습공동체
- 학교 안 전문적 학습공동체: 주제별, 학년별, 교과별
- 학교 간 교원학습공동체: 지역 단위 협력
- 정기 모임 (주 1회 또는 월 2회)

### 수업공개
- 학기당 1회 수업공개 주간 운영
- 수업 나눔 문화 조성

### 실무 팁
- 전문적 학습공동체는 형식적 운영 지양, 실질적 성장 중심
- 수업공개는 부담이 아닌 성장의 기회로 문화 조성

---

## 11. 정보부 (NEIS, 정보보안)

### NEIS (교육행정정보시스템)
- 4세대 지능형 NEIS: 2023.6.21~ 운영
- 기능: 교무학사, 인사, 회계 등 전 교육행정업무 전자 처리

### 정보보안
- 개인정보보호: 학생 정보 암호화, 접근권한 관리
- 보안 점검: 월 1회 이상
- NEIS 비밀번호 정기 변경 (3개월마다)
- 퇴직·전출 교직원 NEIS 권한 즉시 회수

### 실무 팁
- 개인정보 출력물 보안 관리 (문서 세단기 이용)
- 학생 정보 USB 이동 시 암호화 필수
- NEIS는 크롬보다 엣지 브라우저에서 안정적

---

## 12. 과학부/영재교육

### 영재학급 운영
- 대상: 초3~6학년
- 연간 90시간 이상 운영
- 학급당 20명 이내
- 방과후·주말·방학 활용

### 과학의 날
- 4월 21일 (과학기술인의 날)
- 과학 체험 프로그램 운영

### 실무 팁
- 과학실 안전사고 예방 최우선 (보안경 착용, 안전 수칙 준수)
- 영재학급은 심화·속진보다 창의성·탐구력 중심

---

## 13. 체육부 (체육교육, PAPS, 수영)

### PAPS (학생건강체력평가)
- 대상: 초5~6 (2025년 초4 시행, 단계적 확대)
- 평가 항목: 심폐지구력, 근력·근지구력, 유연성, 순발력, BMI
- 결과 처리: NEIS 입력, 생기부 연계

### 생존수영
- 대상: 초3~6
- 시간: 연 10시간 이상
- 교육 내용: 물에 뜨기, 이동하기, 구조 요청

### 실무 팁
- PAPS는 학생 체력 증진이 목적 (등급 경쟁 지양)
- 수영교육 시 안전사고 예방 최우선

---

## 14. 도서부 (독서교육, 도서관운영)

### 사서교사 배치
- 학교당 1명 이상 배치 의무화 (2018.8.14 개정)
- 미배치 학교: 일반교사 겸임 또는 사서 배치

### 독서교육
- 독서주간 운영
- 작가와의 만남
- 독서 프로그램 (독서 퀴즈, 독서토론)

### 실무 팁
- 학생 흥미를 고려한 도서 구입
- 도서관을 편안한 독서 공간으로 조성

---

## 15. 교육복지부 (복지사업, 저소득층 지원)

### 우선지원 대상학생
- 기초수급자 학생
- 법정 차상위계층 학생
- 한부모가족 보호 대상 학생
- 중위소득 60% 이하 학생
- 탈북 및 다문화 학생

### 지원 내용
- 학습 지원: 기초학습, 멘토링
- 문화·체험 지원: 현장체험, 공연 관람
- 심리·정서 지원: 상담, 치료
- 복지 지원: 의료, 학습준비물, 급식비

### 실무 팁
- 우선지원학생 개인정보 보호 철저
- 낙인효과 방지: 일반 학생과 통합 프로그램 운영

---

## 16. 인성/진로부 (인성교육, 진로교육)

### 인성교육
- 학교 인성교육 계획 수립
- 체험활동 중심 인성교육 프로그램

### 진로교육
- 진로교육 집중학년·학기제 (선택 운영)
- 진로체험의 날 운영 (학기당 1회 이상)
- 커리어넷 활용 진로심리검사

### 관련 사이트
- 커리어넷: career.go.kr
- 꿈길: www.ggoomgil.go.kr

### 실무 팁
- 진로체험은 안전관리 철저 (인솔교사 배치, 보험 가입)
- 인성교육은 일회성이 아닌 교육과정 전반에 통합 운영

---

## 공통 유의사항
1. NEIS 처리: 업무 발생 즉시 입력
2. 문서 보안: 개인정보 포함 문서 암호화
3. 학부모 소통: 객관적 사실 중심 설명
4. 교권 보호: 부당한 민원 시 민원대응팀 연계
5. 안전 최우선: 모든 교육활동에서 학생 안전 최우선
6. 증빙서류: 모든 업무 처리 시 증빙자료 보관
7. 보고 체계: 중요 사안 즉시 관리자 보고

---

## 유용한 사이트
- 학교생활기록부 종합지원포털: star.moe.go.kr
- 학교안전정보센터: schoolsafe.kr
- Wee 프로젝트: www.wee.go.kr
- 커리어넷: career.go.kr
- 늘봄·방과후 중앙포털: www.afterschool.go.kr
- NEIS: www.neis.go.kr
- 인디스쿨(교사 커뮤니티): www.indischool.com
`;

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
