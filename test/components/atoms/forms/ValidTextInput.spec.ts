import { mount } from '@vue/test-utils'
import ValidTextInput from '@/components/atoms/forms/ValidTextInput.vue'

describe('components/atoms/forms/ValidTextInput', () => {
  test('mount できること', () => {
    const wrapper = mount(ValidTextInput, {
      propsData: { value: 'text' }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('computed', () => {
    describe('valueDraft', () => {
      test('value が取得できること', () => {
        const wrapper = mount(ValidTextInput, {
          propsData: { value: 'abc' }
        })
        const vm = wrapper.vm as any
        expect(vm.valueDraft).toBe('abc')
      })
      test('set で input イベントが発行されること', () => {
        const wrapper = mount(ValidTextInput, {
          propsData: { value: '' }
        })
        const vm = wrapper.vm as any
        vm.valueDraft = 'a'
        expect(wrapper.emitted('input')).toEqual([['a']])
      })
    })
  })
})
