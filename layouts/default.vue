<template>
  <div class="h-screen">
    <div
      class="flex items-center justify-between flex-wrap bg-teal px-2"
      :style="{ height: '2rem' }"
    >
      <nuxt-link to="/">
        <font-awesome-icon
          icon="home"
          class="text-xl text-white hover:text-grey"
        />
      </nuxt-link>
      <a
        v-if="$header.label || $header.icon"
        class="flex items-center justify-center font-medium text-xl text-white hover:text-grey decoration-none"
        :style="{ width: 'calc(100% - 4rem)' }"
        @click="$header.click"
      >
        <span class="truncate" :style="{ 'max-width': 'calc(100% - 2rem)' }">{{
          $header.label
        }}</span>
        <font-awesome-icon
          v-if="$header.icon"
          class="ml-1 text-base text-grey-light hover:text-grey-darkest"
          :icon="$header.icon"
        />
      </a>
      <img
        v-if="$auth.user"
        :src="$auth.user.photoURL"
        class="rounded-full w-auto h-6"
        @click="() => (showUserConfig = true)"
      />
    </div>
    <div v-if="$auth.loaded" :style="{ height: 'calc(100% - 2rem)' }">
      <div v-if="notAuth" class="text-center">
        <p class="my-4">認証が必要です</p>
        <button @click="signInWithRedirect">
          <img src="~assets/images/btn_google_signin_dark_normal_web.png" />
        </button>
      </div>
      <nuxt v-else />
    </div>
    <UserConfigDialog
      v-model="showUserConfig"
      @signOut="signOut"
      @deleteAccount="deleteAccount"
    />
    <ConfirmDialog
      :value="!!$confirm.message"
      :message="$confirm.message"
      @input="() => $confirm.clear()"
      @exec="exec"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { signOut, signInWithRedirect } from '@/plugins/firebase'
import UserConfigDialog from '@/components/organisms/dialogs/UserConfigDialog.vue'
import ConfirmDialog from '@/components/organisms/dialogs/ConfirmDialog.vue'

@Component({
  components: {
    UserConfigDialog,
    ConfirmDialog
  }
})
export default class Default extends Vue {
  showUserConfig: boolean = false

  get notAuth() {
    return this.$auth.needAuth && !this.$auth.user
  }

  @Watch('$route')
  $routeChanged() {
    this.$confirm.clear()
    this.showUserConfig = false
  }

  async signOut() {
    await signOut()
    location.reload()
  }

  signInWithRedirect() {
    signInWithRedirect()
  }

  deleteAccount() {
    // TODO
  }

  exec() {
    this.$confirm.exec()
    this.$confirm.clear()
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
html,
body {
  overflow: hidden;
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
