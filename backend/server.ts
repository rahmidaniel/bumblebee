import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import honeyListJson from './mock-data/honey-list.json'
import type { AuthData, HoneyItem } from './types/server.interfaces.ts'

const honeyList = honeyListJson as HoneyItem[]

const server = Fastify({ logger: true })

server.register(fastifyCors, {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})

server.get('/list/honey', async (_request, reply) => {
  reply.send({
    status: 'success',
    message: 'Honey list retrieved successfully',
    data: honeyList,
  })
})

server.post('/login', async (request, reply) => {
  const { username, password } = request.body as AuthData
  if (username === 'test1' && password === 'test-pass') {
    reply.code(200).send({
      status: 'success',
      message: 'Login successful',
      data: true,
    })
  } else {
    reply.code(403).send({
      status: 'error',
      message: 'Invalid credentials',
      data: null,
    })
  }
})

server.post('/order', async (request, reply) => {
  try {
    const orderData = request.body
    console.log('Order [success]:', JSON.stringify(orderData, null, 2))
    reply.code(200).send({
      status: 'success',
      message: 'Order successful',
      data: undefined,
    })
  } catch (error) {
    reply.code(500).send({
      status: 'error',
      message: `Internal Server Error: ${error}`,
      data: null,
    })
  }
})

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
