import axios, { AxiosInstance, AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import PQueue from 'p-queue';
import { ScraperConfig, ScrapingResult } from './types';

export abstract class BaseScraper {
  protected client: AxiosInstance;
  protected queue: PQueue;
  protected config: Required<ScraperConfig>;
  protected errors: string[] = [];

  constructor(config: ScraperConfig = {}) {
    this.config = {
      userAgent:
        config.userAgent ||
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      timeout: config.timeout || 30000,
      retries: config.retries || 3,
      retryDelay: config.retryDelay || 1000,
      concurrency: config.concurrency || 2,
      respectRobotsTxt: config.respectRobotsTxt ?? true,
    };

    this.client = axios.create({
      timeout: this.config.timeout,
      headers: {
        'User-Agent': this.config.userAgent,
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      },
    });

    this.queue = new PQueue({ concurrency: this.config.concurrency });
  }

  protected async fetchPage(url: string): Promise<cheerio.CheerioAPI | null> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        const response = await this.client.get(url);
        return cheerio.load(response.data);
      } catch (error) {
        lastError = error as Error;
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 404) {
          this.logError(`페이지를 찾을 수 없음: ${url}`);
          return null;
        }

        if (axiosError.response?.status === 403) {
          this.logError(`접근이 거부됨: ${url}`);
          return null;
        }

        if (attempt < this.config.retries) {
          await this.delay(this.config.retryDelay * attempt);
        }
      }
    }

    this.logError(`페이지 로딩 실패: ${url} - ${lastError?.message}`);
    return null;
  }

  protected async fetchJSON<T>(url: string): Promise<T | null> {
    try {
      const response = await this.client.get<T>(url);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      this.logError(`API 요청 실패: ${url} - ${axiosError.message}`);
      return null;
    }
  }

  protected delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  protected logError(message: string): void {
    console.error(`[Scraper Error] ${message}`);
    this.errors.push(message);
  }

  protected logInfo(message: string): void {
    console.log(`[Scraper] ${message}`);
  }

  protected extractText($: cheerio.CheerioAPI, selector: string): string {
    return $(selector).text().trim();
  }

  protected extractAttr(
    $: cheerio.CheerioAPI,
    selector: string,
    attr: string
  ): string | undefined {
    return $(selector).attr(attr);
  }

  protected parseDate(dateStr: string): Date | undefined {
    if (!dateStr) return undefined;

    // 다양한 한국어 날짜 형식 처리
    const patterns = [
      // YYYY-MM-DD
      /(\d{4})-(\d{2})-(\d{2})/,
      // YYYY.MM.DD
      /(\d{4})\.(\d{2})\.(\d{2})/,
      // YYYY년 MM월 DD일
      /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/,
      // MM-DD
      /^(\d{1,2})-(\d{1,2})$/,
      // MM.DD
      /^(\d{1,2})\.(\d{1,2})$/,
    ];

    for (const pattern of patterns) {
      const match = dateStr.match(pattern);
      if (match) {
        if (match.length === 4) {
          return new Date(
            parseInt(match[1]),
            parseInt(match[2]) - 1,
            parseInt(match[3])
          );
        } else if (match.length === 3) {
          const year = new Date().getFullYear();
          return new Date(year, parseInt(match[1]) - 1, parseInt(match[2]));
        }
      }
    }

    // 상대적 시간 처리
    if (dateStr.includes('분 전')) {
      const minutes = parseInt(dateStr);
      return new Date(Date.now() - minutes * 60 * 1000);
    }
    if (dateStr.includes('시간 전')) {
      const hours = parseInt(dateStr);
      return new Date(Date.now() - hours * 60 * 60 * 1000);
    }
    if (dateStr.includes('일 전')) {
      const days = parseInt(dateStr);
      return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    }

    return undefined;
  }

  protected parseNumber(str: string): number {
    if (!str) return 0;
    const cleaned = str.replace(/[^0-9]/g, '');
    return parseInt(cleaned) || 0;
  }

  protected sanitizeText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim();
  }

  protected createResult(
    sourceId: string,
    itemsScraped: number,
    startedAt: Date
  ): ScrapingResult {
    return {
      success: this.errors.length === 0,
      sourceId,
      itemsScraped,
      errors: this.errors,
      startedAt,
      completedAt: new Date(),
    };
  }

  abstract scrape(): Promise<ScrapingResult>;
}
