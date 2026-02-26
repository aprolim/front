<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="fixed top-0 inline-flex z-50 bg-transparent">
      <div class="h-14 bg-transparent inline-block items-center px-4">
        <button 
          @click="toggleSidebar"
          class="p-2 rounded-lg hover:bg-white/20 transition-colors relative z-50"
          aria-label="Toggle menu"
        >
          <span v-html="menuIcons.menu" />
        </button>
      </div>
    </header>

    <!-- Sidebar -->
    <div 
      :class="[
        'fixed inset-0 z-40 transition-all duration-300',
        sidebarOpen ? 'visible' : 'invisible'
      ]"
    >
      <!-- Overlay -->
      <div 
        :class="[
          'absolute inset-0 transition-opacity duration-300',
          sidebarOpen ? 'bg-black/30' : 'bg-transparent'
        ]"
        @click="sidebarOpen = false"
      ></div>
      
      <!-- Menú lateral -->
      <aside 
        :class="[
          'absolute left-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out border-r border-gray-700/50',
          sidebarStyles.width,
          sidebarStyles.top,
          sidebarStyles.height,
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <!-- Navegación principal -->
        <div class="p-4 overflow-y-auto h-[calc(100%-140px)]">
          
          <!-- MENÚ 1: LA INSTITUCIÓN -->
          <div class="mb-3">
            <button 
              @click="toggleInstitution"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <span v-html="menuIcons.institution" />
                <span :class="sidebarStyles.menuText">La institución</span>
              </div>
              <span v-html="menuIcons.arrow(institutionOpen)" />
            </button>
            
            <div v-if="institutionOpen" class="ml-9 mt-2 mb-3 space-y-2 border-l border-gray-600/50 pl-3">
              <NuxtLink to="/alternative/constitucion/texto-completo" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                📜 Mandato constitucional
              </NuxtLink>
              <NuxtLink to="/alternative/constitucion/historia" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                📚 Directiva camaral
              </NuxtLink>
              <NuxtLink to="/alternative/constitucion/reformas" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                🔄 Reseña historica
              </NuxtLink>
              <NuxtLink to="/alternative/constitucion/reformas" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                🔄 Galeria de imagenes
              </NuxtLink>
            </div>
          </div>

          <!-- MENÚ 2: LEGISLADORES Y REPRESENTACIÓN -->
          <div class="mb-3">
            <button 
              @click="toggleLegislators"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <span v-html="menuIcons.legislators" />
                <span :class="sidebarStyles.menuText">Legisladores y representación</span>
              </div>
              <span v-html="menuIcons.arrow(legislatorsOpen)" />
            </button>
            
            <div v-if="legislatorsOpen" class="ml-9 mt-2 mb-3 space-y-2 border-l border-gray-600/50 pl-3">
              <NuxtLink to="/alternative/constitucion/texto-completo" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                📜 Mandato constitucional
              </NuxtLink>
              <NuxtLink to="/alternative/constitucion/historia" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                📚 Directiva camaral
              </NuxtLink>
              <NuxtLink to="/alternative/constitucion/reformas" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                🔄 Reseña historica
              </NuxtLink>
              <NuxtLink to="/alternative/constitucion/reformas" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                🔄 Galeria de imagenes
              </NuxtLink>
            </div>
          </div>

          <!-- MENÚ 3: GESTIÓN LEGISLATIVA -->
          <div class="mb-3">
            <button 
              @click="toggleLegislativeManagement"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <span v-html="menuIcons.gavel" />
                <span :class="sidebarStyles.menuText">Gestión Legislativa</span>
              </div>
              <span v-html="menuIcons.arrow(legislativeManagementOpen)" />
            </button>
            
            <div v-if="legislativeManagementOpen" class="ml-9 mt-2 mb-3 space-y-2 border-l border-gray-600/50 pl-3">
              <NuxtLink to="/alternative/legisladores/senadores" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                👨‍⚖️ Sesion del pleno
              </NuxtLink>
              <NuxtLink to="/alternative/legisladores/diputados" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                👩‍⚖️ Proyectos de leyes
              </NuxtLink>
              <NuxtLink to="/alternative/legisladores/comisiones" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                📋 Gaceta Legislativa
              </NuxtLink>
            </div>
          </div>

          <!-- MENÚ 4: NOTICIAS -->
          <NuxtLink to="/alternative/participacion" 
                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700/50 transition-colors mb-2"
                    @click="sidebarOpen = false">
            <span v-html="menuIcons.news" />
            <span :class="sidebarStyles.menuText">Noticias</span>
          </NuxtLink>

          <!-- MENÚ 5: PARTICIPACIÓN Y TRANSPARENCIA -->
          <div class="mb-3">
            <button 
              @click="toggleParticipation"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <span v-html="menuIcons.hands" />
                <span :class="sidebarStyles.menuText">Participación y transparencia</span>
              </div>
              <span v-html="menuIcons.arrow(participationOpen)" />
            </button>
            
            <div v-if="participationOpen" class="ml-9 mt-2 mb-3 space-y-2 border-l border-gray-600/50 pl-3">
              <NuxtLink to="/alternative/legisladores/senadores" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                👨‍⚖️ Sesion del pleno
              </NuxtLink>
              <NuxtLink to="/alternative/legisladores/diputados" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                👩‍⚖️ Proyectos de leyes
              </NuxtLink>
              <NuxtLink to="/alternative/legisladores/comisiones" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                📋 Gaceta Legislativa
              </NuxtLink>
            </div>
          </div>

          <!-- MENÚ 6: CULTURA Y PATRIMONIO -->
          <div class="mb-3">
            <button 
              @click="toggleCulture"
              class="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
            >
              <div class="flex items-center gap-3">
                <span v-html="menuIcons.culture" />
                <span :class="sidebarStyles.menuText">Cultura y patrimonio</span>
              </div>
              <span v-html="menuIcons.arrow(cultureOpen)" />
            </button>
            
            <div v-if="cultureOpen" class="ml-9 mt-2 mb-3 space-y-2 border-l border-gray-600/50 pl-3">
              <NuxtLink to="/alternative/legisladores/senadores" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                👨‍⚖️ Sesion del pleno
              </NuxtLink>
              <NuxtLink to="/alternative/legisladores/diputados" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                👩‍⚖️ Proyectos de leyes
              </NuxtLink>
              <NuxtLink to="/alternative/legisladores/comisiones" 
                        :class="sidebarStyles.submenuText"
                        @click="sidebarOpen = false">
                📋 Gaceta Legislativa
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Pie del sidebar -->
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

    <!-- Footer -->
    <footer class="text-white back-image">
      <div class="mx-auto">
        <div class="text-center">
          <div class="flex items-center justify-center gap-3 back-image">
            <div class="flex items-center justify-center w-40 h-40 pt-3">
              <img src="/2R.png" alt="Escudo Senado Nacional" class="w-full h-full object-cover" />
            </div>
          </div>
          
          <div class="sub-footer bg-gray-900 text-white py-8">
            <div class="container mx-auto px-4">
              <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div class="md:col-span-3 flex items-center justify-start space-x-3">
                  <img src="/footer-img/Recurso 8.png" alt="Senado Bolivia" class="h-11 w-auto">
                  <div>
                    <a href="https://diputados.gob.bo/" target="_blank">https://diputados.gob.bo/</a>
                  </div>
                </div>
                <div class="md:col-span-6 text-center">
                  <p>Calle Comercio esquina Colón - Telf.: (591) 2158701 - www.senado.gob.bo - La Paz - Bolivia</p>
                </div>
                <div class="md:col-span-3 flex items-center justify-end space-x-3">
                  <img src="/footer-img/Recurso 7.png" alt="Escudo Senado" class="h-14 w-auto">
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

    <!-- Widget de Redes Sociales -->
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
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { menuIcons } from './data/menuIcons'
import { socialLinks, sidebarStyles } from './data/config'

const sidebarOpen = ref(false)
const institutionOpen = ref(false)
const legislatorsOpen = ref(false)
const legislativeManagementOpen = ref(false)
const participationOpen = ref(false)
const cultureOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const toggleInstitution = () => {
  institutionOpen.value = !institutionOpen.value
}

const toggleLegislators = () => {
  legislatorsOpen.value = !legislatorsOpen.value
}

const toggleLegislativeManagement = () => {
  legislativeManagementOpen.value = !legislativeManagementOpen.value
}

const toggleParticipation = () => {
  participationOpen.value = !participationOpen.value
}

const toggleCulture = () => {
  cultureOpen.value = !cultureOpen.value
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
/* Asegurar header transparente */
header {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}

.back-image {
  background-image: url('/footer-main.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(224, 54, 54, 0.7);
}

.sub-footer {
  background-color: rgba(198, 18, 16, 0.6);
  font-size: .7em;
}

/* Asegurar que el contenido esté debajo */
main {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

/* Estilos para enlaces activos */
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
  0% { opacity: 0; transform: scale(0.3); }
  50% { opacity: 1; transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

.animate-bounce-in {
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Estilos para iconos de redes sociales */
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

@keyframes subtle-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.group:hover .animate-ping {
  animation: subtle-pulse 1.5s ease-in-out infinite;
}

.social-svg :deep(svg path) {
  transition: fill 0.3s ease, stroke 0.3s ease;
}
</style>