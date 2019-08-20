import { ApolloServer } from 'apollo-server'

export async function bootstrap({ schema, context }) {
  const server = new ApolloServer({
    schema,
    context,
    introspection: true,
    tracing: true,
    playground: true
  })

  await server
    .listen({ port: process.env.PORT || 4000 })
    .then(({ url }) => console.log(`🚀 server on ${url}`))
    .catch(console.error.bind(console))
}
