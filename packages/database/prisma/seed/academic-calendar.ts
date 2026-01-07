import { CalendarEntryType } from '@prisma/client';

interface AcademicCalendarSeed {
  title: string;
  description?: string;
  month: number;
  day: number;
  endMonth?: number;
  endDay?: number;
  type: CalendarEntryType;
  targetGrades: number[];
  isNational: boolean;
  source?: string;
}

// 2024-2025 학년도 기준 학사일정
export const academicCalendar: AcademicCalendarSeed[] = [
  // ===========================================
  // 3월
  // ===========================================
  {
    title: '입학식·개학식',
    description: '2025학년도 신학기 시작',
    month: 3,
    day: 3,
    type: 'SEMESTER_START',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
    source: '학교교육과정',
  },
  {
    title: '삼일절',
    month: 3,
    day: 1,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },

  // ===========================================
  // 4월
  // ===========================================
  {
    title: '식목일',
    month: 4,
    day: 5,
    type: 'CEREMONY',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
  },
  {
    title: '과학의 날',
    description: '과학의 날 기념행사',
    month: 4,
    day: 21,
    type: 'EVENT',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
  },
  {
    title: '장애인의 날',
    description: '장애인의 날 계기교육',
    month: 4,
    day: 20,
    type: 'CEREMONY',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
  },

  // ===========================================
  // 5월
  // ===========================================
  {
    title: '근로자의 날',
    month: 5,
    day: 1,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },
  {
    title: '어린이날',
    month: 5,
    day: 5,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },
  {
    title: '어버이날',
    month: 5,
    day: 8,
    type: 'CEREMONY',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
  },
  {
    title: '스승의 날',
    month: 5,
    day: 15,
    type: 'CEREMONY',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
  },
  {
    title: '부처님오신날',
    month: 5,
    day: 15,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },

  // ===========================================
  // 6월
  // ===========================================
  {
    title: '현충일',
    month: 6,
    day: 6,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },
  {
    title: '6.25 전쟁일',
    description: '호국보훈 계기교육',
    month: 6,
    day: 25,
    type: 'CEREMONY',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
  },

  // ===========================================
  // 7월
  // ===========================================
  {
    title: '제헌절',
    month: 7,
    day: 17,
    type: 'CEREMONY',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
  },
  {
    title: '여름방학 시작',
    description: '2025학년도 여름방학',
    month: 7,
    day: 22,
    type: 'VACATION_START',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
    source: '학교교육과정',
  },

  // ===========================================
  // 8월
  // ===========================================
  {
    title: '광복절',
    month: 8,
    day: 15,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },
  {
    title: '2학기 개학',
    description: '2학기 시작',
    month: 8,
    day: 26,
    type: 'SEMESTER_START',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
    source: '학교교육과정',
  },

  // ===========================================
  // 9월
  // ===========================================
  {
    title: '추석',
    month: 9,
    day: 17,
    endMonth: 9,
    endDay: 19,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },

  // ===========================================
  // 10월
  // ===========================================
  {
    title: '개천절',
    month: 10,
    day: 3,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },
  {
    title: '한글날',
    month: 10,
    day: 9,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },
  {
    title: '운동회',
    description: '가을 운동회/체육대회',
    month: 10,
    day: 15,
    type: 'EVENT',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: false,
    source: '학교행사',
  },

  // ===========================================
  // 11월
  // ===========================================
  {
    title: '학예회',
    description: '학예회/발표회',
    month: 11,
    day: 20,
    type: 'EVENT',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: false,
    source: '학교행사',
  },

  // ===========================================
  // 12월
  // ===========================================
  {
    title: '성탄절',
    month: 12,
    day: 25,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },

  // ===========================================
  // 1월
  // ===========================================
  {
    title: '신정',
    month: 1,
    day: 1,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },
  {
    title: '겨울방학 시작',
    description: '2025학년도 겨울방학',
    month: 1,
    day: 6,
    type: 'VACATION_START',
    targetGrades: [1, 2, 3, 4, 5, 6],
    isNational: true,
    source: '학교교육과정',
  },
  {
    title: '졸업식',
    description: '제XX회 졸업식',
    month: 1,
    day: 10,
    type: 'CEREMONY',
    targetGrades: [6],
    isNational: true,
    source: '학교행사',
  },
  {
    title: '종업식',
    description: '2024학년도 종업식',
    month: 1,
    day: 10,
    type: 'SEMESTER_END',
    targetGrades: [1, 2, 3, 4, 5],
    isNational: true,
    source: '학교행사',
  },

  // ===========================================
  // 2월
  // ===========================================
  {
    title: '설날',
    month: 2,
    day: 10,
    endMonth: 2,
    endDay: 12,
    type: 'HOLIDAY',
    targetGrades: [],
    isNational: true,
  },
  {
    title: '신입생 예비소집',
    description: '2026학년도 신입생 예비소집',
    month: 2,
    day: 20,
    type: 'EVENT',
    targetGrades: [],
    isNational: true,
    source: '학교행사',
  },
];

export type { AcademicCalendarSeed };
