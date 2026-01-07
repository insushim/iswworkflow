import Anthropic from '@anthropic-ai/sdk';

export interface EmbeddingServiceConfig {
  apiKey?: string;
  dimensions?: number;
}

export interface EmbeddingResult {
  embedding: number[];
  text: string;
  tokenCount: number;
}

export interface SimilarityResult {
  text: string;
  score: number;
  metadata?: Record<string, unknown>;
}

export class EmbeddingService {
  private client: Anthropic;
  private dimensions: number;

  constructor(config: EmbeddingServiceConfig = {}) {
    this.client = new Anthropic({
      apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
    });
    this.dimensions = config.dimensions || 1536;
  }

  /**
   * 텍스트를 임베딩 벡터로 변환
   * Note: Anthropic API는 현재 임베딩을 직접 지원하지 않음
   * 실제 구현시 OpenAI, Cohere, 또는 로컬 모델 사용 권장
   */
  async embed(text: string): Promise<EmbeddingResult> {
    // 간단한 해시 기반 임시 임베딩 (실제 운영시 교체 필요)
    const embedding = this.simpleHash(text);

    return {
      embedding,
      text,
      tokenCount: Math.ceil(text.length / 4),
    };
  }

  async embedBatch(texts: string[]): Promise<EmbeddingResult[]> {
    return Promise.all(texts.map((text) => this.embed(text)));
  }

  /**
   * 두 벡터 간 코사인 유사도 계산
   */
  cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      throw new Error('Vectors must have the same dimensions');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * 쿼리와 가장 유사한 문서 검색
   */
  async findSimilar(
    query: string,
    documents: Array<{ text: string; metadata?: Record<string, unknown> }>,
    topK: number = 5
  ): Promise<SimilarityResult[]> {
    const queryEmbedding = await this.embed(query);
    const docEmbeddings = await this.embedBatch(documents.map((d) => d.text));

    const similarities: SimilarityResult[] = docEmbeddings.map((docEmb, i) => ({
      text: documents[i].text,
      score: this.cosineSimilarity(queryEmbedding.embedding, docEmb.embedding),
      metadata: documents[i].metadata,
    }));

    return similarities.sort((a, b) => b.score - a.score).slice(0, topK);
  }

  /**
   * 문서 클러스터링을 위한 유사도 매트릭스 생성
   */
  async buildSimilarityMatrix(texts: string[]): Promise<number[][]> {
    const embeddings = await this.embedBatch(texts);
    const matrix: number[][] = [];

    for (let i = 0; i < embeddings.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < embeddings.length; j++) {
        matrix[i][j] = this.cosineSimilarity(
          embeddings[i].embedding,
          embeddings[j].embedding
        );
      }
    }

    return matrix;
  }

  /**
   * 의미적으로 유사한 텍스트 그룹화
   */
  async cluster(
    texts: string[],
    threshold: number = 0.7
  ): Promise<string[][]> {
    const matrix = await this.buildSimilarityMatrix(texts);
    const clusters: string[][] = [];
    const assigned = new Set<number>();

    for (let i = 0; i < texts.length; i++) {
      if (assigned.has(i)) continue;

      const cluster: string[] = [texts[i]];
      assigned.add(i);

      for (let j = i + 1; j < texts.length; j++) {
        if (assigned.has(j)) continue;

        if (matrix[i][j] >= threshold) {
          cluster.push(texts[j]);
          assigned.add(j);
        }
      }

      clusters.push(cluster);
    }

    return clusters;
  }

  /**
   * 텍스트 중복 감지
   */
  async findDuplicates(
    texts: string[],
    threshold: number = 0.9
  ): Promise<Array<[number, number, number]>> {
    const embeddings = await this.embedBatch(texts);
    const duplicates: Array<[number, number, number]> = [];

    for (let i = 0; i < embeddings.length; i++) {
      for (let j = i + 1; j < embeddings.length; j++) {
        const similarity = this.cosineSimilarity(
          embeddings[i].embedding,
          embeddings[j].embedding
        );

        if (similarity >= threshold) {
          duplicates.push([i, j, similarity]);
        }
      }
    }

    return duplicates;
  }

  /**
   * 간단한 해시 기반 임시 임베딩 생성
   * 실제 운영시 ML 기반 임베딩으로 교체 필요
   */
  private simpleHash(text: string): number[] {
    const embedding = new Array(this.dimensions).fill(0);
    const normalized = text.toLowerCase().trim();

    for (let i = 0; i < normalized.length; i++) {
      const charCode = normalized.charCodeAt(i);
      const index = (charCode * (i + 1)) % this.dimensions;
      embedding[index] += Math.sin(charCode * (i + 1)) * 0.1;
    }

    // 정규화
    const magnitude = Math.sqrt(
      embedding.reduce((sum, val) => sum + val * val, 0)
    );

    if (magnitude > 0) {
      for (let i = 0; i < embedding.length; i++) {
        embedding[i] /= magnitude;
      }
    }

    return embedding;
  }

  /**
   * 텍스트 청킹 (긴 문서를 적절한 크기로 분할)
   */
  chunkText(
    text: string,
    options: {
      maxChunkSize?: number;
      overlap?: number;
      separator?: string;
    } = {}
  ): string[] {
    const { maxChunkSize = 500, overlap = 50, separator = '\n' } = options;

    const paragraphs = text.split(separator).filter((p) => p.trim());
    const chunks: string[] = [];
    let currentChunk = '';

    for (const paragraph of paragraphs) {
      if (currentChunk.length + paragraph.length <= maxChunkSize) {
        currentChunk += (currentChunk ? separator : '') + paragraph;
      } else {
        if (currentChunk) {
          chunks.push(currentChunk);
          // 오버랩 처리
          const words = currentChunk.split(' ');
          const overlapWords = words.slice(-Math.ceil(overlap / 5));
          currentChunk = overlapWords.join(' ') + separator + paragraph;
        } else {
          // 단일 단락이 최대 크기를 초과하는 경우
          currentChunk = paragraph.slice(0, maxChunkSize);
          if (paragraph.length > maxChunkSize) {
            chunks.push(currentChunk);
            currentChunk = paragraph.slice(maxChunkSize - overlap);
          }
        }
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  /**
   * 검색 가능한 인덱스 생성
   */
  async createIndex(
    documents: Array<{ id: string; text: string; metadata?: Record<string, unknown> }>
  ): Promise<Map<string, { embedding: number[]; metadata?: Record<string, unknown> }>> {
    const index = new Map<
      string,
      { embedding: number[]; metadata?: Record<string, unknown> }
    >();

    for (const doc of documents) {
      const result = await this.embed(doc.text);
      index.set(doc.id, {
        embedding: result.embedding,
        metadata: doc.metadata,
      });
    }

    return index;
  }

  /**
   * 인덱스에서 검색
   */
  async searchIndex(
    query: string,
    index: Map<string, { embedding: number[]; metadata?: Record<string, unknown> }>,
    topK: number = 5
  ): Promise<Array<{ id: string; score: number; metadata?: Record<string, unknown> }>> {
    const queryEmbedding = await this.embed(query);
    const results: Array<{ id: string; score: number; metadata?: Record<string, unknown> }> = [];

    for (const [id, data] of index) {
      const score = this.cosineSimilarity(queryEmbedding.embedding, data.embedding);
      results.push({ id, score, metadata: data.metadata });
    }

    return results.sort((a, b) => b.score - a.score).slice(0, topK);
  }
}
