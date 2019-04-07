import Vue from 'vue'
import VueTestUtils from '@vue/test-utils'
import '@/plugins/confirm'
import '@/plugins/header'
import '@/plugins/messages'

Vue.config.silent = true

// Mock Nuxt components
VueTestUtils.config.stubs['nuxt-link'] = '<a><slot /></a>'
VueTestUtils.config.stubs['no-ssr'] = '<span><slot /></span>'
VueTestUtils.config.stubs['font-awesome-icon'] =
  '<span>font-awesome-icon</span>'
