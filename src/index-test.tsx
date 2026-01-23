import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello World - Hono is working!')
})

app.get('/test', (c) => {
  return c.json({ status: 'ok', message: 'API is working' })
})

export default app
