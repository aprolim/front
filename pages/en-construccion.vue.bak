<!-- pages/en-construccion.vue -->
<template>
  <div class="min-h-screen w-full relative">
    <!-- Imagen de fondo -->
    <img 
      src="/images/Mesa de trabajo 3.png" 
      alt="Página en construcción" 
      class="w-full h-screen object-cover object-center"
    />
    
    <!-- Botón volver al inicio -->
    <button 
      @click="goToHome"
      class="fixed bottom-8 right-8 z-20 px-6 py-2 bg-[#E03636] hover:bg-[#C12F2F] text-white font-semibold rounded-lg transition-all duration-300 shadow-lg"
    >
      ← Volver
    </button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'alter8'
})

const goToHome = () => {
  navigateTo('/')
}

// Forzar scroll al inicio de la página
onMounted(() => {
  window.scrollTo(0, 0)
  // También intentar con el contenedor snap si existe
  const snapContainer = document.querySelector('.snap-container')
  if (snapContainer) {
    snapContainer.scrollTo(0, 0)
  }
})
</script>