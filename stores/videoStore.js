// stores/videoStore.js
import { defineStore } from 'pinia'

const isClient = typeof window !== 'undefined'

export const useVideoStore = defineStore('video', {
  state: () => ({
    videoUrl: null,
    isLoaded: false,
    isLoading: false,
    error: null
  }),

  actions: {
    async loadVideo(src) {
      // ✅ En SSR, no hacer nada
      if (!isClient) {
        console.log('📹 [VIDEO STORE] SSR - Ignorando carga')
        return null
      }

      // ✅ Si ya está en memoria, devolver inmediatamente
      if (this.isLoaded && this.videoUrl) {
        console.log('✅ [VIDEO STORE] Video YA ESTÁ EN MEMORIA, reutilizando')
        return this.videoUrl
      }

      // ✅ Si está cargando, esperar
      if (this.isLoading) {
        console.log('⏳ [VIDEO STORE] Video ya está cargando, esperando...')
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
        console.log('🔍 [VIDEO STORE] Buscando video en caché SW...')

        // ✅ 1. PRIMERO: Intentar desde caché del Service Worker
        let response = null
        if (typeof caches !== 'undefined') {
          try {
            const cache = await caches.open('senado-videos-v2')
            const cached = await cache.match(src)
            if (cached && cached.ok) {
              console.log('📹 [VIDEO STORE] Video ENCONTRADO en caché SW ✅')
              response = cached
            }
          } catch (cacheError) {
            console.log('⚠️ [VIDEO STORE] Error accediendo a caché:', cacheError.message)
          }
        }

        // ✅ 2. Si NO está en caché, descargar desde red
        if (!response) {
          console.log('📹 [VIDEO STORE] Video NO está en caché, descargando desde red...')
          response = await fetch(src, {
            headers: {
              'Cache-Control': 'no-cache'
            }
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          console.log('📹 [VIDEO STORE] Descarga completada, status:', response.status)

          // Guardar en caché del SW para futuras veces
          if (typeof caches !== 'undefined') {
            try {
              const cache = await caches.open('senado-videos-v2')
              await cache.put(src, response.clone())
              console.log('📹 [VIDEO STORE] Video almacenado en caché SW')
            } catch (cacheError) {
              console.log('⚠️ [VIDEO STORE] No se pudo guardar en caché:', cacheError.message)
            }
          }
        } else {
          console.log('📹 [VIDEO STORE] Usando video DESDE CACHÉ SW (sin descarga)')
        }

        // ✅ 3. Convertir a blob para almacenar en memoria
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        // ✅ 4. Guardar en store
        this.videoUrl = url
        this.isLoaded = true

        console.log('✅ [VIDEO STORE] Video cargado en memoria')
        console.log('📹 [VIDEO STORE] Tamaño:', (blob.size / 1024 / 1024).toFixed(2), 'MB')
        return url

      } catch (err) {
        console.error('❌ [VIDEO STORE] Error:', err.message)
        this.error = err.message
        return null
      } finally {
        this.isLoading = false
      }
    },

    getVideoUrl() {
      if (!isClient) return null
      return this.videoUrl
    },

    isVideoLoaded() {
      if (!isClient) return false
      return this.isLoaded && !!this.videoUrl
    },

    clearVideo() {
      if (!isClient) return
      if (this.videoUrl) {
        console.log('🗑️ [VIDEO STORE] Limpiando video del store')
        URL.revokeObjectURL(this.videoUrl)
        this.videoUrl = null
        this.isLoaded = false
        this.error = null
      }
    }
  }
})