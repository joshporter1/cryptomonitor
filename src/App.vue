<template>
  <div>
    <v-app :dark="darkTheme">
      <v-navigation-drawer app fixed v-model="drawer">
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                Menu
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense class="pt-0">
          <v-list-tile @click="toggleDarkTheme">
            <v-list-tile-action>
              <v-switch v-model="darkTheme"></v-switch>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Toggle Dark Theme</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app>
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>cryptomonitor</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>

      </v-toolbar>
      <v-content>
        <v-container fluid pa-1>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  created () {
    this.getPrices()
  },
  computed: {
    darkTheme () {
      return this.$store.state.darkTheme
    }
  },
  methods: {
    getPrices () {
      let _this = this
      this.$store.dispatch('getPrices', 0)
      setTimeout(function () {
        _this.$store.dispatch('getPrices', 10)
      }, 5000)
      setTimeout(function () {
        _this.$store.dispatch('getPrices', 20)
      }, 5000)
    },
    toggleDarkTheme () {
      this.$store.commit('toggleDarkTheme')
    }
  }
}
</script>

<style>
</style>
