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
        <BaseButton v-if="existed" class="mr-auto" color="red" @click="remove">
          <font-awesome-icon icon="trash-alt" />
        </BaseButton>
        <BaseButton color="white" @click="input(false)">Cancel</BaseButton>
        <BaseButton class="ml-4" @click="submit">
          {{ existed ? 'Update' : 'Create' }}
        </BaseButton>
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
import BaseButton from '@/components/atoms/forms/BaseButton.vue'

@Component({
  components: {
    BaseDialog,
    ValidTextInput,
    SelectInput,
    BaseButton
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
  remove() {}

  itemDraft: Item = null

  get existed(): boolean {
    return !!this.itemID
  }

  get laneOptionList(): { label: string; value: any }[] {
    if (!this.fridge) return []
    return models.getLaneOptionList(this.lanes, this.fridge.laneOrder)
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
