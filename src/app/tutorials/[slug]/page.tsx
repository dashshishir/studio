import { notFound } from 'next/navigation';
import { tutorials } from '@/lib/mock-data';
import { Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  return tutorials.map((tutorial) => ({
    slug: tutorial.slug,
  }));
}

async function getTutorial(slug: string) {
  return tutorials.find((tutorial) => tutorial.slug === slug);
}

export default async function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorial = await getTutorial(params.slug);

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
        
        {/* In a real app, this would be rendered from Markdown/MDX */}
        <div dangerouslySetInnerHTML={{ __html: tutorial.content.replace(/\n/g, '<br />') }} />
      </article>
    </div>
  );
}
