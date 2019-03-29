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

  describe('methods', () => {
    describe('submit', () => {
      describe('existed = true のとき', () => {
        const wrapper = mount(ItemFormDialog, {
          computed: { existed: () => true }
        })
        const vm = wrapper.vm as any
        test('update イベントが発行されること', () => {
          vm.submit()
          expect(wrapper.emitted('update').length).toBe(1)
        })
      })
      describe('existed = false のとき', () => {
        const wrapper = mount(ItemFormDialog, {
          computed: { existed: () => false }
        })
        const vm = wrapper.vm as any
        test('create イベントが発行されること', () => {
          vm.submit()
          expect(wrapper.emitted('create').length).toBe(1)
        })
      })
    })
  })
})
