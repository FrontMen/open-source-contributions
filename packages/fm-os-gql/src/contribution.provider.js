import { ApolloError } from 'apollo-server'
import admin from './firebase'

export class ContributionAPI {
  constructor() {
    this.collection = 'projects'
    this.db = admin.firestore()
  }

  async getAllContributions() {
    try {
      const result = await this.db.collection(this.collection).get()
      return result.docs.map(i => i.data())
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
