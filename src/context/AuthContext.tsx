
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
});

const ADMIN_UIDS = (process.env.NEXT_PUBLIC_ADMIN_UID || '').split(',');

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        
        const isUserAdmin = ADMIN_UIDS.includes(firebaseUser.uid);

        if (!userSnap.exists()) {
          // New user, create a document in Firestore
          const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            isAdmin: isUserAdmin,
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
        } else {
          // Existing user, just set the state
          const existingUser = userSnap.data() as User;
           // Ensure isAdmin status is up-to-date from env var
          if (existingUser.isAdmin !== isUserAdmin) {
            await setDoc(userRef, { isAdmin: isUserAdmin }, { merge: true });
            existingUser.isAdmin = isUserAdmin;
          }
          setUser(existingUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAdmin: user?.isAdmin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
