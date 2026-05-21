// plugins/adaptive-image-loader.client.ts
export default defineNuxtPlugin(() => {
  // No necesitas process.client, el plugin ya es .client.ts
  
  // ============================================
  // DETECTOR DE CALIDAD DE RED
  // ============================================
  
  let networkQuality: 'excellent' | 'good' | 'poor' | 'very-poor' | 'offline' = 'good'
  let isOffline = false
  
  // Detectar calidad de red
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = (navigator as any).connection
    const updateQuality = () => {
      const type = connection.effectiveType || '4g'
      if (type === 'slow-2g' || type === '2g') networkQuality = 'very-poor'
      else if (type === '3g') networkQuality = connection.downlink < 1 ? 'poor' : 'good'
      else if (type === '4g') networkQuality = connection.downlink < 5 ? 'good' : 'excellent'
      else networkQuality = 'good'
    }
    updateQuality()
    connection.addEventListener('change', updateQuality)
  }
  
  if (typeof window !== 'undefined') {
    window.addEventListener('online', () => {
      isOffline = false
      networkQuality = 'good'
      // Reintentar imágenes pendientes
      document.querySelectorAll('img[data-pending="true"]').forEach(img => {
        retryImage(img as HTMLImageElement)
      })
    })
    window.addEventListener('offline', () => {
      isOffline = true
      networkQuality = 'offline'
    })
  }
  
  // ============================================
  // CONFIGURACIÓN SEGÚN CALIDAD DE RED
  // ============================================
  
  const getConfig = () => {
    switch (networkQuality) {
      case 'very-poor':
        return { timeout: 45000, maxRetries: 2, retryDelay: 5000, label: '📡 Conexión lenta...' }
      case 'poor':
        return { timeout: 25000, maxRetries: 3, retryDelay: 2000, label: '📶 Conectando...' }
      case 'good':
        return { timeout: 12000, maxRetries: 3, retryDelay: 1000, label: '' }
      case 'excellent':
        return { timeout: 8000, maxRetries: 3, retryDelay: 600, label: '' }
      default:
        return { timeout: 15000, maxRetries: 3, retryDelay: 1000, label: '' }
    }
  }
  
  // ============================================
  // SISTEMA DE REINTENTOS
  // ============================================
  
  const imageStatus = new Map<HTMLImageElement, { retries: number; timeoutId?: ReturnType<typeof setTimeout> }>()
  
  const retryImage = (img: HTMLImageElement) => {
    const config = getConfig()
    const status = imageStatus.get(img)
    const retries = status?.retries || 0
    
    if (retries < config.maxRetries && !isOffline) {
      const originalSrc = img.dataset.originalSrc || img.src.split('?')[0]
      const delay = config.retryDelay * Math.pow(1.5, retries)
      
      // Mostrar estado de carga manteniendo estilos originales
      img.style.opacity = '0.6'
      img.style.transition = 'opacity 0.3s'
      
      // Agregar badge de conexión lenta (opcional, no afecta estilos)
      if (config.label && !img.parentElement?.querySelector('.connection-badge')) {
        const badge = document.createElement('span')
        badge.className = 'connection-badge'
        badge.textContent = config.label
        badge.style.cssText = `
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(0,0,0,0.6);
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 12px;
          z-index: 10;
          pointer-events: none;
        `
        if (img.parentElement) {
          img.parentElement.style.position = 'relative'
          img.parentElement.appendChild(badge)
          setTimeout(() => badge.remove(), 3000)
        }
      }
      
      setTimeout(() => {
        const newSrc = `${originalSrc}?retry=${retries + 1}&t=${Date.now()}`
        img.src = newSrc
        imageStatus.set(img, { retries: retries + 1 })
      }, delay)
    } else if (retries >= config.maxRetries || isOffline) {
      // Fallback: mantener la imagen pero con opacity reducido
      img.style.opacity = '0.5'
      
      // Agregar botón de reintento manual (opcional)
      if (img.parentElement && !img.parentElement.querySelector('.manual-retry')) {
        const retryBtn = document.createElement('button')
        retryBtn.className = 'manual-retry'
        retryBtn.textContent = '⟳'
        retryBtn.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #E03636;
          color: white;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          z-index: 20;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        `
        retryBtn.onclick = (e) => {
          e.stopPropagation()
          retryBtn.remove()
          img.style.opacity = ''
          imageStatus.delete(img)
          retryImage(img)
        }
        img.parentElement.style.position = 'relative'
        img.parentElement.appendChild(retryBtn)
        
        // Auto-remover después de 10 segundos
        setTimeout(() => retryBtn.remove(), 10000)
      }
    }
  }
  
  // ============================================
  // INTERCEPTOR GLOBAL DE IMÁGENES
  // ============================================
  
  if (typeof document !== 'undefined') {
    // Interceptar errores de imágenes a nivel global
    document.addEventListener('error', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement
        
        // No procesar si ya está siendo manejada
        if (img.dataset.processing === 'true') return
        
        img.dataset.processing = 'true'
        
        // Guardar src original
        if (!img.dataset.originalSrc) {
          img.dataset.originalSrc = img.src.split('?')[0]
        }
        
        // Iniciar reintentos
        if (!imageStatus.has(img)) {
          imageStatus.set(img, { retries: 0 })
        }
        
        retryImage(img)
        
        setTimeout(() => {
          delete img.dataset.processing
        }, 1000)
      }
    }, true) // Captura en fase de captura
    
    // ============================================
    // PROCESAR IMÁGENES EXISTENTES
    // ============================================
    
    // Inicializar imágenes ya presentes
    const initExistingImages = () => {
      document.querySelectorAll('img').forEach(img => {
        if (img.complete && img.naturalHeight === 0) {
          // Imagen rota
          if (!img.dataset.originalSrc) {
            img.dataset.originalSrc = img.src.split('?')[0]
          }
          retryImage(img)
        } else if (!img.complete) {
          // Imagen aún cargando, agregar timeout
          const config = getConfig()
          const timeoutId = setTimeout(() => {
            if (!img.complete || img.naturalHeight === 0) {
              if (!img.dataset.originalSrc) {
                img.dataset.originalSrc = img.src.split('?')[0]
              }
              retryImage(img)
            }
          }, config.timeout)
          
          img.addEventListener('load', () => clearTimeout(timeoutId), { once: true })
        }
      })
    }
    
    // Observar nuevas imágenes agregadas al DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            if (element.tagName === 'IMG') {
              const img = element as HTMLImageElement
              if (!img.complete) {
                const config = getConfig()
                const timeoutId = setTimeout(() => {
                  if (!img.complete || img.naturalHeight === 0) {
                    if (!img.dataset.originalSrc) {
                      img.dataset.originalSrc = img.src.split('?')[0]
                    }
                    retryImage(img)
                  }
                }, config.timeout)
                img.addEventListener('load', () => clearTimeout(timeoutId), { once: true })
              }
            } else if (element.querySelectorAll) {
              element.querySelectorAll('img').forEach((img: HTMLImageElement) => {
                if (!img.complete) {
                  const config = getConfig()
                  const timeoutId = setTimeout(() => {
                    if (!img.complete || img.naturalHeight === 0) {
                      if (!img.dataset.originalSrc) {
                        img.dataset.originalSrc = img.src.split('?')[0]
                      }
                      retryImage(img)
                    }
                  }, config.timeout)
                  img.addEventListener('load', () => clearTimeout(timeoutId), { once: true })
                }
              })
            }
          }
        })
      })
    })
    
    observer.observe(document.body, { childList: true, subtree: true })
    
    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initExistingImages)
    } else {
      initExistingImages()
    }
    
    // Estilos globales mínimos (no interfieren con estilos existentes)
    const style = document.createElement('style')
    style.textContent = `
      img[data-pending="true"] {
        opacity: 0.6;
        transition: opacity 0.3s;
      }
      .manual-retry:hover {
        transform: scale(1.1);
        transition: transform 0.2s;
      }
    `
    document.head.appendChild(style)
  }
})