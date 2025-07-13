'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import Link from 'next/link';

// Mock data for admin dashboard
const stats = [
  { title: 'Total Users', value: '1,254', icon: <Users className="h-6 w-6 text-muted-foreground" /> },
  { title: 'Active Tutorials', value: '12', icon: <BookOpen className="h-6 w-6 text-muted-foreground" /> },
  { title: 'Completions Today', value: '87', icon: <GraduationCap className="h-6 w-6 text-muted-foreground" /> },
];

const recentProgress = [
  { user: 'alex@example.com', tutorial: 'Introduction to Docker', progress: '100%' },
  { user: 'maria@example.com', tutorial: 'CI/CD with GitHub Actions', progress: '75%' },
  { user: 'chen@example.com', tutorial: 'Kubernetes Basics', progress: '50%' },
  { user: 'sam@example.com', tutorial: 'Introduction to Docker', progress: '100%' },
];

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of DevOpsHub activity and management.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
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
                    <p className="text-sm text-muted-foreground">You have {stats.find(s=>s.title==='Active Tutorials')?.value} active tutorials.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent User Progress</CardTitle>
                    <CardDescription>A snapshot of the latest learning activities.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Tutorial</TableHead>
                                <TableHead className="text-right">Progress</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentProgress.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item.user}</TableCell>
                                    <TableCell>{item.tutorial}</TableCell>
                                    <TableCell className="text-right">{item.progress}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
