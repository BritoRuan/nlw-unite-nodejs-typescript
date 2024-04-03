import { z } from "zod";

export const AttendeesParamsSchema = z.object({
  attendeeId: z.coerce.number().int()
})

 