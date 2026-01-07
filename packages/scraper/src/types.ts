export interface ScrapedPost {
  sourceId: string;
  externalId: string;
  title: string;
  content?: string;
  summary?: string;
  author?: string;
  url: string;
  publishedAt?: Date;
  category?: string;
  tags?: string[];
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  metadata?: Record<string, unknown>;
}

export interface ScrapedDocument {
  sourceId: string;
  externalId: string;
  title: string;
  content: string;
  documentType: string;
  url: string;
  publishedAt?: Date;
  organization?: string;
  metadata?: Record<string, unknown>;
}

export interface ScrapingResult {
  success: boolean;
  sourceId: string;
  itemsScraped: number;
  errors: string[];
  startedAt: Date;
  completedAt: Date;
}

export interface ScraperConfig {
  userAgent?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  concurrency?: number;
  respectRobotsTxt?: boolean;
}

export interface CommunitySource {
  id: string;
  name: string;
  url: string;
  type: 'COMMUNITY' | 'BLOG' | 'NEWS' | 'OFFICIAL' | 'SNS';
  selectors: {
    list?: string;
    title?: string;
    content?: string;
    author?: string;
    date?: string;
    views?: string;
    likes?: string;
    comments?: string;
  };
  pagination?: {
    type: 'page' | 'infinite' | 'load-more';
    selector?: string;
    paramName?: string;
    maxPages?: number;
  };
  requiresLogin?: boolean;
  isActive: boolean;
}

export interface NEISSchool {
  schoolCode: string;
  schoolName: string;
  schoolType: string;
  address: string;
  zipCode: string;
  phone?: string;
  fax?: string;
  website?: string;
  foundedAt?: Date;
  officeCode: string;
  officeName: string;
}

export interface NEISSchedule {
  schoolCode: string;
  date: Date;
  eventName: string;
  eventType: string;
  grade?: number;
  description?: string;
}
