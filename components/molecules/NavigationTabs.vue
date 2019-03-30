<template>
  <ul class="list-reset flex border-b">
    <li
      v-for="tab in tabList"
      :key="tab.value"
      class="mr-1"
      :class="selected(tab.value) ? '-mb-px' : ''"
    >
      <a
        class="bg-white inline-block py-2 px-4 text-blue hover:text-blue-darker font-semibold no-underline"
        :class="
          selected(tab.value) ? 'border-l border-t border-r rounded-t' : ''
        "
        href="#"
        @click.prevent="input(tab.value)"
        >{{ tab.label }}</a
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class NavigationTabs extends Vue {
  @Prop({ required: true })
  value: any

  @Prop({ default: () => [] })
  tabList: Option[]

  @Emit()
  input(value: any) {}

  selected(value: any): boolean {
    return value === this.value
  }
}
</script>
