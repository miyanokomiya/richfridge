import { mount } from '@vue/test-utils'
import ItemFormDialog from '@/components/organisms/dialogs/ItemFormDialog.vue'
import * as models from '@/plugins/models'
import { getMock } from '@/test/mocks'

describe('components/organisms/dialogs/ItemFormDialog', () => {
  const { fridge, stages, lanes } = getMock()
  const props = {
    fridge,
    lanes,
    stages,
    itemID: 'a',
    item: models.createItem(),
    value: true
  }

  test('mount できること', () => {
    const wrapper = mount(ItemFormDialog, {
      propsData: { ...props }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('computed', () => {
    describe('existed', () => {
      test('itemID の真偽値と一致すること true', () => {
        const wrapper = mount(ItemFormDialog, {
          propsData: { ...props, itemID: 'a' }
        })
        const vm = wrapper.vm as any
        expect(vm.existed).toBeTruthy()
      })
      test('itemID の真偽値と一致すること false', () => {
        const wrapper = mount(ItemFormDialog, {
          propsData: { ...props, itemID: '' }
        })
        const vm = wrapper.vm as any
        expect(vm.existed).toBeFalsy()
      })
    })

    describe('laneOptionList', () => {
      test('配列を取得できること', () => {
        const wrapper = mount(ItemFormDialog, {
          propsData: { ...props }
        })
        const vm = wrapper.vm as any
        expect(vm.laneOptionList).toBeInstanceOf(Array)
      })
    })

    describe('stageOptionList', () => {
      test('stage の option 一覧を取得できること', () => {
        const wrapper = mount(ItemFormDialog, {
          propsData: { ...props }
        })
        const vm = wrapper.vm as any
        expect(vm.stageOptionList).toEqual([
          { value: 'bb', label: 'BB' },
          { value: 'aa', label: 'AA' }
        ])
      })
    })
  })

  describe('methods', () => {
    describe('submit', () => {
      describe('existed = true のとき', () => {
        const item = models.createItem()
        const wrapper = mount(ItemFormDialog, {
          propsData: { ...props, itemID: 'a' },
          computed: { existed: () => true }
        })
        const vm = wrapper.vm as any
        test('update イベントが発行されること', () => {
          vm.submit()
          expect(wrapper.emitted('update')).toEqual([['a', item]])
        })
      })
      describe('existed = false のとき', () => {
        const item = models.createItem()
        const wrapper = mount(ItemFormDialog, {
          propsData: { ...props, itemID: '' },
          computed: { existed: () => false }
        })
        const vm = wrapper.vm as any
        test('create イベントが発行されること', () => {
          vm.submit()
          expect(wrapper.emitted('create')).toEqual([[item]])
        })
      })
    })
  })
})
