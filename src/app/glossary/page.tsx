'use client';
import { useState } from 'react';
import { glossaryTerms } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';

export default function GlossaryPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = glossaryTerms.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl">
          DevOps Glossary
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Your quick reference for all the key terms and concepts in the DevOps world.
        </p>
      </div>
      
      <div className="relative mt-12 mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 text-base"
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {filteredTerms.length > 0 ? (
          filteredTerms.map(item => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger className="text-lg font-medium hover:no-underline">
                {item.term}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {item.definition}
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
          <p className="py-8 text-center text-muted-foreground">No terms found matching your search.</p>
        )}
      </Accordion>
    </div>
  );
}
