export default {
  mode: 'universal',
  // router: {
  //   middleware: 'auth'
  // },

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
    '@nuxtjs/apollo'
  ],

  apollo: {
    tokenName: 'fmApolloRocks', // optional, default: apollo-token
    tokenExpires: 10, // optional, default: 7 (days)
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        '%cError',
        'background: renvmd; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      )
    },
    clientConfigs: {
      default: {
        httpEndpoint: 'https://secret-badlands-67018.herokuapp.com/'
      },
      local: '@/plugins/localClient.js'
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
      }
    }
  }
}
