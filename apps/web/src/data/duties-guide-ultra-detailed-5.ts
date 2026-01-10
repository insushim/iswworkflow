// 초등교사 업무분장 초상세 가이드 Part 5 - 연구부, 정보부, 과학부, 체육부
// 교차검증된 100+ 사이트 기반, 처음 담당해도 완벽 수행 가능

import { UltraDetailedDutyGuide } from './duties-guide-ultra-detailed';

// ========================================
// 8. 연구부 - 초상세 버전
// ========================================
export const researchUltraDetailed: UltraDetailedDutyGuide = {
  id: 'research-ultra',
  name: '연구부 (교원연수/연구학교)',
  shortName: '연구',
  category: 'academic',
  icon: 'BookOpen',
  color: 'indigo',
  difficulty: 4,

  description: '교원 연수 관리, 수업 장학, 연구학교 운영, 교육과정 연구, 수업 공개 등을 담당합니다.',

  detailedOverview: `
【연구부 업무 완전 가이드】

■ 부서 개요
연구부는 교원의 전문성 신장과 교육과정 연구를 담당합니다.
교원 연수 관리, 수업 장학, 연구학교/시범학교 운영,
자율장학 등을 통해 교육의 질 향상에 기여합니다.

■ 핵심 업무 영역
1. 교원 연수 관리
   - 법정 의무연수 관리
   - 직무연수 안내 및 관리
   - 자격연수 관리 (1급 정교사, 교감 등)
   - 교내 연수 기획 운영

2. 수업 장학
   - 자율장학 계획 운영
   - 수업 공개 (동료장학, 공개수업)
   - 컨설팅 장학 연계
   - 수업 나눔 운영

3. 연구학교/시범학교
   - 지정 연구학교 운영
   - 연구보고서 작성
   - 성과 발표회

4. 교육과정 연구
   - 교육과정 운영 지원
   - 교수학습 자료 개발
   - 평가 연구

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 2월: 연수 계획 수립, 자율장학 계획, 연구학교 계획           │
│ 3월: 법정연수 안내, 1학기 자율장학 시작, 연구학교 착수      │
│ 4월: 수업 공개 (1차), 컨설팅 장학 신청, 교내연수            │
│ 5월: 교원능력개발평가 준비, 수업 공개 (2차)                 │
│ 6월: 1학기 자율장학 정리, 연수 이수 점검, 연구학교 중간점검 │
│ 9월: 2학기 자율장학, 수업 공개 (3차), 연구학교 추진         │
│ 10월: 교원능력개발평가 실시, 수업 공개 (4차), 교내연수      │
│ 11월: 연구학교 결과보고서 작성, 성과발표회                  │
│ 12월: 연간 연수 정리, 자율장학 평가, 차년도 계획            │
└─────────────────────────────────────────────────────────────┘
`,

  importance: `
【연구부 업무가 중요한 이유】

1. 교원 전문성 신장
   - 연수를 통한 역량 강화
   - 수업력 향상
   - 최신 교육 동향 습득

2. 법적 의무 이행
   - 법정 의무연수 이수 관리
   - 교원능력개발평가 실시
   - 연구학교 운영 의무

3. 교육의 질 향상
   - 수업 장학으로 수업 개선
   - 교육과정 연구
   - 우수 사례 공유

4. 학교 발전
   - 연구학교 지정으로 지원
   - 학교 특색 교육 개발
   - 교육 혁신 선도
`,

  legalBasis: [
    '교육공무원법',
    '교원 등의 연수에 관한 규정',
    '교원능력개발평가 실시에 관한 훈령',
    '장학에 관한 규칙',
  ],

  requiredSkills: [
    '연수 계획 및 관리',
    '장학 계획 수립 및 운영',
    '수업 관찰 및 피드백',
    '연구보고서 작성',
    '나이스 연수관리 시스템 활용',
    '교육과정 이해',
    '발표 및 진행 능력',
  ],

  recommendedTraining: [
    '연구(시범)학교 담당자 연수',
    '자율장학 운영 연수',
    '수업 컨설팅 연수',
    '교원능력개발평가 연수',
    '교육과정 연수',
  ],

  commonChallenges: [
    '교원들의 연수 이수 독려',
    '바쁜 업무 중 수업 공개 시간 확보',
    '연구학교 업무 부담',
    '의미 있는 장학 활동 운영',
    '연수 이수 현황 관리',
    '교원능력개발평가 운영',
  ],

  challengeSolutions: {
    '연수 독려': '기한 사전 안내, 미이수자 개별 안내, 연수 정보 적극 공유',
    '수업 공개': '연간 일정 미리 계획, 자율적 참여 유도',
    '연구학교': '업무 분담, 연구비 적절 활용, 단계별 계획',
    '장학 활동': '동료장학 중심, 부담 없는 나눔 문화',
  },

  successTips: [
    '연수 마감 기한 미리미리 안내',
    '법정연수 누락자 없도록 꼼꼼히 확인',
    '수업 공개는 강제보다 자율 참여 유도',
    '연구학교는 처음부터 철저한 기록',
    '교내연수는 실질적이고 유용하게',
    '교원능력개발평가 일정 놓치지 않기',
    '장학은 평가가 아닌 성장 지원으로',
  ],

  firstYearGuide: `
【처음 연구부 업무를 맡게 된 선생님께】

■ 가장 먼저 해야 할 것
1. 법정 의무연수 목록 확인
2. 전년도 연수 이수 현황 파악
3. 자율장학 계획 확인/수립
4. 연구학교 지정 여부 확인
5. 나이스 연수관리 권한 확인

■ 법정 의무연수 (★암기★)
- 성희롱/성폭력 예방교육 (연 1회, 1시간)
- 성매매 예방교육 (연 1회, 1시간)
- 가정폭력 예방교육 (연 1회, 1시간)
- 장애인식 개선교육 (연 1회, 1시간)
- 아동학대 예방교육 (연 1회, 1시간)
- 인터넷 중독 예방교육 (연 1회)
- 심폐소생술(응급처치) 연수 (연 1회)
- 교원 정보화 연수
- 인권교육 (연 1회, 2시간)
- 개인정보보호 교육 (연 1회, 1시간)
※ 교육청별 추가 항목 확인 필요

■ 자율장학 유형
- 동료장학: 동학년/교과 교사 간 수업 나눔
- 자기장학: 개인 연구, 수업 분석
- 멘토링: 신규/저경력 교사 지원
- 컨설팅 장학: 외부 전문가 지원

■ 수업 공개 운영
- 학기당 전체 공개 1~2회
- 동학년/교과 수업 나눔 상시
- 수업 후 협의회 필수

■ 주의사항
❌ 법정연수 미이수자 방치
❌ 연수 이수 확인서 미확보
❌ 연구학교 결과보고 지연
❌ 교원능력개발평가 기한 초과
`,

  seniorAdvice: [
    '법정연수 기한 절대 놓치지 마세요. 책임 문제됩니다.',
    '연수 이수 확인서는 나이스에서 출력해서 보관하세요.',
    '수업 공개는 부담 주지 말고 자연스럽게.',
    '연구학교는 처음부터 기록이 생명이에요.',
    '교내연수 "또 해?" 소리 안 듣게 실용적으로.',
    '교원능력개발평가 시스템 일정 꼭 확인하세요.',
    '선생님들 연수 정보 필요하면 적극 공유해 주세요.',
  ],

  detailedTasks: [
    {
      id: 'research-1',
      task: '법정 의무연수 관리',
      category: 'essential',
      description: '법정 의무연수 계획, 실시, 이수 확인',
      legalBasis: '각종 법령에 따른 의무교육',
      deadline: '연중 (항목별 기한)',
      frequency: 'annual',
      estimatedTime: '연간 30시간',
      procedures: [
        {
          step: 1,
          title: '법정연수 목록 확인',
          description: '해당 연도 법정연수 항목 및 기준 확인',
          tips: ['교육청 공문 확인', '전년도 대비 변경 확인'],
          documents: ['법정연수 계획'],
        },
        {
          step: 2,
          title: '연수 계획 수립',
          description: '항목별 연수 일정 및 방법 계획',
          tips: ['집합/원격/온라인 구분', '월별 배치'],
        },
        {
          step: 3,
          title: '연수 실시 및 안내',
          description: '교내연수 또는 외부연수 안내',
          tips: ['사전 안내', '참여 독려', '출석 확인'],
        },
        {
          step: 4,
          title: '이수 확인 및 관리',
          description: '교원별 이수 현황 확인',
          neisPath: '연수관리 > 법정연수관리',
          tips: ['나이스에서 이수 확인', '미이수자 개별 안내'],
          documents: ['이수 확인서'],
        },
        {
          step: 5,
          title: '결과 보고',
          description: '법정연수 이수 결과 보고',
          documents: ['법정연수 이수 현황'],
        },
      ],
      documents: ['연수 계획', '이수 현황', '이수 확인서'],
      neisMenus: ['연수관리-법정연수관리'],
      checklistItems: [
        '성희롱/성폭력 예방교육',
        '성매매 예방교육',
        '가정폭력 예방교육',
        '장애인식 개선교육',
        '아동학대 예방교육',
        '심폐소생술 연수',
        '개인정보보호 교육',
        '인권교육',
      ],
    },
    {
      id: 'research-2',
      task: '자율장학 운영',
      category: 'essential',
      description: '자율장학 계획 수립, 수업 공개 운영, 협의회',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '연간 40시간',
      procedures: [
        {
          step: 1,
          title: '자율장학 계획 수립',
          description: '연간 자율장학 계획 수립',
          tips: [
            '동료장학, 자기장학, 멘토링 등 유형 선택',
            '수업 공개 일정',
            '협의회 계획',
          ],
          documents: ['자율장학 계획'],
        },
        {
          step: 2,
          title: '수업 공개 운영',
          description: '전체 공개 또는 동학년 공개 수업',
          tips: [
            '수업자 자율 신청 유도',
            '수업 공개 안내',
            '참관록 준비',
          ],
          documents: ['수업 공개 안내', '참관록'],
        },
        {
          step: 3,
          title: '수업 협의회',
          description: '수업 공개 후 협의회 진행',
          tips: ['긍정적 피드백 중심', '개선점 논의', '기록 유지'],
          documents: ['협의회 기록'],
        },
        {
          step: 4,
          title: '컨설팅 장학 연계',
          description: '필요시 외부 컨설팅 장학 신청',
          tips: ['교육청 컨설팅 장학단 활용', '신청 기한 확인'],
        },
        {
          step: 5,
          title: '정리 및 평가',
          description: '학기별/연간 자율장학 정리',
          documents: ['자율장학 결과 보고'],
        },
      ],
      documents: ['계획서', '참관록', '협의회 기록', '결과 보고'],
    },
    {
      id: 'research-3',
      task: '교원능력개발평가 운영',
      category: 'essential',
      description: '교원능력개발평가 계획, 실시, 결과 처리',
      legalBasis: '교원능력개발평가 실시에 관한 훈령',
      deadline: '10-11월 (시기는 교육청 지정)',
      frequency: 'annual',
      estimatedTime: '20시간',
      procedures: [
        {
          step: 1,
          title: '운영 계획 수립',
          description: '교원능력개발평가 운영 계획',
          tips: ['교육청 지침 확인', '평가 일정 확정'],
          documents: ['운영 계획'],
        },
        {
          step: 2,
          title: '평가 관리위원회 구성',
          description: '학교 평가관리위원회 구성',
          tips: ['관리자, 교사, 학부모 포함'],
          documents: ['위원회 명단'],
        },
        {
          step: 3,
          title: '평가자/대상자 확정',
          description: '평가 참여자 확정 및 안내',
          tips: ['학생, 학부모, 동료교원 참여', '평가 방법 안내'],
        },
        {
          step: 4,
          title: '온라인 평가 실시',
          description: '나이스 시스템에서 온라인 평가',
          neisPath: '교원능력개발평가',
          tips: ['평가 기간 안내', '참여 독려'],
        },
        {
          step: 5,
          title: '결과 처리',
          description: '평가 결과 확인 및 개인별 통보',
          tips: ['결과 개인 열람', '맞춤형 연수 안내'],
          documents: ['평가 결과'],
        },
      ],
      documents: ['운영 계획', '결과 보고'],
    },
    {
      id: 'research-4',
      task: '연구학교/시범학교 운영',
      category: 'important',
      description: '연구학교 지정 시 운영 및 결과보고',
      deadline: '지정 기간에 따름',
      frequency: 'asNeeded',
      estimatedTime: '연간 100시간 이상',
      procedures: [
        {
          step: 1,
          title: '연구학교 신청/지정',
          description: '연구학교 공모 신청 또는 지정',
          tips: ['공모 요강 확인', '연구 주제 선정'],
          documents: ['신청서'],
        },
        {
          step: 2,
          title: '운영 계획 수립',
          description: '연구 운영 계획 수립',
          tips: ['연구 목표, 방법, 일정', '예산 계획'],
          documents: ['운영 계획서'],
        },
        {
          step: 3,
          title: '연구 추진',
          description: '계획에 따른 연구 활동 추진',
          tips: ['정기 협의회', '실행 기록', '중간 점검'],
        },
        {
          step: 4,
          title: '결과 보고서 작성',
          description: '연구 결과 보고서 작성',
          tips: ['체계적 구성', '성과 분석', '일반화 방안'],
          documents: ['결과 보고서'],
        },
        {
          step: 5,
          title: '성과 발표회',
          description: '연구 성과 발표 및 공유',
          tips: ['발표 자료 준비', '우수 사례 공유'],
        },
      ],
      documents: ['운영 계획서', '결과 보고서'],
    },
    {
      id: 'research-5',
      task: '교내연수 운영',
      category: 'important',
      description: '교내 직무연수 기획 및 운영',
      deadline: '연중',
      frequency: 'monthly',
      estimatedTime: '월 4시간',
      procedures: [
        {
          step: 1,
          title: '연수 주제 선정',
          description: '교원 수요 기반 연수 주제 선정',
          tips: ['설문 조사', '교육 현안 반영', '실용적 주제'],
        },
        {
          step: 2,
          title: '강사 섭외',
          description: '내부/외부 강사 섭외',
          tips: ['내부 전문가 활용', '외부 강사 비용 확인'],
        },
        {
          step: 3,
          title: '연수 실시',
          description: '교내연수 진행',
          tips: ['참여형 연수', '자료 배부', '출석 확인'],
          documents: ['연수 자료', '출석부'],
        },
        {
          step: 4,
          title: '연수 기록',
          description: '연수 실적 나이스 입력',
          neisPath: '연수관리 > 교내연수관리',
          tips: ['이수 시간 확인', '연수 결과 기록'],
        },
      ],
      documents: ['연수 계획', '연수 자료', '이수 기록'],
    },
  ],

  weeklyWorkflow: [
    { week: 4, month: 2, tasks: ['연수 계획 수립', '자율장학 계획', '법정연수 안내'], priority: 'high' },
    { week: 1, month: 3, tasks: ['법정연수 시작', '1학기 자율장학 시작'], priority: 'high' },
    { week: 2, month: 4, tasks: ['1차 수업 공개', '컨설팅 장학 신청'], priority: 'medium' },
    { week: 3, month: 5, tasks: ['2차 수업 공개', '교원능력개발평가 준비'], priority: 'medium' },
    { week: 4, month: 6, tasks: ['1학기 자율장학 정리', '법정연수 이수 점검'], priority: 'high' },
    { week: 1, month: 9, tasks: ['2학기 자율장학', '법정연수 독촉'], priority: 'high' },
    { week: 2, month: 10, tasks: ['교원능력개발평가 실시', '3차 수업 공개'], priority: 'high' },
    { week: 3, month: 11, tasks: ['평가 결과 처리', '연구학교 결과보고'], priority: 'high' },
    { week: 4, month: 12, tasks: ['법정연수 최종 점검', '연간 정리', '차년도 계획'], priority: 'high' },
  ],

  neisGuide: {
    frequentMenus: [
      { path: '연수관리 > 법정연수관리', description: '법정연수 이수 현황', frequency: '수시' },
      { path: '연수관리 > 교내연수관리', description: '교내연수 등록/관리', frequency: '월별' },
      { path: '교원능력개발평가', description: '평가 운영', frequency: '연 1회' },
    ],
    tipsAndTricks: [
      '법정연수 이수 현황 수시로 확인',
      '교내연수 등록 후 출석 체크',
    ],
    commonErrors: [
      { error: '법정연수 미이수', solution: '기한 전 개별 안내, 독촉' },
    ],
  },

  documentTemplates: [
    {
      name: '자율장학 계획',
      purpose: '연간 자율장학 운영 계획',
      requiredFields: ['장학 유형', '일정', '대상', '방법'],
      submissionTo: '학교 보관',
    },
    {
      name: '수업 참관록',
      purpose: '수업 공개 참관 기록',
      requiredFields: ['수업자', '일시', '참관 내용', '의견'],
      submissionTo: '학교 보관',
    },
    {
      name: '연구학교 결과보고서',
      purpose: '연구학교 운영 결과 보고',
      requiredFields: ['연구 목적', '방법', '결과', '일반화 방안'],
      submissionTo: '교육청',
    },
  ],

  relatedDuties: ['교무기획부', '교육과정부'],

  externalPartners: [
    { name: '교육연수원', contact: '시도 연수원', purpose: '연수 운영' },
    { name: '교육청 장학담당', contact: '교육청', purpose: '장학, 연구학교' },
  ],

  detailedFAQ: [
    {
      id: 'faq-research-1',
      question: '법정연수 미이수 시 어떻게 되나요?',
      answer: `
【법정연수 미이수 시 조치】

■ 미이수 결과
- 감사 지적 사항
- 관리자 책임 문제
- 개인 인사 불이익 가능성

■ 예방 조치
1. 연초 전체 안내
2. 중간 이수 현황 점검 (6월, 9월)
3. 미이수자 개별 안내
4. 기한 임박 시 강력 독촉

■ 이수 방법 안내
- 집합연수: 학교/교육청 주관
- 원격연수: 중앙교육연수원, 시도연수원
- 온라인 콘텐츠: 나이스 연계

■ 이수 확인
- 나이스 연수관리에서 확인
- 확인서 출력 보관
      `,
      category: '법정연수',
    },
  ],

  emergencyProcedures: [],

  references: [
    {
      title: '중앙교육연수원',
      url: 'https://www.neti.go.kr',
      description: '원격연수 이수'
    },
    {
      title: '시도교육연수원',
      url: '각 시도별',
      description: '지역 연수 정보'
    },
  ],

  relatedLaws: [
    {
      name: '교원 등의 연수에 관한 규정',
      article: '제2조',
      content: '교원의 연수는 교육의 이념과 교원윤리 확립 및 교육전문성 신장에 기여할 수 있도록 운영되어야 한다.',
    },
  ],
};

// ========================================
// 9. 정보부 (정보화/정보공시) - 초상세 버전
// ========================================
export const informationUltraDetailed: UltraDetailedDutyGuide = {
  id: 'information-ultra',
  name: '정보부 (정보화/정보공시)',
  shortName: '정보',
  category: 'admin',
  icon: 'Monitor',
  color: 'blue',
  difficulty: 4,

  description: '학교 정보화 업무, 정보공시, 학교 홈페이지 관리, 개인정보보호, 정보보안 등을 담당합니다.',

  detailedOverview: `
【정보부 업무 완전 가이드】

■ 부서 개요
정보부는 학교 정보화 인프라 관리와 정보공시를 담당합니다.
나이스 관리, 학교알리미 정보공시, 홈페이지 관리,
개인정보보호, 정보보안 등 정보 관련 업무를 총괄합니다.

■ 핵심 업무 영역
1. 정보공시
   - 학교알리미 정보공시 (연 4회)
   - 공시 항목별 자료 수집
   - 공시 결과 확인

2. 학교 정보화
   - 나이스 관리 (학교정보 관리)
   - 전자결재 시스템 관리
   - 정보화 기기 관리

3. 홈페이지 관리
   - 학교 홈페이지 운영
   - 콘텐츠 관리
   - 사이버 안전 관리

4. 정보보호
   - 개인정보보호
   - 정보보안
   - 사이버 침해 대응

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 3월: 1차 정보공시, 나이스 학교정보 갱신, 홈페이지 정비      │
│ 4월: 정보공시 마감, 개인정보 점검                           │
│ 5월: 2차 정보공시 준비, 정보보안 점검                       │
│ 6월: 2차 정보공시 마감                                      │
│ 9월: 3차 정보공시, 정보화기기 점검                         │
│ 10월: 3차 정보공시 마감, 정보보안 교육                     │
│ 11월: 4차 정보공시 준비, 개인정보 영향평가                 │
│ 12월: 4차 정보공시 마감, 연간 정리, 차년도 계획            │
│ 연중: 홈페이지 관리, 나이스 관리, 정보보안                 │
└─────────────────────────────────────────────────────────────┘
`,

  importance: `
【정보부 업무가 중요한 이유】

1. 법적 의무 이행
   - 정보공시 법적 의무
   - 개인정보보호법 준수
   - 정보통신망법 준수

2. 학교 투명성
   - 교육정보 공개
   - 학부모 알 권리 충족
   - 학교 신뢰도 향상

3. 정보 보호
   - 학생 개인정보 보호
   - 정보 유출 사고 예방
   - 사이버 위협 대응

4. 학교 운영 지원
   - 나이스 원활 운영
   - 정보화 환경 유지
   - 홈페이지를 통한 소통
`,

  legalBasis: [
    '교육관련기관의 정보공개에 관한 특례법',
    '개인정보 보호법',
    '정보통신망 이용촉진 및 정보보호 등에 관한 법률',
    '전자정부법',
  ],

  requiredSkills: [
    '정보공시 시스템 (학교알리미) 활용',
    '나이스 학교정보 관리',
    '홈페이지 CMS 관리',
    '개인정보보호 지식',
    '정보보안 기본 지식',
    '기본적인 IT 역량',
  ],

  recommendedTraining: [
    '정보공시 담당자 연수 (필수)',
    '개인정보보호 연수 (필수)',
    '정보보안 연수',
    '나이스 시스템 연수',
    '홈페이지 관리 연수',
  ],

  commonChallenges: [
    '정보공시 항목 수집의 어려움',
    '공시 기한 준수',
    '개인정보 관리 부담',
    '정보보안 사고 대응',
    '홈페이지 콘텐츠 업데이트',
    '나이스 오류 대응',
  ],

  challengeSolutions: {
    '자료 수집': '담당부서별 역할 분담, 사전 안내, 기한 엄수',
    '기한 준수': '공시 일정 캘린더 관리, 미리 준비',
    '개인정보': '관리대장 작성, 정기 점검, 최소 수집',
    '정보보안': '보안 수칙 준수, 정기 점검, 백업',
  },

  successTips: [
    '정보공시 일정 캘린더에 미리 표시',
    '담당부서에 자료 요청은 일찍 (1주 전)',
    '개인정보 파일 암호화 필수',
    '홈페이지 게시물 정기 점검 (개인정보 노출)',
    '나이스 오류는 에듀콜센터 적극 활용',
    '정보보안 점검일지 꼼꼼히',
    '백업은 생명 - 정기적으로',
  ],

  firstYearGuide: `
【처음 정보부 업무를 맡게 된 선생님께】

■ 가장 먼저 해야 할 것
1. 학교알리미 관리자 권한 확인
2. 나이스 학교정보 관리 권한 확인
3. 학교 홈페이지 관리자 계정 확인
4. 전년도 정보공시 현황 파악
5. 개인정보 관리대장 확인

■ 정보공시 주요 항목 (학교알리미)
- 학교 현황 (학생수, 교원수, 시설)
- 교육과정/학습 (교육과정 편성, 평가)
- 교육활동 (방과후, 돌봄, 체험학습)
- 교육여건 (급식, 보건, 도서관)
- 예산/결산

■ 공시 시기 (연 4회)
- 1차: 4월 (3월 기준)
- 2차: 6월
- 3차: 9월
- 4차: 12월
※ 정확한 기한은 매년 변경될 수 있음

■ 개인정보 관리 체크
□ 개인정보 수집 시 동의서 확보
□ 수집 목적 외 사용 금지
□ 보유기간 경과 시 파기
□ 개인정보 파일 암호화
□ 접근 권한 최소화

■ 주의사항
❌ 정보공시 기한 초과
❌ 개인정보 무단 수집/이용
❌ 개인정보 파일 암호화 미적용
❌ 홈페이지 개인정보 노출 방치
❌ 정보보안 점검 미실시
`,

  seniorAdvice: [
    '정보공시 기한 절대 놓치지 마세요. 교육청에서 독촉 옵니다.',
    '각 부서에 자료 요청은 빨리빨리. 안 그러면 내가 힘들어요.',
    '개인정보 사고 나면 정말 심각해요. 조심 또 조심.',
    '홈페이지 게시물 점검 정기적으로. 개인정보 노출 많아요.',
    '나이스 문제는 에듀콜센터 1544-0079 많이 써요.',
    '백업 꼭 해두세요. 데이터 날리면 복구 불가.',
    '정보보안 점검일지 꼼꼼히 작성해 두세요.',
  ],

  detailedTasks: [
    {
      id: 'info-1',
      task: '정보공시 (학교알리미)',
      category: 'essential',
      description: '학교알리미 정보공시 연 4회 실시',
      legalBasis: '교육관련기관의 정보공개에 관한 특례법',
      deadline: '연 4회 (4월, 6월, 9월, 12월)',
      frequency: 'quarterly',
      estimatedTime: '회당 20시간',
      procedures: [
        {
          step: 1,
          title: '공시 항목 확인',
          description: '해당 차수 공시 항목 확인',
          tips: ['학교알리미 공시 안내 확인', '변경 항목 확인'],
        },
        {
          step: 2,
          title: '자료 수집',
          description: '담당부서별 공시 자료 수집',
          tips: [
            '부서별 담당 항목 안내',
            '기한 1주 전 요청',
            '양식에 맞게 수집',
          ],
          documents: ['자료 수집 요청'],
        },
        {
          step: 3,
          title: '자료 입력',
          description: '학교알리미 시스템 입력',
          tips: ['오류 검증 실시', '이전 자료 비교 확인'],
        },
        {
          step: 4,
          title: '관리자 확인/승인',
          description: '관리자 확인 후 최종 공시',
          tips: ['관리자 결재', '공시 완료 확인'],
        },
        {
          step: 5,
          title: '결과 확인',
          description: '공시 결과 홈페이지 확인',
          tips: ['학교알리미 게시 확인', '오류 수정'],
        },
      ],
      documents: ['공시 자료'],
      checklistItems: [
        '학교 현황 공시',
        '교육과정 공시',
        '방과후/돌봄 공시',
        '급식/보건 공시',
        '예산/결산 공시',
      ],
    },
    {
      id: 'info-2',
      task: '개인정보보호 관리',
      category: 'essential',
      description: '개인정보 수집, 관리, 파기 전반 관리',
      legalBasis: '개인정보 보호법',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '월 4시간',
      procedures: [
        {
          step: 1,
          title: '개인정보 현황 파악',
          description: '학교 내 개인정보 파일 현황 파악',
          tips: ['개인정보 파일 목록', '담당자 확인', '보유 기간 확인'],
          documents: ['개인정보 관리대장'],
        },
        {
          step: 2,
          title: '개인정보 보호조치',
          description: '기술적/관리적 보호조치 실시',
          tips: [
            '파일 암호화',
            '접근권한 관리',
            '출력물 관리',
          ],
        },
        {
          step: 3,
          title: '개인정보 점검',
          description: '정기적 개인정보 관리 점검',
          tips: ['월 1회 자체점검', '홈페이지 노출 점검'],
          documents: ['점검 체크리스트'],
        },
        {
          step: 4,
          title: '개인정보 파기',
          description: '보유기간 경과 개인정보 파기',
          tips: ['파기 계획 수립', '파기 실시', '파기 기록'],
          documents: ['파기 관리대장'],
        },
      ],
      documents: ['관리대장', '점검 체크리스트', '파기 기록'],
    },
    {
      id: 'info-3',
      task: '학교 홈페이지 관리',
      category: 'important',
      description: '학교 홈페이지 운영 및 콘텐츠 관리',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '주 2시간',
      procedures: [
        {
          step: 1,
          title: '콘텐츠 업데이트',
          description: '학교 소식, 공지사항 등 게시',
          tips: ['정기적 업데이트', '정확한 정보'],
        },
        {
          step: 2,
          title: '게시물 점검',
          description: '개인정보 노출, 저작권 등 점검',
          tips: [
            '개인정보 (연락처, 주민번호 등) 노출 확인',
            '저작권 침해 여부',
            '오래된 게시물 정리',
          ],
        },
        {
          step: 3,
          title: '접근성 점검',
          description: '웹 접근성 기준 준수 점검',
          tips: ['대체 텍스트', '키보드 접근', '명도 대비'],
        },
        {
          step: 4,
          title: '보안 관리',
          description: '관리자 계정 보안, 백업',
          tips: ['비밀번호 정기 변경', '정기 백업'],
        },
      ],
    },
    {
      id: 'info-4',
      task: '정보보안 관리',
      category: 'essential',
      description: '학교 정보보안 점검 및 관리',
      deadline: '월 1회',
      frequency: 'monthly',
      estimatedTime: '월 2시간',
      procedures: [
        {
          step: 1,
          title: '정보보안 점검',
          description: '월별 정보보안 점검 실시',
          tips: [
            'PC 보안 점검 (백신, 업데이트)',
            '문서보안 점검',
            '네트워크 점검',
          ],
          documents: ['보안점검일지'],
        },
        {
          step: 2,
          title: '보안 교육',
          description: '교직원 정보보안 교육',
          tips: ['연 1회 이상', '사이버 보안 수칙'],
        },
        {
          step: 3,
          title: '침해사고 대응',
          description: '보안 사고 발생 시 대응',
          tips: ['즉시 보고', '증거 보존', '복구 조치'],
          documents: ['침해사고 보고서'],
        },
      ],
      documents: ['보안점검일지'],
    },
  ],

  weeklyWorkflow: [
    { week: 1, month: 3, tasks: ['1차 정보공시 준비', '자료 수집 요청'], priority: 'high' },
    { week: 3, month: 3, tasks: ['학교정보 갱신', '홈페이지 정비'], priority: 'medium' },
    { week: 1, month: 4, tasks: ['1차 정보공시 입력/마감'], priority: 'high' },
    { week: 2, month: 4, tasks: ['개인정보 정기점검'], priority: 'medium' },
    { week: 1, month: 5, tasks: ['2차 정보공시 준비', '정보보안 점검'], priority: 'high' },
    { week: 1, month: 6, tasks: ['2차 정보공시 마감'], priority: 'high' },
    { week: 1, month: 9, tasks: ['3차 정보공시 준비'], priority: 'high' },
    { week: 3, month: 9, tasks: ['3차 정보공시 마감', '정보화기기 점검'], priority: 'high' },
    { week: 2, month: 10, tasks: ['정보보안 교육'], priority: 'medium' },
    { week: 1, month: 11, tasks: ['4차 정보공시 준비'], priority: 'high' },
    { week: 4, month: 12, tasks: ['4차 정보공시 마감', '연간 정리'], priority: 'high' },
  ],

  neisGuide: {
    frequentMenus: [
      { path: '나이스 > 학교정보 > 기본정보관리', description: '학교 기본정보', frequency: '학기별' },
      { path: '나이스 > 학교정보 > 사용자관리', description: '사용자 권한 관리', frequency: '수시' },
    ],
    tipsAndTricks: [
      '학교정보는 학기초 반드시 확인/갱신',
      '퇴직자 계정 즉시 비활성화',
    ],
    commonErrors: [
      { error: '학교정보 미갱신', solution: '학기 초 점검 필수' },
    ],
  },

  documentTemplates: [
    {
      name: '개인정보 관리대장',
      purpose: '개인정보 파일 현황 관리',
      requiredFields: ['파일명', '담당자', '보유기간', '수집항목'],
      submissionTo: '학교 보관',
    },
    {
      name: '정보보안 점검일지',
      purpose: '월별 정보보안 점검 기록',
      requiredFields: ['점검일', '점검항목', '점검결과', '조치사항'],
      submissionTo: '학교 보관',
    },
  ],

  relatedDuties: ['교무기획부', '행정실'],

  externalPartners: [
    { name: '학교알리미', contact: 'schoolinfo.go.kr', purpose: '정보공시' },
    { name: '에듀콜센터', contact: '1544-0079', purpose: '나이스 지원' },
    { name: '교육청 정보화담당', contact: '교육청', purpose: '정보화 정책, 지원' },
  ],

  detailedFAQ: [
    {
      id: 'faq-info-1',
      question: '정보공시 기한을 놓치면 어떻게 되나요?',
      answer: `
【정보공시 기한 초과 시】

■ 발생하는 문제
- 교육청 감사 지적
- 학교평가 감점
- 관리자 책임 문제

■ 예방 방법
1. 공시 일정 캘린더에 사전 표시
2. 1주일 전 자료 수집 완료
3. 3일 전 입력 완료
4. 관리자 결재 후 공시

■ 기한 초과 시 대응
- 교육청에 사유서 제출
- 가급적 빨리 공시 완료
- 재발방지 대책

■ 공시 일정 확인
- 학교알리미 공지사항
- 교육청 공문
- 연초 공시 일정표
      `,
      category: '정보공시',
    },
  ],

  emergencyProcedures: [
    {
      situation: '개인정보 유출 사고',
      immediateActions: [
        '유출 경로 차단',
        '관리자 즉시 보고',
        '증거 보존',
        '유출 범위 파악',
      ],
      reportingChain: ['관리자', '교육청', '개인정보보호위원회'],
      documentation: ['사고 경위서', '유출 내역'],
      followUp: ['피해자 통지', '재발방지', '시스템 보완'],
    },
  ],

  references: [
    {
      title: '학교알리미',
      url: 'https://www.schoolinfo.go.kr',
      description: '정보공시 시스템'
    },
    {
      title: '개인정보보호 포털',
      url: 'https://www.privacy.go.kr',
      description: '개인정보보호 자료'
    },
  ],

  relatedLaws: [
    {
      name: '교육관련기관의 정보공개에 관한 특례법',
      article: '제5조',
      content: '학교의 장은 공시대상정보를 매년 1회 이상 공시하여야 한다.',
    },
    {
      name: '개인정보 보호법',
      article: '제29조',
      content: '개인정보처리자는 개인정보가 분실·도난·유출·위조·변조 또는 훼손되지 아니하도록 안전성 확보에 필요한 조치를 하여야 한다.',
    },
  ],
};

// ========================================
// 10. 과학부 - 초상세 버전
// ========================================
export const scienceUltraDetailed: UltraDetailedDutyGuide = {
  id: 'science-ultra',
  name: '과학부 (과학/환경)',
  shortName: '과학',
  category: 'academic',
  icon: 'Atom',
  color: 'green',
  difficulty: 3,

  description: '과학교육, 과학행사, 과학실 관리, 환경교육, 영재교육 등을 담당합니다.',

  detailedOverview: `
【과학부 업무 완전 가이드】

■ 부서 개요
과학부는 과학교육의 활성화와 환경교육을 담당합니다.
과학실 관리, 과학 행사, 영재교육, 환경교육 등을 운영합니다.

■ 핵심 업무 영역
1. 과학교육
   - 과학교육 계획
   - 과학실 관리
   - 실험 지원

2. 과학행사
   - 과학의 달 행사 (4월)
   - 과학경진대회 참가
   - 발명대회

3. 영재교육
   - 영재학급/영재교육원 선발 지원
   - 영재교육 추천

4. 환경교육
   - 환경교육 계획
   - 환경의 날 행사
   - 생태체험

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 3월: 과학교육 계획, 과학실 정비, 영재 선발 지원             │
│ 4월: 과학의 달 행사, 과학경진대회                            │
│ 5월: 발명대회, 환경의 날 준비                                │
│ 6월: 환경의 날 행사, 과학실 안전점검                        │
│ 9월: 2학기 과학교육, 과학행사                                │
│ 10월: 과학경진대회 (2학기), 발명대회                        │
│ 11월: 영재교육 선발, 차년도 계획                            │
│ 12월: 연간 정리, 과학실 정리                                 │
└─────────────────────────────────────────────────────────────┘
`,

  importance: `
【과학부 업무가 중요한 이유】

1. 과학교육 활성화
   - 탐구력, 창의력 신장
   - STEAM 교육 연계
   - 미래 인재 양성

2. 안전 관리
   - 과학실 안전
   - 실험 안전 지도
   - 화학약품 관리

3. 환경 의식 함양
   - 지속가능발전교육
   - 생태감수성
   - 환경 실천

4. 영재교육 연계
   - 영재학생 발굴
   - 재능 계발 기회
`,

  legalBasis: [
    '과학교육진흥법',
    '영재교육진흥법',
    '환경교육진흥법',
    '실험실 안전환경 조성에 관한 법률',
  ],

  requiredSkills: [
    '과학 교과 지도',
    '실험 지도 및 안전관리',
    '과학행사 기획',
    '영재교육 이해',
    '환경교육 기획',
    '과학실 관리',
  ],

  recommendedTraining: [
    '과학실험안전 연수',
    '영재교육 담당자 연수',
    '환경교육 연수',
    '발명교육 연수',
  ],

  commonChallenges: [
    '과학실 안전 관리',
    '실험 준비 시간 부족',
    '과학행사 참여 저조',
    '영재교육 선발 절차',
    '환경교육 시간 확보',
  ],

  challengeSolutions: {
    '과학실 안전': '안전 수칙 게시, 정기 점검, 안전교육',
    '실험 준비': '실험 도우미 활용, 키트 활용',
    '행사 참여': '흥미로운 프로그램, 참여 인센티브',
    '영재 선발': '교육청 안내 숙지, 담임 협조',
  },

  successTips: [
    '과학실 안전 점검 월 1회 필수',
    '화학약품 관리대장 철저',
    '과학의 달 행사는 미리 계획',
    '영재 선발 일정 미리 안내',
    '환경교육은 교과 연계로',
  ],

  firstYearGuide: `
【처음 과학부 업무를 맡게 된 선생님께】

■ 가장 먼저 해야 할 것
1. 과학실 현황 파악 (기자재, 약품)
2. 안전장비 확인 (소화기, 세안기, 샤워기)
3. 화학약품 관리대장 확인
4. 영재교육 선발 일정 확인

■ 과학실 안전관리
- MSDS (물질안전보건자료) 비치
- 안전 수칙 게시
- 소화기, 모래 비치
- 환기 시설 점검
- 화학약품 잠금 보관

■ 과학의 달 행사 (4월)
- 과학퀴즈대회
- 과학실험대회
- 과학상상화그리기
- 과학탐구대회
- 발명품경진대회

■ 영재교육 선발 (일반적 절차)
1. 담임 추천
2. 영재성검사
3. 선발위원회 심사
4. 최종 선발
※ 교육청별 상이

■ 주의사항
❌ 화학약품 방치
❌ 안전장비 미비
❌ 실험 시 학생 방치
❌ 영재 선발 기한 초과
`,

  seniorAdvice: [
    '과학실 안전이 제일 중요해요. 사고 나면 큰일.',
    '화학약품 관리대장 꼭 작성하세요.',
    '과학의 달 행사 4월이라 3월부터 준비하세요.',
    '영재 선발 일정 잘 체크하세요. 늦으면 기회 놓쳐요.',
    '실험 수업 안 하는 선생님도 많아요. 권장해 주세요.',
  ],

  detailedTasks: [
    {
      id: 'science-1',
      task: '과학실 관리',
      category: 'essential',
      description: '과학실 관리, 기자재 관리, 안전관리',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '월 4시간',
      procedures: [
        {
          step: 1,
          title: '과학실 안전점검',
          description: '월별 과학실 안전점검',
          tips: ['안전장비 점검', '환기 상태', '전기/가스 점검'],
          documents: ['안전점검일지'],
        },
        {
          step: 2,
          title: '기자재 관리',
          description: '과학 기자재 재고 관리, 구입',
          tips: ['재고 현황 파악', '필요 기자재 신청', '파손품 정리'],
          documents: ['기자재 대장'],
        },
        {
          step: 3,
          title: '화학약품 관리',
          description: '화학약품 보관, 폐기 관리',
          tips: [
            '약품 잠금 보관',
            'MSDS 비치',
            '유효기간 확인',
            '폐기 절차 준수',
          ],
          documents: ['약품 관리대장'],
        },
      ],
      checklistItems: [
        '소화기 위치/상태',
        '세안기/샤워기 작동',
        '환기 시설',
        '전기 안전',
        '가스 안전',
        '약품 보관 상태',
      ],
    },
    {
      id: 'science-2',
      task: '과학행사 운영',
      category: 'important',
      description: '과학의 달 행사, 과학경진대회 운영',
      deadline: '4월 (과학의 달), 연중',
      frequency: 'annual',
      estimatedTime: '연간 30시간',
      procedures: [
        {
          step: 1,
          title: '행사 계획',
          description: '과학의 달 행사 계획 수립',
          tips: ['행사 종목 선정', '일정 계획', '예산 확보'],
          documents: ['행사 계획'],
        },
        {
          step: 2,
          title: '행사 안내',
          description: '학생/학부모 행사 안내',
          tips: ['참가 신청', '준비물 안내'],
          documents: ['행사 안내문'],
        },
        {
          step: 3,
          title: '행사 진행',
          description: '행사 진행 및 심사',
          tips: ['심사위원 구성', '공정한 심사', '사진 촬영'],
        },
        {
          step: 4,
          title: '결과 처리',
          description: '시상, 결과 보고',
          tips: ['시상식', '우수작 전시'],
          documents: ['결과 보고'],
        },
      ],
    },
    {
      id: 'science-3',
      task: '영재교육 선발 지원',
      category: 'important',
      description: '영재학급/영재교육원 선발 지원',
      deadline: '11-12월 (선발 시기)',
      frequency: 'annual',
      estimatedTime: '10시간',
      procedures: [
        {
          step: 1,
          title: '선발 안내',
          description: '영재교육 선발 일정/절차 안내',
          tips: ['교육청 공문 확인', '담임 안내', '학부모 안내'],
          documents: ['선발 안내문'],
        },
        {
          step: 2,
          title: '추천 접수',
          description: '담임/교과 교사 추천서 접수',
          tips: ['추천 기준 안내', '서류 확인'],
          documents: ['추천서'],
        },
        {
          step: 3,
          title: '선발 지원',
          description: '영재성검사, 면접 등 지원',
          tips: ['일정 안내', '준비물 안내'],
        },
        {
          step: 4,
          title: '결과 처리',
          description: '선발 결과 안내',
          tips: ['합격자 안내', '등록 안내'],
        },
      ],
    },
    {
      id: 'science-4',
      task: '환경교육 운영',
      category: 'important',
      description: '환경교육 계획 및 환경행사 운영',
      deadline: '연중 (6월 환경의 날)',
      frequency: 'ongoing',
      estimatedTime: '월 2시간',
      procedures: [
        {
          step: 1,
          title: '환경교육 계획',
          description: '연간 환경교육 계획 수립',
          tips: ['교과 연계', '체험활동 계획'],
          documents: ['환경교육 계획'],
        },
        {
          step: 2,
          title: '환경의 날 행사',
          description: '6월 5일 환경의 날 행사',
          tips: ['캠페인', '환경 퀴즈', '분리수거 교육'],
        },
        {
          step: 3,
          title: '생태체험',
          description: '생태체험학습 운영',
          tips: ['학교 텃밭', '생태공원 체험'],
        },
      ],
    },
  ],

  weeklyWorkflow: [
    { week: 1, month: 3, tasks: ['과학교육 계획', '과학실 정비'], priority: 'high' },
    { week: 2, month: 3, tasks: ['과학의 달 행사 계획', '영재 선발 안내'], priority: 'high' },
    { week: 1, month: 4, tasks: ['과학의 달 행사', '과학경진대회'], priority: 'high' },
    { week: 3, month: 5, tasks: ['발명대회', '환경의 날 준비'], priority: 'medium' },
    { week: 1, month: 6, tasks: ['환경의 날 행사', '과학실 안전점검'], priority: 'medium' },
    { week: 1, month: 11, tasks: ['영재교육 선발', '차년도 계획'], priority: 'high' },
    { week: 4, month: 12, tasks: ['연간 정리', '과학실 정리'], priority: 'medium' },
  ],

  neisGuide: {
    frequentMenus: [],
    tipsAndTricks: [],
    commonErrors: [],
  },

  documentTemplates: [
    {
      name: '과학실 안전점검일지',
      purpose: '과학실 안전점검 기록',
      requiredFields: ['점검일', '점검항목', '점검결과', '조치사항'],
      submissionTo: '학교 보관',
    },
    {
      name: '화학약품 관리대장',
      purpose: '화학약품 입출고 관리',
      requiredFields: ['약품명', '수량', '입고일', '출고일', '사용자'],
      submissionTo: '학교 보관',
    },
  ],

  relatedDuties: ['교무기획부', '안전부'],

  externalPartners: [
    { name: '과학교육원', contact: '시도 과학교육원', purpose: '과학행사, 영재교육' },
    { name: '발명교육센터', contact: '지역센터', purpose: '발명교육' },
  ],

  detailedFAQ: [],

  emergencyProcedures: [
    {
      situation: '과학실험 중 사고 (화상, 베임 등)',
      immediateActions: [
        '실험 즉시 중단',
        '응급처치 실시',
        '필요시 119/보건실',
        '학부모 연락',
      ],
      reportingChain: ['보건교사', '관리자', '학부모'],
      documentation: ['사고 경위서'],
      followUp: ['원인 분석', '재발방지'],
    },
    {
      situation: '화학약품 누출',
      immediateActions: [
        '학생 대피',
        '환기',
        '누출 차단 (가능시)',
        '전문가 연락',
      ],
      reportingChain: ['관리자', '교육청', '119'],
      documentation: ['사고 보고서'],
      followUp: ['안전 점검', '약품 관리 강화'],
    },
  ],

  references: [
    {
      title: '과학교육원',
      url: '각 시도별',
      description: '과학교육 자료, 행사'
    },
  ],

  relatedLaws: [
    {
      name: '과학교육진흥법',
      article: '제5조',
      content: '국가와 지방자치단체는 과학교육의 진흥을 위한 시책을 수립·시행하여야 한다.',
    },
  ],
};

// ========================================
// 11. 체육부 - 초상세 버전
// ========================================
export const physicalEducationUltraDetailed: UltraDetailedDutyGuide = {
  id: 'physical-education-ultra',
  name: '체육부',
  shortName: '체육',
  category: 'academic',
  icon: 'Medal',
  color: 'orange',
  difficulty: 3,

  description: '체육교육, 체육행사, 학교스포츠클럽, 건강체력평가, 체육시설 관리 등을 담당합니다.',

  detailedOverview: `
【체육부 업무 완전 가이드】

■ 부서 개요
체육부는 학생들의 신체 발달과 체력 증진을 담당합니다.
체육교육, 운동회/체육대회, 학교스포츠클럽, PAPS 등을 운영합니다.

■ 핵심 업무 영역
1. 체육교육
   - 체육교육과정 운영
   - 수영교육 (의무)
   - 체육수업 지원

2. 체육행사
   - 운동회/체육대회
   - 학년별 체육대회
   - 각종 대회 참가

3. 학교스포츠클럽
   - 스포츠클럽 개설/운영
   - 대회 참가

4. 건강체력평가
   - PAPS 실시 (5-6학년)
   - 결과 관리

■ 연간 업무 흐름
┌─────────────────────────────────────────────────────────────┐
│ 3월: 체육교육 계획, 학교스포츠클럽 개설                      │
│ 4월: PAPS 실시, 스포츠클럽 활동                             │
│ 5월: 운동회/체육대회 준비, 수영교육                         │
│ 6월: 수영교육, PAPS 결과 입력                               │
│ 9월: 2학기 체육활동, 대회 참가                              │
│ 10월: 체육행사, 스포츠클럽 리그전                           │
│ 11월: 체육시설 점검, 차년도 계획                            │
│ 12월: 연간 정리, 스포츠클럽 정리                            │
└─────────────────────────────────────────────────────────────┘
`,

  importance: `
【체육부 업무가 중요한 이유】

1. 학생 건강 증진
   - 체력 향상
   - 비만 예방
   - 건강한 생활습관

2. 전인교육 실현
   - 신체 발달
   - 협동심, 페어플레이
   - 스트레스 해소

3. 안전 관리
   - 체육활동 안전
   - 시설 안전
   - 응급상황 대비

4. 법적 의무 이행
   - 수영교육 의무화
   - PAPS 실시
   - 학교스포츠클럽 운영
`,

  legalBasis: [
    '학교체육진흥법',
    '학교체육진흥법 시행령',
  ],

  requiredSkills: [
    '체육 교과 이해',
    '체육행사 기획 운영',
    '스포츠클럽 운영',
    'PAPS 측정 및 입력',
    '체육시설 관리',
    '안전관리',
  ],

  recommendedTraining: [
    '학교체육 담당자 연수',
    '생존수영 지도 연수',
    'PAPS 연수',
    '스포츠클럽 운영 연수',
  ],

  commonChallenges: [
    '운동회/체육대회 날씨',
    '체육시설 부족',
    '수영장 확보',
    'PAPS 측정 시간 확보',
    '스포츠클럽 강사 확보',
  ],

  challengeSolutions: {
    '날씨': '대체 일정 마련, 실내 경기 준비',
    '시설 부족': '운동장 효율적 활용, 지역시설 활용',
    '수영장': '지역 수영장 연계, 찾아가는 수영교육',
    'PAPS': '체육시간 활용, 학년별 일정 조율',
  },

  successTips: [
    '운동회는 우천 대비 꼭 계획',
    '안전사고 예방이 최우선',
    'PAPS는 체육시간 활용',
    '스포츠클럽은 학생 수요 반영',
    '체육시설 안전점검 정기적으로',
  ],

  firstYearGuide: `
【처음 체육부 업무를 맡게 된 선생님께】

■ 가장 먼저 해야 할 것
1. 체육시설 현황 파악
2. 운동회/체육대회 일정 확인
3. 학교스포츠클럽 현황 파악
4. PAPS 실시 계획 확인
5. 수영교육 계획 확인

■ PAPS (학생건강체력평가)
- 대상: 5-6학년 (초등), 전학년 (중고등)
- 측정 항목:
  - 심폐지구력 (왕복오래달리기/스텝검사)
  - 유연성 (앉아윗몸앞으로굽히기)
  - 근력·근지구력 (윗몸말아올리기/악력)
  - 순발력 (50m달리기)
  - BMI
- 결과: 나이스 입력 → 학부모 통보

■ 학교스포츠클럽
- 종목: 축구, 농구, 배드민턴, 줄넘기 등
- 운영: 점심/방과후 시간
- 대회: 학교스포츠클럽대회 참가

■ 수영교육 (생존수영)
- 대상: 초등 전학년 (권장)
- 시간: 학년당 10시간 이상
- 내용: 생존수영, 물 적응, 안전교육

■ 주의사항
❌ 체육활동 중 안전사고 방치
❌ PAPS 미실시/미입력
❌ 체육시설 안전점검 미실시
`,

  seniorAdvice: [
    '운동회 날씨 체크 잘하세요. 우천 시 대책 필수.',
    '안전사고 정말 많아요. 예방이 최선.',
    'PAPS 미리미리 해두세요. 밀리면 힘들어요.',
    '스포츠클럽 학생들이 좋아해요. 잘 운영하면 보람.',
    '수영교육 수영장 섭외 빨리 하세요. 경쟁 치열.',
  ],

  detailedTasks: [
    {
      id: 'pe-1',
      task: 'PAPS (학생건강체력평가) 실시',
      category: 'essential',
      description: 'PAPS 측정 및 결과 입력',
      legalBasis: '학교체육진흥법',
      deadline: '4-6월',
      frequency: 'annual',
      estimatedTime: '20시간',
      procedures: [
        {
          step: 1,
          title: 'PAPS 계획',
          description: '측정 일정, 담당자 계획',
          tips: ['체육시간 활용', '학년별 일정'],
          documents: ['PAPS 계획'],
        },
        {
          step: 2,
          title: '측정 실시',
          description: '종목별 체력 측정',
          tips: ['사전 준비운동', '안전 주의', '정확한 측정'],
        },
        {
          step: 3,
          title: '결과 입력',
          description: '나이스 PAPS 결과 입력',
          neisPath: '학생체력 > PAPS관리 > 결과입력',
          tips: ['측정 후 1주 이내 입력'],
        },
        {
          step: 4,
          title: '결과 통보',
          description: '학생/학부모 결과 통보',
          tips: ['체력 향상 방안 안내'],
          documents: ['결과 통보서'],
        },
      ],
      neisMenus: ['학생체력-PAPS관리-결과입력'],
    },
    {
      id: 'pe-2',
      task: '운동회/체육대회 운영',
      category: 'important',
      description: '운동회, 체육대회 기획 및 운영',
      deadline: '5월, 10월 (학교별)',
      frequency: 'annual',
      estimatedTime: '50시간',
      procedures: [
        {
          step: 1,
          title: '행사 계획',
          description: '운동회/체육대회 계획 수립',
          tips: ['일정, 종목, 진행 순서', '우천 대책', '안전 계획'],
          documents: ['행사 계획서'],
        },
        {
          step: 2,
          title: '사전 준비',
          description: '종목 연습, 물품 준비',
          tips: ['학년별 연습', '물품 점검', '음향 시설'],
        },
        {
          step: 3,
          title: '행사 진행',
          description: '당일 행사 진행',
          tips: ['진행 요원 배치', '안전 관리', '응급 대비'],
        },
        {
          step: 4,
          title: '정리 및 시상',
          description: '시상, 결과 정리',
          tips: ['시상식', '사진 정리', '결과 보고'],
        },
      ],
    },
    {
      id: 'pe-3',
      task: '학교스포츠클럽 운영',
      category: 'important',
      description: '학교스포츠클럽 개설 및 운영',
      deadline: '연중',
      frequency: 'ongoing',
      estimatedTime: '주 3시간',
      procedures: [
        {
          step: 1,
          title: '스포츠클럽 계획',
          description: '클럽 개설, 지도자 배치',
          tips: ['학생 수요 조사', '종목 선정', '지도자 확보'],
          documents: ['스포츠클럽 계획'],
        },
        {
          step: 2,
          title: '클럽 운영',
          description: '점심/방과후 클럽 활동',
          tips: ['출석 관리', '안전 관리', '지도자 지원'],
        },
        {
          step: 3,
          title: '대회 참가',
          description: '학교스포츠클럽대회 참가',
          tips: ['대회 일정 확인', '참가 신청', '인솔'],
        },
        {
          step: 4,
          title: '결과 정리',
          description: '활동 기록, 결과 보고',
          documents: ['활동 결과'],
        },
      ],
    },
    {
      id: 'pe-4',
      task: '수영교육 운영',
      category: 'essential',
      description: '생존수영 교육 계획 및 운영',
      legalBasis: '학교체육진흥법',
      deadline: '5-7월',
      frequency: 'annual',
      estimatedTime: '30시간',
      procedures: [
        {
          step: 1,
          title: '수영교육 계획',
          description: '수영장 섭외, 일정 계획',
          tips: ['수영장 사전 답사', '버스 계약', '안전 계획'],
          documents: ['수영교육 계획'],
        },
        {
          step: 2,
          title: '사전 교육',
          description: '학생/학부모 안내, 사전 교육',
          tips: ['준비물 안내', '안전 교육', '동의서 수령'],
          documents: ['안내문', '동의서'],
        },
        {
          step: 3,
          title: '수영교육 실시',
          description: '수영장에서 생존수영 교육',
          tips: ['인솔교사 배치', '안전 관리', '응급 대비'],
        },
        {
          step: 4,
          title: '결과 정리',
          description: '이수 현황, 결과 보고',
          documents: ['이수 현황'],
        },
      ],
    },
  ],

  weeklyWorkflow: [
    { week: 1, month: 3, tasks: ['체육교육 계획', '스포츠클럽 개설'], priority: 'high' },
    { week: 2, month: 4, tasks: ['PAPS 준비', '스포츠클럽 활동 시작'], priority: 'high' },
    { week: 3, month: 4, tasks: ['PAPS 측정'], priority: 'high' },
    { week: 1, month: 5, tasks: ['운동회 준비', '수영교육 시작'], priority: 'high' },
    { week: 2, month: 5, tasks: ['운동회 실시'], priority: 'high' },
    { week: 1, month: 6, tasks: ['PAPS 결과 입력', '수영교육'], priority: 'high' },
    { week: 1, month: 10, tasks: ['체육대회', '스포츠클럽 리그전'], priority: 'high' },
    { week: 4, month: 12, tasks: ['연간 정리', '스포츠클럽 정리'], priority: 'medium' },
  ],

  neisGuide: {
    frequentMenus: [
      { path: '학생체력 > PAPS관리 > 결과입력', description: 'PAPS 결과 입력', frequency: '연 1회' },
      { path: '학생체력 > 학교스포츠클럽 > 클럽관리', description: '스포츠클럽 관리', frequency: '수시' },
    ],
    tipsAndTricks: [
      'PAPS 결과는 측정 후 바로 입력',
      '스포츠클럽 활동 기록 정기적 업데이트',
    ],
    commonErrors: [
      { error: 'PAPS 미입력', solution: '측정 후 1주 이내 입력' },
    ],
  },

  documentTemplates: [
    {
      name: '운동회 계획서',
      purpose: '운동회 운영 계획',
      requiredFields: ['일시', '장소', '종목', '진행표', '안전계획'],
      submissionTo: '학교 보관',
    },
    {
      name: '수영교육 계획',
      purpose: '생존수영 교육 계획',
      requiredFields: ['일정', '장소', '대상', '안전계획'],
      submissionTo: '학교 보관',
    },
  ],

  relatedDuties: ['교무기획부', '안전부'],

  externalPartners: [
    { name: '체육회', contact: '지역 체육회', purpose: '대회, 행사' },
    { name: '수영장', contact: '지역 수영장', purpose: '수영교육' },
  ],

  detailedFAQ: [],

  emergencyProcedures: [
    {
      situation: '체육활동 중 부상',
      immediateActions: [
        '활동 중단',
        '응급처치',
        '필요시 119/보건실',
        '학부모 연락',
      ],
      reportingChain: ['보건교사', '관리자', '학부모'],
      documentation: ['사고 경위서'],
      followUp: ['공제회 처리', '재발방지'],
    },
  ],

  references: [
    {
      title: '학교체육진흥회',
      url: 'https://www.kospo.or.kr',
      description: '학교체육 정보'
    },
  ],

  relatedLaws: [
    {
      name: '학교체육진흥법',
      article: '제10조',
      content: '학교의 장은 학생의 체력증진을 위하여 학생건강체력평가를 실시하여야 한다.',
    },
  ],
};

export const ultraDetailedDutiesPart5 = [researchUltraDetailed, informationUltraDetailed, scienceUltraDetailed, physicalEducationUltraDetailed];
