<!-- layouts/alternative.vue - VERSIÓN MEJORADA CON COLORES CONSISTENTES -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    <!-- Header - Color consistente -->
    <header class="sticky top-0 z-50 bg-white shadow-lg border-b-2" :style="`border-color: ${sidebarOpen ? '#E4D294' : '#E03636'}`">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo y botón hamburguesa -->
          <div class="flex items-center gap-4">
            <!-- Botón hamburguesa -->
            <button
              @click="toggleSidebar"
              class="p-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden"
              :class="sidebarOpen 
                ? 'bg-[#E4D294] text-gray-800 shadow-lg' 
                : 'bg-[#E03636] text-white shadow-md hover:shadow-lg'"
              aria-label="Alternar menú"
            >
              <!-- Efecto de onda al hacer clic -->
              <div class="absolute inset-0 bg-white/20 rounded-xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <svg class="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                      d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                      d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center gap-3 no-underline group">
              <div class="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                <img 
                  src="/logo camsen.png" 
                  alt="Logo" 
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="ml-1">
                <h1 class="text-xl font-bold text-gray-800 group-hover:text-[#E03636] transition-colors duration-300">
                  Senado Nacional
                </h1>
                <p class="text-sm text-[#B1B1B1]">Estado Plurinacional de Bolivia</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Indicador de estado - Mejorado -->
          <div class="hidden md:flex items-center gap-3 px-4 py-2 rounded-full shadow-sm transition-all duration-300"
               :class="sidebarOpen 
                 ? 'bg-gradient-to-r from-[#E4D294]/20 to-[#E4D294]/10 border border-[#E4D294]/30' 
                 : 'bg-gradient-to-r from-[#E03636]/10 to-[#E03636]/5 border border-[#E03636]/20'">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full animate-pulse shadow-inner" 
                   :class="sidebarOpen ? 'bg-[#E4D294]' : 'bg-[#E03636]'"></div>
              <span class="text-sm font-medium" 
                    :class="sidebarOpen ? 'text-[#8B7355]' : 'text-[#E03636]'">
                {{ sidebarOpen ? 'Menú Visible' : 'Menú Oculto' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenedor principal -->
    <div class="flex">
      <!-- Sidebar desplegable - Mantiene colores claros -->
      <aside
        ref="sidebarRef"
        class="fixed lg:absolute top-0 left-0 h-screen z-40 transition-all duration-500 ease-out overflow-y-auto"
        :class="[
          sidebarOpen 
            ? 'w-80 translate-x-0 opacity-100 shadow-2xl' 
            : 'w-0 -translate-x-full opacity-0'
        ]"
        :style="sidebarOpen ? 'background: linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%);' : ''"
        :aria-hidden="!sidebarOpen"
      >
        <!-- Contenido del sidebar -->
        <div v-if="sidebarOpen" class="w-80 h-full flex flex-col py-6">
          <!-- Encabezado del sidebar -->
          <div class="px-6 py-4 mb-4">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-2xl font-bold text-[#E03636] flex items-center gap-2">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
                Navegación
              </h2>
              <button 
                @click="toggleSidebar"
                class="p-2 text-[#B1B1B1] hover:text-[#E03636] hover:bg-gray-100 rounded-lg transition-colors"
                title="Cerrar menú"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <p class="text-sm text-[#B1B1B1] pl-1">Selecciona una opción del menú</p>
          </div>

          <!-- Navegación con submenús -->
          <nav class="px-4 py-2 flex-1">
            <ul class="space-y-2">
              <!-- Inicio -->
              <li>
                <NuxtLink
                  to="/alternative"
                  class="menu-item group"
                  :class="isActive('/alternative') && !activeSubmenu ? 'menu-item-active' : ''"
                  @click="closeSidebarOnMobile"
                >
                  <div class="menu-item-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                  </div>
                  <span class="menu-item-text">Inicio</span>
                </NuxtLink>
              </li>

              <!-- La Institución (con submenú) -->
              <li>
                <button
                  @click="toggleSubmenu('institucion')"
                  class="menu-item group w-full flex items-center justify-between"
                  :class="activeSubmenu === 'institucion' ? 'menu-item-active' : ''"
                >
                  <div class="flex items-center gap-3">
                    <div class="menu-item-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <span class="menu-item-text">La Institución</span>
                  </div>
                  <svg class="w-4 h-4 transition-transform duration-300 mr-2" 
                       :class="activeSubmenu === 'institucion' ? 'rotate-90 text-[#E03636]' : 'text-[#B1B1B1]'" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                
                <!-- Submenú de La Institución -->
                <div v-if="activeSubmenu === 'institucion'" class="submenu">
                  <NuxtLink to="/alternative/institucion/mandato" class="submenu-item" @click="closeSidebarOnMobile">
                    <span class="submenu-bullet" style="background-color: #E03636;"></span>
                    Mandato Constitucional
                  </NuxtLink>
                  <NuxtLink to="/alternative/institucion/directiva" class="submenu-item" @click="closeSidebarOnMobile">
                    <span class="submenu-bullet" style="background-color: #E03636;"></span>
                    Directiva Camaral
                  </NuxtLink>
                  <NuxtLink to="/alternative/institucion/historia" class="submenu-item" @click="closeSidebarOnMobile">
                    <span class="submenu-bullet" style="background-color: #E03636;"></span>
                    Reseña Histórica
                  </NuxtLink>
                  <NuxtLink to="/alternative/institucion/galeria" class="submenu-item" @click="closeSidebarOnMobile">
                    <span class="submenu-bullet" style="background-color: #E03636;"></span>
                    Galería de Imágenes
                  </NuxtLink>
                </div>
              </li>

              <!-- Legisladores (con submenú) -->
              <li>
                <button
                  @click="toggleSubmenu('legisladores')"
                  class="menu-item group w-full flex items-center justify-between"
                  :class="activeSubmenu === 'legisladores' ? 'menu-item-active' : ''"
                >
                  <div class="flex items-center gap-3">
                    <div class="menu-item-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                      </svg>
                    </div>
                    <span class="menu-item-text">Legisladores</span>
                  </div>
                  <svg class="w-4 h-4 transition-transform duration-300 mr-2" 
                       :class="activeSubmenu === 'legisladores' ? 'rotate-90 text-[#E03636]' : 'text-[#B1B1B1]'" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
                
                <!-- Submenú de Legisladores -->
                <div v-if="activeSubmenu === 'legisladores'" class="submenu">
                  <NuxtLink to="/alternative/legisladores/directiva" class="submenu-item" @click="closeSidebarOnMobile">
                    <span class="submenu-bullet" style="background-color: #E4D294;"></span>
                    Directiva Camara de Senadores
                  </NuxtLink>
                  <NuxtLink to="/alternative/legisladores/comisiones" class="submenu-item" @click="closeSidebarOnMobile">
                    <span class="submenu-bullet" style="background-color: #E4D294;"></span>
                    Comisiones y Comités
                  </NuxtLink>
                  <NuxtLink to="/alternative/legisladores/brigadas" class="submenu-item" @click="closeSidebarOnMobile">
                    <span class="submenu-bullet" style="background-color: #E4D294;"></span>
                    Brigadas Parlamentarias
                  </NuxtLink>
                  <NuxtLink to="/alternative/legisladores/supraestatales" class="submenu-item" @click="closeSidebarOnMobile">
                    <span class="submenu-bullet" style="background-color: #E4D294;"></span>
                    Senadores Supraestatales
                  </NuxtLink>
                  <NuxtLink to="/alternative/legisladores/bancadas" class="submenu-item" @click="closeSidebarOnMobile">
                    <span class="submenu-bullet" style="background-color: #E4D294;"></span>
                    Bancadas Políticas
                  </NuxtLink>
                </div>
              </li>

              <!-- Items restantes del menú -->
              <li v-for="item in otherMenuItems" :key="item.name">
                <NuxtLink
                  :to="item.href"
                  class="menu-item group"
                  :class="isActive(item.href) ? 'menu-item-active' : ''"
                  @click="closeSidebarOnMobile"
                >
                  <div class="menu-item-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path v-html="item.iconPath" />
                    </svg>
                  </div>
                  <span class="menu-item-text">{{ item.name }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Redes Sociales en Sidebar -->
          <div class="px-6 py-6 mt-4 border-t border-gray-200">
            <h3 class="text-sm font-semibold text-[#E03636] mb-3 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
              Síguenos en redes
            </h3>
            <div class="flex gap-2">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                :title="social.name"
                class="social-icon"
                :style="`background: ${social.color};`"
              >
                <span v-html="social.svgIcon"></span>
              </a>
            </div>
          </div>

          <!-- Información de contacto -->
          <div class="px-6 py-4 bg-gradient-to-r from-[#E03636]/5 to-[#E4D294]/5 rounded-lg mx-4 mb-4 border border-[#E4D294]/30">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-lg bg-[#E03636] flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-[#E03636] mb-1">¿Necesitas ayuda?</h4>
                <p class="text-xs text-[#575756] mb-1">contacto@senado.bo</p>
                <p class="text-xs text-[#575756]">(591) 2 220-0000</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Overlay para móvil -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity duration-300 backdrop-blur-sm"
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
        <footer class="mt-12 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 pt-8">
          <div class="container mx-auto px-4 py-8">
            <!-- Redes Sociales en Footer -->
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-[#E03636] mb-6">Conéctate con nosotros</h3>
              <div class="flex justify-center gap-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  :title="social.name"
                  class="social-footer-icon"
                  :style="`background: ${social.color};`"
                >
                  <span v-html="social.svgIcon"></span>
                </a>
              </div>
            </div>

            <div class="text-center text-[#575756] border-t border-gray-300 pt-6">
              <p class="mb-2 text-lg font-medium text-gray-800">© 2024 Senado Nacional de Bolivia</p>
              <p class="text-sm mb-4 text-[#B1B1B1]">Todos los derechos reservados</p>
              <div class="flex flex-col sm:flex-row justify-center gap-3">
                <NuxtLink to="/" class="footer-link">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  Versión con sidebar fijo
                </NuxtLink>
                <span class="hidden sm:inline text-[#B1B1B1]">•</span>
                <button @click="toggleSidebar" class="footer-link">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="!sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  {{ sidebarOpen ? 'Ocultar menú' : 'Mostrar menú' }}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <!-- Redes Sociales Fijas (Derecha) -->
      <div class="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <div class="flex flex-col gap-3 p-3 bg-white/95 backdrop-blur-sm rounded-l-xl shadow-xl border border-gray-300">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            :title="social.name"
            class="social-sidebar-icon group"
            :style="`background: ${social.color};`"
          >
            <span v-html="social.svgIcon"></span>
            <span class="social-tooltip">{{ social.name }}</span>
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
const activeSubmenu = ref(null)

// Función para alternar sidebar
const toggleSidebar = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  sidebarOpen.value = !sidebarOpen.value
}

// Función para alternar submenús
const toggleSubmenu = (menu) => {
  if (activeSubmenu.value === menu) {
    activeSubmenu.value = null
  } else {
    activeSubmenu.value = menu
  }
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

// Items del menú
const otherMenuItems = [
  { name: 'Gestión Legislativa', href: '/alternative/gestion-legislativa', iconPath: 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"' },
  { name: 'Cultura y Patrimonio', href: '/alternative/cultura', iconPath: 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"' },
  { name: 'Participación', href: '/alternative/participacion', iconPath: 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"' },
  { name: 'Noticias', href: '/alternative/noticias', iconPath: 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"' },
  { name: 'Contacto', href: '/alternative/contacto', iconPath: 'stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"' }
]

// Redes sociales
const socialLinks = [
  {
    name: 'Twitter',
    svgIcon: '<svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    url: 'https://twitter.com/senadobolivia',
    color: '#1DA1F2'
  },
  {
    name: 'Facebook',
    svgIcon: '<svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    url: 'https://facebook.com/senadobolivia',
    color: '#1877F2'
  },
  {
    name: 'YouTube',
    svgIcon: '<svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    url: 'https://youtube.com/senadobolivia',
    color: '#FF0000'
  }
]

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
/* Estilos CSS personalizados para mantener colores primarios */

/* Header y botón */
header {
  border-bottom-width: 2px;
  transition: border-color 0.3s ease;
}

/* Sidebar - Fondo claro permanente */
aside {
  background: linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%);
  border-right: 2px solid #E4D294;
}

/* Items del menú */
.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  color: #575756;
  transition: all 0.3s ease;
  text-decoration: none;
  margin: 0.25rem 0;
}

.menu-item:hover {
  background: linear-gradient(to right, #E03636/10, #E4D294/10);
  color: #E03636;
  transform: translateX(4px);
}

.menu-item-active {
  background: linear-gradient(to right, #E03636, #C12F2F);
  color: white;
  box-shadow: 0 4px 12px rgba(224, 54, 54, 0.2);
}
.menu-item-active:hover {
  color: #E4D294;
}

.menu-item-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.menu-item-active .menu-item-icon {
  color: white;
}

.menu-item-text {
  font-weight: 500;
  flex: 1;
}

/* Submenús */
.submenu {
  margin-left: 2.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  animation: slideDown 0.3s ease-out;
}

.submenu-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #575756;
  text-decoration: none;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  margin: 0.25rem 0;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submenu-item:hover {
  background-color: #F3F4F6;
  color: #E03636;
  transform: translateX(2px);
}

.submenu-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Iconos de redes sociales */
.social-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.social-footer-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-footer-icon:hover {
  transform: translateY(-3px) scale(1.15);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.social-sidebar-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-sidebar-icon:hover {
  transform: scale(1.15);
}

.social-tooltip {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #E03636;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  margin-right: 0.5rem;
}

.social-sidebar-icon:hover .social-tooltip {
  opacity: 1;
}

/* Enlaces del footer */
.footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #575756;
  text-decoration: none;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  background: transparent;
  border: none;
  cursor: pointer;
}

.footer-link:hover {
  color: #E03636;
  background-color: #F3F4F6;
}

/* Animaciones */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scrollbar personalizada */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #E03636, #E4D294);
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #C12F2F, #D4BC7A);
}

/* Responsive */
@media (max-width: 1023px) {
  aside {
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .social-tooltip {
    display: none;
  }
}
</style>