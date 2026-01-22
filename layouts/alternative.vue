<!-- layouts/alternative.vue - VERSIÓN CORREGIDA -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow sticky top-0 z-40">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <!-- Botón para mostrar/ocultar sidebar - SIEMPRE VISIBLE -->
          <button 
            @click="toggleSidebar"
            class="p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100 lg:hidden"
            :title="sidebarOpen ? 'Ocultar menú' : 'Mostrar menú'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                v-if="!sidebarOpen" 
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          <!-- Botón para desktop también -->
          <button 
            @click="toggleSidebar"
            class="hidden lg:flex p-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-gray-100"
            :title="sidebarOpen ? 'Ocultar menú' : 'Mostrar menú'"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                v-if="!sidebarOpen" 
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">S</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Senado de Bolivia</h1>
              <p class="text-xs text-gray-500">Menú desplegable</p>
            </div>
          </div>
        </div>
        
        <!-- Indicador del estado del menú -->
        <div class="hidden lg:flex items-center gap-2 text-sm text-gray-500">
          <span v-if="sidebarOpen">Menú visible</span>
          <span v-else>Menú oculto</span>
          <div class="w-2 h-2 rounded-full" :class="sidebarOpen ? 'bg-green-500' : 'bg-gray-400'"></div>
        </div>
      </div>
    </header>
    
    <!-- Contenedor principal con flex -->
    <div class="flex relative">
      <!-- Sidebar - SIEMPRE EN EL FLOW EN DESKTOP, FIXED EN MÓVIL -->
      <aside 
        ref="sidebarRef"
        class="bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out"
        :class="[
          'h-[calc(100vh-73px)]', // Altura completa menos header
          'sticky top-[73px]', // Se queda pegado debajo del header
          'z-30', // Debajo del overlay
          sidebarOpen 
            ? 'w-64 translate-x-0 opacity-100' 
            : 'w-0 -translate-x-full lg:w-0 lg:translate-x-0 lg:opacity-0 lg:invisible'
        ]"
      >
        <!-- Contenido del sidebar -->
        <div class="w-64 h-full p-4">
          <!-- Navegación -->
          <nav>
            <ul class="space-y-2">
              <li v-for="item in navItems" :key="item.name">
                <NuxtLink 
                  :to="item.href"
                  class="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                  :class="{ 'bg-blue-50 text-blue-600': isActive(item.href) }"
                  @click="closeSidebarOnMobile"
                >
                  <span v-html="getIcon(item.icon)" class="w-5 h-5 flex-shrink-0"></span>
                  <span class="truncate">{{ item.name }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
          
          <!-- Separador -->
          <div class="my-6 border-t border-gray-200"></div>
          
          <!-- Información adicional -->
          <div class="space-y-3">
            <div class="p-3 bg-blue-50 rounded-lg">
              <h4 class="font-medium text-sm text-blue-700 mb-1">¿Necesitas ayuda?</h4>
              <p class="text-xs text-blue-600">contacto@senado.bo</p>
            </div>
            
            <div class="text-center">
              <button 
                @click="toggleSidebar"
                class="text-sm text-gray-500 hover:text-gray-700"
              >
                {{ sidebarOpen ? 'Ocultar menú' : 'Mostrar menú' }}
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      <!-- Overlay para móvil -->
      <div 
        v-if="sidebarOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
        @click="sidebarOpen = false"
      ></div>
      
      <!-- Contenido principal -->
      <main class="flex-1 min-w-0">
        <div class="container mx-auto px-4 py-8">
          <slot />
        </div>
        
        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8 mt-12">
          <div class="container mx-auto px-4">
            <div class="text-center">
              <p>© 2024 Senado Nacional de Bolivia</p>
              <p class="text-sm text-gray-300 mt-2">
                Menú desplegable - Presiona el botón ☰ para mostrar/ocultar
              </p>
              <div class="mt-4">
                <NuxtLink to="/" class="text-gray-400 hover:text-white">
                  ← Volver a versión con sidebar fijo
                </NuxtLink>
              </div>
            </div>
          </div>
        </footer>
      </main>
      
      <!-- Redes Sociales Fijas (Derecha) -->
      <div class="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <div class="flex flex-col gap-4 p-2 bg-white/90 backdrop-blur-sm rounded-l-lg shadow-lg border border-gray-200">
          <a 
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            :title="social.name"
            class="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <span v-html="social.svgIcon" class="w-5 h-5"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const sidebarRef = ref(null)
const sidebarOpen = ref(false) // Por defecto cerrado en ambas versiones

// Función para alternar sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  console.log('Sidebar estado:', sidebarOpen.value ? 'Abierto' : 'Cerrado')
}

// Cerrar sidebar en móvil al cambiar de ruta
const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
}

// Cerrar con tecla ESC
const handleKeydown = (e) => {
  if (e.key === 'Escape' && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

// Detectar clic fuera del sidebar en desktop
const handleClickOutside = (event) => {
  if (sidebarRef.value && 
      !sidebarRef.value.contains(event.target) && 
      !event.target.closest('button[title*="menú"]') &&
      window.innerWidth >= 1024 &&
      sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

// Setup event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('click', handleClickOutside)
})

// Cerrar sidebar al cambiar ruta en móvil
watch(() => route.path, () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
})

const navItems = [
  { name: 'Inicio', href: '/alternative', icon: 'home' },
  { name: 'La Institución', href: '/alternative/institucion', icon: 'building' },
  { name: 'Legisladores', href: '/alternative/legisladores', icon: 'users' },
  { name: 'Gestión Legislativa', href: '/alternative/gestion-legislativa', icon: 'book' },
  { name: 'Cultura y Patrimonio', href: '/alternative/cultura', icon: 'museum' },
  { name: 'Participación', href: '/alternative/participacion', icon: 'comments' },
  { name: 'Noticias', href: '/alternative/noticias', icon: 'newspaper' },
  { name: 'Contacto', href: '/alternative/contacto', icon: 'envelope' }
]

const socialLinks = [
  { 
    name: 'Twitter', 
    svgIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    url: '#' 
  },
  { 
    name: 'Facebook', 
    svgIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    url: '#' 
  },
  { 
    name: 'YouTube', 
    svgIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    url: '#' 
  }
]

const iconMap = {
  home: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>',
  building: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',
  users: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
  book: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',
  museum: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',
  comments: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>',
  newspaper: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>',
  envelope: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>'
}

const getIcon = (iconName) => {
  return iconMap[iconName] || iconMap.home
}

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
/* Animación suave para el sidebar */
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Asegurar que el contenido principal tenga espacio */
main {
  transition: margin-left 0.3s ease;
}

/* Estilos específicos para el botón */
button[title*="menú"]:hover {
  background-color: #f3f4f6;
}
</style>