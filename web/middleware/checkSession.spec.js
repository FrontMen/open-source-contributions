import checkSession from './checkSession'
const app = {
  $apolloHelpers: {
    getToken: jest.fn().mockImplementation(() => {
      return '1111AB'
    }),
    onLogout: jest.fn()
  },
  apolloProvider: {
    defaultClient: jest.fn()
  }
}

describe('checkSession', () => {
  it('should call method getToken', () => {
    checkSession({ app })
    expect(app.$apolloHelpers.getToken).toHaveBeenCalled()
  })

  it('should return nothing when there is no token', () => {
    const result = checkSession({ app })
    expect(result).resolves.toEqual('1111AB')
  })
})
