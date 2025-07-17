// src/ai/flows/regulation-simplifier.ts
'use server';

/**
 * @fileOverview A regulation simplification AI agent.
 *
 * - simplifyRegulation - A function that handles the regulation simplification process.
 * - SimplifyRegulationInput - The input type for the simplifyRegulation function.
 * - SimplifyRegulationOutput - The return type for the simplifyRegulation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyRegulationInputSchema = z.object({
  regulation: z.string().describe('The complex regulation to simplify.'),
});
export type SimplifyRegulationInput = z.infer<typeof SimplifyRegulationInputSchema>;

const SimplifyRegulationOutputSchema = z.object({
  simplifiedRegulation: z
    .string()
    .describe('The simplified explanation of the regulation.'),
});
export type SimplifyRegulationOutput = z.infer<typeof SimplifyRegulationOutputSchema>;

export async function simplifyRegulation(
  input: SimplifyRegulationInput
): Promise<SimplifyRegulationOutput> {
  return simplifyRegulationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyRegulationPrompt',
  input: {schema: SimplifyRegulationInputSchema},
  output: {schema: SimplifyRegulationOutputSchema},
  prompt: `You are an expert in simplifying complex regulations into easy-to-understand language.

  Please simplify the following regulation:

  Regulation: {{{regulation}}}`,
});

const simplifyRegulationFlow = ai.defineFlow(
  {
    name: 'simplifyRegulationFlow',
    inputSchema: SimplifyRegulationInputSchema,
    outputSchema: SimplifyRegulationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
