import { mount } from '@vue/test-utils'
import EmptyFridgeTemplate from '@/components/organisms/EmptyFridgeTemplate.vue'

describe('components/organisms/EmptyFridgeTemplate', () => {
  test('mount できること', () => {
    const wrapper = mount(EmptyFridgeTemplate)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('methods', () => {
    describe('clickTemplateA', () => {
      test('inherit イベントが発行されること', () => {
        const wrapper = mount<EmptyFridgeTemplate>(EmptyFridgeTemplate)
        const vm = wrapper.vm as any

        vm.clickTemplateA()
        expect(wrapper.emitted('inherit').length).toBe(1)
        expect(wrapper.emitted('inherit')[0][0]).toHaveProperty('fridge')
        expect(wrapper.emitted('inherit')[0][0]).toHaveProperty('lanes')
        expect(wrapper.emitted('inherit')[0][0]).toHaveProperty('stages')
      })
    })

    describe('clickTemplateB', () => {
      test('inherit イベントが発行されること', () => {
        const wrapper = mount<EmptyFridgeTemplate>(EmptyFridgeTemplate)
        const vm = wrapper.vm as any

        vm.clickTemplateB()
        expect(wrapper.emitted('inherit').length).toBe(1)
        expect(wrapper.emitted('inherit')[0][0]).toHaveProperty('fridge')
        expect(wrapper.emitted('inherit')[0][0]).toHaveProperty('lanes')
        expect(wrapper.emitted('inherit')[0][0]).toHaveProperty('stages')
      })
    })
  })
})
