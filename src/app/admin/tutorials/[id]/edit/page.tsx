'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { Tutorial } from '@/lib/types';

type FormValues = {
  title: string;
  slug: string;
  description: string;
  content: string;
};

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function EditTutorialPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch, reset } = useForm<FormValues>();
  
  const titleValue = watch('title');

  useEffect(() => {
    if (titleValue && watch('slug') !== slugify(titleValue)) {
      setValue('slug', slugify(titleValue));
    }
  }, [titleValue, setValue, watch]);

  useEffect(() => {
    const fetchTutorial = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/tutorials/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch tutorial');
        const data = await response.json();
        setTutorial(data);
        reset(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load tutorial data.",
          variant: "destructive"
        });
        setTutorial(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorial();
  }, [params.id, reset, toast]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(`/api/tutorials/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update tutorial');
      toast({ title: 'Success', description: 'Tutorial updated successfully.' });
      router.push('/admin/tutorials');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not update tutorial. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </ProtectedRoute>
    );
  }

  if (!tutorial) {
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
    );
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
            <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register('title', { required: 'Title is required' })} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" {...register('slug', { required: 'Slug is required' })} />
                {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" {...register('description', { required: 'Description is required' })} />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content (Markdown)</Label>
                <Textarea id="content" rows={15} {...register('content', { required: 'Content is required' })} />
                {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href="/admin/tutorials">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
