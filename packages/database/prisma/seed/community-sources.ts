import { Prisma, SourceType } from '@prisma/client';

export const communitySources: Prisma.CommunitySourceCreateInput[] = [
  // ===========================================
  // 공식 기관
  // ===========================================
  {
    name: '에듀넷 티-클리어',
    url: 'https://www.edunet.net',
    description: '한국교육학술정보원 운영 교육 포털',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '기초학력향상지원사이트 꾸꾸',
    url: 'https://www.basics.re.kr',
    description: '기초학력 향상 지원 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '학교안전정보센터',
    url: 'https://www.schoolsafe.kr',
    description: '학교 안전교육 자료 및 정보',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '국가교육과정정보센터(NCIC)',
    url: 'https://ncic.re.kr',
    description: '국가 교육과정 정보',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 604800,
  },

  // ===========================================
  // 네이버 카페
  // ===========================================
  {
    name: '인디스쿨',
    url: 'https://www.indischool.com',
    description: '대한민국 대표 초등교사 커뮤니티',
    type: 'CAFE' as SourceType,
    isActive: true,
    scrapeInterval: 43200,
  },
  {
    name: '참쌤스쿨',
    url: 'https://chamssaem.com',
    description: '참쌤의 교육 콘텐츠',
    type: 'CAFE' as SourceType,
    isActive: true,
    scrapeInterval: 43200,
  },
  {
    name: '아이스크림',
    url: 'https://www.i-scream.co.kr',
    description: '교육 콘텐츠 플랫폼',
    type: 'CAFE' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },

  // ===========================================
  // 교육청
  // ===========================================
  {
    name: '서울특별시교육청',
    url: 'https://www.sen.go.kr',
    description: '서울시교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '경기도교육청',
    url: 'https://www.goe.go.kr',
    description: '경기도교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '인천광역시교육청',
    url: 'https://www.ice.go.kr',
    description: '인천시교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '부산광역시교육청',
    url: 'https://www.pen.go.kr',
    description: '부산시교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '대구광역시교육청',
    url: 'https://www.dge.go.kr',
    description: '대구시교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '광주광역시교육청',
    url: 'https://www.gen.go.kr',
    description: '광주시교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '대전광역시교육청',
    url: 'https://www.dje.go.kr',
    description: '대전시교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '울산광역시교육청',
    url: 'https://www.use.go.kr',
    description: '울산시교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '세종특별자치시교육청',
    url: 'https://www.sje.go.kr',
    description: '세종시교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '강원도교육청',
    url: 'https://www.gwe.go.kr',
    description: '강원도교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '충청북도교육청',
    url: 'https://www.cbe.go.kr',
    description: '충북교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '충청남도교육청',
    url: 'https://www.cne.go.kr',
    description: '충남교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '전라북도교육청',
    url: 'https://www.jbe.go.kr',
    description: '전북교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '전라남도교육청',
    url: 'https://www.jne.go.kr',
    description: '전남교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '경상북도교육청',
    url: 'https://www.gbe.go.kr',
    description: '경북교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '경상남도교육청',
    url: 'https://www.gne.go.kr',
    description: '경남교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '제주특별자치도교육청',
    url: 'https://www.jje.go.kr',
    description: '제주도교육청 공지 및 자료',
    type: 'OFFICIAL' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },

  // ===========================================
  // 유튜브 채널
  // ===========================================
  {
    name: 'EBS 초등',
    url: 'https://www.youtube.com/@EBSelementary',
    description: 'EBS 초등 교육 콘텐츠',
    type: 'YOUTUBE' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
  {
    name: '참쌤스쿨 유튜브',
    url: 'https://www.youtube.com/@chamssaem',
    description: '참쌤스쿨 교육 콘텐츠',
    type: 'YOUTUBE' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },

  // ===========================================
  // 교육 블로그
  // ===========================================
  {
    name: '초등교사 커뮤니티',
    url: 'https://teacher-community.tistory.com',
    description: '초등교사 정보 공유 블로그',
    type: 'BLOG' as SourceType,
    isActive: true,
    scrapeInterval: 86400,
  },
];
