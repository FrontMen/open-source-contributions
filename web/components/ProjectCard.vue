<template>
  <article class="box is-radiusless	">
    <img
      v-show="project.owner.avatar_url.length"
      :src="project.owner.avatar_url"
      class="avatar"
    />
    <p class="title is-family-secondary	">{{ project.name }}</p>
    <p class="subtitle">{{ project.description }}</p>
    <div class="columns is-mobile is-gapless">
      <div class="column is-8">
        <span class="icon-info-wrapper">
          <b-icon icon="star" />
          <span class="icon-info-count">
            {{ project.stargazers_count }}
          </span>
        </span>
        &nbsp;
        <span class="icon-info-wrapper">
          <b-icon icon="source-fork" />
          <span class="icon-info-count">
            {{ project.forks_count }}
          </span>
        </span>
      </div>
      <div class="column is-4 align-right">
        <a :href="project.html_url">
          <b-button
            icon-left="github-circle"
            class="is-warning is-family-secondary is-radiusless	"
          >
            SOURCE
          </b-button>
        </a>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 2.5rem;
}

.icon-info-wrapper {
  min-width: 3rem;
  display: inline-block;
}
.icon-info-count {
  font-size: 1.5rem;
}
</style>
