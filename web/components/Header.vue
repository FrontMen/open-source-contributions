<template>
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
              Frontmen Open Source
            </h1>
            <h2 class="subtitle">
              A list of projects Frontmen contributed to
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
</template>

<script>
export default {
  name: 'Header'
}
</script>
