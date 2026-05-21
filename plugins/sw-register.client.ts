// plugins/sw-register.client.ts
export default defineNuxtPlugin(() => {
  // Verificar que estamos en el navegador
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    // Esperar a que la página cargue
    const register = () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('[SW] Registrado correctamente')
        })
        .catch((error) => {
          // Esto no afecta la funcionalidad de la página
          console.log('[SW] No se pudo registrar:', error.message)
        })
    }
    
    // Registrar cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', register)
    } else {
      register()
    }
  }
})