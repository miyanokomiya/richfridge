<template>
  <BaseDialog :value="value" bottom @input="input">
    <pre class="text-center mt-2">{{ message }}</pre>
    <div class="flex flex-col pt-4 pb-2">
      <BaseButton @click="exec">OK</BaseButton>
      <div class="border my-4"></div>
      <BaseButton color="white" @click="input(false)">Cancel</BaseButton>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import BaseDialog from '@/components/organisms/dialogs/BaseDialog.vue'
import BaseButton from '@/components/atoms/forms/BaseButton.vue'

@Component({
  components: {
    BaseDialog,
    BaseButton
  }
})
export default class ConfirmDialog extends Vue {
  @Prop({ required: true })
  value: boolean

  @Prop({ required: true })
  message: string

  @Emit()
  input(value: boolean) {}

  @Emit()
  exec() {}
}
</script>
