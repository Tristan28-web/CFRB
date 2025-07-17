import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to the System</h1>
        <p className="text-lg text-muted-foreground mb-8">Please log in to access your dashboard.</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </main>
      <footer className="py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CFRB. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
