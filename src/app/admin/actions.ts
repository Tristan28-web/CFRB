'use server';

import { z } from 'zod';

const registerSecretarySchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

interface ActionResult {
  user?: {
    id: string;
    name: string;
    email: string;
    role: 'secretary';
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
    return { error: 'Invalid fields provided.' };
  }
  
  const { name, email } = validatedFields.data;

  console.log('Attempting to register secretary:');
  console.log('Name:', name);
  console.log('Email:', email);
  // Password is not logged for security reasons.

  // Simulate database interaction and user creation
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real app, you'd check if the user already exists.
  // For now, we'll assume success.
  
  console.log(`Successfully registered ${name}`);

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    role: 'secretary' as const,
  };

  return { user: newUser };
}
