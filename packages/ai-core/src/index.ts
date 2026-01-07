export { ChatHandler } from './chat-handler';
export { DocumentGenerator } from './document-generator';
export { EventPlanner } from './event-planner';
export { TaskRecommender } from './task-recommender';
export { WorkflowAssistant } from './workflow-assistant';
export { ContextAnalyzer } from './context-analyzer';
export { EmbeddingService } from './embeddings';
export { AIClient, createAIClient } from './client';
export type {
  ChatMessage,
  ChatResponse,
  DocumentGenerationRequest,
  DocumentGenerationResponse,
  EventPlanningRequest,
  EventPlanningResponse,
  TaskRecommendation,
  WorkflowStep,
  UserContext,
} from './types';
