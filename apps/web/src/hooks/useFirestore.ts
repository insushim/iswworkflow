'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Task,
  Document,
  CalendarEvent,
  Workflow,
  WorkflowProgress,
  UserSettings,
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
  getUserDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  getUserCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  saveChatMessage,
  getUserChatHistory,
  getWorkflows,
  getUserWorkflowProgress,
  createOrUpdateWorkflowProgress,
  getUserSettings,
  saveUserSettings,
} from '@/lib/firebase-db';
import { Timestamp } from 'firebase/firestore';

// 오프라인 에러 체크 유틸
function isOfflineError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('offline') ||
      error.message.includes('Failed to get document') ||
      error.message.includes('network') ||
      error.name === 'FirebaseError'
    );
  }
  return false;
}

// 타임아웃이 있는 Promise
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    ),
  ]);
}

// 재시도 로직이 있는 fetch 함수
async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries: number = 2,
  delay: number = 500,
  timeout: number = 5000
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await withTimeout(fetchFn(), timeout);
    } catch (err) {
      lastError = err;
      if ((isOfflineError(err) || (err instanceof Error && err.message === 'Request timeout')) && i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}

// Task Hook
export function useTasks() {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const hasFetched = useRef(false);

  const fetchTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedTasks = await fetchWithRetry(() => getUserTasks(user.uid));
      setTasks(fetchedTasks);
      setError(null);
      setIsOffline(false);
    } catch (err) {
      if (isOfflineError(err) || (err instanceof Error && err.message === 'Request timeout')) {
        setIsOffline(true);
        setTasks([]);
        setError('네트워크 연결을 확인해주세요.');
      } else {
        setError('업무를 불러오는데 실패했습니다.');
      }
      console.error('Tasks fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // 인증 로딩이 완료된 후에만 실행
    if (authLoading) return;

    if (!hasFetched.current || user) {
      hasFetched.current = true;
      fetchTasks();
    }
  }, [fetchTasks, authLoading, user]);

  const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return null;
    try {
      const id = await createTask(user.uid, taskData);
      await fetchTasks();
      return id;
    } catch (err) {
      setError('업무 추가에 실패했습니다.');
      console.error(err);
      return null;
    }
  };

  const editTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      await updateTask(taskId, updates);
      await fetchTasks();
    } catch (err) {
      setError('업무 수정에 실패했습니다.');
      console.error(err);
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (err) {
      setError('업무 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return {
    tasks,
    loading: authLoading || loading,
    error,
    isOffline,
    addTask,
    editTask,
    removeTask,
    refetch: fetchTasks,
  };
}

// Document Hook
export function useDocuments() {
  const { user, loading: authLoading } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const hasFetched = useRef(false);

  const fetchDocuments = useCallback(async () => {
    if (!user) {
      setDocuments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedDocs = await fetchWithRetry(() => getUserDocuments(user.uid));
      setDocuments(fetchedDocs);
      setError(null);
      setIsOffline(false);
    } catch (err) {
      if (isOfflineError(err) || (err instanceof Error && err.message === 'Request timeout')) {
        setIsOffline(true);
        setDocuments([]);
        setError('네트워크 연결을 확인해주세요.');
      } else {
        setError('문서를 불러오는데 실패했습니다.');
      }
      console.error('Documents fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    if (!hasFetched.current || user) {
      hasFetched.current = true;
      fetchDocuments();
    }
  }, [fetchDocuments, authLoading, user]);

  const addDocument = async (docData: Omit<Document, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return null;
    try {
      const id = await createDocument(user.uid, docData);
      await fetchDocuments();
      return id;
    } catch (err) {
      setError('문서 추가에 실패했습니다.');
      console.error(err);
      return null;
    }
  };

  const editDocument = async (docId: string, updates: Partial<Document>) => {
    try {
      await updateDocument(docId, updates);
      await fetchDocuments();
    } catch (err) {
      setError('문서 수정에 실패했습니다.');
      console.error(err);
    }
  };

  const removeDocument = async (docId: string) => {
    try {
      await deleteDocument(docId);
      await fetchDocuments();
    } catch (err) {
      setError('문서 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return {
    documents,
    loading: authLoading || loading,
    error,
    isOffline,
    addDocument,
    editDocument,
    removeDocument,
    refetch: fetchDocuments,
  };
}

// Calendar Events Hook
export function useCalendarEvents() {
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const hasFetched = useRef(false);

  const fetchEvents = useCallback(async () => {
    if (!user) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedEvents = await fetchWithRetry(() => getUserCalendarEvents(user.uid));
      setEvents(fetchedEvents);
      setError(null);
      setIsOffline(false);
    } catch (err) {
      if (isOfflineError(err) || (err instanceof Error && err.message === 'Request timeout')) {
        setIsOffline(true);
        setEvents([]);
        setError('네트워크 연결을 확인해주세요.');
      } else {
        setError('일정을 불러오는데 실패했습니다.');
      }
      console.error('Calendar events fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    if (!hasFetched.current || user) {
      hasFetched.current = true;
      fetchEvents();
    }
  }, [fetchEvents, authLoading, user]);

  const addEvent = async (eventData: Omit<CalendarEvent, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return null;
    try {
      const id = await createCalendarEvent(user.uid, eventData);
      await fetchEvents();
      return id;
    } catch (err) {
      setError('일정 추가에 실패했습니다.');
      console.error(err);
      return null;
    }
  };

  const editEvent = async (eventId: string, updates: Partial<CalendarEvent>) => {
    try {
      await updateCalendarEvent(eventId, updates);
      await fetchEvents();
    } catch (err) {
      setError('일정 수정에 실패했습니다.');
      console.error(err);
    }
  };

  const removeEvent = async (eventId: string) => {
    try {
      await deleteCalendarEvent(eventId);
      await fetchEvents();
    } catch (err) {
      setError('일정 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return {
    events,
    loading: authLoading || loading,
    error,
    isOffline,
    addEvent,
    editEvent,
    removeEvent,
    refetch: fetchEvents,
  };
}

// Chat History Hook
export function useChatHistory(limitCount: number = 50) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!user) {
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const history = await getUserChatHistory(user.uid, limitCount);
      setMessages(history as { role: string; content: string }[]);
    } catch (err) {
      console.error('채팅 기록 로드 실패:', err);
    } finally {
      setLoading(false);
    }
  }, [user, limitCount]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const addMessage = async (role: 'user' | 'assistant', content: string) => {
    if (!user) return;
    try {
      await saveChatMessage(user.uid, role, content);
      setMessages((prev) => [...prev, { role, content }]);
    } catch (err) {
      console.error('메시지 저장 실패:', err);
    }
  };

  return {
    messages,
    loading,
    addMessage,
    refetch: fetchHistory,
  };
}

// Helper function to convert date to Timestamp
export function dateToTimestamp(date: Date | null): Timestamp | null {
  if (!date) return null;
  return Timestamp.fromDate(date);
}

// Helper function to convert Timestamp to Date
export function timestampToDate(timestamp: Timestamp | null): Date | null {
  if (!timestamp) return null;
  return timestamp.toDate();
}

// Workflow Hook
export function useWorkflows() {
  const { user } = useAuth();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [progress, setProgress] = useState<Map<string, WorkflowProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkflows = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedWorkflows = await getWorkflows();
      setWorkflows(fetchedWorkflows);

      if (user) {
        const userProgress = await getUserWorkflowProgress(user.uid);
        const progressMap = new Map<string, WorkflowProgress>();
        userProgress.forEach((p) => progressMap.set(p.workflowId, p));
        setProgress(progressMap);
      }

      setError(null);
    } catch (err) {
      setError('워크플로우를 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const updateProgress = async (workflowId: string, completedSteps: string[], totalSteps: number) => {
    if (!user) return;
    try {
      await createOrUpdateWorkflowProgress(user.uid, workflowId, completedSteps, totalSteps);
      await fetchWorkflows();
    } catch (err) {
      setError('진행 상태 업데이트에 실패했습니다.');
      console.error(err);
    }
  };

  const getProgressForWorkflow = (workflowId: string) => {
    return progress.get(workflowId);
  };

  return {
    workflows,
    progress,
    loading,
    error,
    updateProgress,
    getProgressForWorkflow,
    refetch: fetchWorkflows,
  };
}

// User Settings Hook
export function useUserSettings() {
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchSettings = useCallback(async () => {
    if (!user) {
      setSettings(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedSettings = await fetchWithRetry(() => getUserSettings(user.uid));
      setSettings(fetchedSettings);
      setError(null);
    } catch (err) {
      // 타임아웃 또는 오프라인 에러시 빈 설정 반환 (로딩 무한 방지)
      if (isOfflineError(err) || (err instanceof Error && err.message === 'Request timeout')) {
        setSettings(null);
        setError(null);
      } else {
        setError('설정을 불러오는데 실패했습니다.');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // 인증 로딩이 완료된 후에만 설정 로드
    if (authLoading) return;

    if (!hasFetched.current || user) {
      hasFetched.current = true;
      fetchSettings();
    }
  }, [fetchSettings, authLoading, user]);

  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!user) return;
    try {
      await saveUserSettings(user.uid, updates);
      await fetchSettings();
    } catch (err) {
      setError('설정 저장에 실패했습니다.');
      console.error(err);
    }
  };

  return {
    settings,
    loading: authLoading || loading,
    error,
    updateSettings,
    refetch: fetchSettings,
  };
}
