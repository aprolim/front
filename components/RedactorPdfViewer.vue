<!-- components/RedactorPdfViewer.vue -->
<template>
  <div class="redactor-pdf-viewer">
    <!-- Selector de Tomos -->
    <div class="tomo-selector">
      <div class="selector-header">
        <h3 class="text-xl font-semibold text-gray-800">Redactor - Tomos</h3>
        <p class="text-sm text-gray-500">Seleccione un tomo para visualizar</p>
      </div>
      
      <div class="tomo-grid">
        <button
          v-for="tomo in allTomos"
          :key="tomo.tomo"
          @click="selectTomo(tomo)"
          :disabled="!tomo.disponible"
          :class="[
            'tomo-card',
            selectedTomo?.tomo === tomo.tomo ? 'selected' : '',
            !tomo.disponible ? 'disabled' : ''
          ]"
        >
          <span class="tomo-number">Tomo {{ tomo.tomo }}</span>
          <span class="tomo-periodo">{{ tomo.periodo }}</span>
          <span v-if="!tomo.disponible" class="badge-no">Próximamente</span>
          <span v-else class="badge-yes">Disponible</span>
        </button>
      </div>
    </div>

    <!-- Visor PDF -->
    <div v-if="selectedTomo?.disponible" class="pdf-container">
      <div class="pdf-toolbar">
        <div class="toolbar-left">
          <span class="font-medium">Tomo {{ selectedTomo.tomo }}</span>
          <span class="text-sm text-gray-500">{{ selectedTomo.periodo }}</span>
        </div>
        <div class="toolbar-right">
          <button 
            @click="downloadPdf" 
            class="btn-download"
            title="Descargar PDF"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Descargar
          </button>
          <button 
            @click="toggleFullscreen" 
            class="btn-fullscreen"
            title="Pantalla completa"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div ref="pdfContainerRef" class="pdf-iframe-wrapper">
        <iframe
          :src="`${selectedTomo.pdfUrl}#toolbar=0&navpanes=1&scrollbar=1`"
          class="pdf-iframe"
          frameborder="0"
          type="application/pdf"
        ></iframe>
      </div>
    </div>

    <!-- Placeholder cuando no hay selección -->
    <div v-else class="pdf-placeholder">
      <svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <p class="mt-4 text-gray-500">Seleccione un tomo del Redactor para visualizarlo</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRedactorTomos } from '@/composables/useRedactorTomos'

const { tomos, tomosFaltantes } = useRedactorTomos()
const allTomos = computed(() => [...tomos, ...tomosFaltantes])

const selectedTomo = ref(null)
const pdfContainerRef = ref(null)

const selectTomo = (tomo) => {
  if (!tomo.disponible) return
  selectedTomo.value = tomo
}

const downloadPdf = () => {
  if (!selectedTomo.value?.pdfUrl) return
  
  const link = document.createElement('a')
  link.href = selectedTomo.value.pdfUrl
  link.download = `REDACTOR_TOMO_${selectedTomo.value.tomo}_${selectedTomo.value.periodo}.pdf`
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const toggleFullscreen = () => {
  const wrapper = pdfContainerRef.value
  if (!wrapper) return
  
  if (!document.fullscreenElement) {
    wrapper.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>

<style scoped>
.redactor-pdf-viewer {
  @apply w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden;
}

.tomo-selector {
  @apply border-b border-gray-200 p-6 bg-gray-50;
}

.selector-header {
  @apply mb-4;
}

.tomo-grid {
  @apply grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3;
}

.tomo-card {
  @apply flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer;
  @apply bg-white border-gray-200 hover:border-red-400 hover:shadow-md;
}

.tomo-card.selected {
  @apply border-red-600 bg-red-50 shadow-md;
}

.tomo-card.disabled {
  @apply opacity-50 cursor-not-allowed bg-gray-100;
}

.tomo-number {
  @apply font-bold text-gray-800 text-sm;
}

.tomo-periodo {
  @apply text-xs text-gray-500 mt-1;
}

.badge-yes, .badge-no {
  @apply text-xs px-2 py-0.5 rounded-full mt-2;
}

.badge-yes {
  @apply bg-green-100 text-green-700;
}

.badge-no {
  @apply bg-gray-100 text-gray-500;
}

.pdf-container {
  @apply flex flex-col;
}

.pdf-toolbar {
  @apply flex justify-between items-center p-4 bg-gray-100 border-b border-gray-200;
}

.toolbar-left, .toolbar-right {
  @apply flex items-center gap-3;
}

.btn-download, .btn-fullscreen {
  @apply flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200;
  @apply text-gray-700 hover:bg-gray-200;
}

.pdf-iframe-wrapper {
  @apply relative w-full;
  height: 70vh;
  min-height: 500px;
}

.pdf-iframe {
  @apply w-full h-full rounded-b-lg;
}

.pdf-placeholder {
  @apply flex flex-col items-center justify-center p-12;
  min-height: 400px;
}
</style>