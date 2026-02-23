<!-- pages/alternative/index.vue - VERSIÓN SIMPLE PARA PROBAR -->
<template>
  <!-- Sección de Noticias Importantes - DISEÑO INSTITUCIONAL SENADO -->
  <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-6">
      <!-- Encabezado institucional -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl mb-6 border-2 border-[#8B1A1A] shadow-lg">
          <img 
            src="https://www.lostiempos.com/sites/default/files/styles/noticia_detalle/public/media_imagen/2026/1/21/bloque.jpg?itok=5sLQZVlp" 
            alt="Escudo Nacional"
            class="w-6 h-6 object-contain"
          />
          <span class="text-sm font-bold text-[#8B1A1A] tracking-wider uppercase">COMUNICADO OFICIAL DEL SENADO</span>
          <div class="w-6 h-6 rounded-full bg-gradient-to-r from-[#F9E076] via-[#F9E076] to-[#D4AF37] flex items-center justify-center">
            <span class="text-xs font-bold text-[#8B1A1A]">SN</span>
          </div>
        </div>
        
        <h2 class="text-4xl md:text-5xl font-bold text-[#1A365D] mb-6 font-serif">
          <span class="relative">
            Noticias
            <span class="text-[#8B1A1A]">Institucionales</span>
            <span class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#F9E076] via-[#D4AF37] to-[#8B1A1A] rounded-full"></span>
          </span>
        </h2>
        <p class="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
          Información oficial sobre las actividades legislativas, sesiones plenarias y decisiones del Honorable Senado Nacional de Bolivia
        </p>
      </div>

      <!-- Grid de noticias institucionales -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <!-- Noticia 1 - Sesión Plenaria Destacada -->
        <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 bg-white">
          <!-- Badge oficial -->
          <div class="absolute top-4 left-4 z-20">
            <div class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white text-xs font-bold rounded-lg shadow-lg">
              <div class="w-2 h-2 bg-[#F9E076] rounded-full animate-pulse"></div>
              <span>OFICIAL</span>
              <div class="w-2 h-2 bg-[#F9E076] rounded-full animate-pulse animation-delay-300"></div>
            </div>
          </div>
          
          <!-- Imagen institucional -->
          <div class="relative h-64 overflow-hidden">
            <img 
              src="https://www.lostiempos.com/sites/default/files/styles/noticia_detalle/public/media_imagen/2026/1/21/bloque.jpg?itok=5sLQZVlp"
              alt="Fachada del Senado Nacional de Bolivia"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <!-- Overlay con colores patrios -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#8B1A1A]/40 via-transparent to-transparent"></div>
            <!-- Banda tricolor decorativa -->
            <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D52B1E] via-[#F9E076] to-[#007934]"></div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-[#8B1A1A]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm font-medium text-gray-600">18 ENE 2024</span>
              </div>
              <span class="px-3 py-1 bg-[#F9E076]/20 text-[#8B1A1A] text-xs font-bold rounded-full border border-[#F9E076]/30">
                SESIÓN PLENARIA
              </span>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#8B1A1A] transition-colors">
              Aprobación del Presupuesto General del Estado 2024
            </h3>
            
            <p class="text-gray-600 mb-4 leading-relaxed text-sm">
              El Senado Nacional aprobó en grande y en detalle el Presupuesto General del Estado para la gestión 2024, destinando el 65% a inversión pública y desarrollo social.
            </p>
            
            <!-- Indicadores oficiales -->
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
                  <span class="text-xs font-medium text-gray-600">36 Senadores</span>
                </div>
              </div>
              
              <NuxtLink 
                to="/noticias/presupuesto-2024"
                class="inline-flex items-center gap-2 text-sm font-bold text-[#8B1A1A] hover:text-[#5C1010] transition-colors group"
              >
                Ver Acta
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Noticia 2 - Comisión Especial -->
        <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-50 to-white border border-gray-200">
          <!-- Sello de Comisión -->
          <div class="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#8B1A1A]/10 to-transparent rounded-full"></div>
          
          <div class="p-6">
            <!-- Encabezado de Comisión -->
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] flex items-center justify-center shadow-md">
                <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <div>
                <span class="block text-xs font-bold text-[#8B1A1A] uppercase tracking-wide">COMISIÓN DE</span>
                <span class="block text-lg font-bold text-gray-900">LEGISLACIÓN Y FISCALIZACIÓN</span>
              </div>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#8B1A1A] transition-colors">
              Presentación del Informe de Fiscalización a Entidades Públicas
            </h3>
            
            <p class="text-gray-600 mb-6 text-sm leading-relaxed">
              La Comisión de Legislación presenta informe detallado sobre la fiscalización de 15 entidades públicas durante el último trimestre.
            </p>
            
            <!-- Documentos adjuntos -->
            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="w-10 h-10 rounded-lg bg-[#F9E076]/20 flex items-center justify-center">
                  <span class="text-[#8B1A1A] font-bold">PDF</span>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">Informe_Completo.pdf</p>
                  <p class="text-xs text-gray-500">2.4 MB • 45 páginas</p>
                </div>
              </div>
            </div>
            
            <NuxtLink 
              to="/comisiones/fiscalizacion"
              class="inline-flex items-center justify-center w-full gap-2 px-4 py-3 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 group"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              VER INFERME COMPLETO
            </NuxtLink>
          </div>
        </div>

        <!-- Noticia 3 - Proyecto de Ley -->
        <div class="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border-2 border-[#F9E076]">
          <!-- Decoración de bandera -->
          <div class="absolute top-0 left-0 w-20 h-2 bg-gradient-to-r from-[#D52B1E] via-[#F9E076] to-[#007934]"></div>
          
          <div class="p-6 pt-8">
            <!-- Estado del Proyecto -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <span class="block text-xs font-bold text-[#8B1A1A] uppercase tracking-wide">PROYECTO DE LEY</span>
                <span class="block text-sm text-gray-600">N° 245/2023-2024</span>
              </div>
              <div class="px-4 py-1.5 bg-[#8B1A1A] text-white text-xs font-bold rounded-full">
                EN TRÁMITE
              </div>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#8B1A1A] transition-colors">
              "Ley Marco de Protección a la Madre Tierra y Desarrollo Integral"
            </h3>
            
            <p class="text-gray-600 mb-6 text-sm leading-relaxed">
              Propuesta legislativa para la protección ambiental y desarrollo sostenible, actualmente en fase de consulta pública.
            </p>
            
            <!-- Progreso legislativo -->
            <div class="mb-8">
              <div class="flex justify-between text-sm mb-2">
                <span class="font-medium text-gray-700">Progreso Legislativo</span>
                <span class="font-bold text-[#8B1A1A]">60%</span>
              </div>
              <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-gradient-to-r from-[#F9E076] via-[#D4AF37] to-[#8B1A1A] rounded-full" style="width: 60%"></div>
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
                to="/proyectos/ley-245"
                class="px-4 py-3 bg-[#8B1A1A] text-white text-sm font-bold rounded-lg hover:bg-[#5C1010] transition-colors text-center"
              >
                Seguir Proyecto
              </NuxtLink>
              <NuxtLink 
                to="/participacion/consultas"
                class="px-4 py-3 bg-[#F9E076] text-[#8B1A1A] text-sm font-bold rounded-lg hover:bg-[#D4AF37] transition-colors text-center border border-[#D4AF37]"
              >
                Participar
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Calendario Legislativo -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div class="grid md:grid-cols-3 divide-x divide-gray-200">
          <!-- Próximas Sesiones -->
          <div class="p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-xl bg-[#8B1A1A] flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Calendario Legislativo</h3>
                <p class="text-sm text-gray-600">Sesiones programadas</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div v-for="session in upcomingSessions" :key="session.date" 
                  class="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div class="text-center">
                  <div class="text-2xl font-bold text-[#8B1A1A]">{{ session.day }}</div>
                  <div class="text-xs text-gray-600 uppercase">{{ session.month }}</div>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">{{ session.title }}</h4>
                  <p class="text-sm text-gray-600">{{ session.time }} • {{ session.location }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Enlaces rápidos institucionales -->
          <div class="p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Acceso Directo</h3>
            <div class="space-y-3">
              <NuxtLink 
                v-for="link in institutionalLinks"
                :key="link.title"
                :to="link.url"
                class="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-[#8B1A1A] hover:bg-[#8B1A1A]/5 transition-all duration-300 group"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                    :style="`background: ${link.color};`">
                  <span class="text-white text-lg">{{ link.icon }}</span>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 group-hover:text-[#8B1A1A]">{{ link.title }}</h4>
                  <p class="text-xs text-gray-600">{{ link.description }}</p>
                </div>
                <svg class="w-5 h-5 text-gray-400 group-hover:text-[#8B1A1A] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Transmisión en vivo -->
          <div class="p-8 bg-gradient-to-br from-[#8B1A1A] to-[#5C1010] text-white">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold">Transmisión en Vivo</h3>
                <p class="text-sm text-white/80">Sesiones en tiempo real</p>
              </div>
            </div>
            
            <div class="space-y-4">
              <div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium">Sesión Plenaria</span>
                  <span class="px-2 py-1 bg-[#F9E076] text-[#8B1A1A] text-xs font-bold rounded">EN VIVO</span>
                </div>
                <p class="text-sm text-white/90 mb-3">Discusión de proyectos de ley</p>
                <NuxtLink 
                  to="/transmision/en-vivo"
                  class="inline-flex items-center gap-2 w-full justify-center px-4 py-2 bg-white text-[#8B1A1A] font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  VER TRANSMISIÓN
                </NuxtLink>
              </div>
              
              <div class="text-center">
                <p class="text-sm text-white/80 mb-2">Próxima transmisión:</p>
                <p class="font-bold">22 ENE • 09:00 AM</p>
                <p class="text-sm text-white/80">Sesión de Comisiones</p>
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
  layout: 'alter3'
})
// Esta función podría usarse para forzar mostrar el menú
const institutionalLinks = [
  {
    title: 'Gaceta Oficial',
    description: 'Documentos legislativos oficiales',
    url: '/gaceta-oficial',
    color: 'linear-gradient(135deg, #8B1A1A 0%, #5C1010 100%)',
    icon: '📜'
  },
  {
    title: 'Legisladores',
    description: 'Listado de Senadores Nacionales',
    url: '/legisladores',
    color: 'linear-gradient(135deg, #F9E076 0%, #D4AF37 100%)',
    icon: '👥'
  },
  {
    title: 'Comisiones',
    description: 'Comisiones legislativas activas',
    url: '/comisiones',
    color: 'linear-gradient(135deg, #007934 0%, #005522 100%)',
    icon: '🏛️'
  },
  {
    title: 'Transparencia',
    description: 'Información pública institucional',
    url: '/transparencia',
    color: 'linear-gradient(135deg, #D52B1E 0%, #A81C1C 100%)',
    icon: '🔍'
  }
]
</script>