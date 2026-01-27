<template>
  <div class="senate-chamber">
    <!-- Header simplificado -->
    <header class="chamber-header">
      <div class="header-content">
        <div class="bolivia-flag">
          <div class="flag-stripe red"></div>
          <div class="flag-stripe yellow"></div>
          <div class="flag-stripe green"></div>
          <div class="flag-star">★</div>
        </div>
        <div class="header-titles">
          <h1>Cámara de Senadores de Bolivia</h1>
          <p class="subtitle">Estado Plurinacional de Bolivia - Legislatura 2025</p>
        </div>
      </div>
      <div class="session-info">
        <div class="info-item">
          <span class="label">Total Senadores:</span>
          <span class="value">36</span>
        </div>
        <div class="info-item">
          <span class="label">Sesión:</span>
          <span class="value">Ordinaria</span>
        </div>
        <div class="info-item">
          <span class="label">Presidencia:</span>
          <span class="value">David Choquehuanca</span>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="main-content">
      <!-- Controles superiores -->
      <div class="controls-section">
        <div class="search-box">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Buscar senador..."
            class="search-input"
            @input="handleSearch"
          />
          <button class="search-btn">🔍</button>
        </div>
        
        <div class="filters">
          <div class="filter-group">
            <span class="filter-label">Filtrar por partido:</span>
            <div class="party-buttons">
              <button
                v-for="party in parties"
                :key="party.id"
                @click="togglePartyFilter(party.id)"
                :class="['party-btn', { 'active': activeFilters.includes(party.id) }]"
                :style="{ backgroundColor: party.color }"
              >
                <span class="party-name">{{ party.shortName }}</span>
                <span class="party-count">{{ party.count }}</span>
              </button>
            </div>
          </div>
          
          <div class="view-controls">
            <button @click="resetView" class="control-btn">
              <span>🗺️ Vista completa</span>
            </button>
            <button @click="toggleLabels" class="control-btn">
              <span>{{ showLabels ? '🙈 Ocultar nombres' : '👁️ Mostrar nombres' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Hemiciclo principal -->
      <div class="hemicycle-container">
        <div class="hemicycle-header">
          <h2>Distribución en el Hemiciclo</h2>
          <div class="hemicycle-info">
            <div class="info-badge">
              <span class="badge-icon">🎯</span>
              <span class="badge-text">Click en un senador para detalles</span>
            </div>
            <div class="info-badge">
              <span class="badge-icon">👆</span>
              <span class="badge-text">Pasa el cursor para ver información</span>
            </div>
          </div>
        </div>

        <!-- Mesa Directiva -->
        <div class="presidency-area">
          <div class="president-desk">
            <div class="desk-icon">👑</div>
            <div class="desk-info">
              <div class="president-name">David Choquehuanca</div>
              <div class="president-title">Presidente del Senado</div>
            </div>
          </div>
          <div class="vice-presidents">
            <div class="vice-chair">
              <div class="chair-icon">👔</div>
              <div>1° Vicepresidente</div>
            </div>
            <div class="vice-chair">
              <div class="chair-icon">👔</div>
              <div>2° Vicepresidente</div>
            </div>
          </div>
        </div>

        <!-- SVG del hemiciclo - Distribución real -->
        <div class="hemicycle-svg-container" ref="hemicycleContainer">
          <svg 
            class="hemicycle-svg"
            viewBox="0 0 1000 600"
            @mousemove="handleMouseMove"
          >
            <!-- Fondo del hemiciclo -->
            <defs>
              <radialGradient id="hemicycleBg" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stop-color="#f8fafc"/>
                <stop offset="100%" stop-color="#e2e8f0"/>
              </radialGradient>
              
              <!-- Sombra suave para asientos -->
              <filter id="seatShadow">
                <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.1)"/>
              </filter>
            </defs>

            <!-- Fondo del semicírculo -->
            <path 
              d="M 100,450 Q 500,150 900,450 L 900,550 Q 500,250 100,550 Z" 
              fill="url(#hemicycleBg)" 
              stroke="#cbd5e1" 
              stroke-width="2"
            />

            <!-- Líneas guía del hemiciclo -->
            <path 
              d="M 200,425 Q 500,200 800,425" 
              fill="none" 
              stroke="#e2e8f0" 
              stroke-width="1" 
              stroke-dasharray="5,5"
            />
            <path 
              d="M 250,400 Q 500,250 750,400" 
              fill="none" 
              stroke="#e2e8f0" 
              stroke-width="1" 
              stroke-dasharray="5,5"
            />
            <path 
              d="M 300,375 Q 500,300 700,375" 
              fill="none" 
              stroke="#e2e8f0" 
              stroke-width="1" 
              stroke-dasharray="5,5"
            />

            <!-- Distribución de asientos en semicírculo -->
            <!-- Fila 1 (más cerca de la presidencia) -->
            <g class="seat-row row-1">
              <circle v-for="seat in row1Seats" 
                :key="seat.id"
                :cx="seat.x"
                :cy="seat.y"
                r="20"
                :fill="getSeatColor(seat)"
                :stroke="getSeatStroke(seat)"
                :stroke-width="selectedSenator?.id === seat.id ? '3' : '1.5'"
                :class="['senator-seat', 
                  { 
                    'selected': selectedSenator?.id === seat.id,
                    'hovered': hoveredSeat?.id === seat.id
                  }]"
                @click="selectSenator(seat)"
                @mouseenter="handleSeatHover(seat)"
                @mouseleave="hoveredSeat = null"
                filter="url(#seatShadow)"
              />
            </g>

            <!-- Fila 2 -->
            <g class="seat-row row-2">
              <circle v-for="seat in row2Seats" 
                :key="seat.id"
                :cx="seat.x"
                :cy="seat.y"
                r="20"
                :fill="getSeatColor(seat)"
                :stroke="getSeatStroke(seat)"
                :stroke-width="selectedSenator?.id === seat.id ? '3' : '1.5'"
                :class="['senator-seat', 
                  { 
                    'selected': selectedSenator?.id === seat.id,
                    'hovered': hoveredSeat?.id === seat.id
                  }]"
                @click="selectSenator(seat)"
                @mouseenter="handleSeatHover(seat)"
                @mouseleave="hoveredSeat = null"
                filter="url(#seatShadow)"
              />
            </g>

            <!-- Fila 3 -->
            <g class="seat-row row-3">
              <circle v-for="seat in row3Seats" 
                :key="seat.id"
                :cx="seat.x"
                :cy="seat.y"
                r="20"
                :fill="getSeatColor(seat)"
                :stroke="getSeatStroke(seat)"
                :stroke-width="selectedSenator?.id === seat.id ? '3' : '1.5'"
                :class="['senator-seat', 
                  { 
                    'selected': selectedSenator?.id === seat.id,
                    'hovered': hoveredSeat?.id === seat.id
                  }]"
                @click="selectSenator(seat)"
                @mouseenter="handleSeatHover(seat)"
                @mouseleave="hoveredSeat = null"
                filter="url(#seatShadow)"
              />
            </g>

            <!-- Números de asiento (opcional) -->
            <g v-if="showLabels">
              <text v-for="seat in allSeats" 
                :key="'label-' + seat.id"
                :x="seat.x"
                :y="seat.y + 30"
                text-anchor="middle"
                fill="#374151"
                font-size="10"
                font-weight="500"
                class="seat-label"
              >
                {{ seat.initials }}
              </text>
            </g>

            <!-- Etiquetas de posición -->
            <text x="100" y="580" fill="#4b5563" font-size="14" font-weight="600">
              Izquierda
            </text>
            <text x="900" y="580" fill="#4b5563" font-size="14" font-weight="600" text-anchor="end">
              Derecha
            </text>
            <text x="500" y="50" fill="#4b5563" font-size="14" font-weight="600" text-anchor="middle">
              Presidencia
            </text>
          </svg>

          <!-- Tooltip fijo (no sigue el mouse) -->
          <div 
            v-if="hoveredSeat && !selectedSenator" 
            class="seat-tooltip"
            :style="tooltipStyle"
          >
            <div class="tooltip-header">
              <div class="party-indicator" :style="{ backgroundColor: hoveredSeat.partyColor }"></div>
              <div class="senator-info">
                <h4>{{ hoveredSeat.name }}</h4>
                <div class="party-badge">{{ hoveredSeat.party }}</div>
              </div>
            </div>
            <div class="tooltip-body">
              <div class="info-row">
                <span class="label">Departamento:</span>
                <span class="value">{{ hoveredSeat.department }}</span>
              </div>
              <div class="info-row">
                <span class="label">Asiento:</span>
                <span class="value">N° {{ hoveredSeat.seatNumber }}</span>
              </div>
              <div class="hint">Click para más información</div>
            </div>
          </div>
        </div>

        <!-- Leyenda de partidos -->
        <div class="party-legend">
          <h3>Distribución por Partido</h3>
          <div class="legend-items">
            <div v-for="party in parties" 
              :key="party.id"
              class="legend-item"
              @click="highlightParty(party.id)"
              :class="{ 'highlighted': highlightedParty === party.id }"
            >
              <div class="legend-color" :style="{ backgroundColor: party.color }"></div>
              <div class="legend-details">
                <div class="legend-name">{{ party.name }}</div>
                <div class="legend-stats">
                  <span>{{ party.count }} senadores</span>
                  <span>{{ Math.round((party.count / 36) * 100) }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel de información del senador -->
      <div class="senator-info-panel">
        <div class="panel-header">
          <h3>Información del Senador</h3>
          <button 
            v-if="selectedSenator" 
            @click="deselectSenator"
            class="close-btn"
          >
            ✕ Cerrar
          </button>
        </div>

        <div v-if="selectedSenator" class="senator-details">
          <!-- Encabezado -->
          <div class="senator-header">
            <div class="photo-container">
              <div class="senator-photo">
                <div class="photo-placeholder">{{ selectedSenator.initials }}</div>
              </div>
              <div class="senator-badges">
                <div class="badge party" :style="{ backgroundColor: selectedSenator.partyColor }">
                  {{ selectedSenator.party }}
                </div>
                <div class="badge department">
                  {{ selectedSenator.department }}
                </div>
              </div>
            </div>
            
            <div class="senator-basic-info">
              <h2>{{ selectedSenator.name }}</h2>
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">Asiento:</span>
                  <span class="value">N° {{ selectedSenator.seatNumber }}</span>
                </div>
                <div class="info-item">
                  <span class="label">Edad:</span>
                  <span class="value">{{ selectedSenator.age }} años</span>
                </div>
                <div class="info-item">
                  <span class="label">Profesión:</span>
                  <span class="value">{{ selectedSenator.profession }}</span>
                </div>
                <div class="info-item">
                  <span class="label">Periodo:</span>
                  <span class="value">{{ selectedSenator.period }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Información detallada -->
          <div class="detailed-info">
            <div class="info-section">
              <h4>Comisiones</h4>
              <div class="commissions-list">
                <div v-for="commission in selectedSenator.commissions" 
                  :key="commission"
                  class="commission-item"
                >
                  {{ commission }}
                </div>
              </div>
            </div>
            
            <div class="info-section">
              <h4>Contacto</h4>
              <div class="contact-info">
                <div class="contact-item">
                  <span class="label">Email:</span>
                  <span class="value">{{ selectedSenator.email }}</span>
                </div>
                <div class="contact-item">
                  <span class="label">Teléfono:</span>
                  <span class="value">{{ selectedSenator.phone }}</span>
                </div>
                <div class="contact-item">
                  <span class="label">Oficina:</span>
                  <span class="value">{{ selectedSenator.office }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">👆</div>
          <h4>Selecciona un Senador</h4>
          <p>Haz click en cualquier círculo del hemiciclo para ver información detallada</p>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="chamber-footer">
      <p>Cámara de Senadores de Bolivia © 2025</p>
      <p class="footer-note">Plaza Murillo, La Paz - Estado Plurinacional de Bolivia</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
definePageMeta({
  layout: 'alter2'
})
// Datos de los 36 senadores - Distribución real en semicírculo
const senatorsData = ref([
  // MAS-IPSP - Izquierda del hemiciclo (21 senadores)
  { id: 1, name: "María Eugenia Choque", seatNumber: 1, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "La Paz", initials: "MC", age: 52,
    profession: "Socióloga", period: "2020-2025",
    commissions: ["Constitución", "Derechos Humanos"],
    email: "mchoque@senado.bo", phone: "(591-2) 220-0001",
    office: "Edificio A, Oficina 101"
  },
  { id: 2, name: "Juan Carlos García", seatNumber: 2, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Santa Cruz", initials: "JG", age: 48,
    profession: "Abogado", period: "2020-2025",
    commissions: ["Justicia", "Economía"]
  },
  { id: 3, name: "Ana María Rojas", seatNumber: 3, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Cochabamba", initials: "AR", age: 45,
    profession: "Educadora", period: "2020-2025",
    commissions: ["Educación", "Cultura"]
  },
  { id: 4, name: "Luisa Mamani", seatNumber: 4, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Oruro", initials: "LM", age: 55,
    profession: "Médica", period: "2020-2025"
  },
  { id: 5, name: "Carlos Fernández", seatNumber: 5, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Potosí", initials: "CF", age: 50,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 6, name: "Patricia Flores", seatNumber: 6, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Tarija", initials: "PF", age: 47,
    profession: "Economista", period: "2020-2025"
  },
  { id: 7, name: "Miguel Ángel López", seatNumber: 7, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Chuquisaca", initials: "ML", age: 53,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 8, name: "Susana Méndez", seatNumber: 8, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Beni", initials: "SM", age: 44,
    profession: "Administradora", period: "2020-2025"
  },
  { id: 9, name: "Alberto Gutiérrez", seatNumber: 9, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Pando", initials: "AG", age: 56,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 10, name: "Carmen Rosa Sánchez", seatNumber: 10, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "La Paz", initials: "CS", age: 49,
    profession: "Periodista", period: "2020-2025"
  },
  { id: 11, name: "Jorge Luis Pérez", seatNumber: 11, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Santa Cruz", initials: "JP", age: 51,
    profession: "Empresario", period: "2020-2025"
  },
  { id: 12, name: "Gabriela Torres", seatNumber: 12, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Cochabamba", initials: "GT", age: 46,
    profession: "Abogada", period: "2020-2025"
  },
  { id: 13, name: "Raúl Castro", seatNumber: 13, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Oruro", initials: "RC", age: 54,
    profession: "Sociólogo", period: "2020-2025"
  },
  { id: 14, name: "Elizabeth Ríos", seatNumber: 14, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Potosí", initials: "ER", age: 43,
    profession: "Educadora", period: "2020-2025"
  },
  { id: 15, name: "Mario Vargas", seatNumber: 15, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Tarija", initials: "MV", age: 52,
    profession: "Médico", period: "2020-2025"
  },
  { id: 16, name: "Silvia Fernández", seatNumber: 16, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Chuquisaca", initials: "SF", age: 48,
    profession: "Abogada", period: "2020-2025"
  },
  { id: 17, name: "Pedro Castillo", seatNumber: 17, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Beni", initials: "PC", age: 55,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 18, name: "Claudia Paz", seatNumber: 18, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Pando", initials: "CP", age: 44,
    profession: "Economista", period: "2020-2025"
  },
  { id: 19, name: "Andrés Romero", seatNumber: 19, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "La Paz", initials: "AR", age: 50,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 20, name: "Daniela Mendoza", seatNumber: 20, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Santa Cruz", initials: "DM", age: 47,
    profession: "Administradora", period: "2020-2025"
  },
  { id: 21, name: "Luis Fernando Arce", seatNumber: 21, 
    party: "MAS-IPSP", partyColor: "#dc2626",
    department: "Cochabamba", initials: "LA", age: 53,
    profession: "Economista", period: "2020-2025"
  },
  
  // Comunidad Ciudadana - Centro (11 senadores)
  { id: 22, name: "Carlos Alberto Mesa", seatNumber: 22, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "La Paz", initials: "CM", age: 48,
    profession: "Abogado", period: "2020-2025",
    commissions: ["Relaciones Exteriores", "Justicia"]
  },
  { id: 23, name: "Roberto Fernández", seatNumber: 23, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "Tarija", initials: "RF", age: 55,
    profession: "Ingeniero Civil", period: "2020-2025"
  },
  { id: 24, name: "José Luis Paredes", seatNumber: 24, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "Chuquisaca", initials: "JP", age: 56,
    profession: "Economista", period: "2020-2025"
  },
  { id: 25, name: "Ricardo Morales", seatNumber: 25, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "Cochabamba", initials: "RM", age: 49,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 26, name: "Victoria Choque", seatNumber: 26, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "La Paz", initials: "VC", age: 45,
    profession: "Abogada", period: "2020-2025"
  },
  { id: 27, name: "Walter Álvarez", seatNumber: 27, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "Santa Cruz", initials: "WA", age: 52,
    profession: "Empresario", period: "2020-2025"
  },
  { id: 28, name: "Natalia Gutiérrez", seatNumber: 28, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "Beni", initials: "NG", age: 46,
    profession: "Médica", period: "2020-2025"
  },
  { id: 29, name: "Óscar Paredes", seatNumber: 29, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "Oruro", initials: "OP", age: 54,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 30, name: "Rosa María López", seatNumber: 30, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "Potosí", initials: "RL", age: 50,
    profession: "Educadora", period: "2020-2025"
  },
  { id: 31, name: "Héctor Vásquez", seatNumber: 31, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "Pando", initials: "HV", age: 53,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 32, name: "Karen Salazar", seatNumber: 32, 
    party: "Comunidad Ciudadana", partyColor: "#2563eb",
    department: "Tarija", initials: "KS", age: 44,
    profession: "Periodista", period: "2020-2025"
  },
  
  // Creemos - Derecha (4 senadores)
  { id: 33, name: "Fernando Vargas", seatNumber: 33, 
    party: "Creemos", partyColor: "#f97316",
    department: "Santa Cruz", initials: "FV", age: 45,
    profession: "Empresario", period: "2020-2025",
    commissions: ["Economía", "Desarrollo Productivo"]
  },
  { id: 34, name: "Marta Quispe", seatNumber: 34, 
    party: "Creemos", partyColor: "#f97316",
    department: "La Paz", initials: "MQ", age: 38,
    profession: "Médica", period: "2020-2025"
  },
  { id: 35, name: "Felipe Mendoza", seatNumber: 35, 
    party: "Creemos", partyColor: "#f97316",
    department: "Santa Cruz", initials: "FM", age: 42,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 36, name: "Carolina Herrera", seatNumber: 36, 
    party: "Creemos", partyColor: "#f97316",
    department: "Cochabamba", initials: "CH", age: 47,
    profession: "Abogada", period: "2020-2025"
  }
])

// Estado reactivo
const selectedSenator = ref(null)
const hoveredSeat = ref(null)
const searchQuery = ref('')
const activeFilters = ref([])
const highlightedParty = ref(null)
const showLabels = ref(true)
const tooltipStyle = reactive({ left: '0px', top: '0px' })

// Partidos políticos
const parties = computed(() => [
  { id: 'MAS-IPSP', name: 'Movimiento al Socialismo', shortName: 'MAS', 
    color: '#dc2626', count: 21, position: 'Izquierda' },
  { id: 'Comunidad Ciudadana', name: 'Comunidad Ciudadana', shortName: 'CC', 
    color: '#2563eb', count: 11, position: 'Centro' },
  { id: 'Creemos', name: 'Creemos', shortName: 'CREEMOS', 
    color: '#f97316', count: 4, position: 'Derecha' }
])

// Configuración de distribución en semicírculo
const generateSeatPositions = () => {
  const centerX = 500
  const centerY = 400
  const radius = [220, 260, 300] // Radios para las 3 filas
  
  // Filas del hemiciclo
  const row1 = [] // Fila más cercana a la presidencia
  const row2 = [] // Fila intermedia
  const row3 = [] // Fila más alejada
  
  // Distribuir senadores por filas (aproximadamente 12 por fila)
  senatorsData.value.forEach((senator, index) => {
    let row, positionInRow
    
    if (index < 12) {
      row = 1
      positionInRow = index
    } else if (index < 24) {
      row = 2
      positionInRow = index - 12
    } else {
      row = 3
      positionInRow = index - 24
    }
    
    // Calcular posición en semicírculo
    const totalInRow = row === 1 ? 12 : row === 2 ? 12 : 12
    const angle = Math.PI * (positionInRow / (totalInRow - 1)) - Math.PI / 2
    
    const seat = {
      ...senator,
      x: centerX + Math.cos(angle) * radius[row - 1],
      y: centerY + Math.sin(angle) * radius[row - 1] * 0.6,
      row: row,
      positionInRow: positionInRow
    }
    
    if (row === 1) row1.push(seat)
    else if (row === 2) row2.push(seat)
    else row3.push(seat)
  })
  
  return { row1, row2, row3 }
}

// Computados para las filas
const { row1, row2, row3 } = generateSeatPositions()

const row1Seats = computed(() => row1)
const row2Seats = computed(() => row2)
const row3Seats = computed(() => row3)
const allSeats = computed(() => [...row1, ...row2, ...row3])

// Métodos
const selectSenator = (senator) => {
  selectedSenator.value = senator
  hoveredSeat.value = null // Limpiar hover al seleccionar
}

const deselectSenator = () => {
  selectedSenator.value = null
}

const handleSeatHover = (seat) => {
  hoveredSeat.value = seat
  updateTooltipPosition(seat)
}

const updateTooltipPosition = (seat) => {
  const container = document.querySelector('.hemicycle-svg-container')
  if (!container) return
  
  const rect = container.getBoundingClientRect()
  const svgRect = container.querySelector('svg').getBoundingClientRect()
  
  // Calcular posición relativa al SVG
  const xPercent = (seat.x / 1000) * 100
  const yPercent = (seat.y / 600) * 100
  
  // Posicionar tooltip cerca del asiento pero no encima
  const tooltipX = (xPercent / 100) * svgRect.width
  const tooltipY = (yPercent / 100) * svgRect.height
  
  // Posición relativa al contenedor
  tooltipStyle.left = `${tooltipX + 30}px`
  tooltipStyle.top = `${tooltipY - 50}px`
}

const handleMouseMove = (event) => {
  // Solo actualizar si hay hover y no hay selección
  if (hoveredSeat.value && !selectedSenator.value) {
    const container = document.querySelector('.hemicycle-svg-container')
    if (container) {
      const rect = container.getBoundingClientRect()
      // Posicionar tooltip fijo cerca del asiento, no seguir el mouse
      // Esto evita el efecto de "bucle" y movimiento constante
    }
  }
}

const getSeatColor = (seat) => {
  if (highlightedParty.value && seat.party !== highlightedParty.value) {
    return '#e5e7eb' // Gris para asientos no destacados
  }
  return seat.partyColor
}

const getSeatStroke = (seat) => {
  if (selectedSenator.value?.id === seat.id) return '#f59e0b' // Amarillo para seleccionado
  if (hoveredSeat.value?.id === seat.id) return '#3b82f6' // Azul para hover
  return seat.partyColor
}

const togglePartyFilter = (partyId) => {
  const index = activeFilters.value.indexOf(partyId)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(partyId)
  }
}

const highlightParty = (partyId) => {
  if (highlightedParty.value === partyId) {
    highlightedParty.value = null
  } else {
    highlightedParty.value = partyId
  }
}

const resetView = () => {
  selectedSenator.value = null
  activeFilters.value = []
  highlightedParty.value = null
  searchQuery.value = ''
}

const toggleLabels = () => {
  showLabels.value = !showLabels.value
}

const handleSearch = () => {
  // Implementar búsqueda si es necesario
  console.log('Buscando:', searchQuery.value)
}

onMounted(() => {
  // Asegurar que las posiciones se calculen correctamente
  console.log('Hemiciclo cargado con', allSeats.value.length, 'senadores')
})
</script>

<style scoped>
.senate-chamber {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Header */
.chamber-header {
  background: linear-gradient(to right, #007934 0%, #F9B233 50%, #D52B1E 100%);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.bolivia-flag {
  width: 80px;
  height: 60px;
  position: relative;
  border: 2px solid white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.flag-stripe {
  height: 33.33%;
}

.flag-stripe.red {
  background: #D52B1E;
}

.flag-stripe.yellow {
  background: #F9B233;
}

.flag-stripe.green {
  background: #007934;
}

.flag-star {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: gold;
  font-size: 1.5rem;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.header-titles h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.session-info {
  display: flex;
  gap: 2rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.label {
  font-size: 0.85rem;
  opacity: 0.9;
}

.value {
  font-weight: 600;
  font-size: 1rem;
}

/* Controles */
.controls-section {
  background: white;
  margin: 1.5rem 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
}

.search-btn {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background: #2563eb;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-weight: 600;
  color: #4b5563;
}

.party-buttons {
  display: flex;
  gap: 0.75rem;
}

.party-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.party-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.party-btn.active {
  outline: 3px solid #4b5563;
  outline-offset: 2px;
}

.party-name {
  font-size: 0.9rem;
}

.party-count {
  background: rgba(255, 255, 255, 0.3);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
}

.view-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  color: #4b5563;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.control-btn:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

/* Hemiciclo Container */
.hemicycle-container {
  background: white;
  margin: 0 2rem 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hemicycle-header {
  padding: 1.5rem;
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hemicycle-header h2 {
  margin: 0;
  color: #1f2937;
}

.hemicycle-info {
  display: flex;
  gap: 1rem;
}

.info-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e0f2fe;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #0369a1;
}

.badge-icon {
  font-size: 1rem;
}

/* Presidencia */
.presidency-area {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, #fef3c7, #fde68a);
  border-bottom: 2px solid #fbbf24;
}

.president-desk {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.desk-icon {
  font-size: 3rem;
}

.desk-info {
  text-align: center;
}

.president-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #92400e;
  margin-bottom: 0.25rem;
}

.president-title {
  color: #b45309;
  font-size: 0.9rem;
}

.vice-presidents {
  display: flex;
  gap: 3rem;
}

.vice-chair {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #92400e;
  font-size: 0.9rem;
}

.chair-icon {
  font-size: 1.5rem;
}

/* SVG Container */
.hemicycle-svg-container {
  position: relative;
  padding: 2rem;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
}

.hemicycle-svg {
  width: 100%;
  max-width: 900px;
  height: auto;
}

/* Estilos de asientos */
.senator-seat {
  cursor: pointer;
  transition: all 0.3s ease;
}

.senator-seat:hover {
  stroke-width: 3px;
}

.senator-seat.selected {
  stroke: #f59e0b;
  stroke-width: 3px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    stroke-width: 3px;
  }
  50% {
    stroke-width: 5px;
  }
  100% {
    stroke-width: 3px;
  }
}

.senator-seat.hovered {
  stroke: #3b82f6;
  stroke-width: 3px;
}

.seat-label {
  user-select: none;
  pointer-events: none;
}

/* Tooltip fijo */
.seat-tooltip {
  position: absolute;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 2px solid #3b82f6;
  z-index: 100;
  min-width: 240px;
  pointer-events: none;
  transform: translate(0, 0);
  transition: none !important; /* Eliminar transiciones que causen movimiento */
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.party-indicator {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid white;
  box-shadow: 0 0 0 1px #9ca3af;
}

.senator-info h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1rem;
}

.party-badge {
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  background: #f3f4f6;
  color: #4b5563;
}

.tooltip-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.label {
  color: #6b7280;
}

.value {
  font-weight: 600;
  color: #1f2937;
}

.hint {
  font-size: 0.8rem;
  color: #3b82f6;
  font-style: italic;
  margin-top: 0.5rem;
  text-align: center;
}

/* Leyenda */
.party-legend {
  padding: 1.5rem;
  background: #f9fafb;
  border-top: 2px solid #e5e7eb;
}

.party-legend h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
}

.legend-item:hover {
  border-color: #d1d5db;
  transform: translateY(-1px);
}

.legend-item.highlighted {
  border-color: #1f2937;
  background: #f3f4f6;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid white;
  box-shadow: 0 0 0 1px #9ca3af;
}

.legend-details {
  flex: 1;
}

.legend-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.legend-stats {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #6b7280;
}

/* Panel de información del senador */
.senator-info-panel {
  background: white;
  margin: 0 2rem 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.panel-header {
  padding: 1.5rem;
  background: #1e40af;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.close-btn {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.senator-details {
  padding: 2rem;
}

.senator-header {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.photo-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.senator-photo {
  width: 200px;
  height: 250px;
  background: #f3f4f6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #e5e7eb;
}

.photo-placeholder {
  font-size: 3rem;
  font-weight: 700;
  color: #9ca3af;
}

.senator-badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge.party {
  color: white;
}

.badge.department {
  background: #e0f2fe;
  color: #0369a1;
}

.senator-basic-info h2 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.8rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-item {
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-item .label {
  color: #6b7280;
  font-size: 0.9rem;
}

.info-item .value {
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
}

.detailed-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.info-section h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.1rem;
}

.commissions-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.commission-item {
  padding: 0.75rem;
  background: #f3f4f6;
  border-radius: 6px;
  color: #4b5563;
  font-size: 0.9rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-item .label {
  color: #6b7280;
}

.contact-item .value {
  font-weight: 500;
  color: #1f2937;
}

/* Estado vacío */
.empty-state {
  padding: 3rem 2rem;
  text-align: center;
  color: #6b7280;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h4 {
  margin: 0 0 0.5rem 0;
  color: #4b5563;
}

.empty-state p {
  margin: 0;
  max-width: 400px;
  margin: 0 auto;
}

/* Footer */
.chamber-footer {
  background: #1f2937;
  color: white;
  padding: 1.5rem 2rem;
  text-align: center;
}

.chamber-footer p {
  margin: 0.25rem 0;
}

.footer-note {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 1024px) {
  .chamber-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .session-info {
    justify-content: center;
  }
  
  .filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .senator-header {
    grid-template-columns: 1fr;
  }
  
  .detailed-info {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hemicycle-container,
  .controls-section,
  .senator-info-panel {
    margin: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .party-buttons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>