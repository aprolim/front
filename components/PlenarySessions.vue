<!-- components/PlenarySessions.vue -->
<template>
  <div class="w-full min-h-screen flex flex-col bg-gray-50">
    <!-- Encabezado de la sección (solo texto rojo, sin fondo) -->
    <div class="text-center mt-[4.4vw]">
      <h2 class="text-[#E03636] text-[clamp(1.2em,4vw,2.5em)] ">
        Sesiones del Pleno
      </h2>
    </div>

    <!-- Contenedor de 3 columnas con ancho en vw -->
    <div class="flex-1 mx-auto px-[2vw]  w-[90vw] text-[1.1vw]">
      <div class="grid grid-cols-3 gap-[2vw] h-[38vw]">
        
        <!-- COLUMNA 1: CALENDARIO COMPLETO -->
        <div class="bg-transparent rounded-xl overflow-visible flex flex-col">
          <!-- Título rojo sin fondo con tamaño en em -->
          <h3 class="text-[#E03636] text-[1.8em] md:text-[2em] text-center py-[0.8em] font-medium">Calendario de sesiones</h3>
          
          <div class="flex-1 text-[1.2vw]">
            <div class="mx-[2vw] shadow-xl">
                <!-- Selector de mes/año -->
                <div class="bg-[#E03636] text-white flex items-center justify-between">
                <button 
                    @click="previousMonth"
                    class="w-[2em] h-[2em] flex items-center justify-center  hover:scale-125 rounded-full transition-colors"
                >
                    <svg class="w-[1.0em] h-[1.0em]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M15 5l-7 7 7 7V5z"/>
                    </svg>
                </button>
                
                <span class="font-bold text-[1.2em]">{{ currentMonthName }} {{ currentYear }}</span>
                
                <button 
                    @click="nextMonth"
                    class="w-[2em] h-[2em] flex items-center justify-center  hover:scale-125 rounded-full transition-colors"
                >
                    <svg class="w-[1.0em] h-[1.0em]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7V5z"/>
                    </svg>
                </button>
                </div>

                <!-- Calendario completo -->
                <div class="bg-white rounded-lg p-[1em]">
                <!-- Días de la semana -->
                <div class="grid grid-cols-7 gap-[0.2em] text-center text-[0.8em] font-semibold text-gray-600 mb-[0.5em]">
                    <div>L</div>
                    <div>M</div>
                    <div>M</div>
                    <div>J</div>
                    <div>V</div>
                    <div>S</div>
                    <div>D</div>
                </div>
                
                <!-- Días del calendario -->
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
                
                <!-- Leyenda -->
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

        <!-- COLUMNA 2: ORDEN DEL DÍA (SOLO IMAGEN) -->
        <div class="bg-transparent rounded-xl overflow-hidden flex flex-col">
          <h3 class="text-[#E03636] text-[1.8em] md:text-[2em] text-center py-[0.8em] font-medium">Orden del día</h3>
          
          <div class="px-[2em] flex-1">
            <!-- Imagen que funciona como link -->
            <NuxtLink to="/orden-del-dia" class="block w-full h-full">
              <div class="relative w-full h-full rounded-lg overflow-hidden group bg-white p-[0.6em] shadow-lg">
                <img 
                  src="/images/orden-del-dia.jpg" 
                  alt="Orden del día" 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 "
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- COLUMNA 3: ACTAS OFICIALES -->
        <div class="bg-transparent rounded-xl overflow-hidden flex flex-col h-full">
          <h3 class="text-[#E03636] text-[1.8em] md:text-[2em] text-center py-[0.8em] font-medium">Actas oficiales</h3>
          
          <div class="px-[2em] pb-[2em] flex-1">
            <!-- Contenedor de imagen con botón que sobresale -->
            <div class="relative w-full h-full px-[1vw] rounded-lg bg-white p-[0.6em] shadow-lg">
              <img 
                src="/images/actas-oficiales.jpg" 
                alt="Actas oficiales" 
                class="w-full h-full object-cover"
              />
              
              <!-- Botón Ver más con posición exacta -->
              <div class="absolute left-0 right-0 flex justify-center" style="top: 100%; transform: translateY(-50%);">
                <NuxtLink 
                  to="/actas-oficiales" 
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

// Estado para mes y año actual
const currentDate = ref(new Date())
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())
const currentMonthName = computed(() => {
  return new Intl.DateTimeFormat('es', { month: 'long' }).format(currentDate.value)
})

// Función para navegar entre meses
const previousMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

// Generar días del calendario
const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  
  const firstDay = new Date(year, month, 1).getDay()
  const startOffset = firstDay === 0 ? 6 : firstDay - 1
  const lastDate = new Date(year, month + 1, 0).getDate()
  const prevMonthLastDate = new Date(year, month, 0).getDate()
  
  const days = []
  
  // Días del mes anterior
  for (let i = 0; i < startOffset; i++) {
    days.push({
      day: prevMonthLastDate - startOffset + i + 1,
      month: 'prev',
      date: new Date(year, month - 1, prevMonthLastDate - startOffset + i + 1)
    })
  }
  
  // Días del mes actual
  for (let i = 1; i <= lastDate; i++) {
    days.push({
      day: i,
      month: 'current',
      date: new Date(year, month, i)
    })
  }
  
  // Días del mes siguiente
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

// Función para verificar si un día es de sesión
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
/* Contenedor principal con ancho en vw */
.w-\[90vw\] {
  width: 90vw;
}

/* Asegurar que las columnas tengan la misma altura */
.grid > div {
  height: 100%;
}

/* Estilo para los días del calendario */
.grid-cols-7 > div {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ajuste responsive para el botón */
@media (max-width: 768px) {
  [style*="top: 90%"] {
    top: 85% !important;
  }
}

/* Capitalizar nombre del mes */
.text-lg {
  text-transform: capitalize;
}

/* Alturas mínimas en em */
.min-h-\[15em\] {
  min-height: 15em;
}

.min-h-\[18em\] {
  min-height: 18em;
}
</style>