'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, MoreHorizontal, Download, Edit, Eye, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDocuments } from '@/hooks/useFirestore';
import { Document } from '@/lib/firebase-db';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

const statusConfig = {
  DRAFT: { label: '초안', variant: 'outline' as const },
  REVIEW: { label: '검토중', variant: 'warning' as const },
  APPROVED: { label: '승인됨', variant: 'success' as const },
};

export function RecentDocuments() {
  const { documents, loading, error } = useDocuments();

  const formatRelativeTime = (date: Timestamp | null): string => {
    if (!date) return '';
    const now = new Date();
    const docDate = date.toDate();
    const diffTime = now.getTime() - docDate.getTime();
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays === 1) return '어제';
    if (diffDays < 7) return `${diffDays}일 전`;
    return docDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
  };

  // 최근 4개 문서만 표시
  const recentDocs = documents.slice(0, 4);

  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-emerald-500" />
              최근 문서
            </CardTitle>
            <Link href="/documents/new">
              <Button size="sm" variant="outline">
                새 문서
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-emerald-500" />
              최근 문서
            </CardTitle>
            <Link href="/documents/new">
              <Button size="sm" variant="outline">
                새 문서
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-emerald-500" />
            최근 문서
          </CardTitle>
          <Link href="/documents">
            <Button size="sm" variant="outline">
              새 문서
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {recentDocs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>등록된 문서가 없습니다.</p>
            <Link href="/documents">
              <Button variant="outline" className="mt-4">
                문서 추가하기
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {recentDocs.map((doc) => {
                const docStatus = (doc.status || 'DRAFT') as keyof typeof statusConfig;
                const config = statusConfig[docStatus] || statusConfig.DRAFT;

                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950">
                        <FileText className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{doc.title}</span>
                          <Badge variant={config.variant} className="text-xs">
                            {config.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{formatRelativeTime(doc.updatedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          보기
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          편집
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          다운로드
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>

            <Link href="/documents" className="block mt-4">
              <Button variant="outline" className="w-full">
                모든 문서 보기
              </Button>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
