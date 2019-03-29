<template>
  <div
    class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-1 px-1 border border-blue hover:border-transparent rounded flex"
  >
    <template v-if="item">
      <span>{{ item.name }}</span>
      <button class="ml-auto pl-4" @click="shift">
        <font-awesome-icon icon="angle-right" />
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class Index extends Vue {
  @Prop({ required: true })
  id: number

  @Prop({ required: true })
  item!: Item

  @Emit()
  shift() {}
}
</script>
