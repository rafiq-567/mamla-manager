import { z } from 'zod';

export const caseSchema = z.object({
  caseNumber: z.string().min(1, 'Case number is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  caseType: z.enum(['Criminal', 'Civil', 'Family', 'Corporate', 'Labour', 'Tax']),
  status: z.enum(['Filed', 'In Progress', 'Pending', 'Won', 'Lost', 'Settled']).optional(),
  priority: z.enum(['High', 'Medium', 'Low']).optional(),
  client: z.object({
    name: z.string().min(2, 'Client name is required'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
  opponent: z.string().optional(),
  court: z.string().optional(),
  filingDate: z.string().min(1, 'Filing date is required'),
  nextHearingDate: z.string().optional(),
  description: z.string().optional(),
});

export type CaseFormData = z.infer<typeof caseSchema>;