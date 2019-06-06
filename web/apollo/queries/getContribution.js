import gql from 'graphql-tag'

export const getContribution = gql`
  query($id: ID!) {
    contribution: getContribution(input: { id: $id }) {
      title
      description
      id
      repositoryId
      repository {
        id
      }
    }
  }
`

export default getContribution
