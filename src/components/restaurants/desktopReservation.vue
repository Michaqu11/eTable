<template>
  <v-card class="mx-auto ma-3" :class="restaurant.status" outlined rounded>
    <v-row class="align-center">
      <v-col cols="4" class="ma-5">
        <v-img width="250px" height="200px" :src="restaurant.src"></v-img>
      </v-col>
      <v-col cols="4">
        <v-card-title>{{ restaurant.restaurantName }}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="restaurant.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ml-4">
              {{ restaurant.rating }} {{ restaurant.nrRatings }}
              <v-btn
                v-if="restaurant.status == 'history'"
                text
                outlined
                rounded
                color="primary"
                class="ml-2"
                small
              >
                Rate
              </v-btn>
            </div>
          </v-row>

          <div class="my-4 subtitle-1">
            {{ restaurant.adress }} • seats: {{ restaurant.chooseSeats }}
          </div>

          <div class="my-4 subtitle-1">
            {{ restaurant.hour }} • {{ restaurant.date }}
          </div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'DesktopReservation',
  props: {
    restaurant: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
