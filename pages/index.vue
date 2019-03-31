<template>
  <section class="container h-full">
    <div class="p-2">
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
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '@/plugins/firebase'

@Component
export default class RootIndex extends Vue {
  fridgeAuths: FridgeAuths = {}
  fridges: Fridges = {}
  unsubscribes: (() => void)[] = []

  get fridgeAuthIDList() {
    return Object.keys(this.fridgeAuths).filter(id => id in this.fridges)
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
        .onSnapshot(query => {
          query.docChanges().forEach(change => {
            if (change.type === 'removed') {
              Vue.delete(this.fridgeAuths, change.doc.id)
            } else {
              Vue.set(this.fridgeAuths, change.doc.id, change.doc.data())
              db.collection('fridges')
                .doc(change.doc.id)
                .get()
                .then(doc => {
                  Vue.set(this.fridges, doc.id, doc.data())
                })
            }
          })
        })
    )
  }
}
</script>
