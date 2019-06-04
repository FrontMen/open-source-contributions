<template>
  <div>
    <nav class="navbar is-black" role="navigation" aria-label="main navigation">
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link v-if="isAuthenticated" to="/frontmen">Admin</router-link>
        </div>
        <div class="navbar-item">
          <div v-if="!isAuthenticated" class="buttons">
            <router-link
              to="/frontmen/login"
              class="button is-warning is-family-secondary is-radiusless"
              >Admin Login</router-link
            >
          </div>
        </div>
      </div>
    </nav>
    <header class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <img
                src="@/static/fm-monogram-logo.svg"
                width="50"
                class="is-pulled-left"
                :style="{ marginRight: '2rem' }"
              />
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
          <div class="columns">
            <div class="column"></div>
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
      isAuthenticated: false
    }
  },
  mounted() {
    this.isAuthenticated = this.$apolloHelpers.getToken()
  }
}
</script>
