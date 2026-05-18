// nuxt.config.ts
export default defineNuxtConfig({
  // ============================================
  // SSR deshabilitado - SPA mode
  // ============================================
  ssr: false,
  
  devtools: { enabled: false },
  
  // ============================================
  // RUTAS
  // ============================================
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
  
  // ============================================
  // MÓDULOS
  // ============================================
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ],
  
  // ============================================
  // CSS
  // ============================================
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/main.css'
  ],
  
  // ============================================
  // NITRO - BUILD ESTÁTICO
  // ============================================
  nitro: {
    preset: 'static',
    static: true,
    output: {
      publicDir: 'dist',
      serverDir: '.output/server'
    },
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: false
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    publicAssets: [
      {
        baseURL: '/',
        dir: 'public',
        maxAge: 31536000
      }
    ]
  },
  
  // ============================================
  // VITE
  // ============================================
  vite: {
    server: {
      allowedHosts: [
        'demoap.senado.gob.bo',
        'localhost',
        '127.0.0.1'
      ]
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/vue')) return 'vendor-vue'
            if (id.includes('node_modules/pinia')) return 'vendor-pinia'
            if (id.includes('node_modules/primevue')) return 'vendor-ui'
            if (id.includes('node_modules/date-fns')) return 'vendor-date'
            if (id.includes('node_modules')) return 'vendor-common'
          }
        }
      }
    }
  },
  
  // ============================================
  // OPTIMIZACIONES
  // ============================================
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true
  },
  
  build: {
    transpile: ['primevue']
  },
  
  // ============================================
  // CONFIGURACIÓN DE IMÁGENES (CORREGIDA)
  // ============================================
  image: {
    domains: ['demoback.senado.gob.bo'],
    provider: 'ipx',
    ipx: {
      baseURL: '/_ipx/'
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 150,
          height: 150,
          fit: 'cover',
          quality: 80
        }
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          width: 300,
          height: 200,
          fit: 'cover',
          quality: 75
        }
      },
      card: {
        modifiers: {
          format: 'webp',
          width: 400,
          height: 300,
          fit: 'cover',
          quality: 80
        }
      },
      banner: {
        modifiers: {
          format: 'webp',
          width: 1200,
          height: 600,
          fit: 'cover',
          quality: 85
        }
      }
    }
  }
})