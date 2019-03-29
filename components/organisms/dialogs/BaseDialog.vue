<template>
  <div
    v-if="value"
    class="fixed z-50 pin overflow-auto bg-smoke-dark flex"
    @click.self="input(false)"
  >
    <div
      class="fixed shadow-inner max-w-md md:relative pin-t pin-x align-top m-auto justify-end md:justify-center p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col"
    >
      <slot />
      <span class="absolute pin-t pin-r pt-4 px-4" @click="input(false)">
        <font-awesome-icon
          icon="times"
          class="text-grey hover:text-grey-darkest"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class BaseDialog extends Vue {
  @Prop()
  value: boolean

  @Emit()
  input(value: boolean) {}
}
</script>
