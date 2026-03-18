<template>
  <div class="legislation-container">
    <!-- Mostrar tabla SOLO si hash cumple condición Y el filtro es válido -->
    <template v-if="hashValido && filtroValido">
      <!-- Header con título y buscador -->
      <div class="legislation-header">
        <h2 class="legislation-title">
          <span class="title-icon">📋</span>
          {{ tituloSeccion }}
          <span v-if="!loading && !error" class="badge">{{ totalItems }} registros</span>
        </h2>
        
        <div class="header-controls">
          <!-- Selector de filas por página - CORREGIDO con .number -->
          <div class="rows-per-page">
            <span>Mostrar</span>
            <select v-model.number="itemsPorPagina" @change="cambiarFilasPorPagina">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>filas</span>
          </div>

          <!-- Buscador local -->
          <div class="search-box">
            <input 
              type="text" 
              v-model="terminoBusquedaLocal"
              @keyup.enter="aplicarBusquedaLocal"
              placeholder="Buscar por título, número o asunto..."
              class="search-input"
            >
            <button @click="aplicarBusquedaLocal" class="search-button" :disabled="loading">
              <span class="search-icon">🔍</span>
            </button>
            <button 
              v-if="terminoBusquedaLocal" 
              @click="limpiarBusquedaLocal" 
              class="clear-button"
              title="Limpiar búsqueda"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- Estado de carga -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando proyectos de ley...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="error-state">
        <span class="error-icon">⚠️</span>
        <p>{{ error }}</p>
        <button @click="cargarDatosCompletos" class="retry-button">Reintentar</button>
      </div>

      <!-- Tabla de resultados -->
      <div v-else class="table-responsive">
        <table class="legislation-table">
          <thead>
            <tr>
              <th @click="ordenarPor('titulo')" class="sortable">
                Título / Número
                <span class="sort-icon">{{ getSortIcon('titulo') }}</span>
              </th>
              <th @click="ordenarPor('asunto')" class="sortable">
                Asunto
                <span class="sort-icon">{{ getSortIcon('asunto') }}</span>
              </th>
              <th class="actions-column">Documento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in itemsPaginados" :key="item.id" class="legislation-row">
              <td class="title-cell">
                <div class="titulo-principal">{{ item.titulo }}</div>
                <div class="numero-ley">N° {{ item.numero }}</div>
              </td>
              <td class="asunto-cell">
                <div class="asunto-texto">{{ truncarTexto(item.asunto, 80) }}</div>
              </td>
              <td class="actions-cell">
                <a 
                  :href="`https://apisi.senado.gob.bo/${item.documento}`" 
                  target="_blank"
                  class="btn-documento"
                  title="Ver documento PDF"
                >
                  <span class="btn-icon">📄</span>
                  <span class="btn-text">PDF</span>
                </a>
              </td>
            </tr>
            
            <!-- Fila cuando no hay resultados -->
            <tr v-if="itemsFiltrados.length === 0">
              <td colspan="3" class="empty-state">
                <p>No se encontraron proyectos de ley</p>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Información de depuración (opcional, puedes quitarla después) -->
        <div class="debug-info p-2 text-xs border-t border-gray-200 bg-gray-50">
          <p>Página: {{ paginaActual }} | Items por página: {{ itemsPorPagina }} ({{ typeof itemsPorPagina }}) | Total items: {{ itemsOrdenados.length }} | Mostrando: {{ itemsPaginados.length }} items</p>
        </div>
      </div>

      <!-- Pie de tabla con paginación -->
      <div v-if="itemsFiltrados.length > 0 && !loading" class="table-footer">
        <div class="pagination-info">
          Mostrando {{ (paginaActual - 1) * itemsPorPagina + 1 }} - 
          {{ Math.min(paginaActual * itemsPorPagina, itemsFiltrados.length) }} de 
          {{ itemsFiltrados.length }} proyectos
        </div>
        
        <div class="pagination-controls">
          <button 
            class="pagination-btn" 
            :disabled="paginaActual === 1"
            @click="cambiarPagina(paginaActual - 1)"
          >
            ← Anterior
          </button>
          
          <div class="pagination-numbers">
            <button 
              v-for="page in paginasMostradas" 
              :key="page"
              class="pagination-number"
              :class="{ active: page === paginaActual }"
              @click="cambiarPagina(page)"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            class="pagination-btn" 
            :disabled="paginaActual === totalPaginas"
            @click="cambiarPagina(paginaActual + 1)"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </template>

    <!-- Contenido cuando el filtro NO es válido o no está establecido -->
    <template v-else>
      <div v-if="cargandoTabs" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando opciones...</p>
      </div>
      
      <div v-else-if="errorTabs" class="error-state">
        <span class="error-icon">⚠️</span>
        <p>{{ errorTabs }}</p>
        <button @click="cargarTabsLegislacion" class="retry-button">Reintentar</button>
      </div>

      <div v-else class="tabs-content px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6">
        <!-- Header de Sección (Legislación) -->
        <div class="section-header text-center pb-0.5 sm:pb-1 mb-1 sm:mb-2 border-b border-[#E03636] border-opacity-30">
          <h2 class="section-title font-bold text-[#E03636] text-[9px] sm:text-[10px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[19px] 3xl:text-[24px] 4xl:text-[35px] 5xl:text-[52px] mb-0">
            {{ areaLegislacion?.titulo || 'Legislación' }}
          </h2>
          <p class="section-description text-gray-600 text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[11px] 2xl:text-[16px] 3xl:text-[19px] 4xl:text-[30px] 5xl:text-[45px] mx-auto">
            {{ areaLegislacion?.descripcion || 'Acceda a toda la información relacionada con los proyectos de ley y legislación' }}
          </p>
        </div>
        
        <!-- Grid de Tarjetas - CON NUXT LINK -->
        <div class="links-grid grid gap-1 sm:gap-1.5 md:gap-2 xl:gap-4 3xl:gap-6 5xl:gap-9 grid-cols-3">
          <NuxtLink 
            v-for="link in linksLegislacion" 
            :key="link.id"
            :to="link.path" 
            class="link-card flex items-center bg-white bg-opacity-85 backdrop-blur-[10px] 
              rounded-sm sm:rounded-md md:rounded-lg lg:rounded-xl shadow-sm hover:shadow-md 
              p-1 sm:p-1.5 md:p-2
              hover:-translate-y-0.5 transition-all duration-300
              text-gray-900 no-underline
              group"
            @mouseenter="hoveredCard = link.id"
            @mouseleave="hoveredCard = null"
          >
            <!-- Contenedor del icono con tamaño fijo -->
            <div 
              class="icon-container flex-shrink-0 
                m-2.5 sm:m-3 md:m-3 lg:m-4 xl:m-5 2xl:m-6 3xl:m-8 4xl:m-10 5xl:m-12
                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 
                2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 4xl:w-28 4xl:h-28 5xl:w-32 5xl:h-32
                rounded-full transition-all duration-300"
              :class="{
                'bg-[#E03636]': hoveredCard === link.id,
                'scale-110': hoveredCard === link.id
              }"
            >
              <div 
                class="w-full h-full flex items-center justify-center transition-colors duration-300"
                :class="hoveredCard === link.id ? 'text-white' : 'text-[#E03636]'"
              >
                <!-- Inyectamos el SVG y forzamos su tamaño -->
                <div class="svg-wrapper w-[97%] h-[97%]" v-html="link.icono"></div>
              </div>
            </div>
            
            <div class="link-content flex-1 min-w-0">
              <h3 class="link-title font-semibold text-gray-900
                text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[13px] 
                2xl:text-[17px] 3xl:text-[22px] 4xl:text-[32px] 5xl:text-[50px] 
                mb-0 leading-tight truncate">
                {{ link.titulo }}
              </h3>
              <p class="link-description text-gray-600
                text-[5px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[12px] 
                2xl:text-[16px] 3xl:text-[19px] 4xl:text-[30px] 5xl:text-[45px]
                leading-tight line-clamp-2">
                {{ link.descripcion }}
              </p>
            </div>
            
            <div class="link-arrow text-[#E03636] ml-0.5 flex-shrink-0
              text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[18px] 
              2xl:text-[22px] 3xl:text-[27px] 4xl:text-[35px] 5xl:text-[70px]">
              ›
            </div>
          </NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Estado para controlar qué tarjeta está en hover
const hoveredCard = ref(null)

// Configuración de endpoints disponibles para los datos de la tabla
const ENDPOINTS = {
  'proyectos-de-ley-en-tratamiento': {
    url: 'https://apisi.senado.gob.bo/page/ley-tratamiento/buscar',
    titulo: 'Proyectos de Ley en Tratamiento',
    procesarRespuesta: (data) => {
      if (data.data && data.data.data) {
        return data.data.data
      }
      return []
    },
    obtenerTotalPaginas: (data) => {
      return data.data?.last_page || 1
    }
  },
  'proyectos-de-ley-aprobados': {
    url: 'https://apisi.senado.gob.bo/page/ley-aprobados/buscar',
    titulo: 'Proyectos de Ley Aprobados',
    procesarRespuesta: (data) => {
      if (data.data && data.data.data) {
        return data.data.data
      }
      return []
    },
    obtenerTotalPaginas: (data) => {
      return data.data?.last_page || 1
    }
  },
  'proyectos-de-ley-sansionados': {
    url: 'https://apisi.senado.gob.bo/page/ley-sancionada/buscar',
    titulo: 'Leyes Sancionadas',
    procesarRespuesta: (data) => {
      if (data.data && data.data.data) {
        return data.data.data
      }
      return []
    },
    obtenerTotalPaginas: (data) => {
      return data.data?.last_page || 1
    }
  },
  'proyectos-de-ley-con-modificaciones': {
    url: 'https://apisi.senado.gob.bo/page/ley-devuelto/buscar',
    titulo: 'Proyectos de Ley con Modificaciones',
    procesarRespuesta: (data) => {
      if (data.data && data.data.data) {
        return data.data.data
      }
      return []
    },
    obtenerTotalPaginas: (data) => {
      return data.data?.last_page || 1
    }
  },
  'leyes-promulgadas': {
    url: 'https://apisi.senado.gob.bo/page/ley-promulgada/buscar',
    titulo: 'Leyes Promulgadas',
    procesarRespuesta: (data) => {
      if (data.data && data.data.data) {
        return data.data.data
      }
      return []
    },
    obtenerTotalPaginas: (data) => {
      return data.data?.last_page || 1
    }
  },
  'proyectos-de-ley-rechazados': {
    url: 'https://apisi.senado.gob.bo/page/ley-rechazada/buscar',
    titulo: 'Proyectos de Ley Rechazados',
    procesarRespuesta: (data) => {
      if (data.data && data.data.data) {
        return data.data.data
      }
      return []
    },
    obtenerTotalPaginas: (data) => {
      return data.data?.last_page || 1
    }
  }
}

const props = defineProps({
  hash: {
    type: [String, Object],
    default: "gestion-legislativa"
  },
  query: {
    type: Object,
    validator: (obj) => {
      return obj && typeof obj === 'object'
    }
  }
})

const emit = defineEmits(['update:query'])

// Datos de tabs desde la API externa
const tabsData = ref(null)
const cargandoTabs = ref(false)
const errorTabs = ref(null)

// Datos para la tabla
const todosLosDatos = ref([])
const loading = ref(false)
const error = ref(null)
const paginaActual = ref(1)
const itemsPorPagina = ref(5) // Inicializado como número
const terminoBusquedaLocal = ref('')
const busquedaLocalActiva = ref('')
const orden = ref({
  columna: 'titulo',
  direccion: 'desc'
})

// Computed properties
const hashValido = computed(() => {
  return props.hash === 'permitido' || true
})

const filtroActual = computed(() => {
  return props.query?.filtro
})

const filtroValido = computed(() => {
  console.log('Filtro actual:', filtroActual.value)
  return ENDPOINTS.hasOwnProperty(filtroActual.value)
})

const endpointConfig = computed(() => {
  if (!filtroValido.value) return null
  return ENDPOINTS[filtroActual.value]
})

const tituloSeccion = computed(() => {
  return endpointConfig.value?.titulo || 'Proyectos de Ley'
})

// Datos de legislación desde la API de tabs
const areaLegislacion = computed(() => {
  return tabsData.value?.areas?.legislacion || null
})

const linksLegislacion = computed(() => {
  return tabsData.value?.links?.legislacion || []
})

// Computed para la tabla
const itemsFiltrados = computed(() => {
  let datos = [...todosLosDatos.value]
  
  if (busquedaLocalActiva.value && busquedaLocalActiva.value.trim() !== '') {
    const termino = busquedaLocalActiva.value.toLowerCase().trim()
    datos = datos.filter(item => 
      (item.titulo && item.titulo.toLowerCase().includes(termino)) ||
      (item.numero && item.numero.toLowerCase().includes(termino)) ||
      (item.asunto && item.asunto.toLowerCase().includes(termino))
    )
  }
  
  return datos
})

const itemsOrdenados = computed(() => {
  if (!itemsFiltrados.value.length) return []
  
  return [...itemsFiltrados.value].sort((a, b) => {
    if (orden.value.columna === 'titulo') {
      const partesA = desenmascararTitulo(a.titulo)
      const partesB = desenmascararTitulo(b.titulo)
      
      if (orden.value.direccion === 'asc') {
        if (partesA.anioInicio < partesB.anioInicio) return -1
        if (partesA.anioInicio > partesB.anioInicio) return 1
        if (partesA.numeroIzquierda < partesB.numeroIzquierda) return -1
        if (partesA.numeroIzquierda > partesB.numeroIzquierda) return 1
        return 0
      } else {
        if (partesA.anioInicio > partesB.anioInicio) return -1
        if (partesA.anioInicio < partesB.anioInicio) return 1
        if (partesA.numeroIzquierda > partesB.numeroIzquierda) return -1
        if (partesA.numeroIzquierda < partesB.numeroIzquierda) return 1
        return 0
      }
    } else {
      const valorA = a[orden.value.columna] || ''
      const valorB = b[orden.value.columna] || ''
      
      if (orden.value.direccion === 'asc') {
        if (valorA < valorB) return -1
        if (valorA > valorB) return 1
      } else {
        if (valorA > valorB) return -1
        if (valorA < valorB) return 1
      }
      return 0
    }
  })
})

const itemsPaginados = computed(() => {
  // Asegurar que itemsPorPagina es número
  const itemsPorPaginaNum = Number(itemsPorPagina.value)
  const inicio = (paginaActual.value - 1) * itemsPorPaginaNum
  const fin = inicio + itemsPorPaginaNum
  
  // Log para depuración
  console.log(`📊 Página ${paginaActual.value}: items ${inicio} a ${fin} (${itemsPorPaginaNum} por página) - Total: ${itemsOrdenados.value.length}`)
  
  return itemsOrdenados.value.slice(inicio, fin)
})

const totalItems = computed(() => {
  return todosLosDatos.value.length
})

const totalPaginas = computed(() => {
  // Asegurar que itemsPorPagina es número
  const itemsPorPaginaNum = Number(itemsPorPagina.value)
  return Math.ceil(itemsFiltrados.value.length / itemsPorPaginaNum)
})

const paginasMostradas = computed(() => {
  const total = totalPaginas.value
  const actual = paginaActual.value
  const rango = 5
  
  let inicio = Math.max(1, actual - Math.floor(rango / 2))
  let fin = Math.min(total, inicio + rango - 1)
  
  if (fin - inicio + 1 < rango) {
    inicio = Math.max(1, fin - rango + 1)
  }
  
  return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i)
})

// Funciones auxiliares
const desenmascararTitulo = (titulo) => {
  if (!titulo) return { numeroIzquierda: 0, anioInicio: 0 }
  
  const matchNumero = titulo.match(/N[°\s]*(\d+)/i)
  const numeroIzquierda = matchNumero ? parseInt(matchNumero[1], 10) : 0
  
  const indexBarra = titulo.indexOf('/')
  let anioInicio = 0
  
  if (indexBarra !== -1) {
    const parteDerecha = titulo.substring(indexBarra + 1).trim()
    const matchAnio = parteDerecha.match(/(\d{4})/)
    if (matchAnio) {
      anioInicio = parseInt(matchAnio[1], 10)
    }
  }
  
  return { numeroIzquierda, anioInicio }
}

const truncarTexto = (texto, longitud) => {
  if (!texto) return ''
  if (texto.length <= longitud) return texto
  return texto.substring(0, longitud) + '...'
}

const resetearTodo = () => {
  todosLosDatos.value = []
  tabsData.value = null
  paginaActual.value = 1
  terminoBusquedaLocal.value = ''
  busquedaLocalActiva.value = ''
  error.value = null
  errorTabs.value = null
}

const obtenerPagina = async (page) => {
  const url = `${endpointConfig.value.url}?page=${page}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.error(`Error cargando página ${page}:`, err)
    return null
  }
}

const cargarDatosCompletos = async () => {
  if (!endpointConfig.value) {
    error.value = `Filtro "${filtroActual.value}" no válido`
    return
  }
  
  loading.value = true
  error.value = null
  
  try {
    const primeraPagina = await obtenerPagina(1)
    
    if (!primeraPagina) {
      throw new Error('No se pudo obtener la primera página')
    }
    
    const datosPrimeraPagina = endpointConfig.value.procesarRespuesta(primeraPagina) || []
    const todasLasLeyes = [...datosPrimeraPagina]
    
    const totalPaginas = endpointConfig.value.obtenerTotalPaginas(primeraPagina)
    
    if (totalPaginas > 1) {
      const paginasRestantes = Array.from(
        { length: totalPaginas - 1 }, 
        (_, i) => i + 2
      )
      
      const promesas = paginasRestantes.map(page => obtenerPagina(page))
      const resultados = await Promise.all(promesas)
      
      resultados.forEach(res => {
        if (res) {
          const datosPagina = endpointConfig.value.procesarRespuesta(res) || []
          todasLasLeyes.push(...datosPagina)
        }
      })
    }
    
    todosLosDatos.value = todasLasLeyes
    paginaActual.value = 1
    
    console.log(`✅ Cargados ${todosLosDatos.value.length} registros para filtro: ${filtroActual.value}`)
  } catch (err) {
    error.value = 'Error al cargar los datos: ' + err.message
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

const cargarTabsLegislacion = async () => {
  cargandoTabs.value = true
  errorTabs.value = null
  
  try {
    const response = await fetch('http://demoback.senado.gob.bo/api/tabs')
    const data = await response.json()
    
    if (data?.success && data?.data) {
      tabsData.value = data.data
    } else {
      throw new Error('Formato de respuesta inválido')
    }
  } catch (err) {
    errorTabs.value = 'Error al cargar opciones: ' + err.message
    console.error('Error cargando tabs:', err)
  } finally {
    cargandoTabs.value = false
  }
}

const aplicarBusquedaLocal = () => {
  busquedaLocalActiva.value = terminoBusquedaLocal.value || ''
  paginaActual.value = 1
  console.log('🔍 Búsqueda aplicada:', busquedaLocalActiva.value)
}

const limpiarBusquedaLocal = () => {
  terminoBusquedaLocal.value = ''
  busquedaLocalActiva.value = ''
  paginaActual.value = 1
  console.log('🧹 Búsqueda limpiada')
}

const cambiarPagina = (pagina) => {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaActual.value = pagina
    console.log('📄 Cambiando a página:', pagina)
  }
}

// CORREGIDO: Asegurar que itemsPorPagina es número
const cambiarFilasPorPagina = () => {
  // Forzar conversión a número
  itemsPorPagina.value = Number(itemsPorPagina.value)
  paginaActual.value = 1
  console.log('🔢 Items por página cambiado a:', itemsPorPagina.value, '(tipo:', typeof itemsPorPagina.value, ')')
}

const ordenarPor = (columna) => {
  if (orden.value.columna === columna) {
    orden.value.direccion = orden.value.direccion === 'asc' ? 'desc' : 'asc'
  } else {
    orden.value.columna = columna
    orden.value.direccion = 'desc'
  }
  paginaActual.value = 1
  console.log('📊 Ordenando por:', columna, 'dirección:', orden.value.direccion)
}

const getSortIcon = (columna) => {
  if (orden.value.columna !== columna) return '↕️'
  return orden.value.direccion === 'asc' ? '↑' : '↓'
}

// Watchers
watch(() => props.hash, () => {
  resetearTodo()
  if (hashValido.value) {
    if (filtroValido.value) {
      cargarDatosCompletos()
    } else {
      cargarTabsLegislacion()
    }
  }
}, { immediate: true })

// Watch para depurar cambios en itemsPorPagina
watch(itemsPorPagina, (nuevoValor) => {
  console.log('📊 itemsPorPagina cambió a:', nuevoValor, 'tipo:', typeof nuevoValor)
})
</script>

<style scoped>
.legislation-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  background: #f8fafc;
  min-height: 100vh;
}

.legislation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.legislation-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.title-icon {
  font-size: 1.4rem;
}

.badge {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 2px 8px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
}

.header-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.rows-per-page {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 4px 8px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 0.85rem;
  color: #475569;
}

.rows-per-page select {
  border: 1px solid #e2e8f0;
  padding: 4px 8px;
  border-radius: 6px;
  background: white;
  color: #0f172a;
  font-size: 0.85rem;
  cursor: pointer;
  outline: none;
}

.rows-per-page select:hover {
  border-color: #2563eb;
}

.search-box {
  display: flex;
  gap: 4px;
  background: white;
  padding: 3px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
}

.search-input {
  border: 1px solid #e2e8f0;
  padding: 6px 10px;
  font-size: 0.85rem;
  width: 260px;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s;
  padding-right: 65px;
}

.search-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px #2563eb20;
}

.search-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
  position: absolute;
  right: 3px;
  top: 3px;
}

.search-button:hover:not(:disabled) {
  background: #1d4ed8;
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-button {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0 6px;
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  line-height: 1;
}

.clear-button:hover {
  color: #ef4444;
}

.table-responsive {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: auto;
  margin-bottom: 16px;
}

.legislation-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.legislation-table th {
  background: #f8fafc;
  padding: 8px 12px;
  text-align: left;
  font-weight: 600;
  color: #475569;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  background: #f1f5f9;
}

.sort-icon {
  margin-left: 4px;
  font-size: 0.75rem;
  opacity: 0.6;
}

.legislation-row td {
  padding: 8px 12px;
  border-bottom: 1px solid #eef2f6;
  color: #334155;
  line-height: 1.3;
}

.legislation-row:hover td {
  background-color: #f8fafc;
}

.title-cell {
  min-width: 200px;
}

.titulo-principal {
  font-weight: 500;
  color: #0f172a;
  margin-bottom: 2px;
  font-size: 0.85rem;
}

.numero-ley {
  font-size: 0.7rem;
  color: #64748b;
  background: #f1f5f9;
  display: inline-block;
  padding: 1px 6px;
  border-radius: 10px;
}

.asunto-cell {
  max-width: 400px;
}

.asunto-texto {
  line-height: 1.3;
  color: #475569;
  font-size: 0.8rem;
}

.actions-cell {
  width: 70px;
  text-align: center;
}

.btn-documento {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #2563eb;
  color: white;
  text-decoration: none;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.btn-documento:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
}

.btn-icon {
  font-size: 0.8rem;
}

.debug-info {
  background-color: #f1f5f9;
  border-radius: 0 0 10px 10px;
  font-family: monospace;
  color: #334155;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px 0;
  font-size: 0.85rem;
}

.pagination-info {
  color: #64748b;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination-btn {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 6px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 4px;
}

.pagination-number {
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.8rem;
  font-weight: 500;
}

.pagination-number:hover:not(.active):not(:disabled) {
  background: #f1f5f9;
  border-color: #94a3b8;
}

.pagination-number.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.loading-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e2e8f0;
  border-top-color: #2563eb;
  border-radius: 50%;
  margin: 0 auto 12px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 10px;
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 12px;
  display: block;
}

.retry-button {
  background: #2563eb;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 12px;
}

.retry-button:hover {
  background: #1d4ed8;
}

.empty-state {
  text-align: center;
  padding: 40px !important;
  color: #94a3b8;
  font-size: 0.95rem;
}

/* Estilos para las tarjetas */
.tabs-content {
  background: transparent;
}

.section-header {
  border-bottom: 1px solid rgba(224, 54, 54, 0.3);
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
}

@media (min-width: 640px) {
  .section-header {
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

.section-title {
  font-weight: bold;
  color: #E03636;
  margin-bottom: 0;
  font-size: 9px;
}

@media (min-width: 640px) {
  .section-title {
    font-size: 10px;
  }
}

@media (min-width: 768px) {
  .section-title {
    font-size: 10px;
  }
}

@media (min-width: 1024px) {
  .section-title {
    font-size: 12px;
  }
}

@media (min-width: 1280px) {
  .section-title {
    font-size: 14px;
  }
}

@media (min-width: 1536px) {
  .section-title {
    font-size: 19px;
  }
}

.section-description {
  color: #4b5563;
  margin: 0 auto;
  font-size: 6px;
}

@media (min-width: 640px) {
  .section-description {
    font-size: 7px;
  }
}

@media (min-width: 768px) {
  .section-description {
    font-size: 8px;
  }
}

@media (min-width: 1024px) {
  .section-description {
    font-size: 9px;
  }
}

@media (min-width: 1280px) {
  .section-description {
    font-size: 11px;
  }
}

@media (min-width: 1536px) {
  .section-description {
    font-size: 16px;
  }
}

.links-grid {
  display: grid;
  gap: 0.25rem;
  grid-template-columns: repeat(3, 1fr);
}

@media (min-width: 640px) {
  .links-grid {
    gap: 0.375rem;
  }
}

@media (min-width: 768px) {
  .links-grid {
    gap: 0.5rem;
  }
}

@media (min-width: 1280px) {
  .links-grid {
    gap: 1rem;
  }
}

.link-card {
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 0.125rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 0.25rem;
  color: #111827;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.link-card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-0.125rem);
}

@media (min-width: 640px) {
  .link-card {
    border-radius: 0.375rem;
    padding: 0.375rem;
  }
}

@media (min-width: 768px) {
  .link-card {
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
}

@media (min-width: 1024px) {
  .link-card {
    border-radius: 0.75rem;
  }
}

.icon-container {
  flex-shrink: 0;
  margin: 0.625rem;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .icon-container {
    margin: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;
  }
}

@media (min-width: 768px) {
  .icon-container {
    margin: 0.75rem;
    width: 3rem;
    height: 3rem;
  }
}

@media (min-width: 1024px) {
  .icon-container {
    margin: 1rem;
    width: 3.5rem;
    height: 3.5rem;
  }
}

@media (min-width: 1280px) {
  .icon-container {
    margin: 1.25rem;
    width: 4rem;
    height: 4rem;
  }
}

@media (min-width: 1536px) {
  .icon-container {
    margin: 1.5rem;
    width: 5rem;
    height: 5rem;
  }
}

.icon-container.bg-\[\#E03636\] {
  background-color: #E03636;
}

.icon-container.scale-110 {
  transform: scale(1.1);
}

.svg-wrapper {
  width: 97%;
  height: 97%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-wrapper svg {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  display: block !important;
}

.svg-wrapper svg[width],
.svg-wrapper svg[height] {
  width: 100% !important;
  height: 100% !important;
}

.link-content {
  flex: 1;
  min-width: 0;
}

.link-title {
  font-weight: 600;
  color: #111827;
  font-size: 7px;
  margin-bottom: 0;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 640px) {
  .link-title {
    font-size: 8px;
  }
}

@media (min-width: 768px) {
  .link-title {
    font-size: 9px;
  }
}

@media (min-width: 1024px) {
  .link-title {
    font-size: 10px;
  }
}

@media (min-width: 1280px) {
  .link-title {
    font-size: 13px;
  }
}

@media (min-width: 1536px) {
  .link-title {
    font-size: 17px;
  }
}

.link-description {
  color: #4b5563;
  font-size: 5px;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 640px) {
  .link-description {
    font-size: 7px;
  }
}

@media (min-width: 768px) {
  .link-description {
    font-size: 8px;
  }
}

@media (min-width: 1024px) {
  .link-description {
    font-size: 9px;
  }
}

@media (min-width: 1280px) {
  .link-description {
    font-size: 12px;
  }
}

@media (min-width: 1536px) {
  .link-description {
    font-size: 16px;
  }
}

.link-arrow {
  color: #E03636;
  margin-left: 0.125rem;
  flex-shrink: 0;
  font-size: 10px;
}

@media (min-width: 640px) {
  .link-arrow {
    font-size: 12px;
  }
}

@media (min-width: 768px) {
  .link-arrow {
    font-size: 13px;
  }
}

@media (min-width: 1024px) {
  .link-arrow {
    font-size: 15px;
  }
}

@media (min-width: 1280px) {
  .link-arrow {
    font-size: 18px;
  }
}

@media (min-width: 1536px) {
  .link-arrow {
    font-size: 22px;
  }
}

/* Utilidades */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.min-w-0 {
  min-width: 0;
}

/* Backdrop filter support */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-\[10px\] {
    backdrop-filter: blur(10px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .legislation-container {
    padding: 12px;
  }
  
  .header-controls {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
  
  .rows-per-page {
    justify-content: center;
  }
  
  .search-input {
    width: 100%;
  }
  
  .table-footer {
    flex-direction: column;
    text-align: center;
  }
  
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .btn-text {
    display: none;
  }
}
</style>