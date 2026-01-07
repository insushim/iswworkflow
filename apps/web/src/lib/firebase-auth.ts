'use client';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from './firebase';

const isDev = process.env.NODE_ENV === 'development';

// Firebase 에러 코드를 한글 메시지로 변환
function getKoreanErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const errorCode = (error as { code?: string }).code;

    if (isDev) {
      console.error('Firebase Error:', errorCode);
    }

    switch (errorCode) {
      case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
      case 'auth/invalid-api-key':
        return '❌ Firebase API 키가 유효하지 않습니다. 환경변수를 확인하세요.';
      case 'auth/user-not-found':
        return '등록되지 않은 이메일입니다.';
      case 'auth/wrong-password':
        return '비밀번호가 올바르지 않습니다.';
      case 'auth/email-already-in-use':
        return '이미 사용 중인 이메일입니다.';
      case 'auth/weak-password':
        return '비밀번호는 6자 이상이어야 합니다.';
      case 'auth/invalid-email':
        return '유효하지 않은 이메일 형식입니다.';
      case 'auth/too-many-requests':
        return '너무 많은 시도가 있었습니다. 잠시 후 다시 시도하세요.';
      case 'auth/network-request-failed':
        return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.';
      case 'auth/popup-closed-by-user':
        return '로그인 창이 닫혔습니다. 다시 시도하세요.';
      case 'auth/invalid-credential':
        return '이메일 또는 비밀번호가 올바르지 않습니다.';
      default:
        return error.message;
    }
  }
  return '알 수 없는 오류가 발생했습니다.';
}

// 이메일/비밀번호 로그인
export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error: unknown) {
    const errorMessage = getKoreanErrorMessage(error);
    return { user: null, error: errorMessage };
  }
}

// 회원가입
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });
    return { user: result.user, error: null };
  } catch (error: unknown) {
    const errorMessage = getKoreanErrorMessage(error);
    return { user: null, error: errorMessage };
  }
}

// 구글 로그인
export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return { user: result.user, error: null };
  } catch (error: unknown) {
    const errorMessage = getKoreanErrorMessage(error);
    return { user: null, error: errorMessage };
  }
}

// 로그아웃
export async function signOut() {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '로그아웃에 실패했습니다.';
    return { error: errorMessage };
  }
}

// 비밀번호 재설정 이메일
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '비밀번호 재설정 이메일 발송에 실패했습니다.';
    return { error: errorMessage };
  }
}

// 인증 상태 구독
export function subscribeToAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// 현재 사용자 가져오기
export function getCurrentUser() {
  return auth.currentUser;
}
