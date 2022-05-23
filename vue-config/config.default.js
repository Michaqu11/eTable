const path = require('path')

module.exports = {
  /* See https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa for more details */
  pwa: {
    themeColor: '#FFFFFF',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.join('public', 'service-worker.js')
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'en',
      localeDir: 'assets/locales',
      enableInSFC: true
    }
  }
}
