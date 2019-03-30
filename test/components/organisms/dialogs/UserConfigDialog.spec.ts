import { mount } from '@vue/test-utils'
import UserConfigDialog from '@/components/organisms/dialogs/UserConfigDialog.vue'

describe('components/organisms/dialogs/UserConfigDialog', () => {
  test('mount できること', () => {
    const wrapper = mount(UserConfigDialog, {
      propsData: { value: true }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
