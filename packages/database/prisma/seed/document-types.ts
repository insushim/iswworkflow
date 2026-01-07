import { Prisma } from '@prisma/client';

export const documentTypes: Prisma.DocumentTypeCreateInput[] = [
  {
    name: 'official_letter',
    nameKo: '공문',
    description: '교육청, 타 기관 발송 공문',
    icon: 'file-text',
  },
  {
    name: 'notice',
    nameKo: '가정통신문',
    description: '학부모 대상 안내문',
    icon: 'mail',
  },
  {
    name: 'report',
    nameKo: '보고서',
    description: '각종 보고서 및 결과보고',
    icon: 'file-bar-chart',
  },
  {
    name: 'plan',
    nameKo: '계획서',
    description: '행사, 프로그램 계획서',
    icon: 'clipboard-list',
  },
  {
    name: 'minutes',
    nameKo: '회의록',
    description: '각종 회의 회의록',
    icon: 'users',
  },
  {
    name: 'guide',
    nameKo: '안내문',
    description: '교내 안내문',
    icon: 'info',
  },
  {
    name: 'certificate',
    nameKo: '증명서',
    description: '각종 증명서류',
    icon: 'award',
  },
  {
    name: 'consent',
    nameKo: '동의서',
    description: '학부모 동의서',
    icon: 'check-square',
  },
  {
    name: 'survey',
    nameKo: '설문지',
    description: '각종 설문조사',
    icon: 'list-checks',
  },
  {
    name: 'checklist',
    nameKo: '점검표',
    description: '각종 점검표 및 체크리스트',
    icon: 'clipboard-check',
  },
  {
    name: 'evaluation',
    nameKo: '평가지',
    description: '학생 평가 관련 문서',
    icon: 'file-check',
  },
  {
    name: 'lesson_plan',
    nameKo: '수업지도안',
    description: '교과 수업지도안',
    icon: 'book-open',
  },
];
