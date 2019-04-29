import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'node-fetch'
import {
  introspectSchema,
  makeRemoteExecutableSchema,
  transformSchema,
  RenameTypes,
  RenameRootFields,
  FilterRootFields
} from 'graphql-tools'

const GITHUB_AUTH_TOKEN = process.env.GITHUB_AUTH_TOKEN
/*
 * - Create the Github schema and set the necessary headers
 * - Transform the schema by prefixing all Types to prevent any conflict between schemas
 * - Transform the schema by filtering out fields we don't want to expose to our end users
 * - Transform the schema by renaming root fields for added clarity
 */
export const createGithubSchema = async () => {
  const http = new HttpLink({ uri: 'https://api.github.com/graphql', fetch })
  const link = setContext(() => ({
    headers: {
      Authorization: `bearer ${GITHUB_AUTH_TOKEN}`
    }
  })).concat(http)

  const schema = await introspectSchema(link)
  const githubSchema = makeRemoteExecutableSchema({
    schema,
    link
  })

  const transformedSchema = transformSchema(githubSchema, [
    new RenameTypes(name => {
      return `Github_${name}`
    }),
    new FilterRootFields((op, fieldName) => {
      return fieldName === 'repository' || fieldName === 'organization'
    }),
    new RenameRootFields((op, fieldName) => {
      if (fieldName === 'repository' && op === 'Query') {
        return 'getGithubRepository'
      }
      if (fieldName === 'organization' && op === 'Query') {
        return 'getGithubOrganization'
      }
      return fieldName
    })
  ])

  return { transformed: transformedSchema, og: githubSchema }
}

/*
 * We create a resolver for our Contribution.repository field,
 * for which we will query the tranformed Github schema.
 * In order to query that information, we always need to retrieve the id field
 * from our original Contribution query, so we include it as a fragment
 * that must always be run, so the user of our server isn't forced to
 * add it to their Contribution queries if they don't really need to.
 * Then we use the information from the id field for the arguments of our query
 * of the respository field of the tranformed Github schema.
 * Note that we use the transformed schema because we don't want to
 * have conflicts using Contribution in the fragment
 * (Contribution type is also present in the original Github schema)!
 */

export const createGithubResolvers = transformedGithubSchema => {
  return {
    Contribution: {
      repository: {
        fragment: '... on Contribution { id }',
        resolve(contribution, _, context, info) {
          const [owner, name] = contribution.id.split('/')
          return info.mergeInfo.delegateToSchema({
            schema: transformedGithubSchema,
            operation: 'query',
            fieldName: 'getGithubRepository',
            args: {
              owner,
              name
            },
            context,
            info
          })
        }
      }
    }
  }
}
