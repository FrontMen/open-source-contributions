import gql from 'graphql-tag'

export const userSchema = gql`
  type User {
    name: String!
    email: String!
    token: String!
    isLoggedIn: Boolean!
  }

  input setUserInput {
    name: String!
    email: String!
    token: String!
  }

  type Query {
    getUser: User
  }

  type Mutation {
    setUser(input: setUserInput!): User
  }
`

export default userSchema
