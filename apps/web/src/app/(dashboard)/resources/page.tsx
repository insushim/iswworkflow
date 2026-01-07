'use client';

import { useState } from 'react';
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
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  category: string;
  type: 'document' | 'template' | 'presentation' | 'image' | 'guide';
  viewCount: number;
  likeCount: number;
  commentCount: number;
  downloadCount: number;
  publishedAt: string;
  author: string;
  tags: string[];
  isBookmarked: boolean;
}

const resourceTypeConfig: Record<string, { icon: typeof FileText; color: string }> = {
  document: { icon: FileText, color: 'text-blue-500' },
  template: { icon: FolderOpen, color: 'text-green-500' },
  presentation: { icon: Presentation, color: 'text-orange-500' },
  image: { icon: ImageIcon, color: 'text-purple-500' },
  guide: { icon: BookOpen, color: 'text-pink-500' },
};

const sources = ['전체', '인디스쿨', '아이스크림', '에듀넷', '티처빌', '참쌤스쿨', '쌤동네'];
const categories = ['전체', '학급 운영', '학부모', '교실 환경', '수업 자료', '생활지도', '행사', '안전교육'];

const communityResources: Resource[] = [
  {
    id: '1',
    title: '3월 학급경영 꿀팁 모음 (경력 10년차 교사)',
    description: '신학기 첫 주부터 3월 한 달간 학급경영에 필요한 모든 팁을 정리했습니다. 학급규칙 정하기, 모둠 구성, 역할 분담 등 상세 가이드.',
    source: '인디스쿨',
    sourceUrl: 'https://indischool.com',
    category: '학급 운영',
    type: 'guide',
    viewCount: 1523,
    likeCount: 245,
    commentCount: 32,
    downloadCount: 189,
    publishedAt: '2시간 전',
    author: '초롱쌤',
    tags: ['신학기', '학급경영', '3월'],
    isBookmarked: false,
  },
  {
    id: '2',
    title: '학부모 상담 체크리스트 & 기록양식 공유합니다',
    description: '학부모 상담 시 활용할 수 있는 체크리스트와 상담 기록 양식입니다. 한글/워드 파일 모두 포함.',
    source: '아이스크림',
    sourceUrl: 'https://icescream.co.kr',
    category: '학부모',
    type: 'template',
    viewCount: 892,
    likeCount: 156,
    commentCount: 18,
    downloadCount: 234,
    publishedAt: '5시간 전',
    author: '햇살쌤',
    tags: ['학부모상담', '양식', '상담기록'],
    isBookmarked: true,
  },
  {
    id: '3',
    title: '신학기 교실 환경 구성 아이디어 50선',
    description: '저비용 고효율! 학생들이 좋아하는 교실 환경 구성 아이디어를 모았습니다. 게시판 템플릿 파일 포함.',
    source: '에듀넷',
    sourceUrl: 'https://edunet.net',
    category: '교실 환경',
    type: 'image',
    viewCount: 2341,
    likeCount: 412,
    commentCount: 67,
    downloadCount: 567,
    publishedAt: '어제',
    author: '별빛쌤',
    tags: ['교실환경', '게시판', '환경구성'],
    isBookmarked: false,
  },
  {
    id: '4',
    title: '3월 주간학습안내 양식 무료 공유',
    description: '깔끔하고 예쁜 주간학습안내 양식입니다. 한글/PDF 버전 모두 제공.',
    source: '티처빌',
    sourceUrl: 'https://teacherville.co.kr',
    category: '학급 운영',
    type: 'template',
    viewCount: 756,
    likeCount: 98,
    commentCount: 12,
    downloadCount: 345,
    publishedAt: '2일 전',
    author: '꿈나무쌤',
    tags: ['주간학습', '가정통신문', '양식'],
    isBookmarked: false,
  },
  {
    id: '5',
    title: '1학기 안전교육 월별 계획서 및 자료',
    description: '7대 안전교육 영역별 월별 계획서와 수업 자료 PPT입니다. NEIS 입력용 양식도 포함.',
    source: '참쌤스쿨',
    sourceUrl: 'https://chamssaem.com',
    category: '안전교육',
    type: 'presentation',
    viewCount: 1892,
    likeCount: 321,
    commentCount: 45,
    downloadCount: 678,
    publishedAt: '3일 전',
    author: '안전쌤',
    tags: ['안전교육', '7대안전', 'NEIS'],
    isBookmarked: true,
  },
  {
    id: '6',
    title: '학급 규칙 제작 PPT 템플릿 (수정 가능)',
    description: '학생들과 함께 학급 규칙을 정할 때 사용할 수 있는 PPT 템플릿입니다.',
    source: '쌤동네',
    sourceUrl: 'https://ssam.teacherville.co.kr',
    category: '학급 운영',
    type: 'presentation',
    viewCount: 1234,
    likeCount: 187,
    commentCount: 23,
    downloadCount: 456,
    publishedAt: '4일 전',
    author: '규칙쌤',
    tags: ['학급규칙', 'PPT', '템플릿'],
    isBookmarked: false,
  },
  {
    id: '7',
    title: '2024 개정 교육과정 요약 정리본',
    description: '2024 개정 교육과정의 핵심 내용을 요약 정리했습니다. 과목별 변화 포인트 포함.',
    source: '에듀넷',
    sourceUrl: 'https://edunet.net',
    category: '수업 자료',
    type: 'document',
    viewCount: 3456,
    likeCount: 567,
    commentCount: 89,
    downloadCount: 1234,
    publishedAt: '5일 전',
    author: '교육쌤',
    tags: ['교육과정', '2024개정', '요약'],
    isBookmarked: false,
  },
  {
    id: '8',
    title: '학기초 학생 상담 질문지 & 개인면담 양식',
    description: '학기초 학생 파악을 위한 상담 질문지와 개인면담 기록 양식입니다.',
    source: '인디스쿨',
    sourceUrl: 'https://indischool.com',
    category: '생활지도',
    type: 'template',
    viewCount: 987,
    likeCount: 145,
    commentCount: 19,
    downloadCount: 312,
    publishedAt: '1주 전',
    author: '마음쌤',
    tags: ['학생상담', '면담', '양식'],
    isBookmarked: false,
  },
];

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
