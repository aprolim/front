// stores/videoStore.js
import { defineStore } from 'pinia'

export const useVideoStore = defineStore('video', {
  state: () => ({
    // Almacenar el video como objeto URL para reutilizarlo
    videoBlob: null,
    videoUrl: null,
    isLoaded: false,
    isLoading: false,
    error: null
  }),
  
  actions: {
    // Cargar el video una sola vez
    async loadVideo(src) {
      // Si ya está cargado, no hacer nada
      if (this.isLoaded && this.videoUrl) {
        console.log('📹 Video ya cargado en store, reutilizando')
        return this.videoUrl
      }
      
      // Si está cargando, esperar
      if (this.isLoading) {
        console.log('📹 Video cargando, esperando...')
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (this.isLoaded) {
              clearInterval(checkInterval)
              resolve(this.videoUrl)
            }
          }, 100)
        })
      }
      
      this.isLoading = true
      this.error = null
      
      try {
        console.log('📹 Descargando video por primera vez:', src)
        
        // 1. Intentar desde caché del Service Worker
        let response = null
        if (typeof caches !== 'undefined') {
          const cache = await caches.open('senado-videos-v2')
          const cached = await cache.match(src)
          if (cached) {
            console.log('📹 Video encontrado en caché SW')
            response = cached
          }
        }
        
        // 2. Si no está en caché, descargar
        if (!response) {
          response = await fetch(src, {
            headers: {
              'Cache-Control': 'no-cache'
            }
          })
          
          if (!response.ok) throw new Error('Error al descargar video')
          
          // Guardar en caché del SW
          if (typeof caches !== 'undefined') {
            const cache = await caches.open('senado-videos-v2')
            await cache.put(src, response.clone())
            console.log('📹 Video almacenado en caché SW')
          }
        }
        
        // 3. Convertir a blob para almacenar en memoria
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        
        // 4. Guardar en store
        this.videoBlob = blob
        this.videoUrl = url
        this.isLoaded = true
        
        console.log('✅ Video cargado y almacenado en store')
        return url
        
      } catch (err) {
        console.error('❌ Error cargando video:', err)
        this.error = err.message
        return null
      } finally {
        this.isLoading = false
      }
    },
    
    // Obtener la URL del video (cargado o no)
    getVideoUrl() {
      return this.videoUrl
    },
    
    // Verificar si el video está cargado
    isVideoLoaded() {
      return this.isLoaded
    }
  }
})