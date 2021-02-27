import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstItem: JSON.parse(localStorage.getItem('firstItem')) ?? 0,
    secondItem: JSON.parse(localStorage.getItem('secondItem')) ?? 'Формат_А4'
  },
  mutations: {
    setItem (state, item) {
      state.firstItem = item
      localStorage.setItem('firstItem', JSON.stringify(state.firstItem))
    },
    setItem2 (state, item) {
      state.secondItem = item
      localStorage.setItem('secondItem', JSON.stringify(state.secondItem))
    }
  },
  actions: {
    setItem ({ commit }, item) {
      commit('setItem', item)
    },
    setItem2 ({ commit }, item) {
      commit('setItem2', item)
    }
  },
  modules: {
  }
})
