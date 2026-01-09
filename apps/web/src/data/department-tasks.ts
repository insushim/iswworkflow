// 부서별 상세 업무 목록 (실제 교육청 자료 및 학교 업무분장표 기반)
// Sources: 행정안전부 행정업무운영편람, 교육부, 시도교육청, 나이스 업무매뉴얼

export interface DepartmentTask {
  id: string;
  departmentId: string;
  taskName: string;
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'as_needed';
  description: string;
  relatedSystems: string[];  // NEIS, 에듀파인 등
  monthlySchedule?: number[];  // 해당 월
  deadline?: string;
  tips?: string[];
  references?: string[];
}

// 교무부 업무 (학교 업무 총괄)
export const gyomubuTasks: DepartmentTask[] = [
  // 학적 관리
  {
    id: 'gyomu_001',
    departmentId: 'dept_001',
    taskName: '학적 관리',
    category: '학적',
    frequency: 'as_needed',
    description: '입학, 전·편입학, 휴학, 유예, 면제, 졸업 등 학적 처리',
    relatedSystems: ['NEIS 학적관리'],
    tips: [
      '전입생 학적 처리는 3일 이내 완료',
      '학적변동 시 학부모 확인서 필수',
      '유예·면제는 반드시 교육장 승인 필요'
    ],
    references: ['초·중등교육법 시행령 제21조', '학교생활기록 작성 및 관리지침']
  },
  {
    id: 'gyomu_002',
    departmentId: 'dept_001',
    taskName: '출결 관리',
    category: '학적',
    frequency: 'daily',
    description: '일별 출결 현황 파악, 결석계 처리, 장기결석 관리',
    relatedSystems: ['NEIS 출결관리'],
    tips: [
      '무단결석 3일 이상 시 가정방문 필수',
      '출석인정 사유는 교육부 지침 확인',
      '장기결석(연속 7일) 시 교육청 보고'
    ]
  },
  {
    id: 'gyomu_003',
    departmentId: 'dept_001',
    taskName: '학교생활기록부 관리',
    category: '학적',
    frequency: 'yearly',
    description: '학생부 작성 지도, 점검, 오류 정정, 마감 처리',
    relatedSystems: ['NEIS 학교생활기록부'],
    monthlySchedule: [2, 7, 12],
    tips: [
      '학기말/학년말 마감 전 전수 점검',
      '정정 대장 반드시 작성',
      '졸업생 학생부 5년 보관 후 영구보존용 이관'
    ],
    references: ['학교생활기록부 기재요령']
  },
  {
    id: 'gyomu_004',
    departmentId: 'dept_001',
    taskName: '성적 관리',
    category: '성적',
    frequency: 'quarterly',
    description: '성적처리 계획 수립, 성적 산출, 성적표 발급',
    relatedSystems: ['NEIS 성적관리'],
    monthlySchedule: [7, 12, 2],
    tips: [
      '초등학교는 서술형 평가 중심',
      '성취기준 도달 여부 명확히 기술',
      '특수교육대상학생 평가 조정 반영'
    ]
  },
  {
    id: 'gyomu_005',
    departmentId: 'dept_001',
    taskName: '수업시수 관리',
    category: '교무',
    frequency: 'weekly',
    description: '시간표 편성, 결보강 처리, 수업일수 관리',
    relatedSystems: ['NEIS 시간표관리'],
    tips: [
      '법정 수업일수(190일 이상) 확인',
      '교과별 시수 배당 기준 준수',
      '결강 시 보강 계획 즉시 수립'
    ],
    references: ['초·중등교육법 시행령 제45조']
  },
  {
    id: 'gyomu_006',
    departmentId: 'dept_001',
    taskName: '교육과정 편성·운영',
    category: '교무',
    frequency: 'yearly',
    description: '학교 교육과정 편성, 교과서 선정, 교육과정 평가',
    relatedSystems: ['NEIS 교육과정'],
    monthlySchedule: [11, 12, 2],
    tips: [
      '국가 교육과정 기준 준수',
      '학교 자율시간 활용 계획 수립',
      '지역사회 연계 교육과정 반영'
    ],
    references: ['2022 개정 교육과정']
  },
  {
    id: 'gyomu_007',
    departmentId: 'dept_001',
    taskName: '교원 인사 관리',
    category: '인사',
    frequency: 'as_needed',
    description: '교원 복무 관리, 휴가, 출장, 초과근무, 근무성적평정',
    relatedSystems: ['NEIS 인사관리', '나이스 복무관리'],
    tips: [
      '휴가 결재 규정 준수',
      '초과근무 사전 승인 필수',
      '근평 기간 엄수'
    ]
  },
  {
    id: 'gyomu_008',
    departmentId: 'dept_001',
    taskName: '졸업·수료 업무',
    category: '학적',
    frequency: 'yearly',
    description: '졸업·수료 사정회, 졸업식 준비, 졸업장 발급, 상장 수여',
    relatedSystems: ['NEIS 학적관리'],
    monthlySchedule: [1, 2],
    deadline: '2월 졸업식 전',
    tips: [
      '졸업 요건 충족 여부 전수 확인',
      '졸업장 번호 부여 규칙 준수',
      '졸업앨범 배부 일정 조율'
    ]
  },
  {
    id: 'gyomu_009',
    departmentId: 'dept_001',
    taskName: '입학 업무',
    category: '학적',
    frequency: 'yearly',
    description: '신입생 배정, 예비소집, 입학식, 반 편성, 학적 생성',
    relatedSystems: ['NEIS 학적관리', '취학관리시스템'],
    monthlySchedule: [12, 1, 2, 3],
    tips: [
      '취학통지서 발송 일정 확인',
      '예비소집 불참자 가정방문',
      '특수교육대상학생 사전 파악'
    ]
  },
  {
    id: 'gyomu_010',
    departmentId: 'dept_001',
    taskName: '공문 수발 관리',
    category: '행정',
    frequency: 'daily',
    description: '공문 접수, 배부, 시행문 발송, 문서 관리',
    relatedSystems: ['업무관리시스템', 'K-에듀파인'],
    tips: [
      '공문 처리 기한 엄수',
      '중요 공문 결재 독촉',
      '문서 보존 기간 준수'
    ]
  },
];

// 연구부 업무 (수업·평가·연수)
export const yeongububTasks: DepartmentTask[] = [
  {
    id: 'yeongu_001',
    departmentId: 'dept_002',
    taskName: '교내 수업공개',
    category: '수업',
    frequency: 'quarterly',
    description: '수업공개의 날 운영, 학부모 공개수업, 동료 수업 나눔',
    relatedSystems: [],
    monthlySchedule: [4, 6, 9, 11],
    tips: [
      '학부모 공개수업 사전 안내',
      '수업 참관록 양식 배부',
      '수업 나눔 협의회 운영'
    ]
  },
  {
    id: 'yeongu_002',
    departmentId: 'dept_002',
    taskName: '전문적 학습공동체 운영',
    category: '연수',
    frequency: 'weekly',
    description: '전문적 학습공동체 조직, 활동 지원, 실적 관리',
    relatedSystems: ['전학공 플랫폼'],
    tips: [
      '학기당 15시간 이상 운영',
      '활동 결과 탑재 기한 준수',
      '우수 사례 공유'
    ]
  },
  {
    id: 'yeongu_003',
    departmentId: 'dept_002',
    taskName: '교원 연수 관리',
    category: '연수',
    frequency: 'as_needed',
    description: '교원 연수 계획, 직무연수 신청 관리, 연수 이력 관리',
    relatedSystems: ['NEIS 연수관리', '중앙교육연수원', '시도교육청연수원'],
    tips: [
      '연간 60시간 이상 연수 이수',
      '필수연수 항목 확인',
      '연수 이력 누가 기록'
    ]
  },
  {
    id: 'yeongu_004',
    departmentId: 'dept_002',
    taskName: '평가 관리',
    category: '평가',
    frequency: 'quarterly',
    description: '학업성취도평가 계획, 평가문항 검토, 평가 결과 분석',
    relatedSystems: ['NEIS 성적관리'],
    monthlySchedule: [4, 7, 10, 12],
    tips: [
      '성취기준 기반 평가 설계',
      '과정중심평가 강화',
      '평가 결과 환류 체계 구축'
    ]
  },
  {
    id: 'yeongu_005',
    departmentId: 'dept_002',
    taskName: '장학 업무',
    category: '장학',
    frequency: 'yearly',
    description: '교내 자율장학 운영, 컨설팅장학 신청, 장학자료 관리',
    relatedSystems: [],
    tips: [
      '담임장학 월 1회 이상',
      '수업 코칭 지원',
      '장학 결과 기록 유지'
    ]
  },
  {
    id: 'yeongu_006',
    departmentId: 'dept_002',
    taskName: '교과서 선정·관리',
    category: '교육과정',
    frequency: 'yearly',
    description: '교과서 선정 위원회, 교과서 주문, 배부, 관리',
    relatedSystems: ['교과서민원바로처리시스템', 'NEIS'],
    monthlySchedule: [8, 9, 2, 3],
    tips: [
      '선정 위원회 구성·운영',
      '교과서 파손 시 추가 주문',
      '전학생 교과서 처리'
    ]
  },
  {
    id: 'yeongu_007',
    departmentId: 'dept_002',
    taskName: '학습부진학생 지도',
    category: '학습',
    frequency: 'monthly',
    description: '기초학력 진단, 학습부진학생 선정, 맞춤형 지도',
    relatedSystems: ['꿈사다리', '기초학력 진단-보정 시스템'],
    tips: [
      '3월 기초학력 진단검사 실시',
      '두드림학교 프로그램 연계',
      '학습 성장 기록 관리'
    ]
  },
];

// 생활지도부 업무 (학생 생활)
export const saenghwalbuTasks: DepartmentTask[] = [
  {
    id: 'saenghwal_001',
    departmentId: 'dept_003',
    taskName: '학교폭력 예방·대응',
    category: '학교폭력',
    frequency: 'as_needed',
    description: '학교폭력 예방교육, 사안 접수·처리, 심의위원회 운영',
    relatedSystems: ['학교폭력신고시스템 117', 'NEIS 학폭관리'],
    tips: [
      '학기당 1회 이상 예방교육 필수',
      '사안 인지 시 즉시 보고',
      '가·피해학생 분리 조치',
      '심의위원회 14일 이내 개최'
    ],
    references: ['학교폭력예방 및 대책에 관한 법률']
  },
  {
    id: 'saenghwal_002',
    departmentId: 'dept_003',
    taskName: '학생자치회 운영',
    category: '학생자치',
    frequency: 'weekly',
    description: '학생자치회 선거, 회의 지원, 학생 의견 수렴',
    relatedSystems: [],
    tips: [
      '민주적 선거 절차 준수',
      '학생 자율 활동 보장',
      '예산 집행 지도'
    ]
  },
  {
    id: 'saenghwal_003',
    departmentId: 'dept_003',
    taskName: '생활지도',
    category: '생활지도',
    frequency: 'daily',
    description: '등·하교 지도, 급식 지도, 복도 순시, 생활규칙 지도',
    relatedSystems: [],
    tips: [
      '학생인권조례 준수',
      '훈육 시 교권 침해 주의',
      '문제 행동 지속 시 학부모 상담'
    ]
  },
  {
    id: 'saenghwal_004',
    departmentId: 'dept_003',
    taskName: '학생 상담',
    category: '상담',
    frequency: 'as_needed',
    description: '학생 개인 상담, 위기학생 발굴, 전문기관 연계',
    relatedSystems: ['Wee클래스', '정신건강복지센터'],
    tips: [
      '위기학생 조기 발견 체크리스트 활용',
      '자살예방 게이트키퍼 교육 이수',
      '비밀보장 원칙 준수'
    ]
  },
  {
    id: 'saenghwal_005',
    departmentId: 'dept_003',
    taskName: '인성교육',
    category: '인성교육',
    frequency: 'monthly',
    description: '인성교육 프로그램 운영, 인성의 달 행사',
    relatedSystems: [],
    monthlySchedule: [5],
    tips: [
      '학년별 인성교육 계획 수립',
      '범교과 연계 운영',
      '체험 중심 프로그램 구성'
    ]
  },
  {
    id: 'saenghwal_006',
    departmentId: 'dept_003',
    taskName: '출결 특이사항 관리',
    category: '출결',
    frequency: 'daily',
    description: '장기결석 학생 관리, 학업중단 위기학생 관리',
    relatedSystems: ['NEIS 출결관리', '학업중단예방시스템'],
    tips: [
      '무단결석 즉시 가정연락',
      '장기결석 시 학업중단숙려제 안내',
      '교육청 보고 기한 준수'
    ]
  },
];

// 안전부 업무
export const anjeonbuTasks: DepartmentTask[] = [
  {
    id: 'anjeon_001',
    departmentId: 'dept_004',
    taskName: '7대 안전교육',
    category: '안전교육',
    frequency: 'monthly',
    description: '생활안전, 교통안전, 폭력·신변안전, 약물·사이버, 재난안전, 직업안전, 응급처치 교육',
    relatedSystems: ['학교안전정보센터', 'NEIS'],
    tips: [
      '안전교육 51시간 이상/년',
      '실습 중심 교육 권장',
      '안전교육 이수 기록 필수'
    ],
    references: ['학교안전교육 실시 기준 등에 관한 고시']
  },
  {
    id: 'anjeon_002',
    departmentId: 'dept_004',
    taskName: '재난대응 훈련',
    category: '재난안전',
    frequency: 'quarterly',
    description: '지진, 화재, 미세먼지 등 재난대피훈련 실시',
    relatedSystems: ['국민재난안전포털'],
    monthlySchedule: [4, 6, 9, 11],
    tips: [
      '분기 1회 이상 훈련 필수',
      '대피 경로 사전 숙지',
      '훈련 결과 교육청 보고'
    ]
  },
  {
    id: 'anjeon_003',
    departmentId: 'dept_004',
    taskName: 'CCTV 관리',
    category: '시설안전',
    frequency: 'monthly',
    description: 'CCTV 운영, 영상정보 관리, 개인정보 보호',
    relatedSystems: [],
    tips: [
      '영상정보 30일 이상 보관',
      '개인정보 열람 기록 유지',
      '연 1회 점검'
    ]
  },
  {
    id: 'anjeon_004',
    departmentId: 'dept_004',
    taskName: '학교 시설물 안전점검',
    category: '시설안전',
    frequency: 'monthly',
    description: '교실, 복도, 운동장, 놀이시설 등 안전점검',
    relatedSystems: ['학교시설안전관리시스템'],
    tips: [
      '월 1회 자체점검 실시',
      '위험 요소 즉시 보수',
      '점검 일지 기록 유지'
    ]
  },
  {
    id: 'anjeon_005',
    departmentId: 'dept_004',
    taskName: '학교안전사고 처리',
    category: '사고대응',
    frequency: 'as_needed',
    description: '안전사고 발생 시 응급처치, 보고, 공제회 청구',
    relatedSystems: ['학교안전공제회'],
    tips: [
      '사고 발생 즉시 보고체계 가동',
      '사고조사보고서 작성',
      '공제급여 청구 안내'
    ],
    references: ['학교안전사고 예방 및 보상에 관한 법률']
  },
];

// 정보부 업무
export const jeongobuTasks: DepartmentTask[] = [
  {
    id: 'jeongbo_001',
    departmentId: 'dept_005',
    taskName: '정보화기기 관리',
    category: '정보화',
    frequency: 'daily',
    description: '컴퓨터, 태블릿, 프린터 등 기기 관리 및 수리',
    relatedSystems: [],
    tips: [
      '자산 관리 대장 작성',
      '고장 신고 접수 체계 운영',
      '연간 유지보수 계약 관리'
    ]
  },
  {
    id: 'jeongbo_002',
    departmentId: 'dept_005',
    taskName: '학교 홈페이지 관리',
    category: '정보화',
    frequency: 'weekly',
    description: '홈페이지 게시물 관리, 개인정보 점검, 접근성 관리',
    relatedSystems: ['학교 홈페이지 관리 시스템'],
    tips: [
      '개인정보 노출 점검 월 1회',
      '웹 접근성 준수',
      '주간 게시물 현행화'
    ]
  },
  {
    id: 'jeongbo_003',
    departmentId: 'dept_005',
    taskName: 'SW·AI 교육',
    category: '교육',
    frequency: 'weekly',
    description: '정보 교과 운영, 코딩 교육, AI 교육',
    relatedSystems: ['EBS 소프트웨어', '엔트리', '스크래치'],
    tips: [
      '2022 교육과정 정보 시수 확보',
      '컴퓨팅 사고력 중심 교육',
      '실습 환경 사전 점검'
    ]
  },
  {
    id: 'jeongbo_004',
    departmentId: 'dept_005',
    taskName: '개인정보보호 관리',
    category: '보안',
    frequency: 'monthly',
    description: '개인정보 취급자 교육, 점검, 파기 관리',
    relatedSystems: ['정보공개시스템', 'NEIS'],
    tips: [
      '연 1회 개인정보보호 교육 필수',
      '불필요 개인정보 즉시 파기',
      '개인정보 파일 대장 관리'
    ],
    references: ['개인정보보호법']
  },
  {
    id: 'jeongbo_005',
    departmentId: 'dept_005',
    taskName: '정보통신윤리교육',
    category: '교육',
    frequency: 'monthly',
    description: '사이버폭력 예방, 인터넷 중독 예방, 저작권 교육',
    relatedSystems: [],
    tips: [
      '학기당 2시간 이상',
      '게임·스마트폰 과의존 선별검사',
      '디지털 시민의식 함양'
    ]
  },
];

// 보건부 업무 (보건교사)
export const bogeunbuTasks: DepartmentTask[] = [
  {
    id: 'bogeun_001',
    departmentId: 'dept_016',
    taskName: '학생 건강검사',
    category: '건강관리',
    frequency: 'yearly',
    description: '신체발달상황검사, 건강검진 실시 및 결과 관리',
    relatedSystems: ['NEIS 건강기록부', '건강검진기관'],
    monthlySchedule: [4, 5],
    tips: [
      '1·4학년 건강검진 필수',
      '키·몸무게 전학년 측정',
      '검진 결과 학부모 통보'
    ],
    references: ['학교건강검사규칙']
  },
  {
    id: 'bogeun_002',
    departmentId: 'dept_016',
    taskName: '감염병 관리',
    category: '건강관리',
    frequency: 'daily',
    description: '감염병 발생 감시, 보고, 격리 조치, 방역',
    relatedSystems: ['학생건강관리시스템', '질병관리청'],
    tips: [
      '집단 발생 시 즉시 보고',
      '등교중지 기준 안내',
      '소독·환기 철저'
    ]
  },
  {
    id: 'bogeun_003',
    departmentId: 'dept_016',
    taskName: '응급처치',
    category: '응급',
    frequency: 'as_needed',
    description: '학생 부상·질병 시 응급처치, 119 연락, 학부모 통보',
    relatedSystems: [],
    tips: [
      '응급 연락 체계 숙지',
      '응급의약품 비치 관리',
      '응급처치 일지 기록'
    ]
  },
  {
    id: 'bogeun_004',
    departmentId: 'dept_016',
    taskName: '보건교육',
    category: '교육',
    frequency: 'weekly',
    description: '보건 교과 수업, 흡연예방, 성교육, 구강건강교육',
    relatedSystems: [],
    tips: [
      '보건교육 17시간 이상/년',
      '흡연예방교육 10시간 이상/년',
      '성교육 15시간 이상/년'
    ]
  },
  {
    id: 'bogeun_005',
    departmentId: 'dept_016',
    taskName: '건강기록부 관리',
    category: '기록',
    frequency: 'as_needed',
    description: '건강기록부 작성, 전출입생 자료 관리',
    relatedSystems: ['NEIS 건강기록부'],
    tips: [
      '신체검사 결과 즉시 입력',
      '비만 학생 관리',
      '알레르기 학생 파악'
    ]
  },
];

// 급식부 업무 (영양교사)
export const geubsikbuTasks: DepartmentTask[] = [
  {
    id: 'geubsik_001',
    departmentId: 'dept_017',
    taskName: '식단 작성',
    category: '급식운영',
    frequency: 'monthly',
    description: '영양 균형 식단 작성, 알레르기 표시, 식재료 선정',
    relatedSystems: ['학교급식 식재료관리시스템', '급식관리시스템'],
    tips: [
      '영양기준량 충족',
      '알레르기 유발식품 18종 표시',
      '제철 식재료 활용'
    ]
  },
  {
    id: 'geubsik_002',
    departmentId: 'dept_017',
    taskName: '위생·안전 관리',
    category: '위생',
    frequency: 'daily',
    description: '조리실 위생점검, HACCP 관리, 급식종사자 위생교육',
    relatedSystems: ['HACCP'],
    tips: [
      '검수 철저',
      '조리 후 2시간 이내 배식',
      '보존식 144시간 보관'
    ],
    references: ['학교급식법']
  },
  {
    id: 'geubsik_003',
    departmentId: 'dept_017',
    taskName: '영양교육',
    category: '교육',
    frequency: 'monthly',
    description: '학생 영양교육, 편식 지도, 식생활교육',
    relatedSystems: [],
    tips: [
      '학년별 눈높이 교육',
      '급식 잔반 줄이기 캠페인',
      '지역 농산물 교육'
    ]
  },
  {
    id: 'geubsik_004',
    departmentId: 'dept_017',
    taskName: '급식비 관리',
    category: '행정',
    frequency: 'monthly',
    description: '급식비 수납, 면제·감면 처리, 예산 관리',
    relatedSystems: ['학교급식비관리시스템', 'K-에듀파인'],
    tips: [
      '무상급식 대상 확인',
      '미납금 관리',
      '예산 적정 집행'
    ]
  },
];

// 전체 업무 목록
export const allDepartmentTasks = [
  ...gyomubuTasks,
  ...yeongububTasks,
  ...saenghwalbuTasks,
  ...anjeonbuTasks,
  ...jeongobuTasks,
  ...bogeunbuTasks,
  ...geubsikbuTasks,
];

// 부서별로 그룹화
export const tasksByDepartment = {
  dept_001: gyomubuTasks,
  dept_002: yeongububTasks,
  dept_003: saenghwalbuTasks,
  dept_004: anjeonbuTasks,
  dept_005: jeongobuTasks,
  dept_016: bogeunbuTasks,
  dept_017: geubsikbuTasks,
};

// 월별 업무 조회
export function getTasksByMonth(month: number): DepartmentTask[] {
  return allDepartmentTasks.filter(
    task => task.monthlySchedule?.includes(month)
  );
}

// 빈도별 업무 조회
export function getTasksByFrequency(frequency: DepartmentTask['frequency']): DepartmentTask[] {
  return allDepartmentTasks.filter(task => task.frequency === frequency);
}
