import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// ============================================
// 🔥 FIREBASE SDK 디버그 로거
// ============================================
const DEBUG_FIREBASE = true;
const fbLog = (message: string, data?: unknown) => {
  if (!DEBUG_FIREBASE) return;
  const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);
  console.log(
    `%c[${timestamp}] 🔥 [FIREBASE-SDK] ${message}`,
    'color: orange; font-weight: bold;',
    data !== undefined ? data : ''
  );
};

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
};

// 싱글톤 인스턴스
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

// 지연 초기화 - 필요할 때만 초기화
function getApp(): FirebaseApp {
  if (!_app) {
    const start = performance.now();
    const existingApps = getApps();
    fbLog(`기존 Firebase 앱 수: ${existingApps.length}`);

    if (existingApps.length === 0) {
      fbLog('Firebase 앱 초기화 중...', { projectId: firebaseConfig.projectId });
      _app = initializeApp(firebaseConfig);
      fbLog(`Firebase 앱 초기화 완료 (${(performance.now() - start).toFixed(2)}ms)`);
    } else {
      _app = existingApps[0];
      fbLog('기존 Firebase 앱 재사용');
    }
  }
  return _app;
}

// Auth getter - 지연 초기화
export function getAuthInstance(): Auth {
  if (!_auth) {
    const start = performance.now();
    fbLog('Auth 인스턴스 생성 중...');
    _auth = getAuth(getApp());
    fbLog(`Auth 인스턴스 생성 완료 (${(performance.now() - start).toFixed(2)}ms)`);
  } else {
    fbLog('Auth 인스턴스 캐시 사용');
  }
  return _auth;
}

// Firestore getter - 지연 초기화
export function getDbInstance(): Firestore {
  if (!_db) {
    const start = performance.now();
    fbLog('Firestore 인스턴스 생성 중...');
    _db = getFirestore(getApp());
    fbLog(`Firestore 인스턴스 생성 완료 (${(performance.now() - start).toFixed(2)}ms)`);
  } else {
    fbLog('Firestore 인스턴스 캐시 사용');
  }
  return _db;
}

// Storage getter - 지연 초기화
export function getStorageInstance(): FirebaseStorage {
  if (!_storage) {
    const start = performance.now();
    fbLog('Storage 인스턴스 생성 중...');
    _storage = getStorage(getApp());
    fbLog(`Storage 인스턴스 생성 완료 (${(performance.now() - start).toFixed(2)}ms)`);
  } else {
    fbLog('Storage 인스턴스 캐시 사용');
  }
  return _storage;
}

// Firebase 연결 상태 확인
export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey.length > 10 &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId.length > 0
  );
}

// 하위 호환성을 위한 export (기존 코드에서 사용하는 경우)
// 실제 사용 시점에 초기화됨
export const app = new Proxy({} as FirebaseApp, {
  get(_, prop) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getApp() as any)[prop as string];
  },
});

export const auth = new Proxy({} as Auth, {
  get(_, prop) {
    const instance = getAuthInstance();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (instance as any)[prop as string];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
});

export const db = new Proxy({} as Firestore, {
  get(_, prop) {
    const instance = getDbInstance();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (instance as any)[prop as string];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
});

export const storage = new Proxy({} as FirebaseStorage, {
  get(_, prop) {
    const instance = getStorageInstance();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (instance as any)[prop as string];
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
});

export const isInitialized = true;
export default app;
