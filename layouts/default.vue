<template>
  <div class="min-h-screen">
    <!-- Header fijo y completamente transparente -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <!-- Línea roja superior -->
      <div class="h-1 bg-gradient-to-r from-[#E03636] to-[#E03636]"></div>
      
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
      
      <!-- Menú lateral - CAMBIADO A NEGRO -->
      <aside 
        :class="[
          'absolute left-0 w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-gray-700/50',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
        :style="{ top: '56px', height: 'calc(100vh - 56px)' }"
      >
        

        <!-- Navegación principal -->
        <div class="p-4 overflow-y-auto h-[calc(100%-140px)]">
          <!-- Menú de Constitución -->
          <div class="mb-3">
            <button 
              @click="toggleConstitution"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
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
              class="ml-9 mt-2 mb-3 space-y-2 border-l border-gray-600/50 pl-3"
            >
              <NuxtLink 
                to="/alternative/constitucion/texto-completo" 
                class="block py-2 px-3 rounded hover:bg-gray-700/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                📜 Texto Completo
              </NuxtLink>
              <NuxtLink 
                to="/alternative/constitucion/historia" 
                class="block py-2 px-3 rounded hover:bg-gray-700/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                📚 Historia
              </NuxtLink>
              <NuxtLink 
                to="/alternative/constitucion/reformas" 
                class="block py-2 px-3 rounded hover:bg-gray-700/30 transition-colors text-sm"
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
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
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
              class="ml-9 mt-2 mb-3 space-y-2 border-l border-gray-600/50 pl-3"
            >
              <NuxtLink 
                to="/alternative/legisladores/senadores" 
                class="block py-2 px-3 rounded hover:bg-gray-700/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                👨‍⚖️ Senadores
              </NuxtLink>
              <NuxtLink 
                to="/alternative/legisladores/diputados" 
                class="block py-2 px-3 rounded hover:bg-gray-700/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                👩‍⚖️ Diputados
              </NuxtLink>
              <NuxtLink 
                to="/alternative/legisladores/comisiones" 
                class="block py-2 px-3 rounded hover:bg-gray-700/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                📋 Comisiones
              </NuxtLink>
              <NuxtLink 
                to="/alternative/legisladores/grupos-parlamentarios" 
                class="block py-2 px-3 rounded hover:bg-gray-700/30 transition-colors text-sm"
                @click="sidebarOpen = false"
              >
                👥 Grupos Parlamentarios
              </NuxtLink>
            </div>
          </div>

          <!-- Enlaces directos -->
          <NuxtLink 
            to="/alternative/gestion-legislativa" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors mb-2"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="font-medium">Gestión Legislativa</span>
          </NuxtLink>

          <NuxtLink 
            to="/alternative/noticias" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors mb-2"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            <span class="font-medium">Noticias</span>
          </NuxtLink>

          <NuxtLink 
            to="/alternative/transparencia" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors mb-2"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"></path>
            </svg>
            <span class="font-medium">Transparencia</span>
          </NuxtLink>

          <NuxtLink 
            to="/alternative/participacion" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors mb-2"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
            </svg>
            <span class="font-medium">Participación</span>
          </NuxtLink>

          <NuxtLink 
            to="/alternative/contacto" 
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
            @click="sidebarOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <span class="font-medium">Contacto</span>
          </NuxtLink>
          
          
        </div>

        <!-- Pie del sidebar - CAMBIADO A NEGRO -->
        <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50 bg-gray-800/50">
          <div class="flex items-center justify-between">
            <p class="text-gray-300 text-sm"></p>
            <button 
              @click="sidebarOpen = false"
              class="text-gray-300 hover:text-white text-sm transition-colors px-3 py-1 rounded hover:bg-gray-700/50"
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
    
    <!-- Widget de Redes Sociales Flotante - AGREGADO como en el segundo código -->
    <div class="hidden lg:block fixed right-1 top-1/2 transform -translate-y-1/2 z-40">
      <div class="flex flex-col gap-3">
        <div class="relative group">
          <div class="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap translate-x-2 group-hover:translate-x-0">
            Redes Sociales
          </div>
          <div class="w-12 h-12 rounded-xl bg-white shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            <div class="relative">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <a v-for="(social, index) in socialLinks" :key="social.name"
           :href="social.url" target="_blank" :title="social.name"
           class="social-floating-btn transform transition-all duration-300 hover:-translate-x-1 relative"
           :style="`
             background: ${social.color};
             animation-delay: ${index * 0.1}s;
           `"
           :class="{ 'animate-bounce-in': sidebarOpen }">
          <span v-html="social.svgIcon"></span>
          <div class="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </div>
    </div>
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

// Redes sociales - IGUAL que en el segundo código
const socialLinks = [
  {
    name: 'Twitter',
    svgIcon: '<svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    url: '#',
    color: '#1DA1F2'
  },
  {
    name: 'Facebook',
    svgIcon: '<svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    url: '#',
    color: '#1877F2'
  },
  {
    name: 'YouTube',
    svgIcon: '<svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    url: '#',
    color: '#FF0000'
  },
  {
    name: 'Instagram',
    svgIcon: '<svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    url: '#',
    color: '#E1306C'
  }
]
</script>

<style scoped>
/* Asegurar header transparente */
header {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

/* Asegurar que el contenido esté debajo */
main {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

/* Estilos para enlaces activos - CAMBIADO A GRIS */
.router-link-active {
  @apply bg-gray-700/70;
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

/* Animaciones para redes sociales */
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.animate-bounce-in {
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Estilos para botones de redes sociales */
.social-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.social-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.social-floating-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.social-floating-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.7s;
}

.social-floating-btn:hover::before {
  left: 100%;
}

.social-floating-btn:hover {
  transform: translateX(-6px) scale(1.05);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
}

.social-floating-btn:hover {
  filter: brightness(1.1);
}
</style>