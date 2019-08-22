import { makeExecutableSchema } from 'apollo-server'
import gql from 'graphql-tag'
import { mergeSchemas } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import merge from 'lodash.merge'
import { createGithubSchema, createGithubResolvers } from './github'
import { contributionResolvers } from './contribution.resolvers'

const contributionSchema = importSchema(`./src/contribution.schema.graphql`)

const localSchema = makeExecutableSchema({
  typeDefs: [contributionSchema],
  resolvers: merge({}, contributionResolvers)
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
