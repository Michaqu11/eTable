<template>
  <div class="restaurantDetailsPage">
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col
          v-for="restaurant in projects"
          :key="restaurant.restaurantName"
          cols="12"
          sm="8"
          md="4"
          lg="4"
          align="center"
          justify="center"
        >
          <v-card align="center" class="mt-10">
            <v-btn
              icon
              class="float-right ml-n15"
              color="primary"
              @click="closeDetail()"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-card-title class="justify-center ma-2"
              ><h2>{{ details.restaurantName }}</h2>
            </v-card-title>

            <v-card-text>
              <v-row class="justify-center mx-0">
                <v-rating
                  :value="details.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                  {{ details.rating }} {{ details.nrRatings }}
                </div>
              </v-row>

              <div class="my-4 subtitle-1">
                {{ details.adress }} • {{ details.type }}
              </div>

              <v-btn
                class="mx-4 mb-4 white--text primary"
                autofocus
                outlined
                rounded
                width="90%"
              >
                CALENDAR
              </v-btn>

              <v-divider color="black" class="mb-2"></v-divider>
              <!-- form -->
              <div>
                <datetime
                  ref="date"
                  v-model="datetime"
                  type="datetime"
                  class="dateTime"
                  color="black"
                  label="Date"
                  :value="datetime"
                  zone="local"
                  value-zone="local"
                  input-class="my-class"
                  :phrases="{ ok: 'Continue', cancel: 'Exit' }"
                  :minute-step="15"
                  :min-datetime="20"
                  :max-datetime="maxDatetime"
                  week-start="1"
                  @blur="closeDatetime"
                  @close="closeDatetime"
                ></datetime>
                <v-form v-model="isFormValid">
                  <v-col cols="12" align="center" class="pb-0">
                    <v-text-field
                      v-model="datetime"
                      label="Date"
                      persistent-hint
                      :rules="[nameRules]"
                      prepend-icon="mdi-calendar"
                      autocomplete="off"
                      outlined
                      rounded
                      @click="openDatetime($event)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" align="center" class="my-0">
                    <v-text-field
                      v-model="seats"
                      :rules="[nameRules, numberRule]"
                      prepend-icon="mdi-sofa-single-outline"
                      label="Seats"
                      placeholder="Choose seats"
                      required
                      outlined
                      autocomplete="off"
                      type="number"
                      rounded
                    ></v-text-field>
                  </v-col>

                  <v-divider color="black" class="mb-2"></v-divider>

                  <h2 class="pa-1 my-2">Choose table</h2>

                  <v-card
                    v-if="!isFormValid"
                    class="mx-auto"
                    max-width="400"
                    outlined
                    tile
                  >
                    <v-list-item>
                      <v-list-item-subtitle
                        >First select the date and number of
                        seats</v-list-item-subtitle
                      >
                    </v-list-item>
                  </v-card>
                  <v-card
                    v-else
                    class="mx-auto styleForScroll"
                    max-width="400"
                    tile
                  >
                    <v-list-item
                      v-for="(table, index) in tables"
                      :id="choosenTable == index ? 'chossedListItem' : ''"
                      :key="table.tableName"
                      @click="choosenTable = index"
                    >
                      <v-list-item-content style="cursor:pointer;">
                        <v-list-item-title>{{
                          table.tableName
                        }}</v-list-item-title>
                        <v-list-item-subtitle
                          >{{ seats }} seats | {{ time }} {{ date }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-card>
                  <v-col cols="12" align="center">
                    <v-btn
                      class="ma-4 white--text primary"
                      :disabled="
                        !isFormValid || choosenTable == -1 || !date || !time
                      "
                      autofocus
                      outlined
                      rounded
                      width="90%"
                      @click="submit()"
                    >
                      Confirm
                    </v-btn>
                  </v-col>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import i18nMixin from '@/mixins/i18n'
import validation from '@/mixins/validation'
import { mapMutations } from 'vuex'

export default {
  mixins: [i18nMixin, validation],
  props: {
    details: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    isFormValid: false,
    choosenTable: -1,
    i18nRootPath: 'pages.restaurantDetails',
    seats: '',
    datetime: 'Select Date',
    menu: false,
    maxDatetime: new Date().toISOString() + 7,
    projects: [
      {
        restaurantName: 'Cafe Badilico',
        adress: 'Gdańsk ul. przykładowa 1',
        type: 'Italy',
        src:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkWQFIZxLxA8PmKV7gBjbJhnQQ_50Qgn3YiA&usqp=CAU',
        rating: 4.75
      }
    ],
    tables: [
      {
        tableName: 'Table nr. 1'
      },
      {
        tableName: 'Table nr. 2'
      },
      {
        tableName: 'Table nr. 5'
      },
      {
        tableName: 'Table nr. 9'
      },
      {
        tableName: 'Table nr. 11'
      },
      {
        tableName: 'Table nr. 13'
      }
    ],
    date: '',
    time: ''
  }),
  watch: {
    datetime() {
      this.formatDatetime()
    }
  },
  methods: {
    ...mapMutations('reservations', ['pushReservation']),
    closeDetail() {
      this.$emit('clicked', false)
    },
    openDatetime(e) {
      e.preventDefault()
      this.$refs.date[0].$el.style.display = 'block'
      this.$refs.date[0].$el.querySelector('.vdatetime-input').click()
    },
    closeDatetime() {
      this.$refs.date[0].$el.style.display = 'none'
      this.formatDatetime()
    },
    formatDatetime() {
      const { datetime } = this
      this.date = datetime.substr(0, 10)
      this.time = datetime.substr(11, 8)
      this.datetime = this.date.concat(' ', this.time.substr(0, 5))
    },
    submit() {
      this.details.status = 'active'
      Object.assign(this.details, {
        date: this.date,
        hour: this.time,
        chooseSeats: this.seats
      })
      this.pushReservation(this.details)
      this.$router.push({ path: '/yourreservations' })
    }
  }
}
</script>
<style lang="scss">
.restaurantDetailsPage {
  width: 100%;
  height: 100%;
}
.restaurantDetailsPage .styleForScroll {
  max-height: 248px;
  overflow: auto;
}
.restaurantDetailsPage #chossedListItem {
  border-radius: 10px;
  border: 2px solid #895f5f;
  background-color: rgba(187, 181, 181, 0.5);
}

.restaurantDetailsPage .dateTime {
  color: black;
  display: block;
}
.dateTime .vdatetime-popup__header,
.dateTime .vdatetime-calendar__month__day--selected > span > span,
.dateTime .vdatetime-calendar__month__day--selected:hover > span > span {
  background: #895f5f;
}
.restaurantDetailsPage .vdatetime-popup {
  width: 400px;
}

.dateTime .vdatetime-year-picker__item--selected,
.dateTime .vdatetime-time-picker__item--selected,
.dateTime .vdatetime-popup__actions__button {
  color: #895f5f;
}
</style>
