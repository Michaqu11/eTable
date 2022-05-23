export default {
  name: 'validation',
  methods: {
    emailRules(v) {
      if (!v.length) {
        return this.$t('pages.rules.required')
      }
      if (
        !v.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        return this.$t('pages.rules.validEmail')
      }
      return true
    },
    phoneNumberRules(v) {
      if (!v.match(/^\d{9}$/)) {
        return this.$t('pages.rules.validPhoneNumber')
      }
      return true
    },
    passwordRules(v) {
      if (!v.length) {
        return this.$t('pages.rules.required')
      }
      if (v.length < 8) {
        return this.$t('pages.rules.shortPassword')
      }
      if (!v.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)) {
        return this.$t('pages.rules.validPassword')
      }
      return true
    },
    nameRules(v) {
      if (!v.length) {
        return this.$t('pages.rules.required')
      }
      return true
    },
    confrmPasswordRules(v) {
      if (!v.length) {
        return this.$t('pages.rules.required')
      }
      if (v.length < 8) {
        return this.$t('pages.rules.passwordMatch')
      }
      return true
    },
    numberRule(v) {
      if (!v.trim()) return true
      if (v >= 1 && v <= 12) return true
      return 'Number of seats in this restaurant has to be between 1 and 12'
    },
    nipRules(v) {
      if (!v.match(/^[0-9]{10}$/)) {
        return this.$t('pages.rules.validNip')
      }
      return true
    }
  },
  computed: {
    async passwordMatch() {
      return () =>
        this.form.password === this.form.confirm_password ||
        'Password must match'
    }
  }
}
