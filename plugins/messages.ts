import Vue from 'vue'

const messagesState = {
  messages: [],
  push: function(message: string) {
    if (this.messages.includes(message)) return
    this.messages.push(message)
  },
  clear: function(message: string) {
    if (message) {
      const index = this.messages.indexOf(message)
      if (index !== -1) {
        this.messages.splice(index, 1)
      }
    } else {
      this.messages = []
    }
  }
}

Vue.use({
  install: Vue => {
    ;(Vue as any).util.defineReactive(Vue.prototype, '$messages', messagesState)
  }
})
