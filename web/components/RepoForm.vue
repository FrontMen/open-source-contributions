<template>
  <Section>
    <h1 class="title">Add a repository</h1>
    <b-field
      label="Github Repository"
      :message="inputMessages.repository[fetchStatus]"
      :type="fieldType"
    >
      <b-input
        v-model="projectForm.ownerAndRepo"
        icon="github-circle"
        placeholder="owner/repo"
        :disabled="fetchStatus === 'success'"
        :loading="projectForm.isLoading"
      ></b-input>
    </b-field>

    <b-collapse :open="fetchStatus === 'success'">
      <b-field label="Title" :message="inputMessages.title.default">
        <b-input v-model="projectForm.title" maxlength="200"></b-input>
      </b-field>

      <b-field label="Description" :message="inputMessages.description.default">
        <b-input
          v-model="projectForm.description"
          maxlength="400"
          type="textarea"
        ></b-input>
      </b-field>
      <br />
    </b-collapse>
    <b-button
      icon-left="cancel"
      class="is-radiusless is-family-secondary cancel-button"
      @click="$emit('setNotification', { type: 'cancelCreating' })"
    >
      CANCEL
    </b-button>

    <b-button
      class="is-warning is-family-secondary is-radiusless	"
      icon-left="check"
      @click="submitAction"
    >
      {{ submitText }}
    </b-button>
  </Section>
</template>
<script>
export default {
  name: 'RepoForm',
  components: {
    Section: () => import('./Section')
  },

  props: {
    inputMessages: {
      type: Object,
      required: true
    },
    projectForm: {
      type: Object,
      required: true
    },
    isValid: {
      type: Boolean
    },
    fetchStatus: {
      type: String,
      required: true,
      validator: value => {
        return ['default', 'success', 'failed'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    fieldType() {
      if (this.fetchStatus === 'success') return 'is-success'
      if (this.fetchStatus === 'failed') return 'is-danger'
      return null
    },
    submitText() {
      return this.fetchStatus === 'success' ? 'SUBMIT' : 'CHECK'
    }
  },
  methods: {
    submitAction() {
      if (this.fetchStatus === 'success') {
        // todo: save to DB
        alert('save to db')
      } else {
        this.$emit('fetchProject')
      }
    }
  }
}
</script>
<style scoped>
.cancel-button {
  margin-right: 0.5rem;
}
</style>
