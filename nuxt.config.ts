export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt'],
  css: ['@/assets/scss/main.css'],
  vite: {
    server: {
      watch: {
        // Exclude specific files or directories from being watched
        ignored: ['**/server/users.json']
      },
    },
  },

})
