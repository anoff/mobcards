import Vue from 'vue'
import Vuex from 'vuex'
import lobbies from './lobbies'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    lobbies
  },
  strict: debug
})
