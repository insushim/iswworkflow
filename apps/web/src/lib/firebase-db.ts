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
} from 'firebase/firestore';
import { db } from './firebase';

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
  const taskRef = doc(db, Collections.TASKS, taskId);
  await updateDoc(taskRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTask(taskId: string) {
  const taskRef = doc(db, Collections.TASKS, taskId);
  await deleteDoc(taskRef);
}

// 문서(Document) CRUD
export async function createDocument(userId: string, docData: Omit<Document, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) {
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
  const docRef = doc(db, Collections.DOCUMENTS, docId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(docId: string) {
  const docRef = doc(db, Collections.DOCUMENTS, docId);
  await deleteDoc(docRef);
}

// 캘린더 이벤트 CRUD
export async function createCalendarEvent(userId: string, eventData: Omit<CalendarEvent, 'id' | 'userId' | 'createdAt'>) {
  const eventsRef = collection(db, Collections.CALENDAR_EVENTS);
  const docRef = await addDoc(eventsRef, {
    ...eventData,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getUserCalendarEvents(userId: string) {
  const eventsRef = collection(db, Collections.CALENDAR_EVENTS);
  const q = query(
    eventsRef,
    where('userId', '==', userId),
    orderBy('date', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as CalendarEvent));
}

export async function updateCalendarEvent(eventId: string, updates: Partial<CalendarEvent>) {
  const eventRef = doc(db, Collections.CALENDAR_EVENTS, eventId);
  await updateDoc(eventRef, updates);
}

export async function deleteCalendarEvent(eventId: string) {
  const eventRef = doc(db, Collections.CALENDAR_EVENTS, eventId);
  await deleteDoc(eventRef);
}

// 채팅 기록 저장
export async function saveChatMessage(userId: string, role: 'user' | 'assistant', content: string) {
  const chatRef = collection(db, Collections.CHAT_HISTORY);
  await addDoc(chatRef, {
    userId,
    role,
    content,
    createdAt: serverTimestamp(),
  });
}

export async function getUserChatHistory(userId: string, limitCount: number = 50) {
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
  const workflowsRef = collection(db, Collections.WORKFLOWS);
  const q = query(workflowsRef, orderBy('category', 'asc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Workflow));
}

export async function getWorkflow(workflowId: string) {
  const workflowRef = doc(db, Collections.WORKFLOWS, workflowId);
  const snapshot = await getDoc(workflowRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as Workflow;
  }
  return null;
}

// 워크플로우 진행 상태
export async function getUserWorkflowProgress(userId: string) {
  const progressRef = collection(db, Collections.WORKFLOW_PROGRESS);
  const q = query(progressRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as WorkflowProgress));
}

export async function getWorkflowProgress(userId: string, workflowId: string) {
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
  const settingsRef = doc(db, Collections.USER_SETTINGS, userId);
  const snapshot = await getDoc(settingsRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() } as UserSettings;
  }
  return null;
}

export async function saveUserSettings(userId: string, settings: Partial<UserSettings>) {
  const settingsRef = doc(db, Collections.USER_SETTINGS, userId);
  await setDoc(settingsRef, {
    ...settings,
    userId,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

// 초기 워크플로우 데이터 생성 (관리자용)
export async function initializeWorkflows() {
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
    {
      title: '현장체험학습 계획',
      description: '장소 선정부터 결과 보고서 작성까지',
      category: '행사',
      totalSteps: 10,
      steps: [
        { id: 'step1', title: '장소 선정', description: '체험학습 장소를 선정합니다', order: 1 },
        { id: 'step2', title: '사전답사', description: '장소 사전답사를 진행합니다', order: 2 },
        { id: 'step3', title: '계획서 작성', description: '체험학습 계획서를 작성합니다', order: 3 },
        { id: 'step4', title: '결재 받기', description: '계획서 결재를 받습니다', order: 4 },
        { id: 'step5', title: '안내문 발송', description: '가정통신문을 발송합니다', order: 5 },
        { id: 'step6', title: '참가비 수합', description: '참가비를 수합합니다', order: 6 },
        { id: 'step7', title: '인솔교사 배정', description: '인솔교사를 배정합니다', order: 7 },
        { id: 'step8', title: '안전교육', description: '사전 안전교육을 실시합니다', order: 8 },
        { id: 'step9', title: '체험학습 실시', description: '현장체험학습을 실시합니다', order: 9 },
        { id: 'step10', title: '결과보고서 작성', description: '결과보고서를 작성합니다', order: 10 },
      ],
      estimatedTime: '1시간',
      difficulty: 'hard',
    },
    {
      title: '안전교육 실시',
      description: '교육 계획 수립부터 NEIS 입력까지',
      category: '안전',
      totalSteps: 5,
      steps: [
        { id: 'step1', title: '교육 자료 준비', description: '안전교육 자료를 준비합니다', order: 1 },
        { id: 'step2', title: '교육 계획 수립', description: '교육 계획을 수립합니다', order: 2 },
        { id: 'step3', title: '안전교육 실시', description: '안전교육을 실시합니다', order: 3 },
        { id: 'step4', title: '교육 결과 기록', description: '교육 결과를 기록합니다', order: 4 },
        { id: 'step5', title: 'NEIS 입력', description: 'NEIS에 입력합니다', order: 5 },
      ],
      estimatedTime: '20분',
      difficulty: 'easy',
    },
    {
      title: '수행평가 계획 및 실시',
      description: '평가 계획 수립부터 성적 산출까지',
      category: '평가',
      totalSteps: 7,
      steps: [
        { id: 'step1', title: '평가 계획 수립', description: '수행평가 계획을 수립합니다', order: 1 },
        { id: 'step2', title: '평가 기준 작성', description: '평가 기준안을 작성합니다', order: 2 },
        { id: 'step3', title: '평가 도구 제작', description: '평가 도구를 제작합니다', order: 3 },
        { id: 'step4', title: '수행평가 실시', description: '수행평가를 실시합니다', order: 4 },
        { id: 'step5', title: '채점 및 기록', description: '채점하고 기록합니다', order: 5 },
        { id: 'step6', title: '성적 산출', description: '성적을 산출합니다', order: 6 },
        { id: 'step7', title: 'NEIS 입력', description: 'NEIS에 입력합니다', order: 7 },
      ],
      estimatedTime: '40분',
      difficulty: 'medium',
    },
    {
      title: '가정통신문 작성 및 배포',
      description: '문서 작성부터 회신 확인까지',
      category: '문서작성',
      totalSteps: 4,
      steps: [
        { id: 'step1', title: '내용 작성', description: '가정통신문 내용을 작성합니다', order: 1 },
        { id: 'step2', title: '결재 받기', description: '결재를 받습니다', order: 2 },
        { id: 'step3', title: '배포', description: '학생들에게 배포합니다', order: 3 },
        { id: 'step4', title: '회신 확인', description: '회신을 확인합니다', order: 4 },
      ],
      estimatedTime: '15분',
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
