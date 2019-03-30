import * as models from '@/plugins/models'

export function getMock() {
  const fridge = models.createFridge({
    stageOrder: ['bb', 'aa'],
    laneOrder: ['bbb', 'aaa']
  })

  const itemA = models.createItem({ stageID: 'aa', laneID: 'aaa' })
  const itemB = models.createItem({ stageID: 'bb', laneID: 'bbb' })
  const itemC = models.createItem({ stageID: 'cc', laneID: 'aaa' })
  const items = { a: itemA, b: itemB, c: itemC }

  const stageAA = models.createStage({ name: 'AA' })
  const stageBB = models.createStage({ name: 'BB' })
  const stages = { aa: stageAA, bb: stageBB }

  const laneAAA = models.createLane({ name: 'AAA' })
  const laneBBB = models.createLane({ name: 'BBB' })
  const lanes = { aaa: laneAAA, bbb: laneBBB }

  return {
    fridge,
    items,
    stages,
    lanes,
    itemA,
    itemB,
    itemC,
    stageAA,
    stageBB,
    laneAAA,
    laneBBB
  }
}
