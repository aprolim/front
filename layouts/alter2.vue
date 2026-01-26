<!-- layouts/alternative.vue - PALETA PROFESIONAL -->
<template>
  <div class="min-h-screen" style="background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);">
    <!-- Header profesional -->
    <header class="sticky top-0 z-50 bg-white shadow-md border-b" :style="sidebarOpen ? 'border-color: #E4D294' : 'border-color: #E03636'">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo y botón hamburguesa -->
          <div class="flex items-center gap-4">
            <!-- Botón hamburguesa -->
            <button
              @click="toggleSidebar"
              class="p-2 rounded-lg transition-all duration-200 group"
              :class="sidebarOpen 
                ? 'bg-[#E4D294] text-[#333333] hover:bg-[#E03636] hover:text-white' 
                : 'bg-[#E03636] text-white hover:bg-[#C12F2F]'"
              aria-label="Alternar menú"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 12h16M4 18h16"/>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- Logo -->
            <NuxtLink to="/" class="flex items-center gap-3 no-underline group">
                <div class="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img 
                    src="/logo camsen.png" 
                    alt="Logo" 
                    class="w-full h-full object-cover"
                  />
                </div>
              <div>
                <h1 class="text-lg font-bold" :class="sidebarOpen ? 'text-[#E03636]' : 'text-gray-800'">Senado Nacional</h1>
                <p class="text-xs" :class="sidebarOpen ? 'text-[#E03636]/70' : 'text-[#B1B1B1]'">Bolivia</p>
              </div>
            </NuxtLink>
          </div>

          <!-- Indicador de estado -->
          <div class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
               :class="sidebarOpen 
                 ? 'bg-[#E4D294]/20 text-[#8B7355] border border-[#E4D294]/30' 
                 : 'bg-[#E03636]/10 text-[#E03636] border border-[#E03636]/20'">
            <div class="w-2 h-2 rounded-full animate-pulse" :class="sidebarOpen ? 'bg-[#E4D294]' : 'bg-[#E03636]'"></div>
            <span>{{ sidebarOpen ? 'Menú abierto' : 'Menú cerrado' }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenedor principal -->
    <div class="flex">
      <!-- Sidebar desplegable profesional -->
      <aside
        ref="sidebarRef"
        class="fixed lg:absolute top-0 left-0 h-screen shadow-xl z-40 transition-all duration-300 ease-in-out overflow-y-auto"
        :class="[
          sidebarOpen 
            ? 'w-80 translate-x-0 opacity-100' 
            : 'w-0 -translate-x-full opacity-0'
        ]"
        :style="sidebarOpen ? 'background: linear-gradient(180deg, #2D3748 0%, #1A202C 100%);' : ''"
        :aria-hidden="!sidebarOpen"
      >
        <!-- Contenido del sidebar -->
        <div v-if="sidebarOpen" class="w-80 h-full flex flex-col py-4">
          

          <!-- Navegación con submenús -->
          <nav class="px-3 py-2 flex-1">
            <ul class="space-y-1">
              <!-- Inicio -->
              <li>
                <NuxtLink
                  to="/alternative"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  :class="isActive('/alternative') && !activeSubmenu 
                    ? 'bg-[#E03636] text-white border-l-4 border-[#E4D294] shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-l-4 hover:border-[#E03636]'"
                  @click="closeSidebarOnMobile"
                >
                  <div class="flex-shrink-0 w-5 h-5" :class="isActive('/alternative') && !activeSubmenu ? 'text-white' : 'text-gray-400'">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                  </div>
                  <span class="font-medium flex-1">Inicio</span>
                </NuxtLink>
              </li>

              <!-- La Institución (con submenú) -->
              <li>
                <button
                  @click="toggleSubmenu('institucion')"
                  class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group"
                  :class="activeSubmenu === 'institucion' 
                    ? 'bg-[#E03636] text-white border-l-4 border-[#E4D294] shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-l-4 hover:border-[#E03636]'"
                >
                  <div class="flex items-center gap-3">
                    <div class="flex-shrink-0 w-5 h-5" :class="activeSubmenu === 'institucion' ? 'text-white' : 'text-gray-400'">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                    </div>
                    <span class="font-medium">La Institución</span>
                  </div>
                  <svg class="w-4 h-4 transition-transform duration-200" :class="activeSubmenu === 'institucion' ? 'rotate-90 text-[#E4D294]' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                
                <!-- Submenú de La Institución -->
                <div v-if="activeSubmenu === 'institucion'" class="ml-9 mt-1 space-y-1">
                  <NuxtLink
                    to="/alternative/institucion/mandato"
                    class="block px-4 py-2 text-sm rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
                    :class="isActive('/alternative/institucion/mandato') ? 'text-white bg-gray-700' : 'text-gray-400'"
                    @click="closeSidebarOnMobile"
                  >
                    <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #E4D294;"></span>
                    Mandato Constitucional
                  </NuxtLink>
                  <NuxtLink
                    to="/alternative/institucion/directiva"
                    class="block px-4 py-2 text-sm rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
                    :class="isActive('/alternative/institucion/directiva') ? 'text-white bg-gray-700' : 'text-gray-400'"
                    @click="closeSidebarOnMobile"
                  >
                    <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #E4D294;"></span>
                    Directiva Camaral
                  </NuxtLink>
                  <NuxtLink
                    to="/alternative/institucion/historia"
                    class="block px-4 py-2 text-sm rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
                    :class="isActive('/alternative/institucion/historia') ? 'text-white bg-gray-700' : 'text-gray-400'"
                    @click="closeSidebarOnMobile"
                  >
                    <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #E4D294;"></span>
                    Reseña Histórica
                  </NuxtLink>
                  <NuxtLink
                    to="/alternative/institucion/galeria"
                    class="block px-4 py-2 text-sm rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
                    :class="isActive('/alternative/institucion/galeria') ? 'text-white bg-gray-700' : 'text-gray-400'"
                    @click="closeSidebarOnMobile"
                  >
                    <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #E4D294;"></span>
                    Galería de Imágenes
                  </NuxtLink>
                </div>
              </li>

              <!-- Legisladores (con submenú) -->
              <li>
                <button
                  @click="toggleSubmenu('legisladores')"
                  class="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group"
                  :class="activeSubmenu === 'legisladores' 
                    ? 'bg-[#E03636] text-white border-l-4 border-[#E4D294] shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-l-4 hover:border-[#E03636]'"
                >
                  <div class="flex items-center gap-3">
                    <div class="flex-shrink-0 w-5 h-5" :class="activeSubmenu === 'legisladores' ? 'text-white' : 'text-gray-400'">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                      </svg>
                    </div>
                    <span class="font-medium">Legisladores</span>
                  </div>
                  <svg class="w-4 h-4 transition-transform duration-200" :class="activeSubmenu === 'legisladores' ? 'rotate-90 text-[#E4D294]' : 'text-gray-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                
                <!-- Submenú de Legisladores -->
                <div v-if="activeSubmenu === 'legisladores'" class="ml-9 mt-1 space-y-1">
                  <NuxtLink
                    to="/alternative/legisladores/directiva"
                    class="block px-4 py-2 text-sm rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
                    :class="isActive('/alternative/legisladores/directiva') ? 'text-white bg-gray-700' : 'text-gray-400'"
                    @click="closeSidebarOnMobile"
                  >
                    <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #E4D294;"></span>
                    Directiva Camara de Senadores
                  </NuxtLink>
                  <NuxtLink
                    to="/alternative/legisladores/comisiones"
                    class="block px-4 py-2 text-sm rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
                    :class="isActive('/alternative/legisladores/comisiones') ? 'text-white bg-gray-700' : 'text-gray-400'"
                    @click="closeSidebarOnMobile"
                  >
                    <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #E4D294;"></span>
                    Comisiones y Comités
                  </NuxtLink>
                  <NuxtLink
                    to="/alternative/legisladores/brigadas"
                    class="block px-4 py-2 text-sm rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
                    :class="isActive('/alternative/legisladores/brigadas') ? 'text-white bg-gray-700' : 'text-gray-400'"
                    @click="closeSidebarOnMobile"
                  >
                    <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #E4D294;"></span>
                    Brigadas Parlamentarias
                  </NuxtLink>
                  <NuxtLink
                    to="/alternative/legisladores/supraestatales"
                    class="block px-4 py-2 text-sm rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
                    :class="isActive('/alternative/legisladores/supraestatales') ? 'text-white bg-gray-700' : 'text-gray-400'"
                    @click="closeSidebarOnMobile"
                  >
                    <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #E4D294;"></span>
                    Senadores Supraestatales
                  </NuxtLink>
                  <NuxtLink
                    to="/alternative/legisladores/bancadas"
                    class="block px-4 py-2 text-sm rounded-lg transition-colors hover:bg-gray-700 hover:text-white"
                    :class="isActive('/alternative/legisladores/bancadas') ? 'text-white bg-gray-700' : 'text-gray-400'"
                    @click="closeSidebarOnMobile"
                  >
                    <span class="inline-block w-2 h-2 rounded-full mr-2" style="background-color: #E4D294;"></span>
                    Bancadas Políticas
                  </NuxtLink>
                </div>
              </li>

              <!-- Gestión Legislativa -->
              <li>
                <NuxtLink
                  to="/alternative/gestion-legislativa"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  :class="isActive('/alternative/gestion-legislativa') 
                    ? 'bg-[#E03636] text-white border-l-4 border-[#E4D294] shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-l-4 hover:border-[#E03636]'"
                  @click="closeSidebarOnMobile"
                >
                  <div class="flex-shrink-0 w-5 h-5" :class="isActive('/alternative/gestion-legislativa') ? 'text-white' : 'text-gray-400'">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <span class="font-medium flex-1">Gestión Legislativa</span>
                </NuxtLink>
              </li>

              <!-- Cultura y Patrimonio -->
              <li>
                <NuxtLink
                  to="/alternative/cultura"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  :class="isActive('/alternative/cultura') 
                    ? 'bg-[#E03636] text-white border-l-4 border-[#E4D294] shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-l-4 hover:border-[#E03636]'"
                  @click="closeSidebarOnMobile"
                >
                  <div class="flex-shrink-0 w-5 h-5" :class="isActive('/alternative/cultura') ? 'text-white' : 'text-gray-400'">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <span class="font-medium flex-1">Cultura y Patrimonio</span>
                </NuxtLink>
              </li>

              <!-- Participación -->
              <li>
                <NuxtLink
                  to="/alternative/participacion"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  :class="isActive('/alternative/participacion') 
                    ? 'bg-[#E03636] text-white border-l-4 border-[#E4D294] shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-l-4 hover:border-[#E03636]'"
                  @click="closeSidebarOnMobile"
                >
                  <div class="flex-shrink-0 w-5 h-5" :class="isActive('/alternative/participacion') ? 'text-white' : 'text-gray-400'">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                    </svg>
                  </div>
                  <span class="font-medium flex-1">Participación</span>
                </NuxtLink>
              </li>

              <!-- Noticias -->
              <li>
                <NuxtLink
                  to="/alternative/noticias"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  :class="isActive('/alternative/noticias') 
                    ? 'bg-[#E03636] text-white border-l-4 border-[#E4D294] shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-l-4 hover:border-[#E03636]'"
                  @click="closeSidebarOnMobile"
                >
                  <div class="flex-shrink-0 w-5 h-5" :class="isActive('/alternative/noticias') ? 'text-white' : 'text-gray-400'">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                  </div>
                  <span class="font-medium flex-1">Noticias</span>
                </NuxtLink>
              </li>

              <!-- Contacto -->
              <li>
                <NuxtLink
                  to="/alternative/contacto"
                  class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  :class="isActive('/alternative/contacto') 
                    ? 'bg-[#E03636] text-white border-l-4 border-[#E4D294] shadow-md' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white hover:border-l-4 hover:border-[#E03636]'"
                  @click="closeSidebarOnMobile"
                >
                  <div class="flex-shrink-0 w-5 h-5" :class="isActive('/alternative/contacto') ? 'text-white' : 'text-gray-400'">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span class="font-medium flex-1">Contacto</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Redes Sociales en Sidebar - ESTILO PROFESIONAL -->
          <div class="px-4 py-3 border-t" style="border-color: #4A5568;">
            <h3 class="text-xs font-semibold text-[#E4D294] mb-2 uppercase tracking-wider">Conéctate</h3>
            <div class="flex gap-2 justify-center">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                :title="social.name"
                class="p-2 rounded-lg transition-all duration-200 hover:scale-110"
                :style="`background: linear-gradient(135deg, ${social.name === 'Twitter' ? '#1DA1F2' : social.name === 'Facebook' ? '#1877F2' : '#FF0000'} 0%, ${social.name === 'Twitter' ? '#1DA1F2' : social.name === 'Facebook' ? '#1877F2' : '#FF0000'}80 100%);`"
              >
                <svg v-if="social.name === 'Twitter'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <svg v-else-if="social.name === 'Facebook'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <svg v-else-if="social.name === 'YouTube'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </aside>

      <!-- Overlay para móvil -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 bg-black/60 z-30 lg:hidden transition-opacity duration-300"
        @click="sidebarOpen = false"
        aria-label="Cerrar menú"
      ></div>

      <!-- Contenido principal -->
      <main
        class="flex-1 min-w-0 transition-all duration-300"
        :class="sidebarOpen ? 'lg:ml-0' : ''"
      >
        <div class="container mx-auto px-4 py-8">
          <slot />
        </div>

        <!-- Footer profesional -->
        <footer class="mt-12" style="background: linear-gradient(135deg, #2D3748 0%, #1A202C 100%);">
          <div class="container mx-auto px-4 py-8">
            <!-- Redes Sociales en Footer -->
            <div class="text-center mb-6">
              <h3 class="text-lg font-bold mb-4 text-[#E4D294]">Síguenos en redes sociales</h3>
              <div class="flex justify-center gap-3">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.url"
                  target="_blank"
                  :title="social.name"
                  class="p-2 rounded-full transition-all duration-300 hover:scale-110"
                  :style="`background: ${social.name === 'Twitter' ? '#1DA1F2' : social.name === 'Facebook' ? '#1877F2' : '#FF0000'};`"
                >
                  <svg v-if="social.name === 'Twitter'" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <svg v-else-if="social.name === 'Facebook'" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <svg v-else-if="social.name === 'YouTube'" class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div class="text-center text-gray-300 border-t border-gray-700 pt-6">
              <p class="mb-2 text-lg font-medium text-white">© 2024 Senado Nacional de Bolivia</p>
              <p class="text-sm mb-4" style="color: #B1B1B1;">Todos los derechos reservados</p>
              <div class="flex justify-center gap-4">
                <NuxtLink to="/" class="text-[#E4D294] hover:text-white underline flex items-center gap-1 text-sm">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                  </svg>
                  Versión clásica
                </NuxtLink>
                <span style="color: #4A5568;">•</span>
                <button @click="toggleSidebar" class="text-[#E4D294] hover:text-white underline text-sm">
                  {{ sidebarOpen ? 'Ocultar menú' : 'Mostrar menú' }}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <!-- Redes Sociales Fijas (Derecha) - ESTILO PROFESIONAL -->
      <div class="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
        <div class="flex flex-col gap-2 p-2 rounded-l-lg shadow-xl" style="background: linear-gradient(135deg, rgba(45, 55, 72, 0.95) 0%, rgba(26, 32, 44, 0.95) 100%); backdrop-filter: blur(10px); border: 1px solid #4A5568;">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            :title="social.name"
            class="p-2 rounded-full transition-all duration-300 hover:scale-110"
            :style="`background: ${social.name === 'Twitter' ? '#1DA1F2' : social.name === 'Facebook' ? '#1877F2' : '#FF0000'};`"
          >
            <svg v-if="social.name === 'Twitter'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <svg v-else-if="social.name === 'Facebook'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <svg v-else-if="social.name === 'YouTube'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from '#app'

const route = useRoute()
const sidebarRef = ref(null)
const sidebarOpen = ref(false)
const activeSubmenu = ref(null)

// Función para alternar sidebar
const toggleSidebar = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  sidebarOpen.value = !sidebarOpen.value
}

// Función para alternar submenús
const toggleSubmenu = (menu) => {
  if (activeSubmenu.value === menu) {
    activeSubmenu.value = null
  } else {
    activeSubmenu.value = menu
  }
}

// Cerrar sidebar en móvil al cambiar de ruta
const closeSidebarOnMobile = () => {
  if (window.innerWidth < 1024) {
    sidebarOpen.value = false
  }
}

// Manejar tecla ESC
const handleKeydown = (e) => {
  if (e.key === 'Escape' && sidebarOpen.value) {
    sidebarOpen.value = false
  }
}

// Setup event listeners
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Redes sociales
const socialLinks = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/senadobolivia'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/senadobolivia'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/senadobolivia'
  }
]

const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
/* Estilos para el sidebar */
aside {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Scrollbar personalizado */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: #4A5568;
}

aside::-webkit-scrollbar-thumb {
  background: #E03636;
  border-radius: 4px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #C12F2F;
}

/* Transición para submenús */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.2s ease;
  max-height: 300px;
  overflow: hidden;
}

.submenu-enter-from,
.submenu-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Mejora visual para los enlaces */
a, button {
  transition: all 0.2s ease;
}

/* Estilos de selección de texto */
::selection {
  background-color: #E03636;
  color: white;
}

::-moz-selection {
  background-color: #E03636;
  color: white;
}
</style>