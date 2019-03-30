<template>
  <div class="flex items-center">
    <ValidTextInput
      :value="value"
      :style="{ width: 'calc(100% - 2rem)' }"
      @input="input"
    />
    <div class="w-8 h-8 flex items-center justify-center" @click="remove">
      <font-awesome-icon
        icon="times"
        class="text-grey hover:text-grey-darkest"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import ValidTextInput from '@/components/atoms/forms/ValidTextInput.vue'

@Component({
  components: {
    ValidTextInput
  }
})
export default class SortableTextInput extends Vue {
  @Prop({ required: true })
  value: string

  @Emit()
  input(value: string) {}

  @Emit()
  remove() {}
}
</script>
