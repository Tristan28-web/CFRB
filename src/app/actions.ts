'use server';

import { simplifyRegulation } from '@/ai/flows/regulation-simplifier';

interface ActionResult {
  simplifiedText?: string;
  error?: string;
}

export async function simplifyRegulationAction(
  regulationText: string
): Promise<ActionResult> {
  if (!regulationText || regulationText.trim().length === 0) {
    return { error: 'Please enter a regulation to simplify.' };
  }

  try {
    const result = await simplifyRegulation({ regulation: regulationText });
    return { simplifiedText: result.simplifiedRegulation };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred. Please try again later.' };
  }
}
