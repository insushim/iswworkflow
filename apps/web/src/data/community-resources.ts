// 커뮤니티 교육 자료 데이터베이스
// 선생님들이 직접 공유한 자료만 표시

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
  month?: number;
  grade?: number[];
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
}

export const resourceSources = ['전체', '직접 공유'];
export const resourceCategories = ['전체', '학급 운영', '학부모', '교실 환경', '수업 자료', '생활지도', '행사', '안전교육', '평가', '교육과정', '특별활동', '창체'];

// 빈 배열 - 선생님들이 직접 자료를 공유하면 추가됨
export const communityResourcesDatabase: CommunityResource[] = [];

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
