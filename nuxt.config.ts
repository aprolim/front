// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
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
  
  image: {
    provider: 'ipx',
    ipx: {
      baseURL: '/_ipx/'
    },
    domains: ['demoap.senado.gob.bo', 'localhost'],
    quality: 80,
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
    head: {
      title: 'Senado de Bolivia',
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portal Oficial del Senado Nacional de Bolivia' },
        { 'http-equiv': 'Cache-Control', content: 'no-cache' }
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
    '~/assets/css/main.css',
    '~/assets/css/tailwind.css'
  ],
  
  nitro: {
    preset: 'node-server',
    output: {
      publicDir: 'dist'
    },
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },
    storage: {
      'cache': {
        driver: 'memory',
        maxEntries: 100
      }
    }
  },
  
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
    }
  },
  
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
      include: ['nuxt', '@nuxtjs/tailwindcss'],
      exclude: []
    }
  },
  
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    viewer: false
  }
})