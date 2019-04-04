<template>
  <BaseDialog :value="value" @input="input">
    <div>
      <NavigationTabs v-model="tabValue" :tabList="tabList" />
    </div>
    <form v-if="fridgeDraft" class="mt-1" @submit.prevent="submit">
      <div class="overflow-y-auto" :style="{ 'max-height': '50vh' }">
        <div v-if="tabValue === 'lanes'" class="border p-1 pt-0">
          <div
            v-for="laneID in fridgeDraft.laneOrder"
            :key="laneID"
            class="mt-1"
          >
            <template v-if="lanesDraft[laneID]">
              <SortableTextInput
                v-model="lanesDraft[laneID].name"
                @remove="removeLane(laneID)"
              />
              <div v-if="lanesDraft[laneID].childOrder.length > 0">
                <div
                  v-for="childID in lanesDraft[laneID].childOrder"
                  :key="childID"
                  class="flex items-center justify-between mt-1"
                >
                  <div class="h-1 w-4 border"></div>
                  <SortableTextInput
                    v-if="lanesDraft[childID]"
                    v-model="lanesDraft[childID].name"
                    :style="{ width: 'calc(100% - 1rem)' }"
                    @remove="removeLane(childID, laneID)"
                  />
                </div>
              </div>
              <div class="ml-4" :style="{ width: 'calc(100% - 1rem - 2rem)' }">
                <FlatIconButton
                  class="mt-1"
                  icon="plus-circle"
                  @click="addLane(laneID)"
                />
              </div>
            </template>
          </div>
          <FlatIconButton class="mt-2" icon="plus-circle" @click="addLane()" />
        </div>
        <div v-else-if="tabValue === 'stages'" class="border p-1 pt-0">
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
        <div v-else>
          <ValidTextInput v-model="fridgeDraft.name" label="Name" />
        </div>
      </div>
      <div class="flex justify-end mt-2">
        <BaseButton
          v-if="tabValue === 'fridge'"
          class="mr-auto"
          color="red"
          @click="removeFridge"
        >
          <font-awesome-icon icon="trash-alt" />
        </BaseButton>
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
import ValidTextInput from '@/components/atoms/forms/ValidTextInput.vue'
import SelectInput from '@/components/atoms/forms/SelectInput.vue'
import NavigationTabs from '@/components/molecules/NavigationTabs.vue'
import BaseButton from '@/components/atoms/forms/BaseButton.vue'
import FlatIconButton from '@/components/atoms/forms/FlatIconButton.vue'
import SortableTextInput from '@/components/molecules/forms/SortableTextInput.vue'

@Component({
  components: {
    BaseDialog,
    ValidTextInput,
    SelectInput,
    NavigationTabs,
    BaseButton,
    FlatIconButton,
    SortableTextInput
  }
})
export default class FridgeFormDialog extends Vue {
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

  @Emit()
  remove() {}

  fridgeDraft: Fridge = null
  lanesDraft: Lanes = {}
  stagesDraft: Stages = {}
  tabValue: string = 'lanes'

  get tabList(): Option[] {
    return [
      { value: 'lanes', label: 'Lanes' },
      { value: 'stages', label: 'Stages' },
      { value: 'fridge', label: 'Fridge' }
    ]
  }

  mounted() {
    this.fridgeDraft = models.clone<Fridge>(this.fridge)
    this.lanesDraft = models.clone<Lanes>(this.lanes)
    this.stagesDraft = models.clone<Stages>(this.stages)
  }

  addLane(parentID?: string) {
    const laneID = `NEW_${Math.random()}`
    if (parentID) {
      this.lanesDraft[parentID].childOrder.push(laneID)
    } else {
      this.fridgeDraft.laneOrder.push(laneID)
    }
    Vue.set(this.lanesDraft, laneID, models.createLane())
  }

  addStage() {
    const stageID = `NEW_${Math.random()}`
    this.fridgeDraft.stageOrder.push(stageID)
    Vue.set(this.stagesDraft, stageID, models.createStage())
  }

  removeLane(laneID: string, parentID?: string) {
    if (parentID) {
      const parent = this.lanesDraft[parentID]
      this.lanesDraft[parentID] = {
        ...parent,
        childOrder: parent.childOrder.filter(id => id !== laneID)
      }
    } else {
      this.fridgeDraft = {
        ...this.fridgeDraft,
        laneOrder: this.fridgeDraft.laneOrder.filter(id => id !== laneID)
      }
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

  removeFridge() {
    this.$confirm.set({
      message: '本当に削除しますか？',
      exec: () => this.remove()
    })
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
