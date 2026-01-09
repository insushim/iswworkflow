// 공문서 양식 템플릿 (행정안전부 행정업무운영편람 기준)
// Sources: 행정안전부 2020 행정업무운영편람, 교육부 공문서 작성법, 시도교육청 공문서식

export interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  format: 'official' | 'internal' | 'notice' | 'report' | 'letter';
  structure: DocumentStructure;
  example?: string;
  tips: string[];
  relatedDepartments: string[];
}

export interface DocumentStructure {
  header: HeaderSection;
  body: BodySection;
  footer: FooterSection;
}

export interface HeaderSection {
  logo?: boolean;
  documentNumber: string;  // 문서번호 형식
  department: string;      // 처리부서
  contact: string;         // 담당자 연락처
  approvalLine: string[];  // 결재라인
}

export interface BodySection {
  recipient: string;       // 수신자
  viaList?: string[];      // 경유
  title: string;           // 제목
  mainText: string;        // 본문
  attachments?: string[];  // 붙임
}

export interface FooterSection {
  sender: string;          // 발신자
  officialSeal: boolean;   // 관인
  date: string;            // 시행일자
  address: string;         // 주소
  contact: string;         // 연락처
  website?: string;        // 홈페이지
  email?: string;          // 이메일
}

// 공문서 기본 양식 (시행문)
export const officialDocumentTemplate: DocumentTemplate = {
  id: 'doc_001',
  name: '공문서 (시행문)',
  category: '대외 공문',
  description: '교육청, 유관기관, 외부 단체 등에 발송하는 공식 문서',
  format: 'official',
  structure: {
    header: {
      logo: true,
      documentNumber: '○○초등학교-0000(발송일자)',
      department: '교무실',
      contact: '담당자명 (☎ 000-000-0000)',
      approvalLine: ['담당', '부장', '교감', '교장'],
    },
    body: {
      recipient: '○○ 교육지원청 교육장(또는 ○○초등학교장)',
      title: '「○○○○」관련 ○○○ 제출',
      mainText: `1. 관련: ○○과-0000(2024. 0. 0.)

2. 위 관련 호에 따라 「○○○○」관련 ○○○을(를) 붙임과 같이 제출합니다.`,
      attachments: ['○○○ 1부.  끝.'],
    },
    footer: {
      sender: '○○초등학교장',
      officialSeal: true,
      date: '시행 ○○초등학교-0000(2024. 0. 0.)',
      address: '(우 00000) ○○시 ○○구 ○○로 00',
      contact: '☎ 000-000-0000 / 팩스 000-000-0000',
      website: 'http://www.○○.go.kr',
      email: '○○@○○.go.kr',
    },
  },
  tips: [
    '제목은 「」 안에 관련 사업명 기재',
    '본문은 한글 맞춤법에 맞게 작성',
    '붙임 파일명은 본문 내용과 일치',
    '시행일자는 결재일자와 동일 또는 이후',
    '수신자가 여러 기관인 경우 "수신자 참조"로 기재'
  ],
  relatedDepartments: ['dept_001', 'dept_002'],
};

// 가정통신문 양식
export const parentLetterTemplate: DocumentTemplate = {
  id: 'doc_002',
  name: '가정통신문',
  category: '학부모 안내문',
  description: '학부모에게 학교 안내사항을 전달하는 문서',
  format: 'letter',
  structure: {
    header: {
      logo: true,
      documentNumber: '가정통신문 제○○호',
      department: '○○부',
      contact: '담당: ○○○ (☎ 000-0000)',
      approvalLine: ['담당', '부장', '교감', '교장'],
    },
    body: {
      recipient: '학부모님께',
      title: '○○○ 안내',
      mainText: `안녕하십니까?
학부모님의 가정에 건강과 행복이 가득하시길 바랍니다.

다름이 아니오라, ○○○에 대하여 아래와 같이 안내드리오니 많은 관심과 참여 부탁드립니다.

                              ─ 아    래 ─

1. 일 시: 2024년 ○월 ○일(○) 00:00
2. 장 소: ○○초등학교 ○○○
3. 대 상: ○학년 학생 및 학부모
4. 내 용: ○○○○○

※ 기타 문의사항은 담당자에게 연락 바랍니다.`,
      attachments: [],
    },
    footer: {
      sender: '○○초등학교장',
      officialSeal: true,
      date: '2024. ○. ○.',
      address: '(우 00000) ○○시 ○○구 ○○로 00',
      contact: '☎ 000-000-0000',
    },
  },
  tips: [
    '학부모 눈높이에 맞는 쉬운 표현 사용',
    '핵심 안내 사항을 "아래"에 정리',
    '회신이 필요한 경우 하단에 회신란 포함',
    '일정, 장소, 대상 등 필수 정보 빠짐없이 기재',
    '담당자 연락처 명시'
  ],
  relatedDepartments: ['dept_001', 'dept_002', 'dept_003'],
  example: `[가정통신문 예시]

                    ○○초등학교
          가정통신문 제2024-35호

                     학부모님께

      「2024학년도 학부모 공개수업의 날」 안내

안녕하십니까?
학부모님의 가정에 건강과 행복이 가득하시길 바랍니다.

본교에서는 학부모님들께 자녀의 학교생활을 공개하고,
학교 교육에 대한 이해를 돕고자 '학부모 공개수업의 날'을
아래와 같이 계획하고 있습니다. 바쁘시더라도 참석하시어
자녀들에게 격려와 사랑을 보내주시기 바랍니다.

                    ─ 아    래 ─

1. 일 시: 2024년 5월 15일(수) 2교시(09:50~10:30)
2. 장 소: 각 학급 교실
3. 대 상: 전교생 학부모
4. 내 용: 학급별 수업 참관
5. 기 타
  - 주차 공간이 협소하오니 가급적 대중교통을 이용해 주세요.
  - 수업 중 휴대전화는 진동으로 전환하여 주세요.

                              2024. 5. 10.
                             ○○초등학교장 (직인)
`
};

// 업무보고서 양식
export const reportTemplate: DocumentTemplate = {
  id: 'doc_003',
  name: '업무보고서',
  category: '내부 보고',
  description: '상급자에게 업무 진행상황이나 결과를 보고하는 문서',
  format: 'report',
  structure: {
    header: {
      documentNumber: '',
      department: '○○부',
      contact: '',
      approvalLine: ['담당', '부장', '교감', '교장'],
    },
    body: {
      recipient: '',
      title: '○○○ 업무 보고',
      mainText: `Ⅰ. 추진 개요
  1. 근거: ○○과-0000호(2024. 0. 0.)
  2. 목적: ○○○○○
  3. 기간: 2024. ○. ○. ~ ○. ○.

Ⅱ. 추진 현황
  1. 추진 실적
    가. ○○○○○
    나. ○○○○○

  2. 세부 내용
    가. ○○○○○
    나. ○○○○○

Ⅲ. 향후 계획
  1. ○○○○○
  2. ○○○○○

Ⅳ. 건의 사항(또는 행정사항)
  1. ○○○○○`,
      attachments: ['관련 자료 1부.  끝.'],
    },
    footer: {
      sender: '',
      officialSeal: false,
      date: '2024. ○. ○.',
      address: '',
      contact: '',
    },
  },
  tips: [
    '결론 먼저, 상세 내용은 뒤에 배치',
    '개조식으로 간결하게 작성',
    '숫자와 수치는 정확히 기재',
    '건의사항은 실현 가능한 내용 위주로',
    '보고 후 필요한 조치사항 명시'
  ],
  relatedDepartments: ['dept_001'],
};

// 품의서 양식
export const proposalTemplate: DocumentTemplate = {
  id: 'doc_004',
  name: '품의서',
  category: '내부 결재',
  description: '예산 집행, 물품 구입 등에 대한 사전 승인을 요청하는 문서',
  format: 'internal',
  structure: {
    header: {
      documentNumber: '',
      department: '○○부',
      contact: '',
      approvalLine: ['담당', '부장', '교감', '교장'],
    },
    body: {
      recipient: '',
      title: '○○○ 구입 품의',
      mainText: `1. 목적: ○○○○○

2. 구입 내역
┌─────────┬─────────┬─────┬─────────┐
│  품 명   │   규 격   │ 수량 │   금 액   │
├─────────┼─────────┼─────┼─────────┤
│ ○○○    │ ○○○    │  0  │ 000,000원│
├─────────┼─────────┼─────┼─────────┤
│          │   합 계   │     │ 000,000원│
└─────────┴─────────┴─────┴─────────┘

3. 소요 예산
  - 예산 과목: ○○○ / ○○○
  - 집행 금액: ○○○,000원
  - 잔    액: ○○○,000원

4. 구입 방법: 수의계약(○○○)

5. 기타 사항
  - 견적서 ○매 첨부`,
      attachments: ['견적서 ○부.  끝.'],
    },
    footer: {
      sender: '',
      officialSeal: false,
      date: '2024. ○. ○.',
      address: '',
      contact: '',
    },
  },
  tips: [
    '예산 과목, 잔액 정확히 확인',
    '견적서 2~3개 비교 첨부',
    '구입 사유 및 필요성 명시',
    '긴급 구입 시 사유 기재',
    '계약 방법(수의/경쟁) 명시'
  ],
  relatedDepartments: ['dept_001'],
};

// 회의록 양식
export const meetingMinutesTemplate: DocumentTemplate = {
  id: 'doc_005',
  name: '회의록',
  category: '내부 기록',
  description: '각종 회의 내용을 기록하는 문서',
  format: 'internal',
  structure: {
    header: {
      documentNumber: '',
      department: '',
      contact: '',
      approvalLine: ['기록자', '부장', '교감', '교장'],
    },
    body: {
      recipient: '',
      title: '제○차 ○○회의 회의록',
      mainText: `1. 회의 개요
  - 일  시: 2024년 ○월 ○일(○) 00:00 ~ 00:00
  - 장  소: ○○초등학교 ○○실
  - 참석자: ○○○, ○○○, ○○○ (총 ○명)
  - 불참자: ○○○ (사유: ○○○)

2. 회의 안건
  - 안건 1: ○○○○○
  - 안건 2: ○○○○○

3. 회의 내용
  [안건 1] ○○○○○
  - 제안 내용: ○○○○○
  - 논의 내용:
    · ○○○ 위원: ○○○○○
    · ○○○ 위원: ○○○○○
  - 결정 사항: ○○○○○

  [안건 2] ○○○○○
  - 제안 내용: ○○○○○
  - 논의 내용: ○○○○○
  - 결정 사항: ○○○○○

4. 기타 토의 사항
  - ○○○○○

5. 차기 회의
  - 일시: 2024년 ○월 ○일(○) 00:00
  - 안건: ○○○○○`,
    },
    footer: {
      sender: '',
      officialSeal: false,
      date: '기록일: 2024. ○. ○.',
      address: '',
      contact: '',
    },
  },
  tips: [
    '참석자 전원 서명 또는 확인',
    '발언 내용은 요약하여 기록',
    '결정 사항은 명확하게 기록',
    '회의록 작성 후 참석자 확인',
    '첨부자료(안건 자료 등) 명시'
  ],
  relatedDepartments: ['dept_001', 'dept_002'],
};

// 현장체험학습 계획서 양식
export const fieldTripPlanTemplate: DocumentTemplate = {
  id: 'doc_006',
  name: '현장체험학습 계획서',
  category: '행사 계획',
  description: '교외 현장체험학습 실시를 위한 계획 문서',
  format: 'internal',
  structure: {
    header: {
      documentNumber: '',
      department: '○학년부',
      contact: '',
      approvalLine: ['담당', '학년부장', '교감', '교장'],
    },
    body: {
      recipient: '',
      title: '2024학년도 ○학년 현장체험학습 계획(안)',
      mainText: `Ⅰ. 목적
  ○○○○○을(를) 통하여 ○○○○○을(를) 기른다.

Ⅱ. 개요
  1. 일  시: 2024년 ○월 ○일(○) 00:00 ~ 00:00
  2. 장  소: ○○○ (주소: ○○시 ○○구 ○○로 00)
  3. 대  상: ○학년 ○반 ~ ○반 (총 ○○명)
  4. 인솔자: 교사 ○명, 학부모 ○명

Ⅲ. 세부 일정
┌───────┬─────────────────────┐
│  시 간   │         활 동 내 용           │
├───────┼─────────────────────┤
│08:30~09:00│ 학교 집합, 출석 확인, 안전교육   │
│09:00~10:30│ 버스 이동                     │
│10:30~12:00│ ○○○ 체험 활동               │
│12:00~13:00│ 점심식사                      │
│13:00~14:30│ ○○○ 견학 및 체험            │
│14:30~16:00│ 버스 이동, 학교 도착 후 귀가    │
└───────┴─────────────────────┘

Ⅳ. 안전 대책
  1. 사전 안전교육 실시
  2. 비상 연락망 구축
  3. 응급약품 및 구급함 지참
  4. 안전사고 발생 시 대처 요령 숙지

Ⅴ. 소요 예산
  1. 버스 임차료: 000,000원
  2. 입장료: 000,000원 (1인 0,000원 × 00명)
  3. 기타: 000,000원
  ───────────────────
     합  계: 000,000원

Ⅵ. 기대 효과
  1. ○○○○○
  2. ○○○○○

Ⅶ. 행정 사항
  1. 가정통신문 발송: 2024. ○. ○.
  2. 참가비 수합: 2024. ○. ○. ~ ○. ○.
  3. 사전답사: 2024. ○. ○.`,
    },
    footer: {
      sender: '',
      officialSeal: false,
      date: '2024. ○. ○.',
      address: '',
      contact: '',
    },
  },
  tips: [
    '사전답사 후 계획서 작성 권장',
    '안전계획 필수 포함',
    '학교운영위원회 심의 대상 확인',
    '예산 출처(학부모 부담/학교 예산) 명시',
    '인솔 교사 배치 기준 준수 (학생 20명당 1명)'
  ],
  relatedDepartments: ['dept_020', 'dept_004'],
};

// 학교운영위원회 안건서 양식
export const schoolCommitteeAgendaTemplate: DocumentTemplate = {
  id: 'doc_007',
  name: '학교운영위원회 심의 안건서',
  category: '위원회',
  description: '학교운영위원회 심의·자문을 위한 안건 제출 문서',
  format: 'internal',
  structure: {
    header: {
      documentNumber: '',
      department: '○○부',
      contact: '',
      approvalLine: ['담당', '부장', '교감', '교장'],
    },
    body: {
      recipient: '',
      title: '○○○ 심의 요청',
      mainText: `[안건 제○호]

○○○ 심의 건

1. 심의 구분: □ 심의  □ 자문

2. 제안 사유
  ○○○○○에 따라 ○○○○○이 필요하여
  학교운영위원회의 심의를 요청합니다.

3. 세부 내용
  가. 현황
    - ○○○○○

  나. 추진 계획
    - ○○○○○

  다. 소요 예산
    - 총 000,000원 (세부: ○○○)

4. 관련 법령 및 근거
  - ○○○법 제○조
  - ○○○조례 제○조

5. 기대 효과
  - ○○○○○

6. 기타 참고 사항
  - ○○○○○`,
      attachments: ['관련 자료 1부.  끝.'],
    },
    footer: {
      sender: '',
      officialSeal: false,
      date: '2024. ○. ○.',
      address: '',
      contact: '',
    },
  },
  tips: [
    '심의/자문 구분 명확히 표시',
    '관련 법령 근거 제시',
    '예산 관련 안건은 세부 내역 첨부',
    '회의 7일 전 안건 제출',
    '위원들이 이해하기 쉽게 작성'
  ],
  relatedDepartments: ['dept_001'],
};

// 생활기록부 문구 예시
export const schoolRecordExamples = {
  behavior: [
    '학급에서 맡은 역할을 성실히 수행하며 친구들에게 모범이 됨.',
    '자신의 생각을 논리적으로 표현하는 능력이 뛰어남.',
    '다양한 활동에 적극적으로 참여하며 리더십을 발휘함.',
    '규칙을 잘 지키고 바른 생활 태도를 가짐.',
    '어려운 친구를 배려하고 도와주는 따뜻한 마음을 지님.',
  ],
  subjectComments: {
    korean: [
      '글의 중심 내용을 파악하는 독해력이 뛰어남.',
      '자신의 생각을 조리있게 글로 표현하는 능력이 우수함.',
      '발표 시 청중을 고려한 적절한 표현을 사용함.',
    ],
    math: [
      '수학적 문제 상황을 정확하게 분석하고 해결하는 능력이 뛰어남.',
      '수학적 개념을 실생활에 적용하여 문제를 해결함.',
      '창의적인 방법으로 문제를 해결하려는 노력이 돋보임.',
    ],
    social: [
      '사회 현상에 대한 관심이 많고 탐구력이 뛰어남.',
      '역사적 사건의 원인과 결과를 체계적으로 분석함.',
      '지역 사회 문제에 관심을 갖고 해결 방안을 모색함.',
    ],
    science: [
      '과학적 호기심이 왕성하고 탐구 활동에 적극적임.',
      '실험 결과를 논리적으로 분석하고 결론을 도출함.',
      '과학적 원리를 실생활에 적용하여 설명하는 능력이 우수함.',
    ],
  },
  creativeActivity: {
    autonomy: [
      '학급 자치 활동에 적극 참여하여 민주적 의사 결정에 기여함.',
      '학교 행사 기획에 참여하여 창의적인 아이디어를 제안함.',
    ],
    club: [
      '과학 동아리 활동에서 실험 설계 및 보고서 작성에 적극 참여함.',
      '독서 동아리에서 다양한 책을 읽고 깊이 있는 토론 활동을 함.',
    ],
    volunteer: [
      '학교 환경 미화 활동에 솔선수범하여 참여함.',
      '저학년 학생들의 학습을 도와주는 멘토링 활동에 참여함.',
    ],
    career: [
      '다양한 직업에 대한 탐색 활동을 통해 진로에 대한 관심을 넓힘.',
      '진로 체험 활동에서 적극적으로 질문하며 탐구하는 자세를 보임.',
    ],
  },
};

// 월별 주요 공문 키워드
export const monthlyDocumentKeywords = {
  1: ['졸업', '수료', '학년말', '전출', '학적정리'],
  2: ['졸업식', '종업식', '신학년 준비', '교원인사', '학교경영계획'],
  3: ['입학식', '학급편성', '학부모총회', '학교운영위원회 구성', '교육과정 운영'],
  4: ['학부모상담', '건강검사', '과학의달', '장애인의날', '현장체험학습'],
  5: ['스승의날', '가정의달', '학부모공개수업', '체육대회'],
  6: ['환경의날', '현충일', '1학기 성적처리', '여름방학'],
  7: ['여름방학', '학기말', '성적처리', '생활기록부 정리'],
  8: ['개학준비', '2학기 교육계획', '교원연수'],
  9: ['개학', '추석', '학교폭력예방교육', '진로교육'],
  10: ['한글날', '독서의달', '학부모상담', '학예회'],
  11: ['수능', '학교폭력실태조사', '졸업앨범', '학교평가'],
  12: ['학년말평가', '성적처리', '생활기록부', '예산편성'],
};

// 모든 템플릿
export const allTemplates: DocumentTemplate[] = [
  officialDocumentTemplate,
  parentLetterTemplate,
  reportTemplate,
  proposalTemplate,
  meetingMinutesTemplate,
  fieldTripPlanTemplate,
  schoolCommitteeAgendaTemplate,
];

// 카테고리별 그룹화
export const templatesByCategory = {
  external: allTemplates.filter(t => t.format === 'official'),
  internal: allTemplates.filter(t => t.format === 'internal' || t.format === 'report'),
  notice: allTemplates.filter(t => t.format === 'letter' || t.format === 'notice'),
};
