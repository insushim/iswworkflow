'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

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

// 샘플 생성 문구 데이터
const samplePhrases = {
  behavior: {
    positive: [
      '학급에서 친구들을 배려하는 모습이 돋보이며, 어려운 친구를 먼저 도와주는 따뜻한 마음을 가지고 있음.',
      '수업 시간에 적극적으로 참여하여 발표하고, 다양한 의견을 제시하며 학급 분위기를 이끌어 감.',
      '책임감이 강하여 맡은 역할을 끝까지 완수하며, 학급 일에 솔선수범하는 모습을 보임.',
      '긍정적인 태도로 새로운 과제에 도전하며, 실패하더라도 포기하지 않고 끈기 있게 노력함.',
      '자기 주도적 학습 능력이 뛰어나며, 스스로 학습 계획을 세우고 실천하는 습관이 잘 형성되어 있음.',
    ],
    improvement: [
      '발표 기회가 주어졌을 때 더 적극적으로 참여한다면 자신감 향상에 도움이 될 것으로 기대됨.',
      '모둠 활동 시 친구들의 의견을 더 경청한다면 협동 능력이 더욱 발전할 것으로 보임.',
      '과제 제출 기한을 잘 지킨다면 책임감 있는 모습이 더욱 돋보일 것임.',
    ],
  },
  learning: {
    korean: [
      '글의 핵심 내용을 정확하게 파악하고 자신의 생각을 논리적으로 표현하는 능력이 우수함.',
      '다양한 장르의 글을 읽고 작품 속 인물의 심정을 깊이 있게 이해하며 공감하는 태도가 돋보임.',
      '발표력이 뛰어나며, 청중을 고려하여 적절한 어조와 표현으로 자신의 의견을 전달함.',
    ],
    math: [
      '수학적 원리를 정확하게 이해하고 다양한 문제 상황에 적용하는 능력이 뛰어남.',
      '문제 해결 과정에서 다양한 전략을 활용하며, 창의적인 방법으로 해결책을 제시함.',
      '기본 개념을 탄탄하게 이해하고 있으며, 심화 문제에도 도전하려는 의지가 강함.',
    ],
    science: [
      '과학적 탐구 과정에 적극적으로 참여하며, 실험 결과를 논리적으로 분석하고 해석하는 능력이 우수함.',
      '자연 현상에 대한 호기심이 많고, 과학적 질문을 통해 탐구 주제를 스스로 설정할 수 있음.',
      '실험 기구를 안전하게 다루며, 정확한 관찰과 기록을 통해 실험 결과를 도출함.',
    ],
    social: [
      '사회 현상에 대한 관심이 높고, 다양한 관점에서 문제를 바라보는 비판적 사고력이 뛰어남.',
      '역사적 사건의 인과 관계를 잘 이해하고, 현재와의 연관성을 찾아 설명하는 능력이 있음.',
      '지역 사회의 문제에 관심을 가지고, 해결 방안을 모색하며 실천하려는 태도가 돋보임.',
    ],
  },
  creative: {
    autonomous: [
      '자치 활동에서 학급 회의 진행을 맡아 민주적인 의사 결정 과정을 이끌어 감.',
      '학급 규칙 제정에 적극 참여하며, 규칙 준수의 중요성을 친구들에게 알리는 역할을 함.',
    ],
    club: [
      '동아리 활동에서 리더 역할을 맡아 구성원들의 의견을 조율하고 활동을 계획함.',
      '과학 동아리에서 실험 설계부터 결과 분석까지 주도적으로 참여하여 우수한 성과를 거둠.',
    ],
    volunteer: [
      '꾸준한 봉사 활동 참여로 이웃을 배려하는 마음과 나눔의 가치를 실천함.',
      '학교 및 지역 사회 봉사 활동에 적극 참여하며 봉사의 의미와 보람을 알아가고 있음.',
    ],
    career: [
      '다양한 직업에 대한 탐색 활동에 적극 참여하며 자신의 진로에 대해 진지하게 고민함.',
      '진로 체험 활동을 통해 자신의 적성과 흥미를 파악하고 미래 계획을 구체화함.',
    ],
  },
  reading: [
    '한 학기 동안 OO권의 책을 읽으며 독서의 즐거움을 알아가고 있음. 특히 OO 분야의 도서에 관심을 보이며 깊이 있는 독서를 함.',
    '독서 후 자신의 생각을 독서록에 성실하게 기록하며, 책 속 인물과 자신을 비교하여 성찰하는 태도가 돋보임.',
    '다양한 장르의 책을 고루 읽으며 어휘력과 배경 지식이 풍부해지고 있음.',
  ],
};

// AI 문구 생성 함수 (실제로는 API 호출)
const generatePhrase = async (
  category: string,
  grade: string,
  personality: string,
  strength: string,
  keywords: string
): Promise<string> => {
  // 시뮬레이션을 위한 딜레이
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const templates = {
    behavior: `${gradeOptions.find((g) => g.value === grade)?.label || ''} 학생으로서 ${personalityTypes.find((p) => p.value === personality)?.label || ''} 성격을 가지고 있으며, ${keywords ? keywords + ' 등의 ' : ''}활동에서 뛰어난 모습을 보임. ${strengthAreas.find((s) => s.value === strength)?.label || ''} 과목에서 특히 우수한 성취를 보이며, 학급에서 모범이 되는 학생임.`,
    learning: `${strengthAreas.find((s) => s.value === strength)?.label || ''} 과목에서 핵심 개념을 정확히 이해하고 다양한 문제 상황에 적용하는 능력이 뛰어남. ${personalityTypes.find((p) => p.value === personality)?.label || ''} 태도로 수업에 참여하며, ${keywords ? keywords + ' 관련 ' : ''}활동에서 창의적인 사고력을 발휘함.`,
    creative: `창의적 체험활동에서 ${personalityTypes.find((p) => p.value === personality)?.label || ''} 모습을 보이며 적극적으로 참여함. ${keywords ? keywords + ' ' : ''}활동을 통해 협동심과 책임감을 기르고, 타인을 배려하는 태도가 돋보임.`,
    reading: `한 학기 동안 다양한 분야의 책을 읽으며 독서의 즐거움을 알아가고 있음. 특히 ${keywords ? keywords + ' 분야의 ' : ''}도서에 관심을 보이며, 독서 후 자신의 생각을 논리적으로 정리하여 표현하는 능력이 향상됨.`,
    career: `진로 탐색 활동에 적극적으로 참여하며 자신의 흥미와 적성을 파악하려고 노력함. ${strengthAreas.find((s) => s.value === strength)?.label || ''} 분야에 관심을 보이며, ${keywords ? keywords + ' 관련 ' : ''}직업에 대해 탐구하는 모습이 인상적임.`,
    special: `${keywords ? keywords + ' 대회에 참가하여 ' : ''}우수한 성적을 거두었으며, ${personalityTypes.find((p) => p.value === personality)?.label || ''} 성격으로 꾸준히 노력하는 모습이 돋보임. 앞으로의 성장이 기대되는 학생임.`,
  };

  return templates[category as keyof typeof templates] || templates.behavior;
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

        {/* 샘플 문구 & 저장된 문구 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">샘플 문구</CardTitle>
              <CardDescription>
                참고할 수 있는 예시 문구입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="positive" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="positive">긍정적</TabsTrigger>
                  <TabsTrigger value="improvement">발전가능</TabsTrigger>
                </TabsList>
                <TabsContent value="positive" className="mt-4 space-y-3">
                  {samplePhrases.behavior.positive.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-accent rounded-lg text-sm cursor-pointer hover:bg-accent/80 transition-colors group"
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
                </TabsContent>
                <TabsContent value="improvement" className="mt-4 space-y-3">
                  {samplePhrases.behavior.improvement.map((phrase, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-accent rounded-lg text-sm cursor-pointer hover:bg-accent/80 transition-colors group"
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
                </TabsContent>
              </Tabs>
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
