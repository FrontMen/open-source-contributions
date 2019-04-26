<template>
  <div>
    <Header />
    <section class="section">
      <div class="container">
        <b-button
          v-if="!isCreating"
          icon-left="plus"
          class="is-info is-radiusless add-button"
          @click="toggleCreate"
        >
          ADD REPOSITORY
        </b-button>
        <template v-else>
          <h1 class="title">Add a repository</h1>
          <b-field
            label="Github Repository name"
            message="Fill in the name of the repository"
          >
            <b-input value="" icon="github-circle"></b-input>
          </b-field>

          <b-field
            label="Optional Description"
            message="Filling this in will override the github repository description in the view"
          >
            <b-input maxlength="200" type="textarea"></b-input>
          </b-field>
          <b-button
            icon-left="cancel"
            class="is-radiusless is-family-secondary cancel-button"
            @click="toggleCreate"
          >
            CANCEL
          </b-button>

          <b-button
            class="is-warning is-family-secondary is-radiusless	"
            icon-left="check"
          >
            SUBMIT
          </b-button>
        </template>
        <Table v-show="!isCreating" :data="projects" :is-loading="isLoading" />
      </div>
    </section>
    <Footer v-if="!isLoading && !isCreating" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Table from '@/components/Table'

export default {
  name: 'AdminOverview',
  components: {
    Header,
    Footer,
    Table
  },
  data: () => ({
    projects: [],
    isLoading: true,
    isCreating: false
  }),
  async mounted() {
    await this.fetchProjects()
  },
  methods: {
    toggleCreate() {
      this.isCreating = !this.isCreating
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
          hmtl_url: p.html_url,
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

<style>
.add-button {
  margin-bottom: 2rem;
}

.cancel-button {
  margin-right: 1rem;
}
</style>
