<template>
  <div v-if="fridge" class="h-full">
    <div
      class="flex items-center"
      :style="{ height: '24px' }"
      @click="() => (editingFridge = true)"
    >
      {{ fridge.name }}
    </div>
    <div
      class="relative whitespace-no-wrap overflow-auto p-1"
      :style="{ height: 'calc(100% - 24px)' }"
    >
      <div class="h-full">
        <div
          v-for="stageID in fridge.stageOrder"
          :key="stageID"
          class="inline-block align-top border border-green-light mx-1 h-full"
          :style="{ width: 'calc(100vw - 2rem)', 'max-width': '16rem' }"
        >
          <template v-if="stages[stageID]">
            <div
              class="flex justify-around items-center"
              :style="{ height: '24px' }"
            >
              <div>{{ stages[stageID].name }}</div>
            </div>
            <div class="p-1" :style="{ height: 'calc(100% - 24px)' }"></div>
          </template>
        </div>
      </div>
      <div class="absolute" :style="{ top: '28px' }">
        <div
          v-for="laneID in fridge.laneOrder"
          :key="laneID"
          class="mt-1 border border-red-light"
        >
          <template v-if="lanes[laneID]">
            <div
              class="fixed inline-flex items-center h-6 bg-green-lighter px-2"
              :style="{ left: '0.25rem' }"
            >
              <div>{{ lanes[laneID].name }}</div>
            </div>
            <div
              v-for="stageID in fridge.stageOrder"
              :key="stageID"
              class="inline-block align-top mx-1 mt-6 pt-1"
              :style="{ width: 'calc(100vw - 2rem)', 'max-width': '16rem' }"
            >
              <ItemCard
                v-for="itemID in getItemIDListAt({ stageID, laneID })"
                :key="itemID"
                :item="items[itemID]"
                class="mx-1 mb-1"
                @edit="readyUpdateItem(itemID)"
                @shift="shiftItem(itemID)"
              />
              <FlatIconButton
                class="mt-2 mb-1"
                icon="plus-circle"
                @click="readyCreateItem({ stageID, laneID })"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
    <ItemFormDialog
      v-if="editingItem"
      :value="!!editingItem"
      :itemID="editingItemID"
      :item="editingItem"
      :fridge="fridge"
      :lanes="lanes"
      :stages="stages"
      @input="cancelEditItem"
      @create="createItem"
      @update="updateItem"
    />
    <FridgeFormDialog
      v-if="editingFridge"
      :value="editingFridge"
      :fridge="fridge"
      :lanes="lanes"
      :stages="stages"
      @input="() => (editingFridge = false)"
      @update="updateFridge"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import * as models from '@/plugins/models.ts'
import ItemCard from '@/components/molecules/ItemCard.vue'
import ItemFormDialog from '@/components/organisms/dialogs/ItemFormDialog.vue'
import FridgeFormDialog from '@/components/organisms/dialogs/FridgeFormDialog.vue'
import FlatIconButton from '@/components/atoms/forms/FlatIconButton.vue'

@Component({
  components: {
    ItemCard,
    ItemFormDialog,
    FridgeFormDialog,
    FlatIconButton
  }
})
export default class Index extends Vue {
  @Prop({ required: true })
  fridge!: Fridge

  @Prop({ required: true })
  items!: Items

  @Prop({ required: true })
  lanes!: Lanes

  @Prop({ required: true })
  stages!: Stages

  @Emit('createItem')
  createItem(item: Item) {
    this.cancelEditItem()
  }

  @Emit('updateItem')
  updateItem(itemID: string, item: Item) {
    this.cancelEditItem()
  }

  @Emit('updateFridge')
  updateFridge(arg: { fridge: Fridge; lanes: Lanes; stages: Stages }) {
    this.editingFridge = false
  }

  editingItemID: string = ''
  editingItem: Item = null
  editingFridge: boolean = false

  get stageList(): Stage[] {
    return models.map2list<Stage>(this.stages, this.fridge.stageOrder)
  }

  get laneList(): Lane[] {
    return models.map2list<Lane>(this.lanes, this.fridge.laneOrder)
  }

  getItemIDListAt(arg: { stageID?: string; laneID?: string } = {}): string[] {
    let list = Object.keys(this.items)
    if (arg.stageID) {
      list = list.filter(itemID => this.items[itemID].stageID === arg.stageID)
    }
    if (arg.laneID) {
      list = list.filter(itemID => this.items[itemID].laneID === arg.laneID)
    }
    return list
  }

  shiftItem(itemID: string) {
    const item = this.items[itemID]
    this.updateItem(itemID, {
      ...item,
      stageID: models.getNextStageID({
        fridge: this.fridge,
        stageID: item.stageID
      })
    })
  }

  readyCreateItem(arg: { stageID?: string; laneID?: string } = {}) {
    this.editingItem = models.createItem({
      stageID: arg.stageID || this.fridge.stageOrder[0],
      laneID: arg.laneID || this.fridge.laneOrder[0]
    })
  }

  readyUpdateItem(itemID) {
    this.editingItemID = itemID
    this.editingItem = this.items[itemID]
  }

  cancelEditItem() {
    this.editingItemID = ''
    this.editingItem = null
  }
}
</script>
