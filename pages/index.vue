<template>
  <section class="container h-full p-2">
    <FlatIconButton class="mb-2" icon="plus-circle" @click="createFridge" />
    <div class="py-2">
      <div
        v-for="fridgeAuthID in fridgeAuthIDList"
        :key="fridgeAuthID"
        class="rounded-t relative -mb-px block border border-grey"
      >
        <nuxt-link
          class="p-4 flex items-center justify-between no-underline text-blue hover:text-blue-darkest"
          :to="`/fridges/${fridgeAuthID}`"
        >
          <span>{{ fridges[fridgeAuthID].name }}</span>
          <font-awesome-icon icon="arrow-right" />
        </nuxt-link>
      </div>
    </div>
    <div class="text-center my-2">
      <nuxt-link to="/public" class="text-sm">
        公開データを作成する
      </nuxt-link>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '@/plugins/firebase'
import * as models from '@/plugins/models'
import FlatIconButton from '@/components/atoms/forms/FlatIconButton.vue'

@Component({
  components: {
    FlatIconButton
  }
})
export default class RootIndex extends Vue {
  fridgeAuths: FridgeAuths = {}
  fridges: Fridges = {}
  unsubscribes: (() => void)[] = []

  get fridgeAuthIDList() {
    const list = Object.keys(this.fridgeAuths).filter(id => this.fridges[id])
    list.sort((a, b) => (this.fridges[a].name > this.fridges[b].name ? 1 : -1))
    return list
  }

  created() {
    this.attach()
  }

  destroyed() {
    this.unsubscribes.forEach(f => f())
  }

  attach() {
    this.unsubscribes.push(
      db
        .collection('fridgeAuths')
        .where('ownerID', '==', this.$auth.user.uid)
        .onSnapshot(
          query => {
            query.docChanges().forEach(change => {
              if (change.type === 'removed') {
                Vue.delete(this.fridgeAuths, change.doc.id)
                return
              }

              Vue.set(
                this.fridgeAuths,
                change.doc.id,
                models.createFridgeAuth(change.doc.data())
              )

              // ローカルコミットで追加済ならロードはスキップ
              if (change.type === 'added' && this.fridges[change.doc.id]) {
                return
              }

              db.collection('fridges')
                .doc(change.doc.id)
                .get()
                .then(doc => {
                  Vue.set(this.fridges, doc.id, models.createFridge(doc.data()))
                })
                .catch(e => this.$messages.push('データ取得に失敗しました', e))
            })
          },
          e => this.$messages.push('データ取得に失敗しました', e)
        )
    )
  }

  async createFridge() {
    const fridgeAuth = models.createFridgeAuth({
      ownerID: this.$auth.user.uid,
      users: { [this.$auth.user.uid]: { type: 'owner' } }
    })
    const fridgeAuthRef = db.collection('fridgeAuths').doc()

    const fridge = models.createFridge({ name: 'new' })
    const fridgeRef = db.collection('fridges').doc(fridgeAuthRef.id)

    try {
      await fridgeRef.set(fridge)
      Vue.set(this.fridges, fridgeAuthRef.id, fridge)
      await fridgeAuthRef.set(fridgeAuth)
    } catch (e) {
      this.$messages.push('処理に失敗しました', e)
    }
  }
}
</script>
