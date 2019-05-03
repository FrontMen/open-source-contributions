<template>
  <div>
    <Header />
    <!-- todo: fix form for eding -->
    {{ contribution }}
    <EditRepoForm
      v-if="isCreating"
      :project-form="projectForm"
      :fetch-status="projectForm.fetchStatus"
      :input-messages="inputMessages"
      @toggleCreate="toggleCreate"
      @fetchProject="fetchProject"
      @createProject="createProject"
      @updateProject="updateProject"
      @setNotification="setNotification"
    />
    <Footer />
    <Notification
      v-if="currentNotification"
      :is-open="currentNotification !== null"
      :notification-settings="currentNotification"
      @closeNotification="closeNotification"
      @confirmNotification="confirmNotification"
    />
  </div>
</template>

<script>
import { inputMessages, notificationMessages } from '@/constants/messages.js'
import { updateContribution } from '@/apollo/mutations/mutations.js'
import gql from 'graphql-tag'

export default {
  name: 'AdminOverview',
  components: {
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer'),
    EditRepoForm: () => import('@/components/EditRepoForm'),
    Notification: () => import('@/components/Notification')
  },
  apollo: {
    contribution: {
      // todo: fixme
      query: gql`
        query getContribution($id: ID!) {
          contribution: getContribution(input: { id: $id }) {
            id
            title
            description
            repositoryId
          }
        }
      `,
      variables() {
        // fixme
        return {
          id: this.routeParams.id
        }
      }
    }
  },
  data: () => ({
    currentNotification: null,
    targetId: null,
    inputMessages: inputMessages,
    isCreating: false,
    projectForm: {
      isLoading: false,
      fetchStatus: 'default',
      repositoryId: '',
      title: '',
      description: '',
      owner: {
        name: '',
        avatar: ''
      }
    }
  }),
  computed: {
    routeParams() {
      return this.$route.params
    }
  },
  methods: {
    async updateProject() {
      try {
        const { title, description, repositoryId, id } = this.projectForm

        const mutationResult = await this.$apollo.mutate({
          mutation: updateContribution,
          variables: {
            id: id,
            title: title,
            description: description,
            repositoryId: repositoryId
          }
        })
        await this.$toast.open({
          message: 'Project updated!',
          type: 'is-success',
          position: 'is-bottom'
        })
        return mutationResult
      } catch (error) {
        this.$toast.open({
          message: error,
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
    },
    toggleCreate() {
      this.isCreating = !this.isCreating
      this.resetProjectForm()
    },
    replaceHypens(s) {
      const string = s.replace('-', ' ')
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    setNotification({ type, targetId }) {
      this.currentNotification = notificationMessages[type]
      this.targetId = targetId
    },
    confirmNotification() {
      switch (this.currentNotification.name) {
        case 'deleteProject':
          this.deleteProject()
          break
        case 'cancelCreating':
        case 'cancelEditing':
          this.toggleCreate()
          break
      }
    },
    closeNotification() {
      this.currentNotification = null
    },
    async fetchProject() {
      try {
        this.projectForm.isLoading = true
        const response = await fetch(
          `https://api.github.com/repos/${this.projectForm.repositoryId}`
        )
        const project = await response.json()
        this.projectForm.isLoading = false
        if (project.message) {
          this.projectForm.fetchStatus = 'failed'
        } else {
          this.projectForm = {
            ...this.projectForm,
            title: this.replaceHypens(project.name),
            description: project.description,
            name: project.owner.login,
            avatar: project.owner.avatar_url,
            fetchStatus: 'success'
          }
        }
        return project
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style scoped>
.add-button {
  margin-bottom: 1rem;
}
</style>
