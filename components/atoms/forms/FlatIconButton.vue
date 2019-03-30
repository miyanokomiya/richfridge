<template>
  <button
    type="button"
    class="flex items-center justify-center h-6 w-full rounded-full"
    :class="klass"
    @click="click"
  >
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue {
  @Prop({ required: true })
  icon: string

  @Emit()
  click() {}

  get klass(): string {
    return 'bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white border border-blue hover:border-transparent'
  }
}
</script>
