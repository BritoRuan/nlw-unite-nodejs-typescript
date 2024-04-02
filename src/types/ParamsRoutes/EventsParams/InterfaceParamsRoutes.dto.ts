import { z } from 'zod';

const ParamsSchema = z.object({
  eventId: z.string().uuid(),
})

export default ParamsSchema