import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Scale } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
             <Scale className="h-8 w-8 text-primary" />
             <CardTitle>CFRB Portal</CardTitle>
          </div>
          <CardDescription>Select a role to log in</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild>
            <Link href="/login/admin">Admin Login</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/secretary/dashboard">Secretary Login</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/operator/dashboard">Operator Login</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/driver/dashboard">Driver Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
