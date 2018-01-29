<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'Sparkline',
  extends: Line,
  props: ['data'],
  data () {
    return {
      options: {
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
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  },
  watch: {
    data (newData, oldData) {
      if (oldData === false) {
        this.renderChart(this.data, this.options)
      }
    }
  }
}
</script>
