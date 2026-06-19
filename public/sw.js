// public/sw.js
const CACHE_VERSION = 'v2'
const CACHE_NAME = `senado-cache-${CACHE_VERSION}`
const IMAGE_CACHE_NAME = `senado-images-${CACHE_VERSION}`
const VIDEO_CACHE_NAME = `senado-videos-${CACHE_VERSION}`

const isDevelopment = self.location.hostname === 'localhost' || 
                      self.location.hostname === '127.0.0.1'

if (isDevelopment) {
  console.log('[SW] Modo desarrollo - Service Worker inactivo')
  self.addEventListener('install', () => self.skipWaiting())
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))))
    )
  })
  self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request))
  })
  return
}

// ============================================
// INSTALACIÓN - Precargar recursos críticos
// ============================================
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/2R.png',
  '/senadores2.png',
  '/images/placeholder.jpg',
  '/images/default-news.jpg'
]

self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...')
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS)
      }),
      self.skipWaiting()
    ])
  )
})

self.addEventListener('activate', (event) => {
  console.log('[SW] Activando...')
  event.waitUntil(
    Promise.all([
      // Limpiar cachés antiguas
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== IMAGE_CACHE_NAME && 
                cacheName !== VIDEO_CACHE_NAME) {
              console.log('[SW] Eliminando cache antiguo:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      self.clients.claim()
    ])
  )
})

// ============================================
// ESTRATEGIA PARA VIDEO - Cache First con verificación
// ============================================
const handleVideoRequest = async (request) => {
  const cache = await caches.open(VIDEO_CACHE_NAME)
  
  try {
    // 1. Intentar obtener del caché
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      console.log('[SW] Video desde caché:', request.url)
      // Revalidar en segundo plano
      fetch(request).then(response => {
        if (response.ok) {
          cache.put(request, response)
        }
      }).catch(() => {})
      return cachedResponse
    }
    
    // 2. Si no está en caché, descargar
    console.log('[SW] Video descargando:', request.url)
    const response = await fetch(request)
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    console.log('[SW] Error con video:', error)
    // Si falla, intentar de nuevo después
    return fetch(request)
  }
}

// ============================================
// ESTRATEGIA PARA IMÁGENES - Cache First con prioridad
// ============================================
const handleImageRequest = async (request, fetchEvent) => {
  const cache = await caches.open(IMAGE_CACHE_NAME)
  const url = new URL(request.url)
  
  // Verificar si la imagen es prioritaria (visible en viewport)
  const isPriority = request.headers.get('Priority') === 'high' || 
                     request.headers.get('Sec-Fetch-Dest') === 'image'
  
  try {
    // 1. Intentar obtener del caché
    const cachedResponse = await cache.match(request)
    if (cachedResponse) {
      // Revalidar en segundo plano solo si no es prioritaria
      if (!isPriority) {
        fetch(request).then(response => {
          if (response.ok && response.status !== 206) {
            cache.put(request, response)
          }
        }).catch(() => {})
      }
      return cachedResponse
    }
    
    // 2. Si es prioritaria, cargar con timeout
    if (isPriority) {
      console.log('[SW] Imagen prioritaria:', url.pathname)
      
      // Crear una promesa con timeout
      const fetchPromise = fetch(request)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 8000)
      })
      
      try {
        const response = await Promise.race([fetchPromise, timeoutPromise])
        if (response && response.ok && response.status !== 206) {
          cache.put(request, response.clone())
        }
        return response
      } catch (error) {
        console.log('[SW] Timeout en imagen prioritaria, usando fallback')
        // Intentar una vez más sin timeout
        const retryResponse = await fetch(request)
        if (retryResponse && retryResponse.ok && retryResponse.status !== 206) {
          cache.put(request, retryResponse.clone())
        }
        return retryResponse
      }
    }
    
    // 3. Carga normal
    const response = await fetch(request)
    if (response && response.ok && response.status !== 206) {
      cache.put(request, response.clone())
    }
    return response
    
  } catch (error) {
    console.log('[SW] Error con imagen:', url.pathname)
    // Intentar recuperar del caché incluso si falló
    const cached = await cache.match(request)
    if (cached) return cached
    
    // Si no hay caché, devolver placeholder
    return caches.match('/images/placeholder.jpg')
  }
}

// ============================================
// ESTRATEGIA PARA ASSETS ESTÁTICOS
// ============================================
const handleStaticAsset = async (request) => {
  const cache = await caches.open(CACHE_NAME)
  const cached = await cache.match(request)
  if (cached) return cached
  
  const response = await fetch(request)
  if (response.ok && response.status !== 206) {
    cache.put(request, response.clone())
  }
  return response
}

// ============================================
// INTERCEPTOR PRINCIPAL
// ============================================
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // 🔥 EXCLUIR Centro de Noticias del caché
  if (url.pathname === '/centro-de-noticias' || 
      url.pathname.startsWith('/centro-de-noticias/')) {
    event.respondWith(fetch(event.request))
    return
  }
  
  // Solo manejar peticiones HTTP
  if (!url.protocol.startsWith('http')) return
  
  // ===== VIDEOS =====
  if (url.pathname.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)) {
    event.respondWith(handleVideoRequest(event.request))
    return
  }
  
  // ===== IMÁGENES =====
  if (url.pathname.match(/\.(png|jpg|jpeg|webp|svg|gif|ico)$/i)) {
    event.respondWith(handleImageRequest(event.request, event))
    return
  }
  
  // ===== ASSETS ESTÁTICOS (CSS, JS, FONTS) =====
  if (url.pathname.includes('/_nuxt/') || 
      url.pathname.includes('/css/') || 
      url.pathname.includes('/fonts/')) {
    event.respondWith(handleStaticAsset(event.request))
    return
  }
  
  // ===== NAVEGACIÓN (páginas HTML) =====
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match('/')
        })
    )
    return
  }
  
  // ===== TODO LO DEMÁS =====
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
      })
  )
})