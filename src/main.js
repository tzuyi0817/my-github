import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/application.scss'
import { BootstrapVue } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
