<template>
  <div class="senate-chamber">
    <!-- Header -->
    <header class="chamber-header">
      <div class="header-main">
        <div class="bolivia-flag">
          <div class="flag-red"></div>
          <div class="flag-yellow"></div>
          <div class="flag-green"></div>
          <div class="flag-star">★</div>
        </div>
        <div class="header-titles">
          <h1>Estado Plurinacional de Bolivia</h1>
          <h2>Cámara de Senadores</h2>
          <p class="session-info">Sesión Ordinaria - Legislatura 2025</p>
        </div>
      </div>
      <div class="header-stats">
        <div class="stat">
          <div class="stat-number">36</div>
          <div class="stat-label">Senadores</div>
        </div>
        <div class="stat">
          <div class="stat-number">2</div>
          <div class="stat-label">Curvas</div>
        </div>
        <div class="stat">
          <div class="stat-number">7/11</div>
          <div class="stat-label">por Lado</div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- Controles -->
      <div class="controls-panel">
        <div class="search-container">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Buscar senador por nombre, departamento o partido..."
            class="search-input"
          />
          <button class="search-btn">🔍</button>
        </div>
        
        <div class="filter-controls">
          <div class="party-filters">
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
            <button @click="resetView" class="view-btn">
              <span>🔄 Vista completa</span>
            </button>
            <button @click="toggleLabels" class="view-btn">
              <span>{{ showLabels ? '🙈 Ocultar nombres' : '👁️ Mostrar nombres' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Hemiciclo Principal -->
      <div class="hemicycle-container">
        <div class="hemicycle-header">
          <h3>🏛️ Distribución con Curvas Ajustadas</h3>
          <div class="hemicycle-info">
            <div class="info-item">
              <span>🎯 Curva Superior: 14 senadores (7 izquierda + 7 derecha)</span>
              <span>🎯 Curva Inferior: 22 senadores (11 izquierda + 11 derecha)</span>
            </div>
          </div>
        </div>

        <!-- Mesa Directiva -->
        <div class="presidency-north">
          <div class="president-desk">
            <div class="desk-icon">👑</div>
            <div class="desk-info">
              <div class="president-name">David Choquehuanca</div>
              <div class="president-title">Presidente del Senado</div>
            </div>
          </div>
          <div class="secretary-desks">
            <div class="secretary">
              <div class="secretary-icon">📝</div>
              <div>Secretaría</div>
            </div>
            <div class="secretary">
              <div class="secretary-icon">📋</div>
              <div>Mesa Directiva</div>
            </div>
          </div>
        </div>

        <!-- SVG con CURVAS AJUSTADAS -->
        <div class="hemicycle-svg-container">
          <svg 
            class="hemicycle-svg"
            viewBox="0 0 1200 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="circleShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.1)"/>
              </filter>
              
              <linearGradient id="aisleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#e2e8f0"/>
                <stop offset="100%" stop-color="#cbd5e1"/>
              </linearGradient>
            </defs>

            <!-- Fondo -->
            <rect x="0" y="0" width="1200" height="800" fill="#ffffff"/>

            <!-- Pasillo central -->
            <rect x="595" y="100" width="10" height="600" fill="url(#aisleGradient)" stroke="#94a3b8" stroke-width="2"/>
            <text x="600" y="90" text-anchor="middle" fill="#64748b" font-size="16" font-weight="600">
              🚫 PASILLO CENTRAL 🚫
            </text>
            <text x="600" y="710" text-anchor="middle" fill="#64748b" font-size="14" font-weight="500">
              Entrada/Salida
            </text>

            <!-- CURVA SUPERIOR AJUSTADA -->
            <!-- Lado Izquierdo Curva Superior (7 círculos) -->
            <g v-for="(seat, index) in upperCurveLeftSeats" :key="seat.id">
              <circle
                :cx="seat.x"
                :cy="seat.y"
                r="24" 
                :fill="getSeatColor(seat)"
                :stroke="getSeatStroke(seat)"
                :stroke-width="selectedSenator?.id === seat.id ? '3' : '1.5'"
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
              
              <text
                v-if="showLabels"
                :x="seat.x"
                :y="seat.y + 35"
                text-anchor="middle"
                fill="#374151"
                font-size="10"
                font-weight="500"
                class="senator-initials"
              >
                {{ seat.initials }}
              </text>
            </g>

            <!-- Lado Derecho Curva Superior (7 círculos) -->
            <g v-for="(seat, index) in upperCurveRightSeats" :key="seat.id">
              <circle
                :cx="seat.x"
                :cy="seat.y"
                r="24"
                :fill="getSeatColor(seat)"
                :stroke="getSeatStroke(seat)"
                :stroke-width="selectedSenator?.id === seat.id ? '3' : '1.5'"
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
              
              <text
                v-if="showLabels"
                :x="seat.x"
                :y="seat.y + 35"
                text-anchor="middle"
                fill="#374151"
                font-size="10"
                font-weight="500"
                class="senator-initials"
              >
                {{ seat.initials }}
              </text>
            </g>

            <!-- CURVA INFERIOR AJUSTADA -->
            <!-- Lado Izquierdo Curva Inferior (11 círculos) -->
            <g v-for="(seat, index) in lowerCurveLeftSeats" :key="seat.id">
              <circle
                :cx="seat.x"
                :cy="seat.y"
                r="24" 
                :fill="getSeatColor(seat)"
                :stroke="getSeatStroke(seat)"
                :stroke-width="selectedSenator?.id === seat.id ? '3' : '1.5'"
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
              
              <text
                v-if="showLabels"
                :x="seat.x"
                :y="seat.y + 35"
                text-anchor="middle"
                fill="#374151"
                font-size="10"
                font-weight="500"
                class="senator-initials"
              >
                {{ seat.initials }}
              </text>
            </g>

            <!-- Lado Derecho Curva Inferior (11 círculos) -->
            <g v-for="(seat, index) in lowerCurveRightSeats" :key="seat.id">
              <circle
                :cx="seat.x"
                :cy="seat.y"
                r="24"
                :fill="getSeatColor(seat)"
                :stroke="getSeatStroke(seat)"
                :stroke-width="selectedSenator?.id === seat.id ? '3' : '1.5'"
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
              
              <text
                v-if="showLabels"
                :x="seat.x"
                :y="seat.y + 35"
                text-anchor="middle"
                fill="#374151"
                font-size="10"
                font-weight="500"
                class="senator-initials"
              >
                {{ seat.initials }}
              </text>
            </g>

            <!-- Líneas curvas guía -->
            <path d="M 250,270 Q 600,320 950,270" 
              fill="none" stroke="#e5e7eb" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="250" y="260" text-anchor="start" fill="#3b82f6" font-size="11">
              Curva Superior (14 senadores)
            </text>
            
            <path d="M 150,470 Q 600,530 1050,470" 
              fill="none" stroke="#e5e7eb" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="150" y="460" text-anchor="start" fill="#dc2626" font-size="11">
              Curva Inferior (22 senadores)
            </text>

            <!-- Flecha de orientación -->
            <path d="M 600,80 L 600,110 M 600,80 L 590,100 M 600,80 L 610,100" 
              stroke="#1e40af" stroke-width="3" fill="none"/>
            <text x="600" y="70" text-anchor="middle" fill="#1e40af" font-size="18" font-weight="700">
              ↑ PRESIDENCIA ↑
            </text>
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
                <span class="label">Curva:</span>
                <span class="value">{{ hoveredSeat.curve === 'upper' ? 'Superior' : 'Inferior' }}</span>
              </div>
              <div class="info-row">
                <span class="label">Lado:</span>
                <span class="value">{{ hoveredSeat.side === 'left' ? 'Izquierdo' : 'Derecho' }}</span>
              </div>
              <div class="hint">👆 Click para detalles completos</div>
            </div>
          </div>
        </div>

        <!-- Leyenda -->
        <div class="party-legend">
          <h4>🎨 Distribución por Partido Político</h4>
          <div class="legend-items">
            <div 
              v-for="party in parties"
              :key="party.id"
              class="legend-item"
              @click="highlightParty(party.id)"
              :class="{ 'highlighted': highlightedParty === party.id }"
            >
              <div class="legend-color" :style="{ backgroundColor: party.color }">
                <span class="legend-symbol">{{ party.symbol }}</span>
              </div>
              <div class="legend-details">
                <div class="legend-name">{{ party.name }}</div>
                <div class="legend-stats">
                  <span>{{ party.count }} senadores</span>
                  <span>{{ Math.round((party.count / 36) * 100) }}%</span>
                </div>
                <div class="legend-position">{{ party.position }}</div>
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
                  {{ selectedSenator.initials }}
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
            <p><strong>🎯 Curva Superior:</strong> 14 senadores (7 izquierda + 7 derecha)</p>
            <p><strong>🎯 Curva Inferior:</strong> 22 senadores (11 izquierda + 11 derecha)</p>
            <p><strong>🚫 Pasillo Central:</strong> Separación sin asientos entre ambas mitades</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="chamber-footer">
      <div class="footer-content">
        <div class="footer-logo">🏛️</div>
        <div class="footer-info">
          <p>Cámara de Senadores de Bolivia</p>
          <p class="footer-sub">Plaza Murillo, La Paz - Estado Plurinacional de Bolivia</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'

// Datos de los 36 senadores (se mantienen igual)
const senatorsData = ref([
  // CURVA SUPERIOR: 14 senadores (1-14)
  // Lado izquierdo Curva Superior: 7 senadores (1-7)
  { id: 1, name: "María Eugenia Choque", seatNumber: 1, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "La Paz", initials: "MEC", age: 52,
    profession: "Socióloga", period: "2020-2025",
    commissions: ["Constitución", "Derechos Humanos"],
    email: "mchoque@senado.bo", phone: "(591-2) 220-0001",
    office: "Edificio A, Oficina 101"
  },
  { id: 2, name: "Juan Carlos García", seatNumber: 2, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Santa Cruz", initials: "JCG", age: 48,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 3, name: "Ana María Rojas", seatNumber: 3, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Cochabamba", initials: "AMR", age: 45,
    profession: "Educadora", period: "2020-2025"
  },
  { id: 4, name: "Luisa Mamani", seatNumber: 4, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Oruro", initials: "LM", age: 55,
    profession: "Médica", period: "2020-2025"
  },
  { id: 5, name: "Carlos Fernández", seatNumber: 5, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Potosí", initials: "CF", age: 50,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 6, name: "Patricia Flores", seatNumber: 6, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Tarija", initials: "PF", age: 47,
    profession: "Economista", period: "2020-2025"
  },
  { id: 7, name: "Miguel Ángel López", seatNumber: 7, curve: 'upper', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Chuquisaca", initials: "ML", age: 53,
    profession: "Abogado", period: "2020-2025"
  },
  
  // Lado derecho Curva Superior: 7 senadores (8-14)
  { id: 8, name: "Carlos Alberto Mesa", seatNumber: 8, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "La Paz", initials: "CAM", age: 48,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 9, name: "Roberto Fernández", seatNumber: 9, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Tarija", initials: "RF", age: 55,
    profession: "Ingeniero Civil", period: "2020-2025"
  },
  { id: 10, name: "José Luis Paredes", seatNumber: 10, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Chuquisaca", initials: "JLP", age: 56,
    profession: "Economista", period: "2020-2025"
  },
  { id: 11, name: "Ricardo Morales", seatNumber: 11, curve: 'upper', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Cochabamba", initials: "RM", age: 49,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 12, name: "Fernando Vargas", seatNumber: 12, curve: 'upper', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "Santa Cruz", initials: "FV", age: 45,
    profession: "Empresario", period: "2020-2025"
  },
  { id: 13, name: "Marta Quispe", seatNumber: 13, curve: 'upper', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "La Paz", initials: "MQ", age: 38,
    profession: "Médica", period: "2020-2025"
  },
  { id: 14, name: "Felipe Mendoza", seatNumber: 14, curve: 'upper', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
    department: "Santa Cruz", initials: "FM", age: 42,
    profession: "Ingeniero", period: "2020-2025"
  },

  // CURVA INFERIOR: 22 senadores (15-36)
  // Lado izquierdo Curva Inferior: 11 senadores (15-25)
  { id: 15, name: "Susana Méndez", seatNumber: 15, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Beni", initials: "SM", age: 44,
    profession: "Administradora", period: "2020-2025"
  },
  { id: 16, name: "Alberto Gutiérrez", seatNumber: 16, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Pando", initials: "AG", age: 56,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 17, name: "Carmen Rosa Sánchez", seatNumber: 17, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "La Paz", initials: "CS", age: 49,
    profession: "Periodista", period: "2020-2025"
  },
  { id: 18, name: "Jorge Luis Pérez", seatNumber: 18, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Santa Cruz", initials: "JP", age: 51,
    profession: "Empresario", period: "2020-2025"
  },
  { id: 19, name: "Gabriela Torres", seatNumber: 19, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Cochabamba", initials: "GT", age: 46,
    profession: "Abogada", period: "2020-2025"
  },
  { id: 20, name: "Raúl Castro", seatNumber: 20, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Oruro", initials: "RC", age: 54,
    profession: "Sociólogo", period: "2020-2025"
  },
  { id: 21, name: "Elizabeth Ríos", seatNumber: 21, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Potosí", initials: "ER", age: 43,
    profession: "Educadora", period: "2020-2025"
  },
  { id: 22, name: "Mario Vargas", seatNumber: 22, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Tarija", initials: "MV", age: 52,
    profession: "Médico", period: "2020-2025"
  },
  { id: 23, name: "Silvia Fernández", seatNumber: 23, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Chuquisaca", initials: "SF", age: 48,
    profession: "Abogada", period: "2020-2025"
  },
  { id: 24, name: "Pedro Castillo", seatNumber: 24, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Beni", initials: "PC", age: 55,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 25, name: "Claudia Paz", seatNumber: 25, curve: 'lower', side: 'left',
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#dc2626",
    department: "Pando", initials: "CP", age: 44,
    profession: "Economista", period: "2020-2025"
  },
  
  // Lado derecho Curva Inferior: 11 senadores (26-36)
  { id: 26, name: "Victoria Choque", seatNumber: 26, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "La Paz", initials: "VC", age: 45,
    profession: "Abogada", period: "2020-2025"
  },
  { id: 27, name: "Walter Álvarez", seatNumber: 27, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Santa Cruz", initials: "WA", age: 52,
    profession: "Empresario", period: "2020-2025"
  },
  { id: 28, name: "Natalia Gutiérrez", seatNumber: 28, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Beni", initials: "NG", age: 46,
    profession: "Médica", period: "2020-2025"
  },
  { id: 29, name: "Óscar Paredes", seatNumber: 29, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Oruro", initials: "OP", age: 54,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 30, name: "Rosa María López", seatNumber: 30, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Potosí", initials: "RL", age: 50,
    profession: "Educadora", period: "2020-2025"
  },
  { id: 31, name: "Héctor Vásquez", seatNumber: 31, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Pando", initials: "HV", age: 53,
    profession: "Ingeniero", period: "2020-2025"
  },
  { id: 32, name: "Karen Salazar", seatNumber: 32, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Tarija", initials: "KS", age: 44,
    profession: "Periodista", period: "2020-2025"
  },
  { id: 33, name: "Andrés Romero", seatNumber: 33, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "La Paz", initials: "AR", age: 50,
    profession: "Abogado", period: "2020-2025"
  },
  { id: 34, name: "Daniela Mendoza", seatNumber: 34, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Santa Cruz", initials: "DM", age: 47,
    profession: "Administradora", period: "2020-2025"
  },
  { id: 35, name: "Luis Fernando Arce", seatNumber: 35, curve: 'lower', side: 'right',
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563eb",
    department: "Cochabamba", initials: "LA", age: 53,
    profession: "Economista", period: "2020-2025"
  },
  { id: 36, name: "Carolina Herrera", seatNumber: 36, curve: 'lower', side: 'right',
    party: "Creemos", partyShort: "CRE", partyColor: "#f97316",
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
    {x: 300, y: 280},
    {x: 350, y: 295},
    {x: 400, y: 310},  // Centro: mantiene
    {x: 450, y: 305},
    {x: 500, y: 295},
    {x: 550, y: 285}   // Asiento 7: MÁS ABAJO (285)
  ]
  
  // Lado derecho Curva Superior - AJUSTES: 14 más arriba, 8 más abajo
  const upperRightPositions = [
    {x: 650, y: 285},  // Asiento 8: MÁS ABAJO (285)
    {x: 700, y: 295},
    {x: 750, y: 305},
    {x: 800, y: 310},  // Centro: mantiene
    {x: 850, y: 295},
    {x: 900, y: 280},
    {x: 950, y: 265}   // Asiento 14: MÁS ARRIBA (265)
  ]
  
  // CURVA INFERIOR CON AJUSTES ESPECÍFICOS
  // Lado izquierdo Curva Inferior - AJUSTES: 15 más arriba, 25 más abajo
  const lowerLeftPositions = [
    {x: 150, y: 465},  // Asiento 15: MÁS ARRIBA (465)
    {x: 200, y: 475},
    {x: 250, y: 485},
    {x: 300, y: 495},
    {x: 350, y: 505},
    {x: 400, y: 515},  // Centro
    {x: 450, y: 525},
    {x: 500, y: 530},
    {x: 550, y: 535},
    {x: 600, y: 540},
    {x: 650, y: 545}   // Asiento 25: MÁS ABAJO (545)
  ]
  
  // Lado derecho Curva Inferior - AJUSTES: 36 más arriba, 26 más abajo
  const lowerRightPositions = [
    {x: 550, y: 545},  // Asiento 26: MÁS ABAJO (545)
    {x: 600, y: 540},
    {x: 650, y: 535},
    {x: 700, y: 530},
    {x: 750, y: 525},
    {x: 800, y: 515},  // Centro
    {x: 850, y: 505},
    {x: 900, y: 495},
    {x: 950, y: 485},
    {x: 1000, y: 475},
    {x: 1050, y: 465}  // Asiento 36: MÁS ARRIBA (465)
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
  if (highlightedParty.value && seat.party !== highlightedParty.value) {
    return '#f3f4f6'
  }
  return seat.partyColor
}

const getSeatStroke = (seat) => {
  if (selectedSenator.value?.id === seat.id) return '#f59e0b'
  if (hoveredSeat.value?.id === seat.id) return '#3b82f6'
  if (highlightedParty.value && seat.party === highlightedParty.value) {
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
/* TODOS los estilos CSS se mantienen EXACTAMENTE iguales, solo ajusté el radio de círculos y tamaños de texto */
.senate-chamber {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chamber-header {
  background: linear-gradient(to right, #007934 0%, #F9B233 50%, #D52B1E 100%);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-main {
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

.flag-red, .flag-yellow, .flag-green {
  height: 33.33%;
}

.flag-red { background: #D52B1E; }
.flag-yellow { background: #F9B233; }
.flag-green { background: #007934; }

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
  font-size: 1.5rem;
  font-weight: 700;
}

.header-titles h2 {
  margin: 0.25rem 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.session-info {
  margin: 0.25rem 0 0 0;
  font-size: 0.85rem;
  opacity: 0.9;
}

.header-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-top: 0.25rem;
  text-align: center;
}

.controls-panel {
  background: white;
  margin: 1.5rem 2rem;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-container {
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
  font-size: 1.2rem;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.party-filters {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-weight: 600;
  color: #4b5563;
  white-space: nowrap;
}

.party-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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
  transition: transform 0.2s;
}

.party-btn:hover { transform: translateY(-1px); }
.party-btn.active {
  outline: 3px solid #4b5563;
  outline-offset: 2px;
}

.party-name { font-size: 0.9rem; }
.party-count {
  background: rgba(255, 255, 255, 0.3);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
}

.view-controls { display: flex; gap: 0.5rem; }

.view-btn {
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  color: #4b5563;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

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
}

.hemicycle-header h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.3rem;
}

.hemicycle-info { font-size: 0.9rem; color: #6b7280; }
.info-item { display: flex; gap: 1rem; }

.presidency-north {
  padding: 1.5rem;
  background: linear-gradient(to bottom, #fef3c7, #fde68a);
  border-bottom: 2px solid #fbbf24;
  text-align: center;
}

.president-desk {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.desk-icon { font-size: 2.5rem; }
.desk-info { text-align: center; }

.president-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #92400e;
  margin-bottom: 0.25rem;
}

.president-title {
  color: #b45309;
  font-size: 0.9rem;
}

.secretary-desks {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.secretary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #92400e;
  font-size: 0.85rem;
}

.secretary-icon { font-size: 1.2rem; }

.hemicycle-svg-container {
  position: relative;
  padding: 2rem;
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
}

.hemicycle-svg {
  width: 100%;
  max-width: 1000px;
  height: auto;
}

/* CÍRCULOS MÁS PEQUEÑOS */
.senator-circle {
  cursor: pointer;
  transition: all 0.2s ease;
}

.senator-circle:hover {
  stroke-width: 3px;
  transform: scale(1.05);
}

.senator-circle.selected {
  stroke: #f59e0b;
  stroke-width: 3px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { stroke-width: 3px; }
  50% { stroke-width: 5px; }
  100% { stroke-width: 3px; }
}

.senator-circle.hovered {
  stroke: #3b82f6;
  stroke-width: 3px;
}

.seat-number, .senator-initials {
  user-select: none;
  pointer-events: none;
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

.party-legend {
  padding: 1.5rem;
  background: #f9fafb;
  border-top: 2px solid #e5e7eb;
}

.party-legend h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.1rem;
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
  border-radius: 10px;
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
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.legend-symbol {
  font-size: 1.5rem;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.legend-details { flex: 1; }

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
  margin-bottom: 0.25rem;
}

.legend-position {
  font-size: 0.8rem;
  color: #9ca3af;
  font-style: italic;
}

.info-panel {
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

.panel-header h3 { margin: 0; font-size: 1.3rem; }

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

.close-btn:hover { background: rgba(255, 255, 255, 0.25); }

.senator-details { padding: 2rem; }

.senator-header {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

@media (max-width: 1024px) {
  .senator-header { grid-template-columns: 1fr; }
}

.photo-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.photo-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.senator-photo {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.senator-badges {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.badge.party { color: white; }
.badge.department {
  background: #e0f2fe;
  color: #0369a1;
}

.badge.curve-location {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.seat-info { display: flex; justify-content: center; }

.info-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.card-icon { font-size: 1.5rem; }

.card-content { display: flex; flex-direction: column; }

.card-value {
  font-weight: 700;
  color: #1f2937;
  font-size: 1.1rem;
}

.card-label {
  font-size: 0.9rem;
  color: #6b7280;
}

.senator-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.senator-info h2 {
  margin: 0;
  color: #1f2937;
  font-size: 1.8rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
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

.contact-section h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.1rem;
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

.contact-item:last-child { border-bottom: none; }

.contact-item .label { color: #6b7280; }
.contact-item .value { font-weight: 500; color: #1f2937; }

.commissions-section { margin-top: 2rem; }

.commissions-section h4 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.1rem;
}

.commissions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.commission-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.commission-icon { font-size: 1.2rem; }
.commission-name { font-weight: 500; color: #4b5563; }

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
  margin: 0 0 1.5rem 0;
  max-width: 400px;
  margin: 0 auto 1.5rem;
}

.empty-tips {
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.empty-tips p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.chamber-footer {
  background: #1f2937;
  color: white;
  padding: 1.5rem 2rem;
  text-align: center;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.footer-logo { font-size: 2rem; }

.footer-info p { margin: 0.25rem 0; }

.footer-sub {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .chamber-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .filter-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .party-filters {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .hemicycle-container,
  .controls-panel,
  .info-panel {
    margin: 1rem;
  }
  
  .info-grid { grid-template-columns: 1fr; }
  
  .hemicycle-svg-container {
    padding: 1rem;
    min-height: 600px;
  }
  
  .senator-badges {
    flex-direction: column;
    align-items: center;
  }
  
  .party-buttons { justify-content: center; }
}

@media (max-width: 480px) {
  .header-titles h1 { font-size: 1.2rem; }
  .header-titles h2 { font-size: 1rem; }
  
  .header-stats {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  
  .stat {
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
  
  .stat-number { font-size: 1.5rem; }
  
  .info-grid { grid-template-columns: 1fr; }
  
  .photo-section { align-items: center; }
  
  .senator-photo {
    width: 150px;
    height: 150px;
    font-size: 2.5rem;
  }
  
  .party-buttons { flex-direction: column; }
  .party-btn { justify-content: center; }
  
  .view-controls { flex-direction: column; }
}
</style>