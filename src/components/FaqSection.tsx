import { faqs } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export function FaqSection() {
  return (
    <section id="faq" className="w-full bg-muted/50 py-12 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold font-headline tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Find answers to common questions about franchising regulations in Cadiz.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem value={faq.id} key={faq.id}>
              <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-base text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
