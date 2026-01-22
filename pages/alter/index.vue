<!-- pages/alternative/index.vue - VERSIÓN SIMPLE PARA PROBAR -->
<template>
  <div class="max-w-7xl mx-auto">
    <!-- Banner de instrucciones -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 mb-8 shadow-lg">
      <h1 class="text-4xl font-bold mb-4">¡Menú Desplegable Activado! 🎉</h1>
      <p class="text-xl mb-6">
        Presiona el botón <span class="bg-white/20 px-3 py-1 rounded-lg font-mono">☰</span> en la esquina superior izquierda para mostrar/ocultar el menú.
      </p>
      <div class="flex items-center gap-4">
        <button @click="forceShowMenu" class="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          Mostrar Menú Ahora
        </button>
        <NuxtLink to="/" class="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
          Volver a versión clásica
        </NuxtLink>
      </div>
    </div>

    <!-- Contenido de prueba -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Característica 1</h2>
        <p class="text-gray-600">El menú se desliza desde la izquierda cuando presionas el botón hamburguesa.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Característica 2</h2>
        <p class="text-gray-600">Las redes sociales están visibles tanto en el menú como en la barra lateral derecha.</p>
      </div>
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h2 class="text-2xl font-bold mb-4 text-gray-900">Característica 3</h2>
        <p class="text-gray-600">Totalmente responsivo y optimizado para móviles y desktop.</p>
      </div>
    </div>

    <!-- Ejemplo de uso del menú -->
    <div class="bg-gray-50 p-8 rounded-2xl border-2 border-dashed border-gray-300">
      <h2 class="text-3xl font-bold mb-6 text-gray-900 text-center">¿Cómo funciona?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold mb-4 text-blue-700">En Desktop:</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 font-bold">1</span>
              </div>
              <span>Presiona el botón ☰ en el header</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 font-bold">2</span>
              </div>
              <span>El menú se desliza desde la izquierda</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-600 font-bold">3</span>
              </div>
              <span>Presiona nuevamente para ocultarlo</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold mb-4 text-green-700">En Móvil:</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 font-bold">1</span>
              </div>
              <span>Presiona el botón ☰</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 font-bold">2</span>
              </div>
              <span>El menú cubre la pantalla</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span class="text-green-600 font-bold">3</span>
              </div>
              <span>Toca fuera del menú para cerrar</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Enlace de redes sociales -->
    <div class="mt-12 text-center">
      <h3 class="text-2xl font-bold mb-6">Redes Sociales Visibles</h3>
      <p class="text-gray-600 mb-8">Mira a la derecha de la pantalla para ver las redes sociales fijas</p>
      <div class="inline-flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
        <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'alter'
})
// Esta función podría usarse para forzar mostrar el menú
const forceShowMenu = () => {
  // Aquí normalmente emitirías un evento al layout
  console.log('Mostrar menú')
}
</script>