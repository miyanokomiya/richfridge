import { mount } from '@vue/test-utils'
import ItemCard from '@/components/molecules/ItemCard.vue'
import { createItem } from '@/plugins/models'

const props = {
  item: createItem()
}

describe('components/molecules/ItemCard', () => {
  test('mount できること', () => {
    const wrapper = mount(ItemCard, {
      propsData: { ...props }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
