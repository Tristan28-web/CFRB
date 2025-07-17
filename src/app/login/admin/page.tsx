
'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Scale } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';

const ADMIN_LOGGED_IN_KEY = 'isAdminLoggedIn';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem(ADMIN_LOGGED_IN_KEY);
    if (isLoggedIn === 'true') {
      router.replace('/admin/dashboard');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '123') {
        localStorage.setItem(ADMIN_LOGGED_IN_KEY, 'true');
        router.push('/admin/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid email or password.',
        });
        setIsLoading(false);
      }
    }, 500);
  };
  
  if (isCheckingAuth) {
    return (
       <div className="flex items-center justify-center min-h-screen bg-muted/50">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
       </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Scale className="h-8 w-8 text-primary" />
            <CardTitle>Admin Login</CardTitle>
          </div>
          <CardDescription>
            Enter your credentials to access the Admin Portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
