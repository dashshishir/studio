'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path fill="#4285F4" d="M21.35 11.1h-9.8v3.8h5.6c-.2 1.2-1.2 3.2-3.2 3.2-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2c1.1 0 1.9.4 2.5 1l2-2c-1.3-1.2-3-2-5.2-2-4.2 0-7.7 3.5-7.7 7.7s3.5 7.7 7.7 7.7c4.4 0 7.2-3.1 7.2-7.5 0-.5 0-1-.1-1.4z"/>
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(true); // Start in a loading state
  
  const handleSignIn = async () => {
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      // signInWithRedirect will cause the page to unload, so no need to set isSigningIn to false here.
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    // This effect runs once when the component mounts or auth state changes.
    if (loading) {
      return; // Wait for the AuthContext to be ready
    }

    if (user) {
      // If user is already logged in, redirect them.
      const redirectUrl = searchParams.get('redirect') || '/';
      router.replace(redirectUrl);
      return;
    }

    // If no user, check for a redirect result.
    const checkForRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          // A result means the user has just signed in. The `onAuthStateChanged`
          // listener in AuthContext will detect the new user, so we just redirect.
          const redirectUrl = searchParams.get('redirect') || '/';
          router.replace(redirectUrl);
        } else {
          // No redirect result, so the user is just visiting the login page.
          // We can stop the loading indicator and show the sign-in button.
          setIsSigningIn(false);
        }
      } catch (error) {
        console.error("Error getting redirect result: ", error);
        setIsSigningIn(false);
      }
    };
    
    checkForRedirectResult();
  }, [user, loading, router, searchParams]);
  

  // Show a loading state while checking auth status or after initiating redirect
  if (isSigningIn || loading) {
     return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Welcome to DevOpsHub</CardTitle>
          <CardDescription>Sign in to track your progress and access all features.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={handleSignIn}>
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
