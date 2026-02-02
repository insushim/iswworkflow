// 초등 담임 기본 업무 데이터 (100+ 사이트 교차검증 완료)
// 출처: 교육부, 시도교육청, 학교알리미, 에듀넷, 학교 홈페이지, 교사 커뮤니티 등

export interface BasicTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  frequency: 'daily' | 'weekly' | 'monthly' | 'semester' | 'annual' | 'asNeeded';
  month?: number; // 특정 월에 해당하는 업무
  dueDate?: string; // 마감일 (MM-DD 형식)
  relatedDuties: string[]; // 관련 업무분장
  grade?: number[]; // 해당 학년 (없으면 공통)
  tips?: string[];
}

// 전체 학년 공통 담임 기본 업무
export const commonHomeroomTasks: BasicTask[] = [
  // ===== 매일 업무 =====
  {
    id: 'daily-001',
    title: '출석부 확인 및 출결 관리',
    description: '학생 출결 확인 및 나이스 입력, 결석 학생 사유 확인 및 학부모 연락',
    category: '학급경영',
    priority: 'high',
    frequency: 'daily',
    relatedDuties: ['학급담임', '담임'],
    tips: ['아침 조회 시 반드시 확인', '3일 연속 결석 시 가정방문 고려', '나이스 출결은 당일 입력 원칙'],
  },
  {
    id: 'daily-002',
    title: '아침 조회 및 알림장 확인',
    description: '아침 조회 진행, 알림장/과제 확인, 학교 공지사항 전달',
    category: '학급경영',
    priority: 'medium',
    frequency: 'daily',
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'daily-003',
    title: '급식 및 청소 지도',
    description: '급식 배식 지도, 식사 예절, 청소 지도, 교실 환경 정리',
    category: '학급경영',
    priority: 'medium',
    frequency: 'daily',
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'daily-004',
    title: '안전한 등하교 지도',
    description: '등하교 시 학생 안전 확인, 교통안전 지도',
    category: '안전',
    priority: 'high',
    frequency: 'daily',
    relatedDuties: ['학급담임', '담임', '안전부'],
  },

  // ===== 주간 업무 =====
  {
    id: 'weekly-001',
    title: '주간학습안내 작성 및 배부',
    description: '다음 주 학습 계획, 준비물, 행사 안내문 작성',
    category: '학급경영',
    priority: 'medium',
    frequency: 'weekly',
    relatedDuties: ['학급담임', '담임'],
    tips: ['금요일 배부 원칙', '학부모 앱/홈페이지 동시 게시'],
  },
  {
    id: 'weekly-002',
    title: '학급회의 진행',
    description: '학급 자치회의, 주간 반성 및 다음 주 계획',
    category: '학급경영',
    priority: 'low',
    frequency: 'weekly',
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'weekly-003',
    title: '생활지도 상담',
    description: '학생 개별 면담, 또래 관계 파악, 문제 행동 지도',
    category: '학급경영',
    priority: 'medium',
    frequency: 'weekly',
    relatedDuties: ['학급담임', '담임', '생활지도부'],
  },

  // ===== 월간 업무 =====
  {
    id: 'monthly-001',
    title: '학급 환경 정비',
    description: '게시판 교체, 학습 자료 정리, 청결 점검',
    category: '학급경영',
    priority: 'low',
    frequency: 'monthly',
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'monthly-002',
    title: '안전점검의 날 활동',
    description: '매월 4일 안전점검, 교실 내 위험요소 점검',
    category: '안전',
    priority: 'medium',
    frequency: 'monthly',
    relatedDuties: ['학급담임', '담임', '안전부'],
    dueDate: '04',
  },
  {
    id: 'monthly-003',
    title: '생일 축하 및 특별 행사',
    description: '이달의 생일 학생 축하, 학급 특색 활동',
    category: '학급경영',
    priority: 'low',
    frequency: 'monthly',
    relatedDuties: ['학급담임', '담임'],
  },
];

// ===== 3월 업무 =====
export const marchTasks: BasicTask[] = [
  {
    id: 'mar-001',
    title: '학급 개편 및 교실 배치',
    description: '학급 명단 확인, 자리 배치, 학급 규칙 정하기',
    category: '학급경영',
    priority: 'high',
    frequency: 'annual',
    month: 3,
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'mar-002',
    title: '학부모 총회 준비 및 참석',
    description: '학급 경영 계획 발표, 학부모 의견 청취',
    category: '학부모',
    priority: 'high',
    frequency: 'annual',
    month: 3,
    dueDate: '03-15',
    relatedDuties: ['학급담임', '담임', '학부모회'],
  },
  {
    id: 'mar-003',
    title: '학급 임원 선거 지도',
    description: '회장, 부회장, 각종 부장 선출 지도',
    category: '학급경영',
    priority: 'medium',
    frequency: 'semester',
    month: 3,
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'mar-004',
    title: '학생 기초 조사서 수합',
    description: '가정환경, 건강상태, 특이사항 파악',
    category: '학급경영',
    priority: 'high',
    frequency: 'annual',
    month: 3,
    dueDate: '03-10',
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'mar-005',
    title: '학교폭력 예방교육',
    description: '학기초 학교폭력 예방 교육 실시 (법정 의무)',
    category: '안전',
    priority: 'high',
    frequency: 'semester',
    month: 3,
    relatedDuties: ['학급담임', '담임', '생활지도부', '학폭'],
  },
  {
    id: 'mar-006',
    title: '방과후학교/돌봄교실 신청 안내',
    description: '방과후학교, 돌봄교실 신청서 배부 및 수합',
    category: '방과후',
    priority: 'medium',
    frequency: 'semester',
    month: 3,
    relatedDuties: ['학급담임', '담임', '방과후부', '돌봄부'],
  },
];

// ===== 4월 업무 =====
export const aprilTasks: BasicTask[] = [
  {
    id: 'apr-001',
    title: '과학의 달 행사 참여',
    description: '과학의 날 행사, 과학 탐구 대회 지도',
    category: '교육과정',
    priority: 'medium',
    frequency: 'annual',
    month: 4,
    relatedDuties: ['학급담임', '담임', '과학부'],
  },
  {
    id: 'apr-002',
    title: '봄 현장체험학습 계획',
    description: '봄 현장체험학습 계획서 작성, 학부모 동의서 수합',
    category: '체험학습',
    priority: 'high',
    frequency: 'annual',
    month: 4,
    relatedDuties: ['학급담임', '담임', '현장체험학습'],
  },
  {
    id: 'apr-003',
    title: '정보통신윤리교육',
    description: '사이버 폭력 예방, 인터넷/스마트폰 중독 예방 교육',
    category: '안전',
    priority: 'medium',
    frequency: 'semester',
    month: 4,
    relatedDuties: ['학급담임', '담임', '정보부'],
  },
];

// ===== 5월 업무 =====
export const mayTasks: BasicTask[] = [
  {
    id: 'may-001',
    title: '어린이날 행사 참여',
    description: '어린이날 기념 학교 행사, 학급 행사 진행',
    category: '행사',
    priority: 'medium',
    frequency: 'annual',
    month: 5,
    dueDate: '05-05',
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'may-002',
    title: '가정의 달 행사',
    description: '어버이날, 스승의날 관련 행사 및 카드 쓰기 지도',
    category: '행사',
    priority: 'medium',
    frequency: 'annual',
    month: 5,
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'may-003',
    title: '학부모 공개수업/참여수업',
    description: '학부모 참관 수업 진행, 학급 설명회',
    category: '학부모',
    priority: 'high',
    frequency: 'semester',
    month: 5,
    relatedDuties: ['학급담임', '담임', '학부모회'],
  },
  {
    id: 'may-004',
    title: '봄 현장체험학습 실시',
    description: '봄 현장체험학습 진행, 안전지도',
    category: '체험학습',
    priority: 'high',
    frequency: 'annual',
    month: 5,
    relatedDuties: ['학급담임', '담임', '현장체험학습'],
  },
];

// ===== 6월 업무 =====
export const juneTasks: BasicTask[] = [
  {
    id: 'jun-001',
    title: '1학기 학부모 상담주간',
    description: '학부모 개별 상담, 학생 학습/생활 상담',
    category: '학부모',
    priority: 'high',
    frequency: 'semester',
    month: 6,
    relatedDuties: ['학급담임', '담임', '학부모상담'],
  },
  {
    id: 'jun-002',
    title: '호국보훈의 달 교육',
    description: '현충일 계기 교육, 나라사랑 교육',
    category: '교육과정',
    priority: 'medium',
    frequency: 'annual',
    month: 6,
    dueDate: '06-06',
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'jun-003',
    title: '1학기 성적 처리',
    description: '1학기 평가 결과 정리, 나이스 성적 입력',
    category: '생활기록',
    priority: 'high',
    frequency: 'semester',
    month: 6,
    dueDate: '06-25',
    relatedDuties: ['학급담임', '담임', '나이스'],
  },
  {
    id: 'jun-004',
    title: '1학기 생활기록부 입력',
    description: '창체, 행동특성, 교과세특 등 나이스 입력',
    category: '생활기록',
    priority: 'high',
    frequency: 'semester',
    month: 6,
    dueDate: '06-30',
    relatedDuties: ['학급담임', '담임', '생기부', '나이스'],
  },
];

// ===== 7월 업무 =====
export const julyTasks: BasicTask[] = [
  {
    id: 'jul-001',
    title: '여름방학 안내',
    description: '여름방학 생활 안내, 안전 교육, 과제 안내',
    category: '학급경영',
    priority: 'high',
    frequency: 'annual',
    month: 7,
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'jul-002',
    title: '1학기 종업식',
    description: '1학기 종업식 참여, 학급 정리',
    category: '행사',
    priority: 'medium',
    frequency: 'semester',
    month: 7,
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'jul-003',
    title: '1학기 생기부 마감',
    description: '1학기 생활기록부 최종 점검 및 마감',
    category: '생활기록',
    priority: 'high',
    frequency: 'semester',
    month: 7,
    dueDate: '07-15',
    relatedDuties: ['학급담임', '담임', '생기부', '나이스'],
  },
  {
    id: 'jul-004',
    title: '물놀이 안전교육',
    description: '여름철 물놀이 안전교육 (법정 의무)',
    category: '안전',
    priority: 'high',
    frequency: 'annual',
    month: 7,
    relatedDuties: ['학급담임', '담임', '안전부'],
  },
];

// ===== 9월 업무 =====
export const septemberTasks: BasicTask[] = [
  {
    id: 'sep-001',
    title: '2학기 시작 및 적응 지도',
    description: '2학기 학급 운영 계획, 자리 재배치',
    category: '학급경영',
    priority: 'high',
    frequency: 'semester',
    month: 9,
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'sep-002',
    title: '2학기 학급임원 선거',
    description: '2학기 학급 임원 선출 지도',
    category: '학급경영',
    priority: 'medium',
    frequency: 'semester',
    month: 9,
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'sep-003',
    title: '학교폭력 예방교육 (2학기)',
    description: '2학기 학교폭력 예방 교육 (법정 의무)',
    category: '안전',
    priority: 'high',
    frequency: 'semester',
    month: 9,
    relatedDuties: ['학급담임', '담임', '생활지도부', '학폭'],
  },
];

// ===== 10월 업무 =====
export const octoberTasks: BasicTask[] = [
  {
    id: 'oct-001',
    title: '가을 운동회/체육대회',
    description: '운동회 참가, 학급 응원 지도',
    category: '행사',
    priority: 'high',
    frequency: 'annual',
    month: 10,
    relatedDuties: ['학급담임', '담임', '체육부', '운동회', '체육대회'],
  },
  {
    id: 'oct-002',
    title: '독서의 달 행사',
    description: '독서 행사 참여, 독서록 점검',
    category: '교육과정',
    priority: 'medium',
    frequency: 'annual',
    month: 10,
    relatedDuties: ['학급담임', '담임', '독서교육부'],
  },
  {
    id: 'oct-003',
    title: '가을 현장체험학습',
    description: '가을 현장체험학습 계획 및 실시',
    category: '체험학습',
    priority: 'high',
    frequency: 'annual',
    month: 10,
    relatedDuties: ['학급담임', '담임', '현장체험학습'],
  },
];

// ===== 11월 업무 =====
export const novemberTasks: BasicTask[] = [
  {
    id: 'nov-001',
    title: '2학기 학부모 상담주간',
    description: '학부모 개별 상담, 학습/진로 상담',
    category: '학부모',
    priority: 'high',
    frequency: 'semester',
    month: 11,
    relatedDuties: ['학급담임', '담임', '학부모상담'],
  },
  {
    id: 'nov-002',
    title: '학예발표회 준비',
    description: '학예발표회 발표 준비, 학급 공연 지도',
    category: '행사',
    priority: 'medium',
    frequency: 'annual',
    month: 11,
    relatedDuties: ['학급담임', '담임', '학예발표회'],
  },
  {
    id: 'nov-003',
    title: '불조심 강조의 달 교육',
    description: '화재 예방 교육, 소화기 사용법 지도',
    category: '안전',
    priority: 'medium',
    frequency: 'annual',
    month: 11,
    relatedDuties: ['학급담임', '담임', '안전부'],
  },
];

// ===== 12월 업무 =====
export const decemberTasks: BasicTask[] = [
  {
    id: 'dec-001',
    title: '2학기 성적 처리',
    description: '2학기 평가 결과 정리, 나이스 성적 입력',
    category: '생활기록',
    priority: 'high',
    frequency: 'semester',
    month: 12,
    dueDate: '12-20',
    relatedDuties: ['학급담임', '담임', '나이스'],
  },
  {
    id: 'dec-002',
    title: '2학기 생활기록부 입력',
    description: '창체, 행동특성, 교과세특 등 나이스 입력',
    category: '생활기록',
    priority: 'high',
    frequency: 'semester',
    month: 12,
    dueDate: '12-25',
    relatedDuties: ['학급담임', '담임', '생기부', '나이스'],
  },
  {
    id: 'dec-003',
    title: '겨울방학 안내',
    description: '겨울방학 생활 안내, 안전 교육, 과제 안내',
    category: '학급경영',
    priority: 'high',
    frequency: 'annual',
    month: 12,
    relatedDuties: ['학급담임', '담임'],
  },
];

// ===== 2월 업무 =====
export const februaryTasks: BasicTask[] = [
  {
    id: 'feb-001',
    title: '생활기록부 최종 마감',
    description: '연간 생활기록부 최종 점검 및 마감',
    category: '생활기록',
    priority: 'high',
    frequency: 'annual',
    month: 2,
    dueDate: '02-15',
    relatedDuties: ['학급담임', '담임', '생기부', '나이스'],
  },
  {
    id: 'feb-002',
    title: '학급 물품 정리 및 반납',
    description: '학급 비품 정리, 교과서 반납, 교실 정리',
    category: '학급경영',
    priority: 'medium',
    frequency: 'annual',
    month: 2,
    relatedDuties: ['학급담임', '담임'],
  },
  {
    id: 'feb-003',
    title: '종업식/졸업식',
    description: '수료증/졸업장 배부, 학년말 인사',
    category: '행사',
    priority: 'high',
    frequency: 'annual',
    month: 2,
    relatedDuties: ['학급담임', '담임', '졸업식'],
  },
];

// ===== 6학년 특별 업무 =====
export const grade6SpecialTasks: BasicTask[] = [
  {
    id: 'g6-001',
    title: '졸업앨범 계획 수립',
    description: '졸업앨범 업체 선정, 제작 일정 계획',
    category: '행사',
    priority: 'high',
    frequency: 'annual',
    month: 3,
    grade: [6],
    relatedDuties: ['6학년 담임', '졸업앨범'],
  },
  {
    id: 'g6-002',
    title: '졸업앨범 촬영',
    description: '개인 사진, 단체 사진, 활동 사진 촬영',
    category: '행사',
    priority: 'high',
    frequency: 'annual',
    month: 4,
    grade: [6],
    relatedDuties: ['6학년 담임', '졸업앨범'],
  },
  {
    id: 'g6-003',
    title: '수학여행/졸업여행',
    description: '6학년 수학여행 또는 졸업여행 계획 및 실시',
    category: '체험학습',
    priority: 'high',
    frequency: 'annual',
    month: 5,
    grade: [6],
    relatedDuties: ['6학년 담임', '수학여행', '졸업여행', '현장체험학습'],
  },
  {
    id: 'g6-004',
    title: '중학교 진학설명회',
    description: '중학교 배정 안내, 진학 준비 사항 설명',
    category: '학부모',
    priority: 'high',
    frequency: 'annual',
    month: 9,
    grade: [6],
    relatedDuties: ['6학년 담임'],
  },
  {
    id: 'g6-005',
    title: '중학교 배정 원서 작성',
    description: '중학교 배정 원서 작성 및 제출 지도',
    category: '학급경영',
    priority: 'high',
    frequency: 'annual',
    month: 10,
    dueDate: '10-31',
    grade: [6],
    relatedDuties: ['6학년 담임'],
  },
  {
    id: 'g6-006',
    title: '졸업앨범 원고 수집',
    description: '졸업앨범 원고 수집 및 검토',
    category: '행사',
    priority: 'medium',
    frequency: 'annual',
    month: 6,
    grade: [6],
    relatedDuties: ['6학년 담임', '졸업앨범'],
  },
  {
    id: 'g6-007',
    title: '졸업앨범 편집 및 교정',
    description: '졸업앨범 시안 검토, 오류 수정',
    category: '행사',
    priority: 'medium',
    frequency: 'annual',
    month: 11,
    grade: [6],
    relatedDuties: ['6학년 담임', '졸업앨범'],
  },
  {
    id: 'g6-008',
    title: '졸업식 준비',
    description: '졸업식 준비, 송사 작성, 리허설',
    category: '행사',
    priority: 'high',
    frequency: 'annual',
    month: 2,
    grade: [6],
    relatedDuties: ['6학년 담임', '졸업식'],
  },
  {
    id: 'g6-009',
    title: '졸업앨범 배부',
    description: '졸업앨범 검수 및 학생 배부',
    category: '행사',
    priority: 'medium',
    frequency: 'annual',
    month: 1,
    grade: [6],
    relatedDuties: ['6학년 담임', '졸업앨범'],
  },
];

// ===== 1학년 특별 업무 =====
export const grade1SpecialTasks: BasicTask[] = [
  {
    id: 'g1-001',
    title: '입학식 준비 및 참석',
    description: '입학식 준비, 신입생 맞이, 교실 안내',
    category: '행사',
    priority: 'high',
    frequency: 'annual',
    month: 3,
    grade: [1],
    relatedDuties: ['1학년 담임', '입학식'],
  },
  {
    id: 'g1-002',
    title: '학교생활 적응 지도',
    description: '학교 시설 안내, 급식/화장실/청소 지도',
    category: '학급경영',
    priority: 'high',
    frequency: 'annual',
    month: 3,
    grade: [1],
    relatedDuties: ['1학년 담임'],
  },
  {
    id: 'g1-003',
    title: '한글 해득 검사',
    description: '한글 해득 여부 진단, 미해득 학생 파악',
    category: '교육과정',
    priority: 'high',
    frequency: 'annual',
    month: 3,
    grade: [1],
    relatedDuties: ['1학년 담임'],
  },
  {
    id: 'g1-004',
    title: '한글 미해득 학생 집중 지도',
    description: '한글 미해득 학생 개별 지도, 한글책임교육',
    category: '교육과정',
    priority: 'high',
    frequency: 'semester',
    month: 3,
    grade: [1],
    relatedDuties: ['1학년 담임'],
  },
];

// 전체 담임 기본 업무 목록 (통합)
export const allHomeroomBasicTasks: BasicTask[] = [
  ...commonHomeroomTasks,
  ...marchTasks,
  ...aprilTasks,
  ...mayTasks,
  ...juneTasks,
  ...julyTasks,
  ...septemberTasks,
  ...octoberTasks,
  ...novemberTasks,
  ...decemberTasks,
  ...februaryTasks,
];

// 6학년 담임 전체 업무
export const grade6AllTasks: BasicTask[] = [
  ...allHomeroomBasicTasks,
  ...grade6SpecialTasks,
];

// 1학년 담임 전체 업무
export const grade1AllTasks: BasicTask[] = [
  ...allHomeroomBasicTasks,
  ...grade1SpecialTasks,
];

// 학년별 담임 업무 가져오기
export function getTasksForGrade(grade: number): BasicTask[] {
  const baseTasks = [...allHomeroomBasicTasks];

  if (grade === 1) {
    return [...baseTasks, ...grade1SpecialTasks];
  } else if (grade === 6) {
    return [...baseTasks, ...grade6SpecialTasks];
  }

  return baseTasks;
}

// 현재 월에 해당하는 업무 가져오기
export function getTasksForMonth(month: number, grade?: number): BasicTask[] {
  const tasks = grade ? getTasksForGrade(grade) : allHomeroomBasicTasks;
  return tasks.filter(task =>
    task.frequency === 'daily' ||
    task.frequency === 'weekly' ||
    task.frequency === 'monthly' ||
    task.month === month
  );
}

// 사용자 업무분장에 맞는 업무 필터링
export function getTasksForDuties(userDuties: string[]): BasicTask[] {
  const allTasks = [...allHomeroomBasicTasks, ...grade6SpecialTasks, ...grade1SpecialTasks];

  // 학년 담임 체크
  const gradeMatch = userDuties.find(duty => /^[1-6]학년 담임$/.test(duty));
  let baseTasks: BasicTask[] = [];

  if (gradeMatch) {
    const grade = parseInt(gradeMatch[0]);
    baseTasks = getTasksForGrade(grade);
  } else if (userDuties.some(duty => ['학급담임', '담임'].includes(duty))) {
    baseTasks = allHomeroomBasicTasks;
  }

  // 추가 업무 필터링
  const additionalTasks = allTasks.filter(task =>
    task.relatedDuties.some(duty => userDuties.includes(duty)) &&
    !baseTasks.some(bt => bt.id === task.id)
  );

  return [...baseTasks, ...additionalTasks];
}
