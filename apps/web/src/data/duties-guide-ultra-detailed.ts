// 초등교사 업무분장 초상세 가이드 - 10배 확장 버전
// 교차검증된 100+ 사이트 기반, 처음 담당해도 완벽 수행 가능

export interface DetailedProcedure {
  step: number;
  title: string;
  description: string;
  tips?: string[];
  warnings?: string[];
  neisPath?: string;
  timeRequired?: string;
  documents?: string[];
}

export interface DetailedTask {
  id: string;
  task: string;
  category: 'essential' | 'important' | 'routine' | 'seasonal';
  description: string;
  legalBasis?: string;
  deadline?: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'biannual' | 'annual' | 'asNeeded' | 'ongoing';
  estimatedTime?: string;
  procedures: DetailedProcedure[];
  commonMistakes?: string[];
  successCriteria?: string[];
  relatedTasks?: string[];
  documents?: string[];
  neisMenus?: string[];
  checklistItems?: string[];
  warnings?: string[];
}

export interface WeeklyTask {
  week: number;
  month: number;
  tasks: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface DetailedFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  relatedQuestions?: string[];
  lastUpdated?: string;
}

export interface EmergencyProcedure {
  situation: string;
  immediateActions: string[];
  reportingChain: string[];
  documentation: string[];
  followUp: string[];
}

export interface UltraDetailedDutyGuide {
  id: string;
  name: string;
  shortName: string;
  category: 'core' | 'support' | 'special' | 'admin' | 'academic' | 'student' | 'class' | 'essential';
  icon: string;
  color: string;
  difficulty: 1 | 2 | 3 | 4 | 5;

  // 기본 정보 (대폭 확장)
  description: string;
  detailedOverview: string;
  importance: string;
  legalBasis: string[];

  // 역량 및 도전과제 (확장)
  requiredSkills: string[];
  recommendedTraining: string[];
  commonChallenges: string[];
  challengeSolutions: Record<string, string>;

  // 성공 가이드
  successTips: string[];
  firstYearGuide: string;
  seniorAdvice: string[];

  // 상세 업무 (대폭 확장)
  detailedTasks: DetailedTask[];

  // 시간별 워크플로우 (주간 단위로 확장)
  weeklyWorkflow: WeeklyTask[];

  // 나이스 가이드 (신규)
  neisGuide: {
    frequentMenus: { path: string; description: string; frequency: string }[];
    tipsAndTricks: string[];
    commonErrors: { error: string; solution: string }[];
  };

  // 문서 양식 (신규)
  documentTemplates: {
    name: string;
    purpose: string;
    requiredFields: string[];
    submissionTo: string;
    deadline?: string;
  }[];

  // 관계 및 협력
  relatedDuties: string[];
  externalPartners: { name: string; contact: string; purpose: string }[];

  // FAQ (대폭 확장)
  detailedFAQ: DetailedFAQ[];

  // 비상 상황 대응 (신규)
  emergencyProcedures: EmergencyProcedure[];

  // 참고자료
  references: { title: string; url: string; description: string }[];
  relatedLaws: { name: string; article: string; content: string }[];
}

// ========================================
// 1. 교무기획부 (교무부) - 초상세 버전
// ========================================
export const academicAffairsUltraDetailed: UltraDetailedDutyGuide = {
  id: 'academic-affairs-ultra',
  name: '교무기획부 (교무부)',
  shortName: '교무',
  category: 'core',
  icon: 'ClipboardList',
  color: 'blue',
  difficulty: 5,

  description: '학교 운영의 핵심 부서로, 학사일정, 교육과정, 학적, 성적 등 학교 전반의 교무행정을 총괄합니다.',

  detailedOverview: `
【교무기획부 완전 가이드】

■ 부서 개요
교무기획부(교무부)는 학교에서 가장 많은 업무와 책임을 담당하는 핵심 부서입니다.
학교의 심장부로서, 모든 교육활동이 원활하게 운영되도록 조율하고 지원합니다.

■ 핵심 업무 영역
1. 학사관리: 학사일정 수립·운영, 수업시수 관리, 휴업일·재량휴업일 관리
2. 학적관리: 입학, 전출입, 휴학, 졸업, 학적변동 처리
3. 성적관리: 평가계획, 성적처리, 성적 관련 민원 대응
4. 생활기록부: 학생부 기재, 점검, 마감, 정정, 보존
5. 위원회 운영: 교무회의, 학업성적관리위원회, 학적심의위원회 등
6. 학교규정: 학칙, 학교규정 제·개정 관리

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 1월: 졸업준비, 신입생 예비소집, 차년도 학사일정           │
│ 2월: 졸업식, 생기부 마감, 학급편성, 담임배정              │
│ 3월: 입학식, 학적정비, 교육계획서 확정, 위원회 구성       │
│ 4월: 학적안정화, 전출입 처리, 1학기 중간점검              │
│ 5월: 학부모 상담주간 지원, 학적관리                        │
│ 6월: 1학기 성적처리 준비, 생기부 중간점검                  │
│ 7월: 1학기 마감, 생기부 1차 마감, 방학 준비                │
│ 8월: 2학기 준비, 전출입 처리, 생기부 점검                  │
│ 9월: 2학기 시작, 학적정비, 교무회의                        │
│ 10월: 학교평가, 교무회의, 졸업대상자 확인                  │
│ 11월: 차년도 계획 준비, 졸업예정자 명단                    │
│ 12월: 2학기 성적, 생기부 최종점검, 차년도 학사일정        │
└─────────────────────────────────────────────────────────────┘

■ 업무량 분포 (월별)
- 최고 업무량: 2월 (졸업, 입학 준비 동시 진행)
- 고업무량: 3월 (신학년 시작), 7월·12월 (학기말 마감)
- 중업무량: 1월, 8월
- 상대적 여유: 4월, 5월, 9월, 10월, 11월

■ 필수 시스템
1. 나이스(NEIS): 모든 학적·성적·생기부 업무의 핵심 시스템
2. 에듀파인: 예산 관련 업무 (교무부 자체 예산 집행 시)
3. 학교알리미: 정보공시 협조
4. 업무포털: 공문 처리
5. K-에듀파인: 교원 급여 관련 (급여담당 협조)

■ 업무 난이도
★★★★★ (최상)
- 학교 전체 일정과 업무에 대한 이해 필요
- 법규 숙지 필수 (초중등교육법, 학생부 기재요령 등)
- 다양한 이해관계자(관리자, 교사, 학부모, 교육청) 조율
- 돌발 상황 대응 능력 필요
`,

  importance: `
【왜 교무기획부가 중요한가】

1. 학교 운영의 컨트롤타워
   - 모든 부서의 업무가 교무부의 학사일정에 맞춰 진행
   - 학교장, 교감의 의사결정을 실무적으로 지원
   - 각 부서 간 업무 조율의 중심

2. 법적 책임이 큰 업무
   - 학교생활기록부는 공문서로서 법적 효력
   - 학적 처리 오류 시 학생의 권익 침해
   - 교육청 감사 시 가장 많이 지적되는 영역

3. 학생·학부모와의 접점
   - 전출입, 휴학, 졸업 등 주요 민원의 창구
   - 생활기록부 관련 문의의 최종 답변자
   - 학교 신뢰도에 직접적 영향

4. 교사 지원 기능
   - 담임교사들의 학적·성적 업무 지원
   - 나이스 시스템 관련 문의 해결
   - 교무행정 관련 정보 제공
`,

  legalBasis: [
    '초·중등교육법 제25조 (학교생활기록)',
    '초·중등교육법 시행령 제21조 (학교생활기록의 작성·관리)',
    '학교생활기록 작성 및 관리지침 (교육부훈령)',
    '초·중등교육법 시행령 제47조 (학년도)',
    '초·중등교육법 시행령 제45조 (수업일수)',
    '초·중등교육법 제31조 (학교운영위원회의 설치)',
  ],

  requiredSkills: [
    '나이스(NEIS) 시스템 능숙한 활용 - 학적, 성적, 생기부 모듈 전체',
    '교육관련 법규 이해 - 초중등교육법, 학생부 기재요령, 학적 관련 지침',
    '문서 작성 및 관리 능력 - 공문, 회의록, 각종 보고서',
    '의사소통 및 조율 능력 - 관리자, 교사, 학부모, 교육청 담당자',
    '꼼꼼한 일정 관리 - 다중 마감일 동시 관리',
    '위기 대응 능력 - 돌발 민원, 시스템 오류, 긴급 공문',
    'Excel/한글 문서 작성 능력 - 통계, 명단 관리, 양식 작성',
    '개인정보보호 인식 - 학생 정보 보호 의무',
  ],

  recommendedTraining: [
    '나이스 학년초·학기말 업무 연수 (필수, 매년)',
    '학교생활기록부 기재요령 연수 (필수, 매년 2월)',
    '학적업무 담당자 연수 (필수, 교육청 주관)',
    '개인정보보호 연수 (필수, 연 1회 이상)',
    '교무업무 시스템 신규기능 연수 (수시)',
    '학교운영위원회 실무 연수 (권장)',
    '문서작성 실무 연수 (권장)',
  ],

  commonChallenges: [
    '학기 초 학적 변동(전출입) 폭주 시 업무 과부하',
    '학교생활기록부 마감 기한 압박과 오류 수정 요청',
    '교육청 공문 처리와 현장 업무의 균형',
    '교사들 간 의견 조율의 어려움 (수업일수, 행사 등)',
    '갑작스러운 학사일정 변경 대응 (천재지변, 감염병 등)',
    '나이스 시스템 오류 시 대처',
    '민원성 학부모 응대 (성적, 생기부 관련)',
    '신규 교사들의 나이스 사용 지원 요청 증가',
  ],

  challengeSolutions: {
    '학기 초 업무 과부하': '2월 중순부터 전출입 예상 명단 파악, 서류 사전 준비, 교무행정사와 역할 분담 명확화',
    '생기부 마감 압박': '마감 3주 전 1차 점검, 2주 전 담임 독촉, 1주 전 최종 점검으로 단계적 관리',
    '나이스 시스템 오류': '오류 발생 시 스크린샷 저장, 나이스 콜센터(1544-0079) 즉시 문의, 시도교육청 담당자 연락',
    '민원성 학부모': '감정적 대응 자제, 관련 규정 근거로 설명, 필요시 관리자 배석 요청',
    '갑작스러운 일정 변경': '대체 일정 시나리오 미리 수립, 관계자 신속 연락망 구축',
  },

  successTips: [
    '연간 학사일정을 미리 수립하고 교직원과 공유 - 12월에 차년도 초안 작성',
    '학적 변동 시즌(2월, 8월)에는 다른 업무 최소화, 학적에 집중',
    '생기부 마감 2주 전부터 담임교사들에게 단계적 리마인드',
    '자주 사용하는 공문 양식을 템플릿화해두면 시간 대폭 절약',
    '교무행정사와 긴밀히 협력 - 업무 분담 명확히, 정기 소통',
    '매월 교무회의 안건을 미리 정리해두면 회의 진행이 수월',
    '나이스 메뉴별 자주 사용하는 경로를 즐겨찾기 등록',
    '학기말 마감 업무는 체크리스트로 관리',
    '교육청 공문 중 정기 공문은 연간 일정표에 미리 기록',
    '전년도 담당자에게 인수인계 철저히 받기',
  ],

  firstYearGuide: `
【처음 교무부를 맡게 된 선생님께】

■ 첫 달(2월) 필수 체크리스트
□ 전년도 담당자와 인수인계 미팅 (최소 2시간)
□ 나이스 권한 확인 및 신청
□ 학교생활기록부 기재요령 최신본 다운로드
□ 학적업무 매뉴얼(시도교육청) 확보
□ 연간 학사일정표 확인
□ 졸업대상자 명단, 신입생 명단 확인
□ 교무실 공용 문서 위치 파악

■ 가장 먼저 해야 할 것
1. 나이스 메뉴 익히기
   - 학적 > 학적관리 > 기본학적관리
   - 학생생활 > 학교생활기록부
   - 학적 > 입학관리, 졸업관리, 전출입관리

2. 주요 마감일 캘린더 등록
   - 생기부 마감일 (1학기: 8월 초, 2학기: 2월 중순)
   - 학교알리미 정보공시 (4월, 9월)
   - 교육통계 (4월)

3. 핵심 연락처 확보
   - 교육청 학적담당 장학사
   - 나이스 콜센터 (1544-0079)
   - 인근 학교 교무담당 선배 교사

■ 절대 실수하면 안 되는 것
❌ 학생부 마감 후 임의 수정 (반드시 정정 절차)
❌ 전출 학생 생기부 미이관
❌ 학적변동 공문 미처리
❌ 개인정보(학생부) 외부 유출
❌ 졸업대상자 명단 오류

■ 도움받을 수 있는 곳
- 교무행정사: 서류 작성, 공문 접수, 일정 관리 지원
- 교감선생님: 주요 의사결정, 민원 대응
- 시도교육청: 매년 나이스 연수, 업무 매뉴얼 제공
- 인근 학교: 선배 교무부장과 네트워크 형성
`,

  seniorAdvice: [
    '2월은 살인적인 업무량입니다. 체력 안배 필수! 주말 근무도 각오하세요.',
    '나이스 권한은 넉넉히 받아두세요. 나중에 권한 없어서 막히면 답답합니다.',
    '생기부 관련 규정은 수시로 바뀝니다. 교육부, 교육청 공지 꼭 챙기세요.',
    '전출입은 당일 처리 원칙! 미루면 서류가 꼬입니다.',
    '교무행정사와 좋은 관계 유지가 업무 효율의 핵심입니다.',
    '담임선생님들 생기부 독촉은 일찍 시작하고 자주 하세요. 막판에 하면 서로 힘듭니다.',
    '마감일 2~3일 전에 미리 끝내는 습관을 들이세요. 항상 돌발상황이 생깁니다.',
    '나이스 메뉴얼과 기재요령은 책상에 항상 두세요. 인쇄해서 빠르게 찾아보기.',
    '학부모 민원은 감정적으로 대응하지 마세요. 규정 근거로 차분하게.',
    '힘들어도 기록은 남기세요. 다음 담당자를 위해, 그리고 분쟁 대비용으로.',
  ],

  detailedTasks: [
    // ========== 필수 업무 (Essential) ==========
    {
      id: 'aa-detailed-1',
      task: '학교교육계획서 수립',
      category: 'essential',
      description: '연간 학교 교육 방향과 세부 계획을 담은 문서 작성. 학교운영위원회 심의를 거쳐 확정.',
      legalBasis: '초·중등교육법 제23조(교육과정 등)',
      deadline: '2월 말',
      frequency: 'annual',
      estimatedTime: '40시간 (각 부서 취합 포함)',
      procedures: [
        {
          step: 1,
          title: '전년도 계획서 분석',
          description: '전년도 교육계획서를 검토하고, 평가 결과를 반영하여 개선점 도출',
          tips: ['평가 지적사항 반드시 반영', '교직원 의견 수렴 결과 참고'],
          timeRequired: '3시간',
        },
        {
          step: 2,
          title: '각 부서 계획 취합',
          description: '각 부서(연구부, 생활부, 체육부 등)에 연간 계획 제출 요청 및 취합',
          tips: ['양식 통일 중요', '마감일 2주 전 독촉'],
          timeRequired: '1주일',
          documents: ['부서별 계획서 양식'],
        },
        {
          step: 3,
          title: '학사일정 초안 작성',
          description: '연간 학사일정표 작성 (행사, 방학, 휴업일 등)',
          tips: ['교육청 학사일정 지침 확인', '지역 행사 일정 고려'],
          timeRequired: '4시간',
          documents: ['학사일정표'],
        },
        {
          step: 4,
          title: '교육계획서 초안 작성',
          description: '수집된 자료를 바탕으로 교육계획서 초안 작성',
          tips: ['목차 체계 일관성 유지', '학교 특색사업 강조'],
          timeRequired: '10시간',
        },
        {
          step: 5,
          title: '관리자 검토',
          description: '교감, 교장선생님께 초안 검토 요청 및 피드백 반영',
          tips: ['충분한 검토 시간 제공 (3일 이상)', '피드백 사항 꼼꼼히 반영'],
          timeRequired: '3일',
        },
        {
          step: 6,
          title: '교직원 의견 수렴',
          description: '전체 교직원에게 계획서 초안 공유 및 의견 수렴',
          tips: ['의견 제출 기한 명시', '건설적 의견 적극 반영'],
          timeRequired: '3일',
        },
        {
          step: 7,
          title: '학운위 심의 요청',
          description: '학교운영위원회에 교육계획서 심의 안건 상정',
          tips: ['심의 1주일 전 자료 배부', '주요 변경사항 설명 준비'],
          documents: ['학운위 심의요청서', '교육계획서'],
          timeRequired: '1주일',
        },
        {
          step: 8,
          title: '최종 확정 및 배포',
          description: '학운위 심의 결과 반영 후 최종본 확정, 교직원 배포 및 홈페이지 게시',
          tips: ['인쇄본 각 교실 비치', 'PDF로 홈페이지 공개'],
          timeRequired: '2일',
        },
      ],
      commonMistakes: [
        '교육청 지침 미반영으로 수정 요청',
        '학사일정에 법정 수업일수 미달',
        '학운위 심의 절차 누락',
        '전년도 내용 그대로 복사 (연도, 통계 오류)',
      ],
      successCriteria: [
        '교육청 지침 100% 반영',
        '학운위 심의 완료',
        '전 교직원 공유 완료',
        '홈페이지 공개 완료',
      ],
      documents: ['학교교육계획서', '학사일정표', '학운위 회의록'],
      neisMenus: ['학교정보-학교교육계획'],
      checklistItems: [
        '교육청 학사운영 지침 확인',
        '법정 수업일수(190일) 충족',
        '각 부서 계획 취합 완료',
        '관리자 검토 완료',
        '학운위 심의 완료',
        '홈페이지 게시 완료',
      ],
    },
    {
      id: 'aa-detailed-2',
      task: '학급편성 및 담임배정',
      category: 'essential',
      description: '신학년도 학급 편성(반 나누기)과 담임교사 배정 업무',
      legalBasis: '초·중등교육법 시행령 제51조(학급수)',
      deadline: '2월 중순',
      frequency: 'annual',
      estimatedTime: '20시간',
      procedures: [
        {
          step: 1,
          title: '학생 현황 파악',
          description: '학년별 학생 수 확정 (졸업, 입학, 전출입 예정 반영)',
          tips: ['나이스 학적 현황 출력', '전입 예정자 파악'],
          neisPath: '학적 > 기본학적관리 > 학적기본사항',
          timeRequired: '2시간',
        },
        {
          step: 2,
          title: '학급수 산정',
          description: '학년별 학급수 결정 (교육청 기준 적용)',
          tips: ['학급당 학생수 기준 확인', '특수학급 포함 여부 확인'],
          timeRequired: '1시간',
          documents: ['학급편성 기준표'],
        },
        {
          step: 3,
          title: '학급편성 원칙 수립',
          description: '반 편성 기준 결정 (성별, 성적, 친구관계 등)',
          tips: ['교사 의견 수렴', '학교폭력 가해·피해학생 분리'],
          timeRequired: '2시간',
        },
        {
          step: 4,
          title: '학급편성 실시',
          description: '원칙에 따라 학생 배치, 나이스에 반영',
          tips: ['복수 검토 필수', '특수학급 학생 통합학급 배치 고려'],
          neisPath: '학적 > 학급관리 > 학급편성',
          timeRequired: '6시간',
          warnings: ['편성 후 수정이 어려우므로 신중하게'],
        },
        {
          step: 5,
          title: '담임배정 희망 조사',
          description: '교사들의 학년·학급 담임 희망 조사',
          tips: ['1, 2, 3지망까지 조사', '특수한 사정 반영'],
          timeRequired: '3일',
          documents: ['담임배정 희망조사서'],
        },
        {
          step: 6,
          title: '담임배정 회의',
          description: '학교장, 교감 주재로 담임배정 회의 개최',
          tips: ['희망 최대한 반영', '경력·성별 균형 고려'],
          timeRequired: '2시간',
        },
        {
          step: 7,
          title: '나이스 등록',
          description: '확정된 담임배정을 나이스에 등록',
          neisPath: '학적 > 학급관리 > 담임배정',
          timeRequired: '1시간',
        },
        {
          step: 8,
          title: '결과 공지',
          description: '담임배정 결과를 전 교직원에게 공지',
          timeRequired: '30분',
        },
      ],
      commonMistakes: [
        '전입 예정 학생 미반영으로 학급 학생수 불균형',
        '학교폭력 관련 학생 같은 반 배치',
        '특정 학년 희망자 부족 시 갈등',
        '나이스 담임 미등록으로 새학기 업무 차질',
      ],
      successCriteria: [
        '학급당 학생수 기준 충족',
        '교사 희망 최대한 반영',
        '나이스 등록 완료',
        '3월 1일 이전 확정',
      ],
      documents: ['학급편성표', '담임배정표', '희망조사서'],
      neisMenus: ['학적-학급관리-학급편성', '학적-학급관리-담임배정'],
    },
    {
      id: 'aa-detailed-3',
      task: '신입생 입학업무',
      category: 'essential',
      description: '신입생(1학년) 입학 관련 전체 업무 - 예비소집, 서류접수, 입학식',
      legalBasis: '초·중등교육법 제13조(취학의무)',
      deadline: '1월(예비소집), 3월 초(입학식)',
      frequency: 'annual',
      estimatedTime: '30시간',
      procedures: [
        {
          step: 1,
          title: '취학아동명부 확인',
          description: '관할 읍면동에서 통보받은 취학아동명부 확인',
          tips: ['11월경 행정복지센터에서 통보', '누락자 확인 필수'],
          timeRequired: '2시간',
          documents: ['취학아동명부'],
        },
        {
          step: 2,
          title: '입학안내문 발송',
          description: '예비소집 안내문 작성 및 발송',
          tips: ['일시, 장소, 준비물 명확히', '취학유예 안내 포함'],
          timeRequired: '3시간',
          documents: ['예비소집 안내문'],
        },
        {
          step: 3,
          title: '예비소집 준비',
          description: '예비소집 행사 준비 (장소, 자료, 인력)',
          tips: ['학교 소개 자료 준비', '학부모 안내 동선 확인'],
          timeRequired: '4시간',
        },
        {
          step: 4,
          title: '예비소집 실시',
          description: '학생·학부모 대상 오리엔테이션, 서류 접수',
          tips: ['예방접종증명서, 등본 접수', '미참석자 개별 연락'],
          timeRequired: '반나절',
          documents: ['입학원서', '예방접종증명서', '주민등록등본'],
        },
        {
          step: 5,
          title: '취학유예 처리',
          description: '취학유예 신청자 서류 검토 및 처리',
          tips: ['의사소견서 등 증빙 확인', '학교장 결재'],
          neisPath: '학적 > 입학관리 > 취학유예관리',
          timeRequired: '2시간',
        },
        {
          step: 6,
          title: '나이스 학적 생성',
          description: '신입생 학적 일괄 생성',
          neisPath: '학적 > 입학관리 > 신입생관리',
          timeRequired: '4시간',
          warnings: ['오타 주의, 생성 후 수정 복잡'],
        },
        {
          step: 7,
          title: '입학식 준비',
          description: '입학식 행사 계획 및 준비',
          tips: ['식순 작성', '내빈 초청', '기념품 준비'],
          timeRequired: '5시간',
          documents: ['입학식 계획', '식순'],
        },
        {
          step: 8,
          title: '입학식 진행',
          description: '입학식 당일 행사 진행',
          timeRequired: '2시간',
        },
        {
          step: 9,
          title: '학적 최종 확정',
          description: '입학 후 학적 확정 처리',
          neisPath: '학적 > 입학관리 > 입학처리',
          timeRequired: '2시간',
        },
      ],
      commonMistakes: [
        '취학아동명부 누락자 미확인',
        '예비소집 미참석자 추적 미흡',
        '취학유예 처리 지연',
        '학적 생성 시 성명, 생년월일 오류',
      ],
      successCriteria: [
        '모든 취학아동 입학 완료',
        '취학유예 정상 처리',
        '나이스 학적 생성 완료',
        '입학식 원활히 진행',
      ],
      documents: ['취학아동명부', '입학원서', '예방접종증명서', '입학식 계획'],
      neisMenus: ['학적-입학관리-신입생관리', '학적-입학관리-취학유예관리', '학적-입학관리-입학처리'],
    },
    {
      id: 'aa-detailed-4',
      task: '전출입 학생 처리',
      category: 'essential',
      description: '학기 중 전입 및 전출 학생의 학적 서류 처리',
      deadline: '발생 시 즉시',
      frequency: 'asNeeded',
      estimatedTime: '전입 1시간, 전출 30분 (1건당)',
      procedures: [
        {
          step: 1,
          title: '[전입] 전입신청서 접수',
          description: '학부모로부터 전입신청서 및 구비서류 접수',
          tips: ['전 학교 통보 확인', '주민등록등본 확인'],
          timeRequired: '15분',
          documents: ['전입학신청서', '주민등록등본'],
        },
        {
          step: 2,
          title: '[전입] 나이스 전입 처리',
          description: '나이스에서 전입 처리, 전 학교에서 보낸 자료 접수',
          neisPath: '학적 > 전출입관리 > 전입학처리',
          tips: ['생기부 이관 확인 필수', '건강기록부 이관 확인'],
          timeRequired: '20분',
          warnings: ['전 학교 마감 전까지 이관 요청'],
        },
        {
          step: 3,
          title: '[전입] 학급 배치',
          description: '전입 학생 학급 배치 결정 및 담임 안내',
          tips: ['학교폭력 이력 확인', '학급 균형 고려'],
          timeRequired: '15분',
        },
        {
          step: 4,
          title: '[전출] 전출신청 접수',
          description: '학부모로부터 전출 신청 접수',
          tips: ['전입 학교 확인', '전출 사유 확인'],
          timeRequired: '10분',
          documents: ['전출신청서'],
        },
        {
          step: 5,
          title: '[전출] 담임 안내',
          description: '담임교사에게 전출 학생 안내, 생기부 점검 요청',
          tips: ['생기부 기재 완료 확인', '미반납 도서 등 확인'],
          timeRequired: '5분',
        },
        {
          step: 6,
          title: '[전출] 나이스 전출 처리',
          description: '나이스에서 전출 처리, 생기부 및 건강기록부 이관',
          neisPath: '학적 > 전출입관리 > 전출학처리',
          tips: ['전입 학교에서 접수할 때까지 확인'],
          timeRequired: '15분',
        },
      ],
      commonMistakes: [
        '생기부 이관 전 마감으로 기록 손실',
        '건강기록부 이관 누락',
        '전출입 공문 미처리',
        '학교폭력 관련 학생 정보 미전달',
      ],
      successCriteria: [
        '당일 처리 원칙 준수',
        '생기부/건강기록부 이관 완료',
        '담임교사 안내 완료',
      ],
      documents: ['전입학신청서', '전출학통지서', '주민등록등본'],
      neisMenus: ['학적-전출입관리-전입학처리', '학적-전출입관리-전출학처리'],
    },
    {
      id: 'aa-detailed-5',
      task: '학교생활기록부 마감',
      category: 'essential',
      description: '학기별 학교생활기록부 최종 점검 및 마감 처리',
      legalBasis: '학교생활기록 작성 및 관리지침',
      deadline: '1학기: 8월 초, 2학기: 2월 중순',
      frequency: 'biannual',
      estimatedTime: '40시간',
      procedures: [
        {
          step: 1,
          title: '마감 일정 안내',
          description: '전 교원에게 생기부 마감 일정 및 주의사항 안내',
          tips: ['마감 3주 전 1차 안내', '매주 리마인드'],
          timeRequired: '30분',
          documents: ['생기부 마감 안내문'],
        },
        {
          step: 2,
          title: '기재요령 연수',
          description: '교원 대상 생기부 기재요령 안내 (주요 변경사항)',
          tips: ['올해 변경된 기재요령 중점 안내'],
          timeRequired: '1시간',
        },
        {
          step: 3,
          title: '1차 점검 실시',
          description: '마감 2주 전 각 학년/학급 생기부 1차 점검',
          tips: ['학년부장 협조', '주요 오류 유형 체크'],
          neisPath: '학생생활 > 학교생활기록부 > 자료반영확인',
          timeRequired: '8시간',
        },
        {
          step: 4,
          title: '오류 수정 안내',
          description: '1차 점검 결과 오류 사항 담임교사에게 개별 안내',
          tips: ['오류 내용과 수정 방법 구체적 안내'],
          timeRequired: '4시간',
        },
        {
          step: 5,
          title: '2차 점검 실시',
          description: '마감 1주 전 오류 수정 확인 및 2차 점검',
          tips: ['여전히 미수정 건 직접 독촉'],
          timeRequired: '6시간',
        },
        {
          step: 6,
          title: '최종 점검',
          description: '마감일 전날 최종 전수 점검',
          tips: ['오탈자, 특수문자, 띄어쓰기 등'],
          timeRequired: '8시간',
        },
        {
          step: 7,
          title: '마감 처리',
          description: '나이스에서 생기부 마감 처리',
          neisPath: '학생생활 > 학교생활기록부 > 마감처리',
          tips: ['마감 후 수정은 정정 절차 필요'],
          timeRequired: '1시간',
          warnings: ['마감 후에는 수정이 매우 어려움'],
        },
        {
          step: 8,
          title: '마감 결과 보고',
          description: '마감 완료 결과 관리자 보고',
          timeRequired: '30분',
        },
      ],
      commonMistakes: [
        '금지어 사용 (예: 우수하다, 뛰어나다 등 판단어)',
        '개인정보 기재 (친구 이름, 구체적 주소 등)',
        '수치 오류 (교과 시수, 출결 등)',
        '미기재 항목 (특히 창체, 행동특성)',
        '마감 후 수정 요청으로 행정 부담',
      ],
      successCriteria: [
        '전 학생 생기부 기재 완료',
        '오류 0건',
        '예정일 내 마감',
      ],
      documents: ['생기부 점검표', '기재요령'],
      neisMenus: ['학생생활-학교생활기록부-자료반영확인', '학생생활-학교생활기록부-마감처리'],
      checklistItems: [
        '인적사항 정확성',
        '학적사항 (입학, 전출입 등) 정확성',
        '출결 일수 정확성 (수업일수와 일치)',
        '수상경력 기재 적정성',
        '창의적체험활동 시수 및 특기사항',
        '교과학습발달상황 (성취도, 특기사항)',
        '행동특성 및 종합의견 기재',
        '금지어, 부적절한 표현 없음',
        '띄어쓰기, 맞춤법 점검',
      ],
    },
    {
      id: 'aa-detailed-6',
      task: '졸업 및 수료 처리',
      category: 'essential',
      description: '6학년 졸업대상자 확정, 졸업식 준비, 생기부 최종 마감, 학적 졸업처리',
      legalBasis: '초·중등교육법 제26조(졸업 등)',
      deadline: '2월 중순',
      frequency: 'annual',
      estimatedTime: '30시간',
      procedures: [
        {
          step: 1,
          title: '졸업대상자 확정',
          description: '6학년 졸업대상자 명단 확정 (수업일수 충족 확인)',
          tips: ['장기결석 학생 수료 여부 검토', '유예 대상자 확인'],
          neisPath: '학적 > 졸업관리 > 졸업대상자관리',
          timeRequired: '3시간',
        },
        {
          step: 2,
          title: '졸업생 생기부 최종 점검',
          description: '졸업생 학교생활기록부 최종 점검 및 마감',
          tips: ['6년간 기록 전체 점검', '졸업 후 정정 어려움'],
          timeRequired: '10시간',
        },
        {
          step: 3,
          title: '졸업장 작성',
          description: '졸업장 양식 확인, 출력 및 준비',
          tips: ['학교장 직인 날인', '오탈자 이중 확인'],
          timeRequired: '3시간',
          documents: ['졸업장'],
        },
        {
          step: 4,
          title: '졸업식 준비',
          description: '졸업식 계획 수립, 장소 준비, 식순 작성',
          tips: ['내빈 초청', '학부모 참석 안내', '기념품 준비'],
          timeRequired: '8시간',
          documents: ['졸업식 계획', '식순', '졸업앨범'],
        },
        {
          step: 5,
          title: '졸업식 진행',
          description: '졸업식 당일 행사 진행',
          tips: ['사진 촬영', '졸업장 및 앨범 배부'],
          timeRequired: '3시간',
        },
        {
          step: 6,
          title: '나이스 졸업처리',
          description: '나이스에서 졸업 처리 실행',
          neisPath: '학적 > 졸업관리 > 졸업처리',
          tips: ['졸업일자 정확히', '처리 후 복원 어려움'],
          timeRequired: '2시간',
          warnings: ['졸업처리 후에는 수정 불가'],
        },
        {
          step: 7,
          title: '졸업대장 관리',
          description: '졸업대장 출력 및 영구 보존',
          tips: ['5년 이상 보존', '훼손 방지'],
          timeRequired: '1시간',
          documents: ['졸업대장'],
        },
      ],
      commonMistakes: [
        '졸업대상자 명단 오류 (유급, 유예 대상자 혼동)',
        '생기부 미마감 상태에서 졸업처리',
        '졸업장 성명 오타',
        '졸업일자 오류',
      ],
      successCriteria: [
        '전 졸업생 정상 졸업처리',
        '생기부 마감 완료',
        '졸업식 원활히 진행',
        '졸업대장 영구보존 완료',
      ],
      documents: ['졸업대장', '졸업장', '졸업식 계획'],
      neisMenus: ['학적-졸업관리-졸업대상자관리', '학적-졸업관리-졸업처리'],
    },

    // ========== 중요 업무 (Important) ==========
    {
      id: 'aa-detailed-7',
      task: '교무회의 운영',
      category: 'important',
      description: '정기 교무회의 및 임시회의 안건 준비, 진행 지원, 회의록 작성',
      deadline: '월 1회 이상',
      frequency: 'monthly',
      estimatedTime: '4시간/회',
      procedures: [
        {
          step: 1,
          title: '안건 수합',
          description: '각 부서에서 교무회의 안건 수합',
          tips: ['회의 1주일 전 마감', '긴급안건은 별도 접수'],
          timeRequired: '1시간',
        },
        {
          step: 2,
          title: '안건 정리',
          description: '수합된 안건 정리, 회의 자료 작성',
          tips: ['중요도 순 배치', '필요 자료 첨부'],
          timeRequired: '1시간',
          documents: ['교무회의 안건'],
        },
        {
          step: 3,
          title: '사전 배포',
          description: '회의 전 교직원에게 안건 사전 배포',
          tips: ['최소 3일 전 배포', '검토 요청'],
          timeRequired: '30분',
        },
        {
          step: 4,
          title: '회의 진행 지원',
          description: '회의 당일 진행 지원 (출석체크, 자료 배포 등)',
          timeRequired: '1시간',
        },
        {
          step: 5,
          title: '회의록 작성',
          description: '회의 내용 기록 및 회의록 작성',
          tips: ['결정사항 명확히 기록', '참석자 서명'],
          timeRequired: '30분',
          documents: ['교무회의록'],
        },
      ],
      documents: ['교무회의 안건', '교무회의록'],
    },
    {
      id: 'aa-detailed-8',
      task: '학적 관련 증명서 발급',
      category: 'routine',
      description: '재학증명서, 졸업증명서, 성적증명서 등 발급 업무',
      deadline: '신청 시 즉시',
      frequency: 'asNeeded',
      estimatedTime: '10분/건',
      procedures: [
        {
          step: 1,
          title: '신청 접수',
          description: '증명서 발급 신청 접수',
          tips: ['본인확인 필수', '용도 확인'],
          timeRequired: '2분',
        },
        {
          step: 2,
          title: '나이스 발급',
          description: '나이스에서 해당 증명서 발급 출력',
          neisPath: '학적 > 제증명관리 > 제증명발급',
          timeRequired: '5분',
        },
        {
          step: 3,
          title: '발급 대장 기록',
          description: '증명서 발급 대장에 기록',
          timeRequired: '2분',
          documents: ['증명서발급대장'],
        },
        {
          step: 4,
          title: '수수료 징수 (해당시)',
          description: '수수료가 있는 경우 징수',
          tips: ['졸업생 영문증명서 등 유료'],
          timeRequired: '1분',
        },
      ],
      documents: ['증명서발급대장', '각종 증명서'],
      neisMenus: ['학적-제증명관리-제증명발급'],
    },
  ],

  weeklyWorkflow: [
    // 1월
    { week: 1, month: 1, tasks: ['신입생 예비소집 최종 준비', '취학아동명부 최종 확인'], priority: 'high' },
    { week: 2, month: 1, tasks: ['신입생 예비소집 실시', '미참석자 연락', '취학유예 접수'], priority: 'high' },
    { week: 3, month: 1, tasks: ['졸업예정자 명단 확정', '차년도 학사일정 초안'], priority: 'high' },
    { week: 4, month: 1, tasks: ['졸업생 생기부 점검 시작', '학급편성 준비'], priority: 'high' },

    // 2월
    { week: 1, month: 2, tasks: ['졸업생 생기부 최종 점검', '학급편성 원칙 수립'], priority: 'high' },
    { week: 2, month: 2, tasks: ['졸업식 준비', '담임배정 희망조사', '생기부 마감 독촉'], priority: 'high' },
    { week: 3, month: 2, tasks: ['졸업식', '생기부 최종 마감', '담임배정 회의'], priority: 'high' },
    { week: 4, month: 2, tasks: ['신학년 학급편성 확정', '교육계획서 확정', '입학식 준비'], priority: 'high' },

    // 3월
    { week: 1, month: 3, tasks: ['입학식', '신입생 학적 생성', '담임배정 나이스 등록'], priority: 'high' },
    { week: 2, month: 3, tasks: ['학적 정비', '전입학생 처리', '각종 위원회 구성'], priority: 'high' },
    { week: 3, month: 3, tasks: ['교무회의', '학교교육계획서 배포', '학적 안정화'], priority: 'medium' },
    { week: 4, month: 3, tasks: ['정보공시 준비', '학적 최종 확인'], priority: 'medium' },

    // 4월
    { week: 1, month: 4, tasks: ['학교알리미 1차 공시', '교육통계 작성'], priority: 'high' },
    { week: 2, month: 4, tasks: ['전출입 처리', '학적 관리'], priority: 'medium' },
    { week: 3, month: 4, tasks: ['교무회의', '학적 관리'], priority: 'medium' },
    { week: 4, month: 4, tasks: ['1학기 중간 점검', '학적 관리'], priority: 'low' },

    // 5월
    { week: 1, month: 5, tasks: ['학부모 상담주간 지원', '교무회의 준비'], priority: 'medium' },
    { week: 2, month: 5, tasks: ['학부모 상담주간', '학적 관리'], priority: 'medium' },
    { week: 3, month: 5, tasks: ['교무회의', '학적 관리'], priority: 'low' },
    { week: 4, month: 5, tasks: ['학적 관리', '다음달 준비'], priority: 'low' },

    // 6월
    { week: 1, month: 6, tasks: ['1학기 성적처리 안내', '교무회의 준비'], priority: 'medium' },
    { week: 2, month: 6, tasks: ['교무회의', '생기부 기재 안내'], priority: 'medium' },
    { week: 3, month: 6, tasks: ['생기부 중간 점검', '학적 관리'], priority: 'medium' },
    { week: 4, month: 6, tasks: ['1학기 마무리 준비', '생기부 점검'], priority: 'high' },

    // 7월
    { week: 1, month: 7, tasks: ['1학기 성적 마감', '생기부 1차 점검'], priority: 'high' },
    { week: 2, month: 7, tasks: ['생기부 오류 수정', '마감 독촉'], priority: 'high' },
    { week: 3, month: 7, tasks: ['생기부 최종 점검', '1학기 마감 처리'], priority: 'high' },
    { week: 4, month: 7, tasks: ['방학 시작', '2학기 준비', '전출입 처리'], priority: 'medium' },

    // 8월
    { week: 1, month: 8, tasks: ['방학 중 학적 관리', '2학기 준비'], priority: 'low' },
    { week: 2, month: 8, tasks: ['전출입 처리 (이사철)', '2학기 준비'], priority: 'high' },
    { week: 3, month: 8, tasks: ['2학기 학급 조정', '신규 전입생 학적 생성'], priority: 'high' },
    { week: 4, month: 8, tasks: ['2학기 시작 준비', '학적 최종 점검'], priority: 'high' },

    // 9월
    { week: 1, month: 9, tasks: ['2학기 시작', '학적 정비', '학교알리미 2차 공시 준비'], priority: 'high' },
    { week: 2, month: 9, tasks: ['학교알리미 공시', '전출입 처리'], priority: 'high' },
    { week: 3, month: 9, tasks: ['교무회의', '학적 관리'], priority: 'medium' },
    { week: 4, month: 9, tasks: ['학적 안정화', '다음달 준비'], priority: 'low' },

    // 10월
    { week: 1, month: 10, tasks: ['학교평가 준비', '교무회의 준비'], priority: 'medium' },
    { week: 2, month: 10, tasks: ['학교평가 자료 제출', '교무회의'], priority: 'medium' },
    { week: 3, month: 10, tasks: ['졸업대상자 예비 명단', '학적 관리'], priority: 'medium' },
    { week: 4, month: 10, tasks: ['차년도 교육계획 준비 시작', '학적 관리'], priority: 'low' },

    // 11월
    { week: 1, month: 11, tasks: ['차년도 학사일정 초안', '졸업대상자 확인'], priority: 'medium' },
    { week: 2, month: 11, tasks: ['교무회의', '차년도 계획 준비'], priority: 'medium' },
    { week: 3, month: 11, tasks: ['차년도 교육계획 각 부서 취합', '학적 관리'], priority: 'medium' },
    { week: 4, month: 11, tasks: ['졸업앨범 명단 확인', '12월 준비'], priority: 'medium' },

    // 12월
    { week: 1, month: 12, tasks: ['2학기 성적처리 안내', '생기부 기재 독촉'], priority: 'high' },
    { week: 2, month: 12, tasks: ['교무회의', '차년도 학사일정 확정'], priority: 'high' },
    { week: 3, month: 12, tasks: ['생기부 중간 점검', '성적 처리'], priority: 'high' },
    { week: 4, month: 12, tasks: ['2학기 마감 준비', '방학 전 점검'], priority: 'high' },
  ],

  neisGuide: {
    frequentMenus: [
      { path: '학적 > 기본학적관리 > 학적기본사항', description: '학생 기본 정보 조회/수정', frequency: '매일' },
      { path: '학적 > 전출입관리 > 전입학처리', description: '전입 학생 처리', frequency: '수시' },
      { path: '학적 > 전출입관리 > 전출학처리', description: '전출 학생 처리', frequency: '수시' },
      { path: '학생생활 > 학교생활기록부 > 자료반영확인', description: '생기부 기재 현황 점검', frequency: '학기말' },
      { path: '학생생활 > 학교생활기록부 > 마감처리', description: '생기부 마감', frequency: '학기말' },
      { path: '학적 > 학급관리 > 학급편성', description: '학년초 학급 편성', frequency: '연 1회' },
      { path: '학적 > 학급관리 > 담임배정', description: '담임교사 배정', frequency: '연 1회' },
      { path: '학적 > 입학관리 > 신입생관리', description: '신입생 학적 생성', frequency: '연 1회' },
      { path: '학적 > 졸업관리 > 졸업처리', description: '졸업 처리', frequency: '연 1회' },
      { path: '학적 > 제증명관리 > 제증명발급', description: '각종 증명서 발급', frequency: '수시' },
    ],
    tipsAndTricks: [
      '자주 사용하는 메뉴는 즐겨찾기 등록',
      '학적 변경 전 반드시 현재 상태 스크린샷 저장',
      '대량 처리 전 테스트 계정으로 먼저 확인',
      '마감 처리 전 반드시 백업',
      '오류 발생 시 로그아웃 후 재로그인',
      '브라우저 캐시 주기적 삭제',
    ],
    commonErrors: [
      { error: '세션 만료 오류', solution: '재로그인 후 작업 재시도, 작업 중간 저장 생활화' },
      { error: '권한 없음 오류', solution: '학교 관리자에게 해당 메뉴 권한 요청' },
      { error: '데이터 저장 실패', solution: '필수 입력 항목 확인, 특수문자 제거 후 재시도' },
      { error: '전출입 처리 불가', solution: '상대 학교 마감 여부 확인, 교육청 문의' },
      { error: '생기부 마감 불가', solution: '미기재 항목 확인, 오류 항목 수정 후 재시도' },
    ],
  },

  documentTemplates: [
    {
      name: '학교교육계획서',
      purpose: '연간 학교 교육 운영 계획 수립',
      requiredFields: ['학교현황', '교육목표', '교육과정', '학사일정', '부서별 계획'],
      submissionTo: '교육청 (필요시)',
      deadline: '2월 말',
    },
    {
      name: '전입학신청서',
      purpose: '타 학교에서 전입하는 학생 신청서',
      requiredFields: ['학생 인적사항', '전학 사유', '보호자 정보', '이전 학교'],
      submissionTo: '학교 보관',
    },
    {
      name: '취학유예신청서',
      purpose: '입학 연기 신청',
      requiredFields: ['학생 정보', '유예 사유', '증빙서류', '보호자 서명'],
      submissionTo: '학교장',
      deadline: '1월 말',
    },
    {
      name: '교무회의록',
      purpose: '교무회의 내용 기록',
      requiredFields: ['일시', '참석자', '안건', '결정사항', '서명'],
      submissionTo: '학교 보관',
    },
    {
      name: '학교생활기록부 정정대장',
      purpose: '생기부 정정 이력 관리',
      requiredFields: ['학생정보', '정정항목', '정정 전후 내용', '정정사유', '결재'],
      submissionTo: '학교 보관',
    },
  ],

  relatedDuties: ['연구부', '학년부', '정보부', '학교운영위원회'],

  externalPartners: [
    { name: '교육청 학적담당', contact: '교육청 대표번호', purpose: '학적 관련 지침, 민원, 특수사안 협의' },
    { name: '나이스 콜센터', contact: '1544-0079', purpose: '나이스 시스템 오류, 사용법 문의' },
    { name: '학교알리미', contact: 'www.schoolinfo.go.kr', purpose: '정보공시 관련' },
    { name: '인근 학교 교무담당', contact: '학교별 상이', purpose: '전출입 협조, 업무 노하우 공유' },
  ],

  detailedFAQ: [
    {
      id: 'faq-aa-1',
      question: '학기 중 전입 온 학생의 생기부는 어떻게 처리하나요?',
      answer: `
【전입생 생기부 처리 절차】

1. 전입 처리 시 나이스에서 자동으로 생기부가 이관됩니다.
2. 이관 후 담임교사가 학생 정보 확인합니다.
3. 이전 학교 기록은 그대로 유지됩니다.
4. 전입 이후 활동만 현 담임이 기재합니다.
5. 특기사항에 "○월 ○일 ○○학교에서 전입"이 자동 기재됩니다.

※ 주의사항
- 이전 학교 기록은 수정할 수 없습니다.
- 이관이 안 된 경우 전 학교 교무담당에게 확인하세요.
- 건강기록부도 별도로 이관 확인이 필요합니다.
      `,
      category: '전출입',
      relatedQuestions: ['전출 처리는 어떻게 하나요?', '건강기록부 이관은?'],
    },
    {
      id: 'faq-aa-2',
      question: '생기부 정정은 언제까지 가능한가요?',
      answer: `
【생기부 정정 가이드】

■ 정정 가능 시기
- 재학 중: 학기 마감 전까지 자유롭게 수정 가능
- 마감 후: 정정대장 작성, 학교장 결재 후 정정 가능
- 졸업 후: 정정 가능하나 절차가 복잡 (교육청 협조 필요)

■ 정정 절차 (마감 후)
1. 정정사유서 작성
2. 증빙자료 첨부 (필요시)
3. 학교생활기록부정정대장 작성
4. 학교장 결재
5. 나이스에서 정정 처리

■ 정정 가능 항목
- 오타, 사실과 다른 내용, 부적절한 표현 등
- 단, 평가 결과 자체는 정정 불가 (성적, 출결 등은 별도 절차)

■ 권고사항
- 가능하면 재학 중, 마감 전에 수정하세요.
- 매 학기 마감 전 오류를 철저히 점검하세요.
- 졸업생 정정은 매우 번거로우니 사전 예방이 중요합니다.
      `,
      category: '학교생활기록부',
    },
    {
      id: 'faq-aa-3',
      question: '취학유예 신청은 어떻게 처리하나요?',
      answer: `
【취학유예 처리 절차】

■ 대상
- 질병 등 부득이한 사유로 취학이 어려운 아동
- 보호자가 신청, 학교장이 승인

■ 신청 서류
1. 취학유예신청서 (학교 양식)
2. 의사소견서 또는 진단서
3. 기타 증빙서류

■ 처리 절차
1. 보호자 → 학교: 신청서 및 증빙서류 제출
2. 학교: 서류 검토
3. 학교장: 승인 여부 결정
4. 학교 → 보호자: 결과 통보
5. 나이스: 취학유예 처리
6. 다음 해: 재취학 관리

■ 나이스 처리
- 학적 > 입학관리 > 취학유예관리
- 유예 기간, 사유 입력
- 다음 연도 재취학 관리 필수

■ 유의사항
- 유예 기간은 최대 1년 (연장 가능)
- 다음 해 입학 시 재취학 처리 필요
- 유예 중에도 학적 관리 계속
      `,
      category: '입학',
    },
    {
      id: 'faq-aa-4',
      question: '수업일수 부족으로 졸업이 안 되는 학생은 어떻게 하나요?',
      answer: `
【수업일수 부족 학생 처리】

■ 졸업 기준
- 법정 수업일수(190일)의 2/3 이상 출석 필요
- 약 127일 이상 출석해야 졸업 가능

■ 부족 시 선택지
1. 유급 (원칙)
   - 해당 학년 재이수
   - 나이스에서 유급 처리

2. 수료 (예외적)
   - 수료증 발급
   - 상급학교 진학은 가능 (학교장 판단)

3. 출석인정 검토
   - 질병, 경조사 등 출석인정 사유 재확인
   - 누락된 출석인정 건이 있는지 점검

■ 처리 절차
1. 학적심의위원회 개최
2. 출석 현황 검토
3. 유급/수료 결정
4. 학부모 통보 및 상담
5. 나이스 처리

■ 나이스 경로
- 학적 > 졸업관리 > 졸업대상자관리
- 졸업/수료/유급 구분 선택

■ 유의사항
- 학부모와 충분한 상담 필요
- 학적심의위원회 회의록 보관
- 이의제기 대비 근거자료 철저히
      `,
      category: '졸업',
    },
    {
      id: 'faq-aa-5',
      question: '학급편성 시 고려해야 할 사항은?',
      answer: `
【학급편성 고려사항 체크리스트】

■ 필수 고려사항
□ 학급당 학생수 기준 준수
□ 남녀 비율 균형 (남녀공학 시)
□ 학교폭력 관련 학생 분리
□ 특수학급 학생 통합학급 배치
□ 쌍둥이 희망(같은 반/다른 반) 반영

■ 권장 고려사항
□ 리더십 있는 학생 분산 배치
□ 또래 갈등 관계 분리
□ 학력 수준 균형
□ 돌봄/방과후 참여 학생 고려
□ 통학 구역 고려 (학교 행사 시)

■ 편성 방법
1. 담임/학년부장 의견 수렴
2. 학교폭력 관련 학생 명단 확인 (생활지도부)
3. 특수학급 학생 배치 협의 (특수교사)
4. 초안 작성 후 검토
5. 관리자 결재
6. 나이스 등록

■ 편성 후 변경
- 원칙적으로 불가
- 불가피한 경우 학교장 결재 후 변경
- 변경 사유 기록 보관

■ 공개 시기
- 입학식/개학식 당일 또는 전날
- 사전 유출 주의 (민원 요소)
      `,
      category: '학급편성',
    },
    {
      id: 'faq-aa-6',
      question: '나이스 학적 권한은 어떻게 받나요?',
      answer: `
【나이스 권한 신청 가이드】

■ 권한 신청 절차
1. 나이스 로그인
2. 환경설정 > 사용자권한관리 > 신규권한신청
3. 필요한 권한 항목 선택
4. 학교 관리자(교감/정보부장)가 승인

■ 교무부 필수 권한
- 학적 > 전체
- 학생생활 > 학교생활기록부
- 제증명 > 제증명발급
- 교육과정 > 기본 (필요시)

■ 권한 유형
- 조회권한: 데이터 열람만 가능
- 입력권한: 데이터 입력/수정 가능
- 관리권한: 마감/승인 등 관리 기능

■ 주의사항
- 업무에 필요한 최소 권한만 신청
- 개인정보 포함 권한은 신중하게
- 인사이동 시 권한 반납 필요
- 권한 공유 절대 금지

■ 문제 발생 시
- 학교 나이스 담당자에게 문의
- 교육청 나이스 담당 부서 문의
- 나이스 콜센터: 1544-0079
      `,
      category: '나이스',
    },
    {
      id: 'faq-aa-7',
      question: '담임배정은 어떤 기준으로 하나요?',
      answer: `
【담임배정 기준 및 절차】

■ 일반적인 배정 기준
1. 교사 희망 (1, 2, 3지망)
2. 순환 원칙 (같은 학년 연속 배정 지양)
3. 경력 및 전문성
4. 학년별 성별 균형
5. 특수한 사정 (건강, 가정 등)

■ 배정 절차
1단계: 희망조사 (양식 배포)
2단계: 취합 및 분석
3단계: 관리자 협의
4단계: 담임배정회의 (전체 또는 대표)
5단계: 결과 확정 및 공지
6단계: 나이스 등록

■ 희망조사 항목
- 희망 학년 (1, 2, 3지망)
- 희망 사유
- 배정 불가 사유 (있는 경우)
- 특이사항

■ 갈등 상황 대처
- 희망자 부족: 경력 순환, 협의
- 희망자 초과: 추첨, 협의
- 특정 학년 기피: 인센티브 검토

■ 유의사항
- 공정성과 투명성 확보
- 비공개 원칙 (확정 전)
- 결과에 대한 불만 최소화
- 회의록 작성 및 보관
      `,
      category: '담임배정',
    },
    {
      id: 'faq-aa-8',
      question: '학사일정 변경이 필요할 때 절차는?',
      answer: `
【학사일정 변경 절차】

■ 변경 가능 사유
- 천재지변 (태풍, 폭설, 지진 등)
- 감염병 확산 (학급폐쇄, 휴업 등)
- 시설 문제 (공사, 안전 문제)
- 교육청 지침 변경
- 기타 불가피한 사유

■ 변경 절차
1. 변경 필요성 판단
2. 대체 일정 수립
3. 학교운영위원회 자문/심의 (중요 변경시)
4. 학교장 결재
5. 교육청 보고 (수업일수 영향시)
6. 학생/학부모 공지
7. 나이스 반영

■ 변경 유형별 처리
① 휴업일 지정
- 재량휴업일 조정
- 교육청 사전 협의 (필요시)

② 행사 일정 변경
- 교직원 공지
- 해당 부서 협조
- 가정통신문 발송

③ 긴급 휴업
- 학교장 즉시 결정
- 교육청 즉시 보고
- 학부모 긴급 연락

■ 수업일수 관리
- 연간 190일 이상 유지
- 부족시 보충 계획 수립
- 교육청 지침 준수
      `,
      category: '학사일정',
    },
    {
      id: 'faq-aa-9',
      question: '교무회의 안건은 어떻게 정하나요?',
      answer: `
【교무회의 운영 가이드】

■ 안건 종류
1. 정기 안건
   - 학교교육계획
   - 학사일정
   - 규정 개정
   - 예결산 보고

2. 부서별 안건
   - 각 부서 주요 사업 안내
   - 협조 요청 사항
   - 변경 사항 공지

3. 임시 안건
   - 긴급 사안
   - 현안 논의

■ 안건 수합 절차
1. 회의 1주일 전: 안건 제출 요청
2. 회의 3일 전: 안건 마감
3. 회의 2일 전: 안건 정리 및 배포
4. 회의 당일: 진행

■ 안건 양식 포함 내용
- 안건명
- 제안 부서/담당자
- 배경 및 필요성
- 세부 내용
- 요청 사항 (승인/협조/공유)
- 첨부자료

■ 회의 진행
- 사회: 교무부장 또는 지정 교사
- 의장: 교장선생님
- 서기: 교무부 담당
- 시간: 1시간 내외 권장

■ 회의록 작성
- 일시, 장소, 참석자
- 안건별 내용 및 결정사항
- 서명 또는 전자결재
      `,
      category: '교무회의',
    },
    {
      id: 'faq-aa-10',
      question: '외부 기관에서 학적 조회 요청이 오면?',
      answer: `
【학적 정보 외부 제공 가이드】

■ 제공 가능 기관
- 수사기관 (경찰, 검찰): 공문 필수
- 법원: 법원 명령서
- 교육청: 업무 협조 공문
- 타 학교: 전출입 관련

■ 제공 절차
1. 공식 요청 확인
   - 공문 또는 공식 문서 접수
   - 요청 기관 및 담당자 확인
   - 요청 사유 확인

2. 제공 범위 결정
   - 필요 최소한의 정보만
   - 학교장 결재

3. 정보 제공
   - 공문으로 회신 (직접 전달 지양)
   - 개인정보 포함시 암호화

4. 기록 보관
   - 제공 내용 및 일시 기록
   - 요청 공문 보관

■ 제공 불가 항목
- 법적 근거 없는 요청
- 개인 사적 목적
- 과도한 정보 요청

■ 학부모/학생 요청 시
- 본인 정보: 신분 확인 후 제공
- 타인 정보: 원칙적 불가

■ 주의사항
- 전화/이메일 요청은 공문 요청
- 불명확한 경우 교육청 문의
- 개인정보보호법 준수
      `,
      category: '개인정보',
    },
  ],

  emergencyProcedures: [
    {
      situation: '나이스 시스템 장애 (마감일)',
      immediateActions: [
        '오류 화면 스크린샷 저장',
        '나이스 콜센터 즉시 연락 (1544-0079)',
        '교육청 나이스 담당 연락',
        '마감 연장 가능 여부 확인',
      ],
      reportingChain: ['교감선생님', '교육청 담당 장학사'],
      documentation: ['오류 화면 스크린샷', '연락 시간 및 내용 기록', '공문 발송 (필요시)'],
      followUp: ['마감 연장 시 전 교원 공지', '시스템 복구 후 즉시 작업 재개'],
    },
    {
      situation: '학적 정보 유출 의심',
      immediateActions: [
        '유출 경로 즉시 차단',
        '유출 범위 파악',
        '관리자 즉시 보고',
      ],
      reportingChain: ['교감선생님', '교장선생님', '교육청 개인정보담당', '개인정보보호위원회'],
      documentation: ['유출 경위서', '조치 결과 보고서', '재발 방지 계획'],
      followUp: ['해당 학생/학부모 통지', '재발 방지 교육', '시스템 보안 점검'],
    },
    {
      situation: '생기부 중대 오류 발견 (마감 후)',
      immediateActions: [
        '오류 내용 정확히 파악',
        '관련 증빙자료 수집',
        '정정 절차 즉시 시작',
      ],
      reportingChain: ['교감선생님', '해당 학생 담임'],
      documentation: ['정정 사유서', '증빙자료', '정정대장'],
      followUp: ['학부모 안내 (필요시)', '재발 방지 점검 강화'],
    },
  ],

  references: [
    {
      title: '학교생활기록부 기재요령(초등학교)',
      url: 'https://star.moe.go.kr',
      description: '교육부 공식 생기부 기재 지침, 매년 업데이트'
    },
    {
      title: '나이스 업무 매뉴얼',
      url: 'https://www.neis.go.kr',
      description: '나이스 시스템 사용 방법 안내'
    },
    {
      title: '초중등교육법 시행령',
      url: 'https://www.law.go.kr',
      description: '학적, 졸업, 수업일수 관련 법령'
    },
    {
      title: '시도교육청 학적업무 매뉴얼',
      url: '각 시도교육청 홈페이지',
      description: '지역별 학적업무 세부 지침'
    },
    {
      title: '학교알리미',
      url: 'https://www.schoolinfo.go.kr',
      description: '학교정보 공시 관련'
    },
  ],

  relatedLaws: [
    {
      name: '초·중등교육법',
      article: '제25조',
      content: '학교의 장은 학생의 학업성취도 및 인성 등을 종합적으로 관찰·평가하여 학교생활기록을 작성·관리하여야 한다.',
    },
    {
      name: '초·중등교육법 시행령',
      article: '제21조',
      content: '학교생활기록의 작성·관리에 필요한 사항은 교육부령으로 정한다.',
    },
    {
      name: '초·중등교육법 시행령',
      article: '제45조',
      content: '학교의 수업일수는 초등학교·중학교·고등학교·고등기술학교 및 특수학교는 매 학년 190일 이상으로 한다.',
    },
    {
      name: '개인정보보호법',
      article: '제29조',
      content: '개인정보처리자는 개인정보가 분실·도난·유출·위조·변조 또는 훼손되지 아니하도록 내부 관리계획 수립, 접속기록 보관 등 안전성 확보에 필요한 기술적·관리적 및 물리적 조치를 하여야 한다.',
    },
  ],
};

export const ultraDetailedDuties = [academicAffairsUltraDetailed];
