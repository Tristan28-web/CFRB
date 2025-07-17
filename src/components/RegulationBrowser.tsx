'use client';

import { useState, useMemo } from 'react';
import { regulations, franchiseCategories } from '@/lib/data';
import type { Regulation, FranchiseCategory } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Search, Library } from 'lucide-react';

export function RegulationBrowser() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRegulations = useMemo(() => {
    if (!searchTerm) return regulations;
    return regulations.filter(
      (reg) =>
        reg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const regulationsByCategory = (category: FranchiseCategory) => {
    return filteredRegulations.filter((reg) => reg.category === category);
  };

  return (
    <section id="regulations" className="w-full py-12 md:py-20">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
            <Library className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold font-headline tracking-tight">
            Regulation Browser
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore and search for franchise regulations.
          </p>
        </div>
        <div className="relative mx-auto mb-8 max-w-xl">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search regulations by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 w-full rounded-full pl-10 text-base shadow-sm"
          />
        </div>

        <Tabs defaultValue={franchiseCategories[0].name} className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-1 sm:h-12 sm:grid-cols-3">
            {franchiseCategories.map(({ name, icon: Icon }) => (
              <TabsTrigger key={name} value={name} className="gap-2 py-2.5 text-sm sm:text-base">
                <Icon className="h-5 w-5" />
                {name}
              </TabsTrigger>
            ))}
          </TabsList>

          {franchiseCategories.map(({ name }) => (
            <TabsContent value={name} key={name} className="mt-6">
              {regulationsByCategory(name).length > 0 ? (
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {regulationsByCategory(name).map((reg) => (
                    <AccordionItem
                      value={reg.id}
                      key={reg.id}
                      className="rounded-lg border-b-0 bg-card shadow-sm"
                    >
                      <AccordionTrigger className="p-4 text-left text-md font-semibold hover:no-underline">
                        {reg.title}
                      </AccordionTrigger>
                      <AccordionContent className="leading-relaxed px-4 pb-4 text-base text-muted-foreground">
                        {reg.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="rounded-lg bg-card py-10 text-center text-muted-foreground shadow-sm">
                  <p>No regulations found for "{searchTerm}" in this category.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
