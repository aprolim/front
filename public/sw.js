// public/sw.js
// Service Worker - VERSIÓN CORREGIDA (excluye videos)

const CACHE_NAME = 'senado-cache-v1'
const IMAGE_CACHE_NAME = 'senado-images-v1'

// Verificar si es una imagen
const isImageRequest = (url) => {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']
  return imageExtensions.some(ext => url.pathname.toLowerCase().includes(ext))
}

// Verificar si es un video (NO se cachean)
const isVideoRequest = (url) => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
  return videoExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext))
}

// Verificar si es un archivo grande (no cachear)
const isLargeFile = (url) => {
  const largeExtensions = ['.mp4', '.webm', '.pdf', '.zip']
  return largeExtensions.some(ext => url.pathname.toLowerCase().endsWith(ext))
}

// Placeholder para imágenes
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

// ============================================
// INSTALACIÓN
// ============================================
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(['/']))
      .then(() => self.skipWaiting())
  )
})

// ============================================
// ACTIVACIÓN
// ============================================
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

// ============================================
// ESTRATEGIA: SOLO PARA IMÁGENES
// ============================================
const handleImageRequest = async (request, fetchEvent) => {
  const cache = await caches.open(IMAGE_CACHE_NAME)
  
  try {
    // Buscar en caché
    const cachedResponse = await cache.match(request)
    
    // Actualizar en segundo plano (solo si no es video)
    const fetchPromise = fetch(request.clone())
      .then(async (networkResponse) => {
        if (networkResponse && networkResponse.ok) {
          // Verificar que no sea respuesta parcial (206)
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
    
    // Si hay caché, devolverla inmediatamente
    if (cachedResponse) {
      fetchEvent.waitUntil(fetchPromise)
      return cachedResponse
    }
    
    // Si no hay caché, esperar la red
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

// ============================================
// INTERCEPTAR PETICIONES
// ============================================
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // Solo peticiones HTTP/HTTPS
  if (!url.protocol.startsWith('http')) return
  
  // Para VIDEOS y archivos grandes: NO interceptar, ir directamente a la red
  if (isVideoRequest(url) || isLargeFile(url)) {
    // Dejar que el navegador maneje el video normalmente
    return
  }
  
  // Solo mismo dominio para caché
  if (url.hostname !== self.location.hostname) return
  
  // Para imágenes: usar estrategia especial
  if (isImageRequest(url)) {
    event.respondWith(handleImageRequest(event.request, event))
    return
  }
  
  // Para recursos estáticos (CSS/JS)
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
  
  // Para navegación (páginas)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/'))
    )
    return
  }
})