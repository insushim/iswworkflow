// 커뮤니티 교육 자료 데이터베이스
// 교사 커뮤니티 인기 자료 기반

export interface CommunityResource {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  category: string;
  type: 'document' | 'template' | 'presentation' | 'image' | 'guide' | 'video';
  viewCount: number;
  likeCount: number;
  commentCount: number;
  downloadCount: number;
  publishedAt: string;
  author: string;
  tags: string[];
  isBookmarked: boolean;
  month?: number; // 관련 월
  grade?: number[]; // 관련 학년
}

export const resourceSources = ['전체', '인디스쿨', '아이스크림', '에듀넷', '티처빌', '참쌤스쿨', '쌤동네', '클래스팅', '학교가자닷컴'];
export const resourceCategories = ['전체', '학급 운영', '학부모', '교실 환경', '수업 자료', '생활지도', '행사', '안전교육', '평가', '교육과정', '특별활동', '창체'];

export const communityResourcesDatabase: CommunityResource[] = [
  // ========== 학급 운영 ==========
  {
    id: 'res-001',
    title: '3월 학급경영 꿀팁 모음 (경력 10년차 교사)',
    description: '신학기 첫 주부터 3월 한 달간 학급경영에 필요한 모든 팁을 정리했습니다. 학급규칙 정하기, 모둠 구성, 역할 분담 등 상세 가이드.',
    source: '인디스쿨',
    sourceUrl: 'https://indischool.com',
    category: '학급 운영',
    type: 'guide',
    viewCount: 15230,
    likeCount: 2450,
    commentCount: 320,
    downloadCount: 1890,
    publishedAt: '2시간 전',
    author: '초롱쌤',
    tags: ['신학기', '학급경영', '3월', '학급규칙'],
    isBookmarked: false,
    month: 3,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-002',
    title: '3월 주간학습안내 양식 무료 공유',
    description: '깔끔하고 예쁜 주간학습안내 양식입니다. 한글/PDF 버전 모두 제공. 학년별 맞춤형.',
    source: '티처빌',
    sourceUrl: 'https://teacherville.co.kr',
    category: '학급 운영',
    type: 'template',
    viewCount: 7560,
    likeCount: 980,
    commentCount: 120,
    downloadCount: 3450,
    publishedAt: '1일 전',
    author: '꿈나무쌤',
    tags: ['주간학습', '가정통신문', '양식'],
    isBookmarked: false,
    month: 3,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-003',
    title: '학급 1인1역 역할 카드 템플릿',
    description: '학급 역할 분담용 1인1역 카드입니다. 다양한 역할 50종+ 포함. 편집 가능한 PPT 파일.',
    source: '참쌤스쿨',
    sourceUrl: 'https://chamssaem.com',
    category: '학급 운영',
    type: 'template',
    viewCount: 8920,
    likeCount: 1560,
    commentCount: 89,
    downloadCount: 4230,
    publishedAt: '3일 전',
    author: '열정쌤',
    tags: ['1인1역', '역할분담', '학급경영'],
    isBookmarked: false,
    month: 3,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-004',
    title: '학급회의 진행 가이드 & 회의록 양식',
    description: '학급자치활동을 위한 학급회의 진행 방법과 회의록 양식입니다. 민주적 의사결정 지도 포함.',
    source: '에듀넷',
    sourceUrl: 'https://edunet.net',
    category: '학급 운영',
    type: 'guide',
    viewCount: 5670,
    likeCount: 890,
    commentCount: 56,
    downloadCount: 2340,
    publishedAt: '5일 전',
    author: '민주쌤',
    tags: ['학급회의', '자치활동', '회의록'],
    isBookmarked: false,
    grade: [3, 4, 5, 6],
  },
  {
    id: 'res-005',
    title: '칭찬스티커 & 보상 시스템 운영 자료',
    description: '효과적인 긍정적 행동지원(PBS)을 위한 칭찬스티커 시스템. 스티커판, 보상카드, 운영지침 포함.',
    source: '아이스크림',
    sourceUrl: 'https://i-scream.co.kr',
    category: '학급 운영',
    type: 'template',
    viewCount: 12340,
    likeCount: 2100,
    commentCount: 178,
    downloadCount: 5670,
    publishedAt: '1주일 전',
    author: '희망쌤',
    tags: ['칭찬스티커', 'PBS', '보상시스템', '긍정훈육'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },

  // ========== 학부모 ==========
  {
    id: 'res-010',
    title: '학부모 상담 체크리스트 & 기록양식',
    description: '학부모 상담 시 활용할 수 있는 체크리스트와 상담 기록 양식입니다. 한글/워드 파일 모두 포함.',
    source: '아이스크림',
    sourceUrl: 'https://i-scream.co.kr',
    category: '학부모',
    type: 'template',
    viewCount: 8920,
    likeCount: 1560,
    commentCount: 180,
    downloadCount: 2340,
    publishedAt: '5시간 전',
    author: '햇살쌤',
    tags: ['학부모상담', '양식', '상담기록'],
    isBookmarked: true,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-011',
    title: '학부모 총회 PPT 템플릿 (2025년 최신)',
    description: '학부모 총회용 PPT 템플릿입니다. 학년별 맞춤형 교육과정 안내, 학급 운영 계획 슬라이드 포함.',
    source: '인디스쿨',
    sourceUrl: 'https://indischool.com',
    category: '학부모',
    type: 'presentation',
    viewCount: 15670,
    likeCount: 2890,
    commentCount: 234,
    downloadCount: 7890,
    publishedAt: '2일 전',
    author: '발표쌤',
    tags: ['학부모총회', 'PPT', '발표자료'],
    isBookmarked: false,
    month: 3,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-012',
    title: '가정통신문 양식 모음 (30종+)',
    description: '다양한 상황별 가정통신문 양식입니다. 행사안내, 설문조사, 동의서 등 30종 이상.',
    source: '쌤동네',
    sourceUrl: 'https://ssam.teacherville.co.kr',
    category: '학부모',
    type: 'template',
    viewCount: 9870,
    likeCount: 1780,
    commentCount: 145,
    downloadCount: 4560,
    publishedAt: '4일 전',
    author: '소통쌤',
    tags: ['가정통신문', '양식', '학부모안내'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },

  // ========== 교실 환경 ==========
  {
    id: 'res-020',
    title: '신학기 교실 환경 구성 아이디어 50선',
    description: '저비용 고효율! 학생들이 좋아하는 교실 환경 구성 아이디어를 모았습니다. 게시판 템플릿 파일 포함.',
    source: '에듀넷',
    sourceUrl: 'https://edunet.net',
    category: '교실 환경',
    type: 'image',
    viewCount: 23410,
    likeCount: 4120,
    commentCount: 670,
    downloadCount: 5670,
    publishedAt: '어제',
    author: '별빛쌤',
    tags: ['교실환경', '게시판', '환경구성', '신학기'],
    isBookmarked: false,
    month: 3,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-021',
    title: '계절별 게시판 꾸미기 자료 (사계절)',
    description: '봄, 여름, 가을, 겨울 계절별 게시판 꾸미기 자료입니다. 배경, 타이틀, 장식물 모두 포함.',
    source: '참쌤스쿨',
    sourceUrl: 'https://chamssaem.com',
    category: '교실 환경',
    type: 'image',
    viewCount: 18900,
    likeCount: 3450,
    commentCount: 289,
    downloadCount: 8900,
    publishedAt: '1주일 전',
    author: '아름쌤',
    tags: ['게시판', '계절', '환경구성'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-022',
    title: '학급 도서관 코너 꾸미기',
    description: '학급 도서관(독서 코너) 구성 아이디어와 운영 자료입니다. 도서 대출 카드, 추천도서 목록 포함.',
    source: '클래스팅',
    sourceUrl: 'https://classting.com',
    category: '교실 환경',
    type: 'guide',
    viewCount: 6780,
    likeCount: 1230,
    commentCount: 89,
    downloadCount: 2340,
    publishedAt: '2주일 전',
    author: '독서쌤',
    tags: ['독서코너', '학급도서관', '환경구성'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },

  // ========== 수업 자료 ==========
  {
    id: 'res-030',
    title: '국어 독서단원 수업 자료 (3~6학년)',
    description: '학년별 독서단원 수업 자료입니다. 읽기 전/중/후 활동지, 독서록 양식 포함.',
    source: '에듀넷',
    sourceUrl: 'https://edunet.net',
    category: '수업 자료',
    type: 'document',
    viewCount: 12340,
    likeCount: 2100,
    commentCount: 156,
    downloadCount: 5670,
    publishedAt: '3일 전',
    author: '국어쌤',
    tags: ['국어', '독서단원', '활동지'],
    isBookmarked: false,
    grade: [3, 4, 5, 6],
  },
  {
    id: 'res-031',
    title: '수학 교구 활용 수업 자료',
    description: '수학 교구(패턴블록, 칠교, 지오보드 등)를 활용한 수업 자료입니다. 학습지와 활동 가이드 포함.',
    source: '티처빌',
    sourceUrl: 'https://teacherville.co.kr',
    category: '수업 자료',
    type: 'guide',
    viewCount: 8900,
    likeCount: 1670,
    commentCount: 123,
    downloadCount: 3450,
    publishedAt: '5일 전',
    author: '수학쌤',
    tags: ['수학', '교구활용', '조작활동'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-032',
    title: '과학 실험 수업 안전 가이드',
    description: '과학 실험 시 필수 안전 수칙과 실험별 주의사항입니다. 실험 전 체크리스트, 사고 대응 매뉴얼 포함.',
    source: '인디스쿨',
    sourceUrl: 'https://indischool.com',
    category: '수업 자료',
    type: 'guide',
    viewCount: 7890,
    likeCount: 1450,
    commentCount: 98,
    downloadCount: 2890,
    publishedAt: '1주일 전',
    author: '과학쌤',
    tags: ['과학', '실험', '안전', '실험수업'],
    isBookmarked: false,
    grade: [3, 4, 5, 6],
  },
  {
    id: 'res-033',
    title: '체육 뉴스포츠 수업 자료',
    description: '킨볼, 플로어볼, 티볼 등 뉴스포츠 수업 자료입니다. 규칙 설명, 수업 진행안, 평가 기준 포함.',
    source: '참쌤스쿨',
    sourceUrl: 'https://chamssaem.com',
    category: '수업 자료',
    type: 'presentation',
    viewCount: 6540,
    likeCount: 1230,
    commentCount: 87,
    downloadCount: 2340,
    publishedAt: '2주일 전',
    author: '체육쌤',
    tags: ['체육', '뉴스포츠', '수업자료'],
    isBookmarked: false,
    grade: [3, 4, 5, 6],
  },

  // ========== 안전교육 ==========
  {
    id: 'res-040',
    title: '1학기 안전교육 월별 계획서 및 자료',
    description: '7대 안전교육 영역별 월별 계획서와 수업 자료 PPT입니다. NEIS 입력용 양식도 포함.',
    source: '참쌤스쿨',
    sourceUrl: 'https://chamssaem.com',
    category: '안전교육',
    type: 'presentation',
    viewCount: 18920,
    likeCount: 3210,
    commentCount: 450,
    downloadCount: 6780,
    publishedAt: '3일 전',
    author: '안전쌤',
    tags: ['안전교육', '7대안전', 'NEIS', '월별계획'],
    isBookmarked: true,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-041',
    title: '교통안전교육 동영상 & 활동지',
    description: '학년별 교통안전교육 자료입니다. 애니메이션 동영상, 퀴즈, 활동지 모두 포함.',
    source: '에듀넷',
    sourceUrl: 'https://edunet.net',
    category: '안전교육',
    type: 'video',
    viewCount: 12340,
    likeCount: 2100,
    commentCount: 167,
    downloadCount: 4560,
    publishedAt: '1주일 전',
    author: '교통쌤',
    tags: ['교통안전', '안전교육', '동영상'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-042',
    title: '재난대응 훈련 시나리오 & 체크리스트',
    description: '지진, 화재, 미세먼지 등 재난별 대응 훈련 시나리오와 체크리스트입니다.',
    source: '학교가자닷컴',
    sourceUrl: 'https://schoolgaja.com',
    category: '안전교육',
    type: 'document',
    viewCount: 9870,
    likeCount: 1780,
    commentCount: 134,
    downloadCount: 3450,
    publishedAt: '2주일 전',
    author: '방재쌤',
    tags: ['재난대응', '안전훈련', '대피훈련'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },

  // ========== 생활지도 ==========
  {
    id: 'res-050',
    title: '학교폭력 예방교육 자료 (어울림)',
    description: '어울림 프로그램 기반 학교폭력 예방교육 자료입니다. PPT, 활동지, 지도안 포함.',
    source: '에듀넷',
    sourceUrl: 'https://edunet.net',
    category: '생활지도',
    type: 'presentation',
    viewCount: 14560,
    likeCount: 2670,
    commentCount: 234,
    downloadCount: 5890,
    publishedAt: '4일 전',
    author: '평화쌤',
    tags: ['학교폭력', '예방교육', '어울림'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-051',
    title: '또래 조정 프로그램 운영 가이드',
    description: '또래 갈등 조정 프로그램 운영 가이드입니다. 또래 조정자 교육 자료, 조정 양식 포함.',
    source: '인디스쿨',
    sourceUrl: 'https://indischool.com',
    category: '생활지도',
    type: 'guide',
    viewCount: 5670,
    likeCount: 980,
    commentCount: 67,
    downloadCount: 1890,
    publishedAt: '1주일 전',
    author: '조정쌤',
    tags: ['또래조정', '갈등해결', '생활지도'],
    isBookmarked: false,
    grade: [4, 5, 6],
  },
  {
    id: 'res-052',
    title: '인성교육 활동 자료 (감사, 배려, 존중)',
    description: '인성교육 핵심 덕목별 활동 자료입니다. 아침활동, 창체시간 활용 가능.',
    source: '아이스크림',
    sourceUrl: 'https://i-scream.co.kr',
    category: '생활지도',
    type: 'document',
    viewCount: 8900,
    likeCount: 1560,
    commentCount: 123,
    downloadCount: 3450,
    publishedAt: '2주일 전',
    author: '인성쌤',
    tags: ['인성교육', '덕목', '활동자료'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },

  // ========== 행사 ==========
  {
    id: 'res-060',
    title: '운동회 종목 & 진행 가이드 (50종+)',
    description: '학년별 운동회 종목 50종 이상과 진행 방법, 필요 물품 체크리스트입니다.',
    source: '참쌤스쿨',
    sourceUrl: 'https://chamssaem.com',
    category: '행사',
    type: 'guide',
    viewCount: 15670,
    likeCount: 2890,
    commentCount: 345,
    downloadCount: 6780,
    publishedAt: '1개월 전',
    author: '운동쌤',
    tags: ['운동회', '체육대회', '종목'],
    isBookmarked: false,
    month: 5,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-061',
    title: '졸업식 영상 제작 가이드 & 템플릿',
    description: '감동적인 졸업식 영상 제작을 위한 가이드입니다. 프리미어/키네마스터 템플릿 포함.',
    source: '쌤동네',
    sourceUrl: 'https://ssam.teacherville.co.kr',
    category: '행사',
    type: 'video',
    viewCount: 12340,
    likeCount: 2100,
    commentCount: 178,
    downloadCount: 4560,
    publishedAt: '2개월 전',
    author: '영상쌤',
    tags: ['졸업식', '영상제작', '템플릿'],
    isBookmarked: false,
    month: 2,
    grade: [6],
  },

  // ========== 평가 ==========
  {
    id: 'res-070',
    title: '과정중심평가 기록 양식 & 예시',
    description: '과정중심평가 기록 양식과 교과별 기록 예시입니다. NEIS 연동 가능.',
    source: '에듀넷',
    sourceUrl: 'https://edunet.net',
    category: '평가',
    type: 'template',
    viewCount: 18900,
    likeCount: 3450,
    commentCount: 456,
    downloadCount: 8900,
    publishedAt: '3일 전',
    author: '평가쌤',
    tags: ['과정중심평가', '기록', 'NEIS'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-071',
    title: '교과별 수행평가 루브릭 모음',
    description: '국어, 수학, 사회, 과학 등 주요 교과 수행평가 루브릭입니다. 성취기준별 정리.',
    source: '인디스쿨',
    sourceUrl: 'https://indischool.com',
    category: '평가',
    type: 'document',
    viewCount: 14560,
    likeCount: 2670,
    commentCount: 234,
    downloadCount: 6780,
    publishedAt: '1주일 전',
    author: '루브릭쌤',
    tags: ['수행평가', '루브릭', '성취기준'],
    isBookmarked: false,
    grade: [3, 4, 5, 6],
  },

  // ========== 창체 ==========
  {
    id: 'res-080',
    title: '학급 특색활동 아이디어 100선',
    description: '창의적 체험활동 학급특색활동 아이디어 100개입니다. 자율활동, 동아리활동 포함.',
    source: '참쌤스쿨',
    sourceUrl: 'https://chamssaem.com',
    category: '창체',
    type: 'guide',
    viewCount: 11230,
    likeCount: 2010,
    commentCount: 178,
    downloadCount: 4560,
    publishedAt: '2주일 전',
    author: '창체쌤',
    tags: ['창체', '특색활동', '자율활동'],
    isBookmarked: false,
    grade: [1, 2, 3, 4, 5, 6],
  },
  {
    id: 'res-081',
    title: '진로교육 워크북 (5~6학년)',
    description: '고학년 진로교육용 워크북입니다. 자기이해, 직업탐색, 진로계획 활동 포함.',
    source: '에듀넷',
    sourceUrl: 'https://edunet.net',
    category: '창체',
    type: 'document',
    viewCount: 7890,
    likeCount: 1450,
    commentCount: 98,
    downloadCount: 2890,
    publishedAt: '3주일 전',
    author: '진로쌤',
    tags: ['진로교육', '워크북', '고학년'],
    isBookmarked: false,
    grade: [5, 6],
  },
];

// 카테고리별 자료 가져오기
export const getResourcesByCategory = (category: string): CommunityResource[] => {
  if (category === '전체') return communityResourcesDatabase;
  return communityResourcesDatabase.filter(r => r.category === category);
};

// 출처별 자료 가져오기
export const getResourcesBySource = (source: string): CommunityResource[] => {
  if (source === '전체') return communityResourcesDatabase;
  return communityResourcesDatabase.filter(r => r.source === source);
};

// 학년별 자료 가져오기
export const getResourcesByGrade = (grade: number): CommunityResource[] => {
  return communityResourcesDatabase.filter(r => r.grade?.includes(grade));
};

// 월별 자료 가져오기
export const getResourcesByMonth = (month: number): CommunityResource[] => {
  return communityResourcesDatabase.filter(r => r.month === month);
};

// 인기 자료 가져오기
export const getPopularResources = (limit: number = 10): CommunityResource[] => {
  return [...communityResourcesDatabase]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
};

// 최신 자료 가져오기
export const getRecentResources = (limit: number = 10): CommunityResource[] => {
  return communityResourcesDatabase.slice(0, limit);
};

// 검색
export const searchResources = (query: string): CommunityResource[] => {
  const lowerQuery = query.toLowerCase();
  return communityResourcesDatabase.filter(r =>
    r.title.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery) ||
    r.tags.some(t => t.toLowerCase().includes(lowerQuery))
  );
};
