<template>
  <section class="container h-full">
    <div class="p-4 flex flex-col justify-center">
      <div class="text-center">
        <p>
          この画面から作成したデータは保護されず、URLを知っている誰もが閲覧・編集可能です。
        </p>
        <br />
        <p>URLの再発行はできないため、紛失にご注意ください。</p>
      </div>
      <BaseButton class="my-4" @click="createFridge">
        新規作成
      </BaseButton>
      <nuxt-link to="/" class="text-center text-sm">
        保護されたデータを作成する
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
    await fridgeRef.set(fridge)
    this.$router.push(`/public/${fridgeRef.id}`)
  }
}
</script>
