export function map2list<T>(map: { [key: string]: T }, order: string[]): T[] {
  return order.map(key => map[key])
}
