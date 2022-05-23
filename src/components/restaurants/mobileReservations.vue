<template>
  <v-card
    class="mx-auto ma-3 project"
    :class="restaurant.status"
    max-width="374"
    outlined
    rounded
  >
    <v-img height="250" :src="restaurant.src"> </v-img>
    <v-card-text>
      <v-card-title class="ml-n3">{{ restaurant.restaurantName }}</v-card-title>

      <v-row align="center" class="mx-0">
        <v-rating
          class="mb-2"
          :value="restaurant.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="15"
        ></v-rating>

        <div class="grey--text ml-2">
          {{ restaurant.rating }}
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

      <v-divider color="black" class="mb-2"></v-divider>

      <div class="my-4 subtitle-1">
        {{ restaurant.hour }} • {{ restaurant.date }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MobileReservations',
  props: {
    restaurant: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
