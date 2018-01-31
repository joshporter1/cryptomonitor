<template>
  <v-flex xs12>
    <v-card ripple hover>
      <Sparkline style="height: 100px; opacity: 0.75;" :data="chartData" />
      <v-container fill-height fluid style="position: absolute; top:0; right: 0; left:0;">
        <v-layout fill-height>
          <v-flex xs6 align-end flexbox>
            <span class="headline" :title="currency.rank">{{currency.name}}</span>
            <span class="subheading">{{currency.symbol}}</span>
          </v-flex>
          <v-flex xs6 align-end flexbox class="text-xs-right">
            <p>
              <span class="headline">${{currency.price_usd}}</span><br>
              <span class="body-2">
                {{currency.price_btc}} <small>BTC</small><br>
              </span>
              <span class="body-2">
                {{currency.percent_change_24h}}% <small>24h</small><br>
              </span>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import Sparkline from '@/components/ui/Sparkline'

export default {
  name: 'CryptoRow',
  components: { Sparkline },
  props: ['currency', 'history'],
  computed: {
    cryptoHistory () {
      return this.$store.state.histoHour[this.currency.symbol]
    },
    seriesColor () {
      if (this.currency.percent_change_24h < 0) {
        return '#ffb5b5'
      } else {
        return '#ccffd2'
      }
    },
    chartData () {
      var vals = []
      var labels = []
      if (this.cryptoHistory) {
        vals = this.cryptoHistory.map(function (row) { return row.close })
        labels = this.cryptoHistory.map(function (row) { return row.time })
        return {
          labels: labels,
          datasets: [
            {
              backgroundColor: this.seriesColor,
              data: vals
            }
          ]
        }
      } else {
        return false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
