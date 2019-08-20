import { verifyToken } from '@/apollo/mutations/mutations.js'

export default async function({ app, redirect, isStatic }) {
  const token = app.$apolloHelpers.getToken()
  if (token) {
    const apolloClient = app.apolloProvider.defaultClient
    const isValid = await apolloClient
      .mutate({
        mutation: verifyToken,
        variables: {
          idToken: token
        }
      })
      .then(({ data }) => {
        return data.verifyToken
      })
      .catch(() => {
        return false
      })

    if (isValid === false) {
      // logout the user
      await app.$apolloHelpers.onLogout()

      if (!isStatic && process.server) {
        // logout does not work server side, so use node to remove cookies and manually redirect
        // just not to get any funny situations in dev mode or a possible future SSR version
        await app.$cookies.remove('FM_OS_APOLLO_USER_TOKEN')
        redirect(302, '/frontmen/login')
      }
    }
  }
}
