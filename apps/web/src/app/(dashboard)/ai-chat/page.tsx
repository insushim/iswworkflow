'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sparkles,
  Send,
  User,
  Bot,
  Loader2,
  Lightbulb,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  ChevronDown,
  FileText,
  Calendar,
  BookOpen,
  Users,
  GraduationCap,
  Shield,
  ClipboardList,
  MessageSquare,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useUserSettings } from '@/hooks/useFirestore';
import { getEducationOfficeById } from '@/data/education-offices';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// 카테고리별 추천 질문
const suggestionCategories = [
  {
    id: 'monthly',
    name: '월별 업무',
    icon: Calendar,
    color: 'bg-blue-500',
    suggestions: [
      '3월에 해야 할 필수 업무가 뭐가 있나요?',
      '신학기 첫 주 학급 운영 체크리스트 알려줘',
      '학기초 학부모 총회 준비사항 알려줘',
      '졸업/종업식 준비 업무 체크리스트',
    ],
  },
  {
    id: 'document',
    name: '문서 작성',
    icon: FileText,
    color: 'bg-green-500',
    suggestions: [
      '학부모 상담 안내문 작성해줘',
      '현장체험학습 안내문 양식 알려줘',
      '가정통신문 작성 요령 알려줘',
      '공문서 작성 형식 설명해줘',
    ],
  },
  {
    id: 'class',
    name: '학급 경영',
    icon: Users,
    color: 'bg-purple-500',
    suggestions: [
      '학급 규칙 만들기 아이디어 줘',
      '학급 임원 선거 진행 방법 알려줘',
      '효과적인 자리 배치 방법 추천해줘',
      '학급 회의 진행 방법 알려줘',
    ],
  },
  {
    id: 'record',
    name: '생활기록부',
    icon: GraduationCap,
    color: 'bg-orange-500',
    suggestions: [
      '행동특성 및 종합의견 예시 알려줘',
      '창의적 체험활동 문구 작성해줘',
      '교과 세부능력 특기사항 작성 요령',
      '독서활동상황 기재 예시 알려줘',
    ],
  },
  {
    id: 'safety',
    name: '안전 교육',
    icon: Shield,
    color: 'bg-red-500',
    suggestions: [
      '7대 안전교육 월별 내용 알려줘',
      '학교폭력 예방교육 자료 만들어줘',
      '교통안전교육 지도안 알려줘',
      '재난대피훈련 진행 방법 알려줘',
    ],
  },
  {
    id: 'curriculum',
    name: '교육과정',
    icon: BookOpen,
    color: 'bg-cyan-500',
    suggestions: [
      '효과적인 수업 도입 방법 알려줘',
      '학생 참여형 수업 아이디어 줘',
      '수행평가 계획 세우는 방법',
      '창의적 체험활동 프로그램 추천',
    ],
  },
  {
    id: 'parent',
    name: '학부모 상담',
    icon: MessageSquare,
    color: 'bg-pink-500',
    suggestions: [
      '학부모 상담 진행 요령 알려줘',
      '어려운 학부모 응대 방법',
      '상담 기록지 작성 예시',
      '학부모 민원 대응 방법',
    ],
  },
  {
    id: 'evaluation',
    name: '평가',
    icon: ClipboardList,
    color: 'bg-yellow-500',
    suggestions: [
      '수행평가 루브릭 만드는 방법',
      '과정중심평가 사례 알려줘',
      '학습 피드백 작성 요령',
      '포트폴리오 평가 방법',
    ],
  },
];

// 시스템 프롬프트는 서버(route.ts)에서 관리 - 클라이언트는 교육청ID만 전달

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [activeCategory, setActiveCategory] = useState('monthly');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const prevMessagesLengthRef = useRef(0);

  // 사용자 설정에서 교육청 정보 가져오기
  const { settings } = useUserSettings();
  const selectedOffice = settings?.educationOfficeId
    ? getEducationOfficeById(settings.educationOfficeId)
    : null;

  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const atBottom = distanceFromBottom < 100;

    setIsAtBottom(atBottom);
    setShowScrollButton(!atBottom && messages.length > 0);
  }, [messages.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScrollPosition);
    return () => container.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  useEffect(() => {
    const isNewMessage = messages.length > prevMessagesLengthRef.current;
    prevMessagesLengthRef.current = messages.length;

    if (isNewMessage && isAtBottom) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [messages.length, isAtBottom]);

  useEffect(() => {
    if (isLoading && isAtBottom) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [isLoading, isAtBottom]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: userMessage.role, content: userMessage.content },
          ],
          // 선택된 교육청 정보 전달
          educationOfficeId: settings?.educationOfficeId || null,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: data.message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('클립보드에 복사되었습니다.');
  };

  const activeTab = suggestionCategories.find((c) => c.id === activeCategory);

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI 어시스턴트
          </h1>
          <p className="text-muted-foreground">
            초등교사 업무에 특화된 AI 비서입니다
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <GraduationCap className="h-3 w-3" />
            교사 맞춤형
          </Badge>
          {selectedOffice && (
            <Badge variant="outline" className="flex items-center gap-1 text-blue-600 border-blue-300">
              <MapPin className="h-3 w-3" />
              {selectedOffice.shortName}
            </Badge>
          )}
          {messages.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              대화 초기화
            </Button>
          )}
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
          {/* Messages */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 relative min-h-0"
            style={{ maxHeight: 'calc(100% - 100px)' }}
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  안녕하세요! 에듀플로우 AI입니다
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  초등교사 업무에 특화된 AI 비서입니다. 문서 작성, 학급 경영,
                  생활기록부 등 무엇이든 물어보세요.
                </p>

                {/* 카테고리 탭 */}
                <div className="w-full max-w-3xl">
                  <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                    <TabsList className="flex flex-wrap justify-center gap-1 h-auto p-1 bg-transparent">
                      {suggestionCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <TabsTrigger
                            key={cat.id}
                            value={cat.id}
                            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2"
                          >
                            <Icon className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">{cat.name}</span>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>

                    {suggestionCategories.map((cat) => (
                      <TabsContent key={cat.id} value={cat.id} className="mt-4">
                        <div className="flex items-center gap-2 mb-3 justify-center text-sm text-muted-foreground">
                          <Lightbulb className="h-4 w-4" />
                          {cat.name} 관련 추천 질문
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {cat.suggestions.map((suggestion) => (
                            <Button
                              key={suggestion}
                              variant="outline"
                              className="justify-start text-left h-auto py-3 px-4 hover:bg-primary/5 hover:border-primary"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <span className="text-sm">{suggestion}</span>
                            </Button>
                          ))}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'max-w-[85%] lg:max-w-[80%] rounded-lg p-4',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent'
                      )}
                    >
                      <div className="whitespace-pre-wrap break-words text-sm">
                        {message.content}
                      </div>
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-1 mt-3 pt-2 border-t border-border/50">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => copyMessage(message.content)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-accent rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">답변 생성 중...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-4 right-4 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all z-10"
                aria-label="맨 아래로 스크롤"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="초등교사 업무에 대해 무엇이든 물어보세요... (Enter로 전송, Shift+Enter로 줄바꿈)"
                className="min-h-[60px] max-h-[200px] resize-none"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                className="h-[60px] w-[60px]"
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI가 생성한 내용은 참고용입니다. 중요한 문서는 반드시 검토 후 사용하세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
