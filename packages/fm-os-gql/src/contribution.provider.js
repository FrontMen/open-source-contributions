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
      return result.docs.map(i => {
        return { ...i.data(), id: i.id }
      })
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  async getContribution(id) {
    try {
      const ref = this.db.collection(this.collection).doc(`${id}`)
      const doc = await ref.get()
      if (!doc.exists) {
        return null
      }
      return {
        id,
        ...doc.data()
      }
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  async addContribution(data) {
    try {
      const result = await this.db.collection(this.collection).add({ ...data })
      return this.getContribution(result.id)
    } catch (error) {
      throw new ApolloError(error)
    }
  }

  async updateContribution(id, newData) {
    try {
      const ref = this.db.collection(this.collection).doc(`${id}`)
      await ref.update({ ...newData })

      return this.getContribution(id)
    } catch (error) {
      throw new ApolloError(error)
    }
  }
}
