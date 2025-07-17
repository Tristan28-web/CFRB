'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { simplifyRegulationAction } from '@/app/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Lightbulb, LoaderCircle } from 'lucide-react';
import { Separator } from './ui/separator';

export function RegulationSimplifier() {
  const [regulationText, setRegulationText] = useState('');
  const [simplifiedText, setSimplifiedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSimplifiedText('');

    const result = await simplifyRegulationAction(regulationText);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } else if (result.simplifiedText) {
      setSimplifiedText(result.simplifiedText);
    }

    setIsLoading(false);
  };

  return (
    <section id="simplifier" className="w-full py-12 md:py-20">
      <Card className="mx-auto w-full max-w-3xl shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="font-headline text-2xl">Regulation Simplifier</CardTitle>
              <CardDescription>Let AI help you understand complex legal text.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Paste a complex regulation here..."
              value={regulationText}
              onChange={(e) => setRegulationText(e.target.value)}
              rows={6}
              className="w-full text-base"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !regulationText.trim()}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Simplifying...
                </>
              ) : (
                'Simplify with AI'
              )}
            </Button>
          </form>
          {simplifiedText && (
            <div className="mt-6">
              <Separator className="my-4" />
              <h3 className="mb-2 text-lg font-semibold">Simplified Explanation</h3>
              <div className="prose prose-blue max-w-none rounded-md bg-muted/50 p-4 whitespace-pre-wrap">
                <p>{simplifiedText}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
