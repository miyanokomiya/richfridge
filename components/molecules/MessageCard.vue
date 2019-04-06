<template>
  <a
    class="inline-flex items-center bg-red-lightest border border-red-light text-red-dark p-2 rounded"
    @click.prevent="close"
  >
    <div :style="{ width: 'calc(100% - 24px)' }">
      <slot />
    </div>
    <button class="text-sm" :style="{ width: '24px' }">
      <font-awesome-icon icon="times" />
    </button>
  </a>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class MessageCard extends Vue {
  @Emit()
  close() {}
}
</script>
