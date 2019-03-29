import { mount } from '@vue/test-utils'
import FridgeBoard from '@/components/organisms/FridgeBoard.vue'
import * as models from '@/plugins/models'

describe('components/organisms/FridgeBoard', () => {
  const fridge = models.createFridge({
    stageOrder: ['bb', 'aa'],
    laneOrder: ['bbb', 'aaa']
  })

  const itemA = models.createItem({ stageID: 'aa' })
  const itemB = models.createItem({ stageID: 'bb' })
  const items = { a: itemA, b: itemB }

  const stageAA = models.createStage({ name: 'aa' })
  const stageBB = models.createStage({ name: 'bb' })
  const stages = { aa: stageAA, bb: stageBB }

  const laneAAA = models.createLane({ name: 'aaa' })
  const laneBBB = models.createLane({ name: 'bbb' })
  const lanes = { aaa: laneAAA, bbb: laneBBB }

  test('mount できること', () => {
    const wrapper = mount(FridgeBoard, {
      propsData: { fridge, items, stages, lanes }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('computed', () => {
    const wrapper = mount<FridgeBoard>(FridgeBoard, {
      propsData: { fridge, items, stages, lanes }
    })
    const vm = wrapper.vm as any

    describe('stageList', () => {
      test('stageOrder の順番で stage 一覧を取得できること', () => {
        expect(vm.stageList).toEqual([stageBB, stageAA])
      })
    })

    describe('laneList', () => {
      test('laneOrder の順番で lane 一覧を取得できること', () => {
        expect(vm.laneList).toEqual([laneBBB, laneAAA])
      })
    })
  })

  describe('methods', () => {
    const wrapper = mount<FridgeBoard>(FridgeBoard, {
      propsData: { fridge, items, stages, lanes }
    })
    const vm = wrapper.vm as any

    describe('getItemIDListInStage', () => {
      test('stageID に対応する item 一覧を取得できること', () => {
        expect(vm.getItemIDListInStage('aa')).toEqual(['a'])
      })
    })
  })
})
