// 확장 문서 템플릿 (30+ 추가)
// 초등교사를 위한 추가 전문 문서 템플릿

import { DocumentTemplate } from './document-templates-comprehensive';

export const extendedDocumentTemplates: DocumentTemplate[] = [
  // ==================== 특수교육 관련 ====================
  {
    id: 'special-edu-001',
    name: '특수교육대상자 선정·배치 안내',
    category: 'admin',
    subcategory: '특수교육',
    description: '특수교육대상자 선정 및 학교 배치 절차 안내',
    prompt: '특수교육대상자 선정·배치 안내문을 작성해주세요. 선정 기준, 진단·평가 절차, 배치 과정, 필요 서류, 지원 내용을 상세히 포함해주세요.',
    tags: ['특수교육', '선정', '배치', '진단평가'],
    popularity: 4,
  },
  {
    id: 'special-edu-002',
    name: '개별화교육계획(IEP) 수립 안내',
    category: 'admin',
    subcategory: '특수교육',
    description: '특수교육대상자 개별화교육계획 수립 및 학부모 참여 안내',
    prompt: '개별화교육계획(IEP) 수립 안내문을 작성해주세요. IEP 개념, 수립 절차, 학부모 참여 방법, 일정, 협력사항을 포함해주세요.',
    tags: ['IEP', '개별화교육', '특수교육', '학부모참여'],
    popularity: 4,
  },
  {
    id: 'special-edu-003',
    name: '통합학급 운영 안내',
    category: 'curriculum',
    subcategory: '특수교육',
    description: '특수교육대상자 통합학급 운영 방침 및 지원 안내',
    prompt: '통합학급 운영 안내문을 작성해주세요. 통합교육 취지, 협력교수 방법, 또래 도우미 제도, 지원 방법을 포함해주세요.',
    tags: ['통합교육', '통합학급', '특수교육', '협력교수'],
    popularity: 3,
  },

  // ==================== 다문화교육 관련 ====================
  {
    id: 'multicultural-001',
    name: '다문화가정 지원 안내',
    category: 'admin',
    subcategory: '다문화',
    description: '다문화가정 학생 지원 프로그램 및 혜택 안내',
    prompt: '다문화가정 지원 안내문을 작성해주세요. 지원 프로그램, 한국어교육(KSL), 이중언어교육, 멘토링, 지원 신청 방법을 포함해주세요.',
    tags: ['다문화', '지원', 'KSL', '이중언어'],
    popularity: 4,
  },
  {
    id: 'multicultural-002',
    name: '세계시민교육 계획',
    category: 'curriculum',
    subcategory: '다문화',
    description: '다문화 이해 및 세계시민교육 연간 계획',
    prompt: '세계시민교육 계획서를 작성해주세요. 교육 목표, 월별 활동, 다문화 이해 프로그램, 체험활동, 기대효과를 포함해주세요.',
    tags: ['세계시민교육', '다문화이해', '글로벌', '다양성'],
    popularity: 3,
  },

  // ==================== 영재교육 관련 ====================
  {
    id: 'gifted-001',
    name: '영재교육대상자 선발 안내',
    category: 'admin',
    subcategory: '영재교육',
    description: '영재교육원/영재학급 선발 절차 및 일정 안내',
    prompt: '영재교육대상자 선발 안내문을 작성해주세요. 선발 분야, 대상, 절차(GED 검사 등), 일정, 신청 방법을 상세히 포함해주세요.',
    tags: ['영재교육', '선발', 'GED', '영재학급'],
    popularity: 4,
  },
  {
    id: 'gifted-002',
    name: '교내 영재학급 운영 안내',
    category: 'curriculum',
    subcategory: '영재교육',
    description: '학교 내 영재학급 운영 및 활동 안내',
    prompt: '교내 영재학급 운영 안내문을 작성해주세요. 운영 영역(수학, 과학, 발명 등), 수업 일정, 활동 내용, 학부모 협조사항을 포함해주세요.',
    tags: ['영재학급', '영재교육', '심화학습', '창의성'],
    popularity: 3,
  },

  // ==================== 학생 생활지도 ====================
  {
    id: 'guidance-001',
    name: '학교생활 적응 프로그램 안내',
    category: 'student',
    subcategory: '생활지도',
    description: '전입생, 부적응 학생을 위한 적응 프로그램',
    prompt: '학교생활 적응 프로그램 안내문을 작성해주세요. 프로그램 대상, 내용, 일정, 상담 지원, 학부모 협조사항을 포함해주세요.',
    tags: ['적응', '전입생', '생활지도', '상담'],
    popularity: 3,
  },
  {
    id: 'guidance-002',
    name: '학교 부적응 학생 지원 계획',
    category: 'admin',
    subcategory: '생활지도',
    description: '학교 부적응 학생 조기 발견 및 지원 계획',
    prompt: '학교 부적응 학생 지원 계획을 작성해주세요. 조기 발견 체계, 지원 프로그램, 전문기관 연계, 담임-상담교사 협력 방안을 포함해주세요.',
    tags: ['부적응', '조기발견', '지원', 'Wee클래스'],
    popularity: 4,
  },
  {
    id: 'guidance-003',
    name: '또래 조정/중재 프로그램 안내',
    category: 'student',
    subcategory: '생활지도',
    description: '학생 간 갈등 해결을 위한 또래 조정 프로그램',
    prompt: '또래 조정 프로그램 안내문을 작성해주세요. 프로그램 목적, 또래 조정자 선발, 활동 내용, 갈등 해결 절차를 포함해주세요.',
    tags: ['또래조정', '갈등해결', '학생자치', '평화교육'],
    popularity: 3,
  },

  // ==================== 교원 전문성 개발 ====================
  {
    id: 'teacher-001',
    name: '교원 연수 계획',
    category: 'admin',
    subcategory: '연수',
    description: '교직원 역량 강화를 위한 연간 연수 계획',
    prompt: '교원 연수 계획을 작성해주세요. 연수 영역(교과, 생활지도, 디지털 등), 월별 계획, 필수/선택 연수, 연수 학점, 행정사항을 포함해주세요.',
    tags: ['교원연수', '전문성', '역량강화', '연수학점'],
    popularity: 4,
  },
  {
    id: 'teacher-002',
    name: '수업 연구 동아리 운영 계획',
    category: 'curriculum',
    subcategory: '연구',
    description: '교사 수업 전문성 향상을 위한 연구 동아리 운영',
    prompt: '수업 연구 동아리 운영 계획을 작성해주세요. 동아리명, 연구 주제, 월별 활동, 수업 공개 계획, 기대효과를 포함해주세요.',
    tags: ['수업연구', '전문적학습공동체', '수업개선', '동아리'],
    popularity: 3,
  },
  {
    id: 'teacher-003',
    name: '교육실습생 지도 계획',
    category: 'admin',
    subcategory: '실습',
    description: '교육실습생 수용 및 지도 계획',
    prompt: '교육실습생 지도 계획을 작성해주세요. 실습 일정, 담당 지도교사 배정, 수업 참관/실습 계획, 평가 방법, 행정사항을 포함해주세요.',
    tags: ['교육실습', '실습생', '지도교사', '수업실습'],
    popularity: 3,
  },

  // ==================== 정보화/AI교육 ====================
  {
    id: 'digital-001',
    name: 'AI 디지털교과서 활용 안내',
    category: 'curriculum',
    subcategory: '디지털',
    description: 'AI 디지털교과서 도입 및 활용 방법 안내',
    prompt: 'AI 디지털교과서 활용 안내문을 작성해주세요. 디지털교과서 접속 방법, 기능 소개, 가정 학습 방법, 학부모 협조사항을 포함해주세요.',
    tags: ['디지털교과서', 'AI', '에듀테크', '스마트교육'],
    popularity: 5,
  },
  {
    id: 'digital-002',
    name: '학생 정보윤리교육 계획',
    category: 'safety',
    subcategory: '정보윤리',
    description: '사이버 폭력, 개인정보 보호 등 정보윤리 교육 계획',
    prompt: '학생 정보윤리교육 계획을 작성해주세요. 교육 내용(사이버폭력, 개인정보, 저작권 등), 시간 배당, 수업 방법, 학부모 연계를 포함해주세요.',
    tags: ['정보윤리', '사이버폭력', '개인정보', '디지털시민'],
    popularity: 5,
  },
  {
    id: 'digital-003',
    name: '코딩교육 운영 계획',
    category: 'curriculum',
    subcategory: '코딩',
    description: 'SW 교육 및 코딩 수업 연간 운영 계획',
    prompt: '코딩교육 운영 계획을 작성해주세요. 학년별 교육 내용, 사용 도구(엔트리, 스크래치 등), 시간 배당, 성과물 발표회 계획을 포함해주세요.',
    tags: ['코딩', 'SW교육', '컴퓨팅사고', '엔트리'],
    popularity: 4,
  },

  // ==================== 환경/생태교육 ====================
  {
    id: 'eco-001',
    name: '탄소중립 실천 교육 계획',
    category: 'curriculum',
    subcategory: '환경',
    description: '학교 탄소중립 실천 및 환경교육 계획',
    prompt: '탄소중립 실천 교육 계획을 작성해주세요. 교육 목표, 실천 활동(에너지 절약, 분리수거 등), 생태전환교육, 환경의 날 행사를 포함해주세요.',
    tags: ['탄소중립', '환경교육', '생태전환', '지속가능발전'],
    popularity: 4,
  },
  {
    id: 'eco-002',
    name: '학교 텃밭/생태원 운영 계획',
    category: 'curriculum',
    subcategory: '생태',
    description: '학교 텃밭 및 생태원 활용 교육 계획',
    prompt: '학교 텃밭 운영 계획을 작성해주세요. 텃밭 조성, 학년별 활동, 재배 작물, 수확 행사, 급식 연계를 포함해주세요.',
    tags: ['텃밭', '생태원', '자연체험', '식물가꾸기'],
    popularity: 3,
  },

  // ==================== 예술/체육교육 ====================
  {
    id: 'arts-001',
    name: '예술강사 지원사업 안내',
    category: 'curriculum',
    subcategory: '예술',
    description: '예술강사 파견 수업 안내 및 학부모 협조',
    prompt: '예술강사 지원사업 안내문을 작성해주세요. 강사 분야(국악, 연극, 미술 등), 수업 일정, 수업 내용, 준비물을 포함해주세요.',
    tags: ['예술강사', '문화예술교육', '국악', '연극'],
    popularity: 3,
  },
  {
    id: 'arts-002',
    name: '학교스포츠클럽 운영 안내',
    category: 'curriculum',
    subcategory: '체육',
    description: '학교스포츠클럽 종목 및 참여 안내',
    prompt: '학교스포츠클럽 운영 안내문을 작성해주세요. 운영 종목, 활동 일정, 대회 참가, 신청 방법, 필요 준비물을 포함해주세요.',
    tags: ['스포츠클럽', '체육', '운동', '대회'],
    popularity: 4,
  },
  {
    id: 'arts-003',
    name: '오케스트라/합창단 운영 안내',
    category: 'curriculum',
    subcategory: '예술',
    description: '학교 오케스트라 또는 합창단 단원 모집 및 활동 안내',
    prompt: '오케스트라/합창단 운영 안내문을 작성해주세요. 모집 대상, 오디션 일정, 연습 시간, 활동 내용, 악기/유니폼 관련 안내를 포함해주세요.',
    tags: ['오케스트라', '합창', '음악', '공연'],
    popularity: 3,
  },

  // ==================== 급식/보건 ====================
  {
    id: 'health-001',
    name: '학생 건강검사 결과 안내',
    category: 'admin',
    subcategory: '보건',
    description: '건강검사 결과 통보 및 건강관리 안내',
    prompt: '건강검사 결과 안내문을 작성해주세요. 검사 항목, 결과 확인 방법, 유소견 관리 안내, 의료기관 연계 방법을 포함해주세요.',
    tags: ['건강검사', '신체검사', '건강관리', '유소견'],
    popularity: 4,
  },
  {
    id: 'health-002',
    name: '알레르기 학생 관리 안내',
    category: 'admin',
    subcategory: '보건',
    description: '식품 알레르기 학생 급식 관리 안내',
    prompt: '알레르기 학생 관리 안내문을 작성해주세요. 알레르기 조사, 대체식 제공, 응급 대처, 학부모 협조사항을 포함해주세요.',
    tags: ['알레르기', '급식', '식품안전', '건강'],
    popularity: 4,
  },
  {
    id: 'health-003',
    name: '비만예방 건강증진 프로그램',
    category: 'admin',
    subcategory: '보건',
    description: '학생 비만예방 및 건강증진 프로그램 안내',
    prompt: '비만예방 건강증진 프로그램 안내문을 작성해주세요. 프로그램 대상, 운동 프로그램, 영양교육, 가정 연계 방법을 포함해주세요.',
    tags: ['비만예방', '건강증진', '운동', '영양'],
    popularity: 3,
  },

  // ==================== 학부모 교육/참여 ====================
  {
    id: 'parent-edu-001',
    name: '학부모 교육 프로그램 안내',
    category: 'parent',
    subcategory: '교육',
    description: '학부모 역량 강화를 위한 교육 프로그램',
    prompt: '학부모 교육 프로그램 안내문을 작성해주세요. 교육 주제(자녀 이해, 대화법 등), 일정, 신청 방법, 수료증 발급을 포함해주세요.',
    tags: ['학부모교육', '부모역량', '자녀교육', '가정교육'],
    popularity: 3,
  },
  {
    id: 'parent-edu-002',
    name: '학부모 동아리 활동 안내',
    category: 'parent',
    subcategory: '동아리',
    description: '학부모 동아리 운영 및 참여 안내',
    prompt: '학부모 동아리 활동 안내문을 작성해주세요. 동아리 종류(독서, 요리, 공예 등), 활동 일정, 가입 방법, 학교 행사 참여를 포함해주세요.',
    tags: ['학부모동아리', '학부모참여', '교육공동체', '자원봉사'],
    popularity: 2,
  },
  {
    id: 'parent-edu-003',
    name: '자녀와 함께하는 독서 프로그램',
    category: 'parent',
    subcategory: '독서',
    description: '가정에서 함께하는 독서 활동 프로그램',
    prompt: '자녀와 함께하는 독서 프로그램 안내문을 작성해주세요. 추천 도서, 독서 활동 방법, 독서 토론, 독서 기록장 활용을 포함해주세요.',
    tags: ['가정독서', '독서교육', '책읽기', '독서토론'],
    popularity: 3,
  },

  // ==================== 위기대응/안전 ====================
  {
    id: 'crisis-001',
    name: '학교 위기대응 매뉴얼',
    category: 'safety',
    subcategory: '위기대응',
    description: '학교 내 위기 상황 대응 절차 및 매뉴얼',
    prompt: '학교 위기대응 매뉴얼을 작성해주세요. 위기 유형(안전사고, 폭력, 자살 등), 단계별 대응 절차, 비상연락망, 유관기관 연계를 포함해주세요.',
    tags: ['위기대응', '안전', '비상상황', '매뉴얼'],
    popularity: 4,
  },
  {
    id: 'crisis-002',
    name: '학생 자살예방 교육 계획',
    category: 'safety',
    subcategory: '생명존중',
    description: '학생 생명존중 및 자살예방 교육 계획',
    prompt: '자살예방 교육 계획을 작성해주세요. 생명존중 교육, 게이트키퍼 양성, 위기학생 선별, 상담 연계, 학부모 협조를 포함해주세요.',
    tags: ['자살예방', '생명존중', '게이트키퍼', '정신건강'],
    popularity: 4,
  },

  // ==================== 진로교육 ====================
  {
    id: 'career-001',
    name: '진로체험의 날 안내',
    category: 'curriculum',
    subcategory: '진로',
    description: '직업 체험 및 진로 탐색 프로그램 안내',
    prompt: '진로체험의 날 안내문을 작성해주세요. 체험 프로그램, 참여 기관, 일정, 이동 방법, 준비물을 포함해주세요.',
    tags: ['진로체험', '직업탐색', '진로교육', '체험학습'],
    popularity: 4,
  },
  {
    id: 'career-002',
    name: '학부모 진로 멘토 프로그램',
    category: 'curriculum',
    subcategory: '진로',
    description: '학부모가 참여하는 직업 소개 멘토링',
    prompt: '학부모 진로 멘토 프로그램 안내문을 작성해주세요. 프로그램 취지, 참여 방법, 멘토링 내용, 일정, 신청서를 포함해주세요.',
    tags: ['진로멘토', '학부모참여', '직업소개', '멘토링'],
    popularity: 3,
  },
];

// 카테고리별 그룹화
export const extendedTemplatesByCategory = {
  specialEdu: extendedDocumentTemplates.filter(t => t.subcategory === '특수교육'),
  multicultural: extendedDocumentTemplates.filter(t => t.subcategory === '다문화'),
  gifted: extendedDocumentTemplates.filter(t => t.subcategory === '영재교육'),
  guidance: extendedDocumentTemplates.filter(t => t.subcategory === '생활지도'),
  teacher: extendedDocumentTemplates.filter(t =>
    ['연수', '연구', '실습'].includes(t.subcategory)
  ),
  digital: extendedDocumentTemplates.filter(t =>
    ['디지털', '정보윤리', '코딩'].includes(t.subcategory)
  ),
  eco: extendedDocumentTemplates.filter(t =>
    ['환경', '생태'].includes(t.subcategory)
  ),
  arts: extendedDocumentTemplates.filter(t =>
    ['예술', '체육'].includes(t.subcategory)
  ),
  health: extendedDocumentTemplates.filter(t => t.subcategory === '보건'),
  parentEdu: extendedDocumentTemplates.filter(t =>
    ['교육', '동아리', '독서'].includes(t.subcategory) && t.category === 'parent'
  ),
  crisis: extendedDocumentTemplates.filter(t =>
    ['위기대응', '생명존중'].includes(t.subcategory)
  ),
  career: extendedDocumentTemplates.filter(t => t.subcategory === '진로'),
};

// 모든 확장 템플릿 수 (30개)
export const extendedTemplateCount = extendedDocumentTemplates.length;
