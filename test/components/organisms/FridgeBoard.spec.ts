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

    describe('shiftItem', () => {
      test('updateItem イベントが発行されること', () => {
        vm.shiftItem('a')
        expect(wrapper.emitted('updateItem').length).toBe(1)
        expect(wrapper.emitted('updateItem')[0]).toEqual([
          'a',
          {
            ...itemA,
            stageID: 'bb'
          }
        ])
      })
    })

    describe('createItem', () => {
      test('createItem イベントが発行され、 editingItem が null になること', () => {
        const item = models.createItem()
        vm.editingItem = item
        vm.createItem(item)
        expect(wrapper.emitted('createItem').length).toBe(1)
        expect(wrapper.emitted('createItem')[0]).toEqual([item])
        expect(vm.editingItem).toBeNull()
      })
    })

    describe('readyCreateItem', () => {
      test('editingItem に item がセットされること', () => {
        vm.readyCreateItem({ stageID: 'cc' })
        expect(vm.editingItem).toEqual(models.createItem({ stageID: 'cc' }))
      })
    })

    describe('cancelEditItem', () => {
      test('editingItem が null、editingItemID が 空文字 になること', () => {
        vm.editingItem = models.createItem()
        vm.editingItemID = 'dd'
        vm.cancelEditItem()
        expect(vm.editingItem).toBeNull()
        expect(vm.editingItemID).toBe('')
      })
    })
  })
})
