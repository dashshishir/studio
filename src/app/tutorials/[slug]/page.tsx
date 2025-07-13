'use client';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Calendar, User, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import type { Tutorial } from '@/lib/types';
import 'react-quill/dist/quill.snow.css';

export default function TutorialPage({ params }: { params: { slug: string } }) {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.slug) return;

    const getTutorial = async (slug: string) => {
      setLoading(true);
      try {
        const tutorialsCol = collection(db, 'tutorials');
        const q = query(tutorialsCol, where('slug', '==', slug), limit(1));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setTutorial(null);
        } else {
          const doc = snapshot.docs[0];
          setTutorial({ id: doc.id, ...doc.data() } as Tutorial);
        }
      } catch (error) {
        console.error("Error fetching tutorial:", error);
        setTutorial(null);
      } finally {
        setLoading(false);
      }
    };

    getTutorial(params.slug);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div className="mb-8 border-b pb-8">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl mb-4">
                {tutorial.title}
            </h1>
            <p className="text-xl text-muted-foreground mt-0">
                {tutorial.description}
            </p>
            <div className="mt-6 flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{tutorial.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={tutorial.publishedDate}>
                        {new Date(tutorial.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                </div>
            </div>
        </div>
        
        <div className="ql-snow">
          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: tutorial.content }} />
        </div>
      </article>
    </div>
  );
}
