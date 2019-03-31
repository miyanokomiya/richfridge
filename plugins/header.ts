import Vue from 'vue'

const headerState = {
  label: '',
  icon: '',
  click: () => {},
  set: function(
    arg: { label?: string; icon?: string; click?: () => void } = {}
  ) {
    this.label = arg.label || ''
    this.icon = arg.icon || ''
    this.click = arg.click || (() => {})
  },
  clear: function() {
    this.label = ''
    this.icon = ''
    this.click = () => {}
  }
}

Vue.use({
  install: Vue => {
    ;(Vue as any).util.defineReactive(Vue.prototype, '$header', headerState)
  }
})
