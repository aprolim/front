<!-- layouts/elegant.vue - DISEÑO ELEGANTE CON COLORES PRIMARIOS -->
<template>
  <div class="min-h-screen bg-white">
    <!-- Header minimalista -->
    <header class="sticky top-0 z-50 bg-white border-b" 
            :style="`border-color: ${sidebarOpen ? '#E4D294' : '#E03636'}`">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo y botón hamburguesa -->
          <div class="flex items-center gap-4">
            <!-- Botón hamburguesa elegante -->
            <button
              @click="toggleSidebar"
              class="relative p-3 rounded-xl transition-all duration-300 hover:shadow-lg group"
              :class="sidebarOpen 
                ? 'bg-[#E4D294]/20 text-[#E03636] border border-[#E4D294]/50' 
                : 'bg-[#E03636] text-white border border-[#E03636]'"
              aria-label="Alternar menú"
            >
              <div class="relative z-10 flex flex-col items-center justify-center w-6 h-6">
                <span class="absolute h-0.5 w-4 bg-current transform transition-all duration-300"
                      :class="sidebarOpen ? 'rotate-45 top-1/2 -translate-y-1/2' : 'top-1'"></span>
                <span class="absolute h-0.5 w-4 bg-current transition-all duration-300"
                      :class="sidebarOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2'"></span>
                <span class="absolute h-0.5 w-4 bg-current transform transition-all duration-300"
                      :class="sidebarOpen ? '-rotate-45 top-1/2 -translate-y-1/2' : 'bottom-1'"></span>
              </div>
            </button>

            <!-- Logo elegante -->
            <NuxtLink to="/" class="flex items-center gap-4 no-underline group">
              <div class="relative">
                <div class="w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <div class="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img 
                      src="/logo camsen.png" 
                      alt="Logo" 
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#E4D294] border-2 border-white shadow-md"></div>
              </div>
              <div class="ml-1">
                <h1 class="text-xl font-bold text-gray-800 group-hover:text-[#E03636] transition-colors duration-300">
                  Senado Nacional
                </h1>
                <p class="text-xs text-[#B1B1B1] font-medium tracking-wide">Bolivia</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Indicador minimalista -->
          <div class="hidden lg:flex items-center">
            <div class="relative">
              <div class="text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300"
                   :class="sidebarOpen 
                     ? 'text-[#E03636] bg-[#E4D294]/10' 
                     : 'text-white bg-[#E03636]'">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full animate-pulse"
                       :class="sidebarOpen ? 'bg-[#E4D294]' : 'bg-white'"></div>
                  <span>{{ sidebarOpen ? 'Navegación' : 'Menú' }}</span>
                </div>
              </div>
              <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45"
                   :class="sidebarOpen ? 'bg-[#E4D294]/10' : 'bg-[#E03636]'"></div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenedor principal -->
    <div class="flex relative">
      <!-- Sidebar minimalista -->
      <aside
        ref="sidebarRef"
        class="fixed lg:absolute top-0 left-0 h-screen z-40 transition-all duration-500 ease-in-out overflow-hidden"
        :class="[
          sidebarOpen 
            ? 'w-72 translate-x-0 opacity-100 shadow-2xl' 
            : 'w-0 -translate-x-full opacity-0'
        ]"
        :style="sidebarOpen ? 'background: linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%);' : ''"
        :aria-hidden="!sidebarOpen"
      >
        <!-- Contenido del sidebar -->
        <div v-if="sidebarOpen" class="w-72 h-full flex flex-col">
          <!-- Encabezado del sidebar -->
          <div class="px-6 py-8 border-b border-gray-100">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-gray-800">Navegación</h2>
              <button @click="toggleSidebar" class="text-[#B1B1B1] hover:text-[#E03636] transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <p class="text-sm text-[#B1B1B1]">Portal del Senado Nacional</p>
          </div>

          <!-- Navegación principal -->
          <nav class="flex-1 px-3 py-4 overflow-y-auto">
            <div class="space-y-1">
              <!-- Inicio -->
              <NuxtLink
                to="/elegant"
                class="nav-item"
                :class="isActive('/elegant') && !activeSubmenu ? 'nav-item-active' : ''"
                @click="closeSidebarOnMobile"
              >
                <span class="nav-item-icon">🏠</span>
                <span class="nav-item-text">Inicio</span>
              </NuxtLink>

              <!-- La Institución -->
              <div class="relative">
                <button
                  @click="toggleSubmenu('institucion')"
                  class="nav-item w-full text-left flex items-center justify-between"
                  :class="activeSubmenu === 'institucion' ? 'nav-item-active' : ''"
                >
                  <div class="flex items-center">
                    <span class="nav-item-icon">🏛️</span>
                    <span class="nav-item-text">La Institución</span>
                  </div>
                  <span class="text-[#B1B1B1] transition-transform duration-300"
                        :class="activeSubmenu === 'institucion' ? 'rotate-180' : ''">▼</span>
                </button>
                
                <!-- Submenú -->
                <div v-if="activeSubmenu === 'institucion'" class="ml-10 mt-1 space-y-1 animate-slideDown">
                  <NuxtLink to="/elegant/institucion/mandato" class="nav-subitem" @click="closeSidebarOnMobile">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#E03636]"></div>
                    Mandato Constitucional
                  </NuxtLink>
                  <NuxtLink to="/elegant/institucion/directiva" class="nav-subitem" @click="closeSidebarOnMobile">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#E03636]"></div>
                    Directiva Camaral
                  </NuxtLink>
                  <NuxtLink to="/elegant/institucion/historia" class="nav-subitem" @click="closeSidebarOnMobile">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#E03636]"></div>
                    Reseña Histórica
                  </NuxtLink>
                  <NuxtLink to="/elegant/institucion/galeria" class="nav-subitem" @click="closeSidebarOnMobile">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#E03636]"></div>
                    Galería de Imágenes
                  </NuxtLink>
                </div>
              </div>

              <!-- Legisladores -->
              <div class="relative">
                <button
                  @click="toggleSubmenu('legisladores')"
                  class="nav-item w-full text-left flex items-center justify-between"
                  :class="activeSubmenu === 'legisladores' ? 'nav-item-active' : ''"
                >
                  <div class="flex items-center">
                    <span class="nav-item-icon">👥</span>
                    <span class="nav-item-text">Legisladores</span>
                  </div>
                  <span class="text-[#B1B1B1] transition-transform duration-300"
                        :class="activeSubmenu === 'legisladores' ? 'rotate-180' : ''">▼</span>
                </button>
                
                <!-- Submenú -->
                <div v-if="activeSubmenu === 'legisladores'" class="ml-10 mt-1 space-y-1 animate-slideDown">
                  <NuxtLink to="/elegant/legisladores/directiva" class="nav-subitem" @click="closeSidebarOnMobile">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#E4D294]"></div>
                    Directiva Camara de Senadores
                  </NuxtLink>
                  <NuxtLink to="/elegant/legisladores/comisiones" class="nav-subitem" @click="closeSidebarOnMobile">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#E4D294]"></div>
                    Comisiones y Comités
                  </NuxtLink>
                  <NuxtLink to="/elegant/legisladores/brigadas" class="nav-subitem" @click="closeSidebarOnMobile">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#E4D294]"></div>
                    Brigadas Parlamentarias
                  </NuxtLink>
                  <NuxtLink to="/elegant/legisladores/supraestatales" class="nav-subitem" @click="closeSidebarOnMobile">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#E4D294]"></div>
                    Senadores Supraestatales
                  </NuxtLink>
                  <NuxtLink to="/elegant/legisladores/bancadas" class="nav-subitem" @click="closeSidebarOnMobile">
                    <div class="w-1.5 h-1.5 rounded-full bg-[#E4D294]"></div>
                    Bancadas Políticas
                  </NuxtLink>
                </div>
              </div>

              <!-- Otros items -->
              <NuxtLink to="/elegant/gestion" class="nav-item" @click="closeSidebarOnMobile">
                <span class="nav-item-icon">📋</span>
                <span class="nav-item-text">Gestión Legislativa</span>
              </NuxtLink>
              
              <NuxtLink to="/elegant/cultura" class="nav-item" @click="closeSidebarOnMobile">
                <span class="nav-item-icon">🎭</span>
                <span class="nav-item-text">Cultura y Patrimonio</span>
              </NuxtLink>
              
              <NuxtLink to="/elegant/participacion" class="nav-item" @click="closeSidebarOnMobile">
                <span class="nav-item-icon">💬</span>
                <span class="nav-item-text">Participación</span>
              </NuxtLink>
              
              <NuxtLink to="/elegant/noticias" class="nav-item" @click="closeSidebarOnMobile">
                <span class="nav-item-icon">📰</span>
                <span class="nav-item-text">Noticias</span>
              </NuxtLink>
              
              <NuxtLink to="/elegant/contacto" class="nav-item" @click="closeSidebarOnMobile">
                <span class="nav-item-icon">📧</span>
                <span class="nav-item-text">Contacto</span>
              </NuxtLink>
            </div>

            <!-- Redes sociales en sidebar -->
            <div class="mt-8 pt-6 border-t border-gray-100">
              <h3 class="text-sm font-medium text-gray-700 mb-3">Redes Sociales</h3>
              <div class="flex gap-2">
                <a v-for="social in socialLinks" :key="social.name"
                   :href="social.url" target="_blank" :title="social.name"
                   class="social-btn"
                   :style="`background: ${social.color};`">
                  <span v-html="social.svgIcon"></span>
                </a>
              </div>
            </div>

            <!-- Información de contacto -->
            <div class="mt-6 p-4 rounded-lg bg-gradient-to-r from-[#E03636]/5 to-[#E4D294]/5 border border-[#E4D294]/20">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E03636] to-[#E4D294] flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-600 mb-1">¿Necesitas ayuda?</p>
                  <p class="text-sm font-medium text-[#E03636]">contacto@senado.bo</p>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      <!-- Overlay para móvil -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/30 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300"
        @click="sidebarOpen = false"
        aria-label="Cerrar menú"
      ></div>

      <!-- Contenido principal -->
      <main class="flex-1 min-w-0">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>

        <!-- Footer elegante -->
        <footer class="mt-12 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 pt-12 pb-8">
          <div class="container mx-auto px-6">
            <div class="flex flex-col lg:flex-row justify-between items-center gap-8">
              <!-- Logo y descripción -->
              <div class="text-center lg:text-left">
                <div class="inline-flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E03636] to-[#C12F2F] flex items-center justify-center">
                    <span class="text-white font-bold">S</span>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-800">Senado Nacional</h3>
                    <p class="text-sm text-[#B1B1B1]">Bolivia</p>
                  </div>
                </div>
                <p class="text-sm text-gray-600 max-w-md">
                  Portal oficial del Senado Nacional del Estado Plurinacional de Bolivia
                </p>
              </div>

              <!-- Redes sociales -->
              <div class="text-center">
                <h4 class="text-sm font-semibold text-gray-700 mb-3">Síguenos</h4>
                <div class="flex gap-3">
                  <a v-for="social in socialLinks" :key="social.name"
                     :href="social.url" target="_blank" :title="social.name"
                     class="social-footer-btn group"
                     :style="`background: ${social.color};`">
                    <span v-html="social.svgIcon"></span>
                    <span class="social-footer-tooltip">{{ social.name }}</span>
                  </a>
                </div>
              </div>

              <!-- Enlaces rápidos -->
              <div class="text-center">
                <h4 class="text-sm font-semibold text-gray-700 mb-3">Enlaces</h4>
                <div class="flex flex-col gap-2">
                  <NuxtLink to="/" class="text-sm text-[#575756] hover:text-[#E03636] transition-colors">
                    ← Versión clásica
                  </NuxtLink>
                  <button @click="toggleSidebar" class="text-sm text-[#575756] hover:text-[#E03636] transition-colors">
                    {{ sidebarOpen ? 'Ocultar menú' : 'Mostrar menú' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Línea divisoria y copyright -->
            <div class="mt-8 pt-6 border-t border-gray-200 text-center">
              <p class="text-sm text-[#B1B1B1]">© 2024 Senado Nacional de Bolivia. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </main>

      <!-- Widget de redes sociales flotante -->
      <div class="hidden xl:block fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div class="flex flex-col gap-3">
          <div class="relative group">
            <div class="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-[#E03636] text-white text-xs font-medium px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Redes Sociales
            </div>
            <div class="w-12 h-12 rounded-xl bg-white shadow-lg border border-gray-200 flex items-center justify-center">
              <svg class="w-6 h-6 text-[#E03636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
              </svg>
            </div>
          </div>
          
          <a v-for="social in socialLinks" :key="social.name"
             :href="social.url" target="_blank" :title="social.name"
             class="social-floating-btn transform transition-all duration-300 hover:-translate-x-1"
             :style="`background: ${social.color};`">
            <span v-html="social.svgIcon"></span>
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

const toggleSidebar = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  sidebarOpen.value = !sidebarOpen.value
}

const toggleSubmenu = (menu) => {
  if (activeSubmenu.value === menu) {
    activeSubmenu.value = null
  } else {
    activeSubmenu.value = menu
  }
}

const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Redes sociales
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
  }
]

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
/* Estilos personalizados */

/* Animación para submenús */
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

.animate-slideDown {
  animation: slideDown 0.3s ease-out;
}

/* Navegación */
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  color: #575756;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  margin-bottom: 4px;
}

.nav-item:hover {
  background: linear-gradient(to right, rgba(224, 54, 54, 0.08), rgba(228, 210, 148, 0.08));
  color: #E03636;
  transform: translateX(4px);
}

.nav-item-active {
  background: linear-gradient(to right, #E03636, #C12F2F);
  color: white;
  box-shadow: 0 4px 12px rgba(224, 54, 54, 0.2);
}

.nav-item-icon {
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item-text {
  font-weight: 500;
  flex: 1;
}

.nav-subitem {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  color: #575756;
  text-decoration: none;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-subitem:hover {
  background-color: rgba(224, 54, 54, 0.05);
  color: #E03636;
}

/* Botones de redes sociales */
.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.social-footer-btn {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-footer-btn:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.social-footer-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #E03636;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  margin-bottom: 8px;
}

.social-footer-btn:hover .social-footer-tooltip {
  opacity: 1;
}

.social-floating-btn {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-floating-btn:hover {
  transform: translateX(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

/* Scrollbar personalizada */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #E03636, #E4D294);
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #C12F2F, #D4BC7A);
}

/* Transiciones */
header, aside, main, footer {
  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 1023px) {
  aside {
    box-shadow: 8px 0 30px rgba(0, 0, 0, 0.1);
  }
  
  .social-floating-btn {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 640px) {
  header .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  main .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  footer .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>