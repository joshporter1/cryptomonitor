import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CMC_URL = 'https://api.coinmarketcap.com/v1/ticker/'

export default new Vuex.Store({
  state: {
    darkTheme: false,
    prices: [CMC_URL]
  },
  mutations: {
    toggleDarkTheme (state) {
      state.darkTheme = !state.darkTheme
    },
    updatePrices (state, prices) {
      state.prices = prices
    }
  },
  actions: {
    getPrices (context) {
      Vue.http.get(CMC_URL).then((response) => {
        console.log(response)
        context.commit('updatePrices', response.body)
      })
    }
  }
})
