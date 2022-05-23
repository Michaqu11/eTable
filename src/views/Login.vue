<template>
  <div class="loginPage">
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-card
            class="editBorderCard"
            flat
            align="center"
            dark
            color="rgb(0, 0, 0, 0.0)"
          >
            <v-row align="center" justify="center">
              <!-- Loader -->
              <div v-show="user === undefined && user" data-test="loader">
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </div>

              <!-- Offline instruction -->
              <div v-show="!networkOnLine" data-test="offline-instruction">
                {{ $t('notifications.offline') }}
              </div>

              <!-- Auth UI -->
              <div v-show="user !== undefined && !user && networkOnLine">
                <v-col cols="12" align="center">
                  <h1>{{ t('socialsLoginInfo') }}</h1>
                </v-col>

                <socials-login />

                <p v-if="loginError">{{ loginError }}</p>

                <v-col cols="12" align="center">
                  <v-divider color="white"></v-divider>
                </v-col>

                <div v-if="!resetPassword">
                  <v-form>
                    <v-col cols="12" align="center" class="mt-5 mb-0 py-0">
                      <v-text-field
                        v-model="email"
                        class="f-search"
                        :rules="[emailRules]"
                        :label="t('labels.Email')"
                        required
                        outlined
                        rounded
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" align="center" class="my-0 py-0">
                      <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        :rules="[passwordRules]"
                        :label="t('labels.Password')"
                        required
                        outlined
                        rounded
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" align="center" class="my-0 py-0">
                      <v-btn
                        class="caption"
                        text
                        width="200px"
                        @click="resetPasswordFunction()"
                      >
                        {{ t('forgetPassword') }}
                      </v-btn>
                    </v-col>

                    <v-col cols="12" align="center">
                      <v-btn
                        class="ma-4 white--text backgroundButton"
                        :disabled="!password || !email"
                        autofocus
                        outlined
                        rounded
                        width="200px"
                        type="submit"
                        @click="signInByemail()"
                      >
                        {{ t('buttons.logIn') }}
                      </v-btn>
                    </v-col>
                  </v-form>

                  <p class="body-2">
                    {{ t('signInInfo') }}
                  </p>
                </div>

                <div v-if="resetPassword" id="restartpassword">
                  <v-form v-model="isFormValid">
                    <v-col cols="12" class="my-0 py-0 f-search" align="center">
                      <v-text-field
                        v-model="email"
                        :rules="[emailRules]"
                        :label="t('labels.Email')"
                        required
                        autofocus
                        outlined
                        rounded
                        width="200px"
                      >
                      </v-text-field>
                    </v-col>

                    <v-col cols="12" align="center" class="my-0 py-0 f-search">
                      <v-btn
                        class="ma-4 backgroundButton"
                        :disabled="!isFormValid"
                        autofocus
                        color="white"
                        outlined
                        rounded
                        width="100px"
                        type="submit"
                        @click="sendEmailToResetPassword"
                      >
                        {{ t('buttons.sendRestartPassword') }}
                      </v-btn>

                      <v-btn
                        class="ma-4 backgroundButton"
                        autofocus
                        outlined
                        color="white"
                        rounded
                        width="100px"
                        @click="resetPassword = !resetPassword"
                      >
                        {{ t('buttons.backFromRestartPassword') }}
                      </v-btn>
                    </v-col>
                  </v-form>
                </div>
                <div id="register">
                  {{ t('signUpInfo') }}
                  <v-btn
                    color="primary"
                    autofocus
                    outlined
                    rounded
                    width="100px"
                    @click="goToRegister()"
                  >
                    {{ t('buttons.signUp') }}
                  </v-btn>
                </div>
              </div>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-footer padless elevation danse color="rgba(0, 0, 0, 0.0)" dark>
      <v-col class="text-center" cols="12">
        {{ t('footer') }}
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import i18nMixin from '@/mixins/i18n'
import firebase from 'firebase/app'
import validation from '@/mixins/validation'
import socialsLogin from '@/components/socialsLogin'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    socialsLogin
  },
  mixins: [i18nMixin, validation],
  data: () => ({
    loginError: null,
    i18nRootPath: 'pages.login',
    email: '',
    password: '',
    show1: false,
    resetPassword: false,
    isFormvalid: false
  }),
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },
  head() {
    return {
      title: {
        inner: 'Login'
      },
      meta: [
        {
          name: 'description',
          content: `Sign in or sign up to ${this.appTitle}`,
          id: 'desc'
        }
      ]
    }
  },
  methods: {
    ...mapMutations('authentication', ['setUser']),
    async signInByemail() {
      try {
        this.setUser(undefined)
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
        this.$router.push('home')
      } catch (err) {
        this.loginError = err
        this.setUser(null)
      }
    },
    async logoutFunction() {
      await firebase.auth().signOut()
      this.setUser(null)
    },
    goToRegister() {
      this.$router.push('register')
    },
    async resetPasswordFunction() {
      this.resetPassword = true
    },
    sendEmailToResetPassword() {}
  }
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';

.loginPage {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .login-page-title {
    text-align: center;
  }

  .login-btn {
    margin-top: 20px;
    cursor: pointer;
    padding: 5px 20px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    border-color: #2c3e50;

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
.backgroundButton {
  background-color: #895f5f;
}
.loginPage {
  width: 100%;
  height: 100%;
  background-image: url('../assets/4.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 100;
}
.loginPage fieldset {
  background: rgba(0, 0, 0, 0.8);
}
@media (min-width: 992px) {
  .loginPage .editBorderCard {
    border-radius: 15px;
    border: white solid 1px !important;
    padding: 50px;
  }
}
</style>
