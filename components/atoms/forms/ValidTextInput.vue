<template>
  <div>
    <label v-if="label" class="block text-grey-darker text-sm font-bold mb-2">{{
      label
    }}</label>
    <input
      v-model="valueDraft"
      class="border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
      type="text"
    />
    <p v-if="error" class="text-red text-xs italic">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class ValidTextInput extends Vue {
  @Prop({ required: true })
  value: string

  @Prop({ default: '' })
  label: string

  @Prop({ default: '' })
  error: string

  @Emit()
  input(value: string) {}

  get valueDraft(): string {
    return this.value
  }
  set valueDraft(val: string) {
    this.input(val)
  }
}
</script>
