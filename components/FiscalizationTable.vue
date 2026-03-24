<template>
  <div class="fiscalization-container">
    <!-- Mostrar tabla SOLO si hash cumple condición Y el filtro es válido -->
    <template v-if="hashValido && filtroValido" class="mt-[3.5vw]">
      <!-- Header con título, contador y botón volver -->
      <div class="fiscalization-header">
        <div class="header-left">
          <button 
            class="back-button"
            @click="volverAOpciones"
            title="Volver a las opciones de fiscalización"
          >
            <span class="back-icon">←</span>
            <span class="back-text">Volver</span>
          </button>
          <!-- Icono SVG del link seleccionado -->
          <div v-if="iconoActivo" class="title-icon-svg" v-html="iconoActivo"></div>
          <div v-else class="title-icon-placeholder"></div>
          <h2 class="fiscalization-title">
            {{ tituloSeccion }}
            <span v-if="!loading && !error" class="badge">{{ totalItems }} registros</span>
          </h2>
        </div>
        
        <div class="header-controls">
          <!-- Selector de filas por página -->
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
              placeholder="Buscar por título, resumen o destinatario..."
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
        <p>Cargando peticiones de informe...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="error-state">
        <span class="error-icon">⚠️</span>
        <p>{{ error }}</p>
        <button @click="cargarDatosCompletos" class="retry-button">Reintentar</button>
      </div>

      <!-- Tabla de resultados -->
      <div v-else class="table-responsive">
        <table class="fiscalization-table">
          <thead>
            <tr>
              <th @click="ordenarPor('titulo')" class="sortable">
                Título / Número
                <span class="sort-icon">{{ getSortIcon('titulo') }}</span>
              </th>
              <th @click="ordenarPor('resumen')" class="sortable">
                Resumen / Asunto
                <span class="sort-icon">{{ getSortIcon('resumen') }}</span>
              </th>
              <th class="actions-column">Documento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in itemsPaginados" :key="item.id" class="fiscalization-row">
              <td class="title-cell">
                <div class="titulo-principal">{{ item.titulo }}</div>
                <div class="numero-ley">ID: {{ item.id }}</div>
               </td>
              <td class="asunto-cell">
                <div class="asunto-texto">{{ truncarTexto(item.resumen, 80) }}</div>
                <div v-if="item.tipo_destinatario" class="destinatario-info">
                  <span class="destinatario-label">Destinatario:</span> {{ item.tipo_destinatario }}
                </div>
                <div v-if="item.fecha_recepcion" class="fecha-info">
                  <span class="fecha-label">Recibido:</span> {{ formatearFecha(item.fecha_recepcion) }}
                </div>
              </td>
              <td class="actions-cell">
                <a 
                  v-if="item.doc_archivo"
                  :href="`https://apisi.senado.gob.bo/${item.doc_archivo}`" 
                  target="_blank"
                  class="btn-documento"
                  title="Ver documento PDF"
                >
                  <span class="btn-icon">📄</span>
                  <span class="btn-text">PDF</span>
                </a>
                <span v-else class="sin-documento">Sin documento</span>
              </td>
            </tr>
            
            <!-- Fila cuando no hay resultados -->
            <tr v-if="itemsFiltrados.length === 0">
              <td colspan="3" class="empty-state">
                <p>No se encontraron peticiones de informe</p>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Información de depuración (opcional) -->
        <div class="debug-info p-2 text-xs border-t border-gray-200 bg-gray-50">
          <p>Página: {{ paginaActual }} | Items por página: {{ itemsPorPagina }} | Total items: {{ itemsOrdenados.length }} | Mostrando: {{ itemsPaginados.length }} items | Filtro: {{ filtroActual || 'ninguno' }}</p>
        </div>
      </div>

      <!-- Pie de tabla con paginación -->
      <div v-if="itemsFiltrados.length > 0 && !loading" class="table-footer">
        <div class="pagination-info">
          Mostrando {{ (paginaActual - 1) * itemsPorPagina + 1 }} - 
          {{ Math.min(paginaActual * itemsPorPagina, itemsFiltrados.length) }} de 
          {{ itemsFiltrados.length }} peticiones
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
        <button @click="cargarTabsFiscalizacion" class="retry-button">Reintentar</button>
      </div>

      <div v-else class="tabs-content px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6">
        <!-- Header de Sección (Fiscalización) -->
        <div class="section-header text-center pb-0.5 sm:pb-1 mb-1 sm:mb-2 border-b border-[#E03636] border-opacity-30">
          <h2 class="section-title font-bold text-[#E03636] text-[1.8vw] mb-0">
            {{ areaFiscalizacion?.titulo || 'Fiscalización' }}
          </h2>
          <p class="section-description text-gray-600 text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[11px] 2xl:text-[16px] 3xl:text-[19px] 4xl:text-[30px] 5xl:text-[45px] mx-auto">
            {{ areaFiscalizacion?.descripcion || 'Sistema de control y seguimiento de actividades institucionales' }}
          </p>
        </div>
        
        <!-- Grid de Tarjetas -->
        <div class="links-grid grid gap-1 sm:gap-1.5 md:gap-2 xl:gap-4 3xl:gap-6 5xl:gap-9"
          :class="gridColsClass"
        >
          <NuxtLink
            v-for="link in linksFiscalizacion"
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
            <!-- Contenedor del icono -->
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
import { useRoute, useRouter } from 'vue-router'
const gridColsClass = computed(() => {
  const count = linksFiscalizacion.value.length
  if (count === 2) {
    return 'grid-cols-2'
  }
  return 'grid-cols-3'
})
// Estado para controlar qué tarjeta está en hover
const hoveredCard = ref(null)
const route = useRoute()
const router = useRouter()

// Mapa de íconos por filtro
const iconosPorFiltro = ref({})

// Configuración de endpoints para fiscalización
const ENDPOINTS = {
  'peticion-informe-escrito': {
    url: 'https://apisi.senado.gob.bo/page/peticion-informe-escrito',
    titulo: 'Peticiones de Informe Escrito',
    icono: '',
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
  'peticion-informe-oral': {
    url: 'https://apisi.senado.gob.bo/page/peticion-informe-oral',
    titulo: 'Peticiones de Informe Oral',
    icono: '',
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
    default: "fiscalizacion"
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
const itemsPorPagina = ref(5)
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
  return props.query?.filtro || route.query?.filtro
})

const filtroValido = computed(() => {
  return ENDPOINTS.hasOwnProperty(filtroActual.value)
})

const endpointConfig = computed(() => {
  if (!filtroValido.value) return null
  return ENDPOINTS[filtroActual.value]
})

const tituloSeccion = computed(() => {
  return endpointConfig.value?.titulo || 'Peticiones de Informe'
})

// Icono activo para el título de la tabla
const iconoActivo = computed(() => {
  if (!filtroActual.value) return ''
  // Primero buscar en el mapa de íconos
  if (iconosPorFiltro.value[filtroActual.value]) {
    return iconosPorFiltro.value[filtroActual.value]
  }
  // Si no está en el mapa, buscar en los links
  const link = linksFiscalizacion.value.find(l => {
    return l.path && l.path.includes(`filtro=${filtroActual.value}`)
  })
  return link?.icono || ''
})

// Datos de fiscalización desde la API de tabs
const areaFiscalizacion = computed(() => {
  return tabsData.value?.areas?.fiscalizacion || null
})

const linksFiscalizacion = computed(() => {
  return tabsData.value?.links?.fiscalizacion || []
})

// Computed para la tabla
const itemsFiltrados = computed(() => {
  let datos = [...todosLosDatos.value]
  
  if (busquedaLocalActiva.value && busquedaLocalActiva.value.trim() !== '') {
    const termino = busquedaLocalActiva.value.toLowerCase().trim()
    datos = datos.filter(item => 
      (item.titulo && item.titulo.toLowerCase().includes(termino)) ||
      (item.resumen && item.resumen.toLowerCase().includes(termino)) ||
      (item.tipo_destinatario && item.tipo_destinatario.toLowerCase().includes(termino))
    )
  }
  
  return datos
})

const itemsOrdenados = computed(() => {
  if (!itemsFiltrados.value.length) return []
  
  return [...itemsFiltrados.value].sort((a, b) => {
    if (orden.value.columna === 'titulo') {
      const tituloA = a.titulo || ''
      const tituloB = b.titulo || ''
      if (orden.value.direccion === 'asc') {
        return tituloA.localeCompare(tituloB)
      } else {
        return tituloB.localeCompare(tituloA)
      }
    } else if (orden.value.columna === 'resumen') {
      const resumenA = a.resumen || ''
      const resumenB = b.resumen || ''
      if (orden.value.direccion === 'asc') {
        return resumenA.localeCompare(resumenB)
      } else {
        return resumenB.localeCompare(resumenA)
      }
    }
    return 0
  })
})

const itemsPaginados = computed(() => {
  const itemsPorPaginaNum = Number(itemsPorPagina.value)
  const inicio = (paginaActual.value - 1) * itemsPorPaginaNum
  const fin = inicio + itemsPorPaginaNum
  return itemsOrdenados.value.slice(inicio, fin)
})

const totalItems = computed(() => {
  return todosLosDatos.value.length
})

const totalPaginas = computed(() => {
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
const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-BO')
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

// Función para volver a las opciones de fiscalización
const volverAOpciones = () => {
  // Limpiar el filtro para volver al estado de opciones
  emit('update:query', { filtro: '' })
  
  // También limpiar la URL si es necesario
  if (route.query.filtro) {
    router.replace({ query: {} })
  }
  
  resetearTodo()
  cargarTabsFiscalizacion()
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
    const todasLasPeticiones = [...datosPrimeraPagina]
    
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
          todasLasPeticiones.push(...datosPagina)
        }
      })
    }
    
    todosLosDatos.value = todasLasPeticiones
    paginaActual.value = 1
    
    console.log(`✅ Cargados ${todosLosDatos.value.length} registros para filtro: ${filtroActual.value}`)
  } catch (err) {
    error.value = 'Error al cargar los datos: ' + err.message
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

const cargarTabsFiscalizacion = async () => {
  cargandoTabs.value = true
  errorTabs.value = null
  
  try {
    const response = await fetch('http://demoback.senado.gob.bo/api/tabs')
    const data = await response.json()
    
    if (data?.success && data?.data) {
      tabsData.value = data.data
      
      // Sincronizar los íconos de los links con los ENDPOINTS y con el mapa
      if (tabsData.value?.links?.fiscalizacion) {
        tabsData.value.links.fiscalizacion.forEach(link => {
          const filtroKey = link.path?.match(/filtro=([^&#]+)/)?.[1]
          if (filtroKey) {
            // Guardar en el mapa de íconos
            iconosPorFiltro.value[filtroKey] = link.icono
            // También actualizar el ENDPOINT si existe
            if (ENDPOINTS[filtroKey]) {
              ENDPOINTS[filtroKey].icono = link.icono
            }
          }
        })
      }
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
}

const limpiarBusquedaLocal = () => {
  terminoBusquedaLocal.value = ''
  busquedaLocalActiva.value = ''
  paginaActual.value = 1
}

const cambiarPagina = (pagina) => {
  if (pagina >= 1 && pagina <= totalPaginas.value) {
    paginaActual.value = pagina
  }
}

const cambiarFilasPorPagina = () => {
  itemsPorPagina.value = Number(itemsPorPagina.value)
  paginaActual.value = 1
}

const ordenarPor = (columna) => {
  if (orden.value.columna === columna) {
    orden.value.direccion = orden.value.direccion === 'asc' ? 'desc' : 'asc'
  } else {
    orden.value.columna = columna
    orden.value.direccion = 'desc'
  }
  paginaActual.value = 1
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
      cargarTabsFiscalizacion()
    }
  }
}, { immediate: true })

watch(() => props.query, (nuevoQuery, viejoQuery) => {
  if (hashValido.value) {
    const nuevoFiltro = nuevoQuery?.filtro
    const viejoFiltro = viejoQuery?.filtro
    
    if (nuevoFiltro !== viejoFiltro) {
      resetearTodo()
      if (nuevoFiltro && ENDPOINTS.hasOwnProperty(nuevoFiltro)) {
        cargarDatosCompletos()
      } else {
        cargarTabsFiscalizacion()
      }
    }
  }
}, { immediate: true, deep: true })

watch(() => route.query, (nuevoQuery, viejoQuery) => {
  if (hashValido.value) {
    const nuevoFiltro = nuevoQuery?.filtro
    const viejoFiltro = viejoQuery?.filtro
    
    if (nuevoFiltro !== viejoFiltro) {
      emit('update:query', { filtro: nuevoFiltro || '' })
      resetearTodo()
      if (nuevoFiltro && ENDPOINTS.hasOwnProperty(nuevoFiltro)) {
        cargarDatosCompletos()
      } else {
        cargarTabsFiscalizacion()
      }
    }
  }
}, { immediate: true, deep: true })
</script>

<style scoped>
.fiscalization-container {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  background: transparent;
  
}

.fiscalization-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 8px;
  color: #475569;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background: #E03636;
  border-color: #E03636;
  color: white;
}

.back-button:hover .back-icon {
  transform: translateX(-2px);
}

.back-icon {
  font-size: 1rem;
  transition: transform 0.2s;
}

.back-text {
  font-size: 0.85rem;
}

.title-icon-svg {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #E03636;
  flex-shrink: 0;
}

.title-icon-svg svg {
  width: 100%;
  height: 100%;
  max-width: 32px;
  max-height: 32px;
}

.title-icon-placeholder {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .title-icon-svg {
    width: 36px;
    height: 36px;
  }
  .title-icon-svg svg {
    max-width: 36px;
    max-height: 36px;
  }
  .title-icon-placeholder {
    width: 36px;
    height: 36px;
  }
}

.fiscalization-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.badge {
  background: linear-gradient(135deg, #E03636, #b82c2c);
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
  border-color: #E03636;
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
  border-color: #E03636;
  box-shadow: 0 0 0 2px rgba(224, 54, 54, 0.2);
}

.search-button {
  background: #E03636;
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
  background: #b82c2c;
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
  color: #E03636;
}

.table-responsive {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  overflow: auto;
  margin-bottom: 16px;
}

.fiscalization-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.fiscalization-table th {
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

.fiscalization-row td {
  padding: 8px 12px;
  border-bottom: 1px solid #eef2f6;
  color: #334155;
  line-height: 1.3;
}

.fiscalization-row:hover td {
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
  margin-bottom: 4px;
}

.destinatario-info {
  font-size: 0.7rem;
  color: #E03636;
  margin-top: 2px;
}

.destinatario-label {
  font-weight: 500;
  color: #64748b;
}

.fecha-info {
  font-size: 0.65rem;
  color: #94a3b8;
  margin-top: 2px;
}

.fecha-label {
  font-weight: 500;
  color: #64748b;
}

.actions-cell {
  width: 70px;
  text-align: center;
}

.btn-documento {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #E03636;
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
  background: #b82c2c;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(224, 54, 54, 0.3);
}

.sin-documento {
  font-size: 0.7rem;
  color: #94a3b8;
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
  background: #E03636;
  color: white;
  border-color: #E03636;
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
  border-color: #E03636;
}

.pagination-number.active {
  background: #E03636;
  color: white;
  border-color: #E03636;
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
  border-top-color: #E03636;
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
  background: #E03636;
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
  background: #b82c2c;
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

.section-title {
  font-weight: bold;
  color: #E03636;
  margin-bottom: 0;
}

.section-description {
  color: #4b5563;
  margin: 0 auto;
  font-size: 6px;
}

.links-grid {
  display: grid;
  gap: 0.25rem;
  /* grid-template-columns: repeat(3, 1fr); */
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

.link-description {
  color: #4b5563;
  font-size: 5px;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.link-arrow {
  color: #E03636;
  margin-left: 0.125rem;
  flex-shrink: 0;
  font-size: 10px;
}

/* Media queries responsivas */
@media (min-width: 640px) {
  .section-description { font-size: 7px; }
  .links-grid { gap: 0.375rem; }
  .link-card { border-radius: 0.375rem; padding: 0.375rem; }
  .icon-container { margin: 0.75rem; width: 2.5rem; height: 2.5rem; }
  .link-title { font-size: 8px; }
  .link-description { font-size: 7px; }
  .link-arrow { font-size: 12px; }
}

@media (min-width: 768px) {
  .section-description { font-size: 8px; }
  .links-grid { gap: 0.5rem; }
  .link-card { border-radius: 0.5rem; padding: 0.5rem; }
  .icon-container { margin: 0.75rem; width: 3rem; height: 3rem; }
  .link-title { font-size: 9px; }
  .link-description { font-size: 8px; }
  .link-arrow { font-size: 13px; }
}

@media (min-width: 1024px) {
  .section-description { font-size: 9px; }
  .link-card { border-radius: 0.75rem; }
  .icon-container { margin: 1rem; width: 3.5rem; height: 3.5rem; }
  .link-title { font-size: 10px; }
  .link-description { font-size: 9px; }
  .link-arrow { font-size: 15px; }
}

@media (min-width: 1280px) {
  .section-description { font-size: 11px; }
  .links-grid { gap: 1rem; }
  .icon-container { margin: 1.25rem; width: 4rem; height: 4rem; }
  .link-title { font-size: 13px; }
  .link-description { font-size: 12px; }
  .link-arrow { font-size: 18px; }
}

@media (min-width: 1536px) {
  .section-description { font-size: 16px; }
  .icon-container { margin: 1.5rem; width: 5rem; height: 5rem; }
  .link-title { font-size: 17px; }
  .link-description { font-size: 16px; }
  .link-arrow { font-size: 22px; }
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
  .fiscalization-container {
    padding: 12px;
  }
  
  .header-left {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
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
  
  .back-text {
    display: none;
  }
  
  .back-button {
    padding: 6px 10px;
  }
}
</style>