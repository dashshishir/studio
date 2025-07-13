
'use client';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Users, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface Stat {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();
        setStats([
          { title: 'Total Users', value: data.userCount, icon: <Users className="h-6 w-6 text-muted-foreground" /> },
          { title: 'Active Tutorials', value: data.tutorialCount, icon: <BookOpen className="h-6 w-6 text-muted-foreground" /> },
          { title: 'Glossary Terms', value: data.glossaryCount, icon: <GraduationCap className="h-6 w-6 text-muted-foreground" /> },
        ]);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Could not load dashboard statistics.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [toast]);

  const getStatValue = (title: string) => {
    const stat = stats.find(s => s.title === title);
    return loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stat?.value ?? '0';
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of DevOpsHub activity and management.</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          { (loading ? Array.from({length: 3}) : stats).map((stat, index) => (
            <Card key={stat?.title || index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat?.title || 'Loading...'}</CardTitle>
                {stat?.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                    {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Manage Tutorials</CardTitle>
                <CardDescription>Add, edit, or remove tutorials from the platform.</CardDescription>
              </div>
              <Button asChild>
                <Link href="/admin/tutorials">Go to Tutorials</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">You have {getStatValue('Active Tutorials')} active tutorials.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
