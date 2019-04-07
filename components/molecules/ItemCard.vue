<template>
  <div
    class="bg-transparent text-blue-dark font-semibold py-1 px-1 border border-blue rounded"
  >
    <div v-if="item" class="flex items-center">
      <div
        class="flex items-center break-words whitespace-normal leading-tight"
        :style="{ width: 'calc(100% - 24px)' }"
        @click="edit"
      >
        <span>{{ item.name }}</span>
      </div>
      <button
        class="ml-auto leading-tight"
        :style="{ width: '24px' }"
        @click="shift"
      >
        <font-awesome-icon icon="angle-right" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class ItemCard extends Vue {
  @Prop({ required: true })
  item!: Item

  @Emit()
  edit() {}

  @Emit()
  shift() {}
}
</script>
