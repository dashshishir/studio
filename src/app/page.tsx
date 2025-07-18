'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, GanttChartSquare, ShieldCheck } from 'lucide-react';
import TutorialCard from '@/components/tutorials/TutorialCard';
import { db } from '@/lib/firebase';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { Tutorial } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


export default function Home() {
  const [featuredTutorials, setFeaturedTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  
  const features = [
    {
      icon: <BookOpen className="mb-4 h-12 w-12 text-primary" />,
      title: 'Comprehensive Tutorials',
      description: 'Step-by-step guides on modern DevOps practices, from CI/CD to containerization.',
    },
    {
      icon: <GanttChartSquare className="mb-4 h-12 w-12 text-primary" />,
      title: 'Progress Tracking',
      description: 'Stay motivated by tracking your learning progress through our interactive tutorials.',
    },
    {
      icon: <ShieldCheck className="mb-4 h-12 w-12 text-primary" />,
      title: 'In-Depth Glossary',
      description: 'Quickly look up complex terms and concepts with our integrated DevOps glossary.',
    },
  ];

  useEffect(() => {
    const getFeaturedTutorials = async () => {
      setLoading(true);
      try {
        const tutorialsCol = collection(db, 'tutorials');
        const q = query(tutorialsCol, limit(3));
        const snapshot = await getDocs(q);
        const tutorials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tutorial));
        setFeaturedTutorials(tutorials);
      } catch (error) {
        console.error("Error fetching featured tutorials: ", error);
        // Handle error appropriately
      } finally {
        setLoading(false);
      }
    };

    getFeaturedTutorials();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-secondary py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl">
            Master Modern DevOps
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
            DevOpsHub provides a clear path to understanding and implementing key DevOps principles, tools, and culture.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/tutorials">
                Start Learning <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/glossary">Explore Glossary</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-center text-3xl font-bold md:text-4xl">
            Why DevOpsHub?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
            We bridge the gap between theory and practice, offering hands-on learning for today's tech landscape.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="transform-gpu transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="items-center">
                  {feature.icon}
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-secondary py-20 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-center text-3xl font-bold md:text-4xl">
            Featured Tutorials
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
            Get a taste of what you can learn. Dive into one of our popular tutorials.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
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
              featuredTutorials.map((tutorial) => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))
            )}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="link" className="text-lg">
              <Link href="/tutorials">View All Tutorials <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
