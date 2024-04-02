import { z } from 'zod';

export const responseGetEvents = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  details: z.string().nullable(),
  maximumAttendees: z.number().int().nullable(),
  attendeesAmount: z.number().int()
})
