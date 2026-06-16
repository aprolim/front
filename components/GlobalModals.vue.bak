<!-- components/GlobalModals.vue -->
<template>
  <Teleport to="body">
    <div 
      v-if="modalStore.activeModal === 'redactor'" 
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-4 modal-backdrop"
      @click.self="modalStore.closeModal"
    >
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-[98vw] sm:max-w-[95vw] lg:max-w-[90vw] xl:max-w-[1400px] max-h-[95vh] overflow-hidden modal-container">
        
        <!-- Header -->
        <div class="bg-[#E03636] text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div>
            <h3 class="text-xl sm:text-2xl font-bold">Gaceta Legislativa - Redactor</h3>
            <p class="text-xs sm:text-sm text-white/80 mt-1">Seleccione un tomo para visualizar</p>
          </div>
          <button 
            @click="modalStore.closeModal"
            class="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Contenido -->
        <div class="overflow-y-auto modal-content" style="max-height: calc(85vh - 120px);">
          <div v-for="periodo in periodosDisponibles" :key="periodo.key" class="mb-8 sm:mb-10">
            <!-- Encabezado del periodo legislativo (muestra el rango de años completo) -->
            <div class="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 sticky top-0 bg-white z-10">
              <h4 class="text-xl sm:text-2xl font-bold text-white bg-[#E03636] w-full text-center">REDACTOR LEGISLATURA {{ periodo.nombre }}</h4>
              <!-- <div class="flex-1 h-px bg-gray-200"></div>
              <span class="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                {{ totalTomosPorPeriodo(periodo.key) }} tomos
              </span> -->
            </div>
            
            <!-- Grid de tomos - SIEMPRE 6 columnas -->
            <div v-if="obtenerTomosPorPeriodo(periodo.key).length > 0">
              <div class="grid grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-4 px-[4vh]">
                <div 
                  v-for="item in getTomosPaginados(periodo.key)" 
                  :key="item.id"
                  @click="abrirPdf(item.pdfUrl, item)"
                  class="bg-gradient-to-br from-white to-gray-50 rounded-lg p-2 sm:p-3 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-gray-200 hover:border-[#E03636] group"
                >
                  <div class="flex flex-col items-center text-center">
                    <!-- Título del Tomo -->
                    <h5 class="text-sm sm:text-base font-bold text-[#E03636] mt-1">TOMO {{ item.tomo }}</h5>
                    
                    <!-- Portada específica del periodo y tomo -->
                    <div class="w-full aspect-square mb-2 overflow-hidden rounded-lg shadow-md bg-gray-100">
                      <img 
                        :src="item.portada || getPortadaPorDefecto(periodo.key, item.tomo)"
                        :alt="`Tomo ${item.tomo} - Gestión ${periodo.nombre}`"
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        @error="(e) => handleImageError(e, periodo.key, item.tomo)"
                      />
                    </div>
                    
                    <!-- Badge de PDF -->
                    <div class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-[#E03636]/10 rounded-full text-[#E03636] text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      <span>PDF</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Paginación -->
              <div v-if="totalTomosPorPeriodo(periodo.key) > 6" class="flex flex-wrap justify-center items-center gap-2 mt-4 mb-2">
                <button 
                  @click="paginaAnterior(periodo.key)"
                  :disabled="paginaActual[periodo.key] === 1"
                  class="px-2 sm:px-3 py-1 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium"
                  :class="paginaActual[periodo.key] === 1 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-[#E03636] hover:text-white'"
                >
                  ← Anterior
                </button>
                
                <div class="flex gap-1 flex-wrap justify-center">
                  <button 
                    v-for="pag in totalPaginas(periodo.key)"
                    :key="pag"
                    @click="irAPagina(periodo.key, pag)"
                    class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium"
                    :class="paginaActual[periodo.key] === pag 
                      ? 'bg-[#E03636] text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  >
                    {{ pag }}
                  </button>
                </div>
                
                <button 
                  @click="paginaSiguiente(periodo.key)"
                  :disabled="paginaActual[periodo.key] === totalPaginas(periodo.key)"
                  class="px-2 sm:px-3 py-1 rounded-lg transition-all duration-300 text-xs sm:text-sm font-medium"
                  :class="paginaActual[periodo.key] === totalPaginas(periodo.key) 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-[#E03636] hover:text-white'"
                >
                  Siguiente →
                </button>
              </div>

              <!-- Indicador de rango -->
              <div v-if="totalTomosPorPeriodo(periodo.key) > 6" class="text-center text-xs text-gray-400 mt-2">
                Mostrando {{ inicioIndice(periodo.key) }} - {{ finIndice(periodo.key) }} de {{ totalTomosPorPeriodo(periodo.key) }} tomos
              </div>
            </div>

            <!-- Mensaje si no hay tomos -->
            <div v-else class="text-center py-6 sm:py-8 bg-gray-50 rounded-lg">
              <p class="text-gray-400 text-sm">No hay tomos disponibles para este periodo</p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button 
            @click="modalStore.closeModal"
            class="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 font-medium flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Cerrar
          </button>
          
          <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button 
              v-if="ultimoTomoAbierto"
              @click="abrirPdfDirecto(ultimoTomoAbierto)"
              class="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#E4D294] text-[#E03636] rounded-lg hover:bg-[#d4c284] transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-md"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              Último Visto: Tomo {{ ultimoTomoAbierto }}
            </button>
            
            <button 
              @click="abrirUltimoTomo"
              class="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#E03636] text-white rounded-lg hover:bg-[#C12F2F] transition-all duration-300 font-medium flex items-center justify-center gap-2 shadow-md"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
              Último Tomo
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()

// Estado de paginación
const paginaActual = ref({})
const registrosPorPagina = 6

// Último tomo visto
const ultimoTomoAbierto = ref(null)

// Cargar último tomo visto
if (process.client) {
  const saved = localStorage.getItem('ultimoTomoRedactor')
  if (saved) ultimoTomoAbierto.value = saved
}

// Computed para periodos disponibles (agrupados por rango de años)
const periodosDisponibles = computed(() => {
  const periodosMap = new Map()
  const tomos = modalStore.modalProps?.tomos || []
  
  tomos.forEach(tomo => {
    if (tomo.periodo && !periodosMap.has(tomo.periodo)) {
      periodosMap.set(tomo.periodo, {
        key: tomo.periodo,
        nombre: tomo.periodo
      })
    }
  })
  
  // Ordenar periodos de más reciente a más antiguo
  return Array.from(periodosMap.values()).sort((a, b) => {
    const getEndYear = (periodo) => {
      const years = periodo.split('-')
      return parseInt(years[years.length - 1]) || 0
    }
    return getEndYear(b.key) - getEndYear(a.key)
  })
})

// Obtener tomos por periodo
const obtenerTomosPorPeriodo = (periodo) => {
  const todosLosTomos = modalStore.modalProps?.tomos || []
  return todosLosTomos
    .filter(tomo => tomo.periodo === periodo && tomo.disponible !== false)
    .sort((a, b) => {
      const numA = romanoAEntero(a.tomo)
      const numB = romanoAEntero(b.tomo)
      return numA - numB
    })
}

// Función auxiliar para convertir romano a entero
const romanoAEntero = (romano) => {
  const romanos = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
    'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
    'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15
  }
  return romanos[romano] || 0
}

// Total de tomos por periodo
const totalTomosPorPeriodo = (periodo) => {
  return obtenerTomosPorPeriodo(periodo).length
}

// Total de páginas
const totalPaginas = (periodo) => {
  return Math.ceil(totalTomosPorPeriodo(periodo) / registrosPorPagina)
}

// Inicializar página
const inicializarPagina = (periodo) => {
  if (!paginaActual.value[periodo]) {
    paginaActual.value[periodo] = 1
  }
}

// Obtener tomos paginados
const getTomosPaginados = (periodo) => {
  inicializarPagina(periodo)
  const tomos = obtenerTomosPorPeriodo(periodo)
  const inicio = (paginaActual.value[periodo] - 1) * registrosPorPagina
  const fin = inicio + registrosPorPagina
  return tomos.slice(inicio, fin)
}

// Índices
const inicioIndice = (periodo) => {
  inicializarPagina(periodo)
  return (paginaActual.value[periodo] - 1) * registrosPorPagina + 1
}

const finIndice = (periodo) => {
  inicializarPagina(periodo)
  const fin = paginaActual.value[periodo] * registrosPorPagina
  return Math.min(fin, totalTomosPorPeriodo(periodo))
}

// Navegación
const paginaAnterior = (periodo) => {
  inicializarPagina(periodo)
  if (paginaActual.value[periodo] > 1) paginaActual.value[periodo]--
}

const paginaSiguiente = (periodo) => {
  inicializarPagina(periodo)
  if (paginaActual.value[periodo] < totalPaginas(periodo)) paginaActual.value[periodo]++
}

const irAPagina = (periodo, pagina) => {
  paginaActual.value[periodo] = pagina
}

// Obtener portada por defecto
const getPortadaPorDefecto = (periodo, tomo) => {
  return `/images/portadas/${periodo}/tomo-${tomo}.jpg`
}

// Manejar error de imagen
const handleImageError = (e, periodo, tomo) => {
  e.target.src = `/images/portadas/default.jpg`
}

// Obtener último tomo
const ultimoTomo = computed(() => {
  return modalStore.modalProps?.obtenerUltimoTomo?.()
})

// Abrir PDF
const abrirPdf = (url, tomoInfo) => {
  if (url) {
    window.open(url, '_blank')
    if (tomoInfo && tomoInfo.tomo) {
      localStorage.setItem('ultimoTomoRedactor', tomoInfo.tomo)
      ultimoTomoAbierto.value = tomoInfo.tomo
    }
  } else {
    alert('Este documento no está disponible actualmente')
  }
}

const abrirPdfDirecto = (tomoId) => {
  const todosLosTomos = modalStore.modalProps?.tomos || []
  const tomo = todosLosTomos.find(t => t.tomo === tomoId)
  if (tomo && tomo.pdfUrl) {
    window.open(tomo.pdfUrl, '_blank')
  } else {
    alert('No se encontró el documento')
  }
}

const abrirUltimoTomo = () => {
  if (ultimoTomo.value && ultimoTomo.value.pdfUrl) {
    window.open(ultimoTomo.value.pdfUrl, '_blank')
    localStorage.setItem('ultimoTomoRedactor', ultimoTomo.value.tomo)
    ultimoTomoAbierto.value = ultimoTomo.value.tomo
  } else {
    alert('No hay tomos disponibles')
  }
}
</script>

<style scoped>
/* Grid fijo de 6 columnas */
.grid-cols-6 {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

@media (max-width: 640px) {
  .grid-cols-6 {
    gap: 0.5rem;
  }
}

.modal-backdrop {
  z-index: 9999999 !important;
  background-color: rgba(0, 0, 0, 0.85) !important;
  backdrop-filter: blur(4px);
}

.modal-container {
  z-index: 10000000 !important;
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #E03636;
  border-radius: 4px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.aspect-square {
  aspect-ratio: 4 / 5;
}
</style>