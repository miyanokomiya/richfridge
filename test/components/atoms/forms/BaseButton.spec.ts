import { mount } from '@vue/test-utils'
import BaseButton from '@/components/atoms/forms/BaseButton.vue'

describe('components/atoms/forms/BaseButton', () => {
  test('mount できること', () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
