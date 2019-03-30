<template>
  <BaseDialog :value="value" @input="input">
    <div class="flex flex-col justify-center mt-2">
      <BaseButton class="mt-4" color="white" @click="signOut"
        >Sign out</BaseButton
      >
      <!-- <BaseButton class="mt-4" color="red" @click="deleteAccount" -->
      <!--   >Delete account</BaseButton -->
      <!-- > -->
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
export default class ItemFormDialog extends Vue {
  @Prop({ required: true })
  value: boolean

  @Emit()
  input(value: boolean) {}

  @Emit('signOut')
  signOut() {}

  @Emit('deleteAccount')
  deleteAccount() {}
}
</script>
