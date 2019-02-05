import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import gql from 'graphql-tag'
import { mergeSchemas } from 'graphql-tools'
import { createGithubSchema, createGithubResolvers } from './github'

const typeDefs = gql`
  type Contribution {
    title: String
    description: String
    id: String
  }

  type Query {
    getContributions: [Contribution]
  }
`

const localSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      getContributions() {
        // TODO put actual firebase query here to retrieve data
        return [
          {
            title: 'test title',
            description: 'description test',
            id: 'Und3Rdo9/vue-chuck'
          },
          {
            title: 'test title 2',
            description: 'description test2',
            id: 'Und3Rdo9/vue-chuck'
          }
        ]
      }
    }
  }
})

const createServer = async () => {
  const extendedContribution = gql`
    extend type Contribution {
      repository: Github_Repository
    }
  `
  const { transformed } = await createGithubSchema()

  const finalSchema = mergeSchemas({
    schemas: [localSchema, transformed, extendedContribution],
    resolvers: createGithubResolvers(transformed)
  })

  const server = new ApolloServer({
    schema: finalSchema
  })

  server
    .listen()
    .then(({ url }) => console.log(`server on ${url}`))
    .catch(console.error.bind(console))
}

createServer()
