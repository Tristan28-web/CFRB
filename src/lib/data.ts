import type { LucideIcon } from 'lucide-react';
import { Utensils, Store, Briefcase } from 'lucide-react';

export type FranchiseCategory = 'Food and Beverage' | 'Retail' | 'Services';

export interface Regulation {
  id: string;
  title: string;
  category: FranchiseCategory;
  content: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const franchiseCategories: { name: FranchiseCategory; icon: LucideIcon }[] = [
  { name: 'Food and Beverage', icon: Utensils },
  { name: 'Retail', icon: Store },
  { name: 'Services', icon: Briefcase },
];

export const regulations: Regulation[] = [
  {
    id: 'fb-001',
    title: 'Health and Safety Standards for Food Stalls',
    category: 'Food and Beverage',
    content:
      'All food and beverage franchises must adhere to the latest sanitary regulations as outlined in the Municipal Health Code, including regular inspections, proper food storage temperatures, and staff hygiene protocols. Failure to comply will result in immediate suspension of the operating permit.',
  },
  {
    id: 'fb-002',
    title: 'Calorie Disclosure on Menus',
    category: 'Food and Beverage',
    content:
      'Franchises with 20 or more locations nationally are required to display calorie information for standard menu items. This information must be clearly visible on menus, menu boards, and drive-thru displays.',
  },
  {
    id: 'rt-001',
    title: 'Storefront Signage and Advertising',
    category: 'Retail',
    content:
      'All exterior signage must be approved by the CFRB and comply with local zoning ordinances regarding size, lighting, and placement. Digital and animated signs are subject to special review.',
  },
  {
    id: 'rt-002',
    title: 'Consumer Rights and Return Policies',
    category: 'Retail',
    content:
      'A clear and concise return policy must be displayed at all points of sale. The policy must, at a minimum, comply with the national Consumer Protection Act, offering a 7-day window for returns on non-perishable goods.',
  },
  {
    id: 'sv-001',
    title: 'Professional Licensing and Certification',
    category: 'Services',
    content:
      'All personnel providing professional services (e.g., tutoring, consulting, personal care) must hold valid, up-to-date licenses and certifications as required by their respective professional bodies. Copies of these credentials must be available for inspection upon request.',
  },
  {
    id: 'sv-002',
    title: 'Data Privacy and Client Confidentiality',
    category: 'Services',
    content:
      'Service-based franchises must implement robust data protection measures to safeguard client information, in accordance with the Data Privacy Act of 2012. This includes secure data storage, controlled access, and a clear policy on data sharing.',
  },
];

export const faqs: Faq[] = [
  {
    id: 'faq-1',
    question: 'What is the first step to apply for a franchise permit in Cadiz?',
    answer:
      "The first step is to submit a Letter of Intent to the Cadiz Franchising Regulatory Board (CFRB), along with your business proposal and proof of initial capital. You can find the templates in our 'Forms' section.",
  },
  {
    id: 'faq-2',
    question: 'How often are franchise locations inspected?',
    answer:
      'Inspections vary by franchise type. Food and Beverage establishments are inspected quarterly for health and safety compliance. Retail and Service locations undergo an annual review of their permits and business practices.',
  },
  {
    id: 'faq-3',
    question: 'Can I operate multiple franchise brands under one business entity?',
    answer:
      'Yes, you can operate multiple brands. However, each brand requires a separate franchise permit and must individually meet all regulatory requirements set forth by the CFRB.',
  },
  {
    id: 'faq-4',
    question: 'What are the penalties for non-compliance with regulations?',
    answer:
      'Penalties range from monetary fines to temporary suspension or permanent revocation of the franchise permit, depending on the severity and frequency of the violation. A detailed schedule of penalties is available in Regulation G-012.',
  },
];
