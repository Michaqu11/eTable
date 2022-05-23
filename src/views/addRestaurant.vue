<template>
  <div class="addRestaurantwrapper">
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-card
            flat
            align="center"
            class="pt-1 pb-3"
            min-width="250"
            color="rgb(0, 0, 0, 0.0)"
            dark
          >
            <v-row class="mt-10 white--text" align="center" justify="center">
              <v-form v-model="isValid" lazy-validation>
                <v-col cols="12" class="my-0 py-0">
                  <v-col cols="12" align="center" class="my-0 py-0">
                    <p class="white--text f-text-shadow">
                      {{ t('details.contact') }}
                    </p>
                  </v-col>
                  <v-text-field
                    v-model="form.firstName"
                    :rules="[nameRules]"
                    :label="t('labels.firstName')"
                    maxlength="20"
                    required
                    class="f-search"
                    autofocus
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.lastName"
                    :rules="[nameRules]"
                    :label="t('labels.lastName')"
                    required
                    class="f-search"
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.phoneNumber"
                    :rules="[nameRules, phoneNumberRules]"
                    :label="t('labels.phone')"
                    required
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.email"
                    :rules="[emailRules]"
                    :label="t('labels.Email')"
                    required
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[passwordRules]"
                    :label="t('labels.Password')"
                    required
                    outlined
                    rounded
                    width="200px"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.confirm_password"
                    :append-icon="
                      showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="showConfirmPassword ? 'text' : 'password'"
                    :rules="[[confrmPasswordRules], passwordMatch]"
                    :label="t('labels.confirmPassword')"
                    required
                    outlined
                    rounded
                    width="200px"
                    @click:append="showConfirmPassword = !showConfirmPassword"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0">
                  <p class="white--text f-text-shadow">
                    {{ t('details.restaurant') }}
                  </p>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.restaurantName"
                    :rules="[nameRules]"
                    :label="t('labels.restaurantName')"
                    required
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.nip"
                    :rules="[nameRules]"
                    :label="t('labels.nip')"
                    required
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.streetAndNumber"
                    :rules="[nameRules]"
                    :label="t('labels.streetAndNumber')"
                    required
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.postalCode"
                    :label="t('labels.postalCode')"
                    :rules="[nameRules]"
                    required
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" align="center" class="my-0 py-0">
                  <v-text-field
                    v-model="form.City"
                    :label="t('labels.city')"
                    :rules="[nameRules]"
                    required
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0 f-search">
                  <v-text-field
                    v-model="form.country"
                    :label="t('labels.country')"
                    :rules="[nameRules]"
                    required
                    outlined
                    rounded
                    width="200px"
                  >
                  </v-text-field>
                </v-col>

                <v-btn
                  class="mb-2 white--text bakcgroundButton"
                  type="submit"
                  :disabled="!isValid"
                  autofocus
                  outlined
                  rounded
                  width="200px"
                  @click="addRestaurant"
                >
                  {{ t('buttons.addRestaurant') }}
                </v-btn>
              </v-form>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import i18nMixin from '@/mixins/i18n'
import validation from '@/mixins/validation'

export default {
  mixins: [i18nMixin, validation],
  head() {
    return {
      title: {
        inner: 'AddRestaurant'
      }
    }
  },
  data() {
    return {
      i18nRootPath: 'pages.addRestaurant',
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        restaurantName: '',
        nip: '',
        streetAndNumber: '',
        postalCode: '',
        city: '',
        country: '',
        valid: true
      },
      error: null,
      country: '',
      isValid: false,
      showPassword: false,
      showConfirmPassword: false
    }
  },
  methods: {
    addRestaurant() {
      this.$router.push('restaurants')
    }
  }
}
</script>
<style lang="scss">
.addRestaurantwrapper {
  width: 100%;
  height: 100%;
  background-image: url('../assets/6.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 100;
}
.addRestaurantwrapper .bakcgroundButton {
  background-color: #000000;
  background: rgba(0, 0, 0, 0.8);
}
.addRestaurantwrapper fieldset {
  background: rgba(0, 0, 0, 0.8);
}
</style>
