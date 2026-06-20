// composables/usePriorityImages.js
export const usePriorityImages = () => {
  const { $sw } = useNuxtApp()
  
  // Lista de imágenes que deben precargarse con alta prioridad
  const priorityImages = [
    // Hero images
    '/Mandato Constitucional Senado/6.png',
    '/Mandato Constitucional Senado/15.png',
    '/Mandato Constitucional Senado/27.JPG',
    // Images importantes
    '/Reseña Histórica del Senado/17.webp',
    '/Reseña Histórica del Senado/63.webp',
    '/Reseña Histórica del Senado/118.webp',
    // Logos
    '/2R.png',
    '/senadores2.png',
    '/footer-img/Recurso 7.png',
    '/footer-img/Recurso 8.png'
  ]
  
  // Precargar imágenes prioritarias
  const preloadPriorityImages = () => {
    if (typeof window === 'undefined') return
    
    priorityImages.forEach(src => {
      // Usar link preload para máxima prioridad
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      link.fetchPriority = 'high'
      document.head.appendChild(link)
      
      // También precargar en caché del navegador
      const img = new Image()
      img.fetchPriority = 'high'
      img.src = src
    })
  }
  
  // Precargar imágenes de una sección específica
  const preloadImagesInViewport = (container) => {
    if (typeof window === 'undefined' || !container) return
    
    const images = container.querySelectorAll('img:not([loading="lazy"])')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.getAttribute('src') || img.dataset.src
          if (src && !img.complete) {
            // Forzar carga con alta prioridad
            img.fetchPriority = 'high'
            img.loading = 'eager'
            // Si tiene data-src, usar lazy loading manual
            if (img.dataset.src) {
              img.src = img.dataset.src
            }
          }
          observer.unobserve(img)
        }
      })
    }, {
      rootMargin: '50px 0px 50px 0px',
      threshold: 0.1
    })
    
    images.forEach(img => observer.observe(img))
    return observer
  }
  
  return {
    priorityImages,
    preloadPriorityImages,
    preloadImagesInViewport
  }
}