import fastify from 'fastify';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';

import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod";
import { createEvent } from './routes/CreateEvents';
import { registerForEvent } from './routes/CreateForEvents.dto';
import { getEvent } from './routes/GetEvents';
import { getAttendeeBadge } from './routes/GetAttendeeBagde';
import { checkIn } from './routes/CheckIn';
import { getEventAttendees } from './routes/GetEventAttendee';
import { errorHandler } from './errorHandler';

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*'
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o back-end da aplicação pass.in.',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: 'docs',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('HTPP server running')
})