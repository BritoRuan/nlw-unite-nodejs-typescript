import { ZodTypeProvider } from "fastify-type-provider-zod"
import EventSchema from "../types/CreateEvents/InterfaceCreateEvents"
import { GenerateTextSlug } from "../utils/GenerateSlug"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"
import { BadRequest } from "./_errors/badRequest"


export async function createEvent(app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().post('/events', {
    schema: {
      summary: 'Create an Event',
      tags: ['events'],
      body: EventSchema,
    }
  }, async (request, reply) => {
    const { title, details, maximumAttendees } = request.body
  
    const slug = GenerateTextSlug(title)
  
    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug,
      }
    })
  
    if(eventWithSameSlug !== null){
      throw new BadRequest('Another event with same title already exists.')
    }
  
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximumAttendees,
        slug,
      }
    })

  return reply.status(201).send(event)
  })
}