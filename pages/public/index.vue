<template>
  <section class="container h-full p-2">
    <div>
      <p>
        この画面から作成したデータは保護されず、URLを知っている誰でも閲覧・編集可能です。
      </p>
      <p>URLの再発行はできません。紛失にご注意ください。</p>
    </div>
    <div class="text-center">
      <BaseButton class="mt-4 mb-2" @click="createFridge">
        新規作成
      </BaseButton>
    </div>
    <div class="text-center my-2">
      <nuxt-link to="/" class="text-sm">
        保護されたデータを作成する<br />(要認証)
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '@/plugins/firebase'
import * as models from '@/plugins/models'
import BaseButton from '@/components/atoms/forms/BaseButton.vue'

@Component({
  components: {
    BaseButton
  }
})
export default class PublicIndex extends Vue {
  async createFridge() {
    const fridge = models.createFridge({ name: 'new' })
    const fridgeRef = db.collection('publicFridges').doc()
    try {
      await fridgeRef.set(fridge)
      this.$router.push(`/public/${fridgeRef.id}`)
    } catch (e) {
      this.$messages.push('処理に失敗しました', e)
    }
  }
}
</script>
