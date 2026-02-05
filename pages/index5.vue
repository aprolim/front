<!-- pages/index.vue - VERSIÓN CON EFECTO "TRANSICIÓN PATRIÓTICA" Y CARRUSEL -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section con efecto de transición Y CARRUSEL -->
    <section 
      class="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden transition-all duration-500"
      :class="{ 'min-h-[40vh] md:min-h-[45vh] pt-20': scrolled }"
      ref="heroSection"
    >
      <!-- CARRUSEL de imágenes/video -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <!-- Overlay de gradiente dinámico -->
        <div 
          class="absolute inset-0 transition-all duration-500 z-10"
          :class="scrolled 
            ? 'bg-gradient-to-b from-black/80 via-black/50 to-black/30' 
            : 'bg-gradient-to-r from-black/70 via-black/40 to-transparent'"
        ></div>
        
        <!-- Gradiente adicional -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#E03636]/20 to-[#E4D294]/10 z-10"></div>
        
        <!-- Contenedor del carrusel -->
        <div class="relative w-full h-full">
          <!-- Imágenes del carrusel -->
          <div 
            v-for="(media, index) in heroMedia" 
            :key="index"
            class="absolute inset-0 transition-all duration-1000 ease-in-out"
            :class="{
              'opacity-100 z-10': currentMediaIndex === index,
              'opacity-0 z-0': currentMediaIndex !== index
            }"
          >
            <!-- Si es imagen -->
            <img 
              v-if="media.type === 'image'"
              :src="media.url"
              :alt="media.alt"
              class="w-full h-full object-cover object-center transition-transform duration-700"
              :class="{ 'scale-105 brightness-75': scrolled }"
            />
            
            <!-- Si es video -->
            <video 
              v-else-if="media.type === 'video'"
              :src="media.url"
              class="w-full h-full object-cover object-center"
              :class="{ 'scale-105 brightness-75': scrolled }"
              autoplay
              muted
              loop
              playsinline
            ></video>
          </div>
        </div>
        
        <!-- Escudo Nacional que aparece al hacer scroll -->
        <div 
          class="absolute inset-0 flex items-center justify-center transition-all duration-700 z-20"
          :class="scrolled ? 'opacity-20' : 'opacity-0'"
        >
          <div class="relative w-64 h-64 md:w-80 md:h-80">
            <!-- Banda tricolor animada -->
            <div class="absolute inset-0 flex flex-col rounded-full overflow-hidden shadow-2xl">
              <div class="flex-1 bg-[#D52B1E] animate-color-pulse-red"></div>
              <div class="flex-1 bg-[#F9E076] animate-color-pulse-yellow"></div>
              <div class="flex-1 bg-[#007934] animate-color-pulse-green"></div>
            </div>
            <!-- Escudo central -->
            <div class="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-inner">
              <div class="text-center">
                <div class="text-2xl md:text-3xl font-bold text-[#8B1A1A]">SN</div>
                <div class="text-xs md:text-sm font-semibold text-gray-700 mt-1">SENADO NACIONAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenido sobre la imagen - TODO IGUAL -->
      <div class="container relative z-10 mx-auto px-6 md:px-12 py-16 mt-32 md:mt-52">
        <div class="max-w-4xl mx-auto">
          <!-- Logo/Texto que se transforma -->
          <div class="mb-8 md:mb-12 transition-all duration-500" :class="{ 'transform scale-90 md:scale-95': scrolled }">
            <!-- Versión grande (hero) -->
            
            
            <!-- Versión compacta (al hacer scroll) -->
            <div 
              class="transition-all duration-500 flex items-center gap-4"
              :class="scrolled ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'"
            >
              <div class="w-16 h-16 rounded-xl bg-gradient-to-br from-[#8B1A1A] to-[#5C1010] flex items-center justify-center shadow-lg border-2 border-[#F9E076]/50">
                <span class="text-white font-bold text-xl">SN</span>
              </div>
              <div>
                <h2 class="text-2xl md:text-3xl font-bold text-white">Senado Nacional</h2>
                <p class="text-sm text-white/80">Estado Plurinacional de Bolivia</p>
              </div>
            </div>
          </div>

          <!-- Descripción -->
          <p 
            class="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed transition-all duration-500"
            ref="heroDescription"
            :class="{ 'opacity-0 h-0 overflow-hidden': scrolled }"
          >
            Primera legislatura del tricentenario.
          </p>

          <!-- Línea decorativa -->
          <div 
            class="w-24 h-1 bg-gradient-to-r from-[#E03636] to-[#E4D294] mb-8 rounded-full transition-all duration-500"
            ref="heroLine"
            :class="{ 'opacity-0': scrolled }"
          ></div>

          <!-- Botones principales (se ocultan al hacer scroll) - LOS 5 NUXTLINK SE MANTIENEN -->
          <div 
            class="mt-12 grid grid-cols-2 md:grid-cols-5 gap-6 transition-all duration-500"
            ref="heroButtons"
            :class="{ 'opacity-0 h-0 overflow-hidden': scrolled }"
          >
            <NuxtLink 
              to="/la-institucion" 
              class="px-8 py-4 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group relative"
            >
              <svg class="w-12 h-12 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              
              <!-- Tooltip que aparece al hover -->
              <div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg">
                Ver información institucional
                <!-- Triángulo del tooltip -->
                <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </NuxtLink>
            <NuxtLink 
              to="/la-institucion" 
              class="px-8 py-4 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group relative overflow-visible"
            >
              <svg class="w-12 h-12 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              
              <!-- Etiqueta informativa -->
              <div class="absolute -top-2 -right-2 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white text-xs font-bold px-3 py-1 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-200 whitespace-nowrap shadow-lg border border-white/20">
                Más información
              </div>
            </NuxtLink>
            <NuxtLink 
              to="/la-institucion" 
              class="px-8 py-4 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
              title="Información Institucional del Senado"
            >
              <div class="relative">
                <svg class="w-12 h-12 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                
                <!-- Indicador de hover -->
                <div class="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#8B1A1A]/20 to-[#F9E076]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <!-- Tooltip elegante -->
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mb-2">
                <div class="relative">
                  <!-- Texto del tooltip -->
                  <div class="px-4 py-2 bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10">
                    Información Institucional
                    <!-- Flecha del tooltip -->
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-gray-900/95"></div>
                  </div>
                </div>
              </div>
            </NuxtLink>
            <NuxtLink 
              to="/la-institucion" 
              class="px-8 py-4 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center group relative"
              aria-label="Información Institucional del Senado Nacional"
            >
              <div class="relative flex items-center justify-center">
                <!-- Icono con anillo animado -->
                <div class="absolute w-16 h-16 rounded-full border-2 border-white/30 group-hover:border-white/60 transition-all duration-300 scale-0 group-hover:scale-100"></div>
                
                <svg class="w-12 h-12 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
              
              <!-- Tooltip que aparece abajo -->
              <div class="absolute left-1/2 top-full transform -translate-x-1/2 mt-3">
                <div class="relative">
                  <!-- Contenedor del tooltip -->
                  <div class="bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium rounded-lg px-4 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10 z-50">
                    Información Institucional
                    <!-- Flecha del tooltip (opcional) -->
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 border-8 border-transparent border-b-gray-900/95"></div>
                  </div>
                </div>
              </div>
            </NuxtLink>
            
            <NuxtLink 
              to="/la-institucion" 
              class="px-4 py-4 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group relative"
            >
              <svg class="w-12 h-12 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
              
              <!-- Texto que aparece abajo -->
              <span class="absolute left-1/2 top-full transform -translate-x-1/2 mt-3 px-3 py-2 bg-white/20 backdrop-blur-md text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none transform translate-y-2 group-hover:translate-y-0 border border-white/30 z-50">
                Acceder a la información institucional
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Indicadores del carrusel (sutiles, opcionales) -->
      <div v-if="!scrolled" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        <div 
          v-for="(media, index) in heroMedia" 
          :key="index"
          class="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
          :class="currentMediaIndex === index 
            ? 'bg-white w-6' 
            : 'bg-white/50 hover:bg-white/80'"
          @click="goToMedia(index)"
        ></div>
      </div>

      <!-- Barra de progreso de scroll -->
      <div 
        class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-opacity duration-500"
        :class="{ 'opacity-100': scrolled, 'opacity-0': !scrolled }"
      >
        <div 
          class="h-full bg-gradient-to-r from-[#D52B1E] via-[#F9E076] to-[#007934] transition-all duration-300"
          :style="{ width: scrollProgress + '%' }"
        ></div>
      </div>
    </section>

    <!-- TRANSICIÓN ELEGANTE ENTRE SECCIONES -->
    <div class="relative h-16 -mt-8 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white"></div>
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E03636]/30 to-transparent"></div>
    </div>

    <!-- Sección de Noticias Importantes con efecto "Revelado Oficial" -->
    <section 
      class="pt-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      ref="newsSection"
    >
      <!-- Elementos decorativos de fondo -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B1A1A] via-[#F9E076] to-[#007934]"></div>
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-[#8B1A1A]/5 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-[#F9E076]/5 rounded-full blur-3xl"></div>
      
      <div class="container mx-auto px-10 relative z-10">
        

        <!-- Grid de noticias con entrada escalonada -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16" ref="newsGrid">
          <!-- Noticia 1 - Sesión Plenaria Destacada -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isInView }"
            :style="{ transitionDelay: '0ms' }"
          >
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
              
              <h3 class="text-xl font-bold text-gray-900 mb-3 leading-tight transition-colors group-hover:text-[#8B1A1A]">
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

          <!-- Noticia 2 - Comisión Especial -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isInView }"
            :style="{ transitionDelay: '150ms' }"
          >
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
              
              <h3 class="text-xl font-bold text-gray-900 mb-4 leading-tight transition-colors group-hover:text-[#8B1A1A]">
                Presentación del Informe de Fiscalización a Entidades Públicas
              </h3>
              
              <p class="text-gray-600 mb-6 text-sm leading-relaxed">
                La Comisión de Legislación presenta informe detallado sobre la fiscalización de 15 entidades públicas durante el último trimestre.
              </p>
              
              <!-- Documentos adjuntos -->
              <div class="space-y-3 mb-6">
                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
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
                class="inline-flex items-center justify-center w-full gap-2 px-4 py-3 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg group"
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
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isInView }"
            :style="{ transitionDelay: '300ms' }"
          >
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
              
              <h3 class="text-xl font-bold text-gray-900 mb-4 leading-tight transition-colors group-hover:text-[#8B1A1A]">
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
                  <div class="h-full bg-gradient-to-r from-[#F9E076] via-[#D4AF37] to-[#8B1A1A] rounded-full animate-progress" style="width: 60%"></div>
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
        </div>

    
      </div>
    </section>
    <!-- NUEVA SECCIÓN: Más Noticias (4 noticias) -->
    <section 
      class="bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      ref="moreNewsSection"
    >
      <!-- Elemento decorativo -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8B1A1A]/10 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#F9E076]/10 to-transparent rounded-full blur-3xl"></div>
      <div class="container mx-auto px-10 relative z-10">
        <!-- Encabezado de la sección -->
        <div class="text-center mb-12">
          
          
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Últimas <span class="text-[#8B1A1A]">Noticias</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Información actualizada sobre las actividades legislativas del Senado Nacional
          </p>
        </div>

        <!-- Grid de 4 noticias -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" ref="moreNewsGrid">
          
          <!-- Noticia 1 -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isMoreNewsInView }"
            :style="{ transitionDelay: '0ms' }"
          >
            <!-- Imagen -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Sesión parlamentaria"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white text-xs font-bold rounded-full shadow-lg">
                  EDUCACIÓN
                </span>
              </div>
            </div>
            
            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-medium text-[#8B1A1A]">Comisión de Educación</span>
                <span class="text-xs text-gray-500">22 ENE</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
                Reforma Educativa para áreas rurales aprobada
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                Nueva ley busca mejorar la calidad educativa en comunidades rurales con programas de capacitación docente.
              </p>
              
              <NuxtLink 
                to="/noticias/reforma-educativa"
                class="text-sm font-bold text-[#8B1A1A] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
              >
                Leer más
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Noticia 2 -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isMoreNewsInView }"
            :style="{ transitionDelay: '150ms' }"
          >
            <!-- Imagen -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://online.udla.edu.ec/images/estudiantes-maestria-salud_700w.webp"
                alt="Salud pública"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-gradient-to-r from-[#F9E076] to-[#D4AF37] text-gray-900 text-xs font-bold rounded-full shadow-lg">
                  SALUD
                </span>
              </div>
            </div>
            
            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-medium text-[#D4AF37]">Comisión de Salud</span>
                <span class="text-xs text-gray-500">20 ENE</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
                Plan Nacional de Hospitales 2024-2026
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                Inversión de $500M para modernizar 45 hospitales públicos en todo el territorio nacional.
              </p>
              
              <NuxtLink 
                to="/noticias/plan-hospitalario"
                class="text-sm font-bold text-[#8B1A1A] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
              >
                Leer más
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Noticia 3 -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isMoreNewsInView }"
            :style="{ transitionDelay: '300ms' }"
          >
            <!-- Imagen -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Medio ambiente"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-gradient-to-r from-[#007934] to-[#005C26] text-white text-xs font-bold rounded-full shadow-lg">
                  MEDIO AMBIENTE
                </span>
              </div>
            </div>
            
            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-medium text-[#007934]">Comisión Ambiental</span>
                <span class="text-xs text-gray-500">18 ENE</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
                Protección de bosques nativos ampliada
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                Nueva legislación protege 2M hectáreas adicionales de bosques nativos contra deforestación ilegal.
              </p>
              
              <NuxtLink 
                to="/noticias/proteccion-bosques"
                class="text-sm font-bold text-[#8B1A1A] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
              >
                Leer más
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <!-- Noticia 4 -->
          <div 
            class="news-card opacity-0 translate-y-8"
            :class="{ 'card-visible': isMoreNewsInView }"
            :style="{ transitionDelay: '450ms' }"
          >
            <!-- Imagen -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Tecnología"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-gradient-to-r from-[#575756] to-[#3A3A39] text-white text-xs font-bold rounded-full shadow-lg">
                  TECNOLOGÍA
                </span>
              </div>
            </div>
            
            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-medium text-[#575756]">Innovación Digital</span>
                <span class="text-xs text-gray-500">16 ENE</span>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#8B1A1A] transition-colors">
                Nueva plataforma digital del Senado
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-3">
                Sistema permite seguimiento en tiempo real de sesiones y participación ciudadana en proyectos de ley.
              </p>
              
              <NuxtLink 
                to="/noticias/plataforma-digital"
                class="text-sm font-bold text-[#8B1A1A] hover:text-[#5C1010] transition-colors inline-flex items-center gap-1 group"
              >
                Leer más
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Botón para más noticias -->
        <div class="text-center mt-12">
          <NuxtLink 
            to="/noticias"
            class="inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white font-bold rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
          >
            <span>Ver todas las noticias</span>
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </NuxtLink>
        </div>
        <br>
      </div>
    </section>

    <!-- Parte de los senadores -->
    <div class="container mx-auto px-10 ">
      <SenateChamber
        :show-footer="false"
      >
        <template #header>
          <div class="custom-header">
            <h2>Distribución del Senado 2024</h2>
            <p>Selecciona un senador para ver detalles</p>
          </div>
        </template>
      </SenateChamber>
    </div>
    <div class="container mx-auto px-10 ">
      <MuseumSectionMinimal
      :dark-mode="darkMode"
      @collection-selected="handleCollectionSelect"
      @exhibition-selected="handleExhibitionSelect"
      @program-registration="handleProgramRegistration"
      @virtual-tour-started="handleVirtualTour"
      @donation-clicked="handleDonationClick"
    />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import SenateChamber from '@/components/SenateChamber.vue'
import MuseumSectionMinimal from '@/components/MuseumSectionMinimal.vue'

const route = useRoute()

// Estados reactivos para configuración
const useVideo = ref(false)
const mediaCount = ref(3)
const transitionTime = ref(5000)

// Media para el hero
const heroMedia = ref([
  // Video del Senado de Bolivia
  {
    type: 'video',
    url: 'https://senado.gob.bo//assets/intro2025-C9lburAD.mp4',
    alt: 'Video institucional del Senado de Bolivia'
  },
  // Imágenes
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Edificio del Senado Nacional de Bolivia'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Arquitectura gubernamental'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Bandera de Bolivia'
  }
])

// Actualizar configuración basada en query params
const updateConfigFromQuery = () => {
  console.log('🔄 Actualizando configuración desde query params')
  console.log('Query params actuales:', route.query)
  
  const query = route.query
  
  // Verificar si hay parámetro video en la URL
  const hasVideoParam = 'video' in query
  console.log('¿Hay parámetro video en URL?:', hasVideoParam)
  
  if (hasVideoParam) {
    useVideo.value = query.video === 'true' || query.video === '1'
    console.log('useVideo configurado desde URL:', useVideo.value)
  } else {
    // Si no hay parámetro, usar false por defecto
    useVideo.value = false
    console.log('No hay parámetro video, usando valor por defecto:', useVideo.value)
  }
  
  if (query.images) {
    mediaCount.value = parseInt(query.images) || 3
  }
  
  if (query.transition) {
    transitionTime.value = parseInt(query.transition) || 5000
  }
  
  console.log('✅ Configuración final:', {
    useVideo: useVideo.value,
    mediaCount: mediaCount.value,
    transitionTime: transitionTime.value
  })
}

// Watch para cambios en la ruta
watch(() => route.query, () => {
  console.log('📡 Query params cambiaron:', route.query)
  updateConfigFromQuery()
  // Forzar reinicio del carrusel
  setTimeout(() => {
    startCarousel()
  }, 100)
}, { immediate: true })

// Filtrar media según configuración - SOLO VIDEO o SOLO IMÁGENES
const filteredHeroMedia = computed(() => {
  console.log('🎞️ Filtrando media. useVideo:', useVideo.value)
  
  let media = [...heroMedia.value]
  
  if (useVideo.value) {
    console.log('✅ MODO VIDEO ACTIVADO - Mostrando SOLO video del Senado')
    
    // Filtrar SOLO el video
    const video = media.find(m => m.type === 'video')
    if (video) {
      console.log('🎬 Video encontrado:', video.alt)
      console.log('🎬 URL del video:', video.url)
      // Devolver solo el video
      return [video]
    } else {
      console.log('⚠️ No se encontró video en el array')
      return []
    }
    
  } else {
    console.log('❌ MODO SOLO IMÁGENES - Removiendo video, mostrando imágenes')
    // Filtrar SOLO imágenes, sin video
    media = media.filter(m => m.type === 'image')
    
    // Limitar número según configuración
    const result = media.slice(0, mediaCount.value)
    console.log('📊 Imágenes resultantes (', result.length, 'elementos):', result.map(m => ({ alt: m.alt.substring(0, 30) + '...' })))
    
    return result
  }
})

// Carrusel automático - COMPORTAMIENTO DIFERENTE PARA VIDEO/IMÁGENES
const currentMediaIndex = ref(0)
let carouselInterval = null

const startCarousel = () => {
  clearInterval(carouselInterval)
  
  console.log('🚀 Iniciando carrusel')
  console.log('📏 Número de elementos:', filteredHeroMedia.value.length)
  console.log('⏱️ Intervalo:', transitionTime.value, 'ms')
  console.log('🔤 Tipo de contenido:', useVideo.value ? 'VIDEO SOLO' : 'IMÁGENES')
  
  if (filteredHeroMedia.value.length === 0) {
    console.log('⚠️ No hay elementos en el carrusel')
    return
  }
  
  // Reiniciar índice
  currentMediaIndex.value = 0
  
  console.log('🎯 Índice inicial:', currentMediaIndex.value)
  console.log('🎬 Elemento inicial:', filteredHeroMedia.value[currentMediaIndex.value]?.type)
  
  // Si es SOLO VIDEO, no necesitamos intervalo (el video se reproduce solo)
  if (useVideo.value) {
    console.log('🎥 Modo video - NO hay transición automática (se reproduce el video)')
    // No establecer intervalo para video
    return
  }
  
  // Solo para imágenes: establecer intervalo de cambio
  if (filteredHeroMedia.value.length > 1) {
    console.log('🖼️ Modo imágenes - Activando transición cada', transitionTime.value, 'ms')
    carouselInterval = setInterval(() => {
      nextMedia()
    }, transitionTime.value)
  } else {
    console.log('📸 Solo una imagen - Sin transición')
  }
}

const nextMedia = () => {
  if (filteredHeroMedia.value.length <= 1) return
  
  const newIndex = (currentMediaIndex.value + 1) % filteredHeroMedia.value.length
  console.log('🔄 Cambiando imagen:', currentMediaIndex.value, '→', newIndex)
  
  currentMediaIndex.value = newIndex
}

const goToMedia = (index) => {
  if (index >= 0 && index < filteredHeroMedia.value.length) {
    currentMediaIndex.value = index
    if (!useVideo.value) {
      startCarousel()
    }
  }
}

// Pausar/reanudar carrusel (solo para imágenes)
const pauseCarousel = () => {
  if (carouselInterval && !useVideo.value) {
    clearInterval(carouselInterval)
    console.log('⏸️ Carrusel pausado')
  }
}

const resumeCarousel = () => {
  if (!useVideo.value && filteredHeroMedia.value.length > 1) {
    startCarousel()
    console.log('▶️ Carrusel reanudado')
  }
}

// ===== CÓDIGO ORIGINAL DEL COMPONENTE =====
const darkMode = ref(false)

const handleCollectionSelect = (collection) => {
  console.log('Colección seleccionada desde la página:', collection)
}

const handleExhibitionSelect = (exhibition) => {
  console.log('Exhibición seleccionada desde la página:', exhibition)
}

const handleProgramRegistration = (program) => {
  console.log('Registro a programa desde la página:', program)
}

const handleVirtualTour = () => {
  console.log('Tour virtual iniciado desde la página')
}

const handleDonationClick = () => {
  console.log('Donación solicitada desde la página')
}

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
}

const museumRef = ref()

const updateMuseumData = () => {
  if (museumRef.value) {
    museumRef.value.updateMuseumData({
      name: "Museo Actualizado del Senado",
    })
  }
}

// Refs para animaciones
const heroSection = ref(null)
const heroDescription = ref(null)
const heroLine = ref(null)
const heroButtons = ref(null)
const newsSection = ref(null)
const newsGrid = ref(null)
const moreNewsSection = ref(null)
const moreNewsGrid = ref(null)

// Estados para controlar efectos
const scrolled = ref(false)
const scrollProgress = ref(0)
const isInView = ref(false)
const isMoreNewsInView = ref(false)

// Controlador de scroll
const handleScroll = () => {
  if (!heroSection.value) return
  
  const scrollPosition = window.scrollY
  const heroHeight = heroSection.value.offsetHeight
  
  // Calcular progreso de scroll (0% a 100%)
  const progress = Math.min(scrollPosition / (heroHeight * 0.5), 1) * 100
  scrollProgress.value = progress
  
  // Activar estado "scrolled" cuando se haya hecho scroll suficiente
  scrolled.value = scrollPosition > 100
}

onMounted(() => {
  // Iniciar carrusel
  startCarousel()
  
  // Agregar eventos para pausar/reanudar carrusel (solo para imágenes)
  const heroEl = heroSection.value
  if (heroEl) {
    heroEl.addEventListener('mouseenter', pauseCarousel)
    heroEl.addEventListener('mouseleave', resumeCarousel)
  }

  // Animación inicial del hero
  setTimeout(() => {
    if (heroDescription.value) heroDescription.value.classList.add('animate-fade-up')
    if (heroLine.value) heroLine.value.classList.add('animate-width-expand')
    if (heroButtons.value) {
      Array.from(heroButtons.value.children).forEach((btn, index) => {
        btn.style.animationDelay = `${index * 100}ms`
        btn.classList.add('animate-fade-up')
      })
    }
  }, 300)

  // Agregar listener de scroll
  window.addEventListener('scroll', handleScroll)
  handleScroll()

  // Observer para la sección de noticias principales
  const newsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isInView.value = true
          
          setTimeout(() => {
            if (newsGrid.value) {
              const cards = newsGrid.value.children
              Array.from(cards).forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('card-visible')
                }, index * 150)
              })
            }
          }, 800)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  )

  // Observer para la sección de más noticias
  const moreNewsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isMoreNewsInView.value = true
          
          setTimeout(() => {
            if (moreNewsGrid.value) {
              const cards = moreNewsGrid.value.children
              Array.from(cards).forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add('card-visible')
                }, index * 150)
              })
            }
          }, 300)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  if (newsSection.value) {
    newsObserver.observe(newsSection.value)
  }

  if (moreNewsSection.value) {
    moreNewsObserver.observe(moreNewsSection.value)
  }

  // Limpiar eventos al desmontar
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    clearInterval(carouselInterval)
    
    if (heroSection.value) {
      heroSection.value.removeEventListener('mouseenter', pauseCarousel)
      heroSection.value.removeEventListener('mouseleave', resumeCarousel)
    }
    
    if (newsSection.value) {
      newsObserver.unobserve(newsSection.value)
    }
    if (moreNewsSection.value) {
      moreNewsObserver.unobserve(moreNewsSection.value)
    }
  })
})

// ===== FUNCIONES DE CONTROL DEL CARRUSEL =====

// Función para DEBUG completo
const debugCarrusel = () => {
  console.log('🔍 === DEBUG CARRUSEL ===')
  console.log('URL:', window.location.href)
  console.log('Query params:', route.query)
  console.log('Configuración:', {
    useVideo: useVideo.value,
    mediaCount: mediaCount.value,
    transitionTime: transitionTime.value
  })
  console.log('---')
  console.log('Media filtrada:', filteredHeroMedia.value)
  console.log('---')
  console.log('Índice actual:', currentMediaIndex.value)
  console.log('Elemento ACTUAL:', filteredHeroMedia.value[currentMediaIndex.value])
  console.log('=== FIN DEBUG ===')
  
  return 'Debug completado'
}

// Función para ACTIVAR VIDEO manualmente
const activarVideo = () => {
  console.log('🎬 ACTIVANDO VIDEO MANUALMENTE')
  useVideo.value = true
  startCarousel()
  return 'Video activado'
}

// Función para DESACTIVAR VIDEO manualmente
const desactivarVideo = () => {
  console.log('🖼️ DESACTIVANDO VIDEO - Mostrando imágenes')
  useVideo.value = false
  startCarousel()
  return 'Video desactivado, mostrando imágenes'
}

// Función para cambiar a video específico
const cambiarVideo = (videoUrl, altText = 'Video institucional del Senado') => {
  // Actualizar la URL del video en heroMedia
  const videoIndex = heroMedia.value.findIndex(m => m.type === 'video')
  if (videoIndex !== -1) {
    heroMedia.value[videoIndex].url = videoUrl
    heroMedia.value[videoIndex].alt = altText
    console.log('🎥 Video cambiado a:', videoUrl)
  }
  
  // Activar video
  activarVideo()
  return 'Video cambiado y activado'
}

// Función para cambiar imágenes
const cambiarImagenes = (imageUrls = []) => {
  if (imageUrls.length > 0) {
    // Crear nuevo array de imágenes
    const nuevasImagenes = imageUrls.map((url, index) => ({
      type: 'image',
      url: url,
      alt: `Imagen institucional ${index + 1}`
    }))
    
    // Mantener el video y reemplazar imágenes
    const video = heroMedia.value.find(m => m.type === 'video')
    heroMedia.value = video ? [video, ...nuevasImagenes] : nuevasImagenes
    
    console.log('🖼️ Imágenes cambiadas:', imageUrls.length, 'imágenes')
  }
  
  // Desactivar video para mostrar imágenes
  desactivarVideo()
  return 'Imágenes cambiadas'
}

// Función para probar
const probarFuncionamiento = () => {
  console.log('🧪 PROBANDO FUNCIONAMIENTO')
  console.log('URL actual:', window.location.href)
  console.log('useVideo actual:', useVideo.value)
  console.log('filteredHeroMedia:', filteredHeroMedia.value)
  
  // Mostrar alerta
  alert(
    `ESTADO ACTUAL:\n\n` +
    `URL: ${window.location.href}\n` +
    `Modo video: ${useVideo.value ? 'ACTIVADO' : 'DESACTIVADO'}\n` +
    `Contenido mostrado: ${filteredHeroMedia.value.length} elemento(s)\n` +
    `Tipo: ${filteredHeroMedia.value[0]?.type || 'Ninguno'}\n\n` +
    `Para activar video: ?video=true\n` +
    `Para desactivar: ?video=false o sin parámetro`
  )
  
  return 'Prueba completada'
}

// ===== FUNCIONES ORIGINALES =====

// Enlaces de acceso rápido
definePageMeta({
  layout: 'alter8'
})

const quickLinks = [
  {
    title: 'Legisladores',
    description: 'Conoce a los representantes',
    link: '/legisladores',
    color: 'linear-gradient(135deg, #8B1A1A 0%, #5C1010 100%)',
    icon: '👥'
  },
  {
    title: 'Proyectos de Ley',
    description: 'Seguimiento legislativo',
    link: '/gestion-legislativa',
    color: 'linear-gradient(135deg, #F9E076 0%, #D4AF37 100%)',
    icon: '📋'
  },
  {
    title: 'Participación',
    description: 'Involúcrate activamente',
    link: '/participacion',
    color: 'linear-gradient(135deg, #007934 0%, #005C26 100%)',
    icon: '💬'
  },
  {
    title: 'Transparencia',
    description: 'Información pública',
    link: '/transparencia',
    color: 'linear-gradient(135deg, #575756 0%, #3A3A39 100%)',
    icon: '🔍'
  }
]
</script>

<style scoped>
/* Estilos personalizados */
.carousel-fade-enter-active,
.carousel-fade-leave-active {
  transition: opacity 1s ease-in-out;
}

.carousel-fade-enter-from,
.carousel-fade-leave-to {
  opacity: 0;
}

/* Mejoras para video */
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

/* Asegurar que el carrusel ocupe todo el espacio */
.absolute.inset-0.z-0.overflow-hidden {
  z-index: 0;
}

/* Responsive para indicadores del carrusel */
@media (max-width: 768px) {
  .absolute.bottom-8 {
    bottom: 4rem;
  }
}
/* Clases de utilidad para botones */
.btn-institutional {
  position: relative;
  overflow: hidden;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  color: white;
  font-weight: 600;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.btn-institutional:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-0.25rem);
}

.btn-shimmer:hover {
  transform: translateY(-0.25rem) scale(1.02);
}

/* Animaciones del hero (existentes) */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes widthExpand {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 6rem;
    opacity: 1;
  }
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-width-expand {
  animation: widthExpand 1s ease-out forwards;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

/* Efectos de brillo en botones */
.btn-institutional::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: transform 0.6s;
  opacity: 0;
}

.btn-institutional:hover::after {
  transform: rotate(45deg) translate(50%, 50%);
  opacity: 1;
}

/* ===== EFECTOS "TRANSICIÓN PATRIÓTICA" ===== */

/* Animaciones de pulsación para colores patrios */
@keyframes color-pulse-red {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes color-pulse-yellow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.9; }
}

@keyframes color-pulse-green {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.animate-color-pulse-red {
  animation: color-pulse-red 4s ease-in-out infinite;
}

.animate-color-pulse-yellow {
  animation: color-pulse-yellow 4s ease-in-out infinite 1s;
}

.animate-color-pulse-green {
  animation: color-pulse-green 4s ease-in-out infinite 2s;
}

/* ===== EFECTOS "REVELADO OFICIAL" ===== */

/* Animación de pulso lento para el sello */
@keyframes pulse-slow {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(1); 
  }
  50% { 
    opacity: 0.6; 
    transform: scale(1.05); 
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

/* Sello oficial */
.seal-container {
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.seal-visible {
  opacity: 1;
  transform: scale(1);
}

/* Badge de comunicación */
.comunication-badge {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out 0.3s;
}

.badge-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Palabras del título */
.title-word {
  opacity: 0;
  transform: translateY(10px);
  display: inline-block;
  transition: all 0.5s ease-out;
}

.title-word.word-visible {
  opacity: 1;
  transform: translateY(0);
}

.title-word:nth-child(2) {
  transition-delay: 0.2s;
}

/* Línea del título */
.title-line {
  transition: width 1s ease-out 0.5s;
}

.title-line.line-expanded {
  width: 8rem;
}

/* Texto de descripción */
.description-text {
  transition: all 0.8s ease-out 0.8s;
}

.description-text.description-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Tarjetas de noticias */
.news-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  background-color: white;
  opacity: 0;
  transform: translateY(2rem);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.news-card:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border-color: rgba(139, 26, 26, 0.2);
  transform: translateY(-4px);
}

.news-card.card-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Efecto especial para la primera tarjeta (documento oficial) */
.news-card:nth-child(1).card-visible {
  animation: documentOpen 0.8s ease-out;
}

@keyframes documentOpen {
  0% {
    transform: translateY(30px) rotateX(-10deg);
    opacity: 0;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  50% {
    transform: translateY(15px) rotateX(-5deg);
    opacity: 0.7;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
  100% {
    transform: translateY(0) rotateX(0);
    opacity: 1;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
}

/* Botón ver más noticias */
.button-visible {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s ease-out 1.2s;
}

/* Animación de progreso */
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

/* Efecto de recorte de texto para noticias */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animación suave para imágenes */
img {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.group:hover img {
  transform: scale(1.05);
}

/* Mejoras de scroll */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #8B1A1A, #F9E076);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #5C1010, #D4AF37);
}

/* Transición suave entre secciones */
section {
  scroll-margin-top: 80px;
}

/* Responsive */
@media (max-width: 768px) {
  .news-card {
    margin-bottom: 1.5rem;
  }
  
  .btn-institutional {
    padding: 12px 16px;
    font-size: 0.75rem;
  }
  
  .seal-container {
    transform: scale(0.7);
  }
  
  .seal-visible {
    transform: scale(0.7);
  }
  
  /* Ajustes para la transición patriótica en móvil */
  .hero-section {
    min-height: 60vh !important;
  }
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .news-card {
    opacity: 1;
    transform: none;
  }
  
  .scrolled {
    min-height: auto !important;
  }
}

/* Efecto de gradiente animado en hover para tarjetas */
.news-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    #8B1A1A 0%, 
    #F9E076 25%, 
    #007934 50%, 
    #F9E076 75%, 
    #8B1A1A 100%
  );
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.news-card:hover::before {
  opacity: 1;
  animation: gradientShift 3s linear infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Corrección para el botón de shimmer */
.btn-shimmer {
  position: relative;
  overflow: hidden;
}

.btn-shimmer .absolute {
  transition: transform 1s ease-in-out;
}

.group:hover .btn-shimmer .absolute {
  transform: translateX(100%);
}
</style>