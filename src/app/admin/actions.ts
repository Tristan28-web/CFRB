
'use server';

import { z } from 'zod';

const registerSecretarySchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  middleName: z.string().optional(),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  age: z.string().refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, { message: 'Age must be a positive number.' }),
  birthday: z.string().min(1, { message: 'Birthday is required.' }), // Storing as string for simplicity
  location: z.string().min(2, { message: 'Location is required.' }),
  zipCode: z.string().min(4, { message: 'Zip code is required.' }),
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

interface ActionResult {
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'secretary';
    age: number;
    birthday: string;
    location: string;
    zipCode: string;
  };
  error?: string;
}

// This is a mock function. In a real application, you would use
// Firebase Auth or another identity provider to create a user.
export async function registerSecretaryAction(
  values: z.infer<typeof registerSecretarySchema>
): Promise<ActionResult> {
  const validatedFields = registerSecretarySchema.safeParse(values);

  if (!validatedFields.success) {
    // Construct a more detailed error message
    const errorMessages = validatedFields.error.errors.map(e => e.message).join(' ');
    return { error: `Invalid fields provided: ${errorMessages}` };
  }
  
  const { firstName, middleName, lastName, email, age, birthday, location, zipCode } = validatedFields.data;

  // Combine names for display
  const name = [firstName, middleName, lastName].filter(Boolean).join(' ');

  console.log('Attempting to register secretary with detailed info:');
  console.log(validatedFields.data);
  // Password is not logged for security reasons.

  // Simulate database interaction and user creation
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you'd check if the user already exists.
  // For now, we'll assume success.
  
  console.log(`Successfully registered ${name}`);

  const newUser = {
    id: crypto.randomUUID(),
    name, // The combined name
    email,
    role: 'secretary' as const,
    age: parseInt(age, 10),
    birthday,
    location,
    zipCode
  };

  return { user: newUser };
}
