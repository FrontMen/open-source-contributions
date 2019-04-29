import { makeExecutableSchema } from 'apollo-server'
import gql from 'graphql-tag'
import { mergeSchemas } from 'graphql-tools'
import { createGithubSchema, createGithubResolvers } from './github'
import { ContributionAPI } from './contribution.provider'

const api = new ContributionAPI()

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
      async getContributions() {
        const contributions = await api.getAllContributions()
        return contributions
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
