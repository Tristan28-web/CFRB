import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Select a role to view the dashboard</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild>
            <Link href="/admin/dashboard">Admin Dashboard</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/secretary/dashboard">Secretary Dashboard</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/operator/dashboard">Operator Dashboard</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/driver/dashboard">Driver Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
