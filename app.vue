<!-- app.vue -->
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// ============================================
// LIMPIEZA AUTOMÁTICA AL INICIO EN DESARROLLO
// ============================================
if (process.client && window.location.hostname === 'localhost') {
  // Ejecutar inmediatamente, no esperar a mounted
  const limpiarServiceWorkers = async () => {
    console.log('🧹 [APP] Limpiando Service Workers y cachés...')
    
    // Limpiar Service Workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations()
      registrations.forEach(registration => registration.unregister())
      if (registrations.length > 0) {
        console.log(`✅ [APP] ${registrations.length} Service Workers eliminados`)
      }
    }
    
    // ✅ Limpiar cachés PERO EXCLUYENDO el video
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      
      // Filtrar para NO eliminar senado-videos-v2
      const cachesToDelete = cacheNames.filter(name => name !== 'senado-videos-v2')
      
      await Promise.all(cachesToDelete.map(name => caches.delete(name)))
      
      if (cachesToDelete.length > 0) {
        console.log(`✅ [APP] Cachés eliminadas: ${cachesToDelete.join(', ')}`)
      } else {
        console.log('ℹ️ [APP] No se eliminaron cachés (solo existe video cache)')
      }
      
      // Mostrar que el video se mantiene
      const videoCache = cacheNames.find(name => name === 'senado-videos-v2')
      if (videoCache) {
        console.log('📹 [APP] Cache de video conservada: senado-videos-v2')
      }
    }
  }
  
  // Ejecutar limpieza
  limpiarServiceWorkers()
}
</script>

<style>
/* Tus estilos globales */
</style>