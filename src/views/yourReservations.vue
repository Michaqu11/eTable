<template>
  <div class="reservationsWrapper py-15">
    <v-container>
      <v-row v-if="$vuetify.breakpoint.smAndDown">
        <v-col v-if="findActiveRestaurants()" cols="12" align="center">
          <h1 class="white--text">Active:</h1>
        </v-col>
        <v-col cols="12">
          <mobile-reservations
            v-for="restaurant in prepareActiveList()"
            :key="restaurant.restaurantName"
            :restaurant="restaurant"
          />
        </v-col>
        <v-col v-if="findHistoryRestaurants()" cols="12" align="center">
          <h1 class="white--text">History:</h1>
        </v-col>
        <v-col cols="12">
          <mobile-reservations
            v-for="restaurant in prepareHistoryList()"
            :key="restaurant.restaurantName"
            :restaurant="restaurant"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <!-- desktop -->
        <v-col v-if="findActiveRestaurants()" cols="12" align="center">
          <h1 class="white--text">Active:</h1>
        </v-col>
        <v-col cols="12">
          <desktop-reservation
            v-for="restaurant in prepareActiveList()"
            :key="restaurant.restaurantName"
            :restaurant="restaurant"
          />
        </v-col>
        <v-col v-if="findHistoryRestaurants()" cols="12" align="center">
          <h1 class="white--text">History:</h1>
        </v-col>
        <v-col cols="12">
          <desktop-reservation
            v-for="restaurant in prepareHistoryList()"
            :key="restaurant.restaurantName"
            :restaurant="restaurant"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import i18nMixin from '@/mixins/i18n'
import MobileReservations from '@/components/restaurants/mobileReservations'
import DesktopReservation from '@/components/restaurants/desktopReservation'
import { mapGetters } from 'vuex'

export default {
  components: { MobileReservations, DesktopReservation },
  mixins: [i18nMixin],
  head() {
    return {
      title: {
        inner: 'Reservations'
      }
    }
  },
  data: () => ({
    i18nRootPath: 'pages.yourReservations',
    active: {
      adress: null,
      date: '',
      seats: '',
      activeTable: false
    },
    projects: [
      {
        restaurantName: 'Proto Burger',
        adress: 'Gdynia ul. aleja Piłsudskiego 18',
        src:
          'https://www.carrefour.pl/images/globalproductlist/org/przepis-na-burgera-z-bekonem-i-sosem-pieczarkowo-smietanowym-re1qh0.jpg',
        rating: 4.4,
        chooseSeats: '3',
        hour: '16:30',
        date: '25.02.2021',
        status: 'history'
      },
      {
        restaurantName: 'Haus Sushi',
        adress: 'Gdańsk ul.Targ Rybny 113',
        src:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyh8Lb64XaPTAjfvNpJsiTd63uvyLgNsKwKQ&usqp=CAU',
        rating: 4.81,
        chooseSeats: '2',
        hour: '12:45',
        date: '18.02.2021',
        status: ''
      },
      {
        restaurantName: 'Bar Veneno',
        adress: 'Gdańsk ul. Rajska 8',
        src:
          'https://i.pinimg.com/originals/19/cc/84/19cc840c034f1d1d69960eb4a7aedf62.jpg',
        rating: 3.93,
        chooseSeats: '1',
        hour: '12:45',
        date: '18.02.2021',
        status: 'history'
      }
    ]
  }),
  computed: {
    ...mapGetters('reservations', ['getReservations'])
  },
  methods: {
    prepareActiveList() {
      return this.getReservations.filter(({ status }) => status === 'active')
    },
    prepareHistoryList() {
      return this.getReservations.filter(({ status }) => status === 'history')
    },
    findActiveRestaurants() {
      return JSON.stringify(this.getReservations).includes('active')
    },
    findHistoryRestaurants() {
      return JSON.stringify(this.getReservations).includes('history')
    }
  }
}
</script>
<style lang="scss" scoped>
.reservationsWrapper {
  width: 100%;
  height: 100%;
  background-image: url('../assets/4.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 100;
}
</style>
