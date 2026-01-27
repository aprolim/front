<template>
  <div class="senate-chamber">
    <!-- Encabezado con bandera y datos oficiales -->
    <header class="chamber-header">
      <div class="bolivia-header">
        <div class="flag-container">
          <div class="bolivia-flag">
            <div class="flag-stripe red"></div>
            <div class="flag-stripe yellow"></div>
            <div class="flag-stripe green"></div>
            <div class="flag-emblem">★</div>
          </div>
          <div class="flag-shadow"></div>
        </div>
        <div class="chamber-titles">
          <h1 class="state-title">Estado Plurinacional de Bolivia</h1>
          <h2 class="chamber-title">Cámara de Senadores</h2>
          <div class="legislative-info">
            <span class="session-badge">📅 Sesión Ordinaria 2025</span>
            <span class="seats-info">🪑 36 Senadores · 9 Departamentos</span>
          </div>
        </div>
      </div>
      
      <div class="header-stats">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <div class="stat-number">36</div>
            <div class="stat-label">Total Senadores</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏛️</div>
          <div class="stat-content">
            <div class="stat-number">3</div>
            <div class="stat-label">Partidos</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-number">21</div>
            <div class="stat-label">Mayoría MAS</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenido principal -->
    <main class="chamber-main">
      <!-- Controles superiores -->
      <div class="controls-panel">
        <div class="search-box">
          <div class="search-icon">🔍</div>
          <input 
            v-model="searchQuery"
            type="search" 
            placeholder="Buscar senador por nombre, departamento o partido..."
            class="search-input"
          />
          <div class="search-hint">Presiona Enter para buscar</div>
        </div>
        
        <div class="controls-group">
          <div class="filter-buttons">
            <button 
              v-for="party in parties"
              :key="party.id"
              @click="togglePartyFilter(party.id)"
              :class="['party-btn', { 'active': activeFilters.includes(party.id) }]"
              :style="{
                '--party-color': party.color,
                'background-color': party.color
              }"
            >
              <span class="party-symbol">{{ party.symbol }}</span>
              <span class="party-name">{{ party.shortName }}</span>
              <span class="party-count">{{ party.count }}</span>
            </button>
          </div>
          
          <div class="view-options">
            <button @click="resetView" class="view-btn">
              <span class="btn-icon">🔄</span>
              <span class="btn-text">Reiniciar Vista</span>
            </button>
            <button @click="toggleLabels" class="view-btn">
              <span class="btn-icon">{{ showLabels ? '🙈' : '👁️' }}</span>
              <span class="btn-text">{{ showLabels ? 'Ocultar Nombres' : 'Mostrar Nombres' }}</span>
            </button>
            <button @click="toggleHighlightMode" class="view-btn">
              <span class="btn-icon">{{ highlightMode ? '🎯' : '✨' }}</span>
              <span class="btn-text">{{ highlightMode ? 'Quitar Destacado' : 'Destacar Partido' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Distribución del hemiciclo -->
      <div class="hemicycle-section">
        <div class="hemicycle-container">
          <!-- Título del hemiciclo -->
          <div class="hemicycle-title">
            <h3>🏛️ Distribución de Asientos - Hemiciclo del Senado</h3>
            <div class="hemicycle-info">
              <div class="info-item">
                <span class="info-label">Presidencia:</span>
                <span class="info-value">Centro Superior</span>
              </div>
              <div class="info-item">
                <span class="info-label">Orden:</span>
                <span class="info-value">De izquierda a derecha por partido</span>
              </div>
            </div>
          </div>

          <!-- Hemiciclo SVG con distribución real -->
          <div class="hemicycle-visualization">
            <!-- Mesa Directiva (Presidencia) -->
            <div class="presidency-desk">
              <div class="president-chair">
                <div class="chair-design"></div>
                <div class="chair-label">
                  <div class="president-icon">👑</div>
                  <div class="president-title">Presidencia</div>
                  <div class="president-name">David Choquehuanca</div>
                  <div class="president-role">Presidente del Senado</div>
                </div>
              </div>
              <div class="vice-presidents">
                <div class="vice-chair">
                  <div class="chair-icon">👔</div>
                  <div class="chair-text">1° Vicepresidente</div>
                </div>
                <div class="vice-chair">
                  <div class="chair-icon">👔</div>
                  <div class="chair-text">2° Vicepresidente</div>
                </div>
              </div>
            </div>

            <!-- SVG del hemiciclo con distribución real -->
            <div class="hemicycle-svg-container">
              <svg 
                class="hemicycle-svg"
                viewBox="0 0 1000 500"
                @mousemove="handleMouseMove"
              >
                <!-- Fondo del hemiciclo -->
                <defs>
                  <radialGradient id="hemicycleBg" cx="50%" cy="40%" r="50%">
                    <stop offset="0%" stop-color="#f0f4f8" stop-opacity="1"/>
                    <stop offset="100%" stop-color="#e1e8f0" stop-opacity="1"/>
                  </radialGradient>
                  <filter id="seatShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.15)"/>
                  </filter>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                </defs>

                <!-- Fondo del hemiciclo -->
                <path 
                  d="M 100,350 Q 500,50 900,350 L 900,450 Q 500,150 100,450 Z" 
                  fill="url(#hemicycleBg)" 
                  stroke="#cbd5e1" 
                  stroke-width="2"
                  class="hemicycle-bg"
                />

                <!-- Líneas guía del hemiciclo -->
                <path 
                  d="M 100,350 Q 500,50 900,350" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  stroke-width="1" 
                  stroke-dasharray="5,5"
                  class="hemicycle-line"
                />
                <path 
                  d="M 150,375 Q 500,100 850,375" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  stroke-width="1" 
                  stroke-dasharray="5,5"
                  class="hemicycle-line"
                />
                <path 
                  d="M 200,400 Q 500,150 800,400" 
                  fill="none" 
                  stroke="#e2e8f0" 
                  stroke-width="1" 
                  stroke-dasharray="5,5"
                  class="hemicycle-line"
                />

                <!-- Asientos distribuidos en hemiciclo real -->
                <!-- Fila 1 (más cerca de la presidencia) -->
                <g v-for="(row, rowIndex) in seatRows" :key="rowIndex">
                  <g v-for="(seat, seatIndex) in row" :key="seat.id">
                    <!-- Asiento individual -->
                    <g 
                      :transform="`translate(${seat.x}, ${seat.y})`"
                      @click="selectSenator(seat)"
                      @mouseenter="hoveredSeat = seat"
                      @mouseleave="hoveredSeat = null"
                      class="seat-group"
                      :class="{
                        'selected': selectedSenator?.id === seat.id,
                        'hovered': hoveredSeat?.id === seat.id,
                        'highlighted': highlightMode && seat.party === highlightedParty
                      }"
                    >
                      <!-- Silla del asiento -->
                      <path
                        d="M -20,-15 C -20,-25 20,-25 20,-15 L 20,15 C 20,25 -20,25 -20,15 Z"
                        :fill="getSeatColor(seat)"
                        :stroke="getSeatStroke(seat)"
                        :stroke-width="selectedSenator?.id === seat.id ? '3' : '1.5'"
                        class="seat-chair"
                        filter="url(#seatShadow)"
                      />
                      
                      <!-- Respaldo de la silla -->
                      <rect
                        x="-18"
                        y="-13"
                        width="36"
                        height="26"
                        :fill="getSeatBackColor(seat)"
                        rx="3"
                        class="seat-back"
                      />
                      
                      <!-- Número del asiento -->
                      <text
                        x="0"
                        y="5"
                        text-anchor="middle"
                        :fill="getSeatTextColor(seat)"
                        font-size="10"
                        font-weight="bold"
                        class="seat-number"
                      >
                        {{ seat.seatNumber }}
                      </text>
                      
                      <!-- Indicador de partido (esquina) -->
                      <circle
                        cx="15"
                        cy="-10"
                        r="5"
                        :fill="seat.partyColor"
                        stroke="white"
                        stroke-width="1.5"
                        class="party-indicator"
                      />
                      
                      <!-- Indicador de selección -->
                      <circle
                        v-if="selectedSenator?.id === seat.id"
                        cx="0"
                        cy="0"
                        r="30"
                        fill="none"
                        stroke="#f59e0b"
                        stroke-width="2"
                        stroke-dasharray="5,5"
                        class="selection-ring"
                      />
                    </g>
                    
                    <!-- Nombre del senador (visible cuando showLabels es true) -->
                    <g v-if="showLabels && seat.occupied">
                      <text
                        :x="seat.x"
                        :y="seat.y + 40"
                        text-anchor="middle"
                        fill="#374151"
                        font-size="9"
                        font-weight="500"
                        class="senator-label"
                      >
                        {{ seat.initials }}
                      </text>
                      <text
                        :x="seat.x"
                        :y="seat.y + 52"
                        text-anchor="middle"
                        fill="#6b7280"
                        font-size="8"
                        class="party-label"
                      >
                        {{ seat.partyShort }}
                      </text>
                    </g>
                  </g>
                </g>

                <!-- Etiquetas de posición -->
                <text x="100" y="480" fill="#4b5563" font-size="12" font-weight="600" class="position-label">
                  ← Izquierda
                </text>
                <text x="900" y="480" fill="#4b5563" font-size="12" font-weight="600" text-anchor="end" class="position-label">
                  Derecha →
                </text>
                <text x="500" y="480" fill="#4b5563" font-size="12" font-weight="600" text-anchor="middle" class="position-label">
                  Centro
                </text>
              </svg>

              <!-- Tooltip flotante -->
              <div 
                v-if="hoveredSeat && !selectedSenator" 
                class="seat-tooltip"
                :style="tooltipStyle"
              >
                <div class="tooltip-header">
                  <div class="seat-marker" :style="{ backgroundColor: hoveredSeat.partyColor }">
                    {{ hoveredSeat.seatNumber }}
                  </div>
                  <div class="senator-info">
                    <h4>{{ hoveredSeat.name }}</h4>
                    <div class="party-badge" :style="{ backgroundColor: hoveredSeat.partyColor }">
                      {{ hoveredSeat.party }}
                    </div>
                  </div>
                </div>
                <div class="tooltip-body">
                  <div class="info-row">
                    <span class="info-icon">📍</span>
                    <span class="info-text">{{ hoveredSeat.department }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-icon">🏛️</span>
                    <span class="info-text">{{ hoveredSeat.commissions?.length || 0 }} comisiones</span>
                  </div>
                  <div class="tooltip-hint">
                    <span class="hint-icon">👆</span>
                    <span class="hint-text">Click para detalles completos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Leyenda interactiva -->
          <div class="hemicycle-legend">
            <h4 class="legend-title">🎨 Distribución por Partido Político</h4>
            <div class="legend-content">
              <div 
                v-for="party in parties"
                :key="party.id"
                class="legend-item"
                @click="highlightParty(party.id)"
                :class="{ 'active': highlightedParty === party.id }"
              >
                <div class="legend-color" :style="{ backgroundColor: party.color }">
                  <div class="legend-symbol">{{ party.symbol }}</div>
                </div>
                <div class="legend-details">
                  <div class="legend-name">{{ party.name }}</div>
                  <div class="legend-stats">
                    <span class="legend-count">{{ party.count }} senadores</span>
                    <span class="legend-percentage">{{ Math.round((party.count / 36) * 100) }}%</span>
                  </div>
                  <div class="legend-position">{{ getPartyPosition(party.id) }}</div>
                </div>
                <button 
                  @click.stop="togglePartyFilter(party.id)"
                  class="legend-filter-btn"
                  :class="{ 'active': activeFilters.includes(party.id) }"
                >
                  {{ activeFilters.includes(party.id) ? '✅' : '🔍' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel de información del senador -->
        <div class="senator-panel">
          <div class="panel-header">
            <h3 class="panel-title">📋 Información del Senador</h3>
            <div class="panel-actions">
              <button 
                v-if="selectedSenator" 
                @click="selectedSenator = null"
                class="close-btn"
              >
                <span class="close-icon">✕</span>
                <span class="close-text">Cerrar</span>
              </button>
            </div>
          </div>

          <div v-if="selectedSenator" class="senator-details">
            <!-- Encabezado con foto -->
            <div class="senator-profile">
              <div class="photo-section">
                <div class="senator-photo-container">
                  <img 
                    :src="selectedSenator.photo || '/api/placeholder/200/250'"
                    :alt="selectedSenator.name"
                    class="senator-photo"
                  />
                  <div 
                    class="department-tag"
                    :style="{ backgroundColor: getDepartmentColor(selectedSenator.department) }"
                  >
                    {{ selectedSenator.department }}
                  </div>
                </div>
                <div class="senator-quickstats">
                  <div class="stat-item">
                    <div class="stat-icon">🏛️</div>
                    <div class="stat-data">
                      <div class="stat-value">{{ selectedSenator.commissions?.length || 0 }}</div>
                      <div class="stat-label">Comisiones</div>
                    </div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-icon">📅</div>
                    <div class="stat-data">
                      <div class="stat-value">{{ selectedSenator.experience || '5' }}</div>
                      <div class="stat-label">Años</div>
                    </div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-icon">🗳️</div>
                    <div class="stat-data">
                      <div class="stat-value">{{ selectedSenator.attendance || '95%' }}</div>
                      <div class="stat-label">Asistencia</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="senator-info">
                <div class="info-header">
                  <h2 class="senator-name">{{ selectedSenator.name }}</h2>
                  <div 
                    class="party-tag"
                    :style="{ 
                      backgroundColor: selectedSenator.partyColor,
                      color: getContrastColor(selectedSenator.partyColor)
                    }"
                  >
                    {{ selectedSenator.party }}
                  </div>
                </div>
                
                <div class="info-grid">
                  <div class="info-field">
                    <span class="field-label">🎯 Asiento:</span>
                    <span class="field-value">N° {{ selectedSenator.seatNumber }}</span>
                  </div>
                  <div class="info-field">
                    <span class="field-label">📍 Departamento:</span>
                    <span class="field-value">{{ selectedSenator.department }}</span>
                  </div>
                  <div class="info-field">
                    <span class="field-label">🎓 Profesión:</span>
                    <span class="field-value">{{ selectedSenator.profession || 'Abogado' }}</span>
                  </div>
                  <div class="info-field">
                    <span class="field-label">📅 Periodo:</span>
                    <span class="field-value">{{ selectedSenator.period || '2020-2025' }}</span>
                  </div>
                  <div class="info-field">
                    <span class="field-label">✉️ Contacto:</span>
                    <span class="field-value">{{ selectedSenator.email || 'contacto@senado.bo' }}</span>
                  </div>
                  <div class="info-field">
                    <span class="field-label">📞 Teléfono:</span>
                    <span class="field-value">{{ selectedSenator.phone || '(591-2) 220-0000' }}</span>
                  </div>
                </div>

                <!-- Indicador de posición política -->
                <div class="political-spectrum">
                  <div class="spectrum-header">
                    <span class="spectrum-label">Posición Política:</span>
                    <span class="spectrum-value">{{ getPoliticalPosition(selectedSenator.politicalSpectrum) }}</span>
                  </div>
                  <div class="spectrum-bar">
                    <div class="bar-labels">
                      <span class="bar-label">Izquierda</span>
                      <span class="bar-label">Centro</span>
                      <span class="bar-label">Derecha</span>
                    </div>
                    <div class="bar-track">
                      <div 
                        class="bar-indicator"
                        :style="{ left: selectedSenator.politicalSpectrum + '%' }"
                      >
                        <div class="indicator-dot"></div>
                        <div class="indicator-label">{{ selectedSenator.name.split(' ')[0] }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pestañas de información -->
            <div class="info-tabs">
              <nav class="tabs-nav">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="['tab-button', { 'active': activeTab === tab.id }]"
                >
                  <span class="tab-icon">{{ tab.icon }}</span>
                  <span class="tab-label">{{ tab.label }}</span>
                </button>
              </nav>

              <div class="tabs-content">
                <!-- Comisiones -->
                <div v-if="activeTab === 'commissions'" class="tab-panel">
                  <div class="panel-header">
                    <h4>🏛️ Comisiones Permanentes</h4>
                    <span class="panel-subtitle">Participación en comisiones legislativas</span>
                  </div>
                  <div class="commissions-grid">
                    <div
                      v-for="commission in selectedSenator.commissions"
                      :key="commission.id"
                      class="commission-card"
                    >
                      <div class="commission-icon">
                        <div class="icon-circle">{{ commission.icon || '📋' }}</div>
                      </div>
                      <div class="commission-details">
                        <h5 class="commission-name">{{ commission.name }}</h5>
                        <div class="commission-role">
                          <span class="role-badge" :class="commission.role">
                            {{ getRoleText(commission.role) }}
                          </span>
                        </div>
                        <p class="commission-description">{{ commission.description }}</p>
                        <div class="commission-stats">
                          <span class="stat">
                            <span class="stat-icon">📅</span>
                            {{ commission.meetings || '12' }} sesiones
                          </span>
                          <span class="stat">
                            <span class="stat-icon">📊</span>
                            {{ commission.attendance || '85%' }} asistencia
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Trayectoria -->
                <div v-if="activeTab === 'career'" class="tab-panel">
                  <div class="panel-header">
                    <h4>📈 Trayectoria Política</h4>
                    <span class="panel-subtitle">Historial de cargos y experiencia</span>
                  </div>
                  <div class="timeline">
                    <div
                      v-for="(event, index) in selectedSenator.career"
                      :key="index"
                      class="timeline-item"
                    >
                      <div class="timeline-marker">
                        <div class="marker-dot"></div>
                        <div class="marker-line"></div>
                      </div>
                      <div class="timeline-content">
                        <div class="timeline-year">{{ event.year }}</div>
                        <div class="timeline-position">{{ event.position }}</div>
                        <div class="timeline-description">{{ event.description }}</div>
                        <div class="timeline-location">{{ event.location }}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="education-section">
                    <h5 class="section-title">🎓 Formación Académica</h5>
                    <div class="education-cards">
                      <div
                        v-for="edu in selectedSenator.education"
                        :key="edu.id"
                        class="education-card"
                      >
                        <div class="education-icon">🎓</div>
                        <div class="education-details">
                          <div class="education-degree">{{ edu.degree }}</div>
                          <div class="education-institution">{{ edu.institution }}</div>
                          <div class="education-year">{{ edu.year }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Legislación -->
                <div v-if="activeTab === 'legislation'" class="tab-panel">
                  <div class="panel-header">
                    <h4>📜 Iniciativas Legislativas</h4>
                    <span class="panel-subtitle">Proyectos de ley presentados</span>
                  </div>
                  <div class="legislation-cards">
                    <div
                      v-for="bill in selectedSenator.legislation"
                      :key="bill.id"
                      class="bill-card"
                      :class="`status-${bill.status}`"
                    >
                      <div class="bill-header">
                        <div class="bill-number">{{ bill.number }}</div>
                        <div class="bill-date">{{ bill.date }}</div>
                      </div>
                      <h5 class="bill-title">{{ bill.title }}</h5>
                      <div class="bill-status">
                        <span class="status-indicator"></span>
                        {{ getBillStatus(bill.status) }}
                      </div>
                      <p class="bill-summary">{{ bill.summary }}</p>
                      <div class="bill-progress">
                        <div class="progress-track">
                          <div 
                            class="progress-bar"
                            :style="{ width: bill.progress + '%' }"
                          ></div>
                        </div>
                        <div class="progress-label">{{ bill.progress }}% completado</div>
                      </div>
                      <div class="bill-stats">
                        <span class="stat">
                          <span class="stat-icon">👍</span>
                          {{ bill.votesFor || '0' }} a favor
                        </span>
                        <span class="stat">
                          <span class="stat-icon">👎</span>
                          {{ bill.votesAgainst || '0' }} en contra
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Votaciones -->
                <div v-if="activeTab === 'voting'" class="tab-panel">
                  <div class="panel-header">
                    <h4>🗳️ Historial de Votaciones</h4>
                    <span class="panel-subtitle">Participación en votaciones importantes</span>
                  </div>
                  <div class="voting-stats-grid">
                    <div class="voting-stat-card">
                      <div class="stat-value">{{ selectedSenator.votingStats?.total || '150' }}</div>
                      <div class="stat-label">Votaciones Totales</div>
                    </div>
                    <div class="voting-stat-card">
                      <div class="stat-value">{{ selectedSenator.votingStats?.present || '145' }}</div>
                      <div class="stat-label">Presente</div>
                    </div>
                    <div class="voting-stat-card">
                      <div class="stat-value">{{ selectedSenator.votingStats?.yes || '120' }}</div>
                      <div class="stat-label">Votos Sí</div>
                    </div>
                    <div class="voting-stat-card">
                      <div class="stat-value">{{ selectedSenator.votingStats?.no || '15' }}</div>
                      <div class="stat-label">Votos No</div>
                    </div>
                    <div class="voting-stat-card">
                      <div class="stat-value">{{ selectedSenator.votingStats?.abstention || '10' }}</div>
                      <div class="stat-label">Abstenciones</div>
                    </div>
                  </div>
                  
                  <div class="recent-votes">
                    <h5 class="section-title">Votaciones Recientes</h5>
                    <div class="votes-table">
                      <div class="table-header">
                        <div class="table-cell">Proyecto</div>
                        <div class="table-cell">Fecha</div>
                        <div class="table-cell">Voto</div>
                        <div class="table-cell">Resultado</div>
                      </div>
                      <div
                        v-for="vote in selectedSenator.recentVotes"
                        :key="vote.id"
                        class="table-row"
                      >
                        <div class="table-cell">{{ vote.project }}</div>
                        <div class="table-cell">{{ vote.date }}</div>
                        <div class="table-cell">
                          <span class="vote-badge" :class="vote.decision">
                            {{ getVoteText(vote.decision) }}
                          </span>
                        </div>
                        <div class="table-cell">
                          <span class="result-badge" :class="vote.result">
                            {{ vote.result }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Estado vacío -->
          <div v-else class="empty-state">
            <div class="empty-icon">👆</div>
            <h3 class="empty-title">Selecciona un Senador</h3>
            <p class="empty-description">
              Haz click en cualquier asiento del hemiciclo para ver información detallada del senador
            </p>
            <div class="empty-tips">
              <div class="tip">
                <span class="tip-icon">💡</span>
                <span class="tip-text">Usa los filtros por partido para ver grupos específicos</span>
              </div>
              <div class="tip">
                <span class="tip-icon">🎯</span>
                <span class="tip-text">Pasa el cursor sobre los asientos para información rápida</span>
              </div>
              <div class="tip">
                <span class="tip-icon">✨</span>
                <span class="tip-text">Destaca partidos completos con el botón de destacar</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Representación por departamentos -->
      <div class="departments-section">
        <div class="section-header">
          <h3>🗺️ Representación por Departamento</h3>
          <div class="section-subtitle">9 Departamentos · 4 Senadores cada uno</div>
        </div>
        <div class="departments-grid">
          <div
            v-for="dept in departments"
            :key="dept.id"
            class="department-card"
            :style="{ '--dept-color': dept.color }"
          >
            <div class="dept-header">
              <div class="dept-icon">{{ dept.icon }}</div>
              <div class="dept-info">
                <h4 class="dept-name">{{ dept.name }}</h4>
                <div class="dept-seats">{{ dept.senators }} senadores</div>
              </div>
            </div>
            <div class="dept-parties">
              <div
                v-for="party in dept.parties"
                :key="party.name"
                class="dept-party"
              >
                <div 
                  class="party-color"
                  :style="{ backgroundColor: getPartyColor(party.name) }"
                ></div>
                <div class="party-info">
                  <div class="party-name">{{ getPartyShortName(party.name) }}</div>
                  <div class="party-count">{{ party.count }}</div>
                </div>
              </div>
            </div>
            <div class="dept-map">
              <div class="map-placeholder">
                Mapa de {{ dept.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="chamber-footer">
      <div class="footer-content">
        <div class="footer-logo">
          <div class="logo-icon">🏛️</div>
          <div class="logo-text">
            <div class="logo-title">Cámara de Senadores de Bolivia</div>
            <div class="logo-subtitle">Estado Plurinacional de Bolivia</div>
          </div>
        </div>
        <div class="footer-info">
          <div class="info-row">
            <span class="info-icon">📍</span>
            <span class="info-text">Plaza Murillo, La Paz - Bolivia</span>
          </div>
          <div class="info-row">
            <span class="info-icon">📞</span>
            <span class="info-text">(591-2) 220-0000</span>
          </div>
          <div class="info-row">
            <span class="info-icon">✉️</span>
            <span class="info-text">informacion@senado.bo</span>
          </div>
        </div>
        <div class="footer-copyright">
          © 2025 Sistema de Visualización Interactiva · Cámara de Senadores · Versión 1.0
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
definePageMeta({
  layout: 'alter'
})
// Datos realistas de los 36 senadores de Bolivia
const senatorsData = ref([
  // MAS-IPSP (21 senadores)
  { 
    id: 1, name: "María Eugenia Choque", seatNumber: 1, 
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#DC2626",
    department: "La Paz", initials: "MEC",
    x: 150, y: 380, row: 1, position: 1,
    profession: "Socióloga", experience: 8, attendance: "96%",
    politicalSpectrum: 25,
    commissions: [
      { id: 1, name: "Comisión de Constitución", role: "president", 
        description: "Revisión de reformas constitucionales", icon: "⚖️", meetings: 24, attendance: "95%" },
      { id: 2, name: "Comisión de Derechos Humanos", role: "member",
        description: "Protección de derechos fundamentales", icon: "👥", meetings: 18, attendance: "92%" }
    ],
    career: [
      { year: "2015-2019", position: "Diputada Nacional", 
        description: "Representante por La Paz", location: "Asamblea Legislativa" },
      { year: "2020-2025", position: "Senadora", 
        description: "Senadora por La Paz", location: "Cámara de Senadores" }
    ],
    education: [
      { id: 1, degree: "Lic. en Sociología", institution: "UMSA", year: "1995" },
      { id: 2, degree: "Maestría en Políticas Públicas", institution: "Universidad de La Paz", year: "2005" }
    ],
    legislation: [
      { id: 1, number: "PL-025/2024", title: "Ley de Protección de la Madre Tierra", 
        date: "15/03/2024", status: "approved", progress: 100,
        summary: "Ley para la protección integral del medio ambiente", votesFor: 78, votesAgainst: 12 },
      { id: 2, number: "PL-042/2024", title: "Reforma a la Ley de Educación", 
        date: "20/04/2024", status: "debate", progress: 60,
        summary: "Actualización del sistema educativo plurinacional", votesFor: 45, votesAgainst: 35 }
    ],
    votingStats: { total: 150, present: 145, yes: 120, no: 15, abstention: 10 },
    recentVotes: [
      { id: 1, project: "Ley de Presupuesto 2025", date: "10/01/2025", decision: "yes", result: "aprobado" },
      { id: 2, project: "Ley Anticorrupción", date: "05/01/2025", decision: "yes", result: "aprobado" },
      { id: 3, project: "Reforma Electoral", date: "20/12/2024", decision: "no", result: "rechazado" }
    ]
  },
  { id: 2, name: "Carlos Alberto Mesa", seatNumber: 2, 
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563EB",
    department: "La Paz", initials: "CAM",
    x: 200, y: 370, row: 1, position: 2,
    profession: "Abogado", politicalSpectrum: 65 },
  { id: 3, name: "Juan Carlos García", seatNumber: 3,
    party: "Creemos", partyShort: "CRE", partyColor: "#F97316",
    department: "Santa Cruz", initials: "JCG",
    x: 250, y: 360, row: 1, position: 3,
    profession: "Empresario", politicalSpectrum: 80 },
  { id: 4, name: "Ana María Rojas", seatNumber: 4,
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#DC2626",
    department: "Cochabamba", initials: "AMR",
    x: 300, y: 370, row: 1, position: 4,
    profession: "Educadora", politicalSpectrum: 30 },
  // Continuar con más senadores...
  // Por simplicidad, agregaré algunos más con datos básicos
  { id: 5, name: "Roberto Fernández", seatNumber: 5,
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563EB",
    department: "Tarija", initials: "RF",
    x: 350, y: 380, row: 1, position: 5,
    profession: "Ingeniero Civil", politicalSpectrum: 60 },
  
  // Fila 2
  { id: 6, name: "Luisa Mamani", seatNumber: 6,
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#DC2626",
    department: "Oruro", initials: "LM",
    x: 180, y: 340, row: 2, position: 1,
    profession: "Abogada", politicalSpectrum: 28 },
  { id: 7, name: "José Luis Paredes", seatNumber: 7,
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563EB",
    department: "Chuquisaca", initials: "JLP",
    x: 230, y: 330, row: 2, position: 2,
    profession: "Economista", politicalSpectrum: 68 },
  { id: 8, name: "Fernando Vargas", seatNumber: 8,
    party: "Creemos", partyShort: "CRE", partyColor: "#F97316",
    department: "Santa Cruz", initials: "FV",
    x: 280, y: 320, row: 2, position: 3,
    profession: "Empresario", politicalSpectrum: 82 },
  { id: 9, name: "Marta Quispe", seatNumber: 9,
    party: "MAS-IPSP", partyShort: "MAS", partyColor: "#DC2626",
    department: "La Paz", initials: "MQ",
    x: 330, y: 330, row: 2, position: 4,
    profession: "Médica", politicalSpectrum: 32 },
  { id: 10, name: "Ricardo Morales", seatNumber: 10,
    party: "Comunidad Ciudadana", partyShort: "CC", partyColor: "#2563EB",
    department: "Cochabamba", initials: "RM",
    x: 380, y: 340, row: 2, position: 5,
    profession: "Ingeniero", politicalSpectrum: 62 },
  
  // Continuar hasta 36 senadores...
  // Por ahora agregaré placeholder para completar
])

// Estado reactivo
const selectedSenator = ref(null)
const hoveredSeat = ref(null)
const searchQuery = ref('')
const activeFilters = ref([])
const highlightedParty = ref(null)
const showLabels = ref(true)
const highlightMode = ref(false)
const activeTab = ref('commissions')
const tooltipStyle = reactive({ left: '0px', top: '0px' })

// Configuración de partidos
const parties = computed(() => [
  { 
    id: 'MAS-IPSP', 
    name: 'Movimiento al Socialismo - IPSP', 
    shortName: 'MAS', 
    symbol: '⚫',
    color: '#DC2626', 
    count: 21,
    position: 'Izquierda'
  },
  { 
    id: 'Comunidad Ciudadana', 
    name: 'Comunidad Ciudadana', 
    shortName: 'CC', 
    symbol: '🔵',
    color: '#2563EB', 
    count: 11,
    position: 'Centro-Derecha'
  },
  { 
    id: 'Creemos', 
    name: 'Creemos', 
    shortName: 'CREEMOS', 
    symbol: '🟠',
    color: '#F97316', 
    count: 4,
    position: 'Derecha'
  }
])

// Departamentos de Bolivia
const departments = computed(() => [
  { id: 'LP', name: 'La Paz', senators: 4, color: '#3B82F6', icon: '🏔️',
    parties: [{ name: 'MAS-IPSP', count: 3 }, { name: 'Comunidad Ciudadana', count: 1 }] },
  { id: 'SC', name: 'Santa Cruz', senators: 4, color: '#10B981', icon: '🌴',
    parties: [{ name: 'Creemos', count: 2 }, { name: 'Comunidad Ciudadana', count: 1 }, { name: 'MAS-IPSP', count: 1 }] },
  { id: 'CB', name: 'Cochabamba', senators: 4, color: '#8B5CF6', icon: '🌽',
    parties: [{ name: 'MAS-IPSP', count: 3 }, { name: 'Comunidad Ciudadana', count: 1 }] },
  { id: 'OR', name: 'Oruro', senators: 4, color: '#F59E0B', icon: '⛏️',
    parties: [{ name: 'MAS-IPSP', count: 4 }] },
  { id: 'PT', name: 'Potosí', senators: 4, color: '#EF4444', icon: '🗻',
    parties: [{ name: 'MAS-IPSP', count: 4 }] },
  { id: 'TJ', name: 'Tarija', senators: 4, color: '#EC4899', icon: '🍷',
    parties: [{ name: 'Comunidad Ciudadana', count: 2 }, { name: 'MAS-IPSP', count: 2 }] },
  { id: 'CH', name: 'Chuquisaca', senators: 4, color: '#06B6D4', icon: '🎓',
    parties: [{ name: 'MAS-IPSP', count: 3 }, { name: 'Comunidad Ciudadana', count: 1 }] },
  { id: 'BE', name: 'Beni', senators: 4, color: '#84CC16', icon: '🌳',
    parties: [{ name: 'MAS-IPSP', count: 3 }, { name: 'Comunidad Ciudadana', count: 1 }] },
  { id: 'PD', name: 'Pando', senators: 4, color: '#F97316', icon: '🌲',
    parties: [{ name: 'MAS-IPSP', count: 4 }] }
])

// Tabs
const tabs = [
  { id: 'commissions', label: 'Comisiones', icon: '🏛️' },
  { id: 'career', label: 'Trayectoria', icon: '📈' },
  { id: 'legislation', label: 'Legislación', icon: '📜' },
  { id: 'voting', label: 'Votaciones', icon: '🗳️' }
]

// Computados
const seatRows = computed(() => {
  const rows = [[], [], [], [], [], []]
  
  senatorsData.value.forEach(senator => {
    if (senator.row && senator.row <= rows.length) {
      rows[senator.row - 1].push(senator)
    }
  })
  
  // Ordenar por posición en cada fila
  return rows.map(row => 
    row.sort((a, b) => a.position - b.position)
  )
})

const filteredSenators = computed(() => {
  let filtered = senatorsData.value
  
  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(senator => 
      senator.name.toLowerCase().includes(query) ||
      senator.department.toLowerCase().includes(query) ||
      senator.party.toLowerCase().includes(query) ||
      senator.partyShort?.toLowerCase().includes(query)
    )
  }
  
  // Filtrar por partido
  if (activeFilters.value.length > 0) {
    filtered = filtered.filter(senator => 
      activeFilters.value.includes(senator.party)
    )
  }
  
  return filtered
})

// Métodos
const selectSenator = (senator) => {
  selectedSenator.value = senator
  activeTab.value = 'commissions'
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
    highlightMode.value = false
  } else {
    highlightedParty.value = partyId
    highlightMode.value = true
  }
}

const resetView = () => {
  selectedSenator.value = null
  activeFilters.value = []
  highlightedParty.value = null
  highlightMode.value = false
  searchQuery.value = ''
}

const toggleLabels = () => {
  showLabels.value = !showLabels.value
}

const toggleHighlightMode = () => {
  highlightMode.value = !highlightMode.value
  if (!highlightMode.value) {
    highlightedParty.value = null
  }
}

const getSeatColor = (seat) => {
  if (highlightMode.value && highlightedParty.value && seat.party !== highlightedParty.value) {
    return '#E5E7EB' // Gris claro para asientos no destacados
  }
  return seat.partyColor
}

const getSeatStroke = (seat) => {
  if (selectedSenator.value?.id === seat.id) return '#F59E0B'
  if (hoveredSeat.value?.id === seat.id) return '#3B82F6'
  if (highlightMode.value && seat.party === highlightedParty.value) {
    return '#1F2937'
  }
  return '#6B7280'
}

const getSeatBackColor = (seat) => {
  // Color más claro para el respaldo
  const color = seat.partyColor
  return color + '33' // Agregar transparencia
}

const getSeatTextColor = (seat) => {
  // Determinar si el texto debe ser claro u oscuro basado en el color de fondo
  const color = seat.partyColor
  const r = parseInt(color.substr(1, 2), 16)
  const g = parseInt(color.substr(3, 2), 16)
  const b = parseInt(color.substr(5, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#1F2937' : '#FFFFFF'
}

const handleMouseMove = (event) => {
  if (hoveredSeat.value && !selectedSenator.value) {
    const container = document.querySelector('.hemicycle-svg-container')
    if (container) {
      const rect = container.getBoundingClientRect()
      tooltipStyle.left = `${event.clientX - rect.left + 20}px`
      tooltipStyle.top = `${event.clientY - rect.top + 20}px`
    }
  }
}

const getDepartmentColor = (department) => {
  const dept = departments.value.find(d => d.name === department)
  return dept ? dept.color : '#6B7280'
}

const getPartyColor = (partyName) => {
  const party = parties.value.find(p => p.id === partyName || p.name === partyName)
  return party ? party.color : '#6B7280'
}

const getPartyShortName = (partyName) => {
  const party = parties.value.find(p => p.id === partyName || p.name === partyName)
  return party ? party.shortName : partyName
}

const getPartyPosition = (partyId) => {
  const party = parties.value.find(p => p.id === partyId)
  return party ? party.position : ''
}

const getPoliticalPosition = (spectrum) => {
  if (spectrum < 33) return 'Izquierda'
  if (spectrum < 66) return 'Centro'
  return 'Derecha'
}

const getRoleText = (role) => {
  const roles = {
    'president': 'Presidente',
    'vicepresident': 'Vicepresidente',
    'member': 'Miembro',
    'secretary': 'Secretario'
  }
  return roles[role] || role
}

const getBillStatus = (status) => {
  const statuses = {
    'approved': '✅ Aprobado',
    'debate': '💬 En debate',
    'pending': '⏳ Pendiente',
    'rejected': '❌ Rechazado',
    'archived': '📦 Archivado'
  }
  return statuses[status] || status
}

const getVoteText = (decision) => {
  const votes = {
    'yes': '✅ Sí',
    'no': '❌ No',
    'abstention': '🤝 Abstención',
    'absent': '🚫 Ausente'
  }
  return votes[decision] || decision
}

const getContrastColor = (hexColor) => {
  // Convertir hex a RGB
  const r = parseInt(hexColor.substr(1, 2), 16)
  const g = parseInt(hexColor.substr(3, 2), 16)
  const b = parseInt(hexColor.substr(5, 2), 16)
  
  // Calcular luminosidad
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

// Inicializar datos al montar
onMounted(() => {
  // Generar datos de senadores si no están completos
  generateSenatorsData()
})

const generateSenatorsData = () => {
  // Coordenadas para distribución real en hemiciclo
  const coordinates = [
    // Fila 1 (centro, cerca de la presidencia)
    { row: 1, positions: [
      { x: 480, y: 280 }, { x: 520, y: 290 }, { x: 560, y: 300 }, { x: 600, y: 290 }, { x: 640, y: 280 },
      { x: 680, y: 290 }, { x: 720, y: 300 }, { x: 760, y: 290 }, { x: 800, y: 280 }
    ]},
    // Fila 2
    { row: 2, positions: [
      { x: 460, y: 320 }, { x: 500, y: 330 }, { x: 540, y: 340 }, { x: 580, y: 330 }, { x: 620, y: 320 },
      { x: 660, y: 330 }, { x: 700, y: 340 }, { x: 740, y: 330 }, { x: 780, y: 320 }
    ]},
    // Fila 3
    { row: 3, positions: [
      { x: 440, y: 360 }, { x: 480, y: 370 }, { x: 520, y: 380 }, { x: 560, y: 370 }, { x: 600, y: 360 },
      { x: 640, y: 370 }, { x: 680, y: 380 }, { x: 720, y: 370 }, { x: 760, y: 360 }
    ]},
    // Fila 4
    { row: 4, positions: [
      { x: 420, y: 400 }, { x: 460, y: 410 }, { x: 500, y: 420 }, { x: 540, y: 410 }, { x: 580, y: 400 },
      { x: 620, y: 410 }, { x: 660, y: 420 }, { x: 700, y: 410 }, { x: 740, y: 400 }
    ]}
  ]
  
  // Nombres de senadores bolivianos (ficticios)
  const senadorNames = [
    "María Eugenia Choque", "Carlos Alberto Mesa", "Juan Carlos García", "Ana María Rojas",
    "Roberto Fernández", "Luisa Mamani", "José Luis Paredes", "Fernando Vargas",
    "Marta Quispe", "Ricardo Morales", "Patricia Flores", "Miguel Ángel López",
    "Susana Méndez", "Alberto Gutiérrez", "Carmen Rosa Sánchez", "Jorge Luis Pérez",
    "Gabriela Torres", "Raúl Castro", "Elizabeth Ríos", "Mario Vargas",
    "Silvia Fernández", "Pedro Castillo", "Claudia Paz", "Andrés Romero",
    "Daniela Mendoza", "Luis Fernando Arce", "Victoria Choque", "Walter Álvarez",
    "Natalia Gutiérrez", "Óscar Paredes", "Rosa María López", "Héctor Vásquez",
    "Karen Salazar", "Felipe Mendoza", "Carolina Herrera", "Sergio Miranda"
  ]
  
  const departmentsList = ["La Paz", "Santa Cruz", "Cochabamba", "Oruro", "Potosí", "Tarija", "Chuquisaca", "Beni", "Pando"]
  const partiesList = ["MAS-IPSP", "Comunidad Ciudadana", "Creemos"]
  
  // Generar 36 senadores
  let senadorIndex = 0
  coordinates.forEach((rowData, rowIndex) => {
    rowData.positions.forEach((pos, posIndex) => {
      if (senadorIndex < 36) {
        const department = departmentsList[senadorIndex % departmentsList.length]
        const party = senadorIndex < 21 ? "MAS-IPSP" : 
                     senadorIndex < 32 ? "Comunidad Ciudadana" : "Creemos"
        
        const partyInfo = parties.value.find(p => p.id === party)
        
        const senator = {
          id: senadorIndex + 1,
          name: senadorNames[senadorIndex] || `Senador ${senadorIndex + 1}`,
          seatNumber: senadorIndex + 1,
          party: party,
          partyShort: partyInfo?.shortName || party,
          partyColor: partyInfo?.color || '#6B7280',
          department: department,
          initials: senadorNames[senadorIndex]?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'SN',
          x: pos.x,
          y: pos.y,
          row: rowData.row,
          position: posIndex + 1,
          profession: ["Abogado", "Economista", "Médico", "Ingeniero", "Profesor", "Empresario"][senadorIndex % 6],
          politicalSpectrum: party === "MAS-IPSP" ? Math.floor(Math.random() * 30) + 10 :
                           party === "Comunidad Ciudadana" ? Math.floor(Math.random() * 30) + 50 :
                           Math.floor(Math.random() * 30) + 70,
          experience: Math.floor(Math.random() * 10) + 3,
          attendance: `${Math.floor(Math.random() * 10) + 90}%`
        }
        
        senatorsData.value.push(senator)
        senadorIndex++
      }
    })
  })
}
</script>

<style scoped>
.senate-chamber {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
}

/* Header */
.chamber-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
  color: white;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.bolivia-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.flag-container {
  position: relative;
  width: 100px;
  height: 75px;
}

.bolivia-flag {
  width: 100px;
  height: 75px;
  border: 2px solid white;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 2;
}

.flag-stripe {
  height: 33.33%;
  width: 100%;
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

.flag-emblem {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  color: gold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.flag-shadow {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 100px;
  height: 75px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 1;
}

.chamber-titles {
  flex: 1;
}

.state-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: white;
}

.chamber-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.legislative-info {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.session-badge, .seats-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.header-stats {
  display: flex;
  gap: 2rem;
  justify-content: flex-end;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 160px;
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  font-size: 0.85rem;
  opacity: 0.9;
}

/* Controles */
.controls-panel {
  background: white;
  margin: 2rem;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #6b7280;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s;
  background: #f9fafb;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-hint {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.85rem;
  color: #9ca3af;
  pointer-events: none;
}

.controls-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.party-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.party-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.party-btn.active {
  outline: 3px solid var(--party-color);
  outline-offset: 2px;
  box-shadow: 0 0 0 3px white, 0 4px 12px rgba(0, 0, 0, 0.2);
}

.party-symbol {
  font-size: 1.1rem;
}

.party-name {
  font-size: 0.9rem;
}

.party-count {
  background: rgba(255, 255, 255, 0.3);
  padding: 0.125rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 700;
}

.view-options {
  display: flex;
  gap: 0.75rem;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.view-btn:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 1.1rem;
}

/* Hemiciclo Section */
.hemicycle-section {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  margin: 0 2rem 2rem;
}

@media (max-width: 1200px) {
  .hemicycle-section {
    grid-template-columns: 1fr;
  }
}

.hemicycle-container {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.hemicycle-title {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border-bottom: 2px solid #e5e7eb;
}

.hemicycle-title h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hemicycle-info {
  display: flex;
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.info-label {
  font-weight: 600;
  color: #4b5563;
}

/* Hemiciclo Visualization */
.hemicycle-visualization {
  padding: 2rem;
  position: relative;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.presidency-desk {
  position: relative;
  z-index: 10;
  margin-bottom: 3rem;
  text-align: center;
}

.president-chair {
  position: relative;
  display: inline-block;
}

.chair-design {
  width: 180px;
  height: 100px;
  background: linear-gradient(135deg, #92400e, #b45309);
  border-radius: 12px;
  border: 4px solid #78350f;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.chair-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
}

.president-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.president-title {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.president-name {
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.9;
}

.president-role {
  font-size: 0.8rem;
  opacity: 0.8;
}

.vice-presidents {
  display: flex;
  gap: 4rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.vice-chair {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
}

.chair-icon {
  font-size: 1.5rem;
}

/* SVG Container */
.hemicycle-svg-container {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hemicycle-svg {
  width: 100%;
  max-width: 900px;
  height: auto;
}

/* Estilos de asientos SVG */
.seat-group {
  cursor: pointer;
  transition: all 0.3s ease;
}

.seat-group:hover {
  transform: scale(1.1);
}

.seat-group.selected {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { filter: drop-shadow(0 0 0 rgba(245, 158, 11, 0.7)); }
  70% { filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0)); }
  100% { filter: drop-shadow(0 0 0 rgba(245, 158, 11, 0)); }
}

.seat-chair {
  transition: all 0.3s ease;
}

.seat-back {
  transition: all 0.3s ease;
}

.seat-number {
  user-select: none;
  pointer-events: none;
}

.seat-group.hovered .seat-chair {
  stroke: #3b82f6;
  stroke-width: 3px;
}

.seat-group.highlighted .seat-chair {
  stroke: #1f2937;
  stroke-width: 3px;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.3));
}

.seat-group.selected .seat-chair {
  stroke: #f59e0b;
  stroke-width: 3px;
}

.selection-ring {
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.senator-label, .party-label {
  user-select: none;
  pointer-events: none;
}

.position-label {
  font-family: 'Inter', sans-serif;
  user-select: none;
}

/* Tooltip */
.seat-tooltip {
  position: absolute;
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 2px solid #3b82f6;
  z-index: 1000;
  min-width: 260px;
  pointer-events: none;
  animation: fadeInUp 0.2s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
}

.seat-marker {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.senator-info h4 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.1rem;
}

.party-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.tooltip-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
}

.info-icon {
  font-size: 1rem;
  color: #6b7280;
}

.info-text {
  color: #4b5563;
  font-weight: 500;
}

.tooltip-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #eff6ff;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.hint-icon {
  font-size: 1rem;
}

.hint-text {
  font-size: 0.85rem;
  color: #1d4ed8;
  font-weight: 600;
}

/* Leyenda */
.hemicycle-legend {
  padding: 1.5rem;
  background: #f9fafb;
  border-top: 2px solid #e5e7eb;
}

.legend-title {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-content {
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
  transition: all 0.3s;
  position: relative;
}

.legend-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.legend-item.active {
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
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.legend-symbol {
  font-size: 1.5rem;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
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
  gap: 1rem;
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.legend-count {
  font-weight: 600;
}

.legend-position {
  font-size: 0.8rem;
  color: #9ca3af;
  font-style: italic;
}

.legend-filter-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #e5e7eb;
  color: #6b7280;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
}

.legend-filter-btn:hover {
  background: #d1d5db;
}

.legend-filter-btn.active {
  background: #3b82f6;
  color: white;
}

/* Panel del Senador */
.senator-panel {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #1e40af, #1e3a8a);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-title {
  margin: 0;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.panel-actions {
  display: flex;
  gap: 0.75rem;
}

.close-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
}

.close-icon {
  font-size: 1.1rem;
}

/* Detalles del Senador */
.senator-details {
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 300px);
  padding: 1.5rem;
}

.senator-profile {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

@media (max-width: 1024px) {
  .senator-profile {
    grid-template-columns: 1fr;
  }
}

.photo-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.senator-photo-container {
  position: relative;
}

.senator-photo {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  border: 4px solid white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.department-tag {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem 1.5rem;
  color: white;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}

.senator-quickstats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-data {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

/* Información del Senador */
.senator-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.senator-name {
  margin: 0;
  color: #1f2937;
  font-size: 2rem;
  line-height: 1.2;
}

.party-tag {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 700;
  font-size: 0.9rem;
  max-width: fit-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-field {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.field-label {
  color: #6b7280;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.field-value {
  font-weight: 600;
  color: #1f2937;
}

/* Espectro Político */
.political-spectrum {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.spectrum-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.spectrum-label {
  font-weight: 600;
  color: #4b5563;
}

.spectrum-value {
  font-weight: 700;
  color: #1f2937;
  padding: 0.25rem 0.75rem;
  background: #e5e7eb;
  border-radius: 6px;
}

.spectrum-bar {
  margin-top: 1rem;
}

.bar-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.bar-track {
  height: 10px;
  background: linear-gradient(to right, #dc2626, #fbbf24, #2563eb);
  border-radius: 5px;
  position: relative;
}

.bar-indicator {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.indicator-dot {
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid #1f2937;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.indicator-label {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
}

/* Pestañas */
.info-tabs {
  margin-top: 2rem;
}

.tabs-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: #6b7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.tab-button:hover {
  color: #3b82f6;
}

.tab-button.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
  background: #eff6ff;
  border-radius: 8px 8px 0 0;
}

.tab-icon {
  font-size: 1.2rem;
}

.tabs-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Estilos específicos para cada tab panel */
.tab-panel {
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0;
  background: none;
  color: inherit;
}

.panel-header h4 {
  margin: 0;
  color: #1f2937;
  font-size: 1.2rem;
}

.panel-subtitle {
  color: #6b7280;
  font-size: 0.9rem;
}

/* Comisiones */
.commissions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.commission-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s;
}

.commission-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #3b82f6;
}

.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: white;
}

.commission-details {
  flex: 1;
}

.commission-name {
  margin: 0 0 0.75rem 0;
  color: #1f2937;
  font-size: 1.1rem;
}

.role-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.role-badge.president {
  background: #dcfce7;
  color: #166534;
}

.role-badge.vicepresident {
  background: #fef3c7;
  color: #92400e;
}

.role-badge.member {
  background: #dbeafe;
  color: #1e40af;
}

.commission-description {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.commission-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #6b7280;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Estado vacío */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  color: #6b7280;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-title {
  margin: 0 0 1rem 0;
  color: #4b5563;
  font-size: 1.5rem;
}

.empty-description {
  max-width: 400px;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.empty-tips {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
}

.tip {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 10px;
  border-left: 4px solid #3b82f6;
}

.tip-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.tip-text {
  text-align: left;
  font-size: 0.9rem;
}

/* Departamentos Section */
.departments-section {
  background: white;
  margin: 2rem;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.section-header {
  margin-bottom: 2rem;
  text-align: center;
}

.section-header h3 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.section-subtitle {
  color: #6b7280;
  font-size: 0.95rem;
}

.departments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.department-card {
  background: white;
  border-radius: 12px;
  border: 2px solid var(--dept-color);
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.department-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.dept-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--dept-color), color-mix(in srgb, var(--dept-color) 80%, black));
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dept-icon {
  font-size: 2rem;
}

.dept-info {
  flex: 1;
}

.dept-name {
  margin: 0 0 0.25rem 0;
  font-size: 1.2rem;
  font-weight: 700;
}

.dept-seats {
  font-size: 0.9rem;
  opacity: 0.9;
}

.dept-parties {
  padding: 1.5rem;
}

.dept-party {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.dept-party:last-child {
  margin-bottom: 0;
}

.party-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  flex-shrink: 0;
}

.party-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.party-name {
  font-weight: 600;
  color: #4b5563;
  font-size: 0.9rem;
}

.party-count {
  font-weight: 700;
  color: #1f2937;
  font-size: 1.1rem;
}

.dept-map {
  padding: 1rem;
  background: #f3f4f6;
  border-top: 1px solid #e5e7eb;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-style: italic;
}

.map-placeholder {
  opacity: 0.7;
}

/* Footer */
.chamber-footer {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: white;
  padding: 2rem;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.logo-icon {
  font-size: 2.5rem;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  font-size: 1.2rem;
  font-weight: 700;
}

.logo-subtitle {
  font-size: 0.9rem;
  opacity: 0.8;
}

.footer-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.info-icon {
  font-size: 1rem;
  opacity: 0.7;
}

.footer-copyright {
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.7;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .chamber-header {
    padding: 1.5rem 1rem;
  }
  
  .bolivia-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .header-stats {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .hemicycle-section {
    margin: 0 1rem 1rem;
  }
  
  .controls-panel, .departments-section {
    margin: 1rem;
  }
  
  .controls-group {
    flex-direction: column;
    gap: 1rem;
  }
  
  .view-options {
    justify-content: center;
  }
  
  .senator-profile {
    grid-template-columns: 1fr;
  }
}
</style>