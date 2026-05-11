// stores/departamentosStore.js
import { defineStore } from 'pinia'

export const useDepartamentosStore = defineStore('departamentos', {
  state: () => ({
    departamentos: [],
    isLoading: false,
    loaded: false,
    error: null
  }),
  
  actions: {
    async fetchDepartamentos() {
      // Si ya están cargados, retornar inmediatamente
      if (this.loaded && this.departamentos.length > 0) {
        return this.departamentos
      }
      
      // Evitar múltiples cargas simultáneas
      if (this.isLoading) {
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (this.loaded) {
              clearInterval(checkInterval)
              resolve(this.departamentos)
            }
          }, 50)
        })
      }
      
      this.isLoading = true
      
      try {
        // Importación dinámica con manejo de errores
        const { departamentosData } = await import('@/data/departamentos.js')
        this.departamentos = departamentosData || []
        this.loaded = true
        return this.departamentos
      } catch (error) {
        console.error('Error cargando departamentos:', error)
        this.error = error
        // Cargar datos de respaldo para no romper la UI
        this.departamentos = []
        this.loaded = true
        return []
      } finally {
        this.isLoading = false
      }
    },
    
    // Precargar en segundo plano (llamada segura)
    preload() {
      if (!this.loaded && !this.isLoading) {
        return this.fetchDepartamentos().catch(() => null)
      }
      return Promise.resolve(null)
    }
  },
  
  getters: {
    getDepartamentos: (state) => state.departamentos,
    isLoaded: (state) => state.loaded
  }
})