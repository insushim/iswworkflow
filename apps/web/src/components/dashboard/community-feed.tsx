'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, ExternalLink, Heart, MessageCircle, Eye, Bookmark } from 'lucide-react';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  source: string;
  category: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
}

const communityResources: Resource[] = [
  {
    id: '1',
    title: '3월 학급경영 꿀팁 모음 (경력 10년차 교사)',
    source: '인디스쿨',
    category: '학급 운영',
    viewCount: 1523,
    likeCount: 245,
    commentCount: 32,
    publishedAt: '2시간 전',
  },
  {
    id: '2',
    title: '학부모 상담 체크리스트 공유합니다',
    source: '아이스크림',
    category: '학부모',
    viewCount: 892,
    likeCount: 156,
    commentCount: 18,
    publishedAt: '5시간 전',
  },
  {
    id: '3',
    title: '신학기 교실 환경 구성 아이디어',
    source: '에듀넷',
    category: '교실 환경',
    viewCount: 2341,
    likeCount: 412,
    commentCount: 67,
    publishedAt: '어제',
  },
  {
    id: '4',
    title: '3월 주간학습안내 양식 무료 공유',
    source: '티처빌',
    category: '학급 운영',
    viewCount: 756,
    likeCount: 98,
    commentCount: 12,
    publishedAt: '2일 전',
  },
];

export function CommunityFeed() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5 text-indigo-500" />
            커뮤니티 인기 자료
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            50+ 사이트 통합
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {communityResources.map((resource) => (
            <div
              key={resource.id}
              className="p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm line-clamp-1">
                    {resource.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {resource.source}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {resource.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      • {resource.publishedAt}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {resource.viewCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {resource.likeCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {resource.commentCount}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/resources" className="block mt-4">
          <Button variant="outline" className="w-full">
            더 많은 자료 보기
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
