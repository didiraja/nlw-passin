import fastify from "fastify"

const app = fastify()

app.get('/', () => {
  return "Hello NLW Unite"
})

app.listen({ port: 5252 }).then(() => {
  console.log('HTTP SERVER RUNNING')
})