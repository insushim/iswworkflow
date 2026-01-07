'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Send, Lightbulb, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const suggestions = [
  '3월에 해야 할 업무가 뭐가 있나요?',
  '학급경영록 작성법을 알려주세요',
  '학부모 상담 안내문 작성해줘',
  '올해 학사일정이 어떻게 되나요?',
];

export function AIAssistantWidget() {
  const [message, setMessage] = useState('');

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          AI 어시스턴트
          <Badge variant="secondary" className="ml-auto">
            Gemini AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder="업무에 대해 무엇이든 물어보세요..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[80px] pr-12 resize-none"
          />
          <Button
            size="icon"
            className="absolute right-2 bottom-2"
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Lightbulb className="h-4 w-4" />
            추천 질문
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="text-xs h-auto py-1.5"
                onClick={() => setMessage(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        <Link href="/ai-chat" className="block">
          <Button variant="outline" className="w-full group">
            전체 대화 보기
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
