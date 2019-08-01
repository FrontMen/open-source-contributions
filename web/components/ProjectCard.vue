<template>
  <article class="box is-radiusless	">
    <img v-show="ownerAvatar.length" :src="ownerAvatar" class="avatar" />
    <p class="title is-family-secondary">{{ title }}</p>
    <p class="subtitle">{{ description }}</p>
    <div class="columns is-mobile is-gapless">
      <div class="column is-8">
        <span class="icon-info-wrapper">
          <b-icon icon="star" />
          <span class="icon-info-count star-count">
            {{ starCount }}
          </span>
        </span>
        &nbsp;
        <span class="icon-info-wrapper">
          <b-icon icon="source-fork" />
          <span class="icon-info-count fork-count">
            {{ forkCount }}
          </span>
        </span>
      </div>
      <div class="column is-4 align-right">
        <a :href="url" target="_blank" class="source-link">
          <b-button
            icon-left="github-circle"
            class="is-warning is-family-secondary is-radiusless"
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
    ownerAvatar: {
      type: String,
      default: '@/static/chillicorn.png'
    },
    title: {
      type: String,
      default: 'Title'
    },
    description: {
      type: String,
      default: 'Description'
    },
    starCount: {
      type: Number,
      default: 0
    },
    forkCount: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      default: ''
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
