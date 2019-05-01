<template>
  <span>
    <b-button
      :type="type"
      outlined
      :icon-left="icon"
      class="icon-button is-radiusless is-hidden-mobile"
      @click="$emit('click')"
    />
    <b-button
      :type="type"
      :icon-left="icon"
      class="mobile-icon-button is-radiusless is-family-secondary is-hidden-tablet"
      @click="$emit('click')"
    >
      {{ mobileText }}
    </b-button>
  </span>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    type: {
      type: String,
      required: true,
      default: 'is-primary',
      validator: value => {
        return (
          [
            'is-primary',
            'is-warning',
            'is-success',
            'is-info',
            'is-danger',
            'is-light',
            'is-dark',
            'is-link'
          ].indexOf(value) !== -1
        )
      }
    },
    icon: {
      type: String,
      required: true
    },
    mobileText: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.icon-button {
  width: 2.25rem;
  height: 2.25rem;
}

.mobile-icon-button {
  height: 2.25rem;
}
</style>
