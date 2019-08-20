import gql from 'graphql-tag'

export const getContributions = gql`
  query {
    allContributions: getContributions {
      title
      description
      id
      repository {
        createdAt
        name
        description
        url
        stargazers {
          totalCount
        }
        forks {
          totalCount
        }
        owner {
          login
          avatarUrl
        }
      }
    }
  }
`

export default getContributions
