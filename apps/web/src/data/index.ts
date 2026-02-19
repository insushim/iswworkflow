// 초등 업무 데이터베이스 통합 인덱스
// 모든 데이터베이스 모듈을 한 곳에서 내보냅니다

// ========================================
// 학급경영
// ========================================
export {
  classroomTips,
  morningActivities,
  classroomRules,
  rewardSystems,
  seatArrangements,
  getClassroomTipsByCategory,
  getClassroomTipsByGrade,
  getMorningActivitiesByType,
  getMorningActivitiesByGrade,
  getClassroomRulesByCategory,
  getRewardSystemsByType,
  tipCategories,
  activityTypes,
  ruleCategories,
  type ClassroomTip,
  type MorningActivity,
  type ClassroomRule,
  type RewardSystem,
  type SeatArrangement,
} from './classroom-management';

// ========================================
// 안전교육
// ========================================
export {
  safetyDomains,
  safetyEducations,
  emergencyProcedures,
  safetyChecklists,
  getSafetyEducationsByDomain,
  getSafetyEducationsByGrade,
  getEmergencyProceduresByType,
  getSafetyChecklistByLocation,
  searchSafetyEducations,
  type SafetyEducation,
  type EmergencyProcedure,
  type SafetyChecklist,
} from './safety-education';

// ========================================
// 특수교육/통합교육
// ========================================
export {
  disabilityInfos,
  specialEducationTips,
  iepComponents,
  accommodationStrategies,
  getDisabilityInfo,
  getTipsByCategory as getSpecialEdTipsByCategory,
  getTipsByDisability,
  getAccommodationsByArea,
  getAccommodationsByDisability,
  searchSpecialEducation,
  tipCategories as specialEdCategories,
  type DisabilityInfo,
  type SpecialEducationTip,
  type IEPComponent,
  type AccommodationStrategy,
} from './special-education';

// ========================================
// 학부모 상담
// ========================================
export {
  counselingGuides,
  parentConcerns,
  communicationTemplates,
  getCounselingGuidesByCategory,
  getParentConcernsByCategory,
  getTemplatesByType,
  searchCounselingGuides,
  counselingCategories,
  concernCategories,
  templateTypes,
  type CounselingGuide,
  type ParentConcern,
  type CommunicationTemplate,
} from './parent-counseling';

// ========================================
// 교사 용어사전
// ========================================
export {
  glossaryTerms,
  abbreviations,
  getTermsByCategory,
  getAbbreviationsByCategory,
  searchTerms,
  searchAbbreviations,
  getTermByAbbreviation,
  termCategories,
  abbreviationCategories,
  type GlossaryTerm,
  type AbbreviationEntry,
} from './teacher-glossary';

// ========================================
// 기존 데이터베이스들 (이미 존재하는 것들)
// ========================================

// 생활기록부 문구
export {
  schoolRecordPhrases,
  phraseCategories,
  coreCharacterElements,
  type RecordPhrase,
} from './school-record-phrases';

// 학사일정
export {
  academicCalendarFull,
  eventCategories as academicEventCategories,
  monthlyOverview,
  type AcademicEvent as AcademicCalendarEvent,
} from './academic-calendar-full';

// 커뮤니티 자료
export {
  communityResourcesDatabase,
  resourceSources,
  resourceCategories,
  searchResources,
  type CommunityResource,
} from './community-resources';

// 교육과정 성취기준
export * from './curriculum-standards';

// 교육과정 편성 종합 데이터 (시수, 단원, 평가, 시간표 등)
export * from './curriculum-data';

// 행사 체크리스트
export * from './event-checklists';

// 공문서 양식
export * from './official-document-templates';

// 부서별 업무 가이드
export * from './duties-guide-ultra-detailed';

// 강화형 종합 업무 데이터베이스 (500+ 자료원 교차검증)
export { ENHANCED_TEACHER_DB } from './teacher-enhanced-db';
export {
  getMandatoryEducationById,
  getEnhancedMonthlyTasks,
  searchNeisMenu,
  searchLegalReference,
  searchPlatform,
  searchDepartmentDuties,
  getSchoolEventsByMonth,
  getRequiredTrainings,
  getCurriculumChangesBySubject,
  getDailyRoutineByTime,
} from './teacher-enhanced-db';
