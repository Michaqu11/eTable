<template>
  <div class="Homepage">
    <v-container fill-height>
      <v-row class="mt-10" align="center" justify="center">
        <v-col cols="12" align="center">
          <h1 class="white--text f-text-shadow">{{ t('title') }}</h1>
        </v-col>
        <v-col cols="12" align="center">
          <p class="white--text f-text-shadow">{{ t('subtitle') }}</p>
        </v-col>
        <v-col cols="12" sm="10" md="4" lg="3" justify="center">
          <v-autocomplete
            v-model="search"
            class="f-search"
            :loading="loading"
            :items="Cities"
            :search-input.sync="searchCity"
            autofocus
            placeholder="Address"
            color="white"
            item-color="red"
            filled
            chips
            outlined
            cache-items
            hide-no-data
            rounded
            hide-details
            :append-icon="search ? 'mdi-magnify' : ''"
            dark
            :menu-props="{ value: autoselectMenu }"
            @keydown="changeDisplayElements"
            @keydown.enter="submit"
            @click:append="submit"
          >
            <template v-slot:selection="data" class="red">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
              >
                {{ data.item }}
              </v-chip>
            </template>
            <template v-slot:item="data" class="red">
              <template v-if="data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import i18nMixin from '@/mixins/i18n'

export default {
  mixins: [i18nMixin],
  data: () => ({
    i18nRootPath: 'pages.home',
    search: '',
    field1: '',
    loading: false,
    autoselectMenu: false,
    items: [],
    select: null,
    searchCity: null,
    Cities: ['Gdańsk', 'Sopot', 'Gdynia']
  }),
  watch: {
    searchCity(val) {
      if (this.search !== '') {
        this.autoselectMenu = false
      }
      return val && val !== this.select && this.querySelections(val)
    }
  },
  head() {
    return {
      title: {
        inner: 'Home'
      },
      searchValue: '',
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.Cities.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
    changeDisplayElements() {
      if (!this.autoselectMenu)
        setTimeout(() => {
          this.autoselectMenu = true
        }, 500)
    },
    async submit() {
      if (this.search !== '')
        this.$router.push({
          path: '/restaurants',
          query: { lokalizacja: this.search }
        })
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kumar+One+Outline&display=swap');
.Homepage {
  width: 100%;
  height: 100%;
  background-image: url('../assets/4.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 100;
}

.Homepage .f-search {
  background: rgba(0, 0, 0, 0.8);
}

.Homepage .f-text-shadow {
  text-shadow: 2px 0px 2px #000, -2px 0px 2px #000, 0px 2px 2px #000,
    0px -2px 2px #000, 0 0 10px #000;
}

.Homepage .theme--light.v-application {
  background-color: #e0dfe0 !important;
}

.v-menu__content .theme--light.v-list {
  background: #5a5757 !important;
  opacity: 0.6 !important;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  max-height: 160px;
}
.v-menu__content .v-list-item__content {
  color: white !important;
}
.v-menu__content .theme--light.v-list-item:hover:before {
  opacity: 0.14 !important;
}
</style>
