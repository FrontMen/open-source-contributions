<template>
  <div>
    <Header />
    <section class="section">
      <div class="container">
        <div class="center">
          <div
            v-if="this.$apollo.queries.allContributions.loading"
            class="loader"
          />
        </div>
        <div class="columns is-multiline">
          <div
            v-for="(project, i) in allContributions"
            :key="i"
            class="column is-6"
          >
            <ProjectCard
              :title="project.title"
              :description="project.description"
              :owner-name="project.repository.owner.login"
              :owner-avatar="project.repository.owner.avatarUrl"
              :url="project.repository.url"
              :star-count="project.repository.stargazers.totalCount"
              :fork-count="project.repository.forks.totalCount"
              :created-at="project.repository.createdAt"
            />
          </div>
        </div>
      </div>
    </section>
    <Footer v-if="!this.$apollo.queries.allContributions.loading" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import getContributions from '@/queries/getContributions'

export default {
  name: 'Overview',
  components: {
    Header,
    Footer,
    ProjectCard
  },
  apollo: {
    allContributions: {
      query: getContributions
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
