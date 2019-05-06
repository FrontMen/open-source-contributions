import gql from 'graphql-tag'

export const SetUser = gql`
  mutation($name: String!, $email: String!, $token: String!) {
    mutation
    setUser(input: { name: $name, email: $email, token: $token }) @client {
      name
      email
      token
      isLoggedIn
    }
  }
`
