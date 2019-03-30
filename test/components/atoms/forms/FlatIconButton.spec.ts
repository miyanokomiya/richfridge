import { mount } from '@vue/test-utils'
import FlatIconButton from '@/components/atoms/forms/FlatIconButton.vue'

describe('components/atoms/forms/FlatIconButton', () => {
  test('mount できること', () => {
    const wrapper = mount(FlatIconButton, {
      propsData: { icon: 'plus-circle' }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
