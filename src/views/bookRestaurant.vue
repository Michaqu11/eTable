<template>
  <div class="dashboard">
    <v-container class="my-10">
      <v-col v-if="$vuetify.breakpoint.smAndDown" cols="12">
        <v-card class="mx-auto ma-3" max-width="374" outlined rounded>
          <v-card-title>{{ project.restaurantName }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-img width="250px" height="200px" :src="project.src"></v-img>
              <div class="my-4 subtitle-1">• {{ project.adress }}</div>
              <div class="my-4 subtitle-1">• {{ project.reating }}</div>
              <div class="my-4 subtitle-1">
                {{ project.description }}
              </div>
            </v-row>
          </v-card-text>
          <v-divider color="black" class="mb-2"></v-divider>
        </v-card>
      </v-col>
      <!-- desktop -->
      <v-col v-else cols="12">
        <v-card
          v-for="project in projects"
          :key="project.adress"
          :class="`mx-auto ma-3 project ${project.status}`"
          outlined
          rounded
        >
          <v-row class="align-center">
            <v-col cols="4" class="ma-5">
              <v-img width="250px" height="200px" :src="project.src">
                <v-row
                  v-if="project.status == 'busy'"
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <h1 class="grey--text text--darken-2">No places</h1>
                </v-row>
              </v-img>
            </v-col>
            <v-col cols="4">
              <v-card-title>{{ project.restaurantName }}</v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="project.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <div class="grey--text ml-4">
                    {{ project.rating }} {{ project.nrRatings }}
                  </div>
                </v-row>

                <div class="my-4 subtitle-1">
                  {{ project.adress }} • {{ project.type }}
                </div>

                <v-divider color="black" class="mx-2"></v-divider>

                <div>{{ project.description }}</div>
              </v-card-text>
              <v-fade-transition>
                <v-overlay
                  v-if="project.status == 'busy'"
                  absolute
                  color="#696969"
                >
                </v-overlay>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import i18nMixin from '@/mixins/i18n'

export default {
  mixins: [i18nMixin],
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
      ],
      projects: [
        {
          restaurantName: 'Cafe Badilico',
          type: 'Italian, Cafe',
          adress: 'Gdańsk ul. przykładowa 1',
          seats: '1-8',
          src:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkWQFIZxLxA8PmKV7gBjbJhnQQ_50Qgn3YiA&usqp=CAU',
          rating: 4.75,
          nrRatings: '(666)',
          description:
            'Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.',
          status: 'free'
        }
      ]
    }
  }
}</script
>f
