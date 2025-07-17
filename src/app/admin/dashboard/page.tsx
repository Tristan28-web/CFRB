'use client';

import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SecretaryRegistrationForm } from './_components/SecretaryRegistrationForm';
import { RecentRegistrations } from './_components/RecentRegistrations';

export type SecretaryStatus = 'active' | 'on_leave' | 'inactive';

export interface Secretary {
  id: string;
  name: string;
  email: string;
  role: 'secretary';
  status: SecretaryStatus;
}

export default function AdminDashboard() {
  const [secretaries, setSecretaries] = useState<Secretary[]>([]);

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
    // Placeholder for edit functionality
    console.log(`Editing secretary ${secretaryId}`);
    // In a real app, this would open a modal or navigate to an edit page
  };


  return (
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
  );
}
