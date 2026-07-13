<!-- layouts/alter8.vue - VERSIÓN COMPLETA -->
<template>
  <div class="h-screen snap-container">
    <!-- Header rojo fijo -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#8A1B19]/80 shadow-lg">
      <div class="mx-auto px-[1px] py-[.3vw] text-[1.5vw]">
        <div class="flex items-center justify-between">
          <!-- Logo y botón hamburguesa -->
          <div class="flex items-center gap-4">
            <button 
              @click="toggleSidebar"
              class="sm:hidden p-2 text-white hover:bg-[#8A1B19] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <button 
              @click="goToHome"
              class="ml-[1em] w-[2.5em] h-[2.5em] rounded-lg overflow-visible flex items-center justify-center"
              aria-label="Ir al inicio"
            >
              <img src="/senadores2.png" alt="Logo" class="w-full h-full object-cover translate-x-5 translate-y-8 scale-[2.5]" />
            </button>
          </div>

          <!-- Menús principales - desktop -->
          <div class="hidden sm:flex items-center gap-[0.5vw] text-[.8em]">
            <!-- MENÚ 1: La institución -->
            <div class="relative group/menu">
              <NuxtLink 
                to="/la-institucion#mandato" 
                class="inline-block px-[1vw] py-2 text-white font-medium hover:bg-[#A54A4A] rounded-lg transition-colors cursor-pointer"
              >
                La institución
              </NuxtLink>
              <div class="absolute right-0 mt-3 w-[20vw] bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible translate-y-[-1rem] group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 transition-all duration-700 ease-in-out z-50">
                <div class="py-2">
                  <NuxtLink to="/la-institucion#mandato" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Mandato constitucional</NuxtLink>
                  <NuxtLink to="/la-institucion#directiva-camaral" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Directiva camaral</NuxtLink>
                  <NuxtLink to="/la-institucion#resena-historica" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Reseña histórica</NuxtLink>
                  <NuxtLink to="/la-institucion#museo" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Galería de imágenes</NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- MENÚ 2: Gestión Legislativa -->
            <div class="relative group/menu">
              <NuxtLink 
                to="/gestion-legislativa#sesiones-pleno" 
                class="inline-block px-[1vw] py-2 text-white font-medium hover:bg-[#A54A4A] rounded-lg transition-colors cursor-pointer"
              >
                Gestión Legislativa
              </NuxtLink>
              <div class="absolute right-0 mt-3 w-[20vw] bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible translate-y-[-1rem] group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 transition-all duration-700 ease-in-out z-50">
                <div class="py-2">
                  <NuxtLink to="/gestion-legislativa#sesiones-pleno" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Sesiones del pleno</NuxtLink>
                  <NuxtLink to="/gestion-legislativa#area-de-legislacion" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Gestión legislativa</NuxtLink>
                  <NuxtLink to="/gestion-legislativa#gaceta-legislativa" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Gaceta legislativa</NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- MENÚ 3: Legisladores y representación -->
            <div class="relative group/menu">
              <NuxtLink 
                to="/legisladores-nacionales#directiva-camaral" 
                class="inline-block px-[1vw] py-2 text-white font-medium hover:bg-[#A54A4A] rounded-lg transition-colors cursor-pointer"
              >
                Legisladores Nacionales
              </NuxtLink>
              <div class="absolute right-0 mt-3 w-[20vw] bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible translate-y-[-1rem] group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 transition-all duration-700 ease-in-out z-50">
                <div class="py-2">
                  <NuxtLink to="/legisladores-nacionales#directiva-camaral" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Directiva Camaral</NuxtLink>
                  <NuxtLink to="/legisladores-nacionales#comisiones-y-comites" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Comisiones y comités</NuxtLink>
                  <NuxtLink to="/legisladores-nacionales#brigadas-parlamentarias" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">¿Quienes me representan?</NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- MENÚ 4: Centro de Noticias -->
            <div class="relative group/menu">
              <NuxtLink 
                to="/centro-de-noticias#noticias-importantes" 
                class="inline-block px-[1vw] py-2 text-white font-medium hover:bg-[#A54A4A] rounded-lg transition-colors cursor-pointer"
              >
                Centro de Noticias
              </NuxtLink>
              <div class="absolute right-0 mt-3 w-[20vw] bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible translate-y-[-1rem] group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0 transition-all duration-700 ease-in-out z-50">
                <div class="py-2">
                  <NuxtLink to="/centro-de-noticias#noticias-importantes" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Noticias Importantes</NuxtLink>
                  <NuxtLink to="/centro-de-noticias#mas-noticias" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Más Noticias</NuxtLink>
                  <NuxtLink to="/centro-de-noticias#sesiones" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Sesiones</NuxtLink>
                  <NuxtLink to="/centro-de-noticias#produccion-audiovisual" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#8A1B19] transition-colors">Producción Audiovisual</NuxtLink>
                </div>
              </div>
            </div>
            <div class="relative group/menu">
              <NuxtLink 
                to="https://systemdemo.es/track-document" 
                target="_blank"
                class="inline-block px-[1vw] py-2 text-white font-medium hover:bg-[#A54A4A] rounded-lg transition-colors cursor-pointer"
              >
                Consultar Tramite
              </NuxtLink>
            </div>
          </div>

          <div class="sm:hidden flex items-center">
            <span class="text-white text-sm font-medium">Menú</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar móvil -->
    <div 
      :class="[
        'fixed inset-0 z-40 transition-all duration-300 lg:hidden',
        sidebarOpen ? 'visible' : 'invisible'
      ]"
    >
      <div 
        :class="[
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          sidebarOpen ? 'opacity-100' : 'opacity-0'
        ]"
        @click="sidebarOpen = false"
      ></div>

      <aside 
        :class="[
          'absolute left-0 w-72 bg-gradient-to-b from-[#E03636] to-[#C12F2F] text-white shadow-2xl transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
        :style="{ top: '72px', height: 'calc(100vh - 72px)' }"
      >
        <div class="p-4 overflow-y-auto h-full">
          <div class="space-y-2">
            <!-- La institución -->
            <div class="mb-2">
              <button @click="toggleMobileMenu('institution')" class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
                <span class="font-medium">La institución</span>
                <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': mobileMenuState.institution }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.institution" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/la-institucion#mandato" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📜 Mandato constitucional</NuxtLink>
                <NuxtLink to="/la-institucion#directiva-camaral" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📚 Directiva camaral</NuxtLink>
                <NuxtLink to="/la-institucion#resena-historica" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🔄 Reseña histórica</NuxtLink>
                <NuxtLink to="/la-institucion#museo" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🖼️ Galería de imágenes</NuxtLink>
              </div>
            </div>
            
            <!-- Legisladores -->
            <div class="mb-2">
              <button @click="toggleMobileMenu('legislators')" class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
                <span class="font-medium">Legisladores</span>
                <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': mobileMenuState.legislators }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.legislators" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/legisladores-nacionales#directiva-camaral" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👨‍⚖️ Directiva Camaral</NuxtLink>
                <NuxtLink to="/legisladores-nacionales#comisiones-y-comites" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📋 Comisiones</NuxtLink>
                <NuxtLink to="/legisladores-nacionales#brigadas-parlamentarias" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👥 Brigadas</NuxtLink>
                <NuxtLink to="/legisladores-nacionales#bancadas-politicas" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🏛️ Bancadas</NuxtLink>
              </div>
            </div>
            
            <!-- Gestión Legislativa -->
            <div class="mb-2">
              <button @click="toggleMobileMenu('legislative')" class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
                <span class="font-medium">Gestión Legislativa</span>
                <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': mobileMenuState.legislative }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.legislative" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/gestion-legislativa#sesiones-pleno" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🏛️ Sesiones del pleno</NuxtLink>
                <NuxtLink to="/gestion-legislativa#area-de-legislacion" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📝 Gestión legislativa</NuxtLink>
                <NuxtLink to="/gestion-legislativa#gaceta-legislativa" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📰 Gaceta Legislativa</NuxtLink>
              </div>
            </div>
            
            <!-- Centro de Noticias -->
            <div class="mb-2">
              <button @click="toggleMobileMenu('news')" class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
                <span class="font-medium">Centro de Noticias</span>
                <svg class="w-5 h-5 transition-transform duration-200" :class="{ 'rotate-180': mobileMenuState.news }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.news" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/centro-de-noticias#noticias-importantes" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📰 Noticias Importantes</NuxtLink>
                <NuxtLink to="/centro-de-noticias#mas-noticias" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📰 Más Noticias</NuxtLink>
                <NuxtLink to="/centro-de-noticias#sesiones" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🎥 Sesiones</NuxtLink>
                <NuxtLink to="/centro-de-noticias#produccion-audiovisual" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🎬 Producción Audiovisual</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <!-- MAIN -->
    <main class="relative z-10 snap-main">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="text-white back-image snap-footer bg-[#8A1B19]/70">
      <div class="mx-auto">
        <div class="text-center">
          <div class="flex items-center justify-center gap-3 back-image">
            <div class="flex items-center justify-center w-24 h-24 2xl:w-36 2xl:h-32 3xl:w-52 3xl:h-52 4xl:w-52 4xl:h-52 5xl:w-96 5xl:h-96 pt-3">
              <img src="/2R.png" alt="Escudo Senado Nacional" class="w-full h-full object-cover" />
            </div>
          </div>
          
          <div class="sub-footer bg-[#8A1B19]/70 text-white py-[2.5vw]">
            <div class="container mx-auto px-4">
              <div class="grid grid-cols-12 gap-6 items-center">
                <div class="col-span-3 flex items-center justify-start space-x-3">
                  
                </div>
                <div class="col-span-6 text-center">
                  <p>Calle Comercio esquina Colón - Telf.: (591) 2158701 - www.senado.gob.bo - La Paz - Bolivia</p>
                </div>
                <div class="col-span-3 flex items-center justify-end space-x-3">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Widget de Redes Sociales -->
    <div class="fixed right-[clamp(8px,1.8vw,24px)] 2xl:right-8 3xl:right-9 4xl:right-10 5xl:right-16 top-1/2 transform -translate-y-1/2 z-40">
      <div class="flex flex-col gap-[clamp(6px,1.2vh,16px)] items-end">
        <div class="flex flex-col gap-2 lg:gap-4 4xl:gap-8 items-end">
          <a v-for="(social, index) in socialLinks" :key="social.name"
            :href="social.url" target="_blank" :title="social.name"
            class="social-icon-wrapper group"
            :style="`animation-delay: ${index * 0.1}s;`">
            <div v-html="social.svgIcon" 
                class="social-svg w-[clamp(10px,4vh,80px)] h-[clamp(10px,4vh,80px)] 4xl:w-[clamp(30px,5vh,80px)] 4xl:h-[clamp(30px,4.4vh,80px)] 5xl:w-[clamp(50px,5vh,180px)] 5xl:h-[clamp(50px,4.4vh,180px)]">
            </div>
          </a>
        </div>
      </div>
    </div>
    <GlobalModals />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { navigateTo, useRoute, useRouter } from '#app'
import { socialLinks } from './data/config'
import GlobalModals from '@/components/GlobalModals.vue'

const route = useRoute()
const router = useRouter()

console.log('🏗️ [LAYOUT] alter8.vue - INICIALIZANDO')

const sidebarOpen = ref(false)
const mobileMenuState = reactive({
  institution: false,
  legislators: false,
  legislative: false,
  news: false
})

const goToHome = () => {
  console.log('🏠 [LAYOUT] Navegando al inicio')
  sidebarOpen.value = false
  navigateTo('/')
  setTimeout(() => {
    const snapContainer = document.querySelector('.snap-container')
    if (snapContainer) {
      snapContainer.scrollTop = 0
      snapContainer.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.scrollTo(0, 0)
  }, 100)
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  if (!sidebarOpen.value) {
    Object.keys(mobileMenuState).forEach(key => {
      mobileMenuState[key] = false
    })
  }
}

const toggleMobileMenu = (menu) => {
  mobileMenuState[menu] = !mobileMenuState[menu]
}

const onEscape = (e) => {
  if (e.key === 'Escape' && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

onMounted(() => {
  console.log('✅ [LAYOUT] alter8.vue - LAYOUT MONTADO')
  document.addEventListener('keydown', onEscape)
})

onBeforeUnmount(() => {
  console.log('🗑️ [LAYOUT] alter8.vue - LAYOUT DESMONTANDO')
  document.removeEventListener('keydown', onEscape)
})
</script>

<style scoped>
* {
  font-family: 'Montserrat';
}

.snap-container {
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scroll-snap-stop: always;
  scroll-padding-top: 0;
}

.snap-main {
  scroll-snap-align: start;
}

.snap-footer {
  scroll-snap-align: start;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 50;
}

.rotate-180 {
  transform: rotate(180deg);
}

.group\/menu:hover .group-hover\/menu\:opacity-100 {
  opacity: 1;
}

.group\/menu:hover .group-hover\/menu\:visible {
  visibility: visible;
}

.back-image {
  background-image: url('/footer-main.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}



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

main {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

::selection {
  background-color: #E03636;
  color: white;
}
</style>