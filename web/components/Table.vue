<template>
  <b-table :data="data.length ? data : []" :loading="isLoading" mobile-cards>
    <template slot-scope="props">
      <b-table-column field="name" label="Name">
        {{ props.row.title }}
      </b-table-column>
      <template v-if="props.row.repository">
        <b-table-column field="owner" label="Owner">
          <div>
            <img :src="props.row.repository.owner.avatarUrl" width="20" />
            {{ props.row.repository.owner.login }}
          </div>
        </b-table-column>
        <b-table-column field="stars" label="Stars">
          <div>
            <b-icon icon="star" size="is-small" />
            {{ props.row.repository.stargazers.totalCount }}
          </div>
        </b-table-column>
        <b-table-column field="forks" label="Forks">
          <div>
            <b-icon icon="source-fork" size="is-small" />
            {{ props.row.repository.forks.totalCount }}
          </div>
        </b-table-column>
        <b-table-column field="data" label="Created">
          <span class="tag is-info is-rounded">
            {{ new Date(props.row.repository.createdAt).toLocaleDateString() }}
          </span>
        </b-table-column>
        <b-table-column field="date" label="Source">
          <a :href="props.row.repository.url" target="_blank">
            <IconButton
              type="is-warning"
              icon="github-circle"
              mobile-text="SOURCE"
            />
          </a>
        </b-table-column>
      </template>
      <b-table-column v-else field="warning">
        Github Repo not found! The repo possibily has been removed or renamed.
        Edit or remove this entry to cleanup the database.
      </b-table-column>
      <b-table-column field="actions" label="Actions">
        <div>
          <IconButton
            type="is-primary"
            icon="pencil"
            mobile-text="EDIT"
            @click="$emit('updateProject', props.row.id)"
          />
          <IconButton
            type="is-danger"
            icon="delete"
            mobile-text="DELETE"
            @click="
              $emit('setNotification', {
                type: 'deleteProject',
                targetId: props.row.id
              })
            "
          />
        </div>
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

.tag {
  width: 5rem;
}
</style>
