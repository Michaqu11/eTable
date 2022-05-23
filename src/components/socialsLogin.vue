<template>
  <div class="wrapper">
    <v-col cols="12" jestify="center">
      <v-btn class="pa-1 mr-1" text width="200px" @click="login">
        <v-img
          max-height="32"
          max-width="32"
          class="mr-3"
          src="https://cdn.iconscout.com/icon/free/png-256/google-470-675827.png"
        ></v-img>
        Google
      </v-btn>
    </v-col>
    <v-col cols="12" align="center">
      <v-btn class="ma-1" text width="200px">
        <v-img
          max-height="40"
          max-width="40"
          class="mr-2 ml-3"
          src="https://findicons.com/files/icons/1678/handy_social_media_icons/256/facebook.png"
        ></v-img>
        Facebook
      </v-btn>
    </v-col>
    <v-col cols="12" align="center">
      <v-btn class="ma-1" text width="200px">
        <v-img
          max-height="40"
          max-width="40"
          class="mr-2"
          src="https://aux2.iconspalace.com/uploads/twitter-icon-256-1338306753.png"
        ></v-img>
        Twitter
      </v-btn>
    </v-col>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import firebase from 'firebase/app'
import { isNil } from 'lodash'
import { desktop as isDekstop } from 'is_js'

export default {
  data: () => ({
    socials: [
      {
        socialName: 'Google',
        src:
          'https://nissan.polody.pl/wp-content/uploads/2019/09/google-favicon-vector.png'
      },
      {
        socialName: 'Facebook',
        src:
          'https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo.png'
      },
      {
        socialName: 'Twitter',
        src: 'http://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c53e.png'
      }
    ]
  }),
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl = isNil(this.$route.query.redirectUrl)
            ? '/home'
            : this.$route.query.redirectUrl
          this.$router.push(redirectUrl)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('authentication', ['setUser']),
    async login() {
      this.loginError = null
      const provider = new firebase.auth.GoogleAuthProvider()
      this.setUser(undefined)

      try {
        // Firebase signin with popup is faster than redirect
        // but we can't use it on mobile because it's not well supported
        // when app is running as standalone on ios & android
        // eslint-disable-next-line no-unused-expressions
        isDekstop()
          ? await firebase.auth().signInWithPopup(provider)
          : await firebase.auth().signInWithRedirect(provider)
        this.$router.push('home')
      } catch (err) {
        this.loginError = err
        this.setUser(null)
      }
    }
  }
}
</script>
