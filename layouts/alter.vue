<!-- layouts/alternative.vue - CORREGIDO -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header con botón de menú -->
    <header class="bg-white shadow-sm border-b sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo y botón hamburguesa -->
          <div class="flex items-center gap-4">
            <!-- Botón hamburguesa - ESTO ES IMPORTANTE -->
            <button
              @click="toggleSidebar"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors group"
              :class="sidebarOpen ? 'text-blue-600 bg-blue-50' : 'text-gray-700'"
              aria-label="Alternar menú"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Logo -->
            <NuxtLink to="/alternative" class="flex items-center gap-3 no-underline group">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <span class="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Senado Nacional</h1>
                <p class="text-xs text-gray-500">Bolivia</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Indicador de estado -->
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
            <div class="w-2 h-2 rounded-full animate-pulse" :class="sidebarOpen ? 'bg-green-500' : 'bg-gray-400'"></div>
            <span class="text-sm font-medium" :class="sidebarOpen ? 'text-green-600' : 'text-gray-600'">
              {{ sidebarOpen ? 'Menú abierto' : 'Menú cerrado' }}
            </span>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenedor principal -->
    <div class="flex">
      <!-- Sidebar desplegable desde la izquierda -->
      <aside
        ref="sidebarRef"
        class="fixed lg:absolute top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-xl z-40 transition-all duration-300 ease-in-out overflow-y-auto"
        :class="[
          sidebarOpen 
            ? 'w-72 translate-x-0 opacity-100' 
            : 'w-0 -translate-x-full opacity-0'
        ]"
        :aria-hidden="!sidebarOpen"
      >
        <!-- Contenido del sidebar -->
        <div v-if="sidebarOpen" class="w-72 h-full flex flex-col py-4">
          <!-- Encabezado del sidebar -->
          <div class="px-6 py-4 border-b border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-1">Menú Principal</h2>
            <p class="text-sm text-gray-500">Navegación completa</p>
          </div>

          <!-- Navegación -->
          <nav class="px-4 py-4 flex-1">
            <ul class="space-y-1">
              <li v-for="item in navItems" :key="item.name">
                <NuxtLink
                  :to="item.href"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  :class="isActive(item.href) 
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-300'"
                  @click="closeSidebarOnMobile"
                >
                  <!-- Iconos corregidos -->
                  <div class="flex-shrink-0 w-5 h-5" :class="isActive(item.href) ? 'text-blue-600' : 'text-gray-500'">
                    <svg v-if="item.icon === 'home'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <svg v-else-if="item.icon === 'building'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <svg v-else-if="item.icon === 'users'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <svg v-else-if="item.icon === 'book'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                    <svg v-else-if="item.icon === 'museum'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <svg v-else-if="item.icon === 'comments'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                    <svg v-else-if="item.icon === 'newspaper'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                    <svg v-else-if="item.icon === 'envelope'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span class="font-medium flex-1">{{ item.name }}</span>
                  <span v-if="item.badge" class="ml-2 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-600 rounded-full">
                    {{ item.badge }}
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Redes Sociales en Sidebar -->
          <div class="px-6 py-4 border-t border-gray-100">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">Síguenos</h3>
            <div class="flex gap-2">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                :title="social.name"
                class="flex-1 p-3 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors flex flex-col items-center justify-center gap-1"
              >
                <div class="w-5 h-5">
                  <!-- Twitter SVG -->
                  <svg v-if="social.name === 'Twitter'" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <!-- Facebook SVG -->
                  <svg v-else-if="social.name === 'Facebook'" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <!-- YouTube SVG -->
                  <svg v-else-if="social.name === 'YouTube'" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <span class="text-xs font-medium">{{ social.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      <!-- Overlay para móvil -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300"
        @click="sidebarOpen = false"
        aria-label="Cerrar menú"
      ></div>

      <!-- Contenido principal -->
      <main
        class="flex-1 min-w-0 transition-all duration-300"
        :class="sidebarOpen ? 'lg:ml-0' : ''"
      >
        <div class="container mx-auto px-4 py-8">
          <slot />
        </div>

        <!-- Footer -->
        <footer class="bg-gray-900 text-white mt-12">
          <div class="container mx-auto px-4 py-12">
            <!-- Redes Sociales en Footer -->
            <div class="text-center mb-8">
              <h3 class="text-xl font-bold mb-6">Síguenos en nuestras redes sociales</h3>
              <div class="flex justify-center gap-6">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  :title="social.name"
                  class="p-4 bg-gray-800 hover:bg-blue-600 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                  <!-- SVG Inline -->
                  <svg v-if="social.name === 'Twitter'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <svg v-else-if="social.name === 'Facebook'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <svg v-else-if="social.name === 'YouTube'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div class="text-center text-gray-400 border-t border-gray-800 pt-6">
              <p class="mb-2 text-lg font-medium">© 2024 Senado Nacional de Bolivia</p>
              <p class="text-sm mb-4">Todos los derechos reservados</p>
              <div class="flex justify-center gap-4">
                <NuxtLink to="/" class="text-blue-300 hover:text-white underline flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  Versión con sidebar fijo
                </NuxtLink>
                <span class="text-gray-600">•</span>
                <button @click="toggleSidebar" class="text-blue-300 hover:text-white underline">
                  {{ sidebarOpen ? 'Ocultar menú' : 'Mostrar menú' }}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <!-- Redes Sociales Fijas (Derecha) -->
      <div class="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <div class="flex flex-col gap-4 p-3 bg-white/95 backdrop-blur-sm rounded-l-xl shadow-2xl border border-gray-300">
          <div class="px-2">
            <p class="text-xs font-semibold text-gray-700 mb-2">Redes Sociales</p>
          </div>
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            :title="social.name"
            class="p-3 text-gray-600 hover:text-white hover:bg-blue-600 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg flex flex-col items-center gap-1 group"
          >
            <!-- SVG Inline -->
            <svg v-if="social.name === 'Twitter'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <svg v-else-if="social.name === 'Facebook'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <svg v-else-if="social.name === 'YouTube'" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span class="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"> 
              {{ social.name }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const sidebarRef = ref(null)
const sidebarOpen = ref(false)

// Función para alternar sidebar - CORREGIDA
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  console.log('Sidebar estado:', sidebarOpen.value ? 'ABIERTO' : 'CERRADO')
}

// Cerrar sidebar en móvil al cambiar de ruta
const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
}

// Manejar tecla ESC
const handleKeydown = (e) => {
  if (e.key === 'Escape' && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

// Setup event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Datos de navegación
const navItems = [
  { name: 'Inicio', href: '/alternative', icon: 'home', badge: '★' },
  { name: 'La Institución', href: '/alternative/institucion', icon: 'building' },
  { name: 'Legisladores', href: '/alternative/legisladores', icon: 'users', badge: '36' },
  { name: 'Gestión Legislativa', href: '/alternative/gestion-legislativa', icon: 'book', badge: '24' },
  { name: 'Cultura y Patrimonio', href: '/alternative/cultura', icon: 'museum' },
  { name: 'Participación Ciudadana', href: '/alternative/participacion', icon: 'comments' },
  { name: 'Noticias y Prensa', href: '/alternative/noticias', icon: 'newspaper', badge: 'Nuevo' },
  { name: 'Contacto', href: '/alternative/contacto', icon: 'envelope' }
]

// Redes sociales con URLs
const socialLinks = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/senadobolivia'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/senadobolivia'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/senadobolivia'
  }
]

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
/* Estilos para el sidebar */
aside {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scrollbar personalizado */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: #f1f1f1;
}

aside::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>