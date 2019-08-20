<template>
  <b-modal :active.sync="isOpen" :width="450" scroll="keep" :can-cancel="false">
    <div class="card is-centered">
      <div class="card-content is-centered">
        <b-icon size="is-large" :type="type" :icon="icon" />
        <h1 class="title">
          {{ notificationSettings.title }}
        </h1>
        <h2 class="subtitle">
          {{ notificationSettings.subtitle }}
        </h2>
        <b-button
          class="button is-medium is-radiusless"
          @click="$emit('closeNotification')"
        >
          {{ notificationSettings.cancelText }}
        </b-button>
        <b-button
          :type="type"
          class="button is-medium is-primary is-radiusless"
          @click="handleConfirm"
        >
          {{ notificationSettings.confirmText }}
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    notificationSettings: {
      required: true,
      type: Object
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    type() {
      return `is-${this.notificationSettings.type}`
    },
    icon() {
      if (this.notificationSettings.type === 'info') {
        return 'information'
      }
      if (this.notificationSettings.type === 'danger') {
        return 'alert'
      }
      return 'information'
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirmNotification')
      this.$emit('closeNotification')
    }
  }
}
</script>
<style scoped>
.is-centered {
  text-align: center;
}
</style>
