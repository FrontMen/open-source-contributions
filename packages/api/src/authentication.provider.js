import { AuthenticationError } from 'apollo-server'
import { OAuth2Client } from 'google-auth-library'

const CLIENT_ID =
  '878769613885-d9dsqu2c7k7346d5o12bfp085jpp2vvv.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID)

export class AuthenticationAPI {
  constructor() {
    this.client = client
  }

  async verifyToken(token) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
      })

      const { hd } = ticket.getPayload()
      if (hd !== 'frontmen.nl') {
        return false
      }
      return true
    } catch (error) {
      throw new AuthenticationError(
        'Authorization failed: Invalid GoogleUser token'
      )
    }
  }
}
