import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {  attendeesSchema, responseAttendees } from "../types/Attendees/InterfaceAttendees";
import { prisma } from "../lib/prisma";
import ParamsSchema from "../types/ParamsRoutes/EventsParams/InterfaceParamsRoutes.dto";
import { BadRequest } from "./_errors/badRequest";

export async function registerForEvent(app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().post('/events/:eventId/attendees', {
    schema: {
      summary: 'Register an attendee',
      tags: ['attendees'],
      body: attendeesSchema,
      params: ParamsSchema,
      response: {
        200: responseAttendees,
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params
    const { name, email } = request.body

    const attendeeFromEmail = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email, 
          eventId
        }
      }
    })

    if(attendeeFromEmail !== null){
      throw new BadRequest('This e-mail is already registered for this event.')
    }

    const [event, amountAttendeesForEvent] = await Promise.all([
      prisma.event.findUnique({
        where: {
          id: eventId,
        }
      }),
      prisma.attendee.count({
        where: {
          eventId
        }
      })
    ])
  

    if(event?.maximumAttendees && amountAttendeesForEvent >= event?.maximumAttendees){
      throw new Error('The maximum number of attendees for this event has been reached.')

    }

    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId
      }
    })

    return reply.status(201).send({ attendeeId: attendee.id})

  })
}