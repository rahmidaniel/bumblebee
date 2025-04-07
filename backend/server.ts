import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import honeyListJson from './mock-data/honey-list.json'
import type { AuthData, HoneyItem } from './types/server.interfaces.ts'

const honeyList = honeyListJson as HoneyItem[]

const server = Fastify({ logger: true })

server.register(fastifyCors, { origin: '*' })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.get('/list/honey', async (_request, _reply) => {
  return honeyList
})

server.post('/login', async (request, reply) => {
  const { username, password } = request.body as AuthData
  if (username === 'test1' && password === 'test-pass') {
    reply.code(200).send({ success: true })
  } else {
    reply.code(403).send({ error: 'unauthorized' })
  }
})

server.post('/order', async (request, reply) => {
  try {
    const orderData = request.body
    console.log('Order [success]:', JSON.stringify(orderData, null, 2))
    reply.code(200).send({ status: 'Order successful' })
  } catch (error) {
    reply.code(500).send({ error: `Internal Server Error: ${error}` })
  }
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
