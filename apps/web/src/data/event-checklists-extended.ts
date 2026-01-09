// 학교 행사 체크리스트 확장 데이터
// 추가 행사별 상세 준비사항 및 진행 체크리스트

import { EventChecklist } from './event-checklists';

export const extendedEventChecklists: EventChecklist[] = [
  // ========================================
  // 공개수업/수업공개의 날
  // ========================================
  {
    id: 'open-class',
    name: '공개수업/수업공개의 날',
    category: 'event',
    description: '학부모에게 수업을 공개하는 행사',
    timing: '5월, 11월',
    duration: '반나절',
    responsibleDepartments: ['연구부', '교무부', '학년부'],
    preparationPeriod: '2주 전부터',
    checklist: [
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'open-001', task: '공개수업 계획 수립', responsible: '연구부장' },
          { id: 'open-002', task: '공개 교시 및 교과 결정', responsible: '담임교사' },
          { id: 'open-003', task: '학부모 안내장 발송', responsible: '교무부' },
          { id: 'open-004', task: '참관 신청 조사', responsible: '담임교사' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'open-005', task: '수업 지도안 작성', responsible: '담임교사' },
          { id: 'open-006', task: '교실 환경 정비', responsible: '담임교사' },
          { id: 'open-007', task: '학습 자료 준비', responsible: '담임교사' },
          { id: 'open-008', task: '참관록 양식 준비', responsible: '연구부' },
          { id: 'open-009', task: '학부모 좌석 배치 계획', responsible: '담임교사' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'open-010', task: '교실 최종 정리', responsible: '담임교사' },
          { id: 'open-011', task: '학부모 안내 표지판 설치', responsible: '행정실' },
          { id: 'open-012', task: '참관록/설문지 인쇄', responsible: '연구부' },
          { id: 'open-013', task: '수업 리허설', responsible: '담임교사' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'open-014', task: '학부모 접수 및 안내', responsible: '안내 담당' },
          { id: 'open-015', task: '참관록 배부', responsible: '연구부' },
          { id: 'open-016', task: '공개수업 진행', responsible: '담임교사' },
          { id: 'open-017', task: '수업 후 간담회 (선택)', responsible: '담임교사' },
          { id: 'open-018', task: '설문지 회수', responsible: '연구부' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'open-019', task: '설문 결과 분석', responsible: '연구부' },
          { id: 'open-020', task: '결과 보고서 작성', responsible: '연구부' },
          { id: 'open-021', task: '개선사항 정리 및 공유', responsible: '연구부' },
        ],
      },
    ],
    tips: [
      '학부모 참관 시 수업 방해되지 않도록 안내',
      '온라인 동시 공개 고려 (맞벌이 학부모 배려)',
      '참관 후 간단한 피드백 기회 제공',
    ],
    relatedDocuments: ['공개수업 안내문', '수업 지도안', '참관록'],
  },

  // ========================================
  // 학예회/발표회
  // ========================================
  {
    id: 'talent-show',
    name: '학예회/발표회',
    category: 'event',
    description: '학생들의 재능을 발표하는 행사',
    timing: '10월 ~ 11월',
    duration: '2~3시간',
    responsibleDepartments: ['교육과정부', '예술부', '학년부'],
    preparationPeriod: '1개월 전부터',
    checklist: [
      {
        phase: '1개월 전',
        period: 'D-30',
        items: [
          { id: 'tal-001', task: '학예회 계획 수립', responsible: '교육과정부장' },
          { id: 'tal-002', task: '학년/학급별 출연 프로그램 결정', responsible: '학년부' },
          { id: 'tal-003', task: '무대 사용 일정 조율', responsible: '행정실' },
          { id: 'tal-004', task: '필요 물품 목록 작성', responsible: '예술부' },
        ],
      },
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'tal-005', task: '프로그램 순서 확정', responsible: '교육과정부' },
          { id: 'tal-006', task: '학부모 초청장 발송', responsible: '교무부' },
          { id: 'tal-007', task: '무대 배경 제작', responsible: '예술부' },
          { id: 'tal-008', task: '의상/소품 준비', responsible: '담임교사' },
          { id: 'tal-009', task: '리허설 일정 수립', responsible: '교육과정부' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'tal-010', task: '무대 설치', responsible: '행정실' },
          { id: 'tal-011', task: '음향/조명 점검', responsible: '정보부' },
          { id: 'tal-012', task: '학년별 리허설 진행', responsible: '학년부' },
          { id: 'tal-013', task: '프로그램 순서표 제작', responsible: '교육과정부' },
          { id: 'tal-014', task: '사회 멘트 작성', responsible: '사회자' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'tal-015', task: '전체 리허설 (드레스 리허설)', responsible: '전체' },
          { id: 'tal-016', task: '좌석 배치', responsible: '행정실' },
          { id: 'tal-017', task: '음향/조명 최종 점검', responsible: '정보부' },
          { id: 'tal-018', task: '의상/소품 최종 점검', responsible: '담임교사' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'tal-019', task: '학부모 안내 및 좌석 배치', responsible: '안내 담당' },
          { id: 'tal-020', task: '학생 대기실 관리', responsible: '담임교사' },
          { id: 'tal-021', task: '공연 진행 (무대 전환)', responsible: '예술부' },
          { id: 'tal-022', task: '사진/영상 촬영', responsible: '정보부' },
          { id: 'tal-023', task: '정리 및 철수', responsible: '전 교직원' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'tal-024', task: '무대 철거 및 정리', responsible: '행정실' },
          { id: 'tal-025', task: '영상 편집 및 공유', responsible: '정보부' },
          { id: 'tal-026', task: '결과 보고서 작성', responsible: '교육과정부' },
        ],
      },
    ],
    tips: [
      '전 학급이 참여할 수 있도록 프로그램 구성',
      '리허설 충분히 진행하여 돌발상황 대비',
      '학부모 촬영 구역 별도 지정',
    ],
    relatedDocuments: ['학예회 계획서', '프로그램 순서표', '학부모 초청장'],
  },

  // ========================================
  // 재난대피훈련 (지진/화재)
  // ========================================
  {
    id: 'disaster-drill',
    name: '재난대피훈련',
    category: 'training',
    description: '지진, 화재 등 재난 상황 대피 훈련',
    timing: '월 1회 (정기), 수시',
    duration: '30분 ~ 1시간',
    responsibleDepartments: ['안전부', '교무부'],
    preparationPeriod: '1주 전부터',
    checklist: [
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'dis-001', task: '훈련 계획 수립', responsible: '안전부장' },
          { id: 'dis-002', task: '훈련 시나리오 작성', responsible: '안전부' },
          { id: 'dis-003', task: '대피 경로 확인 및 점검', responsible: '안전부' },
          { id: 'dis-004', task: '소방서 협조 요청 (합동훈련 시)', responsible: '안전부' },
          { id: 'dis-005', task: '방송 장비 점검', responsible: '정보부' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'dis-006', task: '교직원 사전 안내', responsible: '안전부' },
          { id: 'dis-007', task: '학생 사전 교육', responsible: '담임교사' },
          { id: 'dis-008', task: '대피 장소 점검', responsible: '안전부' },
          { id: 'dis-009', task: '비상방송 테스트', responsible: '정보부' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'dis-010', task: '훈련 방송 실시', responsible: '안전부' },
          { id: 'dis-011', task: '학급별 대피 지도', responsible: '담임교사' },
          { id: 'dis-012', task: '대피 소요시간 측정', responsible: '안전부' },
          { id: 'dis-013', task: '인원 점검 보고', responsible: '담임교사' },
          { id: 'dis-014', task: '훈련 강평', responsible: '교장/안전부장' },
          { id: 'dis-015', task: '교실 복귀', responsible: '담임교사' },
        ],
      },
      {
        phase: '훈련 후',
        period: 'D+1',
        items: [
          { id: 'dis-016', task: '훈련 결과 분석', responsible: '안전부' },
          { id: 'dis-017', task: '개선사항 도출', responsible: '안전부' },
          { id: 'dis-018', task: '결과 보고서 작성 (교육청 보고)', responsible: '안전부' },
          { id: 'dis-019', task: '훈련 사진 기록', responsible: '안전부' },
        ],
      },
    ],
    tips: [
      '월 1회 정기 훈련 + 불시 훈련 병행',
      '지진: 책상 아래 대피 → 운동장 대피',
      '화재: 자세 낮추고 코 막고 대피',
      '소요시간 5분 이내 목표',
    ],
    relatedDocuments: ['훈련 계획서', '대피 경로도', '결과 보고서'],
  },

  // ========================================
  // 학부모 상담 주간
  // ========================================
  {
    id: 'parent-counseling',
    name: '학부모 상담 주간',
    category: 'meeting',
    description: '학기 초/말 학부모와 담임교사의 개별 상담',
    timing: '4월, 9월',
    duration: '1주간',
    responsibleDepartments: ['교무부', '상담부', '학년부'],
    preparationPeriod: '2주 전부터',
    checklist: [
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'cou-001', task: '상담주간 일정 확정', responsible: '교무부' },
          { id: 'cou-002', task: '안내문 발송', responsible: '교무부' },
          { id: 'cou-003', task: '상담 신청 조사 시작', responsible: '담임교사' },
          { id: 'cou-004', task: '상담 방법 선택 조사 (대면/전화/화상)', responsible: '담임교사' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'cou-005', task: '상담 시간표 확정', responsible: '담임교사' },
          { id: 'cou-006', task: '상담 시간 개별 안내', responsible: '담임교사' },
          { id: 'cou-007', task: '학생별 상담 자료 준비', responsible: '담임교사' },
          { id: 'cou-008', task: '상담일지 양식 준비', responsible: '상담부' },
        ],
      },
      {
        phase: '상담 주간',
        period: 'D-Day',
        items: [
          { id: 'cou-009', task: '상담 실시', responsible: '담임교사' },
          { id: 'cou-010', task: '상담 내용 기록', responsible: '담임교사' },
          { id: 'cou-011', task: '변경/취소 대응', responsible: '담임교사' },
          { id: 'cou-012', task: '추가 상담 필요시 연계', responsible: '상담부' },
        ],
      },
      {
        phase: '상담 후',
        period: 'D+1',
        items: [
          { id: 'cou-013', task: '상담일지 정리 및 보관', responsible: '담임교사' },
          { id: 'cou-014', task: '상담 통계 정리', responsible: '상담부' },
          { id: 'cou-015', task: '후속 조치 필요 학생 관리', responsible: '담임교사' },
        ],
      },
    ],
    tips: [
      '학부모 편의를 고려한 다양한 시간대 운영',
      '전화/화상 상담 옵션 제공',
      '학생의 강점 위주로 긍정적 상담 진행',
      '상담 내용 비밀 유지',
    ],
    relatedDocuments: ['상담주간 안내문', '상담 신청서', '상담일지'],
  },

  // ========================================
  // 어린이날 행사
  // ========================================
  {
    id: 'childrens-day',
    name: '어린이날 행사',
    category: 'event',
    description: '어린이날을 기념하는 학교 행사',
    timing: '5월 첫째 주',
    duration: '반나절 ~ 하루',
    responsibleDepartments: ['교육과정부', '체육부', '학년부'],
    preparationPeriod: '2주 전부터',
    checklist: [
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'chi-001', task: '행사 계획 수립', responsible: '교육과정부장' },
          { id: 'chi-002', task: '프로그램 구성 (부스, 체험, 공연 등)', responsible: '교육과정부' },
          { id: 'chi-003', task: '예산 확보', responsible: '행정실' },
          { id: 'chi-004', task: '외부 업체 섭외 (필요시)', responsible: '교육과정부' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'chi-005', task: '학년별 부스 준비', responsible: '학년부' },
          { id: 'chi-006', task: '물품 구입', responsible: '행정실' },
          { id: 'chi-007', task: '동선 및 장소 배치 계획', responsible: '교육과정부' },
          { id: 'chi-008', task: '안전 인력 배치 계획', responsible: '안전부' },
          { id: 'chi-009', task: '날씨 대비 우천 시 대체 계획', responsible: '교육과정부' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'chi-010', task: '장소 세팅 (부스, 텐트 등)', responsible: '전 교직원' },
          { id: 'chi-011', task: '물품 최종 점검', responsible: '학년부' },
          { id: 'chi-012', task: '음향 점검', responsible: '정보부' },
          { id: 'chi-013', task: '안전 점검', responsible: '안전부' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'chi-014', task: '개회식 진행', responsible: '교장' },
          { id: 'chi-015', task: '부스 운영', responsible: '학년부' },
          { id: 'chi-016', task: '안전 인력 배치', responsible: '안전부' },
          { id: 'chi-017', task: '간식/음료 배부', responsible: '급식부' },
          { id: 'chi-018', task: '사진 촬영', responsible: '정보부' },
          { id: 'chi-019', task: '정리 및 철수', responsible: '전 교직원' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'chi-020', task: '장소 원상복구', responsible: '행정실' },
          { id: 'chi-021', task: '결과 보고서 작성', responsible: '교육과정부' },
          { id: 'chi-022', task: '사진 정리 및 공유', responsible: '정보부' },
        ],
      },
    ],
    tips: [
      '전교생이 즐길 수 있는 다양한 프로그램 구성',
      '학생 주도 행사로 기획하여 자치 역량 강화',
      '열사병 예방 (그늘막, 물 배급)',
    ],
    relatedDocuments: ['어린이날 행사 계획서', '프로그램 순서표'],
  },

  // ========================================
  // 수련활동/수학여행
  // ========================================
  {
    id: 'retreat',
    name: '수련활동/수학여행',
    category: 'trip',
    description: '1박 2일 이상 숙박 체험활동',
    timing: '5월, 9~10월',
    duration: '1박 2일 ~ 2박 3일',
    responsibleDepartments: ['교육과정부', '안전부', '학년부'],
    preparationPeriod: '2개월 전부터',
    checklist: [
      {
        phase: '2개월 전',
        period: 'D-60',
        items: [
          { id: 'ret-001', task: '수련활동 계획 수립', responsible: '교육과정부장' },
          { id: 'ret-002', task: '수련원 선정 및 계약', responsible: '행정실' },
          { id: 'ret-003', task: '학운위 심의', responsible: '교무부' },
          { id: 'ret-004', task: '학부모 설명회 계획', responsible: '학년부' },
        ],
      },
      {
        phase: '1개월 전',
        period: 'D-30',
        items: [
          { id: 'ret-005', task: '학부모 설명회 개최', responsible: '학년부' },
          { id: 'ret-006', task: '참가비 수납', responsible: '행정실' },
          { id: 'ret-007', task: '안전계획서 작성 (교육청 제출)', responsible: '안전부' },
          { id: 'ret-008', task: '인솔교사 배정', responsible: '교무부' },
          { id: 'ret-009', task: '보험 가입 확인', responsible: '행정실' },
        ],
      },
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'ret-010', task: '학부모 동의서 회수', responsible: '담임교사' },
          { id: 'ret-011', task: '학생 건강상태 조사', responsible: '보건부' },
          { id: 'ret-012', task: '특이사항 학생 명단 작성', responsible: '담임교사' },
          { id: 'ret-013', task: '비상연락망 구축', responsible: '교육과정부' },
          { id: 'ret-014', task: '프로그램 최종 확인', responsible: '교육과정부' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'ret-015', task: '사전 안전교육', responsible: '담임교사' },
          { id: 'ret-016', task: '준비물 안내', responsible: '담임교사' },
          { id: 'ret-017', task: '방 배정 및 조 편성', responsible: '담임교사' },
          { id: 'ret-018', task: '구급함 준비', responsible: '보건부' },
          { id: 'ret-019', task: '버스 배차표 작성', responsible: '교육과정부' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'ret-020', task: '날씨 확인 및 최종 점검', responsible: '교육과정부' },
          { id: 'ret-021', task: '인솔교사 회의', responsible: '교육과정부' },
          { id: 'ret-022', task: '비상약품 확보 (개인 약 포함)', responsible: '보건부' },
          { id: 'ret-023', task: '학생 건강 최종 확인', responsible: '담임교사' },
        ],
      },
      {
        phase: '수련활동 중',
        period: 'D-Day ~ D+1',
        items: [
          { id: 'ret-024', task: '집합 및 인원 확인', responsible: '담임교사' },
          { id: 'ret-025', task: '버스 탑승 안전교육', responsible: '인솔교사' },
          { id: 'ret-026', task: '활동 중 수시 인원 점검', responsible: '인솔교사' },
          { id: 'ret-027', task: '취침 전 점호', responsible: '인솔교사' },
          { id: 'ret-028', task: '야간 순찰', responsible: '인솔교사' },
          { id: 'ret-029', task: '귀교 후 인원 확인 및 해산', responsible: '담임교사' },
        ],
      },
      {
        phase: '활동 후',
        period: 'D+2',
        items: [
          { id: 'ret-030', task: '결과 보고서 작성', responsible: '교육과정부' },
          { id: 'ret-031', task: '정산 보고', responsible: '행정실' },
          { id: 'ret-032', task: '만족도 조사', responsible: '교육과정부' },
          { id: 'ret-033', task: '사진 정리 및 공유', responsible: '정보부' },
        ],
      },
    ],
    tips: [
      '안전계획서는 출발 14일 전 교육청 제출 필수',
      '야간에 교사 순찰 필수 (시간대별 배치)',
      '알레르기/지병 학생 별도 관리',
      '휴대폰 사용 규칙 사전 안내',
    ],
    relatedDocuments: ['수련활동 계획서', '안전계획서', '동의서', '건강조사서'],
  },

  // ========================================
  // 독서행사/독서골든벨
  // ========================================
  {
    id: 'reading-event',
    name: '독서행사/독서골든벨',
    category: 'event',
    description: '독서의 달 행사 및 독서 관련 대회',
    timing: '10월 (독서의 달)',
    duration: '1~2시간',
    responsibleDepartments: ['도서부', '교육과정부'],
    preparationPeriod: '3주 전부터',
    checklist: [
      {
        phase: '3주 전',
        period: 'D-21',
        items: [
          { id: 'rea-001', task: '독서행사 계획 수립', responsible: '도서부장' },
          { id: 'rea-002', task: '골든벨 도서 선정', responsible: '도서부' },
          { id: 'rea-003', task: '도서 목록 안내', responsible: '도서부' },
          { id: 'rea-004', task: '학급별 도서 대출 권장', responsible: '담임교사' },
        ],
      },
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'rea-005', task: '문제 출제', responsible: '도서부' },
          { id: 'rea-006', task: '참가 신청 접수', responsible: '담임교사' },
          { id: 'rea-007', task: '시상품 준비', responsible: '행정실' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'rea-008', task: '골든벨 진행 리허설', responsible: '도서부' },
          { id: 'rea-009', task: '화이트보드/마커 준비', responsible: '도서부' },
          { id: 'rea-010', task: '음향 점검', responsible: '정보부' },
          { id: 'rea-011', task: '좌석 배치 계획', responsible: '도서부' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'rea-012', task: '장소 세팅', responsible: '도서부' },
          { id: 'rea-013', task: '참가자 입장', responsible: '담임교사' },
          { id: 'rea-014', task: '골든벨 진행', responsible: '사회자' },
          { id: 'rea-015', task: '시상식', responsible: '교장/도서부장' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'rea-016', task: '결과 발표 (홈페이지 게시)', responsible: '도서부' },
          { id: 'rea-017', task: '결과 보고서 작성', responsible: '도서부' },
        ],
      },
    ],
    tips: [
      '학년별로 도서 수준 차등 선정',
      '최종 10~20명 결선에서 개인전으로 진행',
      '탈락자도 격려 (참가상 등)',
    ],
    relatedDocuments: ['독서행사 계획서', '권장도서 목록', '문제지'],
  },

  // ========================================
  // 방학식/개학식
  // ========================================
  {
    id: 'vacation-ceremony',
    name: '방학식/개학식',
    category: 'ceremony',
    description: '학기 종료/시작을 알리는 의식',
    timing: '7월/8월, 12월/2월',
    duration: '30분 ~ 1시간',
    responsibleDepartments: ['교무부'],
    preparationPeriod: '1주 전부터',
    checklist: [
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'vac-001', task: '방학식/개학식 계획 수립', responsible: '교무부' },
          { id: 'vac-002', task: '식순 작성', responsible: '교무부' },
          { id: 'vac-003', task: '표창 대상자 확정 (방학식)', responsible: '각 부서' },
          { id: 'vac-004', task: '방학 과제 안내 준비', responsible: '학년부' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'vac-005', task: '상장 인쇄 및 날인', responsible: '교무부' },
          { id: 'vac-006', task: '통지표 배부 준비', responsible: '담임교사' },
          { id: 'vac-007', task: '방송 장비 점검', responsible: '정보부' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'vac-008', task: '방학식/개학식 진행', responsible: '교무부' },
          { id: 'vac-009', task: '교장 훈화', responsible: '교장' },
          { id: 'vac-010', task: '표창 수여 (방학식)', responsible: '교장' },
          { id: 'vac-011', task: '안전교육', responsible: '안전부' },
          { id: 'vac-012', task: '통지표 배부 (방학식)', responsible: '담임교사' },
        ],
      },
    ],
    tips: [
      '방학 중 안전 수칙 철저히 안내',
      '개학 후 적응 프로그램 안내 (개학식)',
      'TV 방송으로 교실에서 진행 가능',
    ],
    relatedDocuments: ['방학식 계획', '개학식 계획', '방학 생활 안내'],
  },

  // ========================================
  // 과학탐구대회
  // ========================================
  {
    id: 'science-fair',
    name: '과학탐구대회',
    category: 'event',
    description: '과학의 달 과학탐구 및 발명 대회',
    timing: '4월 (과학의 달)',
    duration: '1~2시간',
    responsibleDepartments: ['과학부', '연구부'],
    preparationPeriod: '3주 전부터',
    checklist: [
      {
        phase: '3주 전',
        period: 'D-21',
        items: [
          { id: 'sci-001', task: '대회 계획 수립', responsible: '과학부장' },
          { id: 'sci-002', task: '대회 종목 확정 (발명, 탐구, 실험 등)', responsible: '과학부' },
          { id: 'sci-003', task: '참가 안내문 배부', responsible: '과학부' },
          { id: 'sci-004', task: '참가 신청 접수', responsible: '담임교사' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'sci-005', task: '심사위원 선정', responsible: '과학부' },
          { id: 'sci-006', task: '심사 기준 작성', responsible: '과학부' },
          { id: 'sci-007', task: '장소 및 준비물 점검', responsible: '과학부' },
          { id: 'sci-008', task: '시상품 준비', responsible: '행정실' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'sci-009', task: '대회 진행', responsible: '과학부' },
          { id: 'sci-010', task: '심사', responsible: '심사위원' },
          { id: 'sci-011', task: '결과 집계', responsible: '과학부' },
          { id: 'sci-012', task: '시상식', responsible: '교장/과학부장' },
        ],
      },
      {
        phase: '대회 후',
        period: 'D+1',
        items: [
          { id: 'sci-013', task: '결과 발표', responsible: '과학부' },
          { id: 'sci-014', task: '우수작 전시', responsible: '과학부' },
          { id: 'sci-015', task: '교육청 대회 출품 준비', responsible: '과학부' },
        ],
      },
    ],
    tips: [
      '교육청 대회 출품 일정 확인',
      '우수작 작품 보관 및 전시',
      '학생 아이디어 보호 안내',
    ],
    relatedDocuments: ['대회 계획서', '참가 신청서', '심사 기준표'],
  },

  // ========================================
  // 신입생 예비소집
  // ========================================
  {
    id: 'pre-enrollment',
    name: '신입생 예비소집',
    category: 'event',
    description: '내년도 신입생 사전 학교 적응 프로그램',
    timing: '11월 ~ 12월',
    duration: '2~3시간',
    responsibleDepartments: ['교무부', '1학년부'],
    preparationPeriod: '2주 전부터',
    checklist: [
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'pre-001', task: '예비소집 계획 수립', responsible: '교무부' },
          { id: 'pre-002', task: '취학 대상 아동 명단 확보', responsible: '교무부' },
          { id: 'pre-003', task: '취학통지서 발송', responsible: '행정실' },
          { id: 'pre-004', task: '예비소집 안내문 발송', responsible: '교무부' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'pre-005', task: '프로그램 준비 (학교 소개, 체험)', responsible: '1학년부' },
          { id: 'pre-006', task: '학부모 설명 자료 준비', responsible: '교무부' },
          { id: 'pre-007', task: '동선 계획 (교실, 급식실, 도서관 등)', responsible: '교무부' },
          { id: 'pre-008', task: '기념품 준비', responsible: '행정실' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'pre-009', task: '장소 세팅', responsible: '행정실' },
          { id: 'pre-010', task: '안내 표지판 설치', responsible: '행정실' },
          { id: 'pre-011', task: '리허설', responsible: '1학년부' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'pre-012', task: '접수 및 안내', responsible: '교무부' },
          { id: 'pre-013', task: '학교 소개 (영상/설명)', responsible: '교장/교감' },
          { id: 'pre-014', task: '신입생 체험활동', responsible: '1학년부' },
          { id: 'pre-015', task: '학부모 교육 (입학 준비물, 교육과정)', responsible: '교무부' },
          { id: 'pre-016', task: '학교 시설 견학', responsible: '안내 담당' },
          { id: 'pre-017', task: '기념품 배부', responsible: '교무부' },
        ],
      },
      {
        phase: '소집 후',
        period: 'D+1',
        items: [
          { id: 'pre-018', task: '미참석자 개별 연락', responsible: '교무부' },
          { id: 'pre-019', task: '취학 유예 신청 접수', responsible: '교무부' },
          { id: 'pre-020', task: '입학 예정자 최종 명단 작성', responsible: '교무부' },
        ],
      },
    ],
    tips: [
      '신입생의 긴장을 풀어주는 친근한 분위기 조성',
      '재학생 형/누나 도우미 활용',
      '취학 유예 안내 (필요시)',
    ],
    relatedDocuments: ['취학통지서', '예비소집 안내문', '입학 준비물 안내'],
  },
];
