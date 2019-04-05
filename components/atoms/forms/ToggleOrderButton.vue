<template>
  <div class="h-0 relative">
    <button
      type="button"
      class="w-5 h-5 absolute flex justify-center items-center text-white bg-teal rounded-full"
      :style="{
        left: '0',
        top: '-12px'
      }"
      @click="click"
    >
      <font-awesome-icon icon="sort" />
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class ToggleOrderButton extends Vue {
  @Emit()
  click() {}
}
</script>
