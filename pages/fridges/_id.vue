<template>
  <section class="h-full">
    <FridgeBoard
      v-if="fridge"
      :fridge="fridge"
      :items="items"
      :lanes="lanes"
      :stages="stages"
      @createItem="createItem"
      @updateItem="updateItem"
      @removeItem="removeItem"
      @updateFridge="updateFridge"
      @removeFridge="removeFridge"
      @cloneFridge="cloneFridge"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '@/plugins/firebase'
import * as models from '@/plugins/models.ts'
import FridgeBoard from '@/components/organisms/FridgeBoard.vue'

@Component({
  components: {
    FridgeBoard
  },
  head() {
    return {
      title: this.fridge ? this.fridge.name : 'fridge'
    }
  }
})
export default class FridgeShow extends Vue {
  fridge: Fridge = null
  items: Items = {}
  lanes: Lanes = {}
  stages: Stages = {}
  unsubscribes: (() => void)[] = []
  progressing: boolean = false

  get fridgeID() {
    return this.$route.params.id
  }

  get fridgeRef() {
    return db.doc(`/fridges/${this.fridgeID}`)
  }

  created() {
    if (!this.$auth.user) return
    this.attach()
  }

  destroyed() {
    this.detach()
  }

  detach() {
    this.unsubscribes.forEach(f => f())
  }

  attach() {
    this.unsubscribes.push(
      this.fridgeRef.onSnapshot(
        doc => {
          this.fridge = models.createFridge(doc.data())
        },
        e => this.$messages.push('データ取得に失敗しました', e)
      )
    )
    this.unsubscribes.push(
      this.fridgeRef.collection('items').onSnapshot(
        query => {
          query.docChanges().forEach(change => {
            if (change.type === 'removed') {
              Vue.delete(this.items, change.doc.id)
            } else {
              Vue.set(
                this.items,
                change.doc.id,
                models.createItem(change.doc.data())
              )
            }
          })
        },
        e => this.$messages.push('データ取得に失敗しました', e)
      )
    )
    this.unsubscribes.push(
      this.fridgeRef.collection('lanes').onSnapshot(
        query => {
          query.docChanges().forEach(change => {
            if (change.type === 'removed') {
              Vue.delete(this.lanes, change.doc.id)
            } else {
              Vue.set(
                this.lanes,
                change.doc.id,
                models.createLane(change.doc.data())
              )
            }
          })
        },
        e => this.$messages.push('データ取得に失敗しました', e)
      )
    )
    this.unsubscribes.push(
      this.fridgeRef.collection('stages').onSnapshot(
        query => {
          query.docChanges().forEach(change => {
            if (change.type === 'removed') {
              Vue.delete(this.stages, change.doc.id)
            } else {
              Vue.set(
                this.stages,
                change.doc.id,
                models.createStage(change.doc.data())
              )
            }
          })
        },
        e => this.$messages.push('データ取得に失敗しました', e)
      )
    )
  }

  createItem(item) {
    this.fridgeRef.collection('items').add(item)
  }

  updateItem(itemID: string, item: Item) {
    this.fridgeRef
      .collection('items')
      .doc(itemID)
      .set(item)
      .catch(e => this.$messages.push('処理に失敗しました', e))
  }

  removeItem(itemID: string) {
    this.fridgeRef
      .collection('items')
      .doc(itemID)
      .delete()
      .catch(e => this.$messages.push('処理に失敗しました', e))
  }

  async updateFridge(arg: { fridge: Fridge; lanes: Lanes; stages: Stages }) {
    const { fridge, lanes, stages } = models.convertTmpID({
      ...arg,
      getLaneID: () => this.fridgeRef.collection('lanes').doc().id,
      getStageID: () => this.fridgeRef.collection('stages').doc().id
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

    Object.keys(this.stages)
      .filter(stageID => !fridge.stageOrder.includes(stageID))
      .forEach(stageID => {
        batch.delete(this.fridgeRef.collection('stages').doc(stageID))
      })

    Object.keys(this.lanes)
      .filter(
        laneID =>
          !models.existedLaneID({
            fridge,
            lanes,
            laneID
          })
      )
      .forEach(laneID => {
        batch.delete(this.fridgeRef.collection('lanes').doc(laneID))
      })

    await batch
      .commit()
      .catch(e => this.$messages.push('処理に失敗しました', e))
  }

  async removeFridge() {
    this.detach()
    try {
      await db
        .collection('fridgeAuths')
        .doc(this.fridgeID)
        .delete()
      this.$router.push('/')
    } catch (e) {
      this.$messages.push('処理に失敗しました', e)
    }
  }

  async cloneFridge() {
    this.progressing = true
    const fridgeAuth = models.createFridgeAuth({
      ownerID: this.$auth.user.uid,
      users: { [this.$auth.user.uid]: { type: 'owner' } }
    })
    const fridgeAuthRef = db.collection('fridgeAuths').doc()

    const fridge = models.clone<Fridge>(this.fridge)
    const fridgeRef = db.collection('fridges').doc(fridgeAuthRef.id)

    try {
      await fridgeRef.set(fridge)
      await fridgeAuthRef.set(fridgeAuth)

      const batch = db.batch()
      Object.keys(this.lanes).forEach(id => {
        batch.set(fridgeRef.collection('lanes').doc(id), this.lanes[id])
      })
      Object.keys(this.stages).forEach(id => {
        batch.set(fridgeRef.collection('stages').doc(id), this.stages[id])
      })
      Object.keys(this.items).forEach(id => {
        batch.set(fridgeRef.collection('items').doc(id), this.items[id])
      })
      await batch.commit()
      this.progressing = false
      this.$router.push(`/fridges/${fridgeRef.id}`)
    } catch (e) {
      this.$messages.push('処理に失敗しました', e)
      this.progressing = false
    }
  }
}
</script>
