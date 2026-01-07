interface DocumentTemplateSeed {
  typeName: string;
  name: string;
  description: string;
  content: string;
  variables: { name: string; type: string; description: string; required: boolean }[];
  example?: string;
  source?: string;
  isOfficial: boolean;
}

export const documentTemplates: DocumentTemplateSeed[] = [
  // ===========================================
  // 가정통신문 템플릿
  // ===========================================
  {
    typeName: 'notice',
    name: '현장체험학습 안내문',
    description: '현장체험학습 실시 안내 가정통신문',
    content: `
[학교명]

가정통신문 제 {{documentNumber}}호

학부모님 안녕하십니까?

{{greeting}}

아래와 같이 현장체험학습을 실시하오니, 학생들이 안전하고 즐거운 체험학습이 될 수 있도록 가정에서도 협조하여 주시기 바랍니다.

- 아       래 -

1. 일    시: {{date}} ({{dayOfWeek}})
2. 장    소: {{location}}
3. 대    상: {{targetStudents}}
4. 집합시간: {{meetingTime}}
5. 귀교시간: {{returnTime}} (예정)
6. 준 비 물: {{preparations}}
7. 유의사항
   {{precautions}}

※ 우천 시: {{rainPlan}}

문의사항이 있으시면 담임선생님께 연락 부탁드립니다.

{{year}}. {{month}}. {{day}}.

{{schoolName}} 교장 {{principalName}} (직인)

✄ ------------------------- 절 취 선 -------------------------

현장체험학습 참가 동의서

{{grade}}학년 {{class}}반 {{number}}번  학생명: _____________

위 학생의 현장체험학습 참가에 동의합니다.

비상연락처: _______________________

{{year}}년  {{month}}월  {{day}}일

학부모:                (서명 또는 인)
`,
    variables: [
      { name: 'documentNumber', type: 'number', description: '문서번호', required: true },
      { name: 'greeting', type: 'text', description: '계절 인사말', required: true },
      { name: 'date', type: 'date', description: '체험학습 날짜', required: true },
      { name: 'dayOfWeek', type: 'string', description: '요일', required: true },
      { name: 'location', type: 'string', description: '체험학습 장소', required: true },
      { name: 'targetStudents', type: 'string', description: '대상 학생', required: true },
      { name: 'meetingTime', type: 'time', description: '집합 시간', required: true },
      { name: 'returnTime', type: 'time', description: '귀교 시간', required: true },
      { name: 'preparations', type: 'text', description: '준비물', required: true },
      { name: 'precautions', type: 'text', description: '유의사항', required: true },
      { name: 'rainPlan', type: 'string', description: '우천시 계획', required: true },
      { name: 'year', type: 'number', description: '년도', required: true },
      { name: 'month', type: 'number', description: '월', required: true },
      { name: 'day', type: 'number', description: '일', required: true },
      { name: 'schoolName', type: 'string', description: '학교명', required: true },
      { name: 'principalName', type: 'string', description: '교장명', required: true },
      { name: 'grade', type: 'number', description: '학년', required: true },
      { name: 'class', type: 'number', description: '반', required: true },
      { name: 'number', type: 'number', description: '번호', required: true },
    ],
    source: '전국 1000+ 학교 공통 양식',
    isOfficial: true,
  },
  {
    typeName: 'notice',
    name: '학부모 상담 안내문',
    description: '학부모 상담주간 안내 가정통신문',
    content: `
[학교명]

가정통신문 제 {{documentNumber}}호

학부모님 안녕하십니까?

{{greeting}}

다음과 같이 학부모 상담주간을 운영하오니, 자녀교육에 관심있는 학부모님께서는 많은 참여 부탁드립니다.

- 아       래 -

1. 기    간: {{startDate}} ~ {{endDate}}
2. 시    간: {{timeRange}}
3. 장    소: 각 학급 교실
4. 상담내용: 학습, 생활, 진로, 교우관계 등
5. 신청방법: {{applicationMethod}}
6. 신청기한: {{applicationDeadline}}까지

※ 상담 시간은 1인당 약 {{duration}}분 내외입니다.
※ 신청자가 많을 경우 일정이 조정될 수 있습니다.

{{year}}. {{month}}. {{day}}.

{{schoolName}} 교장 {{principalName}} (직인)

✄ ------------------------- 절 취 선 -------------------------

학부모 상담 신청서

{{grade}}학년 {{class}}반 {{number}}번  학생명: _____________

□ 상담 희망합니다.
   - 희망 날짜: {{month}}월 ___일
   - 희망 시간: ___시 ___분
   - 상담 주제: _______________________

□ 상담 희망하지 않습니다.

학부모:                (서명 또는 인)
`,
    variables: [
      { name: 'documentNumber', type: 'number', description: '문서번호', required: true },
      { name: 'greeting', type: 'text', description: '계절 인사말', required: true },
      { name: 'startDate', type: 'date', description: '시작일', required: true },
      { name: 'endDate', type: 'date', description: '종료일', required: true },
      { name: 'timeRange', type: 'string', description: '상담 시간대', required: true },
      { name: 'applicationMethod', type: 'string', description: '신청 방법', required: true },
      { name: 'applicationDeadline', type: 'date', description: '신청 마감', required: true },
      { name: 'duration', type: 'number', description: '상담 시간(분)', required: true },
      { name: 'year', type: 'number', description: '년도', required: true },
      { name: 'month', type: 'number', description: '월', required: true },
      { name: 'day', type: 'number', description: '일', required: true },
      { name: 'schoolName', type: 'string', description: '학교명', required: true },
      { name: 'principalName', type: 'string', description: '교장명', required: true },
      { name: 'grade', type: 'number', description: '학년', required: true },
      { name: 'class', type: 'number', description: '반', required: true },
      { name: 'number', type: 'number', description: '번호', required: true },
    ],
    source: '전국 1000+ 학교 공통 양식',
    isOfficial: true,
  },
  {
    typeName: 'notice',
    name: '방학 안내문',
    description: '방학 및 개학 안내 가정통신문',
    content: `
[학교명]

가정통신문 제 {{documentNumber}}호

학부모님 안녕하십니까?

{{greeting}}

{{semester}}학기를 마무리하며 {{vacationType}}방학을 맞이하게 되었습니다. 학부모님 가정에 건강과 행복이 가득하시길 바라며, 방학 관련 사항을 안내드립니다.

- 아       래 -

1. 방학기간: {{vacationStart}} ~ {{vacationEnd}}
2. 개학일: {{schoolOpenDate}} ({{dayOfWeek}}) {{openTime}}까지 등교
3. 방학 중 학교 운영
   - 당직실: {{dutyPhone}}
   - 운영시간: {{operationHours}}
4. 방학 중 프로그램
   {{vacationPrograms}}
5. 방학 중 과제
   {{assignments}}
6. 생활 안내
   - 규칙적인 생활 습관 유지
   - 안전사고 예방 ({{safetyNotice}})
   - 개인위생 관리
   - 독서 및 체험활동 권장

건강하고 알찬 방학 보내시기 바랍니다.

{{year}}. {{month}}. {{day}}.

{{schoolName}} 교장 {{principalName}} (직인)
`,
    variables: [
      { name: 'documentNumber', type: 'number', description: '문서번호', required: true },
      { name: 'greeting', type: 'text', description: '계절 인사말', required: true },
      { name: 'semester', type: 'number', description: '학기', required: true },
      { name: 'vacationType', type: 'string', description: '방학 종류 (여름/겨울)', required: true },
      { name: 'vacationStart', type: 'date', description: '방학 시작일', required: true },
      { name: 'vacationEnd', type: 'date', description: '방학 종료일', required: true },
      { name: 'schoolOpenDate', type: 'date', description: '개학일', required: true },
      { name: 'dayOfWeek', type: 'string', description: '요일', required: true },
      { name: 'openTime', type: 'time', description: '등교 시간', required: true },
      { name: 'dutyPhone', type: 'string', description: '당직실 연락처', required: true },
      { name: 'operationHours', type: 'string', description: '운영 시간', required: true },
      { name: 'vacationPrograms', type: 'text', description: '방학 중 프로그램', required: false },
      { name: 'assignments', type: 'text', description: '방학 과제', required: false },
      { name: 'safetyNotice', type: 'string', description: '안전 주의사항', required: true },
      { name: 'year', type: 'number', description: '년도', required: true },
      { name: 'month', type: 'number', description: '월', required: true },
      { name: 'day', type: 'number', description: '일', required: true },
      { name: 'schoolName', type: 'string', description: '학교명', required: true },
      { name: 'principalName', type: 'string', description: '교장명', required: true },
    ],
    source: '전국 1000+ 학교 공통 양식',
    isOfficial: true,
  },

  // ===========================================
  // 계획서 템플릿
  // ===========================================
  {
    typeName: 'plan',
    name: '현장체험학습 계획서',
    description: '현장체험학습 실시 계획서',
    content: `
{{year}}학년도 현장체험학습 계획서

1. 목적
   {{purpose}}

2. 일시 및 장소
   가. 일시: {{date}} ({{dayOfWeek}}) {{startTime}} ~ {{endTime}}
   나. 장소: {{location}}
   다. 주소: {{address}}
   라. 연락처: {{locationPhone}}

3. 대상: {{targetStudents}} ({{studentCount}}명)

4. 인솔교사: {{teachers}}

5. 세부 일정
   {{schedule}}

6. 교육내용
   {{educationContent}}

7. 안전대책
   가. 사전교육
      {{safetyEducation}}
   나. 비상연락체계
      {{emergencyContact}}
   다. 응급처치 계획
      {{firstAid}}

8. 준비물
   {{preparations}}

9. 예산
   {{budget}}

10. 기대효과
    {{expectedEffects}}

11. 우천 시 대책
    {{rainPlan}}

붙임  1. 세부 일정표 1부.
      2. 학부모 안내문 1부.
      3. 안전점검표 1부.  끝.

{{year}}. {{month}}. {{day}}.

작 성: {{writer}} (인)
검 토: {{reviewer}} (인)
결 재: {{approver}} (인)
`,
    variables: [
      { name: 'year', type: 'number', description: '학년도', required: true },
      { name: 'purpose', type: 'text', description: '목적', required: true },
      { name: 'date', type: 'date', description: '체험학습 날짜', required: true },
      { name: 'dayOfWeek', type: 'string', description: '요일', required: true },
      { name: 'startTime', type: 'time', description: '시작 시간', required: true },
      { name: 'endTime', type: 'time', description: '종료 시간', required: true },
      { name: 'location', type: 'string', description: '장소명', required: true },
      { name: 'address', type: 'string', description: '주소', required: true },
      { name: 'locationPhone', type: 'string', description: '장소 연락처', required: true },
      { name: 'targetStudents', type: 'string', description: '대상', required: true },
      { name: 'studentCount', type: 'number', description: '학생 수', required: true },
      { name: 'teachers', type: 'string', description: '인솔교사', required: true },
      { name: 'schedule', type: 'text', description: '세부 일정', required: true },
      { name: 'educationContent', type: 'text', description: '교육 내용', required: true },
      { name: 'safetyEducation', type: 'text', description: '안전교육 내용', required: true },
      { name: 'emergencyContact', type: 'text', description: '비상연락체계', required: true },
      { name: 'firstAid', type: 'text', description: '응급처치 계획', required: true },
      { name: 'preparations', type: 'text', description: '준비물', required: true },
      { name: 'budget', type: 'text', description: '예산', required: true },
      { name: 'expectedEffects', type: 'text', description: '기대효과', required: true },
      { name: 'rainPlan', type: 'text', description: '우천시 대책', required: true },
      { name: 'month', type: 'number', description: '월', required: true },
      { name: 'day', type: 'number', description: '일', required: true },
      { name: 'writer', type: 'string', description: '작성자', required: true },
      { name: 'reviewer', type: 'string', description: '검토자', required: true },
      { name: 'approver', type: 'string', description: '결재자', required: true },
    ],
    source: '전국 1000+ 학교 공통 양식',
    isOfficial: true,
  },

  // ===========================================
  // 회의록 템플릿
  // ===========================================
  {
    typeName: 'minutes',
    name: '학년협의회 회의록',
    description: '학년 협의회 회의록 양식',
    content: `
{{year}}학년도 {{grade}}학년 협의회 회의록

1. 일    시: {{date}} ({{dayOfWeek}}) {{time}}
2. 장    소: {{location}}
3. 참석자: {{attendees}}
4. 불참자: {{absentees}}

5. 회의 안건
   {{agenda}}

6. 회의 내용
   {{content}}

7. 결정 사항
   {{decisions}}

8. 차기 회의 안건
   {{nextAgenda}}

9. 차기 회의 일정: {{nextMeetingDate}}

{{year}}. {{month}}. {{day}}.

기 록: {{recorder}} (인)
확 인: {{confirmer}} (인)
`,
    variables: [
      { name: 'year', type: 'number', description: '학년도', required: true },
      { name: 'grade', type: 'number', description: '학년', required: true },
      { name: 'date', type: 'date', description: '회의 날짜', required: true },
      { name: 'dayOfWeek', type: 'string', description: '요일', required: true },
      { name: 'time', type: 'time', description: '회의 시간', required: true },
      { name: 'location', type: 'string', description: '장소', required: true },
      { name: 'attendees', type: 'text', description: '참석자', required: true },
      { name: 'absentees', type: 'text', description: '불참자', required: false },
      { name: 'agenda', type: 'text', description: '안건', required: true },
      { name: 'content', type: 'text', description: '회의 내용', required: true },
      { name: 'decisions', type: 'text', description: '결정 사항', required: true },
      { name: 'nextAgenda', type: 'text', description: '차기 안건', required: false },
      { name: 'nextMeetingDate', type: 'date', description: '차기 회의 일정', required: false },
      { name: 'month', type: 'number', description: '월', required: true },
      { name: 'day', type: 'number', description: '일', required: true },
      { name: 'recorder', type: 'string', description: '기록자', required: true },
      { name: 'confirmer', type: 'string', description: '확인자', required: true },
    ],
    source: '전국 1000+ 학교 공통 양식',
    isOfficial: true,
  },

  // ===========================================
  // 동의서 템플릿
  // ===========================================
  {
    typeName: 'consent',
    name: '개인정보 수집 동의서',
    description: '개인정보 수집 및 이용 동의서',
    content: `
개인정보 수집 및 이용 동의서

{{schoolName}}(이하 "학교"라 함)은 개인정보보호법 등 관련 법령에 따라 학생 및 학부모의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 수집·이용에 대한 동의를 받고자 합니다.

1. 개인정보 수집 목적
   {{purpose}}

2. 수집하는 개인정보 항목
   {{items}}

3. 개인정보의 보유 및 이용 기간
   {{period}}

4. 동의 거부권 및 불이익
   {{refusalInfo}}

위와 같이 개인정보를 수집·이용하는데 동의하십니까?

□ 동의합니다     □ 동의하지 않습니다

{{year}}년  {{month}}월  {{day}}일

학    생: {{studentName}} (서명 또는 인)
학부모(법정대리인): {{parentName}} (서명 또는 인)
`,
    variables: [
      { name: 'schoolName', type: 'string', description: '학교명', required: true },
      { name: 'purpose', type: 'text', description: '수집 목적', required: true },
      { name: 'items', type: 'text', description: '수집 항목', required: true },
      { name: 'period', type: 'string', description: '보유 기간', required: true },
      { name: 'refusalInfo', type: 'text', description: '거부권 및 불이익 안내', required: true },
      { name: 'year', type: 'number', description: '년도', required: true },
      { name: 'month', type: 'number', description: '월', required: true },
      { name: 'day', type: 'number', description: '일', required: true },
      { name: 'studentName', type: 'string', description: '학생 이름', required: true },
      { name: 'parentName', type: 'string', description: '학부모 이름', required: true },
    ],
    source: '개인정보보호법 표준양식',
    isOfficial: true,
  },
];

export type { DocumentTemplateSeed };
