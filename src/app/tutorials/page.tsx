import TutorialCard from '@/components/tutorials/TutorialCard';
import { db } from '@/lib/firebase';
import { Tutorial } from '@/lib/types';
import { collection, getDocs } from 'firebase/firestore';

async function getTutorials() {
  const tutorialsCol = collection(db, 'tutorials');
  const snapshot = await getDocs(tutorialsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tutorial));
}

export default async function TutorialsPage() {
  const tutorials = await getTutorials();
  
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
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
}
