<template>
  <section class="container h-full">
    <FridgeBoard
      :fridge="fridge"
      :items="items"
      :lanes="lanes"
      :stages="stages"
      @createItem="createItem"
      @updateItem="updateItem"
    />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '@/plugins/firebase'
import FridgeBoard from '@/components/organisms/FridgeBoard.vue'

const ref = db.doc('/fridges/KUl92YJbp3RNdFXKrGNk')

@Component({
  components: {
    FridgeBoard
  }
})
export default class Index extends Vue {
  fridge: Fridge = null
  items: { [key: string]: Item } = {}
  lanes: { [key: string]: Lane } = {}
  stages: { [key: string]: Stage } = {}

  mounted() {
    this.attach()
  }

  attach() {
    ref.onSnapshot(doc => {
      this.fridge = doc.data() as Fridge
    })
    ref.collection('items').onSnapshot(query => {
      query.forEach(doc => Vue.set(this.items, doc.id, doc.data()))
    })
    ref.collection('lanes').onSnapshot(query => {
      query.forEach(doc => Vue.set(this.lanes, doc.id, doc.data()))
    })
    ref.collection('stages').onSnapshot(query => {
      query.forEach(doc => Vue.set(this.stages, doc.id, doc.data()))
    })
  }

  createItem(item) {
    ref.collection('items').add(item)
  }

  updateItem(itemID: string, item: Item) {
    ref
      .collection('items')
      .doc(itemID)
      .set(item)
  }
}
</script>

<style></style>
