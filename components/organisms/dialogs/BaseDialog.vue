<template>
  <transition>
    <div
      v-if="value"
      class="fixed z-50 pin overflow-auto bg-smoke-dark flex"
      :style="{
        transition: 'opacity 0.3s',
        opacity: hidden ? 0 : ''
      }"
      @click.self="input(false)"
    >
      <div
        class="fixed shadow-inner max-w-md md:relative pin-x align-top m-auto justify-end md:justify-center pt-8 pb-4 px-4 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col"
        :class="{ [pin]: true }"
        :style="{
          transition: 'transform 0.3s',
          transform: hidden ? translateY : ''
        }"
      >
        <slot />
        <span class="absolute pin-t pin-r pt-4 px-4" @click="input(false)">
          <font-awesome-icon
            icon="times"
            class="text-grey hover:text-grey-darkest"
          />
        </span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class BaseDialog extends Vue {
  @Prop()
  value: boolean

  @Prop({ type: Boolean, default: false })
  bottom: boolean

  @Emit()
  input(value: boolean) {}

  // v-ifでダイアログ表示を制御されてもアニメーションできるようにする
  hidden: boolean = true

  get pin() {
    return this.bottom ? 'pin-b' : 'pin-t'
  }

  get translateY() {
    return this.bottom ? 'translateY(100px)' : 'translateY(-100px)'
  }

  mounted() {
    if (this.value) this.show()
  }

  beforeDestroy() {
    // templateは更新されないため、直接スタイルを変更
    const el = this.$el as HTMLElement
    if (el && el.style) el.style.opacity = '0'
    // vueのアニメーションを待機してからdom片付け
    setTimeout(() => {
      if (this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el)
      }
    }, 300) // transitionの秒数と合わせる
  }

  @Watch('value')
  valueChanged(to) {
    if (to) {
      this.show()
    } else {
      this.hidden = true
    }
  }

  async show() {
    document.body.appendChild(this.$el)
    await this.$nextTick()
    this.hidden = false
  }
}
</script>

<style>
.v-leave-to {
  opacity: 0;
}
</style>
