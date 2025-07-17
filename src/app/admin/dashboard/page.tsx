import { UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SecretaryRegistrationForm } from './_components/SecretaryRegistrationForm';

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus />
              Register New Secretary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SecretaryRegistrationForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
