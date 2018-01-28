<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12 v-for="currency in currencies" :key="currency.id">
        <v-card ripple hover>
          <v-card-text>{{currency}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
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
