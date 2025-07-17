'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Secretary, SecretaryStatus } from '../page';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface RecentRegistrationsProps {
  secretaries: Secretary[];
  onUpdateStatus: (secretaryId: string, status: SecretaryStatus) => void;
  onEdit: (secretaryId: string) => void;
}

const statusVariant: Record<SecretaryStatus, 'default' | 'secondary' | 'destructive'> = {
  active: 'default',
  on_leave: 'secondary',
  inactive: 'destructive',
};


export function RecentRegistrations({ secretaries, onUpdateStatus, onEdit }: RecentRegistrationsProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {secretaries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No new secretaries registered yet.
              </TableCell>
            </TableRow>
          ) : (
            secretaries.map((secretary) => (
              <TableRow key={secretary.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                       <AvatarFallback>{secretary.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{secretary.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[secretary.status]} className="capitalize">
                      {secretary.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{secretary.email}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                Manage
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                             <DropdownMenuItem onClick={() => onEdit(secretary.id)}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onUpdateStatus(secretary.id, 'active')}>Set Active</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdateStatus(secretary.id, 'on_leave')}>Set On Leave</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onUpdateStatus(secretary.id, 'inactive')}>Set Inactive</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
