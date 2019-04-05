import { mount } from '@vue/test-utils'
import ToggleOrderButton from '@/components/atoms/forms/ToggleOrderButton.vue'

describe('components/atoms/forms/ToggleOrderButton', () => {
  test('mount できること', () => {
    const wrapper = mount(ToggleOrderButton)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
