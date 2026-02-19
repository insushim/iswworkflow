// 초등교사 업무분장 종합 지식베이스
// 교육부, 시도교육청, 학교 매뉴얼, 교사 커뮤니티 교차검증 기반
// AI 챗봇이 업무 질문에 정확하게 답변할 수 있도록 구조화

import { ENHANCED_TEACHER_DB } from './teacher-enhanced-db';

export interface DutyKnowledge {
  id: string;
  name: string;
  shortName: string;
  description: string;
  legalBasis: LegalBasis[];
  annualWorkflow: MonthlyTask[];
  detailedProcedures: Procedure[];
  neisGuide: NeisGuide;
  documents: Document[];
  relatedAgencies: Agency[];
  budgetInfo: BudgetInfo;
  commonProblems: Problem[];
  practicalTips: string[];
  faq: FAQ[];
  references: Reference[];
}

export interface LegalBasis {
  law: string;
  article: string;
  content: string;
}

export interface MonthlyTask {
  month: number;
  tasks: string[];
  deadline?: string;
  importance: 'critical' | 'high' | 'medium' | 'low';
}

export interface Procedure {
  name: string;
  steps: Step[];
  duration?: string;
  requiredDocuments?: string[];
  cautions?: string[];
}

export interface Step {
  order: number;
  action: string;
  detail: string;
  responsible?: string;
  deadline?: string;
}

export interface NeisGuide {
  menuPath: string[];
  inputFields: InputField[];
  tips: string[];
  commonErrors: string[];
}

export interface InputField {
  name: string;
  description: string;
  required: boolean;
  example?: string;
}

export interface Document {
  name: string;
  purpose: string;
  format: string;
  retentionPeriod: string;
}

export interface Agency {
  name: string;
  role: string;
  contact?: string;
  website?: string;
}

export interface BudgetInfo {
  items: BudgetItem[];
  source: string;
  tips: string[];
}

export interface BudgetItem {
  name: string;
  description: string;
  approxAmount?: string;
}

export interface Problem {
  situation: string;
  cause: string;
  solution: string;
  prevention: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface Reference {
  title: string;
  source: string;
  url?: string;
  year: number;
}

// ========================================
// 1. 교무기획부 지식베이스
// ========================================
export const academicAffairsKnowledge: DutyKnowledge = {
  id: 'academic-affairs',
  name: '교무기획부',
  shortName: '교무',
  description: '학사일정, 교육과정, 수업시수, 학적관리 등 학교 교육활동의 핵심 업무를 총괄하는 부서',

  legalBasis: [
    {
      law: '초·중등교육법',
      article: '제23조',
      content: '학교는 교육과정을 운영하여야 한다'
    },
    {
      law: '초·중등교육법 시행령',
      article: '제25조',
      content: '학교생활기록의 작성 및 관리'
    },
    {
      law: '2022 개정 교육과정',
      article: '교육부 고시',
      content: '초1~2 2024년, 초3~4 2025년 시행'
    },
    {
      law: '학교생활기록 작성 및 관리지침',
      article: '교육부 훈령 제504호',
      content: '2024.12.23 개정, 생기부 작성 기준'
    }
  ],

  annualWorkflow: [
    {
      month: 1,
      tasks: [
        '예비소집일 운영 및 신입생 배정',
        '취학통지서 발급 (정부24 온라인 가능)',
        '학급편성 준비',
        '차년도 학사일정 초안 작성'
      ],
      importance: 'critical'
    },
    {
      month: 2,
      tasks: [
        '졸업식 준비 및 시행',
        '졸업대장 확정 (영구보존 문서)',
        '학급편성 완료',
        '담임배정',
        '교육과정 확정',
        '새학년 업무분장 확정',
        'NEIS 학년도 전환 준비'
      ],
      importance: 'critical'
    },
    {
      month: 3,
      tasks: [
        '입학식 준비 및 시행',
        '학사일정 최종 확정 (교직원협의회, 학운위 심의)',
        '학적 정리 (신입생 등록, 전입생 처리)',
        '교육과정 운영 시작',
        '수업일수 확보 계획 (연간 190일 이상)',
        '입학초기적응활동 운영 (초1, 34시간)'
      ],
      importance: 'critical'
    },
    {
      month: 4,
      tasks: [
        '학적 변동 처리 (전입/전출)',
        '교육과정 운영 점검',
        '학부모 총회 준비'
      ],
      importance: 'high'
    },
    {
      month: 5,
      tasks: [
        '학적 변동 처리',
        '수업시수 이행 점검'
      ],
      importance: 'medium'
    },
    {
      month: 6,
      tasks: [
        '1학기 학적 정리',
        '교육과정 운영 평가',
        '정보공시 준비'
      ],
      importance: 'high'
    },
    {
      month: 7,
      tasks: [
        '1학기 종업식',
        '1학기 학교생활기록부 마감',
        '방학 중 학적 처리 계획'
      ],
      importance: 'high'
    },
    {
      month: 8,
      tasks: [
        '2학기 준비',
        '신규 교사 업무 연수',
        '2학기 교육과정 점검'
      ],
      importance: 'high'
    },
    {
      month: 9,
      tasks: [
        '2학기 시작',
        '학적 변동 처리',
        '교육과정 운영 점검'
      ],
      importance: 'high'
    },
    {
      month: 10,
      tasks: [
        '학적 변동 처리',
        '교원능력개발평가 시작'
      ],
      importance: 'medium'
    },
    {
      month: 11,
      tasks: [
        '차년도 학사일정 기초 계획',
        '학적 정리'
      ],
      importance: 'medium'
    },
    {
      month: 12,
      tasks: [
        '학년말 정리',
        '졸업/종업 준비',
        '학교생활기록부 최종 마감',
        '차년도 교육과정 편성 시작',
        '차년도 학급 편성 준비'
      ],
      importance: 'critical'
    }
  ],

  detailedProcedures: [
    {
      name: '전입 처리',
      steps: [
        { order: 1, action: '학부모 방문', detail: '전출학교 발급 전학서류(학교생활기록부, 건강기록부 등) 확인', responsible: '교무부장/담당자' },
        { order: 2, action: 'NEIS 전입 승인', detail: 'NEIS > 학적 > 전입학관리에서 전입 신청 승인', responsible: '교무담당자' },
        { order: 3, action: '학급 배정', detail: '학년별 학생 수 균형 고려하여 학급 배정', responsible: '교무부장' },
        { order: 4, action: '학생 정보 확인', detail: '특수교육대상, 알레르기, 건강상태 등 확인', responsible: '담임교사' },
        { order: 5, action: '오리엔테이션', detail: '학교 안내, 급식 신청, 돌봄 신청 등 안내', responsible: '담임교사' }
      ],
      duration: '1~2일',
      requiredDocuments: ['전학서류 일체', '주민등록등본', '예방접종증명서'],
      cautions: ['14일 이내 처리 필수', '특수교육대상자는 특수교사와 사전 협의']
    },
    {
      name: '전출 처리',
      steps: [
        { order: 1, action: '학부모 신청', detail: '전출 신청서 접수 (전입학교 정보 확인)', responsible: '교무담당자' },
        { order: 2, action: 'NEIS 전출 신청', detail: 'NEIS > 학적 > 전입학관리에서 전출 신청', responsible: '교무담당자' },
        { order: 3, action: '서류 준비', detail: '학교생활기록부, 건강기록부 출력 및 원본대조필', responsible: '교무담당자' },
        { order: 4, action: '전입학교 승인 확인', detail: '전입학교에서 승인하면 학적 이관 완료', responsible: '교무담당자' },
        { order: 5, action: '도서 반납 등 확인', detail: '급식비, 도서 반납, 개인 물품 확인', responsible: '담임교사' }
      ],
      duration: '1~3일',
      requiredDocuments: ['전출 신청서', '학교생활기록부', '건강기록부'],
      cautions: ['미반납 도서 확인', '급식비 정산', '전입학교에서 승인해야 완료']
    },
    {
      name: '졸업대장 작성',
      steps: [
        { order: 1, action: '졸업 대상자 확인', detail: '수업일수 충족, 결격사유 확인', responsible: '교무담당자' },
        { order: 2, action: 'NEIS 졸업대장 작성', detail: 'NEIS > 학적 > 졸업대장관리에서 졸업 정보 입력', responsible: '교무담당자' },
        { order: 3, action: '졸업번호 부여', detail: '연도별 일련번호 자동 부여', responsible: 'NEIS 자동' },
        { order: 4, action: '교장 결재', detail: '졸업대장 최종 확인 후 결재', responsible: '교장' },
        { order: 5, action: '졸업장 출력', detail: '졸업장 출력 및 배부', responsible: '교무담당자' }
      ],
      duration: '졸업식 1주일 전 완료',
      requiredDocuments: ['졸업대장', '졸업장'],
      cautions: ['졸업대장은 영구보존 문서', '오기재 시 정정 절차 복잡', '졸업 후에도 수정 가능하나 교육청 협의 필요']
    }
  ],

  neisGuide: {
    menuPath: [
      'NEIS > 학적 > 전입학관리',
      'NEIS > 학적 > 졸업대장관리',
      'NEIS > 학적 > 학생증발급관리',
      'NEIS > 학적 > 학적기본관리'
    ],
    inputFields: [
      { name: '학생 기본정보', description: '성명, 생년월일, 성별, 주소 등', required: true, example: '홍길동, 2016.03.15, 남' },
      { name: '학부모 정보', description: '보호자 성명, 연락처, 관계', required: true, example: '홍아버지, 010-1234-5678, 부' },
      { name: '전출입 정보', description: '전출입일자, 전출입사유, 전출입학교', required: true, example: '2024.04.01, 주소이전, ○○초등학교' }
    ],
    tips: [
      '학적 변동은 발생 즉시 NEIS 처리 (미처리 시 상급학교 진학 차질)',
      '학기말/학년말에는 NEIS 접속자 폭주로 느려짐 - 미리 처리',
      '졸업대장 오류 시 교육청 NEIS 담당자 문의',
      '학년 전환 전 반드시 학적 자료 점검'
    ],
    commonErrors: [
      '전입 신청 후 전입학교에서 미승인 → 전입학교에 연락하여 승인 요청',
      '학생 정보 불일치 → 주민등록등본 확인 후 정정',
      '졸업대장 번호 오류 → 교육청 NEIS 담당자에게 수정 요청'
    ]
  },

  documents: [
    { name: '학사일정표', purpose: '연간 학교 일정 안내', format: '한글/엑셀', retentionPeriod: '5년' },
    { name: '교육과정 편성서', purpose: '학년별 교과 시수 및 창체 편성', format: '한글', retentionPeriod: '10년' },
    { name: '전입학 신청서', purpose: '학생 전입 시 작성', format: '한글', retentionPeriod: '5년' },
    { name: '학급편성표', purpose: '학년별 학급 구성 현황', format: '엑셀', retentionPeriod: '5년' },
    { name: '졸업대장', purpose: '졸업생 영구 기록', format: 'NEIS', retentionPeriod: '영구' },
    { name: '학교생활기록부', purpose: '학생 종합 기록', format: 'NEIS', retentionPeriod: '졸업 후 5년 (보존문서)' }
  ],

  relatedAgencies: [
    { name: '교육지원청 초등교육과', role: '학사일정 협의, 학적 관련 지침', contact: '교육지원청 대표번호' },
    { name: '시도교육청 초등교육과', role: '교육과정 편성 지침', website: 'www.시도교육청.go.kr' },
    { name: '교육부', role: '교육과정 및 학생부 관련 법령', website: 'www.moe.go.kr' }
  ],

  budgetInfo: {
    items: [
      { name: '교무업무추진비', description: '교무 관련 기본 운영비', approxAmount: '학교규모별 차등' },
      { name: '학교운영비', description: '학사 운영 관련 경비', approxAmount: '학교규모별 차등' }
    ],
    source: '학교회계 (기본운영비)',
    tips: [
      '학사일정 관련 행사비는 연초 예산 편성 시 반영',
      '졸업식/입학식 행사비 별도 편성 필요'
    ]
  },

  commonProblems: [
    {
      situation: '학기 중 전입생 급증',
      cause: '신축 아파트 입주 등 지역 인구 유입',
      solution: '과밀학급 해소를 위해 교육청에 학급 증설 요청',
      prevention: '지역 개발 동향 파악하여 사전 대비'
    },
    {
      situation: 'NEIS 학적 오류',
      cause: '학생 정보 입력 오류, 전출입 처리 누락',
      solution: '교육청 NEIS 담당자에게 수정 요청',
      prevention: '학적 변동 발생 즉시 처리, 정기 점검'
    },
    {
      situation: '수업일수 미달',
      cause: '태풍, 코로나 등 휴업일 증가',
      solution: '토요 수업, 단축수업 조정 등으로 수업일수 확보',
      prevention: '여유 수업일수 확보하여 학사일정 편성'
    }
  ],

  practicalTips: [
    '학사일정은 교육청 주요 일정(지필평가 기간, 현장체험학습 금지 기간 등)을 먼저 확인 후 편성',
    '전입생 첫날은 담임교사가 학교 안내, 친구 소개 등 적응 지원',
    '졸업대장 작성 전 학생 성명, 생년월일, 보호자 정보 정확성 반드시 확인',
    '교육과정 시수 증감(20%)은 학교 교육과정위원회 심의 필수',
    '2022 개정 교육과정 적용 학년 확인 (2024: 초1~2, 2025: 초3~4, 2026: 초5~6)',
    '입학초기적응활동(초1, 34시간)은 3월 중 집중 편성',
    'NEIS는 크롬보다 엣지 브라우저에서 안정적'
  ],

  faq: [
    {
      question: '취학유예는 어떻게 처리하나요?',
      answer: '취학유예 신청서와 의사 소견서(질병 사유 시)를 받아 학교장 결재 후 교육지원청에 보고합니다. NEIS > 학적 > 취학의무면제/유예관리에서 처리합니다.',
      category: '학적'
    },
    {
      question: '해외 귀국 학생의 학년 배치는?',
      answer: '해외 이수 학력 인정 서류를 확인하고, 학력인정심의위원회에서 학년 배치를 결정합니다. 통상 연령 학년에 배치하되, 학력 차이가 클 경우 조정 가능합니다.',
      category: '학적'
    },
    {
      question: '교육과정 시수 증감은 어디까지 가능한가요?',
      answer: '교과(군)별 창의적 체험활동 시수의 20% 범위 내에서 증감 가능합니다. 단, 체육, 예술(음악/미술) 교과는 기준 시수를 확보해야 합니다.',
      category: '교육과정'
    },
    {
      question: '수업일수 190일을 채우지 못하면?',
      answer: '특별한 사유(재난, 감염병 등) 외에는 190일을 반드시 확보해야 합니다. 부득이한 경우 교육청 승인을 받아 수업일수 조정이 가능합니다.',
      category: '학사일정'
    },
    {
      question: '전학 시 학교생활기록부는 어떻게 이관되나요?',
      answer: 'NEIS에서 전입 승인 시 학교생활기록부가 자동으로 이관됩니다. 전출학교에서 출력한 생활기록부 사본은 참고용으로 확인합니다.',
      category: '학적'
    }
  ],

  references: [
    { title: '2024 학교 업무매뉴얼(초등)', source: '경기도교육청', url: 'https://www.goe.go.kr', year: 2024 },
    { title: '2024 학적업무 도움자료', source: '서울시교육청', url: 'https://buseo.sen.go.kr', year: 2024 },
    { title: '2024학년도 초등학교 학적업무 매뉴얼', source: '충북교육청', url: 'https://www.cbe.go.kr', year: 2024 },
    { title: '학교생활기록부 기재요령', source: '교육부', url: 'https://star.moe.go.kr', year: 2025 }
  ]
};

// ========================================
// 2. 생활지도부/학교폭력 지식베이스
// ========================================
export const schoolViolenceKnowledge: DutyKnowledge = {
  id: 'school-violence',
  name: '생활지도부/학교폭력',
  shortName: '생활지도',
  description: '학생 생활지도, 학교폭력 예방 및 대응, 학생자치활동 지원 업무',

  legalBasis: [
    {
      law: '학교폭력예방 및 대책에 관한 법률',
      article: '전문',
      content: '학교폭력의 예방과 대책에 필요한 사항 규정'
    },
    {
      law: '교원의 학생생활지도에 관한 고시',
      article: '교육부고시 제2023-28호',
      content: '2023.9.1 시행, 교원의 정당한 생활지도 권한 명시'
    },
    {
      law: '교원의 지위 향상 및 교육활동 보호를 위한 특별법',
      article: '전문',
      content: '교권 침해 예방 및 교원 보호'
    }
  ],

  annualWorkflow: [
    {
      month: 3,
      tasks: [
        '학교폭력 예방교육 연간 계획 수립',
        '학교폭력 전담기구 구성 (학교장, 전담교사, 보건교사, 책임교사 등)',
        '또래조정 프로그램 운영 준비',
        '학교폭력 예방 주간 운영'
      ],
      importance: 'critical'
    },
    {
      month: 4,
      tasks: [
        '1차 학교폭력 실태조사 실시',
        '어울림 프로그램 운영 시작',
        '학교폭력 예방교육 (학기당 1회 이상)'
      ],
      importance: 'critical'
    },
    {
      month: 5,
      tasks: [
        '학교폭력 사안 처리 (발생 시)',
        '또래조정 프로그램 운영',
        '1차 실태조사 결과 분석 및 대책 수립'
      ],
      importance: 'high'
    },
    {
      month: 6,
      tasks: [
        '1학기 학교폭력 사안 정리',
        '가해학생 특별교육 이행 확인',
        '피해학생 보호 지원 점검'
      ],
      importance: 'high'
    },
    {
      month: 9,
      tasks: [
        '2학기 학교폭력 예방교육',
        '또래조정 프로그램 재가동'
      ],
      importance: 'high'
    },
    {
      month: 10,
      tasks: [
        '2차 학교폭력 실태조사 실시',
        '학교폭력 예방 주간 운영'
      ],
      importance: 'critical'
    },
    {
      month: 11,
      tasks: [
        '2차 실태조사 결과 분석',
        '연간 학교폭력 현황 분석'
      ],
      importance: 'high'
    },
    {
      month: 12,
      tasks: [
        '연간 학교폭력 대응 결과 보고',
        '차년도 학교폭력 예방 계획 수립',
        '가해학생 조치 이행 최종 점검'
      ],
      importance: 'high'
    }
  ],

  detailedProcedures: [
    {
      name: '학교폭력 사안 처리 절차',
      steps: [
        { order: 1, action: '사안 인지', detail: '학생/교사/학부모 신고 또는 발견 즉시 인지', responsible: '발견자/신고접수자' },
        { order: 2, action: '피해학생 보호', detail: '피해학생 분리 및 심리적 안정 조치', responsible: '담임교사/전담교사', deadline: '즉시' },
        { order: 3, action: '사안 조사', detail: '관련 학생 면담, 목격자 진술, CCTV 확인 등', responsible: '학교폭력 전담기구', deadline: '3일 이내' },
        { order: 4, action: '전담기구 심의', detail: '학교장 자체해결 or 심의위원회 회부 결정', responsible: '학교폭력 전담기구' },
        { order: 5, action: '학교장 자체해결', detail: '경미한 사안, 피해학생·보호자 동의 시', responsible: '학교장' },
        { order: 6, action: '심의위원회 회부', detail: '중대 사안 또는 자체해결 불가 시 교육지원청 회부', responsible: '학교장', deadline: '48시간 이내' },
        { order: 7, action: '심의위원회 개최', detail: '조치 결정 (피해학생 보호조치, 가해학생 선도조치)', responsible: '교육지원청 심의위원회' },
        { order: 8, action: '조치 통보 및 이행', detail: '학교에 결과 통보, 조치 이행', responsible: '학교' },
        { order: 9, action: '사후 관리', detail: '피해학생 회복, 가해학생 선도, 재발 방지', responsible: '담임교사/상담교사' }
      ],
      duration: '사안 인지 후 14일 이내 심의위 회부',
      requiredDocuments: ['학교폭력 사안보고서', '학생 면담 기록', '목격자 진술서', '증거자료'],
      cautions: [
        '24시간 이내 교육지원청 보고 필수',
        '피해·가해 학생 분리 우선',
        '객관적 사실 확인 중심 (감정적 판단 지양)',
        '학부모 상담 시 녹음 가능성 인지'
      ]
    },
    {
      name: '학교장 자체해결 절차',
      steps: [
        { order: 1, action: '자체해결 요건 확인', detail: '경미한 사안, 피해학생 보호자 서면 동의, 가해학생 즉시 사과 및 화해', responsible: '전담기구' },
        { order: 2, action: '피해학생 보호자 동의', detail: '자체해결 동의서 징구 (서면 필수)', responsible: '전담교사' },
        { order: 3, action: '전담기구 심의', detail: '자체해결 가능 여부 최종 판단', responsible: '전담기구' },
        { order: 4, action: '학교장 결정', detail: '자체해결 확정 및 관련 학생·보호자 통보', responsible: '학교장' },
        { order: 5, action: '화해 프로그램', detail: '관계 회복 프로그램 운영', responsible: '상담교사' },
        { order: 6, action: '모니터링', detail: '재발 여부 지속 관찰', responsible: '담임교사' }
      ],
      requiredDocuments: ['자체해결 동의서', '화해 확인서', '전담기구 회의록'],
      cautions: [
        '자체해결 후에도 재발 시 심의위 회부 가능',
        '피해학생 동의 철회 시 심의위 회부',
        '생기부 기재 없음 (2024년 개정)'
      ]
    }
  ],

  neisGuide: {
    menuPath: [
      'NEIS > 학생생활 > 학교폭력',
      '학교폭력 실태조사 시스템 (별도)'
    ],
    inputFields: [
      { name: '사안 기본정보', description: '발생일시, 장소, 유형', required: true },
      { name: '관련 학생 정보', description: '피해학생, 가해학생, 목격자', required: true },
      { name: '조치 결과', description: '심의위 결과 또는 자체해결 여부', required: true }
    ],
    tips: [
      '학교폭력 조치는 "학교폭력 조치 상황란"에 일원화 기재 (2024년 개정)',
      '졸업 후 4년간 보존 (대학·취업 시 영향)',
      '삭제 조건: 피해학생 동의 + 불복소송 미진행'
    ],
    commonErrors: [
      '사안 보고 지연 → 24시간 이내 교육청 보고 필수',
      '조치 이행 미확인 → 가해학생 특별교육 이수 확인서 징구'
    ]
  },

  documents: [
    { name: '학교폭력 사안보고서', purpose: '사안 발생 시 교육청 보고', format: '한글', retentionPeriod: '10년' },
    { name: '피해학생 보호조치 신청서', purpose: '피해학생 보호 요청', format: '한글', retentionPeriod: '5년' },
    { name: '가해학생 조치 요청서', purpose: '가해학생 선도 요청', format: '한글', retentionPeriod: '5년' },
    { name: '학교장 자체해결 확인서', purpose: '자체해결 시 동의 확인', format: '한글', retentionPeriod: '5년' },
    { name: '전담기구 회의록', purpose: '심의 과정 기록', format: '한글', retentionPeriod: '10년' },
    { name: '학생 면담 기록', purpose: '관련 학생 진술 기록', format: '한글', retentionPeriod: '5년' }
  ],

  relatedAgencies: [
    { name: '교육지원청 학교폭력대책심의위원회', role: '학교폭력 사안 심의 및 조치 결정', contact: '교육지원청 대표번호' },
    { name: 'Wee센터', role: '피해학생 심리상담, 가해학생 특별교육', contact: '1588-7179' },
    { name: '117 학교폭력 신고센터', role: '학교폭력 신고 및 상담', contact: '117' },
    { name: '경찰 학교전담경찰관(SPO)', role: '학교폭력 수사 및 예방 활동', contact: '해당 경찰서' }
  ],

  budgetInfo: {
    items: [
      { name: '학교폭력 예방교육비', description: '외부 강사 초청, 프로그램 운영비', approxAmount: '100~300만원/년' },
      { name: '또래조정 프로그램비', description: '또래조정자 교육, 활동비', approxAmount: '50~100만원/년' },
      { name: '어울림 프로그램비', description: '사회정서학습 프로그램 운영비', approxAmount: '100~200만원/년' }
    ],
    source: '학교회계, 교육청 특별교부금',
    tips: [
      '교육청 공모사업 적극 활용',
      '예방교육 외부강사 초빙 시 강사료 기준 준수'
    ]
  },

  commonProblems: [
    {
      situation: '학부모 간 심각한 갈등',
      cause: '피해·가해 학부모 간 입장 차이, 감정 대립',
      solution: '학교장 중재, 필요 시 교육청 중재 요청, 객관적 사실 중심 설명',
      prevention: '초기 대응 시 양측 학부모 개별 상담, 감정적 대응 지양'
    },
    {
      situation: '증거 부족으로 사실 확인 곤란',
      cause: 'CCTV 사각지대, 목격자 없음, 진술 엇갈림',
      solution: '확인된 사실만으로 전담기구 심의, 상황 정황 종합 판단',
      prevention: 'CCTV 사각지대 최소화, 학교폭력 예방 분위기 조성'
    },
    {
      situation: '가해학생이 조치 불이행',
      cause: '특별교육 미이수, 접촉금지 위반',
      solution: '추가 조치 요청 (심의위 재소집), 출석정지 등 강화 조치',
      prevention: '조치 이행 정기 모니터링, 학부모 협조 요청'
    }
  ],

  practicalTips: [
    '사안 인지 즉시 피해학생 분리 및 심리적 안정 조치가 최우선',
    '모든 면담은 기록으로 남기고, 가능하면 2인 이상 동석',
    '학부모 상담 시 녹음 가능성 인지하고 신중하게 발언',
    '사안 조사 시 선입견 없이 객관적 사실 확인에 집중',
    'SNS, 카톡 등 사이버폭력 증거는 캡처하여 보관',
    '경미한 사안도 기록을 남겨 추후 분쟁 대비',
    '또래조정은 물리적 폭력이 없는 갈등 상황에만 적용'
  ],

  faq: [
    {
      question: '학교폭력 사안을 알게 되면 어떻게 해야 하나요?',
      answer: '즉시 피해학생을 분리하여 안전을 확보하고, 학교폭력 전담기구에 보고합니다. 24시간 이내에 교육지원청에 사안을 보고해야 합니다.',
      category: '사안 처리'
    },
    {
      question: '학교장 자체해결은 어떤 경우에 가능한가요?',
      answer: '경미한 사안으로 피해학생과 그 보호자가 서면 동의하고, 가해학생이 즉시 사과하여 화해가 이루어진 경우에 가능합니다. 신체·금품 피해가 없고, 지속성·고의성이 낮아야 합니다.',
      category: '사안 처리'
    },
    {
      question: '학교폭력 가해학생 조치는 생활기록부에 기재되나요?',
      answer: '예, 조치 1~9호 중 결정된 조치가 "학교폭력 조치 상황란"에 기재됩니다. 졸업 후 4년간 보존되며, 조건 충족 시 삭제 가능합니다.',
      category: '생활기록부'
    },
    {
      question: '학교폭력 조치를 삭제하려면 어떻게 해야 하나요?',
      answer: '피해학생(보호자)의 동의, 불복소송 미진행, 추가 학교폭력 없음 등 조건을 충족하면 삭제 심의를 요청할 수 있습니다. 졸업 후 2년 경과 시 자동 삭제됩니다(1~3호, 7호).',
      category: '생활기록부'
    },
    {
      question: '사이버폭력도 학교폭력인가요?',
      answer: '네, 인터넷·휴대폰 등을 이용한 모욕, 명예훼손, 따돌림, 성폭력 등도 학교폭력에 해당합니다. 카카오톡, SNS 등에서 발생한 폭력도 동일하게 처리합니다.',
      category: '개념'
    }
  ],

  references: [
    { title: '2024 학교폭력 사안처리 가이드북', source: '서울시교육청', url: 'https://buseo.sen.go.kr', year: 2024 },
    { title: '2024 경기형 학교폭력 사안처리 매뉴얼', source: '경기도교육청', url: 'https://www.goe.go.kr', year: 2024 },
    { title: '제4차 학교폭력 예방 및 대책 기본계획', source: '교육부', url: 'https://www.moe.go.kr', year: 2020 },
    { title: '교원의 학생생활지도에 관한 고시', source: '교육부', year: 2023 }
  ]
};

// ========================================
// 3. 보건부 지식베이스
// ========================================
export const healthKnowledge: DutyKnowledge = {
  id: 'health',
  name: '보건부',
  shortName: '보건',
  description: '학생 건강검사, 감염병 예방 및 대응, 응급처치, 보건교육 업무',

  legalBasis: [
    {
      law: '학교보건법',
      article: '전문',
      content: '학교의 보건관리에 필요한 사항 규정'
    },
    {
      law: '학교건강검사규칙',
      article: '전문',
      content: '학생 건강검사 방법 및 절차'
    },
    {
      law: '감염병의 예방 및 관리에 관한 법률',
      article: '전문',
      content: '감염병 예방 및 관리 기본 사항'
    }
  ],

  annualWorkflow: [
    {
      month: 3,
      tasks: [
        '건강검사 연간 계획 수립',
        '건강조사 설문지 배부 및 회수',
        '보건실 운영 계획 수립',
        '응급처치 기록부 양식 준비'
      ],
      importance: 'high'
    },
    {
      month: 4,
      tasks: [
        '학생건강검진 실시 (초1, 초4)',
        '소변검사 실시 (초1)',
        '구강검진 실시',
        '정서행동특성검사 연계'
      ],
      importance: 'critical'
    },
    {
      month: 5,
      tasks: [
        '건강검진 결과 회수 및 NEIS 입력',
        '유소견자 추후관리',
        '건강검사 결과 통보'
      ],
      importance: 'high'
    },
    {
      month: 6,
      tasks: [
        '1학기 건강검사 결과 정리',
        '건강검사 결과 학부모 통보',
        '여름철 감염병 예방교육'
      ],
      importance: 'high'
    },
    {
      month: 9,
      tasks: [
        '인플루엔자 예방접종 안내',
        '2학기 보건교육 계획'
      ],
      importance: 'high'
    },
    {
      month: 10,
      tasks: [
        '인플루엔자 예방접종 확인',
        '결핵검진 (필요 시)'
      ],
      importance: 'medium'
    },
    {
      month: 12,
      tasks: [
        '연간 보건실 이용 통계 분석',
        '건강검사 결과 학교생활기록부 반영',
        '차년도 건강검사 계획 수립'
      ],
      importance: 'high'
    }
  ],

  detailedProcedures: [
    {
      name: '학생건강검진 실시',
      steps: [
        { order: 1, action: '검진기관 선정', detail: '시도교육청 지정 검진기관 확인', responsible: '보건교사' },
        { order: 2, action: '검진 일정 협의', detail: '검진기관과 일정, 인원 협의', responsible: '보건교사' },
        { order: 3, action: '건강조사 실시', detail: '건강조사 설문지 배부 및 회수', responsible: '담임교사', deadline: '검진 1주일 전' },
        { order: 4, action: '검진 안내', detail: '학부모에게 검진 일정, 주의사항 안내', responsible: '보건교사' },
        { order: 5, action: '검진 실시', detail: '학교 또는 검진기관에서 검진 실시', responsible: '검진기관' },
        { order: 6, action: '결과 회수', detail: '검진기관에서 결과 통보서 수령', responsible: '보건교사', deadline: '검진 후 30일 이내' },
        { order: 7, action: 'NEIS 입력', detail: 'NEIS > 보건 > 건강검사에 결과 입력', responsible: '보건교사' },
        { order: 8, action: '결과 통보', detail: '학부모에게 건강검진 결과 통보', responsible: '보건교사' },
        { order: 9, action: '추후관리', detail: '유소견자 추적관리, 치료 권고', responsible: '보건교사' }
      ],
      duration: '4~6월',
      requiredDocuments: ['건강조사 설문지', '건강검진 결과 통보서', '학부모 안내문'],
      cautions: [
        '검진 전 금식 등 주의사항 안내',
        '건강검진 결과는 개인정보이므로 보안 철저'
      ]
    },
    {
      name: '감염병 발생 시 대응',
      steps: [
        { order: 1, action: '의심 증상 발견', detail: '발열, 발진, 설사 등 의심 증상 학생 발견', responsible: '담임교사/보건교사' },
        { order: 2, action: '격리 조치', detail: '보건실 또는 별도 공간에 격리', responsible: '보건교사', deadline: '즉시' },
        { order: 3, action: '보호자 연락', detail: '보호자에게 연락하여 귀가 또는 병원 안내', responsible: '보건교사' },
        { order: 4, action: '의사 진단', detail: '의료기관 진단 결과 확인', responsible: '보호자' },
        { order: 5, action: '보건소 신고', detail: '법정감염병 확진 시 24시간 이내 보건소 신고', responsible: '보건교사' },
        { order: 6, action: '등교중지', detail: '감염병별 등교중지 기간 안내', responsible: '보건교사' },
        { order: 7, action: '소독 실시', detail: '해당 교실 및 공용공간 소독', responsible: '보건교사/방역업체' },
        { order: 8, action: '추가 발생 모니터링', detail: '접촉자 관찰, 추가 발생 시 확대 대응', responsible: '보건교사' }
      ],
      requiredDocuments: ['등교중지 통보서', '감염병 발생보고서', '소독 실시 확인서'],
      cautions: [
        '24시간 이내 보건소 신고 필수 (법정감염병)',
        '개인정보 보호 (확진자 신원 비공개)',
        '집단 발생 시 교육청 즉시 보고'
      ]
    }
  ],

  neisGuide: {
    menuPath: [
      'NEIS > 보건 > 건강검사',
      'NEIS > 보건 > 건강조사',
      'NEIS > 보건 > 신체발달상황'
    ],
    inputFields: [
      { name: '신체발달상황', description: '키, 몸무게, 비만도', required: true, example: '키 130cm, 몸무게 30kg' },
      { name: '건강검진 결과', description: '시력, 청력, 구강, 소변검사 등', required: true },
      { name: '건강조사', description: '설문조사 결과', required: true }
    ],
    tips: [
      '건강검사 결과는 학교생활기록부와 자동 연계',
      '유소견자는 추후관리 기록 필수',
      '개인정보 보호를 위해 결과 출력 시 주의'
    ],
    commonErrors: [
      '검진 결과 미입력 → 학교생활기록부 누락',
      '신체발달상황 오입력 → 학부모 민원'
    ]
  },

  documents: [
    { name: '건강검사 계획서', purpose: '연간 건강검사 계획', format: '한글', retentionPeriod: '3년' },
    { name: '건강조사 설문지', purpose: '학생 건강 상태 조사', format: '한글', retentionPeriod: '3년' },
    { name: '응급처치 기록부', purpose: '보건실 이용 및 응급처치 기록', format: '엑셀', retentionPeriod: '5년' },
    { name: '투약의뢰서', purpose: '학부모 투약 의뢰', format: '한글', retentionPeriod: '1년' },
    { name: '등교중지 통보서', purpose: '감염병 등교중지 안내', format: '한글', retentionPeriod: '3년' },
    { name: '감염병 발생보고서', purpose: '감염병 발생 시 보건소/교육청 보고', format: '한글', retentionPeriod: '5년' }
  ],

  relatedAgencies: [
    { name: '보건소', role: '예방접종, 감염병 관리, 건강검진 지원', contact: '관할 보건소' },
    { name: '검진기관', role: '학생건강검진 실시', contact: '협약 병원' },
    { name: '교육부 학생건강정보센터', role: '학생건강 정책 및 자료', website: 'http://www.schoolhealth.kr' },
    { name: '질병관리청', role: '감염병 정보 및 지침', website: 'https://www.kdca.go.kr' }
  ],

  budgetInfo: {
    items: [
      { name: '보건실 운영비', description: '의약품, 소모품, 기자재', approxAmount: '200~500만원/년' },
      { name: '건강검사비', description: '건강검진 비용 (교육청 지원)', approxAmount: '1인당 2~3만원' },
      { name: '보건교육비', description: '보건교육 자료 및 강사비', approxAmount: '50~100만원/년' }
    ],
    source: '학교회계, 교육청 지원',
    tips: [
      '의약품은 의료용/일반 구분하여 관리',
      '소모품 재고 정기 점검'
    ]
  },

  commonProblems: [
    {
      situation: '집단 감염병 발생',
      cause: '감염력 강한 질환 (인플루엔자, 노로바이러스 등)',
      solution: '보건소 신고, 등교중지, 소독, 방역, 필요시 휴업',
      prevention: '손씻기 교육, 예방접종 권장, 조기 격리'
    },
    {
      situation: '응급환자 발생',
      cause: '심정지, 경련, 심한 외상 등',
      solution: '119 신고, 응급처치(CPR 등), 보호자 연락',
      prevention: '교직원 응급처치 교육, 자동심장충격기(AED) 비치'
    },
    {
      situation: '식품 알레르기 반응',
      cause: '급식 중 알레르기 유발 식품 섭취',
      solution: '에피네프린 투여 (중증 시), 119 신고, 보호자 연락',
      prevention: '알레르기 학생 명단 관리, 급식실 정보 공유, 대체식 제공'
    }
  ],

  practicalTips: [
    '보건실 응급 의약품 재고는 수시로 점검하고 유효기간 관리',
    '감염병 발생 시 담임교사와 긴밀히 소통하여 초기 대응',
    '투약의뢰서 없이 약 투약 절대 금지 (의료법 위반)',
    '응급처치 시 기록은 상세히 (시간, 증상, 조치, 결과)',
    '등교중지 후 복귀 시 의사 소견서 또는 완치 확인 필요',
    '보건교육은 교과 연계하여 실시하면 효과적',
    '비상연락망 최신화 (응급상황 대비)'
  ],

  faq: [
    {
      question: '학생이 아파서 조퇴하려면 어떻게 해야 하나요?',
      answer: '보건교사가 상태를 확인하고, 보호자에게 연락합니다. 보호자가 직접 데려가거나, 동의하에 학생이 귀가할 수 있습니다. 조퇴 처리는 담임교사가 합니다.',
      category: '일반'
    },
    {
      question: '학생에게 약을 줘도 되나요?',
      answer: '학부모의 투약의뢰서가 있어야 합니다. 의뢰서 없이 약 투약은 의료법 위반입니다. 해열제 등 상비약도 동일합니다.',
      category: '투약'
    },
    {
      question: '감염병에 걸리면 며칠간 등교중지인가요?',
      answer: '질환별로 다릅니다. 인플루엔자는 해열 후 2일간, 수두는 모든 수포가 가피 형성될 때까지, 유행성이하선염은 침샘 부종 후 5일간 등입니다. 등교중지 기간은 학교장이 정합니다.',
      category: '감염병'
    },
    {
      question: '건강검진을 안 받으면 어떻게 되나요?',
      answer: '학교에서 지정한 기간에 받지 못하면 개별 검진 안내를 합니다. 미검진 시 학교생활기록부에 해당 항목이 공란으로 남습니다. 지속적으로 안내하여 검진 받도록 합니다.',
      category: '건강검사'
    },
    {
      question: '코로나19 확진되면 등교중지 기간은?',
      answer: '현재(2024년) 코로나19는 4급 감염병으로, 등교중지 권고 기간은 5일입니다. 다만, 해열 후 24시간 이상 경과해야 등교 가능합니다. 최신 지침을 확인해 주세요.',
      category: '감염병'
    }
  ],

  references: [
    { title: '학교 감염병 예방·위기대응 매뉴얼 제3차 개정판', source: '교육부, 질병관리청', url: 'https://www.kdca.go.kr', year: 2024 },
    { title: '학생건강정보센터', source: '교육부', url: 'http://www.schoolhealth.kr', year: 2024 },
    { title: '학교건강검사규칙', source: '교육부', url: 'https://law.go.kr', year: 2024 }
  ]
};

// ========================================
// 4. 안전부 지식베이스
// ========================================
export const safetyKnowledge: DutyKnowledge = {
  id: 'safety',
  name: '안전부',
  shortName: '안전',
  description: '학교 안전교육, 재난대응훈련, 안전사고 예방 및 처리 업무',

  legalBasis: [
    {
      law: '학교안전사고 예방 및 보상에 관한 법률',
      article: '제8조',
      content: '학교장의 안전교육 실시 의무'
    },
    {
      law: '학교 안전교육 7대 표준안',
      article: '교육부 지침',
      content: '7대 영역별 안전교육 기준'
    }
  ],

  annualWorkflow: [
    {
      month: 3,
      tasks: [
        '안전교육 연간 계획 수립',
        '재난대응 매뉴얼 점검 및 갱신',
        '안전점검의 날 실시 (매월 4일)',
        '화재 대피훈련 준비'
      ],
      importance: 'high'
    },
    {
      month: 4,
      tasks: [
        '지진·화재 대피훈련 (1차)',
        '안전교육 실시 (7대 영역)',
        '시설 안전점검'
      ],
      importance: 'critical'
    },
    {
      month: 5,
      tasks: [
        '안전한국훈련 참여',
        '현장체험학습 안전교육',
        '수영교육 안전관리'
      ],
      importance: 'high'
    },
    {
      month: 6,
      tasks: [
        '여름철 안전교육 (물놀이, 폭염)',
        '방학 전 안전교육'
      ],
      importance: 'high'
    },
    {
      month: 9,
      tasks: [
        '2학기 안전교육',
        '지진·화재 대피훈련 (2차)'
      ],
      importance: 'critical'
    },
    {
      month: 11,
      tasks: [
        '안전한국훈련 참여',
        '겨울철 안전교육 (화재, 동상)'
      ],
      importance: 'high'
    },
    {
      month: 12,
      tasks: [
        '연간 안전사고 통계 분석',
        '차년도 안전교육 계획 수립'
      ],
      importance: 'high'
    }
  ],

  detailedProcedures: [
    {
      name: '화재 대피훈련',
      steps: [
        { order: 1, action: '훈련 계획 수립', detail: '일정, 시나리오, 역할 분담', responsible: '안전담당교사' },
        { order: 2, action: '사전 교육', detail: '대피 경로, 행동 요령 교육', responsible: '담임교사' },
        { order: 3, action: '훈련 실시', detail: '비상벨 → 대피 → 인원점검 → 소화기 시연', responsible: '전체 교직원' },
        { order: 4, action: '결과 분석', detail: '대피 시간 측정, 개선점 도출', responsible: '안전담당교사' },
        { order: 5, action: '결과 보고', detail: '훈련 결과 보고서 작성', responsible: '안전담당교사' }
      ],
      duration: '30분~1시간',
      requiredDocuments: ['대피훈련 계획서', '대피훈련 결과 보고서'],
      cautions: [
        '장애학생 대피 지원 계획 수립',
        '대피 경로 장애물 사전 제거',
        '사전 예고 없이 실시하면 실제 대응력 향상'
      ]
    },
    {
      name: '지진 대피훈련',
      steps: [
        { order: 1, action: '훈련 계획 수립', detail: '지진 시나리오, 대피 장소 확인', responsible: '안전담당교사' },
        { order: 2, action: '사전 교육', detail: '지진 발생 시 행동 요령 (엎드려, 가려, 잡아)', responsible: '담임교사' },
        { order: 3, action: '지진 발생 알림', detail: '방송으로 지진 발생 알림', responsible: '방송담당' },
        { order: 4, action: '1차 대피', detail: '책상 밑으로 대피 (머리 보호)', responsible: '학생' },
        { order: 5, action: '2차 대피', detail: '흔들림 멈추면 운동장으로 대피', responsible: '담임교사' },
        { order: 6, action: '인원 점검', detail: '학급별 인원 확인 및 보고', responsible: '담임교사' },
        { order: 7, action: '결과 분석', detail: '훈련 결과 보고서 작성', responsible: '안전담당교사' }
      ],
      duration: '30분~1시간',
      cautions: [
        '창문, 무거운 물건에서 멀리 대피',
        '엘리베이터 사용 금지',
        '대피 시 뛰지 말고 신속히 걷기'
      ]
    }
  ],

  neisGuide: {
    menuPath: [
      '학교안전정보센터 (schoolsafe.kr)',
      '안전교육 이수 확인 시스템'
    ],
    inputFields: [
      { name: '안전교육 실적', description: '7대 영역별 교육 실시 시간', required: true },
      { name: '대피훈련 실적', description: '훈련 일자, 참여 인원', required: true }
    ],
    tips: [
      '안전교육 실적은 학교안전정보센터에 입력',
      '초1~2는 "안전한 생활" 교과로 64시간 이수'
    ],
    commonErrors: [
      '안전교육 미이수 → 학기 중 보충 교육 필요',
      '대피훈련 미실시 → 연 2회 이상 필수'
    ]
  },

  documents: [
    { name: '안전교육 계획서', purpose: '연간 안전교육 계획', format: '한글', retentionPeriod: '5년' },
    { name: '재난대응 매뉴얼', purpose: '재난 유형별 대응 절차', format: '한글', retentionPeriod: '영구' },
    { name: '대피훈련 결과 보고서', purpose: '훈련 실시 결과 기록', format: '한글', retentionPeriod: '3년' },
    { name: '시설 안전점검표', purpose: '월별 시설 안전점검', format: '한글', retentionPeriod: '3년' },
    { name: '안전사고 보고서', purpose: '안전사고 발생 시 보고', format: '한글', retentionPeriod: '10년' }
  ],

  relatedAgencies: [
    { name: '학교안전정보센터', role: '안전교육 자료, 통계', website: 'https://schoolsafe.kr' },
    { name: '학교안전공제회', role: '안전사고 보상', website: 'https://www.ssif.or.kr' },
    { name: '119', role: '화재, 구조, 응급 신고', contact: '119' },
    { name: '112', role: '긴급 상황 신고', contact: '112' }
  ],

  budgetInfo: {
    items: [
      { name: '안전교육비', description: '안전교육 자료, 체험비', approxAmount: '100~200만원/년' },
      { name: '시설 안전 개선비', description: '안전 시설 보수, 개선', approxAmount: '학교별 상이' },
      { name: '소방 시설 점검비', description: '소화기, 스프링클러 점검', approxAmount: '50~100만원/년' }
    ],
    source: '학교회계, 교육청 지원',
    tips: [
      '안전 관련 예산은 우선 배정',
      '소방시설 법정 점검 필수'
    ]
  },

  commonProblems: [
    {
      situation: '체육활동 중 안전사고',
      cause: '준비운동 미흡, 안전장구 미착용',
      solution: '응급처치, 119 신고 (필요 시), 보호자 연락, 안전공제회 보상 청구',
      prevention: '준비운동 철저, 안전장구 착용, 안전수칙 교육'
    },
    {
      situation: '계단 추락사고',
      cause: '뛰어다니기, 장난치기',
      solution: '응급처치, 병원 이송, 사고 경위서 작성',
      prevention: '복도/계단 보행 지도, 안전 손잡이 설치'
    }
  ],

  practicalTips: [
    '대피훈련은 사전 예고 없이 실시하면 실제 대응력 향상',
    '안전교육은 체험 중심으로 실시 (영상 시청만은 비효과적)',
    '안전사고 발생 시 즉시 관리자 보고 및 보호자 연락',
    '안전점검 시 사진 촬영하여 기록 보관',
    '학교안전공제회 가입 확인 (전 학생 가입 필수)'
  ],

  faq: [
    {
      question: '학교에서 다치면 치료비는 어떻게 하나요?',
      answer: '학교안전공제회에서 보상받을 수 있습니다. 담임교사 또는 보건교사에게 사고 사실을 알리고, 안전공제회 청구 절차를 안내받으세요.',
      category: '보상'
    },
    {
      question: '안전교육은 몇 시간 해야 하나요?',
      answer: '초1~2는 "안전한 생활" 교과로 연간 64시간, 초3~6은 7대 안전교육 연간 51차시 이상 실시해야 합니다.',
      category: '안전교육'
    }
  ],

  references: [
    { title: '학교현장 재난유형별 교육훈련 매뉴얼', source: '교육부', year: 2024 },
    { title: '학교 안전교육 7대 표준안', source: '교육부', year: 2024 },
    { title: '학교안전정보센터', source: '학교안전공제회', url: 'https://schoolsafe.kr', year: 2024 }
  ]
};

// ========================================
// 5. 급식부 지식베이스
// ========================================
export const mealServiceKnowledge: DutyKnowledge = {
  id: 'meal-service',
  name: '급식부',
  shortName: '급식',
  description: '급식 운영, 식재료 관리, 위생·안전 관리, 영양교육 업무',

  legalBasis: [
    {
      law: '학교급식법',
      article: '전문',
      content: '학교급식 운영에 관한 기본 사항'
    },
    {
      law: '식품위생법',
      article: '전문',
      content: '식품 위생 관리 기준'
    }
  ],

  annualWorkflow: [
    {
      month: 2,
      tasks: [
        '급식 운영 계획 수립',
        '조리원 채용 (신규)',
        '급식소 시설 점검',
        '식재료 납품업체 선정'
      ],
      importance: 'high'
    },
    {
      month: 3,
      tasks: [
        '급식 시작',
        '식품 알레르기 조사',
        '위생교육 실시'
      ],
      importance: 'critical'
    },
    {
      month: 6,
      tasks: [
        '여름철 식중독 예방 강화',
        '1학기 급식 평가'
      ],
      importance: 'high'
    },
    {
      month: 7,
      tasks: [
        '급식소 대청소',
        '시설·기구 점검 및 보수'
      ],
      importance: 'high'
    },
    {
      month: 12,
      tasks: [
        '급식 만족도 조사',
        '차년도 급식 계획 수립'
      ],
      importance: 'high'
    }
  ],

  detailedProcedures: [
    {
      name: '식중독 발생 시 대응',
      steps: [
        { order: 1, action: '증상 발생 인지', detail: '집단 식중독 의심 (5명 이상 유사 증상)', responsible: '담임/보건교사' },
        { order: 2, action: '환자 격리', detail: '증상 학생 보건실 격리, 병원 이송', responsible: '보건교사' },
        { order: 3, action: '급식 중단', detail: '추가 급식 중단, 잔여 음식 보관', responsible: '영양교사' },
        { order: 4, action: '보건소 신고', detail: '즉시 보건소에 식중독 발생 신고', responsible: '영양교사', deadline: '즉시' },
        { order: 5, action: '교육청 보고', detail: '교육지원청에 사고 보고', responsible: '교감/교장', deadline: '1시간 이내' },
        { order: 6, action: '역학조사 협조', detail: '보건소 역학조사에 협조 (식단, 식재료, 조리과정)', responsible: '영양교사' },
        { order: 7, action: '시설 소독', detail: '급식소 전체 소독', responsible: '방역업체' },
        { order: 8, action: '원인 분석 및 재발 방지', detail: '원인 파악 후 재발 방지 대책 수립', responsible: '영양교사' }
      ],
      requiredDocuments: ['식중독 발생 보고서', '식단표', '식재료 입고 기록', '조리일지'],
      cautions: [
        '보존식 -18℃ 이하 144시간 보관 (역학조사용)',
        '언론 대응은 학교장 또는 교육청 창구 일원화'
      ]
    }
  ],

  neisGuide: {
    menuPath: [
      'NEIS > 급식 > 식단관리',
      'NEIS > 급식 > 급식비관리'
    ],
    inputFields: [
      { name: '식단 정보', description: '일일 메뉴, 알레르기 정보', required: true },
      { name: '급식비', description: '급식 단가, 납부 현황', required: true }
    ],
    tips: [
      '알레르기 정보는 식단표에 반드시 표시',
      '급식비 미납자 관리'
    ],
    commonErrors: [
      '알레르기 정보 미표시 → 학부모 민원, 사고 위험'
    ]
  },

  documents: [
    { name: '급식 운영계획서', purpose: '연간 급식 운영 계획', format: '한글', retentionPeriod: '5년' },
    { name: '식단표', purpose: '월간/주간 메뉴 안내', format: '엑셀', retentionPeriod: '3년' },
    { name: '검수일지', purpose: '식재료 입고 검수 기록', format: '엑셀', retentionPeriod: '3년' },
    { name: '위생점검표', purpose: '일일 위생 점검 기록', format: '엑셀', retentionPeriod: '3년' },
    { name: '보존식 관리일지', purpose: '보존식 보관 기록', format: '엑셀', retentionPeriod: '3년' }
  ],

  relatedAgencies: [
    { name: '학교급식 정보마당', role: '급식 정책, 자료', website: 'https://www.sfic.go.kr' },
    { name: '식품안전나라', role: '식품 안전 정보', website: 'https://www.foodsafetykorea.go.kr' },
    { name: '보건소', role: '위생 점검, 식중독 조사', contact: '관할 보건소' }
  ],

  budgetInfo: {
    items: [
      { name: '급식 재료비', description: '식재료 구입비', approxAmount: '1식당 3,000~4,000원' },
      { name: '급식 운영비', description: '인건비, 광열비, 소모품', approxAmount: '학교규모별 상이' },
      { name: '시설 개선비', description: '급식 시설 보수', approxAmount: '필요 시' }
    ],
    source: '학교회계, 무상급식 지원금',
    tips: [
      '무상급식 예산 내 효율적 운영',
      '친환경 식재료 우선 사용'
    ]
  },

  commonProblems: [
    {
      situation: '식중독 발생',
      cause: '부적절한 온도 관리, 교차오염',
      solution: '급식 중단, 보건소 신고, 역학조사 협조',
      prevention: '중심온도 75℃ 1분 이상 가열, 손씻기, 도마 구분 사용'
    },
    {
      situation: '알레르기 사고',
      cause: '알레르기 학생에게 유발 식품 제공',
      solution: '응급처치 (에피네프린), 119 신고, 병원 이송',
      prevention: '알레르기 학생 명단 공유, 대체식 제공, 식단 확인'
    }
  ],

  practicalTips: [
    '보존식은 매 끼니 100g 이상, -18℃ 이하 144시간 보관',
    '조리 후 2시간 이내 배식 (온도 관리)',
    '알레르기 학생은 대체식 제공 또는 해당 메뉴 제외',
    '식재료 검수 시 온도, 유통기한, 외관 필수 확인',
    '조리원 건강상태 매일 체크 (설사, 구토 시 조리 금지)'
  ],

  faq: [
    {
      question: '급식 알레르기 정보는 어디서 확인하나요?',
      answer: '식단표에 알레르기 유발 식품 번호가 표시되어 있습니다. 학교 홈페이지 또는 가정통신문으로 확인 가능합니다. 알레르기가 있는 학생은 담임교사와 영양교사에게 미리 알려주세요.',
      category: '알레르기'
    },
    {
      question: '급식비는 얼마인가요?',
      answer: '현재 대부분의 초등학교는 무상급식을 시행하고 있어 급식비가 무료입니다. 다만, 방학 중 급식이나 특별 프로그램은 별도 비용이 발생할 수 있습니다.',
      category: '급식비'
    }
  ],

  references: [
    { title: '학교급식 위생관리 지침서 제5차 개정판', source: '교육부', year: 2021 },
    { title: '학교급식 정보마당', source: '한국교육환경보호원', url: 'https://www.sfic.go.kr', year: 2024 }
  ]
};

// ========================================
// 나머지 업무 지식베이스 (요약)
// ========================================

// 6. 특수교육부
export const specialEducationKnowledge: DutyKnowledge = {
  id: 'special-education',
  name: '특수교육부',
  shortName: '특수',
  description: '특수학급 운영, 개별화교육계획(IEP), 통합교육 업무',
  legalBasis: [
    { law: '장애인 등에 대한 특수교육법', article: '전문', content: '특수교육 관련 기본 법률' }
  ],
  annualWorkflow: [
    { month: 2, tasks: ['개별화교육지원팀 구성 (학년 시작 2주 이내)', '1학기 IEP 작성 (30일 이내)'], importance: 'critical' },
    { month: 7, tasks: ['1학기 IEP 평가, 학부모 통보'], importance: 'high' },
    { month: 8, tasks: ['2학기 IEP 작성'], importance: 'critical' },
    { month: 1, tasks: ['2학기 IEP 평가', '전·입학 시 IEP 이관 (14일 이내)'], importance: 'critical' }
  ],
  detailedProcedures: [],
  neisGuide: { menuPath: ['NEIS > 특수교육'], inputFields: [], tips: [], commonErrors: [] },
  documents: [{ name: '개별화교육계획서', purpose: 'IEP 기록', format: '한글', retentionPeriod: '5년' }],
  relatedAgencies: [{ name: '특수교육지원센터', role: '특수교육 지원', contact: '교육지원청' }],
  budgetInfo: { items: [], source: '특수교육 예산', tips: [] },
  commonProblems: [],
  practicalTips: ['IEP는 학부모 동의 필수', '통합학급 담임과 긴밀한 협력'],
  faq: [],
  references: []
};

// 7. 돌봄/방과후부
export const careAfterSchoolKnowledge: DutyKnowledge = {
  id: 'care-after-school',
  name: '돌봄/방과후부',
  shortName: '돌봄',
  description: '돌봄교실, 방과후학교, 늘봄학교 운영 업무',
  legalBasis: [
    { law: '초·중등교육법', article: '제23조의2', content: '방과후학교 등' }
  ],
  annualWorkflow: [
    { month: 2, tasks: ['신학년 돌봄/방과후 수요조사, 프로그램 편성'], importance: 'critical' },
    { month: 3, tasks: ['돌봄교실·방과후학교 개강'], importance: 'critical' }
  ],
  detailedProcedures: [],
  neisGuide: { menuPath: ['NEIS > 방과후학교'], inputFields: [], tips: [], commonErrors: [] },
  documents: [{ name: '돌봄교실 신청서', purpose: '돌봄 신청', format: '한글', retentionPeriod: '3년' }],
  relatedAgencies: [{ name: '늘봄·방과후 중앙포털', role: '방과후 정보', website: 'https://www.afterschool.go.kr' }],
  budgetInfo: { items: [], source: '돌봄·방과후 예산', tips: [] },
  commonProblems: [],
  practicalTips: ['안전사고 예방 최우선', '저소득층 자유수강권 적극 안내'],
  faq: [],
  references: []
};

// 8. 상담부/Wee클래스
export const counselingKnowledge: DutyKnowledge = {
  id: 'counseling',
  name: '상담부/Wee클래스',
  shortName: '상담',
  description: '학생상담, 심리검사, 위기학생 지원 업무',
  legalBasis: [
    { law: '초·중등교육법', article: '제19조의2', content: '전문상담교사 배치' }
  ],
  annualWorkflow: [
    { month: 3, tasks: ['Wee클래스 운영계획 수립, 학생 수요조사'], importance: 'high' },
    { month: 4, tasks: ['집단상담 프로그램 운영 시작'], importance: 'high' }
  ],
  detailedProcedures: [],
  neisGuide: { menuPath: [], inputFields: [], tips: [], commonErrors: [] },
  documents: [{ name: '상담일지', purpose: '상담 기록', format: '한글', retentionPeriod: '5년' }],
  relatedAgencies: [
    { name: 'Wee센터', role: '심층 상담', website: 'https://www.wee.go.kr' },
    { name: '청소년상담복지센터', role: '청소년 상담', contact: '1388' }
  ],
  budgetInfo: { items: [], source: '상담 예산', tips: [] },
  commonProblems: [],
  practicalTips: ['상담 내용 비밀 보장 원칙 (자해·타해 위험 제외)', '고위기 학생은 Wee센터 연계'],
  faq: [],
  references: []
};

// ========================================
// 전체 지식베이스 통합
// ========================================
export const allDutyKnowledge: DutyKnowledge[] = [
  academicAffairsKnowledge,
  schoolViolenceKnowledge,
  healthKnowledge,
  safetyKnowledge,
  mealServiceKnowledge,
  specialEducationKnowledge,
  careAfterSchoolKnowledge,
  counselingKnowledge
];

// ID로 지식베이스 검색
export function getDutyKnowledgeById(id: string): DutyKnowledge | undefined {
  return allDutyKnowledge.find(k => k.id === id);
}

// 키워드로 FAQ 검색
export function searchFAQByKeyword(keyword: string): { duty: string; faq: FAQ }[] {
  const results: { duty: string; faq: FAQ }[] = [];
  const lowerKeyword = keyword.toLowerCase();

  allDutyKnowledge.forEach(knowledge => {
    knowledge.faq.forEach(faq => {
      if (faq.question.toLowerCase().includes(lowerKeyword) ||
          faq.answer.toLowerCase().includes(lowerKeyword)) {
        results.push({ duty: knowledge.name, faq });
      }
    });
  });

  return results;
}

// 월별 업무 검색
export function getTasksByMonth(month: number): { duty: string; tasks: string[] }[] {
  const results: { duty: string; tasks: string[] }[] = [];

  allDutyKnowledge.forEach(knowledge => {
    const monthlyWork = knowledge.annualWorkflow.find(w => w.month === month);
    if (monthlyWork) {
      results.push({ duty: knowledge.name, tasks: monthlyWork.tasks });
    }
  });

  return results;
}

// AI용 컨텍스트 생성
export function generateAIContext(dutyId?: string): string {
  const knowledge = dutyId
    ? allDutyKnowledge.filter(k => k.id === dutyId)
    : allDutyKnowledge;

  let context = '# 초등교사 업무분장 가이드 지식베이스\n\n';

  knowledge.forEach(k => {
    context += `## ${k.name} (${k.shortName})\n`;
    context += `${k.description}\n\n`;

    context += '### 법적 근거\n';
    k.legalBasis.forEach(l => {
      context += `- ${l.law} ${l.article}: ${l.content}\n`;
    });

    context += '\n### 연간 주요 업무\n';
    k.annualWorkflow.forEach(w => {
      context += `- ${w.month}월: ${w.tasks.join(', ')}\n`;
    });

    context += '\n### 자주 묻는 질문\n';
    k.faq.forEach(f => {
      context += `Q: ${f.question}\nA: ${f.answer}\n\n`;
    });

    context += '\n### 실무 팁\n';
    k.practicalTips.forEach(t => {
      context += `- ${t}\n`;
    });

    context += '\n---\n\n';
  });

  // 강화 DB 추가 (500+ 자료원 교차검증)
  context += '\n# 강화형 종합 업무 데이터베이스 (Enhanced DB)\n\n';

  // 법정 의무교육
  context += '## 법정 의무교육 (학생 대상)\n';
  ENHANCED_TEACHER_DB.mandatoryEducation.items.forEach(item => {
    context += `- **${item.name}**: ${item.legalBasis} / ${item.requiredHours} / ${item.timing}\n`;
    if (item.neisPath) context += `  NEIS: ${item.neisPath}\n`;
  });

  // 교사 필수 연수
  context += '\n## 교사 필수 연수\n';
  ENHANCED_TEACHER_DB.teacherTraining.items.forEach(item => {
    context += `- **${item.name}**: ${item.legalBasis} / ${item.requiredHours} / 기한: ${item.deadline}\n`;
  });

  // K-에듀파인
  context += '\n## K-에듀파인 업무 가이드\n';
  ENHANCED_TEACHER_DB.kEduFine.mainMenus.forEach(menu => {
    context += `- **${menu.name}**: ${menu.path}\n`;
    menu.subMenus.forEach(sub => {
      context += `  - ${sub.name}: ${sub.description}\n`;
    });
  });

  // 학교운영위원회
  context += '\n## 학교운영위원회\n';
  context += `구성: ${ENHANCED_TEACHER_DB.schoolCommittee.composition.description}\n`;
  context += '심의사항:\n';
  ENHANCED_TEACHER_DB.schoolCommittee.mandatoryAgenda.deliberation.forEach(item => {
    context += `- ${item.name} (${item.legalBasis}): ${item.timing}\n`;
  });

  // 늘봄학교
  context += '\n## 늘봄학교/돌봄\n';
  ENHANCED_TEACHER_DB.neulbomSchool.types.forEach(t => {
    context += `- **${t.name}**: ${t.time} / 대상: ${t.target}\n`;
  });

  // 2022 개정교육과정
  context += '\n## 2022 개정교육과정 핵심 변경\n';
  Object.values(ENHANCED_TEACHER_DB.curriculum2022.subjectChanges).forEach(s => {
    context += `- **${s.name}**: ${s.keyChanges.join(', ')}\n`;
  });

  // 교원능력개발평가
  context += '\n## 교원능력개발평가\n';
  const te = ENHANCED_TEACHER_DB.teacherEvaluation;
  context += `일정:\n`;
  te.schedule.forEach(s => {
    context += `- ${s.period}: ${s.task}\n`;
  });
  te.evaluationType.forEach(t => {
    context += `- ${t.name}: 평가자 ${t.evaluator}, 방법 ${t.method}\n`;
  });

  // 교육활동 보호
  context += '\n## 교육활동 보호 (교권보호)\n';
  const tp = ENHANCED_TEACHER_DB.teacherProtection;
  context += `법적 근거: ${tp.legalBasis}\n`;
  tp.keyProvisions.forEach(r => {
    context += `- ${r.title}: ${r.items.join('; ')}\n`;
  });

  // 다문화교육
  context += '\n## 다문화교육\n';
  ENHANCED_TEACHER_DB.multiculturalEducation.studentTypes.forEach(st => {
    context += `- **${st.type}**: ${st.support}\n`;
  });

  // 학교회계
  context += '\n## 학교회계 (예산)\n';
  ENHANCED_TEACHER_DB.schoolBudget.budgetProcess.steps.forEach(p => {
    context += `${p.step}: ${p.detail} (${p.timing})\n`;
  });

  // 담임교사 루틴
  context += '\n## 담임교사 일일 루틴\n';
  Object.values(ENHANCED_TEACHER_DB.dailyRoutines.daily).forEach(period => {
    context += `**${period.time}**\n`;
    period.tasks.forEach(task => {
      context += `- ${task.name} (${task.duration}): ${task.detail}\n`;
    });
  });

  // 주간 루틴
  context += '\n## 담임교사 주간 루틴\n';
  Object.entries(ENHANCED_TEACHER_DB.dailyRoutines.weekly).forEach(([day, tasks]) => {
    context += `- **${day}**: ${tasks.join(', ')}\n`;
  });

  // 교사 플랫폼
  context += '\n## 교사 사용 플랫폼\n';
  ENHANCED_TEACHER_DB.platforms.systems.forEach(p => {
    context += `- **${p.name}** (${p.url}): ${p.purpose}\n`;
  });

  // 법령 총정리
  context += '\n## 교사 필수 법령\n';
  ENHANCED_TEACHER_DB.legalReferences.categories.forEach(cat => {
    context += `### ${cat.category}\n`;
    cat.laws.forEach(l => {
      context += `- **${l.name}**: ${l.keyArticles.join('; ')}\n`;
    });
  });

  // 20개 부서별 업무
  context += '\n## 업무분장 20개 영역\n';
  ENHANCED_TEACHER_DB.departmentDuties.departments.forEach(dept => {
    context += `- **${dept.name}**: ${dept.keyDuties.join(', ')}\n`;
  });

  // NEIS 상세 메뉴
  context += '\n## NEIS 상세 메뉴 가이드\n';
  ENHANCED_TEACHER_DB.neisEnhanced.majorMenus.forEach(cat => {
    context += `### ${cat.category}\n`;
    cat.menus.forEach(m => {
      context += `- ${m.path}: ${m.usage}\n`;
    });
  });

  // 월별 보강 업무
  context += '\n## 월별 보강 업무 (기존 누락분)\n';
  Object.entries(ENHANCED_TEACHER_DB.monthlyTasksEnhanced.months).forEach(([month, data]) => {
    context += `### ${(data as { title: string; tasks: Array<{ name: string; detail: string }> }).title}\n`;
    (data as { title: string; tasks: Array<{ name: string; detail: string }> }).tasks.forEach(t => {
      context += `- ${t.name}: ${t.detail}\n`;
    });
  });

  return context;
}

export default allDutyKnowledge;
