import { z } from 'zod';

export const attendeesSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
})


export const responseAttendees = z.object({
  attendeeId: z.number()
})

export const responseGetAttendee = z.object({
  name: z.string(),
  email: z.string().email(),
  eventTitle: z.string(),
  checkInURL: z.string().url()
})