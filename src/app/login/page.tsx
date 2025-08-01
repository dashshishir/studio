'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
  const { user, loading: authLoading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
      // The onAuthStateChanged listener in AuthProvider will handle the redirect
      // after the user is set.
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    const redirectUrl = searchParams.get('redirect') || '/';
    if (!authLoading && user) {
      router.replace(redirectUrl);
    }
  }, [user, authLoading, router, searchParams]);

  if (authLoading) {
    return (
     <div className="flex h-screen items-center justify-center">
       <Loader2 className="h-12 w-12 animate-spin text-primary" />
     </div>
   );
  }

  // If we are here, auth is loaded, but the user is not signed in.
  // We don't show a loader if a user is already present, because the useEffect will redirect.
  if (user) {
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
          <Button className="w-full" onClick={handleSignIn} disabled={isSigningIn}>
            {isSigningIn ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2 h-5 w-5" />
            )}
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
