import { makeExecutableSchema } from 'apollo-server'
import gql from 'graphql-tag'
import { mergeSchemas } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import { createGithubSchema, createGithubResolvers } from './github'
import { ContributionAPI } from './contribution.provider'

const schema = importSchema(`./src/contribution.schema.graphql`)
const api = new ContributionAPI()

const localSchema = makeExecutableSchema({
  typeDefs: [schema],
  resolvers: {
    Query: {
      async getContributions() {
        return api.getAllContributions()
      },
      async getContribution(_, { input }) {
        const { id } = input
        return api.getContribution(id)
      }
    },
    Mutation: {
      async addContribution(_, { input }) {
        return api.addContribution(input)
      },
      async updateContribution(_, { input }) {
        const { id, newData } = input
        return api.updateContribution(id, newData)
      }
    }
  }
})

const createSchema = async () => {
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

  return finalSchema
}

export default createSchema
