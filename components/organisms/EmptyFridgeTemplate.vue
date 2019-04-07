<template>
  <div class="flex flex-col items-center">
    <font-awesome-icon icon="arrow-up" class="text-red mb-1" />
    <p>各種設定</p>
    <p class="mt-4">テンプレート構成</p>
    <font-awesome-icon icon="arrow-down" class="text-red" />
    <div class="mt-1 flex flex-col items-center w-full">
      <BaseButton class="w-1/2 mb-2" @click="clickTemplateA"
        >キッチン</BaseButton
      >
      <BaseButton class="w-1/2 mb-2" @click="clickTemplateB"
        >カンバン</BaseButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import * as models from '@/plugins/models'
import BaseButton from '@/components/atoms/forms/BaseButton.vue'

@Component({
  components: {
    BaseButton
  }
})
export default class EmptyFridgeTemplate extends Vue {
  @Emit()
  inherit(arg: { fridge: Fridge; stages: Stages; lanes: Lanes }) {}

  clickTemplateA() {
    const fridge: Fridge = models.createFridge({
      name: 'キッチン',
      stageOrder: [models.getTmpID(), models.getTmpID(), models.getTmpID()],
      laneOrder: [
        models.getTmpID(),
        models.getTmpID(),
        models.getTmpID(),
        models.getTmpID(),
        models.getTmpID()
      ]
    })

    const stages: Stages = {
      [fridge.stageOrder[0]]: models.createStage({ name: 'Ready' }),
      [fridge.stageOrder[1]]: models.createStage({ name: 'Warn' }),
      [fridge.stageOrder[2]]: models.createStage({ name: 'Alert' })
    }

    const lane1: Lane = models.createLane({
      name: '冷蔵庫',
      childOrder: [models.getTmpID()]
    })
    const lane2: Lane = models.createLane({
      name: '常温',
      childOrder: [models.getTmpID(), models.getTmpID()]
    })
    const lanes: Lanes = {
      [fridge.laneOrder[0]]: lane1,
      [fridge.laneOrder[1]]: models.createLane({ name: '冷凍庫' }),
      [fridge.laneOrder[2]]: models.createLane({ name: '調味料' }),
      [fridge.laneOrder[3]]: lane2,
      [fridge.laneOrder[4]]: models.createLane({ name: '備品' }),
      [lane1.childOrder[0]]: models.createLane({ name: '野菜' }),
      [lane2.childOrder[0]]: models.createLane({ name: '麺類' }),
      [lane2.childOrder[1]]: models.createLane({ name: '飲料' })
    }

    this.inherit({
      fridge,
      stages,
      lanes
    })
  }

  clickTemplateB() {
    const fridge: Fridge = models.createFridge({
      name: 'カンバン',
      stageOrder: [
        models.getTmpID(),
        models.getTmpID(),
        models.getTmpID(),
        models.getTmpID()
      ],
      laneOrder: [models.getTmpID()]
    })

    const stages: Stages = {
      [fridge.stageOrder[0]]: models.createStage({ name: 'Icebox' }),
      [fridge.stageOrder[1]]: models.createStage({ name: 'Todo' }),
      [fridge.stageOrder[2]]: models.createStage({ name: 'Doing' }),
      [fridge.stageOrder[3]]: models.createStage({ name: 'Done' })
    }

    const lanes: Lanes = {
      [fridge.laneOrder[0]]: models.createLane({ name: 'タスク' })
    }

    this.inherit({
      fridge,
      stages,
      lanes
    })
  }
}
</script>
