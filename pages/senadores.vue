<template>
  <div class="senate-chamber">
    <!-- Header minimalista -->
    <header class="chamber-header">
      <!-- Solo espacio para header -->
    </header>

    <main class="main-content">
      <!-- Contenedor principal con gráfico y controles -->
      <div class="main-container">
        <!-- Hemiciclo Principal - Tamaño ajustado -->
        <div class="hemicycle-container">
          <!-- SVG con tamaño ajustado a los círculos -->
          <div class="hemicycle-svg-container">
            <svg 
              class="hemicycle-svg"
              viewBox="100 200 1000 350"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="circleShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.1)"/>
                </filter>
                
                <!-- Imagen de fondo como marca de agua -->
                <pattern id="hemicyclePattern" patternUnits="userSpaceOnUse" width="1000" height="350">
                  <!-- Imagen de fondo de un hemiciclo/parlamento -->
                  <image 
                    href="https://images.unsplash.com/photo-1562602839-7f6d8c5c8c3b?w=1000&h=350&fit=crop&q=80&auto=format"
                    x="0" 
                    y="0" 
                    width="1000" 
                    height="350"
                    opacity="0.08"
                    preserveAspectRatio="xMidYMid slice"
                  />
                  <!-- Overlay blanco para suavizar la imagen -->
                  <rect x="0" y="0" width="1000" height="350" fill="#f8fafc" opacity="0.7"/>
                </pattern>
              </defs>

              <!-- Fondo del hemiciclo con imagen -->
              <rect x="100" y="200" width="1000" height="350" fill="url(#hemicyclePattern)" rx="10" ry="10"/>

              <!-- CURVA SUPERIOR AJUSTADA -->
              <!-- Lado Izquierdo Curva Superior (7 círculos) -->
              <g v-for="(seat, index) in filteredUpperCurveLeftSeats" :key="seat.id">
                <circle
                  :cx="seat.x"
                  :cy="seat.y"
                  r="20" 
                  :fill="getSeatColor(seat)"
                  :stroke="getSeatStroke(seat)"
                  :stroke-width="selectedSenator?.id === seat.id ? '2' : '1.5'"
                  :class="['senator-circle', 
                    { 
                      'selected': selectedSenator?.id === seat.id,
                      'hovered': hoveredSeat?.id === seat.id
                    }]"
                  @click="selectSenator(seat)"
                  @mouseenter="hoveredSeat = seat"
                  @mouseleave="hoveredSeat = null"
                  filter="url(#circleShadow)"
                />
                
                <text
                  :x="seat.x"
                  :y="seat.y"
                  text-anchor="middle"
                  :fill="getTextColor(seat.partyColor)"
                  font-size="12" 
                  font-weight="bold"
                  class="seat-number"
                >
                  {{ seat.seatNumber }}
                </text>
                
                <!-- Nombre en columna -->
                <g v-if="showLabels">
                  <text
                    v-for="(namePart, idx) in getNameParts(seat.name)"
                    :key="idx"
                    :x="seat.x"
                    :y="seat.y + 30 + (idx * 9)"
                    text-anchor="middle"
                    fill="#374151"
                    font-size="7"
                    font-weight="500"
                    class="senator-name-part"
                  >
                    {{ namePart }}
                  </text>
                </g>
              </g>

              <!-- Lado Derecho Curva Superior (7 círculos) -->
              <g v-for="(seat, index) in filteredUpperCurveRightSeats" :key="seat.id">
                <circle
                  :cx="seat.x"
                  :cy="seat.y"
                  r="20"
                  :fill="getSeatColor(seat)"
                  :stroke="getSeatStroke(seat)"
                  :stroke-width="selectedSenator?.id === seat.id ? '2' : '1.5'"
                  :class="['senator-circle', 
                    { 
                      'selected': selectedSenator?.id === seat.id,
                      'hovered': hoveredSeat?.id === seat.id
                    }]"
                  @click="selectSenator(seat)"
                  @mouseenter="hoveredSeat = seat"
                  @mouseleave="hoveredSeat = null"
                  filter="url(#circleShadow)"
                />
                
                <text
                  :x="seat.x"
                  :y="seat.y"
                  text-anchor="middle"
                  :fill="getTextColor(seat.partyColor)"
                  font-size="12"
                  font-weight="bold"
                  class="seat-number"
                >
                  {{ seat.seatNumber }}
                </text>
                
                <!-- Nombre en columna -->
                <g v-if="showLabels">
                  <text
                    v-for="(namePart, idx) in getNameParts(seat.name)"
                    :key="idx"
                    :x="seat.x"
                    :y="seat.y + 30 + (idx * 9)"
                    text-anchor="middle"
                    fill="#374151"
                    font-size="7"
                    font-weight="500"
                    class="senator-name-part"
                  >
                    {{ namePart }}
                  </text>
                </g>
              </g>

              <!-- CURVA INFERIOR AJUSTADA -->
              <!-- Lado Izquierdo Curva Inferior (11 círculos) -->
              <g v-for="(seat, index) in filteredLowerCurveLeftSeats" :key="seat.id">
                <circle
                  :cx="seat.x"
                  :cy="seat.y"
                  r="20" 
                  :fill="getSeatColor(seat)"
                  :stroke="getSeatStroke(seat)"
                  :stroke-width="selectedSenator?.id === seat.id ? '2' : '1.5'"
                  :class="['senator-circle', 
                    { 
                      'selected': selectedSenator?.id === seat.id,
                      'hovered': hoveredSeat?.id === seat.id
                    }]"
                  @click="selectSenator(seat)"
                  @mouseenter="hoveredSeat = seat"
                  @mouseleave="hoveredSeat = null"
                  filter="url(#circleShadow)"
                />
                
                <text
                  :x="seat.x"
                  :y="seat.y"
                  text-anchor="middle"
                  :fill="getTextColor(seat.partyColor)"
                  font-size="12"
                  font-weight="bold"
                  class="seat-number"
                >
                  {{ seat.seatNumber }}
                </text>
                
                <!-- Nombre en columna -->
                <g v-if="showLabels">
                  <text
                    v-for="(namePart, idx) in getNameParts(seat.name)"
                    :key="idx"
                    :x="seat.x"
                    :y="seat.y + 30 + (idx * 9)"
                    text-anchor="middle"
                    fill="#374151"
                    font-size="7"
                    font-weight="500"
                    class="senator-name-part"
                  >
                    {{ namePart }}
                  </text>
                </g>
              </g>

              <!-- Lado Derecho Curva Inferior (11 círculos) -->
              <g v-for="(seat, index) in filteredLowerCurveRightSeats" :key="seat.id">
                <circle
                  :cx="seat.x"
                  :cy="seat.y"
                  r="20"
                  :fill="getSeatColor(seat)"
                  :stroke="getSeatStroke(seat)"
                  :stroke-width="selectedSenator?.id === seat.id ? '2' : '1.5'"
                  :class="['senator-circle', 
                    { 
                      'selected': selectedSenator?.id === seat.id,
                      'hovered': hoveredSeat?.id === seat.id
                    }]"
                  @click="selectSenator(seat)"
                  @mouseenter="hoveredSeat = seat"
                  @mouseleave="hoveredSeat = null"
                  filter="url(#circleShadow)"
                />
                
                <text
                  :x="seat.x"
                  :y="seat.y"
                  text-anchor="middle"
                  :fill="getTextColor(seat.partyColor)"
                  font-size="12"
                  font-weight="bold"
                  class="seat-number"
                >
                  {{ seat.seatNumber }}
                </text>
                
                <!-- Nombre en columna -->
                <g v-if="showLabels">
                  <text
                    v-for="(namePart, idx) in getNameParts(seat.name)"
                    :key="idx"
                    :x="seat.x"
                    :y="seat.y + 30 + (idx * 9)"
                    text-anchor="middle"
                    fill="#374151"
                    font-size="7"
                    font-weight="500"
                    class="senator-name-part"
                  >
                    {{ namePart }}
                  </text>
                </g>
              </g>
            </svg>

            <!-- Tooltip -->
            <div 
              v-if="hoveredSeat && !selectedSenator" 
              class="seat-tooltip"
              :style="tooltipStyle"
            >
              <div class="tooltip-header">
                <div class="seat-number-indicator" :style="{ backgroundColor: hoveredSeat.partyColor }">
                  {{ hoveredSeat.seatNumber }}
                </div>
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
                  <span class="label">Partido:</span>
                  <span class="value">{{ hoveredSeat.partyShort }}</span>
                </div>
                <div class="hint">👆 Click para detalles</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel de controles a la derecha (en escritorio) -->
        <div class="controls-panel-right">
          <!-- Controles de vista -->
          <div class="controls-section">
            <h4>Controles</h4>
            <div class="view-controls-vertical">
              <button @click="resetView" class="view-btn-vertical">
                <span class="view-icon">🔄</span>
                <span class="view-label">Reiniciar Vista</span>
              </button>
              <button @click="toggleLabels" class="view-btn-vertical">
                <span class="view-icon">{{ showLabels ? '👁️' : '🙈' }}</span>
                <span class="view-label">{{ showLabels ? 'Ocultar Nombres' : 'Mostrar Nombres' }}</span>
              </button>
            </div>
          </div>

          <!-- Leyenda -->
          <div class="controls-section">
            <h4>Distribución</h4>
            <div class="legend-vertical">
              <div 
                v-for="party in parties"
                :key="party.id"
                class="legend-item-vertical"
                @click="togglePartyFilter(party.id)"
                :class="{ 'highlighted': activeFilters.includes(party.id) }"
              >
                <div class="legend-color-vertical" :style="{ backgroundColor: party.color }">
                  <span class="legend-symbol">{{ party.symbol }}</span>
                </div>
                <div class="legend-details-vertical">
                  <div class="legend-name-vertical">{{ party.shortName }}</div>
                  <div class="legend-count-vertical">{{ getFilteredCount(party.id) }} senadores</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Panel de información -->
      <div class="info-panel">
        <div class="panel-header">
          <h3>📋 Información del Senador</h3>
          <button 
            v-if="selectedSenator" 
            @click="deselectSenator"
            class="close-btn"
          >
            ✕ Cerrar
          </button>
        </div>

        <div v-if="selectedSenator" class="senator-details">
          <!-- Header -->
          <div class="senator-header">
            <div class="photo-section">
              <div class="photo-container">
                <div class="senator-photo" :style="{ backgroundColor: selectedSenator.partyColor }">
                  {{ formatInitials(selectedSenator.name) }}
                </div>
                <div class="senator-badges">
                  <div class="badge party" :style="{ backgroundColor: selectedSenator.partyColor }">
                    {{ selectedSenator.partyShort }}
                  </div>
                  <div class="badge department">
                    {{ selectedSenator.department }}
                  </div>
                  <div class="badge curve-location" :style="{ 
                    backgroundColor: selectedSenator.curve === 'upper' ? '#3b82f6' : '#dc2626',
                    color: 'white'
                  }">
                    Curva {{ selectedSenator.curve === 'upper' ? 'Superior' : 'Inferior' }}
                  </div>
                </div>
              </div>
              
              <div class="seat-info">
                <div class="info-card">
                  <div class="card-icon">🪑</div>
                  <div class="card-content">
                    <div class="card-value">Asiento {{ selectedSenator.seatNumber }}</div>
                    <div class="card-label">Curva {{ selectedSenator.curve === 'upper' ? 'Superior' : 'Inferior' }}, Lado {{ selectedSenator.side === 'left' ? 'Izquierdo' : 'Derecho' }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="senator-info">
              <h2>{{ selectedSenator.name }}</h2>
              
              <div class="info-grid">
                <div class="info-item">
                  <span class="label">📅 Edad:</span>
                  <span class="value">{{ selectedSenator.age }} años</span>
                </div>
                <div class="info-item">
                  <span class="label">🎓 Profesión:</span>
                  <span class="value">{{ selectedSenator.profession }}</span>
                </div>
                <div class="info-item">
                  <span class="label">📍 Departamento:</span>
                  <span class="value">{{ selectedSenator.department }}</span>
                </div>
                <div class="info-item">
                  <span class="label">📊 Periodo:</span>
                  <span class="value">{{ selectedSenator.period }}</span>
                </div>
              </div>

              <!-- Información de contacto -->
              <div class="contact-section">
                <h4>📞 Contacto</h4>
                <div class="contact-info">
                  <div class="contact-item">
                    <span class="label">✉️ Email:</span>
                    <span class="value">{{ selectedSenator.email || 'No disponible' }}</span>
                  </div>
                  <div class="contact-item">
                    <span class="label">📱 Teléfono:</span>
                    <span class="value">{{ selectedSenator.phone || 'No disponible' }}</span>
                  </div>
                  <div class="contact-item">
                    <span class="label">🏢 Oficina:</span>
                    <span class="value">{{ selectedSenator.office || 'No disponible' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Comisiones -->
          <div class="commissions-section" v-if="selectedSenator.commissions">
            <h4>🏛️ Comisiones</h4>
            <div class="commissions-list">
              <div 
                v-for="commission in selectedSenator.commissions"
                :key="commission"
                class="commission-card"
              >
                <div class="commission-icon">📋</div>
                <div class="commission-name">{{ commission }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">👆</div>
          <h4>Selecciona un Senador</h4>
          <p>Haz click en cualquier círculo del hemiciclo para ver información detallada</p>
          <div class="empty-tips">
            <p><strong>Curva Superior:</strong> 14 senadores</p>
            <p><strong>Curva Inferior:</strong> 22 senadores</p>
            <p><strong>Total:</strong> 36 senadores de 3 partidos</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="chamber-footer">
      <div class="footer-content">
        <div class="footer-info">
          <p class="footer-sub">Visualización de Hemiciclo del Senado</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
definePageMeta({
  layout: 'alter4'
})
// Datos de los 36 senadores actualizados con nombres completos
const senatorsData = ref([
  // CURVA SUPERIOR: 14 senadores (1-14)
  // Lado izquierdo Curva Superior: 7 senadores (1-7)
  { id: 1, name: "María Eugenia Choque Quispe", seatNumber: 1, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "La Paz", age: 52,
    profession: "Socióloga", period: "2020-2025",
    commissions: ["Constitución", "Derechos Humanos"],
    email: "mchoque@senado.bo", phone: "(591-2) 220-0001",
    office: "Edificio A, Oficina 101"
  },
  { id: 2, name: "Juan Carlos García López", seatNumber: 2, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Santa Cruz", age: 48,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 3, name: "Ana María Rojas Flores", seatNumber: 3, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Cochabamba", age: 45,
    profession: "Educadora", period: "2020-2025"
  },
  { id: 4, name: "Luisa Mamani Condori", seatNumber: 4, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Oruro", age: 55,
    profession: "Médica", period: "2020-2025"
  },
  { id: 5, name: "Carlos Fernández Vargas", seatNumber: 5, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Potosí", age: 50,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 6, name: "Patricia Flores Salazar", seatNumber: 6, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Tarija", age: 47,
    profession: "Economista", period: "2020-2025"
  },
  { id: 7, name: "Miguel Ángel López Rodríguez", seatNumber: 7, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Chuquisaca", age: 53,
    profession: "Abogado", period: "2020-2025"
  },
  
  // Lado derecho Curva Superior: 7 senadores (8-14)
  { id: 8, name: "Carlos Alberto Mesa Gisbert", seatNumber: 8, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "La Paz", age: 48,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 9, name: "Roberto Fernández Ríos", seatNumber: 9, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Tarija", age: 55,
    profession: "Ingeniero Civil", period: "2020-2025"
  },
  { id: 10, name: "José Luis Paredes Muñoz", seatNumber: 10, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Chuquisaca", age: 56,
    profession: "Economista", period: "2020-2025"
  },
  { id: 11, name: "Ricardo Morales Salinas", seatNumber: 11, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Cochabamba", age: 49,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 12, name: "Fernando Vargas Moscoso", seatNumber: 12, curve: 'upper', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "Santa Cruz", age: 45,
    profession: "Empresario", period: "2020-2025"
  },
  { id: 13, name: "Marta Quispe Torrez", seatNumber: 13, curve: 'upper', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "La Paz", age: 38,
    profession: "Médica", period: "2020-2025"
  },
  { id: 14, name: "Felipe Mendoza Suárez", seatNumber: 14, curve: 'upper', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "Santa Cruz", age: 42,
    profession: "Ingeniero", period: "2020-2025"
  },

  // CURVA INFERIOR: 22 senadores (15-36)
  // Lado izquierdo Curva Inferior: 11 senadores (15-25)
  { id: 15, name: "Susana Méndez Alarcón", seatNumber: 15, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Beni", age: 44,
    profession: "Administradora", period: "2020-2025"
  },
  { id: 16, name: "Alberto Gutiérrez Paz", seatNumber: 16, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Pando", age: 56,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 17, name: "Carmen Rosa Sánchez Lima", seatNumber: 17, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "La Paz", age: 49,
    profession: "Periodista", period: "2020-2025"
  },
  { id: 18, name: "Jorge Luis Pérez Mendoza", seatNumber: 18, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Santa Cruz", age: 51,
    profession: "Empresario", period: "2020-2025"
  },
  { id: 19, name: "Gabriela Torres Guzmán", seatNumber: 19, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Cochabamba", age: 46,
    profession: "Abogada", period: "2020-2025"
  },
  { id: 20, name: "Raúl Castro Valdivia", seatNumber: 20, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Oruro", age: 54,
    profession: "Sociólogo", period: "2020-2025"
  },
  { id: 21, name: "Elizabeth Ríos Herrera", seatNumber: 21, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Potosí", age: 43,
    profession: "Educadora", period: "2020-2025"
  },
  { id: 22, name: "Mario Vargas Camacho", seatNumber: 22, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Tarija", age: 52,
    profession: "Médico", period: "2020-2025"
  },
  { id: 23, name: "Silvia Fernández Rocha", seatNumber: 23, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Chuquisaca", age: 48,
    profession: "Abogada", period: "2020-2025"
  },
  { id: 24, name: "Pedro Castillo Mercado", seatNumber: 24, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Beni", age: 55,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 25, name: "Claudia Paz Zamora", seatNumber: 25, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Pando", age: 44,
    profession: "Economista", period: "2020-2025"
  },
  
  // Lado derecho Curva Inferior: 11 senadores (26-36)
  { id: 26, name: "Victoria Choque Mamani", seatNumber: 26, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "La Paz", age: 45,
    profession: "Abogada", period: "2020-2025"
  },
  { id: 27, name: "Walter Álvarez Salvatierra", seatNumber: 27, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Santa Cruz", age: 52,
    profession: "Empresario", period: "2020-2025"
  },
  { id: 28, name: "Natalia Gutiérrez Ríos", seatNumber: 28, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Beni", age: 46,
    profession: "Médica", period: "2020-2025"
  },
  { id: 29, name: "Óscar Paredes Flores", seatNumber: 29, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Oruro", age: 54,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 30, name: "Rosa María López Vargas", seatNumber: 30, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Potosí", age: 50,
    profession: "Educadora", period: "2020-2025"
  },
  { id: 31, name: "Héctor Vásquez Mercado", seatNumber: 31, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Pando", age: 53,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 32, name: "Karen Salazar Pérez", seatNumber: 32, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Tarija", age: 44,
    profession: "Periodista", period: "2020-2025"
  },
  { id: 33, name: "Andrés Romero Torres", seatNumber: 33, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "La Paz", age: 50,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 34, name: "Daniela Mendoza Suárez", seatNumber: 34, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Santa Cruz", age: 47,
    profession: "Administradora", period: "2020-2025"
  },
  { id: 35, name: "Luis Fernando Arce Catacora", seatNumber: 35, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Cochabamba", age: 53,
    profession: "Economista", period: "2020-2025"
  },
  { id: 36, name: "Carolina Herrera Gómez", seatNumber: 36, curve: 'lower', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "Cochabamba", age: 47,
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
  { 
    id: 'MAS-IPSP', 
    name: 'Movimiento al Socialismo', 
    shortName: 'MAS', 
    symbol: '🔴',
    color: '#dc2626', 
    count: 21,
    position: 'Izquierda del pasillo'
  },
  { 
    id: 'Comunidad Ciudadana', 
    name: 'Comunidad Ciudadana', 
    shortName: 'CC', 
    symbol: '🔵',
    color: '#2563eb', 
    count: 11,
    position: 'Derecha del pasillo'
  },
  { 
    id: 'Creemos', 
    name: 'Creemos', 
    shortName: 'CREEMOS', 
    symbol: '🟠',
    color: '#f97316', 
    count: 4,
    position: 'Derecha del pasillo'
  }
])

// Función para dividir nombres en partes para mostrar en columna
const getNameParts = (fullName) => {
  const parts = fullName.split(' ')
//   if (parts.length <= 2) {
//     return [fullName]
//   } else if (parts.length === 3) {
//     // Para "Grover Plaza Quiroga" -> ["Grover", "Plaza", "Quiroga"]
//     return parts
//   } else {
//     // Para más de 3 partes, agrupar los apellidos
//     return [parts[0], parts.slice(1).join(' ')]
//   }
    return parts
}

// Función para obtener iniciales
const formatInitials = (fullName) => {
  const parts = fullName.split(' ')
  if (parts.length >= 3) {
    return `${parts[0].charAt(0)}${parts[parts.length-2].charAt(0)}${parts[parts.length-1].charAt(0)}`.toUpperCase()
  } else if (parts.length === 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
  }
  return fullName.substring(0, 2).toUpperCase()
}

// Configuración de POSICIONES CON AJUSTES ESPECÍFICOS
const generateCurvedPositions = () => {
  const upperCurveLeftSeats = []   // 7 senadores
  const upperCurveRightSeats = []  // 7 senadores
  const lowerCurveLeftSeats = []   // 11 senadores
  const lowerCurveRightSeats = []  // 11 senadores
  
  // CURVA SUPERIOR CON AJUSTES ESPECÍFICOS
  // Lado izquierdo Curva Superior - AJUSTES: 1 más arriba, 7 más abajo
  const upperLeftPositions = [
    {x: 250, y: 265},  // Asiento 1: MÁS ARRIBA (265)
    {x: 300, y: 285},
    {x: 350, y: 303},
    {x: 400, y: 320},  // Centro: mantiene
    {x: 450, y: 331},
    {x: 500, y: 334},
    {x: 550, y: 335}   // Asiento 7: MÁS ABAJO (285)
  ]
  
  // Lado derecho Curva Superior - AJUSTES: 14 más arriba, 8 más abajo
  const upperRightPositions = [
    {x: 650, y: 335},  // Asiento 8: MÁS ABAJO (285)
    {x: 700, y: 334},
    {x: 750, y: 331},
    {x: 800, y: 320},  // Centro: mantiene
    {x: 850, y: 303},
    {x: 900, y: 285},
    {x: 950, y: 265}   // Asiento 14: MÁS ARRIBA (265)
  ]
  
  // CURVA INFERIOR CON AJUSTES ESPECÍFICOS
  // Lado izquierdo Curva Inferior - AJUSTES: 15 más arriba, 25 más abajo
  const lowerLeftPositions = [
    {x: 160, y: 410},  // Asiento 15 - Similar curvatura a asiento 1
    {x: 200, y: 435},  // 16 cercano entre sí
    {x: 240, y: 460},
    {x: 280, y: 478},
    {x: 320, y: 490},
    {x: 360, y: 500},  // 20 - menos pronunciado
    {x: 400, y: 510},  // 21 suave
    {x: 440, y: 515},  // 22 a asiento 5-6
    {x: 480, y: 518},  // 23 descenso
    {x: 520, y: 520},  // 24 suave
    {x: 560, y: 521}   // Asiento 25: MÁS ABAJO (545)
  ]
  
  // Lado derecho Curva Inferior - AJUSTES: 36 más arriba, 26 más abajo
  const lowerRightPositions = [
    {x: 640, y: 521},  // Asiento 26 - Similar curvatura a asiento 8
    {x: 680, y: 520},  // Más cercano entre sí
    {x: 720, y: 518},
    {x: 760, y: 515},
    {x: 800, y: 510},  // Similar a asiento 11-12
    {x: 840, y: 500},  // Centro - menos pronunciado
    {x: 880, y: 490},
    {x: 920, y: 478},
    {x: 960, y: 460},
    {x: 1000, y: 435}, // Más suave
    {x: 1040, y: 410}  // Asiento 36: MÁS ARRIBA (465)
  ]
  
  // Asignar posiciones Curva Superior Izquierda
  for (let i = 0; i < 7; i++) {
    let senator = senatorsData.value.find(s => s.seatNumber === i + 1)
    if (senator && upperLeftPositions[i]) {
      senator.x = upperLeftPositions[i].x
      senator.y = upperLeftPositions[i].y
      upperCurveLeftSeats.push(senator)
    }
  }
  
  // Asignar posiciones Curva Superior Derecha
  for (let i = 0; i < 7; i++) {
    let senator = senatorsData.value.find(s => s.seatNumber === i + 8)
    if (senator && upperRightPositions[i]) {
      senator.x = upperRightPositions[i].x
      senator.y = upperRightPositions[i].y
      upperCurveRightSeats.push(senator)
    }
  }
  
  // Asignar posiciones Curva Inferior Izquierda
  for (let i = 0; i < 11; i++) {
    let senator = senatorsData.value.find(s => s.seatNumber === i + 15)
    if (senator && lowerLeftPositions[i]) {
      senator.x = lowerLeftPositions[i].x
      senator.y = lowerLeftPositions[i].y
      lowerCurveLeftSeats.push(senator)
    }
  }
  
  // Asignar posiciones Curva Inferior Derecha
  for (let i = 0; i < 11; i++) {
    let senator = senatorsData.value.find(s => s.seatNumber === i + 26)
    if (senator && lowerRightPositions[i]) {
      senator.x = lowerRightPositions[i].x
      senator.y = lowerRightPositions[i].y
      lowerCurveRightSeats.push(senator)
    }
  }
  
  return { upperCurveLeftSeats, upperCurveRightSeats, lowerCurveLeftSeats, lowerCurveRightSeats }
}

const { upperCurveLeftSeats, upperCurveRightSeats, lowerCurveLeftSeats, lowerCurveRightSeats } = generateCurvedPositions()

// Computed properties para datos filtrados
const filteredUpperCurveLeftSeats = computed(() => {
  if (activeFilters.value.length === 0) return upperCurveLeftSeats
  return upperCurveLeftSeats.filter(seat => activeFilters.value.includes(seat.party))
})

const filteredUpperCurveRightSeats = computed(() => {
  if (activeFilters.value.length === 0) return upperCurveRightSeats
  return upperCurveRightSeats.filter(seat => activeFilters.value.includes(seat.party))
})

const filteredLowerCurveLeftSeats = computed(() => {
  if (activeFilters.value.length === 0) return lowerCurveLeftSeats
  return lowerCurveLeftSeats.filter(seat => activeFilters.value.includes(seat.party))
})

const filteredLowerCurveRightSeats = computed(() => {
  if (activeFilters.value.length === 0) return lowerCurveRightSeats
  return lowerCurveRightSeats.filter(seat => activeFilters.value.includes(seat.party))
})

// Obtener conteo filtrado para la leyenda
const getFilteredCount = (partyId) => {
  if (activeFilters.value.length === 0) {
    return parties.value.find(p => p.id === partyId)?.count || 0
  }
  if (activeFilters.value.includes(partyId)) {
    return senatorsData.value.filter(senator => senator.party === partyId).length
  }
  return 0
}

// Métodos (se mantienen igual)
const selectSenator = (senator) => {
  selectedSenator.value = senator
  hoveredSeat.value = null
  updateTooltipPosition(senator)
}

const deselectSenator = () => {
  selectedSenator.value = null
}

const getSeatColor = (seat) => {
  if (activeFilters.value.length > 0 && !activeFilters.value.includes(seat.party)) {
    return '#f3f4f6'
  }
  return seat.partyColor
}

const getSeatStroke = (seat) => {
  if (selectedSenator.value?.id === seat.id) return '#f59e0b'
  if (hoveredSeat.value?.id === seat.id) return '#3b82f6'
  if (activeFilters.value.length > 0 && activeFilters.value.includes(seat.party)) {
    return '#000000'
  }
  return '#ffffff'
}

const getTextColor = (backgroundColor) => {
  const hex = backgroundColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

const togglePartyFilter = (partyId) => {
  const index = activeFilters.value.indexOf(partyId)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value = [partyId] // Solo un partido a la vez
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

const updateTooltipPosition = (seat) => {
  const container = document.querySelector('.hemicycle-svg-container')
  if (!container || !seat) return
  
  const svg = container.querySelector('svg')
  const svgRect = svg.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  
  const xPercent = (seat.x / 1200)
  const yPercent = (seat.y / 800)
  
  const tooltipX = containerRect.left + (xPercent * svgRect.width)
  const tooltipY = containerRect.top + (yPercent * svgRect.height)
  
  tooltipStyle.left = `${tooltipX - containerRect.left + 30}px`
  tooltipStyle.top = `${tooltipY - containerRect.top - 100}px`
}

const updateHoverTooltip = (event) => {
  if (hoveredSeat.value && !selectedSenator.value) {
    const container = document.querySelector('.hemicycle-svg-container')
    if (container) {
      const rect = container.getBoundingClientRect()
      tooltipStyle.left = `${event.clientX - rect.left + 15}px`
      tooltipStyle.top = `${event.clientY - rect.top + 15}px`
    }
  }
}

onMounted(() => {
  const container = document.querySelector('.hemicycle-svg-container')
  if (container) {
    container.addEventListener('mousemove', updateHoverTooltip)
  }
})
</script>

<style scoped>
.senate-chamber {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 0.5rem;
}

/* Header minimalista */
.chamber-header {
  height: 20px;
  margin-bottom: 0.5rem;
}

/* Contenedor principal con flexbox */
.main-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .main-container {
    flex-direction: row;
  }
}

/* Hemiciclo - Ocupa la mayor parte del espacio */
.hemicycle-container {
  flex: 3;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hemicycle-svg-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  max-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hemicycle-svg {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}

/* CÍRCULOS - SIN MOVIMIENTO, SOLO AGRANDAR EN HOVER */
.senator-circle {
  cursor: pointer;
  transition: all 0.2s ease;
}

.senator-circle:hover {
  stroke-width: 2px;
  transform: none; /* Sin movimiento */
  r: 22; /* Agranda el círculo en 2px */
}

.senator-circle.selected {
  stroke: #f59e0b;
  stroke-width: 2px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { stroke-width: 2px; }
  50% { stroke-width: 3px; }
  100% { stroke-width: 2px; }
}

.senator-circle.hovered {
  stroke: #3b82f6;
  stroke-width: 2px;
}

.seat-number, .senator-name-part {
  user-select: none;
  pointer-events: none;
}

/* Estilo para nombres en columna */
.senator-name-part {
  font-size: 7px;
  line-height: 1;
  font-weight: 500;
}

.seat-tooltip {
  position: absolute;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 2px solid #3b82f6;
  z-index: 100;
  min-width: 260px;
  pointer-events: none;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.seat-number-indicator {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.senator-info h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.1rem;
}

.party-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
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

.label { color: #6b7280; }
.value { font-weight: 600; color: #1f2937; }

.hint {
  font-size: 0.85rem;
  color: #3b82f6;
  font-style: italic;
  margin-top: 0.5rem;
  text-align: center;
}

/* Panel de controles a la derecha */
.controls-panel-right {
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem;
  min-width: 250px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (max-width: 1023px) {
  .controls-panel-right {
    max-width: 100%;
    order: -1; /* En móvil, va arriba */
  }
}

.controls-section h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

/* Controles de vista en vertical */
.view-controls-vertical {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.view-btn-vertical {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #4b5563;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.1s;
  text-align: left;
  width: 100%;
}

.view-btn-vertical:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

.view-icon {
  font-size: 1.2rem;
  min-width: 24px;
}

.view-label {
  flex: 1;
  font-size: 0.9rem;
}

/* Leyenda en vertical */
.legend-vertical {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legend-item-vertical {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.1s;
}

.legend-item-vertical:hover {
  border-color: #d1d5db;
  transform: translateX(2px);
}

.legend-item-vertical.highlighted {
  border-color: #1f2937;
  background: #f3f4f6;
}

.legend-color-vertical {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.legend-symbol {
  font-size: 1.2rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.legend-details-vertical {
  flex: 1;
}

.legend-name-vertical {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.95rem;
}

.legend-count-vertical {
  font-size: 0.85rem;
  color: #6b7280;
}

/* Panel de información */
.info-panel {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.panel-header {
  padding: 1rem 1.5rem;
  background: #1e40af;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h3 { 
  margin: 0; 
  font-size: 1.1rem;
}

.close-btn {
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.85rem;
}

.close-btn:hover { background: rgba(255, 255, 255, 0.25); }

.senator-details { 
  padding: 1.5rem;
  max-height: 500px;
  overflow-y: auto;
}

.senator-header {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
}

@media (max-width: 1024px) {
  .senator-header { grid-template-columns: 1fr; }
}

.photo-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.photo-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.senator-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.senator-badges {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.badge {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge.party { color: white; }
.badge.department {
  background: #e0f2fe;
  color: #0369a1;
}

.badge.curve-location {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.seat-info { display: flex; justify-content: center; }

.info-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.card-icon { font-size: 1.2rem; }

.card-content { display: flex; flex-direction: column; }

.card-value {
  font-weight: 700;
  color: #1f2937;
  font-size: 1rem;
}

.card-label {
  font-size: 0.8rem;
  color: #6b7280;
}

.senator-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.senator-info h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  font-size: 0.9rem;
}

.info-item .label {
  color: #6b7280;
  font-size: 0.85rem;
}

.info-item .value {
  font-weight: 600;
  color: #1f2937;
  font-size: 0.9rem;
}

.contact-section h4 {
  margin: 0 0 0.75rem 0;
  color: #1f2937;
  font-size: 1rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.9rem;
}

.contact-item:last-child { border-bottom: none; }

.contact-item .label { color: #6b7280; }
.contact-item .value { font-weight: 500; color: #1f2937; }

.commissions-section { margin-top: 1.5rem; }

.commissions-section h4 {
  margin: 0 0 0.75rem 0;
  color: #1f2937;
  font-size: 1rem;
}

.commissions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.commission-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: #f3f4f6;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
  font-size: 0.85rem;
}

.commission-icon { font-size: 1rem; }
.commission-name { font-weight: 500; color: #4b5563; }

.empty-state {
  padding: 2rem 1.5rem;
  text-align: center;
  color: #6b7280;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h4 {
  margin: 0 0 0.5rem 0;
  color: #4b5563;
  font-size: 1.1rem;
}

.empty-state p {
  margin: 0 0 1rem 0;
  max-width: 400px;
  margin: 0 auto 1rem;
  font-size: 0.9rem;
}

.empty-tips {
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
  background: #f9fafb;
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
}

.empty-tips p {
  margin: 0.4rem 0;
  font-size: 0.85rem;
}

.chamber-footer {
  background: #1f2937;
  color: white;
  padding: 1rem 1.5rem;
  text-align: center;
  margin-top: 1rem;
  border-radius: 8px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.footer-info p { 
  margin: 0.25rem 0; 
  font-size: 0.9rem;
}

.footer-sub {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }
  
  .controls-panel-right {
    order: -1;
    max-width: 100%;
  }
  
  .hemicycle-container {
    min-height: 350px;
  }
  
  .hemicycle-svg-container {
    min-height: 350px;
  }
  
  .senator-header {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .senator-photo {
    width: 120px;
    height: 120px;
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .info-grid { grid-template-columns: 1fr; }
  
  .photo-section { align-items: center; }
  
  .senator-photo {
    width: 100px;
    height: 100px;
    font-size: 1.8rem;
  }
  
  .hemicycle-container {
    min-height: 300px;
  }
  
  .hemicycle-svg-container {
    min-height: 300px;
  }
  
  .panel-header {
    padding: 0.75rem 1rem;
  }
  
  .panel-header h3 {
    font-size: 1rem;
  }
  
  .close-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>