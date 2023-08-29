export default defineNuxtConfig({
  modules: [
    'nuxt-icon', 
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@nuxtjs/google-adsense'
  ],
  elementPlus: { /** Options */ },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    }
  },
  routeRules: {
    '/': { redirect: '/comparison' },
  },
  'google-adsense': {
    id: 'ca-pub-2501368710409941',
    test: false
  }
})
