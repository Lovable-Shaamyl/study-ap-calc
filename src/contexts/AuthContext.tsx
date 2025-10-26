import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

// Export the context for use in custom hook
export { AuthContext };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const login = async () => {
    // Prevent multiple concurrent login attempts
    if (isSigningIn) {
      throw new Error('Sign-in already in progress. Please wait.');
    }

    try {
      setIsSigningIn(true);
      
      // Clear any existing auth state before attempting login
      await signOut(auth).catch(() => {
        // Ignore errors if user wasn't signed in
      });
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Successfully signed in:', result.user.email);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      
      // Handle specific popup-related errors
      const errorCode = (error as { code?: string })?.code;
      if (errorCode === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (errorCode === 'auth/popup-blocked') {
        throw new Error('Pop-up was blocked by your browser. Please allow pop-ups and try again.');
      } else if (errorCode === 'auth/cancelled-popup-request') {
        throw new Error('Another sign-in attempt is in progress. Please wait.');
      } else {
        throw new Error('Failed to sign in. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Signing out user:', currentUser?.email);
      await signOut(auth);
      // Force clear the current user state immediately
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? `User: ${user.email}` : 'No user');
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup function to prevent memory leaks
    return () => {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};