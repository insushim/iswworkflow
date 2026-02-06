'use client';

import { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  GraduationCap,
  Sparkles,
  Copy,
  RefreshCw,
  BookOpen,
  Users,
  Trophy,
  Heart,
  Lightbulb,
  Target,
  Star,
  CheckCircle2,
  Loader2,
  Search,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { schoolRecordPhrases, type RecordPhrase } from '@/data/school-record-phrases';

// 생활기록부 카테고리
const categories = [
  { id: 'behavior', name: '행동특성 및 종합의견', icon: Heart, color: 'text-pink-500' },
  { id: 'learning', name: '교과학습발달상황', icon: BookOpen, color: 'text-blue-500' },
  { id: 'creative', name: '창의적 체험활동', icon: Lightbulb, color: 'text-yellow-500' },
  { id: 'reading', name: '독서활동상황', icon: BookOpen, color: 'text-green-500' },
  { id: 'career', name: '진로활동', icon: Target, color: 'text-purple-500' },
  { id: 'special', name: '특기사항', icon: Star, color: 'text-orange-500' },
];

// 학년별 특성
const gradeOptions = [
  { value: '1', label: '1학년' },
  { value: '2', label: '2학년' },
  { value: '3', label: '3학년' },
  { value: '4', label: '4학년' },
  { value: '5', label: '5학년' },
  { value: '6', label: '6학년' },
];

// 성격 유형
const personalityTypes = [
  { value: 'active', label: '활발하고 적극적인' },
  { value: 'quiet', label: '차분하고 조용한' },
  { value: 'curious', label: '호기심이 많은' },
  { value: 'caring', label: '배려심이 깊은' },
  { value: 'creative', label: '창의적인' },
  { value: 'diligent', label: '성실하고 꼼꼼한' },
  { value: 'leader', label: '리더십이 있는' },
  { value: 'cooperative', label: '협동심이 강한' },
];

// 강점 영역
const strengthAreas = [
  { value: 'korean', label: '국어' },
  { value: 'math', label: '수학' },
  { value: 'science', label: '과학' },
  { value: 'social', label: '사회' },
  { value: 'english', label: '영어' },
  { value: 'art', label: '미술' },
  { value: 'music', label: '음악' },
  { value: 'pe', label: '체육' },
  { value: 'ethics', label: '도덕' },
  { value: 'practical', label: '실과' },
];

// 데이터베이스에서 카테고리별 문구 필터링
const getFilteredPhrases = (
  category: string,
  grade: number | null,
  subcategory?: string
): RecordPhrase[] => {
  return schoolRecordPhrases.filter((phrase) => {
    const categoryMatch = phrase.category === category;
    const gradeMatch = grade === null || phrase.grade.includes(grade);
    const subcategoryMatch = !subcategory || phrase.subcategory === subcategory;
    return categoryMatch && gradeMatch && subcategoryMatch;
  });
};

// 서브카테고리 목록 가져오기
const getSubcategories = (category: string): string[] => {
  const subcategories = new Set<string>();
  schoolRecordPhrases
    .filter((p) => p.category === category)
    .forEach((p) => subcategories.add(p.subcategory));
  return Array.from(subcategories);
};

// AI 문구 생성 함수 - Gemini AI API 연동
const generatePhrase = async (
  category: string,
  grade: string,
  personality: string,
  strength: string,
  keywords: string
): Promise<string> => {
  // 카테고리명 매핑
  const categoryNameMap: Record<string, string> = {
    behavior: '행동특성 및 종합의견',
    learning: '교과학습발달상황',
    creative: '창의적 체험활동',
    reading: '독서활동상황',
    career: '진로활동',
    special: '특기사항',
  };

  // 카테고리 매핑 (UI 카테고리 -> DB 카테고리)
  const categoryMap: Record<string, string> = {
    behavior: 'behavior',
    learning: 'subject',
    creative: 'creative',
    reading: 'reading',
    career: 'career',
    special: 'behavior',
  };

  const dbCategory = categoryMap[category] || 'behavior';
  const gradeNum = parseInt(grade) || null;
  const categoryName = categoryNameMap[category] || '행동특성 및 종합의견';

  // 한글 라벨 가져오기
  const personalityLabel = personalityTypes.find((p) => p.value === personality)?.label || '';
  const strengthLabel = strengthAreas.find((s) => s.value === strength)?.label || '';
  const gradeLabel = gradeOptions.find((g) => g.value === grade)?.label || '';

  try {
    // 1. 데이터베이스에서 예시 문구 3개 가져오기 (참고용)
    const matchingPhrases = getFilteredPhrases(dbCategory, gradeNum);
    const examplePhrases = matchingPhrases
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p.content);

    // 2. AI API 호출을 위한 프롬프트 구성
    const prompt = `생활기록부 ${categoryName} 항목을 작성해주세요.

학년: ${gradeLabel}
학생 성격: ${personalityLabel}
강점 과목: ${strengthLabel}
키워드: ${keywords || '없음'}

${examplePhrases.length > 0 ? `다음은 참고 예시입니다:
${examplePhrases.map((phrase, idx) => `${idx + 1}. ${phrase}`).join('\n')}` : ''}

위 정보를 바탕으로 생활기록부 문구를 200자 내외로 1개만 작성해주세요.
- 문체: '~함', '~하였음' 체로 작성하세요.
- 구체적이고 관찰 가능한 행동 중심으로 작성하세요.
- 학생의 성장과 발전 가능성을 포함하세요.
- 문구만 출력하고 다른 설명은 하지 마세요.`;

    // 3. /api/chat에 POST 요청
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status}`);
    }

    const data = await response.json();

    // 4. API 응답에서 content 추출
    if (data.message && data.message.content) {
      return data.message.content.trim();
    }

    throw new Error('API 응답 형식 오류');
  } catch (error) {
    console.error('AI API 호출 실패, fallback 사용:', error);

    // 5. API 실패 시 기존 DB 기반 로직으로 fallback
    const matchingPhrases = getFilteredPhrases(dbCategory, gradeNum);

    if (matchingPhrases.length > 0) {
      // 키워드 매칭 시도
      let bestMatches = matchingPhrases;
      if (keywords) {
        const keywordList = keywords.split(/[,\s]+/).filter(Boolean);
        bestMatches = matchingPhrases.filter((p) =>
          keywordList.some((kw) => p.keywords.some((pk) => pk.includes(kw) || kw.includes(pk)))
        );
        if (bestMatches.length === 0) bestMatches = matchingPhrases;
      }

      // 랜덤 선택
      const randomPhrase = bestMatches[Math.floor(Math.random() * bestMatches.length)];
      return randomPhrase.content;
    }

    // 데이터베이스에도 없을 경우 기본 템플릿
    const templates = {
      behavior: `${gradeLabel} 학생으로서 ${personalityLabel} 성격을 가지고 있으며, ${keywords ? keywords + ' 등의 ' : ''}활동에서 뛰어난 모습을 보임.`,
      learning: `${strengthLabel} 과목에서 핵심 개념을 정확히 이해하고 다양한 문제 상황에 적용하는 능력이 뛰어남.`,
      creative: `창의적 체험활동에서 ${personalityLabel} 모습을 보이며 적극적으로 참여함.`,
      reading: `한 학기 동안 다양한 분야의 책을 읽으며 독서의 즐거움을 알아가고 있음.`,
      career: `진로 탐색 활동에 적극적으로 참여하며 자신의 흥미와 적성을 파악하려고 노력함.`,
      special: `${keywords ? keywords + ' 대회에 참가하여 ' : ''}우수한 성적을 거두었으며, 앞으로의 성장이 기대되는 학생임.`,
    };

    return templates[category as keyof typeof templates] || templates.behavior;
  }
};

export default function SchoolRecordPage() {
  const [selectedCategory, setSelectedCategory] = useState('behavior');
  const [grade, setGrade] = useState('');
  const [personality, setPersonality] = useState('');
  const [strength, setStrength] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedPhrases, setSavedPhrases] = useState<string[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 카테고리 매핑
  const categoryMap: Record<string, string> = {
    behavior: 'behavior',
    learning: 'subject',
    creative: 'creative',
    reading: 'reading',
    career: 'career',
    special: 'behavior',
  };

  // 현재 카테고리의 서브카테고리 목록
  const subcategories = useMemo(() => {
    return getSubcategories(categoryMap[selectedCategory] || 'behavior');
  }, [selectedCategory]);

  // 데이터베이스에서 필터링된 문구
  const filteredPhrases = useMemo(() => {
    const dbCategory = categoryMap[selectedCategory] || 'behavior';
    const gradeNum = grade ? parseInt(grade) : null;
    let phrases = getFilteredPhrases(dbCategory, gradeNum, selectedSubcategory === 'all' ? undefined : selectedSubcategory);

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      phrases = phrases.filter(
        (p) =>
          p.content.toLowerCase().includes(query) ||
          p.keywords.some((k) => k.toLowerCase().includes(query)) ||
          p.subcategory.toLowerCase().includes(query)
      );
    }

    return phrases.slice(0, 20); // 최대 20개
  }, [selectedCategory, grade, selectedSubcategory, searchQuery]);

  const handleGenerate = useCallback(async () => {
    if (!grade || !personality) {
      toast.error('학년과 성격 유형을 선택해주세요.');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generatePhrase(
        selectedCategory,
        grade,
        personality,
        strength,
        keywords
      );
      setGeneratedText(result);
      toast.success('문구가 생성되었습니다.');
    } catch (error) {
      toast.error('문구 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  }, [selectedCategory, grade, personality, strength, keywords]);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('클립보드에 복사되었습니다.');
  }, []);

  const handleSave = useCallback(() => {
    if (generatedText) {
      setSavedPhrases((prev) => [generatedText, ...prev]);
      toast.success('문구가 저장되었습니다.');
    }
  }, [generatedText]);

  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const CategoryIcon = currentCategory?.icon || Heart;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            생활기록부 도우미
          </h1>
          <p className="text-muted-foreground">
            AI가 생활기록부 문구 작성을 도와드립니다
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          AI 기반 문구 생성
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 입력 영역 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 카테고리 선택 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">문구 카테고리 선택</CardTitle>
              <CardDescription>
                작성할 생활기록부 항목을 선택하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={cn(
                        'flex items-center gap-2 p-3 rounded-lg border transition-all',
                        selectedCategory === category.id
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50 hover:bg-accent'
                      )}
                    >
                      <Icon className={cn('h-5 w-5', category.color)} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 학생 정보 입력 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CategoryIcon className={cn('h-5 w-5', currentCategory?.color)} />
                {currentCategory?.name} 문구 생성
              </CardTitle>
              <CardDescription>
                학생의 특성을 입력하면 AI가 적절한 문구를 생성합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>학년</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="학년 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>성격 유형</Label>
                  <Select value={personality} onValueChange={setPersonality}>
                    <SelectTrigger>
                      <SelectValue placeholder="성격 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {personalityTypes.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>강점 과목</Label>
                  <Select value={strength} onValueChange={setStrength}>
                    <SelectTrigger>
                      <SelectValue placeholder="강점 과목 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {strengthAreas.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>키워드 (선택)</Label>
                  <Input
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="예: 독서토론, 과학탐구, 발표"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    문구 생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI 문구 생성
                  </>
                )}
              </Button>

              {generatedText && (
                <div className="mt-4 p-4 bg-accent rounded-lg">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge variant="secondary">생성된 문구</Badge>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleCopy(generatedText)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleGenerate}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{generatedText}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={handleSave}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    저장하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 문구 데이터베이스 */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                문구 데이터베이스
              </CardTitle>
              <CardDescription>
                {schoolRecordPhrases.length}개 이상의 예시 문구
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* 검색 */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="문구 검색..."
                  className="pl-9"
                />
              </div>

              {/* 서브카테고리 필터 */}
              {subcategories.length > 0 && (
                <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="세부 항목 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    {subcategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {/* 문구 목록 */}
              <ScrollArea className="h-[400px]">
                <div className="space-y-2 pr-3">
                  {filteredPhrases.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">검색 결과가 없습니다</p>
                    </div>
                  ) : (
                    filteredPhrases.map((phrase) => (
                      <div
                        key={phrase.id}
                        className="p-3 bg-accent rounded-lg text-sm cursor-pointer hover:bg-accent/80 transition-colors group"
                        onClick={() => handleCopy(phrase.content)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {phrase.subcategory}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {phrase.grade.join(', ')}학년
                          </span>
                        </div>
                        <p className="leading-relaxed">{phrase.content}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-wrap gap-1">
                            {phrase.keywords.slice(0, 3).map((kw, i) => (
                              <span key={i} className="text-xs text-muted-foreground">
                                #{kw}
                              </span>
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            복사
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {savedPhrases.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  저장된 문구
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {savedPhrases.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg text-sm cursor-pointer hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors group"
                      onClick={() => handleCopy(phrase)}
                    >
                      <p className="leading-relaxed">{phrase}</p>
                      <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <Copy className="h-3 w-3 mr-1" />
                          복사
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 안내 */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100">
                작성 팁
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                <li>• 구체적인 행동과 성과를 기술하세요</li>
                <li>• 학생의 성장과 발전 가능성에 초점을 맞추세요</li>
                <li>• 교육부 생활기록부 기재요령을 참고하세요</li>
                <li>• 생성된 문구는 학생 특성에 맞게 수정하여 사용하세요</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
