<template>
  <section class="container h-full">
    <div v-if="notAuth" class="text-center">
      <p class="my-4">認証が必要です</p>
      <button @click="signInWithRedirect">
        <img src="~assets/images/btn_google_signin_dark_normal_web.png" />
      </button>
    </div>
    <FridgeBoard
      v-else
      :fridge="fridge"
      :items="items"
      :lanes="lanes"
      :stages="stages"
      @createItem="createItem"
      @updateItem="updateItem"
      @updateFridge="updateFridge"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db, signInWithRedirect } from '@/plugins/firebase'
import * as models from '@/plugins/models.ts'
import FridgeBoard from '@/components/organisms/FridgeBoard.vue'

@Component({
  components: {
    FridgeBoard
  }
})
export default class FridgeShow extends Vue {
  fridge: Fridge = null
  items: Items = {}
  lanes: Lanes = {}
  stages: Stages = {}

  get notAuth() {
    return this.$auth.needAuth && !this.$auth.user
  }
  get fridgeID() {
    return this.$route.params.id
  }
  get fridgeRef() {
    return db.doc(`/fridges/${this.fridgeID}`)
  }

  created() {
    if (this.notAuth) return
    this.attach()
  }

  attach() {
    this.fridgeRef.onSnapshot(doc => {
      this.fridge = doc.data() as Fridge
    })
    this.fridgeRef.collection('items').onSnapshot(query => {
      query.forEach(doc => Vue.set(this.items, doc.id, doc.data()))
    })
    this.fridgeRef.collection('lanes').onSnapshot(query => {
      query.forEach(doc => Vue.set(this.lanes, doc.id, doc.data()))
    })
    this.fridgeRef.collection('stages').onSnapshot(query => {
      query.forEach(doc => Vue.set(this.stages, doc.id, doc.data()))
    })
  }

  createItem(item) {
    this.fridgeRef.collection('items').add(item)
  }

  updateItem(itemID: string, item: Item) {
    this.fridgeRef
      .collection('items')
      .doc(itemID)
      .set(item)
  }

  updateFridge(arg: { fridge: Fridge; lanes: Lanes; stages: Stages }) {
    const { fridge, lanes, stages } = models.convertTmpID({
      ...arg,
      getLaneID: () => this.fridgeRef.collection('lanes').doc().id,
      getStageID: () => this.fridgeRef.collection('stages').doc().id
    })

    const removedItemIDList = models.getRemovedItemIDList({
      items: this.items,
      lanes: arg.lanes,
      stages: arg.stages
    })

    const batch = db.batch()
    batch.set(this.fridgeRef, fridge)
    Object.keys(lanes).forEach(laneID => {
      batch.set(this.fridgeRef.collection('lanes').doc(laneID), lanes[laneID])
    })
    Object.keys(stages).forEach(stageID => {
      batch.set(
        this.fridgeRef.collection('stages').doc(stageID),
        stages[stageID]
      )
    })
    removedItemIDList.forEach(itemID => {
      batch.delete(this.fridgeRef.collection('items').doc(itemID))
    })
    batch.commit()
  }

  signInWithRedirect() {
    signInWithRedirect()
  }
}
</script>
