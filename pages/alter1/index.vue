<!-- pages/index.vue - SIN PRIMEVUE -->
<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative container mx-auto px-4 py-20">
        <div class="max-w-3xl">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Senado Nacional de Bolivia
          </h1>
          <p class="text-xl md:text-2xl opacity-90 mb-8">
            Espacio de participación, información e interacción entre el Senado y la ciudadanía
          </p>
          <div class="flex flex-wrap gap-4">
            <button class="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Participar Activamente
            </button>
            <button class="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Conocer Proyectos
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Estadísticas -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
          Actividad del Senado en Cifras
          <span class="block text-lg font-normal text-gray-600 mt-2">
            (Sesión Ordinaria 2024)
          </span>
        </h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center p-6 rounded-xl transition-transform hover:scale-105 bg-blue-50">
            <div class="text-5xl font-bold mb-4 text-blue-700">24</div>
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p class="text-sm font-medium text-blue-700 opacity-90">Textos adoptados</p>
          </div>
          
          <div class="text-center p-6 rounded-xl transition-transform hover:scale-105 bg-green-50">
            <div class="text-5xl font-bold mb-4 text-green-700">1,850</div>
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <p class="text-sm font-medium text-green-700 opacity-90">Amendements adoptés</p>
          </div>
          
          <div class="text-center p-6 rounded-xl transition-transform hover:scale-105 bg-purple-50">
            <div class="text-5xl font-bold mb-4 text-purple-700">340</div>
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p class="text-sm font-medium text-purple-700 opacity-90">Heures de séance</p>
          </div>
          
          <div class="text-center p-6 rounded-xl transition-transform hover:scale-105 bg-orange-50">
            <div class="text-5xl font-bold mb-4 text-orange-700">420</div>
            <div class="flex justify-center mb-4">
              <svg class="w-12 h-12 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <p class="text-sm font-medium text-orange-700 opacity-90">Heures de commissions</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Secciones Principales -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
          Nuestros Servicios
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Institución -->
          <div class="bg-white rounded-xl shadow-lg p-8 h-full transition-all hover:shadow-2xl hover:-translate-y-1">
            <div class="w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-blue-600">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Institución</h3>
            <p class="text-gray-600 mb-4">Conoce el mandato constitucional, directiva cameral, reseña histórica y galería de imágenes.</p>
            <div class="flex items-center text-blue-600 font-medium">
              <span>Ver más</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </div>
          
          <!-- Legisladores -->
          <div class="bg-white rounded-xl shadow-lg p-8 h-full transition-all hover:shadow-2xl hover:-translate-y-1">
            <div class="w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-green-600">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Legisladores</h3>
            <p class="text-gray-600 mb-4">Directiva, comisiones y comités, brigadas parlamentarias, bancadas políticas.</p>
            <div class="flex items-center text-blue-600 font-medium">
              <span>Ver más</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </div>
          
          <!-- Gestión Legislativa -->
          <div class="bg-white rounded-xl shadow-lg p-8 h-full transition-all hover:shadow-2xl hover:-translate-y-1">
            <div class="w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-purple-600">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Gestión Legislativa</h3>
            <p class="text-gray-600 mb-4">Sesiones del pleno, proyectos de leyes, gaceta legislativa.</p>
            <div class="flex items-center text-blue-600 font-medium">
              <span>Ver más</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="text-center mt-12 pt-8 border-t border-gray-200">
    <h3 class="text-xl font-bold mb-4">¿Prefieres otro estilo?</h3>
    <NuxtLink 
      to="/alternative" 
      class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
      Ver versión con menú desplegable
    </NuxtLink>
  </div>
  <div class="text-center mt-12 pt-8 border-t border-gray-200">
    <h3 class="text-xl font-bold mb-4">¿Prefieres otro estilo?</h3>
    <NuxtLink 
      to="/alternativ" 
      class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
      </svg>
      Ver versión con menú desplegable
    </NuxtLink>
  </div>
  <div class="text-center mt-12 pt-8 border-t border-gray-200">
    <h3 class="text-xl font-bold mb-4">¿Prefieres otro estilo?</h3>
    <NuxtLink 
      to="/alter" 
      class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
      Ver versión con menú desplegable
    </NuxtLink>
  </div>
</template>

<script setup>
// Página funcional sin PrimeVue
</script>