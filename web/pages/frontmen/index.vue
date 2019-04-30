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
        :data="projects"
        :is-loading="isLoading"
        @setNotification="setNotification"
      />
    </Section>
    <Footer v-if="!isLoading && !isCreating" />
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
import { inputMessages, notificationMessages } from '@/utils/messages.mock.js'

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
  data: () => ({
    currentNotification: null,
    inputMessages: inputMessages,
    projects: [],
    isLoading: true,
    isCreating: false,
    projectForm: {
      isLoading: false,
      fetchStatus: 'default',
      ownerAndRepo: '',
      title: '',
      description: '',
      owner: { name: '', avatar: '' }
    }
  }),
  async mounted() {
    await this.fetchProjects()
  },
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
          alert('project is deleted')
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
          alert(
            project.message +
              ' Woops! Are you sure you have entered both the owner and repo name correctly?'
          )
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
    },
    async fetchProjects() {
      try {
        const response = await fetch(
          'https://api.github.com/orgs/frontmen/repos'
        )
        const projects = await response.json()
        const filteredProjects = await projects.map(p => ({
          name: p.name,
          description: p.description,
          owner: p.owner.login,
          avatar: p.owner.avatar_url,
          stargazers_count: p.stargazers_count,
          forks_count: p.forks_count,
          html_url: p.html_url,
          created_at: p.created_at
        }))
        this.projects = filteredProjects
        this.isLoading = false
        return projects
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
