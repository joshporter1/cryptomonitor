<template>
  <v-flex xs12>
    <v-card ripple hover>
      <Sparkline style="height: 100px;" :data="chartData" :options="chartOptions" />
      <v-card-title>{{currency.name}}</v-card-title>
      <v-card-text>{{currency}}</v-card-text>
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
    chartOptions () {
      // return {
      //   scaleLineColor: 'rgba(0,0,0,0)',
      //   scaleShowLabels: false,
      //   scaleShowGridLines: false,
      //   pointDot: false,
      //   datasetFill: false,
      //   // Sadly if you set scaleFontSize to 0, chartjs crashes
      //   // Instead we'll set it as small as possible and make it transparent
      //   scaleFontSize: 1,
      //   scaleFontColor: 'rgba(0,0,0,0)',
      // }
      return {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        },
        elements: {
          point: {
            radius: 0
          }
        }
      }
    },
    chartData () {
      var vals = this.cryptoHistory.map(function (row) { return row.close })
      var labels = this.cryptoHistory.map(function (row) { return row.time })
      return {
        labels: labels,
        datasets: [
          {
            label: 'GitHub Commits',
            backgroundColor: '#f87979',
            data: vals
          }
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
