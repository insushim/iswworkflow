import { BaseScraper } from './base-scraper';
import { ScrapedDocument, ScrapingResult, ScraperConfig } from './types';

/**
 * 교육부/교육청 공문서 스크래퍼
 */
export class DocumentScraper extends BaseScraper {
  private sources = [
    {
      id: 'moe',
      name: '교육부',
      url: 'https://www.moe.go.kr/boardCnts/listRenew.do',
      params: { boardID: '294', m: '020402' },
    },
    {
      id: 'kedi',
      name: '한국교육개발원',
      url: 'https://www.kedi.re.kr/khome/main/research/selectPubList.do',
    },
    {
      id: 'keris',
      name: '한국교육학술정보원',
      url: 'https://www.keris.or.kr/main/na/ntt/selectNttList.do',
    },
  ];

  constructor(config?: ScraperConfig) {
    super(config);
  }

  async scrape(): Promise<ScrapingResult> {
    const startedAt = new Date();
    const documents: ScrapedDocument[] = [];

    this.logInfo('공문서 스크래핑 시작');

    for (const source of this.sources) {
      try {
        const docs = await this.scrapeSource(source);
        documents.push(...docs);
        this.logInfo(`${source.name}: ${docs.length}개 문서 수집`);
        await this.delay(2000);
      } catch (error) {
        this.logError(`${source.name} 스크래핑 실패: ${(error as Error).message}`);
      }
    }

    return this.createResult('documents', documents.length, startedAt);
  }

  private async scrapeSource(source: {
    id: string;
    name: string;
    url: string;
    params?: Record<string, string>;
  }): Promise<ScrapedDocument[]> {
    const documents: ScrapedDocument[] = [];

    let url = source.url;
    if (source.params) {
      const params = new URLSearchParams(source.params);
      url = `${url}?${params.toString()}`;
    }

    const $ = await this.fetchPage(url);
    if (!$) return documents;

    // 일반적인 공문서 목록 셀렉터
    const selectors = [
      'table tbody tr',
      '.board-list li',
      '.list-item',
      'article.item',
    ];

    for (const selector of selectors) {
      if ($(selector).length > 0) {
        $(selector).each((_, element) => {
          try {
            const doc = this.parseDocumentItem($, $(element), source);
            if (doc) {
              documents.push(doc);
            }
          } catch (error) {
            // 개별 항목 파싱 실패는 무시
          }
        });
        break;
      }
    }

    return documents;
  }

  private parseDocumentItem(
    $: cheerio.CheerioAPI,
    $el: cheerio.Cheerio<cheerio.Element>,
    source: { id: string; name: string; url: string }
  ): ScrapedDocument | null {
    const titleEl = $el.find('a, .title, td:nth-child(2)').first();
    const title = titleEl.text().trim();

    if (!title || title.length < 5) return null;

    const href = titleEl.attr('href') || '';
    const url = this.resolveUrl(href, source.url);

    const dateText =
      $el.find('.date, td:last-child, .reg-date').text().trim() ||
      $el.find('td').last().text().trim();

    return {
      sourceId: source.id,
      externalId: this.generateDocId(source.id, title, url),
      title: this.sanitizeText(title),
      content: '', // 상세 내용은 별도 요청 필요
      documentType: this.classifyDocument(title),
      url,
      publishedAt: this.parseDate(dateText),
      organization: source.name,
      metadata: {
        source: source.name,
      },
    };
  }

  private classifyDocument(title: string): string {
    const categories: Record<string, string[]> = {
      공고: ['공고', '모집', '채용', '입찰'],
      지침: ['지침', '가이드', '매뉴얼', '안내서'],
      계획: ['계획', '추진', '시행'],
      보고서: ['보고', '결과', '분석', '연구'],
      통계: ['통계', '현황', '조사'],
      교육과정: ['교육과정', '수업', '평가'],
      학생지원: ['학생', '장학', '복지', '급식'],
      교원: ['교원', '교사', '연수'],
      시설: ['시설', '안전', '환경'],
      예산: ['예산', '재정', '결산'],
    };

    for (const [type, keywords] of Object.entries(categories)) {
      if (keywords.some((keyword) => title.includes(keyword))) {
        return type;
      }
    }

    return '일반';
  }

  private generateDocId(sourceId: string, title: string, url: string): string {
    // URL에서 ID 추출 시도
    const idMatch = url.match(/(?:seq|id|no|idx)=(\d+)/i);
    if (idMatch) {
      return `${sourceId}_${idMatch[1]}`;
    }

    // 해시 생성
    const hash = this.simpleHash(title + url);
    return `${sourceId}_${hash}`;
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

  private resolveUrl(href: string, baseUrl: string): string {
    if (!href) return baseUrl;
    if (href.startsWith('http')) return href;
    if (href.startsWith('//')) return 'https:' + href;

    try {
      const base = new URL(baseUrl);
      if (href.startsWith('/')) {
        return `${base.origin}${href}`;
      }
      return new URL(href, baseUrl).toString();
    } catch {
      return baseUrl;
    }
  }

  /**
   * 문서 상세 내용 스크래핑
   */
  async scrapeDocumentContent(url: string): Promise<string | null> {
    const $ = await this.fetchPage(url);
    if (!$) return null;

    const contentSelectors = [
      '.board-view-content',
      '.view-content',
      '.content',
      '#content',
      'article',
      '.board-body',
    ];

    for (const selector of contentSelectors) {
      const content = $(selector).text().trim();
      if (content && content.length > 100) {
        return this.sanitizeText(content);
      }
    }

    return null;
  }

  /**
   * 첨부파일 목록 추출
   */
  async extractAttachments(
    url: string
  ): Promise<Array<{ name: string; url: string }>> {
    const $ = await this.fetchPage(url);
    if (!$) return [];

    const attachments: Array<{ name: string; url: string }> = [];

    const attachmentSelectors = [
      '.file-list a',
      '.attach a',
      '.attachment a',
      'a[href*="download"]',
      'a[href*="file"]',
    ];

    for (const selector of attachmentSelectors) {
      $(selector).each((_, element) => {
        const $el = $(element);
        const name = $el.text().trim();
        const href = $el.attr('href');

        if (name && href) {
          attachments.push({
            name,
            url: this.resolveUrl(href, url),
          });
        }
      });

      if (attachments.length > 0) break;
    }

    return attachments;
  }
}

/**
 * 교육청별 공문서 스크래퍼
 */
export class RegionalDocumentScraper extends DocumentScraper {
  private officeCode: string;
  private officeName: string;

  private officeUrls: Record<string, string> = {
    B10: 'https://www.sen.go.kr', // 서울
    C10: 'https://www.pen.go.kr', // 부산
    D10: 'https://www.dge.go.kr', // 대구
    E10: 'https://www.ice.go.kr', // 인천
    F10: 'https://www.gen.go.kr', // 광주
    G10: 'https://www.dje.go.kr', // 대전
    H10: 'https://www.use.go.kr', // 울산
    I10: 'https://www.sje.go.kr', // 세종
    J10: 'https://www.goe.go.kr', // 경기
    K10: 'https://www.gwe.go.kr', // 강원
    M10: 'https://www.cbe.go.kr', // 충북
    N10: 'https://www.cne.go.kr', // 충남
    P10: 'https://www.jbe.go.kr', // 전북
    Q10: 'https://www.jne.go.kr', // 전남
    R10: 'https://www.gbe.go.kr', // 경북
    S10: 'https://www.gne.go.kr', // 경남
    T10: 'https://www.jje.go.kr', // 제주
  };

  constructor(officeCode: string, officeName: string, config?: ScraperConfig) {
    super(config);
    this.officeCode = officeCode;
    this.officeName = officeName;
  }

  async scrapeRegionalDocuments(): Promise<ScrapedDocument[]> {
    const baseUrl = this.officeUrls[this.officeCode];

    if (!baseUrl) {
      this.logError(`지원하지 않는 교육청 코드: ${this.officeCode}`);
      return [];
    }

    this.logInfo(`${this.officeName} 공문서 스크래핑 시작`);

    // 일반적인 공지사항 경로 시도
    const paths = [
      '/boardCnts/list.do?boardID=911',
      '/bbs/list.do?menuId=71',
      '/notice/list.do',
    ];

    for (const path of paths) {
      const url = `${baseUrl}${path}`;
      const $ = await this.fetchPage(url);

      if ($) {
        // 페이지가 로드되면 문서 추출 시도
        const documents: ScrapedDocument[] = [];

        $('table tbody tr, .board-list li').each((_, element) => {
          const $el = $(element);
          const title = $el.find('a').first().text().trim();

          if (title && title.length > 5) {
            documents.push({
              sourceId: `office_${this.officeCode}`,
              externalId: this.generateDocId(`office_${this.officeCode}`, title, url),
              title,
              content: '',
              documentType: '공지',
              url,
              organization: this.officeName,
            });
          }
        });

        if (documents.length > 0) {
          return documents;
        }
      }
    }

    return [];
  }

  private generateDocId(sourceId: string, title: string, url: string): string {
    const hash = this.simpleHash(title + url);
    return `${sourceId}_${hash}`;
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
}
