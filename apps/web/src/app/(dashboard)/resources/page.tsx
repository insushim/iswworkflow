'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  ExternalLink,
  Heart,
  MessageCircle,
  Eye,
  Bookmark,
  Search,
  Filter,
  Download,
  Star,
  Clock,
  TrendingUp,
  FileText,
  FolderOpen,
  BookOpen,
  Presentation,
  Image as ImageIcon,
  Video,
} from 'lucide-react';
import {
  communityResourcesDatabase,
  resourceSources,
  resourceCategories,
  searchResources,
  type CommunityResource,
} from '@/data/community-resources';

type Resource = CommunityResource;

const resourceTypeConfig: Record<string, { icon: typeof FileText; color: string }> = {
  document: { icon: FileText, color: 'text-blue-500' },
  template: { icon: FolderOpen, color: 'text-green-500' },
  presentation: { icon: Presentation, color: 'text-orange-500' },
  image: { icon: ImageIcon, color: 'text-purple-500' },
  guide: { icon: BookOpen, color: 'text-pink-500' },
  video: { icon: Video, color: 'text-red-500' },
};

const sources = resourceSources;
const categories = resourceCategories;

// 데이터베이스에서 자료 가져오기
const communityResources: Resource[] = communityResourcesDatabase;

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'downloads'>('popular');
  const [resources, setResources] = useState(communityResources);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSource = selectedSource === '전체' || resource.source === selectedSource;
    const matchesCategory = selectedCategory === '전체' || resource.category === selectedCategory;
    return matchesSearch && matchesSource && matchesCategory;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'popular') return b.likeCount - a.likeCount;
    if (sortBy === 'downloads') return b.downloadCount - a.downloadCount;
    return 0; // latest는 기본 순서 유지
  });

  const toggleBookmark = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r))
    );
  };

  const stats = {
    total: communityResources.length,
    sources: sources.length - 1,
    downloads: communityResources.reduce((acc, r) => acc + r.downloadCount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Users className="h-6 w-6 text-indigo-500" />
          커뮤니티 자료실
        </h1>
        <p className="text-muted-foreground">
          전국 초등교사 커뮤니티의 인기 자료를 한눈에 모아보세요
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900">
                <FileText className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">총 자료</p>
                <p className="text-2xl font-bold">{stats.total.toLocaleString()}개</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">연동 사이트</p>
                <p className="text-2xl font-bold">{stats.sources}개</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900">
                <Download className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">총 다운로드</p>
                <p className="text-2xl font-bold">{stats.downloads.toLocaleString()}회</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="자료 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSource} onValueChange={setSelectedSource}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="출처" />
              </SelectTrigger>
              <SelectContent>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
              <SelectTrigger className="w-full md:w-[130px]">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    인기순
                  </span>
                </SelectItem>
                <SelectItem value="latest">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    최신순
                  </span>
                </SelectItem>
                <SelectItem value="downloads">
                  <span className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    다운로드순
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resource List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>자료 목록</span>
            <Badge variant="secondary">{sortedResources.length}개</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {sortedResources.map((resource) => {
                const TypeIcon = resourceTypeConfig[resource.type]?.icon || FileText;
                const typeColor = resourceTypeConfig[resource.type]?.color || 'text-gray-500';

                return (
                  <div
                    key={resource.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg bg-accent ${typeColor}`}>
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {resource.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleBookmark(resource.id)}
                              className={resource.isBookmarked ? 'text-yellow-500' : ''}
                            >
                              {resource.isBookmarked ? (
                                <Star className="h-4 w-4 fill-current" />
                              ) : (
                                <Bookmark className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="icon">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <Badge variant="outline">{resource.source}</Badge>
                          <Badge variant="secondary">{resource.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {resource.author}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            • {resource.publishedAt}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {resource.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
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
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {resource.downloadCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {sortedResources.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>검색 결과가 없습니다.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
