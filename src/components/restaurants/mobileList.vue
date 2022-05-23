<template>
  <v-card
    class="mx-auto ma-3 project"
    :class="restaurant.status"
    max-width="374"
    outlined
    rounded
  >
    <div v-if="restaurant.status === STATUS.BUSY" class="busy-label">
      No places
    </div>
    <v-img height="250" :src="restaurant.src"> </v-img>

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

      <v-divider color="black" class="mb-2"></v-divider>

      <div>{{ restaurant.description }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import { STATUS } from '@/utils/macros/restaurantStatuses'

export default {
  name: 'MobileList',
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
.busy-label {
  background: red;
  z-index: 2;
  color: #fff;
  text-align: center;
  position: absolute;
  height: 24px;
  width: 100%;
  border-radius: 4px 4px 0px 0px !important;
}
</style>
