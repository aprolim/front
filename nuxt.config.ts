// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],
  plugins: [
    { src: '~/plugins/adaptive-image-loader.client.ts', mode: 'client' },
    { src: '~/plugins/clean-console.client.ts', mode: 'client' },
    { src: '~/plugins/sw-register.client.ts', mode: 'client' }
  ],
  
  // ============================================
  // CONFIGURACIÓN DE IMÁGENES CON IPX - CORREGIDA
  // ============================================
  image: {
    // Provider IPX
    provider: 'ipx',
    
    // Configuración de IPX (sin cache que no existe)
    ipx: {
      // Base URL para las imágenes procesadas
      baseURL: '/_ipx/'
    },
    
    // Dominios permitidos
    domains: ['demoap.senado.gob.bo', 'localhost'],
    
    // Calidad por defecto
    quality: 80,
    
    // Screens responsive
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    
    // Presets para diferentes usos
    presets: {
      avatar: {
        modifiers: {
          width: 150,
          height: 150,
          fit: 'cover'
        }
      },
      thumbnail: {
        modifiers: {
          width: 300,
          height: 200,
          fit: 'cover'
        }
      },
      profile: {
        modifiers: {
          width: 200,
          height: 200,
          fit: 'cover'
        }
      }
    }
  },
  
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
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
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  },
  
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/main.css'
  ],
  
  nitro: {
    preset: 'static',
    output: {
      publicDir: 'dist'
    },
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: false
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true
    }
  },
  
  vite: {
    server: {
      allowedHosts: [
        'demoap.senado.gob.bo',
        'localhost',
        '127.0.0.1'
      ]
    }
  }
})