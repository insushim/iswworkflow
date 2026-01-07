#!/usr/bin/env node

import { CommunityScraper, MultiCommunityScraper } from './community-scraper';
import { NEISScraper } from './neis-scraper';
import { DocumentScraper } from './document-scraper';
import { CommunitySource } from './types';

const communitySources: CommunitySource[] = [
  {
    id: 'indischool',
    name: '인디스쿨',
    url: 'https://indischool.com/board/free',
    type: 'COMMUNITY',
    selectors: {
      list: '.board-list-item',
      title: '.title a',
      author: '.author',
      date: '.date',
      views: '.views',
    },
    pagination: {
      type: 'page',
      paramName: 'page',
      maxPages: 3,
    },
    isActive: true,
  },
  {
    id: 'teacherville',
    name: '쌤동네',
    url: 'https://www.ssam.teacherville.co.kr/community',
    type: 'COMMUNITY',
    selectors: {
      list: '.post-item',
      title: '.post-title',
      author: '.author-name',
      date: '.post-date',
    },
    isActive: true,
  },
  {
    id: 'classting',
    name: '클래스팅',
    url: 'https://www.classting.com/community',
    type: 'COMMUNITY',
    selectors: {
      list: 'article',
      title: 'h3',
      date: 'time',
    },
    isActive: true,
  },
];

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'all';

  console.log('='.repeat(50));
  console.log('EduFlow 데이터 수집기');
  console.log('='.repeat(50));

  switch (command) {
    case 'community':
      await scrapeCommunities();
      break;

    case 'neis':
      await scrapeNEIS();
      break;

    case 'documents':
      await scrapeDocuments();
      break;

    case 'all':
      await scrapeAll();
      break;

    case 'help':
    default:
      showHelp();
      break;
  }
}

async function scrapeCommunities() {
  console.log('\n📚 커뮤니티 스크래핑 시작...\n');

  const scraper = new MultiCommunityScraper(communitySources, {
    concurrency: 2,
    retries: 3,
  });

  const results = await scraper.scrapeAll();

  console.log('\n📊 커뮤니티 스크래핑 결과:');
  for (const [sourceId, result] of results) {
    const status = result.success ? '✅' : '❌';
    console.log(`  ${status} ${sourceId}: ${result.itemsScraped}개 수집`);
    if (result.errors.length > 0) {
      console.log(`     오류: ${result.errors.slice(0, 2).join(', ')}`);
    }
  }
}

async function scrapeNEIS() {
  const apiKey = process.env.NEIS_API_KEY;

  if (!apiKey) {
    console.error('❌ NEIS_API_KEY 환경변수가 설정되지 않았습니다.');
    console.log('   https://open.neis.go.kr 에서 API 키를 발급받으세요.');
    return;
  }

  console.log('\n🏫 NEIS 데이터 수집 시작...\n');

  const scraper = new NEISScraper(apiKey);

  // 서울 지역 초등학교 조회 예시
  const schools = await scraper.getSchools('B10');
  console.log(`  📍 서울 초등학교: ${schools.length}개`);

  if (schools.length > 0) {
    const sampleSchool = schools[0];
    console.log(`  📋 샘플 학교: ${sampleSchool.schoolName}`);

    // 학사일정 조회
    const schedule = await scraper.getSchedule(
      sampleSchool.officeCode,
      sampleSchool.schoolCode,
      new Date().getFullYear()
    );
    console.log(`  📅 학사일정: ${schedule.length}개 항목`);
  }
}

async function scrapeDocuments() {
  console.log('\n📄 공문서 스크래핑 시작...\n');

  const scraper = new DocumentScraper({
    concurrency: 1,
    retries: 2,
  });

  const result = await scraper.scrape();

  console.log('\n📊 공문서 스크래핑 결과:');
  console.log(`  ${result.success ? '✅' : '❌'} ${result.itemsScraped}개 문서 수집`);

  if (result.errors.length > 0) {
    console.log('  오류:');
    result.errors.slice(0, 5).forEach((err) => console.log(`    - ${err}`));
  }
}

async function scrapeAll() {
  console.log('\n🚀 전체 데이터 수집 시작...\n');

  await scrapeCommunities();
  await scrapeDocuments();

  if (process.env.NEIS_API_KEY) {
    await scrapeNEIS();
  } else {
    console.log('\n⚠️ NEIS 스크래핑 건너뜀 (API 키 없음)');
  }

  console.log('\n✨ 전체 데이터 수집 완료!');
}

function showHelp() {
  console.log(`
사용법: pnpm --filter @eduflow/scraper scrape [command]

명령어:
  community   - 교사 커뮤니티 스크래핑
  neis        - NEIS API 데이터 수집
  documents   - 공문서 스크래핑
  all         - 전체 데이터 수집
  help        - 도움말 표시

환경변수:
  NEIS_API_KEY - NEIS Open API 키 (https://open.neis.go.kr)

예시:
  pnpm --filter @eduflow/scraper scrape community
  NEIS_API_KEY=xxx pnpm --filter @eduflow/scraper scrape neis
`);
}

main().catch((error) => {
  console.error('스크래핑 실패:', error);
  process.exit(1);
});
