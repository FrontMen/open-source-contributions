<template>
  <div>
    <nav
      class="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-item">
        <router-link
          v-if="isAuthenticated"
          :to="getNavButtonProps.path"
          class="button is-warning is-family-secondary is-radiusless"
        >
          {{ getNavButtonProps.text }}
        </router-link>
      </div>
    </nav>
    <header class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <router-link to="/">
                <img
                  src="@/static/fm-monogram-logo.svg"
                  width="50"
                  class="is-pulled-left"
                  :style="{ marginRight: '2rem' }"
                />
              </router-link>
              <h1 class="title is-family-secondary">
                FrontMen Open Source
              </h1>
              <h2 class="subtitle">
                A list of projects FrontMen contributed to
              </h2>
            </div>
            <div class="column align-right">
              <img width="84px" src="@/static/chillicorn.png" />
              <img width="220px" src="@/static/heart-beating.gif" />
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isAuthenticated: false,
      currentPath: this.$router.currentRoute.path
    }
  },
  computed: {
    getNavButtonProps() {
      if (this.isAuthenticated) {
        if (this.currentPath === '/') {
          return { path: '/frontmen', text: 'Admin' }
        }
        if (this.currentPath === '/frontmen') {
          return { path: '/', text: 'Home' }
        }
      }
      return { path: '/frontmen/login', text: 'Admin Login' }
    }
  },
  mounted() {
    this.isAuthenticated = this.$apolloHelpers.getToken()
  }
}
</script>

<style scoped>
.navbar {
  justify-content: flex-end;
  text-align: right;
  padding-right: 0.75rem;
}

.hero-body {
  padding-top: 0.75rem;
  padding-bottom: 2rem;
}
</style>
