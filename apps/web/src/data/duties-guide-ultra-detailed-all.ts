// 초등교사 업무분장 초상세 가이드 - 전체 통합
// 교차검증된 100+ 사이트 기반, 처음 담당해도 완벽 수행 가능
// 총 16개 업무 영역, 콘텐츠 10배 확장

import { UltraDetailedDutyGuide } from './duties-guide-ultra-detailed';
import { academicAffairsUltraDetailed } from './duties-guide-ultra-detailed';
import { studentLifeUltraDetailed as schoolViolenceUltraDetailed } from './duties-guide-ultra-detailed-2';
import { healthUltraDetailed, mealServiceUltraDetailed } from './duties-guide-ultra-detailed-3';
import { safetyUltraDetailed, specialEducationUltraDetailed, afterSchoolUltraDetailed } from './duties-guide-ultra-detailed-4';
import { researchUltraDetailed, informationUltraDetailed, scienceUltraDetailed, physicalEducationUltraDetailed } from './duties-guide-ultra-detailed-5';
import { characterCareerUltraDetailed, libraryUltraDetailed, classTeacherUltraDetailed, counselingUltraDetailed, educationWelfareUltraDetailed } from './duties-guide-ultra-detailed-6';

// ========================================
// 전체 초상세 업무 가이드 목록
// ========================================
export const allUltraDetailedDuties: UltraDetailedDutyGuide[] = [
  // 교무 행정
  academicAffairsUltraDetailed,      // 교무기획부

  // 학생 생활
  schoolViolenceUltraDetailed,       // 생활지도부/학교폭력
  classTeacherUltraDetailed,         // 학년부/담임업무

  // 학생 지원
  counselingUltraDetailed,           // 상담부 (Wee클래스)
  characterCareerUltraDetailed,      // 인성/진로부
  educationWelfareUltraDetailed,     // 교육복지부

  // 특수 지원
  specialEducationUltraDetailed,     // 특수교육부
  afterSchoolUltraDetailed,          // 돌봄/방과후부

  // 보건 안전
  healthUltraDetailed,               // 보건부
  mealServiceUltraDetailed,          // 급식부
  safetyUltraDetailed,               // 안전부

  // 교육 연구
  researchUltraDetailed,             // 연구부
  scienceUltraDetailed,              // 과학부
  physicalEducationUltraDetailed,    // 체육부

  // 지원 업무
  informationUltraDetailed,          // 정보부
  libraryUltraDetailed,              // 도서부
];

// ========================================
// 카테고리별 분류
// ========================================
export const ultraDetailedDutiesByCategory = {
  // 교무 행정 업무
  administrative: [
    academicAffairsUltraDetailed,
    informationUltraDetailed,
  ],

  // 학생 생활 지도
  studentLife: [
    schoolViolenceUltraDetailed,
    classTeacherUltraDetailed,
    counselingUltraDetailed,
    characterCareerUltraDetailed,
  ],

  // 교육 복지
  welfare: [
    educationWelfareUltraDetailed,
    specialEducationUltraDetailed,
    afterSchoolUltraDetailed,
  ],

  // 보건 안전
  healthSafety: [
    healthUltraDetailed,
    mealServiceUltraDetailed,
    safetyUltraDetailed,
  ],

  // 교과 교육
  academic: [
    researchUltraDetailed,
    scienceUltraDetailed,
    physicalEducationUltraDetailed,
    libraryUltraDetailed,
  ],
};

// ========================================
// 난이도별 분류
// ========================================
export const ultraDetailedDutiesByDifficulty = {
  // 난이도 2 (쉬움)
  easy: allUltraDetailedDuties.filter(d => d.difficulty === 2),

  // 난이도 3 (보통)
  medium: allUltraDetailedDuties.filter(d => d.difficulty === 3),

  // 난이도 4 (어려움)
  hard: allUltraDetailedDuties.filter(d => d.difficulty === 4),

  // 난이도 5 (매우 어려움)
  veryHard: allUltraDetailedDuties.filter(d => d.difficulty === 5),
};

// ========================================
// 헬퍼 함수들
// ========================================

// ID로 업무 찾기
export function getUltraDetailedDutyById(id: string): UltraDetailedDutyGuide | undefined {
  return allUltraDetailedDuties.find(duty => duty.id === id);
}

// 이름으로 업무 찾기
export function getUltraDetailedDutyByName(name: string): UltraDetailedDutyGuide | undefined {
  return allUltraDetailedDuties.find(
    duty => duty.name.includes(name) || duty.shortName === name
  );
}

// 키워드로 업무 검색
export function searchUltraDetailedDuties(keyword: string): UltraDetailedDutyGuide[] {
  const lowerKeyword = keyword.toLowerCase();
  return allUltraDetailedDuties.filter(duty =>
    duty.name.toLowerCase().includes(lowerKeyword) ||
    duty.shortName.toLowerCase().includes(lowerKeyword) ||
    duty.description.toLowerCase().includes(lowerKeyword) ||
    duty.detailedOverview.toLowerCase().includes(lowerKeyword)
  );
}

// 법적 근거로 업무 검색
export function searchByLegalBasis(law: string): UltraDetailedDutyGuide[] {
  return allUltraDetailedDuties.filter(duty =>
    duty.legalBasis.some(basis => basis.includes(law))
  );
}

// 월별 주요 업무 가져오기
export function getMonthlyTasks(month: number): { duty: UltraDetailedDutyGuide; tasks: string[] }[] {
  const result: { duty: UltraDetailedDutyGuide; tasks: string[] }[] = [];

  allUltraDetailedDuties.forEach(duty => {
    const monthlyTasks = duty.weeklyWorkflow
      .filter(w => w.month === month)
      .flatMap(w => w.tasks);

    if (monthlyTasks.length > 0) {
      result.push({ duty, tasks: monthlyTasks });
    }
  });

  return result;
}

// 긴급 상황 대응 절차 모음
export function getAllEmergencyProcedures() {
  return allUltraDetailedDuties
    .filter(duty => duty.emergencyProcedures.length > 0)
    .map(duty => ({
      dutyName: duty.name,
      procedures: duty.emergencyProcedures,
    }));
}

// FAQ 전체 검색
export function searchFAQ(keyword: string) {
  const results: { duty: string; faq: any }[] = [];

  allUltraDetailedDuties.forEach(duty => {
    duty.detailedFAQ.forEach(faq => {
      if (
        faq.question.includes(keyword) ||
        faq.answer.includes(keyword)
      ) {
        results.push({ duty: duty.name, faq });
      }
    });
  });

  return results;
}

// 나이스 메뉴 경로 모음
export function getAllNeisMenus() {
  return allUltraDetailedDuties
    .filter(duty => duty.neisGuide.frequentMenus.length > 0)
    .map(duty => ({
      dutyName: duty.name,
      menus: duty.neisGuide.frequentMenus,
    }));
}

// 외부 기관 연락처 모음
export function getAllExternalPartners() {
  return allUltraDetailedDuties
    .filter(duty => duty.externalPartners.length > 0)
    .flatMap(duty =>
      duty.externalPartners.map(partner => ({
        ...partner,
        relatedDuty: duty.name,
      }))
    );
}

// ========================================
// 통계 정보
// ========================================
export const ultraDetailedDutiesStats = {
  totalDuties: allUltraDetailedDuties.length,
  totalTasks: allUltraDetailedDuties.reduce(
    (sum, duty) => sum + duty.detailedTasks.length, 0
  ),
  totalFAQs: allUltraDetailedDuties.reduce(
    (sum, duty) => sum + duty.detailedFAQ.length, 0
  ),
  totalEmergencyProcedures: allUltraDetailedDuties.reduce(
    (sum, duty) => sum + duty.emergencyProcedures.length, 0
  ),
  byDifficulty: {
    2: allUltraDetailedDuties.filter(d => d.difficulty === 2).length,
    3: allUltraDetailedDuties.filter(d => d.difficulty === 3).length,
    4: allUltraDetailedDuties.filter(d => d.difficulty === 4).length,
    5: allUltraDetailedDuties.filter(d => d.difficulty === 5).length,
  },
  categories: Object.keys(ultraDetailedDutiesByCategory).map(cat => ({
    category: cat,
    count: ultraDetailedDutiesByCategory[cat as keyof typeof ultraDetailedDutiesByCategory].length,
  })),
};

// ========================================
// 초보자를 위한 추천 순서
// ========================================
export const recommendedOrderForBeginners: string[] = [
  'class-teacher-ultra',      // 담임 업무가 기본
  'academic-affairs-ultra',   // 교무 업무 이해
  'safety-ultra',             // 안전은 필수
  'school-violence-ultra',    // 학폭 대응 필수
  'health-ultra',             // 보건 업무 기본
];

// ========================================
// 월별 중요 업무 캘린더
// ========================================
export const monthlyCalendar = {
  1: ['2월 준비', '학급 인수인계'],
  2: ['새학년 준비', '업무분장', '학급 편성', '교육과정 편성'],
  3: ['학년 시작', '학급 조직', '학부모 총회', '기초조사', '안전점검'],
  4: ['학부모 상담주간', '과학의 달', 'PAPS', '정서행동특성검사'],
  5: ['운동회', '진로체험', '안전한국훈련', '수영교육'],
  6: ['1학기 마무리', '생기부 작성', '정보공시'],
  7: ['방학식', '방학 프로그램', '시설 점검'],
  8: ['2학기 준비', '신규 교사 연수'],
  9: ['2학기 시작', '독서의 달', '학부모 상담'],
  10: ['체육대회', '교원능력개발평가', '현장체험학습'],
  11: ['안전한국훈련', '연구학교 결과보고', '영재 선발'],
  12: ['학년말 정리', '생기부 마감', '졸업/종업 준비', '차년도 계획'],
};

export default allUltraDetailedDuties;
