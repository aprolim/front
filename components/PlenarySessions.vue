<!-- components/PlenarySessions.vue - MODIFICADO PARA FONDO TRANSPARENTE -->
<template>
  <!-- CAMBIO 1: Eliminar bg-gray-50 y agregar background transparent -->
  <div class="w-full min-h-screen flex flex-col" style="background: transparent !important;">
    <!-- FRANJA ROJA DE ANCHO COMPLETO (superior) -->
    <div class="relative w-screen left-1/2 right-1/2 -mx-[50vw] mt-[4.3vw]">
      <div class="relative bg-[#A54A4A] py-2 sm:py-3 md:py-4 shadow-2xl overflow-hidden group full-width-franja">
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white rounded-tl-lg"></div>
          <div class="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white rounded-br-lg"></div>
        </div>
        <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
        <div class="container mx-auto px-4 relative z-10 text-center">
          <p class="font-bold text-white text-[clamp(0.8rem,2vw,1.5rem)]">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F2CFCF] to-[#E8B5B5]">
              <span class="inline-flex items-center justify-center text-white text-[1.1vw] mx-1 -translate-y-[.2vw]">⚪</span> 
              PRIMERA LEGISLATURA DEL TRICENTENARIO
              <span class="inline-flex items-center justify-center text-white text-[1.1vw] mx-1 -translate-y-[.2vw]">⚪</span>
            </span>
          </p>
        </div>
        <div class="absolute top-2 left-2 w-2 h-2 border border-white rounded-full animate-ping"></div>
        <div class="absolute top-2 right-2 w-2 h-2 border border-white rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-2 left-2 w-2 h-2 border border-white rounded-full animate-ping" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-2 right-2 w-2 h-2 border border-white rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
      </div>
    </div>
    
    <div class="text-center">
      <h2 class="text-[#A54A4A] text-[clamp(1.2em,2.8vw,2.5em)]">
        Sesiones del Pleno
      </h2>
    </div>

    <!-- Contenedor de 3 columnas -->
    <div class="flex-1 mx-auto px-[2vw] w-[90vw] text-[1.1vw] flex items-center" style="background: transparent !important;">
      <div class="grid grid-cols-3 gap-[2vw] w-full items-center pb-[2vw]">
        
        <!-- COLUMNA 1: CALENDARIO COMPLETO -->
        <div class="rounded-xl overflow-visible flex flex-col" style="background: transparent !important;">
          <h3 class="text-[#A54A4A] text-[1.8em] md:text-[2em] text-center py-[0.8em] font-medium">Calendario de sesiones</h3>
          
          <div class="flex-1 text-[1.2vw]">
            <div class="mx-[2.8vw] shadow-xl">
              <div class="bg-[#A54A4A] text-white flex items-center justify-between">
                <button 
                  @click="previousMonth"
                  class="w-[2em] h-[2em] flex items-center justify-center hover:scale-125 rounded-full transition-colors"
                >
                  <svg class="w-[1.0em] h-[1.0em]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15 5l-7 7 7 7V5z"/>
                  </svg>
                </button>
                
                <span class="font-bold text-[1.2em]">{{ currentMonthName }} {{ currentYear }}</span>
                
                <button 
                  @click="nextMonth"
                  class="w-[2em] h-[2em] flex items-center justify-center hover:scale-125 rounded-full transition-colors"
                >
                  <svg class="w-[1.0em] h-[1.0em]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7V5z"/>
                  </svg>
                </button>
              </div>

              <!-- CAMBIO 2: El calendario mantiene fondo blanco con transparencia -->
              <div class="bg-white/90 backdrop-blur-sm rounded-lg p-[1em]">
                <div class="grid grid-cols-7 gap-[0.2em] text-center text-[0.8em] font-semibold text-gray-600 mb-[0.5em]">
                  <div>L</div>
                  <div>M</div>
                  <div>M</div>
                  <div>J</div>
                  <div>V</div>
                  <div>S</div>
                  <div>D</div>
                </div>
                
                <div class="grid grid-cols-7 gap-[0.2em]">
                  <div 
                    v-for="(day, index) in calendarDays" 
                    :key="index"
                    class="relative text-center p-[0.2em] text-[0.9em] cursor-default"
                    :class="[
                      day.month === 'current' ? 'text-gray-800' : 'text-gray-400',
                      getInfoSesion(day.date) ? 'bg-[#E03636]/20 rounded-full font-bold text-[#E03636]' : ''
                    ]"
                    @mouseenter="showTooltip(day.date, $event)"
                    @mouseleave="hideTooltip"
                    @mousemove="moveTooltip($event)"
                  >
                    {{ day.day }}
                  </div>
                </div>
                
                <div class="mt-[0.8em] flex items-center justify-center text-[0.8em]">
                  <div class="flex items-center mr-[0.8em]">
                    <div class="w-[0.8em] h-[0.8em] bg-[#E03636]/20 rounded-full mr-[0.3em]"></div>
                    <span>Día de sesión</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- COLUMNA 2: ORDEN DEL DÍA -->
        <div class="rounded-xl overflow-hidden flex flex-col" style="background: transparent !important;">
          <h3 class="text-[#A54A4A] text-[1.8em] md:text-[2em] text-center py-[0.8em] font-medium">Orden del día</h3>
          
          <div class="px-[3em] flex-1">
            <NuxtLink to="/" class="block w-full h-[25vw]">
              <!-- CAMBIO 3: La tarjeta mantiene fondo blanco con transparencia -->
              <div class="relative w-full h-full rounded-lg overflow-hidden group bg-white/90 backdrop-blur-sm p-[0.6em] shadow-lg">
                <img 
                  src="/images/orden-del-dia.jpg" 
                  alt="Orden del día" 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- COLUMNA 3: ACTAS OFICIALES -->
        <div class="rounded-xl overflow-visible flex flex-col" style="background: transparent !important;">
          <h3 class="text-[#A54A4A] text-[1.8em] md:text-[2em] text-center py-[0.8em] font-medium">Actas oficiales</h3>
          
          <div class="px-[4em] flex-1">
            <!-- CAMBIO 4: La tarjeta mantiene fondo blanco con transparencia -->
            <div class="relative px-[1vw] rounded-lg bg-white/90 backdrop-blur-sm p-[0.6em] shadow-lg w-full h-[23vw] overflow-visible">
              <img 
                src="/images/actas-oficiales.jpg" 
                alt="Actas oficiales" 
                class="w-full h-full object-cover"
              />
              
              <div class="absolute left-0 right-0 flex justify-center" style="top: 100%; transform: translateY(-50%);">
                <NuxtLink 
                  to="/en-construccion" 
                  class="bg-[#A54A4A] hover:bg-[#C12F2F] text-white font-bold py-[0.8em] px-[2em] rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg z-10 text-[1em]"
                >
                  Ver más
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔥 TOOLTIP / MODAL PARA FECHAS DE SESIÓN -->
    <Teleport to="body">
      <div 
        v-if="tooltipVisible && tooltipData"
        class="fixed z-50 pointer-events-none transition-opacity duration-200"
        :style="{ 
          left: tooltipPosition.x + 'px', 
          top: tooltipPosition.y + 'px',
          opacity: tooltipVisible ? 1 : 0,
          transform: 'translate(-50%, -100%)',
          marginTop: '-10px'
        }"
      >
        <div class="bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-xs pointer-events-auto" style="min-width: 200px;">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-[#E03636] text-lg">📅</span>
            <span class="font-bold text-gray-800 text-sm">{{ tooltipData.fechaFormateada }}</span>
            <span 
              class="ml-auto px-2 py-0.5 rounded-full text-xs font-medium"
              :class="getTipoClass(tooltipData.tipo)"
            >
              {{ getTipoLabel(tooltipData.tipo) }}
            </span>
          </div>
          
          <h4 class="font-semibold text-gray-900 text-base mb-1">
            {{ tooltipData.titulo || 'Sesión del Senado' }}
          </h4>
          
          <p v-if="tooltipData.descripcion" class="text-gray-600 text-sm mt-1">
            {{ tooltipData.descripcion }}
          </p>
          
          <div class="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1 text-xs text-gray-400">
            <span>🕐</span>
            <span>Sesión programada</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

const currentDate = ref(new Date())
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('es', { month: 'long' }).format(currentDate.value)
})

// 🔥 FECHAS DE SESIONES DESDE EL BACKEND (con datos completos)
const sesionesData = ref([])

// 🔥 Tooltip
const tooltipVisible = ref(false)
const tooltipData = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })
let tooltipTimeout = null

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

// 🔥 Cargar fechas de sesiones desde el backend (con datos completos)
const cargarFechasSesiones = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sesiones/fechas`)
    const result = await response.json()
    if (result.success) {
      sesionesData.value = result.data || []
      console.log(`📅 ${sesionesData.value.length} fechas de sesiones cargadas`)
    }
  } catch (error) {
    console.error('Error cargando fechas de sesiones:', error)
  }
}

// 🔥 Obtener información de una fecha
const getInfoSesion = (date) => {
  if (!date) return null
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return sesionesData.value.find(s => s.fecha === dateStr) || null
}

// 🔥 Mostrar tooltip
const showTooltip = (date, event) => {
  const info = getInfoSesion(date)
  if (!info) {
    tooltipVisible.value = false
    return
  }
  
  // Formatear fecha para mostrar
  const fechaObj = new Date(date)
  const fechaFormateada = fechaObj.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
  
  tooltipData.value = {
    ...info,
    fechaFormateada
  }
  
  // Posicionar tooltip
  const rect = event.target.getBoundingClientRect()
  tooltipPosition.value = {
    x: rect.left + rect.width / 2,
    y: rect.top
  }
  
  tooltipVisible.value = true
}

const hideTooltip = () => {
  tooltipVisible.value = false
  tooltipData.value = null
}

const moveTooltip = (event) => {
  if (!tooltipVisible.value) return
  const rect = event.target.getBoundingClientRect()
  tooltipPosition.value = {
    x: rect.left + rect.width / 2,
    y: rect.top
  }
}

// 🔥 Clases para tipos de sesión
const getTipoClass = (tipo) => {
  const clases = {
    ordinaria: 'bg-blue-100 text-blue-800',
    extraordinaria: 'bg-yellow-100 text-yellow-800',
    especial: 'bg-purple-100 text-purple-800'
  }
  return clases[tipo] || 'bg-gray-100 text-gray-800'
}

const getTipoLabel = (tipo) => {
  const labels = {
    ordinaria: 'Ordinaria',
    extraordinaria: 'Extraordinaria',
    especial: 'Especial'
  }
  return labels[tipo] || tipo
}

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1
  const lastDate = new Date(year, month + 1, 0).getDate()
  const prevMonthLastDate = new Date(year, month, 0).getDate()
  
  const days = []
  
  for (let i = 0; i < startOffset; i++) {
    days.push({
      day: prevMonthLastDate - startOffset + i + 1,
      month: 'prev',
      date: new Date(year, month - 1, prevMonthLastDate - startOffset + i + 1)
    })
  }
  
  for (let i = 1; i <= lastDate; i++) {
    days.push({
      day: i,
      month: 'current',
      date: new Date(year, month, i)
    })
  }
  
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      month: 'next',
      date: new Date(year, month + 1, i)
    })
  }
  
  return days
})

// Cargar fechas al montar
onMounted(() => {
  cargarFechasSesiones()
})
</script>

<style scoped>
.w-\[90vw\] {
  width: 90vw;
}

.grid-cols-7 > div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-lg {
  text-transform: capitalize;
}

.min-h-\[15em\] {
  min-height: 15em;
}

.min-h-\[18em\] {
  min-height: 18em;
}

/* Tooltip animation */
.fixed.z-50 {
  animation: tooltipFadeIn 0.15s ease-out;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -100%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -100%) scale(1);
  }
}
</style>