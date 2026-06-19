// plugins/preload.client.js
export default defineNuxtPlugin(() => {
  if (typeof window === 'undefined') return
  
  // Precargar imágenes prioritarias
  const priorityImages = [
    '/Mandato Constitucional Senado/6.png',
    '/Mandato Constitucional Senado/15.png',
    '/Mandato Constitucional Senado/27.JPG',
    '/Reseña Histórica del Senado/17.png',
    '/Reseña Histórica del Senado/63.png',
    '/Reseña Histórica del Senado/118.JPG',
    '/2R.png',
    '/senadores2.png'
  ]
  
  // Usar requestIdleCallback para no bloquear
  const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 100))
  
  idleCallback(() => {
    priorityImages.forEach(src => {
      // Preload con alta prioridad
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      link.fetchPriority = 'high'
      document.head.appendChild(link)
      
      // Precargar en caché
      const img = new Image()
      img.fetchPriority = 'high'
      img.src = src
    })
  })
  
  // Precargar video del hero
  const videoSrc = '/video/video web.mp4'
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'video'
  link.href = videoSrc
  link.fetchPriority = 'high'
  document.head.appendChild(link)
})