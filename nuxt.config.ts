// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    server: {
      allowedHosts: [
        'demoap.senado.gob.bo',
        'localhost',
        '127.0.0.1'
      ]
    }
  },
  devtools: { enabled: false },
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],
  
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/main.css'
  ],
  
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
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' },
        { rel: 'preload', href: '/fonts/Montserrat-Regular.otf', as: 'font', type: 'font/otf', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/Montserrat-Bold.otf', as: 'font', type: 'font/otf', crossorigin: 'anonymous' }
      ]
    }
  },
  
  nitro: {
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    routeRules: {
      '/senadores/**': { 
        headers: { 
          'Cache-Control': 'public, max-age=31536000, immutable' 
        } 
      },
      '/new/**': { 
        headers: { 
          'Cache-Control': 'public, max-age=31536000, immutable' 
        } 
      }
    }
  }
})