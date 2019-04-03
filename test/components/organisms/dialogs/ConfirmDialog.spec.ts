import { mount } from '@vue/test-utils'
import ConfirmDialog from '@/components/organisms/dialogs/ConfirmDialog.vue'

describe('components/organisms/dialogs/ConfirmDialog', () => {
  test('mount できること', () => {
    const wrapper = mount(ConfirmDialog, {
      propsData: { value: true }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
