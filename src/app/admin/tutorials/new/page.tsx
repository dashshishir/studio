'use client';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useAuth }.tsx';
import { Loader2 } from 'lucide-react';
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

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

export default function NewTutorialPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch, control } = useForm<FormValues>();

  const titleValue = watch('title');
  
  React.useEffect(() => {
      if (titleValue) {
          setValue('slug', slugify(titleValue));
      }
  }, [titleValue, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch('/api/tutorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, author: user?.displayName || 'Admin' }),
      });

      if (!response.ok) {
        throw new Error('Failed to create tutorial');
      }

      toast({ title: 'Success', description: 'Tutorial created successfully.' });
      router.push('/admin/tutorials');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not create tutorial. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="font-headline text-3xl font-bold">Create New Tutorial</h1>
          <p className="text-muted-foreground">Fill out the details below to add a new tutorial.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g., Introduction to Kubernetes" {...register('title', { required: 'Title is required' })} />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" placeholder="e.g., introduction-to-kubernetes" {...register('slug', { required: 'Slug is required' })} />
                {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" placeholder="A brief summary of the tutorial." {...register('description', { required: 'Description is required' })} />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label>Content</Label>
                 <Controller
                  name="content"
                  control={control}
                  rules={{ required: 'Content is required' }}
                  render={({ field }) => <RichTextEditor {...field} />}
                />
                {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href="/admin/tutorials">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Tutorial
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
