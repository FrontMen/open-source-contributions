// comment out this conditional to run nuxt generate locally
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Frontmen Open Source Contributions',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'An overview of frontmen open source contributions'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Titillium+Web:400,700'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FFBB43' },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.css', '@/assets/css/theme.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/apollo',
    'cookie-universal-nuxt'
  ],

  apollo: {
    tokenName: 'FM_OS_APOLLO_USER_TOKEN',
    tokenExpires: 10, // optional, default: 7 (days)
    clientConfigs: {
      default: {
        httpEndpoint: process.env.API_HOST
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        config.devtool = 'cheap-module-eval-source-map'
      }
    }
  }
}
