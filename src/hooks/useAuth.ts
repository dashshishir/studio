'use client';
import { useContext } from 'react';
// The context is created and exported from AuthContext.tsx to avoid circular dependencies.
// This hook is just a convenience wrapper.
import { useAuth as useAuthFromContext } from '@/context/AuthContext';

export const useAuth = () => {
  return useAuthFromContext();
};
