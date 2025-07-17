
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SecretaryRegistrationForm } from './_components/SecretaryRegistrationForm';
import { RecentRegistrations } from './_components/RecentRegistrations';
import { EditSecretaryDialog } from './_components/EditSecretaryDialog';


export type SecretaryStatus = 'active' | 'on_leave' | 'inactive';

export interface Secretary {
  id: string;
  name: string;
  email: string;
  role: 'secretary';
  status: SecretaryStatus;
  age?: number;
  birthday?: string;
  location?: string;
  zipCode?: string;
}

const SECRETARIES_STORAGE_KEY = 'secretaries_list';
const ADMIN_LOGGED_IN_KEY = 'isAdminLoggedIn';

export default function AdminDashboard() {
  const router = useRouter();
  const [secretaries, setSecretaries] = useState<Secretary[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [editingSecretary, setEditingSecretary] = useState<Secretary | null>(null);

  // Check auth status
  useEffect(() => {
    const isLoggedIn = localStorage.getItem(ADMIN_LOGGED_IN_KEY);
    if (isLoggedIn !== 'true') {
      router.replace('/login/admin');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  // Load secretaries from localStorage on initial render
  useEffect(() => {
    if (!isCheckingAuth) {
      try {
        const storedSecretaries = localStorage.getItem(SECRETARIES_STORAGE_KEY);
        if (storedSecretaries) {
          setSecretaries(JSON.parse(storedSecretaries));
        }
      } catch (error) {
        console.error('Failed to parse secretaries from localStorage', error);
      }
      setIsLoaded(true);
    }
  }, [isCheckingAuth]);

  // Save secretaries to localStorage whenever the list changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(SECRETARIES_STORAGE_KEY, JSON.stringify(secretaries));
    }
  }, [secretaries, isLoaded]);

  const handleSecretaryRegistered = (newSecretary: Omit<Secretary, 'status'>) => {
    const secretaryWithStatus: Secretary = { ...newSecretary, status: 'active' };
    setSecretaries((prev) => [secretaryWithStatus, ...prev]);
  };

  const handleUpdateSecretaryStatus = (secretaryId: string, status: SecretaryStatus) => {
    setSecretaries(prev =>
      prev.map(sec =>
        sec.id === secretaryId ? { ...sec, status } : sec
      )
    );
  };
  
  const handleEditSecretary = (secretaryId: string) => {
    const secretaryToEdit = secretaries.find(sec => sec.id === secretaryId);
    if (secretaryToEdit) {
        setEditingSecretary(secretaryToEdit);
    }
  };

  const handleSaveChanges = (updatedSecretary: Secretary) => {
     setSecretaries(prev =>
      prev.map(sec =>
        sec.id === updatedSecretary.id ? updatedSecretary : sec
      )
    );
    setEditingSecretary(null);
  };

  if (isCheckingAuth || !isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/50">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
       </div>
    );
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus />
                Register New Secretary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SecretaryRegistrationForm onSecretaryRegistered={handleSecretaryRegistered} />
            </CardContent>
          </Card>
          <Card className="col-span-4">
             <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentRegistrations
                secretaries={secretaries}
                onUpdateStatus={handleUpdateSecretaryStatus}
                onEdit={handleEditSecretary}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <EditSecretaryDialog 
        isOpen={!!editingSecretary}
        onOpenChange={(isOpen) => !isOpen && setEditingSecretary(null)}
        secretary={editingSecretary}
        onSave={handleSaveChanges}
      />
    </>
  );
}
