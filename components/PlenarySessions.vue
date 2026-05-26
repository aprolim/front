<!-- components/PlenarySessions.vue -->
<template>
  <div class="w-full min-h-screen flex flex-col bg-gray-50">
    <!-- Encabezado de la sección (solo texto rojo, sin fondo) -->
    <!-- FRANJA ROJA DE ANCHO COMPLETO (superior) - CON MARGEN PARA HEADER -->
    <div class="relative w-screen left-1/2 right-1/2 -mx-[50vw] mt-[4.4vw]">
      <div class="relative bg-[#E03636] py-2 sm:py-3 md:py-4 shadow-2xl overflow-hidden group full-width-franja">
        
        <!-- Patrón de fondo sutil (más pequeño) -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-yellow-300 rounded-tl-lg"></div>
          <div class="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-yellow-300 rounded-br-lg"></div>
        </div>

        <!-- Líneas decorativas animadas (más delgadas) -->
        <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
        <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>

        <!-- Contenido principal centrado -->
        <div class="container mx-auto px-4 relative z-10 text-center">
          <!-- Texto principal - MÁS PEQUEÑO -->
          <p class="font-bold text-white text-[clamp(0.8rem,2vw,1.5rem)]">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-100 to-yellow-200">
              <span class="inline-flex items-center justify-center text-white text-[clamp(0.5rem,1vw,0.9rem)] mx-1">⚪</span> 
              PRIMERA LEGISLATURA DEL TRICENTENARIO
              <span class="inline-flex items-center justify-center text-white text-[clamp(0.5rem,1vw,0.9rem)] mx-1">⚪</span>
            </span>
          </p>
        </div>

        <!-- Elementos decorativos en las esquinas - MÁS PEQUEÑOS -->
        <div class="absolute top-2 left-2 w-2 h-2 border border-yellow-300/50 rounded-full animate-ping"></div>
        <div class="absolute top-2 right-2 w-2 h-2 border border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-2 left-2 w-2 h-2 border border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-2 right-2 w-2 h-2 border border-yellow-300/50 rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
      </div>
    </div>
    
    <div class="text-center">
      <h2 class="text-[#E03636] text-[clamp(1.2em,2.8vw,2.5em)]">
        Sesiones del Pleno
      </h2>
    </div>

    <!-- Contenedor de 3 columnas con ancho en vw - CENTRADO VERTICALMENTE -->
    <div class="flex-1 mx-auto px-[2vw] w-[90vw] text-[1.1vw] flex items-center">
      <div class="grid grid-cols-3 gap-[2vw] w-full items-center pb-[2vw]">
        
        <!-- COLUMNA 1: CALENDARIO COMPLETO -->
        <div class="bg-transparent rounded-xl overflow-visible flex flex-col">
          <h3 class="text-[#E03636] text-[1.8em] md:text-[2em] text-center py-[0.8em] font-medium">Calendario de sesiones</h3>
          
          <div class="flex-1 text-[1.2vw]">
            <div class="mx-[2.8vw] shadow-xl">
                <div class="bg-[#E03636] text-white flex items-center justify-between">
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

                <div class="bg-white rounded-lg p-[1em]">
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
                      class="text-center p-[0.2em] text-[0.9em]"
                      :class="[
                        day.month === 'current' ? 'text-gray-800' : 'text-gray-400',
                        isSessionDay(day.date) ? 'bg-[#E03636]/20 rounded-full font-bold text-[#E03636]' : ''
                      ]"
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
        <div class="bg-transparent rounded-xl overflow-hidden flex flex-col">
          <h3 class="text-[#E03636] text-[1.8em] md:text-[2em] text-center py-[0.8em] font-medium">Orden del día</h3>
          
          <div class="px-[3em] flex-1">
            <NuxtLink to="/" class="block w-full h-[25vw]">
              <div class="relative w-full h-full rounded-lg overflow-hidden group bg-white p-[0.6em] shadow-lg">
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

        <!-- COLUMNA 3: ACTAS OFICIALES - CORREGIDA (solo cambiar overflow-hidden a overflow-visible) -->
        <div class="bg-transparent rounded-xl overflow-visible flex flex-col">
          <h3 class="text-[#E03636] text-[1.8em] md:text-[2em] text-center py-[0.8em] font-medium">Actas oficiales</h3>
          
          <div class="px-[4em] flex-1">
            <!-- Contenedor de imagen con botón que sobresale - SOLO CAMBIÉ overflow-hidden a overflow-visible -->
            <div class="relative px-[1vw] rounded-lg bg-white p-[0.6em] shadow-lg w-full h-[23vw] overflow-visible">
              <img 
                src="/images/actas-oficiales.jpg" 
                alt="Actas oficiales" 
                class="w-full h-full object-cover"
              />
              
              <!-- Botón Ver más con posición exacta - IGUAL QUE ANTES -->
              <div class="absolute left-0 right-0 flex justify-center" style="top: 100%; transform: translateY(-50%);">
                <NuxtLink 
                  to="/en-construccion" 
                  class="bg-[#E03636] hover:bg-[#C12F2F] text-white font-bold py-[0.8em] px-[2em] rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg z-10 text-[1em]"
                >
                  Ver más
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const currentDate = ref(new Date())
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('es', { month: 'long' }).format(currentDate.value)
})

const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
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

const isSessionDay = (date) => {
  if (!date) return false
  
  const sessionDays = [
    '2026-03-06',
    '2026-03-14',
    '2026-03-24',
    '2026-04-05',
    '2026-04-12',
    '2026-04-20',
    '2026-05-03',
    '2026-05-17',
    '2026-05-25'
  ]
  
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return sessionDays.includes(dateStr)
}
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
</style>