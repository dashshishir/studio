'use client';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Logo from './Logo';
import UserNav from './UserNav';
import { Skeleton } from '../ui/skeleton';

const Header = () => {
  const { isAdmin, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-headline text-lg font-bold">DevOpsHub</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/tutorials" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Tutorials
            </Link>
            <Link href="/glossary" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Glossary
            </Link>
            {loading ? (
                <Skeleton className="h-4 w-10" />
            ) : (
                isAdmin && (
                <Link href="/admin" className="font-semibold text-primary transition-colors hover:text-primary/80">
                    Admin
                </Link>
                )
            )}
          </nav>
        </div>
        <UserNav />
      </div>
    </header>
  );
};

export default Header;