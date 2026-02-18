<!-- layouts/alternative.vue - HEADER ROJO FLOTANTE, 5 MENÚS SIN FLECHAS -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header rojo fijo y flotante (superpuesto) con menús a la derecha -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#E03636] shadow-lg">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Logo y botón hamburguesa (solo móvil) -->
          <div class="flex items-center gap-4">
            <!-- Botón hamburguesa solo para móvil -->

            <!-- Logo -->
            <NuxtLink to="/" class="ml-8 pl-8 flex items-center gap-3 no-underline group">
              <div class="w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
                <img 
                  src="/senadores2.png" 
                  alt="Logo" 
                  class="w-full h-full object-cover"
                />
              </div>
            </NuxtLink>
          </div>

          <!-- 5 MENÚS PRINCIPALES - ARRIBA A LA DERECHA (SIN FLECHAS) -->
          <div class="hidden lg:flex items-center gap-1">
            <!-- MENÚ 1: La institución -->
            <div class="relative group">
              <button class="px-4 py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors">
                La institución
              </button>
              <div class="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/institucion/mandato" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Mandato constitucional
                  </NuxtLink>
                  <NuxtLink to="/institucion/directiva" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Directiva camaral
                  </NuxtLink>
                  <NuxtLink to="/institucion/resena" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Reseña histórica
                  </NuxtLink>
                  <NuxtLink to="/institucion/galeria" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Galería de imágenes
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- MENÚ 2: Legisladores y representación -->
            <div class="relative group">
              <button class="px-4 py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors">
                Legisladores
              </button>
              <div class="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/legisladores/mandato" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Mandato constitucional
                  </NuxtLink>
                  <NuxtLink to="/legisladores/directiva" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Directiva camaral
                  </NuxtLink>
                  <NuxtLink to="/legisladores/resena" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Reseña histórica
                  </NuxtLink>
                  <NuxtLink to="/legisladores/galeria" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Galería de imágenes
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- MENÚ 3: Gestión Legislativa -->
            <div class="relative group">
              <button class="px-4 py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors">
                Gestión Legislativa
              </button>
              <div class="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/gestion/sesion" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Sesión del pleno
                  </NuxtLink>
                  <NuxtLink to="/gestion/proyectos" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Proyectos de leyes
                  </NuxtLink>
                  <NuxtLink to="/gestion/gaceta" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Gaceta Legislativa
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- MENÚ 4: Cultura y patrimonio -->
            <div class="relative group">
              <button class="px-4 py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors">
                Cultura
              </button>
              <div class="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/cultura/sesion" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Sesión del pleno
                  </NuxtLink>
                  <NuxtLink to="/cultura/proyectos" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Proyectos de leyes
                  </NuxtLink>
                  <NuxtLink to="/cultura/gaceta" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Gaceta Legislativa
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- MENÚ 5: Participación y transparencia -->
            <div class="relative group">
              <button class="px-4 py-2 text-white font-medium hover:bg-[#C12F2F] rounded-lg transition-colors">
                Participación
              </button>
              <div class="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/participacion/sesion" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Sesión del pleno
                  </NuxtLink>
                  <NuxtLink to="/participacion/proyectos" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Proyectos de leyes
                  </NuxtLink>
                  <NuxtLink to="/participacion/gaceta" class="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-[#E03636] transition-colors">
                    Gaceta Legislativa
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Versión móvil: texto simple -->
          <div class="lg:hidden flex items-center">
            <span class="text-white text-sm font-medium">Menú</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Espaciador para compensar header fijo (solo para que el contenido no quede debajo) -->
    <div class="mt-2"></div>

    <!-- Sidebar móvil (solo visible en móvil al hacer clic en hamburguesa) -->
    <div 
      :class="[
        'fixed inset-0 z-40 transition-all duration-300 lg:hidden',
        sidebarOpen ? 'visible' : 'invisible'
      ]"
    >
      <!-- Overlay -->
      <div 
        :class="[
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          sidebarOpen ? 'opacity-100' : 'opacity-0'
        ]"
        @click="sidebarOpen = false"
      ></div>

      <!-- Sidebar móvil con fondo rojo -->
      <aside 
        :class="[
          'absolute left-0 w-72 bg-gradient-to-b from-[#E03636] to-[#C12F2F] text-white shadow-2xl transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
        :style="{ top: '72px', height: 'calc(100vh - 72px)' }"
      >
        <div class="p-4 overflow-y-auto h-full">
          <div class="space-y-2">
            <!-- Menú móvil: La institución -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('institution')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">La institución</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.institution }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.institution" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/institucion/mandato" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📜 Mandato constitucional</NuxtLink>
                <NuxtLink to="/institucion/directiva" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📚 Directiva camaral</NuxtLink>
                <NuxtLink to="/institucion/resena" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🔄 Reseña histórica</NuxtLink>
                <NuxtLink to="/institucion/galeria" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🖼️ Galería de imágenes</NuxtLink>
              </div>
            </div>
            
            <!-- Menú móvil: Legisladores -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('legislators')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">Legisladores</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.legislators }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.legislators" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/legisladores/mandato" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📜 Mandato constitucional</NuxtLink>
                <NuxtLink to="/legisladores/directiva" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📚 Directiva camaral</NuxtLink>
                <NuxtLink to="/legisladores/resena" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🔄 Reseña histórica</NuxtLink>
                <NuxtLink to="/legisladores/galeria" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">🖼️ Galería de imágenes</NuxtLink>
              </div>
            </div>
            
            <!-- Menú móvil: Gestión Legislativa -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('legislative')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">Gestión Legislativa</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.legislative }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.legislative" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/gestion/sesion" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👨‍⚖️ Sesión del pleno</NuxtLink>
                <NuxtLink to="/gestion/proyectos" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👩‍⚖️ Proyectos de leyes</NuxtLink>
                <NuxtLink to="/gestion/gaceta" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📋 Gaceta Legislativa</NuxtLink>
              </div>
            </div>
            
            <!-- Menú móvil: Cultura -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('culture')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">Cultura</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.culture }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.culture" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/cultura/sesion" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👨‍⚖️ Sesión del pleno</NuxtLink>
                <NuxtLink to="/cultura/proyectos" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👩‍⚖️ Proyectos de leyes</NuxtLink>
                <NuxtLink to="/cultura/gaceta" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📋 Gaceta Legislativa</NuxtLink>
              </div>
            </div>
            
            <!-- Menú móvil: Participación -->
            <div class="mb-2">
              <button 
                @click="toggleMobileMenu('participation')"
                class="w-full flex items-center justify-between p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span class="font-medium">Participación</span>
                <svg 
                  class="w-5 h-5 transition-transform duration-200"
                  :class="{ 'rotate-180': mobileMenuState.participation }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-show="mobileMenuState.participation" class="ml-4 mt-1 space-y-1 border-l-2 border-white/30 pl-3">
                <NuxtLink to="/participacion/sesion" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👨‍⚖️ Sesión del pleno</NuxtLink>
                <NuxtLink to="/participacion/proyectos" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">👩‍⚖️ Proyectos de leyes</NuxtLink>
                <NuxtLink to="/participacion/gaceta" class="block py-2 px-3 text-white/90 hover:bg-white/10 rounded-lg" @click="sidebarOpen = false">📋 Gaceta Legislativa</NuxtLink>
              </div>
            </div>
            
            <!-- Noticias -->
            <NuxtLink to="/noticias" class="block p-3 text-white hover:bg-white/10 rounded-lg mt-4" @click="sidebarOpen = false">
              📰 Noticias
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>

    <!-- Contenido principal (sin padding-top para que el header flote encima) -->
    <main class="flex-1 min-w-0 relative z-10">
      <div class="pt-0">
        <slot />
      </div>

      <!-- Footer con colores oficiales -->
      <footer class="text-white back-image">
      <div class="mx-auto">
        <div class="text-center">
          <div class="flex items-center justify-center gap-3 back-image">
            <div class=" flex items-center justify-center w-40 h-40 pt-3 ">
              <img 
                  src="/2R.png" 
                  alt="Escudo Senado Nacional" 
                  class="w-full h-full object-cover"
              />
            </div>
            
          </div>
          
          <div class="sub-footer bg-gray-900 text-white py-8">
            <div class="container mx-auto px-4">
              <!-- Grid de 3 columnas con ancho personalizado -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                <!-- Columna 1: Logo + texto (izquierda) - 2 fracciones -->
                <div class="md:col-span-3 flex items-center justify-start space-x-3">
                  <img src="/footer-img/Recurso 8.png" alt="Senado Bolivia" class="h-11 w-auto">
                  <div>
                    <a href="https://diputados.gob.bo/" target="_blank">https://diputados.gob.bo/</a>
                  </div>
                </div>
                
                <!-- Columna 2: Centro - 3 fracciones (más ancha) -->
                <div class="md:col-span-6 text-center">  <!-- 🟢 col-span-2 -->
                  <p>
                    Calle Comercio esquina Colón - Telf.: (591) 2158701 - www.senado.gob.bo - La Paz - Bolivia 
                  </p>
                </div>
                
                <!-- Columna 3: Derecha - 2 fracciones -->
                <div class="md:col-span-3 flex items-center justify-end space-x-3">
                  <img src="/footer-img/Recurso 7.png" alt="Escudo Senado" class="h-14 w-auto">
                  <div class="text-right">
                    <a href="https://www.vicepresidencia.gob.bo/" target="_blank">https://www.vicepresidencia.gob.bo/</a>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          
         
        </div>
      </div>
    </footer>
    </main>

    <!-- Redes Sociales Fijas (Derecha) -->
    <div class="hidden lg:block fixed right-0 top-1/2 transform -translate-y-1/2 z-40">
      <div class="flex flex-col gap-2 p-2 bg-[#fff]/20 backdrop-blur-sm rounded-l-lg shadow-lg">
        <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" :title="social.name" class="p-2 text-white hover:bg-[#C12F2F] rounded-full transition-all duration-300 hover:scale-110">
          <svg v-if="social.name === 'Twitter'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <svg v-else-if="social.name === 'Facebook'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <svg v-else-if="social.name === 'YouTube'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          <svg v-else-if="social.name === 'Instagram'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
          <svg v-else-if="social.name === 'LinkedIn'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <svg v-else-if="social.name === 'TikTok'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const sidebarOpen = ref(false)

// Estado para menús móviles
const mobileMenuState = reactive({
  institution: false,
  legislators: false,
  legislative: false,
  culture: false,
  participation: false
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
  // Cerrar todos los submenús al abrir/cerrar sidebar
  if (!sidebarOpen.value) {
    Object.keys(mobileMenuState).forEach(key => {
      mobileMenuState[key] = false
    })
  }
}

const toggleMobileMenu = (menu) => {
  mobileMenuState[menu] = !mobileMenuState[menu]
}

// Redes sociales
const socialLinks = [
  { name: 'Twitter', url: 'https://twitter.com/senadobolivia' },
  { name: 'Facebook', url: 'https://facebook.com/senadobolivia' },
  { name: 'YouTube', url: 'https://youtube.com/senadobolivia' },
  { name: 'Instagram', url: 'https://instagram.com/senadobolivia' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/senadobolivia' },
  { name: 'TikTok', url: 'https://tiktok.com/@senadobolivia' }
]
</script>

<style scoped>
/* Header fijo rojo */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #E03636;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.back-image{
  background-image: url('/footer-main.png');
  background-size: cover; /* Cubre todo el contenedor */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* No repetir */
  background-color: rgba(224, 54, 54, 0.7);
  /* background-attachment: fixed; */
}
.sub-footer{
  background-color: rgba(198, 18, 16, 0.6);
  font-size: .7em;
}

/* Espaciador para compensar header fijo */
.h-\[72px\] {
  height: 72px;
}

/* Rotación para flechas en móvil */
.rotate-180 {
  transform: rotate(180deg);
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

/* Hover en menús desktop */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover .group-hover\:visible {
  visibility: visible;
}

/* Transición suave */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>