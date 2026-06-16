// plugins/adaptive-image-loader.client.ts
export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return
  
  // Configuración de reintentos según calidad de red
  const getConfig = () => {
    if (navigator && 'connection' in navigator) {
      const connection = (navigator as any).connection
      const type = connection.effectiveType || '4g'
      
      switch (type) {
        case 'slow-2g':
        case '2g':
          return { timeout: 45000, maxRetries: 2, retryDelay: 5000 }
        case '3g':
          return { timeout: 25000, maxRetries: 3, retryDelay: 2000 }
        case '4g':
          return { timeout: 12000, maxRetries: 3, retryDelay: 1000 }
        default:
          return { timeout: 15000, maxRetries: 3, retryDelay: 1000 }
      }
    }
    return { timeout: 15000, maxRetries: 3, retryDelay: 1000 }
  }
  
  // Monitorear errores de imágenes
  document.addEventListener('error', (e) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'IMG') {
      const img = target as HTMLImageElement
      // Ya manejado por AppImage
      console.debug(`[Image] Error cargando: ${img.src}`)
    }
  }, true)
  
  // Observer para imágenes nuevas
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          if (element.tagName === 'IMG') {
            const img = element as HTMLImageElement
            // Verificar si la imagen se carga correctamente
            const config = getConfig()
            
            const timeoutId = setTimeout(() => {
              if (!img.complete || img.naturalHeight === 0) {
                // Disparar evento de error manualmente
                img.dispatchEvent(new Event('error'))
              }
            }, config.timeout)
            
            img.addEventListener('load', () => clearTimeout(timeoutId), { once: true })
          }
        }
      })
    })
  })
  
  observer.observe(document.body, { childList: true, subtree: true })
  
  console.log('📸 [ImageLoader] Plugin cargado correctamente')
})