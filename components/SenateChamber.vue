<template>
  <div class="h-full senate-chamber"> <!-- SOLO CAMBIO: h-screen por h-full -->
    <!-- Header -->
    <header v-if="showHeader" class="chamber-header text-center">
      <slot name="header">
        <div class="default-header">
          <h2>Hemiciclo del Senado · Gestión 2025-2030</h2>
          <p class="header-subtitle">Elecciones 17 de agosto de 2025</p>
        </div>
      </slot>
    </header>

    <main class="h-full"> <!-- SOLO CAMBIO: h-screen por h-full -->
      <!-- Contenedor con imagen de fondo -->
      <div class="h-full background-container" :style="{ backgroundImage: `url('${backgroundImage}')` }"> <!-- SOLO CAMBIO: h-screen por h-full -->
        <!-- Contenedor principal CON GRID DE 3 COLUMNAS REALES -->
        <div :class="senateChamberStyles.senator" class="columns-container">
          <!-- COLUMNA IZQUIERDA: Panel de Controles -->
          <div v-if="showControls" class="column left-column text-[1.4em]">
            <div class="controls-panel transparent-panel">
              <!-- Leyenda -->
              <div class="controls-section">
                <h3 class="pill-red">Distribución <br> 2025-2030</h3>
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
                        <!-- CÍRCULO CON EFECTO CONCÉNTRICO: Color → Blanco → Color -->
                        <div class="legend-color-vertical w-full">
                          <svg viewBox="0 0 40 40" class="w-full">
                            <!-- Círculo exterior (color del partido) -->
                            <circle 
                              cx="20" 
                              cy="20" 
                              r="18" 
                              :fill="party.color"
                            />
                            <!-- Círculo medio (blanco) -->
                            <circle 
                              cx="20" 
                              cy="20" 
                              r="12" 
                              fill="white"
                            />
                            <!-- Círculo interior (color del partido) -->
                            <circle 
                              cx="20" 
                              cy="20" 
                              r="10" 
                              :fill="party.color"
                            />
                            <!-- Pequeño brillo (opcional para dar efecto 3D) -->
                            <circle 
                              cx="16" 
                              cy="16" 
                              r="3" 
                              fill="rgba(255,255,255,0.5)"
                              opacity="0.7"
                            />
                          </svg>
                        </div>
                      </div>
                      <div class="flex justify-center">
                        <span class="legend-name-vertical font-semibold text-gray-800 text-[.8em] text-center">
                          {{ party.shortName }}
                        </span>
                      </div>
                      <div class="flex justify-center">
                        <span 
                          class="font-bold text-[1.1em]"
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

          <!-- COLUMNA CENTRAL: Hemiciclo SVG -->
          <div class="column center-column">
            <div class="hemicycle-container center-transparent-panel">
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

                  <!-- TODOS LOS ASIENTOS -->
                  <g>
                    <g v-for="seat in allSeats" :key="seat.id">
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
                    </g>
                  </g>
                </svg>

                <!-- Tooltip -->
                <div 
                  v-if="hoveredSeat && hoveredSeat.id !== selectedSenator?.id" 
                  class="seat-tooltip 
                  text-[6px] xs:text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[15px] 2xl:text-[17px] 3xl:text-[19px] 4xl:text-[23px] 5xl:text-[33px]
                  "
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
                    <div class="hint">👆 Click para detalles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- COLUMNA DERECHA: Información del Senador CON FOTOS REALES -->
          <div class="column right-column w-full">
            <div class="info-panel transparent-panel w-full">
              <div v-if="selectedSenator" :key="selectedSenator.id" class="senator-details">
                <div class="senator-photo-container">
                  <div class="senator-photo-circle" :class="senateChamberStyles.senatorPhoto">
                    <!-- FOTO 100% FUNCIONAL - RANDOMUSER.ME -->
                    <img
                      :src="selectedSenator.photoUrl" 
                      :alt="selectedSenator.name"
                      class="senator-photo-img"
                      @error="handleImageError"
                    />
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
                  <!-- <div class="pill-red font-extrabold">
                    Curul {{ selectedSenator.seatNumber }}
                  </div> -->
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

                <!-- Redes sociales - ICONOS REALES (comentado) -->
                <!-- <div class="social-media-section">
                  <div class="social-icons">
                    <a :href="selectedSenator.twitter || 'https://twitter.com'" target="_blank" class="social-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a :href="selectedSenator.instagram || 'https://instagram.com'" target="_blank" class="social-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                      </svg>
                    </a>
                    <a :href="selectedSenator.youtube || 'https://youtube.com'" target="_blank" class="social-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                    <a :href="selectedSenator.linkedin || 'https://linkedin.com'" target="_blank" class="social-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </div> -->
              </div>

              <div v-else class="empty-state">
                <div class="empty-icon">👆</div>
                <h2 class="font-bold">Selecciona un Senador</h2>
                <p class="font-bold">Haz click en cualquier círculo del hemiciclo para ver información detallada</p>
                <div class="empty-tips">
                  <!-- CÍRCULOS CON EFECTO CONCÉNTRICO: Color → Blanco → Color -->
                  <p class="party-indicator">
                    <span class="color-dot">
                      <svg width="28" height="28" viewBox="0 0 28 28">
                        <circle cx="14" cy="14" r="12" fill="#016167"/>
                        <circle cx="14" cy="14" r="8" fill="white"/>
                        <circle cx="14" cy="14" r="7" fill="#016167"/>
                        <circle cx="11" cy="11" r="2" fill="rgba(255,255,255,0.5)" opacity="0.7"/>
                      </svg>
                    </span>
                    <strong>PDC:</strong> 16 senadores
                  </p>
                  <p class="party-indicator">
                    <span class="color-dot">
                      <svg width="28" height="28" viewBox="0 0 28 28">
                        <circle cx="14" cy="14" r="12" fill="#FF0000"/>
                        <circle cx="14" cy="14" r="8" fill="white"/>
                        <circle cx="14" cy="14" r="7" fill="#FF0000"/>
                        <circle cx="11" cy="11" r="2" fill="rgba(255,255,255,0.5)" opacity="0.7"/>
                      </svg>
                    </span>
                    <strong>Libre:</strong> 12 senadores
                  </p>
                  <p class="party-indicator">
                    <span class="color-dot">
                      <svg width="28" height="28" viewBox="0 0 28 28">
                        <circle cx="14" cy="14" r="12" fill="#FFB848"/>
                        <circle cx="14" cy="14" r="8" fill="white"/>
                        <circle cx="14" cy="14" r="7" fill="#FFB848"/>
                        <circle cx="11" cy="11" r="2" fill="rgba(255,255,255,0.5)" opacity="0.7"/>
                      </svg>
                    </span>
                    <strong>Unidad:</strong> 7 senadores
                  </p>
                  <p class="party-indicator">
                    <span class="color-dot">
                      <svg width="28" height="28" viewBox="0 0 28 28">
                        <circle cx="14" cy="14" r="12" fill="#511966"/>
                        <circle cx="14" cy="14" r="8" fill="white"/>
                        <circle cx="14" cy="14" r="7" fill="#511966"/>
                        <circle cx="11" cy="11" r="2" fill="rgba(255,255,255,0.5)" opacity="0.7"/>
                      </svg>
                    </span>
                    <strong>APB:</strong> 1 senador
                  </p>
                  <p><strong>Total:</strong> 36 senadores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
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
import { ref, computed, reactive, onMounted, watch, onUnmounted } from 'vue'
import { senateChamberStyles } from './data/senateChamberData'

// ============================================
// POSICIONES SVG - EXACTAMENTE IGUALES AL ORIGINAL
// ============================================
const seatPositions = {
  upperLeft: [
    { x: 399, y: 303 }, // asiento 1
    { x: 405, y: 343 }, // asiento 2
    { x: 421, y: 380 }, // asiento 3
    { x: 445, y: 412 }, // asiento 4
    { x: 477, y: 436 }, // asiento 5
    { x: 513, y: 455 }, // asiento 6
    { x: 553, y: 465 }  // asiento 7
  ],
  upperRight: [
    { x: 647, y: 465 }, // asiento 8
    { x: 687, y: 455 }, // asiento 9
    { x: 723, y: 436 }, // asiento 10
    { x: 755, y: 412 }, // asiento 11
    { x: 779, y: 380 }, // asiento 12
    { x: 795, y: 343 }, // asiento 13
    { x: 801, y: 303 }  // asiento 14
  ],
  lowerLeft: [
    { x: 280, y: 252 }, // asiento 15
    { x: 283, y: 301 }, // asiento 16
    { x: 292, y: 349 }, // asiento 17
    { x: 307, y: 395 }, // asiento 18
    { x: 328, y: 438 }, // asiento 19
    { x: 355, y: 477 }, // asiento 20
    { x: 388, y: 511 }, // asiento 21
    { x: 423, y: 538 }, // asiento 22
    { x: 464, y: 559 }, // asiento 23
    { x: 507, y: 573 }, // asiento 24
    { x: 553, y: 580 }  // asiento 25
  ],
  lowerRight: [
    { x: 647, y: 580 }, // asiento 26
    { x: 693, y: 573 }, // asiento 27
    { x: 736, y: 559 }, // asiento 28
    { x: 777, y: 538 }, // asiento 29
    { x: 812, y: 511 }, // asiento 30
    { x: 845, y: 477 }, // asiento 31
    { x: 872, y: 438 }, // asiento 32
    { x: 893, y: 395 }, // asiento 33
    { x: 908, y: 349 }, // asiento 34
    { x: 917, y: 301 }, // asiento 35
    { x: 920, y: 252 }  // asiento 36
  ]
}

// ============================================
// DATOS CON FOTOS 100% FUNCIONALES - RANDOMUSER.ME
// TODAS LAS URLs CARGAN CORRECTAMENTE
// ============================================

const props = defineProps({
  senators: {
    type: Array,
    required: false,
    default: () => [
      // ============ PDC - GOBIERNO (16 senadores) ============
      // Color: #016167 (verde petróleo)
      
      // CURVA SUPERIOR IZQUIERDA - asientos 1-7 (7 senadores)
      { 
        id: 1, seatNumber: 1, curve: 'upper', side: 'left', 
        name: "Diego Esteban Mateo Ávila Navajas", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Tarija", age: 52, profession: "Abogado", 
        email: "davila@senado.gob.bo", phone: "+591 71562341", office: "Edificio Presidente, Piso 10",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/DIEGO ESTEBAN MATEO ÁVILA NAVAJAS.png",
        comision:"Directiva Legislatura 2025-2026",
        comite:"",
        cargo:"Presidente"
      },
      { 
        id: 2, seatNumber: 2, curve: 'upper', side: 'left', 
        name: "Bertha Cartagena Sánchez", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Chuquisaca", age: 58, profession: "Socióloga", 
        email: "bcartagena@senado.gob.bo", phone: "+591 71456982", office: "Edificio Presidente, Piso 9",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/BERTHA CARTAGENA SANCHEZ.png",
        comision:"",
        comite:"Comité de Culturas, Interculturalidad y Patrimonio Cultural",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 3, seatNumber: 3, curve: 'upper', side: 'left', 
        name: "Daniel Antonio Ortiz Velásquez", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Chuquisaca", age: 55, profession: "Abogado", 
        email: "dortiz@senado.gob.bo", phone: "+591 71234567", office: "Edificio Presidente, Piso 9",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/DANIEL ANTONIO ORTIZ VELASQUEZ.png",
        comision:"Comisión de Constitución, Derechos Humanos, Legislación y Sistema Electoral",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      { 
        id: 4, seatNumber: 4, curve: 'upper', side: 'left', 
        name: "Nicanor Gonzalo Cochi Condorí", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "La Paz", age: 53, profession: "Ingeniero", 
        email: "ncochi@senado.gob.bo", phone: "+591 72567890", office: "Edificio Presidente, Piso 8",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/NICANOR GONZALO COCHI CONDORI.png",
        comision:"Comisión de Política Internacional y Protección al Migrante",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      {
        id: 5, seatNumber: 5, curve: 'upper', side: 'left', 
        name: "Ana María Crispin Choque", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "La Paz", age: 49, profession: "Educadora", 
        email: "acrispin@senado.gob.bo", phone: "+591 73456789", office: "Edificio Presidente, Piso 8",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/ANA MARIA CRISPIN CHOQUE.png",
        comision:"Comisión de Economía Plural, Producción e Industria",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      { 
        id: 6, seatNumber: 6, curve: 'upper', side: 'left', 
        name: "Wilder Véliz Armas", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Cochabamba", age: 51, profession: "Médico", 
        email: "wveliz@senado.gob.bo", phone: "+591 74567891", office: "Edificio Presidente, Piso 7",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/WILDER VELIZ ARMAS.png",
        comision:"",
        comite:"Comité de Justicia Plural y Consejo de la Magistratura.",
        cargo:"Secretario de Comite"
      },
      { 
        id: 7, seatNumber: 7, curve: 'upper', side: 'left', 
        name: "Judith Rosario García Coca", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Cochabamba", age: 47, profession: "Abogada", 
        email: "jgarcia@senado.gob.bo", phone: "+591 75678912", office: "Edificio Presidente, Piso 7",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/JUDITH ROSARIO GARCIA COCA.png",
        comision:"Comisión de Seguridad del Estado",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      
      // CURVA INFERIOR IZQUIERDA - asientos 15-23 (9 senadores)
      { 
        id: 8, seatNumber: 15, curve: 'lower', side: 'left', 
        name: "Yasmín Estivariz Villarroel", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Oruro", age: 48, profession: "Ingeniera", 
        email: "yestivariz@senado.gob.bo", phone: "+591 76789123", office: "Edificio Presidente, Piso 6",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/YASMIN ESTIVARIZ VILLARROEL.png",
        comision:"Directiva Legislatura 2025-2026",
        comite:"",
        cargo:"Primera Secretaria"
      },
      { 
        id: 9, seatNumber: 16, curve: 'lower', side: 'left', 
        name: "Freddy Castillo Chávez", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Oruro", age: 56, profession: "Economista", 
        email: "fcastillo@senado.gob.bo", phone: "+591 77891234", office: "Edificio Presidente, Piso 6",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/FREDDY CASTILLO CHAVEZ.png",
        comision:"",
        comite:"Comité de Constitución, Legislación e Interpretación Legislativa y Constitucional.",
        cargo:"Secretario de Comite"
      },
      { 
        id: 10, seatNumber: 17, curve: 'lower', side: 'left', 
        name: "Maria Antonieta Alcón Sánchez", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Oruro", age: 54, profession: "Administradora", 
        email: "malcon@senado.gob.bo", phone: "+591 78912345", office: "Edificio Presidente, Piso 5",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/MARIA ANTONIETA ALCON SANCHEZ.png",
        comision:"",
        comite:"Comité de Educación, Salud, Ciencia, Tecnología y Deporte",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 11, seatNumber: 18, curve: 'lower', side: 'left', 
        name: "Bertha Nurmy Gutiérrez Meneces", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Potosí", age: 59, profession: "Trabajadora Social", 
        email: "bgutierrez@senado.gob.bo", phone: "+591 79123456", office: "Edificio Presidente, Piso 5",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/BERTHA NURMY GUTIERREZ MENESES.png",
        comision:"",
        comite:"Comité de Naciones y Pueblos Indígena Originario Campesinos",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 12, seatNumber: 19, curve: 'lower', side: 'left', 
        name: "Marcelino Flores Ordoñez", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Potosí", age: 62, profession: "Minero", 
        email: "mflores@senado.gob.bo", phone: "+591 70234567", office: "Edificio Presidente, Piso 4",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/MARCELINO FLORES ORDOÑEZ.png",
        comision:"",
        comite:"Comité de Energía, Hidrocarburos, Minería y Metalurgia",
        cargo:"Secretario de Comite"
      },
      { 
        id: 13, seatNumber: 20, curve: 'lower', side: 'left', 
        name: "Paola Limbania López Zeballos", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Santa Cruz", age: 45, profession: "Abogada", 
        email: "plopez@senado.gob.bo", phone: "+591 71345678", office: "Edificio Presidente, Piso 4",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/PAOLA LIMBANIA LOPEZ ZEBALLOS.png",
        comision:"",
        comite:"Comité de Seguridad del Estado y Lucha Contra el Narcotráfico",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 14, seatNumber: 21, curve: 'lower', side: 'left', 
        name: "Erick Nelson Soruco Alpire", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Beni", age: 50, profession: "Ganadero", 
        email: "esoruco@senado.gob.bo", phone: "+591 72456789", office: "Edificio Presidente, Piso 3",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/ERICK NELSON SORUCO ALPIRE.png",
        comision:"Comisión de Justicia Plural, Ministerio Público y Defensa del Estado",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      { 
        id: 15, seatNumber: 22, curve: 'lower', side: 'left', 
        name: "Cinthia Mónica Puerta Campos", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Pando", age: 43, profession: "Empresaria", 
        email: "cpuerta@senado.gob.bo", phone: "+591 73567890", office: "Edificio Presidente, Piso 3",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/CINTIA MONICA PUERTA CAMPOS.png",
        comision:"",
        comite:"Comité de Medio Ambiente, Biodiversidad, Amazonía, Áreas Protegidas y Cambio Climático",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 16, seatNumber: 23, curve: 'lower', side: 'left', 
        name: "José Sánchez Aguilar", 
        party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
        department: "Oruro", age: 57, profession: "Ingeniero", 
        email: "jsanchez@senado.gob.bo", phone: "+591 74678901", office: "Edificio Presidente, Piso 2",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/JOSE SANCHEZ AGUILAR.png",
        comision:"Comisión de Política Social",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      
      // ============ UNIDAD - ALIADOS (7 senadores) ============
      // Color: #FFB848 (amarillo/ámbar)
      
      // CURVA SUPERIOR DERECHA - asientos 8-10 (3 senadores)
      { 
        id: 17, seatNumber: 8, curve: 'upper', side: 'right', 
        name: "Carmen Soledad Chapeton Tancara", 
        party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
        department: "La Paz", age: 52, profession: "Abogada", 
        email: "schapeton@senado.gob.bo", phone: "+591 75789012", office: "Edificio Aliados, Piso 10",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/CARMEN SOLEDAD CHAPETÓN TANCARA.png",
        comision:"Directiva Legislatura 2025-2026",
        comite:"",
        cargo:"Primera Vicepresidencia"
      },
      { 
        id: 18, seatNumber: 9, curve: 'upper', side: 'right', 
        name: "César Mentasti Padilla", 
        party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
        department: "Tarija", age: 58, profession: "Empresario", 
        email: "cmentasti@senado.gob.bo", phone: "+591 76890123", office: "Edificio Aliados, Piso 10",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/CESAR MENTASTI PADILLA.png",
        comision:"Comisión de Organización Territorial del Estado y Autonomías",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      { 
        id: 19, seatNumber: 10, curve: 'upper', side: 'right', 
        name: "Leonor Rosalva Romero Gutiérrez", 
        party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
        department: "Tarija", age: 55, profession: "Médica", 
        email: "lromero@senado.gob.bo", phone: "+591 77901234", office: "Edificio Aliados, Piso 9",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/LEONOR ROSALVA ROMERO GUTIERREZ.png",
        comision:"",
        comite:"Comité de Planificación, Presupuesto, Inversión Pública y Contraloría General del Estado",
        cargo:"Secretaria de Comite"
      },
      
      // CURVA INFERIOR DERECHA - asientos 26-29 (4 senadores)
      { 
        id: 20, seatNumber: 14, curve: 'lower', side: 'right', 
        name: "Rosa Tatiana Áñez Carrasco", 
        party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
        department: "Santa Cruz", age: 49, profession: "Abogada", 
        email: "tanez@senado.gob.bo", phone: "+591 78123456", office: "Edificio Aliados, Piso 9",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/ROSA TATIANA AÑEZ CARRASCO.png",
        comision:"Directiva Legislatura 2025-2026",
        comite:"",
        cargo:"Tercera Secretaria"
      },
      { 
        id: 21, seatNumber: 13, curve: 'lower', side: 'right', 
        name: "José Roca Haensel", 
        party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
        department: "Beni", age: 61, profession: "Ganadero", 
        email: "jroca@senado.gob.bo", phone: "+591 79234567", office: "Edificio Aliados, Piso 8",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/JOSE ROCA HAENSEL.png",
        comision:"",
        comite:"Comité de Autonomías Municipales, Indigena Originario Campesinas y Regionales",
        cargo:"Secretario de Comite"
      },
      { 
        id: 22, seatNumber: 11, curve: 'lower', side: 'right', 
        name: "Ana Karina Velasco Añez", 
        party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
        department: "Beni", age: 47, profession: "Abogada", 
        email: "avelasco@senado.gob.bo", phone: "+591 70345678", office: "Edificio Aliados, Piso 8",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/ANA KARINA VELASCO ÁÑEZ.png",
        comision:"",
        comite:"Comité de Fuerzas Armadas y Policía Boliviana",
        cargo:"Secretaria de comite"
      },
      { 
        id: 23, seatNumber: 12, curve: 'lower', side: 'right', 
        name: "Eliana Rina Acosta Quispe", 
        party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
        department: "Pando", age: 44, profession: "Administradora", 
        email: "eacosta@senado.gob.bo", phone: "+591 71456789", office: "Edificio Aliados, Piso 7",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/ELIANA RINA ACOSTA QUISPE.png",
        comision:"Comisión de Planificación, Política Económica y Finanzas",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      
      // ============ APB SÚMATE - ALIADOS (1 senador) ============
      // Color: #511966 (púrpura)
      // ASIENTO 11
      { 
        id: 24, seatNumber: 36, curve: 'upper', side: 'right', 
        name: "Claudia Mallón Vargas", 
        party: "Autonomía para Bolivia Súmate", partyShort: "APB", partyColor: "#511966", bancada: "Aliados", 
        department: "Cochabamba", age: 46, profession: "Abogada", 
        email: "cmallon@senado.gob.bo", phone: "+591 72567890", office: "Edificio Aliados, Piso 7",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/CLAUDIA MALLON VARGAS.png",
        comision:"",
        comite:"Comité de Vivienda, Regimen Laboral, Seguridad Industrial y Seguridad Social",
        cargo:"Secretaria de Comite"
      },
      
      // ============ LIBRE - OPOSICIÓN (12 senadores) ============
      // Color: #FF0000 (rojo)
      
      // CURVA SUPERIOR DERECHA - asientos 12-14 (3 senadores)
      { 
        id: 25, seatNumber: 29, curve: 'upper', side: 'right', 
        name: "José Manuel Ormachea Mendieta", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "La Paz", age: 59, profession: "Abogado", 
        email: "jormachea@senado.gob.bo", phone: "+591 73678901", office: "Edificio Oposición, Piso 10",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/JOSE MANUEL ORMACHEA MENDIETA.png",
        comision:"Comisión de Naciones y Pueblos Indígena Originario Campesinos, Culturas e Interculturalidad",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      { 
        id: 26, seatNumber: 27, curve: 'upper', side: 'right', 
        name: "Wanda Ximena Medrano Hervas", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Cochabamba", age: 48, profession: "Abogada", 
        email: "wmedrano@senado.gob.bo", phone: "+591 74789012", office: "Edificio Oposición, Piso 10",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/WANDA XIMENA MEDRANO HERVAS.png",
        comision:"",
        comite:"Comité de Relaciones Económicas Internacionales",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 27, seatNumber: 26, curve: 'upper', side: 'right', 
        name: "Branko Goran Marinković Jovicevic", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Santa Cruz", age: 54, profession: "Empresario", 
        email: "bmarinkovic@senado.gob.bo", phone: "+591 75890123", office: "Edificio Oposición, Piso 9",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/BRANKO GORAN MARINKOVIC JOVICEVIC.png",
        comision:"Comisión de Tierra y Territorio / Región Amazónica",
        comite:"",
        cargo:"Presidente de Comisión"
      },
      
      // CURVA INFERIOR DERECHA - asientos 30-36 (7 senadores)
      { 
        id: 28, seatNumber: 30, curve: 'lower', side: 'right', 
        name: "Kathia Lizbeth Quiroga Fernández", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Santa Cruz", age: 45, profession: "Abogada", 
        email: "kquiroga@senado.gob.bo", phone: "+591 76901234", office: "Edificio Oposición, Piso 9",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/KATHIA LISBETH QUIROGA FERNÁNDEZ.png",
        comision:"Directiva Legislatura 2025-2026",
        comite:"",
        cargo:"Segunda Vicepresidencia"
      },
      { 
        id: 29, seatNumber: 31, curve: 'lower', side: 'right', 
        name: "Tomasa Yarhui Jacome", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Chuquisaca", age: 62, profession: "Abogada", 
        email: "tyarhui@senado.gob.bo", phone: "+591 77123456", office: "Edificio Oposición, Piso 8",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/TOMASA YARHUI JACOME.png",
        comision:"",
        comite:"Comité de Sistema Electoral, Derechos Humanos y Equidad Social",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 30, seatNumber: 32, curve: 'lower', side: 'right', 
        name: "Abdon Porcel Arancibia", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Chuquisaca", age: 57, profession: "Abogado", 
        email: "aporcel@senado.gob.bo", phone: "+591 78234567", office: "Edificio Oposición, Piso 8",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g1/ABDON PORCEL ARANCIBIA.png",
        comision:"",
        comite:"Comité de Políticas Financiera, Monetaria, Tributaria y Seguros",
        cargo:"Secretario de Comite"
      },
      { 
        id: 31, seatNumber: 33, curve: 'lower', side: 'right', 
        name: "Teresa Alarcón Arana", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Potosí", age: 56, profession: "Docente", 
        email: "talarcon@senado.gob.bo", phone: "+591 79345678", office: "Edificio Oposición, Piso 7",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/TERESA ALARCON ARANA.png",
        comision:"",
        comite:"Comité de Asuntos Exteriores Interpelatorios y Organismos Internacionales",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 32, seatNumber: 34, curve: 'lower', side: 'right', 
        name: "Betty Canaviri Villanueva", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Potosí", age: 53, profession: "Educadora", 
        email: "bcanaviri@senado.gob.bo", phone: "+591 70456789", office: "Edificio Oposición, Piso 7",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/BETTY CANAVIRI VILLANUEVA.png",
        comision:"",
        comite:"Comité de Economía Plural, Desarrollo Productivo, Obras Públicas e Infraestructura",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 33, seatNumber: 35, curve: 'lower', side: 'right', 
        name: "María Isabel Moreno Cortez", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Tarija", age: 50, profession: "Abogada", 
        email: "mimoreno@senado.gob.bo", phone: "+591 71567890", office: "Edificio Oposición, Piso 6",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g2/MARIA ISABEL MORENO CORTEZ.png",
        comision:"",
        comite:"Comité de Ministerio Público y Defensa Legal del Estado",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 34, seatNumber: 24, curve: 'lower', side: 'right', 
        name: "Ernesto Suarez Sattori", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Beni", age: 55, profession: "Empresario", 
        email: "esuarez@senado.gob.bo", phone: "+591 72678901", office: "Edificio Oposición, Piso 6",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/ERNESTO SUAREZ SATTORI.png",
        comision:"",
        comite:"Comité de Autonomías Departamentales",
        cargo:"Secretario de Comite"
      },
      
      // ============ LIBRE - 2 SENADORES ADICIONALES ============
      // ASIENTOS 24 y 25 (CURVA INFERIOR IZQUIERDA)
      { 
        id: 35, seatNumber: 28, curve: 'lower', side: 'left', 
        name: "Carol Carlo Durán", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Pando", age: 49, profession: "Abogado", 
        email: "ccarlo@senado.gob.bo", phone: "+591 73789012", office: "Edificio Oposición, Piso 5",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/CAROL CARLO DURAN.png",
        comision:"",
        comite:"Comité de Tierra y Territorio, Recursos Naturales y Hoja de la Coca",
        cargo:"Secretaria de Comite"
      },
      { 
        id: 36, seatNumber: 25, curve: 'lower', side: 'left', 
        name: "Julio Diego Romaña Galindo", 
        party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
        department: "Pando", age: 52, profession: "Abogado", 
        email: "jromana@senado.gob.bo", phone: "+591 74890123", office: "Edificio Oposición, Piso 5",
        twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
        youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
        photoUrl: "/new/titulares/g3/JULIO DIEGO ROMAÑA GALINDO.png",
        comision:"Directiva Legislatura 2025-2026",
        comite:"",
        cargo:"Segunda Secretaria"
      }
    ]
  },
  parties: {
    type: Array,
    default: () => [
      { id: 'Partido Demócrata Cristiano', name: 'Partido Demócrata Cristiano', shortName: 'PDC', symbol: '', color: '#016167', count: 16 },
      { id: 'Unidad', name: 'Unidad', shortName: 'UNIDAD', symbol: '', color: '#FFB848', count: 7 },
      { id: 'Autonomía para Bolivia Súmate', name: 'Autonomía para Bolivia Súmate', shortName: 'APB', symbol: '', color: '#511966', count: 1 },
      { id: 'Libre', name: 'Libre', shortName: 'LIBRE', symbol: '', color: '#FF0000', count: 12 }
    ]
  },
  showHeader: { type: Boolean, default: true },
  showFooter: { type: Boolean, default: true },
  showControls: { type: Boolean, default: true },
  initialShowLabels: { type: Boolean, default: false },
  backgroundImage: { type: String, default: '/Recurso1.png' },
  viewBox: { type: String, default: '250 200 700 400' }
})

const emit = defineEmits([
  'senator-selected',
  'senator-deselected',
  'party-filter-changed',
  'view-reset'
])

// Estado reactivo
const selectedSenator = ref(null)
const hoveredSeat = ref(null)
const activeFilters = ref([])
const showLabels = ref(props.initialShowLabels)
const tooltipStyle = reactive({ left: '0px', top: '0px' })
const svgElement = ref(null)

// Cache
const partyCountCache = reactive({})
const textColorCache = reactive({})

// ============================================
// COMPUTED - ASIGNACIÓN DIRECTA POR seatNumber
// ============================================
const allSeats = computed(() => {
  const seats = props.senators.map(senator => {
    let position = { x: 0, y: 0 }
    
    if (senator.seatNumber >= 1 && senator.seatNumber <= 7) {
      position = seatPositions.upperLeft[senator.seatNumber - 1]
    }
    else if (senator.seatNumber >= 8 && senator.seatNumber <= 14) {
      position = seatPositions.upperRight[senator.seatNumber - 8]
    }
    else if (senator.seatNumber >= 15 && senator.seatNumber <= 25) {
      position = seatPositions.lowerLeft[senator.seatNumber - 15]
    }
    else if (senator.seatNumber >= 26 && senator.seatNumber <= 36) {
      position = seatPositions.lowerRight[senator.seatNumber - 26]
    }
    
    return {
      ...senator,
      x: position.x,
      y: position.y
    }
  })
  
  if (activeFilters.value.length === 0) return seats
  
  const filterSet = new Set(activeFilters.value)
  return seats.filter(seat => filterSet.has(seat.party))
})

// ============================================
// MÉTODOS
// ============================================
const getFilteredCount = (partyId) => {
  if (activeFilters.value.length === 0) {
    if (!partyCountCache[partyId]) {
      partyCountCache[partyId] = props.parties.find(p => p.id === partyId)?.count || 
        props.senators.filter(s => s.party === partyId).length
    }
    return partyCountCache[partyId]
  }
  if (activeFilters.value.includes(partyId)) {
    return props.senators.filter(s => s.party === partyId).length
  }
  return 0
}

const getSeatColor = (seat) => {
  if (activeFilters.value.length > 0 && !activeFilters.value.includes(seat.party)) {
    return '#f3f4f6'
  }
  return seat.partyColor
}

const getTextColor = (bg) => {
  if (!textColorCache[bg]) {
    const hex = bg.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    textColorCache[bg] = lum > 0.5 ? '#000000' : '#ffffff'
  }
  return textColorCache[bg]
}

const formatInitials = (name) => {
  const parts = name.split(' ')
  if (parts.length >= 3) {
    return `${parts[0][0]}${parts[parts.length-2][0]}${parts[parts.length-1][0]}`.toUpperCase()
  }
  if (parts.length === 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

// ========== MANEJADOR DE ERRORES DE IMAGEN ==========
const handleImageError = (e) => {
  // Si la imagen falla (nunca debería pasar con randomuser.me), mostramos placeholder
  e.target.style.display = 'none'
  const parent = e.target.parentElement
  const fallback = document.createElement('div')
  fallback.className = 'photo-placeholder'
  fallback.style.backgroundColor = selectedSenator.value?.partyColor || '#575756'
  fallback.innerText = formatInitials(selectedSenator.value?.name || '')
  parent.appendChild(fallback)
}

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
  Object.keys(partyCountCache).forEach(key => delete partyCountCache[key])
  emit('party-filter-changed', activeFilters.value)
}

const resetView = () => {
  selectedSenator.value = null
  activeFilters.value = []
  hoveredSeat.value = null
  Object.keys(partyCountCache).forEach(key => delete partyCountCache[key])
  Object.keys(textColorCache).forEach(key => delete textColorCache[key])
  emit('view-reset')
}

// ========== TOOLTIP HANDLERS CORREGIDOS ==========
let hoverTimeout = null
let mouseMoveTimeout = null
let lastHoveredSeatId = null
let isUpdatingTooltip = false

const handleMouseEnter = (seat) => {
  if (!seat || selectedSenator.value?.id === seat.id) return
  
  hoveredSeat.value = seat
  lastHoveredSeatId = seat.id
  positionTooltipFromSeat()
}

const handleMouseLeave = () => {
  if (hoveredSeat.value?.id !== selectedSenator.value?.id) {
    hoveredSeat.value = null
    lastHoveredSeatId = null
  }
  if (hoverTimeout) clearTimeout(hoverTimeout)
}

const onMouseMove = (event) => {
  if (!mouseMoveTimeout && !isUpdatingTooltip) {
    mouseMoveTimeout = setTimeout(() => {
      if (hoveredSeat.value && hoveredSeat.value.id !== selectedSenator.value?.id) {
        updateHoverTooltip(event)
      }
      mouseMoveTimeout = null
    }, 16)
  }
}

const updateHoverTooltip = (event) => {
  // Verificaciones de seguridad
  if (!hoveredSeat.value || !svgElement.value || hoveredSeat.value.id !== lastHoveredSeatId) {
    return
  }
  
  if (isUpdatingTooltip) return
  isUpdatingTooltip = true
  
  requestAnimationFrame(() => {
    try {
      // Verificar nuevamente dentro del requestAnimationFrame
      if (!hoveredSeat.value || !svgElement.value) {
        isUpdatingTooltip = false
        return
      }
      
      const container = document.querySelector('.hemicycle-svg-container')
      if (!container) {
        isUpdatingTooltip = false
        return
      }
      
      const seat = hoveredSeat.value
      const svg = svgElement.value
      
      // Verificar que el seat tiene coordenadas
      if (typeof seat.x !== 'number' || typeof seat.y !== 'number') {
        isUpdatingTooltip = false
        return
      }
      
      const rect = container.getBoundingClientRect()
      
      // Verificar que el SVG tiene viewBox
      if (!svg.viewBox || !svg.viewBox.baseVal) {
        isUpdatingTooltip = false
        return
      }
      
      const viewBox = svg.viewBox.baseVal
      const svgRect = svg.getBoundingClientRect()
      
      // Evitar división por cero
      if (viewBox.width === 0 || viewBox.height === 0) {
        isUpdatingTooltip = false
        return
      }
      
      const xPercent = (seat.x - viewBox.x) / viewBox.width
      const yPercent = (seat.y - viewBox.y) / viewBox.height
      
      let x = xPercent * svgRect.width + (svgRect.left - rect.left) + 25
      let y = yPercent * svgRect.height + (svgRect.top - rect.top) - 100
      
      const tooltipWidth = 260
      const tooltipHeight = 180
      
      if (x + tooltipWidth > rect.width) x = rect.width - tooltipWidth - 10
      if (y + tooltipHeight > rect.height) y = rect.height - tooltipHeight - 10
      if (x < 10) x = 10
      if (y < 10) y = 10
      
      tooltipStyle.left = `${x}px`
      tooltipStyle.top = `${y}px`
    } catch (error) {
      console.warn('Error actualizando tooltip:', error)
    } finally {
      isUpdatingTooltip = false
    }
  })
}

const positionTooltipFromSeat = () => {
  // Crear un evento sintético para updateHoverTooltip
  const syntheticEvent = {
    clientX: 0,
    clientY: 0
  }
  updateHoverTooltip(syntheticEvent)
}

defineExpose({ 
  resetView, 
  selectSenator, 
  deselectSenator: () => selectedSenator.value = null 
})

onUnmounted(() => {
  if (hoverTimeout) clearTimeout(hoverTimeout)
  if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout)
})

watch(() => props.senators, () => {
  Object.keys(partyCountCache).forEach(key => delete partyCountCache[key])
}, { deep: false })
</script>

<style scoped>
/* ========== ESTILOS - IGUAL AL ORIGINAL ========== */
.senate-chamber {
  font-family: 'Montserrat';
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  display: flex; /* AÑADIDO: para estructura de columna */
  flex-direction: column; /* AÑADIDO: para que header, main, footer se apilen */
}

.chamber-header {
  height: auto;
  background: #575756;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex-shrink: 0; /* AÑADIDO: evita que el header se encoja */
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

.main-content {
  flex: 1 1 auto; /* AÑADIDO: toma el espacio disponible */
  min-height: 0; /* AÑADIDO: importante para flexbox */
}

.background-container {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;
  height: 100%; /* CAMBIADO: h-screen por h-full, pero ya hereda de main-content */
  display: flex; /* AÑADIDO: para centrar verticalmente */
  align-items: center; /* AÑADIDO: centra verticalmente el contenido */
  justify-content: center; /* AÑADIDO: centra horizontalmente (opcional) */
}

.columns-container {
  padding: 1.5em;
  position: relative;
  z-index: 1;
  width: 100%;
  /* ELIMINADO: min-height: 70vh */
}

.column {
  display: flex;
}

@media (max-width: 767px) {
  .left-column {
    display: none;
  }
}
.center-column { flex: 1; min-width: 0; z-index: 11}
.right-column { z-index: 10 }

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
}

.controls-panel {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
  width: 100%;
}

.controls-section h4 {
  display: no;
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
}

.hemicycle-svg-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible !important;
}

.hemicycle-svg {
  width: 100%;
  max-width: 100%;
  overflow: visible !important;
}

.info-panel {
  display: flex;
  flex-direction: column;
}

.senator-details {
  padding: 1.5em;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.senator-photo-container {
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.senator-photo-circle {
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.senator-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  font-weight: 700;
  color: white;
}

.senator-name {
  color: #575756;
  font-weight: 600;
  margin-bottom: .2em;
  line-height: 1.3;
  width: 100%;
  text-align: center;
}

.info-row-first {
  display: grid;
  gap: 1em;
  width: 100%;
  margin-bottom: .4em;
}

.info-item-red { text-align: left; width: 100%; }
.value-red {
  display: block;
  color: #E03636;
  font-size: 1.0em;
  font-weight: 700;
  text-align: center;
}

.info-row-second {
  /* display: grid;
  grid-template-columns: 1fr 1fr; */
  /* gap: 1em;
  width: 100%; */
  margin-bottom: 1em;
}

.pill-red {
  background-color: rgba(224, 54, 54, 0.85);
  color: white;
  border-radius: 1em;
  font-size: 0.8em;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: .5em;
}

.pill-purple {
  background-color: rgba(81, 25, 102, 0.85);
  color: white;
  padding: 0.2rem 0.25rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-bottom: 1rem;
}

.bancada-row { width: 100%; margin-bottom: 1em; }
.contact-section { width: 100%; margin-bottom: 1.5rem; }
.contact-item-white { text-align: left; margin-bottom: 0.75rem; width: 100%; }

.pill-white {
  background-color: white;
  color: #575756;
  padding: 0.15em 0.75em;
  border-radius: 7px;
  font-size: 0.8em;
  border: 1px solid #e5e7eb;
  font-weight: 500;
  width: 100%;
  text-align: center;
}

.social-media-section { width: 100%; margin-top: auto; }
.social-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}

.social-icon {
  font-size: 1.5rem;
  color: white;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  text-decoration: none;
}

.social-icon:hover {
  transform: scale(1.1);
  background-color: #b32b2b;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  color: white;
}

.senator-circle {
  cursor: pointer;
  transition: r 0.2s ease, stroke-width 0.2s ease;
  pointer-events: all !important;
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
  padding: 2em 1.5rem;
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
  font-size: 1.0em;
}

.empty-icon { font-size: 2.5em; margin-bottom: 1em; width: 100%; }
.empty-state h4 { margin: 0 0 0.5rem 0; color: #4b5563; font-size: 1.1em; width: 100%; }
.empty-state p { margin: 0 0 1rem 0; font-size: 0.9em; width: 100%; }

.empty-tips {
  text-align: left;
  background: #f9fafb;
  padding: 0.75em;
  border-radius: 6px;
  border-left: 3px solid #3b82f6;
  width: 100%;
}

.empty-tips p { margin: 0.4rem 0; font-size: 0.85em; width: 100%; }

/* Estilos para los indicadores de colores en empty-tips */
.empty-tips p {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 0.4em 0;
  font-size: 0.85em;
  width: 100%;
}

.party-indicator {
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.color-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.color-dot svg {
  width: 20px;
  height: 20px;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
}

.empty-tips p strong {
  color: #1f2937;
}

.chamber-footer {
  background: #1f2937;
  color: white;
  padding: 1rem 1.5rem;
  text-align: center;
  margin-top: 1rem;
  border-radius: 8px;
  flex-shrink: 0; /* AÑADIDO: evita que el footer se encoja */
}

.footer-content { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; }
.footer-info p { margin: 0.25rem 0; font-size: 0.9rem; }
.footer-main { font-weight: 600; }
.footer-sub { font-size: 0.8rem; opacity: 0.8; }
</style>