import { mount } from '@vue/test-utils'
import MessageCard from '@/components/molecules/MessageCard.vue'

describe('components/molecules/MessageCard', () => {
  test('mount できること', () => {
    const wrapper = mount(MessageCard)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
