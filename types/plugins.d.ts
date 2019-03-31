import 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      user: any
      needAuth: boolean
      loaded: boolean
    }
    $header: {
      label: string
      icon: string
      click: () => void
      set: (arg: { label?: string; icon?: string; click?: () => void }) => void
      clear: () => void
    }
  }
}
