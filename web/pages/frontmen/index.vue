<template>
  <div>
    <Header />
    <RepoForm
      v-if="isCreating"
      :project-form="projectForm"
      :fetch-status="projectForm.fetchStatus"
      :input-messages="inputMessages"
      @toggleCreate="toggleCreate"
      @fetchProject="fetchProject"
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
import getContributions from '@/queries/getContributions'

export default {
  name: 'AdminOverview',
  components: {
    Header: () => import('@/components/Header'),
    Footer: () => import('@/components/Footer'),
    Table: () => import('@/components/Table'),
    Section: () => import('@/components/Section'),
    RepoForm: () => import('@/components/RepoForm'),
    Notification: () => import('@/components/Notification')
  },
  apollo: {
    allContributions: {
      query: getContributions
    }
  },
  data: () => ({
    currentNotification: null,
    inputMessages: inputMessages,
    isCreating: false,
    projectForm: {
      isLoading: false,
      fetchStatus: 'default',
      ownerAndRepo: '',
      title: '',
      description: '',
      owner: {
        name: '',
        avatar: ''
      }
    }
  }),
  methods: {
    resetProjectForm() {
      this.projectForm = {
        isLoading: false,
        fetchStatus: 'default',
        ownerAndRepo: '',
        title: '',
        description: '',
        owner: { name: '', avatar: '' }
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
    setNotification({ type }) {
      this.currentNotification = notificationMessages[type]
    },
    confirmNotification() {
      switch (this.currentNotification.name) {
        case 'deleteProject':
          // todo: bind to delete mutation/api call
          alert('Not yet implemented')
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
    deleteProject() {
      alert('project has been deleted')
    },
    async fetchProject() {
      try {
        this.projectForm.isLoading = true
        const response = await fetch(
          `https://api.github.com/repos/${this.projectForm.ownerAndRepo}`
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
