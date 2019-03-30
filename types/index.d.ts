type Fridge = {
  name: string
  stageOrder: string[]
  laneOrder: string[]
}

type Lane = {
  name: string
}
type Lanes = { [key: string]: Lane }

type Stage = {
  name: string
}
type Stages = { [key: string]: Stage }

type Item = {
  name: string
  stageID: string
  laneID: string
}
type Items = { [key: string]: Item }

type Option = {
  value: any
  label: string
}
