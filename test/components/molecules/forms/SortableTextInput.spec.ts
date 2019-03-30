import { mount } from '@vue/test-utils'
import SortableTextInput from '@/components/molecules/forms/SortableTextInput.vue'

const props = {
  value: 'a'
}

describe('components/molecules/forms/SortableTextInput', () => {
  test('mount できること', () => {
    const wrapper = mount(SortableTextInput, {
      propsData: { ...props }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
