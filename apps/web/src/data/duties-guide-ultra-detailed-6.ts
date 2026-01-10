// 초등교사 업무분장 초상세 가이드 Part 6 - 인성진로, 도서, 담임, 교육복지, 상담
// 교차검증된 100+ 사이트 기반, 처음 담당해도 완벽 수행 가능

import { UltraDetailedDutyGuide } from './duties-guide-ultra-detailed';

// ========================================
// 12. 인성/진로부 - 초상세 버전
// ========================================
export const characterCareerUltraDetailed: UltraDetailedDutyGuide = {
  id: 'character-career-ultra',
  name: '인성/진로부',
  shortName: '인성/진로',
  category: 'student',
  icon: 'Heart',
  color: 'pink',
  difficulty: 3,

  description: '인성교육, 진로교육, 창의적 체험활동, 봉사활동, 자치활동 등을 담당합니다.',

  detailedOverview: `
【인성/진로부 업무 완전 가이드】

■ 부서 개요
인성/진로부는 학생들의 바른 인성 함양과 진로 탐색을 지원합니다.
인성교육, 진로교육, 봉사활동, 자치활동 등을 계획하고 운영합니다.

■ 핵심 업무 영역
1. 인성교육
   - 인성교육 계획 및 운영
   - 인성교육 프로그램
   - 학교폭력예방과 연계

2. 진로교육
   - 진로교육 계획
   - 진로체험 (진로체험의 날)
   - 진로검사, 진로상담

3. 창의적 체험활동
   - 창체 교육과정 운영
   - 동아리, 봉사, 진로 활동

4. 자치활동
   - 학생회/학생자치회 운영
   - 학급회의 지원

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 3월: 인성/진로 계획, 학생회 조직, 창체 계획                  │
│ 4월: 진로검사, 인성교육주간, 학생회 활동                     │
│ 5월: 진로체험의 날, 봉사활동                                 │
│ 6월: 1학기 인성/진로 정리                                    │
│ 9월: 2학기 활동, 진로체험                                    │
│ 10월: 인성교육, 학생회 활동                                  │
│ 11월: 진로 행사, 인성 캠페인                                 │
│ 12월: 연간 정리, 차년도 계획                                 │
└─────────────────────────────────────────────────────────────┘
`,

  importance: `
【인성/진로부 업무가 중요한 이유】

1. 전인교육 실현
   - 지덕체 균형 발달
   - 바른 인성 함양
   - 미래 설계 지원

2. 법적 의무 이행
   - 인성교육진흥법
   - 진로교육법

3. 사회적 요구
   - 인성교육 강화
   - 진로 조기 탐색
   - 민주시민 양성
`,

  legalBasis: [
    '인성교육진흥법',
    '진로교육법',
    '초중등교육법 (창의적 체험활동)',
  ],

  requiredSkills: [
    '인성교육 프로그램 기획',
    '진로교육 운영',
    '학생자치 지도',
    '창의적 체험활동 운영',
    '봉사활동 관리',
  ],

  recommendedTraining: [
    '인성교육 담당자 연수',
    '진로교육 연수',
    '학생자치 활성화 연수',
  ],

  commonChallenges: [
    '인성교육 실효성 확보',
    '진로체험 기관 섭외',
    '학생자치 활성화',
    '봉사활동 기관 연계',
  ],

  challengeSolutions: {
    '인성교육': '체험 중심, 일상적 실천 연계',
    '진로체험': '지역 자원 활용, 온라인 체험 병행',
    '학생자치': '실질적 권한 부여, 교사 지원',
    '봉사활동': '지역기관 MOU, 교내 봉사 활성화',
  },

  successTips: [
    '인성교육은 체험과 실천 중심으로',
    '진로체험 기관 미리미리 섭외',
    '학생회 활동에 실질적 권한 부여',
    '봉사활동은 의미 있게, 형식적 X',
  ],

  firstYearGuide: `
【처음 인성/진로부 업무를 맡게 된 선생님께】

■ 가장 먼저 해야 할 것
1. 인성교육 계획 확인
2. 진로교육 계획 확인
3. 학생회 조직 현황 파악
4. 창의적 체험활동 계획 확인
5. 봉사활동 기관 파악

■ 인성교육 핵심 덕목
- 예, 효, 정직, 책임, 존중, 배려, 소통, 협동

■ 진로교육 (초등)
- 자기 이해
- 직업 세계 이해
- 진로 탐색 활동
- 진로검사 (커리어넷)

■ 학생회 조직
- 전교 학생회장/부회장
- 학년/학급 임원
- 각 부서 (환경부, 체육부 등)

■ 주의사항
❌ 형식적인 인성교육
❌ 진로체험 안전 소홀
❌ 학생회 유명무실화
`,

  seniorAdvice: [
    '인성교육은 말보다 실천이에요.',
    '진로체험 기관 빨리 섭외하세요. 인기 많아요.',
    '학생회 활동 진짜 권한 줘야 살아요.',
    '봉사활동 형식적으로 하면 의미 없어요.',
  ],

  detailedTasks: [
    {
      id: 'character-1',
      task: '인성교육 운영',
      category: 'essential',
      description: '인성교육 계획 및 프로그램 운영',
      legalBasis: '인성교육진흥법',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '월 4시간',
      procedures: [
        {
          step: 1,
          title: '인성교육 계획',
          description: '연간 인성교육 계획 수립',
          tips: ['핵심 덕목 선정', '실천 중심 계획'],
          documents: ['인성교육 계획'],
        },
        {
          step: 2,
          title: '인성교육 프로그램',
          description: '인성 프로그램 운영',
          tips: ['체험활동', '캠페인', '계기교육'],
        },
        {
          step: 3,
          title: '실적 정리',
          description: '인성교육 실적 정리 및 보고',
          documents: ['인성교육 결과'],
        },
      ],
    },
    {
      id: 'character-2',
      task: '진로교육 운영',
      category: 'essential',
      description: '진로교육 계획 및 진로체험 운영',
      legalBasis: '진로교육법',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '연간 30시간',
      procedures: [
        {
          step: 1,
          title: '진로교육 계획',
          description: '연간 진로교육 계획 수립',
          tips: ['학년별 목표', '체험 계획'],
          documents: ['진로교육 계획'],
        },
        {
          step: 2,
          title: '진로검사 실시',
          description: '커리어넷 등 진로검사',
          tips: ['4-6학년 대상', '결과 해석 지도'],
        },
        {
          step: 3,
          title: '진로체험의 날',
          description: '진로체험 운영',
          tips: ['체험기관 섭외', '안전교육', '인솔'],
          documents: ['진로체험 계획'],
        },
        {
          step: 4,
          title: '실적 입력',
          description: '나이스 진로활동 입력',
          neisPath: '창의적체험활동 > 진로활동',
        },
      ],
      neisMenus: ['창의적체험활동-진로활동'],
    },
    {
      id: 'character-3',
      task: '학생자치활동 운영',
      category: 'important',
      description: '학생회/학생자치회 조직 및 운영',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '주 2시간',
      procedures: [
        {
          step: 1,
          title: '학생회 조직',
          description: '학생회 선거, 조직 구성',
          tips: ['민주적 선거', '역할 안내'],
          documents: ['학생회 조직'],
        },
        {
          step: 2,
          title: '학생회 활동 지원',
          description: '학생회 회의, 활동 지원',
          tips: ['정기 회의', '실질적 활동', '예산 지원'],
        },
        {
          step: 3,
          title: '학급자치 지원',
          description: '학급회의, 학급 자치 지원',
          tips: ['주 1회 학급회의', '학급 문제 해결'],
        },
      ],
    },
    {
      id: 'character-4',
      task: '봉사활동 관리',
      category: 'important',
      description: '봉사활동 계획 및 관리',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '월 2시간',
      procedures: [
        {
          step: 1,
          title: '봉사활동 계획',
          description: '교내외 봉사활동 계획',
          tips: ['교내 봉사', '지역 연계 봉사'],
          documents: ['봉사활동 계획'],
        },
        {
          step: 2,
          title: '봉사활동 실시',
          description: '봉사활동 운영',
          tips: ['안전교육', '의미 있는 활동'],
        },
        {
          step: 3,
          title: '실적 관리',
          description: '봉사활동 실적 기록',
          neisPath: '창의적체험활동 > 봉사활동',
        },
      ],
      neisMenus: ['창의적체험활동-봉사활동'],
    },
  ],

  weeklyWorkflow: [
    { week: 1, month: 3, tasks: ['인성/진로 계획', '학생회 조직'], priority: 'high' },
    { week: 2, month: 4, tasks: ['진로검사', '인성교육주간'], priority: 'medium' },
    { week: 2, month: 5, tasks: ['진로체험의 날', '봉사활동'], priority: 'high' },
    { week: 4, month: 6, tasks: ['1학기 정리'], priority: 'medium' },
    { week: 1, month: 9, tasks: ['2학기 활동 시작'], priority: 'medium' },
    { week: 2, month: 10, tasks: ['인성 캠페인', '학생회 활동'], priority: 'medium' },
    { week: 4, month: 12, tasks: ['연간 정리', '차년도 계획'], priority: 'high' },
  ],

  neisGuide: {
    frequentMenus: [
      { path: '창의적체험활동 > 진로활동', description: '진로활동 기록', frequency: '학기별' },
      { path: '창의적체험활동 > 봉사활동', description: '봉사활동 기록', frequency: '수시' },
    ],
    tipsAndTricks: [
      '진로활동 체험 후 소감까지 기록',
    ],
    commonErrors: [],
  },

  documentTemplates: [
    {
      name: '인성교육 계획',
      purpose: '연간 인성교육 운영 계획',
      requiredFields: ['목표', '프로그램', '일정', '평가'],
      submissionTo: '학교 보관',
    },
    {
      name: '진로교육 계획',
      purpose: '연간 진로교육 계획',
      requiredFields: ['목표', '활동', '일정', '체험기관'],
      submissionTo: '학교 보관',
    },
  ],

  relatedDuties: ['교무기획부', '생활지도부'],

  externalPartners: [
    { name: '진로체험지원센터 (꿈길)', contact: 'ggoomgil.go.kr', purpose: '진로체험' },
    { name: '자원봉사센터', contact: '지역센터', purpose: '봉사활동 연계' },
  ],

  detailedFAQ: [],
  emergencyProcedures: [],

  references: [
    {
      title: '꿈길 (진로체험망)',
      url: 'https://www.ggoomgil.go.kr',
      description: '진로체험 프로그램'
    },
    {
      title: '커리어넷',
      url: 'https://www.career.go.kr',
      description: '진로검사, 진로정보'
    },
  ],

  relatedLaws: [
    {
      name: '인성교육진흥법',
      article: '제6조',
      content: '학교의 장은 인성교육의 목표와 성취기준을 학교 교육과정에 반영하여야 한다.',
    },
    {
      name: '진로교육법',
      article: '제8조',
      content: '학교의 장은 학생에게 다양한 진로교육을 실시하여야 한다.',
    },
  ],
};

// ========================================
// 13. 도서부 - 초상세 버전
// ========================================
export const libraryUltraDetailed: UltraDetailedDutyGuide = {
  id: 'library-ultra',
  name: '도서부 (학교도서관)',
  shortName: '도서',
  category: 'support',
  icon: 'BookOpen',
  color: 'amber',
  difficulty: 2,

  description: '학교도서관 운영, 독서교육, 도서 관리, 독서행사 등을 담당합니다.',

  detailedOverview: `
【도서부 업무 완전 가이드】

■ 부서 개요
도서부는 학교도서관 운영과 독서교육을 담당합니다.
도서 구입/관리, 대출/반납 운영, 독서교육, 독서행사 등을 합니다.

■ 핵심 업무 영역
1. 도서관 운영
   - 도서관 개방 운영
   - 대출/반납 관리
   - 도서관 환경 조성

2. 도서 관리
   - 도서 구입 (장서개발)
   - 도서 등록/분류
   - 장서 점검/폐기

3. 독서교육
   - 독서교육 계획
   - 도서관 활용수업
   - 독서 프로그램

4. 독서행사
   - 도서관의 날 행사
   - 독서의 달 행사 (9월)
   - 독서퀴즈, 독후감 대회

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 2월: 도서관 정비, 장서 점검, 구입 계획                       │
│ 3월: 도서관 운영 시작, 도서 대출, 1학기 도서 구입            │
│ 4월: 도서관의 날 행사 (4/12), 독서교육                       │
│ 5월: 독서 프로그램, 도서관 활용수업                          │
│ 6월: 1학기 반납, 장서 점검                                   │
│ 9월: 2학기 운영, 독서의 달 행사                              │
│ 10월: 독서행사, 독후감 대회                                  │
│ 11월: 2학기 도서 구입                                        │
│ 12월: 연간 정리, 장서 점검, 폐기                            │
└─────────────────────────────────────────────────────────────┘
`,

  importance: `
【도서부 업무가 중요한 이유】

1. 독서교육
   - 독서 습관 형성
   - 문해력 향상
   - 평생 학습 기반

2. 정보 활용 능력
   - 정보 탐색
   - 자기주도학습 지원

3. 교육과정 지원
   - 도서관 활용수업
   - 교과 연계 독서
`,

  legalBasis: [
    '학교도서관진흥법',
    '독서문화진흥법',
  ],

  requiredSkills: [
    '도서관 시스템 (DLS) 운영',
    '도서 분류 (KDC)',
    '장서 개발',
    '독서교육 프로그램 기획',
  ],

  recommendedTraining: [
    '학교도서관 담당자 연수',
    'DLS 활용 연수',
    '독서교육 연수',
  ],

  commonChallenges: [
    '도서관 운영 인력 부족',
    '도서 미반납 관리',
    '독서 흥미 유발',
    '도서 구입 예산 부족',
  ],

  challengeSolutions: {
    '인력 부족': '도서부원/도서도우미 학생 활용, 학부모 봉사',
    '미반납': '정기적 독촉, 반납 캠페인',
    '독서 흥미': '인기 도서 구입, 다양한 행사',
    '예산 부족': '기증 도서 활용, 효율적 구입',
  },

  successTips: [
    'DLS 시스템 꼭 익혀두세요',
    '미반납 도서 학기말에 꼭 회수',
    '신간/인기 도서가 학생을 모음',
    '독서행사는 재미있게',
    '도서부원 학생들이 큰 도움',
  ],

  firstYearGuide: `
【처음 도서부 업무를 맡게 된 선생님께】

■ 가장 먼저 해야 할 것
1. DLS(도서관 시스템) 권한 확인
2. 장서 현황 파악
3. 도서관 운영 시간 확정
4. 도서 구입 예산 확인
5. 사서교사/도서실무사 유무 확인

■ DLS (학교도서관정보시스템)
- 대출/반납 관리
- 도서 검색
- 장서 관리
- 통계

■ 도서 분류 (KDC)
- 000 총류
- 100 철학
- 200 종교
- 300 사회과학
- 400 자연과학
- 500 기술과학
- 600 예술
- 700 언어
- 800 문학
- 900 역사

■ 도서 구입 절차
1. 구입 희망 도서 수집
2. 서지 확인, 중복 확인
3. 구입 목록 작성
4. 행정실에 구입 요청
5. 납품 후 검수
6. DLS 등록, 라벨 부착
7. 서가 배치

■ 주의사항
❌ 도서 미등록 방치
❌ 미반납 도서 장기 방치
❌ 장서 점검 미실시
`,

  seniorAdvice: [
    'DLS 익히는 게 제일 먼저예요.',
    '학기말 반납 독촉 꼭 하세요. 안 하면 도서 사라져요.',
    '도서부원 학생들 잘 활용하면 일이 훨씬 수월해요.',
    '인기 도서 위주로 구입하면 대출률 올라요.',
  ],

  detailedTasks: [
    {
      id: 'library-1',
      task: '도서관 운영',
      category: 'essential',
      description: '도서관 개방, 대출/반납 관리',
      deadline: '연중',
      frequency: 'daily',
      estimatedTime: '일 1시간',
      procedures: [
        {
          step: 1,
          title: '도서관 개방',
          description: '일정 시간 도서관 개방',
          tips: ['쉬는시간, 점심시간, 방과후'],
        },
        {
          step: 2,
          title: '대출/반납',
          description: 'DLS로 대출/반납 처리',
          tips: ['대출 기간 안내', '연체 확인'],
        },
        {
          step: 3,
          title: '미반납 관리',
          description: '연체 도서 독촉',
          tips: ['주기적 독촉', '학기말 일제 반납'],
        },
      ],
    },
    {
      id: 'library-2',
      task: '도서 구입 및 관리',
      category: 'essential',
      description: '도서 구입, 등록, 폐기',
      deadline: '학기별',
      frequency: 'biannual',
      estimatedTime: '연간 30시간',
      procedures: [
        {
          step: 1,
          title: '구입 계획',
          description: '도서 구입 계획, 희망도서 수집',
          tips: ['학생/교사 희망도서', '교과 연계 도서'],
          documents: ['도서 구입 계획'],
        },
        {
          step: 2,
          title: '도서 구입',
          description: '행정실 협조, 도서 구입',
          tips: ['서지 확인', '중복 확인', '할인율 확인'],
          documents: ['도서 구입 신청'],
        },
        {
          step: 3,
          title: '도서 등록',
          description: 'DLS 등록, 라벨 부착, 배치',
          tips: ['분류번호 확인', '등록번호 부여'],
        },
        {
          step: 4,
          title: '장서 점검/폐기',
          description: '정기 점검, 노후 도서 폐기',
          tips: ['연 1회 이상 점검', '폐기 기준 확인'],
          documents: ['장서 점검표', '폐기 목록'],
        },
      ],
    },
    {
      id: 'library-3',
      task: '독서교육 및 행사',
      category: 'important',
      description: '독서교육, 독서행사 운영',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '월 4시간',
      procedures: [
        {
          step: 1,
          title: '독서교육 계획',
          description: '연간 독서교육 계획',
          tips: ['학년별 권장도서', '독서 프로그램'],
          documents: ['독서교육 계획'],
        },
        {
          step: 2,
          title: '도서관 활용수업',
          description: '도서관 활용수업 지원',
          tips: ['교과 연계', '정보 활용'],
        },
        {
          step: 3,
          title: '독서행사',
          description: '독서의 달, 도서관의 날 행사',
          tips: ['독서퀴즈', '독후감 대회', '작가와의 만남'],
          documents: ['행사 계획'],
        },
      ],
      checklistItems: [
        '도서관의 날 행사 (4/12)',
        '독서의 달 행사 (9월)',
        '독후감 대회',
        '독서골든벨',
      ],
    },
  ],

  weeklyWorkflow: [
    { week: 4, month: 2, tasks: ['도서관 정비', '장서 점검'], priority: 'high' },
    { week: 1, month: 3, tasks: ['도서관 운영 시작', '도서 대출 시작'], priority: 'high' },
    { week: 2, month: 4, tasks: ['도서관의 날 행사'], priority: 'high' },
    { week: 4, month: 6, tasks: ['1학기 반납', '장서 점검'], priority: 'high' },
    { week: 1, month: 9, tasks: ['2학기 운영', '독서의 달 준비'], priority: 'high' },
    { week: 2, month: 9, tasks: ['독서의 달 행사'], priority: 'high' },
    { week: 4, month: 12, tasks: ['연간 정리', '폐기 도서 처리'], priority: 'high' },
  ],

  neisGuide: {
    frequentMenus: [],
    tipsAndTricks: [],
    commonErrors: [],
  },

  documentTemplates: [
    {
      name: '도서 구입 계획',
      purpose: '연간 도서 구입 계획',
      requiredFields: ['예산', '분야별 구입 계획', '일정'],
      submissionTo: '학교 보관',
    },
    {
      name: '장서 점검표',
      purpose: '정기 장서 점검',
      requiredFields: ['점검일', '점검 결과', '분실/훼손 도서'],
      submissionTo: '학교 보관',
    },
  ],

  relatedDuties: ['교무기획부'],

  externalPartners: [
    { name: '공공도서관', contact: '지역 도서관', purpose: '연계 대출, 행사' },
    { name: '도서 유통사', contact: '거래처', purpose: '도서 구입' },
  ],

  detailedFAQ: [],
  emergencyProcedures: [],

  references: [
    {
      title: 'DLS (학교도서관정보시스템)',
      url: 'https://www.dls.go.kr',
      description: '도서관 시스템'
    },
  ],

  relatedLaws: [
    {
      name: '학교도서관진흥법',
      article: '제6조',
      content: '학교의 장은 학교도서관을 설치하고 운영하여야 한다.',
    },
  ],
};

// ========================================
// 14. 학년부/담임업무 - 초상세 버전
// ========================================
export const classTeacherUltraDetailed: UltraDetailedDutyGuide = {
  id: 'class-teacher-ultra',
  name: '학년부/담임업무',
  shortName: '담임',
  category: 'class',
  icon: 'Users',
  color: 'blue',
  difficulty: 4,

  description: '학급경영, 학년 운영, 학생생활지도, 학부모 상담, 생활기록부 관리 등을 담당합니다.',

  detailedOverview: `
【학년부/담임업무 완전 가이드】

■ 부서 개요
담임교사는 학급 운영의 핵심이자 학생들의 1차 지도자입니다.
학급경영, 생활지도, 학부모 소통, 생활기록부 관리 등을 담당합니다.

■ 핵심 업무 영역
1. 학급경영
   - 학급 환경 구성
   - 학급 규칙/약속
   - 학급 자치 운영
   - 1인 1역할

2. 학생 생활지도
   - 출결 관리
   - 기본 생활습관 지도
   - 학생 상담
   - 문제행동 지도

3. 학부모 소통
   - 학급 안내
   - 학부모 상담
   - 가정통신문

4. 학적/평가
   - 생활기록부 관리
   - 학생 평가
   - 행동특성 및 종합의견

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 3월: 학급 조직, 환경 구성, 학부모 총회, 기초 조사           │
│ 4월: 학부모 상담주간, 현장체험학습, 학급운영                │
│ 5월: 가정의 달 행사, 학생 관찰                              │
│ 6월: 1학기 평가, 통지표 작성, 행동특성 기록                 │
│ 7월: 방학식, 방학 안내, 생기부 점검                         │
│ 9월: 2학기 학급운영, 학부모 상담                            │
│ 10월: 현장체험학습, 학생 관찰                               │
│ 11월: 진급/졸업 준비                                        │
│ 12월: 통지표 작성, 생기부 마감, 졸업/종업                   │
│ 연중: 출결 관리, 상담, 생활지도, 학부모 소통                │
└─────────────────────────────────────────────────────────────┘
`,

  importance: `
【담임업무가 중요한 이유】

1. 학생 성장의 핵심
   - 1년간 학생과 가장 가까이
   - 학생 이해도 최고
   - 개별 맞춤 지도

2. 학교-가정 연결
   - 학부모와 직접 소통
   - 가정 연계 교육
   - 신뢰 관계 구축

3. 교육의 실질적 실행
   - 교육과정의 실제 운영
   - 생활지도 일선
   - 학급 문화 형성
`,

  legalBasis: [
    '초중등교육법',
    '학교생활기록 작성 및 관리지침',
  ],

  requiredSkills: [
    '학급경영 능력',
    '학생 상담',
    '학부모 소통',
    '생활기록부 작성',
    '나이스 활용',
    '갈등 조정',
  ],

  recommendedTraining: [
    '학급경영 연수',
    '상담 기법 연수',
    '생활기록부 작성 연수',
    '학부모 상담 연수',
  ],

  commonChallenges: [
    '학급 내 갈등 조정',
    '문제행동 학생 지도',
    '학부모 민원',
    '생활기록부 작성',
    '개인 시간 부족',
  ],

  challengeSolutions: {
    '학급 갈등': '즉시 개입, 양측 경청, 공정한 중재',
    '문제행동': '원인 파악, 꾸준한 지도, 전문가 연계',
    '학부모 민원': '경청, 공감, 학교 입장 설명, 기록',
    '생기부': '일상 기록, 틈틈이 작성, 기한 전 완료',
  },

  successTips: [
    '학생 이름 빨리 외우기 - 관계의 시작',
    '매일 조금씩 관찰 기록 - 생기부 작성이 쉬워짐',
    '학부모 소통은 자주, 긍정적으로',
    '학급 규칙은 학생들과 함께 정하기',
    '문제는 커지기 전에 개입',
    '동료 교사와 정보 공유',
  ],

  firstYearGuide: `
【처음 담임을 맡게 된 선생님께】

■ 3월 첫 주에 해야 할 것
1. 학생 명단 확인, 이름 외우기
2. 자리 배치
3. 학급 환경 구성
4. 학급 규칙 함께 정하기
5. 1인 1역할 정하기
6. 학부모 총회 준비

■ 학급 기본 조직
- 반장/부반장
- 1인 1역할 (청소, 칠판, 전등 등)
- 모둠 구성
- 학급 규칙

■ 출결 관리
- 매일 아침 출석 확인
- 결석 시 학부모 연락 확인
- 나이스 출결 입력
- 결석계, 조퇴/외출 신청서 관리

■ 학부모 소통
- 학기 초 학급 안내문
- 정기 상담 (학부모상담주간)
- 수시 소통 (문제 발생 시)
- 연락은 기록으로 남기기

■ 생활기록부 핵심
- 출결: 정확히, 즉시 입력
- 행동특성 및 종합의견: 학기말 작성
- 창체, 특기사항: 해당 시 기록
- 기한 엄수!

■ 주의사항
❌ 학생 방치 (관심 갖기)
❌ 학부모 연락 지연
❌ 출결 미관리
❌ 생기부 기한 초과
❌ 체벌, 언어폭력
`,

  seniorAdvice: [
    '학생 이름 빨리 외워야 관계가 시작됩니다.',
    '학부모한테는 좋은 일로 먼저 연락하세요.',
    '문제 생기면 빨리 개입. 키우면 더 힘들어요.',
    '생기부는 미루지 말고 틈틈이 기록하세요.',
    '혼자 다 해결하려 하지 마세요. 도움 요청하세요.',
    '컨디션 관리 중요해요. 번아웃 조심.',
  ],

  detailedTasks: [
    {
      id: 'class-1',
      task: '학급 조직 및 환경 구성',
      category: 'essential',
      description: '학기 초 학급 조직, 환경 구성',
      deadline: '3월 첫째 주',
      frequency: 'annual',
      estimatedTime: '10시간',
      procedures: [
        {
          step: 1,
          title: '학생 파악',
          description: '학생 명단 확인, 기본 정보 파악',
          tips: ['이름 외우기', '특이사항 학생 파악'],
        },
        {
          step: 2,
          title: '자리 배치',
          description: '자리 배치, 모둠 구성',
          tips: ['시력, 키 고려', '정기적 교체'],
        },
        {
          step: 3,
          title: '학급 규칙',
          description: '학급 규칙 함께 정하기',
          tips: ['학생 참여', '긍정적 표현'],
        },
        {
          step: 4,
          title: '역할 분담',
          description: '1인 1역할 정하기',
          tips: ['모든 학생 역할 부여', '책임감 교육'],
        },
        {
          step: 5,
          title: '환경 구성',
          description: '교실 환경 정비',
          tips: ['게시판', '청소 도구', '학급 문고'],
        },
      ],
    },
    {
      id: 'class-2',
      task: '출결 관리',
      category: 'essential',
      description: '일일 출결 확인 및 관리',
      deadline: '매일',
      frequency: 'daily',
      estimatedTime: '일 15분',
      procedures: [
        {
          step: 1,
          title: '출석 확인',
          description: '매일 아침 출석 확인',
          tips: ['조회 시간', '미등교 학생 파악'],
        },
        {
          step: 2,
          title: '결석 확인',
          description: '결석 학생 학부모 연락 확인',
          tips: ['무단결석 X', '결석 사유 확인'],
        },
        {
          step: 3,
          title: '나이스 입력',
          description: '출결 상황 나이스 입력',
          neisPath: '학생생활 > 출결관리',
          tips: ['당일 입력', '증빙서류 관리'],
        },
        {
          step: 4,
          title: '서류 관리',
          description: '결석계, 조퇴/외출 신청서 관리',
          documents: ['결석계', '조퇴/외출 신청서'],
        },
      ],
      neisMenus: ['학생생활-출결관리'],
    },
    {
      id: 'class-3',
      task: '학부모 상담',
      category: 'essential',
      description: '정기/수시 학부모 상담',
      deadline: '학부모상담주간, 연중',
      frequency: 'ongoing',
      estimatedTime: '연간 30시간',
      procedures: [
        {
          step: 1,
          title: '상담 안내',
          description: '학부모상담주간 안내',
          tips: ['일정 조율', '상담 희망 조사'],
          documents: ['상담 안내문'],
        },
        {
          step: 2,
          title: '상담 준비',
          description: '학생별 상담 준비',
          tips: ['학생 자료 준비', '상담 내용 정리'],
        },
        {
          step: 3,
          title: '상담 실시',
          description: '학부모 상담 진행',
          tips: ['경청', '긍정적 시작', '협력 강조'],
        },
        {
          step: 4,
          title: '상담 기록',
          description: '상담 내용 기록',
          tips: ['핵심 내용', '합의 사항', '후속 조치'],
          documents: ['상담 기록부'],
        },
      ],
    },
    {
      id: 'class-4',
      task: '생활기록부 관리',
      category: 'essential',
      description: '학교생활기록부 작성 및 관리',
      legalBasis: '학교생활기록 작성 및 관리지침',
      deadline: '학기말',
      frequency: 'biannual',
      estimatedTime: '학기당 20시간',
      procedures: [
        {
          step: 1,
          title: '일상 기록',
          description: '학생 관찰 및 기록',
          tips: ['수시 메모', '구체적 행동 기록'],
        },
        {
          step: 2,
          title: '출결 정리',
          description: '학기 출결 현황 정리',
          neisPath: '학생생활 > 출결관리',
        },
        {
          step: 3,
          title: '행동특성 작성',
          description: '행동특성 및 종합의견 작성',
          neisPath: '학생생활 > 행동특성 및 종합의견',
          tips: ['긍정적 표현', '구체적 사례', '성장 기록'],
        },
        {
          step: 4,
          title: '점검 및 마감',
          description: '오류 점검, 기한 내 마감',
          tips: ['오탈자 확인', '기한 엄수'],
        },
      ],
      neisMenus: ['학생생활-행동특성 및 종합의견'],
    },
    {
      id: 'class-5',
      task: '학생 상담 및 생활지도',
      category: 'essential',
      description: '학생 상담, 문제행동 지도',
      deadline: '연중',
      frequency: 'daily',
      estimatedTime: '일 30분',
      procedures: [
        {
          step: 1,
          title: '일상 관찰',
          description: '학생 행동 관찰',
          tips: ['변화 감지', '조기 개입'],
        },
        {
          step: 2,
          title: '개별 상담',
          description: '필요시 개별 상담',
          tips: ['안전한 공간', '경청', '비밀 보장'],
        },
        {
          step: 3,
          title: '문제행동 지도',
          description: '문제행동 발생 시 지도',
          tips: ['원인 파악', '일관성', '기록'],
        },
        {
          step: 4,
          title: '연계 지도',
          description: '필요시 전문가 연계',
          tips: ['상담교사', 'Wee클래스', '외부기관'],
        },
      ],
    },
  ],

  weeklyWorkflow: [
    { week: 1, month: 3, tasks: ['학급 조직', '환경 구성', '학부모 총회'], priority: 'high' },
    { week: 2, month: 3, tasks: ['기초 조사', '학급 규칙', '1인 1역할'], priority: 'high' },
    { week: 2, month: 4, tasks: ['학부모 상담주간', '현장체험학습'], priority: 'high' },
    { week: 4, month: 6, tasks: ['1학기 평가', '통지표 작성', '행동특성 기록'], priority: 'high' },
    { week: 3, month: 7, tasks: ['방학식', '생기부 점검'], priority: 'high' },
    { week: 2, month: 9, tasks: ['2학기 학급운영', '학부모 상담'], priority: 'high' },
    { week: 4, month: 12, tasks: ['통지표 작성', '생기부 마감', '종업식'], priority: 'high' },
  ],

  neisGuide: {
    frequentMenus: [
      { path: '학생생활 > 출결관리', description: '출결 입력', frequency: '매일' },
      { path: '학생생활 > 행동특성 및 종합의견', description: '행동특성 기록', frequency: '학기말' },
      { path: '학적 > 학적기본', description: '학적 정보', frequency: '수시' },
    ],
    tipsAndTricks: [
      '출결은 당일 입력',
      '행동특성은 미리미리 작성',
    ],
    commonErrors: [
      { error: '출결 미입력', solution: '매일 확인 후 입력' },
      { error: '생기부 기한 초과', solution: '마감 1주 전 완료 목표' },
    ],
  },

  documentTemplates: [
    {
      name: '학급경영계획',
      purpose: '연간 학급경영 계획',
      requiredFields: ['학급 목표', '운영 방침', '활동 계획'],
      submissionTo: '학교 보관',
    },
    {
      name: '상담 기록부',
      purpose: '학생/학부모 상담 기록',
      requiredFields: ['일시', '대상', '내용', '후속조치'],
      submissionTo: '학교 보관',
    },
  ],

  relatedDuties: ['교무기획부', '생활지도부', '상담부'],

  externalPartners: [
    { name: 'Wee클래스/센터', contact: '학교/지역', purpose: '학생 상담' },
  ],

  detailedFAQ: [
    {
      id: 'faq-class-1',
      question: '학부모 민원이 왔을 때 어떻게 대응하나요?',
      answer: `
【학부모 민원 대응】

■ 기본 원칙
- 경청하고 공감
- 감정적 대응 X
- 기록 남기기
- 필요시 관리자 보고

■ 대응 절차
1. 충분히 경청
2. 공감 표현 ("불편하셨겠습니다")
3. 사실 확인 ("확인해 보겠습니다")
4. 학교 입장 설명 (필요시)
5. 해결책 협의
6. 후속 조치 안내

■ 주의사항
- 즉답 피하기 (확인 후 연락)
- 혼자 해결 X → 동료/관리자 상의
- 녹음/기록 가능
- 부당한 요구는 정중히 거절

■ 기록 내용
- 민원 일시, 방법
- 민원 내용
- 대응 내용
- 합의/조치 사항
      `,
      category: '학부모 상담',
    },
  ],

  emergencyProcedures: [],

  references: [
    {
      title: '학교생활기록 작성 및 관리지침',
      url: 'https://www.moe.go.kr',
      description: '생활기록부 작성 기준'
    },
  ],

  relatedLaws: [
    {
      name: '초중등교육법',
      article: '제25조',
      content: '학교의 장은 학생의 학업성취도와 인성 등을 종합적으로 관찰·평가하여 학생생활기록부에 기재한다.',
    },
  ],
};

// ========================================
// 15. 상담부 (Wee클래스) - 초상세 버전
// ========================================
export const counselingUltraDetailed: UltraDetailedDutyGuide = {
  id: 'counseling-ultra',
  name: '상담부 (Wee클래스)',
  shortName: '상담',
  category: 'student',
  icon: 'MessageCircle',
  color: 'teal',
  difficulty: 4,

  description: '학생 상담, Wee클래스 운영, 위기학생 지원, 심리검사, 학부모 상담 등을 담당합니다.',

  detailedOverview: `
【상담부 업무 완전 가이드】

■ 부서 개요
상담부는 학생들의 심리·정서적 지원을 담당합니다.
전문상담교사가 배치된 학교는 Wee클래스를 운영하고,
미배치 학교는 담당교사가 상담 업무를 지원합니다.

■ 핵심 업무 영역
1. 학생 상담
   - 개인 상담
   - 집단 상담
   - 위기 상담

2. Wee클래스 운영
   - 상담실 운영
   - 심리검사 실시
   - 상담 프로그램

3. 위기학생 지원
   - 위기학생 발굴
   - 사례 관리
   - 외부 기관 연계

4. 학교적응 지원
   - 학교적응 프로그램
   - 또래상담 운영

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 3월: 상담 계획, Wee클래스 안내, 정서행동특성검사            │
│ 4월: 개인/집단 상담, 위기학생 발굴                          │
│ 5월: 상담 프로그램, 학부모 상담                             │
│ 6월: 1학기 상담 정리, 고위험군 관리                         │
│ 9월: 2학기 상담, 또래상담                                    │
│ 10월: 정서행동특성검사 (2차), 집단 상담                     │
│ 11월: 위기학생 사례회의, 연계 지원                          │
│ 12월: 연간 정리, 차년도 계획                                 │
└─────────────────────────────────────────────────────────────┘
`,

  importance: `
【상담부 업무가 중요한 이유】

1. 학생 정신건강 지원
   - 심리적 어려움 조기 발견
   - 전문적 상담 지원
   - 위기 예방

2. 학교적응 지원
   - 학교생활 적응 도움
   - 또래관계 지원
   - 학습 동기 향상

3. 위기개입
   - 자살/자해 예방
   - 학교폭력 피해 지원
   - 위기상황 개입
`,

  legalBasis: [
    '학교폭력예방법 (상담 관련)',
    '자살예방법',
    '정신건강증진법',
  ],

  requiredSkills: [
    '상담 기법',
    '심리검사 실시/해석',
    '위기개입',
    '사례 관리',
    '학부모 상담',
    '외부 기관 연계',
  ],

  recommendedTraining: [
    '전문상담 연수',
    '위기상담 연수',
    '자살예방 연수',
    '정서행동특성검사 연수',
    '또래상담 지도자 연수',
  ],

  commonChallenges: [
    '상담 대상자 증가',
    '위기학생 관리',
    '비자발적 상담',
    '비밀보장과 보고 사이',
    '학부모 협조',
  ],

  challengeSolutions: {
    '대상자 증가': '집단상담 활용, 우선순위 설정',
    '위기학생': '사례회의, 외부 연계, 관리자 보고',
    '비자발적': '라포 형성, 동기 부여',
    '비밀보장': '고지된 동의, 위기 시 예외 설명',
  },

  successTips: [
    '상담은 비밀보장이 핵심 (위기 시 예외)',
    '위기학생은 혼자 판단 X, 팀 접근',
    '담임교사와 긴밀한 협력',
    '기록은 철저히, 보안은 더 철저히',
    '자기 돌봄도 중요 - 소진 예방',
  ],

  firstYearGuide: `
【처음 상담업무를 맡게 된 선생님께】

■ 가장 먼저 해야 할 것
1. 상담실 (Wee클래스) 환경 점검
2. 전년도 위기학생 명단 인수인계
3. 정서행동특성검사 일정 확인
4. 지역 Wee센터 연락처 확인
5. 위기개입 매뉴얼 숙지

■ 상담의 기본 원칙
- 비밀보장 (위기 시 예외)
- 무조건적 존중
- 공감적 이해
- 자기 결정 존중

■ 정서행동특성검사
- 전학생 대상 (1학기)
- 결과: 관심군, 관심, 일반
- 관심군/우선관리: 추후 관리 (전문기관 연계 포함)

■ 위기학생 관리
- 자살/자해 위험
- 학교폭력 피해
- 심각한 정서/행동 문제
- 가정 위기
→ 즉시 관리자 보고, 사례회의, 전문기관 연계

■ 주의사항
❌ 위기상황 혼자 처리
❌ 비밀보장 약속 후 무조건 지키기 (위기 시 예외)
❌ 상담 기록 미작성
❌ 관심군 학생 방치
`,

  seniorAdvice: [
    '위기학생은 절대 혼자 판단하지 마세요.',
    '담임선생님이랑 소통 잘하세요. 정보 공유가 중요.',
    '상담 기록 꼼꼼히. 나중에 필요해요.',
    '비밀보장은 중요하지만 위기 시 예외. 처음에 안내하세요.',
    '상담하다 보면 저도 힘들어져요. 자기 돌봄 꼭 하세요.',
  ],

  detailedTasks: [
    {
      id: 'counsel-1',
      task: '개인/집단 상담',
      category: 'essential',
      description: '학생 개인 상담, 집단 상담 프로그램',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '주 10시간',
      procedures: [
        {
          step: 1,
          title: '상담 접수',
          description: '상담 신청 접수 (자발/의뢰)',
          tips: ['신청서 접수', '담임 의뢰', '학부모 동의'],
          documents: ['상담 신청서'],
        },
        {
          step: 2,
          title: '초기 면접',
          description: '상담 구조화, 목표 설정',
          tips: ['비밀보장 안내', '상담 동의'],
        },
        {
          step: 3,
          title: '상담 진행',
          description: '정기적 상담 실시',
          tips: ['회기별 목표', '변화 관찰'],
        },
        {
          step: 4,
          title: '상담 기록',
          description: '상담 내용 기록',
          tips: ['매 회기 기록', '보안 유지'],
          documents: ['상담 기록부'],
        },
        {
          step: 5,
          title: '종결/연계',
          description: '상담 종결 또는 전문기관 연계',
          tips: ['종결 평가', '필요시 연계'],
        },
      ],
    },
    {
      id: 'counsel-2',
      task: '정서행동특성검사',
      category: 'essential',
      description: '전학생 정서행동특성검사 실시 및 관리',
      deadline: '4-5월',
      frequency: 'annual',
      estimatedTime: '30시간',
      procedures: [
        {
          step: 1,
          title: '검사 계획',
          description: '검사 일정, 방법 계획',
          tips: ['학부모 동의', '온라인/지면 선택'],
          documents: ['검사 계획'],
        },
        {
          step: 2,
          title: '검사 실시',
          description: '전학생 대상 검사 실시',
          tips: ['안내 철저', '비밀보장'],
        },
        {
          step: 3,
          title: '결과 분석',
          description: '검사 결과 확인, 관심군 파악',
          tips: ['관심군 우선 관리', '담임 안내'],
        },
        {
          step: 4,
          title: '추후 관리',
          description: '관심군/우선관리 학생 상담, 연계',
          tips: ['개별 상담', '전문기관 연계'],
          documents: ['사후관리 계획'],
        },
      ],
    },
    {
      id: 'counsel-3',
      task: '위기학생 관리',
      category: 'essential',
      description: '위기학생 발굴, 사례 관리, 연계',
      deadline: '연중 (즉시)',
      frequency: 'asNeeded',
      estimatedTime: '상황별',
      procedures: [
        {
          step: 1,
          title: '위기학생 발굴',
          description: '위기 징후 학생 발굴',
          tips: ['교사 의뢰', '검사 결과', '직접 관찰'],
        },
        {
          step: 2,
          title: '위기 평가',
          description: '위험 수준 평가',
          tips: ['자살/자해 위험도', '즉각 개입 여부'],
        },
        {
          step: 3,
          title: '관리자 보고',
          description: '위기학생 관리자 보고',
          tips: ['즉시 보고', '조치 협의'],
        },
        {
          step: 4,
          title: '사례회의',
          description: '사례회의 통한 협력',
          tips: ['담임, 관리자, 상담사 참여'],
          documents: ['사례회의록'],
        },
        {
          step: 5,
          title: '전문기관 연계',
          description: '필요시 Wee센터, 정신건강복지센터 등 연계',
          tips: ['보호자 동의', '연계 서류'],
          documents: ['연계 의뢰서'],
        },
      ],
    },
    {
      id: 'counsel-4',
      task: '또래상담 운영',
      category: 'important',
      description: '또래상담자 양성 및 활동 지원',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '월 4시간',
      procedures: [
        {
          step: 1,
          title: '또래상담자 선발',
          description: '또래상담자 모집, 선발',
          tips: ['관심 학생 모집', '담임 추천'],
        },
        {
          step: 2,
          title: '또래상담 교육',
          description: '또래상담자 교육',
          tips: ['경청, 공감 훈련', '비밀보장'],
        },
        {
          step: 3,
          title: '활동 운영',
          description: '또래상담 활동 지원',
          tips: ['정기 모임', '사례 나눔'],
        },
      ],
    },
  ],

  weeklyWorkflow: [
    { week: 1, month: 3, tasks: ['상담 계획', 'Wee클래스 안내'], priority: 'high' },
    { week: 2, month: 4, tasks: ['정서행동특성검사', '개인상담 시작'], priority: 'high' },
    { week: 3, month: 4, tasks: ['검사 결과 분석', '관심군 관리'], priority: 'high' },
    { week: 2, month: 5, tasks: ['상담 프로그램', '학부모 상담'], priority: 'medium' },
    { week: 4, month: 6, tasks: ['1학기 정리', '고위험군 관리'], priority: 'high' },
    { week: 1, month: 9, tasks: ['2학기 상담', '또래상담'], priority: 'medium' },
    { week: 2, month: 10, tasks: ['검사 (2차)', '집단상담'], priority: 'medium' },
    { week: 4, month: 12, tasks: ['연간 정리', '차년도 계획'], priority: 'high' },
  ],

  neisGuide: {
    frequentMenus: [],
    tipsAndTricks: [],
    commonErrors: [],
  },

  documentTemplates: [
    {
      name: '상담 신청서',
      purpose: '상담 신청',
      requiredFields: ['학생정보', '신청사유', '보호자동의'],
      submissionTo: '학교 보관 (보안)',
    },
    {
      name: '상담 기록부',
      purpose: '상담 내용 기록',
      requiredFields: ['일시', '상담내용', '소견', '계획'],
      submissionTo: '학교 보관 (보안)',
    },
    {
      name: '사례회의록',
      purpose: '위기학생 사례회의',
      requiredFields: ['일시', '참석자', '사례내용', '결정사항'],
      submissionTo: '학교 보관 (보안)',
    },
  ],

  relatedDuties: ['생활지도부', '담임업무', '보건부'],

  externalPartners: [
    { name: 'Wee센터', contact: '지역 Wee센터', purpose: '전문상담, 연계' },
    { name: '정신건강복지센터', contact: '지역센터', purpose: '정신건강 지원' },
    { name: '청소년상담복지센터', contact: '1388', purpose: '청소년 상담' },
  ],

  detailedFAQ: [
    {
      id: 'faq-counsel-1',
      question: '학생이 자해 사실을 말했을 때 어떻게 하나요?',
      answer: `
【자해 학생 대응】

■ 즉시 대응
1. 침착하게 경청
2. 판단/비난 X, 공감
3. 현재 안전 상태 확인
4. 자살 의도 확인 (필요시)
5. 비밀보장 예외 안내 (안전을 위해 알려야 함)

■ 보고 및 연계
1. 관리자 즉시 보고
2. 보호자 연락
3. 위험도 평가
4. 필요시 전문기관 연계 (Wee센터, 병원 등)

■ 사후 관리
- 정기 상담
- 담임 협력
- 보호자 소통
- 모니터링

■ 주의
❌ 혼자 처리
❌ 무조건 비밀 유지 약속
❌ "그런 거 하지 마" 식 반응
      `,
      category: '위기상담',
    },
  ],

  emergencyProcedures: [
    {
      situation: '자살/자해 위기',
      immediateActions: [
        '학생 안전 확보',
        '차분하게 경청, 공감',
        '관리자 즉시 보고',
        '보호자 연락',
        '필요시 119/전문기관',
      ],
      reportingChain: ['관리자', '보호자', 'Wee센터/119'],
      documentation: ['위기상담 기록', '사례회의록'],
      followUp: ['정기 상담', '전문기관 연계', '모니터링'],
    },
  ],

  references: [
    {
      title: 'Wee프로젝트',
      url: 'https://www.wee.go.kr',
      description: 'Wee 정보, 연계'
    },
    {
      title: '자살예방상담전화',
      url: '1393',
      description: '24시간 상담'
    },
  ],

  relatedLaws: [
    {
      name: '자살예방 및 생명존중문화 조성을 위한 법률',
      article: '제4조',
      content: '국가 및 지방자치단체는 자살예방정책을 수립·시행하여야 한다.',
    },
  ],
};

// ========================================
// 16. 교육복지부 - 초상세 버전
// ========================================
export const educationWelfareUltraDetailed: UltraDetailedDutyGuide = {
  id: 'education-welfare-ultra',
  name: '교육복지부',
  shortName: '교육복지',
  category: 'support',
  icon: 'Heart',
  color: 'rose',
  difficulty: 3,

  description: '교육복지우선지원사업, 취약계층 학생 지원, 지역연계 등을 담당합니다.',

  detailedOverview: `
【교육복지부 업무 완전 가이드】

■ 부서 개요
교육복지부는 취약계층 학생의 교육 기회 균등을 위해
다양한 지원 사업을 운영합니다.
교육복지사가 배치된 학교에서는 교육복지사가 담당합니다.

■ 핵심 업무 영역
1. 대상자 관리
   - 복지대상학생 발굴
   - 사례 관리

2. 프로그램 운영
   - 학습/문화/정서 지원
   - 방과후 지원

3. 지역 연계
   - 지역사회 자원 연계
   - 복지 기관 협력

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 3월: 대상자 발굴, 지원 계획, 프로그램 개설                   │
│ 4-6월: 프로그램 운영, 사례 관리                              │
│ 7월: 방학 프로그램                                           │
│ 9-11월: 2학기 프로그램, 지역 연계                            │
│ 12월: 연간 정리, 성과 평가                                   │
└─────────────────────────────────────────────────────────────┘
`,

  importance: `
【교육복지업무가 중요한 이유】

1. 교육 형평성
   - 취약계층 교육 기회 보장
   - 교육 격차 해소

2. 전인적 성장
   - 학습, 문화, 정서 통합 지원
   - 건강한 성장 지원

3. 사회 안전망
   - 위기 가정 조기 발견
   - 지역 복지 연계
`,

  legalBasis: [
    '초중등교육법',
    '교육복지우선지원사업 관리·운영에 관한 규정',
  ],

  requiredSkills: [
    '대상자 발굴 및 사례관리',
    '프로그램 기획 운영',
    '지역자원 연계',
    '상담',
  ],

  recommendedTraining: [
    '교육복지 담당자 연수',
    '사례관리 연수',
  ],

  commonChallenges: [
    '대상자 발굴의 어려움',
    '학생/학부모 참여 유도',
    '지역자원 연계',
  ],

  challengeSolutions: {
    '대상자 발굴': '담임 협조, 복지 정보 연계',
    '참여 유도': '흥미로운 프로그램, 인센티브',
    '지역 연계': '적극적 네트워킹, MOU',
  },

  successTips: [
    '담임선생님들과 소통이 핵심',
    '지역 복지관/센터와 친해지세요',
    '학생 눈높이 프로그램',
  ],

  firstYearGuide: `
【처음 교육복지 업무를 맡게 된 선생님께】

■ 가장 먼저 해야 할 것
1. 교육복지 대상학생 명단 확인
2. 지역 복지자원 파악
3. 예산 현황 확인
4. 프로그램 계획

■ 대상학생 발굴 기준
- 기초생활수급자/차상위
- 한부모/조손가정
- 다문화가정
- 기타 복지 지원 필요 학생

■ 지원 영역
- 학습: 학습지원, 멘토링
- 문화체험: 체험활동, 문화 프로그램
- 정서심리: 상담, 치료 연계
- 복지: 급식, 건강, 생활 지원
`,

  seniorAdvice: [
    '담임선생님들이 대상자 발굴의 핵심이에요.',
    '지역 복지관/센터와 좋은 관계 유지하세요.',
    '학생들이 좋아하는 프로그램이 참여율 높아요.',
  ],

  detailedTasks: [
    {
      id: 'welfare-1',
      task: '대상자 발굴 및 관리',
      category: 'essential',
      description: '교육복지 대상학생 발굴, 사례관리',
      deadline: '3월, 연중',
      frequency: 'ongoing',
      estimatedTime: '월 8시간',
      procedures: [
        {
          step: 1,
          title: '대상자 발굴',
          description: '복지 대상학생 발굴',
          tips: ['담임 협조', '복지 정보 연계', '신입생 파악'],
        },
        {
          step: 2,
          title: '욕구 조사',
          description: '학생별 지원 욕구 파악',
          tips: ['면담', '설문'],
        },
        {
          step: 3,
          title: '지원 계획',
          description: '개별 지원 계획 수립',
          documents: ['지원 계획서'],
        },
        {
          step: 4,
          title: '사례 관리',
          description: '정기 모니터링, 지원',
          tips: ['정기 상담', '담임 협력'],
        },
      ],
    },
    {
      id: 'welfare-2',
      task: '프로그램 운영',
      category: 'essential',
      description: '학습/문화/정서 지원 프로그램',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '월 10시간',
      procedures: [
        {
          step: 1,
          title: '프로그램 계획',
          description: '연간 프로그램 계획',
          tips: ['학생 욕구 반영', '예산 확인'],
          documents: ['프로그램 계획'],
        },
        {
          step: 2,
          title: '프로그램 운영',
          description: '학습, 문화, 정서 프로그램 운영',
          tips: ['참여 독려', '안전 관리'],
        },
        {
          step: 3,
          title: '결과 정리',
          description: '프로그램 결과 정리, 평가',
          documents: ['프로그램 결과'],
        },
      ],
    },
  ],

  weeklyWorkflow: [
    { week: 1, month: 3, tasks: ['대상자 발굴', '지원 계획'], priority: 'high' },
    { week: 2, month: 3, tasks: ['프로그램 개설', '지역 연계'], priority: 'high' },
    { week: 4, month: 6, tasks: ['1학기 정리', '방학 프로그램'], priority: 'high' },
    { week: 4, month: 12, tasks: ['연간 정리', '성과 평가'], priority: 'high' },
  ],

  neisGuide: {
    frequentMenus: [],
    tipsAndTricks: [],
    commonErrors: [],
  },

  documentTemplates: [
    {
      name: '교육복지 운영 계획',
      purpose: '연간 운영 계획',
      requiredFields: ['대상', '프로그램', '예산', '일정'],
      submissionTo: '교육청',
    },
  ],

  relatedDuties: ['생활지도부', '상담부', '방과후부'],

  externalPartners: [
    { name: '지역아동센터', contact: '지역', purpose: '연계 지원' },
    { name: '사회복지관', contact: '지역', purpose: '복지 연계' },
    { name: '드림스타트', contact: '주민센터', purpose: '아동 복지' },
  ],

  detailedFAQ: [],
  emergencyProcedures: [],

  references: [],

  relatedLaws: [],
};

export const ultraDetailedDutiesPart6 = [
  characterCareerUltraDetailed,
  libraryUltraDetailed,
  classTeacherUltraDetailed,
  counselingUltraDetailed,
  educationWelfareUltraDetailed,
];
