import { mount } from '@vue/test-utils'
import BaseDialog from '@/components/organisms/dialogs/BaseDialog.vue'

describe('components/organisms/dialogs/BaseDialog', () => {
  test('mount できること', () => {
    const wrapper = mount(BaseDialog, {
      propsData: { value: true }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
