'use client';
import { useEffect, useState } from 'react';
import TutorialCard from '@/components/tutorials/TutorialCard';
import { db } from '@/lib/firebase';
import { Tutorial } from '@/lib/types';
import { collection, getDocs } from 'firebase/firestore';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTutorials = async () => {
      setLoading(true);
      try {
        const tutorialsCol = collection(db, 'tutorials');
        const snapshot = await getDocs(tutorialsCol);
        const fetchedTutorials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tutorial));
        setTutorials(fetchedTutorials);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      } finally {
        setLoading(false);
      }
    };
    getTutorials();
  }, []);
  
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">
          All Tutorials
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Browse our collection of guides and walkthroughs.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
           Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
               <CardFooter>
                 <Skeleton className="h-6 w-24" />
               </CardFooter>
            </Card>
          ))
        ) : (
          tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.id} tutorial={tutorial} />
          ))
        )}
      </div>
    </div>
  );
}
