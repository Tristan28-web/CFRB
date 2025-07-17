import { Scale } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-center px-4 md:justify-start">
        <div className="flex items-center gap-3">
          <Scale className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Cadiz Franchising Regulatory Board
            <span className="hidden sm:inline"> (CFRB)</span>
          </h1>
        </div>
      </div>
    </header>
  );
}
