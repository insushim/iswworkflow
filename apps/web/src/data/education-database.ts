// 초등학교 교사 종합 업무 데이터베이스
// 전국 교육청 자료, 나이스, 학교알리미 등을 참조하여 구축
// v14.0 - 통합 데이터베이스 (부서별 상세 업무 가이드 16개 부서 포함)

// Ultra-Detailed Duties 데이터 통합 (16개 부서 상세 가이드)
import {
  allUltraDetailedDuties,
  getUltraDetailedDutyById,
  searchUltraDetailedDuties,
  getMonthlyTasks as getUltraDetailedMonthlyTasks,
  getAllEmergencyProcedures,
  searchFAQ as searchUltraDetailedFAQ,
  getAllNeisMenus,
  monthlyCalendar,
} from './duties-guide-ultra-detailed-all';
import type { UltraDetailedDutyGuide } from './duties-guide-ultra-detailed';

// 확장된 데이터베이스 import
import { expandedLegalDatabase } from './education-database-legal';
import { expandedFormTemplatesDatabase } from './education-database-forms';
import { expandedNeisGuideDatabase } from './education-database-neis';
import { expandedFaqDatabase } from './education-database-faq';

// ============================================================
// 1. 월별 업무 일정 데이터베이스
// ============================================================

export interface MonthlyTask {
  id: string;
  month: number;
  title: string;
  category: string;
  department: string;
  deadline: string; // "매월 5일", "3월 첫째주", "수시" 등
  description: string;
  checklist: string[];
  relatedDocs: string[];
  neisMenu?: string; // 나이스 메뉴 경로
  legalBasis?: string; // 관련 법령
  tips: string[];
  priority: 'high' | 'medium' | 'low';
}

export const monthlyTasksDatabase: MonthlyTask[] = [
  // ============ 3월 업무 ============
  {
    id: 'mar-001',
    month: 3,
    title: '학급편성 및 담임배정',
    category: '학급경영',
    department: '교무기획부',
    deadline: '3월 1일 이전',
    description: '신학년도 학급 편성과 담임 배정을 완료합니다. 학생 수, 특수교육대상자, 전입생 등을 고려하여 균형 있는 학급 편성이 필요합니다.',
    checklist: [
      '전년도 학급별 학생 현황 파악',
      '특수교육대상자 배치 확인',
      '다문화 학생 현황 파악',
      '학부모 희망사항 수렴 (필요시)',
      '교사 담임 희망 조사',
      '학급당 학생수 법정기준 확인 (초등 26명)',
      '학급편성표 작성',
      '나이스 학급 생성',
    ],
    relatedDocs: ['학급편성표', '담임배정표', '학생배치계획서'],
    neisMenu: '교무업무 > 기초학적관리 > 반편성',
    legalBasis: '초·중등교육법 시행령 제51조',
    tips: [
      '특수교육대상자가 있는 학급은 학생수를 2~3명 줄여 배정',
      '전입생을 고려하여 여유 인원 확보',
      '남녀 비율 고려',
      '문제행동 학생의 분산 배치',
    ],
    priority: 'high',
  },
  {
    id: 'mar-002',
    month: 3,
    title: '교육과정 편성 및 시간표 작성',
    category: '교육과정',
    department: '연구부',
    deadline: '3월 첫째주',
    description: '학교 교육과정에 따른 학년별 시간표를 작성합니다. 교과전담, 특별실 사용, 창의적 체험활동 등을 고려합니다.',
    checklist: [
      '학교 교육과정 편성 확인',
      '교과전담 교사 배정 확인',
      '특별실(과학실, 음악실, 컴퓨터실 등) 사용 일정 조율',
      '체육관, 운동장 사용 일정 조율',
      '학년별 블록타임 설정 여부 결정',
      '창의적 체험활동 시간 배정',
      '방과후학교와의 연계 확인',
      '나이스 시간표 입력',
    ],
    relatedDocs: ['학교 교육과정', '시간표', '교과전담 배정표', '특별실 사용 계획'],
    neisMenu: '교무업무 > 시간표관리 > 시간표편성',
    legalBasis: '2022 개정 교육과정 총론',
    tips: [
      '체육은 우천시 대비 오전 배치 권장',
      '집중력 필요 교과는 오전에 배정',
      '연속 블록수업 고려 시 쉬는시간 확보',
      '점심시간 전후로 활동적 교과 배치 지양',
    ],
    priority: 'high',
  },
  {
    id: 'mar-003',
    month: 3,
    title: '학생 생활기록부 점검',
    category: '학적',
    department: '학년부',
    deadline: '3월 둘째주',
    description: '전년도 학생 생활기록부 기재 사항을 점검하고 오류 수정 및 보완합니다.',
    checklist: [
      '인적사항 변동 확인 (주소, 보호자 등)',
      '학적사항 누락 확인',
      '출결현황 최종 확인',
      '수상경력 기재 확인',
      '창체활동 기록 확인',
      '교과학습발달상황 확인',
      '행동특성 및 종합의견 확인',
      '자유학기활동 기록 확인 (해당시)',
    ],
    relatedDocs: ['학생생활기록부', '학생부 기재요령'],
    neisMenu: '학생생활 > 학생부',
    legalBasis: '학교생활기록 작성 및 관리지침',
    tips: [
      '학교생활기록부 기재요령은 매년 업데이트됨',
      '이전 학년 담임과 협의하여 수정',
      '수정 시 정정대장 작성 필수',
      '학생부 점검 체크리스트 활용',
    ],
    priority: 'high',
  },
  {
    id: 'mar-004',
    month: 3,
    title: '학부모 총회 및 상담주간',
    category: '학부모',
    department: '학년부',
    deadline: '3월 둘째~셋째주',
    description: '신학년 학부모 총회를 개최하고 담임-학부모 상담을 진행합니다.',
    checklist: [
      '학부모 총회 일정 공지',
      '학급 운영 계획 발표자료 준비',
      '교육과정 안내자료 준비',
      '학급 규칙 및 약속 안내',
      '알림장/클래스팅 등 소통방법 안내',
      '상담 희망 조사',
      '상담 일정표 작성',
      '상담 기록부 준비',
    ],
    relatedDocs: ['학급운영계획서', '교육과정안내자료', '상담기록부', '가정통신문'],
    tips: [
      '첫 만남인 만큼 긍정적 분위기 조성',
      '학급 비전과 교육 철학 공유',
      '학부모 연락처 및 비상연락처 수집',
      '특이사항 학생은 개별 상담 일정 조율',
    ],
    priority: 'high',
  },
  {
    id: 'mar-005',
    month: 3,
    title: '안전교육 계획 수립',
    category: '안전',
    department: '안전부',
    deadline: '3월 첫째주',
    description: '연간 7대 안전교육 계획을 수립하고 시수를 배정합니다.',
    checklist: [
      '7대 안전교육 영역별 시수 확인',
      '학교안전교육 실시 기준 확인',
      '안전교육 연간계획 수립',
      '안전체험교육 일정 확인',
      '소방훈련 일정 수립 (분기별)',
      '지진대피훈련 일정 수립',
      '학교폭력예방교육 계획',
      '생명존중교육 계획',
    ],
    relatedDocs: ['안전교육 연간계획', '소방훈련 계획서', '학교안전계획'],
    legalBasis: '학교안전교육 실시 기준 등에 관한 고시',
    tips: [
      '7대 안전교육: 생활안전, 교통안전, 폭력예방, 약물/사이버중독, 재난안전, 직업안전, 응급처치',
      '학년별 51시간 이상 이수 필수',
      '학교안전정보센터 자료 활용',
      '안전교육은 나이스 창체 입력 시 구분 기록',
    ],
    priority: 'high',
  },
  {
    id: 'mar-006',
    month: 3,
    title: '학교폭력 실태조사',
    category: '생활지도',
    department: '생활지도부',
    deadline: '3월 넷째주',
    description: '1차 학교폭력 실태조사를 실시합니다.',
    checklist: [
      '학교폭력 실태조사 일정 확인',
      '실태조사 참여 안내 가정통신문 발송',
      '온라인 설문 URL 학생 안내',
      '설문 참여 독려',
      '참여율 확인 및 미참여 학생 독려',
      '설문 결과 분석',
      '결과 보고',
    ],
    relatedDocs: ['학교폭력 실태조사 안내문', '결과보고서'],
    neisMenu: '학생생활 > 학교폭력 > 실태조사',
    legalBasis: '학교폭력예방 및 대책에 관한 법률',
    tips: [
      '실태조사는 연 2회 실시 (3월, 9월)',
      '전학생, 장기결석 학생도 참여 필요',
      '설문은 개인정보 보호 철저',
      '결과는 학교폭력대책심의위원회 보고',
    ],
    priority: 'high',
  },

  // ============ 4월 업무 ============
  {
    id: 'apr-001',
    month: 4,
    title: '과학의 달 행사',
    category: '행사',
    department: '과학부',
    deadline: '4월',
    description: '과학의 달 행사를 기획하고 운영합니다.',
    checklist: [
      '과학행사 계획 수립',
      '학년별 과학 탐구대회 종목 결정',
      '과학전람회 출품작 선정',
      '과학체험부스 운영 계획',
      '실험키트 구입',
      '시상 계획 수립',
      '결과 보고',
    ],
    relatedDocs: ['과학행사 계획서', '대회요강', '시상대장'],
    tips: [
      '과학의 날 (4월 21일) 전후로 행사 집중',
      '과학실 안전수칙 재확인',
      '외부 과학관 체험학습 연계 가능',
    ],
    priority: 'medium',
  },
  {
    id: 'apr-002',
    month: 4,
    title: '현장체험학습 계획 및 실시',
    category: '체험학습',
    department: '학년부',
    deadline: '4월 중',
    description: '봄 현장체험학습을 계획하고 실시합니다.',
    checklist: [
      '체험학습 장소 선정 및 답사',
      '체험학습 실시계획서 작성',
      '학교운영위원회 심의',
      '가정통신문 발송 (동의서)',
      '인솔교사 배치 계획',
      '버스 임차 계약',
      '응급처치 키트 준비',
      '비상연락망 구축',
      '안전교육 실시',
      '당일 인원 점검',
      '결과보고서 작성',
    ],
    relatedDocs: ['현장체험학습 계획서', '학부모 동의서', '안전교육 자료', '결과보고서'],
    legalBasis: '학교 현장체험학습 운영 매뉴얼',
    tips: [
      '학생 40명당 인솔교사 1명 이상',
      '응급환자 발생 시 대응 매뉴얼 숙지',
      '알레르기, 지병 학생 사전 파악',
      '답사 시 안전요소 점검 필수',
      '우천 시 대체 프로그램 마련',
    ],
    priority: 'high',
  },
  {
    id: 'apr-003',
    month: 4,
    title: '건강검진 및 신체검사',
    category: '보건',
    department: '보건부',
    deadline: '4월',
    description: '학생 건강검진 및 신체발달 검사를 실시합니다.',
    checklist: [
      '건강검진 대상자 확인 (1, 4학년 필수)',
      '검진기관 선정',
      '검진일정 조율',
      '가정통신문 발송',
      '건강조사표 배부 및 수합',
      '검진 당일 인솔',
      '검진결과 통보 및 관리',
      '나이스 입력',
    ],
    relatedDocs: ['건강검진 안내문', '건강조사표', '검진결과통보서'],
    neisMenu: '보건관리 > 학생건강검사',
    legalBasis: '학교건강검사규칙',
    tips: [
      '1, 4학년: 건강검진 필수',
      '2, 3, 5, 6학년: 신체발달 검사',
      '검진 전 공복 안내 철저',
      '결과 이상자 추후관리 필수',
    ],
    priority: 'high',
  },

  // ============ 5월 업무 ============
  {
    id: 'may-001',
    month: 5,
    title: '스승의 날 행사',
    category: '행사',
    department: '학년부',
    deadline: '5월 15일',
    description: '스승의 날 행사를 계획하고 운영합니다.',
    checklist: [
      '스승의 날 행사 계획 수립',
      '학생 감사편지 쓰기 지도',
      '감사카드 제작',
      '학교 행사 운영 (방송, 이벤트 등)',
      '은사 찾아뵙기 행사 (필요시)',
    ],
    relatedDocs: ['스승의날 행사 계획', '감사편지 양식'],
    tips: [
      '청탁금지법 준수 (선물 금지)',
      '금품 수수 절대 금지 안내',
      '마음을 담은 편지 중심 행사',
    ],
    priority: 'medium',
  },
  {
    id: 'may-002',
    month: 5,
    title: '학부모 공개수업',
    category: '수업',
    department: '연구부',
    deadline: '5월',
    description: '학부모 공개수업을 계획하고 실시합니다.',
    checklist: [
      '공개수업 일정 결정',
      '가정통신문 발송',
      '참관 신청서 수합',
      '수업 지도안 작성',
      '교실 환경 정비',
      '수업 진행',
      '학부모 설문조사',
      '결과 분석 및 환류',
    ],
    relatedDocs: ['공개수업 안내문', '수업지도안', '학부모 설문지', '결과보고서'],
    tips: [
      '모든 학부모가 참관할 수 있도록 일정 배려',
      '온라인 공개수업도 고려',
      '수업 후 학부모 간담회 연계 가능',
    ],
    priority: 'medium',
  },
  {
    id: 'may-003',
    month: 5,
    title: '학생 정서행동 특성검사',
    category: '상담',
    department: '전문상담부',
    deadline: '5월',
    description: '학생 정서행동 특성검사를 실시합니다.',
    checklist: [
      '검사 대상 확인 (1, 4학년)',
      '검사 일정 수립',
      '가정통신문 발송 (동의서)',
      '동의서 수합',
      '온라인 검사 실시',
      '결과 확인 및 관심군 선별',
      '관심군 학생 2차 검사',
      '전문기관 연계 (필요시)',
    ],
    relatedDocs: ['검사 안내문', '동의서', '결과통보서'],
    neisMenu: '학생생활 > 정서행동특성검사',
    legalBasis: '학생정신건강 관리 조례',
    tips: [
      '관심군 학생 개인정보 철저 관리',
      'Wee클래스 연계 상담 진행',
      '학부모 동의 필수',
      '결과는 민감정보로 취급',
    ],
    priority: 'high',
  },

  // ============ 6월 업무 ============
  {
    id: 'jun-001',
    month: 6,
    title: '1학기 성적 처리',
    category: '평가',
    department: '학년부',
    deadline: '6월 말',
    description: '1학기 교과 성적을 처리하고 학생부에 기록합니다.',
    checklist: [
      '평가 결과 정리',
      '성적 산출 기준 확인',
      '나이스 성적 입력',
      '교과학습발달상황 서술형 작성',
      '성적 검토 및 확인',
      '성적일람표 출력 및 검토',
      '오류 수정',
      '성적 확정',
    ],
    relatedDocs: ['성적처리 지침', '교과학습발달상황 작성 예시'],
    neisMenu: '학생생활 > 학생부 > 교과학습발달상황',
    legalBasis: '학교생활기록 작성 및 관리지침',
    tips: [
      '문장형 기술 시 학생 개인별 특성 반영',
      '성적 입력 마감일 엄수',
      '동료 교사와 교차 검토',
      '최소 성취기준 미도달 학생 관리',
    ],
    priority: 'high',
  },
  {
    id: 'jun-002',
    month: 6,
    title: '1학기 학생부 기록',
    category: '학적',
    department: '학년부',
    deadline: '6월 말',
    description: '1학기 학생생활기록부 기재를 완료합니다.',
    checklist: [
      '출결현황 정리',
      '수상경력 입력',
      '창의적 체험활동 기록',
      '자유학기활동 기록 (해당학년)',
      '행동특성 및 종합의견 작성',
      '자기주도적 학습 특기사항 기록',
      '전체 검토 및 확인',
    ],
    relatedDocs: ['학생부 기재요령', '학생부 예시문'],
    neisMenu: '학생생활 > 학생부',
    tips: [
      '구체적 행동 사례 중심 기술',
      '긍정적 성장 관점에서 기술',
      '오탈자 및 문법 오류 점검',
      '학생별 개성이 드러나도록 작성',
    ],
    priority: 'high',
  },
  {
    id: 'jun-003',
    month: 6,
    title: '통지표 발송',
    category: '학적',
    department: '학년부',
    deadline: '6월 말',
    description: '1학기 학업성적 통지표를 발송합니다.',
    checklist: [
      '통지표 양식 확인',
      '통지표 출력',
      '내용 최종 검토',
      '오류 수정',
      '발송 준비',
      '학부모 배부',
    ],
    relatedDocs: ['통지표 양식', '통지표 발송 안내'],
    tips: [
      '통지표는 학생부와 일치해야 함',
      '가정통신문과 함께 발송',
      '민원 대비 사본 보관',
    ],
    priority: 'medium',
  },

  // ============ 7-8월 업무 ============
  {
    id: 'jul-001',
    month: 7,
    title: '방학 중 업무 계획',
    category: '방학',
    department: '교무기획부',
    deadline: '방학 전',
    description: '여름방학 중 학교 업무 계획을 수립합니다.',
    checklist: [
      '방학 중 당직 계획',
      '방학 중 행정실 근무 계획',
      '방과후학교 운영 계획',
      '돌봄교실 운영 계획',
      '시설 보수 계획',
      '2학기 교육과정 준비',
      '교원 연수 계획',
    ],
    relatedDocs: ['방학 중 업무 계획', '당직표', '방과후학교 운영 계획'],
    tips: [
      '방학 중에도 비상연락망 유지',
      '시설 보수는 개학 전 완료',
      '교육과정 재구성 연구 시간 활용',
    ],
    priority: 'medium',
  },
  {
    id: 'aug-001',
    month: 8,
    title: '2학기 준비',
    category: '교무',
    department: '교무기획부',
    deadline: '개학 전',
    description: '2학기 개학 준비를 합니다.',
    checklist: [
      '2학기 시간표 확인',
      '교실 환경 정비',
      '교과서 배부 준비',
      '학습 자료 점검',
      '전입생 학급 배치',
      '2학기 교육과정 최종 점검',
      '방과후학교 개강 준비',
    ],
    relatedDocs: ['2학기 교육과정', '시간표', '교과서 배부 계획'],
    tips: [
      '방학 중 전입생 현황 파악',
      '교실 비품 파손 여부 점검',
      '에어컨/난방 시설 점검',
    ],
    priority: 'high',
  },

  // ============ 9월 업무 ============
  {
    id: 'sep-001',
    month: 9,
    title: '2차 학교폭력 실태조사',
    category: '생활지도',
    department: '생활지도부',
    deadline: '9월',
    description: '2차 학교폭력 실태조사를 실시합니다.',
    checklist: [
      '학교폭력 실태조사 일정 확인',
      '실태조사 참여 안내 가정통신문 발송',
      '온라인 설문 URL 학생 안내',
      '설문 참여 독려',
      '참여율 확인',
      '결과 분석',
      '결과 보고',
    ],
    relatedDocs: ['학교폭력 실태조사 안내문', '결과보고서'],
    neisMenu: '학생생활 > 학교폭력 > 실태조사',
    tips: [
      '1차 조사와 비교 분석',
      '신규 발생 사안 집중 관리',
      '예방교육 강화 필요 영역 파악',
    ],
    priority: 'high',
  },
  {
    id: 'sep-002',
    month: 9,
    title: '가을 운동회/체육대회',
    category: '행사',
    department: '체육부',
    deadline: '9-10월',
    description: '가을 운동회 또는 체육대회를 계획하고 운영합니다.',
    checklist: [
      '체육대회 일정 및 종목 결정',
      '운영위원회 심의',
      '가정통신문 발송',
      '학년별 종목 연습',
      '운동장/체육관 점검',
      '안전요원 배치 계획',
      '응급처치 준비',
      '당일 운영',
      '결과 시상',
      '정리 및 평가',
    ],
    relatedDocs: ['체육대회 계획서', '종목별 세부계획', '시상대장'],
    tips: [
      '우천 시 대체 일정 수립',
      '열사병 등 응급상황 대비',
      '특수교육대상자 참여 종목 마련',
      '학부모 참여 종목 검토',
    ],
    priority: 'medium',
  },

  // ============ 10월 업무 ============
  {
    id: 'oct-001',
    month: 10,
    title: '독서의 달 행사',
    category: '행사',
    department: '독서교육부',
    deadline: '10월',
    description: '독서의 달 관련 행사를 계획하고 운영합니다.',
    checklist: [
      '독서행사 계획 수립',
      '독서퀴즈대회 운영',
      '독서감상화 대회',
      '독서감상문 대회',
      '작가와의 만남 (필요시)',
      '도서관 행사',
      '시상',
    ],
    relatedDocs: ['독서행사 계획', '대회요강', '시상대장'],
    tips: [
      '도서관 연계 프로그램 활용',
      '학년별 추천도서 목록 제공',
      '다양한 장르 독서 장려',
    ],
    priority: 'medium',
  },
  {
    id: 'oct-002',
    month: 10,
    title: '현장체험학습 (가을)',
    category: '체험학습',
    department: '학년부',
    deadline: '10월 중',
    description: '가을 현장체험학습을 계획하고 실시합니다.',
    checklist: [
      '체험학습 장소 선정 및 답사',
      '체험학습 실시계획서 작성',
      '학교운영위원회 심의',
      '가정통신문 발송 (동의서)',
      '인솔교사 배치',
      '버스 임차',
      '안전교육 실시',
      '당일 운영',
      '결과보고서 작성',
    ],
    relatedDocs: ['현장체험학습 계획서', '학부모 동의서', '결과보고서'],
    tips: [
      '가을 단풍철 교통 혼잡 고려',
      '수학여행과 연계 검토',
      '체험 위주 장소 선정',
    ],
    priority: 'high',
  },

  // ============ 11월 업무 ============
  {
    id: 'nov-001',
    month: 11,
    title: '졸업앨범 촬영',
    category: '졸업',
    department: '학년부',
    deadline: '11월',
    description: '졸업앨범 촬영을 계획하고 진행합니다.',
    checklist: [
      '졸업앨범 업체 선정',
      '촬영 일정 조율',
      '개인사진 촬영',
      '단체사진 촬영',
      '수업 장면 촬영',
      '특별활동 촬영',
      '졸업앨범 시안 검토',
      '수정 요청',
      '최종 확정',
    ],
    relatedDocs: ['졸업앨범 계약서', '촬영 일정표', '앨범 시안'],
    tips: [
      '결석 학생 개별 촬영 일정 조율',
      '초상권 동의서 사전 수합',
      '이름, 반 오류 꼼꼼히 확인',
      '편집 전 사진 선별 참여',
    ],
    priority: 'high',
  },
  {
    id: 'nov-002',
    month: 11,
    title: '교원능력개발평가',
    category: '평가',
    department: '연구부',
    deadline: '11월',
    description: '교원능력개발평가를 실시합니다.',
    checklist: [
      '평가 일정 공지',
      '동료교원 평가 실시',
      '학생 만족도 조사 (4학년 이상)',
      '학부모 만족도 조사',
      '결과 수합',
      '결과 분석',
      '결과 통보',
      '능력개발계획 수립',
    ],
    relatedDocs: ['교원능력개발평가 계획', '결과보고서', '능력개발계획서'],
    neisMenu: '나이스 교원능력개발평가 시스템',
    legalBasis: '교원 등의 연수에 관한 규정',
    tips: [
      '평가 결과는 비공개 원칙',
      '개인별 능력개발 계획 수립',
      '결과에 따른 맞춤형 연수 이수',
    ],
    priority: 'high',
  },

  // ============ 12월 업무 ============
  {
    id: 'dec-001',
    month: 12,
    title: '2학기 성적 처리',
    category: '평가',
    department: '학년부',
    deadline: '12월',
    description: '2학기 교과 성적을 처리하고 학생부에 기록합니다.',
    checklist: [
      '평가 결과 정리',
      '성적 산출',
      '나이스 성적 입력',
      '교과학습발달상황 서술형 작성',
      '검토 및 확인',
      '성적 확정',
    ],
    relatedDocs: ['성적처리 지침', '교과학습발달상황 작성 예시'],
    neisMenu: '학생생활 > 학생부',
    tips: [
      '연간 성장을 반영한 기술',
      '구체적 활동과 성취 중심 기술',
      '학년말 마감일 엄수',
    ],
    priority: 'high',
  },
  {
    id: 'dec-002',
    month: 12,
    title: '학년말 학생부 정리',
    category: '학적',
    department: '학년부',
    deadline: '12월 말',
    description: '학년말 학생생활기록부를 정리합니다.',
    checklist: [
      '출결현황 최종 정리',
      '수상경력 최종 입력',
      '창의적 체험활동 기록 완료',
      '행동특성 및 종합의견 작성',
      '봉사활동 시간 확인',
      '전체 검토',
      '학년말 확정',
    ],
    relatedDocs: ['학생부 기재요령', '점검 체크리스트'],
    neisMenu: '학생생활 > 학생부',
    tips: [
      '진급/졸업 전 최종 점검',
      '오류 발견 시 즉시 수정',
      '다음 학년 담임 인수인계 준비',
    ],
    priority: 'high',
  },

  // ============ 1월 업무 ============
  {
    id: 'jan-001',
    month: 1,
    title: '학년말 업무 정리',
    category: '교무',
    department: '교무기획부',
    deadline: '1월',
    description: '학년말 각종 업무를 정리합니다.',
    checklist: [
      '학생부 최종 점검',
      '출결 마감',
      '각종 대장 정리',
      '문서 편철',
      '비품 정리',
      '다음 학년 인수인계 자료 준비',
      '학급 물품 반납',
    ],
    relatedDocs: ['업무 인수인계서', '비품 대장'],
    tips: [
      '문서 보존 기간 확인 후 정리',
      '개인정보 포함 문서 파기 절차 준수',
      '전자문서 폴더 정리',
    ],
    priority: 'medium',
  },
  {
    id: 'jan-002',
    month: 1,
    title: '신학년도 교육과정 편성',
    category: '교육과정',
    department: '연구부',
    deadline: '1-2월',
    description: '신학년도 교육과정을 편성합니다.',
    checklist: [
      '국가 교육과정 분석',
      '학교 교육 목표 설정',
      '학년별 교육과정 편성',
      '창의적 체험활동 계획',
      '범교과 학습 주제 통합',
      '평가 계획 수립',
      '교육과정위원회 심의',
      '학교운영위원회 심의',
    ],
    relatedDocs: ['학교 교육과정', '학년별 교육과정', '평가계획'],
    legalBasis: '초·중등교육법 시행령 제43조',
    tips: [
      '학년군별 성취기준 분석',
      '교과 간 연계 고려',
      '지역사회 자원 활용 계획',
    ],
    priority: 'high',
  },

  // ============ 2월 업무 ============
  {
    id: 'feb-001',
    month: 2,
    title: '졸업식 준비',
    category: '졸업',
    department: '교무기획부',
    deadline: '2월',
    description: '졸업식을 준비하고 진행합니다.',
    checklist: [
      '졸업식 계획 수립',
      '졸업장 출력 및 점검',
      '시상 준비',
      '졸업앨범 배부',
      '졸업식 식순 확정',
      '내빈 초청',
      '졸업식장 준비',
      '졸업식 진행',
      '졸업대장 정리',
    ],
    relatedDocs: ['졸업식 계획', '졸업장', '상장', '졸업대장'],
    neisMenu: '학생생활 > 학적 > 졸업',
    tips: [
      '졸업장 이름/생년월일 오류 확인',
      '졸업생 최종 학생부 점검',
      '졸업 후 취학통지서 발송 확인',
    ],
    priority: 'high',
  },
  {
    id: 'feb-002',
    month: 2,
    title: '신입생 배정 및 입학 준비',
    category: '입학',
    department: '교무기획부',
    deadline: '2월',
    description: '신입생 배정 및 입학식을 준비합니다.',
    checklist: [
      '신입생 명단 확정',
      '학급 배정',
      '입학식 계획 수립',
      '입학 안내문 발송',
      '교과서 신청',
      '입학식장 준비',
      '입학식 진행',
      '학적 생성',
    ],
    relatedDocs: ['입학 안내문', '입학식 계획', '학급배정표'],
    neisMenu: '학생생활 > 학적 > 입학',
    tips: [
      '예비소집일 운영으로 사전 안내',
      '특수교육대상자 배치 확인',
      '다문화 학생 현황 파악',
      '취학유예자 현황 확인',
    ],
    priority: 'high',
  },
  {
    id: 'feb-003',
    month: 2,
    title: '신학년 담임 및 업무 배정',
    category: '인사',
    department: '교무기획부',
    deadline: '2월 말',
    description: '신학년도 담임 및 업무 배정을 완료합니다.',
    checklist: [
      '담임 희망 조사',
      '업무 희망 조사',
      '담임 배정안 마련',
      '업무분장안 마련',
      '교직원회의 협의',
      '최종 확정',
      '발표',
    ],
    relatedDocs: ['담임배정표', '업무분장표', '희망조사서'],
    tips: [
      '순환보직 원칙 고려',
      '개인 역량 및 희망 반영',
      '업무 형평성 고려',
      '신규/저경력 교사 멘토링 배치',
    ],
    priority: 'high',
  },
];

// ============================================================
// 2. 업무별 상세 가이드 데이터베이스
// ============================================================

export interface DutyGuide {
  id: string;
  title: string;
  category: string;
  department: string;
  overview: string;
  legalBasis: string[];
  keyResponsibilities: string[];
  stepByStep: {
    step: number;
    title: string;
    description: string;
    checklist: string[];
    tips: string[];
    commonMistakes: string[];
    neisPath?: string;
  }[];
  relatedForms: {
    name: string;
    description: string;
    downloadUrl?: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  annualSchedule: {
    month: number;
    tasks: string[];
  }[];
  references: {
    title: string;
    url?: string;
    description: string;
  }[];
}

export const dutyGuidesDatabase: DutyGuide[] = [
  {
    id: 'academic-affairs',
    title: '교무기획부 업무 가이드',
    category: '교무',
    department: '교무기획부',
    overview: '교무기획부는 학교 교육과정 운영의 중심이 되는 부서로, 교육과정 편성·운영, 학사일정 수립, 수업시수 관리, 각종 위원회 운영 등을 담당합니다.',
    legalBasis: [
      '초·중등교육법 제23조 (교육과정 등)',
      '초·중등교육법 시행령 제43조 (교과)',
      '2022 개정 교육과정 총론',
    ],
    keyResponsibilities: [
      '학교 교육과정 편성 및 운영',
      '학사일정 수립 및 관리',
      '시간표 편성 및 관리',
      '수업시수 관리',
      '교과서 수급 및 배부',
      '교직원회의 운영',
      '학교운영위원회 업무',
      '학교규칙 관리',
    ],
    stepByStep: [
      {
        step: 1,
        title: '교육과정 편성',
        description: '국가 교육과정에 기반하여 학교 교육과정을 편성합니다.',
        checklist: [
          '국가 교육과정 문서 분석',
          '학교 교육 비전 및 목표 설정',
          '학년별 교과 시수 배정',
          '창의적 체험활동 시수 배정',
          '범교과 학습 주제 통합',
          '평가 기본 방침 수립',
        ],
        tips: [
          '교육과정 재구성은 교사 협의를 통해 결정',
          '지역 특성과 학생 수준 고려',
          '교과 간 연계 학습 주제 발굴',
        ],
        commonMistakes: [
          '법정 수업시수 미달',
          '창체 영역별 시수 불균형',
          '범교과 주제 누락',
        ],
      },
      {
        step: 2,
        title: '학사일정 수립',
        description: '연간 학사일정을 수립하고 관리합니다.',
        checklist: [
          '교육청 지침 확인',
          '수업일수 190일 이상 확보',
          '방학 기간 설정',
          '주요 행사 일정 배치',
          '평가 기간 설정',
          '교직원회의 심의',
          '학교운영위원회 심의',
        ],
        tips: [
          '교육청 공문 수시 확인',
          '학부모, 학생 의견 수렴',
          '지역사회 행사와 조율',
        ],
        commonMistakes: [
          '법정 수업일수 미달',
          '평가 일정과 행사 일정 충돌',
          '교육청 일정과 상충',
        ],
        neisPath: '학교정보 > 학교일정 > 학사일정',
      },
    ],
    relatedForms: [
      {
        name: '학교 교육과정',
        description: '학교 연간 교육과정 문서',
      },
      {
        name: '학사일정표',
        description: '연간 학사일정 계획표',
      },
      {
        name: '시간표',
        description: '학년별·학급별 주간 시간표',
      },
    ],
    faq: [
      {
        question: '수업일수가 190일 미만이면 어떻게 되나요?',
        answer: '법정 수업일수(190일 이상)를 충족하지 못하면 교육청 지도 대상이 됩니다. 재해, 감염병 등 불가피한 경우 교육감 승인을 받아 10% 이내에서 감축할 수 있습니다.',
      },
      {
        question: '학사일정 변경 절차는 어떻게 되나요?',
        answer: '학사일정 변경 시 교직원회의 협의 → 학교운영위원회 심의 → 학부모 안내 순으로 진행합니다. 급박한 상황에서는 학교장 결재 후 추후 위원회에 보고할 수 있습니다.',
      },
    ],
    annualSchedule: [
      { month: 1, tasks: ['신학년 교육과정 편성', '교과서 신청'] },
      { month: 2, tasks: ['학사일정 확정', '시간표 작성', '입학식 준비'] },
      { month: 3, tasks: ['개학 준비', '교과서 배부', '학급편성'] },
      { month: 6, tasks: ['1학기 마무리', '여름방학 계획'] },
      { month: 8, tasks: ['2학기 준비', '학사일정 점검'] },
      { month: 12, tasks: ['2학기 마무리', '졸업준비'] },
    ],
    references: [
      {
        title: '2022 개정 교육과정 총론',
        url: 'https://ncic.re.kr/',
        description: '국가 교육과정 정보센터에서 원문 확인 가능',
      },
      {
        title: '초·중등교육법',
        url: 'https://law.go.kr/',
        description: '국가법령정보센터에서 확인',
      },
    ],
  },

  {
    id: 'student-life',
    title: '생활지도부 업무 가이드',
    category: '생활지도',
    department: '생활지도부',
    overview: '생활지도부는 학생 생활지도, 학교폭력 예방 및 대응, 안전한 학교 환경 조성을 담당합니다.',
    legalBasis: [
      '학교폭력예방 및 대책에 관한 법률',
      '아동복지법',
      '학생인권조례',
      '교원의 학생생활지도에 관한 고시',
    ],
    keyResponsibilities: [
      '학생 생활지도',
      '학교폭력 예방교육 및 대응',
      '학교폭력대책심의위원회 운영',
      '학생자치회 운영',
      '출결 관리',
      '학교 규칙 학생생활규정 관리',
    ],
    stepByStep: [
      {
        step: 1,
        title: '학교폭력 사안 처리',
        description: '학교폭력 사안 인지 시 적법한 절차에 따라 처리합니다.',
        checklist: [
          '사안 인지 및 초기 대응',
          '피해학생 보호조치',
          '가해학생 선도조치',
          '학교장 보고',
          '관할 교육지원청 보고',
          '학교폭력대책심의위원회 개최 요청',
          '결과 통보 및 조치',
        ],
        tips: [
          '피해학생 보호가 최우선',
          '모든 과정 기록 필수',
          '관련 학생 분리 조치',
          '상담을 통한 사실 확인',
        ],
        commonMistakes: [
          '신고 접수 후 방치',
          '가해·피해 임의 판단',
          '기록 미비',
          '절차 생략',
        ],
        neisPath: '학생생활 > 학교폭력',
      },
      {
        step: 2,
        title: '학교폭력 실태조사',
        description: '정기적으로 학교폭력 실태조사를 실시합니다.',
        checklist: [
          '조사 일정 확인 (3월, 9월)',
          '안내문 발송',
          '온라인 조사 실시',
          '참여율 관리',
          '결과 분석',
          '보고',
        ],
        tips: [
          '전학생, 장기결석자도 참여 안내',
          '조사 후 관심군 학생 상담 연계',
        ],
        commonMistakes: [
          '참여율 저조',
          '조사 기간 미준수',
        ],
        neisPath: '학생생활 > 학교폭력 > 실태조사',
      },
    ],
    relatedForms: [
      {
        name: '학교폭력 사안보고서',
        description: '학교폭력 사안 발생 시 작성하는 보고서',
      },
      {
        name: '피해학생 보호조치 신청서',
        description: '피해학생 보호조치 요청 시 사용',
      },
    ],
    faq: [
      {
        question: '학교폭력 신고는 어디로 하나요?',
        answer: '117 학교폭력 신고센터, 학교 담임교사, 학교폭력 책임교사에게 신고할 수 있습니다. 앱 "도란도란"을 통해서도 신고 가능합니다.',
      },
      {
        question: '경미한 학교폭력도 심의위원회에 회부해야 하나요?',
        answer: '2024년부터 학교장 자체해결 요건이 완화되어, 피해학생 및 보호자가 심의 미개최에 동의하고, 2주 이내 피해학생 회복이 가능하며, 가해학생에 대한 조치가 불필요한 경미한 사안은 자체 해결할 수 있습니다.',
      },
    ],
    annualSchedule: [
      { month: 3, tasks: ['학교폭력예방교육 계획', '1차 실태조사'] },
      { month: 4, tasks: ['학교폭력예방교육 실시'] },
      { month: 9, tasks: ['2차 실태조사'] },
      { month: 12, tasks: ['연간 현황 보고'] },
    ],
    references: [
      {
        title: '학교폭력 사안처리 가이드북',
        url: 'https://www.moe.go.kr/',
        description: '교육부 발간 학교폭력 사안처리 안내서',
      },
    ],
  },

  {
    id: 'class-teacher',
    title: '학급담임 업무 가이드',
    category: '학급경영',
    department: '학년부',
    overview: '학급담임은 학급 경영의 책임자로서 학생 생활지도, 학부모 상담, 학생부 관리, 학급 운영 등을 담당합니다.',
    legalBasis: [
      '초·중등교육법',
      '학교생활기록 작성 및 관리지침',
      '교원의 학생생활지도에 관한 고시',
    ],
    keyResponsibilities: [
      '학급 운영 및 관리',
      '학생 생활지도',
      '학생생활기록부 관리',
      '학부모 상담',
      '출결 관리',
      '안전지도',
      '가정통신문 발송',
    ],
    stepByStep: [
      {
        step: 1,
        title: '학급 경영 계획 수립',
        description: '신학년 학급 경영 계획을 수립합니다.',
        checklist: [
          '학급 교육 목표 설정',
          '학급 규칙 만들기',
          '학급 조직 구성 (1인 1역)',
          '학급 환경 구성 계획',
          '연간 학급 행사 계획',
          '학부모 소통 방법 결정',
        ],
        tips: [
          '학생들과 함께 규칙 만들기',
          '1인 1역은 순환 배정',
          '학급 특색 활동 운영',
        ],
        commonMistakes: [
          '규칙만 정하고 실천 미흡',
          '소통 채널 미정비',
        ],
      },
      {
        step: 2,
        title: '학생생활기록부 관리',
        description: '학생생활기록부를 정확하게 기록하고 관리합니다.',
        checklist: [
          '인적사항 확인 및 변경',
          '출결 관리',
          '수상경력 입력',
          '창의적 체험활동 기록',
          '교과학습발달상황 기록',
          '행동특성 및 종합의견 작성',
        ],
        tips: [
          '학생부 기재요령 숙지 필수',
          '수시로 관찰하고 기록',
          '구체적 사례 중심 기술',
          '긍정적 성장 관점에서 기술',
        ],
        commonMistakes: [
          '학기말 몰아서 기록',
          '복사·붙여넣기 식 기록',
          '사실과 다른 기록',
        ],
        neisPath: '학생생활 > 학생부',
      },
      {
        step: 3,
        title: '출결 관리',
        description: '학생의 출결을 정확하게 관리합니다.',
        checklist: [
          '매일 출석 확인',
          '결석 사유 확인',
          '증빙서류 수합',
          '나이스 출결 입력',
          '장기결석 학생 관리',
        ],
        tips: [
          '출석 인정 기준 숙지',
          '질병결석은 진단서/의사소견서 필요',
          '장기결석 시 관리자 보고',
        ],
        commonMistakes: [
          '출결 구분 오류',
          '증빙서류 미수합',
          '미인정결석 처리 누락',
        ],
        neisPath: '학생생활 > 출결관리',
      },
    ],
    relatedForms: [
      {
        name: '학급경영록',
        description: '월별 학급 운영 기록',
      },
      {
        name: '상담일지',
        description: '학생 및 학부모 상담 기록',
      },
      {
        name: '출결 증빙서류',
        description: '결석 시 제출하는 증빙서류',
      },
    ],
    faq: [
      {
        question: '현장체험학습 신청은 며칠 전에 해야 하나요?',
        answer: '통상적으로 3일 전까지 신청하도록 학교규칙에 정해져 있습니다. 정확한 일수는 학교 규정을 확인하세요.',
      },
      {
        question: '학생부 수정은 어떻게 하나요?',
        answer: '담임교사가 정정 사유와 함께 정정대장을 작성하고, 정정 사항을 입력한 후 결재를 받습니다. 졸업 후에는 학교생활기록부정정심의위원회 심의가 필요합니다.',
      },
    ],
    annualSchedule: [
      { month: 3, tasks: ['학급 조직', '학부모 총회', '상담주간'] },
      { month: 6, tasks: ['1학기 성적 처리', '학생부 기록'] },
      { month: 7, tasks: ['생기부 마감', '통지표 발송'] },
      { month: 12, tasks: ['2학기 성적 처리', '학생부 마감'] },
      { month: 2, tasks: ['졸업/진급 처리', '인수인계'] },
    ],
    references: [
      {
        title: '학교생활기록부 기재요령',
        url: 'https://star.moe.go.kr/',
        description: '교육부 학생부 종합 지원 포털',
      },
    ],
  },
];

// ============================================================
// 3. 관련 법령 데이터베이스
// ============================================================

export interface LegalReference {
  id: string;
  title: string;
  category: string;
  summary: string;
  keyArticles: {
    article: string;
    title: string;
    content: string;
  }[];
  relatedDuties: string[];
  url: string;
}

export const legalDatabase: LegalReference[] = [
  {
    id: 'education-act',
    title: '초·중등교육법',
    category: '교육법규',
    summary: '초·중등교육에 관한 기본 법률로, 학교의 종류, 교육과정, 교원, 학생 등에 관한 사항을 규정합니다.',
    keyArticles: [
      {
        article: '제23조',
        title: '교육과정 등',
        content: '학교는 교육과정을 운영하여야 한다. 교육부장관은 교육과정의 기준과 내용에 관한 기본적인 사항을 정하며, 교육감은 교육부장관이 정한 교육과정의 범위에서 지역의 실정에 맞는 기준과 내용을 정할 수 있다.',
      },
      {
        article: '제25조',
        title: '학교생활기록',
        content: '학교의 장은 학생의 학업성취도와 인성 등을 종합적으로 관찰·평가하여 학생지도 및 상급학교의 학생선발에 활용할 수 있는 자료를 교육부령으로 정하는 기준에 따라 작성·관리하여야 한다.',
      },
    ],
    relatedDuties: ['교무기획', '학적', '평가'],
    url: 'https://www.law.go.kr/법령/초중등교육법',
  },
  {
    id: 'school-violence-act',
    title: '학교폭력예방 및 대책에 관한 법률',
    category: '생활지도',
    summary: '학교폭력의 예방과 대책에 필요한 사항을 규정하여 피해학생의 보호, 가해학생의 선도·교육 및 분쟁조정을 통해 학생의 인권을 보호하고 건전한 사회구성원으로 육성함을 목적으로 합니다.',
    keyArticles: [
      {
        article: '제2조',
        title: '정의',
        content: '"학교폭력"이란 학교 내외에서 학생을 대상으로 발생한 상해, 폭행, 감금, 협박, 약취·유인, 명예훼손·모욕, 공갈, 강요·강제적인 심부름 및 성폭력, 따돌림, 사이버 따돌림, 정보통신망을 이용한 음란·폭력 정보 등에 의하여 신체·정신 또는 재산상의 피해를 수반하는 행위를 말한다.',
      },
      {
        article: '제13조',
        title: '학교폭력대책심의위원회의 설치·기능',
        content: '학교폭력의 예방 및 대책에 관련된 사항을 심의하기 위하여 교육지원청에 학교폭력대책심의위원회를 둔다.',
      },
    ],
    relatedDuties: ['생활지도', '상담'],
    url: 'https://www.law.go.kr/법령/학교폭력예방및대책에관한법률',
  },
  {
    id: 'student-record-regulation',
    title: '학교생활기록 작성 및 관리지침',
    category: '학적',
    summary: '학교생활기록부의 작성 및 관리에 관한 세부 사항을 규정하는 교육부 훈령입니다.',
    keyArticles: [
      {
        article: '제4조',
        title: '입학에 관한 사항',
        content: '입학에 관한 사항은 학생이 입학한 날의 학년도, 입학 연월일을 입력한다.',
      },
      {
        article: '제15조',
        title: '교과학습발달상황',
        content: '교과학습발달상황은 초등학교는 교과별로 성취기준에 따른 성취수준의 특성 등을 문장으로 입력한다.',
      },
    ],
    relatedDuties: ['학적', '평가', '학급담임'],
    url: 'https://www.law.go.kr/행정규칙/학교생활기록작성및관리지침',
  },
];

// ============================================================
// 4. 서류 양식 데이터베이스
// ============================================================

export interface FormTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  useCase: string[];
  requiredFields: string[];
  tips: string[];
  sampleContent?: string;
}

export const formTemplatesDatabase: FormTemplate[] = [
  {
    id: 'parent-letter',
    name: '가정통신문',
    category: '학부모',
    description: '학교에서 가정으로 보내는 공식 안내문입니다.',
    useCase: ['행사 안내', '교육활동 안내', '동의서 수합', '설문조사'],
    requiredFields: [
      '제목',
      '발송일자',
      '수신: 학부모님께',
      '내용',
      '학교명, 학교장 직인',
      '문의처 (담당자 연락처)',
    ],
    tips: [
      '요점을 먼저, 상세 내용은 아래에',
      '회신이 필요한 경우 절취선 활용',
      '회신 마감일 명시',
      'QR코드 활용으로 온라인 회신 연계',
    ],
    sampleContent: `[○○초등학교]

학부모님 안녕하십니까?
귀댁에 건강과 행복이 가득하시길 기원합니다.

다름이 아니오라 ________에 관하여 안내드리고자 합니다.

1. 일시: 20XX년 X월 X일 (X요일)
2. 장소:
3. 내용:
4. 준비물:
5. 기타:

문의사항은 담당교사(☎02-XXX-XXXX)로 연락주시기 바랍니다.

20XX년 X월 X일
○○초등학교장 [직인]

----------- ✂ 절취선 -----------

__________ 참가 동의서

위 안내사항을 확인하였으며, 자녀의 참가에 동의합니다.

학년 반 번호:      학생 이름:
학부모 성함:                 (서명)

제출 마감: X월 X일(X)까지`,
  },
  {
    id: 'experience-learning-plan',
    name: '현장체험학습 계획서',
    category: '체험학습',
    description: '교외 현장체험학습 실시 전 작성하는 계획서입니다.',
    useCase: ['봄/가을 소풍', '수학여행', '진로체험', '문화탐방'],
    requiredFields: [
      '행사명',
      '목적',
      '일시',
      '장소',
      '대상 학년/학급',
      '참가 인원',
      '인솔교사',
      '일정표',
      '예산',
      '안전대책',
      '비상연락망',
    ],
    tips: [
      '사전 답사 필수',
      '학운위 심의 (1개월 전)',
      '보험 가입 확인',
      '응급환자 발생 시 대응 매뉴얼 포함',
      '우천 시 대체 계획 수립',
    ],
  },
  {
    id: 'counseling-record',
    name: '상담기록부',
    category: '상담',
    description: '학생 및 학부모 상담 내용을 기록하는 문서입니다.',
    useCase: ['정기 상담', '수시 상담', '학부모 상담', '위기 상담'],
    requiredFields: [
      '상담일시',
      '상담대상 (학생/학부모)',
      '상담유형 (정기/수시)',
      '상담주제',
      '상담내용',
      '상담결과 및 후속조치',
      '상담자 서명',
    ],
    tips: [
      '객관적 사실 위주 기록',
      '개인정보 보호에 유의',
      '후속 상담 필요 시 일정 기록',
      '보안 문서로 관리',
    ],
  },
];

// ============================================================
// 5. 나이스(NEIS) 메뉴 가이드
// ============================================================

export interface NeisGuide {
  id: string;
  menu: string;
  path: string;
  description: string;
  steps: string[];
  tips: string[];
  commonIssues: {
    issue: string;
    solution: string;
  }[];
}

export const neisGuideDatabase: NeisGuide[] = [
  {
    id: 'neis-student-record',
    menu: '학생생활기록부',
    path: '학생생활 > 학생부',
    description: '학생생활기록부 조회 및 입력을 위한 메뉴입니다.',
    steps: [
      '나이스 접속 > 학생생활 메뉴 클릭',
      '학생부 > 기본신상정보 또는 각 영역 선택',
      '학년/반/번호 또는 이름으로 학생 검색',
      '해당 항목 조회/입력',
      '저장 후 확인',
    ],
    tips: [
      '입력 후 반드시 저장 버튼 클릭',
      '마감 전 미리 입력 권장',
      '임시저장 기능 활용',
      '다른 교사와 동시 입력 시 충돌 주의',
    ],
    commonIssues: [
      {
        issue: '저장 버튼이 활성화되지 않음',
        solution: '필수 입력 항목 확인, 글자수 제한 확인',
      },
      {
        issue: '입력한 내용이 사라짐',
        solution: '임시저장 활용, 세션 만료 전 저장',
      },
    ],
  },
  {
    id: 'neis-attendance',
    menu: '출결관리',
    path: '학생생활 > 출결관리',
    description: '학생 출결 현황을 입력하고 관리하는 메뉴입니다.',
    steps: [
      '학생생활 > 출결관리 > 일별출결관리',
      '날짜 선택',
      '학년/반 선택',
      '결석/지각/조퇴/결과 학생 확인',
      '해당 학생 클릭 > 출결사항 입력',
      '결석유형 선택 (질병/미인정/기타/경조사)',
      '결석사유 입력',
      '저장',
    ],
    tips: [
      '출결 구분 기준 숙지 필수',
      '증빙서류는 별도 보관',
      '월말 출결 마감 전 전체 점검',
    ],
    commonIssues: [
      {
        issue: '출결 구분이 헷갈림',
        solution: '학교생활기록 작성 및 관리지침 참조',
      },
    ],
  },
  {
    id: 'neis-grade',
    menu: '성적관리',
    path: '성적 > 성적처리',
    description: '학생 성적을 입력하고 처리하는 메뉴입니다.',
    steps: [
      '성적 > 성적처리 > 성적입력',
      '학기/평가종류 선택',
      '과목 선택',
      '점수 또는 성취도 입력',
      '저장',
      '성적 > 성적처리 > 성적산출',
      '확인 후 확정',
    ],
    tips: [
      '입력 기간 확인 (기간 외 입력 불가)',
      '성적 확정 후 수정은 정정대장 필요',
      '성취도 평가 기준 사전 확인',
    ],
    commonIssues: [
      {
        issue: '성적 입력 기간이 아님',
        solution: '교무부에 기간 연장 요청',
      },
    ],
  },
];

// ============================================================
// 6. FAQ 데이터베이스
// ============================================================

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  relatedLinks?: string[];
  tags: string[];
}

export const faqDatabase: FAQItem[] = [
  // 학적 관련
  {
    id: 'faq-001',
    category: '학적',
    question: '전학 처리는 어떻게 하나요?',
    answer: `전학 처리 절차:
1. 전출 학교
   - 학부모로부터 전학 사유 및 전입 학교 확인
   - 나이스에서 전출 처리 (학적관리 > 전출)
   - 학생부 마감 및 전송

2. 전입 학교
   - 나이스에서 전입 접수 (학적관리 > 전입)
   - 학급 배치
   - 학생부 인수

* 전학 사유에 따라 절차가 다를 수 있습니다.
* 건강상 사유, 가정폭력 등 특수 상황은 별도 절차를 따릅니다.`,
    tags: ['전학', '전출', '전입', '학적'],
  },
  {
    id: 'faq-002',
    category: '학적',
    question: '현장체험학습 신청 절차는?',
    answer: `교외체험학습 신청 절차:
1. 학부모가 신청서 작성 (최소 3일 전, 학교규정 확인)
2. 담임교사 검토 및 결재
3. 학교장 승인
4. 체험학습 실시
5. 체험학습 후 보고서 제출 (2일 이내)
6. 담임교사 확인 후 출석 인정 처리

* 연간 사용 가능 일수 확인 필요 (보통 20일 이내)
* 체험학습 중 발생한 안전사고는 학교 책임 범위 밖임을 안내`,
    tags: ['체험학습', '출결', '현장학습'],
  },
  {
    id: 'faq-003',
    category: '학적',
    question: '출결 인정 기준이 궁금합니다.',
    answer: `출결 구분 기준:
1. 출석인정
   - 학교장 출석 인정: 공적 활동, 질병치료 등
   - 경조사: 학교규정에 따른 일수
   - 현장체험학습: 승인받은 일수

2. 결석
   - 질병결석: 진단서/의사소견서 필요
   - 미인정결석: 무단결석
   - 기타결석: 부모의 사유, 천재지변 등

* 세부 기준은 "학교생활기록 작성 및 관리지침" 참조`,
    tags: ['출결', '결석', '출석인정'],
  },

  // 학부모 관련
  {
    id: 'faq-004',
    category: '학부모',
    question: '학부모 민원 대응 방법은?',
    answer: `학부모 민원 대응 절차:
1. 경청: 민원 내용을 끝까지 경청
2. 공감: 학부모 입장에서 이해 표현
3. 확인: 사실 관계 확인 (필요시 시간 요청)
4. 설명: 학교 입장 및 절차 설명
5. 해결: 해결 가능한 부분 조치
6. 기록: 상담 내용 기록 보관

* 감정적 대응 지양
* 어려운 민원은 관리자와 상의
* 필요시 녹음/녹취 동의 구하고 기록
* 교권침해 상황 발생 시 즉시 보고`,
    tags: ['민원', '학부모', '상담'],
  },
  {
    id: 'faq-005',
    category: '학부모',
    question: '학부모 상담 시 주의사항은?',
    answer: `학부모 상담 시 주의사항:
1. 사전 준비
   - 학생 관찰 기록 정리
   - 성적, 출결 현황 파악
   - 상담 환경 조성 (조용한 장소)

2. 상담 진행
   - 긍정적인 내용으로 시작
   - 객관적 사실 중심 이야기
   - 개선 방안 함께 논의
   - 다른 학생과 비교 금지

3. 상담 후
   - 상담 내용 기록
   - 후속 조치 이행
   - 필요시 재상담 일정 조율`,
    tags: ['상담', '학부모'],
  },

  // 생활지도 관련
  {
    id: 'faq-006',
    category: '생활지도',
    question: '학교폭력 발생 시 담임교사 역할은?',
    answer: `학교폭력 발생 시 담임교사 역할:
1. 초기 대응
   - 피해학생 보호 및 안정 조치
   - 가해·피해학생 분리
   - 현장 목격자 확인

2. 보고
   - 학교폭력 책임교사에게 즉시 보고
   - 학교장 보고

3. 사안 조사 협조
   - 사실 확인 상담 진행
   - 상담 내용 기록

4. 후속 조치
   - 학급 내 2차 피해 방지
   - 피해학생 보호 및 회복 지원
   - 가해학생 선도

* 담임이 임의로 사안 종결 불가
* 모든 과정 기록 필수`,
    tags: ['학교폭력', '생활지도'],
  },

  // 평가 관련
  {
    id: 'faq-007',
    category: '평가',
    question: '초등학교 성적 평가 방법은?',
    answer: `초등학교 성적 평가:
1. 평가 방식
   - 성취기준 중심 평가
   - 과정중심평가 강화
   - 서술형·논술형 평가 확대

2. 기록 방법
   - 점수 대신 성취수준 기재
   - 과목별 특성, 성장 정도를 문장으로 기술
   - "~를 잘함", "~가 우수함" 등 구체적 기술

3. 학생부 기재
   - 교과학습발달상황: 과목별 서술평가
   - 1~2학년: 국어, 수학만 필수 기록
   - 3~6학년: 전 교과 기록

* 학교별 평가계획 수립 필요
* 학생·학부모 평가계획 사전 안내`,
    tags: ['평가', '성적', '성취기준'],
  },

  // 행정 관련
  {
    id: 'faq-008',
    category: '행정',
    question: '공문 처리 방법은?',
    answer: `공문 처리 절차:
1. 접수
   - 나이스 업무관리에서 공문 확인
   - 처리 기한 확인

2. 검토
   - 내용 파악
   - 담당자/부서 확인
   - 필요 조치 사항 파악

3. 처리
   - 해당 업무 수행
   - 결과 정리
   - 기안 작성 (필요시)

4. 결재
   - 결재선 확인
   - 전자결재 상신

5. 발송/완결
   - 발송 공문 시행
   - 접수 공문 완결처리

* 처리 기한 엄수
* 중요 공문은 관리자 보고`,
    tags: ['공문', '행정', '나이스'],
  },
];

// ============================================================
// 7. 데이터베이스 검색 유틸리티
// ============================================================

export const searchDatabase = {
  // 월별 업무 검색
  searchMonthlyTasks: (month: number, keyword?: string): MonthlyTask[] => {
    let results = monthlyTasksDatabase.filter(task => task.month === month);
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      results = results.filter(task =>
        task.title.toLowerCase().includes(lowerKeyword) ||
        task.category.toLowerCase().includes(lowerKeyword) ||
        task.department.toLowerCase().includes(lowerKeyword) ||
        task.description.toLowerCase().includes(lowerKeyword)
      );
    }
    return results;
  },

  // 업무 가이드 검색
  searchDutyGuides: (keyword: string): DutyGuide[] => {
    const lowerKeyword = keyword.toLowerCase();
    return dutyGuidesDatabase.filter(guide =>
      guide.title.toLowerCase().includes(lowerKeyword) ||
      guide.category.toLowerCase().includes(lowerKeyword) ||
      guide.department.toLowerCase().includes(lowerKeyword) ||
      guide.overview.toLowerCase().includes(lowerKeyword)
    );
  },

  // FAQ 검색
  searchFAQ: (keyword: string): FAQItem[] => {
    const lowerKeyword = keyword.toLowerCase();
    return faqDatabase.filter(faq =>
      faq.question.toLowerCase().includes(lowerKeyword) ||
      faq.answer.toLowerCase().includes(lowerKeyword) ||
      faq.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
    );
  },

  // 통합 검색
  searchAll: (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    return {
      monthlyTasks: monthlyTasksDatabase.filter(task =>
        task.title.toLowerCase().includes(lowerKeyword) ||
        task.description.toLowerCase().includes(lowerKeyword)
      ),
      dutyGuides: dutyGuidesDatabase.filter(guide =>
        guide.title.toLowerCase().includes(lowerKeyword) ||
        guide.overview.toLowerCase().includes(lowerKeyword)
      ),
      legal: legalDatabase.filter(law =>
        law.title.toLowerCase().includes(lowerKeyword) ||
        law.summary.toLowerCase().includes(lowerKeyword)
      ),
      forms: formTemplatesDatabase.filter(form =>
        form.name.toLowerCase().includes(lowerKeyword) ||
        form.description.toLowerCase().includes(lowerKeyword)
      ),
      faq: faqDatabase.filter(faq =>
        faq.question.toLowerCase().includes(lowerKeyword) ||
        faq.answer.toLowerCase().includes(lowerKeyword)
      ),
      neisGuides: neisGuideDatabase.filter(guide =>
        guide.menu.toLowerCase().includes(lowerKeyword) ||
        guide.description.toLowerCase().includes(lowerKeyword)
      ),
    };
  },
};

// ============================================================
// 8. 통합 데이터베이스 (기존 + 확장 데이터 병합)
// ============================================================

// 법령 데이터베이스 통합 (기존 3개 + 확장 30개 = 33개)
export const combinedLegalDatabase: LegalReference[] = [
  ...legalDatabase,
  ...expandedLegalDatabase.filter(
    (item) => !legalDatabase.some((existing) => existing.id === item.id)
  ),
];

// 서식 템플릿 통합 (기존 3개 + 확장 22개 = 25개)
export const combinedFormTemplatesDatabase: FormTemplate[] = [
  ...formTemplatesDatabase,
  ...expandedFormTemplatesDatabase.filter(
    (item) => !formTemplatesDatabase.some((existing) => existing.id === item.id)
  ),
];

// NEIS 가이드 통합 (기존 3개 + 확장 14개 = 17개)
export const combinedNeisGuideDatabase: NeisGuide[] = [
  ...neisGuideDatabase,
  ...expandedNeisGuideDatabase.filter(
    (item) => !neisGuideDatabase.some((existing) => existing.id === item.id)
  ),
];

// FAQ 통합 (기존 8개 + 확장 32개 = 40개)
export const combinedFaqDatabase: FAQItem[] = [
  ...faqDatabase,
  ...expandedFaqDatabase.filter(
    (item) => !faqDatabase.some((existing) => existing.id === item.id)
  ),
];

// ============================================================
// 9. 통합 검색 유틸리티 (Ultra-Detailed 포함)
// ============================================================

export const integratedSearch = {
  // 월별 업무 검색 (기본 + Ultra-Detailed)
  searchMonthlyTasks: (month: number, keyword?: string) => {
    const basicTasks = searchDatabase.searchMonthlyTasks(month, keyword);
    const ultraDetailedTasks = getUltraDetailedMonthlyTasks(month);
    return {
      basicTasks,
      ultraDetailedTasks,
    };
  },

  // 부서별 업무 가이드 검색 (16개 부서 Ultra-Detailed)
  searchDutyGuides: (keyword: string) => {
    const basicGuides = searchDatabase.searchDutyGuides(keyword);
    const ultraDetailedGuides = searchUltraDetailedDuties(keyword);
    return {
      basicGuides,
      ultraDetailedGuides,
    };
  },

  // 법령 검색
  searchLegal: (keyword: string): LegalReference[] => {
    const lowerKeyword = keyword.toLowerCase();
    return combinedLegalDatabase.filter(
      (law) =>
        law.title.toLowerCase().includes(lowerKeyword) ||
        law.summary.toLowerCase().includes(lowerKeyword)
    );
  },

  // 서식 검색
  searchForms: (keyword: string): FormTemplate[] => {
    const lowerKeyword = keyword.toLowerCase();
    return combinedFormTemplatesDatabase.filter(
      (form) =>
        form.name.toLowerCase().includes(lowerKeyword) ||
        form.description.toLowerCase().includes(lowerKeyword)
    );
  },

  // NEIS 가이드 검색
  searchNeisGuides: (keyword: string): NeisGuide[] => {
    const lowerKeyword = keyword.toLowerCase();
    return combinedNeisGuideDatabase.filter(
      (guide) =>
        guide.menu.toLowerCase().includes(lowerKeyword) ||
        guide.description.toLowerCase().includes(lowerKeyword)
    );
  },

  // FAQ 검색 (기본 + Ultra-Detailed)
  searchFAQ: (keyword: string) => {
    const basicFAQ = searchDatabase.searchFAQ(keyword);
    const ultraDetailedFAQ = searchUltraDetailedFAQ(keyword);
    return {
      basicFAQ: [...basicFAQ, ...combinedFaqDatabase.filter(
        (faq) =>
          faq.question.toLowerCase().includes(keyword.toLowerCase()) ||
          faq.answer.toLowerCase().includes(keyword.toLowerCase()) ||
          faq.tags.some((tag) => tag.toLowerCase().includes(keyword.toLowerCase()))
      )],
      ultraDetailedFAQ,
    };
  },

  // 통합 전체 검색
  searchAll: (keyword: string) => {
    const lowerKeyword = keyword.toLowerCase();
    return {
      monthlyTasks: monthlyTasksDatabase.filter(
        (task) =>
          task.title.toLowerCase().includes(lowerKeyword) ||
          task.description.toLowerCase().includes(lowerKeyword)
      ),
      dutyGuides: dutyGuidesDatabase.filter(
        (guide) =>
          guide.title.toLowerCase().includes(lowerKeyword) ||
          guide.overview.toLowerCase().includes(lowerKeyword)
      ),
      ultraDetailedDuties: searchUltraDetailedDuties(keyword),
      legal: combinedLegalDatabase.filter(
        (law) =>
          law.title.toLowerCase().includes(lowerKeyword) ||
          law.summary.toLowerCase().includes(lowerKeyword)
      ),
      forms: combinedFormTemplatesDatabase.filter(
        (form) =>
          form.name.toLowerCase().includes(lowerKeyword) ||
          form.description.toLowerCase().includes(lowerKeyword)
      ),
      faq: combinedFaqDatabase.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowerKeyword) ||
          faq.answer.toLowerCase().includes(lowerKeyword)
      ),
      neisGuides: combinedNeisGuideDatabase.filter(
        (guide) =>
          guide.menu.toLowerCase().includes(lowerKeyword) ||
          guide.description.toLowerCase().includes(lowerKeyword)
      ),
    };
  },
};

// ============================================================
// 10. Re-export Ultra-Detailed Duties (16개 부서 상세 가이드)
// ============================================================

export {
  // Ultra-Detailed Duties 전체 데이터 및 유틸리티
  allUltraDetailedDuties,
  UltraDetailedDutyGuide,
  getUltraDetailedDutyById,
  searchUltraDetailedDuties,
  getUltraDetailedMonthlyTasks,
  getAllEmergencyProcedures,
  searchUltraDetailedFAQ,
  getAllNeisMenus,
  monthlyCalendar,
};

// Export all databases (통합 버전)
export default {
  // 기본 데이터
  monthlyTasks: monthlyTasksDatabase,
  dutyGuides: dutyGuidesDatabase,

  // 통합 데이터 (확장된 버전)
  legal: combinedLegalDatabase,
  forms: combinedFormTemplatesDatabase,
  neisGuides: combinedNeisGuideDatabase,
  faq: combinedFaqDatabase,

  // Ultra-Detailed Duties (16개 부서 상세 가이드)
  ultraDetailedDuties: allUltraDetailedDuties,
  monthlyCalendar,

  // 검색 유틸리티
  search: searchDatabase,
  integratedSearch,

  // Ultra-Detailed 유틸리티
  getUltraDetailedDutyById,
  searchUltraDetailedDuties,
  getUltraDetailedMonthlyTasks,
  getAllEmergencyProcedures,
  searchUltraDetailedFAQ,
  getAllNeisMenus,
};

// ============================================================
// 데이터베이스 통계 정보
// ============================================================
export const databaseStats = {
  monthlyTasks: monthlyTasksDatabase.length,
  dutyGuides: dutyGuidesDatabase.length,
  ultraDetailedDuties: allUltraDetailedDuties.length,
  legalReferences: combinedLegalDatabase.length,
  formTemplates: combinedFormTemplatesDatabase.length,
  neisGuides: combinedNeisGuideDatabase.length,
  faq: combinedFaqDatabase.length,
  totalItems:
    monthlyTasksDatabase.length +
    dutyGuidesDatabase.length +
    allUltraDetailedDuties.length +
    combinedLegalDatabase.length +
    combinedFormTemplatesDatabase.length +
    combinedNeisGuideDatabase.length +
    combinedFaqDatabase.length,
};
