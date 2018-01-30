import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const CMC_URL = 'https://api.coinmarketcap.com/v1/ticker/'
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
      state.prices = state.prices.concat(prices)
    },
    setHistoHour (state, data) {
      Vue.set(state.histoHour, data.sym, data.history)
      // state.histoHour[data.sym] = data.history
    }
  },
  actions: {
    getPrices (context, start) {
      var limit = 10
      var url = CMC_URL + '?limit=' + limit + '&start=' + start
      console.log(url)
      Vue.http.get(url).then((response) => {
        context.commit('updatePrices', response.body)
        for (var currency of response.body) {
          context.dispatch('getHistory', currency.symbol)
        }
      })
    },
    getHistory (context, symbol) {
      Vue.http.get(CC_HISTOHOUR_URL + symbol).then((response) => {
        // retry if rate limit exceeded
        if (response.body.Type === 99) {
          setTimeout(function () {
            console.log('Retrying...', symbol)
            context.dispatch('getHistory', symbol)
          }, 1000, symbol)
        } else {
          var data = {
            history: response.body.Data,
            sym: symbol}
          context.commit('setHistoHour', data)
        }
      })
    }
  }
})
