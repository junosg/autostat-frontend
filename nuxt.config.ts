export default defineNuxtConfig({
  modules: [
    'nuxt-icon', 
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@nuxtjs/google-adsense'
  ],
  elementPlus: { /** Options */ },
  appConfig: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY
  },
  routeRules: {
    '/': { redirect: '/comparison' },
  },
  'google-adsense': {
    id: 'ca-pub-2501368710409941',
    test: false
  }
})
