import Link from 'next/link';
import type { Tutorial } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface TutorialCardProps {
  tutorial: Tutorial;
}

const TutorialCard = ({ tutorial }: TutorialCardProps) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">{tutorial.title}</CardTitle>
        <CardDescription>{tutorial.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow"></CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0">
          <Link href={`/tutorials/${tutorial.slug}`}>
            Read Tutorial <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TutorialCard;
