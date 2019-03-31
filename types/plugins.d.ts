import 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      user: any
      needAuth: boolean
      loaded: boolean
    }
  }
}
