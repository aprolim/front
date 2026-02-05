<!-- components/HeroSection/HeroContent.vue -->
<template>
  <div class="container relative z-10 mx-auto px-6 md:px-12 pt-20 mt-32 md:mt-52">
    <div class="max-w-4xl mx-auto">
      <!-- Logo/Texto que se transforma -->
      <div class="mb-8 md:mb-12 transition-all duration-500" :class="{ 'transform scale-90 md:scale-95': scrolled }">
        <!-- Versión compacta (al hacer scroll) -->
        <div 
          class="transition-all duration-500 flex items-center gap-4"
          :class="scrolled ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'"
        >
          <!-- <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-[#E03636] to-[#E03636] flex items-center justify-center shadow-lg border-2 border-[#F9E076]/50">
            <span class="text-white font-bold text-xl">SN</span>
          </div> -->
          <div>
            <h2 class="text-2xl md:text-3xl font-bold text-white">Camara de senadores</h2>
            <p class="text-sm text-white/80">Estado Plurinacional de Bolivia</p>
          </div>
        </div>
      </div>

      <!-- Descripción -->
      <p 
        class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed transition-all duration-500"
        :class="{ 'opacity-0 h-0 overflow-hidden': scrolled }"
      >
        Primera legislatura del tricentenario.
      </p>

      <!-- Línea decorativa -->
      <div 
        class="w-24 h-1 bg-gradient-to-r from-[#E03636] to-[#E4D294] mb-8 rounded-full transition-all duration-500"
        :class="{ 'opacity-0': scrolled }"
      ></div>

      <div 
        class="mt-12 grid grid-cols-2 md:grid-cols-5 gap-6 transition-all duration-500"
        ref="heroButtons"
        :class="{ 'opacity-0 h-0 overflow-hidden': scrolled }"
        >
        
        <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
        >
            <div class="backdrop-blur-sm relative">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
                d="M3 21h18M5 21V11h3V6h8v5h3v10M9 9h1m1.5 0h1m1.5 0h1M7 13h3m-3 2.5h3m-3 2.5h3m4-5h3m-3 2.5h3m-3 2.5h3M11 21v-3h2v3M12 6V2l4 1.5-4 1.5" 
                stroke="white" 
                stroke-width="0.8" 
                stroke-linecap="round" 
                stroke-linejoin="round"
            />
            </svg>
            
            <!-- Indicador de hover -->
            <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Tooltip elegante -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
            <div class="relative">
                <!-- Texto del tooltip -->
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                La Instituci&oacute;n
                <!-- Flecha del tooltip -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
            </div>
            </div>
        </NuxtLink>
        <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
        >
            <div class="backdrop-blur-sm relative">
            <svg width="100" height="100" viewBox="8 13 84 84" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                
                <circle cx="31" cy="28" r="8.5"/>
                <path d="M18 52.5 C18 43 24 40 31 40 C38 40 44 43 44 52.5" />
                <line x1="23.5" y1="48" x2="23.5" y2="54" />

                <circle cx="69" cy="28" r="8.5"/>
                <path d="M56 52.5 C56 43 62 40 69 40 C76 40 82 43 82 52.5" />
                <line x1="76.5" y1="48" x2="76.5" y2="54" />

                <circle cx="50" cy="40" r="9"/>
                <path d="M35 66 C35 56 42 53 50 53 C58 53 65 56 65 66" />
                <line x1="39.5" y1="62" x2="39.5" y2="67" />
                <line x1="60.5" y1="62" x2="60.5" y2="67" />
                
                <path d="M50 53 L53.5 59 L50 65 L46.5 59 Z" fill="none" />
                <line x1="50" y1="53" x2="50" y2="59" />

                <path d="M21 58 C21 78 35 88 50 88 C65 88 79 78 79 58" />
                <path d="M29 65 C29 78 38 83 50 83 C62 83 71 78 71 65" />
                
            </g>
            </svg>
            
            <!-- Indicador de hover -->
            <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Tooltip elegante -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
            <div class="relative">
                <!-- Texto del tooltip -->
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                Legisladores y Representaci&oacute;n
                <!-- Flecha del tooltip -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
            </div>
            </div>
        </NuxtLink>
        <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
        >
            <div class="backdrop-blur-sm relative">
            <svg width="100" height="100" viewBox="10 15 80 80" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M25 20 H75 V75 C75 80 70 82 65 82 H25 C20 82 20 75 20 75 V25 C20 20 25 20 25 20Z" />
                <path d="M25 75 H75" />
                <path d="M25 78 H75" />
                
                <path d="M35 30 Q35 28 37 28 H63 Q65 28 65 30 V65 Q65 67 63 67 H37 Q35 67 35 65 Z" />
                
                <g transform="rotate(-30 50 50)">
                <rect x="42" y="35" width="16" height="10" rx="2" />
                <path d="M42 37 H40 M42 43 H40 M58 37 H60 M58 43 H60" />
                <path d="M50 45 V70" stroke-width="4" />
                </g>
            </g>
            </svg>
            
            <!-- Indicador de hover -->
            <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Tooltip elegante -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
            <div class="relative">
                <!-- Texto del tooltip -->
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                Gesti&oacute;n Legislativa
                <!-- Flecha del tooltip -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
            </div>
            </div>
        </NuxtLink>
        <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
        >
            <div class="backdrop-blur-sm relative">
            <svg width="100" height="100" viewBox="8 20 80 80" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M30 25 C20 25 20 38 30 38 H65 C75 38 75 25 65 25" />
                <path d="M30 38 V70 C30 82 45 82 45 70" />
                <path d="M65 25 V60" />
                
                <path d="M45 70 H70 C80 70 80 82 70 82 H45 C35 82 35 70 45 70 Z" />
                
                <path d="M38 48 H55" stroke-width="3" />
                <path d="M38 56 H50" stroke-width="3" />
                <path d="M38 64 H45" stroke-width="3" />

                <path d="M82 25 C75 35 60 55 58 75" />
                <path d="M82 25 C85 35 75 50 58 65 C55 50 65 30 82 25 Z" fill="white" fill-opacity="0.1" />
                <path d="M68 40 L73 37" />
                <path d="M63 50 L68 47" />
            </g>
            </svg>
            
            <!-- Indicador de hover -->
            <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Tooltip elegante -->
            <div class=" absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
            <div class="relative">
                <!-- Texto del tooltip -->
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                Cultura y Patrimonio Legislativo
                <!-- Flecha del tooltip -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
            </div>
            </div>
        </NuxtLink>
        
        <NuxtLink 
            to="/la-institucion" 
            class="px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
            title="Información Institucional del Senado"
        >
            <div class="backdrop-blur-sm relative">
            <svg width="100" height="100" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(400, 320) scale(1.25) translate(-400, -420)" stroke="white" stroke-width="27" stroke-linecap="round" stroke-linejoin="round">
                
                <path d="M345 380V240C345 228.954 353.954 220 365 220H435C446.046 220 455 228.954 455 240V380" />
                <path d="M375 235V340M400 220V340M425 235V340" />
                <path d="M455 330C475 330 490 345 490 365V385" />

                <path d="M235 550V430C235 413.431 248.431 400 265 400H325C341.569 400 355 413.431 355 430V550" />
                <path d="M265 410V520M295 400V520M325 410V520" />
                <path d="M355 510C375 510 395 525 395 545V565" />
                <path d="M280 480C295 495 315 495 330 480" stroke-width="6" opacity="0.8"/>
                <rect x="250" y="565" width="120" height="35" rx="2" />

                <path d="M445 550V430C445 413.431 458.431 400 475 400H535C551.569 400 565 413.431 565 430V550" />
                <path d="M475 410V520M505 400V520M535 410V520" />
                <path d="M445 510C425 510 405 525 405 545V565" />
                <path d="M470 480C485 495 505 495 520 480" stroke-width="6" opacity="0.8"/>
                <rect x="430" y="565" width="120" height="35" rx="2" />

                <rect x="390" y="520" width="20" height="120" fill="white" stroke="none" />
            </g>
            </svg>
            
            <!-- Indicador de hover -->
            <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <!-- Tooltip elegante -->
            <div class=" absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
            <div class="relative">
                <!-- Texto del tooltip -->
                <div class="px-4 py-2 bg-[#E03636] backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                Participaci&oacute;n y Transparencia
                <!-- Flecha del tooltip -->
                <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-[#E03636]"></div>
                </div>
            </div>
            </div>
        </NuxtLink>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  scrolled: Boolean,
  heroLinks: {
    type: Array,
    default: () => [
      {
        to: '/la-institucion',
        title: 'Información Institucional del Senado',
        ariaLabel: 'Información Institucional del Senado Nacional'
      }
    ]
  }
})

const hasIconSlot = computed(() => {
  // Esta lógica dependería de cómo manejas los slots
  return true
})
</script>

<style scoped>
.ghost {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.ghost:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-0.25rem);
}
</style>