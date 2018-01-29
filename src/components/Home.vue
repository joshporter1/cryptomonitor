<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <CryptoRow v-for="currency in currencies" :key="currency.id" :currency="currency">
      </CryptoRow>
    </v-layout>
  </v-container>
</template>

<script>
import CryptoRow from '@/components/ui/CryptoRow'

export default {
  name: 'Home',
  components: { CryptoRow },
  computed: {
    currencies () {
      return this.$store.state.prices
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
