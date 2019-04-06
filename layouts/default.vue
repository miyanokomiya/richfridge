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
      <button
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
      </button>
      <button @click="clickUserIcon">
        <img
          v-if="$auth.user"
          :src="$auth.user.photoURL"
          class="rounded-full w-auto h-6"
        />
      </button>
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
      @input="$confirm.clear()"
      @exec="exec"
    />
    <transition-group
      tag="div"
      name="transition-messages"
      class="fixed pin-l pin-b flex flex-col w-full px-2 pointer-events-none"
    >
      <MessageCard
        v-for="message in $messages.messages"
        :key="message"
        class="transition-message mb-2 pointer-events-auto"
        @close="$messages.clear(message)"
      >
        {{ message }}
      </MessageCard>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { signOut, signInWithRedirect, destroyUser } from '@/plugins/firebase'
import UserConfigDialog from '@/components/organisms/dialogs/UserConfigDialog.vue'
import ConfirmDialog from '@/components/organisms/dialogs/ConfirmDialog.vue'
import MessageCard from '@/components/molecules/MessageCard.vue'

@Component({
  components: {
    UserConfigDialog,
    ConfirmDialog,
    MessageCard
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
    this.$confirm.set({
      message:
        '作成した全てのデータは削除され、\n復元することはできません。\nアカウントを削除しますか？',
      exec: async () => {
        await destroyUser()
        location.reload()
      }
    })
  }

  clickUserIcon() {
    this.showUserConfig = true
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

.transition-message {
  transition: all 0.3s;
}
.transition-messages-enter {
  opacity: 0;
  transform: translateX(-4rem);
}
.transition-messages-leave-to {
  opacity: 0;
  transform: translateX(4rem);
}
</style>
