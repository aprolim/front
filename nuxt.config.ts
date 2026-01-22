// nuxt.config.ts - SIN PRIMEVUE TEMPORALMENTE
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Módulos
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  
  // CSS Global - solo Tailwind por ahora
  css: [
    '~/assets/css/main.css'
  ],
  
  // Configuración de la app
  app: {
    head: {
      title: 'Senado de Bolivia',
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portal Oficial del Senado Nacional de Bolivia' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  }
})