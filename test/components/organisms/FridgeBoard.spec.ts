import { mount } from '@vue/test-utils'
import FridgeBoard from '@/components/organisms/FridgeBoard.vue'
import * as models from '@/plugins/models'
import { getMock } from '@/test/mocks'

describe('components/organisms/FridgeBoard', () => {
  const {
    fridge,
    items,
    stages,
    lanes,
    itemA,
    stageAA,
    stageBB,
    laneAAA,
    laneBBB
  } = getMock()

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
    describe('getItemIDListAt', () => {
      const wrapper = mount<FridgeBoard>(FridgeBoard, {
        propsData: { fridge, items, stages, lanes }
      })
      const vm = wrapper.vm as any

      describe('引数を省略を指定した場合', () => {
        test('全item一覧を取得できること', () => {
          expect(vm.getItemIDListAt()).toEqual(['a', 'b', 'c'])
        })
      })
      describe('stageID を指定した場合', () => {
        test('stageID に対応する item 一覧を取得できること', () => {
          expect(vm.getItemIDListAt({ stageID: 'cc' })).toEqual(['c'])
        })
      })
      describe('laneID を指定した場合', () => {
        test('laneID に対応する item 一覧を取得できること', () => {
          expect(vm.getItemIDListAt({ laneID: 'aaa' })).toEqual(['a', 'c'])
        })
      })
      describe('stageID laneID を指定した場合', () => {
        test('stageID laneID に対応する item 一覧を取得できること', () => {
          expect(vm.getItemIDListAt({ stageID: 'aa', laneID: 'aaa' })).toEqual([
            'a'
          ])
        })
      })
    })

    describe('shiftItem', () => {
      test('updateItem イベントが発行されること', () => {
        const wrapper = mount<FridgeBoard>(FridgeBoard, {
          propsData: { fridge, items, stages, lanes }
        })
        const vm = wrapper.vm as any

        vm.shiftItem('a')
        expect(wrapper.emitted('updateItem')).toEqual([
          [
            'a',
            {
              ...itemA,
              stageID: 'bb'
            }
          ]
        ])
      })
    })

    describe('createItem', () => {
      test('createItem イベントが発行され、編集状態がクリアされること', () => {
        const wrapper = mount<FridgeBoard>(FridgeBoard, {
          propsData: { fridge, items, stages, lanes }
        })
        const vm = wrapper.vm as any
        const item = models.createItem()

        vm.editingItem = item
        vm.createItem(item)
        expect(wrapper.emitted('createItem')).toEqual([[item]])
        expect(vm.editingItem).toBeNull()
      })
    })

    describe('updateItem', () => {
      const wrapper = mount<FridgeBoard>(FridgeBoard, {
        propsData: { fridge, items, stages, lanes }
      })
      const vm = wrapper.vm as any

      test('updateItem イベントが発行され、編集状態がクリアされること', () => {
        const item = models.createItem()
        vm.editingItem = item
        vm.updateItem('a', item)
        expect(wrapper.emitted('updateItem')).toEqual([['a', item]])
        expect(vm.editingItem).toBeNull()
      })
    })

    describe('readyCreateItem', () => {
      test('editingItem に item がセットされること', () => {
        const wrapper = mount<FridgeBoard>(FridgeBoard, {
          propsData: { fridge, items, stages, lanes }
        })
        const vm = wrapper.vm as any
        vm.readyCreateItem({ stageID: 'cc' })
        expect(vm.editingItem).toEqual(
          models.createItem({ stageID: 'cc', laneID: 'bbb' })
        )
      })
    })

    describe('cancelEditItem', () => {
      test('editingItem が null、editingItemID が 空文字 になること', () => {
        const wrapper = mount<FridgeBoard>(FridgeBoard, {
          propsData: { fridge, items, stages, lanes }
        })
        const vm = wrapper.vm as any
        vm.editingItem = models.createItem()
        vm.editingItemID = 'dd'
        vm.cancelEditItem()
        expect(vm.editingItem).toBeNull()
        expect(vm.editingItemID).toBe('')
      })
    })
  })
})
