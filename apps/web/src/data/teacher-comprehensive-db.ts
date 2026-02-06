// ================================================================
// 초등교사 종합 실무 데이터베이스 v2.0
// 교육부, 17개 시도교육청, 교사 커뮤니티 교차검증 기반
// 담임교사 / 비담임교사(부장교사) 구분
// ================================================================

export type TeacherRole = 'homeroom' | 'non-homeroom' | 'head-teacher' | 'all';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
export type TaskFrequency = 'daily' | 'weekly' | 'monthly' | 'semester' | 'yearly' | 'as-needed';

export interface MonthlyTaskItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  role: TeacherRole;
  priority: TaskPriority;
  deadline?: string;
  neisRequired: boolean;
  neisPath?: string;
  relatedDocs?: string[];
  tips?: string[];
  warnings?: string[];
  references?: string[];
  estimatedMinutes?: number;
  department?: string;
}

export interface MonthlyData {
  month: number;
  title: string;
  summary: string;
  tasks: MonthlyTaskItem[];
}

// ================================================================
// 일일 루틴 업무 (담임교사)
// ================================================================
export const dailyRoutineTasks: MonthlyTaskItem[] = [
  {
    id: 'daily-001',
    title: '출석 확인 및 NEIS 출결 처리',
    description: '매일 아침 학생 출석을 확인하고 NEIS에 입력합니다.',
    details: [
      '8:40~9:00 출석 확인 (출석부 체크)',
      '결석 학생 보호자에게 전화 확인',
      'NEIS > 학생생활 > 출결관리에서 결석/지각/조퇴/결과 입력',
      '질병결석은 진단서/처방전 첨부 (5일 이상 시 필수)',
      '미인정결석 시 담임 소견 입력',
    ],
    role: 'homeroom',
    priority: 'critical',
    neisRequired: true,
    neisPath: 'NEIS > 학생생활 > 출결관리 > 일일출결관리',
    tips: [
      '출결 마감은 매일 해야 함 (당일 처리 원칙)',
      '장기결석(7일 이상) 시 관리자에게 보고 필수',
      '감염병 의심 시 보건교사에게 즉시 연락',
    ],
    estimatedMinutes: 10,
  },
  {
    id: 'daily-002',
    title: '알림장/공지사항 작성',
    description: '학부모에게 전달할 사항을 알림장이나 학급 메신저로 공지합니다.',
    details: [
      '준비물 안내, 행사 일정, 가정통신문 배부 안내',
      '학교 공식 플랫폼(e알림이, 하이클래스 등) 활용',
      '개인정보 포함 내용은 주의 (학생 이름 등 공개 금지)',
    ],
    role: 'homeroom',
    priority: 'high',
    neisRequired: false,
    tips: [
      'SNS/개인 메신저보다 공식 플랫폼 사용 권장',
      '민감한 내용은 개별 연락',
    ],
    estimatedMinutes: 15,
  },
  {
    id: 'daily-003',
    title: '교실 환경 점검',
    description: '교실 청결, 안전, 환기 상태를 점검합니다.',
    details: [
      '교실 환기 (수업 전, 쉬는 시간마다)',
      '청소 상태 확인',
      '안전 위험 요소 점검 (깨진 유리, 파손된 시설 등)',
      '게시물 교체 및 정리',
    ],
    role: 'homeroom',
    priority: 'medium',
    neisRequired: false,
    estimatedMinutes: 5,
  },
  {
    id: 'daily-004',
    title: '수업 준비 및 진행',
    description: '당일 수업 자료 준비, 수업 진행, 평가 기록',
    details: [
      '교과서, 수업자료, 활동지 준비',
      '수업 후 간단한 평가 기록 (수행평가 해당 시)',
      '특이사항 학생 관찰 기록',
    ],
    role: 'homeroom',
    priority: 'critical',
    neisRequired: false,
    estimatedMinutes: 30,
  },
];

// ================================================================
// 주간 루틴 업무
// ================================================================
export const weeklyRoutineTasks: MonthlyTaskItem[] = [
  {
    id: 'weekly-001',
    title: '주간학습안내 작성 및 배부',
    description: '다음 주 학습 계획을 안내하는 주간학습안내를 작성합니다.',
    details: [
      '각 교과별 학습 내용, 준비물 기재',
      '학교 행사 일정 포함',
      '금요일 또는 월요일에 배부 (학교마다 상이)',
      'e알림이 또는 하이클래스로 전송',
    ],
    role: 'homeroom',
    priority: 'high',
    neisRequired: false,
    tips: ['양식은 학교 통일 양식 사용', '교육과정 진도와 일치하도록 확인'],
    estimatedMinutes: 30,
  },
  {
    id: 'weekly-002',
    title: '교무회의/학년회의 참석',
    description: '주간 교무회의 및 학년별 협의회에 참석합니다.',
    details: [
      '교무회의: 주요 공지사항, 행사 계획 전달',
      '학년회의: 교육과정 운영, 평가 협의, 문제 학생 논의',
      '회의록 작성 (해당 시)',
    ],
    role: 'all',
    priority: 'high',
    neisRequired: false,
    estimatedMinutes: 60,
  },
];

// ================================================================
// 월별 업무 종합 (3월~2월)
// ================================================================
export const comprehensiveMonthlyTasks: MonthlyData[] = [
  {
    month: 3,
    title: '3월 - 새 학기 시작',
    summary: '신학기 준비와 학급 세팅이 가장 중요한 달입니다. 학급 편성, 교육과정 편성, 학부모 총회 등 1년의 기반을 다지는 시기입니다.',
    tasks: [
      // === 담임교사 업무 ===
      {
        id: 'mar-h-001',
        title: '학급 편성 확인 및 학생 파악',
        description: '새 학급 학생 명단을 확인하고 개인정보를 파악합니다.',
        details: [
          '학생 명단 확인 (NEIS 학적에서 조회)',
          '전년도 담임 인수인계 (특이사항 학생 파악)',
          '학생 건강정보 확인 (알레르기, 만성질환)',
          '특수교육 대상 학생 파악',
          '다문화/탈북 학생 파악',
          '학교폭력 이력 학생 확인',
        ],
        role: 'homeroom',
        priority: 'critical',
        deadline: '3월 첫째 주',
        neisRequired: true,
        neisPath: 'NEIS > 학생생활 > 학적 > 학급편성조회',
        tips: [
          '전년도 담임과 직접 대면 인수인계 권장',
          '학생 건강정보는 보건교사와 공유',
          '특수교육 대상자는 특수교사와 협의',
        ],
        warnings: [
          '학생 개인정보 유출 주의 (명단을 교실에 게시하지 않기)',
          '특이사항은 구두로만 전달, 문서 유출 주의',
        ],
        estimatedMinutes: 120,
      },
      {
        id: 'mar-h-002',
        title: '학급 경영 계획 수립',
        description: '1년간의 학급 운영 방향과 세부 계획을 수립합니다.',
        details: [
          '학급 교육목표 설정',
          '학급 규칙/약속 만들기 (학생 참여)',
          '1인 1역 배정 계획',
          '좌석 배치 계획',
          '학급 행사 연간 계획',
          '학급 게시판 구성',
          '학급문고/교구 정리',
        ],
        role: 'homeroom',
        priority: 'critical',
        deadline: '3월 첫째 주',
        neisRequired: false,
        relatedDocs: ['학급경영록', '학급경영계획서'],
        tips: [
          '학생들과 함께 규칙을 정하면 준수율이 높아짐',
          '첫 주에 모든 것을 완벽하게 하려 하지 말 것',
          '좌석은 2주 후 재배치 예고하면 유연함',
        ],
        estimatedMinutes: 180,
      },
      {
        id: 'mar-h-003',
        title: '교육과정 편성 및 시수 배당',
        description: '학년 교육과정에 따라 주간 시수를 편성합니다.',
        details: [
          '학년군 교육과정 확인 (2022 개정교육과정 적용 여부 확인)',
          '교과별 연간 시수 확인',
          '주간 시간표 편성 (교과전담 포함)',
          '창의적 체험활동 편성 (자율/동아리/봉사/진로)',
          '범교과 학습 주제 배당',
          '안전교육 51시간 이상 편성 확인',
        ],
        role: 'homeroom',
        priority: 'critical',
        deadline: '3월 첫째 주',
        neisRequired: true,
        neisPath: 'NEIS > 교육과정 > 교육과정편성',
        tips: [
          '교과전담 시간은 교무부와 협의하여 확정',
          '학년 동 학급과 시수 편성을 맞추면 교류 수업 가능',
        ],
        estimatedMinutes: 120,
      },
      {
        id: 'mar-h-004',
        title: '학부모 총회 준비 및 진행',
        description: '학기초 학부모 총회를 준비하고 진행합니다.',
        details: [
          '학부모 총회 안내장 발송 (2주 전)',
          '학급 경영 방침 발표자료 준비',
          '교육과정 안내 자료 제작',
          '학급 운영비 안내',
          '학급 임원 학부모 선출',
          '학부모 상담 신청 안내',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '3월 2~3째 주',
        neisRequired: false,
        relatedDocs: ['학부모총회 안내문', '학급경영 발표자료'],
        tips: [
          'PPT는 간결하게 (10장 이내)',
          '질문 시간을 충분히 확보',
          '개별 상담이 필요한 학부모는 별도 일정 잡기',
        ],
        estimatedMinutes: 240,
      },
      {
        id: 'mar-h-005',
        title: '교과서 배부 및 확인',
        description: '학생들에게 교과서를 배부하고 수령 확인을 합니다.',
        details: [
          '교과서 수량 확인 (학년별 교과서 목록 대조)',
          '학생별 배부 및 이름 기재 확인',
          '전입생용 여분 교과서 확보',
          '디지털교과서 접속 안내 (해당 학년)',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '3월 첫째 주',
        neisRequired: false,
        estimatedMinutes: 60,
      },
      {
        id: 'mar-h-006',
        title: '학생 기초조사서 수합',
        description: '학생 가정환경, 건강, 특기사항 등을 조사합니다.',
        details: [
          '기초조사서 배부 및 수합',
          '가정환경조사서 (가족관계, 연락처, 비상연락처)',
          '건강조사서 (알레르기, 약물, 특이체질)',
          '개인정보 수집동의서 수합',
          '방과후학교 수강 신청 확인',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '3월 둘째 주',
        neisRequired: false,
        warnings: ['개인정보 수집동의서 없이 정보 수집 불가'],
        estimatedMinutes: 90,
      },
      // === 비담임/부장교사 업무 ===
      {
        id: 'mar-n-001',
        title: '[교무부] 학교교육과정 편성 총괄',
        description: '학교 전체 교육과정을 편성하고 NEIS에 등록합니다.',
        details: [
          '학교교육과정 계획서 작성',
          'NEIS 교육과정 편성 등록',
          '학년별 시수 배당 조정',
          '교과전담 배치 및 시간표 조정',
          '시간표 프로그램 운영 (컴시간 등)',
        ],
        role: 'head-teacher',
        priority: 'critical',
        deadline: '3월 첫째 주',
        neisRequired: true,
        neisPath: 'NEIS > 교육과정 > 학교교육과정 > 편성등록',
        department: '교무부',
        estimatedMinutes: 480,
      },
      {
        id: 'mar-n-002',
        title: '[교무부] 학적 처리 (전입/전출)',
        description: '신학기 전입/전출 학생 학적을 처리합니다.',
        details: [
          'NEIS 학적 > 전입학처리',
          '전출학교에서 학적 서류 수령 확인',
          '학급 배정 (교감/교장 결재)',
          '전입생 교과서 배부',
        ],
        role: 'head-teacher',
        priority: 'critical',
        deadline: '수시',
        neisRequired: true,
        neisPath: 'NEIS > 학생생활 > 학적 > 전입학관리',
        department: '교무부',
        estimatedMinutes: 30,
      },
      {
        id: 'mar-n-003',
        title: '[생활지도부] 학교폭력 예방교육',
        description: '학기초 학교폭력 예방교육을 실시합니다.',
        details: [
          '학교폭력 예방교육 계획 수립',
          '전교생 대상 학교폭력 예방 교육 실시',
          '학교폭력 실태조사 실시 (교육부 지정 기간)',
          '결과 NEIS 입력 및 교육청 보고',
        ],
        role: 'head-teacher',
        priority: 'critical',
        deadline: '3월 중',
        neisRequired: true,
        department: '생활지도부',
        references: ['학교폭력예방법', '교육부 학교폭력 사안처리 가이드북'],
        estimatedMinutes: 180,
      },
      {
        id: 'mar-n-004',
        title: '[연구부] 전문적학습공동체 운영 계획',
        description: '교사 전문적학습공동체 연간 운영 계획을 수립합니다.',
        details: [
          '학습공동체 구성 (학년별/주제별)',
          '연간 운영 계획 수립',
          '예산 편성',
          'NEIS 등록',
        ],
        role: 'head-teacher',
        priority: 'high',
        deadline: '3월 둘째 주',
        neisRequired: false,
        department: '연구부',
        estimatedMinutes: 120,
      },
    ],
  },
  {
    month: 4,
    title: '4월 - 안정기 진입',
    summary: '학급 운영이 안정되는 시기입니다. 수업에 집중하면서 과학의 달 행사, 장애인의 날 교육, 학부모 상담 등을 진행합니다.',
    tasks: [
      {
        id: 'apr-h-001',
        title: '학부모 상담주간 운영',
        description: '1학기 학부모 상담을 실시합니다.',
        details: [
          '상담 신청서 수합 및 일정 배정',
          '학생별 상담 자료 준비 (학습, 생활, 교우관계)',
          '상담 기록지 작성',
          'NEIS 상담 기록 입력',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '4월 중',
        neisRequired: true,
        neisPath: 'NEIS > 학생생활 > 상담관리',
        tips: [
          '상담은 듣기 7, 말하기 3의 비율로',
          '문제가 아닌 학생의 장점부터 이야기',
          '상담 시간은 15~20분이 적당',
          '민감한 내용은 메모하되 공유 주의',
        ],
        relatedDocs: ['상담 신청서', '상담 기록지'],
        estimatedMinutes: 600,
      },
      {
        id: 'apr-h-002',
        title: '과학의 달 행사 참여',
        description: '4월 과학의 달 관련 행사를 준비하고 참여합니다.',
        details: [
          '과학 탐구대회 참가 학생 선발',
          '과학 관련 교과 수업 연계 활동',
          '교내 과학 행사 참여 (과학전시회, 실험축제 등)',
        ],
        role: 'homeroom',
        priority: 'medium',
        deadline: '4월 중',
        neisRequired: false,
        estimatedMinutes: 120,
      },
      {
        id: 'apr-h-003',
        title: '장애인의 날 교육 (4/20)',
        description: '장애이해교육을 실시합니다.',
        details: [
          '장애이해교육 자료 준비',
          '수업 실시 및 소감문 작성',
          'NEIS 창의적체험활동 입력',
        ],
        role: 'homeroom',
        priority: 'medium',
        deadline: '4월 20일 전후',
        neisRequired: true,
        estimatedMinutes: 60,
      },
      {
        id: 'apr-n-001',
        title: '[체육부] 체육대회/운동회 준비',
        description: '봄 체육대회 또는 운동회를 계획합니다.',
        details: [
          '체육대회 기획안 작성',
          '종목 선정 및 규칙 수립',
          '학년별 참가 종목 배정',
          '시상 계획 수립',
          '안전 계획 수립 (응급처치 인력 배치)',
        ],
        role: 'head-teacher',
        priority: 'high',
        deadline: '4~5월',
        neisRequired: false,
        department: '체육부',
        estimatedMinutes: 480,
      },
    ],
  },
  {
    month: 5,
    title: '5월 - 행사의 달',
    summary: '어린이날, 어버이날, 스승의 날 등 기념일이 많은 달입니다. 현장체험학습, 체육대회도 주로 이 시기에 진행됩니다.',
    tasks: [
      {
        id: 'may-h-001',
        title: '어린이날 행사 준비',
        description: '어린이날 기념 학교행사를 준비합니다.',
        details: [
          '학급 행사 또는 학교 행사 참여 준비',
          '학급 파티/체험활동 계획',
          '5월 5일 전후 대체공휴일 확인',
        ],
        role: 'homeroom',
        priority: 'medium',
        deadline: '5월 첫째 주',
        neisRequired: false,
        estimatedMinutes: 120,
      },
      {
        id: 'may-h-002',
        title: '현장체험학습 준비 및 진행',
        description: '봄 현장체험학습을 준비하고 실시합니다.',
        details: [
          '현장체험학습 기획안 결재',
          '버스 예약 확인',
          '학부모 동의서 수합',
          '비상연락망 구축',
          '인솔교사 배치 확인',
          '안전교육 사전 실시',
          '체험학습 후 결과 보고서 작성',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '5월 중',
        neisRequired: false,
        relatedDocs: ['현장체험학습 계획서', '보호자 동의서', '현장체험학습 결과보고서'],
        warnings: [
          '안전사고 시 즉시 119 → 교감 → 교육청 보고',
          '인솔비율 학생 20명당 교사 1명 이상',
          '보험가입 확인 필수',
        ],
        estimatedMinutes: 480,
      },
      {
        id: 'may-h-003',
        title: '수행평가 1차 실시',
        description: '1학기 수행평가를 계획하고 실시합니다.',
        details: [
          '교과별 수행평가 계획 확인',
          '평가 기준(루브릭) 확정',
          '수행평가 실시 및 채점',
          'NEIS 성적 입력 준비',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '5~6월',
        neisRequired: true,
        neisPath: 'NEIS > 성적 > 수행평가',
        estimatedMinutes: 300,
      },
    ],
  },
  {
    month: 6,
    title: '6월 - 1학기 마무리 준비',
    summary: '호국보훈의 달 교육, 1학기 평가 마무리, 생활기록부 입력을 시작하는 시기입니다.',
    tasks: [
      {
        id: 'jun-h-001',
        title: '1학기 성적 처리',
        description: '1학기 교과 성적을 처리하고 NEIS에 입력합니다.',
        details: [
          '교과별 성취도 평가 결과 정리',
          '수행평가 점수 최종 확인',
          'NEIS 성적 입력 (교과학습발달상황)',
          '성적 검증 (학년부장 → 교무부장 → 교감)',
          '성적일람표 출력 및 확인',
        ],
        role: 'homeroom',
        priority: 'critical',
        deadline: '6월 말 ~ 7월 초',
        neisRequired: true,
        neisPath: 'NEIS > 성적 > 성적처리 > 교과학습발달상황',
        warnings: [
          '입력 마감일 엄수 (학교별 상이)',
          '성적 입력 후 담임 확인 필수',
          '오입력 시 정정 절차 복잡하므로 신중히',
        ],
        estimatedMinutes: 480,
      },
      {
        id: 'jun-h-002',
        title: '생활기록부 1학기 입력',
        description: '학교생활기록부 1학기 내용을 NEIS에 입력합니다.',
        details: [
          '출결 현황 최종 확인',
          '수상경력 입력',
          '창의적 체험활동 특기사항 입력',
          '교과학습발달상황 특기사항 입력 (3~6학년)',
          '행동특성 및 종합의견 입력',
          '독서활동상황 입력 (해당 시)',
        ],
        role: 'homeroom',
        priority: 'critical',
        deadline: '7월 초 마감',
        neisRequired: true,
        neisPath: 'NEIS > 학생생활 > 학교생활기록부',
        tips: [
          '행동특성 및 종합의견은 구체적 사례 포함',
          '부정적 표현 대신 발전 가능성 중심 서술',
          '"~했음" 대신 "~하였다" 체로 통일',
          '학생별 200자 이상 작성 권장',
        ],
        warnings: [
          '생활기록부 기재요령 반드시 숙지',
          '학교폭력 관련 기재 시 관련 법규 확인',
          '입력 후 반드시 출력하여 검토',
        ],
        references: ['교육부 학교생활기록부 기재요령'],
        estimatedMinutes: 960,
      },
      {
        id: 'jun-h-003',
        title: '호국보훈의 달 교육',
        description: '현충일(6/6) 관련 나라사랑 교육을 실시합니다.',
        details: [
          '6.25 전쟁, 현충일 관련 교육',
          '나라사랑 주간 운영',
          '태극기 게양 교육',
        ],
        role: 'homeroom',
        priority: 'medium',
        deadline: '6월 6일 전후',
        neisRequired: false,
        estimatedMinutes: 60,
      },
      {
        id: 'jun-n-001',
        title: '[교무부] 1학기 생활기록부 마감 총괄',
        description: '전학년 생활기록부 입력 현황을 점검하고 마감합니다.',
        details: [
          '학년별 입력 현황 점검',
          '기재요령 위반 사항 검토',
          '담임교사별 입력 완료 확인',
          '교감 검토 일정 관리',
          'NEIS 마감 처리',
        ],
        role: 'head-teacher',
        priority: 'critical',
        deadline: '7월 초',
        neisRequired: true,
        department: '교무부',
        estimatedMinutes: 480,
      },
    ],
  },
  {
    month: 7,
    title: '7월 - 1학기 마무리 & 여름방학',
    summary: '1학기 성적 마감, 통지표 배부, 방학식을 진행합니다. 방학 중 연수 및 2학기 준비를 시작합니다.',
    tasks: [
      {
        id: 'jul-h-001',
        title: '통지표(성적표) 작성 및 배부',
        description: '1학기 학생 통지표를 작성하여 가정에 배부합니다.',
        details: [
          'NEIS에서 통지표 양식 출력',
          '담임 소견 작성',
          '교감/교장 결재',
          '학생에게 배부 (방학식 전)',
        ],
        role: 'homeroom',
        priority: 'critical',
        deadline: '방학식 전',
        neisRequired: true,
        neisPath: 'NEIS > 성적 > 통지표 > 통지표출력',
        estimatedMinutes: 180,
      },
      {
        id: 'jul-h-002',
        title: '방학식 준비',
        description: '방학식 행사를 준비하고 방학 생활 안내를 합니다.',
        details: [
          '방학 과제 안내',
          '안전 생활 교육 (물놀이, 교통안전 등)',
          '방학 중 연락 방법 안내',
          '교실 정리 및 시건',
          '교구/교재 정리',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '7월 방학식 일',
        neisRequired: false,
        estimatedMinutes: 120,
      },
      {
        id: 'jul-n-001',
        title: '[교무부] 1학기 성적 마감 및 검증',
        description: '전교생 성적 마감 처리를 총괄합니다.',
        details: [
          '성적 일람표 검증',
          '이의 신청 처리',
          'NEIS 성적 마감 처리',
          '학업성적관리위원회 개최',
        ],
        role: 'head-teacher',
        priority: 'critical',
        deadline: '7월 초',
        neisRequired: true,
        department: '교무부',
        estimatedMinutes: 360,
      },
    ],
  },
  {
    month: 8,
    title: '8월 - 여름방학 & 2학기 준비',
    summary: '방학 중 연수, 2학기 교육과정 준비, 교실 환경 정비를 합니다.',
    tasks: [
      {
        id: 'aug-h-001',
        title: '2학기 교육과정 및 수업 준비',
        description: '2학기 수업을 준비합니다.',
        details: [
          '2학기 교육과정 진도 계획 수립',
          '수업 자료 제작 및 준비',
          '평가 계획 수립',
          '교실 환경 재구성',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '개학 전',
        neisRequired: false,
        estimatedMinutes: 480,
      },
      {
        id: 'aug-h-002',
        title: '교원 연수 이수',
        description: '여름방학 중 필수/선택 연수를 이수합니다.',
        details: [
          '직무연수 (15시간 이상 권장)',
          '안전교육 연수 (필수)',
          '학교폭력 예방 연수 (필수)',
          '개인정보보호 연수 (필수)',
          '연수 이수증 제출',
        ],
        role: 'all',
        priority: 'high',
        deadline: '8월 말',
        neisRequired: false,
        tips: ['교육부 중앙교육연수원, 시도교육연수원 활용'],
        estimatedMinutes: 900,
      },
    ],
  },
  {
    month: 9,
    title: '9월 - 2학기 시작',
    summary: '2학기가 시작됩니다. 학급 재정비, 2학기 학부모 상담, 추석 연휴 일정 등을 관리합니다.',
    tasks: [
      {
        id: 'sep-h-001',
        title: '2학기 학급 재정비',
        description: '2학기 학급 운영을 재정비합니다.',
        details: [
          '좌석 재배치',
          '1인 1역 재배정',
          '학급 규칙 재확인',
          '2학기 학급 목표 설정',
          '전입생 적응 지원',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '9월 첫째 주',
        neisRequired: false,
        estimatedMinutes: 120,
      },
      {
        id: 'sep-h-002',
        title: '2학기 학부모 상담',
        description: '2학기 학부모 상담을 실시합니다.',
        details: [
          '1학기 학습/생활 상황 공유',
          '2학기 지도 방향 안내',
          '진로 상담 (6학년)',
          '상담 기록 NEIS 입력',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '9~10월',
        neisRequired: true,
        neisPath: 'NEIS > 학생생활 > 상담관리',
        estimatedMinutes: 600,
      },
    ],
  },
  {
    month: 10,
    title: '10월 - 행사 & 평가',
    summary: '한글날, 독서의 달, 각종 교내 대회 등이 진행됩니다. 2학기 수행평가도 본격화됩니다.',
    tasks: [
      {
        id: 'oct-h-001',
        title: '한글날(10/9) 교육',
        description: '한글날 관련 교육활동을 진행합니다.',
        details: [
          '한글 관련 수업 진행',
          '독서 행사 연계 활동',
          '교내 글짓기/독후감 대회 참여',
        ],
        role: 'homeroom',
        priority: 'medium',
        deadline: '10월 9일 전후',
        neisRequired: false,
        estimatedMinutes: 60,
      },
      {
        id: 'oct-h-002',
        title: '2학기 수행평가 진행',
        description: '2학기 교과별 수행평가를 실시합니다.',
        details: [
          '수행평가 실시 및 채점',
          '평가 결과 기록',
          '피드백 제공',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '10~11월',
        neisRequired: true,
        estimatedMinutes: 300,
      },
      {
        id: 'oct-n-001',
        title: '[연구부] 공개수업/수업공개의 날',
        description: '학부모 공개수업 또는 교내 수업공개를 진행합니다.',
        details: [
          '수업공개 일정 안내',
          '학부모 참관 안내문 발송',
          '교사별 수업공개 일정 조정',
          '참관록 수합',
        ],
        role: 'head-teacher',
        priority: 'high',
        deadline: '10월 중',
        neisRequired: false,
        department: '연구부',
        estimatedMinutes: 360,
      },
    ],
  },
  {
    month: 11,
    title: '11월 - 2학기 평가 마무리',
    summary: '수행평가 마무리, 생활기록부 입력, 다음 학년도 교육과정 준비를 시작합니다.',
    tasks: [
      {
        id: 'nov-h-001',
        title: '2학기 수행평가 마무리',
        description: '2학기 수행평가를 마무리합니다.',
        details: [
          '미실시 학생 추가 평가',
          '채점 최종 확인',
          'NEIS 성적 입력',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '11월 말',
        neisRequired: true,
        estimatedMinutes: 240,
      },
      {
        id: 'nov-h-002',
        title: '생활기록부 2학기 입력 시작',
        description: '학교생활기록부 2학기 내용 입력을 시작합니다.',
        details: [
          '창의적 체험활동 특기사항 초안 작성',
          '교과학습발달상황 특기사항 초안 작성',
          '행동특성 및 종합의견 초안 작성',
          '독서활동상황 입력',
        ],
        role: 'homeroom',
        priority: 'critical',
        deadline: '11~12월',
        neisRequired: true,
        neisPath: 'NEIS > 학생생활 > 학교생활기록부',
        estimatedMinutes: 960,
      },
      {
        id: 'nov-n-001',
        title: '[교무부] 다음 학년도 교육과정 편성 준비',
        description: '다음 학년도 교육과정 편성을 위한 기초 작업을 합니다.',
        details: [
          '교육과정 편성 설문조사',
          '시도교육청 교육과정 편성 지침 확인',
          '교과별 시수 배당 기초 작업',
          '방과후학교 프로그램 수요조사',
        ],
        role: 'head-teacher',
        priority: 'high',
        deadline: '11월',
        neisRequired: false,
        department: '교무부',
        estimatedMinutes: 480,
      },
    ],
  },
  {
    month: 12,
    title: '12월 - 학년말 마무리',
    summary: '2학기 성적 마감, 생활기록부 최종 마감, 각종 보고서 제출의 시기입니다.',
    tasks: [
      {
        id: 'dec-h-001',
        title: '2학기 성적 처리 및 마감',
        description: '2학기 교과 성적을 최종 처리합니다.',
        details: [
          '성적 최종 입력',
          '성적 검증 (학년부장 → 교무부장 → 교감)',
          '학업성적관리위원회 심의',
          '통지표 작성',
        ],
        role: 'homeroom',
        priority: 'critical',
        deadline: '12월 셋째 주',
        neisRequired: true,
        estimatedMinutes: 480,
      },
      {
        id: 'dec-h-002',
        title: '생활기록부 최종 마감',
        description: '학년말 생활기록부를 최종 마감합니다.',
        details: [
          '모든 항목 입력 완료 확인',
          '출결 최종 확인',
          '담임 최종 검토',
          '교감/교장 검토',
          'NEIS 마감 처리',
        ],
        role: 'homeroom',
        priority: 'critical',
        deadline: '12월 말',
        neisRequired: true,
        warnings: ['마감 후 수정 불가 (정정대장 절차 필요)'],
        estimatedMinutes: 480,
      },
    ],
  },
  {
    month: 1,
    title: '1월 - 겨울방학 & 다음 학년도 준비',
    summary: '겨울방학 기간입니다. 각종 연수 이수, 다음 학년도 업무분장 준비 등을 합니다.',
    tasks: [
      {
        id: 'jan-001',
        title: '겨울방학 연수 이수',
        description: '겨울방학 중 필수/선택 연수를 이수합니다.',
        details: [
          '직무연수 이수',
          '필수 연수 완료 확인 (안전, 학교폭력, 개인정보 등)',
          '자격연수 해당 시 참가',
        ],
        role: 'all',
        priority: 'high',
        deadline: '1월 중',
        neisRequired: false,
        estimatedMinutes: 900,
      },
      {
        id: 'jan-n-001',
        title: '[교무부] 다음 학년도 업무분장 준비',
        description: '신학년도 업무분장과 학급 편성을 준비합니다.',
        details: [
          '교원 업무분장(안) 작성',
          '학급 편성 기초 작업',
          '교과전담 배치 계획',
          '학교교육과정 편성 기초 작업',
        ],
        role: 'head-teacher',
        priority: 'high',
        deadline: '1~2월',
        neisRequired: false,
        department: '교무부',
        estimatedMinutes: 960,
      },
    ],
  },
  {
    month: 2,
    title: '2월 - 학년말 & 신학년 준비',
    summary: '졸업식/수료식, 신학년 준비, 업무 인수인계의 시기입니다.',
    tasks: [
      {
        id: 'feb-h-001',
        title: '졸업식/수료식 준비',
        description: '졸업식 또는 수료식을 준비합니다.',
        details: [
          '졸업/수료 대상 학생 명단 확인',
          '졸업장/수료증 준비',
          '졸업식 순서 안내',
          '학급 정리 및 기록물 정리',
          '후배에게 보내는 편지 등 활동',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '졸업식/수료식 전',
        neisRequired: true,
        estimatedMinutes: 180,
      },
      {
        id: 'feb-h-002',
        title: '업무 인수인계 준비',
        description: '다음 담임교사를 위한 인수인계를 준비합니다.',
        details: [
          '학급 인수인계서 작성',
          '특이사항 학생 정보 정리',
          '학급 경영 자료 정리',
          '교실 비품 목록 작성',
        ],
        role: 'homeroom',
        priority: 'high',
        deadline: '2월 말',
        neisRequired: false,
        estimatedMinutes: 180,
      },
      {
        id: 'feb-n-001',
        title: '[교무부] 신학년 학급 편성',
        description: '다음 학년도 학급 편성을 진행합니다.',
        details: [
          'NEIS 학급 편성 작업',
          '학생 반 배정',
          '담임 배정',
          '학적 처리 (졸업, 진급)',
        ],
        role: 'head-teacher',
        priority: 'critical',
        deadline: '2월',
        neisRequired: true,
        department: '교무부',
        estimatedMinutes: 960,
      },
    ],
  },
];

// ================================================================
// 초임교사 필수 체크리스트
// ================================================================
export interface NewTeacherChecklist {
  category: string;
  icon: string;
  items: {
    id: string;
    title: string;
    description: string;
    priority: TaskPriority;
    when: string;
  }[];
}

export const newTeacherChecklists: NewTeacherChecklist[] = [
  {
    category: '발령 첫날',
    icon: 'Star',
    items: [
      { id: 'nt-001', title: '교장·교감 인사', description: '교장실 방문하여 인사드리기', priority: 'critical', when: '첫날 오전' },
      { id: 'nt-002', title: '행정실 방문', description: '인사기록카드 작성, 급여통장 제출, 복무 관련 안내 받기', priority: 'critical', when: '첫날 오전' },
      { id: 'nt-003', title: '교무실 자리 확인', description: '자리 확인, PC 세팅, NEIS 계정 발급 신청', priority: 'critical', when: '첫날' },
      { id: 'nt-004', title: '학교 시설 파악', description: '교실, 화장실, 급식실, 체육관, 보건실, 상담실 위치 파악', priority: 'high', when: '첫날~둘째날' },
      { id: 'nt-005', title: '학교 규정 숙지', description: '학교운영규정, 복무규정, 학교교육과정 읽기', priority: 'high', when: '첫 주' },
      { id: 'nt-006', title: '동학년 교사 인사', description: '같은 학년 선생님들과 인사, 학년 운영 방식 파악', priority: 'high', when: '첫날' },
    ],
  },
  {
    category: 'NEIS 필수 세팅',
    icon: 'Monitor',
    items: [
      { id: 'nt-010', title: 'NEIS 계정 발급', description: '교무부에 요청하여 NEIS 계정 발급 (공인인증서/공동인증서 필요)', priority: 'critical', when: '발령 첫 주' },
      { id: 'nt-011', title: 'NEIS 학급 담임 등록', description: 'NEIS에 학급 담임으로 등록되었는지 확인', priority: 'critical', when: '발령 첫 주' },
      { id: 'nt-012', title: 'NEIS 기본 메뉴 익히기', description: '출결관리, 학적관리, 성적관리, 학교생활기록부 메뉴 탐색', priority: 'critical', when: '발령 2주 내' },
      { id: 'nt-013', title: '학교홈페이지 관리자 등록', description: '학교 홈페이지 교사 계정 발급', priority: 'high', when: '발령 첫 주' },
      { id: 'nt-014', title: 'e알림이/하이클래스 세팅', description: '학부모 소통 플랫폼 설정 및 학급 개설', priority: 'high', when: '발령 첫 주' },
    ],
  },
  {
    category: '학급 운영 필수',
    icon: 'Users',
    items: [
      { id: 'nt-020', title: '학생 명단 확인', description: 'NEIS에서 학급 학생 명단 출력, 학생 수 확인', priority: 'critical', when: '개학 전' },
      { id: 'nt-021', title: '교실 환경 구성', description: '게시판, 사물함, 청소도구함, 학급문고 정리', priority: 'high', when: '개학 전' },
      { id: 'nt-022', title: '학급 규칙 준비', description: '학급 규칙/약속 초안 준비 (학생들과 함께 확정)', priority: 'high', when: '개학 첫 주' },
      { id: 'nt-023', title: '시간표 확인', description: '교과전담 시간, 창체 시간 등 확인', priority: 'critical', when: '개학 전' },
      { id: 'nt-024', title: '비상연락망 구축', description: '학생 비상연락처 수합, 비상연락망 게시(교무실 제출용 별도)', priority: 'high', when: '개학 첫 주' },
    ],
  },
];

// ================================================================
// 부서별 업무 상세 (비담임/부장교사용)
// ================================================================
export interface DepartmentInfo {
  id: string;
  name: string;
  nameShort: string;
  description: string;
  keyTasks: string[];
  yearlyCalendar: { month: number; tasks: string[] }[];
}

export const departments: DepartmentInfo[] = [
  {
    id: 'dept-gyomu',
    name: '교무부(교무기획부)',
    nameShort: '교무부',
    description: '학교 교육과정 운영의 핵심 부서. 학적, 성적, 시간표, 생활기록부 마감 등 총괄',
    keyTasks: [
      '학교교육과정 편성·운영',
      '학적관리 (전입/전출/졸업)',
      '성적관리 총괄',
      '생활기록부 마감 관리',
      '시간표 편성 (컴시간 등)',
      'NEIS 관리자 업무',
      '교무회의 주관',
      '교원 인사 관리 보조',
    ],
    yearlyCalendar: [
      { month: 2, tasks: ['신학년 학급편성', '업무분장 확정', '교육과정 편성'] },
      { month: 3, tasks: ['학적처리', '시간표 확정', 'NEIS 학기초 세팅'] },
      { month: 6, tasks: ['1학기 성적 마감', '생활기록부 1학기 마감'] },
      { month: 7, tasks: ['통지표 출력', '1학기 종료 처리'] },
      { month: 9, tasks: ['2학기 학적처리', '시간표 조정'] },
      { month: 12, tasks: ['2학기 성적 마감', '생활기록부 최종 마감', '졸업사정회'] },
    ],
  },
  {
    id: 'dept-yeongu',
    name: '연구부(교육연구부)',
    nameShort: '연구부',
    description: '교사 연수, 수업 연구, 전문적학습공동체 운영 담당',
    keyTasks: [
      '전문적학습공동체 운영',
      '교내 장학(수업공개) 계획·운영',
      '교원 연수 관리',
      '교과서 배부·관리',
      '학교평가 대응',
      '교육과정 운영 지원',
    ],
    yearlyCalendar: [
      { month: 3, tasks: ['교과서 배부', '전학공 구성', '연수 계획'] },
      { month: 5, tasks: ['수업공개의 날 운영'] },
      { month: 10, tasks: ['학부모 공개수업', '학교평가 자료 준비'] },
      { month: 11, tasks: ['다음학년도 교과서 수요조사'] },
      { month: 12, tasks: ['연수 이수 현황 점검', '학교평가 결과 정리'] },
    ],
  },
  {
    id: 'dept-saenghwal',
    name: '생활지도부(학생생활부)',
    nameShort: '생활지도부',
    description: '학생 생활지도, 학교폭력 대응, 안전교육 총괄',
    keyTasks: [
      '학교폭력 예방 및 대응',
      '학교폭력대책심의위원회 운영',
      '학생 생활지도',
      '안전교육 총괄 (7대 안전교육)',
      'Wee클래스 운영 관리',
      '학생 상벌점 관리',
      '학생자치회 운영',
    ],
    yearlyCalendar: [
      { month: 3, tasks: ['학교폭력 예방교육', '학교폭력 실태조사'] },
      { month: 4, tasks: ['학생자치회 구성', '학교폭력 실태조사 결과 처리'] },
      { month: 6, tasks: ['안전교육 1학기 실적 점검'] },
      { month: 9, tasks: ['2학기 학교폭력 예방교육', '실태조사 2차'] },
      { month: 12, tasks: ['안전교육 연간 실적 보고', '학교폭력 연간 보고'] },
    ],
  },
  {
    id: 'dept-bangkwahu',
    name: '방과후부(돌봄부)',
    nameShort: '방과후부',
    description: '방과후학교 프로그램 운영, 초등돌봄교실 운영',
    keyTasks: [
      '방과후학교 프로그램 운영',
      '방과후학교 강사 관리',
      '초등돌봄교실 운영',
      '수익자부담 경비 관리',
      '방과후학교 만족도 조사',
      '자유수강권 관리',
    ],
    yearlyCalendar: [
      { month: 2, tasks: ['방과후학교 프로그램 수요조사', '강사 모집'] },
      { month: 3, tasks: ['방과후학교 개강', '수강 신청 접수'] },
      { month: 7, tasks: ['1학기 만족도 조사', '여름방학 프로그램'] },
      { month: 9, tasks: ['2학기 프로그램 변경/추가'] },
      { month: 12, tasks: ['2학기 만족도 조사', '연간 결산'] },
    ],
  },
  {
    id: 'dept-jeongbo',
    name: '정보부(정보교육부)',
    nameShort: '정보부',
    description: '학교 정보화, SW교육, 정보보안 담당',
    keyTasks: [
      '학교 정보화 기기 관리',
      'SW/AI 교육 운영',
      '정보보안 관리',
      '학교 홈페이지 관리',
      '스마트교육 지원',
      '개인정보보호 교육',
    ],
    yearlyCalendar: [
      { month: 3, tasks: ['PC 세팅', '정보보안 점검', '개인정보보호 교육'] },
      { month: 6, tasks: ['정보보안 중간 점검'] },
      { month: 12, tasks: ['정보보안 연말 점검', '개인정보 파기'] },
    ],
  },
];

// ================================================================
// 문서 작성 가이드 (초임교사용)
// ================================================================
export interface DocumentGuide {
  id: string;
  type: string;
  title: string;
  description: string;
  when: string;
  format: string;
  keyPoints: string[];
  commonMistakes: string[];
  example?: string;
}

export const documentGuides: DocumentGuide[] = [
  {
    id: 'doc-001',
    type: '가정통신문',
    title: '가정통신문 작성법',
    description: '학부모에게 학교 행사, 교육 활동, 협조 요청 등을 안내하는 문서',
    when: '행사 안내, 조사서 배부, 교육 안내 시',
    format: '학교 로고 + 제목 + 본문 + 회신란(필요시)',
    keyPoints: [
      '학교명, 발행번호, 발행일 기재',
      '수신: "학부모님께" 또는 "보호자님께"',
      '용건을 간결하고 명확하게 작성',
      '회신이 필요한 경우 절취선 하단에 회신란 배치',
      '담당교사 이름과 연락처 기재',
    ],
    commonMistakes: [
      '발행번호 중복 또는 누락',
      '맞춤법 오류 (결재 전 꼭 검토)',
      '회신 마감일 미기재',
      '학교장 직인 누락',
    ],
  },
  {
    id: 'doc-002',
    type: '공문서(기안문)',
    title: '공문서(기안문) 작성법',
    description: '학교 내부결재 또는 대외기관에 보내는 공식 문서',
    when: '행사 계획 승인, 교육청 보고, 협조 요청 시',
    format: '기안문 양식 (문서번호, 수신, 제목, 본문, 결재란)',
    keyPoints: [
      '수신: 내부결재 또는 ○○교육지원청교육장',
      '제목은 간결하고 핵심을 담아서',
      '본문: "1. 관련:" → "2. 위 호와 관련하여..." 형식',
      '항목 번호: 1. > 가. > 1) > 가) > (1)',
      '끝 표시: 본문 또는 붙임 마지막에 "끝."',
      '결재라인: 담당 → 부장 → 교감 → 교장',
    ],
    commonMistakes: [
      '가정통신문을 공문서로 잘못 작성',
      '"~하여 주시기 바랍니다"와 "~하고자 합니다" 혼용',
      '항목 번호 체계 오류',
      '결재선 누락',
      '문서번호 미부여',
    ],
  },
  {
    id: 'doc-003',
    type: '생활기록부',
    title: '학교생활기록부 기재 요령',
    description: '학생의 학교 생활을 기록하는 법정 문서',
    when: '학기말 (6~7월, 11~12월)',
    format: 'NEIS 입력 (교과학습발달상황, 창체, 행특 등)',
    keyPoints: [
      '교육부 기재요령 반드시 숙지',
      '"~함", "~하였음" 대신 "~하였다" 체로 통일 (학교별 상이할 수 있음)',
      '구체적 사례와 행동 중심으로 서술',
      '부정적 표현 지양, 성장 가능성 중심',
      '학교폭력 관련 기재 시 별도 규정 적용',
      '출력 후 반드시 오탈자 확인',
    ],
    commonMistakes: [
      '기재요령 미숙지로 규정 위반',
      '학생 이름 혼동 (복붙 사고)',
      '동일 문구 반복 사용',
      '마감 후 수정 시도 (정정대장 필요)',
      '사교육 유발 표현 사용',
    ],
  },
];

// ================================================================
// 유용한 교사 사이트/도구
// ================================================================
export interface TeacherResource {
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  features: string[];
  isFree: boolean;
}

export const teacherResources: TeacherResource[] = [
  {
    id: 'res-001',
    name: '에듀넷·티-클리어',
    url: 'https://www.edunet.net',
    category: '교육자료',
    description: '교육부 공식 교육 콘텐츠 포털',
    features: ['수업자료', '평가문항', '교육과정 자료', '연수'],
    isFree: true,
  },
  {
    id: 'res-002',
    name: '아이스크림',
    url: 'https://www.i-scream.co.kr',
    category: '수업도구',
    description: '초등교사 수업 지원 플랫폼',
    features: ['수업PPT', '영상자료', '활동지', '평가자료'],
    isFree: false,
  },
  {
    id: 'res-003',
    name: '참쌤스쿨',
    url: 'https://chamssaem.com',
    category: '교사커뮤니티',
    description: '교사들이 만든 교육 콘텐츠 공유 플랫폼',
    features: ['미술자료', '수업아이디어', '교실꾸미기', '학급경영'],
    isFree: true,
  },
  {
    id: 'res-004',
    name: '인디스쿨',
    url: 'https://www.indischool.com',
    category: '교사커뮤니티',
    description: '초등교사 최대 온라인 커뮤니티',
    features: ['업무공유', '수업자료', '질문답변', '정보교환'],
    isFree: true,
  },
  {
    id: 'res-005',
    name: 'NEIS (나이스)',
    url: 'https://neis.go.kr',
    category: '행정시스템',
    description: '교육행정정보시스템 - 모든 학사행정 처리',
    features: ['학적관리', '성적관리', '출결관리', '학교생활기록부'],
    isFree: true,
  },
  {
    id: 'res-006',
    name: '학교쏙2',
    url: 'https://school.busanedu.net',
    category: '수업도구',
    description: '교사용 수업 관리 및 학급 운영 도구',
    features: ['출결관리', '수업관리', '알림장', '학급경영'],
    isFree: true,
  },
  {
    id: 'res-007',
    name: '클래스팅',
    url: 'https://www.classting.com',
    category: '학급관리',
    description: '학급 SNS 및 AI 학습 플랫폼',
    features: ['학급소통', 'AI학습', '과제관리', '알림장'],
    isFree: false,
  },
  {
    id: 'res-008',
    name: '하이클래스',
    url: 'https://www.hiclass.net',
    category: '학급관리',
    description: '학급 홈페이지 및 소통 플랫폼',
    features: ['학급홈페이지', '알림장', '과제', '설문'],
    isFree: true,
  },
  {
    id: 'res-009',
    name: '중앙교육연수원',
    url: 'https://www.neti.go.kr',
    category: '연수',
    description: '교육부 직속 온라인 연수 기관',
    features: ['직무연수', '자율연수', '필수연수', '학점인정'],
    isFree: true,
  },
  {
    id: 'res-010',
    name: 'e학습터',
    url: 'https://cls.edunet.net',
    category: '온라인학습',
    description: '교육부 공식 온라인 학습 플랫폼',
    features: ['온라인수업', '과제', '평가', '학습관리'],
    isFree: true,
  },
];

// ================================================================
// 헬퍼 함수들
// ================================================================

export function getTasksForMonth(month: number): MonthlyData | undefined {
  return comprehensiveMonthlyTasks.find(m => m.month === month);
}

export function getTasksByRole(month: number, role: TeacherRole): MonthlyTaskItem[] {
  const monthData = getTasksForMonth(month);
  if (!monthData) return [];
  if (role === 'all') return monthData.tasks;
  return monthData.tasks.filter(t => t.role === role || t.role === 'all');
}

export function getCriticalTasks(month: number): MonthlyTaskItem[] {
  const monthData = getTasksForMonth(month);
  if (!monthData) return [];
  return monthData.tasks.filter(t => t.priority === 'critical');
}

export function getTasksByDepartment(department: string): MonthlyTaskItem[] {
  return comprehensiveMonthlyTasks
    .flatMap(m => m.tasks)
    .filter(t => t.department === department);
}

export function searchTasks(query: string): MonthlyTaskItem[] {
  const lower = query.toLowerCase();
  return comprehensiveMonthlyTasks
    .flatMap(m => m.tasks)
    .filter(t =>
      t.title.toLowerCase().includes(lower) ||
      t.description.toLowerCase().includes(lower) ||
      t.details.some(d => d.toLowerCase().includes(lower))
    );
}

export function getNEISTasks(month: number): MonthlyTaskItem[] {
  const monthData = getTasksForMonth(month);
  if (!monthData) return [];
  return monthData.tasks.filter(t => t.neisRequired);
}

export function getCurrentMonthTasks(): MonthlyData | undefined {
  const now = new Date();
  return getTasksForMonth(now.getMonth() + 1);
}

export function getUpcomingDeadlines(): MonthlyTaskItem[] {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

  const current = getTasksForMonth(currentMonth);
  const next = getTasksForMonth(nextMonth);

  const tasks: MonthlyTaskItem[] = [];
  if (current) tasks.push(...current.tasks.filter(t => t.priority === 'critical' || t.priority === 'high'));
  if (next) tasks.push(...next.tasks.filter(t => t.priority === 'critical'));

  return tasks;
}
