interface EventTemplateSeed {
  typeName: string;
  name: string;
  description: string;
  defaultDuration?: number;
  defaultLocation?: string;
  checklist: {
    category: string;
    items: { text: string; isRequired: boolean }[];
  }[];
  preparation: {
    daysBeforeEvent: number;
    tasks: string[];
  }[];
  relatedDocs: string[];
  tips: string[];
}

export const eventTemplates: EventTemplateSeed[] = [
  // ===========================================
  // 의식행사 템플릿
  // ===========================================
  {
    typeName: 'ceremony',
    name: '입학식',
    description: '신입생 입학식 행사 템플릿',
    defaultDuration: 60,
    defaultLocation: '강당',
    checklist: [
      {
        category: '사전 준비',
        items: [
          { text: '식순 및 시나리오 작성', isRequired: true },
          { text: '내빈 초청장 발송', isRequired: false },
          { text: '현수막 제작 및 설치', isRequired: true },
          { text: '음향/영상 장비 점검', isRequired: true },
          { text: '의자 배치 계획 수립', isRequired: true },
          { text: '신입생 명단 최종 확인', isRequired: true },
          { text: '기념품 준비 (해당 시)', isRequired: false },
        ],
      },
      {
        category: '당일 준비',
        items: [
          { text: '강당 청소 및 환경 정리', isRequired: true },
          { text: '의자 배치', isRequired: true },
          { text: '현수막 최종 점검', isRequired: true },
          { text: '음향/영상 테스트', isRequired: true },
          { text: '안내 인력 배치', isRequired: true },
          { text: '화환 배치', isRequired: false },
        ],
      },
      {
        category: '행사 진행',
        items: [
          { text: '학부모 안내 및 착석', isRequired: true },
          { text: '개식 선언', isRequired: true },
          { text: '국민의례', isRequired: true },
          { text: '신입생 선서', isRequired: true },
          { text: '교장 선생님 말씀', isRequired: true },
          { text: '담임선생님 소개', isRequired: true },
          { text: '교실 이동 안내', isRequired: true },
        ],
      },
      {
        category: '행사 후',
        items: [
          { text: '강당 정리', isRequired: true },
          { text: '장비 정리', isRequired: true },
          { text: '결과 보고서 작성', isRequired: true },
        ],
      },
    ],
    preparation: [
      {
        daysBeforeEvent: 30,
        tasks: ['기본 계획 수립', '예산 확보', '역할 분담'],
      },
      {
        daysBeforeEvent: 14,
        tasks: ['식순 확정', '시나리오 작성', '현수막 디자인'],
      },
      {
        daysBeforeEvent: 7,
        tasks: ['현수막 제작', '학부모 안내문 발송', '리허설 일정 확정'],
      },
      {
        daysBeforeEvent: 3,
        tasks: ['현수막 설치', '음향 점검', '의자 배치 확인'],
      },
      {
        daysBeforeEvent: 1,
        tasks: ['최종 리허설', '신입생 교실 환경 점검', '모든 준비물 최종 점검'],
      },
    ],
    relatedDocs: ['입학식 계획서', '입학 안내문'],
    tips: [
      '신입생이 긴장하지 않도록 따뜻한 분위기를 조성하세요',
      '학부모 좌석은 사전에 안내하면 혼잡을 줄일 수 있습니다',
      '사진 촬영 구역을 미리 안내하세요',
    ],
  },
  {
    typeName: 'ceremony',
    name: '졸업식',
    description: '졸업식 행사 템플릿',
    defaultDuration: 90,
    defaultLocation: '강당',
    checklist: [
      {
        category: '사전 준비',
        items: [
          { text: '졸업생 명단 최종 확인', isRequired: true },
          { text: '졸업장 인쇄 및 점검', isRequired: true },
          { text: '상장 준비 (개근상, 공로상 등)', isRequired: true },
          { text: '졸업앨범 준비', isRequired: true },
          { text: '식순 및 시나리오 작성', isRequired: true },
          { text: '송사/답사 학생 선정 및 연습', isRequired: true },
          { text: '현수막 제작', isRequired: true },
          { text: '내빈 초청장 발송', isRequired: false },
        ],
      },
      {
        category: '당일 준비',
        items: [
          { text: '강당 환경 정비', isRequired: true },
          { text: '졸업장/상장 배치', isRequired: true },
          { text: '음향/영상 최종 점검', isRequired: true },
          { text: '꽃다발/화환 배치', isRequired: false },
          { text: '안내 인력 배치', isRequired: true },
        ],
      },
      {
        category: '행사 진행',
        items: [
          { text: '개식 선언', isRequired: true },
          { text: '국민의례', isRequired: true },
          { text: '졸업장 수여', isRequired: true },
          { text: '상장 수여', isRequired: true },
          { text: '송사', isRequired: true },
          { text: '답사', isRequired: true },
          { text: '교장 선생님 말씀', isRequired: true },
          { text: '교가 제창', isRequired: true },
          { text: '폐식 선언', isRequired: true },
          { text: '기념 촬영', isRequired: true },
        ],
      },
    ],
    preparation: [
      {
        daysBeforeEvent: 60,
        tasks: ['졸업사정회 개최', '졸업생 명단 확정', '졸업앨범 작업 진행'],
      },
      {
        daysBeforeEvent: 30,
        tasks: ['기본 계획 수립', '졸업장 주문', '식순 초안 작성'],
      },
      {
        daysBeforeEvent: 14,
        tasks: ['졸업장 수령 및 확인', '상장 작성', '현수막 제작'],
      },
      {
        daysBeforeEvent: 7,
        tasks: ['송사/답사 연습', '졸업앨범 배부', '학부모 안내문 발송'],
      },
      {
        daysBeforeEvent: 1,
        tasks: ['최종 리허설', '모든 준비물 점검', '졸업장 봉투 정리'],
      },
    ],
    relatedDocs: ['졸업식 계획서', '졸업 안내문'],
    tips: [
      '졸업장 수여 순서를 미리 연습하세요',
      '감동적인 영상을 준비하면 좋습니다',
      '졸업앨범 서명 시간을 별도로 마련하세요',
    ],
  },

  // ===========================================
  // 체육행사 템플릿
  // ===========================================
  {
    typeName: 'athletic',
    name: '운동회',
    description: '학교 운동회/체육대회 템플릿',
    defaultDuration: 300,
    defaultLocation: '운동장',
    checklist: [
      {
        category: '사전 계획',
        items: [
          { text: '종목 선정 및 학년 배정', isRequired: true },
          { text: '시간표 작성', isRequired: true },
          { text: '역할 분담표 작성', isRequired: true },
          { text: '용품 목록 작성 및 준비', isRequired: true },
          { text: '예산 확보', isRequired: true },
          { text: '우천 시 대책 수립', isRequired: true },
        ],
      },
      {
        category: '운동장 준비',
        items: [
          { text: '운동장 라인 작업', isRequired: true },
          { text: '천막 설치', isRequired: true },
          { text: '본부석 설치', isRequired: true },
          { text: '음향 설비 설치', isRequired: true },
          { text: '출발/결승선 표시', isRequired: true },
          { text: '점수판 설치', isRequired: true },
        ],
      },
      {
        category: '학생 연습',
        items: [
          { text: '개회식 연습', isRequired: true },
          { text: '준비운동 연습', isRequired: true },
          { text: '학년별 종목 연습', isRequired: true },
          { text: '단체 종목 연습', isRequired: true },
          { text: '전체 리허설', isRequired: true },
        ],
      },
      {
        category: '당일 운영',
        items: [
          { text: '아침 장비 점검', isRequired: true },
          { text: '학부모 안내', isRequired: true },
          { text: '개회식 진행', isRequired: true },
          { text: '종목별 운영', isRequired: true },
          { text: '점수 집계', isRequired: true },
          { text: '시상식', isRequired: true },
          { text: '폐회식', isRequired: true },
          { text: '정리 및 복원', isRequired: true },
        ],
      },
    ],
    preparation: [
      {
        daysBeforeEvent: 30,
        tasks: ['기본 계획 수립', '종목 선정', '예산 확보'],
      },
      {
        daysBeforeEvent: 14,
        tasks: ['세부 시간표 작성', '용품 발주', '학부모 안내문 발송'],
      },
      {
        daysBeforeEvent: 7,
        tasks: ['학년별 연습 시작', '라인 작업', '천막 등 대여'],
      },
      {
        daysBeforeEvent: 3,
        tasks: ['용품 수령 및 점검', '음향 테스트', '리허설'],
      },
      {
        daysBeforeEvent: 1,
        tasks: ['운동장 최종 정비', '모든 장비 점검', '날씨 확인'],
      },
    ],
    relatedDocs: ['운동회 계획서', '운동회 안내문'],
    tips: [
      '학년별 대기 장소를 명확히 지정하세요',
      '구급함을 여러 곳에 비치하세요',
      '충분한 음수대를 준비하세요',
      '학부모 관람 구역을 미리 안내하세요',
    ],
  },

  // ===========================================
  // 현장체험학습 템플릿
  // ===========================================
  {
    typeName: 'field_trip',
    name: '현장체험학습',
    description: '현장체험학습/소풍 템플릿',
    defaultDuration: 420,
    checklist: [
      {
        category: '계획 수립',
        items: [
          { text: '장소 선정 및 답사', isRequired: true },
          { text: '버스 견적 및 계약', isRequired: true },
          { text: '보험 가입 확인', isRequired: true },
          { text: '계획서 작성 및 결재', isRequired: true },
          { text: '학부모 안내문 발송', isRequired: true },
          { text: '동의서 수합', isRequired: true },
        ],
      },
      {
        category: '사전 준비',
        items: [
          { text: '학생 조 편성', isRequired: true },
          { text: '비상연락망 작성', isRequired: true },
          { text: '응급약품 준비', isRequired: true },
          { text: '안전교육 실시', isRequired: true },
          { text: '활동지 준비', isRequired: false },
        ],
      },
      {
        category: '당일 진행',
        items: [
          { text: '출발 전 인원 점검', isRequired: true },
          { text: '차량 내 안전교육', isRequired: true },
          { text: '도착 후 안내', isRequired: true },
          { text: '활동 중 안전 지도', isRequired: true },
          { text: '점심 지도', isRequired: true },
          { text: '집결 및 인원 점검', isRequired: true },
          { text: '귀교 인원 확인', isRequired: true },
        ],
      },
      {
        category: '사후 처리',
        items: [
          { text: '결과 보고서 작성', isRequired: true },
          { text: '사진 정리 및 공유', isRequired: false },
          { text: '소감문 작성 지도', isRequired: false },
        ],
      },
    ],
    preparation: [
      {
        daysBeforeEvent: 30,
        tasks: ['장소 선정', '사전답사', '예산 확인'],
      },
      {
        daysBeforeEvent: 14,
        tasks: ['버스 계약', '계획서 결재', '안내문 발송'],
      },
      {
        daysBeforeEvent: 7,
        tasks: ['동의서 수합', '학생 조 편성', '안전교육 실시'],
      },
      {
        daysBeforeEvent: 1,
        tasks: ['준비물 최종 점검', '날씨 확인', '비상연락망 공유'],
      },
    ],
    relatedDocs: ['현장체험학습 계획서', '현장체험학습 안내문'],
    tips: [
      '매 이동 시 반드시 인원을 확인하세요',
      '미아 발생 시 대처 방법을 미리 공유하세요',
      '알레르기 학생 명단을 별도로 관리하세요',
    ],
  },

  // ===========================================
  // 학부모행사 템플릿
  // ===========================================
  {
    typeName: 'parent',
    name: '학부모 공개수업',
    description: '학부모 대상 공개수업 템플릿',
    defaultDuration: 120,
    defaultLocation: '각 학급 교실',
    checklist: [
      {
        category: '사전 준비',
        items: [
          { text: '공개수업 일정 확정', isRequired: true },
          { text: '안내문 발송 및 참석 조사', isRequired: true },
          { text: '수업 지도안 작성', isRequired: true },
          { text: '교실 환경 정비', isRequired: true },
          { text: '학부모 좌석 준비', isRequired: true },
        ],
      },
      {
        category: '당일 진행',
        items: [
          { text: '학부모 안내 및 좌석 배치', isRequired: true },
          { text: '수업 진행', isRequired: true },
          { text: '학부모 설문 배부', isRequired: false },
          { text: '개별 상담 진행', isRequired: false },
        ],
      },
      {
        category: '사후 처리',
        items: [
          { text: '설문 결과 분석', isRequired: false },
          { text: '결과 보고서 작성', isRequired: true },
        ],
      },
    ],
    preparation: [
      {
        daysBeforeEvent: 14,
        tasks: ['기본 계획 수립', '안내문 발송', '참석 조사'],
      },
      {
        daysBeforeEvent: 7,
        tasks: ['수업 지도안 작성', '교실 정비 계획'],
      },
      {
        daysBeforeEvent: 1,
        tasks: ['교실 환경 정비', '좌석 배치', '수업 준비물 점검'],
      },
    ],
    relatedDocs: ['공개수업 안내문', '수업지도안'],
    tips: [
      '학부모가 수업을 방해하지 않도록 사전 안내하세요',
      '수업 후 간단한 다과를 준비하면 좋습니다',
    ],
  },
  {
    typeName: 'parent',
    name: '학부모 상담',
    description: '학부모 상담주간 운영 템플릿',
    defaultDuration: 15,
    defaultLocation: '각 학급 교실',
    checklist: [
      {
        category: '사전 준비',
        items: [
          { text: '상담 일정 안내문 발송', isRequired: true },
          { text: '온라인 신청 시스템 오픈', isRequired: true },
          { text: '상담 시간표 작성', isRequired: true },
          { text: '학생별 상담 자료 준비', isRequired: true },
        ],
      },
      {
        category: '상담 진행',
        items: [
          { text: '상담 내용 기록', isRequired: true },
          { text: '학부모 요청사항 메모', isRequired: true },
          { text: '후속 조치 사항 정리', isRequired: true },
        ],
      },
      {
        category: '사후 처리',
        items: [
          { text: 'NEIS 상담 기록 입력', isRequired: true },
          { text: '미상담 학부모 연락', isRequired: true },
          { text: '후속 상담 일정 조율', isRequired: false },
        ],
      },
    ],
    preparation: [
      {
        daysBeforeEvent: 14,
        tasks: ['상담 일정 공지', '신청 시스템 준비'],
      },
      {
        daysBeforeEvent: 7,
        tasks: ['신청 현황 확인', '시간표 작성'],
      },
      {
        daysBeforeEvent: 1,
        tasks: ['학생별 자료 준비', '상담 일정 최종 확인'],
      },
    ],
    relatedDocs: ['상담 안내문', '상담 신청서'],
    tips: [
      '긍정적인 내용을 먼저 말씀드리면 좋습니다',
      '시간을 엄수하여 다음 학부모를 배려하세요',
      '민감한 내용은 별도 시간을 잡아 상담하세요',
    ],
  },
];

export type { EventTemplateSeed };
