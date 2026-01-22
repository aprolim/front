<!-- pages/alternative/index.vue - VERSIÓN MEJORADA -->
<template>
  <div>
    <!-- Hero Section con indicador -->
    <section class="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative container mx-auto px-4 py-20">
        <div class="max-w-3xl">
          <!-- Indicador interactivo -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6 cursor-pointer hover:bg-white/30" @click="toggleDemo">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span class="text-sm font-medium">DEMO: Menú desplegable</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Senado Nacional de Bolivia
          </h1>
          <p class="text-xl md:text-2xl opacity-90 mb-8">
            Portal oficial con menú desplegable interactivo
          </p>
          
          <!-- Instrucciones claras -->
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
            <h3 class="text-lg font-bold mb-3">🚀 ¿Cómo usar el menú?</h3>
            <ol class="list-decimal list-inside space-y-2 text-sm">
              <li>Presiona el botón <strong class="bg-white/20 px-2 py-1 rounded">☰</strong> en la esquina superior izquierda</li>
              <li>El menú se deslizará desde la izquierda</li>
              <li>Presiona el mismo botón para ocultarlo</li>
              <li>En móvil: toca fuera del menú para cerrar</li>
            </ol>
          </div>
          
          <div class="flex flex-wrap gap-4">
            <button @click="toggleDemo" class="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              Probar Menú Ahora
            </button>
            <NuxtLink to="/" class="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Ver Versión Original
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Demo interactiva del menú -->
    <section v-if="showDemo" class="py-12 bg-gray-50 border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900">🎮 Demo del Menú</h3>
              <button @click="showDemo = false" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 class="font-bold mb-3">Estado actual:</h4>
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-4 h-4 rounded-full" :class="menuState ? 'bg-green-500' : 'bg-red-500'"></div>
                  <span class="font-medium">{{ menuState ? 'Menú VISIBLE' : 'Menú OCULTO' }}</span>
                </div>
                
                <div class="space-y-4">
                  <button 
                    @click="toggleMenuState"
                    class="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-if="!menuState" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                    {{ menuState ? 'Ocultar Menú' : 'Mostrar Menú' }}
                  </button>
                  
                  <p class="text-sm text-gray-600">
                    Prueba también el botón real en la esquina superior izquierda de la página.
                  </p>
                </div>
              </div>
              
              <div class="border-l border-gray-200 pl-8">
                <h4 class="font-bold mb-3">Ventajas:</h4>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2">
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm">Más espacio para contenido</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm">Diseño más limpio</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-sm">Fácil acceso en móvil</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Contenido de ejemplo -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
          Contenido de Ejemplo
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-50 p-8 rounded-xl">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">¿Por qué este diseño?</h3>
            <p class="text-gray-600">
              El menú desplegable maximiza el espacio útil en pantallas pequeñas y ofrece una experiencia más inmersiva.
            </p>
          </div>
          
          <div class="bg-gray-50 p-8 rounded-xl">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Accesibilidad</h3>
            <p class="text-gray-600">
              Diseñado pensando en todos los usuarios, con atajos de teclado y navegación táctil optimizada.
            </p>
          </div>
          
          <div class="bg-gray-50 p-8 rounded-xl">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Seguro e Intuitivo</h3>
            <p class="text-gray-600">
              Los usuarios siempre saben dónde está el menú y cómo acceder a él, sin importar el dispositivo.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Llamada a la acción -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">¿Cuál prefieres?</h2>
        <p class="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Compara ambas versiones y elige la que mejor se adapte a las necesidades del portal.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/" 
            class="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            🔗 Versión con Sidebar Fijo
          </NuxtLink>
          <button 
            @click="toggleDemo"
            class="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            🎮 Probar Menú Desplegable
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
definePageMeta({
  layout: 'alternative'
})
const showDemo = ref(true)
const menuState = ref(false)

const toggleDemo = () => {
  showDemo.value = !showDemo.value
}

const toggleMenuState = () => {
  menuState.value = !menuState.value
  // Aquí podrías conectar con el estado real del sidebar si quisieras
}
</script>