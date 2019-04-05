import { mount } from '@vue/test-utils'
import FridgeFormDialog from '@/components/organisms/dialogs/FridgeFormDialog.vue'
import { getMock } from '@/test/mocks'

describe('components/organisms/dialogs/FridgeFormDialog', () => {
  const { fridge, stages, lanes } = getMock()
  const props = {
    fridge,
    lanes,
    stages,
    value: true
  }

  test('mount できること', () => {
    const wrapper = mount(FridgeFormDialog, {
      propsData: { ...props }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('methods', () => {
    describe('addLane', () => {
      describe('parentID を指定したとき', () => {
        test('親laneのchildOrderに追加されること', () => {
          const wrapper = mount(FridgeFormDialog, {
            propsData: { ...props }
          })
          const vm = wrapper.vm as any
          expect(vm.fridgeDraft.laneOrder.length).toBe(2)
          expect(vm.lanesDraft.bbb.childOrder.length).toBe(0)
          vm.addLane('bbb')
          expect(vm.fridgeDraft.laneOrder.length).toBe(2)
          expect(vm.lanesDraft.bbb.childOrder.length).toBe(1)
          expect(vm.lanesDraft.bbb.childOrder[0].indexOf('NEW_')).toBe(0)
        })
      })

      describe('parentID を指定しないとき', () => {
        test('fridgeのlaneOrderに追加されること', () => {
          const wrapper = mount(FridgeFormDialog, {
            propsData: { ...props }
          })
          const vm = wrapper.vm as any
          expect(vm.fridgeDraft.laneOrder.length).toBe(2)
          vm.addLane()
          expect(vm.fridgeDraft.laneOrder.length).toBe(3)
          expect(vm.fridgeDraft.laneOrder[2].indexOf('NEW_')).toBe(0)
        })
      })
    })

    describe('addStage', () => {
      test('fridgeのstageOrderに追加されること', () => {
        const wrapper = mount(FridgeFormDialog, {
          propsData: { ...props }
        })
        const vm = wrapper.vm as any
        expect(vm.fridgeDraft.stageOrder.length).toBe(2)
        vm.addStage()
        expect(vm.fridgeDraft.stageOrder.length).toBe(3)
        expect(vm.fridgeDraft.stageOrder[2].indexOf('NEW_')).toBe(0)
      })
    })

    describe('removeLane', () => {
      test('lane を削除すること', () => {
        const wrapper = mount(FridgeFormDialog, {
          propsData: { ...props }
        })
        const vm = wrapper.vm as any
        expect(vm.fridgeDraft.laneOrder).toContain('bbb')
        expect(vm.lanesDraft).toHaveProperty('bbb')
        vm.removeLane('bbb')
        expect(vm.fridgeDraft.laneOrder).not.toContain('bbb')
        expect(vm.lanesDraft).not.toHaveProperty('bbb')
      })
    })

    describe('removeStage', () => {
      test('stage を削除すること', () => {
        const wrapper = mount(FridgeFormDialog, {
          propsData: { ...props }
        })
        const vm = wrapper.vm as any
        expect(vm.fridgeDraft.stageOrder).toContain('bb')
        expect(vm.stagesDraft).toHaveProperty('bb')
        vm.removeStage('bb')
        expect(vm.fridgeDraft.stageOrder).not.toContain('bb')
        expect(vm.stagesDraft).not.toHaveProperty('bb')
      })
    })

    describe('upLane', () => {
      describe('parentID を指定した場合', () => {
        test('親laneのchildOrderにて順序を1つ前と入れ替えること', () => {
          const wrapper = mount(FridgeFormDialog, {
            propsData: { ...props }
          })
          const vm = wrapper.vm as any
          vm.upLane(2, 'aaa')
          expect(vm.lanesDraft.aaa.childOrder).toEqual(['ccc', 'fff', 'ddd'])
        })
      })

      describe('parentID を指定しない場合', () => {
        test('fridge.laneOrderにて順序を1つ前と入れ替えること', () => {
          const wrapper = mount(FridgeFormDialog, {
            propsData: { ...props }
          })
          const vm = wrapper.vm as any
          vm.upLane(1)
          expect(vm.fridgeDraft.laneOrder).toEqual(['aaa', 'bbb'])
        })
      })
    })

    describe('upStage', () => {
      test('fridge.stageOrderにて順序を1つ前と入れ替えること', () => {
        const wrapper = mount(FridgeFormDialog, {
          propsData: { ...props }
        })
        const vm = wrapper.vm as any
        vm.upStage(1)
        expect(vm.fridgeDraft.stageOrder).toEqual(['aa', 'bb'])
      })
    })
  })
})
