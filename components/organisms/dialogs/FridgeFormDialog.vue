<template>
  <BaseDialog :value="value" @input="input">
    <div>
      <NavigationTabs v-model="tabValue" :tabList="tabList" />
    </div>
    <form v-if="fridgeDraft" @submit.prevent="submit">
      <div v-if="tabValue === 'lane'">
        <div v-for="laneID in fridgeDraft.laneOrder" :key="laneID" class="mt-1">
          <SortableTextInput
            v-if="lanesDraft[laneID]"
            v-model="lanesDraft[laneID].name"
            @remove="removeLane(laneID)"
          />
        </div>
        <FlatIconButton class="mt-2" icon="plus-circle" @click="addLane" />
      </div>
      <div v-else>
        <div
          v-for="stageID in fridgeDraft.stageOrder"
          :key="stageID"
          class="mt-1"
        >
          <SortableTextInput
            v-if="stagesDraft[stageID]"
            v-model="stagesDraft[stageID].name"
            @remove="removeStage(stageID)"
          />
        </div>
        <FlatIconButton class="mt-2" icon="plus-circle" @click="addStage" />
      </div>
      <div class="flex justify-end mt-2">
        <BaseButton color="white" @click="input(false)">Cancel</BaseButton>
        <BaseButton class="ml-4" @click="submit">Update</BaseButton>
      </div>
    </form>
  </BaseDialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import * as models from '@/plugins/models.ts'
import BaseDialog from '@/components/organisms/dialogs/BaseDialog.vue'
import SelectInput from '@/components/atoms/forms/SelectInput.vue'
import NavigationTabs from '@/components/molecules/NavigationTabs.vue'
import BaseButton from '@/components/atoms/forms/BaseButton.vue'
import FlatIconButton from '@/components/atoms/forms/FlatIconButton.vue'
import SortableTextInput from '@/components/molecules/forms/SortableTextInput.vue'

@Component({
  components: {
    BaseDialog,
    SelectInput,
    NavigationTabs,
    BaseButton,
    FlatIconButton,
    SortableTextInput
  }
})
export default class ItemFormDialog extends Vue {
  @Prop({ required: true })
  value: boolean

  @Prop({ required: true })
  fridge!: Fridge

  @Prop({ required: true })
  lanes!: Lanes

  @Prop({ required: true })
  stages!: Stages

  @Emit()
  input(value: boolean) {}

  @Emit()
  update(arg: { fridge: Fridge; lanes: Lanes; stages: Stages }) {}

  fridgeDraft: Fridge = null
  lanesDraft: Lanes = {}
  stagesDraft: Stages = {}
  tabValue: string = 'lane'

  get tabList(): Option[] {
    return [
      { value: 'lane', label: 'Lanes' },
      { value: 'stage', label: 'Stages' }
    ]
  }

  mounted() {
    this.fridgeDraft = models.clone<Fridge>(this.fridge)
    this.lanesDraft = models.clone<Lanes>(this.lanes)
    this.stagesDraft = models.clone<Stages>(this.stages)
  }

  addLane() {
    const laneID = `NEW_${Math.random()}`
    this.fridgeDraft.laneOrder.push(laneID)
    Vue.set(this.lanesDraft, laneID, models.createLane())
  }

  addStage() {
    const stageID = `NEW_${Math.random()}`
    this.fridgeDraft.stageOrder.push(stageID)
    Vue.set(this.stagesDraft, stageID, models.createStage())
  }

  removeLane(laneID: string) {
    this.fridgeDraft = {
      ...this.fridgeDraft,
      laneOrder: this.fridgeDraft.laneOrder.filter(id => id !== laneID)
    }
    Vue.delete(this.lanesDraft, laneID)
  }

  removeStage(stageID: string) {
    this.fridgeDraft = {
      ...this.fridgeDraft,
      stageOrder: this.fridgeDraft.stageOrder.filter(id => id !== stageID)
    }
    Vue.delete(this.stagesDraft, stageID)
  }

  submit() {
    this.update({
      fridge: this.fridgeDraft,
      lanes: this.lanesDraft,
      stages: this.stagesDraft
    })
  }
}
</script>
