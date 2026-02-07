// ============================================================
// 초등학교 교육과정 종합 데이터 (curriculum-data.ts)
// 2015 개정 교육과정 기반 + 2022 개정 교육과정 반영
// 출처: 교육부 고시, 국가교육과정정보센터(NCIC), 한국교육과정평가원
// ============================================================

// ----------------------------------------
// 1. 인터페이스 정의
// ----------------------------------------

export interface SubjectHours {
  subject: string;
  weekly: number;
  annual: number;
  minWeekly: number;
  maxWeekly: number;
  category: '교과' | '창의적체험활동';
}

export interface GradeHours {
  grade: number;
  curriculum: '2015개정' | '2022개정';
  subjects: SubjectHours[];
  totalWeekly: number;
  totalAnnual: number;
  weeks: number;
}

export interface TextbookUnit {
  id: string;
  subject: string;
  grade: number;
  semester: 1 | 2;
  unitNumber: number;
  title: string;
  hours: number;
  keywords: string[];
}

export interface MonthlyTheme {
  month: number;
  name: string;
  themes: string[];
  events: string[];
  crossCurricular: string[];
}

export interface CrossCurricularTheme {
  id: string;
  name: string;
  description: string;
  requiredActivities: string[];
  relatedSubjects: string[];
  minimumHours: number;
  gradeGuidance: Record<string, string>;
}

export interface CreativeActivity {
  id: string;
  area: string;
  name: string;
  description: string;
  examples: string[];
  recommendedGrades: number[];
}

export interface AssessmentMethod {
  id: string;
  name: string;
  type: '수행평가' | '지필평가' | '관찰평가' | '포트폴리오' | '자기평가' | '동료평가';
  description: string;
  applicableGrades: number[];
  examples: string[];
}

export interface WeeklyScheduleTemplate {
  id: string;
  grade: number;
  name: string;
  description: string;
  schedule: {
    day: string;
    periods: { period: number; subject: string; topic?: string }[];
  }[];
}

// ----------------------------------------
// 2. 학년별 주당 시수 배당표
// ----------------------------------------

export const gradeHoursData: GradeHours[] = [
  {
    grade: 1, curriculum: '2015개정', weeks: 34, totalWeekly: 22, totalAnnual: 748,
    subjects: [
      { subject: '국어', weekly: 8, annual: 272, minWeekly: 6, maxWeekly: 10, category: '교과' },
      { subject: '수학', weekly: 4, annual: 136, minWeekly: 3, maxWeekly: 5, category: '교과' },
      { subject: '바른생활', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '슬기로운생활', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '즐거운생활', weekly: 4, annual: 136, minWeekly: 3, maxWeekly: 5, category: '교과' },
      { subject: '창의적체험활동', weekly: 2, annual: 68, minWeekly: 2, maxWeekly: 3, category: '창의적체험활동' },
    ],
  },
  {
    grade: 2, curriculum: '2015개정', weeks: 34, totalWeekly: 23, totalAnnual: 782,
    subjects: [
      { subject: '국어', weekly: 8, annual: 272, minWeekly: 6, maxWeekly: 10, category: '교과' },
      { subject: '수학', weekly: 4, annual: 136, minWeekly: 3, maxWeekly: 5, category: '교과' },
      { subject: '바른생활', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '슬기로운생활', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '즐거운생활', weekly: 4, annual: 136, minWeekly: 3, maxWeekly: 5, category: '교과' },
      { subject: '창의적체험활동', weekly: 3, annual: 102, minWeekly: 3, maxWeekly: 4, category: '창의적체험활동' },
    ],
  },
  {
    grade: 3, curriculum: '2015개정', weeks: 34, totalWeekly: 30, totalAnnual: 1020,
    subjects: [
      { subject: '국어', weekly: 6, annual: 204, minWeekly: 4, maxWeekly: 8, category: '교과' },
      { subject: '수학', weekly: 4, annual: 136, minWeekly: 3, maxWeekly: 5, category: '교과' },
      { subject: '사회', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '과학', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '영어', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '도덕', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '음악', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '미술', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '체육', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '창의적체험활동', weekly: 3, annual: 102, minWeekly: 3, maxWeekly: 4, category: '창의적체험활동' },
    ],
  },
  {
    grade: 4, curriculum: '2015개정', weeks: 34, totalWeekly: 30, totalAnnual: 1020,
    subjects: [
      { subject: '국어', weekly: 6, annual: 204, minWeekly: 4, maxWeekly: 8, category: '교과' },
      { subject: '수학', weekly: 4, annual: 136, minWeekly: 3, maxWeekly: 5, category: '교과' },
      { subject: '사회', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '과학', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '영어', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '도덕', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '음악', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '미술', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '체육', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '창의적체험활동', weekly: 3, annual: 102, minWeekly: 3, maxWeekly: 4, category: '창의적체험활동' },
    ],
  },
  {
    grade: 5, curriculum: '2015개정', weeks: 34, totalWeekly: 33, totalAnnual: 1122,
    subjects: [
      { subject: '국어', weekly: 6, annual: 204, minWeekly: 4, maxWeekly: 8, category: '교과' },
      { subject: '수학', weekly: 4, annual: 136, minWeekly: 3, maxWeekly: 5, category: '교과' },
      { subject: '사회', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '과학', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '영어', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '도덕', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '음악', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '미술', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '체육', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '실과', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '창의적체험활동', weekly: 3, annual: 102, minWeekly: 3, maxWeekly: 4, category: '창의적체험활동' },
    ],
  },
  {
    grade: 6, curriculum: '2015개정', weeks: 34, totalWeekly: 33, totalAnnual: 1122,
    subjects: [
      { subject: '국어', weekly: 6, annual: 204, minWeekly: 4, maxWeekly: 8, category: '교과' },
      { subject: '수학', weekly: 4, annual: 136, minWeekly: 3, maxWeekly: 5, category: '교과' },
      { subject: '사회', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '과학', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '영어', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '도덕', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '음악', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '미술', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '체육', weekly: 3, annual: 102, minWeekly: 2, maxWeekly: 4, category: '교과' },
      { subject: '실과', weekly: 2, annual: 68, minWeekly: 1, maxWeekly: 3, category: '교과' },
      { subject: '창의적체험활동', weekly: 3, annual: 102, minWeekly: 3, maxWeekly: 4, category: '창의적체험활동' },
    ],
  },
];

// ----------------------------------------
// 2-1. 학사일정 주차 데이터
// ----------------------------------------

export const SCHOOL_WEEKS = {
  firstSemester: { start: 3, end: 7, weeks: 17 },  // 3월~7월 17주
  secondSemester: { start: 9, end: 12, weeks: 17 }, // 9월~12월+1~2월 17주
  total: 34,
  monthWeeks: [
    { month: 3, weeks: 4, startWeek: 1 },
    { month: 4, weeks: 4, startWeek: 5 },
    { month: 5, weeks: 4, startWeek: 9 },
    { month: 6, weeks: 4, startWeek: 13 },
    { month: 7, weeks: 1, startWeek: 17 },
    { month: 9, weeks: 4, startWeek: 18 },
    { month: 10, weeks: 4, startWeek: 22 },
    { month: 11, weeks: 4, startWeek: 26 },
    { month: 12, weeks: 4, startWeek: 30 },
    { month: 1, weeks: 1, startWeek: 34 },
  ],
};

// ----------------------------------------
// 3. 교과서 단원 데이터 (실제 교과서 기반)
// ----------------------------------------

export const textbookUnits: TextbookUnit[] = [
  // ======================== 1학년 국어 ========================
  { id: 'kor-1-1-1', subject: '국어', grade: 1, semester: 1, unitNumber: 1, title: '바른 자세로 읽고 쓰기', hours: 20, keywords: ['자세', '읽기', '쓰기'] },
  { id: 'kor-1-1-2', subject: '국어', grade: 1, semester: 1, unitNumber: 2, title: '재미있게 ㄱㄴㄷ', hours: 18, keywords: ['자음', '한글'] },
  { id: 'kor-1-1-3', subject: '국어', grade: 1, semester: 1, unitNumber: 3, title: '다 함께 아야어여', hours: 18, keywords: ['모음', '한글'] },
  { id: 'kor-1-1-4', subject: '국어', grade: 1, semester: 1, unitNumber: 4, title: '글자를 만들어요', hours: 18, keywords: ['글자', '조합', '받침'] },
  { id: 'kor-1-1-5', subject: '국어', grade: 1, semester: 1, unitNumber: 5, title: '다정하게 인사해요', hours: 16, keywords: ['인사', '예절'] },
  { id: 'kor-1-1-6', subject: '국어', grade: 1, semester: 1, unitNumber: 6, title: '받침이 있는 글자', hours: 18, keywords: ['받침', '읽기'] },
  { id: 'kor-1-1-7', subject: '국어', grade: 1, semester: 1, unitNumber: 7, title: '생각을 나타내요', hours: 16, keywords: ['문장', '표현'] },
  { id: 'kor-1-1-8', subject: '국어', grade: 1, semester: 1, unitNumber: 8, title: '소리 내어 또박또박 읽어요', hours: 16, keywords: ['낭독', '또박또박'] },
  { id: 'kor-1-1-9', subject: '국어', grade: 1, semester: 1, unitNumber: 9, title: '그림일기를 써요', hours: 16, keywords: ['일기', '그림'] },
  { id: 'kor-1-2-1', subject: '국어', grade: 1, semester: 2, unitNumber: 1, title: '소중한 책을 소개해요', hours: 16, keywords: ['책', '소개', '독서'] },
  { id: 'kor-1-2-2', subject: '국어', grade: 1, semester: 2, unitNumber: 2, title: '소리와 모양을 흉내 내요', hours: 18, keywords: ['의성어', '의태어'] },
  { id: 'kor-1-2-3', subject: '국어', grade: 1, semester: 2, unitNumber: 3, title: '문장으로 표현해요', hours: 18, keywords: ['문장', '쓰기'] },
  { id: 'kor-1-2-4', subject: '국어', grade: 1, semester: 2, unitNumber: 4, title: '바르게 말해요', hours: 16, keywords: ['바른말', '높임말'] },
  { id: 'kor-1-2-5', subject: '국어', grade: 1, semester: 2, unitNumber: 5, title: '알맞은 목소리로 읽어요', hours: 16, keywords: ['낭독', '목소리'] },
  { id: 'kor-1-2-6', subject: '국어', grade: 1, semester: 2, unitNumber: 6, title: '고운 말을 해요', hours: 16, keywords: ['고운말', '언어예절'] },
  { id: 'kor-1-2-7', subject: '국어', grade: 1, semester: 2, unitNumber: 7, title: '무엇이 중요할까요', hours: 16, keywords: ['중심내용', '읽기'] },
  { id: 'kor-1-2-8', subject: '국어', grade: 1, semester: 2, unitNumber: 8, title: '떠오르는 느낌을 살려서', hours: 16, keywords: ['느낌', '감상'] },
  { id: 'kor-1-2-9', subject: '국어', grade: 1, semester: 2, unitNumber: 9, title: '겪은 일을 글로 써요', hours: 16, keywords: ['경험', '글쓰기'] },

  // ======================== 1학년 수학 ========================
  { id: 'math-1-1-1', subject: '수학', grade: 1, semester: 1, unitNumber: 1, title: '9까지의 수', hours: 16, keywords: ['수', '세기', '1~9'] },
  { id: 'math-1-1-2', subject: '수학', grade: 1, semester: 1, unitNumber: 2, title: '여러 가지 모양', hours: 10, keywords: ['모양', '상자', '공'] },
  { id: 'math-1-1-3', subject: '수학', grade: 1, semester: 1, unitNumber: 3, title: '덧셈과 뺄셈', hours: 18, keywords: ['덧셈', '뺄셈'] },
  { id: 'math-1-1-4', subject: '수학', grade: 1, semester: 1, unitNumber: 4, title: '비교하기', hours: 10, keywords: ['비교', '길이', '무게'] },
  { id: 'math-1-1-5', subject: '수학', grade: 1, semester: 1, unitNumber: 5, title: '50까지의 수', hours: 14, keywords: ['수', '십', '50까지'] },
  { id: 'math-1-2-1', subject: '수학', grade: 1, semester: 2, unitNumber: 1, title: '100까지의 수', hours: 16, keywords: ['수', '100', '세기'] },
  { id: 'math-1-2-2', subject: '수학', grade: 1, semester: 2, unitNumber: 2, title: '덧셈과 뺄셈(1)', hours: 14, keywords: ['덧셈', '뺄셈'] },
  { id: 'math-1-2-3', subject: '수학', grade: 1, semester: 2, unitNumber: 3, title: '여러 가지 모양', hours: 10, keywords: ['평면도형', '네모', '세모'] },
  { id: 'math-1-2-4', subject: '수학', grade: 1, semester: 2, unitNumber: 4, title: '덧셈과 뺄셈(2)', hours: 16, keywords: ['받아올림', '덧셈'] },
  { id: 'math-1-2-5', subject: '수학', grade: 1, semester: 2, unitNumber: 5, title: '시계 보기와 규칙 찾기', hours: 12, keywords: ['시계', '규칙'] },
  { id: 'math-1-2-6', subject: '수학', grade: 1, semester: 2, unitNumber: 6, title: '덧셈과 뺄셈(3)', hours: 12, keywords: ['세 수', '계산'] },

  // ======================== 1-2학년 통합교과 ========================
  { id: 'right-1-1-1', subject: '바른생활', grade: 1, semester: 1, unitNumber: 1, title: '학교에 가면', hours: 10, keywords: ['학교', '규칙'] },
  { id: 'right-1-1-2', subject: '바른생활', grade: 1, semester: 1, unitNumber: 2, title: '봄이 오면', hours: 12, keywords: ['봄', '자연'] },
  { id: 'right-1-2-1', subject: '바른생활', grade: 1, semester: 2, unitNumber: 1, title: '이웃과 함께해요', hours: 12, keywords: ['이웃', '배려'] },
  { id: 'right-1-2-2', subject: '바른생활', grade: 1, semester: 2, unitNumber: 2, title: '겨울이 오면', hours: 12, keywords: ['겨울', '건강'] },
  { id: 'wise-1-1-1', subject: '슬기로운생활', grade: 1, semester: 1, unitNumber: 1, title: '학교에 가면', hours: 10, keywords: ['학교', '탐구'] },
  { id: 'wise-1-1-2', subject: '슬기로운생활', grade: 1, semester: 1, unitNumber: 2, title: '봄이 오면', hours: 12, keywords: ['봄', '관찰'] },
  { id: 'wise-1-2-1', subject: '슬기로운생활', grade: 1, semester: 2, unitNumber: 1, title: '이웃과 함께해요', hours: 12, keywords: ['이웃', '마을'] },
  { id: 'wise-1-2-2', subject: '슬기로운생활', grade: 1, semester: 2, unitNumber: 2, title: '겨울이 오면', hours: 12, keywords: ['겨울', '탐구'] },
  { id: 'fun-1-1-1', subject: '즐거운생활', grade: 1, semester: 1, unitNumber: 1, title: '학교에 가면', hours: 20, keywords: ['학교', '놀이'] },
  { id: 'fun-1-1-2', subject: '즐거운생활', grade: 1, semester: 1, unitNumber: 2, title: '봄이 오면', hours: 24, keywords: ['봄', '표현'] },
  { id: 'fun-1-2-1', subject: '즐거운생활', grade: 1, semester: 2, unitNumber: 1, title: '이웃과 함께해요', hours: 24, keywords: ['이웃', '놀이'] },
  { id: 'fun-1-2-2', subject: '즐거운생활', grade: 1, semester: 2, unitNumber: 2, title: '겨울이 오면', hours: 24, keywords: ['겨울', '만들기'] },
  { id: 'right-2-1-1', subject: '바른생활', grade: 2, semester: 1, unitNumber: 1, title: '알쏭달쏭 나', hours: 12, keywords: ['자기이해', '성장'] },
  { id: 'right-2-1-2', subject: '바른생활', grade: 2, semester: 1, unitNumber: 2, title: '봄이 오면', hours: 12, keywords: ['봄', '환경'] },
  { id: 'right-2-2-1', subject: '바른생활', grade: 2, semester: 2, unitNumber: 1, title: '동네 한 바퀴', hours: 12, keywords: ['동네', '공공장소'] },
  { id: 'right-2-2-2', subject: '바른생활', grade: 2, semester: 2, unitNumber: 2, title: '겨울탐정', hours: 12, keywords: ['겨울', '탐구'] },
  { id: 'wise-2-1-1', subject: '슬기로운생활', grade: 2, semester: 1, unitNumber: 1, title: '알쏭달쏭 나', hours: 12, keywords: ['자기탐구', '관찰'] },
  { id: 'wise-2-1-2', subject: '슬기로운생활', grade: 2, semester: 1, unitNumber: 2, title: '봄이 오면', hours: 12, keywords: ['봄', '성장'] },
  { id: 'wise-2-2-1', subject: '슬기로운생활', grade: 2, semester: 2, unitNumber: 1, title: '동네 한 바퀴', hours: 12, keywords: ['동네', '시설'] },
  { id: 'wise-2-2-2', subject: '슬기로운생활', grade: 2, semester: 2, unitNumber: 2, title: '겨울탐정', hours: 12, keywords: ['겨울', '계절'] },
  { id: 'fun-2-1-1', subject: '즐거운생활', grade: 2, semester: 1, unitNumber: 1, title: '알쏭달쏭 나', hours: 24, keywords: ['자기표현', '놀이'] },
  { id: 'fun-2-1-2', subject: '즐거운생활', grade: 2, semester: 1, unitNumber: 2, title: '봄이 오면', hours: 24, keywords: ['봄', '노래'] },
  { id: 'fun-2-2-1', subject: '즐거운생활', grade: 2, semester: 2, unitNumber: 1, title: '동네 한 바퀴', hours: 24, keywords: ['동네', '표현'] },
  { id: 'fun-2-2-2', subject: '즐거운생활', grade: 2, semester: 2, unitNumber: 2, title: '겨울탐정', hours: 24, keywords: ['겨울', '만들기'] },

  // ======================== 2학년 국어 ========================
  { id: 'kor-2-1-1', subject: '국어', grade: 2, semester: 1, unitNumber: 1, title: '시를 즐겨요', hours: 16, keywords: ['시', '감상'] },
  { id: 'kor-2-1-2', subject: '국어', grade: 2, semester: 1, unitNumber: 2, title: '자신 있게 말해요', hours: 16, keywords: ['발표', '자신감'] },
  { id: 'kor-2-1-3', subject: '국어', grade: 2, semester: 1, unitNumber: 3, title: '마음을 나누어요', hours: 18, keywords: ['마음', '공감'] },
  { id: 'kor-2-1-4', subject: '국어', grade: 2, semester: 1, unitNumber: 4, title: '말놀이를 해요', hours: 16, keywords: ['말놀이', '어휘'] },
  { id: 'kor-2-1-5', subject: '국어', grade: 2, semester: 1, unitNumber: 5, title: '낱말을 바르고 정확하게 써요', hours: 18, keywords: ['맞춤법', '정확성'] },
  { id: 'kor-2-1-6', subject: '국어', grade: 2, semester: 1, unitNumber: 6, title: '차례대로 말해요', hours: 16, keywords: ['순서', '설명'] },
  { id: 'kor-2-1-7', subject: '국어', grade: 2, semester: 1, unitNumber: 7, title: '친구들에게 알려요', hours: 16, keywords: ['설명', '소개'] },
  { id: 'kor-2-1-8', subject: '국어', grade: 2, semester: 1, unitNumber: 8, title: '다양하게 표현해요', hours: 16, keywords: ['표현', '글쓰기'] },
  { id: 'kor-2-1-9', subject: '국어', grade: 2, semester: 1, unitNumber: 9, title: '생각을 생생하게 나타내요', hours: 16, keywords: ['묘사', '표현'] },
  { id: 'kor-2-1-10', subject: '국어', grade: 2, semester: 1, unitNumber: 10, title: '다른 사람을 생각해요', hours: 16, keywords: ['배려', '존중'] },
  { id: 'kor-2-1-11', subject: '국어', grade: 2, semester: 1, unitNumber: 11, title: '상상의 날개를 펴요', hours: 16, keywords: ['상상', '창작'] },
  { id: 'kor-2-2-1', subject: '국어', grade: 2, semester: 2, unitNumber: 1, title: '장면을 떠올리며', hours: 16, keywords: ['장면', '상상'] },
  { id: 'kor-2-2-2', subject: '국어', grade: 2, semester: 2, unitNumber: 2, title: '인상 깊었던 일을 써요', hours: 16, keywords: ['경험', '글쓰기'] },
  { id: 'kor-2-2-3', subject: '국어', grade: 2, semester: 2, unitNumber: 3, title: '말의 재미를 찾아서', hours: 16, keywords: ['말놀이', '재미'] },
  { id: 'kor-2-2-4', subject: '국어', grade: 2, semester: 2, unitNumber: 4, title: '인물의 마음을 짐작해요', hours: 16, keywords: ['인물', '추론'] },
  { id: 'kor-2-2-5', subject: '국어', grade: 2, semester: 2, unitNumber: 5, title: '간직하고 싶은 노래', hours: 14, keywords: ['노래', '시'] },
  { id: 'kor-2-2-6', subject: '국어', grade: 2, semester: 2, unitNumber: 6, title: '자세하게 소개해요', hours: 16, keywords: ['소개', '설명'] },
  { id: 'kor-2-2-7', subject: '국어', grade: 2, semester: 2, unitNumber: 7, title: '일이 일어난 차례를 살펴요', hours: 16, keywords: ['순서', '사건'] },
  { id: 'kor-2-2-8', subject: '국어', grade: 2, semester: 2, unitNumber: 8, title: '바르게 말해요', hours: 16, keywords: ['높임말', '예절'] },
  { id: 'kor-2-2-9', subject: '국어', grade: 2, semester: 2, unitNumber: 9, title: '주요 내용을 찾아요', hours: 16, keywords: ['중심내용', '요약'] },
  { id: 'kor-2-2-10', subject: '국어', grade: 2, semester: 2, unitNumber: 10, title: '칭찬하는 글을 써요', hours: 14, keywords: ['칭찬', '편지'] },
  { id: 'kor-2-2-11', subject: '국어', grade: 2, semester: 2, unitNumber: 11, title: '실감 나게 표현해요', hours: 14, keywords: ['표현', '실감'] },

  // ======================== 2학년 수학 ========================
  { id: 'math-2-1-1', subject: '수학', grade: 2, semester: 1, unitNumber: 1, title: '세 자리 수', hours: 14, keywords: ['세자리수', '백'] },
  { id: 'math-2-1-2', subject: '수학', grade: 2, semester: 1, unitNumber: 2, title: '여러 가지 도형', hours: 12, keywords: ['삼각형', '사각형', '원'] },
  { id: 'math-2-1-3', subject: '수학', grade: 2, semester: 1, unitNumber: 3, title: '덧셈과 뺄셈', hours: 16, keywords: ['받아올림', '받아내림'] },
  { id: 'math-2-1-4', subject: '수학', grade: 2, semester: 1, unitNumber: 4, title: '길이 재기', hours: 10, keywords: ['cm', '길이', '자'] },
  { id: 'math-2-1-5', subject: '수학', grade: 2, semester: 1, unitNumber: 5, title: '분류하기', hours: 10, keywords: ['분류', '기준'] },
  { id: 'math-2-1-6', subject: '수학', grade: 2, semester: 1, unitNumber: 6, title: '곱셈', hours: 14, keywords: ['곱셈', '몇의몇배'] },
  { id: 'math-2-2-1', subject: '수학', grade: 2, semester: 2, unitNumber: 1, title: '네 자리 수', hours: 12, keywords: ['네자리수', '천'] },
  { id: 'math-2-2-2', subject: '수학', grade: 2, semester: 2, unitNumber: 2, title: '곱셈구구', hours: 18, keywords: ['구구단', '곱셈구구'] },
  { id: 'math-2-2-3', subject: '수학', grade: 2, semester: 2, unitNumber: 3, title: '길이 재기', hours: 10, keywords: ['m', '미터'] },
  { id: 'math-2-2-4', subject: '수학', grade: 2, semester: 2, unitNumber: 4, title: '시각과 시간', hours: 12, keywords: ['시각', '시간', '분'] },
  { id: 'math-2-2-5', subject: '수학', grade: 2, semester: 2, unitNumber: 5, title: '표와 그래프', hours: 10, keywords: ['표', '그래프'] },
  { id: 'math-2-2-6', subject: '수학', grade: 2, semester: 2, unitNumber: 6, title: '규칙 찾기', hours: 10, keywords: ['규칙', '패턴'] },

  // ======================== 3학년 국어 ========================
  { id: 'kor-3-1-1', subject: '국어', grade: 3, semester: 1, unitNumber: 1, title: '재미가 톡톡톡', hours: 14, keywords: ['시', '이야기', '재미'] },
  { id: 'kor-3-1-2', subject: '국어', grade: 3, semester: 1, unitNumber: 2, title: '문단의 짜임', hours: 14, keywords: ['문단', '중심문장'] },
  { id: 'kor-3-1-3', subject: '국어', grade: 3, semester: 1, unitNumber: 3, title: '알맞은 높임 표현', hours: 12, keywords: ['높임말', '존댓말'] },
  { id: 'kor-3-1-4', subject: '국어', grade: 3, semester: 1, unitNumber: 4, title: '내 마음을 편지에 담아', hours: 14, keywords: ['편지', '마음'] },
  { id: 'kor-3-1-5', subject: '국어', grade: 3, semester: 1, unitNumber: 5, title: '중요한 내용을 적어요', hours: 14, keywords: ['메모', '요약'] },
  { id: 'kor-3-1-6', subject: '국어', grade: 3, semester: 1, unitNumber: 6, title: '일이 일어난 까닭', hours: 12, keywords: ['원인', '결과'] },
  { id: 'kor-3-1-7', subject: '국어', grade: 3, semester: 1, unitNumber: 7, title: '반갑다, 국어사전', hours: 14, keywords: ['국어사전', '낱말'] },
  { id: 'kor-3-1-8', subject: '국어', grade: 3, semester: 1, unitNumber: 8, title: '의견이 있어요', hours: 12, keywords: ['의견', '주장'] },
  { id: 'kor-3-1-9', subject: '국어', grade: 3, semester: 1, unitNumber: 9, title: '어떤 내용일까', hours: 12, keywords: ['예측', '추론'] },
  { id: 'kor-3-1-10', subject: '국어', grade: 3, semester: 1, unitNumber: 10, title: '문학의 향기', hours: 12, keywords: ['문학', '감상'] },
  { id: 'kor-3-2-1', subject: '국어', grade: 3, semester: 2, unitNumber: 1, title: '작품을 보고 느낌을 나누어요', hours: 14, keywords: ['감상', '느낌'] },
  { id: 'kor-3-2-2', subject: '국어', grade: 3, semester: 2, unitNumber: 2, title: '중심 생각을 찾아요', hours: 14, keywords: ['중심생각', '문단'] },
  { id: 'kor-3-2-3', subject: '국어', grade: 3, semester: 2, unitNumber: 3, title: '자신의 경험을 글로 써요', hours: 14, keywords: ['경험', '생활문'] },
  { id: 'kor-3-2-4', subject: '국어', grade: 3, semester: 2, unitNumber: 4, title: '감동을 나타내요', hours: 12, keywords: ['감동', '시'] },
  { id: 'kor-3-2-5', subject: '국어', grade: 3, semester: 2, unitNumber: 5, title: '바르게 대화해요', hours: 12, keywords: ['대화', '예절'] },
  { id: 'kor-3-2-6', subject: '국어', grade: 3, semester: 2, unitNumber: 6, title: '마음을 담아 글을 써요', hours: 14, keywords: ['마음', '글쓰기'] },
  { id: 'kor-3-2-7', subject: '국어', grade: 3, semester: 2, unitNumber: 7, title: '글을 읽고 소개해요', hours: 12, keywords: ['독서', '소개'] },
  { id: 'kor-3-2-8', subject: '국어', grade: 3, semester: 2, unitNumber: 8, title: '글의 흐름을 생각해요', hours: 12, keywords: ['글흐름', '구조'] },
  { id: 'kor-3-2-9', subject: '국어', grade: 3, semester: 2, unitNumber: 9, title: '작품 속 인물이 되어', hours: 12, keywords: ['인물', '역할극'] },

  // ======================== 3학년 수학 ========================
  { id: 'math-3-1-1', subject: '수학', grade: 3, semester: 1, unitNumber: 1, title: '덧셈과 뺄셈', hours: 14, keywords: ['세자리수', '덧셈', '뺄셈'] },
  { id: 'math-3-1-2', subject: '수학', grade: 3, semester: 1, unitNumber: 2, title: '평면도형', hours: 12, keywords: ['선분', '직선', '각'] },
  { id: 'math-3-1-3', subject: '수학', grade: 3, semester: 1, unitNumber: 3, title: '나눗셈', hours: 14, keywords: ['나눗셈', '몫'] },
  { id: 'math-3-1-4', subject: '수학', grade: 3, semester: 1, unitNumber: 4, title: '곱셈', hours: 12, keywords: ['두자리수곱셈'] },
  { id: 'math-3-1-5', subject: '수학', grade: 3, semester: 1, unitNumber: 5, title: '길이와 시간', hours: 12, keywords: ['km', 'mm', '시간'] },
  { id: 'math-3-1-6', subject: '수학', grade: 3, semester: 1, unitNumber: 6, title: '분수와 소수', hours: 14, keywords: ['분수', '소수'] },
  { id: 'math-3-2-1', subject: '수학', grade: 3, semester: 2, unitNumber: 1, title: '곱셈', hours: 14, keywords: ['세자리수곱셈'] },
  { id: 'math-3-2-2', subject: '수학', grade: 3, semester: 2, unitNumber: 2, title: '나눗셈', hours: 14, keywords: ['나눗셈', '나머지'] },
  { id: 'math-3-2-3', subject: '수학', grade: 3, semester: 2, unitNumber: 3, title: '원', hours: 10, keywords: ['원', '반지름', '지름'] },
  { id: 'math-3-2-4', subject: '수학', grade: 3, semester: 2, unitNumber: 4, title: '분수', hours: 12, keywords: ['진분수', '가분수', '대분수'] },
  { id: 'math-3-2-5', subject: '수학', grade: 3, semester: 2, unitNumber: 5, title: '들이와 무게', hours: 12, keywords: ['L', 'mL', 'kg', 'g'] },
  { id: 'math-3-2-6', subject: '수학', grade: 3, semester: 2, unitNumber: 6, title: '자료의 정리', hours: 10, keywords: ['그림그래프', '표'] },

  // ======================== 3학년 사회 ========================
  { id: 'soc-3-1-1', subject: '사회', grade: 3, semester: 1, unitNumber: 1, title: '우리 고장의 모습', hours: 18, keywords: ['고장', '지도'] },
  { id: 'soc-3-1-2', subject: '사회', grade: 3, semester: 1, unitNumber: 2, title: '우리가 알아보는 고장 이야기', hours: 18, keywords: ['고장', '문화유산'] },
  { id: 'soc-3-1-3', subject: '사회', grade: 3, semester: 1, unitNumber: 3, title: '교통과 통신 수단의 변화', hours: 16, keywords: ['교통', '통신'] },
  { id: 'soc-3-2-1', subject: '사회', grade: 3, semester: 2, unitNumber: 1, title: '환경에 따라 다른 삶의 모습', hours: 18, keywords: ['환경', '자연환경'] },
  { id: 'soc-3-2-2', subject: '사회', grade: 3, semester: 2, unitNumber: 2, title: '시대마다 다른 삶의 모습', hours: 16, keywords: ['시대', '옛날'] },
  { id: 'soc-3-2-3', subject: '사회', grade: 3, semester: 2, unitNumber: 3, title: '가족의 형태와 역할 변화', hours: 16, keywords: ['가족', '역할'] },

  // ======================== 3학년 과학 ========================
  { id: 'sci-3-1-1', subject: '과학', grade: 3, semester: 1, unitNumber: 1, title: '과학자는 어떻게 탐구할까요', hours: 8, keywords: ['탐구', '관찰'] },
  { id: 'sci-3-1-2', subject: '과학', grade: 3, semester: 1, unitNumber: 2, title: '물질의 성질', hours: 16, keywords: ['물질', '성질'] },
  { id: 'sci-3-1-3', subject: '과학', grade: 3, semester: 1, unitNumber: 3, title: '동물의 한살이', hours: 16, keywords: ['동물', '한살이'] },
  { id: 'sci-3-1-4', subject: '과학', grade: 3, semester: 1, unitNumber: 4, title: '자석의 이용', hours: 14, keywords: ['자석', '극'] },
  { id: 'sci-3-1-5', subject: '과학', grade: 3, semester: 1, unitNumber: 5, title: '지구의 모습', hours: 14, keywords: ['지구', '육지', '바다'] },
  { id: 'sci-3-2-1', subject: '과학', grade: 3, semester: 2, unitNumber: 1, title: '재미있는 나의 탐구', hours: 8, keywords: ['자유탐구'] },
  { id: 'sci-3-2-2', subject: '과학', grade: 3, semester: 2, unitNumber: 2, title: '동물의 생활', hours: 14, keywords: ['동물', '서식지'] },
  { id: 'sci-3-2-3', subject: '과학', grade: 3, semester: 2, unitNumber: 3, title: '지표의 변화', hours: 14, keywords: ['풍화', '침식'] },
  { id: 'sci-3-2-4', subject: '과학', grade: 3, semester: 2, unitNumber: 4, title: '물질의 상태', hours: 14, keywords: ['고체', '액체', '기체'] },
  { id: 'sci-3-2-5', subject: '과학', grade: 3, semester: 2, unitNumber: 5, title: '소리의 성질', hours: 14, keywords: ['소리', '진동'] },

  // ======================== 3학년 영어 ========================
  { id: 'eng-3-1-1', subject: '영어', grade: 3, semester: 1, unitNumber: 1, title: 'Hello, I\'m Mina', hours: 4, keywords: ['인사', '자기소개'] },
  { id: 'eng-3-1-2', subject: '영어', grade: 3, semester: 1, unitNumber: 2, title: 'What\'s This?', hours: 4, keywords: ['사물', '묻기'] },
  { id: 'eng-3-1-3', subject: '영어', grade: 3, semester: 1, unitNumber: 3, title: 'I Like Apples', hours: 4, keywords: ['좋아하는것', '음식'] },
  { id: 'eng-3-1-4', subject: '영어', grade: 3, semester: 1, unitNumber: 4, title: 'How Many Cows?', hours: 4, keywords: ['숫자', '세기'] },
  { id: 'eng-3-1-5', subject: '영어', grade: 3, semester: 1, unitNumber: 5, title: 'I Have a Pencil', hours: 4, keywords: ['소유', '학용품'] },
  { id: 'eng-3-1-6', subject: '영어', grade: 3, semester: 1, unitNumber: 6, title: 'It\'s Big', hours: 4, keywords: ['크기', '형용사'] },
  { id: 'eng-3-1-7', subject: '영어', grade: 3, semester: 1, unitNumber: 7, title: 'She\'s My Mom', hours: 4, keywords: ['가족', '소개'] },
  { id: 'eng-3-1-8', subject: '영어', grade: 3, semester: 1, unitNumber: 8, title: 'Happy Birthday!', hours: 6, keywords: ['생일', '축하'] },
  { id: 'eng-3-2-1', subject: '영어', grade: 3, semester: 2, unitNumber: 1, title: 'I\'m Happy', hours: 4, keywords: ['감정', '기분'] },
  { id: 'eng-3-2-2', subject: '영어', grade: 3, semester: 2, unitNumber: 2, title: 'Let\'s Play', hours: 4, keywords: ['놀이', '제안'] },
  { id: 'eng-3-2-3', subject: '영어', grade: 3, semester: 2, unitNumber: 3, title: 'I Can Swim', hours: 4, keywords: ['능력', 'can'] },
  { id: 'eng-3-2-4', subject: '영어', grade: 3, semester: 2, unitNumber: 4, title: 'How Old Are You?', hours: 4, keywords: ['나이', '숫자'] },
  { id: 'eng-3-2-5', subject: '영어', grade: 3, semester: 2, unitNumber: 5, title: 'Where Is My Bag?', hours: 4, keywords: ['위치', '전치사'] },
  { id: 'eng-3-2-6', subject: '영어', grade: 3, semester: 2, unitNumber: 6, title: 'I Want Pizza', hours: 4, keywords: ['음식', '원하는것'] },
  { id: 'eng-3-2-7', subject: '영어', grade: 3, semester: 2, unitNumber: 7, title: 'It\'s Snowing', hours: 4, keywords: ['날씨', '계절'] },
  { id: 'eng-3-2-8', subject: '영어', grade: 3, semester: 2, unitNumber: 8, title: 'This Is My House', hours: 6, keywords: ['집', '방'] },

  // ======================== 3학년 도덕 ========================
  { id: 'moral-3-1-1', subject: '도덕', grade: 3, semester: 1, unitNumber: 1, title: '나와 너, 우리 함께', hours: 12, keywords: ['존중', '배려'] },
  { id: 'moral-3-1-2', subject: '도덕', grade: 3, semester: 1, unitNumber: 2, title: '인터넷 세상에서도 예절을 지켜요', hours: 10, keywords: ['인터넷', '정보윤리'] },
  { id: 'moral-3-1-3', subject: '도덕', grade: 3, semester: 1, unitNumber: 3, title: '아름다운 사람이 되는 길', hours: 12, keywords: ['정직', '성실'] },
  { id: 'moral-3-2-1', subject: '도덕', grade: 3, semester: 2, unitNumber: 1, title: '감사하는 생활', hours: 10, keywords: ['감사', '고마움'] },
  { id: 'moral-3-2-2', subject: '도덕', grade: 3, semester: 2, unitNumber: 2, title: '생명을 존중해요', hours: 12, keywords: ['생명존중', '환경'] },
  { id: 'moral-3-2-3', subject: '도덕', grade: 3, semester: 2, unitNumber: 3, title: '사이좋은 친구', hours: 12, keywords: ['우정', '갈등해결'] },

  // ======================== 4학년 국어 ========================
  { id: 'kor-4-1-1', subject: '국어', grade: 4, semester: 1, unitNumber: 1, title: '생각과 느낌을 나누어요', hours: 14, keywords: ['시', '느낌'] },
  { id: 'kor-4-1-2', subject: '국어', grade: 4, semester: 1, unitNumber: 2, title: '내용을 간추려요', hours: 14, keywords: ['요약', '간추리기'] },
  { id: 'kor-4-1-3', subject: '국어', grade: 4, semester: 1, unitNumber: 3, title: '느낌을 살려 말해요', hours: 12, keywords: ['낭독', '표현'] },
  { id: 'kor-4-1-4', subject: '국어', grade: 4, semester: 1, unitNumber: 4, title: '일에 대한 의견', hours: 14, keywords: ['의견', '사실'] },
  { id: 'kor-4-1-5', subject: '국어', grade: 4, semester: 1, unitNumber: 5, title: '내가 만든 이야기', hours: 12, keywords: ['이야기', '창작'] },
  { id: 'kor-4-1-6', subject: '국어', grade: 4, semester: 1, unitNumber: 6, title: '회의를 해요', hours: 12, keywords: ['회의', '토의'] },
  { id: 'kor-4-1-7', subject: '국어', grade: 4, semester: 1, unitNumber: 7, title: '사전은 내 친구', hours: 12, keywords: ['사전', '낱말'] },
  { id: 'kor-4-1-8', subject: '국어', grade: 4, semester: 1, unitNumber: 8, title: '이런 제안 어때요', hours: 12, keywords: ['제안', '건의문'] },
  { id: 'kor-4-1-9', subject: '국어', grade: 4, semester: 1, unitNumber: 9, title: '자랑스러운 한글', hours: 10, keywords: ['한글', '훈민정음'] },
  { id: 'kor-4-1-10', subject: '국어', grade: 4, semester: 1, unitNumber: 10, title: '인물의 마음을 알아봐요', hours: 12, keywords: ['인물', '마음'] },
  { id: 'kor-4-2-1', subject: '국어', grade: 4, semester: 2, unitNumber: 1, title: '이어질 장면을 생각해요', hours: 14, keywords: ['장면', '예측'] },
  { id: 'kor-4-2-2', subject: '국어', grade: 4, semester: 2, unitNumber: 2, title: '마음을 전하는 글을 써요', hours: 14, keywords: ['마음', '편지'] },
  { id: 'kor-4-2-3', subject: '국어', grade: 4, semester: 2, unitNumber: 3, title: '바르고 공손하게', hours: 12, keywords: ['공손', '예절'] },
  { id: 'kor-4-2-4', subject: '국어', grade: 4, semester: 2, unitNumber: 4, title: '이야기 속 세상', hours: 12, keywords: ['이야기', '독서'] },
  { id: 'kor-4-2-5', subject: '국어', grade: 4, semester: 2, unitNumber: 5, title: '의견이 드러나게 글을 써요', hours: 14, keywords: ['의견', '주장'] },
  { id: 'kor-4-2-6', subject: '국어', grade: 4, semester: 2, unitNumber: 6, title: '본받고 싶은 인물을 찾아봐요', hours: 12, keywords: ['인물', '전기문'] },
  { id: 'kor-4-2-7', subject: '국어', grade: 4, semester: 2, unitNumber: 7, title: '독서 감상문을 써요', hours: 12, keywords: ['독서감상문', '쓰기'] },
  { id: 'kor-4-2-8', subject: '국어', grade: 4, semester: 2, unitNumber: 8, title: '생활 속에서 매체를 찾아봐요', hours: 12, keywords: ['매체', '미디어'] },
  { id: 'kor-4-2-9', subject: '국어', grade: 4, semester: 2, unitNumber: 9, title: '감동을 나누며 읽어요', hours: 10, keywords: ['감동', '공유'] },

  // ======================== 4학년 수학 ========================
  { id: 'math-4-1-1', subject: '수학', grade: 4, semester: 1, unitNumber: 1, title: '큰 수', hours: 14, keywords: ['만', '억', '조'] },
  { id: 'math-4-1-2', subject: '수학', grade: 4, semester: 1, unitNumber: 2, title: '각도', hours: 12, keywords: ['각도', '각도기'] },
  { id: 'math-4-1-3', subject: '수학', grade: 4, semester: 1, unitNumber: 3, title: '곱셈과 나눗셈', hours: 14, keywords: ['곱셈', '나눗셈'] },
  { id: 'math-4-1-4', subject: '수학', grade: 4, semester: 1, unitNumber: 4, title: '평면도형의 이동', hours: 10, keywords: ['밀기', '뒤집기', '돌리기'] },
  { id: 'math-4-1-5', subject: '수학', grade: 4, semester: 1, unitNumber: 5, title: '막대그래프', hours: 10, keywords: ['막대그래프', '통계'] },
  { id: 'math-4-1-6', subject: '수학', grade: 4, semester: 1, unitNumber: 6, title: '규칙 찾기', hours: 10, keywords: ['규칙', '대응'] },
  { id: 'math-4-2-1', subject: '수학', grade: 4, semester: 2, unitNumber: 1, title: '분수의 덧셈과 뺄셈', hours: 14, keywords: ['분수', '덧셈', '뺄셈'] },
  { id: 'math-4-2-2', subject: '수학', grade: 4, semester: 2, unitNumber: 2, title: '삼각형', hours: 12, keywords: ['이등변삼각형', '정삼각형'] },
  { id: 'math-4-2-3', subject: '수학', grade: 4, semester: 2, unitNumber: 3, title: '소수의 덧셈과 뺄셈', hours: 14, keywords: ['소수', '덧셈', '뺄셈'] },
  { id: 'math-4-2-4', subject: '수학', grade: 4, semester: 2, unitNumber: 4, title: '사각형', hours: 12, keywords: ['수직', '평행', '마름모'] },
  { id: 'math-4-2-5', subject: '수학', grade: 4, semester: 2, unitNumber: 5, title: '꺾은선그래프', hours: 10, keywords: ['꺾은선그래프', '변화'] },
  { id: 'math-4-2-6', subject: '수학', grade: 4, semester: 2, unitNumber: 6, title: '다각형', hours: 10, keywords: ['다각형', '정다각형'] },

  // ======================== 4학년 사회/과학/영어/도덕 ========================
  { id: 'soc-4-1-1', subject: '사회', grade: 4, semester: 1, unitNumber: 1, title: '지역의 위치와 특성', hours: 18, keywords: ['지역', '위치'] },
  { id: 'soc-4-1-2', subject: '사회', grade: 4, semester: 1, unitNumber: 2, title: '우리가 알아보는 지역의 역사', hours: 16, keywords: ['역사', '문화유산'] },
  { id: 'soc-4-1-3', subject: '사회', grade: 4, semester: 1, unitNumber: 3, title: '지역의 공공기관과 주민 참여', hours: 16, keywords: ['공공기관', '주민참여'] },
  { id: 'soc-4-2-1', subject: '사회', grade: 4, semester: 2, unitNumber: 1, title: '촌락과 도시의 생활 모습', hours: 18, keywords: ['촌락', '도시'] },
  { id: 'soc-4-2-2', subject: '사회', grade: 4, semester: 2, unitNumber: 2, title: '필요한 것의 생산과 교환', hours: 16, keywords: ['생산', '교환'] },
  { id: 'soc-4-2-3', subject: '사회', grade: 4, semester: 2, unitNumber: 3, title: '사회 변화와 문화 다양성', hours: 16, keywords: ['사회변화', '다문화'] },
  { id: 'sci-4-1-1', subject: '과학', grade: 4, semester: 1, unitNumber: 1, title: '과학자처럼 탐구해 볼까요', hours: 8, keywords: ['탐구'] },
  { id: 'sci-4-1-2', subject: '과학', grade: 4, semester: 1, unitNumber: 2, title: '지층과 화석', hours: 14, keywords: ['지층', '화석'] },
  { id: 'sci-4-1-3', subject: '과학', grade: 4, semester: 1, unitNumber: 3, title: '식물의 한살이', hours: 14, keywords: ['식물', '한살이'] },
  { id: 'sci-4-1-4', subject: '과학', grade: 4, semester: 1, unitNumber: 4, title: '물체의 무게', hours: 14, keywords: ['무게', '저울'] },
  { id: 'sci-4-1-5', subject: '과학', grade: 4, semester: 1, unitNumber: 5, title: '혼합물의 분리', hours: 14, keywords: ['혼합물', '분리'] },
  { id: 'sci-4-2-1', subject: '과학', grade: 4, semester: 2, unitNumber: 1, title: '재미있는 나의 탐구', hours: 8, keywords: ['자유탐구'] },
  { id: 'sci-4-2-2', subject: '과학', grade: 4, semester: 2, unitNumber: 2, title: '식물의 생활', hours: 14, keywords: ['식물', '잎', '줄기'] },
  { id: 'sci-4-2-3', subject: '과학', grade: 4, semester: 2, unitNumber: 3, title: '물의 상태 변화', hours: 14, keywords: ['물', '증발', '응결'] },
  { id: 'sci-4-2-4', subject: '과학', grade: 4, semester: 2, unitNumber: 4, title: '그림자와 거울', hours: 14, keywords: ['그림자', '거울', '빛'] },
  { id: 'sci-4-2-5', subject: '과학', grade: 4, semester: 2, unitNumber: 5, title: '화산과 지진', hours: 14, keywords: ['화산', '지진'] },
  { id: 'eng-4-1-1', subject: '영어', grade: 4, semester: 1, unitNumber: 1, title: 'Nice to Meet You', hours: 4, keywords: ['인사', '만남'] },
  { id: 'eng-4-1-2', subject: '영어', grade: 4, semester: 1, unitNumber: 2, title: 'Don\'t Run in the Hallway', hours: 4, keywords: ['규칙', '금지'] },
  { id: 'eng-4-1-3', subject: '영어', grade: 4, semester: 1, unitNumber: 3, title: 'It\'s Under the Table', hours: 4, keywords: ['위치', '전치사'] },
  { id: 'eng-4-1-4', subject: '영어', grade: 4, semester: 1, unitNumber: 4, title: 'What Day Is It Today?', hours: 4, keywords: ['요일', '날짜'] },
  { id: 'eng-4-1-5', subject: '영어', grade: 4, semester: 1, unitNumber: 5, title: 'Is This Your Cap?', hours: 4, keywords: ['소유', '물건'] },
  { id: 'eng-4-1-6', subject: '영어', grade: 4, semester: 1, unitNumber: 6, title: 'How Much Is It?', hours: 4, keywords: ['가격', '쇼핑'] },
  { id: 'eng-4-1-7', subject: '영어', grade: 4, semester: 1, unitNumber: 7, title: 'She Has Long Hair', hours: 4, keywords: ['외모', '묘사'] },
  { id: 'eng-4-1-8', subject: '영어', grade: 4, semester: 1, unitNumber: 8, title: 'Let\'s Go Swimming', hours: 6, keywords: ['활동', '제안'] },
  { id: 'eng-4-2-1', subject: '영어', grade: 4, semester: 2, unitNumber: 1, title: 'What Time Is It?', hours: 4, keywords: ['시간', '일과'] },
  { id: 'eng-4-2-2', subject: '영어', grade: 4, semester: 2, unitNumber: 2, title: 'I Like Fall', hours: 4, keywords: ['계절', '좋아하는것'] },
  { id: 'eng-4-2-3', subject: '영어', grade: 4, semester: 2, unitNumber: 3, title: 'What Are You Doing?', hours: 4, keywords: ['현재진행', '활동'] },
  { id: 'eng-4-2-4', subject: '영어', grade: 4, semester: 2, unitNumber: 4, title: 'Can I Have Some Water?', hours: 4, keywords: ['요청', '음료'] },
  { id: 'eng-4-2-5', subject: '영어', grade: 4, semester: 2, unitNumber: 5, title: 'Where Is the Post Office?', hours: 4, keywords: ['길안내', '장소'] },
  { id: 'eng-4-2-6', subject: '영어', grade: 4, semester: 2, unitNumber: 6, title: 'Would You Like Some Cake?', hours: 4, keywords: ['권유', '음식'] },
  { id: 'eng-4-2-7', subject: '영어', grade: 4, semester: 2, unitNumber: 7, title: 'I\'m Stronger Than You', hours: 4, keywords: ['비교', '비교급'] },
  { id: 'eng-4-2-8', subject: '영어', grade: 4, semester: 2, unitNumber: 8, title: 'My Favorite Subject Is Science', hours: 6, keywords: ['과목', '학교'] },
  { id: 'moral-4-1-1', subject: '도덕', grade: 4, semester: 1, unitNumber: 1, title: '도덕 공부, 행복한 우리', hours: 10, keywords: ['도덕', '행복'] },
  { id: 'moral-4-1-2', subject: '도덕', grade: 4, semester: 1, unitNumber: 2, title: '참된 아름다움', hours: 12, keywords: ['아름다움', '내면'] },
  { id: 'moral-4-1-3', subject: '도덕', grade: 4, semester: 1, unitNumber: 3, title: '아껴 쓰는 우리', hours: 12, keywords: ['절약', '환경'] },
  { id: 'moral-4-2-1', subject: '도덕', grade: 4, semester: 2, unitNumber: 1, title: '올바르게 판단해요', hours: 10, keywords: ['판단', '옳고그름'] },
  { id: 'moral-4-2-2', subject: '도덕', grade: 4, semester: 2, unitNumber: 2, title: '서로 존중하는 우리', hours: 12, keywords: ['존중', '다양성'] },
  { id: 'moral-4-2-3', subject: '도덕', grade: 4, semester: 2, unitNumber: 3, title: '함께 꿈꾸는 무지개 세상', hours: 12, keywords: ['공동체', '평화'] },

  // ======================== 5학년 국어 ========================
  { id: 'kor-5-1-1', subject: '국어', grade: 5, semester: 1, unitNumber: 1, title: '대화와 공감', hours: 12, keywords: ['대화', '공감'] },
  { id: 'kor-5-1-2', subject: '국어', grade: 5, semester: 1, unitNumber: 2, title: '작품을 감상해요', hours: 14, keywords: ['작품', '감상'] },
  { id: 'kor-5-1-3', subject: '국어', grade: 5, semester: 1, unitNumber: 3, title: '글을 요약해요', hours: 14, keywords: ['요약', '중심내용'] },
  { id: 'kor-5-1-4', subject: '국어', grade: 5, semester: 1, unitNumber: 4, title: '글쓰기의 과정', hours: 12, keywords: ['글쓰기', '과정'] },
  { id: 'kor-5-1-5', subject: '국어', grade: 5, semester: 1, unitNumber: 5, title: '글쓴이의 주장', hours: 14, keywords: ['주장', '근거'] },
  { id: 'kor-5-1-6', subject: '국어', grade: 5, semester: 1, unitNumber: 6, title: '토의하여 해결해요', hours: 12, keywords: ['토의', '문제해결'] },
  { id: 'kor-5-1-7', subject: '국어', grade: 5, semester: 1, unitNumber: 7, title: '기행문을 써요', hours: 12, keywords: ['기행문', '여행'] },
  { id: 'kor-5-1-8', subject: '국어', grade: 5, semester: 1, unitNumber: 8, title: '아는 것과 새로 안 것', hours: 12, keywords: ['배경지식', '읽기'] },
  { id: 'kor-5-1-9', subject: '국어', grade: 5, semester: 1, unitNumber: 9, title: '여러 가지 매체 자료', hours: 10, keywords: ['매체', '정보'] },
  { id: 'kor-5-1-10', subject: '국어', grade: 5, semester: 1, unitNumber: 10, title: '주인공이 되어', hours: 10, keywords: ['인물', '역할극'] },
  { id: 'kor-5-2-1', subject: '국어', grade: 5, semester: 2, unitNumber: 1, title: '마음을 나누며 대화해요', hours: 14, keywords: ['대화', '공감'] },
  { id: 'kor-5-2-2', subject: '국어', grade: 5, semester: 2, unitNumber: 2, title: '지식이나 경험을 활용해요', hours: 14, keywords: ['배경지식', '활용'] },
  { id: 'kor-5-2-3', subject: '국어', grade: 5, semester: 2, unitNumber: 3, title: '의견을 조정하며 토의해요', hours: 12, keywords: ['토의', '합의'] },
  { id: 'kor-5-2-4', subject: '국어', grade: 5, semester: 2, unitNumber: 4, title: '겪은 일을 써요', hours: 12, keywords: ['경험문', '글쓰기'] },
  { id: 'kor-5-2-5', subject: '국어', grade: 5, semester: 2, unitNumber: 5, title: '여러 가지 매체 자료', hours: 12, keywords: ['매체', '비판적사고'] },
  { id: 'kor-5-2-6', subject: '국어', grade: 5, semester: 2, unitNumber: 6, title: '타당성을 생각하며 토론해요', hours: 12, keywords: ['토론', '타당성'] },
  { id: 'kor-5-2-7', subject: '국어', grade: 5, semester: 2, unitNumber: 7, title: '중요한 내용을 요약해요', hours: 12, keywords: ['요약', '핵심'] },
  { id: 'kor-5-2-8', subject: '국어', grade: 5, semester: 2, unitNumber: 8, title: '우리말 지킴이', hours: 10, keywords: ['우리말', '한글'] },

  // ======================== 5학년 수학 ========================
  { id: 'math-5-1-1', subject: '수학', grade: 5, semester: 1, unitNumber: 1, title: '자연수의 혼합 계산', hours: 12, keywords: ['혼합계산', '사칙연산'] },
  { id: 'math-5-1-2', subject: '수학', grade: 5, semester: 1, unitNumber: 2, title: '약수와 배수', hours: 14, keywords: ['약수', '배수', '최대공약수'] },
  { id: 'math-5-1-3', subject: '수학', grade: 5, semester: 1, unitNumber: 3, title: '규칙과 대응', hours: 10, keywords: ['규칙', '대응'] },
  { id: 'math-5-1-4', subject: '수학', grade: 5, semester: 1, unitNumber: 4, title: '약분과 통분', hours: 14, keywords: ['약분', '통분'] },
  { id: 'math-5-1-5', subject: '수학', grade: 5, semester: 1, unitNumber: 5, title: '분수의 덧셈과 뺄셈', hours: 12, keywords: ['이분모분수', '덧셈'] },
  { id: 'math-5-1-6', subject: '수학', grade: 5, semester: 1, unitNumber: 6, title: '다각형의 둘레와 넓이', hours: 14, keywords: ['둘레', '넓이'] },
  { id: 'math-5-2-1', subject: '수학', grade: 5, semester: 2, unitNumber: 1, title: '수의 범위와 어림하기', hours: 12, keywords: ['올림', '버림', '반올림'] },
  { id: 'math-5-2-2', subject: '수학', grade: 5, semester: 2, unitNumber: 2, title: '분수의 곱셈', hours: 14, keywords: ['분수곱셈'] },
  { id: 'math-5-2-3', subject: '수학', grade: 5, semester: 2, unitNumber: 3, title: '합동과 대칭', hours: 12, keywords: ['합동', '선대칭', '점대칭'] },
  { id: 'math-5-2-4', subject: '수학', grade: 5, semester: 2, unitNumber: 4, title: '소수의 곱셈', hours: 14, keywords: ['소수곱셈'] },
  { id: 'math-5-2-5', subject: '수학', grade: 5, semester: 2, unitNumber: 5, title: '직육면체', hours: 10, keywords: ['직육면체', '전개도'] },
  { id: 'math-5-2-6', subject: '수학', grade: 5, semester: 2, unitNumber: 6, title: '평균과 가능성', hours: 12, keywords: ['평균', '가능성'] },

  // ======================== 5학년 사회/과학/영어/도덕 ========================
  { id: 'soc-5-1-1', subject: '사회', grade: 5, semester: 1, unitNumber: 1, title: '국토와 우리 생활', hours: 18, keywords: ['국토', '기후'] },
  { id: 'soc-5-1-2', subject: '사회', grade: 5, semester: 1, unitNumber: 2, title: '인권 존중과 정의로운 사회', hours: 16, keywords: ['인권', '정의'] },
  { id: 'soc-5-1-3', subject: '사회', grade: 5, semester: 1, unitNumber: 3, title: '우리 경제의 성장과 발전', hours: 16, keywords: ['경제성장', '산업화'] },
  { id: 'soc-5-2-1', subject: '사회', grade: 5, semester: 2, unitNumber: 1, title: '옛사람들의 삶과 문화', hours: 20, keywords: ['선사시대', '삼국'] },
  { id: 'soc-5-2-2', subject: '사회', grade: 5, semester: 2, unitNumber: 2, title: '사회의 새로운 변화와 오늘날의 우리', hours: 16, keywords: ['근대', '변화'] },
  { id: 'soc-5-2-3', subject: '사회', grade: 5, semester: 2, unitNumber: 3, title: '우리나라의 정치 발전', hours: 16, keywords: ['민주주의', '시민'] },
  { id: 'sci-5-1-1', subject: '과학', grade: 5, semester: 1, unitNumber: 1, title: '과학자는 어떻게 탐구할까요', hours: 8, keywords: ['탐구', '변인통제'] },
  { id: 'sci-5-1-2', subject: '과학', grade: 5, semester: 1, unitNumber: 2, title: '온도와 열', hours: 14, keywords: ['온도', '열', '전도'] },
  { id: 'sci-5-1-3', subject: '과학', grade: 5, semester: 1, unitNumber: 3, title: '태양계와 별', hours: 14, keywords: ['태양계', '행성', '별'] },
  { id: 'sci-5-1-4', subject: '과학', grade: 5, semester: 1, unitNumber: 4, title: '용해와 용액', hours: 14, keywords: ['용해', '용액'] },
  { id: 'sci-5-1-5', subject: '과학', grade: 5, semester: 1, unitNumber: 5, title: '다양한 생물과 우리 생활', hours: 14, keywords: ['생물', '균류', '세균'] },
  { id: 'sci-5-2-1', subject: '과학', grade: 5, semester: 2, unitNumber: 1, title: '재미있는 나의 탐구', hours: 8, keywords: ['자유탐구'] },
  { id: 'sci-5-2-2', subject: '과학', grade: 5, semester: 2, unitNumber: 2, title: '생물과 환경', hours: 14, keywords: ['생태계', '환경'] },
  { id: 'sci-5-2-3', subject: '과학', grade: 5, semester: 2, unitNumber: 3, title: '날씨와 우리 생활', hours: 14, keywords: ['날씨', '기온'] },
  { id: 'sci-5-2-4', subject: '과학', grade: 5, semester: 2, unitNumber: 4, title: '물체의 운동', hours: 14, keywords: ['운동', '속력'] },
  { id: 'sci-5-2-5', subject: '과학', grade: 5, semester: 2, unitNumber: 5, title: '산과 염기', hours: 14, keywords: ['산성', '염기성'] },
  { id: 'eng-5-1-1', subject: '영어', grade: 5, semester: 1, unitNumber: 1, title: 'How Are You?', hours: 5, keywords: ['안부', '감정'] },
  { id: 'eng-5-1-2', subject: '영어', grade: 5, semester: 1, unitNumber: 2, title: 'What Date Is It Today?', hours: 5, keywords: ['날짜', '월'] },
  { id: 'eng-5-1-3', subject: '영어', grade: 5, semester: 1, unitNumber: 3, title: 'I\'m From Korea', hours: 5, keywords: ['나라', '출신'] },
  { id: 'eng-5-1-4', subject: '영어', grade: 5, semester: 1, unitNumber: 4, title: 'What Do You Want?', hours: 5, keywords: ['원하는것', '음식'] },
  { id: 'eng-5-1-5', subject: '영어', grade: 5, semester: 1, unitNumber: 5, title: 'Where Is the Art Room?', hours: 5, keywords: ['길찾기', '학교'] },
  { id: 'eng-5-1-6', subject: '영어', grade: 5, semester: 1, unitNumber: 6, title: 'What a Nice Day!', hours: 5, keywords: ['날씨', '감탄'] },
  { id: 'eng-5-1-7', subject: '영어', grade: 5, semester: 1, unitNumber: 7, title: 'I Have a Stomachache', hours: 5, keywords: ['아픈곳', '건강'] },
  { id: 'eng-5-1-8', subject: '영어', grade: 5, semester: 1, unitNumber: 8, title: 'What Will You Do This Summer?', hours: 7, keywords: ['계획', '방학'] },
  { id: 'eng-5-2-1', subject: '영어', grade: 5, semester: 2, unitNumber: 1, title: 'How Often Do You Exercise?', hours: 5, keywords: ['빈도', '운동'] },
  { id: 'eng-5-2-2', subject: '영어', grade: 5, semester: 2, unitNumber: 2, title: 'I\'m Taller Than You', hours: 5, keywords: ['비교급', '키'] },
  { id: 'eng-5-2-3', subject: '영어', grade: 5, semester: 2, unitNumber: 3, title: 'Turn Right', hours: 5, keywords: ['길안내', '방향'] },
  { id: 'eng-5-2-4', subject: '영어', grade: 5, semester: 2, unitNumber: 4, title: 'Is This Your Jacket?', hours: 5, keywords: ['소유', '묻기'] },
  { id: 'eng-5-2-5', subject: '영어', grade: 5, semester: 2, unitNumber: 5, title: 'I\'d Like Bulgogi', hours: 5, keywords: ['주문', '음식'] },
  { id: 'eng-5-2-6', subject: '영어', grade: 5, semester: 2, unitNumber: 6, title: 'May I Help You?', hours: 5, keywords: ['도움', '쇼핑'] },
  { id: 'eng-5-2-7', subject: '영어', grade: 5, semester: 2, unitNumber: 7, title: 'I Want to Be a Chef', hours: 5, keywords: ['꿈', '직업'] },
  { id: 'eng-5-2-8', subject: '영어', grade: 5, semester: 2, unitNumber: 8, title: 'What Did You Do Yesterday?', hours: 7, keywords: ['과거', '일과'] },
  { id: 'moral-5-1-1', subject: '도덕', grade: 5, semester: 1, unitNumber: 1, title: '바르게 판단하고 행동해요', hours: 12, keywords: ['판단', '행동'] },
  { id: 'moral-5-1-2', subject: '도덕', grade: 5, semester: 1, unitNumber: 2, title: '내 안의 소중한 친구', hours: 10, keywords: ['자존감', '자기이해'] },
  { id: 'moral-5-1-3', subject: '도덕', grade: 5, semester: 1, unitNumber: 3, title: '갈등을 해결하는 지혜', hours: 12, keywords: ['갈등해결', '소통'] },
  { id: 'moral-5-2-1', subject: '도덕', grade: 5, semester: 2, unitNumber: 1, title: '함께 지키는 행복한 세상', hours: 12, keywords: ['공동체', '규칙'] },
  { id: 'moral-5-2-2', subject: '도덕', grade: 5, semester: 2, unitNumber: 2, title: '서로의 권리를 존중해요', hours: 10, keywords: ['권리', '인권'] },
  { id: 'moral-5-2-3', subject: '도덕', grade: 5, semester: 2, unitNumber: 3, title: '우리가 만드는 도덕 수업', hours: 12, keywords: ['실천', '프로젝트'] },

  // ======================== 6학년 국어 ========================
  { id: 'kor-6-1-1', subject: '국어', grade: 6, semester: 1, unitNumber: 1, title: '비유하는 표현', hours: 14, keywords: ['비유', '은유', '직유'] },
  { id: 'kor-6-1-2', subject: '국어', grade: 6, semester: 1, unitNumber: 2, title: '이야기를 간추려요', hours: 14, keywords: ['이야기', '요약'] },
  { id: 'kor-6-1-3', subject: '국어', grade: 6, semester: 1, unitNumber: 3, title: '짜임새 있게 구성해요', hours: 12, keywords: ['구성', '짜임새'] },
  { id: 'kor-6-1-4', subject: '국어', grade: 6, semester: 1, unitNumber: 4, title: '주장과 근거를 판단해요', hours: 14, keywords: ['주장', '근거', '판단'] },
  { id: 'kor-6-1-5', subject: '국어', grade: 6, semester: 1, unitNumber: 5, title: '속담을 활용해요', hours: 10, keywords: ['속담', '관용어'] },
  { id: 'kor-6-1-6', subject: '국어', grade: 6, semester: 1, unitNumber: 6, title: '내용을 추론해요', hours: 12, keywords: ['추론', '읽기전략'] },
  { id: 'kor-6-1-7', subject: '국어', grade: 6, semester: 1, unitNumber: 7, title: '우리말을 가꾸어요', hours: 10, keywords: ['우리말', '언어문화'] },
  { id: 'kor-6-1-8', subject: '국어', grade: 6, semester: 1, unitNumber: 8, title: '인물의 삶을 찾아서', hours: 12, keywords: ['인물', '전기문'] },
  { id: 'kor-6-1-9', subject: '국어', grade: 6, semester: 1, unitNumber: 9, title: '마음을 나누는 글을 써요', hours: 12, keywords: ['마음', '나눔'] },
  { id: 'kor-6-1-10', subject: '국어', grade: 6, semester: 1, unitNumber: 10, title: '문학작품의 세계', hours: 10, keywords: ['문학', '세계'] },
  { id: 'kor-6-2-1', subject: '국어', grade: 6, semester: 2, unitNumber: 1, title: '작품 속 인물과 나', hours: 14, keywords: ['인물', '자기성찰'] },
  { id: 'kor-6-2-2', subject: '국어', grade: 6, semester: 2, unitNumber: 2, title: '관용 표현을 활용해요', hours: 12, keywords: ['관용표현', '어휘'] },
  { id: 'kor-6-2-3', subject: '국어', grade: 6, semester: 2, unitNumber: 3, title: '타당한 근거로 글을 써요', hours: 14, keywords: ['근거', '논설문'] },
  { id: 'kor-6-2-4', subject: '국어', grade: 6, semester: 2, unitNumber: 4, title: '효과적으로 발표해요', hours: 12, keywords: ['발표', '매체활용'] },
  { id: 'kor-6-2-5', subject: '국어', grade: 6, semester: 2, unitNumber: 5, title: '글에 담긴 생각과 비교해요', hours: 12, keywords: ['비교', '비판적읽기'] },
  { id: 'kor-6-2-6', subject: '국어', grade: 6, semester: 2, unitNumber: 6, title: '정보와 표현 판단하기', hours: 10, keywords: ['정보', '미디어리터러시'] },
  { id: 'kor-6-2-7', subject: '국어', grade: 6, semester: 2, unitNumber: 7, title: '글 고쳐 쓰기', hours: 10, keywords: ['고쳐쓰기', '퇴고'] },
  { id: 'kor-6-2-8', subject: '국어', grade: 6, semester: 2, unitNumber: 8, title: '작품으로 경험하기', hours: 12, keywords: ['작품', '경험'] },

  // ======================== 6학년 수학 ========================
  { id: 'math-6-1-1', subject: '수학', grade: 6, semester: 1, unitNumber: 1, title: '분수의 나눗셈', hours: 14, keywords: ['분수나눗셈', '역수'] },
  { id: 'math-6-1-2', subject: '수학', grade: 6, semester: 1, unitNumber: 2, title: '각기둥과 각뿔', hours: 12, keywords: ['각기둥', '각뿔'] },
  { id: 'math-6-1-3', subject: '수학', grade: 6, semester: 1, unitNumber: 3, title: '소수의 나눗셈', hours: 14, keywords: ['소수나눗셈'] },
  { id: 'math-6-1-4', subject: '수학', grade: 6, semester: 1, unitNumber: 4, title: '비와 비율', hours: 14, keywords: ['비', '비율', '백분율'] },
  { id: 'math-6-1-5', subject: '수학', grade: 6, semester: 1, unitNumber: 5, title: '여러 가지 그래프', hours: 10, keywords: ['띠그래프', '원그래프'] },
  { id: 'math-6-1-6', subject: '수학', grade: 6, semester: 1, unitNumber: 6, title: '직육면체의 부피와 겉넓이', hours: 12, keywords: ['부피', '겉넓이'] },
  { id: 'math-6-2-1', subject: '수학', grade: 6, semester: 2, unitNumber: 1, title: '분수의 나눗셈', hours: 14, keywords: ['분수÷분수'] },
  { id: 'math-6-2-2', subject: '수학', grade: 6, semester: 2, unitNumber: 2, title: '소수의 나눗셈', hours: 12, keywords: ['소수÷소수'] },
  { id: 'math-6-2-3', subject: '수학', grade: 6, semester: 2, unitNumber: 3, title: '공간과 입체', hours: 12, keywords: ['쌓기나무', '공간감각'] },
  { id: 'math-6-2-4', subject: '수학', grade: 6, semester: 2, unitNumber: 4, title: '비례식과 비례배분', hours: 14, keywords: ['비례식', '비례배분'] },
  { id: 'math-6-2-5', subject: '수학', grade: 6, semester: 2, unitNumber: 5, title: '원의 넓이', hours: 10, keywords: ['원주', '원주율'] },
  { id: 'math-6-2-6', subject: '수학', grade: 6, semester: 2, unitNumber: 6, title: '원기둥, 원뿔, 구', hours: 12, keywords: ['원기둥', '원뿔', '구'] },

  // ======================== 6학년 사회/과학/영어/도덕 ========================
  { id: 'soc-6-1-1', subject: '사회', grade: 6, semester: 1, unitNumber: 1, title: '우리나라의 정치 발전', hours: 18, keywords: ['민주주의', '국회'] },
  { id: 'soc-6-1-2', subject: '사회', grade: 6, semester: 1, unitNumber: 2, title: '우리나라의 경제 발전', hours: 16, keywords: ['경제', '무역'] },
  { id: 'soc-6-1-3', subject: '사회', grade: 6, semester: 1, unitNumber: 3, title: '우리나라의 민주주의', hours: 16, keywords: ['선거', '시민참여'] },
  { id: 'soc-6-2-1', subject: '사회', grade: 6, semester: 2, unitNumber: 1, title: '세계 여러 나라의 자연과 문화', hours: 18, keywords: ['세계', '문화'] },
  { id: 'soc-6-2-2', subject: '사회', grade: 6, semester: 2, unitNumber: 2, title: '통일 한국의 미래와 지구촌의 평화', hours: 16, keywords: ['통일', '평화'] },
  { id: 'soc-6-2-3', subject: '사회', grade: 6, semester: 2, unitNumber: 3, title: '지속 가능한 지구촌', hours: 16, keywords: ['지속가능', '환경'] },
  { id: 'sci-6-1-1', subject: '과학', grade: 6, semester: 1, unitNumber: 1, title: '과학자처럼 탐구해 볼까요', hours: 8, keywords: ['탐구', '실험설계'] },
  { id: 'sci-6-1-2', subject: '과학', grade: 6, semester: 1, unitNumber: 2, title: '지구와 달의 운동', hours: 14, keywords: ['지구', '달', '자전'] },
  { id: 'sci-6-1-3', subject: '과학', grade: 6, semester: 1, unitNumber: 3, title: '여러 가지 기체', hours: 14, keywords: ['기체', '산소'] },
  { id: 'sci-6-1-4', subject: '과학', grade: 6, semester: 1, unitNumber: 4, title: '식물의 구조와 기능', hours: 14, keywords: ['뿌리', '줄기', '광합성'] },
  { id: 'sci-6-1-5', subject: '과학', grade: 6, semester: 1, unitNumber: 5, title: '빛과 렌즈', hours: 14, keywords: ['빛', '렌즈', '굴절'] },
  { id: 'sci-6-2-1', subject: '과학', grade: 6, semester: 2, unitNumber: 1, title: '재미있는 나의 탐구', hours: 8, keywords: ['자유탐구'] },
  { id: 'sci-6-2-2', subject: '과학', grade: 6, semester: 2, unitNumber: 2, title: '전기의 이용', hours: 14, keywords: ['전기', '회로'] },
  { id: 'sci-6-2-3', subject: '과학', grade: 6, semester: 2, unitNumber: 3, title: '계절의 변화', hours: 14, keywords: ['계절', '태양고도'] },
  { id: 'sci-6-2-4', subject: '과학', grade: 6, semester: 2, unitNumber: 4, title: '연소와 소화', hours: 14, keywords: ['연소', '소화'] },
  { id: 'sci-6-2-5', subject: '과학', grade: 6, semester: 2, unitNumber: 5, title: '우리 몸의 구조와 기능', hours: 14, keywords: ['소화', '호흡', '순환'] },
  { id: 'eng-6-1-1', subject: '영어', grade: 6, semester: 1, unitNumber: 1, title: 'What Grade Are You In?', hours: 5, keywords: ['학년', '소개'] },
  { id: 'eng-6-1-2', subject: '영어', grade: 6, semester: 1, unitNumber: 2, title: 'What Do You Want to Do?', hours: 5, keywords: ['하고싶은일', '계획'] },
  { id: 'eng-6-1-3', subject: '영어', grade: 6, semester: 1, unitNumber: 3, title: 'My Favorite Subject Is Science', hours: 5, keywords: ['좋아하는과목'] },
  { id: 'eng-6-1-4', subject: '영어', grade: 6, semester: 1, unitNumber: 4, title: 'When Is Your Birthday?', hours: 5, keywords: ['생일', '날짜'] },
  { id: 'eng-6-1-5', subject: '영어', grade: 6, semester: 1, unitNumber: 5, title: 'I\'m Going to Visit My Uncle', hours: 5, keywords: ['미래계획', '방문'] },
  { id: 'eng-6-1-6', subject: '영어', grade: 6, semester: 1, unitNumber: 6, title: 'Can You Come to My Party?', hours: 5, keywords: ['초대', '수락거절'] },
  { id: 'eng-6-1-7', subject: '영어', grade: 6, semester: 1, unitNumber: 7, title: 'She\'s Wearing a Yellow Dress', hours: 5, keywords: ['옷', '묘사'] },
  { id: 'eng-6-1-8', subject: '영어', grade: 6, semester: 1, unitNumber: 8, title: 'How Was Your Vacation?', hours: 7, keywords: ['방학', '과거'] },
  { id: 'eng-6-2-1', subject: '영어', grade: 6, semester: 2, unitNumber: 1, title: 'I Have a Cold', hours: 5, keywords: ['감기', '건강'] },
  { id: 'eng-6-2-2', subject: '영어', grade: 6, semester: 2, unitNumber: 2, title: 'I\'m Looking for a Gift', hours: 5, keywords: ['선물', '쇼핑'] },
  { id: 'eng-6-2-3', subject: '영어', grade: 6, semester: 2, unitNumber: 3, title: 'Will You Help Me, Please?', hours: 5, keywords: ['부탁', '도움'] },
  { id: 'eng-6-2-4', subject: '영어', grade: 6, semester: 2, unitNumber: 4, title: 'The Concert Was Fantastic', hours: 5, keywords: ['공연', '감상'] },
  { id: 'eng-6-2-5', subject: '영어', grade: 6, semester: 2, unitNumber: 5, title: 'I Want to Go to Italy', hours: 5, keywords: ['여행', '나라'] },
  { id: 'eng-6-2-6', subject: '영어', grade: 6, semester: 2, unitNumber: 6, title: 'What Do You Want to Be?', hours: 5, keywords: ['장래희망', '직업'] },
  { id: 'eng-6-2-7', subject: '영어', grade: 6, semester: 2, unitNumber: 7, title: 'My Best Memory', hours: 5, keywords: ['추억', '기억'] },
  { id: 'eng-6-2-8', subject: '영어', grade: 6, semester: 2, unitNumber: 8, title: 'Goodbye, My Elementary School', hours: 7, keywords: ['졸업', '작별'] },
  { id: 'moral-6-1-1', subject: '도덕', grade: 6, semester: 1, unitNumber: 1, title: '내 삶의 주인은 바로 나', hours: 12, keywords: ['자주', '주체성'] },
  { id: 'moral-6-1-2', subject: '도덕', grade: 6, semester: 1, unitNumber: 2, title: '서로 존중하며 함께 사는 우리', hours: 10, keywords: ['존중', '공존'] },
  { id: 'moral-6-1-3', subject: '도덕', grade: 6, semester: 1, unitNumber: 3, title: '나라를 사랑하는 마음', hours: 12, keywords: ['나라사랑', '통일'] },
  { id: 'moral-6-2-1', subject: '도덕', grade: 6, semester: 2, unitNumber: 1, title: '공정한 생활', hours: 12, keywords: ['공정', '정의'] },
  { id: 'moral-6-2-2', subject: '도덕', grade: 6, semester: 2, unitNumber: 2, title: '함께 살아가는 지구촌', hours: 10, keywords: ['지구촌', '세계시민'] },
  { id: 'moral-6-2-3', subject: '도덕', grade: 6, semester: 2, unitNumber: 3, title: '미래를 향한 첫걸음', hours: 12, keywords: ['미래', '진로', '졸업'] },
];

// ----------------------------------------
// 4. 월별 학사 주제 및 행사
// ----------------------------------------

export const monthlyThemes: MonthlyTheme[] = [
  {
    month: 3, name: '새 출발',
    themes: ['입학 및 진급', '학급 세우기', '학교생활 적응', '친구 사귀기', '학교 규칙 알기'],
    events: ['입학식', '시업식', '학급임원선거', '학부모총회', '학교폭력예방교육', '성교육'],
    crossCurricular: ['안전·건강교육', '인성교육'],
  },
  {
    month: 4, name: '나와 이웃',
    themes: ['봄의 변화', '지역사회 탐구', '환경보전', '장애이해', '과학의 날'],
    events: ['과학의 날 행사', '장애인의 날', '식목일', '학력진단평가', '현장체험학습', '학교폭력실태조사'],
    crossCurricular: ['환경·지속가능발전교육', '장애이해교육'],
  },
  {
    month: 5, name: '감사와 사랑',
    themes: ['가정의 소중함', '감사 표현', '어버이날', '스승의 날', '어린이날'],
    events: ['어린이날', '어버이날', '스승의 날', '가정의달행사', '재난대비훈련', '성폭력예방교육'],
    crossCurricular: ['인성교육', '안전·건강교육'],
  },
  {
    month: 6, name: '함께 성장',
    themes: ['호국보훈', '환경의 날', '1학기 마무리', '여름철 안전', '독서활동'],
    events: ['현충일', '6.25전쟁 기념', '환경의 날', '수영안전교육', '1학기 학업성취도평가'],
    crossCurricular: ['통일교육', '환경·지속가능발전교육', '안전·건강교육'],
  },
  {
    month: 7, name: '여름과 건강',
    themes: ['여름 건강관리', '물놀이 안전', '1학기 되돌아보기', '방학생활계획'],
    events: ['여름방학식', '방학생활안전교육', '통지표 배부', '학부모상담주간'],
    crossCurricular: ['안전·건강교육'],
  },
  {
    month: 8, name: '새로운 시작',
    themes: ['2학기 준비', '방학과제 정리', '학급 재정비', '독서의 달'],
    events: ['개학식', '2학기 학급임원선거', '학교폭력예방교육(2학기)'],
    crossCurricular: ['인성교육', '독서교육'],
  },
  {
    month: 9, name: '문화와 전통',
    themes: ['추석', '전통문화', '다문화 이해', '독서활동', '가을'],
    events: ['추석연휴', '다문화이해교육', '학교스포츠클럽대회', '재난대비훈련'],
    crossCurricular: ['다문화교육', '인성교육'],
  },
  {
    month: 10, name: '세상 속의 나',
    themes: ['한글날', '독서의 달', '진로탐색', '가을 현장체험', '체육대회'],
    events: ['개천절', '한글날', '체육대회', '현장체험학습', '학부모공개수업', '학교폭력실태조사(2차)'],
    crossCurricular: ['진로교육', '독서교육'],
  },
  {
    month: 11, name: '나눔과 배려',
    themes: ['이웃사랑', '나눔실천', '2학기 마무리 준비', '겨울준비', '감사'],
    events: ['학예발표회', '2학기 학업성취도평가', '불조심 강조의 달', '아동학대예방교육'],
    crossCurricular: ['인성교육', '안전·건강교육'],
  },
  {
    month: 12, name: '한 해를 돌아보며',
    themes: ['1년 되돌아보기', '성장 확인', '겨울철 안전', '감사편지', '방학계획'],
    events: ['겨울방학식', '성탄절', '통지표 배부', '학부모상담주간'],
    crossCurricular: ['안전·건강교육', '인성교육'],
  },
  {
    month: 1, name: '겨울방학',
    themes: ['겨울방학 생활', '독서활동', '체험학습', '새해계획'],
    events: ['신정', '겨울방학'],
    crossCurricular: ['독서교육', '안전·건강교육'],
  },
  {
    month: 2, name: '마무리와 새 출발',
    themes: ['학년 마무리', '졸업 및 수료', '새 학년 준비', '감사 인사'],
    events: ['졸업식', '수료식', '종업식', '새학년배치', '학교교육과정평가'],
    crossCurricular: ['인성교육', '진로교육'],
  },
];

// ----------------------------------------
// 5. 범교과 학습주제 (10개)
// ----------------------------------------

export const crossCurricularThemes: CrossCurricularTheme[] = [
  {
    id: 'cc-01', name: '안전·건강교육',
    description: '생활 안전, 교통안전, 재난안전, 직업안전, 약물·사이버 중독 예방, 응급처치 등을 포함하는 종합 안전교육',
    requiredActivities: ['생활안전교육', '교통안전교육', '재난대비훈련', '약물오남용예방교육', '응급처치교육', '수상안전교육'],
    relatedSubjects: ['체육', '과학', '사회', '바른생활', '도덕'],
    minimumHours: 51,
    gradeGuidance: {
      '1-2': '일상생활 속 안전수칙 익히기, 교통안전 체험, 화재 대피 연습',
      '3-4': '안전사고 예방 및 대처, 재난안전 실습, 약물오남용 예방',
      '5-6': '응급처치법(심폐소생술), 재난대비 행동요령, 사이버안전교육',
    },
  },
  {
    id: 'cc-02', name: '인성교육',
    description: '예, 효, 정직, 책임, 존중, 배려, 소통, 협동 등 핵심 덕목을 바탕으로 한 인성 함양 교육',
    requiredActivities: ['학교폭력예방교육', '또래중재활동', '칭찬릴레이', '감사편지쓰기', '존중서약'],
    relatedSubjects: ['도덕', '국어', '사회', '바른생활', '창의적체험활동'],
    minimumHours: 20,
    gradeGuidance: {
      '1-2': '기본생활습관 형성, 친구와 사이좋게 지내기, 감사 표현하기',
      '3-4': '공동체 의식 기르기, 갈등해결 방법 찾기, 정직과 책임',
      '5-6': '자기관리, 공동체 역할과 책임, 윤리적 판단능력',
    },
  },
  {
    id: 'cc-03', name: '환경·지속가능발전교육',
    description: '기후변화, 에너지절약, 자원순환, 생태계 보전, 지속가능발전목표(SDGs) 관련 교육',
    requiredActivities: ['환경정화활동', '에너지절약캠페인', '분리수거실천', '생태체험학습', '환경일기쓰기'],
    relatedSubjects: ['과학', '사회', '도덕', '실과', '슬기로운생활'],
    minimumHours: 10,
    gradeGuidance: {
      '1-2': '주변 환경 관찰하기, 자연 사랑하기, 분리수거 실천하기',
      '3-4': '환경오염 원인과 결과 알기, 에너지 절약 방법, 생태계 이해',
      '5-6': '기후변화와 대응, 지속가능발전목표, 탄소중립 실천',
    },
  },
  {
    id: 'cc-04', name: '다문화교육',
    description: '문화 다양성 이해, 편견해소, 세계시민의식, 다문화 가정 이해 교육',
    requiredActivities: ['다문화이해교육', '세계문화체험', '다문화음식체험', '외국어인사배우기'],
    relatedSubjects: ['사회', '도덕', '영어', '바른생활'],
    minimumHours: 6,
    gradeGuidance: {
      '1-2': '다양한 문화 알기, 다른 나라 인사법 배우기',
      '3-4': '문화 다양성 존중, 편견과 차별 없애기',
      '5-6': '세계시민의식, 다문화 사회의 이해와 공존',
    },
  },
  {
    id: 'cc-05', name: '독서교육',
    description: '독서습관 형성, 독서활동, 독후활동, 도서관 활용교육',
    requiredActivities: ['아침독서시간', '독서토론', '독서감상문쓰기', '도서관이용교육', '독서퀴즈'],
    relatedSubjects: ['국어', '사회', '과학', '도덕'],
    minimumHours: 20,
    gradeGuidance: {
      '1-2': '그림책 읽기, 도서관 이용법, 독서 후 느낌 나누기',
      '3-4': '다양한 분야 독서, 독서감상문 쓰기, 독서토론 참여',
      '5-6': '비문학 독서, 비판적 읽기, 독서토론 주도',
    },
  },
  {
    id: 'cc-06', name: '진로교육',
    description: '자기이해, 직업세계 탐색, 진로설계 등 진로 개발 역량을 기르는 교육',
    requiredActivities: ['직업체험', '진로상담', '진로검사', '직업인초청강연', '진로포트폴리오'],
    relatedSubjects: ['실과', '도덕', '사회', '창의적체험활동'],
    minimumHours: 10,
    gradeGuidance: {
      '1-2': '꿈 이야기하기, 주변 직업 알아보기',
      '3-4': '다양한 직업세계 탐색, 나의 흥미와 적성 알기',
      '5-6': '진로검사, 직업체험, 미래 직업 탐색, 진로설계',
    },
  },
  {
    id: 'cc-07', name: '통일교육',
    description: '평화통일 의지, 북한 이해, 통일 준비 교육',
    requiredActivities: ['통일교육주간', '통일관련영상시청', '통일글짓기', '통일그림그리기'],
    relatedSubjects: ['사회', '도덕', '국어'],
    minimumHours: 4,
    gradeGuidance: {
      '1-2': '남북한 어린이 생활 비교, 통일의 의미 알기',
      '3-4': '남북한 문화 비교, 분단의 아픔 이해하기',
      '5-6': '통일의 필요성, 평화통일 방안 토의, 통일 후 미래 상상',
    },
  },
  {
    id: 'cc-08', name: '민주시민교육',
    description: '민주주의 원리, 시민의 권리와 의무, 참여와 실천 교육',
    requiredActivities: ['학급회의', '학생자치활동', '모의선거', '인권교육'],
    relatedSubjects: ['사회', '도덕', '국어', '창의적체험활동'],
    minimumHours: 6,
    gradeGuidance: {
      '1-2': '학급 규칙 함께 정하기, 민주적 의사결정 경험하기',
      '3-4': '학급자치 활동, 공공장소 예절, 권리와 책임',
      '5-6': '학생자치회 참여, 민주적 토의토론, 사회참여활동',
    },
  },
  {
    id: 'cc-09', name: '경제·금융교육',
    description: '합리적 소비, 저축, 경제 원리 이해, 금융 기초교육',
    requiredActivities: ['경제체험학습', '용돈관리', '모의시장놀이', '저축습관기르기'],
    relatedSubjects: ['사회', '수학', '실과', '슬기로운생활'],
    minimumHours: 4,
    gradeGuidance: {
      '1-2': '물건의 가치 알기, 용돈 아껴 쓰기',
      '3-4': '현명한 소비, 생산과 소비의 관계, 시장의 역할',
      '5-6': '경제 원리 이해, 합리적 의사결정, 금융 기초',
    },
  },
  {
    id: 'cc-10', name: '미디어리터러시교육',
    description: '디지털 미디어를 비판적으로 이해하고 윤리적으로 활용하는 능력을 기르는 교육',
    requiredActivities: ['미디어활용교육', '정보윤리교육', '사이버폭력예방교육', '가짜뉴스판별교육'],
    relatedSubjects: ['국어', '사회', '도덕', '실과'],
    minimumHours: 6,
    gradeGuidance: {
      '1-2': '올바른 미디어 사용습관, 인터넷 예절',
      '3-4': '정보 검색과 활용, 개인정보 보호, 사이버 예절',
      '5-6': '비판적 미디어 읽기, 미디어 제작, 디지털 시민의식',
    },
  },
];

// ----------------------------------------
// 6. 창의적 체험활동 영역
// ----------------------------------------

export const creativeActivities: CreativeActivity[] = [
  // 자율·자치활동
  { id: 'ca-01', area: '자율·자치활동', name: '학급회의', description: '학급의 문제를 민주적 절차에 따라 토의하고 해결하는 활동', examples: ['학급 규칙 정하기', '학급 문제 해결하기', '학급행사 계획하기'], recommendedGrades: [1,2,3,4,5,6] },
  { id: 'ca-02', area: '자율·자치활동', name: '학생자치회', description: '학생 스스로 학교 문제를 논의하고 의견을 제시하는 자치 활동', examples: ['전교어린이회', '학년대표회의', '학교행사기획'], recommendedGrades: [3,4,5,6] },
  { id: 'ca-03', area: '자율·자치활동', name: '적응활동', description: '새로운 환경에 적응하고 기본생활습관을 형성하는 활동', examples: ['입학초기적응활동', '학년초적응활동', '전학생적응프로그램'], recommendedGrades: [1,2,3,4,5,6] },
  { id: 'ca-04', area: '자율·자치활동', name: '1인1역할', description: '학급 내에서 자신의 역할을 맡아 책임감 있게 수행하는 활동', examples: ['교실청소당번', '급식도우미', '학급게시판관리', '식물관리'], recommendedGrades: [1,2,3,4,5,6] },

  // 동아리활동
  { id: 'ca-05', area: '동아리활동', name: '스포츠클럽', description: '다양한 체육활동을 통해 건강 체력을 기르는 동아리', examples: ['축구', '농구', '배드민턴', '줄넘기', '피구', '탁구'], recommendedGrades: [3,4,5,6] },
  { id: 'ca-06', area: '동아리활동', name: '예술동아리', description: '음악, 미술, 공연 등 예술적 표현력을 기르는 동아리', examples: ['합창부', '사물놀이', '미술반', '연극반', '뮤지컬반'], recommendedGrades: [3,4,5,6] },
  { id: 'ca-07', area: '동아리활동', name: '과학탐구반', description: '과학적 탐구력과 창의적 사고력을 기르는 동아리', examples: ['과학실험반', '로봇반', '코딩반', '발명반', '천체관측반'], recommendedGrades: [3,4,5,6] },
  { id: 'ca-08', area: '동아리활동', name: '독서토론반', description: '독서를 통해 사고력과 의사소통 능력을 기르는 동아리', examples: ['독서토론', '독서신문만들기', '작가와의만남', '북트레일러제작'], recommendedGrades: [3,4,5,6] },
  { id: 'ca-09', area: '동아리활동', name: '창작활동반', description: '다양한 만들기와 창작 활동을 하는 동아리', examples: ['요리반', '목공반', '뜨개질반', '캘리그라피반', 'UCC제작반'], recommendedGrades: [3,4,5,6] },
  { id: 'ca-10', area: '동아리활동', name: '놀이동아리', description: '전통놀이와 협동놀이를 통해 사회성을 기르는 동아리', examples: ['전통놀이', '보드게임', '협동놀이', '밧줄놀이'], recommendedGrades: [1,2,3,4] },

  // 봉사활동
  { id: 'ca-v01', area: '봉사활동', name: '교내봉사', description: '학교 내에서 다른 학생이나 학교를 위해 봉사하는 활동', examples: ['1학년 도우미', '급식봉사', '도서관 봉사', '교실 환경정리'], recommendedGrades: [1,2,3,4,5,6] },
  { id: 'ca-v02', area: '봉사활동', name: '지역사회봉사', description: '학교 밖 지역사회에서 봉사활동에 참여하는 활동', examples: ['경로당 방문', '환경정화활동', '불우이웃돕기', '지역축제 봉사'], recommendedGrades: [3,4,5,6] },
  { id: 'ca-v03', area: '봉사활동', name: '캠페인활동', description: '공익을 위한 캠페인을 기획하고 실행하는 활동', examples: ['환경보호 캠페인', '교통안전 캠페인', '학교폭력예방 캠페인', '에너지절약 캠페인'], recommendedGrades: [3,4,5,6] },
  { id: 'ca-v04', area: '봉사활동', name: '자연보호활동', description: '자연환경을 보호하고 가꾸는 봉사활동', examples: ['학교 텃밭 가꾸기', '꽃밭 가꾸기', '동물보호 캠페인', '나무심기'], recommendedGrades: [1,2,3,4,5,6] },

  // 진로활동
  { id: 'ca-11', area: '진로활동', name: '진로탐색', description: '다양한 직업세계를 알아보고 자신의 진로를 탐색하는 활동', examples: ['직업체험', '진로검사', '직업인인터뷰', '진로골든벨'], recommendedGrades: [3,4,5,6] },
  { id: 'ca-12', area: '진로활동', name: '자기이해활동', description: '자신의 특성, 흥미, 적성을 이해하는 활동', examples: ['자기소개서작성', '흥미검사', '강점찾기', '성장일기'], recommendedGrades: [1,2,3,4,5,6] },
  { id: 'ca-13', area: '진로활동', name: '진로체험', description: '실제 직업 현장을 방문하거나 직업인을 만나는 체험활동', examples: ['직업체험센터방문', '직업인초청강연', '견학활동', '멘토링'], recommendedGrades: [4,5,6] },
  { id: 'ca-14', area: '진로활동', name: '진로설계', description: '미래의 꿈을 구체적으로 설계하고 계획하는 활동', examples: ['진로포트폴리오', '드림맵만들기', '꿈발표회', '진로로드맵'], recommendedGrades: [5,6] },
];

// ----------------------------------------
// 7. 평가 방법
// ----------------------------------------

export const assessmentMethods: AssessmentMethod[] = [
  {
    id: 'assess-01', name: '과정중심 서술형 평가', type: '수행평가',
    description: '학습 과정에서 학생의 성장과 변화를 서술형으로 평가',
    applicableGrades: [1,2,3,4,5,6],
    examples: ['글쓰기 과정 평가', '문제해결 과정 관찰', '탐구보고서 평가'],
  },
  {
    id: 'assess-02', name: '프로젝트 평가', type: '수행평가',
    description: '주제를 선정하고 계획-실행-발표하는 전 과정을 종합적으로 평가',
    applicableGrades: [3,4,5,6],
    examples: ['주제탐구 프로젝트', '우리 고장 조사 프로젝트', '과학탐구 프로젝트'],
  },
  {
    id: 'assess-03', name: '논술형 평가', type: '지필평가',
    description: '주어진 주제에 대해 자신의 생각을 논리적으로 서술하는 평가',
    applicableGrades: [3,4,5,6],
    examples: ['국어 논술형 문항', '사회 서술형 문항', '과학 탐구 결과 서술'],
  },
  {
    id: 'assess-04', name: '관찰 체크리스트', type: '관찰평가',
    description: '수업 중 학생의 학습 태도, 참여도, 협력 등을 체계적으로 관찰',
    applicableGrades: [1,2,3,4,5,6],
    examples: ['수업 참여 관찰', '모둠활동 참여도', '실험 태도 관찰', '체육 활동 관찰'],
  },
  {
    id: 'assess-05', name: '포트폴리오 평가', type: '포트폴리오',
    description: '학습 결과물을 모아 성장 과정을 종합적으로 평가',
    applicableGrades: [1,2,3,4,5,6],
    examples: ['미술 작품 모음', '글쓰기 포트폴리오', '수학 문제풀이 모음', '과학 탐구일지'],
  },
  {
    id: 'assess-06', name: '구술평가', type: '수행평가',
    description: '학생이 학습한 내용을 말로 표현하여 평가',
    applicableGrades: [1,2,3,4,5,6],
    examples: ['영어 말하기 평가', '국어 발표 평가', '과학 탐구 결과 발표'],
  },
  {
    id: 'assess-07', name: '실기평가', type: '수행평가',
    description: '체육, 음악, 미술 등 실기 능력을 직접 평가',
    applicableGrades: [3,4,5,6],
    examples: ['체육 기능 평가', '음악 악기 연주', '미술 작품 제작', '영어 역할극'],
  },
  {
    id: 'assess-08', name: '자기평가', type: '자기평가',
    description: '학생이 스스로 학습과정과 결과를 되돌아보며 평가',
    applicableGrades: [1,2,3,4,5,6],
    examples: ['학습일지 쓰기', '자기점검표 작성', '성장기록 작성', '학습목표 달성도 확인'],
  },
  {
    id: 'assess-09', name: '동료평가', type: '동료평가',
    description: '모둠 활동에서 동료 학생들이 서로의 활동을 평가',
    applicableGrades: [3,4,5,6],
    examples: ['모둠활동 기여도 평가', '발표 상호평가', '토론 상호평가'],
  },
  {
    id: 'assess-10', name: '선택형 지필평가', type: '지필평가',
    description: '선택형, 단답형 문항으로 구성된 지필시험',
    applicableGrades: [3,4,5,6],
    examples: ['중간학업성취도평가', '단원평가', '진단평가'],
  },
];

// ----------------------------------------
// 7-1. 법정필수교육 (의무교육 시수)
// ----------------------------------------

export interface MandatoryEducation {
  id: string;
  name: string;
  category: '안전교육' | '보건교육' | '인성교육' | '기타필수교육';
  minimumHours: number;
  description: string;
  relatedSubjects: string[];
  relatedCreativeAreas: string[];
  monthlyRecommendation: number[];  // 추천 운영 월
  details?: string[];
}

export const mandatoryEducations: MandatoryEducation[] = [
  // === 안전교육 (총 51시간 이상) ===
  { id: 'me-01', name: '생활안전교육', category: '안전교육', minimumHours: 12,
    description: '시설안전, 화재안전, 전기·가스안전, 실험·실습안전',
    relatedSubjects: ['체육', '과학', '실과'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [3,4,5,6,9,10,11,12],
    details: ['시설안전점검', '화재예방교육', '소화기사용법', '전기안전', '가스안전'] },
  { id: 'me-02', name: '교통안전교육', category: '안전교육', minimumHours: 10,
    description: '보행안전, 자전거안전, 대중교통안전, 통학버스안전',
    relatedSubjects: ['체육', '사회', '바른생활'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [3,4,9,10],
    details: ['보행안전수칙', '자전거안전교육', '통학버스안전', '교통표지판알기'] },
  { id: 'me-03', name: '재난안전교육', category: '안전교육', minimumHours: 6,
    description: '지진, 화재, 태풍, 홍수 등 재난 대비 교육',
    relatedSubjects: ['과학', '사회'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [3,5,9,11],
    details: ['지진대피훈련', '화재대피훈련', '태풍대비', '민방위훈련'] },
  { id: 'me-04', name: '약물·사이버중독예방교육', category: '안전교육', minimumHours: 10,
    description: '약물오남용, 흡연·음주예방, 인터넷·스마트폰 중독 예방',
    relatedSubjects: ['체육', '도덕', '실과'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [4,6,10,12],
    details: ['약물오남용예방', '흡연예방교육', '음주예방교육', '스마트폰과의존예방', '인터넷중독예방'] },
  { id: 'me-05', name: '응급처치교육', category: '안전교육', minimumHours: 6,
    description: '심폐소생술, 기본 응급처치법 교육',
    relatedSubjects: ['체육', '과학'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [4,10],
    details: ['심폐소생술(CPR)', '자동심장충격기(AED)사용법', '상처응급처치', '골절응급처치'] },
  { id: 'me-06', name: '수상안전교육', category: '안전교육', minimumHours: 4,
    description: '물놀이 안전, 수영 안전, 선박안전 교육',
    relatedSubjects: ['체육'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [5,6,7],
    details: ['물놀이안전수칙', '수영안전교육', '선박안전교육'] },
  { id: 'me-07', name: '직업안전교육', category: '안전교육', minimumHours: 3,
    description: '직업세계의 안전, 산업안전의 기초',
    relatedSubjects: ['실과', '사회'], relatedCreativeAreas: ['진로활동'],
    monthlyRecommendation: [10,11],
    details: ['직업안전의식', '산업안전기초', '안전한 직업환경'] },

  // === 보건교육 ===
  { id: 'me-10', name: '성교육/양성평등교육', category: '보건교육', minimumHours: 15,
    description: '성교육, 양성평등, 성폭력예방, 성인지감수성 교육',
    relatedSubjects: ['체육', '도덕', '과학'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [3,5,7,9,11],
    details: ['성교육(학기당 최소 1회)', '양성평등교육', '성폭력예방교육', '성희롱예방교육'] },
  { id: 'me-11', name: '감염병예방교육', category: '보건교육', minimumHours: 4,
    description: '감염병 예방 및 대처, 개인위생교육',
    relatedSubjects: ['체육', '과학', '슬기로운생활'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [3,9],
    details: ['손씻기교육', '감염병예방수칙', '코로나19대처', '인플루엔자예방'] },

  // === 인성교육 ===
  { id: 'me-20', name: '학교폭력예방교육', category: '인성교육', minimumHours: 12,
    description: '학교폭력 예방 및 대처, 어울림프로그램',
    relatedSubjects: ['도덕', '국어', '사회'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [3,4,5,6,9,10,11,12],
    details: ['어울림프로그램(학기당 최소 4차시)', '사이버폭력예방', '또래중재프로그램'] },
  { id: 'me-21', name: '자살예방교육', category: '인성교육', minimumHours: 4,
    description: '생명존중, 자살예방 게이트키퍼 교육',
    relatedSubjects: ['도덕', '체육'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [4,9],
    details: ['생명존중교육', '마음건강교육', '도움요청하기'] },

  // === 기타필수교육 ===
  { id: 'me-30', name: '장애이해교육', category: '기타필수교육', minimumHours: 4,
    description: '장애인에 대한 이해와 인식개선 교육',
    relatedSubjects: ['도덕', '사회', '바른생활'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [4,10],
    details: ['장애인의 날(4/20) 행사', '장애인식개선교육', '통합교육이해'] },
  { id: 'me-31', name: '다문화교육', category: '기타필수교육', minimumHours: 4,
    description: '다문화 이해 및 존중 교육',
    relatedSubjects: ['사회', '도덕', '영어'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [5,10],
    details: ['다문화이해교육', '세계문화체험', '다문화감수성교육'] },
  { id: 'me-32', name: '통일교육', category: '기타필수교육', minimumHours: 4,
    description: '평화통일 의식 함양 교육',
    relatedSubjects: ['사회', '도덕'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [6,10],
    details: ['통일교육주간', '6.25전쟁기념', '북한이해교육'] },
  { id: 'me-33', name: '독도교육', category: '기타필수교육', minimumHours: 2,
    description: '독도 관련 역사·지리 교육',
    relatedSubjects: ['사회', '도덕'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [10],
    details: ['독도의 날(10/25) 행사', '독도역사교육', '독도바로알기'] },
  { id: 'me-34', name: '정보통신윤리교육', category: '기타필수교육', minimumHours: 4,
    description: '정보윤리, 저작권, 개인정보보호 교육',
    relatedSubjects: ['실과', '도덕', '사회'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [4,9],
    details: ['저작권교육', '개인정보보호', '디지털시민교육', '사이버예절'] },
  { id: 'me-35', name: '아동학대예방교육', category: '기타필수교육', minimumHours: 4,
    description: '아동학대 인식 및 예방, 신고방법 교육',
    relatedSubjects: ['도덕', '사회', '바른생활'], relatedCreativeAreas: ['자율·자치활동'],
    monthlyRecommendation: [3,9],
    details: ['아동학대유형알기', '도움요청방법', '112신고방법'] },
];

// ----------------------------------------
// 7-2. 연간 학교행사 (주차별 매핑용)
// ----------------------------------------

export interface SchoolEvent {
  id: string;
  name: string;
  month: number;
  week?: number;  // 해당 월의 몇째 주 (1-4)
  type: '학사' | '행사' | '체험학습' | '평가' | '법정교육' | '방학';
  grades: number[];  // 해당 학년
  description?: string;
}

export const annualSchoolEvents: SchoolEvent[] = [
  // 3월
  { id: 'ev-0301', name: '시업식/입학식', month: 3, week: 1, type: '학사', grades: [1,2,3,4,5,6] },
  { id: 'ev-0302', name: '학급임원선거', month: 3, week: 1, type: '학사', grades: [3,4,5,6] },
  { id: 'ev-0303', name: '학부모총회', month: 3, week: 2, type: '학사', grades: [1,2,3,4,5,6] },
  { id: 'ev-0304', name: '학교폭력예방교육(1차)', month: 3, week: 2, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0305', name: '진단평가', month: 3, week: 2, type: '평가', grades: [2,3,4,5,6] },
  { id: 'ev-0306', name: '안전교육(생활안전)', month: 3, week: 3, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0307', name: '아동학대예방교육', month: 3, week: 3, type: '법정교육', grades: [1,2,3,4,5,6] },

  // 4월
  { id: 'ev-0401', name: '과학의 날 행사', month: 4, week: 3, type: '행사', grades: [1,2,3,4,5,6] },
  { id: 'ev-0402', name: '장애인의 날 행사', month: 4, week: 3, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0403', name: '교통안전교육', month: 4, week: 1, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0404', name: '응급처치교육(CPR)', month: 4, week: 2, type: '법정교육', grades: [3,4,5,6] },
  { id: 'ev-0405', name: '정보통신윤리교육', month: 4, week: 4, type: '법정교육', grades: [3,4,5,6] },
  { id: 'ev-0406', name: '현장체험학습(봄)', month: 4, week: 4, type: '체험학습', grades: [1,2,3,4,5,6] },

  // 5월
  { id: 'ev-0501', name: '어린이날 행사', month: 5, week: 1, type: '행사', grades: [1,2,3,4,5,6] },
  { id: 'ev-0502', name: '어버이날 행사', month: 5, week: 2, type: '행사', grades: [1,2,3,4,5,6] },
  { id: 'ev-0503', name: '재난대피훈련(지진)', month: 5, week: 2, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0504', name: '다문화교육주간', month: 5, week: 3, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0505', name: '성교육(1차)', month: 5, week: 4, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0506', name: '운동회/체육대회', month: 5, week: 4, type: '행사', grades: [1,2,3,4,5,6] },

  // 6월
  { id: 'ev-0601', name: '현충일', month: 6, week: 1, type: '학사', grades: [1,2,3,4,5,6], description: '공휴일' },
  { id: 'ev-0602', name: '6.25전쟁기념/통일교육', month: 6, week: 4, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0603', name: '약물오남용예방교육', month: 6, week: 2, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0604', name: '수상안전교육', month: 6, week: 3, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0605', name: '환경의 날 행사', month: 6, week: 1, type: '행사', grades: [1,2,3,4,5,6] },
  { id: 'ev-0606', name: '1학기 학업성취도평가', month: 6, week: 4, type: '평가', grades: [3,4,5,6] },

  // 7월
  { id: 'ev-0701', name: '여름방학식', month: 7, week: 3, type: '학사', grades: [1,2,3,4,5,6] },
  { id: 'ev-0702', name: '물놀이안전교육', month: 7, week: 1, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0703', name: '학부모상담주간', month: 7, week: 1, type: '학사', grades: [1,2,3,4,5,6] },
  { id: 'ev-0704', name: '통지표 배부', month: 7, week: 3, type: '학사', grades: [1,2,3,4,5,6] },

  // 9월
  { id: 'ev-0901', name: '2학기 시업식', month: 9, week: 1, type: '학사', grades: [1,2,3,4,5,6] },
  { id: 'ev-0902', name: '학교폭력예방교육(2차)', month: 9, week: 2, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0903', name: '추석', month: 9, week: 2, type: '학사', grades: [1,2,3,4,5,6], description: '공휴일' },
  { id: 'ev-0904', name: '성교육(2차)', month: 9, week: 3, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0905', name: '감염병예방교육', month: 9, week: 3, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-0906', name: '재난대피훈련(화재)', month: 9, week: 4, type: '법정교육', grades: [1,2,3,4,5,6] },

  // 10월
  { id: 'ev-1001', name: '개천절', month: 10, week: 1, type: '학사', grades: [1,2,3,4,5,6], description: '공휴일' },
  { id: 'ev-1002', name: '한글날', month: 10, week: 2, type: '학사', grades: [1,2,3,4,5,6] },
  { id: 'ev-1003', name: '현장체험학습(가을)', month: 10, week: 3, type: '체험학습', grades: [1,2,3,4,5,6] },
  { id: 'ev-1004', name: '독도의 날(10/25)', month: 10, week: 4, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-1005', name: '장애이해교육(2차)', month: 10, week: 2, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-1006', name: '생명존중교육', month: 10, week: 3, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-1007', name: '학예회/발표회', month: 10, week: 4, type: '행사', grades: [1,2,3,4,5,6] },

  // 11월
  { id: 'ev-1101', name: '재난대피훈련(복합)', month: 11, week: 2, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-1102', name: '학교폭력예방교육(3차)', month: 11, week: 3, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-1103', name: '성교육(3차)', month: 11, week: 2, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-1104', name: '진로교육주간', month: 11, week: 3, type: '행사', grades: [3,4,5,6] },
  { id: 'ev-1105', name: '사이버중독예방교육', month: 11, week: 4, type: '법정교육', grades: [3,4,5,6] },

  // 12월
  { id: 'ev-1201', name: '2학기 학업성취도평가', month: 12, week: 2, type: '평가', grades: [3,4,5,6] },
  { id: 'ev-1202', name: '학부모상담주간', month: 12, week: 3, type: '학사', grades: [1,2,3,4,5,6] },
  { id: 'ev-1203', name: '겨울방학식/종업식', month: 12, week: 4, type: '학사', grades: [1,2,3,4,5,6] },
  { id: 'ev-1204', name: '안전한 겨울방학 교육', month: 12, week: 4, type: '법정교육', grades: [1,2,3,4,5,6] },
  { id: 'ev-1205', name: '통지표 배부', month: 12, week: 4, type: '학사', grades: [1,2,3,4,5,6] },

  // 1-2월
  { id: 'ev-0201', name: '졸업식/수료식', month: 2, week: 2, type: '학사', grades: [1,2,3,4,5,6] },
];

// ----------------------------------------
// 8. 주간 시간표 템플릿
// ----------------------------------------

export const weeklyScheduleTemplates: WeeklyScheduleTemplate[] = [
  {
    id: 'tpl-grade12', grade: 1, name: '1~2학년 표준 시간표',
    description: '1학년 기준 주 22시간(4교시) 편성. 국어 블록 수업 포함',
    schedule: [
      { day: '월', periods: [
        { period: 1, subject: '국어', topic: '듣기/말하기' },
        { period: 2, subject: '국어', topic: '읽기/쓰기' },
        { period: 3, subject: '수학' },
        { period: 4, subject: '즐거운생활' },
      ]},
      { day: '화', periods: [
        { period: 1, subject: '국어', topic: '듣기/말하기' },
        { period: 2, subject: '국어', topic: '읽기/쓰기' },
        { period: 3, subject: '수학' },
        { period: 4, subject: '바른생활' },
        { period: 5, subject: '즐거운생활' },
      ]},
      { day: '수', periods: [
        { period: 1, subject: '국어', topic: '문법/어휘' },
        { period: 2, subject: '국어', topic: '문학' },
        { period: 3, subject: '수학' },
        { period: 4, subject: '슬기로운생활' },
      ]},
      { day: '목', periods: [
        { period: 1, subject: '국어', topic: '듣기/말하기' },
        { period: 2, subject: '국어', topic: '읽기/쓰기' },
        { period: 3, subject: '수학' },
        { period: 4, subject: '즐거운생활' },
        { period: 5, subject: '창의적체험활동' },
      ]},
      { day: '금', periods: [
        { period: 1, subject: '국어', topic: '문학' },
        { period: 2, subject: '바른생활' },
        { period: 3, subject: '슬기로운생활' },
        { period: 4, subject: '즐거운생활' },
        { period: 5, subject: '창의적체험활동' },
      ]},
    ],
  },
  {
    id: 'tpl-grade34', grade: 3, name: '3~4학년 표준 시간표',
    description: '3학년 기준 주 30시간(5~6교시) 편성. 블록타임 운영',
    schedule: [
      { day: '월', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '수학' },
        { period: 3, subject: '사회' },
        { period: 4, subject: '과학' },
        { period: 5, subject: '영어' },
        { period: 6, subject: '창의적체험활동' },
      ]},
      { day: '화', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '국어' },
        { period: 3, subject: '수학' },
        { period: 4, subject: '체육' },
        { period: 5, subject: '도덕' },
        { period: 6, subject: '미술' },
      ]},
      { day: '수', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '수학' },
        { period: 3, subject: '사회' },
        { period: 4, subject: '과학' },
        { period: 5, subject: '체육' },
      ]},
      { day: '목', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '국어' },
        { period: 3, subject: '수학' },
        { period: 4, subject: '사회' },
        { period: 5, subject: '음악' },
        { period: 6, subject: '창의적체험활동' },
      ]},
      { day: '금', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '수학' },
        { period: 3, subject: '과학' },
        { period: 4, subject: '체육' },
        { period: 5, subject: '영어' },
        { period: 6, subject: '창의적체험활동' },
      ]},
    ],
  },
  {
    id: 'tpl-grade56', grade: 5, name: '5~6학년 표준 시간표',
    description: '5학년 기준 주 33시간(6교시) 편성. 교과 전담교사 연계',
    schedule: [
      { day: '월', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '수학' },
        { period: 3, subject: '사회' },
        { period: 4, subject: '과학' },
        { period: 5, subject: '영어' },
        { period: 6, subject: '음악' },
      ]},
      { day: '화', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '국어' },
        { period: 3, subject: '수학' },
        { period: 4, subject: '체육' },
        { period: 5, subject: '영어' },
        { period: 6, subject: '실과' },
        { period: 7, subject: '창의적체험활동' },
      ]},
      { day: '수', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '수학' },
        { period: 3, subject: '사회' },
        { period: 4, subject: '과학' },
        { period: 5, subject: '도덕' },
        { period: 6, subject: '미술' },
      ]},
      { day: '목', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '국어' },
        { period: 3, subject: '수학' },
        { period: 4, subject: '사회' },
        { period: 5, subject: '체육' },
        { period: 6, subject: '영어' },
        { period: 7, subject: '창의적체험활동' },
      ]},
      { day: '금', periods: [
        { period: 1, subject: '국어' },
        { period: 2, subject: '수학' },
        { period: 3, subject: '과학' },
        { period: 4, subject: '체육' },
        { period: 5, subject: '도덕' },
        { period: 6, subject: '실과' },
        { period: 7, subject: '창의적체험활동' },
      ]},
    ],
  },
];

// ----------------------------------------
// 9. 교과별 UI 색상 매핑
// ----------------------------------------

export const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
  '국어':           { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
  '수학':           { bg: '#DBEAFE', text: '#1E40AF', border: '#3B82F6' },
  '사회':           { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' },
  '과학':           { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
  '영어':           { bg: '#EDE9FE', text: '#5B21B6', border: '#8B5CF6' },
  '도덕':           { bg: '#FCE7F3', text: '#9D174D', border: '#EC4899' },
  '음악':           { bg: '#FFF7ED', text: '#9A3412', border: '#F97316' },
  '미술':           { bg: '#F0FDF4', text: '#166534', border: '#22C55E' },
  '체육':           { bg: '#ECFEFF', text: '#155E75', border: '#06B6D4' },
  '실과':           { bg: '#F5F3FF', text: '#4C1D95', border: '#7C3AED' },
  '바른생활':       { bg: '#FFF1F2', text: '#9F1239', border: '#FB7185' },
  '슬기로운생활':   { bg: '#FFFBEB', text: '#78350F', border: '#FBBF24' },
  '즐거운생활':     { bg: '#F0F9FF', text: '#0C4A6E', border: '#38BDF8' },
  '창의적체험활동': { bg: '#F8FAFC', text: '#334155', border: '#94A3B8' },
};

// ----------------------------------------
// 10. 유틸리티 함수
// ----------------------------------------

/** 학년별 시수 조회 */
export function getGradeHours(grade: number): GradeHours | undefined {
  return gradeHoursData.find(g => g.grade === grade);
}

/** 특정 학년/학기 교과서 단원 조회 */
export function getTextbookUnits(grade: number, semester?: 1 | 2, subject?: string): TextbookUnit[] {
  return textbookUnits.filter(u =>
    u.grade === grade &&
    (semester === undefined || u.semester === semester) &&
    (subject === undefined || u.subject === subject)
  );
}

/** 월별 테마 조회 */
export function getMonthlyTheme(month: number): MonthlyTheme | undefined {
  return monthlyThemes.find(t => t.month === month);
}

/** 학년군별 범교과 학습주제 안내 조회 */
export function getCrossCurricularGuidance(themeId: string, gradeGroup: '1-2' | '3-4' | '5-6'): string | undefined {
  const theme = crossCurricularThemes.find(t => t.id === themeId);
  return theme?.gradeGuidance[gradeGroup];
}

/** 교과별 색상 조회 (기본값 포함) */
export function getSubjectColor(subject: string): { bg: string; text: string; border: string } {
  return subjectColors[subject] || { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' };
}

/** 학년에 해당하는 교과 목록 반환 */
export function getSubjectsForGrade(grade: number): string[] {
  const gradeData = gradeHoursData.find(g => g.grade === grade);
  if (!gradeData) return [];
  return gradeData.subjects.map(s => s.subject);
}

/** 키워드로 단원 검색 */
export function searchTextbookUnits(keyword: string): TextbookUnit[] {
  const lower = keyword.toLowerCase();
  return textbookUnits.filter(u =>
    u.title.toLowerCase().includes(lower) ||
    u.keywords.some(k => k.toLowerCase().includes(lower))
  );
}

/** 전체 데이터 통계 */
export function getCurriculumStats() {
  return {
    totalTextbookUnits: textbookUnits.length,
    totalMonthlyThemes: monthlyThemes.length,
    totalCrossCurricularThemes: crossCurricularThemes.length,
    totalCreativeActivities: creativeActivities.length,
    totalAssessmentMethods: assessmentMethods.length,
    totalScheduleTemplates: weeklyScheduleTemplates.length,
    gradesCovered: [1, 2, 3, 4, 5, 6],
    subjectsCovered: Array.from(new Set(textbookUnits.map(u => u.subject))),
  };
}
