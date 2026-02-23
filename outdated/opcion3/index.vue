<!-- pages/alternative/index.vue - VERSIÓN SIMPLE PARA PROBAR -->
<template>
<!-- Sección de Noticias Importantes - CON IMAGEN DE FONDO Y ESTADÍSTICAS - VERSIÓN CORREGIDA -->
<section class="relative py-20 overflow-hidden">
  <!-- Imagen de fondo con overlay - VERSIÓN SIMPLIFICADA -->
  <div class="absolute inset-0 z-0">
    <img 
      src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
      alt="Hemiciclo del Senado Nacional de Bolivia"
      class="w-full h-full object-cover"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/70"></div>
    <!-- Patrón simple sin problemas de encoding -->
    <div class="absolute inset-0 opacity-5 bg-dot-pattern"></div>
  </div>

  <!-- Texto decorativo sobre la imagen (fondo) -->
  <div class="absolute inset-0 z-10 pointer-events-none">
    <div class="container mx-auto px-6 h-full">
      <div class="relative h-full">
        <!-- Texto grande transparente -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
          <h2 class="text-[15rem] md:text-[25rem] font-black text-white tracking-tighter leading-none whitespace-nowrap">
            SENADO
          </h2>
        </div>
        
        <!-- Estadísticas flotantes sobre la imagen -->
        <div class="absolute top-20 right-12 z-20 hidden lg:block">
          <div class="grid grid-cols-2 gap-6">
            <div class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-[#E03636]/20 to-[#E4D294]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div class="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                <div class="text-4xl font-bold text-white mb-2">36</div>
                <div class="text-sm text-white/80 uppercase tracking-wider">Senadores</div>
                <div class="absolute -top-2 -right-2 w-4 h-4 bg-[#E4D294] rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div class="relative group">
              <div class="absolute -inset-4 bg-gradient-to-r from-[#E4D294]/20 to-[#E03636]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div class="relative bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center">
                <div class="text-4xl font-bold text-white mb-2">150+</div>
                <div class="text-sm text-white/80 uppercase tracking-wider">Sesiones</div>
                <div class="absolute -bottom-2 -left-2 w-4 h-4 bg-[#E03636] rounded-full animate-pulse animation-delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Contenido principal -->
  <div class="container relative z-20 mx-auto px-6">
    <!-- Encabezado con badge flotante -->
    <div class="text-center mb-16">
      <div class="relative inline-block mb-8">
        <div class="absolute -inset-4 bg-gradient-to-r from-[#E03636]/30 to-[#E4D294]/30 rounded-full blur-xl"></div>
        <div class="relative inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-xl rounded-2xl border border-white/20">
          <div class="w-3 h-3 bg-[#E03636] rounded-full animate-pulse"></div>
          <span class="text-lg font-bold text-white tracking-wider">COMUNICACIÓN INSTITUCIONAL</span>
          <div class="w-3 h-3 bg-[#E4D294] rounded-full animate-pulse animation-delay-300"></div>
        </div>
      </div>
      
      <h2 class="text-5xl md:text-6xl font-bold text-white mb-6">
        <span class="relative">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#E4D294]">Noticias</span>
          <span class="block text-[#E4D294]">Oficiales</span>
          <span class="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-[#E03636] via-[#E4D294] to-transparent rounded-full"></span>
        </span>
      </h2>
      <p class="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
        Información verificada y actualizada sobre las actividades legislativas del Senado Nacional
      </p>
    </div>

    <!-- Grid de noticias con fondo semitransparente -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
      <!-- Noticia 1 - Destacada -->
      <div class="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 lg:col-span-2">
        <!-- Fondo con blur -->
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        
        <!-- Contenido -->
        <div class="relative z-10 p-8">
          <!-- Badge y fecha -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <span class="px-4 py-2 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                </svg>
                DESTACADO
              </span>
              <div class="flex items-center gap-2 text-white/80">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm">15 ENE 2024</span>
              </div>
            </div>
            
            <!-- Estadística flotante -->
            <div class="hidden md:block">
              <div class="relative group/stat">
                <div class="absolute -inset-3 bg-gradient-to-r from-[#E03636]/30 to-transparent rounded-xl blur-md"></div>
                <div class="relative bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                  <div class="text-2xl font-bold text-white text-center">98%</div>
                  <div class="text-xs text-white/60">Aprobación</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Título y descripción -->
          <h3 class="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight group-hover:text-[#E4D294] transition-colors">
            Sesión Plenaria Histórica: <br>
            <span class="text-[#E4D294]">Aprobación Unánime</span> del Presupuesto Nacional
          </h3>
          
          <p class="text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
            En una sesión extraordinaria, los 36 senadores aprobaron por unanimidad el Presupuesto General del Estado 2024, 
            destinando el 65% a inversión pública en salud, educación y desarrollo social.
          </p>
          
          <!-- Información adicional -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div class="text-2xl font-bold text-white mb-1">36</div>
              <div class="text-sm text-white/80">Senadores</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div class="text-2xl font-bold text-white mb-1">245</div>
              <div class="text-sm text-white/80">Artículos</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div class="text-2xl font-bold text-white mb-1">18h</div>
              <div class="text-sm text-white/80">Duración</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div class="text-2xl font-bold text-white mb-1">100%</div>
              <div class="text-sm text-white/80">Participación</div>
            </div>
          </div>
          
          <!-- Acciones -->
          <div class="flex flex-wrap gap-4">
            <NuxtLink 
              to="/noticias/presupuesto-2024"
              class="relative px-8 py-4 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span class="relative z-10">VER ACTA COMPLETA</span>
              <svg class="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </NuxtLink>
            
            <NuxtLink 
              to="/transmision/en-vivo"
              class="relative px-8 py-4 bg-white/15 backdrop-blur-md border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/25 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group overflow-hidden"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>VER GRABACIÓN</span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Noticia 2 - Proyecto de Ley -->
      <div class="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500">
        <!-- Fondo con gradiente -->
        <div class="absolute inset-0 bg-gradient-to-br from-[#E03636]/20 via-black/50 to-[#E4D294]/20"></div>
        
        <!-- Contenido -->
        <div class="relative z-10 p-8 h-full flex flex-col">
          <!-- Encabezado con número -->
          <div class="mb-6">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-lg mb-4">
              <span class="text-sm font-bold text-white">PROYECTO DE LEY</span>
              <span class="text-[#E4D294] font-bold">N° 245/2024</span>
            </div>
            
            <!-- Número grande decorativo -->
            <div class="absolute top-4 right-4 opacity-10">
              <span class="text-8xl font-black text-white">245</span>
            </div>
          </div>
          
          <!-- Título -->
          <h3 class="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#E4D294] transition-colors">
            Ley de Protección Ambiental y Desarrollo Sostenible
          </h3>
          
          <p class="text-white/80 mb-6 flex-grow">
            Nueva legislación propuesta para fortalecer la protección de los recursos naturales y promover el desarrollo sostenible en Bolivia.
          </p>
          
          <!-- Progreso con números -->
          <div class="mb-8">
            <div class="flex justify-between text-sm text-white/80 mb-2">
              <span>Progreso Legislativo</span>
              <span class="font-bold">75%</span>
            </div>
            <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-[#E03636] via-[#E4D294] to-[#4CAF50] rounded-full" style="width: 75%"></div>
            </div>
          </div>
          
          <!-- Estadísticas del proyecto -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div class="text-lg font-bold text-white">15</div>
              <div class="text-xs text-white/60">Artículos</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div class="text-lg font-bold text-white">3</div>
              <div class="text-xs text-white/60">Comisiones</div>
            </div>
          </div>
          
          <!-- Acción -->
          <NuxtLink 
            to="/proyectos/ley-245"
            class="mt-auto w-full px-6 py-3 bg-gradient-to-r from-[#E4D294] to-[#D4BC7A] text-gray-900 font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center group"
          >
            <span class="flex items-center justify-center gap-2">
              SEGUIR PROYECTO
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Mini noticias con estadísticas - VERSIÓN CORREGIDA -->
    <div class="relative">
      <!-- Fondo para mini noticias -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/30 to-black/20 backdrop-blur-sm rounded-2xl border border-white/10"></div>
      
      <div class="relative z-10 p-8">
        <!-- Encabezado con contador -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-2xl font-bold text-white mb-2">Últimas Actualizaciones</h3>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-[#E03636] rounded-full animate-pulse"></div>
                <span class="text-sm text-white/80">24 noticias este mes</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 bg-[#E4D294] rounded-full animate-pulse animation-delay-300"></div>
                <span class="text-sm text-white/80">5 en proceso</span>
              </div>
            </div>
          </div>
          
          <!-- Contador total -->
          <div class="hidden md:block">
            <div class="relative">
              <div class="absolute -inset-4 bg-gradient-to-r from-[#E03636]/20 to-[#E4D294]/20 rounded-full blur-xl"></div>
              <div class="relative bg-black/40 backdrop-blur-md rounded-xl p-6 text-center border border-white/10">
                <div class="text-3xl font-bold text-white">2024</div>
                <div class="text-sm text-white/60 uppercase tracking-wider">Año Legislativo</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Grid de actualizaciones - CORREGIDO -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(update, index) in updates" :key="update.title" 
               class="group bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2">
            <!-- Número y hora - CORREGIDO -->
            <div class="flex items-center justify-between mb-4">
              <div 
                class="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                :style="{ background: update.color }"
              >
                {{ update.number }}
              </div>
              <div class="text-right">
                <div class="text-2xl font-bold text-white">{{ update.time }}</div>
                <div class="text-xs text-white/60">HORAS</div>
              </div>
            </div>
            
            <!-- Contenido -->
            <h4 class="font-bold text-white mb-2 group-hover:text-[#E4D294] transition-colors">
              {{ update.title }}
            </h4>
            <p class="text-sm text-white/70 mb-4">{{ update.description }}</p>
            
            <!-- Estadística pequeña -->
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
              <span class="text-xs text-white/60">{{ update.participants }} participantes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
definePageMeta({
  layout: 'alter4'
})
// Actualiza los datos en el script setup:
const updates = [
  { 
    title: 'Comisión de Justicia', 
    description: 'Reunión extraordinaria sobre reformas al Código Procesal',
    time: '14:30',
    number: '01',
    color: 'linear-gradient(135deg, #E03636 0%, #C12F2F 100%)',
    participants: '12'
  },
  { 
    title: 'Portal de Transparencia', 
    description: 'Lanzamiento de nueva plataforma digital',
    time: '11:00',
    number: '02',
    color: 'linear-gradient(135deg, #E4D294 0%, #D4BC7A 100%)',
    participants: '45'
  },
  { 
    title: 'Audiencia Pública', 
    description: 'Discusión del presupuesto educativo 2024',
    time: '09:45',
    number: '03',
    color: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
    participants: '150+'
  }
]
</script>

<style scoped>
/* Patrón de puntos para el fondo */
.bg-dot-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0);
  background-size: 40px 40px;
}

/* Animaciones personalizadas */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}
</style>