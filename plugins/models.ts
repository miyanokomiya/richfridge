import firebase from 'firebase'

export class Fridge {
  id: string
  name: string
  stageOrder: string[]
  laneOrder: string[]

  static parse(data: firebase.firestore.DocumentData) {
    const obj = new Fridge()
    obj.id = data.id
    obj.name = data.name
    obj.stageOrder = data.stageOrder
    obj.laneOrder = data.laneOrder
    return obj
  }
}

export class Lane {
  id: string
  name: string

  static parse(data: firebase.firestore.DocumentData) {
    const obj = new Fridge()
    obj.id = data.id
    obj.name = data.name
    return obj
  }
}

export class Stage {
  id: string
  name: string

  static parse(data: firebase.firestore.DocumentData) {
    const obj = new Fridge()
    obj.id = data.id
    obj.name = data.name
    return obj
  }
}

export class Item {
  id: string
  name: string

  static parse(data: firebase.firestore.DocumentData) {
    const obj = new Fridge()
    obj.id = data.id
    obj.name = data.name
    return obj
  }
}

export function map2list(map: {}, order: string[]): {}[] {
  return order.map(key => map[key])
}
