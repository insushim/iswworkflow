import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Firebase 설정 - 환경변수 또는 폴백 값 사용
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyA8uPtemRMg_o77I8odhi7cgNtUG073rgw',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'isw-workflow.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'isw-workflow',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'isw-workflow.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '490724005964',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:490724005964:web:e8ed6788a5faf617697ce9',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-KVCT3V323F',
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let isInitialized = false;

// Firebase 초기화 함수
function initializeFirebaseApp(): FirebaseApp {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0];
}

// 초기화
try {
  app = initializeFirebaseApp();
  auth = getAuth(app);

  // Firestore 초기화 (새로운 캐시 설정 방식)
  if (typeof window !== 'undefined') {
    // 클라이언트 사이드에서만 영속적 캐시 사용
    try {
      db = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      });
    } catch {
      // 이미 초기화된 경우
      db = getFirestore(app);
    }
  } else {
    db = getFirestore(app);
  }

  storage = getStorage(app);
  isInitialized = true;
} catch (error) {
  console.error('Firebase initialization error:', error);
  // 폴백: 기본 초기화
  app = initializeFirebaseApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

// Firebase 연결 상태 확인
export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== 'undefined'
  );
}

// Analytics (client-side only)
export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export { app, auth, db, storage, isInitialized };
export default app;
