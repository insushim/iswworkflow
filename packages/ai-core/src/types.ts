export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  content: string;
  tokensUsed: {
    input: number;
    output: number;
  };
  metadata?: Record<string, unknown>;
}

export interface UserContext {
  userId: string;
  userName?: string;
  schoolId?: string;
  schoolName?: string;
  position?: string;
  gradeInCharge?: number;
  classInCharge?: number;
  subjects?: string[];
  currentMonth: number;
  currentSemester: 1 | 2;
  academicYear: number;
}

export interface DocumentGenerationRequest {
  templateId?: string;
  templateName?: string;
  documentType: string;
  variables: Record<string, unknown>;
  context?: UserContext;
  additionalInstructions?: string;
}

export interface DocumentGenerationResponse {
  content: string;
  title: string;
  metadata: {
    templateUsed?: string;
    generatedAt: Date;
    variables: Record<string, unknown>;
  };
}

export interface EventPlanningRequest {
  eventType: string;
  eventName: string;
  startDate: Date;
  endDate?: Date;
  context?: UserContext;
  additionalRequirements?: string;
}

export interface EventPlanningResponse {
  checklist: ChecklistCategory[];
  preparationTimeline: PreparationTask[];
  tips: string[];
  warnings: string[];
  relatedDocuments: string[];
}

export interface ChecklistCategory {
  category: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  isRequired: boolean;
  isCompleted?: boolean;
}

export interface PreparationTask {
  daysBeforeEvent: number;
  tasks: string[];
}

export interface TaskRecommendation {
  taskId: string;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category: string;
  estimatedHours?: number;
  relevanceScore: number;
  reason: string;
}

export interface WorkflowStep {
  order: number;
  title: string;
  description?: string;
  checkItems: {
    id: string;
    text: string;
    isOptional?: boolean;
    isCompleted?: boolean;
  }[];
  tips?: string[];
  warnings?: string[];
  estimatedTime?: number;
  relatedDocs?: string[];
}

export interface WorkflowGuidance {
  currentStep: WorkflowStep;
  nextStep?: WorkflowStep;
  previousStep?: WorkflowStep;
  progress: number;
  totalSteps: number;
  aiSuggestions?: string[];
}
