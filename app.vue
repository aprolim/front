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
    
    // Limpiar cachés
    if ('caches' in window) {
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
      if (cacheNames.length > 0) {
        console.log(`✅ [APP] Cachés eliminadas: ${cacheNames.join(', ')}`)
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