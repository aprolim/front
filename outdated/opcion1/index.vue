<!-- pages/index.vue - VERSIÓN CON NOTICIAS MEJORADA -->
<template>
  <div class="min-h-screen">
    <!-- Hero Section con imagen de fondo -->
    <section class="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      <!-- Imagen de fondo con overlay -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-r from-[#E03636]/20 to-[#E4D294]/10"></div>
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
          alt="Edificio del Senado Nacional de Bolivia"
          class="w-full h-full object-cover object-center"
          loading="eager"
        />
        <!-- Overlay de gradiente mejorado -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/30"></div>
        <div class="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
      </div>

      <!-- Contenido sobre la imagen -->
      <div class="container relative z-10 mx-auto px-6 md:px-12 py-16">
        <div class="max-w-4xl ml-auto">
          <!-- Badge elegante -->
          <div class="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white rounded-lg mb-8 shadow-xl backdrop-blur-sm border border-white/20">
            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span class="text-sm font-bold tracking-wider">PORTAL OFICIAL</span>
            <div class="w-2 h-2 bg-white rounded-full animate-pulse animation-delay-300"></div>
          </div>

          <!-- Título principal con efecto -->
          <div class="mb-6">
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-none">
              <span class="block">SENADO</span>
              <span class="block text-[#E4D294] drop-shadow-lg">BOLIVIA</span>
            </h1>
            <div class="w-32 h-1.5 bg-gradient-to-r from-[#E03636] to-[#E4D294] mt-4 rounded-full"></div>
          </div>

          <!-- Descripción con tipografía mejorada -->
          <p class="text-xl md:text-2xl text-white/95 mb-10 max-w-2xl leading-relaxed font-light tracking-wide">
            Representación legislativa, transparencia institucional y participación ciudadana en el corazón de la democracia boliviana.
          </p>

          <!-- CTA Buttons con diseño mejorado -->
          <div class="flex flex-wrap gap-4 mb-12">
            <NuxtLink 
              to="/participacion" 
              class="relative px-8 py-4 bg-gradient-to-r from-[#E03636] via-[#D03030] to-[#C12F2F] text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group overflow-hidden"
            >
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span class="relative z-10">PARTICIPAR ACTIVAMENTE</span>
              <svg class="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </NuxtLink>
            
            <NuxtLink 
              to="/gestion-legislativa" 
              class="relative px-8 py-4 bg-white/15 backdrop-blur-md border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/25 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group overflow-hidden"
            >
              <span>CONOCER PROYECTOS</span>
              <svg class="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>

          <!-- Estadísticas con diseño mejorado -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
            <div v-for="stat in stats" :key="stat.label" 
                 class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-default group">
              <div class="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-[#E4D294] transition-colors">
                {{ stat.value }}
              </div>
              <div class="text-xs md:text-sm text-white/80 uppercase tracking-wider font-medium">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator mejorado -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div class="flex flex-col items-center">
          <span class="text-white/60 text-sm mb-2 tracking-wider">EXPLORAR</span>
          <div class="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
            <div class="w-1 h-2 bg-white/80 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Noticias Importantes - DISEÑO MEJORADO -->
    <section class="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div class="container mx-auto px-6">
        <!-- Encabezado elegante -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#E03636]/10 to-[#E4D294]/10 rounded-2xl mb-6 border border-[#E03636]/20">
            <div class="w-3 h-3 bg-[#E03636] rounded-full animate-pulse"></div>
            <span class="text-sm font-bold text-[#E03636] tracking-wider">INFORMACIÓN DESTACADA</span>
            <div class="w-3 h-3 bg-[#E4D294] rounded-full animate-pulse animation-delay-500"></div>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Noticias <span class="relative">
              <span class="text-[#E03636]">Relevantes</span>
              <span class="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#E03636] to-[#E4D294] rounded-full"></span>
            </span>
          </h2>
          <p class="text-lg text-[#575756] max-w-2xl mx-auto leading-relaxed">
            Información actualizada sobre las decisiones legislativas más importantes del Senado Nacional.
          </p>
        </div>

        <!-- Grid de noticias mejorado - 3 NOTICIAS PRINCIPALES -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <!-- Noticia 1 - Destacada -->
          <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
            <!-- Badge destacado -->
            <div class="absolute top-4 left-4 z-20">
              <span class="px-4 py-2 bg-gradient-to-r from-[#E03636] to-[#C12F2F] text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-2">
                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd"/>
                </svg>
                PRINCIPAL
              </span>
            </div>
            
            <!-- Imagen -->
            <div class="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551135049-8a33b2fb2f5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Sesión del Senado"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            </div>

            <!-- Contenido -->
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <div class="flex items-center gap-3 mb-3">
                <span class="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white border border-white/30">
                  SESIÓN PLENARIA
                </span>
                <span class="text-sm text-white/90">15 ENE 2024</span>
              </div>
              
              <h3 class="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[#E4D294] transition-colors">
                Aprobación histórica del Presupuesto Nacional 2024
              </h3>
              
              <p class="text-sm text-white/80 mb-4 line-clamp-2">
                El Senado aprobó con amplia mayoría el presupuesto más grande de la historia, enfocado en desarrollo social.
              </p>
              
              <div class="flex items-center justify-between">
                <NuxtLink 
                  to="/noticias/presupuesto-2024"
                  class="text-sm font-bold text-white hover:text-[#E4D294] transition-colors flex items-center gap-2 group"
                >
                  LEER MÁS
                  <svg class="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </NuxtLink>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4 text-[#E4D294]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-xs text-white/80">2.4K</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Noticia 2 -->
          <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
            <!-- Categoría con color -->
            <div class="absolute top-4 left-4 z-20">
              <span class="px-4 py-2 bg-gradient-to-r from-[#E4D294] to-[#D4BC7A] text-gray-900 text-xs font-bold rounded-full shadow-md">
                CULTURA
              </span>
            </div>
            
            <!-- Imagen -->
            <div class="relative h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Exposición cultural"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            <!-- Contenido -->
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm text-[#B1B1B1] font-medium">12 ENE 2024</span>
                <div class="w-8 h-8 rounded-full bg-gradient-to-r from-[#E4D294]/20 to-[#D4BC7A]/20 flex items-center justify-center">
                  <svg class="w-4 h-4 text-[#E4D294]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                </div>
              </div>
              
              <h3 class="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#E03636] transition-colors">
                Inauguración de exposición "Raíces Bolivianas" en el Senado
              </h3>
              
              <p class="text-sm text-gray-600 mb-4 line-clamp-2">
                Muestra artística que celebra el patrimonio cultural nacional con obras de artistas indígenas.
              </p>
              
              <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <NuxtLink 
                  to="/noticias/exposicion-cultural"
                  class="text-sm font-medium text-[#E03636] hover:underline flex items-center gap-1"
                >
                  Ver detalles
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </NuxtLink>
                <span class="text-xs text-[#B1B1B1] font-medium">4 min lectura</span>
              </div>
            </div>
          </div>

          <!-- Noticia 3 -->
          <div class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 to-gray-800">
            <!-- Elemento decorativo -->
            <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#E03636]/20 to-[#E4D294]/20 rounded-full -mr-12 -mt-12"></div>
            
            <!-- Contenido -->
            <div class="p-8 relative z-10">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-r from-[#E03636] to-[#C12F2F] flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <div>
                  <span class="block text-sm font-bold text-[#E4D294]">REFORMA</span>
                  <span class="block text-xs text-white/60">10 ENE 2024</span>
                </div>
              </div>
              
              <h3 class="text-xl font-bold text-white mb-4 leading-tight group-hover:text-[#E4D294] transition-colors">
                Nueva ley contra la corrupción con penas más severas
              </h3>
              
              <p class="text-sm text-white/70 mb-6">
                Propuesta legislativa busca aumentar las penas para delitos de corrupción y establecer mecanismos de transparencia.
              </p>
              
              <!-- Progreso de la ley -->
              <div class="mb-6">
                <div class="flex justify-between text-xs text-white/60 mb-2">
                  <span>Progreso legislativo</span>
                  <span>75%</span>
                </div>
                <div class="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-[#E03636] to-[#E4D294] rounded-full" style="width: 75%"></div>
                </div>
              </div>
              
              <NuxtLink 
                to="/noticias/reforma-corrupcion"
                class="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#E4D294] transition-colors group"
              >
                SEGUIR PROYECTO
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Mini noticias horizontales -->
        <div class="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-200">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900">Últimas actualizaciones</h3>
            <NuxtLink to="/noticias" class="text-sm font-medium text-[#E03636] hover:underline flex items-center gap-1">
              Ver todas
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </NuxtLink>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="update in updates" :key="update.title" 
                 class="group flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                   :style="`background: ${update.color};`">
                <span class="text-white text-sm font-bold">{{ update.time }}</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-900 mb-1 group-hover:text-[#E03636] transition-colors">
                  {{ update.title }}
                </h4>
                <p class="text-sm text-gray-600">{{ update.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de acceso rápido mejorada -->
    <section class="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Acceso <span class="text-[#E03636]">Directo</span>
          </h2>
          <p class="text-lg text-[#575756] max-w-2xl mx-auto">
            Navega rápidamente a las secciones más importantes del portal
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <NuxtLink 
            v-for="item in quickLinks"
            :key="item.title"
            :to="item.link"
            class="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden"
          >
            <!-- Fondo decorativo -->
            <div class="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                 :style="`background: ${item.color.split(' ')[3]};`"></div>
            
            <!-- Icono -->
            <div class="relative z-10 w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                 :style="`background: ${item.color};`">
              <span class="text-white text-2xl">{{ item.icon }}</span>
            </div>
            
            <!-- Contenido -->
            <h3 class="relative z-10 text-xl font-bold text-gray-900 mb-3 group-hover:text-[#E03636] transition-colors">
              {{ item.title }}
            </h3>
            <p class="relative z-10 text-sm text-gray-600 mb-4">{{ item.description }}</p>
            
            <!-- Flecha -->
            <div class="relative z-10 flex items-center gap-2 text-sm font-medium text-[#E03636] opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span>Acceder</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Banner de versión alternativa -->
    <div class="relative py-16 overflow-hidden">
      <!-- Fondo decorativo -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#E03636]/5 via-[#E4D294]/5 to-[#B1B1B1]/5"></div>
      <div class="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#E03636]/10 to-transparent rounded-full -translate-x-32 -translate-y-32"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-[#E4D294]/10 to-transparent rounded-full translate-x-32 translate-y-32"></div>
      
      <div class="container relative z-10 mx-auto px-6 text-center">
        <div class="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl mb-6 shadow-lg">
          <svg class="w-5 h-5 text-[#E03636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span class="text-sm font-bold text-gray-800">EXPERIENCIA MEJORADA</span>
        </div>
        
        <h3 class="text-3xl font-bold text-gray-900 mb-4">
          ¿Prefieres una <span class="text-[#E03636]">navegación diferente</span>?
        </h3>
        <p class="text-lg text-[#575756] max-w-2xl mx-auto mb-8">
          Prueba nuestra versión con menú desplegable para una experiencia más moderna y fluida
        </p>
        
        <NuxtLink 
          to="/elegant" 
          class="inline-flex items-center gap-4 px-10 py-4 bg-gradient-to-r from-[#E03636] via-[#D03030] to-[#C12F2F] text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
        >
          <span>EXPLORAR VERSIÓN ALTERNATIVA</span>
          <svg class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>definePageMeta({
  layout: 'alter2'
})
// Estadísticas
const stats = [
  { value: '36', label: 'Legisladores' },
  { value: '24', label: 'Proyectos Activos' },
  { value: '85%', label: 'Participación' },
  { value: '150+', label: 'Sesiones' }
]

// Actualizaciones recientes
const updates = [
  { 
    title: 'Comisión de Justicia se reúne', 
    description: 'Analizan reformas al código procesal',
    time: '14:30',
    color: 'linear-gradient(135deg, #E03636 0%, #C12F2F 100%)'
  },
  { 
    title: 'Nuevo portal de transparencia', 
    description: 'Plataforma digital de acceso público',
    time: '11:00',
    color: 'linear-gradient(135deg, #E4D294 0%, #D4BC7A 100%)'
  },
  { 
    title: 'Audiencia pública', 
    description: 'Presupuesto educación 2024',
    time: '09:45',
    color: 'linear-gradient(135deg, #B1B1B1 0%, #9D9D9C 100%)'
  }
]

// Enlaces de acceso rápido
const quickLinks = [
  {
    title: 'Legisladores',
    description: 'Conoce a los representantes nacionales',
    link: '/legisladores',
    color: 'linear-gradient(135deg, #E03636 0%, #C12F2F 100%)',
    icon: '👥'
  },
  {
    title: 'Proyectos',
    description: 'Seguimiento legislativo activo',
    link: '/gestion-legislativa',
    color: 'linear-gradient(135deg, #E4D294 0%, #D4BC7A 100%)',
    icon: '📋'
  },
  {
    title: 'Participación',
    description: 'Involúcrate activamente',
    link: '/participacion',
    color: 'linear-gradient(135deg, #B1B1B1 0%, #9D9D9C 100%)',
    icon: '💬'
  },
  {
    title: 'Transparencia',
    description: 'Información pública verificada',
    link: '/transparencia',
    color: 'linear-gradient(135deg, #575756 0%, #706F6F 100%)',
    icon: '🔍'
  }
]
</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Clases de utilidad */
.animate-slideDown {
  animation: slideDown 0.6s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Efectos especiales */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:rotate-3 {
  transform: rotate(3deg);
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #E03636, #E4D294);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #C12F2F, #D4BC7A);
}

/* Mejoras de rendimiento */
img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Mejoras tipográficas */
h1, h2, h3, h4 {
  font-feature-settings: "kern" 1, "liga" 1;
  text-rendering: optimizeLegibility;
}

/* Efectos de profundidad */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Transiciones suaves */
* {
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Responsive */
@media (max-width: 768px) {
  h1 {
    font-size: 3.5rem;
  }
  
  h2 {
    font-size: 2.5rem;
  }
  
  .quick-links {
    grid-template-columns: 1fr;
  }
}

/* Efecto de brillo en botones */
.shimmer-effect {
  position: relative;
  overflow: hidden;
}

.shimmer-effect::after {
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
  animation: shimmer 2s infinite;
}
</style>