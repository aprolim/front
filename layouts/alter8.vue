<!-- layouts/alter8.vue - VERSIÓN COMPLETA CORREGIDA -->
<template>
  <div class="h-screen snap-container">
    <!-- Header rojo fijo y flotante (superpuesto) con menús a la derecha -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#E03636] shadow-lg">
      <div class="mx-auto px-[1px] py-[.3vw] text-[1.5vw]">
        <div class="flex items-center justify-between">
          <!-- Logo y botón hamburguesa (solo móvil) -->
          <div class="flex items-center gap-4">
            <!-- Botón hamburguesa solo para móvil -->
            <button 
              @click="toggleSidebar"
              class="sm:hidden p-2 text-white hover:bg-[#C12F2F] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <!-- Logo como botón para ir al inicio -->
            <button 
              @click="goToHome"
              class="ml-[1em] w-[2.5em] h-[2.5em] rounded-lg overflow-hidden flex items-center justify-center bg-[#E03636]"
              aria-label="Ir al inicio"
            >
              <img 
                src="/senadores2.png" 
                alt="Logo" 
                class="w-full h-full object-cover"
              />
            </button>
          </div>

          <!-- 5 MENÚS PRINCIPALES - ARRIBA A LA DERECHA (SIN FLECHAS) -->
          <div class="hidden sm:flex items-center gap-[0.5vw] text-[.8em]">
            <!-- MENÚ 1: La institución -->
            <div class="relative group/menu">
              <NuxtLink 
                to="/la-institucion" 
                class="inline-block px-[1vw] py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors cursor-pointer"
              >
                La institución
              </NuxtLink>
              <div class="absolute right-0 mt-3 w-[20vw] bg-white rounded-lg shadow-xl border border-gray-100 
                          opacity-0 invisible translate-y-[-1rem] 
                          group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 
                          transition-all duration-700 ease-in-out z-50">
                <div class="py-2">
                  <NuxtLink 
                    to="/la-institucion#mandato" 
                    class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors"
                  >
                    Mandato constitucional
                  </NuxtLink>
                  <NuxtLink 
                    to="/la-institucion#directiva-camaral" 
                    class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors"
                  >
                    Directiva camaral
                  </NuxtLink>
                  <NuxtLink 
                    to="/la-institucion#resena-historica" 
                    class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors"
                  >
                    Reseña histórica
                  </NuxtLink>
                  <NuxtLink 
                    to="/la-institucion#museo" 
                    class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors"
                  >
                    Galería de imágenes
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- MENÚ 2: Gestión Legislativa -->
            <div class="relative group/menu">
              <NuxtLink 
                to="/gestion-legislativa" 
                class="inline-block px-[1vw] py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors cursor-pointer"
              >
                Gestión Legislativa
              </NuxtLink>
              <div class="absolute right-0 mt-3 w-[20vw] bg-white rounded-lg shadow-xl border border-gray-100 
                          opacity-0 invisible translate-y-[-1rem] 
                          group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 
                          transition-all duration-700 ease-in-out z-50">
                <div class="py-2">
                  <NuxtLink to="/gestion-legislativa#sesiones-pleno" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Sesiónes del pleno
                  </NuxtLink>
                  <NuxtLink to="/gestion-legislativa#area-de-legislacion" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Gestión legislativa
                  </NuxtLink>
                  <NuxtLink to="/gestion-legislativa#gaceta-legislativa" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Gaceta legislativa
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- MENÚ 3: Legisladores y representación -->
            <div class="relative group/menu">
              <NuxtLink 
                to="/legisladores-nacionales" 
                class="inline-block px-[1vw] py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors cursor-pointer"
              >
                Legisladores Nacionales
              </NuxtLink>
              <div class="absolute right-0 mt-3 w-[20vw] bg-white rounded-lg shadow-xl border border-gray-100 
                          opacity-0 invisible translate-y-[-1rem] 
                          group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 
                          transition-all duration-700 ease-in-out z-50">
                <div class="py-2">
                  <NuxtLink to="/legisladores-nacionales#directiva-camaral" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Directiva Camaral
                  </NuxtLink>
                  <NuxtLink to="/legisladores-nacionales#comisiones-y-comites" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Comisiones y comites
                  </NuxtLink>
                  <NuxtLink to="/legisladores-nacionales#brigadas-parlamentarias" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Brigadas parlamentarias
                  </NuxtLink>
                  <NuxtLink to="/legisladores-nacionales#bancadas-politicas" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Bancadas politicas
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- MENÚ 4: Cultura y patrimonio -->
            <!-- <div class="relative group/menu">
              <button class="px-[1vw] py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors">
                Cultura
              </button>
              <div class="absolute right-0 mt-3 w-[20vw] bg-white rounded-lg shadow-xl border border-gray-100 
                          opacity-0 invisible translate-y-[-1rem] 
                          group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 
                          transition-all duration-700 ease-in-out z-50">
                <div class="py-2">
                  <NuxtLink to="/" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    👨‍⚖️ Patrimonio histórico
                  </NuxtLink>
                  <NuxtLink to="/" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    👩‍⚖️ Eventos culturales
                  </NuxtLink>
                  <NuxtLink to="/" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    📋 Biblioteca
                  </NuxtLink>
                </div>
              </div>
            </div> -->
<!-- 
            <div class="relative group/menu">
              <button class="px-[1vw] py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors">
                Participación
              </button>
              <div class="absolute right-0 mt-3 w-[20vw] bg-white rounded-lg shadow-xl border border-gray-100 
                          opacity-0 invisible translate-y-[-1rem] 
                          group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 
                          transition-all duration-700 ease-in-out z-50">
                <div class="py-2">
                  <NuxtLink to="/" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Audiencias públicas
                  </NuxtLink>
                  <NuxtLink to="/" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Rendición de cuentas
                  </NuxtLink>
                  <NuxtLink to="/" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Transparencia
                  </NuxtLink>
                </div>
              </div>
            </div> -->
          </div>

          <!-- Versión móvil: texto simple -->
          <div class="sm:hidden flex items-center">
            <span class="text-white text-sm font-medium">Menú</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar móvil (solo visible en móvil) -->
    <div 
      :class="[
        'fixed inset-0 z-40 transition-all duration-300 lg:hidden',
        sidebarOpen ? 'visible' : 'invisible'
      ]"
    >
      <!-- Overlay -->
      <div 
        :class="[
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          sidebarOpen ? 'opacity-100' : 'opacity-0'
        ]"
        @click="sidebarOpen = false"
      ></div>

      <!-- Sidebar móvil con fondo rojo -->
      <aside 
        :class="[
          'absolute left-0 w-72 bg-gradient-to-b from-[#E03636] to-[#C12F2F] text-white shadow-2xl transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
        :style="{ top: '72px', height: 'calc(100vh - 72px)' }"
      >
        <div class="p-4 overflow-y-auto h-full">
          <div class="space-y-2">
            <!-- Menú móvil: La institución -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('institution')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">La institución</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.institution }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.institution" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <a href="/la-institucion" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📜 Mandato constitucional</a>
                <a href="/la-institucion#directiva-camaral" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📚 Directiva camaral</a>
                <a href="/la-institucion#resena-historica" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🔄 Reseña histórica</a>
                <a href="/la-institucion#museo" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🖼️ Galería de imágenes</a>
              </div>
            </div>
            
            <!-- Menú móvil: Legisladores -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('legislators')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">Legisladores</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.legislators }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.legislators" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👨‍⚖️ Senadores</NuxtLink>
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👩‍⚖️ Diputados</NuxtLink>
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📋 Comisiones</NuxtLink>
              </div>
            </div>
            
            <!-- Menú móvil: Gestión Legislativa -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('legislative')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">Gestión Legislativa</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.legislative }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.legislative" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👨‍⚖️ Sesión del pleno</NuxtLink>
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👩‍⚖️ Proyectos de leyes</NuxtLink>
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📋 Gaceta Legislativa</NuxtLink>
              </div>
            </div>
            
            <!-- Menú móvil: Cultura -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('culture')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">Cultura</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.culture }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.culture" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👨‍⚖️ Patrimonio histórico</NuxtLink>
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👩‍⚖️ Eventos culturales</NuxtLink>
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📋 Biblioteca</NuxtLink>
              </div>
            </div>
            
            <!-- Menú móvil: Participación -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('participation')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">Participación</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.participation }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.participation" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👨‍⚖️ Audiencias públicas</NuxtLink>
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👩‍⚖️ Rendición de cuentas</NuxtLink>
                <NuxtLink to="/" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📋 Transparencia</NuxtLink>
              </div>
            </div>
            
            <!-- Noticias -->
            <NuxtLink to="/" class="block p-3 text-white hover:bg-white/10 rounded-lg mt-4" @click="sidebarOpen = false">
              📰 Noticias
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>

    <!-- Contenido principal -->
    <main class="relative z-10 pt-[72px] snap-main">
      <slot />
    </main>

    <!-- Footer (original) -->
    <footer class="text-white back-image snap-footer text-[4px] sm:text-[6px] md:text-[7px] lg:text-[10px] xl:text-[14px] 2xl:text-[16px] 3xl:text-[21px] 4xl:text-[28px] 5xl:text-[40px]">
      <div class="mx-auto">
        <div class="text-center">
          <div class="flex items-center justify-center gap-3 back-image">
            <div class="flex items-center justify-center w-24 h-24 2xl:w-36 2xl:h-32 3xl:w-52 3xl:h-52 4xl:w-52 4xl:h-52 5xl:w-96 5xl:h-96 pt-3">
              <img src="/2R.png" alt="Escudo Senado Nacional" class="w-full h-full object-cover" />
            </div>
          </div>
          
          <div class="sub-footer bg-gray-900 text-white py-8">
            <div class="container mx-auto px-4">
              <div class="grid grid-cols-12 gap-6 items-center">
                <div class="col-span-3 flex items-center justify-start space-x-3">
                  <img src="/footer-img/Recurso 8.png" alt="Senado Bolivia" class="h-6 2xl:h-9 4xl:h-16 5xl:h-24 w-auto">
                  <div>
                    <a href="https://diputados.gob.bo/" target="_blank">https://diputados.gob.bo/</a>
                  </div>
                </div>
                <div class="col-span-6 text-center">
                  <p>Calle Comercio esquina Colón - Telf.: (591) 2158701 - www.senado.gob.bo - La Paz - Bolivia</p>
                </div>
                <div class="col-span-3 flex items-center justify-end space-x-3">
                  <img src="/footer-img/Recurso 7.png" alt="Escudo Senado" class="h-9 2xl:h-24 5xl:h-32 w-auto">
                  <div class="text-right">
                    <a href="https://www.vicepresidencia.gob.bo/" target="_blank">https://www.vicepresidencia.gob.bo/</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Widget de Redes Sociales (original - con animaciones) -->
    <div class="fixed right-[clamp(8px,1.8vw,24px)] 2xl:right-8 3xl:right-9 4xl:right-10 5xl:right-16 top-1/2 transform -translate-y-1/2 z-40">
      <div class="flex flex-col gap-[clamp(6px,1.2vh,16px)] items-end">
        <div class="flex flex-col gap-2 lg:gap-4 4xl:gap-8 items-end">
          <a v-for="(social, index) in socialLinks" :key="social.name"
            :href="social.url" target="_blank" :title="social.name"
            class="social-icon-wrapper group"
            :style="`animation-delay: ${index * 0.1}s;`"
            :class="{ 'animate-bounce-in': sidebarOpen }">
            <div v-html="social.svgIcon" 
                class="social-svg w-[clamp(10px,4vh,80px)] h-[clamp(10px,4vh,80px)] 4xl:w-[clamp(30px,5vh,80px)] 4xl:h-[clamp(30px,4.4vh,80px)] 5xl:w-[clamp(50px,5vh,180px)] 5xl:h-[clamp(50px,4.4vh,180px)]">
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { navigateTo } from '#app'
import { socialLinks } from './data/config'

const sidebarOpen = ref(false)

// Estado para menús móviles
const mobileMenuState = reactive({
  institution: false,
  legislators: false,
  legislative: false,
  culture: false,
  participation: false
})

// Función para ir al inicio de la página principal
const goToHome = () => {
  // Cerrar sidebar si está abierto
  sidebarOpen.value = false
  
  // Navegar a la página principal
  navigateTo('/')
  
  // Múltiples intentos de scroll al contenedor con snap
  const scrollToTop = () => {
    const snapContainer = document.querySelector('.snap-container')
    if (snapContainer) {
      snapContainer.scrollTop = 0
      snapContainer.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Por si acaso
    window.scrollTo(0, 0)
  }
  
  // Intentar varias veces para asegurar
  setTimeout(scrollToTop, 50)
  setTimeout(scrollToTop, 150)
  setTimeout(scrollToTop, 300)
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  // Cerrar todos los submenús al abrir/cerrar sidebar
  if (!sidebarOpen.value) {
    Object.keys(mobileMenuState).forEach(key => {
      mobileMenuState[key] = false
    })
  }
}

const toggleMobileMenu = (menu) => {
  mobileMenuState[menu] = !mobileMenuState[menu]
}

// Cerrar menú con tecla Escape
const onEscape = (e) => {
  if (e.key === 'Escape' && sidebarOpen.value) {
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
/* ===== SNAP SCROLL CONFIGURACIÓN (ORIGINAL) ===== */
*{
  font-family: 'Montserrat';
}

.snap-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scroll-snap-stop: always;
  /* scroll-padding-top: 80px; Añadido para respetar el header */
}

.snap-main {
  scroll-snap-align: start;
}

.snap-footer {
  scroll-snap-align: start;
}

/* Header rojo fijo (nuevo) */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #E03636;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 50;
}

/* Rotación para flechas en móvil */
.rotate-180 {
  transform: rotate(180deg);
}

/* Hover en menús desktop */
.group\/menu:hover .group-hover\/menu\:opacity-100 {
  opacity: 1;
}

.group\/menu:hover .group-hover\/menu\:visible {
  visibility: visible;
}

/* Footer original */
.back-image {
  background-image: url('/footer-main.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(224, 54, 54, 0.7);
}

.sub-footer {
  background-color: rgba(198, 18, 16, 0.6);
}

/* Scrollbar personalizado (original) */
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

/* Animaciones para redes sociales (original) */
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

/* Estilos para iconos de redes sociales (original) */
.social-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2px;
  border-radius: 4px;
}

.social-icon-wrapper:hover {
  transform: translateX(-4px) scale(1.1);
}

.social-svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease;
}

.social-icon-wrapper:hover .social-svg {
  filter: drop-shadow(0 4px 8px rgba(224, 54, 54, 0.3));
}

.social-svg :deep(svg) {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

/* Asegurar que el contenido esté debajo */
main {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

/* Estilos de selección de texto */
::selection {
  background-color: #E03636;
  color: white;
}

::-moz-selection {
  background-color: #E03636;
  color: white;
}

/* Ajuste para el scroll-padding en toda la página */
html {
  /* scroll-padding-top: 80px; */
  scroll-behavior: smooth;
}
</style>