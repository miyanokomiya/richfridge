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
