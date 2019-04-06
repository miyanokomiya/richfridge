<template>
  <div
    class="bg-transparent text-blue-dark font-semibold py-1 px-1 border border-blue rounded"
  >
    <div v-if="item" class="flex items-center">
      <div
        class="h-6 flex items-center"
        :style="{ width: 'calc(100% - 24px)' }"
        @click="edit"
      >
        <span>{{ item.name }}</span>
      </div>
      <button class="ml-auto" :style="{ width: '24px' }" @click="shift">
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
