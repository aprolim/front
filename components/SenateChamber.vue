<template>
  <div class="senate-chamber">
    <!-- Header (puede ser sobrescrito con slot) -->
    <header v-if="showHeader" class="chamber-header text-center">
      <slot name="header">
        <div class="default-header">
          <h2>Hemiciclo del Senado</h2>
        </div>
      </slot>
    </header>

    <main class="main-content">
      <!-- Contenedor con imagen de fondo -->
      <div class="background-container" :style="{ backgroundImage: `url('${backgroundImage}')` }">
        <!-- Contenedor principal CON GRID DE 3 COLUMNAS REALES -->
        <div class="columns-container">
          <!-- COLUMNA IZQUIERDA: Panel de Controles -->
          <div v-if="showControls" class="column left-column">
            <div class="controls-panel transparent-panel">
              <!-- Leyenda -->
              <div class="controls-section">
                <h4 class="pill-red">Distribución</h4>
                <div class="legend-vertical">
                  <div 
                    v-for="party in parties"
                    :key="party.id"
                    class="legend-item-vertical"
                    @click="togglePartyFilter(party.id)"
                    :class="{ 'highlighted': activeFilters.includes(party.id) }"
                  >
                    <div class="grid grid-cols-3 items-center w-full">
                      <!-- Columna 1: Círculo de color con símbolo -->
                      <div class="flex justify-center">
                        <div class="legend-color-vertical" :style="{ backgroundColor: party.color }">
                          <span class="legend-symbol">{{ party.symbol }}</span>
                        </div>
                      </div>
                      
                      <!-- Columna 2: Nombre del partido -->
                      <div class="flex justify-center">
                        <span class="legend-name-vertical font-semibold text-gray-800 text-sm text-center">
                          {{ party.shortName }}
                        </span>
                      </div>
                      
                      <!-- Columna 3: Número -->
                      <div class="flex justify-center">
                        <span 
                          class="text-3xl font-bold"
                          :style="{ color: party.color }"
                        >
                          {{ getFilteredCount(party.id) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- COLUMNA CENTRAL: Hemiciclo SVG - MÁS ANCHA -->
          <div class="column center-column">
            <div class="hemicycle-container center-transparent-panel">
              <!-- Hemiciclo Principal -->
              <div class="hemicycle-svg-container" @mousemove="onMouseMove">
                <svg 
                  ref="svgElement"
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
                    <pattern id="hemicyclePattern" patternUnits="userSpaceOnUse" width="1000" height="1000">
                      <image 
                        :href="backgroundImage"
                        x="0" 
                        y="0" 
                        width="1000" 
                        height="1000"
                        opacity="0.35"
                        preserveAspectRatio="xMidYMid slice"
                      />
                    </pattern>
                  </defs>

                  <!-- TODOS LOS ASIENTOS EN UN SOLO LOOP OPTIMIZADO -->
                  <g>
                    <g v-for="seat in allSeats" :key="seat.id">
                      <!-- Círculo -->
                       <!-- :stroke="getSeatStroke(seat)" -->
                      <circle
                        :cx="seat.x"
                        :cy="seat.y"
                        r="20" 
                        :fill="getSeatColor(seat)"
                        :stroke-width="selectedSenator?.id === seat.id ? '2' : '1.5'"
                        :class="['senator-circle', 
                          { 
                            'selected': selectedSenator?.id === seat.id,
                            'hovered': hoveredSeat?.id === seat.id
                          }]"
                        @click="selectSenator(seat)"
                        @mouseenter="handleMouseEnter(seat)"
                        @mouseleave="handleMouseLeave()"
                        filter="url(#circleShadow)"
                      />
                      
                      <!-- Número -->
                      <text v-if="showLabels"
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
                          :key="`${seat.id}-name-${idx}`"
                          :x="seat.x + (seat.side === 'left' ? -30 - (idx * 9) : 30 + (idx * 9))"
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
                  </g>
                </svg>

                <!-- Tooltip -->
                <div 
                  v-if="hoveredSeat && hoveredSeat.id !== selectedSenator?.id" 
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
          </div>

          <!-- COLUMNA DERECHA: Información del Senador -->
          <div class="column right-column">
            <div class="info-panel transparent-panel">
              <div v-if="selectedSenator" class="senator-details">
                <!-- Foto del senador en círculo al centro -->
                <div class="senator-photo-container">
                  <div class="senator-photo-circle">
                    <div class="photo-placeholder" :style="{ backgroundColor: selectedSenator.partyColor }">
                      {{ formatInitials(selectedSenator.name) }}
                    </div>
                  </div>
                </div>

                <!-- Nombre en color plomo -->
                <div class="senator-name">
                  {{ selectedSenator.name }}
                </div>

                <!-- Primera fila: Edad y Departamento -->
                <div class="info-row-first">
                  <div class="info-item-red">
                    <span class="value-red text-center">Edad: {{ selectedSenator.age }} años</span>
                  </div>
                  <div class="info-item-red">
                    <span class="value-red text-center">{{ selectedSenator.department }}</span>
                  </div>
                </div>

                <!-- Segunda fila: Partido y Asiento -->
                <div class="info-row-second">
                  <div class="pill-red font-extrabold">
                    {{ selectedSenator.partyShort }}
                  </div>
                  <div class="pill-red font-extrabold">
                    Asiento {{ selectedSenator.seatNumber }}
                  </div>
                </div>

                <!-- Información de contacto en píldoras blancas -->
                <div class="contact-section">
                  <div class="contact-item-white">
                    <div class="pill-white">
                      Email: {{ selectedSenator.email || 'No disponible' }}
                    </div>
                  </div>
                  <div class="contact-item-white">
                    <div class="pill-white">
                      Teléfono: {{ selectedSenator.phone || 'No disponible' }}
                    </div>
                  </div>
                  <div class="contact-item-white">
                    <div class="pill-white">
                      Oficina: {{ selectedSenator.office || 'No disponible' }}
                    </div>
                  </div>
                </div>

                <!-- Redes sociales -->
                <div class="social-media-section">
                  <div class="social-icons">
                    <div class="social-icon">🐦</div>
                    <div class="social-icon">📷</div>
                    <!-- <div class="social-icon">💼</div> -->
                    <!-- <div class="social-icon">📘</div> -->
                    <div class="social-icon">▶️</div>
                    <div class="social-icon">💼</div>
                  </div>
                </div>
              </div>

              <div v-else class="empty-state">
                <div class="empty-icon">👆</div>
                <h4 class="font-bold">Selecciona un Senador</h4>
                <p class="font-bold">Haz click en cualquier círculo del hemiciclo para ver información detallada</p>
                <div class="empty-tips">
                  <p><strong>Curva Superior:</strong> 14 senadores</p>
                  <p><strong>Curva Inferior:</strong> 22 senadores</p>
                  <p><strong>Total:</strong> {{ senators.length }} senadores de {{ parties.length }} partidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      { id: 1, name: "María Eugenia Choque Quispe", seatNumber: 1, curve: 'upper', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "La Paz", age: 52, profession: "Socióloga", period: "2020-2025", commissions: ["Constitución", "Derechos Humanos"], email: "mchoque@senado.bo", phone: "(591-2) 220-0001", office: "Edificio A, Oficina 101" },
      { id: 2, name: "Juan Carlos García López", seatNumber: 2, curve: 'upper', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Santa Cruz", age: 48, profession: "Abogado", period: "2020-2025" },
      { id: 3, name: "Ana María Rojas Flores", seatNumber: 3, curve: 'upper', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Cochabamba", age: 45, profession: "Educadora", period: "2020-2025" },
      { id: 4, name: "Luisa Mamani Condori", seatNumber: 4, curve: 'upper', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Oruro", age: 55, profession: "Médica", period: "2020-2025" },
      { id: 5, name: "Carlos Fernández Vargas", seatNumber: 5, curve: 'upper', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Potosí", age: 50, profession: "Ingeniero", period: "2020-2025" },
      { id: 6, name: "Patricia Flores Salazar", seatNumber: 6, curve: 'upper', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Tarija", age: 47, profession: "Economista", period: "2020-2025" },
      { id: 7, name: "Miguel Ángel López Rodríguez", seatNumber: 7, curve: 'upper', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Chuquisaca", age: 53, profession: "Abogado", period: "2020-2025" },
      
      // Lado derecho Curva Superior: 7 senadores (8-14)
      { id: 8, name: "Carlos Alberto Mesa Gisbert", seatNumber: 8, curve: 'upper', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "La Paz", age: 48, profession: "Abogado", period: "2020-2025" },
      { id: 9, name: "Roberto Fernández Ríos", seatNumber: 9, curve: 'upper', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Tarija", age: 55, profession: "Ingeniero Civil", period: "2020-2025" },
      { id: 10, name: "José Luis Paredes Muñoz", seatNumber: 10, curve: 'upper', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Chuquisaca", age: 56, profession: "Economista", period: "2020-2025" },
      { id: 11, name: "Ricardo Morales Salinas", seatNumber: 11, curve: 'upper', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Cochabamba", age: 49, profession: "Ingeniero", period: "2020-2025" },
      { id: 12, name: "Fernando Vargas Moscoso", seatNumber: 12, curve: 'upper', side: 'right', party: "Creemos", partyShort: "CRE", partyColor: "#f97316", department: "Santa Cruz", age: 45, profession: "Empresario", period: "2020-2025" },
      { id: 13, name: "Marta Quispe Torrez", seatNumber: 13, curve: 'upper', side: 'right', party: "Creemos", partyShort: "CRE", partyColor: "#f97316", department: "La Paz", age: 38, profession: "Médica", period: "2020-2025" },
      { id: 14, name: "Felipe Mendoza Suárez", seatNumber: 14, curve: 'upper', side: 'right', party: "Creemos", partyShort: "CRE", partyColor: "#f97316", department: "Santa Cruz", age: 42, profession: "Ingeniero", period: "2020-2025" },

      // CURVA INFERIOR: 22 senadores (15-36)
      // Lado izquierdo Curva Inferior: 11 senadores (15-25)
      { id: 15, name: "Susana Méndez Alarcón", seatNumber: 15, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Beni", age: 44, profession: "Administradora", period: "2020-2025" },
      { id: 16, name: "Alberto Gutiérrez Paz", seatNumber: 16, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Pando", age: 56, profession: "Ingeniero", period: "2020-2025" },
      { id: 17, name: "Carmen Rosa Sánchez Lima", seatNumber: 17, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "La Paz", age: 49, profession: "Periodista", period: "2020-2025" },
      { id: 18, name: "Jorge Luis Pérez Mendoza", seatNumber: 18, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Santa Cruz", age: 51, profession: "Empresario", period: "2020-2025" },
      { id: 19, name: "Gabriela Torres Guzmán", seatNumber: 19, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Cochabamba", age: 46, profession: "Abogada", period: "2020-2025" },
      { id: 20, name: "Raúl Castro Valdivia", seatNumber: 20, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Oruro", age: 54, profession: "Sociólogo", period: "2020-2025" },
      { id: 21, name: "Elizabeth Ríos Herrera", seatNumber: 21, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Potosí", age: 43, profession: "Educadora", period: "2020-2025" },
      { id: 22, name: "Mario Vargas Camacho", seatNumber: 22, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Tarija", age: 52, profession: "Médico", period: "2020-2025" },
      { id: 23, name: "Silvia Fernández Rocha", seatNumber: 23, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Chuquisaca", age: 48, profession: "Abogada", period: "2020-2025" },
      { id: 24, name: "Pedro Castillo Mercado", seatNumber: 24, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Beni", age: 55, profession: "Ingeniero", period: "2020-2025" },
      { id: 25, name: "Claudia Paz Zamora", seatNumber: 25, curve: 'lower', side: 'left', party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626", department: "Pando", age: 44, profession: "Economista", period: "2020-2025" },
      
      // Lado derecho Curva Inferior: 11 senadores (26-36)
      { id: 26, name: "Victoria Choque Mamani", seatNumber: 26, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "La Paz", age: 45, profession: "Abogada", period: "2020-2025" },
      { id: 27, name: "Walter Álvarez Salvatierra", seatNumber: 27, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Santa Cruz", age: 52, profession: "Empresario", period: "2020-2025" },
      { id: 28, name: "Natalia Gutiérrez Ríos", seatNumber: 28, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Beni", age: 46, profession: "Médica", period: "2020-2025" },
      { id: 29, name: "Óscar Paredes Flores", seatNumber: 29, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Oruro", age: 54, profession: "Abogado", period: "2020-2025" },
      { id: 30, name: "Rosa María López Vargas", seatNumber: 30, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Potosí", age: 50, profession: "Educadora", period: "2020-2025" },
      { id: 31, name: "Héctor Vásquez Mercado", seatNumber: 31, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Pando", age: 53, profession: "Ingeniero", period: "2020-2025" },
      { id: 32, name: "Karen Salazar Pérez", seatNumber: 32, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Tarija", age: 44, profession: "Periodista", period: "2020-2025" },
      { id: 33, name: "Andrés Romero Torres", seatNumber: 33, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "La Paz", age: 50, profession: "Abogado", period: "2020-2025" },
      { id: 34, name: "Daniela Mendoza Suárez", seatNumber: 34, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Santa Cruz", age: 47, profession: "Administradora", period: "2020-2025" },
      { id: 35, name: "Luis Fernando Arce Catacora", seatNumber: 35, curve: 'lower', side: 'right', party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb", department: "Cochabamba", age: 53, profession: "Economista", period: "2020-2025" },
      { id: 36, name: "Carolina Herrera Gómez", seatNumber: 36, curve: 'lower', side: 'right', party: "Creemos", partyShort: "CRE", partyColor: "#f97316", department: "Cochabamba", age: 47, profession: "Abogada", period: "2020-2025" }
    ]
  },
  parties: {
    type: Array,
    default: () => [
      { id: 'MAS-IPSP', name: 'Movimiento al Socialismo', shortName: 'MAS', symbol: '🔴', color: '#dc2626', count: 18, position: 'Izquierda del pasillo' },
      { id: 'Comunidad Ciudadana', name: 'Comunidad Ciudadana', shortName: 'CC', symbol: '🔵', color: '#2563eb', count: 14, position: 'Derecha del pasillo' },
      { id: 'Creemos', name: 'Creemos', shortName: 'CREEMOS', symbol: '🟠', color: '#f97316', count: 4, position: 'Derecha del pasillo' }
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
    default: false
  },
  backgroundImage: {
    type: String,
    default: './Recurso 1.png'
  },
  viewBox: {
    type: String,
    default: '250 200 700 400'
  }
})

// Emits para eventos
const emit = defineEmits([
  'senator-selected',
  'senator-deselected',
  'party-filter-changed',
  'view-reset'
])

// Estado reactivo optimizado
const selectedSenator = ref(null)
const hoveredSeat = ref(null)
const activeFilters = ref([])
const showLabels = ref(props.initialShowLabels)
const tooltipStyle = reactive({ left: '0px', top: '0px' })
const svgElement = ref(null)

// Cache para cálculos
const partyCountCache = reactive({})
const textColorCache = reactive({})

// Posiciones predefinidas
const seatPositions = {
  upperLeft: [
    { x: 400, y: 315 }, { x: 405, y: 349 }, { x: 421, y: 381 },
    { x: 445, y: 409 }, { x: 477, y: 431 }, { x: 513, y: 447 },
    { x: 553, y: 455 }
  ],
  upperRight: [
    { x: 647, y: 455 }, { x: 687, y: 447 }, { x: 723, y: 431 },
    { x: 755, y: 409 }, { x: 779, y: 381 }, { x: 795, y: 349 },
    { x: 800, y: 315 }
  ],
  lowerLeft: [
    { x: 280, y: 250 }, { x: 283, y: 300 }, { x: 292, y: 349 },
    { x: 307, y: 395 }, { x: 328, y: 438 }, { x: 355, y: 477 },
    { x: 388, y: 511 }, { x: 425, y: 538 }, { x: 467, y: 559 },
    { x: 512, y: 573 }, { x: 560, y: 580 }
  ],
  lowerRight: [
    { x: 640, y: 580 }, { x: 688, y: 573 }, { x: 733, y: 559 },
    { x: 775, y: 538 }, { x: 812, y: 511 }, { x: 845, y: 477 },
    { x: 872, y: 438 }, { x: 893, y: 395 }, { x: 908, y: 349 },
    { x: 917, y: 300 }, { x: 920, y: 250 }
  ]
}

// Computed properties optimizadas
const allSeats = computed(() => {
  const seats = []
  
  // Asignar posiciones eficientemente
  props.senators.forEach(senator => {
    let position = null
    let positionsArray
    
    if (senator.curve === 'upper' && senator.side === 'left') {
      positionsArray = seatPositions.upperLeft
      const idx = senator.seatNumber - 1
      position = positionsArray[idx]
    } else if (senator.curve === 'upper' && senator.side === 'right') {
      positionsArray = seatPositions.upperRight
      const idx = senator.seatNumber - 8
      position = positionsArray[idx]
    } else if (senator.curve === 'lower' && senator.side === 'left') {
      positionsArray = seatPositions.lowerLeft
      const idx = senator.seatNumber - 15
      position = positionsArray[idx]
    } else if (senator.curve === 'lower' && senator.side === 'right') {
      positionsArray = seatPositions.lowerRight
      const idx = senator.seatNumber - 26
      position = positionsArray[idx]
    }
    
    if (position) {
      seats.push({
        ...senator,
        x: position.x,
        y: position.y
      })
    }
  })
  
  // Filtrar si hay filtros activos
  if (activeFilters.value.length === 0) return seats
  
  const filterSet = new Set(activeFilters.value)
  return seats.filter(seat => filterSet.has(seat.party))
})

// Funciones optimizadas
const getFilteredCount = (partyId) => {
  if (activeFilters.value.length === 0) {
    // Usar cache
    if (!partyCountCache[partyId]) {
      partyCountCache[partyId] = props.parties.find(p => p.id === partyId)?.count || 
        props.senators.filter(s => s.party === partyId).length
    }
    return partyCountCache[partyId]
  }
  
  if (activeFilters.value.includes(partyId)) {
    return props.senators.filter(senator => senator.party === partyId).length
  }
  return 0
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
  // Cache de colores de texto
  if (!textColorCache[backgroundColor]) {
    const hex = backgroundColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    textColorCache[backgroundColor] = luminance > 0.5 ? '#000000' : '#ffffff'
  }
  return textColorCache[backgroundColor]
}

const getNameParts = (fullName) => {
  return fullName.split(' ')
}

const formatInitials = (fullName) => {
  const parts = fullName.split(' ')
  if (parts.length >= 3) {
    return `${parts[0].charAt(0)}${parts[parts.length-2].charAt(0)}${parts[parts.length-1].charAt(0)}`.toUpperCase()
  } else if (parts.length === 2) {
    return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase()
  }
  return fullName.substring(0, 2).toUpperCase()
}

// Métodos optimizados
const selectSenator = (senator) => {
  selectedSenator.value = senator
  emit('senator-selected', senator)
}

const togglePartyFilter = (partyId) => {
  const index = activeFilters.value.indexOf(partyId)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value = [partyId]
  }
  
  // Limpiar cache cuando cambian filtros
  Object.keys(partyCountCache).forEach(key => delete partyCountCache[key])
  emit('party-filter-changed', activeFilters.value)
}

const resetView = () => {
  selectedSenator.value = null
  activeFilters.value = []
  hoveredSeat.value = null
  // Limpiar caches
  Object.keys(partyCountCache).forEach(key => delete partyCountCache[key])
  Object.keys(textColorCache).forEach(key => delete textColorCache[key])
  emit('view-reset')
}

const toggleLabels = () => {
  showLabels.value = !showLabels.value
}

// Hover optimizado con throttling
let hoverTimeout = null
let mouseMoveTimeout = null

const handleMouseEnter = (seat) => {
  if (selectedSenator.value?.id !== seat.id) {
    hoveredSeat.value = seat
    positionTooltipFromSeat()
  }
}

const handleMouseLeave = () => {
  if (hoveredSeat.value?.id !== selectedSenator?.id) {
    hoveredSeat.value = null
  }
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }
}

const onMouseMove = (event) => {
  // Throttle el movimiento del mouse para mejor rendimiento
  if (!mouseMoveTimeout) {
    mouseMoveTimeout = setTimeout(() => {
      if (hoveredSeat.value && hoveredSeat.value.id !== selectedSenator?.id) {
        updateHoverTooltip(event)
      }
      mouseMoveTimeout = null
    }, 16) // ~60fps
  }
}

const updateHoverTooltip = (event) => {
  if (!hoveredSeat.value || !svgElement.value) return
  
  requestAnimationFrame(() => {
    const container = document.querySelector('.hemicycle-svg-container')
    if (!container) return
    
    const seat = hoveredSeat.value
    const svg = svgElement.value
    const rect = container.getBoundingClientRect()
    
    // Calcular posición basada en coordenadas SVG
    const viewBox = svg.viewBox.baseVal
    const svgRect = svg.getBoundingClientRect()
    
    // Calcular posición porcentual dentro del viewBox
    const xPercent = (seat.x - viewBox.x) / viewBox.width
    const yPercent = (seat.y - viewBox.y) / viewBox.height
    
    // Convertir a coordenadas del contenedor
    let x = xPercent * svgRect.width + (svgRect.left - rect.left) + 25
    let y = yPercent * svgRect.height + (svgRect.top - rect.top) - 100
    
    // Asegurar que el tooltip no salga del contenedor
    const tooltipWidth = 260
    const tooltipHeight = 180
    
    if (x + tooltipWidth > rect.width) {
      x = rect.width - tooltipWidth - 10
    }
    if (y + tooltipHeight > rect.height) {
      y = rect.height - tooltipHeight - 10
    }
    if (x < 10) x = 10
    if (y < 10) y = 10
    
    tooltipStyle.left = `${x}px`
    tooltipStyle.top = `${y}px`
  })
}

const positionTooltipFromSeat = () => {
  updateHoverTooltip()
}

// Método para actualizar datos externamente
const updateSenators = (newSenators) => {
  // En una implementación real, aquí actualizarías los props
  console.log('Actualizar senadores:', newSenators)
}

// Exponer métodos al padre
defineExpose({
  resetView,
  updateSenators,
  selectSenator,
  deselectSenator: () => selectedSenator.value = null
})

// Inicialización
onMounted(() => {
  // Inicialización adicional si es necesaria
})

// Limpiar timeouts al desmontar
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (hoverTimeout) clearTimeout(hoverTimeout)
  if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout)
})

// Watcher optimizado
watch(() => props.senators, () => {
  // Limpiar cache cuando cambian los datos
  Object.keys(partyCountCache).forEach(key => delete partyCountCache[key])
}, { deep: false })
</script>

<style scoped>
.senate-chamber {
  font-family: 'Montserrat';
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  /* font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; */
  padding: 0.5rem;
}

/* Header */
.chamber-header {
  height: auto;
  /* margin-bottom: 0.5rem; */
  padding: 1rem;
  background: #575756;
  /* border-radius: 8px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.default-header h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.5rem;
}

/* Contenedor con imagen de fondo */
.background-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* border-radius: 12px; */
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
}

/* CONTENEDOR PRINCIPAL CON 3 COLUMNAS REALES */
.columns-container {
  display: grid;
  /* Izquierda fija, Central flexible, Derecha fija - CENTRAL MÁS ANCHA */
  grid-template-columns: 250px 1fr 250px;
  gap: 1.5rem;
  padding: 1.5rem;
  position: relative;
  z-index: 1;
  min-height: 70vh;
  align-items: stretch;
}

/* CLASES DE COLUMNAS */
.column {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.left-column {
  /* Columna izquierda fija */
  width: 250px;
  flex-shrink: 0;
}

.center-column {
  /* Columna central flexible - OCUPA EL ESPACIO RESTANTE */
  flex: 1;
  min-width: 0; /* Importante para que funcione correctamente */
}

.right-column {
  /* Columna derecha fija */
  width: 250px;
  flex-shrink: 0;
}

/* Paneles transparentes */
.transparent-panel {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* COLUMNA CENTRAL - MÁS ANCHA Y TRANSPARENTE */
.center-transparent-panel {
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: 100%;
  width: 100%;
}

/* Columna Izquierda - Controles */
.controls-panel {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  width: 100%;
}

.controls-section h4 {
  margin: 0 0 1rem 0;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.75rem;
  border-radius: .6rem;
  background-color: rgba(224, 54, 54, 0.85);
  text-align: center;
}

/* Leyenda en vertical */
.legend-vertical {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: .6rem;
  padding: .75rem;
  width: 100%;
}

.legend-item-vertical {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}

.legend-item-vertical:hover {
  border-color: #d1d5db;
  background: #f3f4f6;
  transform: translateX(2px);
}

.legend-item-vertical.highlighted {
  border-color: #1f2937;
  background: #f3f4f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.legend-color-vertical {
  width: 40px;
  height: 40px;
  border-radius: 1.2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.legend-symbol {
  font-size: 1.7rem;
  color: white;
  text-shadow: 
    -2px -2px 0 white,
     2px -2px 0 white,
    -2px  2px 0 white,
     2px  2px 0 white,
     0px  0px 0 black,
     0px  0px 2px rgba(0,0,0,0.5);
}

/* Columna Central - Hemiciclo MÁS ANCHO */
.hemicycle-container {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible !important;
  width: 100%;
  height: 100%;
  min-height: 500px;
}

.hemicycle-svg-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 450px;
  max-height: 550px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible !important;
}

.hemicycle-svg {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: visible !important;
}

/* Columna Derecha - Información */
.info-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.senator-details {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

/* Foto del senador */
.senator-photo-container {
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.senator-photo-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  background-size: cover;
  background-position: center;
}

/* Nombre */
.senator-name {
  color: #575756;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;
  width: 100%;
  text-align: center;
}

/* Primera fila: Edad y Departamento */
.info-row-first {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}

.info-item-red {
  text-align: left;
  width: 100%;
}

.value-red {
  display: block;
  color: #E03636;
  font-size: .8rem;
  font-weight: 700;
  text-align: center;
}

/* Segunda fila: Partido y Asiento */
.info-row-second {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1rem;
}

.pill-red {
  background-color: rgba(224, 54, 54, 0.85);
  color: white;
  padding: 0.2rem 0.25rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

/* Información de contacto */
.contact-section {
  width: 100%;
  margin-bottom: 1.5rem;
}

.contact-item-white {
  text-align: left;
  margin-bottom: 0.75rem;
  width: 100%;
}

.pill-white {
  background-color: white;
  color: #575756;
  padding: 0.15rem 0.75rem;
  border-radius: 7px;
  font-size: 0.8rem;
  border: 1px solid #e5e7eb;
  font-weight: 500;
  width: 100%;
  text-align: left;
}

/* Redes sociales */
.social-media-section {
  width: 100%;
  margin-top: auto;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}

.social-icon {
  font-size: 1.5rem;
  color: #E03636;
  cursor: pointer;
  transition: all 0.2s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.social-icon:hover {
  transform: scale(1.1);
  background: #f9fafb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Círculos de senadores - OPTIMIZADOS */
.senator-circle {
  cursor: pointer;
  transition: r 0.2s ease, stroke-width 0.2s ease;
  pointer-events: all !important;
}

/* HOVER: Solo un pequeño aumento */
.senator-circle:hover {
  r: 21 !important;
  stroke-width: 2px;
}

/* SELECTED: Sin transform, solo borde animado */
.senator-circle.selected {
  stroke: #f59e0b;
  stroke-width: 2px;
  animation: pulse 2s infinite;
  r: 20 !important;
}

@keyframes pulse {
  0% { stroke-width: 2px; }
  50% { stroke-width: 3px; }
  100% { stroke-width: 2px; }
}

/* Números de asiento y nombres - SIN EVENTOS */
.seat-number, .senator-name-part {
  pointer-events: none !important;
  user-select: none;
}

/* Tooltip */
.seat-tooltip {
  position: absolute;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(59, 130, 246, 0.5);
  z-index: 100;
  min-width: 260px;
  pointer-events: none;
  animation: fadeIn 0.15s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
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
  flex-shrink: 0;
}

.senator-info h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.1rem;
  flex: 1;
}

.party-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  background: #f3f4f6;
  color: #4b5563;
  flex-shrink: 0;
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
  width: 100%;
}

.label { color: #6b7280; }
.value { font-weight: 600; color: #1f2937; }

.hint {
  font-size: 0.85rem;
  color: #3b82f6;
  font-style: italic;
  margin-top: 0.5rem;
  text-align: center;
  width: 100%;
}

/* Estado vacío */
.empty-state {
  padding: 2rem 1.5rem;
  text-align: center;
  color: #6b7280;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(3px);
  border-radius: 12px;
  width: 100%;
  height: 100%;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  width: 100%;
}

.empty-state h4 {
  margin: 0 0 0.5rem 0;
  color: #4b5563;
  font-size: 1.1rem;
  width: 100%;
}

.empty-state p {
  margin: 0 0 1rem 0;
  max-width: 400px;
  font-size: 0.9rem;
  width: 100%;
}

.empty-tips {
  text-align: left;
  max-width: 400px;
  background: #f9fafb;
  padding: 0.75rem;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
  width: 100%;
}

.empty-tips p {
  margin: 0.4rem 0;
  font-size: 0.85rem;
  width: 100%;
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .columns-container {
    grid-template-columns: 220px 1fr 320px;
    gap: 1rem;
    padding: 1rem;
  }
  
  .left-column {
    width: 220px;
  }
  
  .right-column {
    width: 320px;
  }
}

@media (max-width: 1024px) {
  .columns-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
  }
  
  .left-column,
  .center-column,
  .right-column {
    width: 100%;
  }
  
  .left-column {
    max-height: 300px;
  }
  
  .hemicycle-container {
    min-height: 400px;
  }
  
  .right-column {
    max-height: 500px;
  }
}

@media (max-width: 768px) {
  .columns-container {
    gap: 0.75rem;
    padding: 0.75rem;
  }
  
  .hemicycle-container {
    min-height: 350px;
  }
  
  .senator-photo-circle {
    width: 120px;
    height: 120px;
  }
  
  .photo-placeholder {
    font-size: 2rem;
  }
  
  .senator-name {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .columns-container {
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  .hemicycle-container {
    min-height: 300px;
  }
  
  .controls-panel {
    padding: 0.75rem;
  }
  
  .senator-photo-circle {
    width: 100px;
    height: 100px;
  }
  
  .photo-placeholder {
    font-size: 1.8rem;
  }
  
  .senator-name {
    font-size: 1.1rem;
  }
  
  .info-row-first,
  .info-row-second {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .social-icons {
    gap: 0.75rem;
  }
  
  .social-icon {
    font-size: 1.3rem;
    width: 35px;
    height: 35px;
  }
}

/* Footer */
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
</style>