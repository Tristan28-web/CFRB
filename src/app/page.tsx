import { Header } from '@/components/Header';
import { RegulationBrowser } from '@/components/RegulationBrowser';
import { RegulationSimplifier } from '@/components/RegulationSimplifier';
import { FaqSection } from '@/components/FaqSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <RegulationBrowser />
        <RegulationSimplifier />
        <FaqSection />
      </main>
      <footer className="bg-muted/50 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cadiz Franchising Regulatory Board. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
