import Vue from 'vue'

const confirmState = {
  message: '',
  exec: () => {},
  set: function(arg: { message: string; exec: () => void }) {
    this.message = arg.message || ''
    this.exec = arg.exec || (() => {})
  },
  clear: function() {
    this.message = ''
    this.exec = () => {}
  }
}

Vue.use({
  install: Vue => {
    ;(Vue as any).util.defineReactive(Vue.prototype, '$confirm', confirmState)
  }
})
