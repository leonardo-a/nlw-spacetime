import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import jwt from '@fastify/jwt'

import { memoriesRoutes } from './routes/memories.routes'
import { authRoutes } from './routes/auth.routes'
import { uploadRoutes } from './routes/upload.routes'
import { resolve } from 'node:path'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(multipart)

app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(jwt, {
  secret: 'spacetimenlw122023',
})

app.register(memoriesRoutes, {
  prefix: '/memories',
})

app.register(uploadRoutes, {
  prefix: '/upload',
})

app.register(authRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`🚀 Server running on http://localhost:3333`)
  })
