<template>
  <div class="h-screen">
    <div
      class="flex items-center justify-between flex-wrap bg-teal px-2"
      :style="{ height: '2rem' }"
    >
      <font-awesome-icon icon="home" class="text-white hover:text-grey" />
      <div
        v-if="$auth.user"
        class="text-white hover:text-grey font-semibold"
        @click="() => (showUserConfig = true)"
      >
        {{ $auth.user.displayName }}
      </div>
    </div>
    <div v-if="$auth.loaded" :style="{ height: 'calc(100% - 2rem)' }">
      <nuxt />
    </div>
    <UserConfigDialog
      v-model="showUserConfig"
      @signOut="signOut"
      @deleteAccount="deleteAccount"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { signOut } from '@/plugins/firebase'
import UserConfigDialog from '@/components/organisms/dialogs/UserConfigDialog.vue'

@Component({
  components: {
    UserConfigDialog
  }
})
export default class Default extends Vue {
  showUserConfig: boolean = false

  async signOut() {
    await signOut()
    location.reload()
  }

  deleteAccount() {
    // TODO
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
