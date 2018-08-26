// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import VueSocketIO from 'vue-socket.io'
import VueSwing from 'vue-swing'
import colors from 'vuetify/es5/util/colors'
const socketLocation = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin

Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.darken3,
    secondary: colors.grey.lighten1,
    accent: colors.orange.darken3,
    error: colors.red.darken4,
    warning: colors.orange.accent3,
    info: colors.lightBlue.base,
    success: colors.green.accent4
  }
})
Vue.use(VueSocketIO, socketLocation)
Vue.component('vue-swing', VueSwing)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
