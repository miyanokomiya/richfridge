<template>
  <div class="inline-block relative w-64">
    <select
      v-model="valueDraft"
      class="block w-full bg-white border border-grey-light hover:border-grey py-2 pl-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
    >
      <option
        v-for="option in optionList"
        :key="option.value"
        :value="option.value"
        >{{ option.label }}</option
      >
    </select>
    <div
      class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker"
    >
      <svg
        class="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class SelectInput extends Vue {
  @Prop({ required: true })
  value: any

  @Prop({ default: () => [] })
  optionList: { label: string; value: any }[]

  @Emit()
  input(value: any) {}

  get valueDraft(): any {
    return this.value
  }
  set valueDraft(val: any) {
    this.input(val)
  }
}
</script>
