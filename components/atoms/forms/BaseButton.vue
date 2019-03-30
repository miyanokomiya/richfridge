<template>
  <button
    type="button"
    class="font-bold py-2 px-4 rounded"
    :class="klass"
    @click="click"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class BaseButton extends Vue {
  @Prop({ default: false })
  color: string

  @Emit()
  click() {}

  get klass(): string {
    if (this.color === 'white')
      return 'bg-white hover:bg-grey-lightest text-grey-darkest border'
    if (this.color === 'red') return 'bg-red hover:bg-red-lightest text-white'
    return 'bg-blue hover:bg-blue-dark text-white'
  }
}
</script>
