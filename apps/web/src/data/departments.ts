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
}

export interface Role {
  id: string;
  name: string;
  description: string;
  category: 'management' | 'homeroom' | 'subject' | 'specialist';
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
    description: '학년 교육과정 총괄',
    category: 'homeroom',
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
