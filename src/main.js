import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-datetime/dist/vue-datetime.css'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'
import vuetify from './plugins/vuetify'
import vueDateTime from './plugins/vueDateTime'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  vueDateTime,
  render: h => h(App)
}).$mount('#app')
