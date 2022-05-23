<template>
  <div class="dashboard">
    <v-container class="my-10">
      <v-row v-if="!showDetails">
        <v-app-bar class="mt-14 app-bar" dense app>
          <v-btn icon>
            <v-icon>mdi-star</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-map-marker</v-icon>
          </v-btn>
          <v-col cols="4">
            <v-select
              :items="typeOfFoods"
              menu-props="auto"
              hide-details
              prepend-icon="mdi-hamburger"
              single-line
            ></v-select>
          </v-col>

          <v-spacer></v-spacer>

          <v-btn
            icon
            @click="showTextInputWithAdress = !showTextInputWithAdress"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-text-field
            v-if="showTextInputWithAdress"
            v-model="search"
            hide-details
            :append-icon="search ? 'mdi-crosshairs-gps' : ''"
            single-line
            placeholder="Address"
          ></v-text-field>

          <v-btn icon>
            <v-icon>mdi-tune</v-icon>
          </v-btn>
        </v-app-bar>

        <v-col v-if="$vuetify.breakpoint.smAndDown" cols="12">
          <mobile-list
            v-for="restaurant in prepareList()"
            :key="restaurant.restaurantName"
            style="cursor:pointer;"
            :restaurant="restaurant"
            @click.native="openDetails(restaurant)"
          />
        </v-col>
        <v-col v-else cols="12">
          <desktop-list
            v-for="restaurant in prepareList()"
            :key="restaurant.restaurantName"
            style="cursor:pointer;"
            :restaurant="restaurant"
            @click.native="openDetails(restaurant)"
          />
        </v-col>
      </v-row>
      <v-row v-else>
        <restaurant-details :details="details" @clicked="onClickChild()" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import i18nMixin from '@/mixins/i18n'
import MobileList from '@/components/restaurants/mobileList'
import DesktopList from '@/components/restaurants/desktopList'
import restaurantDetails from '@/components/restaurants/restaurantDetails'

export default {
  components: { DesktopList, MobileList, restaurantDetails },
  mixins: [i18nMixin],
  data() {
    return {
      i18nRootPath: 'pages.restaurant',
      search: '',
      showTextInputWithAdress: true,
      color: 'grey',
      onlyFree: false,
      showDetails: false,
      details: '',
      dupa: 'pies',
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
      ],
      projects: [
        {
          restaurantName: 'Badilico',
          type: 'Italian, Cafe',
          adress: 'Sopot ul. Bohaterów Monte Cassino 983',
          seats: '1-8',
          src:
            'https://cdn.upmenu.com/static/attributes/b4eb45f1-6c24-11ea-af2a-525400080321/d01221ac-904e-11ea-be50-525400080321/ca8f1615-0860-4554-9f4e-586d169a0e9c/wesola-cafe-delikatesy.jpg',
          rating: 4.75,
          nrRatings: '(121)',
          description:
            'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.',
          status: 'free'
        },
        {
          restaurantName: 'Pizzunia',
          type: 'Italian, Pizza',
          adress: 'Gdańsk ul. Długa 22A',
          seats: '1-3',
          src:
            'https://gfx.biznes.radiozet.pl/var/radiozetbiznes2/storage/images/news/pizza-kroluje-na-stolach.-zamawia-ja-nawet-60-proc.-polakow/917514-1-pol-PL/Pizze-kupuje-nawet-60-proc.-Polakow_article.jpg',
          rating: 4.2,
          nrRatings: '(65)',
          description:
            'Lots of Italian products, pizzas, pastas, salads, at very good prices!',
          status: 'free'
        },
        {
          restaurantName: 'Haus Sushi',
          type: 'Japan, Sushi',
          adress: 'Gdańsk ul.Targ Rybny 113',
          seats: '0',
          src:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyh8Lb64XaPTAjfvNpJsiTd63uvyLgNsKwKQ&usqp=CAU',
          rating: 4.81,
          nrRatings: '(328)',
          description:
            'Fresh seafood served in sushi and our other products is very good.',
          status: 'busy'
        },
        {
          restaurantName: 'TurKebab',
          type: 'Turkey, Kebab',
          adress: 'Gdańsk ul. Długa 4',
          seats: '1-10',
          src:
            'https://media-cdn.tripadvisor.com/media/photo-s/0d/33/f7/48/sapko-in-side.jpg',
          rating: 3.7,
          nrRatings: '(221)',
          description: 'Very good kebab! It tastes like from Turkey!',
          status: 'free'
        },
        {
          restaurantName: 'Proto Burger',
          type: 'American, Burger',
          adress: 'Gdynia ul. aleja Piłsudskiego 18',
          seats: '0',
          src:
            'https://www.carrefour.pl/images/globalproductlist/org/przepis-na-burgera-z-bekonem-i-sosem-pieczarkowo-smietanowym-re1qh0.jpg',
          rating: 4.4,
          nrRatings: '(81)',
          description:
            'Proto Burger is the burger house it is in 100% beef and original sauces. The Tejst Wave!',
          status: 'busy'
        },
        {
          restaurantName: 'Permoni',
          type: 'Italian, Pizza',
          adress: 'Sopot ul. Aleja Wojska Polskiego 3',
          seats: '1-8',
          src:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkWQFIZxLxA8PmKV7gBjbJhnQQ_50Qgn3YiA&usqp=CAU',
          rating: 3.75,
          nrRatings: '(21)',
          description: '',
          status: 'free'
        },
        {
          restaurantName: 'Pierożek',
          type: 'Polish, Dumplings',
          adress: 'Gdańsk ul. Jana Kilińskiego 4',
          seats: '1-3',
          src:
            'https://u-jedrusia.pl/wp-content/uploads/cache/images/pierogi-z-mi%C4%99sem-sma%C5%BCone/pierogi-z-mi%C4%99sem-sma%C5%BCone-1137774310.jpg',
          rating: 4.2,
          nrRatings: '(36)',
          description:
            'Meat dumplings have a thin and delicate dough filled to the brim with meat stuffing.',
          status: 'free'
        },
        {
          restaurantName: 'Bar Veneno',
          type: 'Polish, Fish, Lunch dishes',
          adress: 'Gdańsk ul. Rajska 8',
          seats: '0',
          src:
            'https://i.pinimg.com/originals/19/cc/84/19cc840c034f1d1d69960eb4a7aedf62.jpg',
          rating: 3.93,
          nrRatings: '(183)',
          description: 'Delicious food at affordable prices!',
          status: 'busy'
        },
        {
          restaurantName: 'Falafel',
          type: 'Vegetarian',
          adress: 'Gdańsk ul. przykładowa 9',
          seats: '1-10',
          src:
            'https://images.happycow.net/venues/1024/17/61/hcmp176107_682104.jpeg',
          rating: 3.7,
          nrRatings: '(23)',
          description:
            'Vegetarian Friendly, Vegan Options, Gluten Free Options',
          status: 'free'
        },
        {
          restaurantName: 'Mr.Pancake',
          type: 'Pancakes',
          adress: 'Sopot ul. Armii Krajowej 95',
          seats: '0',
          src:
            'https://www.oetker.pl/Recipe/Recipes/oetker.pl/pl-pl/dessert/image-thumb__51510__RecipeDetail/pancakes.jpg',
          rating: 4.4,
          nrRatings: '(159)',
          description:
            'A flat cake made of thin batter and cooked (as on a griddle) on both sides.',
          status: 'busy'
        }
      ]
    }
  },
  methods: {
    prepareList() {
      const city = this.$route.query.lokalizacja
      const { free, busy } = this.projects.reduce(
        (acc, curr) => {
          if (city === curr.adress.substr(0, curr.adress.indexOf(' '))) {
            acc[curr.status].push(curr)
          }
          return acc
        },
        { free: [], busy: [] }
      )
      console.log()
      return [free, busy].flat()
    },
    openDetails(event) {
      this.showDetails = true
      this.details = event
    },
    onClickChild(value) {
      this.showDetails = value
    }
  }
}
</script>
