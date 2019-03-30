import { mount } from '@vue/test-utils'
import NavigationTabs from '@/components/molecules/NavigationTabs.vue'

const props = {
  value: 'a',
  optionList: [{ value: 'a', name: 'aa' }, { value: 'b', name: 'bb' }]
}

describe('components/molecules/NavigationTabs', () => {
  test('mount できること', () => {
    const wrapper = mount(NavigationTabs, {
      propsData: { ...props }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('methods', () => {
    describe('selected', () => {
      describe('value と一致する場合', () => {
        test('true であること', () => {
          const wrapper = mount(NavigationTabs, {
            propsData: { ...props }
          })
          const vm = wrapper.vm as any
          expect(vm.selected('a')).toBeTruthy()
        })
      })
      describe('value と一致しない場合', () => {
        test('false であること', () => {
          const wrapper = mount(NavigationTabs, {
            propsData: { ...props }
          })
          const vm = wrapper.vm as any
          expect(vm.selected('b')).toBeFalsy()
        })
      })
    })
  })
})
