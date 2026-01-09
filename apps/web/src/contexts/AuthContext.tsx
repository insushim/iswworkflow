'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from 'firebase/auth';

// ============================================
// 🔐 AUTH 디버그 로거
// ============================================
const DEBUG_AUTH = true;
const authLog = (message: string, data?: unknown) => {
  if (!DEBUG_AUTH) return;
  const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);
  console.log(
    `%c[${timestamp}] 🔐 [AUTH] ${message}`,
    'color: purple; font-weight: bold;',
    data !== undefined ? data : ''
  );
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  signInGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Firebase를 비동기로 초기화 (지연 로딩)
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    const initStart = performance.now();
    authLog('=== Auth 초기화 useEffect 시작 ===');

    const initAuth = async () => {
      try {
        authLog('Firebase 모듈 import 시작...');
        const firebaseImportStart = performance.now();

        // 동적 import로 Firebase 지연 로딩
        const { getAuthInstance } = await import('@/lib/firebase');
        authLog(`firebase.ts import 완료 (${(performance.now() - firebaseImportStart).toFixed(2)}ms)`);

        const authImportStart = performance.now();
        const { onAuthStateChanged } = await import('firebase/auth');
        authLog(`firebase/auth import 완료 (${(performance.now() - authImportStart).toFixed(2)}ms)`);

        authLog('Auth 인스턴스 가져오기...');
        const authInstanceStart = performance.now();
        const auth = getAuthInstance();
        authLog(`Auth 인스턴스 준비됨 (${(performance.now() - authInstanceStart).toFixed(2)}ms)`);

        authLog('onAuthStateChanged 리스너 등록...');
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          const totalElapsed = (performance.now() - initStart).toFixed(2);
          authLog(`onAuthStateChanged 콜백 - 총 경과시간: ${totalElapsed}ms`, {
            user: firebaseUser ? { email: firebaseUser.email, uid: firebaseUser.uid.slice(0, 8) + '...' } : null
          });
          setUser(firebaseUser);
          setLoading(false);
          setIsInitialized(true);
          authLog('✅ Auth loading = false 설정됨');
        });
      } catch (err) {
        const elapsed = (performance.now() - initStart).toFixed(2);
        authLog(`❌ Auth 초기화 에러 (${elapsed}ms)`, err);
        console.error('Auth initialization error:', err);
        setLoading(false);
        setIsInitialized(true);
      }
    };

    // 약간의 지연 후 초기화 (초기 렌더링 차단 방지)
    authLog('setTimeout 0ms 후 initAuth 실행 예약');
    const timer = setTimeout(initAuth, 0);

    return () => {
      authLog('Auth cleanup 실행');
      clearTimeout(timer);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const { signInWithEmail } = await import('@/lib/firebase-auth');
      const result = await signInWithEmail(email, password);
      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }
      return { success: true };
    } catch (err) {
      const errorMsg = '로그인 중 오류가 발생했습니다.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName: string) => {
    setError(null);
    try {
      const { signUpWithEmail } = await import('@/lib/firebase-auth');
      const result = await signUpWithEmail(email, password, displayName);
      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }
      return { success: true };
    } catch (err) {
      const errorMsg = '회원가입 중 오류가 발생했습니다.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  const signInGoogle = useCallback(async () => {
    setError(null);
    try {
      const { signInWithGoogle } = await import('@/lib/firebase-auth');
      const result = await signInWithGoogle();
      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }
      return { success: true };
    } catch (err) {
      const errorMsg = 'Google 로그인 중 오류가 발생했습니다.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    try {
      const { signOut } = await import('@/lib/firebase-auth');
      const result = await signOut();
      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }
      return { success: true };
    } catch (err) {
      const errorMsg = '로그아웃 중 오류가 발생했습니다.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  const sendPasswordReset = useCallback(async (email: string) => {
    setError(null);
    try {
      const { resetPassword } = await import('@/lib/firebase-auth');
      const result = await resetPassword(email);
      if (result.error) {
        setError(result.error);
        return { success: false, error: result.error };
      }
      return { success: true };
    } catch (err) {
      const errorMsg = '비밀번호 재설정 중 오류가 발생했습니다.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        signInGoogle,
        logout,
        sendPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
