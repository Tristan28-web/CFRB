'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Secretary } from '../page';

interface RecentRegistrationsProps {
  secretaries: Secretary[];
}

export function RecentRegistrations({ secretaries }: RecentRegistrationsProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {secretaries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="h-24 text-center">
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
                <TableCell className="text-right">{secretary.email}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
