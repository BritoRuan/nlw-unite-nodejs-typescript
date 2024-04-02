import { z } from 'zod';

const EventSchema = z.object({
  title: z.string().min(4),
  details: z.string().nullable(),
  maximumAttendees: z.number().int().positive().nullable()
})

export default EventSchema