import localResolvers from './../apollo/resolvers/user.resolvers'
import localSchema from './../apollo/schema/schema'

export default function() {
  return {
    onCacheInit: cache => {
      const data = {
        user: {
          __typename: 'User',
          name: '',
          email: '',
          token: '',
          isLoggedIn: false
        }
      }
      cache.writeData({ data })
    },
    typeDefs: localSchema,
    resolvers: localResolvers
  }
}
