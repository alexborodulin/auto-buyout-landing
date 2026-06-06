import { vMaska } from 'maska/vue'

const maskaSsrStub = {
  getSSRProps() {
    return {}
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('maska', import.meta.client ? vMaska : maskaSsrStub)
})
