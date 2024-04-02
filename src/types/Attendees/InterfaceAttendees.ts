import { z } from 'zod';

export const AttendeesSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
})


export const responseAttendees = z.object({
  attendeeId: z.number()
})
