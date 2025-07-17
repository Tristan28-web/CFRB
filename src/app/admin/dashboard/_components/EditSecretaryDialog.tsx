
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';
import type { Secretary } from '../page';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  age: z.string().refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, { message: 'Age must be a positive number.' }),
  birthday: z.string().min(1, { message: 'Birthday is required.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  zipCode: z.string().min(4, { message: 'Zip code is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditSecretaryDialogProps {
  secretary: Secretary | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (updatedSecretary: Secretary) => void;
}

export function EditSecretaryDialog({ secretary, isOpen, onOpenChange, onSave }: EditSecretaryDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      age: '',
      birthday: '',
      location: '',
      zipCode: '',
      email: '',
    },
  });

  useEffect(() => {
    if (secretary) {
      const names = secretary.name.split(' ');
      const firstName = names[0] || '';
      const lastName = names.length > 1 ? names[names.length - 1] : '';
      const middleName = names.length > 2 ? names.slice(1, -1).join(' ') : '';
      
      form.reset({
        firstName,
        lastName,
        middleName,
        email: secretary.email,
        age: secretary.age?.toString() || '',
        birthday: secretary.birthday || '',
        location: secretary.location || '',
        zipCode: secretary.zipCode || '',
      });
    }
  }, [secretary, form]);

  async function onSubmit(values: FormValues) {
    if (!secretary) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const name = [values.firstName, values.middleName, values.lastName].filter(Boolean).join(' ');

    const updatedSecretary: Secretary = {
        ...secretary,
        name,
        email: values.email,
        age: parseInt(values.age, 10),
        birthday: values.birthday,
        location: values.location,
        zipCode: values.zipCode,
    };

    onSave(updatedSecretary);
    setIsLoading(false);
    onOpenChange(false);
    toast({
      title: 'Success',
      description: 'Secretary details have been updated.',
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Secretary</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="middleName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
               <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
