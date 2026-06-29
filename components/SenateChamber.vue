<template>
  <div class="senate-chamber">
    <!-- Header -->
    <header v-if="showHeader" class="chamber-header text-center">
      <slot name="header">
        <div class="default-header">
          <h2>Hemiciclo del Senado · Gestión 2025-2030</h2>
          <p class="header-subtitle">Elecciones 17 de agosto de 2025</p>
        </div>
      </slot>
    </header>

    <main class="h-full">
      <div class="background-container h-full" :style="{ backgroundImage: `url('${backgroundImage}')` }">
        <div :class="senateChamberStyles.senator" class="columns-container">
          
          <!-- COLUMNA IZQUIERDA -->
          <div v-if="showControls" class="column left-column text-[1.4em]">
            <div class="controls-panel transparent-panel">
              <div class="controls-section">
                <h3 class="pill-red w-full">Distribución <br> 2025-2030</h3>
                <div class="legend-vertical">
                  <div 
                    v-for="party in parties"
                    :key="party.id"
                    class="legend-item-vertical"
                    @click="togglePartyFilter(party.id)"
                    :class="{ 'highlighted': activeFilters.includes(party.id) }"
                  >
                    <div class="grid grid-cols-[20px_1fr_20px] 2xl:grid-cols-[40px_1fr_40px] 3xl:grid-cols-[50px_1fr_50px] 4xl:grid-cols-[70px_1fr_70px] 5xl:grid-cols-[90px_1fr_90px] items-center w-full">
                      <div class="flex justify-center w-full">
                        <div class="legend-color-vertical w-full">
                          <svg viewBox="0 0 40 40" class="w-full">
                            <circle cx="20" cy="20" r="18" :fill="party.color"/>
                            <circle cx="20" cy="20" r="12" fill="white"/>
                            <circle cx="20" cy="20" r="10" :fill="party.color"/>
                            <circle cx="16" cy="16" r="3" fill="rgba(255,255,255,0.5)" opacity="0.7"/>
                          </svg>
                        </div>
                      </div>
                      <div class="flex justify-center">
                        <span class="legend-name-vertical font-semibold text-gray-800 text-[.8em] text-center">
                          {{ party.shortName }}
                        </span>
                      </div>
                      <div class="flex justify-center">
                        <span class="font-bold text-[1.1em]" :style="{ color: party.color }">
                          {{ getFilteredCount(party.id) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- COLUMNA CENTRAL -->
          <div class="column center-column">
            <div class="hemicycle-container center-transparent-panel">
              <div class="hemicycle-svg-container" @mousemove="onMouseMove">
                <!-- ✅ KEY DINÁMICA: Forzar recreación del SVG cuando cambia selectedSenator -->
                <svg 
                  ref="svgElement"
                  :key="`svg-${selectedSenator?.id || 'none'}-${renderCounter}`"
                  class="hemicycle-svg"
                  :viewBox="viewBox"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
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

                  <g>
                    <g 
                      v-for="seat in allSeats" 
                      :key="`seat-${seat.id}`"
                    >
                      <circle
                        :cx="seat.x"
                        :cy="seat.y"
                        r="20" 
                        :fill="getSeatColor(seat)"
                        :stroke-width="selectedSenator?.id === seat.id ? '2' : '1.5'"
                        :class="['senator-circle', { 
                          'selected': selectedSenator?.id === seat.id, 
                          'hovered': hoveredSeat?.id === seat.id 
                        }]"
                        @click="handleSeatClick(seat, $event)"
                        @mouseenter="handleMouseEnter(seat)"
                        @mouseleave="handleMouseLeave()"
                      />
                      <text 
                        v-if="showLabels"
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
                    </g>
                  </g>
                </svg>

                <!-- TOOLTIP -->
                <div 
                  v-if="hoveredSeat && hoveredSeat.id !== selectedSenator?.id && !isSelecting" 
                  class="seat-tooltip text-[6px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[15px] 2xl:text-[17px] 3xl:text-[19px] 4xl:text-[23px] 5xl:text-[33px]"
                  :style="tooltipStyle"
                >
                  <div class="tooltip-header">
                    <div class="seat-number-indicator" :style="{ backgroundColor: hoveredSeat.partyColor }">
                      {{ hoveredSeat.seatNumber }}
                    </div>
                    <div class="senator-info">
                      <h4>{{ hoveredSeat.name }}</h4>
                      <div class="party-badge">{{ hoveredSeat.partyShort }}</div>
                    </div>
                  </div>
                  <div class="tooltip-body">
                    <div class="info-row">
                      <span class="label">Departamento:</span>
                      <span class="value">{{ hoveredSeat.department }}</span>
                    </div>
                    <div class="info-row">
                      <span class="label">Partido:</span>
                      <span class="value">{{ hoveredSeat.party }}</span>
                    </div>
                    <div class="hint">🖱️ Click para detalles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- COLUMNA DERECHA -->
          <div class="column right-column w-full">
            <div class="info-panel transparent-panel w-full">
              <div v-if="selectedSenator" :key="`senator-${selectedSenator.id}-${renderCounter}`" class="senator-details">
                <div class="senator-photo-container">
                  <div class="senator-photo-circle" :class="senateChamberStyles.senatorPhoto">
                    <img 
                      :src="selectedSenator.photoUrl" 
                      :alt="selectedSenator.name"
                      class="senator-photo-img w-full h-full object-cover"
                      @error="handleImageError"
                      loading="eager"
                    />
                    <div v-if="imageError" class="photo-placeholder" :style="{ backgroundColor: selectedSenator.partyColor }">
                      {{ formatInitials(selectedSenator.name) }}
                    </div>
                  </div>
                </div>

                <div class="senator-name">
                  {{ selectedSenator.name }}
                </div>

                <div class="info-row-first">
                  <div class="">
                    <span class="value-red text-center">{{ selectedSenator.department }}</span>
                  </div>
                </div>

                <div class="info-row-second flex justify-center items-center">
                  <div class="pill-red font-extrabold px-[1.5vw]">
                    {{ selectedSenator.partyShort }}
                  </div>
                </div>

                <div class="bancada-row">
                  <div v-if="selectedSenator.comision" class="pill-white font-extrabold text-center mb-[1em]">
                    {{ selectedSenator.comision }}
                  </div>
                  <div v-if="selectedSenator.comite" class="pill-white font-extrabold text-center mb-[1em]">
                    {{ selectedSenator.comite }}
                  </div>
                  <div v-if="selectedSenator.cargo" class="pill-white font-extrabold text-center">
                    {{ selectedSenator.cargo }}
                  </div>
                </div>
              </div>

              <div v-else class="empty-state">
                <div class="empty-icon">🎯</div>
                <h2 class="font-bold">Selecciona un Senador</h2>
                <p class="font-bold">Haz click en cualquier círculo del hemiciclo para ver información detallada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer v-if="showFooter" class="chamber-footer">
      <div class="footer-content">
        <slot name="footer">
          <div class="footer-info">
            <p class="footer-main">Cámara de Senadores · Estado Plurinacional de Bolivia</p>
            <p class="footer-sub">Elecciones 17 de agosto de 2025 · Período 2025-2030</p>
          </div>
        </slot>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { defaultSenators, defaultParties, senateChamberStyles } from './SenateChamber/data/senateChamberData'
import { useSenateChamber } from '~/composables/useSenateChamber'

// ============================================
// PROPS
// ============================================
const props = defineProps({
  senators: { type: Array, required: false, default: () => defaultSenators },
  parties: { type: Array, required: false, default: () => defaultParties },
  showHeader: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: true },
  showControls: { type: Boolean, default: true },
  initialShowLabels: { type: Boolean, default: false },
  backgroundImage: { type: String, default: '/Recurso1.png' },
  viewBox: { type: String, default: '250 200 700 400' }
})

const emit = defineEmits(['senator-selected', 'senator-deselected', 'party-filter-changed', 'view-reset'])

// ============================================
// RENDER COUNTER - Para forzar recreación del SVG
// ============================================
const renderCounter = ref(0)

// ============================================
// COMPOSABLE
// ============================================
const {
  selectedSenator,
  hoveredSeat,
  activeFilters,
  showLabels,
  tooltipStyle,
  svgElement,
  imageError,
  isSelecting,
  allSeats,
  getFilteredCount,
  getSeatColor,
  getTextColor,
  formatInitials,
  handleImageError,
  selectSenator: selectSenatorFromComposable,
  togglePartyFilter,
  resetView,
  handleMouseEnter,
  handleMouseLeave,
  onMouseMove,
  cleanup
} = useSenateChamber(props, emit)

// ============================================
// HANDLER DE CLICK - CON PREVENCIÓN DE PROPAGACIÓN Y FORCE UPDATE
// ============================================
const handleSeatClick = (seat, event) => {
  // Prevenir cualquier propagación
  if (event) {
    event.stopPropagation()
    event.preventDefault()
  }
  
  // Si está seleccionando, ignorar
  if (isSelecting.value) {
    console.log('⏳ [SenateChamber] Selección en proceso, click ignorado')
    return
  }
  
  // Ejecutar selección
  selectSenatorFromComposable(seat)
  
  // ✅ FORZAR RECREACIÓN DEL SVG INCREMENTANDO EL COUNTER
  renderCounter.value++
}

// ============================================
// HANDLER GLOBAL - Capturar clicks fuera
// ============================================
const handleGlobalClick = (event) => {
  if (!isSelecting.value && selectedSenator.value) {
    const target = event.target
    if (target && target.tagName === 'svg') {
      selectedSenator.value = null
      emit('senator-deselected')
      renderCounter.value++
    }
  }
}

// ============================================
// WRAPPER PARA selectSenator - Forzar actualización
// ============================================
const selectSenator = (seat) => {
  selectSenatorFromComposable(seat)
  renderCounter.value++
}

// ============================================
// LIFECYCLE
// ============================================
onMounted(() => {
  console.log('✅ SenateChamber montado correctamente')
})

onUnmounted(() => {
  cleanup()
})

watch(() => props.senators, () => {
  cleanup()
}, { deep: false })

// ============================================
// EXPOSE
// ============================================
defineExpose({ 
  resetView, 
  selectSenator, 
  deselectSenator: () => { 
    selectedSenator.value = null
    renderCounter.value++
  },
  forceUpdate: () => { renderCounter.value++ }
})
</script>

<style scoped>
/* ... (todos los estilos existentes se mantienen igual) ... */
.senate-chamber {
  font-family: 'Montserrat';
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chamber-header {
  height: auto;
  background: #575756;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
}

.default-header h2 {
  margin: 0;
  color: white;
  font-size: 1.5rem;
}

.header-subtitle {
  color: rgba(255,255,255,0.9);
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
}

.background-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.columns-container {
  padding: 1.5em;
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1.2fr;
  gap: 1rem;
  box-sizing: border-box;
}

.column {
  display: flex;
}

@media (max-width: 767px) {
  .left-column { display: none; }
}

.center-column { flex: 1; min-width: 0; z-index: 11; }
.right-column { z-index: 10; }

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

.center-transparent-panel {
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls-panel {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  overflow-y: auto;
  width: 100%;
  flex: 1;
}

.controls-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.controls-section h4 {
  display: none;
  margin: 0 0 1em 0;
  color: white;
  font-size: 1.2em;
  font-weight: 700;
  padding: 0.75em;
  border-radius: .6em;
  background-color: rgba(224, 54, 54, 0.85);
  text-align: center;
}

.legend-vertical {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: .6em;
  padding: .35em;
  width: 100%;
}

.legend-item-vertical {
  display: flex;
  align-items: center;
  gap: 0.75em;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  padding: 0em 0.3em;
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.legend-color-vertical svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.legend-color-vertical circle {
  transition: transform 0.2s ease;
}

.legend-item-vertical:hover .legend-color-vertical circle {
  transform: scale(1.1);
}

.legend-name-vertical {
  font-weight: 600;
  color: #1f2937;
}

.hemicycle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible !important;
  width: 100%;
  height: 100%;
}

.hemicycle-svg-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible !important;
}

.hemicycle-svg {
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: visible !important;
}

.info-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.senator-details {
  padding: 0.8em 1.2em;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: 0.2em;
}

.senator-photo-container {
  margin-bottom: 0.3rem;
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

.senator-photo-circle {
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  flex-shrink: 0;
}

.senator-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  font-weight: 700;
  color: white;
  border-radius: 50%;
}

.senator-name {
  color: #575756;
  font-weight: 600;
  line-height: 1.2;
  width: 100%;
  text-align: center;
  font-size: 0.85em;
}

@media (min-width: 1024px) {
  .senator-name { font-size: 1em; }
}

@media (min-width: 1280px) {
  .senator-name { font-size: 1.1em; }
}

.info-row-first {
  width: 100%;
  margin-bottom: 0.1em;
}

.value-red {
  display: block;
  color: #E03636;
  font-weight: 700;
  text-align: center;
  font-size: 0.8em;
}

@media (min-width: 1024px) {
  .value-red { font-size: 0.9em; }
}

@media (min-width: 1280px) {
  .value-red { font-size: 1em; }
}

.info-row-second {
  margin-bottom: 0.3em;
  width: 100%;
}

.pill-red {
  background-color: rgba(224, 54, 54, 0.85);
  color: white;
  border-radius: 1em;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.15em 0.5em;
  font-size: 0.7em;
}

@media (min-width: 1024px) {
  .pill-red { font-size: 0.8em; }
}

@media (min-width: 1280px) {
  .pill-red { font-size: 0.9em; }
}

.bancada-row {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  margin-top: 0.2em;
}

.pill-white {
  background-color: white;
  color: #575756;
  padding: 0.1em 0.5em;
  border-radius: 7px;
  font-size: 0.6em;
  border: 1px solid #e5e7eb;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

@media (min-width: 1024px) {
  .pill-white { font-size: 0.7em; }
}

@media (min-width: 1280px) {
  .pill-white { font-size: 0.8em; }
}

.senator-circle {
  cursor: pointer;
  transition: r 0.2s ease, stroke-width 0.2s ease;
  pointer-events: all !important;
  filter: drop-shadow(1px 2px 2px rgba(0,0,0,0.1));
}

.senator-circle:hover { r: 21 !important; stroke-width: 2px; }
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

.seat-number, .senator-name-part { pointer-events: none !important; user-select: none; }

.seat-tooltip {
  position: absolute;
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(59, 130, 246, 0.5);
  pointer-events: none;
  animation: fadeIn 0.15s ease;
  z-index: 1000;
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

.senator-info h4 { margin: 0 0 0.5rem 0; color: #1f2937; flex: 1; }
.party-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  background: #f3f4f6;
  color: #4b5563;
  flex-shrink: 0;
}

.tooltip-body { display: flex; flex-direction: column; gap: 0.5rem; }
.info-row { display: flex; justify-content: space-between; width: 100%; }
.label { color: #6b7280; }
.value { font-weight: 600; color: #1f2937; }
.hint {
  color: #3b82f6;
  font-style: italic;
  margin-top: 0.5rem;
  text-align: center;
  width: 100%;
}

.empty-state {
  padding: 1.5em;
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

.empty-icon { font-size: 2.5em; margin-bottom: 0.5em; width: 100%; }
.empty-state h2 { margin: 0 0 0.3rem 0; color: #4b5563; font-size: 1.1em; width: 100%; }
.empty-state p { margin: 0 0 0.5rem 0; font-size: 0.8em; width: 100%; }

.chamber-footer {
  background: #1f2937;
  color: white;
  padding: 0.5rem 1.5rem;
  text-align: center;
  border-radius: 8px;
  flex-shrink: 0;
}

.footer-content { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.footer-info p { margin: 0.1rem 0; font-size: 0.8rem; }
.footer-main { font-weight: 600; }
.footer-sub { font-size: 0.7rem; opacity: 0.8; }
</style>