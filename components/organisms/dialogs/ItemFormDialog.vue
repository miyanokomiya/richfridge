<template>
  <BaseDialog :value="value" @input="input">
    <form v-if="itemDraft" @submit.prevent="submit">
      <ValidTextInput v-model="itemDraft.name" label="Name" />
      <SelectInput
        v-model="itemDraft.laneID"
        class="mt-2"
        :optionList="optionList"
      />
      <div class="flex justify-end mt-2">
        <button
          type="button"
          class="bg-white hover:bg-grey-lightest text-grey-darkest font-bold py-2 px-4 rounded"
          @click="input(false)"
        >
          Cancel
        </button>
        <button
          class="ml-4 bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded"
        >
          {{ existed ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </BaseDialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import BaseDialog from '@/components/organisms/dialogs/BaseDialog.vue'
import ValidTextInput from '@/components/atoms/forms/ValidTextInput.vue'
import SelectInput from '@/components/atoms/forms/SelectInput.vue'

@Component({
  components: {
    BaseDialog,
    ValidTextInput,
    SelectInput
  }
})
export default class ItemFormDialog extends Vue {
  @Prop({ required: true })
  value: boolean

  @Prop({ default: '' })
  itemID: string

  @Prop({ required: true })
  item: Item

  @Prop({ required: true })
  lanes!: { [key: string]: Lane }

  @Emit()
  input(value: boolean) {}

  @Emit()
  create(item: Item) {}

  @Emit()
  update(itemID: string, item: Item) {}

  @Emit()
  delete(item: Item) {}

  itemDraft: Item = null

  get existed(): boolean {
    return !!this.itemID
  }

  get optionList(): { label: string; value: any }[] {
    return Object.keys(this.lanes).map(laneID => ({
      value: laneID,
      label: this.lanes[laneID].name
    }))
  }

  mounted() {
    this.itemDraft = { ...this.item }
  }

  submit() {
    this.existed
      ? this.update(this.itemID, this.itemDraft)
      : this.create(this.itemDraft)
  }
}
</script>
