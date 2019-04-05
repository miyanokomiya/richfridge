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

  const laneAAA = models.createLane({
    name: 'AAA',
    childOrder: ['ccc', 'ddd', 'fff']
  })
  const laneBBB = models.createLane({ name: 'BBB' })
  const laneCCC = models.createLane({ name: 'CCC' })
  const laneDDD = models.createLane({ name: 'DDD' })
  const laneFFF = models.createLane({ name: 'FFF' })
  const lanes = {
    aaa: laneAAA,
    bbb: laneBBB,
    ccc: laneCCC,
    ddd: laneDDD,
    fff: laneFFF
  }

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
