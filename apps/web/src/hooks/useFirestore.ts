'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type {
  Task,
  Document,
  CalendarEvent,
  Workflow,
  WorkflowProgress,
  UserSettings,
} from '@/lib/firebase-db';

// Firebase Timestamp 타입만 import (실제 객체는 지연 로딩)
import type { Timestamp } from 'firebase/firestore';

// ============================================
// 🔴 상세 디버그 로거 (콘솔에서 성능 병목 확인용)
// ============================================
const DEBUG = true; // 프로덕션에서는 false로 변경
const debugLog = (category: string, message: string, data?: unknown) => {
  if (!DEBUG) return;
  const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);
  const prefix = {
    'AUTH': '🔐',
    'FIREBASE': '🔥',
    'FETCH': '📡',
    'TIMEOUT': '⏱️',
    'ERROR': '❌',
    'SUCCESS': '✅',
    'CACHE': '💾',
    'RENDER': '🎨',
  }[category] || '📌';

  console.log(
    `%c[${timestamp}] ${prefix} [${category}] ${message}`,
    `color: ${category === 'ERROR' ? 'red' : category === 'SUCCESS' ? 'green' : category === 'TIMEOUT' ? 'orange' : 'blue'}; font-weight: bold;`,
    data !== undefined ? data : ''
  );
};

// 성능 측정 유틸
const measureTime = async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
  const start = performance.now();
  debugLog('FETCH', `${label} 시작...`);
  try {
    const result = await fn();
    const elapsed = (performance.now() - start).toFixed(2);
    debugLog('SUCCESS', `${label} 완료 (${elapsed}ms)`);
    return result;
  } catch (error) {
    const elapsed = (performance.now() - start).toFixed(2);
    debugLog('ERROR', `${label} 실패 (${elapsed}ms)`, error);
    throw error;
  }
};

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

// 지연 로딩된 firebase-db 모듈 캐시
let firebaseDbModule: typeof import('@/lib/firebase-db') | null = null;
let firebaseLoadStart: number | null = null;

async function getFirebaseDb() {
  if (!firebaseDbModule) {
    firebaseLoadStart = performance.now();
    debugLog('FIREBASE', 'Firebase 모듈 로딩 시작...');
    firebaseDbModule = await import('@/lib/firebase-db');
    const elapsed = (performance.now() - firebaseLoadStart).toFixed(2);
    debugLog('FIREBASE', `Firebase 모듈 로딩 완료 (${elapsed}ms)`);
  } else {
    debugLog('CACHE', 'Firebase 모듈 캐시 사용');
  }
  return firebaseDbModule;
}

// 🔄 로딩 중 표시용 빈 배열 (로그인 후 실제 데이터로 교체됨)
// 기본 데이터는 Firebase에서 로드되므로 빈 상태로 시작
const DEFAULT_TASKS: Task[] = [];

// Task Hook - 즉시 로딩 패턴 (기본 데이터 먼저 표시)
export function useTasks() {
  const { user } = useAuth();
  // 🚀 기본 데이터로 즉시 초기화 - 로딩 없음
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [loading, setLoading] = useState(false); // 즉시 false
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const isMounted = useRef(true);

  // 백그라운드에서 Firebase 데이터 로드
  const fetchTasks = useCallback(async () => {
    if (!user) return;

    try {
      const { getUserTasks } = await getFirebaseDb();
      const fetchedTasks = await getUserTasks(user.uid);

      if (!isMounted.current) return;

      if (fetchedTasks && fetchedTasks.length > 0) {
        setTasks(fetchedTasks);
      }
      setIsOffline(false);
    } catch (err) {
      if (!isMounted.current) return;
      if (isOfflineError(err)) {
        setIsOffline(true);
      }
      // 에러 시 기본 데이터 유지
    }
  }, [user]);

  useEffect(() => {
    isMounted.current = true;
    // 백그라운드에서 Firebase 로드 (UI 블로킹 없음)
    fetchTasks();
    return () => { isMounted.current = false; };
  }, [fetchTasks]);

  const addTask = async (taskData: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return null;
    try {
      const { createTask } = await getFirebaseDb();
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
      const { updateTask } = await getFirebaseDb();
      await updateTask(taskId, updates);
      await fetchTasks();
    } catch (err) {
      setError('업무 수정에 실패했습니다.');
      console.error(err);
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      const { deleteTask } = await getFirebaseDb();
      await deleteTask(taskId);
      await fetchTasks();
    } catch (err) {
      setError('업무 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return {
    tasks,
    loading, // 항상 false - 즉시 표시
    error,
    isOffline,
    addTask,
    editTask,
    removeTask,
    refetch: fetchTasks,
  };
}

// 🔄 로딩 중 표시용 빈 배열 (로그인 후 실제 데이터로 교체됨)
const DEFAULT_DOCUMENTS: Document[] = [];

// Document Hook - 즉시 로딩 패턴 (기본 데이터 먼저 표시)
export function useDocuments() {
  const { user } = useAuth();
  // 🚀 기본 데이터로 즉시 초기화 - 로딩 없음
  const [documents, setDocuments] = useState<Document[]>(DEFAULT_DOCUMENTS);
  const [loading, setLoading] = useState(false); // 즉시 false
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const isMounted = useRef(true);

  // 백그라운드에서 Firebase 데이터 로드
  const fetchDocuments = useCallback(async () => {
    if (!user) return;

    try {
      const { getUserDocuments } = await getFirebaseDb();
      const fetchedDocs = await getUserDocuments(user.uid);

      if (!isMounted.current) return;

      if (fetchedDocs && fetchedDocs.length > 0) {
        setDocuments(fetchedDocs);
      }
      setIsOffline(false);
    } catch (err) {
      if (!isMounted.current) return;
      if (isOfflineError(err)) {
        setIsOffline(true);
      }
      // 에러 시 기본 데이터 유지
    }
  }, [user]);

  useEffect(() => {
    isMounted.current = true;
    // 백그라운드에서 Firebase 로드 (UI 블로킹 없음)
    fetchDocuments();
    return () => { isMounted.current = false; };
  }, [fetchDocuments]);

  const addDocument = async (docData: Omit<Document, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return null;
    try {
      const { createDocument } = await getFirebaseDb();
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
      const { updateDocument } = await getFirebaseDb();
      await updateDocument(docId, updates);
      await fetchDocuments();
    } catch (err) {
      setError('문서 수정에 실패했습니다.');
      console.error(err);
    }
  };

  const removeDocument = async (docId: string) => {
    try {
      const { deleteDocument } = await getFirebaseDb();
      await deleteDocument(docId);
      await fetchDocuments();
    } catch (err) {
      setError('문서 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return {
    documents,
    loading, // 항상 false - 즉시 표시
    error,
    isOffline,
    addDocument,
    editDocument,
    removeDocument,
    refetch: fetchDocuments,
  };
}

// 🔄 로딩 중 표시용 빈 배열 (로그인 후 실제 데이터로 교체됨)
const DEFAULT_EVENTS: CalendarEvent[] = [];

// Calendar Events Hook - 즉시 로딩 패턴 (기본 데이터 먼저 표시)
export function useCalendarEvents() {
  const { user } = useAuth();
  // 🚀 기본 데이터로 즉시 초기화 - 로딩 없음
  const [events, setEvents] = useState<CalendarEvent[]>(DEFAULT_EVENTS);
  const [loading, setLoading] = useState(false); // 즉시 false
  const [error, setError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const isMounted = useRef(true);

  // 백그라운드에서 Firebase 데이터 로드
  const fetchEvents = useCallback(async () => {
    if (!user) return;

    try {
      const { getUserCalendarEvents } = await getFirebaseDb();
      const fetchedEvents = await getUserCalendarEvents(user.uid);

      if (!isMounted.current) return;

      if (fetchedEvents && fetchedEvents.length > 0) {
        setEvents(fetchedEvents);
      }
      setIsOffline(false);
    } catch (err) {
      if (!isMounted.current) return;
      if (isOfflineError(err)) {
        setIsOffline(true);
      }
      // 에러 시 기본 데이터 유지
    }
  }, [user]);

  useEffect(() => {
    isMounted.current = true;
    // 백그라운드에서 Firebase 로드 (UI 블로킹 없음)
    fetchEvents();
    return () => { isMounted.current = false; };
  }, [fetchEvents]);

  const addEvent = async (eventData: Omit<CalendarEvent, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return null;
    try {
      const { createCalendarEvent } = await getFirebaseDb();
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
      const { updateCalendarEvent } = await getFirebaseDb();
      await updateCalendarEvent(eventId, updates);
      await fetchEvents();
    } catch (err) {
      setError('일정 수정에 실패했습니다.');
      console.error(err);
    }
  };

  const removeEvent = async (eventId: string) => {
    try {
      const { deleteCalendarEvent } = await getFirebaseDb();
      await deleteCalendarEvent(eventId);
      await fetchEvents();
    } catch (err) {
      setError('일정 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  return {
    events,
    loading, // 항상 false - 즉시 표시
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
      const { getUserChatHistory } = await getFirebaseDb();
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
      const { saveChatMessage } = await getFirebaseDb();
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

// Helper function to convert date to Timestamp (지연 로딩)
export async function dateToTimestamp(date: Date | null): Promise<Timestamp | null> {
  if (!date) return null;
  const { Timestamp } = await import('firebase/firestore');
  return Timestamp.fromDate(date);
}

// Helper function to convert Timestamp to Date
export function timestampToDate(timestamp: Timestamp | null): Date | null {
  if (!timestamp) return null;
  return timestamp.toDate();
}

// 로컬 워크플로우용 타입 (createdAt 없이) - export하여 페이지에서 사용
export type LocalWorkflow = Omit<Workflow, 'createdAt'> & { createdAt?: Timestamp };

// 🔄 로딩 중 표시용 빈 배열 (Firebase에서 실제 데이터로 교체됨)
const DEFAULT_WORKFLOWS: LocalWorkflow[] = [];

// Workflow Hook - 즉시 로딩 패턴 (기본 데이터 먼저 표시)
export function useWorkflows() {
  const { user } = useAuth();
  // 🚀 기본 데이터로 즉시 초기화 - 로딩 없음
  const [workflows, setWorkflows] = useState<LocalWorkflow[]>(DEFAULT_WORKFLOWS);
  const [progress, setProgress] = useState<Map<string, WorkflowProgress>>(new Map());
  const [loading, setLoading] = useState(false); // 즉시 false
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  // 백그라운드에서 Firebase 데이터 로드
  const fetchWorkflows = useCallback(async () => {
    if (!isMounted.current) return;

    try {
      const { getWorkflows, getUserWorkflowProgress } = await getFirebaseDb();
      const fetchedWorkflows = await getWorkflows();

      if (!isMounted.current) return;

      if (fetchedWorkflows && fetchedWorkflows.length > 0) {
        setWorkflows(fetchedWorkflows);
      }

      // 진행상태 로드 (로그인한 경우)
      if (user) {
        try {
          const userProgress = await getUserWorkflowProgress(user.uid);
          if (userProgress && isMounted.current) {
            const progressMap = new Map<string, WorkflowProgress>();
            userProgress.forEach((p) => progressMap.set(p.workflowId, p));
            setProgress(progressMap);
          }
        } catch {
          // 진행상태 실패는 무시
        }
      }
    } catch {
      // 에러 시 기본 데이터 유지
    }
  }, [user]);

  useEffect(() => {
    isMounted.current = true;
    // 백그라운드에서 Firebase 로드 (UI 블로킹 없음)
    fetchWorkflows();
    return () => { isMounted.current = false; };
  }, [fetchWorkflows]);

  const updateProgress = async (workflowId: string, completedSteps: string[], totalSteps: number) => {
    if (!user) return;
    try {
      const { createOrUpdateWorkflowProgress } = await getFirebaseDb();
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
    loading, // 항상 false - 즉시 표시
    error,
    updateProgress,
    getProgressForWorkflow,
    refetch: fetchWorkflows,
  };
}

// User Settings Hook - 최적화 버전
export function useUserSettings() {
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);
  const isMounted = useRef(true);

  // localStorage 헬퍼 (fetchSettings 위에서 정의)
  const LOCAL_KEY_PREFIX = 'eduflow_user_settings_';

  const fetchSettings = useCallback(async () => {
    if (!user) {
      setSettings(null);
      setLoading(false);
      return;
    }

    // 1. 먼저 localStorage에서 로드 (즉시)
    try {
      const localData = localStorage.getItem(`${LOCAL_KEY_PREFIX}${user.uid}`);
      if (localData) {
        const parsed = JSON.parse(localData) as UserSettings;
        console.log('✅ [fetchSettings] localStorage에서 즉시 로드', parsed);
        setSettings(parsed);
        setLoading(false);
      }
    } catch (e) {
      console.warn('⚠️ [fetchSettings] localStorage 로드 실패', e);
    }

    // 2. Firestore에서도 로드 시도 (백그라운드, 3초 타임아웃)
    try {
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), 3000);
      });

      const { getUserSettings } = await getFirebaseDb();
      const fetchPromise = getUserSettings(user.uid);
      const fetchedSettings = await Promise.race([fetchPromise, timeoutPromise]);

      if (isMounted.current && fetchedSettings) {
        debugLog('SUCCESS', '사용자 설정 로드 성공 (Firestore)', fetchedSettings);
        console.log('[useUserSettings] Firestore 로드 성공:', {
          roles: (fetchedSettings as unknown as { roles?: string[] })?.roles || [],
          customTasks: (fetchedSettings as unknown as { customTasks?: string[] })?.customTasks || [],
        });
        setSettings(fetchedSettings);
        // Firestore 데이터를 localStorage에도 저장
        localStorage.setItem(`${LOCAL_KEY_PREFIX}${user.uid}`, JSON.stringify(fetchedSettings));
        setError(null);
      }
    } catch (err) {
      // Firestore 실패해도 localStorage 데이터가 있으면 에러 무시
      console.warn('⚠️ [fetchSettings] Firestore 로드 실패 (localStorage 사용)', err);
      if (!isMounted.current) return;
      // localStorage에서 이미 로드했으면 에러 표시 안함
      setError(null);
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    isMounted.current = true;

    // 인증 로딩이 완료된 후에만 설정 로드
    if (authLoading) return;

    if (!hasFetched.current || user) {
      hasFetched.current = true;
      // 바로 로딩 false로 전환 후 백그라운드에서 데이터 로드
      setLoading(false);
      fetchSettings();
    }

    return () => {
      isMounted.current = false;
    };
  }, [fetchSettings, authLoading, user]);

  // localStorage 키
  const LOCAL_SETTINGS_KEY = 'eduflow_user_settings';

  // localStorage에 설정 저장
  const saveToLocalStorage = (userId: string, data: Partial<UserSettings>) => {
    try {
      const key = `${LOCAL_SETTINGS_KEY}_${userId}`;
      const existing = localStorage.getItem(key);
      const existingData = existing ? JSON.parse(existing) : {};
      const merged = { ...existingData, ...data, updatedAt: new Date().toISOString() };
      localStorage.setItem(key, JSON.stringify(merged));
      console.log('✅ [localStorage] 설정 저장 완료', merged);
      return true;
    } catch (e) {
      console.error('❌ [localStorage] 저장 실패', e);
      return false;
    }
  };

  // localStorage에서 설정 로드
  const loadFromLocalStorage = (userId: string): Partial<UserSettings> | null => {
    try {
      const key = `${LOCAL_SETTINGS_KEY}_${userId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  };

  // 낙관적 업데이트: localStorage 우선, Firestore는 백그라운드
  const updateSettings = async (updates: Partial<UserSettings>) => {
    const startTime = performance.now();
    console.log('🔵 [updateSettings] v11 시작', { updates, user: user?.uid });

    if (!user) {
      alert('❌ 로그인이 필요합니다. 다시 로그인해주세요.');
      throw new Error('로그인이 필요합니다');
    }

    debugLog('FETCH', '설정 저장 시작', updates);

    // 1. 즉시 UI 반영 (낙관적 업데이트)
    setSettings(prev => prev ? { ...prev, ...updates } as UserSettings : null);

    // 2. localStorage에 즉시 저장 (항상 성공)
    const localSaved = saveToLocalStorage(user.uid, updates);
    if (localSaved) {
      console.log('✅ [updateSettings] localStorage 저장 완료 (즉시)', `+${(performance.now() - startTime).toFixed(0)}ms`);
    }

    // 3. Firestore에 백그라운드로 저장 시도 (3초 타임아웃)
    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Firestore 타임아웃')), 3000);
      });

      const { saveUserSettings } = await Promise.race([
        getFirebaseDb(),
        timeoutPromise.then(() => { throw new Error('모듈 로딩 타임아웃'); })
      ]) as { saveUserSettings: typeof import('../lib/firebase-db').saveUserSettings };

      const savePromise = saveUserSettings(user.uid, updates);
      await Promise.race([savePromise, timeoutPromise]);

      console.log('✅ [updateSettings] Firestore 저장 완료!', `+${(performance.now() - startTime).toFixed(0)}ms`);
      debugLog('SUCCESS', '설정 저장 완료 (Firestore)', updates);
    } catch (err) {
      // Firestore 실패해도 localStorage에는 저장되어 있으므로 에러 무시
      console.warn('⚠️ [updateSettings] Firestore 저장 실패 (localStorage에는 저장됨)', err);
      debugLog('WARN', 'Firestore 저장 실패, localStorage 사용', err);
      // 에러를 throw하지 않음 - localStorage에 저장되었으므로 성공으로 처리
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
