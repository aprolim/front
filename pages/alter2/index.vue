<!-- pages/alternative/index.vue - Página principal del layout alternativo -->
<template>
  <div>
    <!-- Hero Section con instrucciones -->
    <section class="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden rounded-b-3xl mb-12">
      <div class="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
      <div class="relative container mx-auto px-4 py-20">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Indicador del layout -->
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <svg class="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span class="text-sm font-medium">MENÚ DESPLEGABLE ACTIVADO</span>
          </div>
          
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Senado Nacional de Bolivia
            <span class="block text-2xl md:text-3xl font-normal mt-4 text-blue-200">
              Versión con Menú Desplegable
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
            Esta versión utiliza un menú lateral que se despliega desde la izquierda, optimizando el espacio y ofreciendo una experiencia más moderna.
          </p>
          
          <!-- Instrucciones interactivas -->
          <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
            <h3 class="text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              ¿Cómo usar el menú?
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="font-bold">1</span>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Presiona el botón</h4>
                  <p class="text-sm opacity-80">Haz clic en ☰ en la esquina superior izquierda</p>
                </div>
              </div>
              <div class="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="font-bold">2</span>
                </div>
                <div>
                  <h4 class="font-semibold mb-1">Navega libremente</h4>
                  <p class="text-sm opacity-80">El menú se deslizará mostrando todas las opciones</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex flex-wrap gap-4 justify-center">
            <button @click="toggleMenu" class="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              Probar Menú Desplegable
            </button>
            <NuxtLink to="/" class="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all transform hover:scale-105 flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Volver a Versión Clásica
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Características del layout -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          Ventajas del Menú Desplegable
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg border border-blue-100">
            <div class="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Más Espacio Útil</h3>
            <p class="text-gray-600">
              El menú se oculta cuando no se usa, liberando espacio valioso para el contenido principal en pantallas de todos los tamaños.
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-lg border border-green-100">
            <div class="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Experiencia Moderna</h3>
            <p class="text-gray-600">
              Sigue las tendencias de diseño web actuales, similares al Senado de Francia, ofreciendo una navegación intuitiva y elegante.
            </p>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl shadow-lg border border-purple-100">
            <div class="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 text-gray-900">Totalmente Responsivo</h3>
            <p class="text-gray-600">
              Optimizado para móviles, tablets y desktop. El menú se adapta perfectamente a cada dispositivo con transiciones fluidas.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contenido de ejemplo -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Ejemplo de noticias -->
          <div class="mb-12">
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-3xl font-bold text-gray-900">Últimas Noticias</h2>
              <NuxtLink to="/alternative/noticias" class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                Ver todas
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </NuxtLink>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <div class="p-6">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Sesión Plenaria</span>
                    <span class="text-gray-500 text-sm">15 Ene 2024</span>
                  </div>
                  <h3 class="text-lg font-bold mb-3 text-gray-900">Aprobación de Ley de Presupuesto 2024</h3>
                  <p class="text-gray-600 mb-4">El Senado aprobó el proyecto de ley de presupuesto general del Estado para el ejercicio fiscal 2024.</p>
                  <button class="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2">
                    Leer más
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="h-48 bg-gradient-to-r from-green-500 to-green-600"></div>
                <div class="p-6">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Comisión</span>
                    <span class="text-gray-500 text-sm">12 Ene 2024</span>
                  </div>
                  <h3 class="text-lg font-bold mb-3 text-gray-900">Reforma al Código Procesal Civil</h3>
                  <p class="text-gray-600 mb-4">Comisión de Justicia analiza propuestas de modificación al código procesal civil boliviano.</p>
                  <button class="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2">
                    Leer más
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div class="h-48 bg-gradient-to-r from-purple-500 to-purple-600"></div>
                <div class="p-6">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">Cultura</span>
                    <span class="text-gray-500 text-sm">10 Ene 2024</span>
                  </div>
                  <h3 class="text-lg font-bold mb-3 text-gray-900">Exposición de Arte Nacional</h3>
                  <p class="text-gray-600 mb-4">Inauguración de la exposición "Patrimonio Cultural Boliviano" en las instalaciones del Senado.</p>
                  <button class="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2">
                    Leer más
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Enlaces rápidos -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h2 class="text-2xl font-bold mb-6 text-center">Acceso Rápido</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <NuxtLink to="/alternative/legisladores" class="bg-white/10 hover:bg-white/20 p-4 rounded-xl text-center transition-colors">
                <div class="w-10 h-10 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium">Legisladores</span>
              </NuxtLink>
              
              <NuxtLink to="/alternative/gestion-legislativa" class="bg-white/10 hover:bg-white/20 p-4 rounded-xl text-center transition-colors">
                <div class="w-10 h-10 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium">Proyectos</span>
              </NuxtLink>
              
              <NuxtLink to="/alternative/participacion" class="bg-white/10 hover:bg-white/20 p-4 rounded-xl text-center transition-colors">
                <div class="w-10 h-10 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium">Participa</span>
              </NuxtLink>
              
              <NuxtLink to="/alternative/contacto" class="bg-white/10 hover:bg-white/20 p-4 rounded-xl text-center transition-colors">
                <div class="w-10 h-10 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <span class="text-sm font-medium">Contacto</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparación de layouts -->
    <section class="py-16 bg-white border-t border-gray-200">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-900">
          Compara Ambos Layouts
        </h2>
        
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Layout alternativo -->
            <div class="bg-gradient-to-b from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-200">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-blue-700">Menú Desplegable</h3>
              </div>
              
              <ul class="space-y-3 mb-8">
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-gray-700">Menú se oculta automáticamente</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-gray-700">Más espacio para contenido</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-gray-700">Diseño moderno e innovador</span>
                </li>
              </ul>
              
              <div class="text-center">
                <NuxtLink to="/alternative" class="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Usar esta versión
                </NuxtLink>
              </div>
            </div>
            
            <!-- Layout clásico -->
            <div class="bg-gradient-to-b from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-200">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-700">Sidebar Fijo</h3>
              </div>
              
              <ul class="space-y-3 mb-8">
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-gray-700">Navegación siempre visible</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-gray-700">Acceso rápido a todas las secciones</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-gray-700">Diseño clásico y familiar</span>
                </li>
              </ul>
              
              <div class="text-center">
                <NuxtLink to="/" class="inline-block px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors">
                  Volver a clásico
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
definePageMeta({
  layout: 'alternativ'
})
const toggleMenu = () => {
  // Esta función podría conectarse con el estado del sidebar si es necesario
  console.log('Toggle menu clicked - connected to sidebar state')
}
</script>