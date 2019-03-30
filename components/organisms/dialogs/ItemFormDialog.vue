<template>
  <BaseDialog :value="value" @input="input">
    <form v-if="itemDraft" @submit.prevent="submit">
      <ValidTextInput v-model="itemDraft.name" label="Name" />
      <SelectInput
        v-model="itemDraft.laneID"
        class="mt-2"
        :optionList="laneOptionList"
      />
      <SelectInput
        v-model="itemDraft.stageID"
        class="mt-2"
        :optionList="stageOptionList"
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
import * as models from '@/plugins/models'
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
  item!: Item

  @Prop({ required: true })
  fridge!: Fridge

  @Prop({ required: true })
  lanes!: { [key: string]: Lane }

  @Prop({ required: true })
  stages!: { [key: string]: Stage }

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

  get laneOptionList(): { label: string; value: any }[] {
    if (!this.fridge) return []
    return models.getOptionList(this.lanes, this.fridge.laneOrder)
  }

  get stageOptionList(): { label: string; value: any }[] {
    if (!this.fridge) return []
    return models.getOptionList(this.stages, this.fridge.stageOrder)
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
