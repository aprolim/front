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
      <!-- Contenedor con imagen de fondo -->
      <div class="background-container" :style="{ backgroundImage: `url('${backgroundImage}')` }">
        <!-- Contenedor principal con tres columnas TRANSPARENTES -->
        <div class="three-column-layout transparent-bg">
          <!-- COLUMNA IZQUIERDA: Panel de Controles -->
          <div v-if="showControls" class="left-panel controls-panel transparent-panel">
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
            <!-- Controles de vista -->
            <div class="controls-section">
              <h4 class="pill-red">Controles</h4>
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
          </div>

          <!-- COLUMNA CENTRAL: Hemiciclo SVG - MUY TRANSPARENTE -->
          <div class="center-panel hemicycle-container center-transparent-panel">
            <!-- Hemiciclo Principal - Tamaño ajustado -->
            <div class="hemicycle-svg-container" @mousemove="debouncedUpdateHoverTooltip">
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
                  <pattern id="hemicyclePattern" patternUnits="userSpaceOnUse" width="1000" height="1000">
                    <!-- Imagen de fondo de un hemiciclo/parlamento -->
                    <image 
                      :href="backgroundImage"
                      x="0" 
                      y="0" 
                      width="1000" 
                      height=""
                      opacity="0.35"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                </defs>

                <!-- Fondo del hemiciclo con imagen -->
                <rect x="100" y="200" width="1000" height="350" fill="url(#hemicyclePattern)" rx="10" ry="10"/>

                <!-- CURVA SUPERIOR AJUSTADA -->
                <!-- Lado Izquierdo Curva Superior (7 círculos) -->
                <g v-for="(seat, index) in filteredUpperCurveLeftSeats" :key="seat.id">
                  <!-- Círculo PRIMERO (más atrás) -->
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
                  
                  <!-- Número DESPUÉS (encima del círculo) -->
                  <text
                    :x="seat.x"
                    :y="seat.y"
                    text-anchor="middle"
                    :fill="getTextColor(seat.partyColor)"
                    font-size="12" 
                    font-weight="bold"
                    class="seat-number"
                    style="pointer-events: none;"
                  >
                    {{ seat.seatNumber }}
                  </text>
                  
                  <!-- Nombre en columna - también sin eventos -->
                  <g v-if="showLabels" style="pointer-events: none;">
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
                  <!-- Círculo PRIMERO -->
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
                  
                  <!-- Número DESPUÉS -->
                  <text
                    :x="seat.x"
                    :y="seat.y"
                    text-anchor="middle"
                    :fill="getTextColor(seat.partyColor)"
                    font-size="12"
                    font-weight="bold"
                    class="seat-number"
                    style="pointer-events: none;"
                  >
                    {{ seat.seatNumber }}
                  </text>
                  
                  <!-- Nombre en columna -->
                  <g v-if="showLabels" style="pointer-events: none;">
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
                  <!-- Círculo PRIMERO -->
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
                  
                  <!-- Número DESPUÉS -->
                  <text
                    :x="seat.x"
                    :y="seat.y"
                    text-anchor="middle"
                    :fill="getTextColor(seat.partyColor)"
                    font-size="12"
                    font-weight="bold"
                    class="seat-number"
                    style="pointer-events: none;"
                  >
                    {{ seat.seatNumber }}
                  </text>
                  
                  <!-- Nombre en columna -->
                  <g v-if="showLabels" style="pointer-events: none;">
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
                  <!-- Círculo PRIMERO -->
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
                  
                  <!-- Número DESPUÉS -->
                  <text
                    :x="seat.x"
                    :y="seat.y"
                    text-anchor="middle"
                    :fill="getTextColor(seat.partyColor)"
                    font-size="12"
                    font-weight="bold"
                    class="seat-number"
                    style="pointer-events: none;"
                  >
                    {{ seat.seatNumber }}
                  </text>
                  
                  <!-- Nombre en columna -->
                  <g v-if="showLabels" style="pointer-events: none;">
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

          <!-- COLUMNA DERECHA: Información del Senador -->
          <div class="right-panel info-panel transparent-panel">
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
                  <span class="value-red">{{ selectedSenator.department }}</span>
                </div>
              </div>

              <!-- Segunda fila: Partido y Asiento -->
              <div class="info-row-second">
                <div class="pill-red">
                  <b>
                    {{ selectedSenator.partyShort }}
                  </b>
                </div>
                <div class="pill-red">
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
                  <div class="social-icon">📘</div>
                  <div class="social-icon">🐦</div>
                  <div class="social-icon">📷</div>
                  <div class="social-icon">▶️</div>
                  <div class="social-icon">💼</div>
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
                <p><strong>Total:</strong> {{ senators.length }} senadores de {{ parties.length }} partidos</p>
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
      // Lado izquierdo Curva Superior: 7 senadores (1-7)
      { 
        id: 1, 
        name: "María Eugenia Choque Quispe", 
        seatNumber: 1, 
        curve: 'upper', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "La Paz", 
        age: 52,
        profession: "Socióloga", 
        period: "2020-2025",
        commissions: ["Constitución", "Derechos Humanos"],
        email: "mchoque@senado.bo", 
        phone: "(591-2) 220-0001",
        office: "Edificio A, Oficina 101"
      },
      { 
        id: 2, 
        name: "Juan Carlos García López", 
        seatNumber: 2, 
        curve: 'upper', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Santa Cruz", 
        age: 48,
        profession: "Abogado", 
        period: "2020-2025"
      },
      { 
        id: 3, 
        name: "Ana María Rojas Flores", 
        seatNumber: 3, 
        curve: 'upper', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Cochabamba", 
        age: 45,
        profession: "Educadora", 
        period: "2020-2025"
      },
      { 
        id: 4, 
        name: "Luisa Mamani Condori", 
        seatNumber: 4, 
        curve: 'upper', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Oruro", 
        age: 55,
        profession: "Médica", 
        period: "2020-2025"
      },
      { 
        id: 5, 
        name: "Carlos Fernández Vargas", 
        seatNumber: 5, 
        curve: 'upper', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Potosí", 
        age: 50,
        profession: "Ingeniero", 
        period: "2020-2025"
      },
      { 
        id: 6, 
        name: "Patricia Flores Salazar", 
        seatNumber: 6, 
        curve: 'upper', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Tarija", 
        age: 47,
        profession: "Economista", 
        period: "2020-2025"
      },
      { 
        id: 7, 
        name: "Miguel Ángel López Rodríguez", 
        seatNumber: 7, 
        curve: 'upper', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Chuquisaca", 
        age: 53,
        profession: "Abogado", 
        period: "2020-2025"
      },
      
      // Lado derecho Curva Superior: 7 senadores (8-14)
      { 
        id: 8, 
        name: "Carlos Alberto Mesa Gisbert", 
        seatNumber: 8, 
        curve: 'upper', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "La Paz", 
        age: 48,
        profession: "Abogado", 
        period: "2020-2025"
      },
      { 
        id: 9, 
        name: "Roberto Fernández Ríos", 
        seatNumber: 9, 
        curve: 'upper', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Tarija", 
        age: 55,
        profession: "Ingeniero Civil", 
        period: "2020-2025"
      },
      { 
        id: 10, 
        name: "José Luis Paredes Muñoz", 
        seatNumber: 10, 
        curve: 'upper', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Chuquisaca", 
        age: 56,
        profession: "Economista", 
        period: "2020-2025"
      },
      { 
        id: 11, 
        name: "Ricardo Morales Salinas", 
        seatNumber: 11, 
        curve: 'upper', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Cochabamba", 
        age: 49,
        profession: "Ingeniero", 
        period: "2020-2025"
      },
      { 
        id: 12, 
        name: "Fernando Vargas Moscoso", 
        seatNumber: 12, 
        curve: 'upper', 
        side: 'right',
        party: "Creemos", 
        partyShort: "CRE", 
        partyColor: "#f97316",
        department: "Santa Cruz", 
        age: 45,
        profession: "Empresario", 
        period: "2020-2025"
      },
      { 
        id: 13, 
        name: "Marta Quispe Torrez", 
        seatNumber: 13, 
        curve: 'upper', 
        side: 'right',
        party: "Creemos", 
        partyShort: "CRE", 
        partyColor: "#f97316",
        department: "La Paz", 
        age: 38,
        profession: "Médica", 
        period: "2020-2025"
      },
      { 
        id: 14, 
        name: "Felipe Mendoza Suárez", 
        seatNumber: 14, 
        curve: 'upper', 
        side: 'right',
        party: "Creemos", 
        partyShort: "CRE", 
        partyColor: "#f97316",
        department: "Santa Cruz", 
        age: 42,
        profession: "Ingeniero", 
        period: "2020-2025"
      },

      // CURVA INFERIOR: 22 senadores (15-36)
      // Lado izquierdo Curva Inferior: 11 senadores (15-25)
      { 
        id: 15, 
        name: "Susana Méndez Alarcón", 
        seatNumber: 15, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Beni", 
        age: 44,
        profession: "Administradora", 
        period: "2020-2025"
      },
      { 
        id: 16, 
        name: "Alberto Gutiérrez Paz", 
        seatNumber: 16, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Pando", 
        age: 56,
        profession: "Ingeniero", 
        period: "2020-2025"
      },
      { 
        id: 17, 
        name: "Carmen Rosa Sánchez Lima", 
        seatNumber: 17, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "La Paz", 
        age: 49,
        profession: "Periodista", 
        period: "2020-2025"
      },
      { 
        id: 18, 
        name: "Jorge Luis Pérez Mendoza", 
        seatNumber: 18, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Santa Cruz", 
        age: 51,
        profession: "Empresario", 
        period: "2020-2025"
      },
      { 
        id: 19, 
        name: "Gabriela Torres Guzmán", 
        seatNumber: 19, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Cochabamba", 
        age: 46,
        profession: "Abogada", 
        period: "2020-2025"
      },
      { 
        id: 20, 
        name: "Raúl Castro Valdivia", 
        seatNumber: 20, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Oruro", 
        age: 54,
        profession: "Sociólogo", 
        period: "2020-2025"
      },
      { 
        id: 21, 
        name: "Elizabeth Ríos Herrera", 
        seatNumber: 21, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Potosí", 
        age: 43,
        profession: "Educadora", 
        period: "2020-2025"
      },
      { 
        id: 22, 
        name: "Mario Vargas Camacho", 
        seatNumber: 22, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Tarija", 
        age: 52,
        profession: "Médico", 
        period: "2020-2025"
      },
      { 
        id: 23, 
        name: "Silvia Fernández Rocha", 
        seatNumber: 23, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Chuquisaca", 
        age: 48,
        profession: "Abogada", 
        period: "2020-2025"
      },
      { 
        id: 24, 
        name: "Pedro Castillo Mercado", 
        seatNumber: 24, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Beni", 
        age: 55,
        profession: "Ingeniero", 
        period: "2020-2025"
      },
      { 
        id: 25, 
        name: "Claudia Paz Zamora", 
        seatNumber: 25, 
        curve: 'lower', 
        side: 'left',
        party: "MAS-IPSP", 
        partyShort: "MAS", 
        partyColor: "#dc2626",
        department: "Pando", 
        age: 44,
        profession: "Economista", 
        period: "2020-2025"
      },
      
      // Lado derecho Curva Inferior: 11 senadores (26-36)
      { 
        id: 26, 
        name: "Victoria Choque Mamani", 
        seatNumber: 26, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "La Paz", 
        age: 45,
        profession: "Abogada", 
        period: "2020-2025"
      },
      { 
        id: 27, 
        name: "Walter Álvarez Salvatierra", 
        seatNumber: 27, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Santa Cruz", 
        age: 52,
        profession: "Empresario", 
        period: "2020-2025"
      },
      { 
        id: 28, 
        name: "Natalia Gutiérrez Ríos", 
        seatNumber: 28, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Beni", 
        age: 46,
        profession: "Médica", 
        period: "2020-2025"
      },
      { 
        id: 29, 
        name: "Óscar Paredes Flores", 
        seatNumber: 29, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Oruro", 
        age: 54,
        profession: "Abogado", 
        period: "2020-2025"
      },
      { 
        id: 30, 
        name: "Rosa María López Vargas", 
        seatNumber: 30, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Potosí", 
        age: 50,
        profession: "Educadora", 
        period: "2020-2025"
      },
      { 
        id: 31, 
        name: "Héctor Vásquez Mercado", 
        seatNumber: 31, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Pando", 
        age: 53,
        profession: "Ingeniero", 
        period: "2020-2025"
      },
      { 
        id: 32, 
        name: "Karen Salazar Pérez", 
        seatNumber: 32, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Tarija", 
        age: 44,
        profession: "Periodista", 
        period: "2020-2025"
      },
      { 
        id: 33, 
        name: "Andrés Romero Torres", 
        seatNumber: 33, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "La Paz", 
        age: 50,
        profession: "Abogado", 
        period: "2020-2025"
      },
      { 
        id: 34, 
        name: "Daniela Mendoza Suárez", 
        seatNumber: 34, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Santa Cruz", 
        age: 47,
        profession: "Administradora", 
        period: "2020-2025"
      },
      { 
        id: 35, 
        name: "Luis Fernando Arce Catacora", 
        seatNumber: 35, 
        curve: 'lower', 
        side: 'right',
        party: "Comunidad Ciudadana", 
        partyShort: "CC", 
        partyColor: "#2563eb",
        department: "Cochabamba", 
        age: 53,
        profession: "Economista", 
        period: "2020-2025"
      },
      { 
        id: 36, 
        name: "Carolina Herrera Gómez", 
        seatNumber: 36, 
        curve: 'lower', 
        side: 'right',
        party: "Creemos", 
        partyShort: "CRE", 
        partyColor: "#f97316",
        department: "Cochabamba", 
        age: 47,
        profession: "Abogada", 
        period: "2020-2025"
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
    default: 'https://apisi.senado.gob.bo/images/9df9f21d-bb1e-47e3-8be3-42f084473feb_1736968344.jpeg'
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
const hoverTimeout = ref(null)

// Referencia local a los datos
const senatorsData = ref([...props.senators])

// Watcher para cuando cambien los props de senators
watch(() => props.senators, (newSenators) => {
  senatorsData.value = [...newSenators]
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
  positions.upperCurveLeftSeats = []
  positions.upperCurveRightSeats = []
  positions.lowerCurveLeftSeats = []
  positions.lowerCurveRightSeats = []
  
  // CURVA SUPERIOR CON AJUSTES ESPECÍFICOS
  const upperLeftPositions = [
    { x: 400, y: 315 },
    { x: 405, y: 349 },
    { x: 421, y: 381 },
    { x: 445, y: 409 },
    { x: 477, y: 431 },
    { x: 513, y: 447 },
    { x: 553, y: 455 }
  ]

  const upperRightPositions = [
    { x: 647, y: 455 },
    { x: 687, y: 447 },
    { x: 723, y: 431 },
    { x: 755, y: 409 },
    { x: 779, y: 381 },
    { x: 795, y: 349 },
    { x: 800, y: 315 }
  ]
  
  // CURVA INFERIOR CON AJUSTES ESPECÍFICOS
  const lowerLeftPositions = [
    { x: 280, y: 250 },
    { x: 283, y: 300 },
    { x: 292, y: 349 },
    { x: 307, y: 395 },
    { x: 328, y: 438 },
    { x: 355, y: 477 },
    { x: 388, y: 511 },
    { x: 425, y: 538 },
    { x: 467, y: 559 },
    { x: 512, y: 573 },
    { x: 560, y: 580 }
  ]

  const lowerRightPositions = [
    { x: 640, y: 580 },
    { x: 688, y: 573 },
    { x: 733, y: 559 },
    { x: 775, y: 538 },
    { x: 812, y: 511 },
    { x: 845, y: 477 },
    { x: 872, y: 438 },
    { x: 893, y: 395 },
    { x: 908, y: 349 },
    { x: 917, y: 300 },
    { x: 920, y: 250 }
  ]
  
  // Asignar posiciones Curva Superior Izquierda
  for (let i = 0; i < 7; i++) {
    let senator = senatorsData.value.find(s => s.seatNumber === i + 1)
    if (senator && upperLeftPositions[i]) {
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
  // hoveredSeat.value = null
  updateTooltipPosition(senator)
  emit('senator-selected', senator)
}

const deselectSenator = () => {
  selectedSenator.value = null
  hoveredSeat.value = null
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
  hoveredSeat.value = null
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

// HOVER CORREGIDO - SIN EFECTOS FANTASMA
const handleMouseEnter = (seat, event) => {
  // Solo activar hover si no es el senador ya seleccionado
  if (selectedSenator.value?.id !== seat.id) {
    hoveredSeat.value = seat
    positionTooltipFromSeat()
  }
}

const handleMouseLeave = () => {
  // Limpiar hover inmediatamente, sin delay
  if (hoveredSeat.value?.id !== selectedSenator?.id) {
    hoveredSeat.value = null
  }
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
  }
}

const updateHoverTooltip = (event) => {
  if (hoveredSeat.value && hoveredSeat.value.id !== selectedSenator?.id && event) {
    const container = document.querySelector('.hemicycle-svg-container')
    if (container) {
      const rect = container.getBoundingClientRect()
      const svg = container.querySelector('svg')
      if (!svg) return
      
      // Obtener posición del senador en el SVG
      const seat = hoveredSeat.value
      
      // Calcular posición basada en las coordenadas del círculo
      // Esto es más consistente que seguir el mouse
      const svgRect = svg.getBoundingClientRect()
      const svgPoint = svg.createSVGPoint()
      
      // Convertir coordenadas SVG a coordenadas de pantalla
      svgPoint.x = seat.x
      svgPoint.y = seat.y
      const screenPoint = svgPoint.matrixTransform(svg.getScreenCTM())
      
      // Calcular posición del tooltip relativa al contenedor
      let x = screenPoint.x - rect.left + 25  // 25px a la derecha del círculo
      let y = screenPoint.y - rect.top - 100  // 100px arriba del círculo
      
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
    }
  }
}

// AGREGAR función debounce para suavizar
const debouncedUpdateHoverTooltip = debounce((event) => {
  updateHoverTooltip(event)
}, 50)

// Función debounce
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

const positionTooltipFromSeat = () => {
  if (hoveredSeat.value && hoveredSeat.value.id !== selectedSenator?.id) {
    nextTick(() => {
      const container = document.querySelector('.hemicycle-svg-container')
      if (!container) return
      
      const seat = hoveredSeat.value
      const svg = container.querySelector('svg')
      if (!svg) return
      
      // Usar viewBox para calcular posición relativa
      const viewBox = svg.viewBox.baseVal
      const containerRect = container.getBoundingClientRect()
      const svgRect = svg.getBoundingClientRect()
      
      // Calcular posición porcentual dentro del viewBox
      const xPercent = (seat.x - viewBox.x) / viewBox.width
      const yPercent = (seat.y - viewBox.y) / viewBox.height
      
      // Convertir a coordenadas del contenedor
      let x = xPercent * svgRect.width + 25
      let y = yPercent * svgRect.height - 100
      
      // Ajustar para posición del contenedor
      x += svgRect.left - containerRect.left
      y += svgRect.top - containerRect.top
      
      // Asegurar que esté dentro del contenedor
      const tooltipWidth = 260
      const tooltipHeight = 180
      
      if (x + tooltipWidth > containerRect.width) {
        x = containerRect.width - tooltipWidth - 10
      }
      if (y + tooltipHeight > containerRect.height) {
        y = containerRect.height - tooltipHeight - 10
      }
      if (x < 10) x = 10
      if (y < 10) y = 10
      
      tooltipStyle.left = `${x}px`
      tooltipStyle.top = `${y}px`
    })
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
})

// Limpiar timeout al desmontar
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
  }
})
</script>

<style scoped>
.senate-chamber {
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 0.5rem;
}

/* Header */
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

/* Contenedor con imagen de fondo */
.background-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
}

/* Layout de tres columnas */
.three-column-layout.transparent-bg {
  display: grid;
  grid-template-columns: 280px 1fr 380px;
  gap: 1rem;
  padding: 1rem;
  position: relative;
  z-index: 1;
  background: transparent !important;
}

@media (max-width: 1200px) {
  .three-column-layout.transparent-bg {
    grid-template-columns: 250px 1fr 350px;
  }
}

@media (max-width: 1024px) {
  .three-column-layout.transparent-bg {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 0.75rem;
  }
}

/* Paneles transparentes - SOLO FONDO TRANSPARENTE */
.transparent-panel {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* COLUMNA CENTRAL - MUY TRANSPARENTE */
.center-transparent-panel {
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Columna Izquierda - Controles */
.left-panel.controls-panel {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
}

.controls-section h4 {
  margin: 0 0 1rem 0;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  /* border-bottom: 2px solid #e5e7eb; */
  padding-bottom: 0.5rem;
  border-radius: .6rem;
  background-color: rgba(224, 54, 54, 0.85);
}

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
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}

.view-btn-vertical:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
  transform: translateY(-1px);
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
  transition: all 0.2s;
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
}

.legend-symbol {
  font-size: 1.7rem;
  color: white;
  text-shadow: 
    /* Borde blanco completo alrededor */
    -2px -2px 0 white,
     2px -2px 0 white,
    -2px  2px 0 white,
     2px  2px 0 white,
    /* Sombra interior negra para profundidad */
     0px  0px 0 black,
     0px  0px 2px rgba(0,0,0,0.5);
  /* font-weight: bold; */
}

.legend-details-vertical {
  flex: 1;
}

.legend-name-vertical {
  font-weight: 600;
  color: #1f2937;
  font-size: 1.3rem;
}

.legend-count-vertical {
  font-size: 0.85rem;
  color: #6b7280;
}

/* Columna Central - Hemiciclo */
.center-panel.hemicycle-container {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible !important;
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
.right-panel.info-panel {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 200px);
}

.right-panel .senator-details {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Foto del senador */
.senator-photo-container {
  /* margin-bottom: 1.5rem; */
}

.senator-photo-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  /* border: 3px solid #E03636; */
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
  font-size: 1.4rem;
  font-weight: 600;
  /* margin-bottom: 1.5rem; */
  line-height: 1.3;
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
}

.value-red {
  display: block;
  color: #E03636;
  font-size: 1rem;
  font-weight: 700;
}

/* Segunda fila: Partido y Asiento */
.info-row-second {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  margin-bottom: 1.5rem;
}

.pill-red {
  background-color: rgba(224, 54, 54, 0.85);
  color: white;
  padding: 0.6rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Información de contacto */
.contact-section {
  width: 100%;
  /* margin-bottom: 1.5rem; */
}

.contact-item-white {
  text-align: left;
  margin-bottom: 0.75rem;
}

.pill-white {
  background-color: white;
  color: #575756;
  padding: 0.4rem 0.75rem;
  border-radius: 7px;
  font-size: 0.9rem;
  border: 1px solid #e5e7eb;
  font-weight: 500;
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
}

.social-icon:hover {
  transform: scale(1.1);
  background: #f9fafb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Círculos de senadores - HOVER SUAVE Y SIN EFECTOS FANTASMA */
.senator-circle {
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: all !important;
}

/* HOVER: Solo un pequeño aumento */
.senator-circle:hover {
  r: 21 !important; /* Solo 1px más grande */
  stroke-width: 2px;
}

/* SELECTED: Sin transform, solo borde animado */
.senator-circle.selected {
  stroke: #f59e0b;
  stroke-width: 2px;
  animation: pulse 2s infinite;
  r: 20 !important; /* Mismo tamaño original */
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

/* Estado vacío */
.empty-state {
  padding: 2rem 1.5rem;
  text-align: center;
  color: #6b7280;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  border-radius: 0 0 12px 12px;
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

/* Responsive */
@media (max-width: 768px) {
  .three-column-layout.transparent-bg {
    gap: 0.75rem;
    padding: 0.75rem;
  }
  
  .center-panel.hemicycle-container {
    min-height: 350px;
  }
  
  .hemicycle-svg-container {
    min-height: 350px;
  }
  
  .right-panel.info-panel {
    max-height: 500px;
  }
  
  .left-panel.controls-panel {
    max-height: 300px;
  }
  
  .senator-name {
    font-size: 1.2rem;
  }
  
  .senator-photo-circle {
    width: 120px;
    height: 120px;
  }
  
  .photo-placeholder {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .three-column-layout.transparent-bg {
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  .left-panel.controls-panel {
    padding: 0.75rem;
  }
  
  .center-panel.hemicycle-container {
    min-height: 300px;
  }
  
  .hemicycle-svg-container {
    min-height: 300px;
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