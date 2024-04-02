import { z } from "zod";

const AttendeesParamsSchema = z.object({
  attendeeId: z.coerce.number().int()
})

export default AttendeesParamsSchema