<template>
  <v-card
    class="mx-auto ma-3 project"
    :class="restaurant.status"
    outlined
    rounded
  >
    <v-row class="align-center">
      <v-col cols="4" class="ma-5">
        <v-img width="250px" height="200px" :src="restaurant.src">
          <v-row
            v-if="restaurant.status === STATUS.BUSY"
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <h1 class="red--text text--darken-3">No places</h1>
          </v-row>
        </v-img>
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
            </div>
          </v-row>

          <div class="my-4 subtitle-1">
            {{ restaurant.adress }} • {{ restaurant.type }}
          </div>

          <v-divider color="black" class="mx-2"></v-divider>

          <div>{{ restaurant.description }}</div>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { STATUS } from '@/utils/macros/restaurantStatuses'

export default {
  name: 'DesktopList',
  props: {
    restaurant: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    STATUS
  })
}
</script>

<style lang="scss" scoped>
.busy::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: #383838;
  position: absolute;
  opacity: 0.7;
  z-index: 1;
  top: 0;
}
</style>
