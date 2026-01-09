// 초등교사 업무분장 종합 가이드 - 통합 파일
// 모든 업무 데이터를 하나로 통합

import { dutiesGuideData, DutyGuide, DutyTask, MonthlyWorkflow } from './duties-guide-comprehensive';
import { dutiesGuideDataPart2 } from './duties-guide-comprehensive-2';
import { dutiesGuideDataPart3 } from './duties-guide-comprehensive-3';

// 추가 업무들 (교육복지, 상담, 학운위, 정보공시 등)
const additionalDuties: DutyGuide[] = [
  // ========================================
  // 17. 교육복지부
  // ========================================
  {
    id: 'education-welfare',
    name: '교육복지부',
    shortName: '복지',
    category: 'support',
    icon: 'HeartHandshake',
    color: 'pink',
    difficulty: 3,
    description: '교육복지우선지원사업, 위기학생 지원, 교육급여, 방과후자유수강권을 담당합니다.',
    overview: `교육복지부는 취약계층 학생의 교육 기회를 보장하기 위한 업무를 담당합니다.
    교육복지우선지원사업 운영, 교육급여 대상자 관리, 위기학생 발굴 및 지원,
    방과후학교 자유수강권 관리 등이 주요 업무입니다.

    교육복지사가 배치된 학교에서는 협력하여 사업을 운영하고,
    미배치 학교에서는 담당교사가 직접 운영합니다.`,
    importance: `모든 학생의 교육받을 권리를 보장하고, 교육 격차를 해소합니다.`,
    requiredSkills: [
      '교육복지 사업 이해',
      '위기학생 발굴 능력',
      '지역사회 자원 연계',
      '상담 능력',
      '예산 관리'
    ],
    commonChallenges: [
      '대상자 발굴의 어려움',
      '위기학생 관리 부담',
      '개인정보 민감성',
      '예산 부족'
    ],
    successTips: [
      '담임교사와 긴밀히 협력하여 대상자 파악',
      '지역 복지기관과 네트워크 구축',
      '학생 개인정보 철저히 관리',
      '사례관리 기록 유지'
    ],
    annualTasks: [
      {
        id: 'ew-1',
        task: '교육복지 대상자 선정',
        description: '기초생활수급자, 차상위 등 대상자 파악 및 관리',
        deadline: '3월',
        tips: ['담임 추천 받기', '개인정보 동의'],
        documents: ['대상자 명단'],
        neis: []
      },
      {
        id: 'ew-2',
        task: '교육급여 신청 안내',
        description: '교육급여(교육비) 대상자 신청 안내',
        deadline: '3월, 9월',
        tips: ['신청 방법 상세 안내', '미신청자 독려'],
        documents: ['신청 안내문'],
        neis: []
      },
      {
        id: 'ew-3',
        task: '위기학생 지원',
        description: '학업중단 위기, 가정위기 학생 발굴 및 지원',
        deadline: '연중',
        tips: ['Wee클래스 연계', '사례관리'],
        documents: ['사례관리 기록'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 3, tasks: ['대상자 선정', '교육급여 안내'] },
      { month: 4, tasks: ['지원 프로그램 운영'] },
      { month: 6, tasks: ['1학기 평가'] },
      { month: 9, tasks: ['2학기 대상자 점검'] },
      { month: 12, tasks: ['연간 평가'] }
    ],
    relatedDuties: ['상담부', '방과후부'],
    references: [
      { title: '교육복지우선지원사업', url: 'https://www.moe.go.kr' }
    ],
    faq: [
      {
        question: '교육복지 대상자는 누구인가요?',
        answer: '기초생활수급자, 차상위계층, 한부모가족, 다문화학생, 특수교육대상자, 북한이탈주민 자녀 등이 대상입니다.'
      }
    ]
  },

  // ========================================
  // 18. 상담부 (Wee클래스)
  // ========================================
  {
    id: 'counseling',
    name: '상담부 (Wee클래스)',
    shortName: '상담',
    category: 'support',
    icon: 'MessageCircle',
    color: 'teal',
    difficulty: 4,
    description: '학생 상담, Wee클래스 운영, 심리검사, 위기학생 관리를 담당합니다.',
    overview: `상담부는 학생들의 심리·정서적 지원을 담당합니다.
    전문상담교사가 배치된 학교에서는 Wee클래스를 운영하고,
    미배치 학교에서는 담당교사가 상담 업무를 지원합니다.

    정서행동특성검사 후속 관리, 학교폭력 피해학생 상담,
    위기학생 관리 등 전문적인 상담 업무를 수행합니다.`,
    importance: `학생 정신건강이 중요해지면서 상담의 역할이 커지고 있습니다.`,
    requiredSkills: [
      '상담 기초 역량',
      '심리검사 해석',
      '위기개입 능력',
      '비밀유지',
      '외부기관 연계'
    ],
    commonChallenges: [
      '상담 시간 확보',
      '위기학생 관리 부담',
      '학부모 상담 요청 증가',
      '비밀유지와 안전 사이 균형'
    ],
    successTips: [
      '상담 신청 시스템 구축',
      '담임교사와 정보 공유 (동의 하에)',
      'Wee센터, 정신건강복지센터와 연계',
      '상담 기록 철저히 관리'
    ],
    annualTasks: [
      {
        id: 'cs-1',
        task: '정서행동특성검사 후속 관리',
        description: '관심군 학생 상담 및 관리',
        deadline: '4-6월',
        tips: ['학부모 동의 후 상담', '전문기관 연계'],
        documents: ['관심군 관리대장'],
        neis: []
      },
      {
        id: 'cs-2',
        task: '학교폭력 피해학생 상담',
        description: '피해학생 심리지원 상담',
        deadline: '수시',
        tips: ['지속적 관리', '비밀유지'],
        documents: ['상담일지'],
        neis: []
      },
      {
        id: 'cs-3',
        task: 'Wee클래스 운영',
        description: '상담실 운영 및 상담 프로그램 진행',
        deadline: '연중',
        tips: ['편안한 환경 조성', '다양한 프로그램'],
        documents: ['운영 계획'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 3, tasks: ['상담 안내', '운영 계획'] },
      { month: 4, tasks: ['정서행동검사 후 상담'] },
      { month: 5, tasks: ['관심군 관리'] },
      { month: 9, tasks: ['2학기 상담 운영'] },
      { month: 12, tasks: ['연간 평가'] }
    ],
    relatedDuties: ['생활지도부', '교육복지부'],
    references: [
      { title: 'Wee프로젝트', url: 'https://www.wee.go.kr' }
    ],
    faq: [
      {
        question: '상담 비밀유지 원칙의 예외는?',
        answer: '자해·자살 위험, 타인에 대한 위해 가능성, 아동학대 의심 등 안전이 우려되는 경우에는 관련자에게 알릴 수 있습니다.'
      }
    ]
  },

  // ========================================
  // 19. 정보공시/학교알리미
  // ========================================
  {
    id: 'school-info-disclosure',
    name: '정보공시/학교알리미',
    shortName: '공시',
    category: 'admin',
    icon: 'Globe',
    color: 'blue',
    difficulty: 3,
    description: '학교알리미 정보 공시, 학교 홈페이지 관리를 담당합니다.',
    overview: `정보공시 담당은 학교알리미(schoolinfo.go.kr)를 통한
    학교 정보 공개 업무를 담당합니다.

    교육관련 법령에 따라 학교 현황, 학생 현황, 교원 현황,
    교육활동, 교육여건, 예결산 등의 정보를 정기적으로 공시합니다.

    학교 홈페이지 관리, 학교 소개 자료 업데이트도 담당합니다.`,
    importance: `교육 정보의 투명한 공개는 학부모 알권리 보장과 학교 신뢰도 향상에 기여합니다.`,
    requiredSkills: [
      '학교알리미 시스템 활용',
      '데이터 수집 및 정리',
      '문서 작성 능력',
      '홈페이지 관리'
    ],
    commonChallenges: [
      '정보 수집 어려움',
      '공시 기한 준수',
      '정보 정확성 검증',
      '홈페이지 업데이트 지연'
    ],
    successTips: [
      '공시 일정표를 미리 파악하고 준비',
      '각 부서에 자료 요청 미리 하기',
      '정보 입력 전 검증 철저히',
      '홈페이지 정기 업데이트 일정 수립'
    ],
    annualTasks: [
      {
        id: 'sd-1',
        task: '정기 공시',
        description: '학교알리미 정기 공시 항목 입력',
        deadline: '4월, 9월',
        tips: ['공시 항목별 담당자 지정', '마감일 준수'],
        documents: ['공시 자료'],
        neis: []
      },
      {
        id: 'sd-2',
        task: '수시 공시',
        description: '변동 사항 수시 업데이트',
        deadline: '수시',
        tips: ['변동 발생 시 즉시 반영'],
        documents: [],
        neis: []
      },
      {
        id: 'sd-3',
        task: '학교 홈페이지 관리',
        description: '학교 소개, 공지사항 등 관리',
        deadline: '연중',
        tips: ['정기 업데이트', '정확한 정보'],
        documents: [],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 3, tasks: ['1차 공시 준비'] },
      { month: 4, tasks: ['1차 정기 공시'] },
      { month: 8, tasks: ['2차 공시 준비'] },
      { month: 9, tasks: ['2차 정기 공시'] },
      { month: 12, tasks: ['연간 정리'] }
    ],
    relatedDuties: ['교무기획부', '행정실'],
    references: [
      { title: '학교알리미', url: 'https://www.schoolinfo.go.kr' }
    ],
    faq: [
      {
        question: '학교알리미 공시 항목은?',
        answer: '학교 개황, 학생 현황, 교원 현황, 교육활동, 교육여건, 예결산, 학업성취, 학교폭력 등 약 60여개 항목을 공시합니다.'
      }
    ]
  },

  // ========================================
  // 20. 학교운영위원회 담당
  // ========================================
  {
    id: 'school-council',
    name: '학교운영위원회',
    shortName: '학운위',
    category: 'admin',
    icon: 'Building2',
    color: 'slate',
    difficulty: 3,
    description: '학교운영위원회 운영, 심의안건 준비, 회의록 관리를 담당합니다.',
    overview: `학교운영위원회(학운위) 담당은 학교의 주요 의사결정 기구인
    학운위의 원활한 운영을 지원합니다.

    위원 선출 관리, 회의 소집 및 진행 지원, 심의안건 준비,
    회의록 작성 및 관리가 주요 업무입니다.

    학교교육계획, 예결산, 학칙, 교과서 선정 등 주요 사안에 대해
    학운위 심의를 거쳐야 하므로 일정 관리가 중요합니다.`,
    importance: `학교 민주주의와 투명한 학교 운영을 위한 핵심 기구입니다.`,
    requiredSkills: [
      '학운위 관련 법규 이해',
      '회의 진행 지원',
      '문서 작성 능력',
      '일정 관리'
    ],
    commonChallenges: [
      '위원 참석률 관리',
      '회의 일정 조율',
      '심의안건 준비 시간 부족',
      '회의록 작성 부담'
    ],
    successTips: [
      '연간 회의 일정을 미리 수립',
      '안건은 회의 1주일 전 사전 배포',
      '회의록은 즉시 작성',
      '위원들과 소통 채널 유지'
    ],
    annualTasks: [
      {
        id: 'sc-1',
        task: '학운위 위원 선출',
        description: '학부모위원, 교원위원, 지역위원 선출 관리',
        deadline: '3월',
        tips: ['선거 공정성 확보', '임기 관리'],
        documents: ['선거 공고', '위원 명단'],
        neis: []
      },
      {
        id: 'sc-2',
        task: '정기회의 운영',
        description: '분기별 정기회의 준비 및 진행 지원',
        deadline: '분기별',
        tips: ['안건 사전 배포', '의사정족수 확인'],
        documents: ['회의 안건', '회의록'],
        neis: []
      },
      {
        id: 'sc-3',
        task: '심의안건 준비',
        description: '학교교육계획, 예결산 등 심의안건 준비',
        deadline: '해당 시기',
        tips: ['각 부서 협조', '자료 충실히'],
        documents: ['심의 안건 자료'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 2, tasks: ['학교교육계획 심의 준비'] },
      { month: 3, tasks: ['위원 선출', '1차 회의'] },
      { month: 5, tasks: ['2차 회의 (예산)'] },
      { month: 9, tasks: ['3차 회의'] },
      { month: 11, tasks: ['4차 회의 (결산, 차년도 계획)'] }
    ],
    relatedDuties: ['교무기획부', '행정실'],
    references: [
      { title: '학교운영위원회 안내', url: 'https://www.moe.go.kr' }
    ],
    faq: [
      {
        question: '학운위 심의 필수 사항은?',
        answer: '학교교육계획, 학교예산 및 결산, 학교교칙, 교과서 선정, 수익자부담경비, 학교급식, 방과후학교 운영 등이 필수 심의 사항입니다.'
      }
    ]
  }
];

// 모든 업무 데이터 통합
export const allDutiesGuide: DutyGuide[] = [
  ...dutiesGuideData,           // Part 1: 교무, 연구, 생활, 방과후, 체육 (5개)
  ...dutiesGuideDataPart2,      // Part 2: 과학, 안전, 급식, 보건, 특수 (5개)
  ...dutiesGuideDataPart3,      // Part 3: 인성, 진로, 도서, 환경, 학년, 담임 (6개)
  ...additionalDuties           // 추가: 복지, 상담, 공시, 학운위 (4개)
];

// 카테고리별 업무 가져오기
export const getDutiesByCategory = (category: DutyGuide['category']) => {
  return allDutiesGuide.filter(duty => duty.category === category);
};

// 난이도별 업무 가져오기
export const getDutiesByDifficulty = (difficulty: number) => {
  return allDutiesGuide.filter(duty => duty.difficulty === difficulty);
};

// 업무 검색
export const searchDuties = (keyword: string) => {
  const lowerKeyword = keyword.toLowerCase();
  return allDutiesGuide.filter(duty =>
    duty.name.toLowerCase().includes(lowerKeyword) ||
    duty.description.toLowerCase().includes(lowerKeyword) ||
    duty.overview.toLowerCase().includes(lowerKeyword)
  );
};

// 특정 업무 가져오기
export const getDutyById = (id: string) => {
  return allDutiesGuide.find(duty => duty.id === id);
};

// 업무 카테고리 정보
export const dutyCategories = {
  core: { name: '핵심 업무', description: '학교 운영의 필수 부서', color: 'blue' },
  support: { name: '지원 업무', description: '교육활동 지원 부서', color: 'green' },
  special: { name: '특별 업무', description: '특수 분야 전담 부서', color: 'purple' },
  admin: { name: '행정 업무', description: '학교 행정 지원 업무', color: 'slate' }
};

// 업무 난이도 정보
export const difficultyLevels = {
  1: { name: '매우 쉬움', color: 'green' },
  2: { name: '쉬움', color: 'lime' },
  3: { name: '보통', color: 'yellow' },
  4: { name: '어려움', color: 'orange' },
  5: { name: '매우 어려움', color: 'red' }
};

// 타입 재export
export type { DutyGuide, DutyTask, MonthlyWorkflow };
