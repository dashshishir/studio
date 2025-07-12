'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

export default function NewTutorialPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold">Create New Tutorial</h1>
          <p className="text-muted-foreground">Fill out the details below to add a new tutorial.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Introduction to Kubernetes" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="e.g., introduction-to-kubernetes" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" placeholder="A brief summary of the tutorial." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea id="content" placeholder="Write your tutorial content here using Markdown..." rows={15} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href="/admin/tutorials">Cancel</Link>
                </Button>
                <Button type="submit">Create Tutorial</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
