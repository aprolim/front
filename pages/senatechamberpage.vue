<template>
  <div class="senate-page">
    <!-- Header personalizado de la página -->
    <header class="page-header">
      <h1>🏛️ Senado de Bolivia</h1>
      <p class="subtitle">Distribución actual de senadores 2020-2025</p>
    </header>

    <!-- Estadísticas rápidas -->
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-number">{{ totalSenators }}</div>
        <div class="stat-label">Total Senadores</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ parties.length }}</div>
        <div class="stat-label">Partidos Políticos</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">9</div>
        <div class="stat-label">Departamentos</div>
      </div>
    </div>

    <!-- El componente SenateChamber -->
    <SenateChamber
      :senators="senators"
      :parties="parties"
      :show-footer="true"
      :show-header="true"
      :background-image="backgroundImage"
      @senator-selected="handleSenatorSelected"
      @party-filter-changed="handlePartyFilter"
      @view-reset="handleViewReset"
    >
      <!-- Slot para personalizar el header del componente -->
      <template #header>
        <div class="chamber-custom-header">
          <h2>🗳️ Hemiciclo del Senado</h2>
          <p class="chamber-subtitle">
            Click en cualquier círculo para ver detalles del senador
            <span v-if="activeFilters.length > 0" class="filter-indicator">
              | Filtro activo: {{ getPartyName(activeFilters[0]) }}
            </span>
          </p>
        </div>
      </template>

      <!-- Slot para contenido adicional en el panel de información -->
      <template #senator-details-extra="{ senator }">
        <div v-if="senator" class="additional-info">
          <h4>📈 Datos Adicionales</h4>
          <div class="additional-grid">
            <div class="additional-item">
              <span class="label">Votos Obtenidos:</span>
              <span class="value">{{ getRandomVotes() }}%</span>
            </div>
            <div class="additional-item">
              <span class="label">Trayectoria:</span>
              <span class="value">{{ getRandomExperience() }} años</span>
            </div>
            <div class="additional-item">
              <span class="label">Proyectos:</span>
              <span class="value">{{ getRandomProjects() }}</span>
            </div>
          </div>
        </div>
      </template>

      <!-- Slot para personalizar el footer -->
      <template #footer>
        <div class="chamber-custom-footer">
          <div class="footer-left">
            <p>© 2024 - Sistema de Visualización Parlamentaria</p>
            <p class="footer-note">Datos actualizados al {{ currentDate }}</p>
          </div>
          <div class="footer-right">
            <button class="export-btn" @click="exportData">
              📊 Exportar Datos
            </button>
          </div>
        </div>
      </template>
    </SenateChamber>

    <!-- Panel de control adicional -->
    <div class="additional-controls">
      <h3>⚙️ Controles Adicionales</h3>
      <div class="control-buttons">
        <button @click="loadSampleData" class="control-btn">
          📥 Cargar Datos de Ejemplo
        </button>
        <button @click="clearAllData" class="control-btn">
          🗑️ Limpiar Todo
        </button>
        <button @click="toggleDarkMode" class="control-btn">
          {{ darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SenateChamber from '@/components/SenateChamber.vue'

// Datos de los senadores (ejemplo completo)
const senators = ref([
  // CURVA SUPERIOR
  { id: 1, name: "María Eugenia Choque Quispe", seatNumber: 1, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "La Paz", age: 52, profession: "Socióloga", period: "2020-2025",
    email: "mchoque@senado.bo", phone: "(591-2) 220-0001", office: "Edificio A, Oficina 101",
    commissions: ["Constitución", "Derechos Humanos"]
  },
  { id: 2, name: "Juan Carlos García López", seatNumber: 2, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Santa Cruz", age: 48, profession: "Abogado", period: "2020-2025",
    email: "jgarcia@senado.bo", phone: "(591-2) 220-0002", office: "Edificio A, Oficina 102"
  },
  { id: 3, name: "Ana María Rojas Flores", seatNumber: 3, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Cochabamba", age: 45, profession: "Educadora", period: "2020-2025"
  },
  { id: 4, name: "Luisa Mamani Condori", seatNumber: 4, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Oruro", age: 55, profession: "Médica", period: "2020-2025"
  },
  { id: 5, name: "Carlos Fernández Vargas", seatNumber: 5, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Potosí", age: 50, profession: "Ingeniero", period: "2020-2025"
  },
  { id: 6, name: "Patricia Flores Salazar", seatNumber: 6, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Tarija", age: 47, profession: "Economista", period: "2020-2025"
  },
  { id: 7, name: "Miguel Ángel López Rodríguez", seatNumber: 7, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Chuquisaca", age: 53, profession: "Abogado", period: "2020-2025"
  },
  
  { id: 8, name: "Carlos Alberto Mesa Gisbert", seatNumber: 8, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "La Paz", age: 48, profession: "Abogado", period: "2020-2025"
  },
  { id: 9, name: "Roberto Fernández Ríos", seatNumber: 9, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Tarija", age: 55, profession: "Ingeniero Civil", period: "2020-2025"
  },
  { id: 10, name: "José Luis Paredes Muñoz", seatNumber: 10, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Chuquisaca", age: 56, profession: "Economista", period: "2020-2025"
  },
  { id: 11, name: "Ricardo Morales Salinas", seatNumber: 11, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Cochabamba", age: 49, profession: "Ingeniero", period: "2020-2025"
  },
  { id: 12, name: "Fernando Vargas Moscoso", seatNumber: 12, curve: 'upper', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "Santa Cruz", age: 45, profession: "Empresario", period: "2020-2025"
  },
  { id: 13, name: "Marta Quispe Torrez", seatNumber: 13, curve: 'upper', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "La Paz", age: 38, profession: "Médica", period: "2020-2025"
  },
  { id: 14, name: "Felipe Mendoza Suárez", seatNumber: 14, curve: 'upper', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "Santa Cruz", age: 42, profession: "Ingeniero", period: "2020-2025"
  },

  // CURVA INFERIOR (más datos)
  { id: 15, name: "Susana Méndez Alarcón", seatNumber: 15, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Beni", age: 44, profession: "Administradora", period: "2020-2025"
  },
  { id: 16, name: "Alberto Gutiérrez Paz", seatNumber: 16, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Pando", age: 56, profession: "Ingeniero", period: "2020-2025"
  },
  // ... puedes agregar más datos aquí
])

// Datos de partidos (actualizados dinámicamente)
const parties = ref([
  { 
    id: 'MAS-IPSP', 
    name: 'Movimiento al Socialismo', 
    shortName: 'MAS', 
    symbol: '🔴',
    color: '#dc2626', 
    count: 0, // Se calculará dinámicamente
    position: 'Izquierda del pasillo'
  },
  { 
    id: 'Comunidad Ciudadana', 
    name: 'Comunidad Ciudadana', 
    shortName: 'CC', 
    symbol: '🔵',
    color: '#2563eb', 
    count: 0, // Se calculará dinámicamente
    position: 'Derecha del pasillo'
  },
  { 
    id: 'Creemos', 
    name: 'Creemos', 
    shortName: 'CREEMOS', 
    symbol: '🟠',
    color: '#f97316', 
    count: 0, // Se calculará dinámicamente
    position: 'Derecha del pasillo'
  }
])

// Configuración
const backgroundImage = ref('https://images.unsplash.com/photo-1562602839-7f6d8c5c8c3b?w=1000&h=350&fit=crop&q=80&auto=format')
const activeFilters = ref([])
const darkMode = ref(false)

// Computed properties
const totalSenators = computed(() => senators.value.length)
const currentDate = computed(() => new Date().toLocaleDateString('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}))

// Métodos
const handleSenatorSelected = (senator) => {
  console.log('Senador seleccionado:', senator)
  // Aquí puedes hacer algo con el senador seleccionado
  // Por ejemplo, guardarlo en un store, mostrar más detalles, etc.
}

const handlePartyFilter = (filters) => {
  activeFilters.value = filters
  console.log('Filtros aplicados:', filters)
}

const handleViewReset = () => {
  console.log('Vista reiniciada')
}

const getPartyName = (partyId) => {
  const party = parties.value.find(p => p.id === partyId)
  return party ? party.shortName : partyId
}

// Funciones para datos aleatorios (ejemplo)
const getRandomVotes = () => Math.floor(Math.random() * 30) + 50 // 50-80%
const getRandomExperience = () => Math.floor(Math.random() * 20) + 5 // 5-25 años
const getRandomProjects = () => Math.floor(Math.random() * 30) + 10 // 10-40 proyectos

// Métodos de control
const loadSampleData = () => {
  // Aquí podrías cargar datos de ejemplo o de una API
  alert('Cargando datos de ejemplo...')
}

const clearAllData = () => {
  if (confirm('¿Estás seguro de querer limpiar todos los datos?')) {
    senators.value = []
  }
}

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('dark-mode', darkMode.value)
}

const exportData = () => {
  const dataStr = JSON.stringify(senators.value, null, 2)
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  
  const exportFileDefaultName = `senadores-${new Date().toISOString().split('T')[0]}.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

// Inicialización
onMounted(() => {
  // Calcular counts de partidos
  parties.value.forEach(party => {
    party.count = senators.value.filter(s => s.party === party.id).length
  })
})
</script>

<style scoped>
.senate-page {
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  border-radius: 12px;
}

.page-header h1 {
  margin: 0;
  font-size: 2.5rem;
}

.subtitle {
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.stats-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  min-width: 120px;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #6b7280;
}

/* Estilos para slots personalizados */
.chamber-custom-header {
  padding: 1rem;
  background: white;
  border-bottom: 2px solid #e5e7eb;
}

.chamber-custom-header h2 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
}

.chamber-subtitle {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.filter-indicator {
  color: #dc2626;
  font-weight: 600;
  margin-left: 0.5rem;
}

/* Estilos para contenido adicional */
.additional-info {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.additional-info h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.additional-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.additional-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: white;
  border-radius: 6px;
  font-size: 0.9rem;
}

.additional-item .label {
  color: #6b7280;
}

.additional-item .value {
  font-weight: 600;
  color: #1f2937;
}

/* Footer personalizado */
.chamber-custom-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 100%;
}

.footer-left p {
  margin: 0.25rem 0;
  font-size: 0.85rem;
}

.footer-note {
  font-size: 0.75rem;
  opacity: 0.7;
}

.export-btn {
  padding: 0.5rem 1rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.export-btn:hover {
  background: #059669;
}

/* Controles adicionales */
.additional-controls {
  margin-top: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.additional-controls h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.control-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.control-btn {
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #4b5563;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.control-btn:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

/* Responsive */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 1.8rem;
  }
  
  .stats-container {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-card {
    width: 100%;
    max-width: 200px;
  }
  
  .additional-grid {
    grid-template-columns: 1fr;
  }
  
  .chamber-custom-footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .control-buttons {
    flex-direction: column;
  }
}
</style>