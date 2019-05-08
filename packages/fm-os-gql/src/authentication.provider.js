import { AuthenticationError } from 'apollo-server'
import { OAuth2Client } from 'google-auth-library'

const CLIENT_ID =
  '878769613885-27apk96jh71lo63f8c3o8i1m71mgc94f.apps.googleusercontent.com'
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
      if (hd && hd !== 'frontmen.nl') {
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
