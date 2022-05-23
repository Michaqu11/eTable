<template>
  <div class="registerPage">
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-card
            flat
            align="center"
            class="editBorderCard"
            color="rgba(0, 0, 0, 0.0)"
            dark
          >
            <v-row align="center" justify="center">
              <v-col cols="12" align="center">
                <h2>{{ t('socialsLoginInfo') }}</h2>
              </v-col>

              <socials-login />

              <v-col cols="12" align="center">
                <v-divider color="white"></v-divider>
              </v-col>

              <v-form v-model="isValid" lazy-validation>
                <v-col cols="12" align="center" class="mt-5 mb-0 py-0 f-search">
                  <v-text-field
                    v-model="form.name"
                    :label="t('labels.name')"
                    :rules="[nameRules]"
                    maxlength="100"
                    required
                    outlined
                    rounded
                  ></v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0 f-search">
                  <v-text-field
                    v-model="form.email"
                    :rules="[emailRules]"
                    :label="t('labels.Email')"
                    required
                    outlined
                    rounded
                  ></v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0 f-search">
                  <v-text-field
                    v-model="form.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    :rules="[passwordRules]"
                    :label="t('labels.Password')"
                    required
                    outlined
                    rounded
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" align="center" class="my-0 py-0 f-search">
                  <v-text-field
                    v-model="form.confirm_password"
                    :append-icon="
                      showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'
                    "
                    :type="showConfirmPassword ? 'text' : 'password'"
                    :rules="[confrmPasswordRules, passwordMatch]"
                    :label="t('labels.confirmPassword')"
                    required
                    outlined
                    rounded
                    @click:append="showConfirmPassword = !showConfirmPassword"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" align="center" lass="my-0 py-0">
                  <v-btn
                    class="ma-4 white--text bakcgroundButton"
                    type="submit"
                    :disabled="!isFormValid"
                    outlined
                    rounded
                    width="200px"
                    @click="signInByEmail()"
                  >
                    {{ t('buttons.signUp') }}
                  </v-btn>
                </v-col>
              </v-form>
              <v-col cols="12" align="center" class="my-0 py-0">
                <p class="body-2">
                  {{ t('signInInfo') }}
                </p>
              </v-col>

              <v-col cols="12" align="center" class="my-0 py-0">
                {{ t('signUpInfo') }}
                <v-btn
                  color="primary"
                  outlined
                  rounded
                  width="100px"
                  @click="goToLogin"
                >
                  {{ t('buttons.signIn') }}
                </v-btn>
              </v-col>

              <v-footer padless elevation danse color="rgba(0, 0, 0, 0.0)" dark>
                <v-col class="text-center" cols="12">
                  {{ t('footer') }}
                </v-col>
              </v-footer>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import firebase from 'firebase'
import 'firebase/auth'
import i18nMixin from '@/mixins/i18n'
import validation from '@/mixins/validation'
import socialsLogin from '@/components/socialsLogin'
import { mapState } from 'vuex'

export default {
  components: {
    socialsLogin
  },
  mixins: [i18nMixin, validation],
  head() {
    return {
      title: {
        inner: 'Register'
      }
    }
  },
  data() {
    return {
      i18nRootPath: 'pages.register',
      form: {
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      isValid: false,
      showPassword: false,
      showConfirmPassword: false,
      error: null
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },
  methods: {
    async signInByEmail() {
      if (this.isFormValid) {
        try {
          await firebase
            .auth()
            .createUserWithEmailAndPassword(this.form.email, this.form.password)
            .then(data => {
              data.user
                .updateProfile({
                  displayName: this.form.first_name
                })
                .then(() => {
                  this.$router.push('/home')
                })
            })
        } catch (err) {
          this.error = err.message
        }
      }
    },
    goToLogin() {
      this.$router.push('login')
    }
  }
}
</script>
<style lang="scss">
.registerPage .bakcgroundButton {
  background-color: #895f5f;
}
.registerPage {
  width: 100%;
  height: 100%;
  background-image: url('../assets/4.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 100;
}
.registerPage fieldset {
  background: rgba(0, 0, 0, 0.8);
}
@media (min-width: 992px) {
  .registerPage .editBorderCard {
    border-radius: 15px;
    border: white solid 1px !important;
    padding: 50px;
  }
}
</style>
