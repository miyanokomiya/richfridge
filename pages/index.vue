<template>
  <section class="container">
    <div>
      <logo />
      <HelloWorld />
      <HelloWorld :message="'123'" />
      <h1 class="title">
        richfridge
      </h1>
      <h2 class="subtitle">
        richfridge
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green"
          >Documentation</a
        >
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
          >GitHub</a
        >
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { db } from '@/plugins/firebase'
import Logo from '@/components/Logo.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { Fridge, Lane, Stage, Item } from '@/plugins/models'

@Component({
  components: {
    Logo,
    HelloWorld
  }
})
export default class Index extends Vue {
  fridge: Fridge = null
  items: { [key: string]: Item } = {}
  lanes: { [key: string]: Lane } = {}
  stages: { [key: string]: Stage } = {}

  get stageList(): Array<Object> {
    if (!this.fridge) return []
    return this.fridge.stageOrder.map(id => this.stages[id])
  }

  mounted() {
    this.load()
  }

  async load() {
    const ref = db.doc('/fridges/KUl92YJbp3RNdFXKrGNk')
    await ref.get().then(doc => {
      this.fridge = Fridge.parse(doc.data())
      return Promise.resolve()
    })
    await ref
      .collection('items')
      .get()
      .then(query => {
        query.forEach(doc => {
          this.items[doc.id] = Item.parse(doc.data())
        })
      })
    await ref
      .collection('lanes')
      .get()
      .then(query => {
        query.forEach(doc => {
          this.lanes[doc.id] = Lane.parse(doc.data())
        })
      })
    await ref
      .collection('stages')
      .get()
      .then(query => {
        query.forEach(doc => {
          this.stages[doc.id] = Stage.parse(doc.data())
        })
      })

    console.log(this.fridge)
    console.log(this.items)
    console.log(this.lanes)
    console.log(this.stages)
    console.log(this.stageList)
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
