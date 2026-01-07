import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export type { PrismaClient };

// Helper function to handle Prisma errors
export function handlePrismaError(error: unknown): never {
  if (error instanceof Error) {
    // Check for specific Prisma errors
    if (error.message.includes('Unique constraint')) {
      throw new Error('이미 존재하는 데이터입니다.');
    }
    if (error.message.includes('Foreign key constraint')) {
      throw new Error('연결된 데이터가 있어 삭제할 수 없습니다.');
    }
    if (error.message.includes('Record not found')) {
      throw new Error('데이터를 찾을 수 없습니다.');
    }
  }
  throw error;
}

// Pagination helper
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export function getPaginationParams(params: PaginationParams) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 20));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function createPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasMore: page < totalPages,
    },
  };
}

// Date helpers for Korean timezone
export function getKoreanDate(date: Date = new Date()): Date {
  return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
}

export function getKoreanMonth(date: Date = new Date()): number {
  return getKoreanDate(date).getMonth() + 1;
}

export function getAcademicYear(date: Date = new Date()): number {
  const koreanDate = getKoreanDate(date);
  const month = koreanDate.getMonth() + 1;
  const year = koreanDate.getFullYear();

  // Korean school year starts in March
  return month < 3 ? year - 1 : year;
}

export function getAcademicSemester(date: Date = new Date()): 1 | 2 {
  const month = getKoreanMonth(date);
  // First semester: March - August
  // Second semester: September - February
  return month >= 3 && month <= 8 ? 1 : 2;
}
