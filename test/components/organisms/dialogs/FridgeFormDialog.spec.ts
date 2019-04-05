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
  })
})
