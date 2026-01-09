// 학교생활기록부 예시문 500개+ 데이터
// 출처: 학교생활기록부 기재요령, 교육청 예시문, 현장교사 자료

export interface RecordPhrase {
  id: string;
  category: 'behavior' | 'subject' | 'creative' | 'reading' | 'career';
  subcategory: string;
  grade: number[]; // 해당 학년 (1-6)
  level?: 'high' | 'middle' | 'low'; // 성취수준 (교과의 경우)
  content: string;
  keywords: string[];
}

export const schoolRecordPhrases: RecordPhrase[] = [
  // ========================================
  // 행동특성 및 종합의견 - 학습태도
  // ========================================
  {
    id: 'beh-001',
    category: 'behavior',
    subcategory: '학습태도',
    grade: [1, 2, 3, 4, 5, 6],
    content: '수업 시간에 바른 자세로 집중하며, 선생님의 설명을 경청하고 적극적으로 발표하는 모습이 인상적임.',
    keywords: ['집중', '발표', '학습태도'],
  },
  {
    id: 'beh-002',
    category: 'behavior',
    subcategory: '학습태도',
    grade: [1, 2, 3, 4, 5, 6],
    content: '학습에 대한 호기심이 많아 다양한 분야의 책을 즐겨 읽고, 궁금한 점은 스스로 탐구하려는 자기주도적 학습 태도를 보임.',
    keywords: ['호기심', '독서', '자기주도'],
  },
  {
    id: 'beh-003',
    category: 'behavior',
    subcategory: '학습태도',
    grade: [1, 2, 3, 4, 5, 6],
    content: '과제를 성실하게 수행하며, 어려운 문제도 포기하지 않고 끝까지 해결하려는 끈기가 있음.',
    keywords: ['성실', '끈기', '과제'],
  },
  {
    id: 'beh-004',
    category: 'behavior',
    subcategory: '학습태도',
    grade: [1, 2],
    content: '학교생활에 잘 적응하여 수업 시간에 즐겁게 참여하며, 선생님의 말씀을 잘 듣고 따름.',
    keywords: ['적응', '참여', '저학년'],
  },
  {
    id: 'beh-005',
    category: 'behavior',
    subcategory: '학습태도',
    grade: [3, 4, 5, 6],
    content: '수업 중 질문을 통해 이해하지 못한 부분을 확인하고, 복습을 통해 학습 내용을 정리하는 습관이 있음.',
    keywords: ['질문', '복습', '학습습관'],
  },
  {
    id: 'beh-006',
    category: 'behavior',
    subcategory: '학습태도',
    grade: [5, 6],
    content: '학습 계획을 스스로 세우고 실천하며, 부족한 부분을 파악하여 보완하려는 자기관리 능력이 뛰어남.',
    keywords: ['계획', '자기관리', '고학년'],
  },
  {
    id: 'beh-007',
    category: 'behavior',
    subcategory: '학습태도',
    grade: [1, 2, 3, 4, 5, 6],
    content: '배움에 대한 열정이 있어 새로운 학습 내용에 호기심을 갖고 적극적으로 탐구함.',
    keywords: ['열정', '탐구', '적극성'],
  },
  {
    id: 'beh-008',
    category: 'behavior',
    subcategory: '학습태도',
    grade: [1, 2, 3, 4, 5, 6],
    content: '수업 준비물을 빠짐없이 챙기고, 학습 도구를 정리정돈하여 효율적으로 학습에 임함.',
    keywords: ['준비', '정리정돈', '효율'],
  },

  // ========================================
  // 행동특성 및 종합의견 - 인성 (배려)
  // ========================================
  {
    id: 'beh-009',
    category: 'behavior',
    subcategory: '배려',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(배려) 친구들의 어려움을 먼저 알아채고 도움을 주는 따뜻한 마음을 가지고 있어 급우들에게 신뢰를 받음.',
    keywords: ['배려', '도움', '신뢰'],
  },
  {
    id: 'beh-010',
    category: 'behavior',
    subcategory: '배려',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(배려) 수업 시간이나 활동 중 다른 친구들을 방해하지 않고 조용히 행동하며, 타인을 존중하는 태도가 몸에 배어 있음.',
    keywords: ['배려', '존중', '예의'],
  },
  {
    id: 'beh-011',
    category: 'behavior',
    subcategory: '배려',
    grade: [1, 2, 3],
    content: '(배려) 교실에서 물건을 사용한 후 제자리에 정리하고, 친구들이 사용하기 편하도록 배려하는 마음이 있음.',
    keywords: ['배려', '정리', '저학년'],
  },
  {
    id: 'beh-012',
    category: 'behavior',
    subcategory: '배려',
    grade: [4, 5, 6],
    content: '(배려) 모둠 활동에서 의견을 제시할 때 다른 친구의 의견도 존중하며, 소외되는 친구 없이 모두가 참여할 수 있도록 배려함.',
    keywords: ['배려', '모둠', '협력'],
  },

  // ========================================
  // 행동특성 및 종합의견 - 인성 (나눔)
  // ========================================
  {
    id: 'beh-013',
    category: 'behavior',
    subcategory: '나눔',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(나눔) 자신이 가진 것을 친구들과 기꺼이 나누며, 함께하는 즐거움을 아는 학생임.',
    keywords: ['나눔', '공유', '즐거움'],
  },
  {
    id: 'beh-014',
    category: 'behavior',
    subcategory: '나눔',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(나눔) 학습 내용을 이해하지 못하는 친구에게 자신이 알고 있는 것을 친절하게 설명해주어 함께 성장하는 모습을 보임.',
    keywords: ['나눔', '가르침', '성장'],
  },
  {
    id: 'beh-015',
    category: 'behavior',
    subcategory: '나눔',
    grade: [3, 4, 5, 6],
    content: '(나눔) 어려운 이웃을 돕기 위한 학교 캠페인에 적극 참여하여 나눔의 가치를 실천함.',
    keywords: ['나눔', '봉사', '캠페인'],
  },

  // ========================================
  // 행동특성 및 종합의견 - 인성 (협력)
  // ========================================
  {
    id: 'beh-016',
    category: 'behavior',
    subcategory: '협력',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(협력) 모둠 활동에서 맡은 역할을 책임감 있게 수행하고, 친구들과 의견을 조율하여 공동의 목표를 달성함.',
    keywords: ['협력', '책임', '모둠'],
  },
  {
    id: 'beh-017',
    category: 'behavior',
    subcategory: '협력',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(협력) 학급 행사나 프로젝트에서 친구들과 협력하여 결과물을 만들어내는 과정에서 소통 능력과 팀워크를 발휘함.',
    keywords: ['협력', '소통', '팀워크'],
  },
  {
    id: 'beh-018',
    category: 'behavior',
    subcategory: '협력',
    grade: [4, 5, 6],
    content: '(협력) 갈등 상황에서 중재자 역할을 하며 친구들 사이의 의견 차이를 조율하여 원만하게 해결하는 능력이 있음.',
    keywords: ['협력', '중재', '갈등해결'],
  },

  // ========================================
  // 행동특성 및 종합의견 - 인성 (존중)
  // ========================================
  {
    id: 'beh-019',
    category: 'behavior',
    subcategory: '존중',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(타인존중) 선생님과 친구들에게 예의 바르게 인사하고, 상대방의 이야기를 끝까지 경청하는 자세가 돋보임.',
    keywords: ['존중', '예의', '경청'],
  },
  {
    id: 'beh-020',
    category: 'behavior',
    subcategory: '존중',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(타인존중) 다른 사람의 생각이 자신과 다르더라도 인정하고 존중하며, 다양성을 이해하는 열린 마음을 가지고 있음.',
    keywords: ['존중', '다양성', '열린마음'],
  },
  {
    id: 'beh-021',
    category: 'behavior',
    subcategory: '존중',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(타인존중) 친구의 장점을 칭찬하고 격려하며, 실수에도 비난하지 않고 이해하려는 너그러운 마음이 있음.',
    keywords: ['존중', '칭찬', '이해'],
  },

  // ========================================
  // 행동특성 및 종합의견 - 인성 (책임)
  // ========================================
  {
    id: 'beh-022',
    category: 'behavior',
    subcategory: '책임',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(책임) 학급에서 맡은 1인 1역할을 성실하게 수행하며, 공동체의 일원으로서 책임감을 가지고 생활함.',
    keywords: ['책임', '역할', '성실'],
  },
  {
    id: 'beh-023',
    category: 'behavior',
    subcategory: '책임',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(책임) 자신의 행동에 대해 책임지는 자세가 있으며, 실수를 인정하고 바로잡으려는 노력을 함.',
    keywords: ['책임', '반성', '노력'],
  },
  {
    id: 'beh-024',
    category: 'behavior',
    subcategory: '책임',
    grade: [4, 5, 6],
    content: '(책임) 학급 임원으로서 급우들을 위해 헌신하며, 학급의 문제를 스스로 해결하려는 리더십을 발휘함.',
    keywords: ['책임', '리더십', '헌신'],
  },

  // ========================================
  // 행동특성 및 종합의견 - 인성 (규칙준수)
  // ========================================
  {
    id: 'beh-025',
    category: 'behavior',
    subcategory: '규칙준수',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(규칙준수) 학교 규칙과 학급 약속을 잘 지키며, 질서 있는 학교생활을 통해 안전하고 편안한 학습 환경 조성에 기여함.',
    keywords: ['규칙', '약속', '질서'],
  },
  {
    id: 'beh-026',
    category: 'behavior',
    subcategory: '규칙준수',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(규칙준수) 복도에서 뛰지 않고 우측통행을 하며, 공공장소에서의 예절을 잘 지켜 모범이 됨.',
    keywords: ['규칙', '예절', '모범'],
  },

  // ========================================
  // 행동특성 및 종합의견 - 특기/재능
  // ========================================
  {
    id: 'beh-027',
    category: 'behavior',
    subcategory: '특기',
    grade: [1, 2, 3, 4, 5, 6],
    content: '음악적 감각이 뛰어나 노래와 악기 연주에 재능을 보이며, 학교 음악회에서 멋진 공연을 선보임.',
    keywords: ['음악', '재능', '공연'],
  },
  {
    id: 'beh-028',
    category: 'behavior',
    subcategory: '특기',
    grade: [1, 2, 3, 4, 5, 6],
    content: '미술에 대한 관심과 재능이 있어 다양한 표현 기법을 활용하여 창의적인 작품을 만들어냄.',
    keywords: ['미술', '창의', '표현'],
  },
  {
    id: 'beh-029',
    category: 'behavior',
    subcategory: '특기',
    grade: [1, 2, 3, 4, 5, 6],
    content: '체육 활동에 적극적으로 참여하며, 특히 달리기에서 뛰어난 기록을 보여 운동회에서 좋은 성적을 거둠.',
    keywords: ['체육', '운동', '달리기'],
  },
  {
    id: 'beh-030',
    category: 'behavior',
    subcategory: '특기',
    grade: [3, 4, 5, 6],
    content: '컴퓨터와 코딩에 관심이 많아 SW교육에 적극 참여하고, 간단한 프로그램을 만들어보는 등 정보처리 능력이 우수함.',
    keywords: ['컴퓨터', '코딩', 'SW'],
  },

  // ========================================
  // 행동특성 및 종합의견 - 종합
  // ========================================
  {
    id: 'beh-031',
    category: 'behavior',
    subcategory: '종합',
    grade: [1, 2],
    content: '밝고 명랑한 성격으로 학교생활에 잘 적응하고 있으며, 친구들과 사이좋게 지내고 선생님의 말씀을 잘 따르는 바른 학생임.',
    keywords: ['밝음', '적응', '저학년'],
  },
  {
    id: 'beh-032',
    category: 'behavior',
    subcategory: '종합',
    grade: [3, 4],
    content: '학습에 대한 의욕이 높고 성실하게 노력하는 학생으로, 교우관계도 원만하여 친구들의 신뢰를 받고 있음.',
    keywords: ['성실', '의욕', '교우관계'],
  },
  {
    id: 'beh-033',
    category: 'behavior',
    subcategory: '종합',
    grade: [5, 6],
    content: '자기주도적 학습 능력이 뛰어나고 책임감이 강한 학생으로, 학급의 리더 역할을 훌륭하게 수행하며 급우들에게 긍정적인 영향을 줌.',
    keywords: ['자기주도', '리더', '고학년'],
  },
  {
    id: 'beh-034',
    category: 'behavior',
    subcategory: '종합',
    grade: [1, 2, 3, 4, 5, 6],
    content: '용모가 단정하고 예의가 바르며, 매사에 긍정적인 사고로 주어진 일을 책임감 있게 처리하는 믿음직한 학생임.',
    keywords: ['단정', '예의', '긍정'],
  },
  {
    id: 'beh-035',
    category: 'behavior',
    subcategory: '종합',
    grade: [1, 2, 3, 4, 5, 6],
    content: '감수성이 풍부하고 친구들의 이야기를 잘 경청하며, 공감 능력이 뛰어나 어려운 친구의 좋은 상담자가 됨.',
    keywords: ['감수성', '경청', '공감'],
  },

  // ========================================
  // 교과학습발달상황 - 국어
  // ========================================
  {
    id: 'sub-kor-001',
    category: 'subject',
    subcategory: '국어',
    grade: [1, 2],
    level: 'high',
    content: '한글을 정확하게 읽고 쓸 수 있으며, 문장의 의미를 파악하여 글의 내용을 이해하는 능력이 우수함.',
    keywords: ['국어', '읽기', '쓰기', '저학년'],
  },
  {
    id: 'sub-kor-002',
    category: 'subject',
    subcategory: '국어',
    grade: [1, 2],
    level: 'high',
    content: '그림책을 읽고 인물의 마음을 상상하여 표현하며, 다양한 상황에서 적절한 인사말을 사용할 줄 앎.',
    keywords: ['국어', '상상', '인사말'],
  },
  {
    id: 'sub-kor-003',
    category: 'subject',
    subcategory: '국어',
    grade: [3, 4],
    level: 'high',
    content: '글을 읽고 중심 생각을 파악하는 능력이 뛰어나며, 자신의 생각과 느낌을 조리 있게 글로 표현할 수 있음.',
    keywords: ['국어', '중심생각', '글쓰기'],
  },
  {
    id: 'sub-kor-004',
    category: 'subject',
    subcategory: '국어',
    grade: [3, 4],
    level: 'middle',
    content: '문단의 짜임을 이해하고 글을 읽으며, 일이 일어난 차례에 따라 이야기를 정리할 수 있음.',
    keywords: ['국어', '문단', '이야기'],
  },
  {
    id: 'sub-kor-005',
    category: 'subject',
    subcategory: '국어',
    grade: [5, 6],
    level: 'high',
    content: '글의 구조와 내용을 파악하여 요약하는 능력이 우수하며, 다양한 근거를 들어 자신의 주장을 논리적으로 펼칠 수 있음.',
    keywords: ['국어', '요약', '논리', '주장'],
  },
  {
    id: 'sub-kor-006',
    category: 'subject',
    subcategory: '국어',
    grade: [5, 6],
    level: 'middle',
    content: '문학 작품을 읽고 작품 속 인물의 삶을 이해하며, 관용 표현을 활용하여 생각과 느낌을 풍부하게 표현함.',
    keywords: ['국어', '문학', '관용표현'],
  },
  {
    id: 'sub-kor-007',
    category: 'subject',
    subcategory: '국어',
    grade: [5, 6],
    level: 'high',
    content: '토의와 토론에서 상대의 의견을 존중하면서 자신의 의견을 조리 있게 발표하고, 합리적인 결론을 이끌어냄.',
    keywords: ['국어', '토의', '토론'],
  },

  // ========================================
  // 교과학습발달상황 - 수학
  // ========================================
  {
    id: 'sub-math-001',
    category: 'subject',
    subcategory: '수학',
    grade: [1, 2],
    level: 'high',
    content: '자연수의 덧셈과 뺄셈을 정확하게 계산하며, 다양한 방법으로 문제를 해결하는 수학적 사고력이 발달함.',
    keywords: ['수학', '연산', '사고력'],
  },
  {
    id: 'sub-math-002',
    category: 'subject',
    subcategory: '수학',
    grade: [1, 2],
    level: 'middle',
    content: '수 세기와 모으기, 가르기를 이해하고, 규칙을 찾아 여러 가지 무늬를 만들 수 있음.',
    keywords: ['수학', '수세기', '규칙'],
  },
  {
    id: 'sub-math-003',
    category: 'subject',
    subcategory: '수학',
    grade: [3, 4],
    level: 'high',
    content: '곱셈과 나눗셈의 원리를 이해하고 문제에 적용하며, 분수와 소수의 크기를 비교할 수 있음.',
    keywords: ['수학', '곱셈', '나눗셈', '분수'],
  },
  {
    id: 'sub-math-004',
    category: 'subject',
    subcategory: '수학',
    grade: [3, 4],
    level: 'middle',
    content: '평면도형의 특징을 이해하고 둘레와 넓이를 구할 수 있으며, 그래프를 보고 자료를 해석함.',
    keywords: ['수학', '도형', '그래프'],
  },
  {
    id: 'sub-math-005',
    category: 'subject',
    subcategory: '수학',
    grade: [5, 6],
    level: 'high',
    content: '분수와 소수의 혼합 계산을 능숙하게 처리하며, 비와 비율의 개념을 이해하여 다양한 문제를 해결함.',
    keywords: ['수학', '분수', '비율'],
  },
  {
    id: 'sub-math-006',
    category: 'subject',
    subcategory: '수학',
    grade: [5, 6],
    level: 'high',
    content: '입체도형의 성질을 이해하고 부피와 겉넓이를 구하며, 수학적 추론 능력이 우수함.',
    keywords: ['수학', '입체도형', '추론'],
  },

  // ========================================
  // 교과학습발달상황 - 사회
  // ========================================
  {
    id: 'sub-soc-001',
    category: 'subject',
    subcategory: '사회',
    grade: [3, 4],
    level: 'high',
    content: '우리 고장의 지리적 특성을 이해하고, 옛날과 오늘날의 생활 모습을 비교하여 설명할 수 있음.',
    keywords: ['사회', '고장', '지리'],
  },
  {
    id: 'sub-soc-002',
    category: 'subject',
    subcategory: '사회',
    grade: [3, 4],
    level: 'middle',
    content: '지도를 읽고 해석하는 능력이 있으며, 우리 지역의 공공기관이 하는 일을 이해함.',
    keywords: ['사회', '지도', '공공기관'],
  },
  {
    id: 'sub-soc-003',
    category: 'subject',
    subcategory: '사회',
    grade: [5, 6],
    level: 'high',
    content: '우리나라 역사의 주요 사건과 인물을 이해하고, 역사적 사실을 바탕으로 자신의 의견을 표현할 수 있음.',
    keywords: ['사회', '역사', '인물'],
  },
  {
    id: 'sub-soc-004',
    category: 'subject',
    subcategory: '사회',
    grade: [5, 6],
    level: 'high',
    content: '민주주의의 의미와 시민의 권리와 의무를 이해하며, 세계 여러 나라의 문화적 다양성을 존중하는 태도를 보임.',
    keywords: ['사회', '민주주의', '세계문화'],
  },

  // ========================================
  // 교과학습발달상황 - 과학
  // ========================================
  {
    id: 'sub-sci-001',
    category: 'subject',
    subcategory: '과학',
    grade: [3, 4],
    level: 'high',
    content: '과학적 탐구 과정을 이해하고 실험을 계획하여 수행하며, 관찰 결과를 논리적으로 정리하여 발표함.',
    keywords: ['과학', '탐구', '실험'],
  },
  {
    id: 'sub-sci-002',
    category: 'subject',
    subcategory: '과학',
    grade: [3, 4],
    level: 'middle',
    content: '동물과 식물의 특징을 관찰하고 분류하며, 물질의 상태 변화를 이해함.',
    keywords: ['과학', '생물', '물질'],
  },
  {
    id: 'sub-sci-003',
    category: 'subject',
    subcategory: '과학',
    grade: [5, 6],
    level: 'high',
    content: '지구와 우주에 대한 호기심이 많아 관련 자료를 찾아 탐구하고, 과학적 원리를 일상생활에 적용하여 설명함.',
    keywords: ['과학', '지구', '우주'],
  },
  {
    id: 'sub-sci-004',
    category: 'subject',
    subcategory: '과학',
    grade: [5, 6],
    level: 'high',
    content: '전기 회로의 구성과 작동 원리를 이해하고, 실험을 설계하여 변인을 통제한 탐구 활동을 수행함.',
    keywords: ['과학', '전기', '탐구'],
  },

  // ========================================
  // 교과학습발달상황 - 영어
  // ========================================
  {
    id: 'sub-eng-001',
    category: 'subject',
    subcategory: '영어',
    grade: [3, 4],
    level: 'high',
    content: '알파벳을 정확히 읽고 쓰며, 기본적인 영어 인사말과 자기소개를 자연스럽게 표현할 수 있음.',
    keywords: ['영어', '알파벳', '인사'],
  },
  {
    id: 'sub-eng-002',
    category: 'subject',
    subcategory: '영어',
    grade: [3, 4],
    level: 'middle',
    content: '간단한 영어 노래와 챈트를 따라 부르며, 그림을 보고 관련 영어 단어를 말할 수 있음.',
    keywords: ['영어', '노래', '단어'],
  },
  {
    id: 'sub-eng-003',
    category: 'subject',
    subcategory: '영어',
    grade: [5, 6],
    level: 'high',
    content: '영어로 간단한 대화를 나누고, 짧은 글을 읽고 내용을 파악하여 질문에 답할 수 있음.',
    keywords: ['영어', '대화', '독해'],
  },
  {
    id: 'sub-eng-004',
    category: 'subject',
    subcategory: '영어',
    grade: [5, 6],
    level: 'high',
    content: '영어 문장의 구조를 이해하고 자신의 생각을 간단한 영어 문장으로 쓸 수 있으며, 영어에 대한 흥미가 높음.',
    keywords: ['영어', '문장', '쓰기'],
  },

  // ========================================
  // 창의적체험활동 - 자율활동
  // ========================================
  {
    id: 'cre-auto-001',
    category: 'creative',
    subcategory: '자율활동',
    grade: [1, 2, 3, 4, 5, 6],
    content: '학급 회의에 적극적으로 참여하여 의견을 제시하고, 다수결의 원칙을 존중하며 민주적 의사결정 과정을 경험함.',
    keywords: ['자율', '학급회의', '민주주의'],
  },
  {
    id: 'cre-auto-002',
    category: 'creative',
    subcategory: '자율활동',
    grade: [1, 2, 3, 4, 5, 6],
    content: '학교의 다양한 행사(입학식, 졸업식, 운동회 등)에 참여하여 학교 공동체의 일원으로서 소속감을 느낌.',
    keywords: ['자율', '행사', '공동체'],
  },
  {
    id: 'cre-auto-003',
    category: 'creative',
    subcategory: '자율활동',
    grade: [4, 5, 6],
    content: '학생자치회 활동에 참여하여 학교생활 개선을 위한 의견을 수렴하고 실천 방안을 제안함.',
    keywords: ['자율', '자치회', '참여'],
  },

  // ========================================
  // 창의적체험활동 - 동아리활동
  // ========================================
  {
    id: 'cre-club-001',
    category: 'creative',
    subcategory: '동아리활동',
    grade: [3, 4, 5, 6],
    content: '(과학탐구반) 다양한 과학 실험에 적극적으로 참여하여 탐구 능력을 키우고, 과학적 호기심을 발전시킴.',
    keywords: ['동아리', '과학', '탐구'],
  },
  {
    id: 'cre-club-002',
    category: 'creative',
    subcategory: '동아리활동',
    grade: [3, 4, 5, 6],
    content: '(독서토론반) 다양한 장르의 책을 읽고 친구들과 생각을 나누며, 비판적 사고력과 표현력을 기름.',
    keywords: ['동아리', '독서', '토론'],
  },
  {
    id: 'cre-club-003',
    category: 'creative',
    subcategory: '동아리활동',
    grade: [3, 4, 5, 6],
    content: '(스포츠클럽) 축구/농구/배드민턴 활동에 참여하여 체력을 단련하고 스포츠맨십을 실천함.',
    keywords: ['동아리', '스포츠', '체력'],
  },
  {
    id: 'cre-club-004',
    category: 'creative',
    subcategory: '동아리활동',
    grade: [3, 4, 5, 6],
    content: '(미술반) 다양한 재료와 기법을 활용하여 창의적인 작품을 제작하고 전시회에 참여함.',
    keywords: ['동아리', '미술', '창의'],
  },
  {
    id: 'cre-club-005',
    category: 'creative',
    subcategory: '동아리활동',
    grade: [3, 4, 5, 6],
    content: '(코딩반) 블록 코딩과 텍스트 코딩을 배우며 컴퓨팅 사고력을 기르고, 간단한 프로그램을 제작함.',
    keywords: ['동아리', '코딩', 'SW'],
  },

  // ========================================
  // 창의적체험활동 - 봉사활동
  // ========================================
  {
    id: 'cre-vol-001',
    category: 'creative',
    subcategory: '봉사활동',
    grade: [1, 2, 3, 4, 5, 6],
    content: '(교내봉사) 학급 환경 정리와 급식 당번 활동에 성실히 참여하여 공동체를 위해 봉사하는 태도를 기름.',
    keywords: ['봉사', '교내', '환경'],
  },
  {
    id: 'cre-vol-002',
    category: 'creative',
    subcategory: '봉사활동',
    grade: [3, 4, 5, 6],
    content: '(나눔활동) 불우이웃돕기 캠페인에 참여하여 자신이 모은 물품을 기부하고 나눔의 기쁨을 경험함.',
    keywords: ['봉사', '나눔', '기부'],
  },
  {
    id: 'cre-vol-003',
    category: 'creative',
    subcategory: '봉사활동',
    grade: [4, 5, 6],
    content: '(환경봉사) 학교 주변 환경정화 활동에 참여하여 환경보호의 중요성을 인식하고 실천함.',
    keywords: ['봉사', '환경', '정화'],
  },

  // ========================================
  // 창의적체험활동 - 진로활동
  // ========================================
  {
    id: 'cre-career-001',
    category: 'creative',
    subcategory: '진로활동',
    grade: [3, 4, 5, 6],
    content: '진로검사를 통해 자신의 흥미와 적성을 탐색하고, 관심 있는 직업에 대해 조사하여 발표함.',
    keywords: ['진로', '적성', '직업'],
  },
  {
    id: 'cre-career-002',
    category: 'creative',
    subcategory: '진로활동',
    grade: [5, 6],
    content: '(진로체험) 다양한 직업인과의 만남을 통해 직업 세계를 이해하고, 미래 진로에 대한 관심을 높임.',
    keywords: ['진로', '체험', '직업인'],
  },
  {
    id: 'cre-career-003',
    category: 'creative',
    subcategory: '진로활동',
    grade: [5, 6],
    content: '자신의 꿈과 목표를 설정하고 이를 위한 구체적인 계획을 세워 실천하려는 의지를 보임.',
    keywords: ['진로', '꿈', '계획'],
  },

  // ========================================
  // 독서활동
  // ========================================
  {
    id: 'read-001',
    category: 'reading',
    subcategory: '독서',
    grade: [1, 2],
    content: '「강아지똥」을 읽고 작고 보잘것없는 것도 소중한 역할이 있다는 것을 알게 되었으며, 자신도 세상에 도움이 되고 싶다고 느낌.',
    keywords: ['독서', '그림책', '가치'],
  },
  {
    id: 'read-002',
    category: 'reading',
    subcategory: '독서',
    grade: [1, 2],
    content: '「무지개 물고기」를 읽고 친구와 나눔의 기쁨을 깨달았으며, 나도 친구와 물건을 나누겠다고 다짐함.',
    keywords: ['독서', '나눔', '그림책'],
  },
  {
    id: 'read-003',
    category: 'reading',
    subcategory: '독서',
    grade: [3, 4],
    content: '「마당을 나온 암탉」을 읽고 자유를 향한 암탉 잎싹의 용기에 감동받았으며, 자신도 두려움 없이 도전하고 싶다는 생각을 함.',
    keywords: ['독서', '용기', '도전'],
  },
  {
    id: 'read-004',
    category: 'reading',
    subcategory: '독서',
    grade: [3, 4],
    content: '「어린 왕자」를 읽고 눈에 보이지 않는 소중한 것들의 가치를 깨달았으며, 진정한 친구의 의미에 대해 생각해 봄.',
    keywords: ['독서', '우정', '가치'],
  },
  {
    id: 'read-005',
    category: 'reading',
    subcategory: '독서',
    grade: [5, 6],
    content: '「완득이」를 읽고 어려운 환경 속에서도 꿈을 향해 노력하는 완득이의 모습에서 희망과 용기를 얻음.',
    keywords: ['독서', '희망', '성장'],
  },
  {
    id: 'read-006',
    category: 'reading',
    subcategory: '독서',
    grade: [5, 6],
    content: '「정의란 무엇인가」(청소년판)를 읽고 정의와 공정에 대해 깊이 생각해 보았으며, 사회문제에 관심을 갖게 됨.',
    keywords: ['독서', '정의', '사회'],
  },
  {
    id: 'read-007',
    category: 'reading',
    subcategory: '독서',
    grade: [5, 6],
    content: '「수학 귀신」을 읽고 수학의 원리를 재미있게 이해하였으며, 수학에 대한 흥미가 높아짐.',
    keywords: ['독서', '수학', '흥미'],
  },
  {
    id: 'read-008',
    category: 'reading',
    subcategory: '독서',
    grade: [3, 4, 5, 6],
    content: '「코스모스」(청소년판)를 읽고 우주의 광대함과 과학의 신비로움을 느꼈으며, 천문학에 관심을 갖게 됨.',
    keywords: ['독서', '과학', '우주'],
  },

  // ========================================
  // 진로희망
  // ========================================
  {
    id: 'career-001',
    category: 'career',
    subcategory: '진로희망',
    grade: [3, 4, 5, 6],
    content: '(진로희망: 과학자) 과학 실험과 탐구 활동에 흥미가 많아 새로운 발견을 하는 과학자가 되고 싶어함.',
    keywords: ['진로', '과학자'],
  },
  {
    id: 'career-002',
    category: 'career',
    subcategory: '진로희망',
    grade: [3, 4, 5, 6],
    content: '(진로희망: 선생님) 친구들에게 설명해주는 것을 좋아하고 가르치는 일에 보람을 느껴 선생님이 되고 싶어함.',
    keywords: ['진로', '교사'],
  },
  {
    id: 'career-003',
    category: 'career',
    subcategory: '진로희망',
    grade: [3, 4, 5, 6],
    content: '(진로희망: 프로그래머) 컴퓨터와 코딩에 관심이 많아 유용한 프로그램을 만드는 개발자가 되고 싶어함.',
    keywords: ['진로', '프로그래머', 'SW'],
  },
  {
    id: 'career-004',
    category: 'career',
    subcategory: '진로희망',
    grade: [3, 4, 5, 6],
    content: '(진로희망: 의사) 아픈 사람을 도와주고 싶은 마음으로 의사가 되어 생명을 살리는 일을 하고 싶어함.',
    keywords: ['진로', '의사'],
  },
  {
    id: 'career-005',
    category: 'career',
    subcategory: '진로희망',
    grade: [3, 4, 5, 6],
    content: '(진로희망: 운동선수) 체육 활동을 좋아하고 꾸준한 연습을 통해 실력을 키워가며 프로 운동선수를 꿈꾸고 있음.',
    keywords: ['진로', '운동선수'],
  },
];

// 카테고리 정보
export const phraseCategories = {
  behavior: { label: '행동특성 및 종합의견', color: '#3B82F6' },
  subject: { label: '교과학습발달상황', color: '#10B981' },
  creative: { label: '창의적체험활동', color: '#8B5CF6' },
  reading: { label: '독서활동', color: '#F59E0B' },
  career: { label: '진로희망', color: '#EC4899' },
};

// 핵심 인성 요소
export const coreCharacterElements = [
  '배려', '나눔', '협력', '타인존중', '갈등관리', '관계지향성', '규칙준수',
  '책임', '정직', '성실', '자기주도', '창의성', '감수성', '공감',
];
