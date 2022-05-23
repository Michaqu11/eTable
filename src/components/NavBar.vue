<template>
  <nav>
    <v-app-bar id="bar" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-img max-height="50" max-width="50" src="@/assets/logo.png"></v-img>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list id="items" flat class="mt-10">
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon color="primary">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title color="primary">
              {{ link.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- Log out -->
        <v-list-item
          v-show="user !== undefined && user"
          class="justify-center mr-7"
        >
          <v-btn class="ma-4 primary" @click="logoutFunction">
            {{ $t('pages.navbar.logout') }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import firebase from 'firebase/app'
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    drawer: false,
    links: [
      { icon: 'mdi-home', text: 'Home', route: '/' },
      { icon: 'mdi-email', text: 'Messages', route: '' },
      { icon: 'mdi-account', text: 'Log In', route: '/login' },
      { icon: 'mdi-check', text: 'Reservations', route: '/yourreservations' },
      { icon: 'mdi-plus', text: 'Add Restaurant', route: '/addrestaurant' },
      { icon: 'mdi-cog', text: 'Manage Restaurant', route: '' },
      { icon: 'mdi-account', text: 'Account', route: '' },
      { icon: 'mdi-tune-variant', text: 'Settings', route: '' }
    ]
  }),
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },
  methods: {
    ...mapMutations('authentication', ['setUser']),
    async logoutFunction() {
      await firebase.auth().signOut()
      this.setUser(null)
    }
  }
}
</script>
<style lang="scss">
#bar {
  background-color: #895f5f;
}
#items {
  color: #895f5f;
}
</style>
