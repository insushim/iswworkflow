# 교육 데이터 API 통합 가이드

> EduFlow AI 앱의 교육 데이터베이스를 실시간 데이터로 확장하기 위한 API 가이드

## 1. 핵심 API 목록

### 1.1 NEIS 교육행정정보시스템 API (필수)

| 항목 | 내용 |
|------|------|
| **URL** | https://open.neis.go.kr |
| **신청** | https://open.neis.go.kr/portal/guide/apiKeyPage.do |
| **비용** | 무료 |
| **인증** | API 키 발급 필요 |

#### 제공 데이터
- 학사일정 (입학식, 졸업식, 방학, 개학 등)
- 급식식단 정보
- 학교 기본정보 (전국 초/중/고)
- 시간표 정보
- 학교별 학급수, 학생수

#### 환경변수
```env
NEIS_API_KEY=your_neis_api_key
```

#### 사용 예시
```typescript
// lib/neis-api.ts
const NEIS_BASE_URL = 'https://open.neis.go.kr/hub';

export async function getSchoolSchedule(schoolCode: string, year: number, month: number) {
  const url = `${NEIS_BASE_URL}/SchoolSchedule`;
  const params = new URLSearchParams({
    KEY: process.env.NEIS_API_KEY!,
    Type: 'json',
    ATPT_OFCDC_SC_CODE: schoolCode.substring(0, 7), // 시도교육청코드
    SD_SCHUL_CODE: schoolCode, // 학교코드
    AA_YMD: `${year}${String(month).padStart(2, '0')}`,
  });

  const res = await fetch(`${url}?${params}`);
  return res.json();
}
```

---

### 1.2 학교알리미 API

| 항목 | 내용 |
|------|------|
| **URL** | https://www.schoolinfo.go.kr |
| **신청** | 학교알리미 사이트에서 신청 |
| **비용** | 무료 |

#### 제공 데이터
- 학교별 교육과정 편성 현황
- 교원현황 (정원, 현원)
- 학업성취도
- 졸업생 진로현황
- 교육비 특별회계 예결산

---

### 1.3 공공데이터포털 교육 API

| 항목 | 내용 |
|------|------|
| **URL** | https://www.data.go.kr |
| **신청** | 회원가입 후 API 활용신청 |
| **비용** | 무료 |

#### 주요 API
1. **초중등학교 위치 정보** (교육부)
   - 학교 주소, 좌표, 연락처

2. **학원 교습소 정보** (교육부)
   - 학원명, 주소, 교습과목

3. **교육통계 정보** (한국교육개발원)
   - 학교수, 학생수, 교원수 통계

#### 환경변수
```env
DATA_GO_KR_API_KEY=your_data_go_kr_key
```

---

### 1.4 교육부 정책/공문 정보

| 항목 | 내용 |
|------|------|
| **URL** | https://www.moe.go.kr |
| **방식** | RSS/크롤링 |

#### 수집 가능 데이터
- 교육부 보도자료
- 정책 브리핑
- 법령 정보 (교육 관련)

---

## 2. 시도교육청별 API

### 2.1 서울시교육청
- URL: https://open.sen.go.kr
- 학교 현황, 교육통계

### 2.2 경기도교육청
- URL: https://open.goe.go.kr
- 학교 정보, 프로그램 현황

### 2.3 기타 시도교육청
각 시도교육청 공개 데이터 포털에서 API 확인 가능

---

## 3. 법령정보 API

### 국가법령정보센터 API
| 항목 | 내용 |
|------|------|
| **URL** | https://www.law.go.kr/DRF/lawService.do |
| **비용** | 무료 |

#### 수집 대상 법령
- 초중등교육법
- 학교보건법
- 학교급식법
- 아동복지법
- 학교폭력예방법
- 교육기본법
- 교원자격검정령

```typescript
// lib/law-api.ts
export async function getLawInfo(lawName: string) {
  const url = 'https://www.law.go.kr/DRF/lawSearch.do';
  const params = new URLSearchParams({
    OC: 'your_oc_code',
    target: 'law',
    type: 'JSON',
    query: lawName,
  });

  const res = await fetch(`${url}?${params}`);
  return res.json();
}
```

---

## 4. 양식/서식 API

### 정부24 서식 API
| 항목 | 내용 |
|------|------|
| **URL** | https://www.gov.kr |
| **방식** | 크롤링/수동 수집 |

#### 필요 서식
- 가정통신문 양식
- 학부모 동의서
- 현장체험학습 신청서
- 출석인정 신청서
- 교외체험학습 신청서/보고서

---

## 5. 통합 연동 계획

### Phase 1: 기본 연동 (권장)
1. NEIS API 연동 - 학사일정, 급식정보
2. 공공데이터포털 - 학교 기본정보

### Phase 2: 확장 연동
1. 학교알리미 - 상세 학교정보
2. 법령정보센터 - 교육법령

### Phase 3: 실시간 연동
1. 교육부 RSS - 정책/공문
2. 시도교육청 - 지역별 정보

---

## 6. 환경변수 통합 (.env)

```env
# NEIS API (필수)
NEIS_API_KEY=

# 공공데이터포털
DATA_GO_KR_API_KEY=

# 법령정보센터
LAW_API_OC=

# 시도교육청 (선택)
SEOUL_EDU_API_KEY=
GYEONGGI_EDU_API_KEY=

# Firebase (현재 사용중)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Gemini AI
GOOGLE_GEMINI_API_KEY=
```

---

## 7. API 연동 시 구현할 기능

### 7.1 학사일정 자동 동기화
```typescript
// hooks/useSchoolCalendar.ts
export function useSchoolCalendar(schoolCode: string) {
  return useQuery({
    queryKey: ['schoolCalendar', schoolCode],
    queryFn: () => fetchNeisCalendar(schoolCode),
    staleTime: 1000 * 60 * 60, // 1시간 캐시
  });
}
```

### 7.2 월별업무 자동 업데이트
- NEIS 학사일정과 연동
- 교육청 공문 기반 업무 추가
- 법령 개정 시 자동 반영

### 7.3 AI 챗봇 실시간 데이터 연동
```typescript
// AI 프롬프트에 실시간 데이터 포함
const systemPrompt = `
현재 ${schoolName}의 이번 달 학사일정:
${await getThisMonthSchedule(schoolCode)}

관련 교육법령:
${await getRelevantLaws(query)}
`;
```

---

## 8. 참고 자료

### API 키 발급 링크
| API | 발급 URL |
|-----|----------|
| NEIS | https://open.neis.go.kr/portal/guide/apiKeyPage.do |
| 공공데이터포털 | https://www.data.go.kr/ugs/selectPublicDataUseGuide.do |
| 법령정보센터 | https://www.law.go.kr/LSW/openApiInfo.do |

### 개발 문서
- NEIS API 가이드: https://open.neis.go.kr/portal/guide/apiIntro.do
- 공공데이터포털 개발가이드: https://www.data.go.kr/ugs/selectPublicDataUseGuide.do

---

## 9. 현재 데이터베이스 구조

현재 `apps/web/src/data/education-database.ts`에 다음 데이터가 정의되어 있습니다:

| 데이터 | 설명 | 개수 |
|--------|------|------|
| monthlyTasksDatabase | 월별 업무 상세 정보 | 12개월분 |
| dutyGuidesDatabase | 부서별 업무 가이드 | 3개 부서 |
| legalReferencesDatabase | 교육 관련 법령 | 10+ 법령 |
| formTemplatesDatabase | 업무 서식 템플릿 | 10+ 서식 |
| neisGuidesDatabase | NEIS 사용 가이드 | 5+ 가이드 |
| faqDatabase | 자주 묻는 질문 | 10+ FAQ |

API 연동 시 이 데이터들을 실시간 데이터로 보강하거나 교체할 수 있습니다.

---

*문서 작성일: 2026-01-11*
*버전: v13.0*
