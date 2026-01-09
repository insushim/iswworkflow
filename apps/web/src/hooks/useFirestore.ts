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
      const { getUserTasks } = await getFirebaseDb();
      const fetchedTasks = await getUserTasks(user.uid);
      setTasks(fetchedTasks);
      setError(null);
      setIsOffline(false);
    } catch (err) {
      if (isOfflineError(err)) {
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
      const { getUserDocuments } = await getFirebaseDb();
      const fetchedDocs = await getUserDocuments(user.uid);
      setDocuments(fetchedDocs);
      setError(null);
      setIsOffline(false);
    } catch (err) {
      if (isOfflineError(err)) {
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
      const { getUserCalendarEvents } = await getFirebaseDb();
      const fetchedEvents = await getUserCalendarEvents(user.uid);
      setEvents(fetchedEvents);
      setError(null);
      setIsOffline(false);
    } catch (err) {
      if (isOfflineError(err)) {
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

// Workflow Hook - 타임아웃 및 로컬 데이터 폴백 추가
// 로컬 워크플로우용 타입 (createdAt 없이) - export하여 페이지에서 사용
export type LocalWorkflow = Omit<Workflow, 'createdAt'> & { createdAt?: Timestamp };

export function useWorkflows() {
  const { user, loading: authLoading } = useAuth();
  const [workflows, setWorkflows] = useState<LocalWorkflow[]>([]);
  const [progress, setProgress] = useState<Map<string, WorkflowProgress>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);
  const isMounted = useRef(true);

  // 로컬 기본 워크플로우 데이터 (Firebase 실패 시 폴백)
  const defaultWorkflows: LocalWorkflow[] = [
    {
      id: 'local_1',
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
      difficulty: 'medium' as const,
    },
    {
      id: 'local_2',
      title: '학부모 상담 진행',
      description: '상담 안내문 발송부터 상담 결과 기록까지',
      category: '학부모',
      totalSteps: 6,
      steps: [
        { id: 'step1', title: '상담 일정 조율', description: '학부모와 상담 일정을 조율합니다', order: 1 },
        { id: 'step2', title: '안내문 발송', description: '상담 안내문을 발송합니다', order: 2 },
        { id: 'step3', title: '상담 자료 준비', description: '학생 자료를 준비합니다', order: 3 },
        { id: 'step4', title: '상담 진행', description: '학부모 상담을 진행합니다', order: 4 },
        { id: 'step5', title: '상담 결과 기록', description: '상담 내용을 기록합니다', order: 5 },
        { id: 'step6', title: '후속 조치', description: '필요한 후속 조치를 진행합니다', order: 6 },
      ],
      estimatedTime: '20분',
      difficulty: 'easy' as const,
    },
    {
      id: 'local_3',
      title: '현장체험학습 준비',
      description: '계획서 작성부터 안전교육, 사후 보고서까지',
      category: '행사',
      totalSteps: 7,
      steps: [
        { id: 'step1', title: '장소 선정 및 답사', description: '체험학습 장소를 선정하고 답사합니다', order: 1 },
        { id: 'step2', title: '계획서 작성', description: '현장체험학습 계획서를 작성합니다', order: 2 },
        { id: 'step3', title: '학부모 안내문 발송', description: '동의서를 포함한 안내문을 발송합니다', order: 3 },
        { id: 'step4', title: '안전교육 실시', description: '사전 안전교육을 실시합니다', order: 4 },
        { id: 'step5', title: '체험학습 진행', description: '현장체험학습을 진행합니다', order: 5 },
        { id: 'step6', title: '결과 보고서 작성', description: '체험학습 결과 보고서를 작성합니다', order: 6 },
        { id: 'step7', title: '정산 및 마무리', description: '비용 정산 및 마무리합니다', order: 7 },
      ],
      estimatedTime: '1시간',
      difficulty: 'hard' as const,
    },
    {
      id: 'local_4',
      title: '안전교육 실시',
      description: '7대 안전교육 영역별 교육 계획 및 실시',
      category: '안전',
      totalSteps: 5,
      steps: [
        { id: 'step1', title: '교육 계획 수립', description: '안전교육 계획을 수립합니다', order: 1 },
        { id: 'step2', title: '교육 자료 준비', description: '교육 자료를 준비합니다', order: 2 },
        { id: 'step3', title: '교육 실시', description: '안전교육을 실시합니다', order: 3 },
        { id: 'step4', title: '교육 결과 입력', description: 'NEIS에 교육 결과를 입력합니다', order: 4 },
        { id: 'step5', title: '실적 정리', description: '교육 실적을 정리합니다', order: 5 },
      ],
      estimatedTime: '15분',
      difficulty: 'easy' as const,
    },
    {
      id: 'local_5',
      title: '평가 계획 수립',
      description: '교과별 평가 계획 수립 및 성적 처리',
      category: '평가',
      totalSteps: 6,
      steps: [
        { id: 'step1', title: '성취기준 분석', description: '교과별 성취기준을 분석합니다', order: 1 },
        { id: 'step2', title: '평가 계획 작성', description: '평가 계획을 작성합니다', order: 2 },
        { id: 'step3', title: '평가 도구 개발', description: '평가 도구를 개발합니다', order: 3 },
        { id: 'step4', title: '평가 실시', description: '평가를 실시합니다', order: 4 },
        { id: 'step5', title: '채점 및 기록', description: '채점하고 기록합니다', order: 5 },
        { id: 'step6', title: '결과 분석', description: '평가 결과를 분석합니다', order: 6 },
      ],
      estimatedTime: '45분',
      difficulty: 'medium' as const,
    },
    {
      id: 'local_6',
      title: '공문서 작성',
      description: '행정 공문 작성 및 발송 절차',
      category: '문서작성',
      totalSteps: 5,
      steps: [
        { id: 'step1', title: '문서 양식 선택', description: '적절한 문서 양식을 선택합니다', order: 1 },
        { id: 'step2', title: '내용 작성', description: '문서 내용을 작성합니다', order: 2 },
        { id: 'step3', title: '첨부파일 준비', description: '필요한 첨부파일을 준비합니다', order: 3 },
        { id: 'step4', title: '결재 요청', description: '결재를 요청합니다', order: 4 },
        { id: 'step5', title: '발송', description: '문서를 발송합니다', order: 5 },
      ],
      estimatedTime: '20분',
      difficulty: 'easy' as const,
    },
  ];

  const fetchWorkflows = useCallback(async () => {
    const fetchStart = performance.now();
    debugLog('FETCH', '=== 워크플로우 페치 시작 ===');

    if (!isMounted.current) {
      debugLog('RENDER', '컴포넌트 언마운트됨 - 페치 취소');
      return;
    }

    try {
      // 3초 타임아웃 설정
      debugLog('TIMEOUT', '3초 타임아웃 설정');
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => {
          debugLog('TIMEOUT', '⚠️ 타임아웃 발생! (3초 초과)');
          reject(new Error('timeout'));
        }, 3000);
      });

      debugLog('FIREBASE', 'Firebase DB 모듈 로딩...');
      const firebaseStart = performance.now();
      const { getWorkflows, getUserWorkflowProgress } = await getFirebaseDb();
      debugLog('FIREBASE', `Firebase 모듈 준비 완료 (${(performance.now() - firebaseStart).toFixed(2)}ms)`);

      debugLog('FETCH', 'getWorkflows() 호출...');
      const workflowStart = performance.now();
      const fetchPromise = getWorkflows();
      const fetchedWorkflows = await Promise.race([fetchPromise, timeoutPromise]);
      debugLog('SUCCESS', `워크플로우 데이터 수신 (${(performance.now() - workflowStart).toFixed(2)}ms)`,
        { count: fetchedWorkflows?.length || 0 });

      if (!isMounted.current) {
        debugLog('RENDER', '컴포넌트 언마운트됨 - 상태 업데이트 취소');
        return;
      }

      if (fetchedWorkflows && fetchedWorkflows.length > 0) {
        debugLog('SUCCESS', `Firebase에서 ${fetchedWorkflows.length}개 워크플로우 로드`);
        setWorkflows(fetchedWorkflows);
      } else {
        debugLog('CACHE', 'Firebase 데이터 없음 → 로컬 기본 데이터 사용');
        setWorkflows(defaultWorkflows);
      }

      if (user) {
        try {
          debugLog('FETCH', '사용자 진행상태 로딩...');
          const progressStart = performance.now();
          const progressPromise = getUserWorkflowProgress(user.uid);
          const userProgress = await Promise.race([progressPromise, timeoutPromise]);
          debugLog('SUCCESS', `진행상태 로드 완료 (${(performance.now() - progressStart).toFixed(2)}ms)`,
            { count: userProgress?.length || 0 });
          if (userProgress && isMounted.current) {
            const progressMap = new Map<string, WorkflowProgress>();
            userProgress.forEach((p) => progressMap.set(p.workflowId, p));
            setProgress(progressMap);
          }
        } catch (progressErr) {
          debugLog('ERROR', '진행상태 로드 실패 (무시됨)', progressErr);
        }
      } else {
        debugLog('AUTH', '로그인 안됨 - 진행상태 건너뜀');
      }

      setError(null);
      debugLog('SUCCESS', `=== 워크플로우 페치 완료 (총 ${(performance.now() - fetchStart).toFixed(2)}ms) ===`);
    } catch (err) {
      if (!isMounted.current) return;

      const elapsed = (performance.now() - fetchStart).toFixed(2);
      debugLog('ERROR', `워크플로우 페치 실패 (${elapsed}ms) → 로컬 데이터로 폴백`, err);
      setWorkflows(defaultWorkflows);
      setError(null);
    } finally {
      if (isMounted.current) {
        setLoading(false);
        debugLog('RENDER', 'loading = false 설정됨');
      }
    }
  }, [user]);

  useEffect(() => {
    debugLog('RENDER', `useWorkflows useEffect 실행 - authLoading: ${authLoading}, hasFetched: ${hasFetched.current}`);
    isMounted.current = true;

    if (authLoading) {
      debugLog('AUTH', '인증 로딩 중... 대기');
      return;
    }

    if (!hasFetched.current) {
      debugLog('FETCH', '첫 페치 시작 (hasFetched = false)');
      hasFetched.current = true;
      fetchWorkflows();
    } else {
      debugLog('CACHE', '이미 페치됨 (hasFetched = true) - 건너뜀');
    }

    return () => {
      debugLog('RENDER', '컴포넌트 cleanup - isMounted = false');
      isMounted.current = false;
    };
  }, [fetchWorkflows, authLoading]);

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
    loading,
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

  const fetchSettings = useCallback(async () => {
    if (!user) {
      setSettings(null);
      setLoading(false);
      return;
    }

    try {
      // 최대 5초 타임아웃 적용
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), 5000);
      });

      const { getUserSettings } = await getFirebaseDb();
      const fetchPromise = getUserSettings(user.uid);
      const fetchedSettings = await Promise.race([fetchPromise, timeoutPromise]);

      if (isMounted.current) {
        setSettings(fetchedSettings);
        setError(null);
      }
    } catch (err) {
      if (!isMounted.current) return;

      // 타임아웃이나 오프라인 에러시 빈 설정 반환
      if (isOfflineError(err) || (err instanceof Error && err.message === 'timeout')) {
        setSettings(null);
        setError(null);
      } else {
        setError('설정을 불러오는데 실패했습니다.');
        console.error(err);
      }
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

  // 낙관적 업데이트: 먼저 UI 업데이트 후 서버에 저장
  const updateSettings = async (updates: Partial<UserSettings>) => {
    if (!user) return;

    // 낙관적 업데이트 - 즉시 UI 반영
    setSettings(prev => prev ? { ...prev, ...updates } as UserSettings : null);

    try {
      const { saveUserSettings } = await getFirebaseDb();
      await saveUserSettings(user.uid, updates);
    } catch (err) {
      // 실패시 원래 상태로 롤백
      fetchSettings();
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
