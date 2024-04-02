import fastify from 'fastify';
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createEvent } from './routes/CreateEvents';
import { registerForEvent } from './routes/CreateForEvents.dto';
import { getEvent } from './routes/GetEvents';
import { getAttendeeBadge } from './routes/GetAttendeeBagde';

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)

app.listen({ port: 3000 }).then(() => {
  console.log('HTPP server running')
})