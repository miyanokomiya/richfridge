type Fridge = {
  name: string
  stageOrder: string[]
  laneOrder: string[]
}

type Lane = {
  name: string
}

type Stage = {
  name: string
}

type Item = {
  name: string
  stageID: string
  laneID: string
}
