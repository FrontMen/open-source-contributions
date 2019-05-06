export const userResolvers = {
  Query: {
    getUser: () => {
      return {
        // cache.readQuery({ query: GET_CART_ITEMS })
        __typename: 'User',
        name: 'staticUser',
        email: 'tets@test.nl',
        token: 'fdafd',
        isLoggedIn: true
      }
    }
    // Or make a remote API call
  },
  Mutation: {
    setUser: (root, args, context, info) => {
      return {
        __typename: 'User',
        name: 'staticUser',
        email: 'tets@test.nl',
        token: 'fdafd',
        isLoggedIn: true
      }
    }
  }
}

export default userResolvers
