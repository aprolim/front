// public/sw.js
const isDevelopment = self.location.hostname === 'localhost' || 
                      self.location.hostname === '127.0.0.1'

if (isDevelopment) {
  console.log('[SW] Modo desarrollo - Service Worker inactivo')
  
  self.addEventListener('install', () => {
    self.skipWaiting()
  })
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request))
  })
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key))))
    )
  })
  
  return
}

// ============================================
// PRODUCCIÓN - Solo para páginas que no son Centro de Noticias
// ============================================

const CACHE_NAME = 'senado-cache-v1'
const IMAGE_CACHE_NAME = 'senado-images-v1'

const isImageRequest = (url) => {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']
  return imageExtensions.some(ext => url.pathname.toLowerCase().includes(ext))
}

const isVideoRequest = (url) => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
  return videoExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext))
}

const isLargeFile = (url) => {
  const largeExtensions = ['.mp4', '.webm', '.pdf', '.zip']
  return largeExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext))
}

const getPlaceholderSVG = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
    <rect width="100" height="100" fill="#8B0000"/>
    <circle cx="50" cy="35" r="18" fill="white" opacity="0.6"/>
    <path d="M50 58 C35 58 22 68 22 82 L78 82 C78 68 65 58 50 58Z" fill="white" opacity="0.6"/>
    <text x="50" y="92" text-anchor="middle" fill="white" font-size="10" opacity="0.7">Cargando</text>
  </svg>`
  
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' }
  })
}

self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(['/']))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  console.log('[SW] Activando...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
            console.log('[SW] Eliminando cache antiguo:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

const handleImageRequest = async (request, fetchEvent) => {
  const cache = await caches.open(IMAGE_CACHE_NAME)
  
  try {
    const cachedResponse = await cache.match(request)
    
    const fetchPromise = fetch(request.clone())
      .then(async (networkResponse) => {
        if (networkResponse && networkResponse.ok) {
          if (networkResponse.status !== 206) {
            await cache.put(request, networkResponse.clone())
          }
        }
        return networkResponse
      })
      .catch((error) => {
        console.log('[SW] Error fetching image:', error)
        return null
      })
    
    if (cachedResponse) {
      fetchEvent.waitUntil(fetchPromise)
      return cachedResponse
    }
    
    const networkResponse = await fetch(request.clone())
    if (networkResponse && networkResponse.ok && networkResponse.status !== 206) {
      await cache.put(request, networkResponse.clone())
    }
    return networkResponse
    
  } catch (error) {
    console.log('[SW] Error handling image:', error)
    return getPlaceholderSVG()
  }
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // 🔥 EXCLUIR Centro de Noticias del caché
  if (url.pathname === '/centro-de-noticias' || 
      url.pathname.startsWith('/centro-de-noticias/')) {
    event.respondWith(fetch(event.request))
    return
  }
  
  if (!url.protocol.startsWith('http')) return
  
  if (isVideoRequest(url) || isLargeFile(url)) {
    return
  }
  
  if (url.hostname !== self.location.hostname) return
  
  if (isImageRequest(url)) {
    event.respondWith(handleImageRequest(event.request, event))
    return
  }
  
  if (url.pathname.includes('/_nuxt/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request)
        if (cached) return cached
        
        const response = await fetch(event.request)
        if (response.ok && response.status !== 206) {
          cache.put(event.request, response.clone())
        }
        return response
      })
    )
    return
  }
  
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/'))
    )
    return
  }
})