<template>
  <div>
    <Header />
    <EditRepoForm
      v-if="isCreating"
      :project-form="projectForm"
      :fetch-status="projectForm.fetchStatus"
      :input-messages="inputMessages"
      @toggleCreate="toggleCreate"
      @fetchProject="fetchRepository"
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
import getContribution from '@/apollo/queries/getContribution.js'

export default {
  name: 'AdminOverview',
  components: {
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer'),
    EditRepoForm: () => import('@/components/EditRepoForm'),
    Notification: () => import('@/components/Notification')
  },
  data: () => ({
    currentNotification: null,
    inputMessages: inputMessages,
    isCreating: true,
    projectForm: {
      isLoading: false,
      fetchStatus: 'default',
      repositoryId: '',
      title: '',
      description: ''
    }
  }),
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted: function() {
    this.fetchProject(this.id)
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
    async fetchProject(id) {
      try {
        const { data, loading } = await this.$apollo.query({
          query: getContribution,
          variables: { id },
          errorPolicy: 'all'
        })

        if (loading) {
          this.projectForm.isLoading = true
        }

        if (data) {
          // if when can get an id back, github repository still exists
          const fetchStatus =
            data.contribution.repository && data.contribution.repository.id
              ? 'success'
              : 'failed'
          this.projectForm = {
            ...this.projectForm,
            ...data.contribution,
            fetchStatus,
            isLoading: false
          }
        }
      } catch (error) {
        // @TODO handle errors better/in UI
        console.log(error)
      }
    },
    toggleCreate() {
      this.$router.push('/frontmen')
    },
    setNotification({ type, targetId }) {
      this.currentNotification = notificationMessages[type]
      this.targetId = targetId
    },
    confirmNotification() {
      // @TODO refactor into pure function?
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
      // @TODO refactor into Apollo client state?
      this.currentNotification = null
    },
    async fetchRepository(id) {
      // @TODO replace with GQL call
      try {
        this.projectForm.isLoading = true
        const response = await fetch(`https://api.github.com/repos/${id}`)
        const project = await response.json()
        this.projectForm.isLoading = false
        if (project.message) {
          this.projectForm.fetchStatus = 'failed'
        } else {
          this.projectForm.fetchStatus = 'success'
        }
        return project
      } catch (err) {
        console.log(err)
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
