<template>
  <div v-if="fridge" class="h-full">
    <div class="flex items-center" :style="{ height: '24px' }">
      {{ fridge.name }}
    </div>
    <div
      class="whitespace-no-wrap overflow-auto p-1"
      :style="{ height: 'calc(100% - 24px)' }"
    >
      <div
        v-for="stageID in fridge.stageOrder"
        :key="stageID"
        class="inline-block align-top border border-green-light mx-1 h-full"
        :style="{ width: 'calc(60% - 24px)' }"
      >
        <template v-if="stages[stageID]">
          <div
            class="flex justify-around items-center"
            :style="{ height: '24px' }"
            @click="newItem({ stageID })"
          >
            <div>{{ stages[stageID].name }}</div>
            <font-awesome-icon icon="plus-circle" />
          </div>
          <div class="p-1" :style="{ height: 'calc(100% - 24px)' }">
            <ItemCard
              v-for="itemID in getItemIDListInStage(stageID)"
              :id="itemID"
              :key="itemID"
              :item="items[itemID]"
              class="mx-1 mb-1"
              @shift="shiftItem(itemID)"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import * as models from '@/plugins/models.ts'
import ItemCard from '@/components/molecules/ItemCard.vue'

@Component({
  components: {
    ItemCard
  }
})
export default class Index extends Vue {
  @Prop({ required: true })
  fridge!: Fridge

  @Prop({ required: true })
  items!: { [key: string]: Item }

  @Prop({ required: true })
  lanes!: { [key: string]: Lane }

  @Prop({ required: true })
  stages!: { [key: string]: Stage }

  @Emit('createItem')
  createItem(item: Item) {}

  @Emit('updateItem')
  updateItem(itemID: string, item: Item) {}

  get stageList(): Stage[] {
    return models.map2list<Stage>(this.stages, this.fridge.stageOrder)
  }

  get laneList(): Lane[] {
    return models.map2list<Lane>(this.lanes, this.fridge.laneOrder)
  }

  getItemIDListInStage(stageID: string): string[] {
    return Object.keys(this.items).filter(
      itemID => this.items[itemID].stageID === stageID
    )
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

  newItem({ stageID }) {
    const item = models.createItem({ stageID })
    this.createItem(item)
  }
}
</script>
