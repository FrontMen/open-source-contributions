import { ContributionAPI } from './contribution.provider'
import { AuthenticationAPI } from './authentication.provider'
const auth = new AuthenticationAPI()
const api = new ContributionAPI()

export const contributionResolvers = {
  Query: {
    async getContributions() {
      return api.getAllContributions()
    },
    async getContribution(_, { input }) {
      const { id } = input
      return api.getContribution(id)
    },
    getToken() {
      return 'test'
    }
  },
  Mutation: {
    async addContribution(_, { input }) {
      return api.addContribution(input)
    },
    async updateContribution(_, { input }) {
      const { id, newData } = input
      return api.updateContribution(id, newData)
    },
    async deleteContribution(_, { input }) {
      const { id } = input
      return api.deleteContribution(id)
    },
    // TODO seperate into different modules
    async verifyToken(_, { input }) {
      const { token } = input
      return auth.verifyToken(token)
    }
  }
}
