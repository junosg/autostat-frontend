export default defineNuxtConfig({
  modules: [
    'nuxt-icon', 
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
    '@nuxtjs/google-adsense',
    '@nuxtjs/device',
  ],
  elementPlus: { /** Options */ },
  appConfig: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY
  },
  routeRules: {
    '/': { redirect: '/about' },
  },
  'google-adsense': {
    id: 'ca-pub-2501368710409941',
    test: false
  },
  app: {
    head: {
      meta: [
        {name: "statistics", content: "Statistics"},
        {name: "automatic", content: "Automatic"},
        {name: "analysis", content: "Analysis"},
        {name: "spss", content: "SPSS"},
        {name: "sas", content: "SAS"},
        {name: "mean", content: "Mean"},
        {name: "median", content: "Median"},
        {name: "mode", content: "Mode"},
        {name: "anova", content: "Anova"},
        {name: "central tendency", content: "Measures of central tendency"},
        {name: "p value", content: "P Value"},
        {name: "t-test", content: "T Test"},
        {name: "comparison test", content: "Test for comparisons of mean"},
      ]
    }
  }
})
