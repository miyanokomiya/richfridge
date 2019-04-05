<template>
  <BaseDialog :value="value" @input="input">
    <div>
      <NavigationTabs v-model="tabValue" :tabList="tabList" />
    </div>
    <form v-if="fridgeDraft" class="mt-1" @submit.prevent="submit">
      <div class="overflow-y-auto" :style="{ 'max-height': '50vh' }">
        <div v-if="tabValue === 'lanes'">
          <transition-group tag="div" name="lanes" class="border p-1 pt-0">
            <div
              v-for="(laneID, i) in fridgeDraft.laneOrder"
              :key="laneID"
              class="mt-1 border-b lane"
            >
              <ToggleOrderButton v-if="i > 0" @click="upLane(i)" />
              <template v-if="lanesDraft[laneID]">
                <SortableTextInput
                  v-model="lanesDraft[laneID].name"
                  @remove="removeLane(laneID)"
                />
                <transition-group tag="div" name="child-lanes">
                  <template v-if="lanesDraft[laneID].childOrder.length > 0">
                    <div
                      v-for="(childID, j) in lanesDraft[laneID].childOrder"
                      :key="childID"
                      class="child-lane"
                    >
                      <ToggleOrderButton
                        v-if="j > 0"
                        @click="upLane(j, laneID)"
                      />
                      <div class="flex items-center justify-between mt-1">
                        <div class="h-1 w-4 border"></div>
                        <SortableTextInput
                          v-if="lanesDraft[childID]"
                          v-model="lanesDraft[childID].name"
                          :style="{ width: 'calc(100% - 1rem)' }"
                          @remove="removeLane(childID, laneID)"
                        />
                      </div>
                    </div>
                  </template>
                  <div
                    key="child-lane-button"
                    class="ml-4 child-lane"
                    :style="{ width: 'calc(100% - 1rem - 2rem)' }"
                  >
                    <FlatIconButton
                      class="my-1"
                      icon="plus-circle"
                      @click="addLane(laneID)"
                    />
                  </div>
                </transition-group>
              </template>
            </div>
            <FlatIconButton
              key="lane-button"
              class="mt-1 lane"
              icon="plus-circle"
              @click="addLane()"
            />
          </transition-group>
        </div>
        <div v-else-if="tabValue === 'stages'">
          <!-- laneとstageのtransition-groupを同一視されてしまうので構造を変える -->
          <div>
            <transition-group tag="div" name="stages" class="border p-1 pt-0">
              <div
                v-for="(stageID, i) in fridgeDraft.stageOrder"
                :key="stageID"
                class="mt-1 stage"
              >
                <ToggleOrderButton v-if="i > 0" @click="upStage(i)" />
                <SortableTextInput
                  v-if="stagesDraft[stageID]"
                  v-model="stagesDraft[stageID].name"
                  @remove="removeStage(stageID)"
                />
              </div>
              <FlatIconButton
                key="stage-button"
                class="mt-2 stage"
                icon="plus-circle"
                @click="addStage"
              />
            </transition-group>
          </div>
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
import ToggleOrderButton from '@/components/atoms/forms/ToggleOrderButton.vue'
import FlatIconButton from '@/components/atoms/forms/FlatIconButton.vue'
import SortableTextInput from '@/components/molecules/forms/SortableTextInput.vue'

@Component({
  components: {
    BaseDialog,
    ValidTextInput,
    SelectInput,
    NavigationTabs,
    BaseButton,
    ToggleOrderButton,
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

  upLane(index, parentID) {
    const order = parentID
      ? this.lanesDraft[parentID].childOrder
      : this.fridgeDraft.laneOrder
    const target = order[index]
    Vue.set(order, index, order[index - 1])
    Vue.set(order, index - 1, target)
  }

  upStage(index) {
    const order = this.fridgeDraft.stageOrder
    const target = order[index]
    Vue.set(order, index, order[index - 1])
    Vue.set(order, index - 1, target)
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

<style scoped>
.lane,
.child-lane,
.stage {
  transition: all 0.3s;
}
.lanes-enter,
.child-lanes-enter,
.stages-enter {
  opacity: 0;
}
.lanes-leave-to,
.child-lanes-leave-to,
.stages-leave-to {
  opacity: 0;
}
</style>
