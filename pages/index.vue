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
import * as models from '@/plugins/models'

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

  get stageList(): Stage[] {
    if (!this.fridge) return []
    return models.map2list<Stage>(this.stages, this.fridge.stageOrder)
  }

  get laneList(): Lane[] {
    if (!this.fridge) return []
    return models.map2list<Lane>(this.stages, this.fridge.laneOrder)
  }

  mounted() {
    this.load()
  }

  load() {
    const ref = db.doc('/fridges/KUl92YJbp3RNdFXKrGNk')
    ref.get().then(doc => {
      this.fridge = doc.data() as Fridge
      return Promise.resolve()
    })
    ref
      .collection('items')
      .get()
      .then(query => {
        query.forEach(doc => {
          this.items[doc.id] = doc.data() as Item
        })
      })
    ref
      .collection('lanes')
      .get()
      .then(query => {
        query.forEach(doc => {
          this.lanes[doc.id] = doc.data() as Lane
        })
      })
    ref
      .collection('stages')
      .get()
      .then(query => {
        query.forEach(doc => {
          this.stages[doc.id] = doc.data() as Stage
        })
      })
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
