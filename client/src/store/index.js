import Vue from 'vue'
import Vuex from 'vuex'
import lobbies from './lobbies'
import generic from './generic'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    lobbies,
    generic
  },
  strict: debug
})
