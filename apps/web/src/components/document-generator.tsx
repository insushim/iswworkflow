'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Search,
  FileText,
  Copy,
  Download,
  Sparkles,
  ChevronRight,
  Check,
  Star,
  Wand2,
  Loader2,
  LayoutTemplate,
} from 'lucide-react';
import {
  documentTemplates,
  documentCategories,
  searchTemplates,
  applyTemplate,
  getTemplatesByCategory,
  popularTemplates,
  schoolDefaults,
  type DocumentTemplate,
} from '@/lib/document-templates';

interface DocumentGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (title: string, content: string, type: string) => void;
}

export function DocumentGenerator({ isOpen, onClose, onGenerate }: DocumentGeneratorProps) {
  // 모드: ai (AI 자동작성) | template (템플릿 기반)
  const [mode, setMode] = useState<'ai' | 'template'>('ai');
  const [aiTitle, setAiTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedType, setGeneratedType] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [step, setStep] = useState<'search' | 'customize' | 'preview'>('search');
  const [copied, setCopied] = useState(false);

  // 검색 결과
  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return searchTemplates(searchQuery).slice(0, 10);
  }, [searchQuery]);

  // 카테고리별 템플릿
  const categoryTemplates = useMemo(() => {
    if (activeCategory === 'all') return documentTemplates.slice(0, 20);
    if (activeCategory === 'popular') return popularTemplates;
    const cat = documentCategories.find(c => c.id === activeCategory);
    if (cat) return getTemplatesByCategory(cat.name);
    return [];
  }, [activeCategory]);

  // 템플릿 선택 시
  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    // 기본 변수 설정
    const defaultVars: Record<string, string> = {
      '학교명': schoolDefaults.schoolName,
      '년': String(schoolDefaults.year),
      '월': String(schoolDefaults.month),
      '일': String(schoolDefaults.day),
      '문서번호': `${schoolDefaults.year}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`,
    };
    setVariables(defaultVars);
    setStep('customize');
  };

  // 문서 생성
  const handleGenerateDocument = () => {
    if (!selectedTemplate) return;
    const content = applyTemplate(selectedTemplate, variables);
    setGeneratedContent(content);
    setStep('preview');
  };

  // 문서 저장
  const handleSaveDocument = () => {
    if (!selectedTemplate) return;
    onGenerate(
      variables['제목'] || selectedTemplate.title,
      generatedContent,
      selectedTemplate.category
    );
    handleClose();
  };

  // 복사
  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 다운로드
  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${variables['제목'] || selectedTemplate?.title || '문서'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // AI 자동 생성
  const handleAIGenerate = async () => {
    if (!aiTitle.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'ai-auto',
          title: aiTitle.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('생성 실패');
      }

      const data = await response.json();
      setGeneratedContent(data.document.content);
      setGeneratedType(data.document.type);
      setStep('preview');
    } catch (error) {
      console.error('AI 문서 생성 오류:', error);
      alert('문서 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  // AI 문서 저장
  const handleSaveAIDocument = () => {
    onGenerate(aiTitle, generatedContent, generatedType);
    handleClose();
  };

  // 닫기
  const handleClose = () => {
    setSearchQuery('');
    setSelectedTemplate(null);
    setVariables({});
    setGeneratedContent('');
    setGeneratedType('');
    setStep('search');
    setAiTitle('');
    setMode('ai');
    onClose();
  };

  // 뒤로가기
  const handleBack = () => {
    if (step === 'preview') {
      if (mode === 'ai') {
        setStep('search');
        setGeneratedContent('');
      } else {
        setStep('customize');
      }
    } else if (step === 'customize') {
      setSelectedTemplate(null);
      setStep('search');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {step !== 'search' && (
                <Button variant="ghost" size="icon" onClick={handleBack}>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
              )}
              <div>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  공문서 자동 생성기
                </DialogTitle>
                <DialogDescription>
                  {step === 'search' && mode === 'ai' && '제목만 입력하면 AI가 전체 문서를 작성합니다'}
                  {step === 'search' && mode === 'template' && '템플릿을 선택하고 내용을 입력하세요'}
                  {step === 'customize' && '필요한 정보를 입력하세요'}
                  {step === 'preview' && '생성된 문서를 확인하세요'}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                AI 자동 작성
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4">
          {/* Step 1: Search & Select */}
          {step === 'search' && (
            <div className="space-y-4">
              {/* 모드 선택 탭 */}
              <div className="flex gap-2 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setMode('ai')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
                    mode === 'ai'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted-foreground/10'
                  }`}
                >
                  <Wand2 className="h-4 w-4" />
                  <span className="font-medium">AI 자동 작성</span>
                  <Badge variant={mode === 'ai' ? 'secondary' : 'outline'} className="text-[10px]">
                    추천
                  </Badge>
                </button>
                <button
                  onClick={() => setMode('template')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all ${
                    mode === 'template'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'hover:bg-muted-foreground/10'
                  }`}
                >
                  <LayoutTemplate className="h-4 w-4" />
                  <span className="font-medium">템플릿 사용</span>
                </button>
              </div>

              {/* AI 모드 */}
              {mode === 'ai' && (
                <div className="space-y-4">
                  <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/20">
                          <Wand2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="font-semibold text-lg">제목만 입력하세요</h3>
                            <p className="text-sm text-muted-foreground">
                              AI가 공문서 양식에 맞게 전체 내용을 자동으로 작성합니다
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ai-title">문서 제목</Label>
                            <Input
                              id="ai-title"
                              placeholder="예: 학부모 상담 주간 안내, 현장체험학습 동의서, 방학 중 안전교육..."
                              value={aiTitle}
                              onChange={(e) => setAiTitle(e.target.value)}
                              className="h-12 text-base"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && aiTitle.trim()) {
                                  handleAIGenerate();
                                }
                              }}
                            />
                          </div>
                          <Button
                            onClick={handleAIGenerate}
                            disabled={!aiTitle.trim() || isGenerating}
                            className="w-full h-12 text-base"
                            size="lg"
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                AI가 문서를 작성하고 있습니다...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-5 w-5 mr-2" />
                                문서 자동 생성
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 예시 제목들 */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">자주 사용하는 제목 예시:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        '학부모 상담 주간 안내',
                        '현장체험학습 참가 동의서',
                        '방학 중 생활 안내',
                        '학급 운영 계획',
                        '수업 공개의 날 안내',
                        '교육 기부 감사장',
                      ].map((example) => (
                        <button
                          key={example}
                          onClick={() => setAiTitle(example)}
                          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-full transition-colors"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 템플릿 모드 */}
              {mode === 'template' && (
                <>
                  {/* 검색 입력 */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="예: 학부모 상담 안내, 현장체험학습, 방학..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base"
                      autoFocus
                    />
                  </div>

              {/* 검색 결과 */}
              {searchQuery.length >= 2 && searchResults.length > 0 && (
                <Card className="border-primary/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      검색 결과 ({searchResults.length}개)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[200px]">
                      {searchResults.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => handleSelectTemplate(template)}
                          className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b last:border-0 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{template.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {template.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {template.subcategory}
                              </Badge>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}

              {/* 카테고리 탭 */}
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="grid w-full grid-cols-6 h-auto p-1">
                  <TabsTrigger value="all" className="text-xs py-2">
                    전체
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="text-xs py-2">
                    <Star className="h-3 w-3 mr-1" />
                    인기
                  </TabsTrigger>
                  {documentCategories.slice(0, 4).map((cat) => (
                    <TabsTrigger key={cat.id} value={cat.id} className="text-xs py-2">
                      <span className="mr-1">{cat.icon}</span>
                      {cat.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <ScrollArea className="h-[300px] mt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {categoryTemplates.map((template) => (
                      <Card
                        key={template.id}
                        className="cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all"
                        onClick={() => handleSelectTemplate(template)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">{template.title}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Badge variant="secondary" className="text-[10px]">
                                  {template.category}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {template.keywords.slice(0, 3).map((kw, i) => (
                                  <span key={i} className="text-[10px] text-muted-foreground">
                                    #{kw}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </Tabs>

              {/* 더 많은 카테고리 */}
              <div className="flex flex-wrap gap-2">
                {documentCategories.slice(4).map((cat) => (
                  <Button
                    key={cat.id}
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveCategory(cat.id)}
                    className={activeCategory === cat.id ? 'border-primary' : ''}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.name}
                    <Badge variant="secondary" className="ml-1 text-[10px]">
                      {cat.count}
                    </Badge>
                  </Button>
                ))}
              </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: Customize */}
          {step === 'customize' && selectedTemplate && (
            <div className="space-y-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedTemplate.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{selectedTemplate.category}</Badge>
                        <Badge variant="outline">{selectedTemplate.subcategory}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ScrollArea className="h-[350px] pr-4">
                <div className="space-y-4">
                  {/* 기본 정보 */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
                      기본 정보
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">학교명</Label>
                        <Input
                          value={variables['학교명'] || ''}
                          onChange={(e) => setVariables({ ...variables, '학교명': e.target.value })}
                          placeholder="○○초등학교"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">문서번호</Label>
                        <Input
                          value={variables['문서번호'] || ''}
                          onChange={(e) => setVariables({ ...variables, '문서번호': e.target.value })}
                          placeholder="2025-001"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">날짜</Label>
                        <div className="flex gap-2">
                          <Input
                            value={variables['년'] || ''}
                            onChange={(e) => setVariables({ ...variables, '년': e.target.value })}
                            placeholder="년"
                            className="w-20"
                          />
                          <Input
                            value={variables['월'] || ''}
                            onChange={(e) => setVariables({ ...variables, '월': e.target.value })}
                            placeholder="월"
                            className="w-16"
                          />
                          <Input
                            value={variables['일'] || ''}
                            onChange={(e) => setVariables({ ...variables, '일': e.target.value })}
                            placeholder="일"
                            className="w-16"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 템플릿 변수들 */}
                  {selectedTemplate.variables.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</span>
                        문서 내용
                      </h4>
                      <div className="space-y-3">
                        {selectedTemplate.variables.map((varName) => (
                          <div key={varName}>
                            <Label className="text-xs">{varName}</Label>
                            {varName.includes('내용') || varName.includes('목록') || varName.includes('일정') ? (
                              <Textarea
                                value={variables[varName] || ''}
                                onChange={(e) => setVariables({ ...variables, [varName]: e.target.value })}
                                placeholder={`${varName}을(를) 입력하세요`}
                                className="min-h-[80px]"
                              />
                            ) : (
                              <Input
                                value={variables[varName] || ''}
                                onChange={(e) => setVariables({ ...variables, [varName]: e.target.value })}
                                placeholder={`${varName}을(를) 입력하세요`}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={handleBack}>
                  취소
                </Button>
                <Button onClick={handleGenerateDocument}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  문서 생성
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {step === 'preview' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">
                    {mode === 'ai' ? aiTitle : (variables['제목'] || selectedTemplate?.title)}
                  </h3>
                  {mode === 'ai' && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI 생성
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1 text-green-500" />
                        복사됨
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        복사
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-1" />
                    다운로드
                  </Button>
                </div>
              </div>

              <Card className="bg-white dark:bg-gray-950">
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px]">
                    <pre className="p-6 text-sm whitespace-pre-wrap leading-relaxed">
                      {generatedContent}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" onClick={handleBack}>
                  {mode === 'ai' ? '다시 작성' : '수정하기'}
                </Button>
                <Button onClick={mode === 'ai' ? handleSaveAIDocument : handleSaveDocument}>
                  <FileText className="h-4 w-4 mr-2" />
                  문서함에 저장
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
