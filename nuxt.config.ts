// nuxt.config.ts
export default defineNuxtConfig({
  // ============================================
  // SSR
  // ============================================
  ssr: true,
  
  // ============================================
  // Devtools
  // ============================================
  devtools: { enabled: false },
  
  // ============================================
  // Módulos
  // ============================================
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  
  // ============================================
  // Pinia
  // ============================================
  pinia: {
    storesDirs: ['./stores/**'],
  },
  
  // ============================================
  // Plugins
  // ============================================
  plugins: [
    { src: '~/plugins/adaptive-image-loader.client.ts', mode: 'client' },
    { src: '~/plugins/clean-console.client.ts', mode: 'client' },
    { src: '~/plugins/sw-register.client.ts', mode: 'client' },
    { src: '~/plugins/preload.client.js', mode: 'client' }
  ],
  
  // ============================================
  // App
  // ============================================
  app: {
    baseURL: '/',
    head: {
      title: 'Senado de Bolivia',
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portal Oficial del Senado Nacional de Bolivia' }
        // ✅ ELIMINADO: Cache-Control: no-cache
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  },
  
  // ============================================
  // CSS
  // ============================================
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/main.css',
    '~/assets/css/tailwind.css'
  ],
  
  // ============================================
  // Nitro (CORREGIDO)
  // ============================================
  nitro: {
    preset: 'node-server',
    output: {
      publicDir: 'dist'
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    // ✅ Aumentar caché en memoria
    storage: {
      'cache': {
        driver: 'memory',
        maxEntries: 1000  // ✅ Aumentado de 100 a 1000
      }
    }
  },
  
  // ============================================
  // Route Rules (CORREGIDO)
  // ============================================
  routeRules: {
    '/centro-de-noticias': { 
      ssr: true,
      swr: false,
      cache: false
    },
    '/centro-de-noticias/**': { 
      ssr: true,
      swr: false,
      cache: false
    },
    // ✅ Reglas para imágenes y videos
    '/new/**': {
      swr: true,
      cache: {
        maxAge: 60 * 60 * 24 * 7 // 7 días
      }
    },
    '/video/**': {
      swr: true,
      cache: {
        maxAge: 60 * 60 * 24 * 30 // 30 días
      }
    },
    '/images/**': {
      swr: true,
      cache: {
        maxAge: 60 * 60 * 24 * 7 // 7 días
      }
    },
    '/new/titulares/**': {
      swr: true,
      cache: {
        maxAge: 60 * 60 * 24 * 7 // 7 días
      }
    },
    '/new/suplentes/**': {
      swr: true,
      cache: {
        maxAge: 60 * 60 * 24 * 7 // 7 días
      }
    },
    '/Mandato Constitucional Senado/**': {
      swr: true,
      cache: {
        maxAge: 60 * 60 * 24 * 7 // 7 días
      }
    },
    '/Reseña Histórica del Senado/**': {
      swr: true,
      cache: {
        maxAge: 60 * 60 * 24 * 7 // 7 días
      }
    },
    '/G-Institucional/**': {
      swr: true,
      cache: {
        maxAge: 60 * 60 * 24 * 7 // 7 días
      }
    }
  },
  
  // ============================================
  // Vite
  // ============================================
  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        clientPort: 3001,
        port: 3001
      },
      allowedHosts: [
        'demoap.senado.gob.bo',
        'localhost',
        '127.0.0.1'
      ]
    },
    css: {
      devSourcemap: true
    },
    optimizeDeps: {
      include: ['nuxt', '@nuxtjs/tailwindcss', 'pinia'],
      exclude: []
    }
  },
  
  // ============================================
  // TailwindCSS
  // ============================================
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    viewer: false
  },
  
  // ============================================
  // TypeScript
  // ============================================
  typescript: {
    strict: false,
    typeCheck: false
  },
  
  // ============================================
  // Components y Auto-imports
  // ============================================
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['.vue'],
    }
  ],
  
  imports: {
    dirs: ['stores', 'composables'],
  },
  
  // ============================================
  // Build
  // ============================================
  build: {
    transpile: ['@pinia/nuxt'],
  }
})