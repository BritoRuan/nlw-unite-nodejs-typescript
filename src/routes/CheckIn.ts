import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AttendeesParamsSchema } from "../types/ParamsRoutes/AttendeeParams/InterfaceParamsAttendee";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { BadRequest } from "./_errors/badRequest";

export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/attendees/:attendeeId/check-in', {
    schema: {
      summary: 'Check-in attendee',
      tags: ['check-ins'],
      params: AttendeesParamsSchema,
      response: {
        201: z.null(),
      }
    }
  }, async (request, reply) => {
    const { attendeeId } = request.params

    const attendeeCheckIn = await prisma.checkIn.findUnique({
      where: {
        attendeeId
      }
    })

    if(attendeeCheckIn !== null){
      throw new BadRequest('Attendee already checked in!')
    }

    await prisma.checkIn.create({
      data: {
        attendeeId
      }
    })

    return reply.status(201).send()
  })
}