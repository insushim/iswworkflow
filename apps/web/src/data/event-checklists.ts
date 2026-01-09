// 학교 행사 체크리스트 데이터
// 각 행사별 상세 준비사항 및 진행 체크리스트

export interface EventChecklist {
  id: string;
  name: string;
  category: 'ceremony' | 'event' | 'meeting' | 'training' | 'trip';
  description: string;
  timing: string;
  duration: string;
  responsibleDepartments: string[];
  preparationPeriod: string;
  checklist: ChecklistPhase[];
  tips: string[];
  relatedDocuments: string[];
}

export interface ChecklistPhase {
  phase: string;
  period: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  task: string;
  responsible: string;
  deadline?: string;
  notes?: string;
}

export const eventChecklists: EventChecklist[] = [
  // ========================================
  // 입학식
  // ========================================
  {
    id: 'entrance-ceremony',
    name: '입학식',
    category: 'ceremony',
    description: '신입생을 맞이하는 첫 번째 공식 행사',
    timing: '3월 첫 주',
    duration: '약 1시간',
    responsibleDepartments: ['교무부', '교육과정부', '행정실'],
    preparationPeriod: '2주 전부터',
    checklist: [
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'ent-001', task: '입학식 계획서 작성', responsible: '교무부장', notes: '식순, 시간, 장소 포함' },
          { id: 'ent-002', task: '입학식 장소 결정 (강당/운동장)', responsible: '교무부장' },
          { id: 'ent-003', task: '내빈 초청장 발송', responsible: '교무부' },
          { id: 'ent-004', task: '신입생 학부모 안내문 발송', responsible: '교무부' },
          { id: 'ent-005', task: '축사 요청 (학운위원장 등)', responsible: '교무부' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'ent-006', task: '입학식 리허설 일정 확정', responsible: '교무부' },
          { id: 'ent-007', task: '신입생 명렬표 최종 확인', responsible: '교무부' },
          { id: 'ent-008', task: '학급 배정 완료', responsible: '교무부장' },
          { id: 'ent-009', task: '교과서 배부 준비', responsible: '교무부' },
          { id: 'ent-010', task: '음향/영상 장비 점검', responsible: '정보부' },
          { id: 'ent-011', task: '현수막/플래카드 설치', responsible: '행정실' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'ent-012', task: '행사장 좌석 배치', responsible: '행정실' },
          { id: 'ent-013', task: '교실 환경 정비 (1학년)', responsible: '담임교사' },
          { id: 'ent-014', task: '식순 리허설', responsible: '교무부' },
          { id: 'ent-015', task: '기념품/입학선물 준비', responsible: '행정실' },
          { id: 'ent-016', task: '주차 안내 표지 설치', responsible: '행정실' },
          { id: 'ent-017', task: '날씨 확인 (우천 시 대비)', responsible: '교무부' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'ent-018', task: '행사장 최종 점검', responsible: '교무부' },
          { id: 'ent-019', task: '음향/마이크 테스트', responsible: '정보부' },
          { id: 'ent-020', task: '신입생/학부모 안내', responsible: '전 교직원' },
          { id: 'ent-021', task: '입학식 진행', responsible: '사회자' },
          { id: 'ent-022', task: '학급별 교실 이동 안내', responsible: '담임교사' },
          { id: 'ent-023', task: '교과서 배부', responsible: '담임교사' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'ent-024', task: '행사장 정리', responsible: '행정실' },
          { id: 'ent-025', task: '행사 사진 정리 및 홈페이지 게시', responsible: '정보부' },
          { id: 'ent-026', task: '미참석 학생 파악 및 연락', responsible: '담임교사' },
          { id: 'ent-027', task: '결과 보고서 작성', responsible: '교무부' },
        ],
      },
    ],
    tips: [
      '우천 시 실내 행사로 전환할 대비 계획 수립',
      '신입생 학부모 안내문에 준비물, 집합 시간 명시',
      '촬영 동의서 미리 수합',
    ],
    relatedDocuments: ['입학식 계획서', '신입생 명렬표', '학부모 안내문'],
  },

  // ========================================
  // 졸업식
  // ========================================
  {
    id: 'graduation-ceremony',
    name: '졸업식',
    category: 'ceremony',
    description: '6학년 학생들의 졸업을 축하하는 행사',
    timing: '2월 중순',
    duration: '약 1시간 30분',
    responsibleDepartments: ['교무부', '교육과정부', '6학년부'],
    preparationPeriod: '1개월 전부터',
    checklist: [
      {
        phase: '1개월 전',
        period: 'D-30',
        items: [
          { id: 'gra-001', task: '졸업식 계획서 작성', responsible: '교무부장' },
          { id: 'gra-002', task: '졸업생 명단 최종 확정', responsible: '교무부' },
          { id: 'gra-003', task: '졸업장 인쇄 발주', responsible: '행정실' },
          { id: 'gra-004', task: '졸업앨범 제작 일정 확인', responsible: '6학년부' },
          { id: 'gra-005', task: '송사/답사 학생 선정', responsible: '6학년 담임' },
        ],
      },
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'gra-006', task: '졸업장 내용 확인 및 교정', responsible: '교무부' },
          { id: 'gra-007', task: '상장 대상자 확정', responsible: '각 부서' },
          { id: 'gra-008', task: '내빈 초청장 발송', responsible: '교무부' },
          { id: 'gra-009', task: '졸업생 학부모 안내문 발송', responsible: '6학년부' },
          { id: 'gra-010', task: '송사/답사 리허설', responsible: '6학년 담임' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'gra-011', task: '졸업장 날인', responsible: '교무부장' },
          { id: 'gra-012', task: '졸업앨범 배부', responsible: '6학년 담임' },
          { id: 'gra-013', task: '전체 리허설', responsible: '교무부' },
          { id: 'gra-014', task: '행사장 데코레이션', responsible: '행정실' },
          { id: 'gra-015', task: '음향/영상 장비 최종 점검', responsible: '정보부' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'gra-016', task: '행사장 좌석 배치', responsible: '행정실' },
          { id: 'gra-017', task: '졸업장, 상장 최종 정리', responsible: '교무부' },
          { id: 'gra-018', task: '최종 리허설', responsible: '교무부' },
          { id: 'gra-019', task: '기념품/꽃 준비', responsible: '행정실' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'gra-020', task: '행사장 최종 점검', responsible: '교무부' },
          { id: 'gra-021', task: '졸업생/학부모 안내', responsible: '전 교직원' },
          { id: 'gra-022', task: '졸업식 진행', responsible: '사회자' },
          { id: 'gra-023', task: '졸업장 수여', responsible: '교장' },
          { id: 'gra-024', task: '기념 촬영', responsible: '담임/학부모' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'gra-025', task: '학교생활기록부 최종 점검', responsible: '교무부' },
          { id: 'gra-026', task: '졸업대장 작성', responsible: '교무부' },
          { id: 'gra-027', task: '사진 정리 및 홈페이지 게시', responsible: '정보부' },
          { id: 'gra-028', task: '결과 보고', responsible: '교무부' },
        ],
      },
    ],
    tips: [
      '졸업장 이름 오탈자 꼼꼼히 확인',
      '감동적인 영상 메시지 준비 (담임, 학부모)',
      '코로나 등 상황에 따른 축소 운영 대비',
    ],
    relatedDocuments: ['졸업식 계획서', '졸업명렬표', '졸업장'],
  },

  // ========================================
  // 체육대회/운동회
  // ========================================
  {
    id: 'sports-day',
    name: '체육대회/운동회',
    category: 'event',
    description: '학생들의 체력 증진과 학급 화합을 위한 체육행사',
    timing: '9월 또는 10월',
    duration: '반나절 ~ 하루',
    responsibleDepartments: ['체육부', '교육과정부', '학년부'],
    preparationPeriod: '1개월 전부터',
    checklist: [
      {
        phase: '1개월 전',
        period: 'D-30',
        items: [
          { id: 'spo-001', task: '체육대회 계획서 작성', responsible: '체육부장' },
          { id: 'spo-002', task: '종목 선정 및 프로그램 구성', responsible: '체육부' },
          { id: 'spo-003', task: '학부모 참여 종목 계획', responsible: '체육부' },
          { id: 'spo-004', task: '예산 확보 (시상품, 물품)', responsible: '행정실' },
        ],
      },
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'spo-005', task: '학부모 안내문 발송', responsible: '교무부' },
          { id: 'spo-006', task: '운동장 라인 작업 계획', responsible: '체육부' },
          { id: 'spo-007', task: '시상품 구입', responsible: '행정실' },
          { id: 'spo-008', task: '음향 장비 점검', responsible: '정보부' },
          { id: 'spo-009', task: '안전 계획 수립', responsible: '안전부' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'spo-010', task: '종목별 연습', responsible: '각 학년부' },
          { id: 'spo-011', task: '운동장 라인 작업', responsible: '체육부' },
          { id: 'spo-012', task: '물품 준비 (공, 줄, 깃발 등)', responsible: '체육부' },
          { id: 'spo-013', task: '프로그램 순서표 제작', responsible: '체육부' },
          { id: 'spo-014', task: '방송 멘트 작성', responsible: '정보부' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'spo-015', task: '운동장 최종 정비', responsible: '체육부' },
          { id: 'spo-016', task: '본부석/응원석 텐트 설치', responsible: '행정실' },
          { id: 'spo-017', task: '음향 테스트', responsible: '정보부' },
          { id: 'spo-018', task: '날씨 확인 (우천 시 대비)', responsible: '체육부' },
          { id: 'spo-019', task: '구급함/응급약품 준비', responsible: '보건부' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'spo-020', task: '음향 최종 점검', responsible: '정보부' },
          { id: 'spo-021', task: '안전요원 배치', responsible: '안전부' },
          { id: 'spo-022', task: '물 배급소 운영', responsible: '급식부' },
          { id: 'spo-023', task: '종목별 진행', responsible: '체육부' },
          { id: 'spo-024', task: '시상식', responsible: '교장/교감' },
          { id: 'spo-025', task: '정리 및 철수', responsible: '전 교직원' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'spo-026', task: '물품 정리 및 반납', responsible: '체육부' },
          { id: 'spo-027', task: '사진 정리 및 게시', responsible: '정보부' },
          { id: 'spo-028', task: '결과 보고서 작성', responsible: '체육부' },
          { id: 'spo-029', task: '만족도 조사', responsible: '체육부' },
        ],
      },
    ],
    tips: [
      '열사병 예방을 위해 그늘막, 물 충분히 준비',
      '우천 시 대체 일정 미리 공지',
      '안전사고 예방 철저 (응급처치 인력 배치)',
    ],
    relatedDocuments: ['체육대회 계획서', '프로그램 순서표', '안전계획'],
  },

  // ========================================
  // 현장체험학습
  // ========================================
  {
    id: 'field-trip',
    name: '현장체험학습',
    category: 'trip',
    description: '교실 밖에서 이루어지는 체험 중심 학습활동',
    timing: '4~5월, 9~10월',
    duration: '반나절 ~ 1일',
    responsibleDepartments: ['교육과정부', '안전부', '학년부'],
    preparationPeriod: '1개월 전부터',
    checklist: [
      {
        phase: '1개월 전',
        period: 'D-30',
        items: [
          { id: 'fie-001', task: '체험학습 장소 선정', responsible: '학년부' },
          { id: 'fie-002', task: '장소 사전 답사', responsible: '학년 대표' },
          { id: 'fie-003', task: '계획서 작성', responsible: '교육과정부' },
          { id: 'fie-004', task: '안전계획서 작성 (교육청 제출)', responsible: '안전부' },
          { id: 'fie-005', task: '버스 업체 견적 비교 및 계약', responsible: '행정실' },
        ],
      },
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'fie-006', task: '학부모 동의서 배부', responsible: '담임교사' },
          { id: 'fie-007', task: '참가비 수납 안내', responsible: '행정실' },
          { id: 'fie-008', task: '체험처 예약 확정', responsible: '교육과정부' },
          { id: 'fie-009', task: '인솔교사 배정', responsible: '교무부' },
          { id: 'fie-010', task: '학부모 봉사자 모집', responsible: '담임교사' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'fie-011', task: '동의서 회수 및 확인', responsible: '담임교사' },
          { id: 'fie-012', task: '비상연락망 구축', responsible: '교육과정부' },
          { id: 'fie-013', task: '사전 안전교육 실시', responsible: '담임교사' },
          { id: 'fie-014', task: '준비물 안내', responsible: '담임교사' },
          { id: 'fie-015', task: '버스 배차표 작성', responsible: '교육과정부' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'fie-016', task: '날씨 확인 및 최종 결정', responsible: '교무부' },
          { id: 'fie-017', task: '구급함 준비', responsible: '보건부' },
          { id: 'fie-018', task: '학생 건강상태 확인', responsible: '담임교사' },
          { id: 'fie-019', task: '비상약품 확보 (에피펜 등)', responsible: '보건부' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'fie-020', task: '집합 및 인원 확인', responsible: '담임교사' },
          { id: 'fie-021', task: '버스 탑승 명단 확인', responsible: '인솔교사' },
          { id: 'fie-022', task: '안전교육 (버스 내)', responsible: '인솔교사' },
          { id: 'fie-023', task: '활동 중 인원 수시 점검', responsible: '인솔교사' },
          { id: 'fie-024', task: '귀교 후 인원 확인', responsible: '담임교사' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'fie-025', task: '체험학습 소감문/보고서 작성', responsible: '학생' },
          { id: 'fie-026', task: '결과 보고서 작성', responsible: '교육과정부' },
          { id: 'fie-027', task: '사진 정리 및 공유', responsible: '담임교사' },
        ],
      },
    ],
    tips: [
      '안전계획서는 출발 2주 전 교육청 제출 필수',
      '차량 보험 가입 여부 반드시 확인',
      '알레르기/지병 학생 별도 관리',
    ],
    relatedDocuments: ['체험학습 계획서', '안전계획서', '학부모 동의서'],
  },

  // ========================================
  // 학부모 총회
  // ========================================
  {
    id: 'parents-meeting',
    name: '학부모 총회',
    category: 'meeting',
    description: '학년 초 학부모 전체를 대상으로 하는 교육 설명회',
    timing: '3월 2~3주',
    duration: '약 2시간',
    responsibleDepartments: ['교무부', '연구부', '학년부'],
    preparationPeriod: '2주 전부터',
    checklist: [
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'par-001', task: '학부모 총회 계획 수립', responsible: '교무부' },
          { id: 'par-002', task: '일시/장소 확정', responsible: '교무부' },
          { id: 'par-003', task: '가정통신문 발송', responsible: '교무부' },
          { id: 'par-004', task: '참석 조사', responsible: '담임교사' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'par-005', task: '학교 교육과정 설명 자료 준비', responsible: '연구부' },
          { id: 'par-006', task: '학년별 설명 자료 준비', responsible: '학년부' },
          { id: 'par-007', task: '학급 운영 계획 자료 준비', responsible: '담임교사' },
          { id: 'par-008', task: '학부모회 임원 선출 안내', responsible: '교무부' },
          { id: 'par-009', task: '다과 준비 계획', responsible: '행정실' },
        ],
      },
      {
        phase: '전날',
        period: 'D-1',
        items: [
          { id: 'par-010', task: '강당/교실 좌석 배치', responsible: '행정실' },
          { id: 'par-011', task: '프레젠테이션 장비 점검', responsible: '정보부' },
          { id: 'par-012', task: '안내 표지판 설치', responsible: '행정실' },
          { id: 'par-013', task: '리허설', responsible: '발표자' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'par-014', task: '접수 및 안내', responsible: '교무부' },
          { id: 'par-015', task: '1부: 전체 총회 진행', responsible: '교장/교감' },
          { id: 'par-016', task: '2부: 학급별 간담회', responsible: '담임교사' },
          { id: 'par-017', task: '학부모회 임원 선출', responsible: '교무부' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'par-018', task: '설문조사 정리', responsible: '교무부' },
          { id: 'par-019', task: '학부모회 임원 명단 정리', responsible: '교무부' },
          { id: 'par-020', task: '결과 보고', responsible: '교무부' },
        ],
      },
    ],
    tips: [
      '저녁 시간대 운영으로 맞벌이 부모 배려',
      '온라인 동시 참여 가능하도록 준비',
      '주차 안내 철저',
    ],
    relatedDocuments: ['학부모 총회 안내문', '학교 교육과정 안내', '학급 운영 계획'],
  },

  // ========================================
  // 학교폭력 예방교육
  // ========================================
  {
    id: 'bullying-prevention-training',
    name: '학교폭력 예방교육',
    category: 'training',
    description: '학교폭력 예방을 위한 학생/교직원/학부모 대상 교육',
    timing: '학기 초 (4월, 9월)',
    duration: '1~2시간',
    responsibleDepartments: ['생활지도부', '안전부'],
    preparationPeriod: '2주 전부터',
    checklist: [
      {
        phase: '2주 전',
        period: 'D-14',
        items: [
          { id: 'bul-001', task: '교육 계획 수립', responsible: '생활지도부장' },
          { id: 'bul-002', task: '강사 섭외 (외부 전문가)', responsible: '생활지도부' },
          { id: 'bul-003', task: '교육 일정 확정', responsible: '교무부' },
          { id: 'bul-004', task: '교육 자료 준비', responsible: '생활지도부' },
        ],
      },
      {
        phase: '1주 전',
        period: 'D-7',
        items: [
          { id: 'bul-005', task: '학년별 시간표 조정', responsible: '교무부' },
          { id: 'bul-006', task: '강당/교실 사용 예약', responsible: '행정실' },
          { id: 'bul-007', task: '어울림 프로그램 자료 준비', responsible: '담임교사' },
          { id: 'bul-008', task: '학부모 교육 안내문 발송', responsible: '생활지도부' },
        ],
      },
      {
        phase: '당일',
        period: 'D-Day',
        items: [
          { id: 'bul-009', task: '학생 대상 교육 실시', responsible: '담임/강사' },
          { id: 'bul-010', task: '교직원 대상 교육 실시', responsible: '생활지도부' },
          { id: 'bul-011', task: '출석부 작성', responsible: '담임교사' },
        ],
      },
      {
        phase: '행사 후',
        period: 'D+1',
        items: [
          { id: 'bul-012', task: 'NEIS 실적 입력', responsible: '생활지도부' },
          { id: 'bul-013', task: '결과 보고서 작성', responsible: '생활지도부' },
          { id: 'bul-014', task: '교육 사진 보관', responsible: '생활지도부' },
        ],
      },
    ],
    tips: [
      '학기당 1회 이상 실시 (법정 의무)',
      '어울림 프로그램 연계 운영',
      'NEIS 실적 입력 필수',
    ],
    relatedDocuments: ['예방교육 계획서', '실적 보고서', '어울림 프로그램 자료'],
  },
];

// 행사 카테고리 정보
export const eventCategoryInfo = {
  ceremony: { label: '의식행사', color: '#8B5CF6', icon: '🎓' },
  event: { label: '학교행사', color: '#3B82F6', icon: '🎉' },
  meeting: { label: '회의/총회', color: '#10B981', icon: '👥' },
  training: { label: '교육/연수', color: '#F59E0B', icon: '📚' },
  trip: { label: '현장학습', color: '#EF4444', icon: '🚌' },
};
