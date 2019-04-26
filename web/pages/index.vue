<template>
  <div>
    <Header />
    <section class="section">
      <div class="container">
        <div class="center">
          <div v-if="loading" class="loader" />
        </div>
        <div class="columns is-multiline">
          <div v-for="(project, i) in projects" :key="i" class="column is-6">
            <ProjectCard :project="project" />
          </div>
        </div>
      </div>
    </section>
    <Footer v-if="!loading" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'

export default {
  name: 'Overview',
  components: {
    Header,
    Footer,
    ProjectCard
  },
  data: () => ({
    projects: [],
    loading: true
  }),
  async mounted() {
    await this.fetchProjects()
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await fetch(
          'https://api.github.com/orgs/frontmen/repos'
        )
        const projects = await response.json()
        this.projects = projects
        this.loading = false
        return projects
      } catch (err) {
        throw err
      }
    }
  }
}
</script>

<style>
.loader {
  border: 8px solid var(--lightgrey); /* Light grey */
  border-top: 8px solid var(--orange); /* Blue */
  border-radius: 50%;
  width: 75px;
  height: 75px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
