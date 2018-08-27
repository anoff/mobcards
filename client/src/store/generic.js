import Vue from 'vue'

export default {
  state: {
    isLoading: false,
    errors: []
  },
  mutations: {
    setLoading (state, isLoading) {
      state.isLoading = isLoading
    }
  },
  actions: {
    setLoading ({commit}) {
      commit('setLoading', true)
    },
    addError ({commit}) {
      // blup?
    }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    }
  }
}
