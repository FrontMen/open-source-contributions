import checkSession from './checkSession'

let app, redirect, isStatic

beforeEach(() => {
  app = {
    $apolloHelpers: {
      getToken: jest.fn().mockImplementation(() => {
        return '1111AB'
      }),
      onLogout: jest.fn().mockResolvedValue({})
    },
    apolloProvider: {
      defaultClient: {
        mutate: jest.fn().mockResolvedValue({})
      }
    },
    $cookies: {
      remove: jest.fn()
    }
  }
  isStatic = false
  redirect = jest.fn()
})

describe('checkSession', () => {
  it('should call method getToken', () => {
    checkSession({ app })
    expect(app.$apolloHelpers.getToken).toHaveBeenCalled()
  })

  it('should resolve when there is a token', async () => {
    expect.assertions(1)
    await checkSession({ app })
    expect(app.apolloProvider.defaultClient.mutate).toHaveBeenCalled()
  })

  it('should return nothing when there is no token', async () => {
    expect.assertions(1)
    app.$apolloHelpers.getToken = jest.fn().mockReturnValue('')
    await checkSession({ app })
    expect(app.apolloProvider.defaultClient.mutate).not.toHaveBeenCalled()
  })

  it('should call logout when the login token is invalid', async () => {
    expect.assertions(1)
    app.apolloProvider.defaultClient.mutate = jest.fn().mockRejectedValue(false)
    await checkSession({ app })
    expect(app.$apolloHelpers.onLogout).toHaveBeenCalled()
  })

  it('should call cookies remove and redirect when working server side and the login token is invalid', async () => {
    expect.assertions(2)
    app.apolloProvider.defaultClient.mutate = jest.fn().mockRejectedValue(false)
    process.server = true
    await checkSession({ app, redirect, isStatic })
    expect(app.$cookies.remove).toHaveBeenCalled()
    expect(redirect).toHaveBeenCalled()
  })
})
