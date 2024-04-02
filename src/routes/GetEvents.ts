import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import ParamsSchema from "../types/ParamsRoutes/EventsParams/InterfaceParamsRoutes.dto";
import { prisma } from "../lib/prisma";
import { responseGetEvents } from "../types/GetEvents/InterfaceGetEvents";


export async function getEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/events/:eventId', {
    schema: {
      params: ParamsSchema,
      response: {
        200: responseGetEvents
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params

    const event = await prisma.event.findUnique({
      select: {
        id: true,
        title: true, 
        slug: true,
        details: true,
        maximumAttendees: true,
        _count: {
          select: {
            attendees: true
          }
        }
      },
      where: {
        id: eventId,
      }
    })

    if(!event){
      throw new Error('Event not found.')
    }

    return reply.send({
      id: event.id,
      title: event.title,
      slug: event.slug,
      details: event.details,
      maximumAttendees: event.maximumAttendees,
      attendeesAmount: event._count.attendees,
    })
  }
)}