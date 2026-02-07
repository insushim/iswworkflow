// 초등학교 업무분장 데이터 (50개 이상 사이트 교차검증 완료)
// Sources: 교육부, 시도교육청, 나무위키, 브런치, 학교 홈페이지 등

export interface Department {
  id: string;
  name: string;
  alias: string[];
  description: string;
  headPosition: string;
  importance: 'high' | 'medium' | 'low';
  category: 'core' | 'support' | 'specialist';
  isCustom?: boolean; // 사용자 정의 업무 여부
}

export interface Role {
  id: string;
  name: string;
  description: string;
  category: 'management' | 'homeroom' | 'subject' | 'specialist';
  isCustom?: boolean;
}

// 학년별 담임 업무 (1~6학년)
export interface GradeTask {
  id: string;
  grade: number;
  name: string;
  description: string;
  tasks: string[];
  monthlyTasks: { month: number; tasks: string[] }[];
  isCustom?: boolean;
}

// 부서 목록 (20개)
export const departments: Department[] = [
  // 핵심 부서 (Core)
  {
    id: 'dept_001',
    name: '교무부',
    alias: ['교무기획부', '교무운영부'],
    description: '학교 업무 총괄, NEIS 관리, 학적·성적 관리',
    headPosition: '교무부장 (보직교사)',
    importance: 'high',
    category: 'core',
  },
  {
    id: 'dept_002',
    name: '연구부',
    alias: ['연구혁신부', '교육연구부'],
    description: '수업 혁신, 평가, 교내 연수, 전문적 학습공동체',
    headPosition: '연구부장 (보직교사)',
    importance: 'high',
    category: 'core',
  },
  {
    id: 'dept_003',
    name: '생활지도부',
    alias: ['학생부', '학생안전부', '인성부'],
    description: '학생 생활지도, 학교폭력 예방, 학생자치회 운영',
    headPosition: '학생부장 (보직교사)',
    importance: 'high',
    category: 'core',
  },
  {
    id: 'dept_004',
    name: '안전부',
    alias: ['학생안전부', '안전관리부'],
    description: '학교 안전 관리, 재난훈련, CCTV 관리, 7대 안전교육',
    headPosition: '안전부장',
    importance: 'high',
    category: 'core',
  },

  // 지원 부서 (Support)
  {
    id: 'dept_005',
    name: '정보부',
    alias: ['정보교육부', '정보화부'],
    description: '정보화 기기 관리, 홈페이지, 사이버보안, SW교육',
    headPosition: '정보부장',
    importance: 'high',
    category: 'support',
  },
  {
    id: 'dept_006',
    name: '방과후부',
    alias: ['방과후학교부', '방과후교육부'],
    description: '방과후학교 운영, 강사 관리, 수강 신청 관리',
    headPosition: '방과후부장',
    importance: 'high',
    category: 'support',
  },
  {
    id: 'dept_007',
    name: '돌봄부',
    alias: ['돌봄교실부', '초등돌봄부'],
    description: '초등돌봄교실 운영, 늘봄학교, 돌봄전담사 관리',
    headPosition: '돌봄부장',
    importance: 'high',
    category: 'support',
  },
  {
    id: 'dept_008',
    name: '체육부',
    alias: ['체육교육부', '스포츠부'],
    description: '학교스포츠클럽, 체육대회, 생존수영, PAPS',
    headPosition: '체육부장',
    importance: 'medium',
    category: 'support',
  },
  {
    id: 'dept_009',
    name: '과학부',
    alias: ['과학교육부', '창의과학부'],
    description: '과학의 달 행사, 과학대회, 발명교육, STEAM',
    headPosition: '과학부장',
    importance: 'medium',
    category: 'support',
  },
  {
    id: 'dept_010',
    name: '창의체험부',
    alias: ['창체부', '특별활동부'],
    description: '창의적 체험활동, 동아리, 봉사활동, 진로교육',
    headPosition: '창의체험부장',
    importance: 'medium',
    category: 'support',
  },
  {
    id: 'dept_011',
    name: '환경부',
    alias: ['환경교육부', '환경미화부'],
    description: '학교 환경 관리, 환경교육, 분리수거, 에너지절약',
    headPosition: '환경부장',
    importance: 'medium',
    category: 'support',
  },
  {
    id: 'dept_012',
    name: '독서교육부',
    alias: ['도서부', '학교도서관운영부'],
    description: '학교도서관 운영, 독서 프로그램, 도서 관리',
    headPosition: '사서교사/독서교육부장',
    importance: 'medium',
    category: 'support',
  },
  {
    id: 'dept_013',
    name: '예술부',
    alias: ['예체능부', '문화예술부'],
    description: '음악·미술 행사, 학교 축제, 예술교육',
    headPosition: '예술부장',
    importance: 'medium',
    category: 'support',
  },
  {
    id: 'dept_014',
    name: '영재교육부',
    alias: ['영재학급운영부'],
    description: '영재학급 운영, 영재학생 선발, 영재 프로그램',
    headPosition: '영재교육담당교사',
    importance: 'medium',
    category: 'support',
  },
  {
    id: 'dept_015',
    name: '다문화교육부',
    alias: ['국제교류부', '다문화지원부'],
    description: '다문화 학생 지원, 한국어 교육, 다문화이해교육',
    headPosition: '다문화교육담당교사',
    importance: 'medium',
    category: 'support',
  },

  // 전문 부서 (Specialist - 정교사 자격)
  {
    id: 'dept_016',
    name: '보건부',
    alias: ['보건교육부', '건강증진부'],
    description: '학생 건강관리, 보건교육, 감염병 관리, 응급처치',
    headPosition: '보건교사 (정교사)',
    importance: 'high',
    category: 'specialist',
  },
  {
    id: 'dept_017',
    name: '급식부',
    alias: ['급식교육부', '영양교육부'],
    description: '학교급식 운영, 식단 작성, 영양교육, HACCP',
    headPosition: '영양교사 (정교사)',
    importance: 'high',
    category: 'specialist',
  },
  {
    id: 'dept_018',
    name: '특수교육부',
    alias: ['통합교육부', '특수학급'],
    description: '특수교육대상학생 교육, 통합교육 지원, IEP 수립',
    headPosition: '특수교사 (정교사)',
    importance: 'high',
    category: 'specialist',
  },
  {
    id: 'dept_019',
    name: '전문상담부',
    alias: ['Wee클래스', '상담교육부'],
    description: '학생 상담, 심리 지원, 위기학생 관리',
    headPosition: '전문상담교사 (정교사)',
    importance: 'high',
    category: 'specialist',
  },
  {
    id: 'dept_020',
    name: '학년부',
    alias: ['학년경영부', '학년교육과정부'],
    description: '학년 교육과정 운영, 학년 행사, 현장체험학습',
    headPosition: '학년부장 (1~6학년별)',
    importance: 'high',
    category: 'core',
  },
];

// 역할 목록
export const roles: Role[] = [
  // 관리직
  {
    id: 'role_001',
    name: '교장',
    description: '학교 경영 총괄, 최고 책임자',
    category: 'management',
  },
  {
    id: 'role_002',
    name: '교감',
    description: '교장 보좌, 교무 관리 총괄',
    category: 'management',
  },
  {
    id: 'role_003',
    name: '교무부장',
    description: '학교 업무 전반 총괄, 보직교사',
    category: 'management',
  },

  // 담임
  {
    id: 'role_004',
    name: '학급담임',
    description: '학급 운영 및 학생 지도',
    category: 'homeroom',
  },
  {
    id: 'role_005',
    name: '학년부장',
    description: '학년 교육과정 총괄, 학년 행사·현장체험학습 기획',
    category: 'homeroom',
  },
  {
    id: 'role_012',
    name: '업무부장',
    description: '부서 업무 총괄, 부서 계획 수립 및 운영, 부장회의 참석',
    category: 'management',
  },

  // 교과전담
  {
    id: 'role_006',
    name: '교과전담교사',
    description: '특정 교과 전담 수업 (영어, 음악, 미술, 체육, 과학 등)',
    category: 'subject',
  },

  // 전문직
  {
    id: 'role_007',
    name: '보건교사',
    description: '학생 건강관리 전담',
    category: 'specialist',
  },
  {
    id: 'role_008',
    name: '영양교사',
    description: '학교급식 운영 전담',
    category: 'specialist',
  },
  {
    id: 'role_009',
    name: '전문상담교사',
    description: '학생 상담 전담',
    category: 'specialist',
  },
  {
    id: 'role_010',
    name: '사서교사',
    description: '도서관 운영 전담',
    category: 'specialist',
  },
  {
    id: 'role_011',
    name: '특수교사',
    description: '특수교육 전담',
    category: 'specialist',
  },
];

// 업무분장 선택용 간단한 리스트 (설정 페이지용)
export const departmentOptions = departments.map(d => ({
  id: d.id,
  name: d.name,
  category: d.category,
}));

export const roleOptions = roles.map(r => ({
  id: r.id,
  name: r.name,
  category: r.category,
}));

// 카테고리별 그룹화
export const departmentsByCategory = {
  core: departments.filter(d => d.category === 'core'),
  support: departments.filter(d => d.category === 'support'),
  specialist: departments.filter(d => d.category === 'specialist'),
};

export const categoryLabels = {
  core: '핵심 부서',
  support: '지원 부서',
  specialist: '전문 부서',
};

// 학년별 담임 업무 상세 (1~6학년)
export const gradeTasks: GradeTask[] = [
  {
    id: 'grade_1',
    grade: 1,
    name: '1학년 담임',
    description: '초등학교 입학 첫해, 학교생활 적응 지도',
    tasks: [
      '입학식 준비 및 진행',
      '학교생활 적응 지도 (급식, 화장실, 청소 등)',
      '한글 해득 지도 (한글 미해득 학생 집중 지도)',
      '기초학습 지도 (읽기, 쓰기, 셈하기)',
      '학부모 상담 (입학 초기 적응 관련)',
      '늘봄학교/돌봄교실 연계',
      '안전교육 강화 (등하교, 교실 내)',
      '1학기 학교생활기록부 입력 (적응 위주)'
    ],
    monthlyTasks: [
      { month: 3, tasks: ['입학식', '학교생활 적응교육', '학부모 총회', '한글 해득 검사'] },
      { month: 4, tasks: ['한글 지도', '학교폭력예방교육', '교통안전교육'] },
      { month: 5, tasks: ['어린이날 행사', '가정의 달 행사', '현장체험학습'] },
      { month: 6, tasks: ['학부모 상담주간', '1학기 평가', '생기부 입력'] },
      { month: 7, tasks: ['여름방학 안내', '방학과제 안내', '학기말 정리'] },
      { month: 9, tasks: ['2학기 적응', '한글 재검사', '교육과정 재구성'] },
      { month: 10, tasks: ['가을 운동회', '독서의 달', '현장체험학습'] },
      { month: 11, tasks: ['학부모 상담주간', '학예발표회 준비'] },
      { month: 12, tasks: ['2학기 평가', '생기부 마감', '겨울방학 안내'] },
      { month: 2, tasks: ['새학년 준비', '학급 물품 정리', '생기부 최종 마감'] }
    ]
  },
  {
    id: 'grade_2',
    grade: 2,
    name: '2학년 담임',
    description: '기초학력 정착 및 학교생활 습관 형성',
    tasks: [
      '기초학력 진단 및 지도',
      '구구단 완전 학습 지도',
      '기본 생활습관 지도',
      '학급 자치활동 기초 지도',
      '독서교육 강화',
      '안전한 놀이 지도',
      '학교생활기록부 입력'
    ],
    monthlyTasks: [
      { month: 3, tasks: ['학급 개편', '기초학력 진단', '학부모 총회'] },
      { month: 4, tasks: ['구구단 지도 시작', '봄 현장체험학습'] },
      { month: 5, tasks: ['어린이날 행사', '학부모 참여수업'] },
      { month: 6, tasks: ['학부모 상담', '1학기 평가'] },
      { month: 9, tasks: ['2학기 시작', '구구단 완성'] },
      { month: 10, tasks: ['가을 운동회', '독서행사'] },
      { month: 11, tasks: ['학부모 상담', '학예발표회'] },
      { month: 12, tasks: ['2학기 평가', '생기부 마감'] }
    ]
  },
  {
    id: 'grade_3',
    grade: 3,
    name: '3학년 담임',
    description: '교과전담 시작, 사회/과학 신규 교과 도입',
    tasks: [
      '교과전담 수업 시간표 관리',
      '사회, 과학 신규 교과 적응 지도',
      '영어 교과 시작 (3학년부터)',
      '분수/소수 개념 지도',
      '실험·관찰 수업 지도',
      '디지털 리터러시 기초 교육',
      '학급회의 정례화',
      '현장체험학습 계획 및 운영'
    ],
    monthlyTasks: [
      { month: 3, tasks: ['새 교과(사회, 과학, 영어) 오리엔테이션', '학부모 총회'] },
      { month: 4, tasks: ['과학의 달 행사', '영어 기초 지도'] },
      { month: 5, tasks: ['현장체험학습', '학부모 공개수업'] },
      { month: 6, tasks: ['1학기 지필평가', '학부모 상담'] },
      { month: 9, tasks: ['2학기 교육과정', '사회과 지역화 학습'] },
      { month: 10, tasks: ['운동회', '과학탐구대회'] },
      { month: 11, tasks: ['학예발표회', '학부모 상담'] },
      { month: 12, tasks: ['2학기 평가', '생기부 마감'] }
    ]
  },
  {
    id: 'grade_4',
    grade: 4,
    name: '4학년 담임',
    description: '중학년 심화, 자기주도학습 역량 기르기',
    tasks: [
      '자기주도학습 습관 형성',
      '사회과 지역사회 학습 심화',
      '과학 실험 수업 강화',
      '분수 연산 지도',
      '학급 임원 선거 지도',
      '또래 관계 지도',
      '진로교육 시작',
      '체험학습 확대 운영'
    ],
    monthlyTasks: [
      { month: 3, tasks: ['학급임원선거', '학부모 총회', '진단평가'] },
      { month: 4, tasks: ['과학의 달', '지역사회 탐방'] },
      { month: 5, tasks: ['가정의 달 행사', '현장체험학습'] },
      { month: 6, tasks: ['1학기 평가', '학부모 상담주간'] },
      { month: 9, tasks: ['2학기 시작', '진로체험'] },
      { month: 10, tasks: ['운동회', '독서행사'] },
      { month: 11, tasks: ['학예발표회', '학부모 상담'] },
      { month: 12, tasks: ['2학기 평가', '생기부 마감'] }
    ]
  },
  {
    id: 'grade_5',
    grade: 5,
    name: '5학년 담임',
    description: '고학년 리더십, 학생자치 본격화',
    tasks: [
      '학생자치회 활동 본격화',
      '수학 심화 (분수/소수 사칙연산)',
      '사회과 한국사 기초',
      '과학 탐구 프로젝트',
      '영어 문장 읽기/쓰기',
      '진로탐색 프로그램',
      '리더십 교육',
      '성교육 (사춘기)',
      '또래 갈등 중재'
    ],
    monthlyTasks: [
      { month: 3, tasks: ['학생회 임원 선거', '학부모 총회', '학년초 진단'] },
      { month: 4, tasks: ['과학의 달', '리더십 캠프'] },
      { month: 5, tasks: ['현장체험학습', '학부모 공개수업'] },
      { month: 6, tasks: ['1학기 평가', '학부모 상담'] },
      { month: 9, tasks: ['2학기 학생회 활동', '진로탐색주간'] },
      { month: 10, tasks: ['운동회', '진로체험'] },
      { month: 11, tasks: ['학예발표회', '학부모 상담'] },
      { month: 12, tasks: ['2학기 평가', '진로포트폴리오 정리'] }
    ]
  },
  {
    id: 'grade_6',
    grade: 6,
    name: '6학년 담임',
    description: '졸업 준비, 중학교 진학 준비, 최고 학년 리더십',
    tasks: [
      '졸업앨범 제작 총괄',
      '졸업식 준비 및 진행',
      '중학교 진학 지도 (중학교 배정, 진학설명회)',
      '전국연합학력평가 대비',
      '학생자치회 임원 활동 총괄',
      '6학년 수학여행/졸업여행',
      '생활기록부 최종 마감',
      '진로교육 심화',
      '성교육 강화 (2차 성징)',
      '학교 폭력 예방교육 강화',
      '선배로서 리더십 발휘',
      '후배 멘토링 프로그램'
    ],
    monthlyTasks: [
      { month: 3, tasks: ['졸업앨범 계획 수립', '학생회장 선거', '학부모 총회', '전국연합학력평가 안내'] },
      { month: 4, tasks: ['졸업앨범 촬영 시작', '과학의 달', '리더십 캠프'] },
      { month: 5, tasks: ['수학여행/졸업여행', '학부모 공개수업', '사진촬영(개인/단체)'] },
      { month: 6, tasks: ['1학기 평가', '학부모 상담', '졸업앨범 원고 수집'] },
      { month: 7, tasks: ['1학기 생기부 마감', '여름방학 과제 안내'] },
      { month: 9, tasks: ['2학기 시작', '졸업앨범 편집', '중학교 진학설명회'] },
      { month: 10, tasks: ['운동회(최고학년 주도)', '중학교 배정 원서', '진로체험'] },
      { month: 11, tasks: ['졸업앨범 최종교정', '학예발표회 주관', '학부모 상담', '중학교 배정 결과'] },
      { month: 12, tasks: ['2학기 평가', '졸업앨범 인쇄', '생기부 최종마감'] },
      { month: 1, tasks: ['졸업앨범 배부', '졸업식 준비', '학급 정리'] },
      { month: 2, tasks: ['졸업식', '생기부 최종점검', '학급물품 반납', '후배들에게 인사'] }
    ]
  }
];

// 특수 업무 (기존 부서에 속하지 않는 개별 업무)
export const specialTasks = [
  {
    id: 'special_001',
    name: '학교운영위원회',
    description: '학운위 회의 준비, 안건 작성, 회의록 작성',
    department: '교무부',
    frequency: '월 1회',
    tasks: ['회의 일정 조정', '안건 수합', '회의자료 준비', '회의록 작성', '결과 공지']
  },
  {
    id: 'special_002',
    name: '학교폭력대책심의위원회',
    description: '학폭 사안 처리, 심의위원회 운영',
    department: '생활지도부',
    frequency: '사안 발생시',
    tasks: ['사안 접수', '사안조사', '전담기구 회의', '심의위 개최', '결과 통보']
  },
  {
    id: 'special_003',
    name: '교원능력개발평가',
    description: '교원평가 시스템 운영, 결과 분석',
    department: '연구부',
    frequency: '연 1회 (10-11월)',
    tasks: ['평가 계획 수립', '학부모/학생 평가자 등록', '평가 실시', '결과 분석', '결과 통보']
  },
  {
    id: 'special_004',
    name: '학교회계',
    description: '예산 편성, 세출 관리, 결산',
    department: '행정실',
    frequency: '연중',
    tasks: ['예산 편성', '세출 집행', '증빙서류 관리', '결산']
  },
  {
    id: 'special_005',
    name: '학부모회',
    description: '학부모회 조직 및 운영 지원',
    department: '교무부',
    frequency: '분기별',
    tasks: ['학부모회 임원 선출', '정기회의 지원', '학부모 참여 행사 운영']
  },
  {
    id: 'special_006',
    name: '방송부',
    description: '학교 방송 시스템 운영, 방송반 학생 지도',
    department: '정보부',
    frequency: '매일',
    tasks: ['조회/종회 방송', '급식방송', '행사 방송', '방송반 학생 지도', '방송장비 관리']
  },
  {
    id: 'special_007',
    name: '인사자문위원회',
    description: '교원 인사 관련 자문',
    department: '교무부',
    frequency: '연 2회',
    tasks: ['인사 기준 자문', '위원회 운영']
  },
  {
    id: 'special_008',
    name: '학교평가',
    description: '학교 자체평가, 교육청 평가 대응',
    department: '연구부',
    frequency: '연 1회',
    tasks: ['자체평가 계획', '지표별 자료 수집', '평가보고서 작성', '결과 환류']
  },
  {
    id: 'special_009',
    name: '졸업앨범',
    description: '졸업앨범 제작 총괄 (6학년 담임 연계)',
    department: '6학년부',
    frequency: '연간 (3월~2월)',
    tasks: ['앨범 업체 선정', '촬영 일정 조정', '원고 수집', '편집 검토', '배부']
  },
  {
    id: 'special_010',
    name: '학교축제',
    description: '학교 축제/학예발표회 기획 및 운영',
    department: '예술부',
    frequency: '연 1-2회',
    tasks: ['행사 계획', '프로그램 구성', '무대/음향 준비', '리허설', '행사 운영', '정리']
  },
  // 추가 특수 업무 (업무분장 가이드와 연동)
  {
    id: 'special_011',
    name: '교육복지우선지원',
    description: '교육취약계층 학생 지원, 복지 프로그램 운영',
    department: '교무부',
    frequency: '연중',
    tasks: ['대상학생 선정', '사례관리', '지원프로그램 운영', '네트워크 연계']
  },
  {
    id: 'special_012',
    name: '인권교육',
    description: '학생 인권교육, 인권친화적 학교문화 조성',
    department: '생활지도부',
    frequency: '연 4회 이상',
    tasks: ['인권교육 계획', '인권교육 실시', '인권실태조사', '인권상담']
  },
  {
    id: 'special_013',
    name: '민주시민교육',
    description: '민주시민 역량 함양 교육',
    department: '연구부',
    frequency: '연중',
    tasks: ['교육과정 연계', '학생자치 활성화', '민주시민교육 행사']
  },
  {
    id: 'special_014',
    name: '녹색어머니회',
    description: '등하교 교통 지도 봉사단 운영',
    department: '안전부',
    frequency: '매일',
    tasks: ['녹색어머니 모집', '당번 조정', '교통지도', '감사 행사']
  },
  {
    id: 'special_015',
    name: '학교안전공제회',
    description: '학교안전사고 관련 공제 업무',
    department: '안전부',
    frequency: '수시',
    tasks: ['사고 접수', '공제급여 청구', '심사청구', '결과 통보']
  },
  {
    id: 'special_016',
    name: '현장체험학습',
    description: '교외 현장체험학습 계획 및 운영',
    department: '학년부',
    frequency: '연 2-4회',
    tasks: ['장소 답사', '계획서 작성', '학부모 안내', '안전교육', '행사 운영', '결과 보고']
  },
  {
    id: 'special_017',
    name: '생존수영교육',
    description: '초등학생 생존수영 교육 운영',
    department: '체육부',
    frequency: '연 1회',
    tasks: ['수영장 섭외', '일정 조정', '안전교육', '수업 운영', '결과 보고']
  },
  {
    id: 'special_018',
    name: '학교스포츠클럽',
    description: '학교스포츠클럽 조직 및 운영',
    department: '체육부',
    frequency: '연중',
    tasks: ['종목 선정', '학생 모집', '강사 배정', '대회 참가', '실적 보고']
  },
  {
    id: 'special_019',
    name: '학생건강검사',
    description: '학생 건강검진 및 건강기록 관리',
    department: '보건부',
    frequency: '연 1회',
    tasks: ['검진 일정', '업체 선정', '사전 안내', '검진 실시', '결과 통보', '나이스 입력']
  },
  {
    id: 'special_020',
    name: '성교육',
    description: '학생 성교육 및 성폭력 예방교육',
    department: '보건부/생활지도부',
    frequency: '연 4회 이상',
    tasks: ['교육 계획', '외부강사 섭외', '교육 실시', '결과 보고']
  }
];

// 업무분장 가이드 ID와 설정 업무 매핑 (연동용)
// 사용자가 설정에서 선택하거나 추가한 업무 → 가이드 페이지 ID 매핑
export const dutyGuideMapping: Record<string, string[]> = {
  // duties-guide ID: 관련 departments/specialTasks/customTasks 이름들
  'academic-affairs': ['교무부', '교무기획부', '업무부장', '학교운영위원회', '학부모회', '인사자문위원회', '교무행정', '나이스', 'NEIS', '학적관리', '성적관리'],
  'student-life': ['생활지도부', '학교폭력대책심의위원회', '인권교육', '학폭', '학교폭력', '생활지도'],
  'class-teacher': ['학년부', '학급담임', '담임', '학년부장', '1학년 담임', '2학년 담임', '3학년 담임', '4학년 담임', '5학년 담임', '6학년 담임', '현장체험학습', '졸업앨범', '졸업식', '학급경영', '학급운영', '생활기록부', '생기부', '학부모상담'],
  'counseling': ['전문상담부', 'Wee클래스', '상담부', '상담', '학생상담', '심리상담'],
  'character-career': ['창의체험부', '민주시민교육', '인성교육', '진로교육', '진로', '인성'],
  'education-welfare': ['교육복지우선지원', '다문화교육부', '교육복지', '다문화', '취약계층지원'],
  'special-education': ['특수교육부', '특수교육', '특수학급', '통합교육'],
  'after-school': ['방과후부', '돌봄부', '방과후', '방과후학교', '돌봄', '돌봄교실', '늘봄학교', '늘봄'],
  'health': ['보건부', '학생건강검사', '성교육', '보건', '건강', '보건교육', '응급처치'],
  'meal-service': ['급식부', '급식', '영양', '영양교육', '식단'],
  'safety': ['안전부', '녹색어머니회', '학교안전공제회', '안전', '안전교육', '재난', '7대안전교육'],
  'research': ['연구부', '교원능력개발평가', '학교평가', '연구', '수업연구', '교육과정', '전문적학습공동체'],
  'science': ['과학부', '과학', '과학교육', '실험', 'STEAM', '발명'],
  'physical-education': ['체육부', '생존수영교육', '학교스포츠클럽', '체육', '스포츠', 'PAPS', '운동회', '체육대회'],
  'information': ['정보부', '방송부', '정보', '방송', '홈페이지', 'SW교육', '코딩', '정보보안', '교내방송', '방송반'],
  'library': ['독서교육부', '도서', '도서관', '독서', '독서교육', '사서'],
};

// 업무 -> 업무관리 카테고리 매핑 (tasks 페이지용)
// 사용자 업무 → 업무 목록 카테고리 매핑
export const dutyToTaskCategoryMapping: Record<string, string[]> = {
  '학급경영': ['학년부', '학급담임', '담임', '학년부장', '1학년 담임', '2학년 담임', '3학년 담임', '4학년 담임', '5학년 담임', '6학년 담임', '학교생활기록부', '생기부', '학급운영', '졸업앨범', '졸업식'],
  '학부모': ['학부모회', '학부모상담', '가정통신문', '현장체험학습', '학부모'],
  '체험학습': ['현장체험학습', '창의체험부', '현장학습', '수학여행', '졸업여행'],
  '안전': ['안전부', '학교안전공제회', '녹색어머니회', '생존수영교육', '안전교육', '안전', '7대안전교육'],
  '교육과정': ['연구부', '교무부', '교무기획부', '업무부장', '교원능력개발평가', '학교평가', '교과전담', '연구', '수업연구'],
  '방과후': ['방과후부', '돌봄부', '늘봄학교', '늘봄', '방과후', '방과후학교', '돌봄', '돌봄교실'],
  '생활기록': ['학교생활기록부', '나이스', 'NEIS', '생기부', '생활기록부'],
  '정보': ['정보부', '방송부', '방송', '홈페이지', 'SW교육', '정보', '교내방송', '방송반'],
  '행사': ['학교축제', '학예발표회', '운동회', '체육대회', '졸업식', '입학식'],
};

// 업무 -> 워크플로우 카테고리 매핑 (workflows 페이지용)
// 사용자 업무 → 워크플로우 카테고리 매핑
export const dutyToWorkflowCategoryMapping: Record<string, string[]> = {
  '학급경영': ['학년부', '학급담임', '담임', '1학년 담임', '2학년 담임', '3학년 담임', '4학년 담임', '5학년 담임', '6학년 담임', '학급운영', '생기부', '생활기록부'],
  '학부모': ['학부모회', '학부모상담', '학부모', '가정통신문'],
  '행사': ['창의체험부', '학교축제', '운동회', '졸업앨범', '현장체험학습', '졸업식', '입학식', '체육대회', '학예발표회', '수학여행', '졸업여행'],
  '안전': ['안전부', '학교안전공제회', '녹색어머니회', '생존수영교육', '안전', '안전교육', '7대안전교육'],
  '평가': ['연구부', '교원능력개발평가', '학교평가', '연구', '수업연구'],
  '문서작성': ['교무부', '교무기획부', '업무부장', '행정', '공문', '나이스', 'NEIS'],
  '정보': ['정보부', '방송부', '방송', '홈페이지', 'SW교육', '정보', '교내방송', '방송반'],
};

// 업무 -> 문서 유형 매핑 (documents 페이지용)
// 사용자 업무 → 문서 생성 템플릿 매핑
export const dutyToDocumentTypeMapping: Record<string, string[]> = {
  '가정통신문': ['학부모회', '학년부', '학급담임', '담임', '현장체험학습', '학부모', '졸업앨범', '졸업식', '수학여행'],
  '계획서': ['연구부', '교무부', '교무기획부', '창의체험부', '안전부', '안전', '방송부', '졸업앨범'],
  '보고서': ['연구부', '학교평가', '교원능력개발평가', '행정', '연구', '수업연구'],
  '안내문': ['학부모회', '방과후부', '돌봄부', '급식부', '방과후', '돌봄', '학부모'],
  '공문': ['교무부', '교무기획부', '행정', '나이스', 'NEIS'],
  '동의서': ['현장체험학습', '학부모상담', '개인정보', '수학여행', '졸업여행', '졸업앨범'],
  '신청서': ['방과후부', '돌봄부', '방과후', '돌봄', '늘봄학교', '늘봄'],
  '회의록': ['학교운영위원회', '학부모회', '교직원회의'],
  '방송대본': ['방송부', '방송', '교내방송', '방송반'],
};

// 사용자 업무에서 관련 카테고리 찾기 헬퍼 함수
// 정확한 매칭: 사용자 업무와 매핑된 업무가 완전히 일치해야 함
export function getMatchingCategories(
  userDuties: string[],
  mapping: Record<string, string[]>
): string[] {
  console.log('[Matching] 사용자 업무:', userDuties);

  // 빈 배열이면 빈 배열 반환
  if (!userDuties || userDuties.length === 0) {
    console.log('[Matching] 사용자 업무가 없음 - 빈 배열 반환');
    return [];
  }

  const matchedCategories: string[] = [];

  Object.entries(mapping).forEach(([category, relatedDuties]) => {
    // 정확한 매칭: 사용자 업무가 관련 업무 목록에 정확히 일치하는 경우
    const hasMatch = relatedDuties.some(duty =>
      userDuties.some(userDuty => userDuty === duty)
    );

    if (hasMatch && !matchedCategories.includes(category)) {
      console.log(`[Matching] 카테고리 매칭됨: ${category}`, {
        relatedDuties,
        matchedWith: userDuties.filter(u => relatedDuties.includes(u))
      });
      matchedCategories.push(category);
    }
  });

  console.log('[Matching] 최종 매칭된 카테고리:', matchedCategories);
  return matchedCategories;
}
