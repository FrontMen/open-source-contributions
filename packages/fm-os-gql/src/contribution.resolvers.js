import { ContributionAPI } from './contribution.provider'
const api = new ContributionAPI()

export const contributionResolvers = {
  Query: {
    async getContributions() {
      return api.getAllContributions()
    },
    async getContribution(_, { input }) {
      const { id } = input
      return api.getContribution(id)
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
    }
  }
}
