'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signOut,
  resetPassword,
} from '@/lib/firebase-auth';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setError(null);
    const result = await signInWithEmail(email, password);
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }
    return { success: true };
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    setError(null);
    const result = await signUpWithEmail(email, password, displayName);
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }
    return { success: true };
  };

  const signInGoogle = async () => {
    setError(null);
    const result = await signInWithGoogle();
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }
    return { success: true };
  };

  const logout = async () => {
    setError(null);
    const result = await signOut();
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }
    return { success: true };
  };

  const sendPasswordReset = async (email: string) => {
    setError(null);
    const result = await resetPassword(email);
    if (result.error) {
      setError(result.error);
      return { success: false, error: result.error };
    }
    return { success: true };
  };

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
