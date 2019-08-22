<template>
  <div>
    <Header />
    <CreateRepoForm
      v-if="isCreating"
      :project-form="projectForm"
      :fetch-status="projectForm.fetchStatus"
      :input-messages="inputMessages"
      @toggleCreate="toggleCreate"
      @fetchProject="fetchProject"
      @createProject="createProject"
      @setNotification="setNotification"
    />
    <Section>
      <b-button
        v-if="!isCreating"
        icon-left="plus"
        class="is-info is-radiusless add-button"
        @click="toggleCreate"
      >
        ADD REPOSITORY
      </b-button>
      <Table
        v-show="!isCreating"
        :data="allContributions"
        :is-loading="this.$apollo.queries.allContributions.loading"
        @setNotification="setNotification"
        @updateProject="updateProject"
      />
    </Section>
    <Footer
      v-if="!this.$apollo.queries.allContributions.loading && !isCreating"
    />
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
import getContributions from '@/apollo/queries/getContributions.js'
import {
  createContribution,
  deleteContribution
} from '@/apollo/mutations/mutations.js'
import replaceHyphens from '@/utils/replaceHyphens'

export default {
  name: 'AdminOverview',
  components: {
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer'),
    Table: () => import('@/components/Table'),
    Section: () => import('@/components/Section'),
    CreateRepoForm: () => import('@/components/CreateRepoForm'),
    Notification: () => import('@/components/Notification')
  },
  middleware: ['checkSession', 'checkAuthorization'],
  apollo: {
    allContributions: {
      query: getContributions
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
  methods: {
    async deleteProject() {
      try {
        const mutationResult = await this.$apollo.mutate({
          mutation: deleteContribution,
          variables: {
            id: this.targetId
          },
          update: (store, { data: { deleteContribution } }) => {
            const data = store.readQuery({ query: getContributions })
            const updatedData = {
              ...data,
              allContributions: data.allContributions.filter(
                c => c.id !== deleteContribution.id
              )
            }
            store.writeQuery({ query: getContributions, data: updatedData })
          },
          optimisticResponse: {
            __typename: 'Mutation',
            deleteContribution: {
              id: this.targetId,
              __typename: 'deletedContribution'
            }
          }
        })
        await this.$toast.open({
          message: 'Project has been deleted!',
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
    async createProject() {
      try {
        const { title, description, repositoryId } = this.projectForm

        await this.$apollo.mutate({
          mutation: createContribution,
          variables: {
            title: title,
            description: description,
            repositoryId: repositoryId
          },
          refetchQueries: [{ query: getContributions }],
          awaitRefetchQueries: true
        })

        await this.$toast.open({
          message: 'Project created!',
          type: 'is-success',
          position: 'is-bottom'
        })

        this.toggleCreate()
      } catch (error) {
        this.$toast.open({
          message: error,
          type: 'is-danger',
          position: 'is-bottom'
        })
      }
    },

    updateProject(id) {
      this.$router.push({ path: `/frontmen/${id}` })
    },
    resetProjectForm() {
      this.projectForm = {
        isLoading: false,
        fetchStatus: 'default',
        repositoryId: '',
        title: '',
        description: '',
        owner: { name: '', avatar: '' }
      }
    },
    toggleCreate() {
      this.isCreating = !this.isCreating
      this.resetProjectForm()
    },
    setNotification({ type, targetId }) {
      this.currentNotification = notificationMessages[type]
      this.targetId = targetId
    },
    confirmNotification() {
      switch (this.currentNotification.name) {
        case 'deleteProject':
          // todo: bind to delete mutation/api call
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
      // @TODO replace with apollo query
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
            title: replaceHyphens(project.name),
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
