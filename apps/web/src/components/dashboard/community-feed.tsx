'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, ExternalLink, Heart, MessageCircle, Eye, Bookmark, Download } from 'lucide-react';
import Link from 'next/link';
import { getPopularResources, type CommunityResource } from '@/data/community-resources';

// 인기 자료 4개 가져오기 (실제 데이터베이스에서)
const popularResources = getPopularResources(4);

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
          {popularResources.map((resource) => (
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
                      {resource.likeCount.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {resource.commentCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {resource.downloadCount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 ${resource.isBookmarked ? 'text-yellow-500' : ''}`}
                  >
                    <Bookmark className="h-4 w-4" fill={resource.isBookmarked ? 'currentColor' : 'none'} />
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
