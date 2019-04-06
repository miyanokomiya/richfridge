<script lang="ts">
import { Component } from 'vue-property-decorator'
import { db } from '@/plugins/firebase'
import FridgeShow from '@/pages/fridges/_id.vue'

@Component
export default class PublicShow extends FridgeShow {
  get fridgeRef() {
    return db.doc(`/publicFridges/${this.fridgeID}`)
  }

  async removeFridge() {
    this.detach()
    await this.fridgeRef.delete()

    this.$router.push('/public')
  }
}
</script>
