'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  ExternalLink,
  Heart,
  MessageCircle,
  Eye,
  Bookmark,
  Search,
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
  Upload,
  Share2,
  CheckCircle2,
  FolderPlus,
} from 'lucide-react';
import {
  resourceCategories,
  type CommunityResource,
} from '@/data/community-resources';
import { toast } from 'sonner';

type Resource = CommunityResource;

const gradeOptions = ['공통', '1학년', '2학년', '3학년', '4학년', '5학년', '6학년'];
const fileTypes = ['문서', 'PPT', '이미지', '동영상', '템플릿', '가이드'];

const resourceTypeConfig: Record<string, { icon: typeof FileText; color: string }> = {
  document: { icon: FileText, color: 'text-blue-500' },
  template: { icon: FolderOpen, color: 'text-green-500' },
  presentation: { icon: Presentation, color: 'text-orange-500' },
  image: { icon: ImageIcon, color: 'text-purple-500' },
  guide: { icon: BookOpen, color: 'text-pink-500' },
  video: { icon: Video, color: 'text-red-500' },
};

const categories = resourceCategories;

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'downloads'>('latest');
  const [resources, setResources] = useState<Resource[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [likedResources, setLikedResources] = useState<Set<string>>(new Set());

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const typeMap: Record<string, Resource['type']> = {
      'PPT': 'presentation',
      '동영상': 'video',
      '이미지': 'image',
      '템플릿': 'template',
      '가이드': 'guide',
      '문서': 'document',
    };

    const newResource: Resource = {
      id: `res-${Date.now()}`,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      source: '직접 공유',
      sourceUrl: '#',
      category: formData.get('category') as string,
      type: typeMap[formData.get('type') as string] || 'document',
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      downloadCount: 0,
      publishedAt: '방금 전',
      author: '나',
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean),
      isBookmarked: false,
      grade: formData.get('grade') === '공통'
        ? [1, 2, 3, 4, 5, 6]
        : [parseInt((formData.get('grade') as string).replace('학년', ''))],
    };

    setResources(prev => [newResource, ...prev]);
    setUploadDialogOpen(false);
    toast.success('자료가 성공적으로 공유되었습니다!');
  };

  const handleLike = (id: string) => {
    setLikedResources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
        setResources(r => r.map(res =>
          res.id === id ? { ...res, likeCount: res.likeCount - 1 } : res
        ));
      } else {
        newSet.add(id);
        setResources(r => r.map(res =>
          res.id === id ? { ...res, likeCount: res.likeCount + 1 } : res
        ));
      }
      return newSet;
    });
  };

  const getResourcesByTab = () => {
    switch (activeTab) {
      case 'my':
        return resources.filter(r => r.author === '나');
      case 'liked':
        return resources.filter(r => likedResources.has(r.id));
      default:
        return resources;
    }
  };

  const filteredResources = getResourcesByTab().filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === '전체' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === 'popular') return b.likeCount - a.likeCount;
    if (sortBy === 'downloads') return b.downloadCount - a.downloadCount;
    return 0;
  });

  const toggleBookmark = (id: string) => {
    setResources((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r))
    );
  };

  const myResourcesCount = resources.filter(r => r.author === '나').length;
  const likedCount = likedResources.size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-500" />
            커뮤니티 자료실
          </h1>
          <p className="text-muted-foreground">
            선생님들이 직접 공유하는 수업 자료를 찾아보고, 내 자료도 공유해보세요
          </p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              자료 공유하기
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                새 자료 공유
              </DialogTitle>
              <DialogDescription>
                다른 선생님들과 공유할 자료를 업로드해주세요.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">제목 *</Label>
                  <Input id="title" name="title" placeholder="자료 제목을 입력하세요" required />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="description">설명 *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="자료에 대한 설명을 작성해주세요"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">분류 *</Label>
                  <Select name="category" defaultValue="수업 자료">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c !== '전체').map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="grade">학년</Label>
                  <Select name="grade" defaultValue="공통">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map(grade => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">자료 유형</Label>
                  <Select name="type" defaultValue="문서">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fileTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">태그</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="국어, 3학년, 활동지 (쉼표로 구분)"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="file">파일 업로드</Label>
                  <div className="mt-1 flex justify-center rounded-lg border border-dashed border-muted-foreground/25 px-6 py-8 hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                      <div className="mt-3 flex text-sm leading-6 text-muted-foreground">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
                        >
                          <span>파일 선택</span>
                          <input
                            id="file-upload"
                            name="file"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.hwp,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.jpg,.png,.mp4,.zip"
                          />
                        </label>
                        <p className="pl-1">또는 드래그 앤 드롭</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        PDF, HWP, PPT, DOCX, XLSX, 이미지, 동영상 (최대 50MB)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                  취소
                </Button>
                <Button type="submit" className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  공유하기
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
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
                <p className="text-sm text-muted-foreground">공유된 자료</p>
                <p className="text-2xl font-bold">{resources.length}개</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Upload className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">내가 공유한 자료</p>
                <p className="text-2xl font-bold">{myResourcesCount}개</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">좋아요한 자료</p>
                <p className="text-2xl font-bold">{likedCount}개</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            <FolderOpen className="h-4 w-4" />
            전체 자료
            {resources.length > 0 && (
              <Badge variant="secondary" className="ml-1">{resources.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="my" className="gap-2">
            <Upload className="h-4 w-4" />
            내가 공유한 자료
            {myResourcesCount > 0 && (
              <Badge variant="secondary" className="ml-1">{myResourcesCount}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="liked" className="gap-2">
            <Heart className="h-4 w-4" />
            좋아요
            {likedCount > 0 && (
              <Badge variant="secondary" className="ml-1">{likedCount}</Badge>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>

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
                <SelectItem value="latest">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    최신순
                  </span>
                </SelectItem>
                <SelectItem value="popular">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    인기순
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
          {sortedResources.length === 0 ? (
            <div className="text-center py-16">
              <FolderPlus className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">아직 공유된 자료가 없습니다</h3>
              <p className="text-muted-foreground mb-6">
                첫 번째로 자료를 공유해보세요!<br />
                다른 선생님들에게 큰 도움이 됩니다.
              </p>
              <Button onClick={() => setUploadDialogOpen(true)} className="gap-2">
                <Upload className="h-4 w-4" />
                자료 공유하기
              </Button>
            </div>
          ) : (
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
                                onClick={() => handleLike(resource.id)}
                                className={likedResources.has(resource.id) ? 'text-red-500' : ''}
                              >
                                <Heart className={`h-4 w-4 ${likedResources.has(resource.id) ? 'fill-current' : ''}`} />
                              </Button>
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
                              {resource.viewCount}
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
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
