import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import AttendeesParamsSchema from "../types/ParamsRoutes/AttendeeParams/InterfaceParamsAttendee";


export async function getAttendeeBadge(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/attendees/:attendeeId/badge', {
    schema: {
      params: AttendeesParamsSchema
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params

    const attendee = await prisma.attendee.findUnique({
      select: {
        name: true, 
        email: true,
        event: {
          select: {
            title: true
          }
        }
      },
      where: {
        id: attendeeId,
      }
    })

    if(!attendee){
      throw new Error('Attendee not found.')
    }

    return reply.send({ attendee })
  })
}