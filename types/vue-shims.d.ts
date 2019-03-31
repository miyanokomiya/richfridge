import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      user: any
      needAuth: boolean
      loaded: boolean
    }
  }
}
