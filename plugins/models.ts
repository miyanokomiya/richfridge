export function createFridgeAuth(arg: Partial<FridgeAuth> = {}): FridgeAuth {
  return {
    ownerID: '',
    users: {},
    ...arg
  }
}

export function createFridge(arg: Partial<Fridge> = {}): Fridge {
  return {
    name: '',
    stageOrder: [],
    laneOrder: [],
    ...arg
  }
}

export function createLane(arg: Partial<Lane> = {}): Lane {
  return {
    name: '',
    childOrder: [],
    ...arg
  }
}

export function createStage(arg: Partial<Stage> = {}): Stage {
  return {
    name: '',
    ...arg
  }
}

export function createItem(arg: Partial<Item> = {}): Item {
  return {
    name: '',
    stageID: '',
    laneID: '',
    ...arg
  }
}

export function clone<T>(src: T): T {
  return JSON.parse(JSON.stringify(src))
}

export function map2list<T>(map: { [key: string]: T }, order: string[]): T[] {
  return order.map(key => map[key])
}

export function getNextStageID(arg: {
  fridge: Fridge
  stageID: string
}): string {
  const currentIndex = arg.fridge.stageOrder.indexOf(arg.stageID)
  const nextIndex = (currentIndex + 1) % arg.fridge.stageOrder.length
  return arg.fridge.stageOrder[nextIndex]
}

export function getOptionList(
  map: { [key: string]: any },
  order: string[]
): Option[] {
  return order.map(key => ({
    value: key,
    label: map[key].name
  }))
}

export function getLaneOptionList(lanes: Lanes, laneOrder: string[]): Option[] {
  const list = []
  laneOrder.forEach(parentID => {
    const parent = lanes[parentID]
    parent.childOrder.forEach(childID => {
      const child = lanes[childID]
      list.push({
        label: `${parent.name} / ${child.name}`,
        value: childID
      })
    })
    list.push({
      label: parent.name,
      value: parentID
    })
  })
  return list
}

export function getTmpID() {
  return `NEW_${Math.random()}`
}

export function convertTmpID(arg: {
  fridge: Fridge
  lanes: Lanes
  stages: Stages
  getStageID: () => string
  getLaneID: () => string
}): {
  fridge: Fridge
  lanes: Lanes
  stages: Stages
} {
  const fridge = clone<Fridge>(arg.fridge)

  // 新規作成された lane のIDを調整
  const convertLaneIDMap = {}
  const lanes = Object.keys(arg.lanes).reduce((map, laneID) => {
    let validID = laneID
    if (laneID.indexOf('NEW_') === 0) {
      validID = arg.getLaneID()
      convertLaneIDMap[laneID] = validID
    }
    map[validID] = arg.lanes[laneID]
    return map
  }, {})

  // fridgeのlaneOrderを探索して置換
  Object.keys(convertLaneIDMap).forEach(newID => {
    const index = fridge.laneOrder.indexOf(newID)
    if (index !== -1) {
      fridge.laneOrder[index] = convertLaneIDMap[newID]
    }
  })

  // laneのchildOrderを探索して置換
  Object.keys(lanes).forEach(laneID => {
    const lane = lanes[laneID]
    Object.keys(convertLaneIDMap).forEach(newID => {
      const index = lane.childOrder.indexOf(newID)
      if (index !== -1) {
        lane.childOrder[index] = convertLaneIDMap[newID]
      }
    })
  })

  // 新規作成された stage のIDを調整
  const stages = Object.keys(arg.stages).reduce((map, stageID) => {
    let validID = stageID
    if (stageID.indexOf('NEW_') === 0) {
      validID = arg.getStageID()
      fridge.stageOrder[fridge.stageOrder.indexOf(stageID)] = validID
    }
    map[validID] = arg.stages[stageID]
    return map
  }, {})

  return {
    fridge,
    lanes,
    stages
  }
}

export function getRemovedItemIDList(arg: {
  items: Items
  lanes: Lanes
  stages: Stages
}): string[] {
  return Object.keys(arg.items).filter(itemID => {
    const item = arg.items[itemID]
    return !(item.laneID in arg.lanes && item.stageID in arg.stages)
  })
}

export function getItemIDListAt(arg: {
  items: Items
  stageID?: string
  laneID?: string
}): string[] {
  let list = Object.keys(arg.items)
  if (arg.stageID) {
    list = list.filter(itemID => arg.items[itemID].stageID === arg.stageID)
  }
  if (arg.laneID) {
    list = list.filter(itemID => arg.items[itemID].laneID === arg.laneID)
  }
  list.sort((a, b) => (arg.items[a].name >= arg.items[b].name ? 1 : -1))
  return list
}

export function existedLaneID(arg: {
  fridge: Fridge
  lanes: Lanes
  laneID: string
}): boolean {
  if (arg.fridge.laneOrder.includes(arg.laneID)) return true
  return !!arg.fridge.laneOrder.find(id => {
    return arg.lanes[id].childOrder.indexOf(arg.laneID) !== -1
  })
}
