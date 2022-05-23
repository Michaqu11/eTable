<template>
  <div class="dashboard page-wrapper">
    <v-container>
      <restaurants-list />
    </v-container>
  </div>
</template>

<script>
import i18nMixin from '@/mixins/i18n'
import RestaurantsList from '@/components/restaurantsList'

export default {
  components: { RestaurantsList },
  mixins: [i18nMixin],
  head() {
    return {
      title: {
        inner: 'Restaurants'
      }
    }
  },
  data() {
    return {
      i18nRootPath: 'pages.restaurant',
      search: '',
      showTextInputWithAdress: true,
      color: 'grey',
      onlyFree: false,
      typeOfFoods: [
        'American',
        'Burger',
        'Fast food',
        'Vegan',
        'Mexican',
        'Pizza',
        'Kebab',
        'Cafe',
        'Thai',
        'Asian'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Kumar+One+Outline&display=swap');
.page-wrapper {
  width: 100%;
  height: 100%;
  background-image: url('../assets/4.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 100;
}

.f-search {
  background: rgba(0, 0, 0, 0.8);
}

.f-text-shadow {
  text-shadow: 2px 0px 2px #000, -2px 0px 2px #000, 0px 2px 2px #000,
    0px -2px 2px #000, 0 0 10px #000;
}

.wrapper::after {
  content: '';
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
}
</style>
