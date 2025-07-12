'use client';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { tutorials } from '@/lib/mock-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function EditTutorialPage({ params }: { params: { id: string } }) {
  const tutorial = tutorials.find(t => t.id === params.id);

  if (!tutorial) {
    // In a real app this would be a server component with notFound(), 
    // but for client-side protection this is a simple way to handle it.
    return (
        <ProtectedRoute>
            <div className="container mx-auto max-w-4xl p-8 text-center">
                <h1 className="font-headline text-2xl">Tutorial not found</h1>
                <p className="text-muted-foreground">The tutorial you are trying to edit does not exist.</p>
                <Button asChild className="mt-4">
                    <Link href="/admin/tutorials">Back to Tutorials</Link>
                </Button>
            </div>
        </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold">Edit Tutorial</h1>
          <p className="text-muted-foreground">Update the details for "{tutorial.title}".</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" defaultValue={tutorial.title} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" defaultValue={tutorial.slug} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" defaultValue={tutorial.description} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea id="content" defaultValue={tutorial.content} rows={15} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href="/admin/tutorials">Cancel</Link>
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
