<template>
  <div class="senate-chamber">
    <!-- Header (puede ser sobrescrito con slot) -->
    <header v-if="showHeader" class="chamber-header">
      <slot name="header">
        <div class="default-header">
          <h2>Hemiciclo del Senado</h2>
        </div>
      </slot>
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
              :viewBox="viewBox"
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
                    :href="backgroundImage"
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
                  @mouseenter="handleMouseEnter(seat, $event)"
                  @mouseleave="handleMouseLeave()"
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
                    :x="seat.x - 30 - (idx * 9)"
                    :y="seat.y + 30 + (idx * 9)"
                    text-anchor="middle"
                    fill="#374151"
                    font-size="12"
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
                  @mouseenter="handleMouseEnter(seat, $event)"
                  @mouseleave="handleMouseLeave()"
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
                    :x="seat.x + 30 + (idx * 9)"
                    :y="seat.y + 30 + (idx * 9)"
                    text-anchor="middle"
                    fill="#374151"
                    font-size="12"
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
                  @mouseenter="handleMouseEnter(seat, $event)"
                  @mouseleave="handleMouseLeave()"
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
                    :x="seat.x - 30 - (idx * 9)"
                    :y="seat.y + 30 + (idx * 9)"
                    text-anchor="middle"
                    fill="#374151"
                    font-size="12"
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
                  @mouseenter="handleMouseEnter(seat, $event)"
                  @mouseleave="handleMouseLeave()"
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
                    :x="seat.x + 30 + (idx * 9)"
                    :y="seat.y + 30 + (idx * 9)"
                    text-anchor="middle"
                    fill="#374151"
                    font-size="12"
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
        <div v-if="showControls" class="controls-panel-right">
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
          <div class="commissions-section" v-if="selectedSenator.commissions && selectedSenator.commissions.length > 0">
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

          <!-- Slot para contenido adicional en el panel -->
          <slot name="senator-details-extra" :senator="selectedSenator"></slot>
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">👆</div>
          <h4>Selecciona un Senador</h4>
          <p>Haz click en cualquier círculo del hemiciclo para ver información detallada</p>
          <div class="empty-tips">
            <p><strong>Curva Superior:</strong> 14 senadores</p>
            <p><strong>Curva Inferior:</strong> 22 senadores</p>
            <p><strong>Total:</strong> {{ senators.length }} senadores de {{ parties.length }} partidos</p>
          </div>
        </div>

        <!-- Slot para contenido adicional en el panel de información -->
        <slot name="info-panel-extra"></slot>
      </div>
    </main>

    <!-- Footer (puede ser sobrescrito con slot) -->
    <footer v-if="showFooter" class="chamber-footer">
      <div class="footer-content">
        <slot name="footer">
          <div class="footer-info">
            <p class="footer-sub">Visualización de Hemiciclo del Senado</p>
          </div>
        </slot>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch, nextTick } from 'vue'

// Props para hacer el componente configurable
const props = defineProps({
  senators: {
    type: Array,
    required: false,
    default: () => [
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

    ]
  },
  parties: {
    type: Array,
    default: () => [
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
    ]
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  showControls: {
    type: Boolean,
    default: true
  },
  initialShowLabels: {
    type: Boolean,
    default: true
  },
  backgroundImage: {
    type: String,
    default: 'data:image/jpeg;base64,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'
  },
  viewBox: {
    type: String,
    default: '100 200 1000 350'
  }
})

// Emits para eventos
const emit = defineEmits([
  'senator-selected',
  'senator-deselected',
  'party-filter-changed',
  'view-reset'
])

// Estado reactivo
const selectedSenator = ref(null)
const hoveredSeat = ref(null)
const searchQuery = ref('')
const activeFilters = ref([])
const showLabels = ref(props.initialShowLabels)
const tooltipStyle = reactive({ left: '0px', top: '0px' })

// Referencia local a los datos
const senatorsData = ref([...props.senators])

// Watcher para cuando cambien los props de senators
watch(() => props.senators, (newSenators) => {
  senatorsData.value = [...newSenators]
  // Regenerar posiciones cuando cambien los datos
  generateCurvedPositions()
}, { deep: true })

// Posiciones de los asientos
const positions = reactive({
  upperCurveLeftSeats: [],
  upperCurveRightSeats: [],
  lowerCurveLeftSeats: [],
  lowerCurveRightSeats: []
})

// Función para dividir nombres en partes para mostrar en columna
const getNameParts = (fullName) => {
  const parts = fullName.split(' ')
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
  // Reiniciar arrays
  positions.upperCurveLeftSeats = []
  positions.upperCurveRightSeats = []
  positions.lowerCurveLeftSeats = []
  positions.lowerCurveRightSeats = []
  
  // CURVA SUPERIOR CON AJUSTES ESPECÍFICOS
  // Lado izquierdo Curva Superior - AJUSTES: 1 más arriba, 7 más abajo
  const upperLeftPositions = [
  { x: 400, y: 315 }, // -180°
  { x: 405, y: 349 }, // -166.6°
  { x: 421, y: 381 }, // -153.3°
  { x: 445, y: 409 }, // -140°
  { x: 477, y: 431 }, // -126.6°
  { x: 513, y: 447 }, // -113.3°
  { x: 553, y: 455 }  // -100°
];

const upperRightPositions = [
  { x: 647, y: 455 }, // -80°
  { x: 687, y: 447 }, // -66.6°
  { x: 723, y: 431 }, // -53.3°
  { x: 755, y: 409 }, // -40°
  { x: 779, y: 381 }, // -26.6°
  { x: 795, y: 349 }, // -13.3°
  { x: 800, y: 315 }  // 0°
];
  
  // CURVA INFERIOR CON AJUSTES ESPECÍFICOS
  // Lado izquierdo Curva Inferior - AJUSTES: 15 más arriba, 25 más abajo
  const lowerLeftPositions = [
    { x: 280, y: 250 }, // -180°
    { x: 283, y: 300 }, // -171°
    { x: 292, y: 349 }, // -162°
    { x: 307, y: 395 }, // -153°
    { x: 328, y: 438 }, // -144°
    { x: 355, y: 477 }, // -135°
    { x: 388, y: 511 }, // -126°
    { x: 425, y: 538 }, // -117°
    { x: 467, y: 559 }, // -108°
    { x: 512, y: 573 }, // -99°
    { x: 560, y: 580 }  // -90° (Justo debajo del centro superior)
  ];

const lowerRightPositions = [
  { x: 640, y: 580 }, // -90°
  { x: 688, y: 573 },
  { x: 733, y: 559 },
  { x: 775, y: 538 },
  { x: 812, y: 511 },
  { x: 845, y: 477 },
  { x: 872, y: 438 },
  { x: 893, y: 395 },
  { x: 908, y: 349 },
  { x: 917, y: 300 },
  { x: 920, y: 250 }  // 0°
];
  
  // Asignar posiciones Curva Superior Izquierda
  for (let i = 0; i < 7; i++) {
    let senator = senatorsData.value.find(s => s.seatNumber === i + 1)
    if (senator && upperLeftPositions[i]) {
      // Crear copia para no mutar el prop original
      const senatorCopy = { ...senator }
      senatorCopy.x = upperLeftPositions[i].x
      senatorCopy.y = upperLeftPositions[i].y
      positions.upperCurveLeftSeats.push(senatorCopy)
    }
  }
  
  // Asignar posiciones Curva Superior Derecha
  for (let i = 0; i < 7; i++) {
    let senator = senatorsData.value.find(s => s.seatNumber === i + 8)
    if (senator && upperRightPositions[i]) {
      const senatorCopy = { ...senator }
      senatorCopy.x = upperRightPositions[i].x
      senatorCopy.y = upperRightPositions[i].y
      positions.upperCurveRightSeats.push(senatorCopy)
    }
  }
  
  // Asignar posiciones Curva Inferior Izquierda
  for (let i = 0; i < 11; i++) {
    let senator = senatorsData.value.find(s => s.seatNumber === i + 15)
    if (senator && lowerLeftPositions[i]) {
      const senatorCopy = { ...senator }
      senatorCopy.x = lowerLeftPositions[i].x
      senatorCopy.y = lowerLeftPositions[i].y
      positions.lowerCurveLeftSeats.push(senatorCopy)
    }
  }
  
  // Asignar posiciones Curva Inferior Derecha
  for (let i = 0; i < 11; i++) {
    let senator = senatorsData.value.find(s => s.seatNumber === i + 26)
    if (senator && lowerRightPositions[i]) {
      const senatorCopy = { ...senator }
      senatorCopy.x = lowerRightPositions[i].x
      senatorCopy.y = lowerRightPositions[i].y
      positions.lowerCurveRightSeats.push(senatorCopy)
    }
  }
}

// Computed properties para datos filtrados
const filteredUpperCurveLeftSeats = computed(() => {
  if (activeFilters.value.length === 0) return positions.upperCurveLeftSeats
  return positions.upperCurveLeftSeats.filter(seat => activeFilters.value.includes(seat.party))
})

const filteredUpperCurveRightSeats = computed(() => {
  if (activeFilters.value.length === 0) return positions.upperCurveRightSeats
  return positions.upperCurveRightSeats.filter(seat => activeFilters.value.includes(seat.party))
})

const filteredLowerCurveLeftSeats = computed(() => {
  if (activeFilters.value.length === 0) return positions.lowerCurveLeftSeats
  return positions.lowerCurveLeftSeats.filter(seat => activeFilters.value.includes(seat.party))
})

const filteredLowerCurveRightSeats = computed(() => {
  if (activeFilters.value.length === 0) return positions.lowerCurveRightSeats
  return positions.lowerCurveRightSeats.filter(seat => activeFilters.value.includes(seat.party))
})

// Obtener conteo filtrado para la leyenda
const getFilteredCount = (partyId) => {
  if (activeFilters.value.length === 0) {
    return props.parties.find(p => p.id === partyId)?.count || senatorsData.value.filter(s => s.party === partyId).length
  }
  if (activeFilters.value.includes(partyId)) {
    return senatorsData.value.filter(senator => senator.party === partyId).length
  }
  return 0
}

// Métodos
const selectSenator = (senator) => {
  selectedSenator.value = senator
  hoveredSeat.value = null
  updateTooltipPosition(senator)
  emit('senator-selected', senator)
}

const deselectSenator = () => {
  selectedSenator.value = null
  emit('senator-deselected')
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
  emit('party-filter-changed', activeFilters.value)
}

const resetView = () => {
  selectedSenator.value = null
  activeFilters.value = []
  searchQuery.value = ''
  emit('view-reset')
}

const toggleLabels = () => {
  showLabels.value = !showLabels.value
}

const updateTooltipPosition = (seat) => {
  nextTick(() => {
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
  })
}

const handleMouseEnter = (seat, event) => {
  hoveredSeat.value = seat
  updateHoverTooltip(event)
}

const handleMouseLeave = () => {
  hoveredSeat.value = null
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

// Método para actualizar datos externamente
const updateSenators = (newSenators) => {
  senatorsData.value = [...newSenators]
  generateCurvedPositions()
}

// Exponer métodos al padre si es necesario
defineExpose({
  resetView,
  updateSenators,
  selectSenator,
  deselectSenator
})

// Inicialización
onMounted(() => {
  generateCurvedPositions()
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
  height: auto;
  margin-bottom: 0.5rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.default-header h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
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
  overflow: visible !important
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
  overflow: visible !important
}

.hemicycle-svg {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: visible !important;
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
  font-size: 9px;
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
  background: #E4D294;
  color: #333;
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