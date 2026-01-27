<template>
  <div class="min-h-screen">
    <!-- Header fijo y completamente transparente -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <!-- Línea roja superior -->
      <div class="h-1 bg-gradient-to-r from-red-600 to-red-800"></div>
      
      <!-- Contenedor del header con altura fija -->
      <div class="h-14 bg-transparent flex items-center px-4">
        <!-- Botón del menú hamburguesa -->
        <button 
          @click="toggleSidebar"
          class="p-2 rounded-lg hover:bg-white/20 transition-colors relative z-50"
          aria-label="Toggle menu"
        >
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </header>

    <!-- Sidebar (menú desplegable) -->
    <div 
      :class="[
        'fixed inset-0 z-40 transition-all duration-300',
        sidebarOpen ? 'visible' : 'invisible'
      ]"
    >
      <!-- Overlay sutil -->
      <div 
        :class="[
          'absolute inset-0 transition-opacity duration-300',
          sidebarOpen ? 'bg-black/30' : 'bg-transparent'
        ]"
        @click="sidebarOpen = false"
      ></div>
      
      <!-- Menú lateral - CORREGIDO: empieza DESPUÉS del header completo -->
      <aside 
        :class="[
          'absolute left-0 w-72 bg-gradient-to-b from-red-700 via-red-800 to-red-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-red-600/50',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
        :style="{ top: '56px', height: 'calc(100vh - 56px)' }"
      >
        <!-- Encabezado del sidebar -->
        <div class="p-5 border-b border-red-600/50 bg-red-800/30">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <svg class="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </div>
            <div>
              <h2 class="font-bold text-lg">Menú de Navegación</h2>
              <p class="text-red-200 text-xs">Senado Nacional</p>
            </div>
          </div>
        </div>

        <!-- Navegación principal -->
        <div class="p-4 overflow-y-auto h-[calc(100%-140px)]">
          <!-- Menú de Constitución -->
          <div class="mb-3">
            <button 
              @click="toggleConstitution"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-600/50 transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="font-medium">Constitución</span>
              </div>
              <svg 
                class="w-5 h-5 transition-transform duration-200"
                :class="{ 'rotate-180': constitutionOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              v-if="constitutionOpen"
              class="ml-9 mt-2 mb-3 space-y-2 border-l border-red-600/50 pl-3"
            >
              <NuxtLink 
                to="/alternative/constitucion/texto-completo" 
                class="block py-2 px-3 rounded hover:bg-red-600/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                📜 Texto Completo
              </NuxtLink>
              <NuxtLink 
                to="/alternative/constitucion/historia" 
                class="block py-2 px-3 rounded hover:bg-red-600/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                📚 Historia
              </NuxtLink>
              <NuxtLink 
                to="/alternative/constitucion/reformas" 
                class="block py-2 px-3 rounded hover:bg-red-600/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                🔄 Reformas
              </NuxtLink>
            </div>
          </div>

          <!-- Menú de Legisladores -->
          <div class="mb-3">
            <button 
              @click="toggleLegislators"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-600/50 transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                <span class="font-medium">Legisladores</span>
              </div>
              <svg 
                class="w-5 h-5 transition-transform duration-200"
                :class="{ 'rotate-180': legislatorsOpen }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div 
              v-if="legislatorsOpen"
              class="ml-9 mt-2 mb-3 space-y-2 border-l border-red-600/50 pl-3"
            >
              <NuxtLink 
                to="/alternative/legisladores/senadores" 
                class="block py-2 px-3 rounded hover:bg-red-600/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                👨‍⚖️ Senadores
              </NuxtLink>
              <NuxtLink 
                to="/alternative/legisladores/diputados" 
                class="block py-2 px-3 rounded hover:bg-red-600/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                👩‍⚖️ Diputados
              </NuxtLink>
              <NuxtLink 
                to="/alternative/legisladores/comisiones" 
                class="block py-2 px-3 rounded hover:bg-red-600/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                📋 Comisiones
              </NuxtLink>
              <NuxtLink 
                to="/alternative/legisladores/grupos-parlamentarios" 
                class="block py-2 px-3 rounded hover:bg-red-600/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                👥 Grupos Parlamentarios
              </NuxtLink>
            </div>
          </div>

          <!-- Enlaces directos -->
          <NuxtLink 
            to="/alternative/gestion-legislativa" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600/50 transition-colors mb-2"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="font-medium">Gestión Legislativa</span>
          </NuxtLink>

          <NuxtLink 
            to="/alternative/noticias" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600/50 transition-colors mb-2"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            <span class="font-medium">Noticias</span>
          </NuxtLink>

          <NuxtLink 
            to="/alternative/transparencia" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600/50 transition-colors mb-2"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
            </svg>
            <span class="font-medium">Transparencia</span>
          </NuxtLink>

          <NuxtLink 
            to="/alternative/participacion" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600/50 transition-colors mb-2"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg>
            <span class="font-medium">Participación</span>
          </NuxtLink>

          <NuxtLink 
            to="/alternative/contacto" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600/50 transition-colors"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span class="font-medium">Contacto</span>
          </NuxtLink>
        </div>

        <!-- Pie del sidebar -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-red-600/50 bg-red-800/30">
          <div class="flex items-center justify-between">
            <p class="text-red-200 text-sm">Senado Nacional</p>
            <button 
              @click="sidebarOpen = false"
              class="text-red-200 hover:text-white text-sm transition-colors px-3 py-1 rounded hover:bg-red-700/50"
            >
              ✕ Cerrar
            </button>
          </div>
        </div>
      </aside>
    </div>

    <!-- Contenido principal -->
    <main class="relative z-10 pt-0">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)
const constitutionOpen = ref(false)
const legislatorsOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleConstitution = () => {
  constitutionOpen.value = !constitutionOpen.value
}

const toggleLegislators = () => {
  legislatorsOpen.value = !legislatorsOpen.value
}

// Cerrar menú con tecla Escape
const onEscape = (e) => {
  if (e.key === 'Escape') {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onEscape)
})
</script>

<style scoped>
/* Asegurar header transparente */
header {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* El header tiene: línea roja (4px) + contenido (56px) = 60px total */
/* El menú empieza a los 56px (después del contenido del header) */

/* Asegurar que el contenido esté debajo */
main {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

/* Estilos para enlaces activos */
.router-link-active {
  @apply bg-red-600/70;
}

/* Scrollbar personalizado */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>