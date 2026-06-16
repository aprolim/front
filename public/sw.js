// public/sw.js
const CACHE_NAME = 'senado-cache-v1'

// Solo cachear recursos estáticos básicos
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/2R.png',
  '/senadores2.png'
]

self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  console.log('[SW] Activando...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Eliminando cache antiguo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // SOLO cachear navegación (páginas HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cachear la respuesta para offline
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          return response
        })
        .catch(() => {
          // Fallback a la página principal
          return caches.match('/')
        })
    )
    return
  }
  
  // Para assets estáticos (CSS, JS), usar caché primero
  if (url.pathname.includes('/_nuxt/') || 
      url.pathname.includes('/css/') || 
      url.pathname.includes('/fonts/')) {
    event.respondWith(
      caches.match(event.request)
        .then((cached) => {
          if (cached) return cached
          return fetch(event.request)
        })
    )
    return
  }
  
  // Para imágenes, SIEMPRE ir a la red
  // El navegador ya tiene su propia caché HTTP
  if (url.pathname.match(/\.(png|jpg|jpeg|webp|svg|gif|ico)$/i)) {
    event.respondWith(fetch(event.request))
    return
  }
  
  // Para todo lo demás, intentar red, luego caché
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
      })
  )
})