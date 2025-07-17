
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOut } from 'lucide-react';

const ADMIN_LOGGED_IN_KEY = 'isAdminLoggedIn';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_LOGGED_IN_KEY);
    router.push('/login/admin');
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <UserCircle className="h-6 w-6" />
            <span className="sr-only">Admin Portal</span>
            Admin Portal
          </Link>
        </nav>
        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
