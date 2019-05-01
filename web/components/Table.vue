<template>
  <b-table :data="data.length ? data : []" :loading="isLoading" mobile-cards>
    <template slot-scope="props">
      <b-table-column field="name" label="Name">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column field="owner" label="Owner">
        <img :src="props.row.avatar" width="20" />
        {{ props.row.owner }}
      </b-table-column>
      <b-table-column field="stars" label="Stars">
        <b-icon icon="star" size="is-small" />
        {{ props.row.stargazers_count }}
      </b-table-column>
      <b-table-column field="forks" label="Forks">
        <b-icon icon="source-fork" size="is-small" />
        {{ props.row.forks_count }}
      </b-table-column>
      <b-table-column field="data" label="Created" centered>
        <span class="tag is-info is-rounded">
          {{ new Date(props.row.created_at).toLocaleDateString() }}
        </span>
      </b-table-column>
      <b-table-column field="date" label="Source" centered>
        <a :href="props.row.html_url" target="_blank">
          <IconButton
            type="is-warning"
            icon="github-circle"
            mobile-text="SOURCE"
          />
        </a>
      </b-table-column>
      <b-table-column field="actions" label="Actions" centered>
        <IconButton type="is-primary" icon="pencil" mobile-text="EDIT" />
        <IconButton
          type="is-danger"
          icon="delete"
          mobile-text="DELETE"
          @click="$emit('setNotification', { type: 'deleteProject' })"
        />
      </b-table-column>
    </template>
    <template slot="empty">
      <section v-if="!isLoading" class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
          </p>
          <p>Nothing here.</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
export default {
  name: 'Table',
  components: {
    IconButton: () => import('./IconButton')
  },
  props: {
    data: {
      default: () => [],
      type: Array
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
.icon-button {
  width: 2.25rem;
  height: 2.25rem;
}
</style>
