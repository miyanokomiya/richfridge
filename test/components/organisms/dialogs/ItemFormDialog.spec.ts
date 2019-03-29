import { mount } from '@vue/test-utils'
import ItemFormDialog from '@/components/organisms/dialogs/ItemFormDialog.vue'

describe('components/organisms/dialogs/ItemFormDialog', () => {
  test('mount できること', () => {
    const wrapper = mount(ItemFormDialog, {
      propsData: { value: true }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('computed', () => {
    describe('existed', () => {
      test('itemID の真偽値と一致すること true', () => {
        const wrapper = mount(ItemFormDialog, {
          propsData: { itemID: 'a' }
        })
        const vm = wrapper.vm as any
        expect(vm.existed).toBeTruthy()
      })
      test('itemID の真偽値と一致すること false', () => {
        const wrapper = mount(ItemFormDialog, {
          propsData: { itemID: '' }
        })
        const vm = wrapper.vm as any
        expect(vm.existed).toBeFalsy()
      })
    })
  })
})
