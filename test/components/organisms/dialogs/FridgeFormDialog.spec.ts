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
