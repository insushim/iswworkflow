import { AIClient } from './client';
import {
  DocumentGenerationRequest,
  DocumentGenerationResponse,
  UserContext,
} from './types';

export interface DocumentGeneratorConfig {
  client: AIClient;
}

interface DocumentTemplate {
  id: string;
  name: string;
  category: string;
  structure: string;
  requiredVariables: string[];
  optionalVariables?: string[];
}

export class DocumentGenerator {
  private client: AIClient;

  constructor(config: DocumentGeneratorConfig) {
    this.client = config.client;
  }

  private buildSystemPrompt(template?: DocumentTemplate): string {
    const basePrompt = `당신은 대한민국 초등학교 공문서 작성 전문가입니다.

작성 규칙:
1. 교육부 및 교육청 공문서 양식을 준수합니다.
2. 경어체를 사용하며 격식있는 문체를 유지합니다.
3. 구체적이고 명확한 표현을 사용합니다.
4. 날짜, 시간, 장소 등 정보는 정확하게 기재합니다.
5. 필요시 붙임 자료를 안내합니다.

공문서 구성 요소:
- 제목: 문서의 핵심 내용을 간결하게
- 목적: 문서 작성 배경과 목적
- 내용: 구체적인 안내 사항 (번호 매기기 활용)
- 기대효과: 필요시 포함
- 붙임: 관련 자료 목록
- 협조 요청: 필요시 포함`;

    if (template) {
      return `${basePrompt}

현재 작성할 문서 유형: ${template.name}
문서 구조:
${template.structure}

필수 포함 항목: ${template.requiredVariables.join(', ')}`;
    }

    return basePrompt;
  }

  async generate(
    request: DocumentGenerationRequest
  ): Promise<DocumentGenerationResponse> {
    const { documentType, variables, context, additionalInstructions } =
      request;

    const prompt = this.buildGenerationPrompt(
      documentType,
      variables,
      context,
      additionalInstructions
    );

    const systemPrompt = this.buildSystemPrompt();

    const content = await this.client.complete(prompt, systemPrompt);

    // 제목 추출
    const titleMatch = content.match(/^#?\s*(.+?)(?:\n|$)/);
    const title = titleMatch ? titleMatch[1].replace(/[#*]/g, '').trim() : documentType;

    return {
      content,
      title,
      metadata: {
        templateUsed: request.templateId || request.templateName,
        generatedAt: new Date(),
        variables,
      },
    };
  }

  private buildGenerationPrompt(
    documentType: string,
    variables: Record<string, unknown>,
    context?: UserContext,
    additionalInstructions?: string
  ): string {
    let prompt = `다음 정보를 바탕으로 "${documentType}" 문서를 작성해주세요.\n\n`;

    prompt += '## 제공된 정보:\n';
    for (const [key, value] of Object.entries(variables)) {
      prompt += `- ${key}: ${value}\n`;
    }

    if (context) {
      prompt += '\n## 작성자 정보:\n';
      prompt += `- 학교: ${context.schoolName || '○○초등학교'}\n`;
      prompt += `- 작성자: ${context.userName || '담당교사'}\n`;
      prompt += `- 학년도: ${context.academicYear}년\n`;
      prompt += `- 학기: ${context.currentSemester}학기\n`;
    }

    if (additionalInstructions) {
      prompt += `\n## 추가 지시사항:\n${additionalInstructions}\n`;
    }

    prompt += '\n완성된 문서를 작성해주세요.';

    return prompt;
  }

  async generateFromTemplate(
    templateId: string,
    variables: Record<string, unknown>,
    context?: UserContext
  ): Promise<DocumentGenerationResponse> {
    return this.generate({
      templateId,
      documentType: templateId,
      variables,
      context,
    });
  }

  async improveDocument(
    originalContent: string,
    improvementRequest: string
  ): Promise<string> {
    const prompt = `다음 문서를 개선해주세요.

## 원본 문서:
${originalContent}

## 개선 요청:
${improvementRequest}

개선된 문서 전체를 작성해주세요.`;

    return this.client.complete(prompt, this.buildSystemPrompt());
  }

  async generateTitle(content: string): Promise<string> {
    const prompt = `다음 문서 내용에 적합한 공문서 제목을 생성해주세요.
제목만 한 줄로 작성하세요.

문서 내용:
${content.slice(0, 1000)}`;

    const title = await this.client.complete(prompt);
    return title.trim().replace(/['"]/g, '');
  }

  async generateSummary(content: string): Promise<string> {
    const prompt = `다음 문서의 핵심 내용을 3문장 이내로 요약해주세요.

문서:
${content}`;

    return this.client.complete(prompt);
  }

  async translateToFormal(informalText: string): Promise<string> {
    const prompt = `다음 내용을 공문서에 적합한 격식체로 변환해주세요.
원래 의미는 유지하면서 공식적인 문체로 작성해주세요.

원본:
${informalText}`;

    return this.client.complete(prompt, this.buildSystemPrompt());
  }

  async suggestImprovements(content: string): Promise<string[]> {
    const prompt = `다음 공문서를 검토하고 개선할 수 있는 점을 5가지 이내로 제안해주세요.
JSON 배열 형식으로 제안사항만 작성해주세요.

문서:
${content}`;

    const result = await this.client.generateJSON<string[]>(prompt);
    return result || [];
  }
}
