export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,
  modules: [
    'nuxt-icon', 
    '@nuxtjs/tailwindcss',
    '@element-plus/nuxt',
  ],
  elementPlus: { /** Options */ },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    }
  }
})
