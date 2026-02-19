'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FileText,
  Plus,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Sparkles,
  FolderOpen,
  Clock,
  Star,
  StarOff,
  Loader2,
  FileEdit,
  Copy,
  CalendarCheck,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { toast } from 'sonner';
import { ENHANCED_TEACHER_DB, getEnhancedMonthlyTasks } from '@/data/teacher-enhanced-db';

// 문서 타입 정의
interface Document {
  id: string;
  title: string;
  content: string;
  type: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED';
  isStarred: boolean;
  isGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

const documentTypes = ['전체', '가정통신문', '계획서', '보고서', '안내문', '공문', '동의서', '신청서', '회의록', '기타'];

// 샘플 문서 템플릿
const documentTemplates = [
  {
    id: 'tpl-1',
    title: '학부모 상담 안내문',
    type: '가정통신문',
    content: `학부모님께

안녕하십니까? 학부모님의 가정에 건강과 행복이 가득하시길 기원합니다.

본교에서는 학생들의 학교생활과 가정생활에 대한 상담을 실시하고자 합니다.
바쁘시더라도 참석하시어 자녀의 학교생활에 대해 이야기 나누는 시간이 되시길 바랍니다.

- 상담 일시: 2026년 O월 O일(O) ~ O월 O일(O)
- 상담 시간: 14:00 ~ 18:00
- 상담 장소: 각 학급 교실
- 상담 내용: 학교생활, 학습, 교우관계 등

참석 여부를 O월 O일까지 회신해 주시기 바랍니다.

감사합니다.

OO초등학교장`,
  },
  {
    id: 'tpl-2',
    title: '현장체험학습 동의서',
    type: '동의서',
    content: `현장체험학습 참가 동의서

학생 정보
- 학년/반: O학년 O반
- 이름:
- 생년월일:

체험학습 정보
- 일시: 2026년 O월 O일(O)
- 장소:
- 목적:

위 학생이 현장체험학습에 참가하는 것을 동의합니다.
또한, 안전사고 예방을 위해 인솔 교사의 지도에 따르도록 하겠습니다.

2026년  월  일

보호자:          (인)
연락처:`,
  },
  {
    id: 'tpl-3',
    title: '학급 경영 계획서',
    type: '계획서',
    content: `2026학년도 학급 경영 계획서

1. 학급 현황
- 학년/반: O학년 O반
- 학생 수: 남 O명, 여 O명, 계 O명
- 담임교사:

2. 학급 운영 목표
-

3. 학급 운영 방침
가. 기본 생활 습관 지도
나. 자기 주도적 학습 능력 신장
다. 배려와 존중의 학급 문화 조성

4. 월별 학급 행사 계획
- 3월: 학급 규칙 정하기, 1인 1역 정하기
- 4월:
- 5월:
...

5. 학부모 협력 계획
- 정기 상담: 1학기(4월), 2학기(9월)
- 학급 운영 안내: 주간 학습 안내, 학급 홈페이지

작성일: 2026년 월 일
작성자:`,
  },
  {
    id: 'tpl-4',
    title: '방과후학교 안내문',
    type: '가정통신문',
    content: `방과후학교 프로그램 안내

학부모님께

안녕하십니까? 항상 본교 교육활동에 적극적으로 협조해 주시는 학부모님께 감사드립니다.

2026학년도 1학기 방과후학교 프로그램을 다음과 같이 안내하오니, 자녀의 소질과 적성을 고려하여 희망하는 강좌를 신청해 주시기 바랍니다.

1. 운영 기간
- 2026년 3월 O일(O) ~ 2026년 7월 O일(O)
- 주 1회 또는 2회 (강좌별 상이)

2. 개설 강좌
가. 학습 프로그램
  - 영어회화반: 매주 월, 수 15:00~16:00 (수강료: 월 60,000원)
  - 논술토론반: 매주 화, 목 15:00~16:00 (수강료: 월 50,000원)
  - 수학심화반: 매주 월, 수 15:00~16:00 (수강료: 월 55,000원)

나. 예체능 프로그램
  - 축구교실: 매주 화, 목 15:00~16:30 (수강료: 월 40,000원)
  - 미술교실: 매주 수, 금 15:00~16:00 (수강료: 월 45,000원)
  - 피아노교실: 매주 화 15:00~16:00 (수강료: 월 70,000원)
  - 바이올린교실: 매주 목 15:00~16:00 (수강료: 월 75,000원)

다. 코딩/과학 프로그램
  - 코딩교실: 매주 수 15:00~16:00 (수강료: 월 50,000원)
  - 과학실험반: 매주 금 15:00~16:00 (수강료: 월 50,000원)

3. 신청 방법
- 가정통신문 하단의 신청서를 작성하여 2026년 O월 O일(O)까지 담임교사에게 제출
- 또는 학교 홈페이지 온라인 신청 (http://www.OO초.kr)

4. 수강료 납부
- 납부 기간: 매월 1일~5일
- 납부 방법: 가상계좌 입금 (신청 후 개별 안내)

5. 유의 사항
- 강좌별 정원 초과 시 선착순 마감됩니다.
- 수강료는 환불 규정에 따라 처리됩니다.
- 결석 시 사전에 담당 강사에게 연락 바랍니다.

문의: 방과후학교 담당 교사 (☎ OOO-OOOO, 내선 OOO)

2026년 O월 O일

OO초등학교장

--------------------------------(신청서)--------------------------------

2026학년도 1학기 방과후학교 수강 신청서

학년/반: O학년 O반   학생명:          학부모명:
연락처:

희망 강좌 (최대 3개까지 선택 가능):
□ 영어회화반  □ 논술토론반  □ 수학심화반
□ 축구교실    □ 미술교실    □ 피아노교실
□ 바이올린교실  □ 코딩교실    □ 과학실험반

위와 같이 방과후학교 수강을 신청합니다.

2026년  월  일
신청인:          (서명)`,
  },
  {
    id: 'tpl-5',
    title: '학교폭력 예방교육 결과보고서',
    type: '보고서',
    content: `2026학년도 학교폭력 예방교육 결과보고서

OO초등학교

1. 교육 개요
가. 교육명: 학교폭력 예방 및 대응 교육
나. 교육일시: 2026년 O월 O일(O) O교시
다. 교육장소: 본교 강당 (또는 각 교실)
라. 교육대상: O학년 전체 학생 (OOO명)
마. 교육시간: 2시간 (40분 × 2교시)

2. 강사 정보
- 강사명: OOO (OO경찰서 학교전담경찰관 / 외부전문강사)
- 소속: OO경찰서 여성청소년과
- 연락처: OOO-OOOO

3. 교육 내용
가. 학교폭력의 정의와 유형
  - 신체폭력, 언어폭력, 사이버폭력, 집단따돌림 등
  - 학교폭력예방법 및 처벌 규정

나. 학교폭력 대응 방법
  - 피해 학생의 대처 방법
  - 목격 시 신고 요령 (학교폭력신고센터 117)
  - 가해 행위의 법적 책임

다. 예방 활동
  - 공감과 배려의 중요성
  - 또래 관계에서의 올바른 의사소통
  - 학교폭력 없는 학급 문화 만들기

라. 사이버폭력 예방
  - 사이버 공간에서의 언어 예절
  - 개인정보 보호의 중요성
  - SNS 사용 시 주의사항

4. 교육 방법
- 강의: 50분
- 동영상 시청: 30분 (학교폭력 예방 애니메이션)
- 질의응답 및 토론: 20분

5. 참석 현황
- 대상 인원: OOO명
- 참석 인원: OOO명
- 참석률: OO%
- 불참 사유: 질병 결석 O명, 기타 O명

6. 학생 반응 및 소감
- 학교폭력의 심각성을 인식하는 계기가 됨
- 사이버폭력도 범죄라는 것을 알게 됨
- 친구를 배려하고 존중해야겠다는 다짐
- 목격 시 적극적으로 도와주겠다는 의지 표현

7. 특이사항
- 교육 후 학생 상담 신청 O건 접수
- 학급별 추가 토론 활동 진행 예정

8. 향후 계획
- 매 분기 1회 정기 교육 실시
- 학급별 학교폭력 예방 캠페인 활동 (O월)
- 학부모 대상 학교폭력 예방교육 실시 (O월)

9. 증빙 자료
- 붙임 1: 교육 자료 1부
- 붙임 2: 출석부 1부
- 붙임 3: 현장 사진 1부

본 교육을 통해 학생들의 학교폭력 예방 의식이 제고되었으며,
안전하고 행복한 학교 문화 조성에 기여할 것으로 기대됩니다.

보고일: 2026년 O월 O일
보고자: O학년 담당 OOO 교사

OO초등학교장`,
  },
  {
    id: 'tpl-6',
    title: '교내 행사 기안문',
    type: '공문',
    content: `기안문

수신: 교감, 교장
(경유)
제목: 2026학년도 OO 행사 실시 계획 승인의 건


1. 관련: 2026학년도 학교교육계획

2. 본교 학생들의 OO 능력 신장 및 학교 문화 활성화를 위하여 다음과 같이
   OO 행사를 실시하고자 하오니 승인하여 주시기 바랍니다.

                        - 다  음 -

가. 행사명: OO초등학교 OO 대회 (또는 OO 행사)

나. 일시: 2026년 O월 O일(O) O교시 ~ O교시

다. 장소: 본교 OO실 (또는 운동장, 강당 등)

라. 대상: O학년 전체 학생 OOO명

마. 목적
  1) OO 능력 신장 및 소질 계발
  2) 학생들의 자신감 향상 및 성취감 고취
  3) 협동심과 공동체 의식 함양

바. 세부 추진 계획
  1) 추진 일정
    - 사전 준비: 2026년 O월 O일 ~ O월 O일
    - 참가 신청: 2026년 O월 O일 ~ O월 O일
    - 예선 실시: 2026년 O월 O일(O)
    - 본선 실시: 2026년 O월 O일(O)

  2) 운영 방법
    - 학급별 예선을 통해 학급 대표 선발
    - 학년별 본선 진행
    - 심사위원: 담당교사 O명, 학년 부장 O명

  3) 시상 계획
    - 최우수상: O명 (상장 및 부상)
    - 우수상: O명 (상장 및 부상)
    - 장려상: O명 (상장)

사. 소요 예산: 금 OOO,000원
  - 상품 구입비: OOO,000원
  - 행사 운영비: OOO,000원
  - 재원: 학교 운영비 (또는 학년 운영비)

아. 업무 분장
  - 총괄: O학년 부장 OOO
  - 기획 운영: O학년 담임교사 O명
  - 시설 및 환경: OOO 교사
  - 사진 촬영 및 기록: OOO 교사

자. 기대 효과
  1) 학생들의 OO 능력 향상
  2) 학생 참여 중심의 학교 문화 조성
  3) 학년 간 화합 및 소통 증진

3. 행사가 원활히 진행될 수 있도록 협조하여 주시기 바랍니다.

붙임: 1. 세부 추진 계획 1부
      2. 예산 집행 계획서 1부
      3. 참가 신청서 양식 1부.  끝.


기안자: O학년 담당 OOO  (인)  2026. O. O.

협조자: O학년 부장 OOO  (인)  2026. O. O.

결
재

담당    부장    교감    교장


OOO    OOO    OOO    OOO`,
  },
  {
    id: 'tpl-7',
    title: '개인정보 수집 동의서',
    type: '동의서',
    content: `개인정보 수집·이용·제공 동의서

OO초등학교

본교에서는 [OO 활동/행사/프로그램]을 위하여 「개인정보 보호법」 제15조 및 제17조에 따라
아래와 같이 개인정보를 수집·이용 및 제공하고자 합니다.
내용을 자세히 읽으신 후 동의 여부를 결정하여 주시기 바랍니다.

1. 개인정보의 수집·이용 목적
- [OO 활동/행사/프로그램] 운영 및 관리
- 참가자 명단 작성 및 출석 관리
- 행사 결과 안내 및 상장 발급
- 안전사고 발생 시 비상연락

2. 수집하는 개인정보의 항목
필수 항목:
- 학생: 학년, 반, 번호, 성명, 생년월일
- 보호자: 성명, 관계, 연락처(휴대전화)

선택 항목:
- 학생: 주소, 특이사항(알레르기, 질병 등)
- 보호자: 이메일 주소

3. 개인정보의 보유 및 이용 기간
- 수집일로부터 해당 행사 종료 후 1년까지
- 보유기간 경과 후에는 지체 없이 파기합니다.

4. 개인정보의 제3자 제공 (해당 시)
- 제공받는 자: OOO 기관 (또는 업체명)
- 제공 목적: OO 활동 지원, 안전관리 등
- 제공 항목: 학년, 반, 성명, 연락처
- 보유 및 이용기간: 행사 종료 후 즉시 파기

5. 동의를 거부할 권리 및 불이익
- 귀하는 위와 같은 개인정보 수집·이용·제공에 대한 동의를 거부할 권리가 있습니다.
- 필수 항목 동의 거부 시 [OO 활동/행사/프로그램] 참가가 제한될 수 있습니다.
- 선택 항목 동의 거부 시에도 참가에는 제한이 없습니다.

6. 개인정보의 안전성 확보 조치
- 본교는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
  · 개인정보 암호화 및 잠금장치 설정
  · 개인정보 취급자 지정 및 최소화
  · 개인정보 접근 기록 보관 및 위조·변조 방지

--------------------------------(동의서)--------------------------------

개인정보 수집·이용·제공 동의

□ 개인정보 수집·이용에 동의합니다. (필수)
□ 개인정보 제3자 제공에 동의합니다. (해당 시)

학생 정보
- 학년/반/번호: O학년 O반 O번
- 학생명:                  생년월일:         년    월    일
- 주소: (선택)
- 특이사항: (선택, 알레르기나 지병 등)

보호자 정보
- 성명:                    관계: (부, 모, 조부, 조모 등)
- 연락처(휴대전화):                   (필수)
- 이메일: (선택)

위 본인은 개인정보 수집·이용·제공에 관한 내용을 충분히 이해하였으며,
이에 동의합니다.

2026년    월    일

보호자(법정대리인) 성명:              (서명 또는 인)

OO초등학교장 귀하`,
  },
  {
    id: 'tpl-8',
    title: '교무회의 회의록',
    type: '회의록',
    content: `2026학년도 제O차 교무회의록

OO초등학교

1. 회의 개요
- 회의명: 2026학년도 제O차 정례 교무회의
- 일시: 2026년 O월 O일(O) 15:00 ~ 16:30
- 장소: 본교 교무실
- 참석 대상: 전 교직원
- 실제 참석: OO명 (참석률: OO%)
- 불참: O명 (출장 O명, 연가 O명)
- 주재: 교장 OOO
- 서기: OOO 교사

2. 회의 안건

【보고 사항】

가. 전달 사항
  1) 교육청 공문 전달
    - OO교육지원청-OOOO (2026.O.O): OO 관련 협조 요청
    - 기한: 2026년 O월 O일까지 제출
    - 담당: OOO 부장

  2) 예산 집행 현황 보고 (행정실)
    - 2026년 O월 기준 집행률: OO%
    - 학년별 예산 집행 협조 요청

나. 지난 회의록 검토 및 후속 조치 보고
  1) 제O차 회의 결정사항 이행 현황
    - OO 행사: 2026년 O월 O일 완료
    - 특이사항: 없음

【심의·의결 사항】

제1안건: 2026학년도 OO 행사 계획(안) 승인의 건
  1) 제안 이유: 학생들의 OO 능력 신장
  2) 주요 내용
    - 일시: 2026년 O월 O일(O)
    - 대상: O학년 학생
    - 예산: 금 OOO,000원
  3) 질의 응답
    - OOO 교사: 예산 사용 항목에 대한 질의
    - OOO 부장: OO 구입비 및 운영비로 사용 예정
  4) 의결: 원안 가결 (찬성 OO명, 반대 O명, 기권 O명)

제2안건: 학사 일정 조정(안) 승인의 건
  1) 조정 사유: OO 행사와 일정 중복
  2) 조정 내용
    - 변경 전: 2026년 O월 O일(O)
    - 변경 후: 2026년 O월 O일(O)
  3) 의결: 원안 가결 (만장일치)

제3안건: OO 구입(안) 승인의 건
  1) 구입 사유: 기존 물품 노후 및 추가 필요
  2) 구입 목록
    - OO: O대 (단가: OOO,000원)
    - 소요 예산: 금 OOO,000원
  3) 의견
    - OOO 교사: 견적 비교 후 최저가 구입 건의
    - 행정실: 나라장터 입찰 진행 예정
  4) 의결: 원안 가결 (찬성 OO명, 기권 O명)

【협의 사항】

가. OO 운영 방안 협의
  1) 현황: 현재 OO 방식으로 운영 중
  2) 개선 의견
    - OOO 교사: OO 방식 제안
    - OOO 부장: 학년별 의견 수렴 후 재논의
  3) 결정: 다음 회의에서 재협의

나. 생활지도 협조 요청
  1) 등하교 안전 지도 강화
  2) 학년별 순번제 운영
  3) 협조 사항: 시간 엄수 및 적극적 지도

【기타 사항】

가. 학년별 건의 사항
  - O학년: OO 시설 개선 요청 → 행정실 검토 예정
  - O학년: OO 일정 조율 요청 → 교무부 검토 예정

나. 각 부서 업무 협조 요청
  - 교무부: 학적 변동 사항 즉시 보고
  - 연구부: 공개수업 일정 확정 (O월 O주)
  - 안전부: 안전점검 일지 작성 협조

3. 차기 회의 일정
- 일시: 2026년 O월 O일(O) 15:00
- 장소: 본교 교무실
- 예정 안건
  1) OO 행사 결과 보고
  2) OO 계획(안) 심의
  3) 기타 협의 사항

4. 특기 사항
- 원활한 회의 진행으로 예정 시간 내 종료
- 전 교직원의 적극적인 참여와 협조에 감사

2026년 O월 O일

주  재: 교장 OOO  (인)
서  기: OOO 교사  (인)

OO초등학교장`,
  },
  {
    id: 'tpl-9',
    title: '안전교육 실시 보고서',
    type: '보고서',
    content: `2026학년도 안전교육 실시 결과 보고서

OO초등학교

1. 교육 개요
가. 근거
  - 학교안전사고 예방 및 보상에 관한 법률 제8조
  - 2026학년도 학교 안전교육 계획

나. 교육 대상: O학년 전체 학생 (OOO명)

다. 교육 일시: 2026년 O월 O일(O) O교시

라. 교육 장소: 각 학급 교실 (또는 강당)

마. 교육 시간: 40분 (O교시)

2. 안전교육 영역 및 내용
본 교육은 「학교안전교육 실시 기준 등에 관한 고시」에 따른 7대 안전교육 중
[OO 안전교육] 영역을 실시하였습니다.

가. 교육 영역: [선택: 생활안전 / 교통안전 / 폭력·신변안전 / 약물·사이버중독 예방 /
                      재난안전 / 직업안전 / 응급처치]

나. 세부 교육 내용

【생활안전 교육 예시】
  1) 시설 및 제품 이용 안전
    - 학교 시설물 안전한 이용 방법
    - 놀이터 시설 사용 시 주의사항
    - 체육 활동 시 안전 수칙

  2) 신체 활동 안전
    - 교실 및 복도에서의 안전한 행동
    - 계단 이용 시 주의사항
    - 급식실 이용 수칙

【교통안전 교육 예시】
  1) 보행자 안전
    - 횡단보도 건너는 방법
    - 신호등 보는 법
    - 안전한 통학로 이용

  2) 자전거 안전
    - 자전거 안전 장비 착용
    - 자전거 도로 이용 방법
    - 교통 법규 준수

【재난안전 교육 예시】
  1) 화재 안전
    - 화재 발생 시 대피 요령
    - 소화기 사용 방법
    - 화재 신고 방법 (119)

  2) 지진 대비
    - 지진 발생 시 행동 요령 (Drop-Cover-Hold on)
    - 대피 장소 및 경로 확인
    - 지진 대피 훈련 참여

3. 교육 방법
- 강의 및 설명: 15분
- 교육 동영상 시청: 15분 (교육부 제작 안전교육 콘텐츠)
- 실습 및 체험: 10분 (역할극, 대피 훈련 등)

4. 교육 자료
- 교육부 학교안전정보센터 제공 자료 활용
- PPT 자료: OOO
- 동영상: OOO
- 활동지: OOO

5. 참석 현황
- 대상 학생: OOO명
- 참석 학생: OOO명 (참석률: OO.O%)
- 불참 사유: 질병 결석 O명, 기타 결석 O명

6. 교육 평가
가. 학생 이해도 평가
  - 평가 방법: 구두 질문, 활동지 작성
  - 우수: OO명 (OO%)
  - 보통: OO명 (OO%)
  - 미흡: O명 (O%)

나. 학생 반응
  - "실제 상황에서 어떻게 행동해야 할지 알게 되었어요"
  - "안전이 왜 중요한지 이해했어요"
  - "친구들과 함께 연습해서 재미있었어요"

7. 교육 효과
- 안전사고 예방 의식 제고
- 위급 상황 대처 능력 향상
- 안전 수칙 준수 습관 형성

8. 향후 계획
- 다음 안전교육 예정일: 2026년 O월 O일
- 다음 교육 영역: [OO 안전]
- 학부모 대상 안전교육 실시 예정: 2026년 O월

9. 특이사항
- 교육 중 질문이 많아 학생들의 관심도가 높았음
- 실습 활동 시 적극적으로 참여함
- 추가 질문 학생 O명에게 개별 상담 실시

붙임: 1. 교육 자료 1부
      2. 출석부 1부
      3. 활동 사진 1부
      4. 학생 활동지 샘플 1부.  끝.

보고 일자: 2026년 O월 O일
보고자: O학년 담임 OOO 교사

OO초등학교장`,
  },
  {
    id: 'tpl-10',
    title: '가정학습 신청서',
    type: '신청서',
    content: `가정학습 신청서

OO초등학교장 귀하

학생 정보
- 학년/반/번호: O학년 O반 O번
- 학생명:
- 생년월일:         년    월    일

가정학습 신청 내용
- 신청 기간: 2026년   월   일(  ) ~ 2026년   월   일(  )
- 총 일수:       일

신청 사유 (해당란에 ✓ 표시)
□ 질병 치료 (병명:                          )
□ 가족 간호 (대상:                          )
□ 교육 목적 (내용:                          )
□ 기타 (사유:                               )

가정학습 계획

1. 학습 목표


2. 일일 학습 시간표
시간          학습 내용
09:00~10:00
10:00~11:00
11:00~12:00
12:00~13:00   점심 및 휴식
13:00~14:00
14:00~15:00

3. 과목별 학습 계획
가. 국어:


나. 수학:


다. 기타 과목:


4. 학습 방법
□ 자기 주도 학습
□ 보호자 지도
□ 학원 수강 (학원명:                 )
□ 온라인 학습 (플랫폼:                )
□ 기타 (방법:                         )

5. 생활 계획
- 기상 시간:        시       분
- 취침 시간:        시       분
- 운동 시간: 주  회,  시간
- 독서 시간: 하루  시간

유의사항
1. 가정학습 기간은 「학교생활기록 작성 및 관리지침」에 따라 연간 30일 이내(학교장
   허가 시 60일 이내)로 하며, 출석으로 인정됩니다.

2. 가정학습 신청서는 실시 3일 전까지 제출하여야 하며, 부득이한 경우 사후 제출
   할 수 있습니다.

3. 가정학습 기간 중 학교 교육과정 운영(시험 등)에 필요한 경우 출석할 수 있습니다.

4. 학습 내용은 해당 학년 수준에 맞게 계획하시기 바랍니다.

5. 가정학습 종료 후 학습 결과 보고서를 제출해 주시기 바랍니다.

보호자 확인 사항
위 학생의 가정학습 신청 내용을 확인하였으며, 가정학습 기간 동안 학생을 성실히
지도하겠습니다.

- 보호자 성명:               (학생과의 관계:        )
- 연락처(휴대전화):
- 비상연락처:
- 주소:

2026년    월    일

보호자:              (서명 또는 인)

--------------------------------(담임 확인란)--------------------------------

가정학습 허가 여부
□ 허가    □ 불허 (사유:                                   )

담임교사 의견:


담임교사:              (인)     2026.   .   .

교감:                  (인)     2026.   .   .

OO초등학교장`,
  },
  // === 추가 템플릿: K-에듀파인 관련 ===
  {
    id: 'tpl-11',
    title: '예산 지출결의서 (K-에듀파인)',
    type: '공문',
    content: `지출결의서

※ K-에듀파인 학교회계 > 지출 > 지출결의등록에 입력 후 출력

결의 일자: 2026년   월   일

1. 지출 개요
- 사업명:
- 세출과목: 정책사업-단위사업-세부사업-목
  예) 학교운영비-교육활동비-교과활동-일반수용비
- 금액: 금                원 (₩           )
- 지출 사유:

2. 거래처 정보
- 업체명:
- 사업자등록번호:
- 대표자:
- 계좌번호:

3. 증빙 서류
□ 세금계산서 (전자/종이)
□ 카드매출전표 (학교회계카드)
□ 견적서
□ 납품확인서 / 검수확인서
□ 계약서 (해당 시)
□ 기타 (              )

4. 품의 이력
- 품의 번호:
- 품의 일자:
- 품의 금액:

5. 결재

기안자:        부장:        교감:        교장:

※ 100만원 이상: 2인 이상 견적 비교 필수
※ 200만원 이상: 수의계약 사유서 첨부
※ 2,000만원 이상: 나라장터 입찰 진행

OO초등학교`,
  },
  {
    id: 'tpl-12',
    title: '물품 구입 요청서',
    type: '신청서',
    content: `물품 구입 요청서

※ K-에듀파인 물품관리 > 물품구입요청 연계

요청 일자: 2026년   월   일
요청 부서:          요청자:

1. 구입 요청 물품

┌────────┬────────┬────┬────────┬────────┬──────┐
│  품  명  │  규  격  │수량│  단 가  │  금 액  │ 비고 │
├────────┼────────┼────┼────────┼────────┼──────┤
│          │          │    │          │          │      │
├────────┼────────┼────┼────────┼────────┼──────┤
│          │          │    │          │          │      │
├────────┼────────┼────┼────────┼────────┼──────┤
│          │          │    │          │          │      │
├────────┼────────┼────┼────────┼────────┼──────┤
│  합  계  │          │    │          │          │      │
└────────┴────────┴────┴────────┴────────┴──────┘

2. 구입 사유:


3. 예산 과목
- 세출과목:
- 잔액:           원

4. 납품 희망일: 2026년   월   일

5. 구입 방법
□ 학교장터(나라장터 쇼핑몰)
□ 수의계약 (사유:                )
□ 학교회계카드 구매
□ 기타 (                        )

6. 비고
- 물품 인수 후 K-에듀파인 물품등록 필수 (비품: 1건당 10만원 이상)
- 검수확인서 작성 필요

결재

요청자:        부장:        행정실장:        교감:

OO초등학교`,
  },
  // === 학교운영위원회 회의록 ===
  {
    id: 'tpl-13',
    title: '학교운영위원회 회의록',
    type: '회의록',
    content: `2026학년도 제O차 학교운영위원회 회의록

OO초등학교

1. 회의 개요
- 회의일시: 2026년   월   일(  )   시   분 ~   시   분
- 회의장소: 본교 학교운영위원회 회의실
- 위 원 장: OOO
- 참석위원: O명 / O명 (재적위원의 과반수 이상 참석으로 성립)
  참석: OOO, OOO, OOO, OOO, OOO
  불참: OOO (사유:         )
- 간  사: OOO (교무부장 / 행정실장)

2. 전차 회의록 확인
- 제O차 회의 결정사항 이행 현황 보고
- 이의 없이 승인

3. 안건 심의

【제1호 안건】 2026학년도 OOO 계획(안) 심의의 건
가. 제안 설명 (설명자: OOO)
  - 추진 배경:
  - 주요 내용:
  - 예상 예산:

나. 질의 응답
  - OOO 위원: (질의 내용)
  → OOO: (답변 내용)

  - OOO 위원: (질의 내용)
  → OOO: (답변 내용)

다. 심의 결과
  □ 원안 의결    □ 수정 의결    □ 부결    □ 보류
  - 찬성: O명, 반대: O명, 기권: O명
  - 수정 사항 (해당 시):

【제2호 안건】 수익자부담경비 징수(안) 심의의 건
가. 제안 설명 (설명자: OOO)
  - 징수 항목:
  - 1인당 금액:
  - 징수 대상:
  - 징수 시기:

나. 질의 응답
  - OOO 위원:
  → OOO:

다. 심의 결과
  □ 원안 의결    □ 수정 의결    □ 부결    □ 보류
  - 찬성: O명, 반대: O명, 기권: O명

【제3호 안건】 학교회계 예산(안) / 결산(안) 심의의 건
가. 제안 설명 (설명자: 행정실장 OOO)
  - 세입 총액:               원
  - 세출 총액:               원
  - 주요 편성 내용:

나. 심의 결과
  □ 원안 의결    □ 수정 의결
  - 찬성: O명, 반대: O명, 기권: O명

4. 기타 토의 사항
-
-

5. 차기 회의 일정
- 일시: 2026년   월   일(  )   시
- 예정 안건:

6. 폐회 선언
- 폐회 시각:   시   분

위 회의록이 틀림없음을 확인합니다.

2026년   월   일

위원장:           (서명)
간  사:           (서명)

OO초등학교 학교운영위원회`,
  },
  // === 현장체험학습 계획서 ===
  {
    id: 'tpl-14',
    title: '현장체험학습 계획서',
    type: '계획서',
    content: `2026학년도 현장체험학습 계획서

OO초등학교

1. 목적
- 교과 학습과 연계한 체험 중심 교육 활동 실시
- 자연 및 문화 체험을 통한 학생 역량 강화
- 공동체 의식 및 협동심 함양

2. 체험학습 개요
- 일시: 2026년   월   일(  )   시 ~   시
- 장소:
- 대상: O학년 전체 학생 (OOO명)
- 인솔 교원: 담임교사 O명, 보조인솔 O명 (학생 20명당 1인 이상)
- 이동 수단: 전세버스 O대 (안전벨트 장착 확인)

3. 교육과정 연계
- 관련 교과:
- 관련 성취기준:
- 사전 학습 내용:
- 사후 학습 활동:

4. 세부 일정

시간              활동 내용                      장소         비고
─────────────────────────────────────────────────────────
  :  ~  :       학교 집합 및 출발 전 안전교육    운동장
  :  ~  :       이동                            버스
  :  ~  :       도착 및 오리엔테이션
  :  ~  :       체험 활동 1
  :  ~  :       점심식사                                     도시락
  :  ~  :       체험 활동 2
  :  ~  :       정리 및 귀교
  :  ~  :       학교 도착 및 귀가 지도
─────────────────────────────────────────────────────────

5. 안전 관리 계획
가. 사전 안전 점검
  - 체험학습 장소 사전 답사 실시 (일시:        )
  - 안전시설 및 위험요소 점검
  - 우천 시 대체 장소:
  - 긴급 의료기관 확인:

나. 안전 교육
  - 출발 전 안전 교육 실시 (버스 안전, 활동 시 주의사항)
  - 인솔 교사별 담당 학생 배정 (조 편성)

다. 비상 연락 체계
  - 학교: ☎
  - 인솔교사(총괄): ☎
  - 체험학습 장소: ☎
  - 인근 병원: ☎
  - 경찰서/소방서: 112/119

라. 특이사항 학생 관리
  - 알레르기 보유 학생:
  - 건강 유의 학생:
  - 비상약품 준비

6. 소요 예산
- 버스 임차비:            원
- 입장료:                원 (1인        원 × OOO명)
- 기타:                  원
- 합계:                  원
- 재원: □ 학교운영비  □ 수익자부담경비  □ 기타

7. 수익자부담경비 징수 (해당 시)
- 1인당 징수액:          원
- 학교운영위원회 심의 일자: 2026년   월   일
- 감면 대상: 기초수급, 차상위, 한부모 (학교 지원)

8. 기대 효과
-
-

붙임: 1. 가정통신문 1부
      2. 현장체험학습 동의서 1부
      3. 안전점검표 1부.  끝.

작성일: 2026년   월   일
작성자: O학년 부장 OOO

OO초등학교장`,
  },
  // === 현장체험학습 결과보고서 ===
  {
    id: 'tpl-15',
    title: '현장체험학습 결과보고서',
    type: '보고서',
    content: `2026학년도 현장체험학습 결과 보고서

OO초등학교

1. 체험학습 개요
- 일시: 2026년   월   일(  )   시 ~   시
- 장소:
- 대상: O학년 전체 학생 (참가: OOO명 / 전체: OOO명)
- 인솔 교원: O명 (담임 O명, 보조 O명)
- 이동 수단: 전세버스 O대

2. 실시 내용
가. 체험 활동 1:
  - 내용:
  - 학생 반응:

나. 체험 활동 2:
  - 내용:
  - 학생 반응:

3. 참가 현황
- 참가 대상: OOO명
- 실제 참가: OOO명 (참가율: OO.O%)
- 불참: O명 (사유: 질병 O명, 기타 O명)
- 불참 학생 지도: 학교 잔류 프로그램 운영

4. 교육과정 연계 성과
- 관련 교과:
- 사전 학습과의 연계:
- 사후 학습 활동 계획:

5. 예산 집행 내역
┌──────────┬──────────┬──────────┬──────────┐
│    항목    │  예산액   │  집행액   │   비고   │
├──────────┼──────────┼──────────┼──────────┤
│ 버스 임차비 │          │          │          │
│ 입장료     │          │          │          │
│ 기타       │          │          │          │
├──────────┼──────────┼──────────┼──────────┤
│ 합계       │          │          │          │
└──────────┴──────────┴──────────┴──────────┘
- 잔액 처리:

6. 안전 관련 사항
- 안전사고 발생 여부: □ 없음  □ 있음 (내용:                )
- 특이사항:

7. 종합 평가
가. 우수한 점:
나. 개선이 필요한 점:
다. 차기 체험학습 시 반영 사항:

8. 학생 소감 (대표)
-
-

붙임: 1. 활동 사진 1부
      2. 예산 정산서 1부
      3. 학생 활동지(소감문) 샘플 1부.  끝.

보고일: 2026년   월   일
보고자: O학년 부장 OOO

OO초등학교장`,
  },
  // === 학부모 상담 기록지 ===
  {
    id: 'tpl-16',
    title: '학부모 상담 기록지',
    type: '기타',
    content: `학부모 상담 기록지

OO초등학교 2026학년도

1. 학생 정보
- 학년/반/번호: O학년 O반 O번
- 학생명:
- 담임교사:

2. 상담 정보
- 상담 일시: 2026년   월   일(  )   시   분 ~   시   분
- 상담 장소: □ 교실  □ 상담실  □ 전화  □ 화상  □ 기타(        )
- 상담 유형: □ 정기 상담  □ 수시 상담  □ 학부모 요청  □ 교사 요청
- 상담 대상: □ 부  □ 모  □ 조부모  □ 기타(        )
- 상담자(보호자명):                  (연락처:                )

3. 상담 영역 (해당란에 ✓)
□ 학습(교과 성적, 학습 태도, 학습 방법 등)
□ 교우관계(또래 관계, 갈등, 따돌림 등)
□ 생활습관(기본 생활, 출결, 건강 등)
□ 정서·행동(불안, 우울, ADHD, 분노 등)
□ 진로(적성, 진학 등)
□ 가정환경(가정 내 어려움, 양육 등)
□ 특수교육(통합교육, IEP 등)
□ 기타(                              )

4. 상담 내용
가. 학부모 의견 / 상담 요청 사항:



나. 교사 소견 / 학교에서의 학생 모습:



5. 합의 사항 / 지도 방향
가. 가정에서:

나. 학교에서:

6. 후속 조치
- □ 추가 상담 필요 (예정일:       월       일)
- □ Wee 클래스 / 전문상담 연계 (연계일:                )
- □ 외부 기관 연계 (기관명:                            )
- □ 학교폭력 관련 조치 필요
- □ 특수교육 관련 조치 필요
- □ 기타 (                                            )

7. 비고



상담 교사:              (서명)     2026.   .   .

※ 본 상담 기록지는 개인정보보호법에 따라 비밀이 보장되며,
   교육 목적으로만 활용됩니다.`,
  },
  // === 안전교육 실시 보고서 (간략 양식) ===
  {
    id: 'tpl-17',
    title: '7대 안전교육 실시 기록부',
    type: '보고서',
    content: `2026학년도 학교 안전교육 실시 기록부

OO초등학교

※ 학교안전교육 실시 기준 등에 관한 고시(교육부고시 제2022-2호) 근거
※ 7대 안전교육 영역: 생활안전, 교통안전, 폭력예방 및 신변안전,
   약물·사이버중독 예방, 재난안전, 직업안전, 응급처치

학년/반: O학년 O반    담임교사:

┌────┬─────────┬────┬────────┬────────┬──────┬────┐
│번호│  교육 영역   │ 일시 │  교육 내용  │  교육방법  │교육시간│참여수│
├────┼─────────┼────┼────────┼────────┼──────┼────┤
│ 1  │생활안전    │  /  │           │□강의□체험│      │    │
├────┼─────────┼────┼────────┼────────┼──────┼────┤
│ 2  │교통안전    │  /  │           │□강의□체험│      │    │
├────┼─────────┼────┼────────┼────────┼──────┼────┤
│ 3  │폭력예방및  │  /  │           │□강의□체험│      │    │
│    │신변안전    │     │           │          │      │    │
├────┼─────────┼────┼────────┼────────┼──────┼────┤
│ 4  │약물·사이버 │  /  │           │□강의□체험│      │    │
│    │중독예방    │     │           │          │      │    │
├────┼─────────┼────┼────────┼────────┼──────┼────┤
│ 5  │재난안전    │  /  │           │□강의□체험│      │    │
├────┼─────────┼────┼────────┼────────┼──────┼────┤
│ 6  │직업안전    │  /  │           │□강의□체험│      │    │
├────┼─────────┼────┼────────┼────────┼──────┼────┤
│ 7  │응급처치    │  /  │           │□강의□체험│      │    │
└────┴─────────┴────┴────────┴────────┴──────┴────┘

※ NEIS 등록 경로: NEIS > 학생생활 > 안전교육 > 교육실적등록
※ 안전교육 시수: 연간 51시간 이상 (학기별 25.5시간 이상)

누적 실시 현황
- 1학기:      시간 /  25.5시간
- 2학기:      시간 /  25.5시간
- 연간 합계:  시간 /  51시간

확인

담임교사:          (인)
안전부장:          (인)`,
  },
  // === 방과후학교 운영 계획서 ===
  {
    id: 'tpl-18',
    title: '방과후학교 운영 계획서',
    type: '계획서',
    content: `2026학년도 O학기 방과후학교 운영 계획서

OO초등학교

1. 운영 목적
- 학생의 소질과 적성 계발 기회 제공
- 사교육비 경감 및 교육 격차 해소
- 돌봄 사각지대 해소 및 맞벌이 가정 지원

2. 운영 기간
- 2026년   월   일(  ) ~   월   일(  )
- 총 OO주간 운영

3. 운영 시간
- 방과 후 ~ 17:00 (강좌별 상이)
- 월~금 (주 5일)

4. 개설 강좌 현황

┌────┬─────────┬────┬──────┬────┬─────┬──────┐
│번호│  강좌명    │요일  │  시간  │정원│ 강사 │수강료/월│
├────┼─────────┼────┼──────┼────┼─────┼──────┤
│ 1  │           │      │       │    │      │        │
├────┼─────────┼────┼──────┼────┼─────┼──────┤
│ 2  │           │      │       │    │      │        │
├────┼─────────┼────┼──────┼────┼─────┼──────┤
│ 3  │           │      │       │    │      │        │
├────┼─────────┼────┼──────┼────┼─────┼──────┤
│ 4  │           │      │       │    │      │        │
├────┼─────────┼────┼──────┼────┼─────┼──────┤
│ 5  │           │      │       │    │      │        │
└────┴─────────┴────┴──────┴────┴─────┴──────┘

5. 강사 채용 계획
- 채용 방법: 공개 채용 (학교 홈페이지 공고)
- 자격 요건: 해당 분야 자격증 소지자 또는 관련 경력자
- 채용 절차: 서류심사 → 면접(시범수업) → 선정위원회 심의 → 계약
- 강사료 지급: K-에듀파인 통한 계좌 입금

6. 수강료 관리
- 징수 방법: 학교 가상계좌 입금
- 수강료 기준: 학교운영위원회 심의를 거쳐 결정
- 감면 대상: 기초생활수급자, 차상위계층, 한부모가정 (100% 감면)
             그 외 교육비 지원 대상 (학교 기준에 따라)

7. 안전 관리
- 방과후학교 활동 중 안전사고 대비 보험 가입
- 학교안전공제회 적용
- 귀가 지도: 하교 시 안전 귀가 지도

8. 프로그램 질 관리
- 학기별 1회 학생·학부모 만족도 조사 실시
- 수업 참관 (담당 교사)
- 강사 연수 실시 (안전교육, 아동학대 예방교육 등)

9. 소요 예산
- 강사료:              원
- 재료비:              원
- 운영비:              원
- 합계:                원
- 재원: □ 방과후학교 지원금  □ 수강료  □ 학교운영비

10. 학교운영위원회 심의
- 심의 일자: 2026년   월   일
- 심의 결과:

붙임: 1. 강좌별 세부 운영 계획 1부
      2. 수강 신청서 양식 1부
      3. 가정통신문 1부.  끝.

작성일: 2026년   월   일
작성자: 방과후학교 담당 OOO

OO초등학교장`,
  },
  // === 교육과정 운영 계획서 ===
  {
    id: 'tpl-19',
    title: '교육과정 운영 계획서',
    type: '계획서',
    content: `2026학년도 학교 교육과정 운영 계획(안)

OO초등학교

1. 교육 목표
가. 학교 교육 목표


나. 학년별 중점 교육 목표
- 1~2학년:
- 3~4학년:
- 5~6학년:

2. 편성·운영의 기본 방향
- 2022 개정 교육과정 적용 (2024년~단계적 적용)
- 학생 중심, 역량 기반 교육과정 운영
- 교과 간 융합 및 프로젝트 학습 활성화

3. 교과별 수업 시수

┌──────┬───┬───┬───┬───┬───┬───┐
│  교과  │1학년│2학년│3학년│4학년│5학년│6학년│
├──────┼───┼───┼───┼───┼───┼───┤
│ 국어   │     │     │     │     │     │     │
│ 수학   │     │     │     │     │     │     │
│ 사회   │ -   │ -   │     │     │     │     │
│ 과학   │ -   │ -   │     │     │     │     │
│ 영어   │ -   │ -   │     │     │     │     │
│ 도덕   │ -   │ -   │     │     │     │     │
│ 체육   │     │     │     │     │     │     │
│ 음악   │     │     │     │     │     │     │
│ 미술   │     │     │     │     │     │     │
│ 실과   │ -   │ -   │ -   │ -   │     │     │
│바른생활│     │     │ -   │ -   │ -   │ -   │
│슬기로운│     │     │ -   │ -   │ -   │ -   │
│즐거운  │     │     │ -   │ -   │ -   │ -   │
├──────┼───┼───┼───┼───┼───┼───┤
│ 교과합계│     │     │     │     │     │     │
│창의적체│     │     │     │     │     │     │
│험활동  │     │     │     │     │     │     │
├──────┼───┼───┼───┼───┼───┼───┤
│ 총 시수│     │     │     │     │     │     │
└──────┴───┴───┴───┴───┴───┴───┘

4. 창의적 체험활동 운영 계획
가. 자율활동:
나. 동아리활동:
다. 봉사활동:
라. 진로활동:

5. 범교과 학습 주제 편성
- 안전교육: 연 51시간 이상
- 인성교육:
- 환경교육:
- 다문화교육:
- 기타:

6. 평가 계획
- 교과별 평가: 과정 중심 수행평가 강화
- 평가 횟수: 학기당 O회 이상
- 평가 결과 활용: 학생 맞춤형 피드백

7. 학교운영위원회 심의
- 심의 일자: 2026년   월   일
- 심의 결과:

작성일: 2026년   월   일
작성자: 교무부장 OOO

OO초등학교장`,
  },
  // === 생활지도 특이사항 보고서 ===
  {
    id: 'tpl-20',
    title: '생활지도 특이사항 보고서',
    type: '보고서',
    content: `생활지도 특이사항 보고서

OO초등학교

※ 본 보고서는 비공개 문서로, 관련 교직원만 열람 가능합니다.

1. 보고 일시: 2026년   월   일(  )   시   분
2. 보고자: O학년 O반 담임교사 OOO (내선:     )

3. 학생 정보
- 학년/반/번호: O학년 O반 O번
- 학생명:
- 성별: □ 남  □ 여
- 보호자 연락처:

4. 사안 유형 (해당란에 ✓)
□ 학교폭력 (의심)    □ 아동학대 (의심)    □ 자해·자살 (의심)
□ 교우 갈등          □ 무단결석           □ 가출
□ 정서·행동 문제     □ 건강 문제          □ 기타(          )

5. 발생 경위 및 내용




6. 현재 상태
- 학생 상태:
- 조치 사항:

7. 보고 체계 (해당 시 ✓)
□ 교감 보고 (일시:        )
□ 교장 보고 (일시:        )
□ 학교폭력 전담기구 보고 (일시:        )
□ 외부 기관 신고
  □ 아동보호전문기관 (112)
  □ 경찰서 (112)
  □ 교육지원청
  □ 기타 (                )

8. 후속 조치 계획
-
-
-

9. 비고


보고자:              (서명)
확인자(교감):         (서명)

※ 아동학대 의심 시 즉시 신고 의무 (아동복지법 제26조)
   신고전화: 112 또는 아동보호전문기관`,
  },
  // === 학교 공문 기본 양식 (K-에듀파인/업무관리시스템) ===
  {
    id: 'tpl-21',
    title: '업무관리시스템 공문 기본양식',
    type: '공문',
    content: `OO초등학교

수신: OO교육지원청 (또는 OO초등학교장, 관련 기관장)
(경유)
제목:

1. 관련:  OO교육지원청-OOOO호(2026.O.O.) "OOO 관련"

2. 위 호와 관련하여 본교의 OOO 현황을 다음과 같이 보고(안내/협조요청)
   합니다.

                        - 다  음 -

가.
나.
다.

3. 기타 사항
-

붙임  1. OOO 1부.
      2. OOO 1부.  끝.

                    OO초등학교장   [직인]

기안자: OOO (내선    )
검토자: OOO
협조자:
시행: OO초-OOOO (2026.O.O.)
접수: OO교육지원청-OOOO (2026.O.O.)
우 OOOOO   OO시 OO구 OO로 OO
전화 OOO-OOOO   전송 OOO-OOOO
전자우편 OOO@OOOO.go.kr
/ 공개

※ 업무관리시스템(온-나라/K-에듀파인 문서관리) 기안 시 참조
※ 문서번호, 시행일, 접수일은 시스템에서 자동 부여`,
  },
  // === 학교 행사 결과 보고서 ===
  {
    id: 'tpl-22',
    title: '학교 행사 결과 보고서',
    type: '보고서',
    content: `2026학년도 OO 행사 결과 보고서

OO초등학교

1. 행사 개요
- 행사명:
- 일시: 2026년   월   일(  )   시 ~   시
- 장소:
- 대상: O학년 학생 OOO명 (또는 전교생)
- 주관: O부 (담당: OOO 교사)

2. 추진 경과
- 계획 수립:    월   일
- 기안 결재:    월   일
- 사전 준비:    월   일 ~   월   일
- 행사 실시:    월   일
- 결과 보고:    월   일

3. 행사 내용
가.
나.
다.

4. 참여 현황
- 참가 대상: OOO명
- 실제 참가: OOO명 (참가율: OO.O%)
- 불참 사유:

5. 예산 집행 내역
- 예산액:              원
- 집행액:              원
- 잔액:                원
- 주요 집행 내역:

6. 행사 평가
가. 성과 및 우수한 점:

나. 개선 사항:

다. 학생 반응 (대표 소감):

7. 향후 계획
-

붙임: 1. 행사 사진 1부
      2. 만족도 조사 결과 1부.  끝.

보고일: 2026년   월   일
보고자: OOO (O부 담당)

OO초등학교장`,
  },
];

// 현재 월 기반 추천 문서 생성 함수
function getRecommendedDocuments(month: number): { title: string; description: string; aiPrompt: string }[] {
  const monthlyTasks = getEnhancedMonthlyTasks(month);
  const recommendations: { title: string; description: string; aiPrompt: string }[] = [];

  if (monthlyTasks?.tasks) {
    for (const task of monthlyTasks.tasks) {
      // 각 월별 업무에서 관련 문서 추천 생성
      if (task.name.includes('졸업') || task.name.includes('수료')) {
        recommendations.push({
          title: '졸업식/수료식 안내문',
          description: task.detail,
          aiPrompt: `${month}월 초등학교 졸업식·수료식 학부모 안내문을 작성해줘. 일시, 장소, 주의사항 포함.`,
        });
      }
      if (task.name.includes('예산') || task.name.includes('결산')) {
        recommendations.push({
          title: '학교회계 예결산 관련 문서',
          description: task.detail,
          aiPrompt: `초등학교 학교회계 ${task.name} 관련 보고서를 작성해줘. K-에듀파인 기준으로.`,
        });
      }
      if (task.name.includes('교육과정')) {
        recommendations.push({
          title: '교육과정 운영 계획/보고',
          description: task.detail,
          aiPrompt: `${month}월 초등학교 교육과정 관련 문서를 작성해줘. ${task.detail}`,
        });
      }
      if (task.name.includes('담임') || task.name.includes('업무분장')) {
        recommendations.push({
          title: '업무분장표/담임 배정표',
          description: task.detail,
          aiPrompt: `새 학년도 초등학교 업무분장표 양식을 작성해줘. 부서별 업무 배분 포함.`,
        });
      }
      if (task.name.includes('상담')) {
        recommendations.push({
          title: '학부모 상담 안내문',
          description: task.detail,
          aiPrompt: `${month}월 학부모 상담주간 안내 가정통신문을 작성해줘. 상담 일정, 방법, 신청 방법 포함.`,
        });
      }
      if (task.name.includes('학교폭력')) {
        recommendations.push({
          title: '학교폭력 예방교육 결과보고서',
          description: task.detail,
          aiPrompt: `초등학교 학교폭력 예방교육 실시 결과 보고서를 작성해줘.`,
        });
      }
      if (task.name.includes('체험학습') || task.name.includes('소풍') || task.name.includes('수학여행')) {
        recommendations.push({
          title: '현장체험학습 계획서',
          description: task.detail,
          aiPrompt: `${month}월 초등학교 현장체험학습 계획서를 작성해줘. 안전관리 계획 포함.`,
        });
      }
      if (task.name.includes('안전')) {
        recommendations.push({
          title: '안전교육 실시 보고서',
          description: task.detail,
          aiPrompt: `초등학교 안전교육 실시 결과 보고서를 작성해줘. ${task.detail}`,
        });
      }
      if (task.name.includes('성적') || task.name.includes('학교생활기록부')) {
        recommendations.push({
          title: '성적처리/학생부 관련 안내',
          description: task.detail,
          aiPrompt: `${month}월 학기말 성적처리 및 학교생활기록부 기재 관련 교사 안내문을 작성해줘.`,
        });
      }
      if (task.name.includes('방과후')) {
        recommendations.push({
          title: '방과후학교 운영 안내문',
          description: task.detail,
          aiPrompt: `초등학교 방과후학교 프로그램 안내 가정통신문을 작성해줘. 강좌, 시간, 수강료 포함.`,
        });
      }
      if (task.name.includes('교실') || task.name.includes('환경')) {
        recommendations.push({
          title: '교실 배정/환경 정비 계획',
          description: task.detail,
          aiPrompt: `새 학년도 교실 배정 및 학습 환경 정비 계획서를 작성해줘.`,
        });
      }
    }
  }

  // 기본 추천이 없으면 월별 공통 추천 추가
  if (recommendations.length === 0) {
    recommendations.push({
      title: '월간 업무 보고서',
      description: `${month}월 학교 업무 진행 현황 보고`,
      aiPrompt: `${month}월 초등학교 월간 업무 보고서 양식을 작성해줘.`,
    });
  }

  return recommendations;
}

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('전체');
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatePrompt, setGeneratePrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  // 현재 월 기반 추천 문서
  const currentMonth = new Date().getMonth() + 1;
  const recommendedDocs = useMemo(() => getRecommendedDocuments(currentMonth), [currentMonth]);

  // 로컬 스토리지에서 문서 로드
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('eduflow_documents');
    if (saved) {
      setDocuments(JSON.parse(saved));
    }
  }, []);

  // 문서 저장
  const saveDocuments = (docs: Document[]) => {
    setDocuments(docs);
    localStorage.setItem('eduflow_documents', JSON.stringify(docs));
  };

  // 새 문서 폼 상태
  const [newDocument, setNewDocument] = useState<{
    title: string;
    content: string;
    type: string;
    status: 'DRAFT' | 'REVIEW' | 'APPROVED';
    isStarred: boolean;
    isGenerated: boolean;
  }>({
    title: '',
    content: '',
    type: '가정통신문',
    status: 'DRAFT',
    isStarred: false,
    isGenerated: false,
  });

  // 필터링
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === '전체' || doc.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [documents, searchQuery, selectedType]);

  const starredDocuments = documents.filter((doc) => doc.isStarred);

  // 템플릿 사용
  const useTemplate = (template: typeof documentTemplates[0]) => {
    setNewDocument({
      title: template.title,
      content: template.content,
      type: template.type,
      status: 'DRAFT',
      isStarred: false,
      isGenerated: false,
    });
    setIsAddDialogOpen(true);
    toast.success('템플릿이 적용되었습니다. 내용을 수정해주세요.');
  };

  // AI 생성
  const handleGenerate = async () => {
    if (!generatePrompt.trim()) return;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: `다음 요청에 맞는 초등학교 공문서를 작성해주세요. 실제 사용할 수 있는 형식으로 작성해주세요:\n\n${generatePrompt}`,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const newDoc: Document = {
        id: `doc-${Date.now()}`,
        title: generatePrompt.slice(0, 30) + (generatePrompt.length > 30 ? '...' : ''),
        content: data.message?.content || '생성된 내용이 없습니다.',
        type: '가정통신문',
        status: 'DRAFT',
        isStarred: false,
        isGenerated: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveDocuments([newDoc, ...documents]);
      setGeneratePrompt('');
      setShowGenerator(false);
      toast.success('문서가 생성되었습니다!');
    } catch (err) {
      console.error('문서 생성 실패:', err);
      toast.error('문서 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  // 문서 추가
  const handleAddDocument = async () => {
    if (!newDocument.title.trim()) return;

    setIsSubmitting(true);
    const newDoc: Document = {
      id: `doc-${Date.now()}`,
      ...newDocument,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveDocuments([newDoc, ...documents]);
    setNewDocument({
      title: '',
      content: '',
      type: '가정통신문',
      status: 'DRAFT',
      isStarred: false,
      isGenerated: false,
    });
    setIsAddDialogOpen(false);
    setIsSubmitting(false);
    toast.success('문서가 저장되었습니다!');
  };

  // 문서 수정
  const handleEditDocument = async () => {
    if (!editingDocument) return;

    setIsSubmitting(true);
    const updatedDocs = documents.map((doc) =>
      doc.id === editingDocument.id
        ? { ...editingDocument, updatedAt: new Date().toISOString() }
        : doc
    );
    saveDocuments(updatedDocs);
    setIsEditDialogOpen(false);
    setEditingDocument(null);
    setIsSubmitting(false);
    toast.success('문서가 수정되었습니다!');
  };

  // 문서 삭제
  const handleDeleteDocument = async (docId: string) => {
    if (confirm('정말로 이 문서를 삭제하시겠습니까?')) {
      saveDocuments(documents.filter((doc) => doc.id !== docId));
      toast.success('문서가 삭제되었습니다.');
    }
  };

  // 즐겨찾기 토글
  const toggleStarred = async (doc: Document) => {
    const updatedDocs = documents.map((d) =>
      d.id === doc.id ? { ...d, isStarred: !d.isStarred } : d
    );
    saveDocuments(updatedDocs);
  };

  const openEditDialog = (doc: Document) => {
    setEditingDocument({ ...doc });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (doc: Document) => {
    setViewingDocument(doc);
    setIsViewDialogOpen(true);
  };

  // 문서 복사
  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('클립보드에 복사되었습니다!');
  };

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">문서 작성</h1>
          <p className="text-muted-foreground">
            공문서 템플릿을 사용하거나 AI로 생성하세요
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            새 문서
          </Button>
          <Button variant="secondary" onClick={() => setShowGenerator(true)}>
            <Sparkles className="h-4 w-4 mr-2" />
            AI 생성
          </Button>
        </div>
      </div>

      {/* 이달의 추천 문서 섹션 */}
      {recommendedDocs.length > 0 && (
        <Card className="border-blue-200 bg-blue-50/30 dark:border-blue-900 dark:bg-blue-950/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-blue-600" />
                {currentMonth}월 추천 문서
              </CardTitle>
              <Link href="/ai-chat">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  AI에게 문서 요청
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              이달 업무에 필요한 문서를 추천합니다. 클릭하면 AI가 자동 작성합니다.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {recommendedDocs.map((rec, idx) => (
                <Card
                  key={`rec-${idx}`}
                  className="cursor-pointer hover:border-blue-400 transition-colors bg-white dark:bg-background"
                  onClick={() => {
                    setGeneratePrompt(rec.aiPrompt);
                    setShowGenerator(true);
                  }}
                >
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Sparkles className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{rec.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 템플릿 섹션 */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <FileEdit className="h-4 w-4 text-primary" />
              문서 템플릿
              <Badge variant="secondary" className="text-xs ml-1">{documentTemplates.length}개</Badge>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllTemplates(!showAllTemplates)}
              className="text-muted-foreground"
            >
              {showAllTemplates ? (
                <>
                  접기 <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  전체보기 <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(showAllTemplates ? documentTemplates : documentTemplates.slice(0, 6)).map((template) => (
              <Card
                key={template.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => useTemplate(template)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{template.title}</h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {template.type}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {!showAllTemplates && documentTemplates.length > 6 && (
            <div className="mt-3 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAllTemplates(true)}
              >
                {documentTemplates.length - 6}개 더 보기
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI 문서 도우미 바로가기 */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-200 dark:border-purple-900">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-sm">AI 문서 작성 도우미</h3>
                <p className="text-xs text-muted-foreground">
                  AI 채팅에서 원하는 문서를 자유롭게 요청하세요. 가정통신문, 공문, 보고서 등 무엇이든 작성해드립니다.
                </p>
              </div>
            </div>
            <Link href="/ai-chat">
              <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap">
                AI 채팅 열기
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* AI Document Generator Modal */}
      {showGenerator && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI 문서 생성
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-2 block">어떤 문서가 필요하신가요?</Label>
              <Textarea
                placeholder="예: 3월 15일 학부모 상담 안내문을 작성해줘. 상담 시간은 14시~18시이고..."
                value={generatePrompt}
                onChange={(e) => setGeneratePrompt(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowGenerator(false)}>
                취소
              </Button>
              <Button onClick={handleGenerate} disabled={!generatePrompt.trim() || isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    문서 생성
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Access - Starred Documents */}
      {starredDocuments.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              즐겨찾기
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {starredDocuments.map((doc) => (
                <Button
                  key={doc.id}
                  variant="outline"
                  className="flex-shrink-0 h-auto py-2 px-3"
                  onClick={() => openViewDialog(doc)}
                >
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  {doc.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="문서 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {documentTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="whitespace-nowrap"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex items-center gap-1">
                  {doc.isGenerated && (
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => toggleStarred(doc)}
                  >
                    {doc.isStarred ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <StarOff className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <h3 className="font-medium mb-1 truncate">{doc.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Badge variant="outline" className="text-xs">
                  {doc.type}
                </Badge>
                <span>•</span>
                <Badge
                  variant={
                    doc.status === 'APPROVED'
                      ? 'default'
                      : doc.status === 'REVIEW'
                      ? 'secondary'
                      : 'outline'
                  }
                  className="text-xs"
                >
                  {doc.status === 'APPROVED' ? '완료' : doc.status === 'REVIEW' ? '검토중' : '초안'}
                </Badge>
              </div>

              <div className="flex items-center text-xs text-muted-foreground mb-4">
                <Clock className="h-3 w-3 mr-1" />
                수정: {formatDate(doc.updatedAt)}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openViewDialog(doc)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  보기
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => openEditDialog(doc)}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  수정
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDeleteDocument(doc.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* New Document Card */}
        <Card
          className="border-dashed hover:border-primary transition-colors cursor-pointer"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <CardContent className="pt-4 h-full flex flex-col items-center justify-center min-h-[200px]">
            <div className="p-3 rounded-full bg-muted mb-3">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-muted-foreground">새 문서 만들기</p>
            <p className="text-sm text-muted-foreground">직접 작성하거나 AI로 생성</p>
          </CardContent>
        </Card>
      </div>

      {filteredDocuments.length === 0 && documents.length > 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">검색 결과가 없습니다.</p>
          </CardContent>
        </Card>
      )}

      {documents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground mb-2">등록된 문서가 없습니다.</p>
            <p className="text-sm text-muted-foreground mb-4">
              위의 템플릿을 사용하거나 새 문서를 만들어보세요!
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              새 문서 만들기
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Document Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>새 문서 만들기</DialogTitle>
            <DialogDescription>새로운 문서를 작성합니다.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={newDocument.title}
                onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                placeholder="문서 제목을 입력하세요"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>유형</Label>
                <Select
                  value={newDocument.type}
                  onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes
                      .filter((t) => t !== '전체')
                      .map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>상태</Label>
                <Select
                  value={newDocument.status}
                  onValueChange={(value: 'DRAFT' | 'REVIEW' | 'APPROVED') =>
                    setNewDocument({ ...newDocument, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">초안</SelectItem>
                    <SelectItem value="REVIEW">검토중</SelectItem>
                    <SelectItem value="APPROVED">완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">내용</Label>
              <Textarea
                id="content"
                value={newDocument.content}
                onChange={(e) => setNewDocument({ ...newDocument, content: e.target.value })}
                placeholder="문서 내용을 입력하세요"
                className="min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleAddDocument} disabled={isSubmitting || !newDocument.title.trim()}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                '저장'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Document Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>문서 수정</DialogTitle>
            <DialogDescription>문서 정보를 수정합니다.</DialogDescription>
          </DialogHeader>
          {editingDocument && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">제목 *</Label>
                <Input
                  id="edit-title"
                  value={editingDocument.title}
                  onChange={(e) =>
                    setEditingDocument({ ...editingDocument, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>유형</Label>
                  <Select
                    value={editingDocument.type}
                    onValueChange={(value) =>
                      setEditingDocument({ ...editingDocument, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes
                        .filter((t) => t !== '전체')
                        .map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>상태</Label>
                  <Select
                    value={editingDocument.status}
                    onValueChange={(value: 'DRAFT' | 'REVIEW' | 'APPROVED') =>
                      setEditingDocument({ ...editingDocument, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DRAFT">초안</SelectItem>
                      <SelectItem value="REVIEW">검토중</SelectItem>
                      <SelectItem value="APPROVED">완료</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">내용</Label>
                <Textarea
                  id="edit-content"
                  value={editingDocument.content || ''}
                  onChange={(e) =>
                    setEditingDocument({ ...editingDocument, content: e.target.value })
                  }
                  className="min-h-[200px]"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleEditDocument} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                '저장'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {viewingDocument?.title}
            </DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{viewingDocument?.type}</Badge>
                <span>•</span>
                <Badge
                  variant={
                    viewingDocument?.status === 'APPROVED'
                      ? 'default'
                      : viewingDocument?.status === 'REVIEW'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {viewingDocument?.status === 'APPROVED'
                    ? '완료'
                    : viewingDocument?.status === 'REVIEW'
                    ? '검토중'
                    : '초안'}
                </Badge>
                {viewingDocument?.isGenerated && (
                  <Badge variant="secondary">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI 생성
                  </Badge>
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[50vh] mt-4">
            <div className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
              {viewingDocument?.content || '내용이 없습니다.'}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => viewingDocument && copyToClipboard(viewingDocument.content)}
            >
              <Copy className="h-4 w-4 mr-2" />
              복사
            </Button>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              닫기
            </Button>
            <Button
              onClick={() => {
                setIsViewDialogOpen(false);
                if (viewingDocument) openEditDialog(viewingDocument);
              }}
            >
              <Edit className="h-4 w-4 mr-2" />
              수정
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
