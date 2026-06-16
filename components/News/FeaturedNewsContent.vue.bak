<!-- components/News/FeaturedNewsContent.vue -->
<template>
  <div>
    <div v-if="news.type === 'official'" class="official-news">
      <!-- Badge oficial -->
      <div class="absolute top-4 left-4 z-20">
        <div class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white text-xs font-bold rounded-lg shadow-lg">
          <div class="w-2 h-2 bg-[#F9E076] rounded-full animate-pulse"></div>
          <span>OFICIAL</span>
          <div class="w-2 h-2 bg-[#F9E076] rounded-full animate-pulse animation-delay-300"></div>
        </div>
      </div>
      
      <!-- Imagen -->
      <div class="relative h-64 overflow-hidden">
        <img 
          :src="news.image"
          :alt="news.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#8B1A1A]/40 via-transparent to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D52B1E] via-[#F9E076] to-[#007934]"></div>
      </div>

      <!-- Contenido -->
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#8B1A1A]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
            </svg>
            <span class="text-sm font-medium text-gray-600">{{ news.date }}</span>
          </div>
          <span class="px-3 py-1 bg-[#F9E076]/20 text-[#8B1A1A] text-xs font-bold rounded-full border border-[#F9E076]/30">
            {{ news.category }}
          </span>
        </div>
        
        <h3 class="text-xl font-bold text-gray-900 mb-3 leading-tight transition-colors group-hover:text-[#8B1A1A]">
          {{ news.title }}
        </h3>
        
        <p class="text-gray-600 mb-4 leading-relaxed text-sm">
          {{ news.description }}
        </p>
        
        <!-- Indicadores -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-[#8B1A1A]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs font-medium text-gray-600">Aprobado</span>
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs font-medium text-gray-600">{{ news.details.senators }} Senadores</span>
            </div>
          </div>
          
          <NuxtLink 
            :to="news.link"
            class="inline-flex items-center gap-2 text-sm font-bold text-[#8B1A1A] transition-colors hover:text-[#5C1010] group"
          >
            Ver Acta
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Para comisiones -->
    <div v-else-if="news.type === 'commission'" class="p-6">
      <!-- Sello de Comisión -->
      <div class="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#8B1A1A]/10 to-transparent rounded-full"></div>
      
      <!-- Encabezado de Comisión -->
      <div class="flex items-center gap-4 mb-6">
        <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] flex items-center justify-center shadow-md">
          <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <div>
          <span class="block text-xs font-bold text-[#8B1A1A] uppercase tracking-wide">COMISIÓN DE</span>
          <span class="block text-lg font-bold text-gray-900">{{ news.commission }}</span>
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4 leading-tight transition-colors group-hover:text-[#8B1A1A]">
        {{ news.title }}
      </h3>
      
      <p class="text-gray-600 mb-6 text-sm leading-relaxed">
        {{ news.description }}
      </p>
      
      <!-- Documentos adjuntos -->
      <div class="space-y-3 mb-6">
        <div 
          v-for="doc in news.documents" 
          :key="doc.name"
          class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100"
        >
          <div class="w-10 h-10 rounded-lg bg-[#F9E076]/20 flex items-center justify-center">
            <span class="text-[#8B1A1A] font-bold">PDF</span>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ doc.name }}</p>
            <p class="text-xs text-gray-500">{{ doc.size }} • {{ doc.pages }} páginas</p>
          </div>
        </div>
      </div>
      
      <NuxtLink 
        :to="news.link"
        class="inline-flex items-center justify-center w-full gap-2 px-4 py-3 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg group"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        VER INFERME COMPLETO
      </NuxtLink>
    </div>

    <!-- Para proyectos de ley -->
    <div v-else-if="news.type === 'bill'" class="p-6 pt-8">
      <!-- Decoración de bandera -->
      <div class="absolute top-0 left-0 w-20 h-2 bg-gradient-to-r from-[#D52B1E] via-[#F9E076] to-[#007934]"></div>
      
      <!-- Estado del Proyecto -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <span class="block text-xs font-bold text-[#8B1A1A] uppercase tracking-wide">PROYECTO DE LEY</span>
          <span class="block text-sm text-gray-600">{{ news.billNumber }}</span>
        </div>
        <div class="px-4 py-1.5 bg-[#8B1A1A] text-white text-xs font-bold rounded-full">
          {{ news.status }}
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 mb-4 leading-tight transition-colors group-hover:text-[#8B1A1A]">
        "{{ news.title }}"
      </h3>
      
      <p class="text-gray-600 mb-6 text-sm leading-relaxed">
        {{ news.description }}
      </p>
      
      <!-- Progreso legislativo -->
      <div class="mb-8">
        <div class="flex justify-between text-sm mb-2">
          <span class="font-medium text-gray-700">Progreso Legislativo</span>
          <span class="font-bold text-[#8B1A1A]">{{ news.progress }}%</span>
        </div>
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-[#F9E076] via-[#D4AF37] to-[#8B1A1A] rounded-full animate-progress" 
            :style="{ width: news.progress + '%' }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span>Presentación</span>
          <span>Comisión</span>
          <span>Plenaria</span>
          <span>Aprobación</span>
        </div>
      </div>
      
      <!-- Acciones -->
      <div class="grid grid-cols-2 gap-3">
        <NuxtLink 
          :to="news.link"
          class="px-4 py-3 bg-[#8B1A1A] text-white text-sm font-bold rounded-lg transition-colors hover:bg-[#5C1010] text-center"
        >
          Seguir Proyecto
        </NuxtLink>
        <NuxtLink 
          to="/participacion/consultas"
          class="px-4 py-3 bg-[#F9E076] text-[#8B1A1A] text-sm font-bold rounded-lg transition-colors hover:bg-[#D4AF37] text-center border border-[#D4AF37]"
        >
          Participar
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
@keyframes progressBar {
  from {
    width: 0;
  }
  to {
    width: var(--progress-width, 60%);
  }
}

.animate-progress {
  animation: progressBar 1.5s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 300ms;
}
</style>