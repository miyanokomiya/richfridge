import { mount } from '@vue/test-utils'
import SelectInput from '@/components/atoms/forms/SelectInput.vue'

const props = {
  value: 'a',
  optionList: [{ value: 'a', name: 'aa' }, { value: 'b', name: 'bb' }]
}

describe('components/atoms/forms/SelectInput', () => {
  test('mount できること', () => {
    const wrapper = mount(SelectInput, {
      propsData: { ...props }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('computed', () => {
    describe('valueDraft', () => {
      test('value が取得できること', () => {
        const wrapper = mount(SelectInput, {
          propsData: { ...props }
        })
        const vm = wrapper.vm as any
        expect(vm.valueDraft).toBe('a')
      })
      test('set で input イベントが発行されること', () => {
        const wrapper = mount(SelectInput, {
          propsData: { ...props }
        })
        const vm = wrapper.vm as any
        vm.valueDraft = 'b'
        expect(wrapper.emitted('input')).toEqual([['b']])
      })
    })
  })
})
