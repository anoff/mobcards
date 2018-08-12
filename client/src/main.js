// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VueSocketIO from 'vue-socket.io'
import VueSwing from 'vue-swing'

const socketLocation = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin

Vue.use(Vuetify)
Vue.use(VueSocketIO, socketLocation)
Vue.component('vue-swing', VueSwing)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
