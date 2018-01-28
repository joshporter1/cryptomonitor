import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CMC_URL = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'
const CC_HISTOHOUR_URL = 'https://min-api.cryptocompare.com/data/histohour?tsym=USD&limit=60&aggregate=3&e=CCCAGG&fsym='

export default new Vuex.Store({
  state: {
    darkTheme: false,
    prices: [],
    histoHour: {}
  },
  mutations: {
    toggleDarkTheme (state) {
      state.darkTheme = !state.darkTheme
    },
    updatePrices (state, prices) {
      state.prices = prices
    },
    setHistoHour (state, data) {
      state.histoHour[data.sym] = data.history
    }
  },
  actions: {
    getPrices (context) {
      Vue.http.get(CMC_URL).then((response) => {
        context.commit('updatePrices', response.body)
        for (var currency of context.state.prices) {
          context.dispatch('getHistory', currency.symbol)
        }
      })
    },
    getHistory (context, symbol) {
      Vue.http.get(CC_HISTOHOUR_URL + symbol).then((response) => {
        var data = {history: response.body.Data, sym: symbol}
        context.commit('setHistoHour', data)
      })
    }
  }
})
