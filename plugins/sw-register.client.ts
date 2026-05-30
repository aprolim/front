// plugins/sw-register.client.ts
export default defineNuxtPlugin(() => {
  const isDevelopment = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname.includes('.local')
  
  if (isDevelopment) {
    console.log('🧹 [SW] Modo desarrollo - Service Worker desactivado')
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister()
          console.log('✅ [SW] Service Worker desregistrado')
        })
      })
      
      if ('caches' in window) {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.delete(cacheName)
            console.log(`✅ [SW] Caché eliminada: ${cacheName}`)
          })
        })
      }
    }
    return
  }
  
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('[SW] Registrado correctamente')
          setInterval(() => registration.update(), 60 * 60 * 1000)
        })
        .catch((error) => {
          console.log('[SW] No se pudo registrar:', error.message)
        })
    })
  }
})