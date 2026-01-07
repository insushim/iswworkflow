import Anthropic from '@anthropic-ai/sdk';

export interface AIClientConfig {
  apiKey?: string;
  model?: string;
  maxTokens?: number;
}

export class AIClient {
  private client: Anthropic;
  private model: string;
  private maxTokens: number;

  constructor(config: AIClientConfig = {}) {
    this.client = new Anthropic({
      apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
    });
    this.model = config.model || 'claude-sonnet-4-20250514';
    this.maxTokens = config.maxTokens || 4096;
  }

  async chat(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    systemPrompt?: string
  ): Promise<string> {
    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      system: systemPrompt,
      messages: messages,
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    return textBlock ? textBlock.text : '';
  }

  async streamChat(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    systemPrompt?: string,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    const stream = this.client.messages.stream({
      model: this.model,
      max_tokens: this.maxTokens,
      system: systemPrompt,
      messages: messages,
    });

    let fullResponse = '';

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        const text = event.delta.text;
        fullResponse += text;
        if (onChunk) {
          onChunk(text);
        }
      }
    }

    return fullResponse;
  }

  async complete(prompt: string, systemPrompt?: string): Promise<string> {
    return this.chat([{ role: 'user', content: prompt }], systemPrompt);
  }

  async generateJSON<T>(
    prompt: string,
    systemPrompt?: string
  ): Promise<T | null> {
    const response = await this.chat(
      [{ role: 'user', content: prompt }],
      `${systemPrompt || ''}\n\n반드시 유효한 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.`
    );

    try {
      // JSON 블록 추출 시도
      const jsonMatch = response.match(/```json\n?([\s\S]*?)\n?```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : response;
      return JSON.parse(jsonStr.trim()) as T;
    } catch {
      console.error('JSON 파싱 실패:', response);
      return null;
    }
  }

  getModel(): string {
    return this.model;
  }

  setModel(model: string): void {
    this.model = model;
  }
}

export function createAIClient(config?: AIClientConfig): AIClient {
  return new AIClient(config);
}
