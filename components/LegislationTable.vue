<template>
  <div class="legislation-container">
    <!-- Header con título y buscador -->
    <div class="legislation-header">
      <h2 class="legislation-title">
        <span class="title-icon">📋</span>
        Proyectos de Ley
        <span v-if="!loading && !error" class="badge">{{ totalItems }} registros</span>
      </h2>
      
      <div class="header-controls">
        <!-- Selector de filas por página -->
        <div class="rows-per-page">
          <span>Mostrar</span>
          <select v-model="itemsPorPagina" @change="cambiarFilasPorPagina">
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

        <!-- Buscador -->
        <div class="search-box">
          <input 
            type="text" 
            v-model="terminoBusqueda"
            @keyup.enter="buscar"
            placeholder="Buscar por título, número o asunto..."
            class="search-input"
          >
          <button @click="buscar" class="search-button" :disabled="loading">
            <span class="search-icon">🔍</span>
          </button>
          <button 
            v-if="terminoBusqueda || query" 
            @click="limpiarBusqueda" 
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
    </div>

    <!-- Pie de tabla con paginación e información -->
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
  </div>
</template>

<script>
export default {
  name: 'LegislationTable',
  
  props: {
    hash: {
      type: String,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  
  data() {
    return {
      todosLosDatos: [],
      loading: false,
      error: null,
      paginaActual: 1,
      itemsPorPagina: 5, // Valor por defecto
      terminoBusqueda: '',
      busquedaActiva: '',
      orden: {
        columna: 'titulo',
        direccion: 'desc'
      }
    }
  },
  
  computed: {
    itemsFiltrados() {
      let datos = this.todosLosDatos
      
      if (this.busquedaActiva) {
        const termino = this.busquedaActiva.toLowerCase()
        datos = datos.filter(item => 
          item.titulo.toLowerCase().includes(termino) ||
          item.numero.toLowerCase().includes(termino) ||
          item.asunto.toLowerCase().includes(termino)
        )
      }
      
      return datos
    },
    
    itemsOrdenados() {
      if (!this.itemsFiltrados.length) return []
      
      return [...this.itemsFiltrados].sort((a, b) => {
        if (this.orden.columna === 'titulo') {
          // Extraer partes del título
          const partesA = this.desenmascararTitulo(a.titulo)
          const partesB = this.desenmascararTitulo(b.titulo)
          
          if (this.orden.direccion === 'asc') {
            // ASCENDENTE
            if (partesA.anioInicio < partesB.anioInicio) return -1
            if (partesA.anioInicio > partesB.anioInicio) return 1
            
            if (partesA.numeroIzquierda < partesB.numeroIzquierda) return -1
            if (partesA.numeroIzquierda > partesB.numeroIzquierda) return 1
            return 0
          } else {
            // DESCENDENTE
            if (partesA.anioInicio > partesB.anioInicio) return -1
            if (partesA.anioInicio < partesB.anioInicio) return 1
            
            if (partesA.numeroIzquierda > partesB.numeroIzquierda) return -1
            if (partesA.numeroIzquierda < partesB.numeroIzquierda) return 1
            return 0
          }
        } else {
          // Ordenar por asunto
          const valorA = a[this.orden.columna] || ''
          const valorB = b[this.orden.columna] || ''
          
          if (this.orden.direccion === 'asc') {
            if (valorA < valorB) return -1
            if (valorA > valorB) return 1
          } else {
            if (valorA > valorB) return -1
            if (valorA < valorB) return 1
          }
          return 0
        }
      })
    },
    
    itemsPaginados() {
      const inicio = (this.paginaActual - 1) * this.itemsPorPagina
      const fin = inicio + this.itemsPorPagina
      return this.itemsOrdenados.slice(inicio, fin)
    },
    
    totalItems() {
      return this.todosLosDatos.length
    },
    
    totalPaginas() {
      return Math.ceil(this.itemsFiltrados.length / this.itemsPorPagina)
    },
    
    paginasMostradas() {
      const total = this.totalPaginas
      const actual = this.paginaActual
      const rango = 5
      
      let inicio = Math.max(1, actual - Math.floor(rango / 2))
      let fin = Math.min(total, inicio + rango - 1)
      
      if (fin - inicio + 1 < rango) {
        inicio = Math.max(1, fin - rango + 1)
      }
      
      return Array.from({ length: fin - inicio + 1 }, (_, i) => inicio + i)
    }
  },
  
  watch: {
    hash: {
      handler() {
        this.resetearBusqueda()
        this.cargarDatosCompletos()
      },
      immediate: true
    },
    query: {
      handler(nuevoQuery) {
        if (nuevoQuery !== this.busquedaActiva) {
          this.terminoBusqueda = nuevoQuery
          this.busquedaActiva = nuevoQuery
          this.paginaActual = 1
          this.cargarDatosCompletos()
        }
      },
      immediate: true
    }
  },
  
  methods: {
    async cargarDatosCompletos() {
      this.loading = true
      this.error = null
      
      try {
        const primeraPagina = await this.obtenerPagina(1)
        
        if (primeraPagina.data && primeraPagina.state) {
          const totalPaginas = primeraPagina.data.last_page
          const todasLasLeyes = [...primeraPagina.data.data]
          
          if (totalPaginas > 1) {
            const paginasRestantes = Array.from(
              { length: totalPaginas - 1 }, 
              (_, i) => i + 2
            )
            
            const promesas = paginasRestantes.map(page => this.obtenerPagina(page))
            const resultados = await Promise.all(promesas)
            
            resultados.forEach(res => {
              if (res.data && res.data.data) {
                todasLasLeyes.push(...res.data.data)
              }
            })
          }
          
          this.todosLosDatos = todasLasLeyes
          this.paginaActual = 1
        }
      } catch (err) {
        this.error = 'Error al cargar los datos: ' + err.message
        console.error('Error:', err)
      } finally {
        this.loading = false
      }
    },
    
    async obtenerPagina(page) {
      let url = `https://apisi.senado.gob.bo/page/ley-tratamiento/buscar?page=${page}`
      
      if (this.busquedaActiva && this.busquedaActiva.trim() !== '') {
        url += `&query=${encodeURIComponent(this.busquedaActiva)}`
      }
      
      const response = await fetch(url)
      return await response.json()
    },
    
    buscar() {
      this.busquedaActiva = this.terminoBusqueda
      this.paginaActual = 1
      this.$emit('update:query', this.terminoBusqueda)
      this.cargarDatosCompletos()
    },
    
    limpiarBusqueda() {
      this.terminoBusqueda = ''
      this.busquedaActiva = ''
      this.paginaActual = 1
      this.$emit('update:query', '')
      this.cargarDatosCompletos()
    },
    
    resetearBusqueda() {
      this.terminoBusqueda = ''
      this.busquedaActiva = ''
      this.paginaActual = 1
    },
    
    cambiarPagina(pagina) {
      if (pagina >= 1 && pagina <= this.totalPaginas) {
        this.paginaActual = pagina
      }
    },
    
    cambiarFilasPorPagina() {
      this.paginaActual = 1 // Reiniciar a primera página al cambiar número de filas
    },
    
    ordenarPor(columna) {
      if (this.orden.columna === columna) {
        this.orden.direccion = this.orden.direccion === 'asc' ? 'desc' : 'asc'
      } else {
        this.orden.columna = columna
        this.orden.direccion = 'desc'
      }
      this.paginaActual = 1
    },
    
    getSortIcon(columna) {
      if (this.orden.columna !== columna) return '↕️'
      return this.orden.direccion === 'asc' ? '↑' : '↓'
    },
    
    desenmascararTitulo(titulo) {
      // Extraer número de la izquierda
      const matchNumero = titulo.match(/N[°\s]*(\d+)/i)
      const numeroIzquierda = matchNumero ? parseInt(matchNumero[1], 10) : 0
      
      // Extraer año de inicio (después de la barra)
      const indexBarra = titulo.indexOf('/')
      let anioInicio = 0
      
      if (indexBarra !== -1) {
        const parteDerecha = titulo.substring(indexBarra + 1).trim()
        
        // Solo extraer el primer año (antes del guión)
        const matchAnio = parteDerecha.match(/(\d{4})/)
        if (matchAnio) {
          anioInicio = parseInt(matchAnio[1], 10)
        }
      }
      
      return {
        numeroIzquierda,
        anioInicio
      }
    },
    
    truncarTexto(texto, longitud) {
      if (texto.length <= longitud) return texto
      return texto.substring(0, longitud) + '...'
    }
  }
}
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

/* Header */
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

/* Rows per page selector */
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

/* Search Box */
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

/* Table */
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

/* Title Cell */
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

/* Asunto Cell */
.asunto-cell {
  max-width: 400px;
}

.asunto-texto {
  line-height: 1.3;
  color: #475569;
  font-size: 0.8rem;
}

/* Actions Cell */
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

/* Table Footer */
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

.pagination-number:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading State */
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

/* Error State */
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

/* Empty State */
.empty-state {
  text-align: center;
  padding: 40px !important;
  color: #94a3b8;
  font-size: 0.95rem;
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