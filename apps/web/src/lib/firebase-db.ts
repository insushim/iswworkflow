'use client';

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  Firestore,
} from 'firebase/firestore';

// 지연 로딩을 위한 db getter
let _db: Firestore | null = null;
async function getDb(): Promise<Firestore> {
  if (!_db) {
    const { getDbInstance } = await import('./firebase');
    _db = getDbInstance();
  }
  return _db;
}

// 컬렉션 참조
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

export interface Document {
  id?: string;
  userId: string;
  title: string;
  type: string;
  content: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED';
  isStarred: boolean;
  isGenerated: boolean;
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
}

export interface WorkflowProgress {
  id?: string;
  userId: string;
  workflowId: string;
  completedSteps: string[];
  startedAt: Timestamp;
  updatedAt: Timestamp;
  isCompleted: boolean;
}

export interface UserSettings {
  id?: string;
  userId: string;
  displayName: string;
  email: string;
  school: string;
  classInfo: string;
  roles: string[];
  educationOfficeId?: string; // 시도교육청 ID
  notifications: {
    email: boolean;
    push: boolean;
    deadlineReminder: boolean;
    weeklyReport: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  updatedAt: Timestamp;
}

// 업무(Task) CRUD
export async function createTask(userId: string, taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  const tasksRef = collection(db, Collections.TASKS);
  const docRef = await addDoc(tasksRef, {
    ...taskData,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserTasks(userId: string) {
  const db = await getDb();
  const tasksRef = collection(db, Collections.TASKS);
  const q = query(
    tasksRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task));
}

export async function updateTask(taskId: string, updates: Partial<Task>) {
  const db = await getDb();
  const taskRef = doc(db, Collections.TASKS, taskId);
  await updateDoc(taskRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTask(taskId: string) {
  const db = await getDb();
  const taskRef = doc(db, Collections.TASKS, taskId);
  await deleteDoc(taskRef);
}

// 문서(Document) CRUD
export async function createDocument(userId: string, docData: Omit<Document, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  const docsRef = collection(db, Collections.DOCUMENTS);
  const docRef = await addDoc(docsRef, {
    ...docData,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserDocuments(userId: string) {
  const db = await getDb();
  const docsRef = collection(db, Collections.DOCUMENTS);
  const q = query(
    docsRef,
    where('userId', '==', userId),
    orderBy('updatedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Document));
}

export async function updateDocument(docId: string, updates: Partial<Document>) {
  const db = await getDb();
  const docRef = doc(db, Collections.DOCUMENTS, docId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(docId: string) {
  const db = await getDb();
  const docRef = doc(db, Collections.DOCUMENTS, docId);
  await deleteDoc(docRef);
}

// 캘린더 이벤트 CRUD
export async function createCalendarEvent(userId: string, eventData: Omit<CalendarEvent, 'id' | 'userId' | 'createdAt'>) {
  const db = await getDb();
  const eventsRef = collection(db, Collections.CALENDAR_EVENTS);
  const docRef = await addDoc(eventsRef, {
    ...eventData,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserCalendarEvents(userId: string) {
  const db = await getDb();
  const eventsRef = collection(db, Collections.CALENDAR_EVENTS);
  const q = query(
    eventsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CalendarEvent));
}

export async function updateCalendarEvent(eventId: string, updates: Partial<CalendarEvent>) {
  const db = await getDb();
  const eventRef = doc(db, Collections.CALENDAR_EVENTS, eventId);
  await updateDoc(eventRef, updates);
}

export async function deleteCalendarEvent(eventId: string) {
  const db = await getDb();
  const eventRef = doc(db, Collections.CALENDAR_EVENTS, eventId);
  await deleteDoc(eventRef);
}

// 채팅 기록 저장
export async function saveChatMessage(userId: string, role: 'user' | 'assistant', content: string) {
  const db = await getDb();
  const chatRef = collection(db, Collections.CHAT_HISTORY);
  await addDoc(chatRef, {
    userId,
    role,
    content,
    createdAt: serverTimestamp(),
  });
}

export async function getUserChatHistory(userId: string, limitCount: number = 50) {
  const db = await getDb();
  const chatRef = collection(db, Collections.CHAT_HISTORY);
  const q = query(
    chatRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => doc.data()).reverse();
}

// 워크플로우 CRUD
export async function getWorkflows() {
  const db = await getDb();
  const workflowsRef = collection(db, Collections.WORKFLOWS);
  const q = query(workflowsRef, orderBy('category', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Workflow));
}

export async function getWorkflow(workflowId: string) {
  const db = await getDb();
  const workflowRef = doc(db, Collections.WORKFLOWS, workflowId);
  const snapshot = await getDoc(workflowRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Workflow;
  }
  return null;
}

// 워크플로우 진행 상태
export async function getUserWorkflowProgress(userId: string) {
  const db = await getDb();
  const progressRef = collection(db, Collections.WORKFLOW_PROGRESS);
  const q = query(progressRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as WorkflowProgress));
}

export async function getWorkflowProgress(userId: string, workflowId: string) {
  const db = await getDb();
  const progressRef = collection(db, Collections.WORKFLOW_PROGRESS);
  const q = query(
    progressRef,
    where('userId', '==', userId),
    where('workflowId', '==', workflowId)
  );
  const snapshot = await getDocs(q);
  if (snapshot.docs.length > 0) {
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as WorkflowProgress;
  }
  return null;
}

export async function createOrUpdateWorkflowProgress(
  userId: string,
  workflowId: string,
  completedSteps: string[],
  totalSteps: number
) {
  const db = await getDb();
  const existing = await getWorkflowProgress(userId, workflowId);

  if (existing) {
    const progressRef = doc(db, Collections.WORKFLOW_PROGRESS, existing.id!);
    await updateDoc(progressRef, {
      completedSteps,
      isCompleted: completedSteps.length >= totalSteps,
      updatedAt: serverTimestamp(),
    });
    return existing.id;
  } else {
    const progressRef = collection(db, Collections.WORKFLOW_PROGRESS);
    const docRef = await addDoc(progressRef, {
      userId,
      workflowId,
      completedSteps,
      isCompleted: completedSteps.length >= totalSteps,
      startedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  }
}

// 사용자 설정
export async function getUserSettings(userId: string) {
  const db = await getDb();
  const settingsRef = doc(db, Collections.USER_SETTINGS, userId);
  const snapshot = await getDoc(settingsRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as UserSettings;
  }
  return null;
}

export async function saveUserSettings(userId: string, settings: Partial<UserSettings>) {
  const startTime = performance.now();
  console.log('🟢 [saveUserSettings] 시작', { userId, settings });

  try {
    console.log('🟢 [saveUserSettings] getDb() 호출 중...', `+${(performance.now() - startTime).toFixed(0)}ms`);
    const db = await getDb();
    console.log('🟢 [saveUserSettings] getDb() 완료', `+${(performance.now() - startTime).toFixed(0)}ms`);

    const settingsRef = doc(db, Collections.USER_SETTINGS, userId);
    console.log('🟢 [saveUserSettings] setDoc() 호출 중...', `+${(performance.now() - startTime).toFixed(0)}ms`);

    await setDoc(settingsRef, {
      ...settings,
      userId,
      updatedAt: serverTimestamp(),
    }, { merge: true });

    console.log('🟢 [saveUserSettings] setDoc() 완료!', `+${(performance.now() - startTime).toFixed(0)}ms`);
  } catch (error) {
    console.error('🔴 [saveUserSettings] 에러 발생', `+${(performance.now() - startTime).toFixed(0)}ms`, error);
    throw error;
  }
}

// 초기 워크플로우 데이터 생성 (관리자용)
export async function initializeWorkflows() {
  const db = await getDb();
  const workflows = [
    {
      title: '학급경영록 작성',
      description: '월별 학급경영 계획 수립부터 실적 기록까지의 전체 과정',
      category: '학급경영',
      totalSteps: 8,
      steps: [
        { id: 'step1', title: '월별 목표 설정', description: '이번 달 학급경영 목표를 설정합니다', order: 1 },
        { id: 'step2', title: '주간 계획 수립', description: '주별 세부 계획을 작성합니다', order: 2 },
        { id: 'step3', title: '학급 활동 기록', description: '진행한 학급 활동을 기록합니다', order: 3 },
        { id: 'step4', title: '학생 관찰 기록', description: '학생별 특이사항을 기록합니다', order: 4 },
        { id: 'step5', title: '학부모 상담 기록', description: '학부모 상담 내용을 기록합니다', order: 5 },
        { id: 'step6', title: '생활지도 기록', description: '생활지도 사항을 기록합니다', order: 6 },
        { id: 'step7', title: '월말 평가', description: '월별 목표 달성 여부를 평가합니다', order: 7 },
        { id: 'step8', title: '다음 달 계획', description: '다음 달 개선 사항을 반영합니다', order: 8 },
      ],
      estimatedTime: '30분',
      difficulty: 'medium',
    },
    {
      title: '학부모 상담 진행',
      description: '상담 안내문 발송부터 상담 결과 기록까지',
      category: '학부모',
      totalSteps: 6,
      steps: [
        { id: 'step1', title: '상담 일정 조율', description: '학부모와 상담 일정을 조율합니다', order: 1 },
        { id: 'step2', title: '안내문 발송', description: '상담 안내문을 발송합니다', order: 2 },
        { id: 'step3', title: '상담 자료 준비', description: '학생 자료를 준비합니다', order: 3 },
        { id: 'step4', title: '상담 진행', description: '학부모 상담을 진행합니다', order: 4 },
        { id: 'step5', title: '상담 기록 작성', description: '상담 내용을 기록합니다', order: 5 },
        { id: 'step6', title: '후속 조치', description: '필요한 후속 조치를 진행합니다', order: 6 },
      ],
      estimatedTime: '45분',
      difficulty: 'easy',
    },
  ];

  const workflowsRef = collection(db, Collections.WORKFLOWS);

  for (const workflow of workflows) {
    await addDoc(workflowsRef, {
      ...workflow,
      createdAt: serverTimestamp(),
    });
  }
}
