// composables/useSenateChamber.js
import { ref, reactive, computed, nextTick } from 'vue'
import { seatPositions } from '~/components/SenateChamber/data/senateChamberData'

export function useSenateChamber(props, emit) {
  // ============================================
  // ESTADO
  // ============================================
  const selectedSenator = ref(null)
  const hoveredSeat = ref(null)
  const activeFilters = ref([])
  const showLabels = ref(props.initialShowLabels || false)
  const tooltipStyle = reactive({ left: '0px', top: '0px' })
  const svgElement = ref(null)
  const imageError = ref(false)
  
  // ✅ BLOQUEO DE SELECCIÓN - Más robusto
  const isSelecting = ref(false)
  let selectionLockTimer = null
  let lastSelectedId = null

  // Cache
  const partyCountCache = reactive({})
  const textColorCache = reactive({})

  // Timeouts para tooltip
  let hoverTimeout = null
  let mouseMoveTimeout = null
  let lastHoveredSeatId = null
  let isUpdatingTooltip = false

  // ============================================
  // COMPUTED - TODOS LOS ASIENTOS JUNTOS
  // ============================================
  const allSeats = computed(() => {
    const seats = props.senators.map(senator => {
      let position = { x: 0, y: 0 }
      
      if (senator.seatNumber >= 1 && senator.seatNumber <= 7) {
        position = seatPositions.upperLeft[senator.seatNumber - 1]
      } else if (senator.seatNumber >= 8 && senator.seatNumber <= 14) {
        position = seatPositions.upperRight[senator.seatNumber - 8]
      } else if (senator.seatNumber >= 15 && senator.seatNumber <= 25) {
        position = seatPositions.lowerLeft[senator.seatNumber - 15]
      } else if (senator.seatNumber >= 26 && senator.seatNumber <= 36) {
        position = seatPositions.lowerRight[senator.seatNumber - 26]
      }
      
      return { 
        ...senator, 
        x: position.x || 0, 
        y: position.y || 0 
      }
    })
    
    if (activeFilters.value.length === 0) {
      return seats
    }
    
    const filterSet = new Set(activeFilters.value)
    return seats.filter(seat => filterSet.has(seat.party))
  })

  // ============================================
  // MÉTODOS
  // ============================================
  const getFilteredCount = (partyId) => {
    if (activeFilters.value.length === 0) {
      if (!partyCountCache[partyId]) {
        const party = props.parties.find(p => p.id === partyId)
        partyCountCache[partyId] = party?.count || 
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
    if (!seat) return '#f3f4f6'
    if (activeFilters.value.length > 0 && !activeFilters.value.includes(seat.party)) {
      return '#f3f4f6'
    }
    return seat.partyColor || '#f3f4f6'
  }

  const getTextColor = (bg) => {
    if (!bg) return '#000000'
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
    if (!name) return '?'
    const parts = name.split(' ')
    if (parts.length >= 3) {
      return `${parts[0][0]}${parts[parts.length-2][0]}${parts[parts.length-1][0]}`.toUpperCase()
    }
    if (parts.length === 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const handleImageError = () => {
    imageError.value = true
  }

  // ============================================
  // SELECT SENADOR - CON BLOQUEO ROBUSTO
  // ============================================
  const selectSenator = async (senator) => {
    if (!senator) return
    
    // ✅ BLOQUEO: Si ya está seleccionando, ignorar
    if (isSelecting.value) {
      console.log('⏳ [SenateChamber] Selección en proceso, ignorando click')
      return
    }
    
    // ✅ Si es el mismo senador, deseleccionar (con bloqueo)
    if (selectedSenator.value?.id === senator.id) {
      // Si ya está seleccionado, deseleccionar
      if (selectionLockTimer) {
        clearTimeout(selectionLockTimer)
        selectionLockTimer = null
      }
      
      isSelecting.value = true
      selectedSenator.value = null
      emit('senator-deselected')
      
      // Liberar bloqueo después de un tiempo
      selectionLockTimer = setTimeout(() => {
        isSelecting.value = false
        selectionLockTimer = null
      }, 300)
      return
    }
    
    // ✅ BLOQUEAR selección
    isSelecting.value = true
    
    // Limpiar hover
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      hoverTimeout = null
    }
    hoveredSeat.value = null
    lastHoveredSeatId = null
    
    try {
      // Esperar al siguiente ciclo de renderizado
      await nextTick()
      
      // Resetear error de imagen
      imageError.value = false
      
      // Guardar el ID del senador seleccionado
      lastSelectedId = senator.id
      
      // Actualizar el senador seleccionado
      selectedSenator.value = senator
      emit('senator-selected', senator)
      
      // Esperar otro ciclo para asegurar que el DOM se actualizó
      await nextTick()
      
    } catch (error) {
      console.error('Error seleccionando senador:', error)
      // En caso de error, resetear
      selectedSenator.value = null
    } finally {
      // ✅ Liberar el bloqueo DESPUÉS de que todo se haya actualizado
      if (selectionLockTimer) {
        clearTimeout(selectionLockTimer)
        selectionLockTimer = null
      }
      
      selectionLockTimer = setTimeout(() => {
        isSelecting.value = false
        selectionLockTimer = null
      }, 300)
    }
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
    if (selectionLockTimer) {
      clearTimeout(selectionLockTimer)
      selectionLockTimer = null
    }
    selectedSenator.value = null
    activeFilters.value = []
    hoveredSeat.value = null
    imageError.value = false
    isSelecting.value = false
    lastSelectedId = null
    
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      hoverTimeout = null
    }
    if (mouseMoveTimeout) {
      clearTimeout(mouseMoveTimeout)
      mouseMoveTimeout = null
    }
    Object.keys(partyCountCache).forEach(key => delete partyCountCache[key])
    Object.keys(textColorCache).forEach(key => delete textColorCache[key])
    emit('view-reset')
  }

  // ========== TOOLTIP HANDLERS ==========
  const handleMouseEnter = (seat) => {
    if (isSelecting.value) return
    if (!seat || selectedSenator.value?.id === seat.id) return
    
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      hoverTimeout = null
    }
    
    hoverTimeout = setTimeout(() => {
      if (!isSelecting.value && seat.id !== selectedSenator.value?.id) {
        hoveredSeat.value = seat
        lastHoveredSeatId = seat.id
        positionTooltipFromSeat()
      }
    }, 200)
  }

  const handleMouseLeave = () => {
    if (isSelecting.value) return
    
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      hoverTimeout = null
    }
    
    if (hoveredSeat.value?.id !== selectedSenator.value?.id) {
      hoveredSeat.value = null
      lastHoveredSeatId = null
    }
  }

  const onMouseMove = (event) => {
    if (isSelecting.value) return
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
    if (isSelecting.value) return
    if (!hoveredSeat.value || !svgElement.value || hoveredSeat.value.id !== lastHoveredSeatId) {
      return
    }
    if (isUpdatingTooltip) return
    isUpdatingTooltip = true
    
    requestAnimationFrame(() => {
      try {
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
        if (typeof seat.x !== 'number' || typeof seat.y !== 'number') {
          isUpdatingTooltip = false
          return
        }
        const rect = container.getBoundingClientRect()
        if (!svg.viewBox || !svg.viewBox.baseVal) {
          isUpdatingTooltip = false
          return
        }
        const viewBox = svg.viewBox.baseVal
        const svgRect = svg.getBoundingClientRect()
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
        // Silencioso
      } finally {
        isUpdatingTooltip = false
      }
    })
  }

  const positionTooltipFromSeat = () => {
    const syntheticEvent = { clientX: 0, clientY: 0 }
    updateHoverTooltip(syntheticEvent)
  }

  // Cleanup
  const cleanup = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      hoverTimeout = null
    }
    if (mouseMoveTimeout) {
      clearTimeout(mouseMoveTimeout)
      mouseMoveTimeout = null
    }
    if (selectionLockTimer) {
      clearTimeout(selectionLockTimer)
      selectionLockTimer = null
    }
  }

  return {
    // Estado
    selectedSenator,
    hoveredSeat,
    activeFilters,
    showLabels,
    tooltipStyle,
    svgElement,
    imageError,
    isSelecting,
    // Computed
    allSeats,
    // Métodos
    getFilteredCount,
    getSeatColor,
    getTextColor,
    formatInitials,
    handleImageError,
    selectSenator,
    togglePartyFilter,
    resetView,
    handleMouseEnter,
    handleMouseLeave,
    onMouseMove,
    cleanup
  }
}