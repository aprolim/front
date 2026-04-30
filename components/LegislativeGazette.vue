<!-- components/LegislativeGazette.vue -->
<template>
  <div class="w-full min-h-screen flex flex-col bg-gray-50">
    <div class="relative overflow-hidden mt-[4.2vw]">
        <h2 class="font-bold text-white leading-tight
                    text-[11px] xs:text-[14px] sm:text-[18px] md:text-[22px] 
                    lg:text-[26px] xl:text-[30px] 2xl:text-[39px] 
                    3xl:text-[58px] 4xl:text-[80px] 5xl:text-[102px] text-center
                    p-1 bg-[#E03636] shadow-2xl">
            Gaceta Legislativa 
        </h2>
    </div>

    <!-- Contenedor de 2 columnas -->
    <div class="flex-1 mx-auto px-4 pt-[4vw]">
      <div class="grid grid-cols-1 md:grid-cols-1 gap-8 md:gap-12 lg:gap-16 mx-auto">
      
        <!-- COLUMNA 1: Informe de gestion -->
        <!-- <div class="flex flex-col h-full group px-[6vw]">
          <div class="relative w-full h-[26vw] overflow-hidden shadow-xl mb-6 bg-white p-[0.6em]">
            <img 
              src="/images/gaceta-oficial.jpg" 
              alt="Gaceta Oficial" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
              @click="abrirGacetaOficial"
            />
          </div>
          
          <div class="flex justify-center">
            <NuxtLink 
              to="/" 
              class="bg-[#E03636] hover:bg-[#C12F2F] text-white font-bold py-[.4em] px-[0.8em] rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Ver más
            </NuxtLink>
          </div>
        </div> -->

        <!-- COLUMNA 2: redactor -->
        <div class="flex flex-col h-full group px-[6vw]">
          <div class="relative w-full h-[26vw] overflow-hidden shadow-xl mb-6 bg-white p-[0.6em]">
            <img 
              src="/images/gaceta-historica.jpg" 
              alt="Gaceta Histórica" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-pointer"
              @click="abrirUltimoTomoRedactor"
            />
          </div>
          
          <!-- Botón Ver más que abre modal -->
          <div class="flex justify-center">
            <button 
              @click="abrirModalRedactor"
              class="bg-[#E03636] hover:bg-[#C12F2F] text-white font-bold py-[.4em] px-[0.8em] rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Ver más
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para seleccionar tomos del Redactor -->
    <div 
      v-if="modalAbierto" 
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click.self="cerrarModal"
    >
      <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all">
        <!-- Header del modal -->
        <div class="bg-[#E03636] text-white px-6 py-4 flex justify-between items-center">
          <h3 class="text-xl font-bold">Tomos del Redactor</h3>
          <button 
            @click="cerrarModal"
            class="text-white hover:text-gray-200 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Contenido del modal -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <!-- Agrupación por Tomo -->
          <div v-for="(grupoTomo, tomoNum) in tomosAgrupados" :key="tomoNum" class="mb-8">
            <h4 class="text-2xl font-bold text-gray-800 border-b-2 border-[#E03636] pb-2 mb-4">
              Tomo {{ tomoNum }}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="(item, index) in grupoTomo" 
                :key="index"
                @click="abrirTomoRedactor(item)"
                class="bg-gray-50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-gray-100 border border-gray-200"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <svg class="w-5 h-5 text-[#E03636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      <span class="font-semibold text-gray-700">Periodo {{ item.periodo }}</span>
                    </div>
                    <div class="text-sm text-gray-500 ml-7">
                      Click para visualizar
                    </div>
                  </div>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Tomos faltantes/no disponibles -->
          <div v-if="tomosFaltantes.length > 0" class="mt-8">
            <h4 class="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">
              Próximamente
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="(tomo, index) in tomosFaltantes" 
                :key="'faltante-' + index"
                class="bg-gray-100 rounded-lg p-4 opacity-60 cursor-not-allowed"
              >
                <div class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <div class="font-semibold text-gray-500">Tomo {{ tomo.tomo }}</div>
                    <div class="text-xs text-gray-400">{{ tomo.periodo }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer del modal -->
        <div class="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <button 
            @click="cerrarModal"
            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Consumir el composable
const { tomos, tomosFaltantes } = useRedactorTomos()

// Estado del modal
const modalAbierto = ref(false)

// Filtrar solo tomos disponibles
const tomosDisponibles = computed(() => {
  return tomos.filter(tomo => tomo.disponible !== false)
})

// Agrupar tomos por número de tomo
const tomosAgrupados = computed(() => {
  const agrupados = {}
  
  tomosDisponibles.value.forEach(tomo => {
    const numeroTomo = tomo.tomo
    if (!agrupados[numeroTomo]) {
      agrupados[numeroTomo] = []
    }
    agrupados[numeroTomo].push(tomo)
  })
  
  // Ordenar los periodos dentro de cada tomo (más reciente primero)
  Object.keys(agrupados).forEach(key => {
    agrupados[key].sort((a, b) => {
      // Extraer años del periodo (ej: "2023-2024" -> 2024, "2025-2026" -> 2026)
      const getEndYear = (periodo) => {
        const years = periodo.split('-')
        return parseInt(years[years.length - 1])
      }
      return getEndYear(b.periodo) - getEndYear(a.periodo)
    })
  })
  
  // Ordenar los tomos numéricamente
  const sortedAgrupados = {}
  Object.keys(agrupados)
    .sort((a, b) => {
      const numA = romanoAEntero(a)
      const numB = romanoAEntero(b)
      return numA - numB
    })
    .forEach(key => {
      sortedAgrupados[key] = agrupados[key]
    })
  
  return sortedAgrupados
})

// Función para convertir número romano a entero
const romanoAEntero = (romano) => {
  const romanos = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
    'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
    'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15
  }
  return romanos[romano] || 0
}

// Función para obtener el último tomo basado en el año/periodo más reciente
const obtenerUltimoTomo = () => {
  if (tomosDisponibles.value.length === 0) return null
  
  // Ordenar por año más reciente (usando el año final del periodo)
  const tomosOrdenados = [...tomosDisponibles.value].sort((a, b) => {
    const getEndYear = (periodo) => {
      const years = periodo.split('-')
      return parseInt(years[years.length - 1])
    }
    return getEndYear(b.periodo) - getEndYear(a.periodo)
  })
  
  return tomosOrdenados[0]
}

// Abrir el último tomo del redactor (basado en año más reciente)
const abrirUltimoTomoRedactor = () => {
  const ultimoTomo = obtenerUltimoTomo()
  if (ultimoTomo && ultimoTomo.pdfUrl) {
    window.open(ultimoTomo.pdfUrl, '_blank')
  } else {
    console.error('No hay tomos disponibles')
    alert('No hay tomos disponibles para visualizar')
  }
}

// Abrir modal
const abrirModalRedactor = () => {
  modalAbierto.value = true
}

// Cerrar modal
const cerrarModal = () => {
  modalAbierto.value = false
}

// Abrir tomo específico desde el modal
const abrirTomoRedactor = (tomo) => {
  if (tomo && tomo.pdfUrl) {
    window.open(tomo.pdfUrl, '_blank')
    // Opcional: cerrar el modal después de seleccionar
    // cerrarModal()
  } else {
    alert('Este tomo no está disponible actualmente')
  }
}

// Abrir Gaceta Oficial
const abrirGacetaOficial = () => {
  window.open('/gaceta-oficial', '_blank')
}
</script>

<style scoped>
/* Animación para el borde de la franja */
@keyframes gentleGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(224, 54, 54, 0.2); }
  50% { box-shadow: 0 0 25px rgba(224, 54, 54, 0.4); }
}

.full-width-franja {
  animation: gentleGlow 3s ease-in-out infinite;
}

/* Asegurar que las columnas tengan la misma altura */
.grid > div {
  height: 100%;
}

/* Hover effects para los botones */
a, button {
  transition: all 0.3s ease;
}

a:hover, button:hover {
  transform: translateY(-2px);
}

/* Estilos para el scroll del modal */
.max-h-\[calc\(90vh-120px\)\]::-webkit-scrollbar {
  width: 8px;
}

.max-h-\[calc\(90vh-120px\)\]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.max-h-\[calc\(90vh-120px\)\]::-webkit-scrollbar-thumb {
  background: #E03636;
  border-radius: 4px;
}

.max-h-\[calc\(90vh-120px\)\]::-webkit-scrollbar-thumb:hover {
  background: #C12F2F;
}

/* Animación del modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>