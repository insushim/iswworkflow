import { BaseScraper } from './base-scraper';
import {
  CommunitySource,
  ScrapedPost,
  ScrapingResult,
  ScraperConfig,
} from './types';

export class CommunityScraper extends BaseScraper {
  private source: CommunitySource;

  constructor(source: CommunitySource, config?: ScraperConfig) {
    super(config);
    this.source = source;
  }

  async scrape(): Promise<ScrapingResult> {
    const startedAt = new Date();
    const posts: ScrapedPost[] = [];

    this.logInfo(`스크래핑 시작: ${this.source.name}`);

    if (!this.source.isActive) {
      return this.createResult(this.source.id, 0, startedAt);
    }

    try {
      const listUrls = await this.getListUrls();

      for (const url of listUrls) {
        const pagePosts = await this.scrapeListPage(url);
        posts.push(...pagePosts);

        // Rate limiting
        await this.delay(1000);
      }

      this.logInfo(
        `스크래핑 완료: ${this.source.name} - ${posts.length}개 게시물`
      );
    } catch (error) {
      this.logError(`스크래핑 실패: ${(error as Error).message}`);
    }

    return this.createResult(this.source.id, posts.length, startedAt);
  }

  private async getListUrls(): Promise<string[]> {
    const urls: string[] = [this.source.url];

    if (this.source.pagination) {
      const { type, maxPages = 5, paramName = 'page' } = this.source.pagination;

      if (type === 'page') {
        for (let page = 2; page <= maxPages; page++) {
          const separator = this.source.url.includes('?') ? '&' : '?';
          urls.push(`${this.source.url}${separator}${paramName}=${page}`);
        }
      }
    }

    return urls;
  }

  private async scrapeListPage(url: string): Promise<ScrapedPost[]> {
    const posts: ScrapedPost[] = [];
    const $ = await this.fetchPage(url);

    if (!$) return posts;

    const { selectors } = this.source;
    const listSelector = selectors.list || 'article, .post, .item';

    $(listSelector).each((_, element) => {
      try {
        const $el = $(element);

        const title = this.extractPostField($, $el, selectors.title, 'h2, h3, .title, a');
        if (!title) return;

        const post: ScrapedPost = {
          sourceId: this.source.id,
          externalId: this.generateExternalId($el, url),
          title: this.sanitizeText(title),
          url: this.resolveUrl($el.find('a').first().attr('href') || url),
          author: this.extractPostField($, $el, selectors.author, '.author, .writer, .user'),
          publishedAt: this.parseDate(
            this.extractPostField($, $el, selectors.date, '.date, .time, time') || ''
          ),
          viewCount: this.parseNumber(
            this.extractPostField($, $el, selectors.views, '.views, .view-count') || '0'
          ),
          likeCount: this.parseNumber(
            this.extractPostField($, $el, selectors.likes, '.likes, .like-count') || '0'
          ),
          commentCount: this.parseNumber(
            this.extractPostField($, $el, selectors.comments, '.comments, .comment-count') || '0'
          ),
        };

        posts.push(post);
      } catch (error) {
        this.logError(`게시물 파싱 실패: ${(error as Error).message}`);
      }
    });

    return posts;
  }

  private extractPostField(
    $: cheerio.CheerioAPI,
    $el: cheerio.Cheerio<cheerio.Element>,
    selector: string | undefined,
    fallback: string
  ): string {
    const actualSelector = selector || fallback;
    return $el.find(actualSelector).first().text().trim();
  }

  private generateExternalId(
    $el: cheerio.Cheerio<cheerio.Element>,
    pageUrl: string
  ): string {
    // href에서 ID 추출 시도
    const href = $el.find('a').first().attr('href') || '';
    const idMatch = href.match(/(?:id|no|seq|idx)=(\d+)/i) || href.match(/\/(\d+)(?:\/|$)/);

    if (idMatch) {
      return `${this.source.id}_${idMatch[1]}`;
    }

    // 대안: 제목의 해시값 사용
    const title = $el.find('h2, h3, .title, a').first().text().trim();
    const hash = this.simpleHash(title + pageUrl);
    return `${this.source.id}_${hash}`;
  }

  private simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  private resolveUrl(href: string): string {
    if (!href) return this.source.url;
    if (href.startsWith('http')) return href;
    if (href.startsWith('//')) return 'https:' + href;

    const baseUrl = new URL(this.source.url);
    if (href.startsWith('/')) {
      return `${baseUrl.origin}${href}`;
    }

    return `${baseUrl.origin}/${href}`;
  }

  async scrapePostContent(url: string): Promise<string | null> {
    const $ = await this.fetchPage(url);
    if (!$) return null;

    const contentSelectors = [
      this.source.selectors.content,
      '.content',
      '.post-content',
      '.article-content',
      '.entry-content',
      '#content',
      'article',
    ].filter(Boolean) as string[];

    for (const selector of contentSelectors) {
      const content = $(selector).text().trim();
      if (content && content.length > 50) {
        return this.sanitizeText(content);
      }
    }

    return null;
  }
}

// 여러 커뮤니티 소스를 동시에 스크래핑
export class MultiCommunityScraper {
  private sources: CommunitySource[];
  private config: ScraperConfig;

  constructor(sources: CommunitySource[], config?: ScraperConfig) {
    this.sources = sources.filter((s) => s.isActive);
    this.config = config || {};
  }

  async scrapeAll(): Promise<Map<string, ScrapingResult>> {
    const results = new Map<string, ScrapingResult>();

    for (const source of this.sources) {
      const scraper = new CommunityScraper(source, this.config);
      const result = await scraper.scrape();
      results.set(source.id, result);

      // 소스 간 딜레이
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    return results;
  }

  async scrapeByType(type: CommunitySource['type']): Promise<Map<string, ScrapingResult>> {
    const filteredSources = this.sources.filter((s) => s.type === type);
    const scraper = new MultiCommunityScraper(filteredSources, this.config);
    return scraper.scrapeAll();
  }
}
