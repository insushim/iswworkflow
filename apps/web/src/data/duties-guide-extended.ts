// 부서별 업무 가이드 확장 - 추가 전담 업무
// 교육부 업무 분장 가이드 기반

import { DutyGuide } from './duties-guide-comprehensive';

export const extendedDutiesGuide: DutyGuide[] = [
  // ========================================
  // 21. 영어교육 담당
  // ========================================
  {
    id: 'english-education',
    name: '영어교육 담당',
    shortName: '영어',
    category: 'special',
    icon: 'Languages',
    color: 'blue',
    difficulty: 3,
    description: '영어 교육과정 운영, 영어체험교실, 원어민 관리, 영어인증제를 담당합니다.',
    overview: `영어교육 담당은 초등학교 3~6학년 영어 교과 교육의 내실화를 위해
    영어 교육과정 운영을 지원합니다.

    영어체험교실 운영, 원어민 보조교사 관리(배치 학교), 영어 말하기 대회,
    영어인증제 운영, 영어독서교육 등이 주요 업무입니다.

    교육청 영어교육 정책에 따라 다양한 영어 교육 프로그램을 운영합니다.`,
    importance: `초등 영어교육의 기초를 다지고, 의사소통 중심 영어교육을 실현합니다.`,
    requiredSkills: [
      '영어 의사소통 능력',
      '영어 교수법 이해',
      '원어민과의 협력',
      '행사 기획력'
    ],
    commonChallenges: [
      '원어민 관리 어려움',
      '영어 환경 조성 한계',
      '학생 수준 차이 대응',
      '각종 대회 준비 부담'
    ],
    successTips: [
      '원어민과 정기적 수업 협의',
      '영어친화적 환경 조성',
      '수준별 프로그램 운영',
      '놀이·체험 중심 접근'
    ],
    annualTasks: [
      {
        id: 'eng-1',
        task: '영어교육 계획 수립',
        description: '연간 영어교육 운영 계획 작성',
        deadline: '3월',
        tips: ['교육청 지침 반영', '교과 협의회 운영'],
        documents: ['영어교육 계획서'],
        neis: []
      },
      {
        id: 'eng-2',
        task: '영어체험교실 운영',
        description: '영어 몰입 체험 프로그램 운영',
        deadline: '연중',
        tips: ['테마별 프로그램', '원어민 활용'],
        documents: ['체험 프로그램 계획'],
        neis: []
      },
      {
        id: 'eng-3',
        task: '영어 말하기 대회',
        description: '교내 영어 말하기 대회 개최',
        deadline: '10-11월',
        tips: ['학년별 수준 고려', '참여 기회 확대'],
        documents: ['대회 계획', '심사 기준'],
        neis: []
      },
      {
        id: 'eng-4',
        task: '원어민 관리',
        description: '원어민 보조교사 수업 지원 및 관리',
        deadline: '연중',
        tips: ['수업 협의', '문화 이해'],
        documents: ['수업 협의록'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 3, tasks: ['영어교육 계획', '원어민 협의'] },
      { month: 5, tasks: ['영어체험 프로그램'] },
      { month: 9, tasks: ['2학기 영어체험'] },
      { month: 10, tasks: ['영어 말하기 대회 준비'] },
      { month: 12, tasks: ['연간 평가'] }
    ],
    relatedDuties: ['연구부', '교육과정부'],
    references: [
      { title: '초등영어교육', url: 'https://www.moe.go.kr' }
    ],
    faq: [
      {
        question: '원어민 보조교사의 역할은?',
        answer: '원어민은 주교사와 협력하여 말하기·듣기 중심 수업을 지원하고, 영어 문화 체험 활동을 담당합니다.'
      }
    ]
  },

  // ========================================
  // 22. AI/디지털교육 담당
  // ========================================
  {
    id: 'digital-education',
    name: 'AI/디지털교육 담당',
    shortName: 'AI교육',
    category: 'special',
    icon: 'Cpu',
    color: 'violet',
    difficulty: 4,
    description: 'AI교육, SW교육, 디지털 리터러시, 스마트기기 관리를 담당합니다.',
    overview: `AI/디지털교육 담당은 미래교육을 대비한 디지털 역량 교육을 담당합니다.

    2025년 AI 디지털교과서 도입을 앞두고 AI 활용 교육, SW·코딩 교육,
    디지털 리터러시 교육, 스마트기기(태블릿) 관리가 핵심 업무입니다.

    교사 대상 AI 교육 역량 강화 연수 지원도 중요한 역할입니다.`,
    importance: `디지털 전환 시대, 학생과 교사의 디지털 역량 함양이 필수적입니다.`,
    requiredSkills: [
      'SW/코딩 교육 역량',
      'AI 도구 활용 능력',
      '스마트기기 관리',
      '디지털 리터러시',
      '교사 연수 기획'
    ],
    commonChallenges: [
      '급격한 기술 변화 대응',
      '기기 관리 부담',
      '교사 역량 격차',
      '디지털 기기 과의존 우려'
    ],
    successTips: [
      'AI 디지털교과서 도입 준비 철저',
      '단계적 역량 향상 지원',
      '기기 관리 시스템 구축',
      '디지털 시민교육 병행'
    ],
    annualTasks: [
      {
        id: 'dig-1',
        task: 'SW교육 운영',
        description: '실과 SW교육, 방과후 코딩교실 운영',
        deadline: '연중',
        tips: ['언플러그드~텍스트코딩 단계적 지도'],
        documents: ['SW교육 계획'],
        neis: []
      },
      {
        id: 'dig-2',
        task: 'AI 활용 교육',
        description: 'AI 도구 활용 수업 지원',
        deadline: '연중',
        tips: ['교과 연계 AI 활용', '윤리교육 병행'],
        documents: ['AI 교육 계획'],
        neis: []
      },
      {
        id: 'dig-3',
        task: '스마트기기 관리',
        description: '태블릿 PC 등 스마트기기 관리',
        deadline: '연중',
        tips: ['MDM 관리', '고장 대응', '충전 관리'],
        documents: ['기기 관리대장'],
        neis: []
      },
      {
        id: 'dig-4',
        task: '교사 디지털 연수',
        description: 'AI·디지털 역량 강화 연수 지원',
        deadline: '연중',
        tips: ['단계별 연수', '실습 중심'],
        documents: ['연수 계획'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 3, tasks: ['SW교육 계획', '기기 점검'] },
      { month: 4, tasks: ['SW교육의 달 행사'] },
      { month: 7, tasks: ['교사 연수'] },
      { month: 9, tasks: ['2학기 SW교육'] },
      { month: 11, tasks: ['코딩 대회'] }
    ],
    relatedDuties: ['정보부', '연구부'],
    references: [
      { title: 'SW교육', url: 'https://software.kr' }
    ],
    faq: [
      {
        question: 'AI 디지털교과서란?',
        answer: '2025년부터 도입되는 AI 기반 맞춤형 디지털 교과서로, 학생 수준에 맞는 학습 콘텐츠를 제공합니다.'
      }
    ]
  },

  // ========================================
  // 23. 다문화교육 담당
  // ========================================
  {
    id: 'multicultural-education',
    name: '다문화교육 담당',
    shortName: '다문화',
    category: 'support',
    icon: 'Globe2',
    color: 'amber',
    difficulty: 3,
    description: '다문화학생 지원, 다문화이해교육, 한국어교육(KSL)을 담당합니다.',
    overview: `다문화교육 담당은 다문화가정 학생의 학교 적응과
    전체 학생의 다문화 감수성 교육을 담당합니다.

    다문화학생 현황 관리, 한국어교육(KSL) 지원, 이중언어교육,
    다문화가정 학부모 지원, 전 학생 대상 다문화이해교육이 주요 업무입니다.

    다문화가정 학생의 원활한 학교생활 적응을 지원합니다.`,
    importance: `다문화 사회에서 상호 존중과 이해를 바탕으로 한 교육이 중요합니다.`,
    requiredSkills: [
      '다문화 이해 역량',
      '한국어교육(KSL) 이해',
      '상담 능력',
      '학부모 소통',
      '유관기관 연계'
    ],
    commonChallenges: [
      '언어 장벽',
      '학부모 소통 어려움',
      '편견과 차별 대응',
      '개별 지원 시간 부족'
    ],
    successTips: [
      '다문화가정 학부모와 소통 채널 구축',
      '한국어교육 전문 강사 연계',
      '또래 멘토링 프로그램 운영',
      '다문화이해 계기교육 활성화'
    ],
    annualTasks: [
      {
        id: 'mul-1',
        task: '다문화학생 현황 파악',
        description: '다문화가정 학생 현황 조사 및 관리',
        deadline: '3월',
        tips: ['전입생 수시 파악', '개인정보 관리'],
        documents: ['현황 명단'],
        neis: ['학생부 다문화 표시']
      },
      {
        id: 'mul-2',
        task: 'KSL 한국어교육',
        description: '한국어가 서투른 학생 대상 한국어 지원',
        deadline: '연중',
        tips: ['수준별 지도', '전문 강사 활용'],
        documents: ['KSL 운영 계획'],
        neis: []
      },
      {
        id: 'mul-3',
        task: '다문화이해교육',
        description: '전교생 대상 다문화 감수성 교육',
        deadline: '5월, 10월',
        tips: ['세계 문화 체험', '다양성 존중'],
        documents: ['교육 계획'],
        neis: []
      },
      {
        id: 'mul-4',
        task: '다문화가정 학부모 지원',
        description: '통역 지원, 학교 안내 등',
        deadline: '수시',
        tips: ['다국어 안내문', '통역 서비스 연계'],
        documents: ['안내 자료'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 3, tasks: ['현황 파악', 'KSL 대상자 선정'] },
      { month: 4, tasks: ['KSL 교육 시작'] },
      { month: 5, tasks: ['다문화이해교육'] },
      { month: 9, tasks: ['2학기 지원'] },
      { month: 12, tasks: ['연간 평가'] }
    ],
    relatedDuties: ['교육복지부', '상담부'],
    references: [
      { title: '다문화교육 포털', url: 'https://www.edu4mc.or.kr' }
    ],
    faq: [
      {
        question: 'KSL(한국어교육)이란?',
        answer: 'Korean as a Second Language의 약자로, 한국어가 모국어가 아닌 학생을 위한 한국어 교육 프로그램입니다.'
      }
    ]
  },

  // ========================================
  // 24. 영재교육 담당
  // ========================================
  {
    id: 'gifted-education',
    name: '영재교육 담당',
    shortName: '영재',
    category: 'special',
    icon: 'Lightbulb',
    color: 'yellow',
    difficulty: 4,
    description: '영재학급 운영, 영재교육원 추천, 영재 프로그램 운영을 담당합니다.',
    overview: `영재교육 담당은 영재성이 있는 학생을 발굴하고
    그에 맞는 교육 프로그램을 제공합니다.

    교내 영재학급 운영(지정학교), 교육청 영재교육원 추천,
    영재 캠프 및 특별 프로그램 운영이 주요 업무입니다.

    공정하고 객관적인 영재 선발 과정 관리가 중요합니다.`,
    importance: `영재성 있는 학생의 잠재력을 발현시켜 창의적 인재를 양성합니다.`,
    requiredSkills: [
      '영재교육 이해',
      '창의성 교육 역량',
      '공정한 선발 관리',
      '프로그램 기획력'
    ],
    commonChallenges: [
      '영재 선발의 공정성 시비',
      '학부모 민원',
      '프로그램 운영 부담',
      '영재 학생 관리'
    ],
    successTips: [
      '선발 과정 투명하게 공개',
      '다양한 영역의 영재성 발굴',
      '사교육 의존 예방',
      '산출물 발표 기회 제공'
    ],
    annualTasks: [
      {
        id: 'gif-1',
        task: '영재학급 대상자 선발',
        description: '영재학급 또는 영재교육원 대상자 선발',
        deadline: '11-12월 (차년도)',
        tips: ['GED 시스템 활용', '추천-선발-면접'],
        documents: ['선발 공고', '추천서'],
        neis: []
      },
      {
        id: 'gif-2',
        task: '영재학급 운영',
        description: '교내 영재학급 수업 운영',
        deadline: '연중',
        tips: ['창의적 프로젝트', '산출물 중심'],
        documents: ['운영 계획', '교재'],
        neis: []
      },
      {
        id: 'gif-3',
        task: '영재 캠프',
        description: '방학 중 영재 캠프 운영',
        deadline: '7-8월, 1월',
        tips: ['집중 탐구 활동', '현장 체험'],
        documents: ['캠프 계획'],
        neis: []
      },
      {
        id: 'gif-4',
        task: '산출물 발표회',
        description: '영재학급 연간 산출물 발표',
        deadline: '12월',
        tips: ['포트폴리오', '발표 기회'],
        documents: ['발표회 계획'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 3, tasks: ['영재학급 개강'] },
      { month: 7, tasks: ['영재 캠프'] },
      { month: 9, tasks: ['2학기 운영'] },
      { month: 11, tasks: ['차년도 선발 시작'] },
      { month: 12, tasks: ['산출물 발표'] }
    ],
    relatedDuties: ['과학부', '연구부'],
    references: [
      { title: '영재교육종합데이터베이스(GED)', url: 'https://ged.kedi.re.kr' }
    ],
    faq: [
      {
        question: '영재 선발 방법은?',
        answer: '담임 추천 → 창의적문제해결력 검사 → 영재성검사 → 면접 순으로 진행되며, GED 시스템을 통해 관리됩니다.'
      }
    ]
  },

  // ========================================
  // 25. 학생자치 담당
  // ========================================
  {
    id: 'student-council',
    name: '학생자치 담당',
    shortName: '자치',
    category: 'support',
    icon: 'Users',
    color: 'emerald',
    difficulty: 2,
    description: '전교학생회, 학급자치, 학생 의견 수렴, 학생 주도 행사를 담당합니다.',
    overview: `학생자치 담당은 학생의 자율성과 민주시민 역량을 기르기 위한
    학생 자치활동을 지원합니다.

    전교학생회 선거 및 운영 지원, 학급자치회 활성화,
    학생 의견 수렴 및 학교 정책 반영, 학생 주도 행사 지원이 주요 업무입니다.

    학생이 학교 구성원으로서 목소리를 낼 수 있도록 돕습니다.`,
    importance: `민주시민 교육의 실천 공간으로서 학생 자치의 중요성이 커지고 있습니다.`,
    requiredSkills: [
      '민주적 의사결정 이해',
      '학생 소통 능력',
      '행사 기획 지원',
      '갈등 조정'
    ],
    commonChallenges: [
      '형식적 자치 운영',
      '학생회 활동 시간 확보',
      '의견 수렴 방법',
      '실질적 권한 부여'
    ],
    successTips: [
      '실질적 의사결정 권한 부여',
      '정기적 학생 회의 보장',
      '학생 제안 실제 반영',
      '자치활동 예산 확보'
    ],
    annualTasks: [
      {
        id: 'stu-1',
        task: '전교학생회 선거',
        description: '전교 학생회장단 선거 관리',
        deadline: '3월 (또는 12월)',
        tips: ['민주적 선거 운영', '선거교육'],
        documents: ['선거 공고', '후보 등록'],
        neis: []
      },
      {
        id: 'stu-2',
        task: '학생자치회 운영',
        description: '전교학생회 및 학급자치회 활동 지원',
        deadline: '연중',
        tips: ['정기 회의', '학생 주도'],
        documents: ['회의록'],
        neis: []
      },
      {
        id: 'stu-3',
        task: '학생 의견 수렴',
        description: '학생 설문조사, 제안함 운영',
        deadline: '수시',
        tips: ['익명 보장', '피드백 제공'],
        documents: ['설문 결과'],
        neis: []
      },
      {
        id: 'stu-4',
        task: '학생 주도 행사',
        description: '학생회 주관 캠페인, 행사 지원',
        deadline: '수시',
        tips: ['자율성 존중', '안전 지도'],
        documents: ['행사 계획'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 3, tasks: ['학생회 선거', '자치회 조직'] },
      { month: 5, tasks: ['어린이날 행사 기획'] },
      { month: 9, tasks: ['2학기 자치활동'] },
      { month: 11, tasks: ['학교 개선 제안'] },
      { month: 12, tasks: ['차기 학생회 선거 (선택)'] }
    ],
    relatedDuties: ['생활지도부'],
    references: [
      { title: '학생자치 운영 가이드', url: 'https://www.moe.go.kr' }
    ],
    faq: [
      {
        question: '학생회 예산은 어떻게 확보하나요?',
        answer: '학교 교육활동비 중 학생자치활동비로 배정받거나, 학운위 심의를 거쳐 별도 예산을 확보합니다.'
      }
    ]
  },

  // ========================================
  // 26. 교육실습 담당
  // ========================================
  {
    id: 'teaching-practice',
    name: '교육실습 담당',
    shortName: '실습',
    category: 'admin',
    icon: 'GraduationCap',
    color: 'indigo',
    difficulty: 2,
    description: '교육실습생 배정, 실습 지도, 평가를 담당합니다.',
    overview: `교육실습 담당은 교육대학 학생들의 교육실습을 지원합니다.

    실습생 신청 접수 및 배정, 지도교사 배정, 실습 일정 관리,
    실습 평가 등이 주요 업무입니다.

    예비 교사들이 교직에 대한 이해를 높이고 실무 능력을 기를 수 있도록 돕습니다.`,
    importance: `예비 교사 양성에 기여하며, 학교에도 새로운 에너지를 제공합니다.`,
    requiredSkills: [
      '교육실습 제도 이해',
      '일정 관리',
      '실습생 지도',
      '평가 능력'
    ],
    commonChallenges: [
      '실습생 배정 조율',
      '지도교사 섭외',
      '실습 중 문제 발생',
      '평가의 공정성'
    ],
    successTips: [
      '사전에 대학과 충분한 협의',
      '지도교사 사전 연수',
      '실습생 오리엔테이션 철저',
      '정기적 피드백 제공'
    ],
    annualTasks: [
      {
        id: 'pra-1',
        task: '실습생 신청 접수',
        description: '교육대학 실습 신청 접수 및 배정',
        deadline: '2월',
        tips: ['대학별 일정 확인', '정원 관리'],
        documents: ['신청서'],
        neis: []
      },
      {
        id: 'pra-2',
        task: '지도교사 배정',
        description: '실습생 지도교사 배정',
        deadline: '3월',
        tips: ['경력교사 우선', '희망 조사'],
        documents: ['배정표'],
        neis: []
      },
      {
        id: 'pra-3',
        task: '교육실습 운영',
        description: '4주간 교육실습 운영',
        deadline: '4-5월, 9-10월',
        tips: ['오리엔테이션', '수업 참관'],
        documents: ['실습 일정'],
        neis: []
      },
      {
        id: 'pra-4',
        task: '실습 평가',
        description: '실습생 평가서 작성 및 송부',
        deadline: '실습 종료 후',
        tips: ['구체적 피드백', '공정한 평가'],
        documents: ['평가서'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 2, tasks: ['신청 접수', '배정'] },
      { month: 4, tasks: ['1학기 교육실습'] },
      { month: 5, tasks: ['평가서 송부'] },
      { month: 9, tasks: ['2학기 교육실습'] },
      { month: 10, tasks: ['평가서 송부'] }
    ],
    relatedDuties: ['교무기획부'],
    references: [
      { title: '교육실습 운영 지침', url: 'https://www.moe.go.kr' }
    ],
    faq: [
      {
        question: '교육실습 기간은?',
        answer: '일반적으로 4주(20일)이며, 참관실습과 수업실습으로 구분됩니다.'
      }
    ]
  },

  // ========================================
  // 27. 학교홍보 담당
  // ========================================
  {
    id: 'school-pr',
    name: '학교홍보 담당',
    shortName: '홍보',
    category: 'admin',
    icon: 'Megaphone',
    color: 'rose',
    difficulty: 2,
    description: '학교 홍보, SNS 관리, 언론 대응, 홍보물 제작을 담당합니다.',
    overview: `학교홍보 담당은 학교의 긍정적 이미지를 구축하고
    학교 소식을 대내외에 알리는 업무를 담당합니다.

    학교 홈페이지 뉴스 게시, SNS 운영, 교육청 보도자료 제공,
    학교 홍보물(리플렛, 영상) 제작이 주요 업무입니다.

    신입생 모집, 학교 행사 홍보 등을 통해 학교 브랜드를 관리합니다.`,
    importance: `좋은 교육활동을 알리고 지역사회와 소통하는 창구입니다.`,
    requiredSkills: [
      '콘텐츠 제작 능력',
      'SNS 활용',
      '사진/영상 촬영',
      '글쓰기 능력'
    ],
    commonChallenges: [
      '콘텐츠 제작 시간 부족',
      '학생 초상권 관리',
      '부정적 기사 대응',
      'SNS 관리 부담'
    ],
    successTips: [
      '초상권 동의서 체계적 관리',
      '정기적 콘텐츠 발행 일정',
      '학생 기자단 운영',
      '즉각적 위기 대응 체계'
    ],
    annualTasks: [
      {
        id: 'pr-1',
        task: '학교 홍보 계획',
        description: '연간 홍보 전략 및 콘텐츠 계획',
        deadline: '3월',
        tips: ['주요 행사 연계', '타겟 설정'],
        documents: ['홍보 계획서'],
        neis: []
      },
      {
        id: 'pr-2',
        task: '학교 SNS 운영',
        description: '학교 인스타그램, 유튜브 등 운영',
        deadline: '연중',
        tips: ['정기 게시', '긍정적 콘텐츠'],
        documents: [],
        neis: []
      },
      {
        id: 'pr-3',
        task: '보도자료 작성',
        description: '주요 행사 보도자료 교육청 제출',
        deadline: '수시',
        tips: ['육하원칙', '사진 첨부'],
        documents: ['보도자료'],
        neis: []
      },
      {
        id: 'pr-4',
        task: '학교 홍보물 제작',
        description: '리플렛, 학교 소개 영상 제작',
        deadline: '2월 (신입생 모집)',
        tips: ['전문 업체 활용 고려'],
        documents: ['홍보물'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 2, tasks: ['신입생 모집 홍보'] },
      { month: 3, tasks: ['입학식 보도'] },
      { month: 5, tasks: ['가정의 달 행사 홍보'] },
      { month: 9, tasks: ['체육대회 홍보'] },
      { month: 12, tasks: ['연말 행사, 연간 결산'] }
    ],
    relatedDuties: ['정보부', '교무부'],
    references: [],
    faq: [
      {
        question: '학생 사진 게시 시 주의사항은?',
        answer: '촬영 및 게시 동의서를 받은 학생만 게시 가능하며, 개인정보가 노출되지 않도록 주의해야 합니다.'
      }
    ]
  },

  // ========================================
  // 28. 예술(음악/미술) 담당
  // ========================================
  {
    id: 'arts-education',
    name: '예술(음악/미술) 담당',
    shortName: '예술',
    category: 'special',
    icon: 'Palette',
    color: 'pink',
    difficulty: 3,
    description: '음악/미술 교육, 학예회, 예술동아리, 전시회를 담당합니다.',
    overview: `예술교육 담당은 음악·미술 교과 교육의 내실화와
    학생들의 예술적 감수성 함양을 위한 업무를 담당합니다.

    학예회/발표회 기획, 교내 전시회 운영, 예술동아리 지원,
    지역 예술기관 연계 프로그램 운영이 주요 업무입니다.`,
    importance: `예술교육을 통해 창의성과 정서적 안정을 도모합니다.`,
    requiredSkills: [
      '음악/미술 전문성',
      '공연 기획',
      '전시 기획',
      '동아리 지도'
    ],
    commonChallenges: [
      '예술 교육 시간 부족',
      '예산 확보 어려움',
      '전문 강사 확보',
      '행사 준비 부담'
    ],
    successTips: [
      '지역 예술인 연계',
      '문화예술교육 지원사업 활용',
      '학생 재능 발굴',
      '전시/공연 기회 확대'
    ],
    annualTasks: [
      {
        id: 'art-1',
        task: '예술교육 계획',
        description: '연간 예술교육 운영 계획 수립',
        deadline: '3월',
        tips: ['교육청 지원사업 확인'],
        documents: ['계획서'],
        neis: []
      },
      {
        id: 'art-2',
        task: '학예회 준비',
        description: '학예회/발표회 기획 및 운영',
        deadline: '10-11월',
        tips: ['학년별 공연', '리허설 충분히'],
        documents: ['학예회 계획'],
        neis: []
      },
      {
        id: 'art-3',
        task: '미술 전시회',
        description: '학생 작품 전시회 개최',
        deadline: '6월, 12월',
        tips: ['전 학년 참여', '복도 갤러리'],
        documents: ['전시 계획'],
        neis: []
      },
      {
        id: 'art-4',
        task: '예술 동아리 운영',
        description: '오케스트라, 합창, 미술 동아리 등',
        deadline: '연중',
        tips: ['정기 연습', '발표 기회'],
        documents: ['동아리 운영 계획'],
        neis: []
      }
    ],
    monthlyWorkflow: [
      { month: 3, tasks: ['계획 수립', '동아리 조직'] },
      { month: 6, tasks: ['1학기 전시'] },
      { month: 10, tasks: ['학예회 준비'] },
      { month: 11, tasks: ['학예회 개최'] },
      { month: 12, tasks: ['2학기 전시'] }
    ],
    relatedDuties: ['교육과정부'],
    references: [
      { title: '문화예술교육 지원', url: 'https://www.arte.or.kr' }
    ],
    faq: [
      {
        question: '학교 예술교육 지원사업은?',
        answer: '문화체육관광부, 지역문화재단 등에서 예술강사 파견, 악기 지원 등 다양한 사업을 운영합니다.'
      }
    ]
  }
];
