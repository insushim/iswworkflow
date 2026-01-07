import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore, Timestamp } from 'firebase-admin/firestore';

// Firebase Admin SDK 초기화
let adminApp: App;
let adminDb: Firestore;

// 서버 사이드 Firebase Admin 초기화
function initializeFirebaseAdmin(): App {
  if (getApps().length === 0) {
    // 환경변수에서 서비스 계정 정보 가져오기 (없으면 기본 인증 사용)
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccount) {
      try {
        const parsedServiceAccount = JSON.parse(serviceAccount);
        return initializeApp({
          credential: cert(parsedServiceAccount),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'isw-workflow',
        });
      } catch {
        // JSON 파싱 실패시 기본 인증 사용
        return initializeApp({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'isw-workflow',
        });
      }
    }

    // 서비스 계정 없이 초기화 (Firebase Hosting/Cloud Run에서는 자동 인증)
    return initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'isw-workflow',
    });
  }
  return getApps()[0];
}

try {
  adminApp = initializeFirebaseAdmin();
  adminDb = getFirestore(adminApp);
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

// 컬렉션 이름
export const Collections = {
  USERS: 'users',
  TASKS: 'tasks',
  DOCUMENTS: 'documents',
  WORKFLOWS: 'workflows',
  WORKFLOW_PROGRESS: 'workflowProgress',
  CALENDAR_EVENTS: 'calendarEvents',
  CHAT_HISTORY: 'chatHistory',
  USER_SETTINGS: 'userSettings',
} as const;

// 타입 정의
export interface Task {
  id?: string;
  userId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  category: string;
  progress: number;
  dueDate: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CalendarEvent {
  id?: string;
  userId: string;
  title: string;
  description?: string;
  startDate: Timestamp | null;
  endDate?: Timestamp | null;
  time?: string;
  location?: string;
  type: 'deadline' | 'meeting' | 'event' | 'reminder' | 'holiday';
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
  createdAt: Timestamp;
}

export interface Workflow {
  id?: string;
  title: string;
  description: string;
  category: string;
  totalSteps: number;
  steps: WorkflowStep[];
  estimatedTime: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: Timestamp;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  order: number;
  checkItems?: { id: string; text: string; isOptional: boolean }[];
  tips?: string[];
  warnings?: string[];
  estimatedTime?: number;
}

// Task 관련 함수
export async function getAllTasks(filters?: {
  month?: number;
  category?: string;
  priority?: string;
  status?: string;
}) {
  try {
    let query: FirebaseFirestore.Query = adminDb.collection(Collections.TASKS);

    // 필터 적용
    if (filters?.category) {
      query = query.where('category', '==', filters.category);
    }
    if (filters?.priority) {
      query = query.where('priority', '==', filters.priority.toLowerCase());
    }
    if (filters?.status) {
      query = query.where('status', '==', filters.status.toLowerCase());
    }

    query = query.orderBy('createdAt', 'desc');

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function createTaskAdmin(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await adminDb.collection(Collections.TASKS).add({
      ...taskData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// Calendar Event 관련 함수
export async function getAllCalendarEvents(filters?: {
  startDate?: string;
  endDate?: string;
  type?: string;
}) {
  try {
    let query: FirebaseFirestore.Query = adminDb.collection(Collections.CALENDAR_EVENTS);

    if (filters?.type) {
      query = query.where('type', '==', filters.type);
    }

    query = query.orderBy('startDate', 'asc');

    const snapshot = await query.get();
    let events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CalendarEvent[];

    // 날짜 필터링 (클라이언트 사이드)
    if (filters?.startDate) {
      const start = new Date(filters.startDate);
      events = events.filter((e) => e.startDate && e.startDate.toDate() >= start);
    }
    if (filters?.endDate) {
      const end = new Date(filters.endDate);
      events = events.filter((e) => e.startDate && e.startDate.toDate() <= end);
    }

    return events;
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
}

export async function createCalendarEventAdmin(eventData: Omit<CalendarEvent, 'id' | 'createdAt'>) {
  try {
    const docRef = await adminDb.collection(Collections.CALENDAR_EVENTS).add({
      ...eventData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating calendar event:', error);
    throw error;
  }
}

// Workflow 관련 함수
export async function getAllWorkflows() {
  try {
    const snapshot = await adminDb
      .collection(Collections.WORKFLOWS)
      .orderBy('category', 'asc')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Workflow[];
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return [];
  }
}

export async function getWorkflowById(workflowId: string) {
  try {
    const doc = await adminDb.collection(Collections.WORKFLOWS).doc(workflowId).get();

    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      ...doc.data(),
    } as Workflow;
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return null;
  }
}

export { adminDb, Timestamp };
