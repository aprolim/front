// composables/usePreloadData.js
export const usePreloadData = () => {
  const initPreload = () => {
    // Solo ejecutar en el navegador, no en el servidor
    if (process.client) {
      // Esperar 1.5 segundos para no bloquear la carga inicial
      setTimeout(() => {
        // Importar dinámicamente el store
        import('@/stores/departamentosStore')
          .then(module => {
            const store = module.useDepartamentosStore()
            // Solo precargar si no está ya cargado
            if (store && !store.loaded) {
              console.log('🔄 Precargando departamentos...')
              store.fetchDepartamentos()
            }
          })
          .catch(err => {
            // Error silencioso - no afecta la funcionalidad principal
            console.debug('Precarga diferida:', err?.message || 'error controlado')
          })
      }, 1500)
    }
  }
  
  return { initPreload }
}