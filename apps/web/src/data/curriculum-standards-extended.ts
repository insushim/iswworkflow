// 2022 개정 교육과정 성취기준 확장 데이터 (초등학교)
// 출처: 국가교육과정정보센터(NCIC), 교육부 교육과정 문서

import { CurriculumStandard, subjectInfo, gradeGroupInfo } from './curriculum-standards';

// ========================================
// 도덕 1-2학년군 (바른생활)
// ========================================
export const moralStandards12: CurriculumStandard[] = [
  {
    id: 'mor-12-001',
    subject: '도덕',
    gradeGroup: '1-2',
    domain: '자신과의 관계',
    standardCode: '[2바01-01]',
    content: '자기 자신을 소중하게 여기며, 자신의 좋은 점을 찾아본다.',
    keywords: ['자아존중', '자기이해', '장점'],
    level: {
      high: '자신의 장점을 여러 가지 찾아 구체적으로 표현할 수 있다.',
      middle: '자신의 좋은 점을 찾아 말할 수 있다.',
      low: '교사의 도움을 받아 자신의 좋은 점을 생각해 볼 수 있다.',
    },
  },
  {
    id: 'mor-12-002',
    subject: '도덕',
    gradeGroup: '1-2',
    domain: '자신과의 관계',
    standardCode: '[2바01-02]',
    content: '정직의 의미와 중요성을 알고, 정직하게 생활한다.',
    keywords: ['정직', '진실', '거짓말'],
  },
  {
    id: 'mor-12-003',
    subject: '도덕',
    gradeGroup: '1-2',
    domain: '타인과의 관계',
    standardCode: '[2바02-01]',
    content: '가족에게 고마운 마음을 표현하고, 가족을 위해 할 수 있는 일을 한다.',
    keywords: ['가족', '감사', '효도'],
  },
  {
    id: 'mor-12-004',
    subject: '도덕',
    gradeGroup: '1-2',
    domain: '타인과의 관계',
    standardCode: '[2바02-02]',
    content: '친구와 사이좋게 지내며, 친구를 소중히 여긴다.',
    keywords: ['우정', '친구', '배려'],
  },
  {
    id: 'mor-12-005',
    subject: '도덕',
    gradeGroup: '1-2',
    domain: '타인과의 관계',
    standardCode: '[2바02-03]',
    content: '어른을 공경하고, 예의 바르게 행동한다.',
    keywords: ['공경', '예의', '어른'],
  },
  {
    id: 'mor-12-006',
    subject: '도덕',
    gradeGroup: '1-2',
    domain: '사회와의 관계',
    standardCode: '[2바03-01]',
    content: '공공장소에서 질서를 지키고, 규칙을 따른다.',
    keywords: ['질서', '규칙', '공공장소'],
  },
  {
    id: 'mor-12-007',
    subject: '도덕',
    gradeGroup: '1-2',
    domain: '자연과의 관계',
    standardCode: '[2바04-01]',
    content: '자연과 생명의 소중함을 알고, 자연을 보호하려는 마음을 갖는다.',
    keywords: ['자연', '생명', '환경'],
  },
];

// ========================================
// 도덕 3-4학년군
// ========================================
export const moralStandards34: CurriculumStandard[] = [
  {
    id: 'mor-34-001',
    subject: '도덕',
    gradeGroup: '3-4',
    domain: '자신과의 관계',
    standardCode: '[4도01-01]',
    content: '자신의 감정을 조절하고, 자기 관리를 통해 성실하게 생활한다.',
    keywords: ['감정조절', '자기관리', '성실'],
    level: {
      high: '다양한 상황에서 감정을 적절히 조절하고 성실하게 행동할 수 있다.',
      middle: '자신의 감정을 인식하고 조절하려고 노력한다.',
      low: '교사의 도움을 받아 감정을 조절하려고 한다.',
    },
  },
  {
    id: 'mor-34-002',
    subject: '도덕',
    gradeGroup: '3-4',
    domain: '자신과의 관계',
    standardCode: '[4도01-02]',
    content: '올바른 생활 습관의 중요성을 알고 실천한다.',
    keywords: ['생활습관', '실천', '규칙적'],
  },
  {
    id: 'mor-34-003',
    subject: '도덕',
    gradeGroup: '3-4',
    domain: '타인과의 관계',
    standardCode: '[4도02-01]',
    content: '친구 간에 지켜야 할 도리를 알고, 친구와 사이좋게 지낸다.',
    keywords: ['우정', '신뢰', '존중'],
  },
  {
    id: 'mor-34-004',
    subject: '도덕',
    gradeGroup: '3-4',
    domain: '타인과의 관계',
    standardCode: '[4도02-02]',
    content: '다른 사람의 입장을 이해하고 공감하며 배려한다.',
    keywords: ['공감', '배려', '이해'],
  },
  {
    id: 'mor-34-005',
    subject: '도덕',
    gradeGroup: '3-4',
    domain: '사회와의 관계',
    standardCode: '[4도03-01]',
    content: '법과 규칙의 중요성을 이해하고, 공정한 사회를 위해 노력한다.',
    keywords: ['법', '규칙', '공정'],
  },
  {
    id: 'mor-34-006',
    subject: '도덕',
    gradeGroup: '3-4',
    domain: '사회와의 관계',
    standardCode: '[4도03-02]',
    content: '통일을 위해 노력해야 하는 이유를 알고, 통일 의지를 갖는다.',
    keywords: ['통일', '민족', '평화'],
  },
  {
    id: 'mor-34-007',
    subject: '도덕',
    gradeGroup: '3-4',
    domain: '자연과의 관계',
    standardCode: '[4도04-01]',
    content: '생명의 소중함을 이해하고, 인간과 동물, 자연 환경을 존중한다.',
    keywords: ['생명존중', '자연환경', '동물보호'],
  },
];

// ========================================
// 도덕 5-6학년군
// ========================================
export const moralStandards56: CurriculumStandard[] = [
  {
    id: 'mor-56-001',
    subject: '도덕',
    gradeGroup: '5-6',
    domain: '자신과의 관계',
    standardCode: '[6도01-01]',
    content: '자아 정체성을 형성하고, 자신의 삶에 대한 자주적 태도를 기른다.',
    keywords: ['정체성', '자주', '성찰'],
    level: {
      high: '자신의 정체성을 명확히 인식하고 자주적으로 삶을 계획할 수 있다.',
      middle: '자신에 대해 이해하고 자주적으로 생활하려고 노력한다.',
      low: '교사의 도움을 받아 자신에 대해 생각해 본다.',
    },
  },
  {
    id: 'mor-56-002',
    subject: '도덕',
    gradeGroup: '5-6',
    domain: '자신과의 관계',
    standardCode: '[6도01-02]',
    content: '도덕적 상상력을 발휘하여 바람직한 가치를 추구한다.',
    keywords: ['도덕적상상력', '가치', '윤리'],
  },
  {
    id: 'mor-56-003',
    subject: '도덕',
    gradeGroup: '5-6',
    domain: '타인과의 관계',
    standardCode: '[6도02-01]',
    content: '인권을 존중하고 다양성을 인정하며 다른 사람을 배려한다.',
    keywords: ['인권', '다양성', '배려'],
  },
  {
    id: 'mor-56-004',
    subject: '도덕',
    gradeGroup: '5-6',
    domain: '타인과의 관계',
    standardCode: '[6도02-02]',
    content: '사이버 공간에서의 예절과 올바른 언어 사용을 실천한다.',
    keywords: ['사이버예절', '네티켓', '언어'],
  },
  {
    id: 'mor-56-005',
    subject: '도덕',
    gradeGroup: '5-6',
    domain: '사회와의 관계',
    standardCode: '[6도03-01]',
    content: '정의로운 사회와 민주 시민의 역할을 이해하고 실천한다.',
    keywords: ['정의', '민주시민', '사회참여'],
  },
  {
    id: 'mor-56-006',
    subject: '도덕',
    gradeGroup: '5-6',
    domain: '사회와의 관계',
    standardCode: '[6도03-02]',
    content: '세계 시민으로서 평화와 상생을 위해 노력한다.',
    keywords: ['세계시민', '평화', '상생'],
  },
  {
    id: 'mor-56-007',
    subject: '도덕',
    gradeGroup: '5-6',
    domain: '자연과의 관계',
    standardCode: '[6도04-01]',
    content: '환경 문제에 관심을 갖고 지속 가능한 발전을 위해 실천한다.',
    keywords: ['환경', '지속가능성', '실천'],
  },
];

// ========================================
// 체육 3-4학년군
// ========================================
export const peStandards34: CurriculumStandard[] = [
  {
    id: 'pe-34-001',
    subject: '체육',
    gradeGroup: '3-4',
    domain: '건강',
    standardCode: '[4체01-01]',
    content: '건강한 생활 습관의 중요성을 알고 건강을 유지하는 방법을 실천한다.',
    keywords: ['건강', '생활습관', '운동'],
    level: {
      high: '건강한 생활 습관을 스스로 실천하고 지속적으로 운동할 수 있다.',
      middle: '건강을 유지하는 방법을 알고 실천하려고 노력한다.',
      low: '교사의 도움을 받아 건강 관련 활동에 참여한다.',
    },
  },
  {
    id: 'pe-34-002',
    subject: '체육',
    gradeGroup: '3-4',
    domain: '건강',
    standardCode: '[4체01-02]',
    content: '체력을 기르기 위한 운동을 꾸준히 실천한다.',
    keywords: ['체력', '운동', '실천'],
  },
  {
    id: 'pe-34-003',
    subject: '체육',
    gradeGroup: '3-4',
    domain: '도전',
    standardCode: '[4체02-01]',
    content: '자신의 체력을 알고 체력을 향상시키기 위해 도전한다.',
    keywords: ['도전', '체력향상', '목표'],
  },
  {
    id: 'pe-34-004',
    subject: '체육',
    gradeGroup: '3-4',
    domain: '도전',
    standardCode: '[4체02-02]',
    content: '기록 도전과 관련된 활동에 참여하고 자기 기록을 갱신하기 위해 노력한다.',
    keywords: ['기록', '도전', '갱신'],
  },
  {
    id: 'pe-34-005',
    subject: '체육',
    gradeGroup: '3-4',
    domain: '경쟁',
    standardCode: '[4체03-01]',
    content: '게임에 참여하여 기본 기능을 익히고 규칙을 지킨다.',
    keywords: ['게임', '기능', '규칙'],
  },
  {
    id: 'pe-34-006',
    subject: '체육',
    gradeGroup: '3-4',
    domain: '경쟁',
    standardCode: '[4체03-02]',
    content: '경기에서 협동하고 상대를 배려하는 스포츠맨십을 기른다.',
    keywords: ['협동', '배려', '스포츠맨십'],
  },
  {
    id: 'pe-34-007',
    subject: '체육',
    gradeGroup: '3-4',
    domain: '표현',
    standardCode: '[4체04-01]',
    content: '음악에 맞추어 다양한 동작을 표현한다.',
    keywords: ['표현', '동작', '음악'],
  },
  {
    id: 'pe-34-008',
    subject: '체육',
    gradeGroup: '3-4',
    domain: '안전',
    standardCode: '[4체05-01]',
    content: '안전한 신체 활동의 중요성을 알고, 안전 수칙을 지킨다.',
    keywords: ['안전', '수칙', '신체활동'],
  },
];

// ========================================
// 체육 5-6학년군
// ========================================
export const peStandards56: CurriculumStandard[] = [
  {
    id: 'pe-56-001',
    subject: '체육',
    gradeGroup: '5-6',
    domain: '건강',
    standardCode: '[6체01-01]',
    content: '건강 체력을 평가하고, 건강 체력을 증진시키기 위해 운동 계획을 세워 실천한다.',
    keywords: ['건강체력', '평가', '운동계획'],
    level: {
      high: '자신에게 맞는 운동 계획을 세우고 꾸준히 실천하여 체력을 향상시킨다.',
      middle: '건강 체력을 평가하고 운동 계획을 세워 실천하려고 노력한다.',
      low: '교사의 도움을 받아 건강 체력 향상 활동에 참여한다.',
    },
  },
  {
    id: 'pe-56-002',
    subject: '체육',
    gradeGroup: '5-6',
    domain: '건강',
    standardCode: '[6체01-02]',
    content: '자신의 생활 방식과 건강 관련 문제를 분석하고 개선한다.',
    keywords: ['생활방식', '건강관리', '개선'],
  },
  {
    id: 'pe-56-003',
    subject: '체육',
    gradeGroup: '5-6',
    domain: '도전',
    standardCode: '[6체02-01]',
    content: '동작 도전에 참여하여 기본 동작을 익히고 기록을 향상시킨다.',
    keywords: ['동작', '도전', '기록'],
  },
  {
    id: 'pe-56-004',
    subject: '체육',
    gradeGroup: '5-6',
    domain: '도전',
    standardCode: '[6체02-02]',
    content: '도전 활동에서 끈기와 인내심을 기르며 목표 달성을 위해 노력한다.',
    keywords: ['끈기', '인내', '목표'],
  },
  {
    id: 'pe-56-005',
    subject: '체육',
    gradeGroup: '5-6',
    domain: '경쟁',
    standardCode: '[6체03-01]',
    content: '영역형 경쟁의 기본 전략과 기능을 이해하고 게임에 참여한다.',
    keywords: ['영역형', '전략', '게임'],
  },
  {
    id: 'pe-56-006',
    subject: '체육',
    gradeGroup: '5-6',
    domain: '경쟁',
    standardCode: '[6체03-02]',
    content: '네트형 경쟁의 규칙과 기능을 이해하고 게임에 참여한다.',
    keywords: ['네트형', '규칙', '게임'],
  },
  {
    id: 'pe-56-007',
    subject: '체육',
    gradeGroup: '5-6',
    domain: '경쟁',
    standardCode: '[6체03-03]',
    content: '필드형 경쟁의 전략과 협동을 이해하고 게임에 참여한다.',
    keywords: ['필드형', '전략', '협동'],
  },
  {
    id: 'pe-56-008',
    subject: '체육',
    gradeGroup: '5-6',
    domain: '표현',
    standardCode: '[6체04-01]',
    content: '창작 표현 활동을 통해 창의력과 심미성을 기른다.',
    keywords: ['창작', '표현', '심미성'],
  },
  {
    id: 'pe-56-009',
    subject: '체육',
    gradeGroup: '5-6',
    domain: '안전',
    standardCode: '[6체05-01]',
    content: '신체 활동과 관련된 안전 사고를 예방하고 대처하는 방법을 익힌다.',
    keywords: ['안전', '예방', '대처'],
  },
];

// ========================================
// 음악 3-4학년군
// ========================================
export const musicStandards34: CurriculumStandard[] = [
  {
    id: 'mus-34-001',
    subject: '음악',
    gradeGroup: '3-4',
    domain: '표현',
    standardCode: '[4음01-01]',
    content: '악곡의 특징을 이해하며 노래를 부르거나 악기를 연주한다.',
    keywords: ['노래', '악기', '연주'],
    level: {
      high: '악곡의 특징을 정확히 이해하고 표현력 있게 노래하거나 연주할 수 있다.',
      middle: '악곡의 특징을 이해하며 노래하거나 연주할 수 있다.',
      low: '교사의 도움을 받아 노래하거나 간단한 악기를 연주할 수 있다.',
    },
  },
  {
    id: 'mus-34-002',
    subject: '음악',
    gradeGroup: '3-4',
    domain: '표현',
    standardCode: '[4음01-02]',
    content: '바른 자세와 호흡으로 노래를 부른다.',
    keywords: ['자세', '호흡', '노래'],
  },
  {
    id: 'mus-34-003',
    subject: '음악',
    gradeGroup: '3-4',
    domain: '표현',
    standardCode: '[4음01-03]',
    content: '리듬악기, 가락악기 등을 연주할 수 있다.',
    keywords: ['리듬악기', '가락악기', '연주'],
  },
  {
    id: 'mus-34-004',
    subject: '음악',
    gradeGroup: '3-4',
    domain: '표현',
    standardCode: '[4음01-04]',
    content: '음악의 요소(박자, 빠르기, 셈여림 등)를 살려 표현한다.',
    keywords: ['박자', '빠르기', '셈여림'],
  },
  {
    id: 'mus-34-005',
    subject: '음악',
    gradeGroup: '3-4',
    domain: '감상',
    standardCode: '[4음02-01]',
    content: '악곡을 듣고 음악의 요소를 구별하여 표현한다.',
    keywords: ['감상', '음악요소', '구별'],
  },
  {
    id: 'mus-34-006',
    subject: '음악',
    gradeGroup: '3-4',
    domain: '감상',
    standardCode: '[4음02-02]',
    content: '음악을 듣고 느낌을 다양한 방법으로 표현한다.',
    keywords: ['느낌', '표현', '감상'],
  },
  {
    id: 'mus-34-007',
    subject: '음악',
    gradeGroup: '3-4',
    domain: '생활화',
    standardCode: '[4음03-01]',
    content: '생활 속에서 음악을 활용하고 즐기는 태도를 갖는다.',
    keywords: ['생활', '음악활용', '즐기기'],
  },
];

// ========================================
// 음악 5-6학년군
// ========================================
export const musicStandards56: CurriculumStandard[] = [
  {
    id: 'mus-56-001',
    subject: '음악',
    gradeGroup: '5-6',
    domain: '표현',
    standardCode: '[6음01-01]',
    content: '악곡의 특징을 이해하여 노래를 부르거나 악기를 연주한다.',
    keywords: ['악곡', '노래', '연주'],
    level: {
      high: '악곡의 특징을 깊이 이해하고 풍부한 표현력으로 노래하거나 연주한다.',
      middle: '악곡의 특징을 이해하며 적절하게 표현할 수 있다.',
      low: '교사의 도움을 받아 악곡에 맞춰 표현할 수 있다.',
    },
  },
  {
    id: 'mus-56-002',
    subject: '음악',
    gradeGroup: '5-6',
    domain: '표현',
    standardCode: '[6음01-02]',
    content: '다양한 악기의 특징을 이해하며 연주한다.',
    keywords: ['악기', '특징', '연주'],
  },
  {
    id: 'mus-56-003',
    subject: '음악',
    gradeGroup: '5-6',
    domain: '표현',
    standardCode: '[6음01-03]',
    content: '조표에 따른 장조와 단조를 구별하고 표현한다.',
    keywords: ['조표', '장조', '단조'],
  },
  {
    id: 'mus-56-004',
    subject: '음악',
    gradeGroup: '5-6',
    domain: '감상',
    standardCode: '[6음02-01]',
    content: '다양한 시대와 문화권의 음악을 듣고 특징을 비교한다.',
    keywords: ['시대', '문화', '비교'],
  },
  {
    id: 'mus-56-005',
    subject: '음악',
    gradeGroup: '5-6',
    domain: '감상',
    standardCode: '[6음02-02]',
    content: '우리나라와 세계 여러 나라의 민요와 전통 음악을 감상한다.',
    keywords: ['민요', '전통음악', '세계음악'],
  },
  {
    id: 'mus-56-006',
    subject: '음악',
    gradeGroup: '5-6',
    domain: '생활화',
    standardCode: '[6음03-01]',
    content: '음악의 가치를 인식하고 음악 활동에 적극적으로 참여한다.',
    keywords: ['음악가치', '참여', '생활화'],
  },
];

// ========================================
// 미술 3-4학년군
// ========================================
export const artStandards34: CurriculumStandard[] = [
  {
    id: 'art-34-001',
    subject: '미술',
    gradeGroup: '3-4',
    domain: '체험',
    standardCode: '[4미01-01]',
    content: '자연물과 인공물의 조형적 특징을 탐색하고 느낌을 표현한다.',
    keywords: ['자연물', '인공물', '조형'],
    level: {
      high: '자연물과 인공물의 조형적 특징을 다양하게 탐색하고 창의적으로 표현한다.',
      middle: '조형적 특징을 탐색하고 느낌을 표현할 수 있다.',
      low: '교사의 도움을 받아 조형적 특징을 관찰하고 표현할 수 있다.',
    },
  },
  {
    id: 'art-34-002',
    subject: '미술',
    gradeGroup: '3-4',
    domain: '체험',
    standardCode: '[4미01-02]',
    content: '생활 속에서 미술을 발견하고, 미술과 생활의 관계를 이해한다.',
    keywords: ['생활', '미술', '관계'],
  },
  {
    id: 'art-34-003',
    subject: '미술',
    gradeGroup: '3-4',
    domain: '표현',
    standardCode: '[4미02-01]',
    content: '관찰과 상상을 바탕으로 자유롭게 주제를 표현한다.',
    keywords: ['관찰', '상상', '표현'],
  },
  {
    id: 'art-34-004',
    subject: '미술',
    gradeGroup: '3-4',
    domain: '표현',
    standardCode: '[4미02-02]',
    content: '다양한 재료와 용구를 사용하여 조형 활동을 한다.',
    keywords: ['재료', '용구', '조형'],
  },
  {
    id: 'art-34-005',
    subject: '미술',
    gradeGroup: '3-4',
    domain: '표현',
    standardCode: '[4미02-03]',
    content: '평면과 입체에 다양한 표현 방법을 적용한다.',
    keywords: ['평면', '입체', '표현방법'],
  },
  {
    id: 'art-34-006',
    subject: '미술',
    gradeGroup: '3-4',
    domain: '감상',
    standardCode: '[4미03-01]',
    content: '미술 작품을 감상하고 자신의 느낌과 생각을 발표한다.',
    keywords: ['감상', '느낌', '발표'],
  },
  {
    id: 'art-34-007',
    subject: '미술',
    gradeGroup: '3-4',
    domain: '감상',
    standardCode: '[4미03-02]',
    content: '우리 미술의 특징을 이해하고 전통 미술에 관심을 갖는다.',
    keywords: ['우리미술', '전통', '특징'],
  },
];

// ========================================
// 미술 5-6학년군
// ========================================
export const artStandards56: CurriculumStandard[] = [
  {
    id: 'art-56-001',
    subject: '미술',
    gradeGroup: '5-6',
    domain: '체험',
    standardCode: '[6미01-01]',
    content: '자연과 생활환경에서 발견한 미적 특징을 활용하여 주제를 탐색한다.',
    keywords: ['자연', '환경', '미적특징'],
    level: {
      high: '자연과 생활환경에서 다양한 미적 특징을 발견하고 창의적으로 탐색한다.',
      middle: '미적 특징을 발견하고 주제를 탐색할 수 있다.',
      low: '교사의 도움을 받아 미적 특징을 찾고 탐색할 수 있다.',
    },
  },
  {
    id: 'art-56-002',
    subject: '미술',
    gradeGroup: '5-6',
    domain: '체험',
    standardCode: '[6미01-02]',
    content: '시각 문화 환경과 미술의 관계를 이해한다.',
    keywords: ['시각문화', '미술', '관계'],
  },
  {
    id: 'art-56-003',
    subject: '미술',
    gradeGroup: '5-6',
    domain: '표현',
    standardCode: '[6미02-01]',
    content: '조형 요소와 원리를 적용하여 창의적으로 표현한다.',
    keywords: ['조형요소', '원리', '창의적'],
  },
  {
    id: 'art-56-004',
    subject: '미술',
    gradeGroup: '5-6',
    domain: '표현',
    standardCode: '[6미02-02]',
    content: '다양한 발상 방법을 활용하여 아이디어를 발전시킨다.',
    keywords: ['발상', '아이디어', '발전'],
  },
  {
    id: 'art-56-005',
    subject: '미술',
    gradeGroup: '5-6',
    domain: '표현',
    standardCode: '[6미02-03]',
    content: '디자인의 목적과 의도를 고려하여 표현한다.',
    keywords: ['디자인', '목적', '의도'],
  },
  {
    id: 'art-56-006',
    subject: '미술',
    gradeGroup: '5-6',
    domain: '감상',
    standardCode: '[6미03-01]',
    content: '다양한 시대와 문화의 미술 작품을 감상하고 비평한다.',
    keywords: ['시대', '문화', '비평'],
  },
  {
    id: 'art-56-007',
    subject: '미술',
    gradeGroup: '5-6',
    domain: '감상',
    standardCode: '[6미03-02]',
    content: '미술품의 가치와 미술가의 역할을 이해한다.',
    keywords: ['가치', '미술가', '역할'],
  },
];

// ========================================
// 실과 5-6학년군
// ========================================
export const practicalArtsStandards56: CurriculumStandard[] = [
  {
    id: 'prac-56-001',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '기술 시스템',
    standardCode: '[6실01-01]',
    content: '일상생활에서 기술의 중요성을 이해하고 간단한 제품을 만든다.',
    keywords: ['기술', '중요성', '제품'],
    level: {
      high: '기술의 중요성을 이해하고 창의적으로 제품을 설계하여 제작한다.',
      middle: '간단한 제품을 설계하고 제작할 수 있다.',
      low: '교사의 도움을 받아 간단한 제품을 만들 수 있다.',
    },
  },
  {
    id: 'prac-56-002',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '기술 시스템',
    standardCode: '[6실01-02]',
    content: '기계의 원리를 이해하고 간단한 기계 장치를 조립한다.',
    keywords: ['기계', '원리', '조립'],
  },
  {
    id: 'prac-56-003',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '기술 활용',
    standardCode: '[6실02-01]',
    content: '정보 기기의 활용 방법을 알고 생활에서 활용한다.',
    keywords: ['정보기기', '활용', '생활'],
  },
  {
    id: 'prac-56-004',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '기술 활용',
    standardCode: '[6실02-02]',
    content: '소프트웨어의 개념과 중요성을 이해하고 간단한 프로그램을 작성한다.',
    keywords: ['소프트웨어', '프로그램', '코딩'],
  },
  {
    id: 'prac-56-005',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '기술 활용',
    standardCode: '[6실02-03]',
    content: '알고리즘의 의미를 이해하고 순서도로 표현한다.',
    keywords: ['알고리즘', '순서도', '논리'],
  },
  {
    id: 'prac-56-006',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '가정생활',
    standardCode: '[6실03-01]',
    content: '균형 잡힌 식사의 중요성을 알고 간단한 조리를 한다.',
    keywords: ['식사', '균형', '조리'],
  },
  {
    id: 'prac-56-007',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '가정생활',
    standardCode: '[6실03-02]',
    content: '손바느질을 활용하여 간단한 용품을 만든다.',
    keywords: ['손바느질', '용품', '제작'],
  },
  {
    id: 'prac-56-008',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '가정생활',
    standardCode: '[6실03-03]',
    content: '합리적인 소비 생활의 중요성을 이해하고 실천한다.',
    keywords: ['소비', '합리적', '실천'],
  },
  {
    id: 'prac-56-009',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '자연 환경',
    standardCode: '[6실04-01]',
    content: '식물을 기르며 생명의 소중함을 느끼고 책임감을 기른다.',
    keywords: ['식물', '생명', '책임감'],
  },
  {
    id: 'prac-56-010',
    subject: '실과',
    gradeGroup: '5-6',
    domain: '자연 환경',
    standardCode: '[6실04-02]',
    content: '동물을 돌보며 생명을 존중하는 태도를 갖는다.',
    keywords: ['동물', '돌봄', '생명존중'],
  },
];

// ========================================
// 국어 추가 (상세 성취기준)
// ========================================
export const additionalKoreanStandards: CurriculumStandard[] = [
  // 1-2학년군 추가
  {
    id: 'kor-12-009',
    subject: '국어',
    gradeGroup: '1-2',
    domain: '문법',
    standardCode: '[2국04-01]',
    content: '낱말과 낱말의 의미 관계를 파악한다.',
    keywords: ['낱말', '의미', '관계'],
  },
  {
    id: 'kor-12-010',
    subject: '국어',
    gradeGroup: '1-2',
    domain: '문법',
    standardCode: '[2국04-02]',
    content: '소리와 표기가 다를 수 있음을 알고 낱말을 바르게 읽고 쓴다.',
    keywords: ['소리', '표기', '맞춤법'],
  },
  // 3-4학년군 추가
  {
    id: 'kor-34-007',
    subject: '국어',
    gradeGroup: '3-4',
    domain: '쓰기',
    standardCode: '[4국03-02]',
    content: '시간의 흐름에 따라 사건이나 행동이 드러나게 글을 쓴다.',
    keywords: ['시간순서', '사건', '글쓰기'],
  },
  {
    id: 'kor-34-008',
    subject: '국어',
    gradeGroup: '3-4',
    domain: '문법',
    standardCode: '[4국04-01]',
    content: '낱말을 분류하고 국어사전에서 찾는다.',
    keywords: ['국어사전', '낱말', '찾기'],
  },
  {
    id: 'kor-34-009',
    subject: '국어',
    gradeGroup: '3-4',
    domain: '문학',
    standardCode: '[4국05-02]',
    content: '이야기를 읽고 인물의 마음과 행동을 상상한다.',
    keywords: ['인물', '상상', '이야기'],
  },
  // 5-6학년군 추가
  {
    id: 'kor-56-006',
    subject: '국어',
    gradeGroup: '5-6',
    domain: '문법',
    standardCode: '[6국04-01]',
    content: '문장 성분의 개념과 역할을 이해하고 올바른 문장을 쓴다.',
    keywords: ['문장성분', '문법', '올바른문장'],
  },
  {
    id: 'kor-56-007',
    subject: '국어',
    gradeGroup: '5-6',
    domain: '문학',
    standardCode: '[6국05-01]',
    content: '작품의 주제와 그것이 드러난 표현을 파악하고 감상한다.',
    keywords: ['주제', '표현', '감상'],
  },
  {
    id: 'kor-56-008',
    subject: '국어',
    gradeGroup: '5-6',
    domain: '문학',
    standardCode: '[6국05-02]',
    content: '작품 속 세계와 현실 세계를 비교하며 작품을 감상한다.',
    keywords: ['세계', '현실', '비교감상'],
  },
];

// ========================================
// 수학 추가 (상세 성취기준)
// ========================================
export const additionalMathStandards: CurriculumStandard[] = [
  // 1-2학년군 추가
  {
    id: 'math-12-007',
    subject: '수학',
    gradeGroup: '1-2',
    domain: '도형과 측정',
    standardCode: '[2수02-03]',
    content: '양의 비교에서 사용하는 말(길다, 짧다, 높다, 낮다 등)을 이해하고 사용한다.',
    keywords: ['비교', '측정', '표현'],
  },
  {
    id: 'math-12-008',
    subject: '수학',
    gradeGroup: '1-2',
    domain: '자료와 가능성',
    standardCode: '[2수04-01]',
    content: '분류한 자료를 정리하여 표로 나타내고 읽을 수 있다.',
    keywords: ['분류', '자료', '표'],
  },
  // 3-4학년군 추가
  {
    id: 'math-34-008',
    subject: '수학',
    gradeGroup: '3-4',
    domain: '도형과 측정',
    standardCode: '[4수02-03]',
    content: '1cm와 1mm, 1km와 1m의 관계를 알고, 길이를 측정할 수 있다.',
    keywords: ['길이', '단위', '측정'],
  },
  {
    id: 'math-34-009',
    subject: '수학',
    gradeGroup: '3-4',
    domain: '도형과 측정',
    standardCode: '[4수02-04]',
    content: '원을 이용하여 여러 가지 모양을 꾸미고 그릴 수 있다.',
    keywords: ['원', '모양', '그리기'],
  },
  // 5-6학년군 추가
  {
    id: 'math-56-006',
    subject: '수학',
    gradeGroup: '5-6',
    domain: '도형과 측정',
    standardCode: '[6수02-02]',
    content: '원의 넓이를 구하는 방법을 이해하고 원의 넓이를 구할 수 있다.',
    keywords: ['원', '넓이', '공식'],
  },
  {
    id: 'math-56-007',
    subject: '수학',
    gradeGroup: '5-6',
    domain: '자료와 가능성',
    standardCode: '[6수04-01]',
    content: '평균의 의미를 알고, 주어진 자료의 평균을 구할 수 있다.',
    keywords: ['평균', '자료', '통계'],
  },
  {
    id: 'math-56-008',
    subject: '수학',
    gradeGroup: '5-6',
    domain: '자료와 가능성',
    standardCode: '[6수04-02]',
    content: '그림그래프, 막대그래프, 꺾은선그래프, 원그래프를 해석하고 그릴 수 있다.',
    keywords: ['그래프', '해석', '그리기'],
  },
];

// ========================================
// 사회 추가 (상세 성취기준)
// ========================================
export const additionalSocialStandards: CurriculumStandard[] = [
  // 3-4학년군 추가
  {
    id: 'soc-34-005',
    subject: '사회',
    gradeGroup: '3-4',
    domain: '일반사회',
    standardCode: '[4사02-02]',
    content: '필요한 것과 원하는 것을 구별하고 합리적인 선택을 할 수 있다.',
    keywords: ['필요', '원하는것', '선택'],
  },
  {
    id: 'soc-34-006',
    subject: '사회',
    gradeGroup: '3-4',
    domain: '지리',
    standardCode: '[4사01-03]',
    content: '지도를 읽고 활용하는 방법을 익혀 일상생활에서 활용한다.',
    keywords: ['지도', '활용', '읽기'],
  },
  // 5-6학년군 추가
  {
    id: 'soc-56-005',
    subject: '사회',
    gradeGroup: '5-6',
    domain: '역사',
    standardCode: '[6사01-03]',
    content: '고려의 문화와 과학 기술의 발달을 조사하여 발표한다.',
    keywords: ['고려', '문화', '과학기술'],
  },
  {
    id: 'soc-56-006',
    subject: '사회',
    gradeGroup: '5-6',
    domain: '역사',
    standardCode: '[6사01-04]',
    content: '조선의 건국 과정과 통치 체제를 알아보고 문화와 과학의 발달을 탐구한다.',
    keywords: ['조선', '건국', '통치'],
  },
  {
    id: 'soc-56-007',
    subject: '사회',
    gradeGroup: '5-6',
    domain: '지리',
    standardCode: '[6사03-01]',
    content: '세계 여러 대륙과 대양을 지도에서 찾아보고 위치와 특성을 파악한다.',
    keywords: ['대륙', '대양', '세계지도'],
  },
  {
    id: 'soc-56-008',
    subject: '사회',
    gradeGroup: '5-6',
    domain: '일반사회',
    standardCode: '[6사02-03]',
    content: '경제생활에서 생산, 소비, 교환의 의미와 역할을 이해한다.',
    keywords: ['경제', '생산', '소비'],
  },
];

// ========================================
// 과학 추가 (상세 성취기준)
// ========================================
export const additionalScienceStandards: CurriculumStandard[] = [
  // 3-4학년군 추가
  {
    id: 'sci-34-006',
    subject: '과학',
    gradeGroup: '3-4',
    domain: '에너지',
    standardCode: '[4과03-02]',
    content: '그림자의 원리를 이해하고 그림자 크기가 변하는 조건을 탐구한다.',
    keywords: ['그림자', '빛', '조건'],
  },
  {
    id: 'sci-34-007',
    subject: '과학',
    gradeGroup: '3-4',
    domain: '지구와 우주',
    standardCode: '[4과04-01]',
    content: '하루 동안 태양과 달의 위치 변화를 관찰하여 설명한다.',
    keywords: ['태양', '달', '위치변화'],
  },
  {
    id: 'sci-34-008',
    subject: '과학',
    gradeGroup: '3-4',
    domain: '지구와 우주',
    standardCode: '[4과04-02]',
    content: '지표의 변화를 관찰하고 흐르는 물의 작용을 이해한다.',
    keywords: ['지표', '물', '침식'],
  },
  // 5-6학년군 추가
  {
    id: 'sci-56-006',
    subject: '과학',
    gradeGroup: '5-6',
    domain: '물질',
    standardCode: '[6과01-02]',
    content: '여러 가지 기체의 성질을 알고 기체가 생활에서 이용되는 예를 탐색한다.',
    keywords: ['기체', '성질', '이용'],
  },
  {
    id: 'sci-56-007',
    subject: '과학',
    gradeGroup: '5-6',
    domain: '생명',
    standardCode: '[6과02-02]',
    content: '식물의 광합성을 이해하고 광합성에 필요한 조건을 탐구한다.',
    keywords: ['광합성', '식물', '조건'],
  },
  {
    id: 'sci-56-008',
    subject: '과학',
    gradeGroup: '5-6',
    domain: '생명',
    standardCode: '[6과02-03]',
    content: '다양한 생물이 우리 생활에 미치는 영향을 조사하여 발표한다.',
    keywords: ['생물', '생활', '영향'],
  },
];

// 모든 확장 성취기준 통합
export const allExtendedCurriculumStandards: CurriculumStandard[] = [
  ...moralStandards12,
  ...moralStandards34,
  ...moralStandards56,
  ...peStandards34,
  ...peStandards56,
  ...musicStandards34,
  ...musicStandards56,
  ...artStandards34,
  ...artStandards56,
  ...practicalArtsStandards56,
  ...additionalKoreanStandards,
  ...additionalMathStandards,
  ...additionalSocialStandards,
  ...additionalScienceStandards,
];

// 기존 데이터와 통합하여 export
export { subjectInfo, gradeGroupInfo };
