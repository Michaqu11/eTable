export default {
  name: 'i18nMixin',
  data: () => ({
    i18nRootPath: ''
  }),
  methods: {
    t(path) {
      return this.i18nRootPath
        ? this.$t(`${this.i18nRootPath}.${path}`)
        : this.$t(path)
    }
  }
}
