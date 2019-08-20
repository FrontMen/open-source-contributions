import gql from 'graphql-tag'

export const createContribution = gql`
  mutation($title: String!, $description: String!, $repositoryId: String!) {
    addContribution(
      input: {
        title: $title
        description: $description
        repositoryId: $repositoryId
      }
    ) {
      id
      title
      description
    }
  }
`

export const updateContribution = gql`
  mutation(
    $title: String!
    $description: String!
    $repositoryId: String!
    $id: ID!
  ) {
    updateContribution(
      input: {
        id: $id
        newData: {
          title: $title
          description: $description
          repositoryId: $repositoryId
        }
      }
    ) {
      id
      title
      description
    }
  }
`
export const deleteContribution = gql`
  mutation($id: ID!) {
    deleteContribution(input: { id: $id }) {
      id
    }
  }
`

export const verifyToken = gql`
  mutation($idToken: String!) {
    verifyToken(input: { token: $idToken })
  }
`
