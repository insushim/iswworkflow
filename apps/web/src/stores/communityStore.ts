'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CommunityResource {
  id: string;
  title: string;
  description: string;
  category: string;
  grade: string;
  subject: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  thumbnailUrl?: string;
  author: {
    id: string;
    name: string;
    school: string;
    avatar?: string;
  };
  downloads: number;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  resourceId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

interface CommunityState {
  resources: CommunityResource[];
  myResources: CommunityResource[];
  likedResources: string[];
  comments: Comment[];
  selectedCategory: string;
  selectedGrade: string;
  selectedSubject: string;
  searchQuery: string;
  sortBy: 'latest' | 'popular' | 'downloads';

  // Actions
  addResource: (resource: CommunityResource) => void;
  removeResource: (id: string) => void;
  updateResource: (id: string, updates: Partial<CommunityResource>) => void;
  toggleLike: (resourceId: string) => void;
  incrementDownload: (resourceId: string) => void;
  addComment: (comment: Comment) => void;
  setFilter: (filter: Partial<{
    category: string;
    grade: string;
    subject: string;
    searchQuery: string;
    sortBy: 'latest' | 'popular' | 'downloads';
  }>) => void;
}

// 초기 샘플 자료
const sampleResources: CommunityResource[] = [
  {
    id: '1',
    title: '1학년 받아쓰기 연습장 (1-10회)',
    description: '1학년 국어 교과서 기반 받아쓰기 연습 자료입니다. 각 회차별로 10문항씩 구성되어 있습니다.',
    category: '학습자료',
    grade: '1학년',
    subject: '국어',
    fileType: 'PDF',
    fileSize: '2.3MB',
    downloadUrl: '#',
    author: {
      id: 'user1',
      name: '김선생',
      school: '서울초등학교',
    },
    downloads: 1234,
    likes: 89,
    comments: 23,
    tags: ['받아쓰기', '국어', '1학년', '학습지'],
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
  {
    id: '2',
    title: '3학년 곱셈구구 게임 PPT',
    description: '곱셈구구를 재미있게 학습할 수 있는 게임형 PPT 자료입니다. 모둠별 대항전에 활용하세요.',
    category: '수업자료',
    grade: '3학년',
    subject: '수학',
    fileType: 'PPT',
    fileSize: '15.7MB',
    downloadUrl: '#',
    author: {
      id: 'user2',
      name: '박교사',
      school: '행복초등학교',
    },
    downloads: 892,
    likes: 156,
    comments: 45,
    tags: ['곱셈구구', '수학', '게임', 'PPT'],
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
  },
  {
    id: '3',
    title: '학급 운영 체크리스트 (3월)',
    description: '새 학기 시작 시 필요한 학급 운영 체크리스트입니다. 학생 파악, 환경 구성, 규칙 정하기 등 포함.',
    category: '학급경영',
    grade: '공통',
    subject: '기타',
    fileType: 'DOCX',
    fileSize: '156KB',
    downloadUrl: '#',
    author: {
      id: 'user3',
      name: '이교사',
      school: '희망초등학교',
    },
    downloads: 2341,
    likes: 234,
    comments: 67,
    tags: ['학급경영', '체크리스트', '3월', '새학기'],
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-13T10:00:00Z',
  },
  {
    id: '4',
    title: '5학년 사회 한국사 연표 정리',
    description: '5학년 사회 한국사 단원 핵심 연표 정리 자료입니다. 시대별로 정리되어 있어 복습에 유용합니다.',
    category: '학습자료',
    grade: '5학년',
    subject: '사회',
    fileType: 'PDF',
    fileSize: '3.1MB',
    downloadUrl: '#',
    author: {
      id: 'user4',
      name: '최선생',
      school: '미래초등학교',
    },
    downloads: 567,
    likes: 78,
    comments: 12,
    tags: ['한국사', '연표', '사회', '5학년'],
    createdAt: '2024-01-12T16:00:00Z',
    updatedAt: '2024-01-12T16:00:00Z',
  },
  {
    id: '5',
    title: '4학년 과학 실험 관찰 보고서 양식',
    description: '과학 실험 관찰 보고서 작성 양식입니다. 학생들이 스스로 정리할 수 있도록 구성했습니다.',
    category: '수업자료',
    grade: '4학년',
    subject: '과학',
    fileType: 'HWP',
    fileSize: '245KB',
    downloadUrl: '#',
    author: {
      id: 'user5',
      name: '정교사',
      school: '사랑초등학교',
    },
    downloads: 789,
    likes: 92,
    comments: 28,
    tags: ['과학실험', '관찰보고서', '양식', '4학년'],
    createdAt: '2024-01-11T11:30:00Z',
    updatedAt: '2024-01-11T11:30:00Z',
  },
  {
    id: '6',
    title: '6학년 영어 일상회화 플래시카드',
    description: '일상회화 표현을 익힐 수 있는 플래시카드 자료입니다. 출력하여 수업에 활용하세요.',
    category: '학습자료',
    grade: '6학년',
    subject: '영어',
    fileType: 'PDF',
    fileSize: '8.2MB',
    downloadUrl: '#',
    author: {
      id: 'user6',
      name: '강선생',
      school: '글로벌초등학교',
    },
    downloads: 445,
    likes: 67,
    comments: 15,
    tags: ['영어', '회화', '플래시카드', '6학년'],
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T09:00:00Z',
  },
  {
    id: '7',
    title: '2학년 음악 리듬악기 활동지',
    description: '다양한 리듬악기를 배우고 연주할 수 있는 활동지입니다. 악기 그림과 리듬 패턴 포함.',
    category: '수업자료',
    grade: '2학년',
    subject: '음악',
    fileType: 'PDF',
    fileSize: '4.5MB',
    downloadUrl: '#',
    author: {
      id: 'user7',
      name: '송교사',
      school: '음악초등학교',
    },
    downloads: 321,
    likes: 45,
    comments: 8,
    tags: ['음악', '리듬악기', '활동지', '2학년'],
    createdAt: '2024-01-09T14:00:00Z',
    updatedAt: '2024-01-09T14:00:00Z',
  },
  {
    id: '8',
    title: '학부모 상담 기록지 양식',
    description: '학부모 상담 시 활용할 수 있는 기록지 양식입니다. 상담 내용, 협의사항, 후속조치 등 포함.',
    category: '행정업무',
    grade: '공통',
    subject: '기타',
    fileType: 'HWP',
    fileSize: '89KB',
    downloadUrl: '#',
    author: {
      id: 'user8',
      name: '윤교사',
      school: '소통초등학교',
    },
    downloads: 1876,
    likes: 198,
    comments: 34,
    tags: ['학부모상담', '기록지', '양식', '행정'],
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z',
  },
];

export const useCommunityStore = create<CommunityState>()(
  persist(
    (set) => ({
      resources: sampleResources,
      myResources: [],
      likedResources: [],
      comments: [],
      selectedCategory: '전체',
      selectedGrade: '전체',
      selectedSubject: '전체',
      searchQuery: '',
      sortBy: 'latest',

      addResource: (resource) =>
        set((state) => ({
          resources: [resource, ...state.resources],
          myResources: [resource, ...state.myResources],
        })),

      removeResource: (id) =>
        set((state) => ({
          resources: state.resources.filter((r) => r.id !== id),
          myResources: state.myResources.filter((r) => r.id !== id),
        })),

      updateResource: (id, updates) =>
        set((state) => ({
          resources: state.resources.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
          myResources: state.myResources.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),

      toggleLike: (resourceId) =>
        set((state) => {
          const isLiked = state.likedResources.includes(resourceId);
          return {
            likedResources: isLiked
              ? state.likedResources.filter((id) => id !== resourceId)
              : [...state.likedResources, resourceId],
            resources: state.resources.map((r) =>
              r.id === resourceId
                ? { ...r, likes: r.likes + (isLiked ? -1 : 1) }
                : r
            ),
          };
        }),

      incrementDownload: (resourceId) =>
        set((state) => ({
          resources: state.resources.map((r) =>
            r.id === resourceId ? { ...r, downloads: r.downloads + 1 } : r
          ),
        })),

      addComment: (comment) =>
        set((state) => ({
          comments: [...state.comments, comment],
          resources: state.resources.map((r) =>
            r.id === comment.resourceId ? { ...r, comments: r.comments + 1 } : r
          ),
        })),

      setFilter: (filter) =>
        set((state) => ({
          selectedCategory: filter.category ?? state.selectedCategory,
          selectedGrade: filter.grade ?? state.selectedGrade,
          selectedSubject: filter.subject ?? state.selectedSubject,
          searchQuery: filter.searchQuery ?? state.searchQuery,
          sortBy: filter.sortBy ?? state.sortBy,
        })),
    }),
    {
      name: 'community-storage',
      partialize: (state) => ({
        myResources: state.myResources,
        likedResources: state.likedResources,
      }),
    }
  )
);
