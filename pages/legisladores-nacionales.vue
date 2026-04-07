<!-- pages/nueva-pagina.vue -->
<template>
  <div class="min-h-screen text-style">
    <!-- Fondos fijos para cada sección -->
    <div class="global-fixed-background seccion1-fondo" :class="{ 'show-fixed': isSeccion1Visible }"></div>
    <div class="global-fixed-background seccion3-fondo" :class="{ 'show-fixed': isSeccion3Visible }"></div>
    <div class="global-fixed-background seccion4-fondo" :class="{ 'show-fixed': isSeccion4Visible }"></div>
    
    <!-- ==================== SECCIÓN 1 ==================== -->
    <!-- ==================== SECCIÓN 1 MODIFICADA ==================== -->
    <section 
      id="seccion1"
      class="relative h-screen flex items-center justify-center overflow-hidden transition-all duration-500"
      :class="{ 'min-h-[40vh] md:min-h-[45vh]': scrolled }"
      ref="seccion1Ref"
    >
      <div class="mx-[5vw] px-4 z-10 relative w-full">
        <div class="flex flex-row gap-[2vw] h-full items-center">
          
          <!-- Columna Izquierda (60%) -->
          <div class="w-[60%] p-8 rounded-2xl shadow-left-column" 
               :style="{ backgroundColor: 'rgba(224, 54, 54, 0.65)' }">
            <div class="grid grid-cols-3 gap-6">
              <!-- Generar dinámicamente las 3 columnas con 2 personas cada una -->
              <div v-for="(columna, colIndex) in columnasPersonas" :key="colIndex" class="space-y-6">
                <div v-for="persona in columna" :key="persona.id" 
                  class="text-center cursor-pointer group"
                  @click="selectedImage = { 
                    img: persona.imagen, 
                    text: persona.textoCompleto, 
                    nombre: persona.nombre, 
                    cargo: persona.cargo 
                  }"
                >
                  <div class="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 transition-all group-hover:scale-105 circle-shadow" 
                       style="border-color: #E4D294;">
                    <img :src="persona.imagen" :alt="persona.nombre" class="w-full h-full object-cover">
                  </div>
                  <p class="mt-2 text-white font-semibold drop-shadow">{{ persona.nombre }}</p>
                  <p class="text-sm text-gray-200 drop-shadow">{{ persona.cargoPartido.toUpperCase() }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Columna Derecha (40%) -->
          <div class="w-[40%] flex flex-col items-center justify-center p-6 rounded-2xl shadow-right-column"
               :style="{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }">
            <div class="w-64 h-64 rounded-full overflow-hidden border-8 mb-6 transition-all duration-300 circle-shadow-large" 
                 style="border-color: #E4D294;">
              <img :src="selectedImage.img" :alt="selectedImage.nombre" class="w-full h-full object-cover">
            </div>
            <h3 class="text-2xl font-bold text-white drop-shadow-lg mb-2 text-center">
              {{ selectedImage.nombre }}
            </h3>
            <p class="text-lg text-gray-200 drop-shadow mb-4 text-center">
              {{ selectedImage.cargo }}
            </p>
            <div class="text-center max-w-md">
              <p class="text-white drop-shadow leading-relaxed">
                {{ selectedImage.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ScrollProgress
        :scrolled="scrolled"
        :scroll-progress="scrollProgress"
      />
    </section>

    <!-- ==================== SECCIÓN 2 - FONDO BLANCO ==================== -->
    <div 
      id="seccion2"
      ref="seccion2Ref" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out z-10"
      :class="{ 'animate-in': isSeccion2Visible }"
      style="min-height: 100vh; position: relative; background: white;"
    >
      <div class="container mx-auto px-4 py-20">
        <h2 class="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800">
          Sección 2 - Fondo Blanco
        </h2>
        <p class="text-xl text-center text-gray-600 max-w-3xl mx-auto">
          Esta sección tiene fondo blanco puro, sin imagen de fondo fija.
        </p>
        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-3">Contenido 1</h3>
            <p class="text-gray-600">Ejemplo de contenido en sección blanca</p>
          </div>
          <div class="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-3">Contenido 2</h3>
            <p class="text-gray-600">Ejemplo de contenido en sección blanca</p>
          </div>
          <div class="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-3">Contenido 3</h3>
            <p class="text-gray-600">Ejemplo de contenido en sección blanca</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ==================== SECCIÓN 3 - ESCUDOS Y SENADORES ==================== -->
    <div 
      id="seccion3"
      ref="seccion3Ref" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-200 z-10 flex flex-items-center"
      :class="{ 'animate-in': isSeccion3Visible }"
      style="min-height: 100vh; position: relative; background: transparent;"
    >
      <div class="mx-auto px-4 py-10 z-10 relative w-full">
        
        <!-- Estado Inicial: Escudos en 2 filas (5 + 4) -->
        <div v-if="!departamentoSeleccionado" class="flex flex-col items-center justify-center min-h-[80vh]">
          <div class="grid grid-cols-5 gap-8 mb-8">
            <div v-for="dep in departamentos.slice(0,5)" :key="dep.id" 
                 @click="seleccionarDepartamento(dep)"
                 class="cursor-pointer transition-all duration-300 hover:scale-105 text-center">
              <div v-html="dep.escudoDorado" class="w-24 h-24 mx-auto"></div>
              <p class="text-center text-white mt-2 text-sm font-semibold">{{ dep.nombre }}</p>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-8">
            <div v-for="dep in departamentos.slice(5,9)" :key="dep.id" 
                 @click="seleccionarDepartamento(dep)"
                 class="cursor-pointer transition-all duration-300 hover:scale-105 text-center">
              <div v-html="dep.escudoDorado" class="w-24 h-24 mx-auto"></div>
              <p class="text-center text-white mt-2 text-sm font-semibold">{{ dep.nombre }}</p>
            </div>
          </div>
        </div>

        <!-- Estado con Departamento Seleccionado -->
        <div v-else class="w-full  flex flex-col justify-center items-center min-h-[80vh]">
          <!-- Fila Principal: 9 escudos en una sola fila -->
          <div class="grid grid-cols-9 gap-4 mb-12">
            <div v-for="dep in departamentos" :key="dep.id" 
                 @click="seleccionarDepartamento(dep)"
                 class="cursor-pointer transition-all duration-300 hover:scale-105 text-center">
              <div v-html="departamentoSeleccionado?.id === dep.id ? dep.escudoReal : dep.escudoDorado" 
                   class="w-16 h-16 mx-auto"></div>
              <p class="text-center text-white text-xs mt-1">{{ dep.nombre }}</p>
            </div>
          </div>

          <!-- Fila de Titulares (5 columnas) -->
          <div class="grid grid-cols-5 gap-6 mb-8">
            <div class="text-center">
              <div class="inline-block px-6 py-2 rounded-full text-white font-semibold" 
                   :style="{ backgroundColor: 'rgba(224, 54, 54, 0.8)' }">
                {{ departamentoSeleccionado?.nombre }}
              </div>
            </div>
            <div v-for="(titular, index) in titulares" :key="'titular-'+index" class="text-center">
              <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
                   style="border-color: #E4D294;">
                <img :src="titular.imagen" :alt="titular.nombre" class="w-full h-full object-cover">
              </div>
              <p class="text-white font-semibold text-sm">{{ titular.nombre.split(' ')[0] }} {{ titular.nombre.split(' ')[1] }}</p>
              <p class="text-gray-300 text-xs">{{ titular.cargo }}</p>
            </div>
          </div>

          <!-- Fila de Suplentes (5 columnas) -->
          <div class="grid grid-cols-5 gap-6">
            <div class="text-center">
              <div class="inline-block px-6 py-2 rounded-full text-white font-semibold" 
                   :style="{ backgroundColor: 'rgba(224, 54, 54, 0.8)' }">
                {{ departamentoSeleccionado?.nombre }}
              </div>
            </div>
            <div v-for="(suplente, index) in suplentes" :key="'suplente-'+index" class="text-center">
              <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
                   style="border-color: #E4D294;">
                <img :src="suplente.imagen" :alt="suplente.nombre" class="w-full h-full object-cover">
              </div>
              <p class="text-white font-semibold text-sm">{{ suplente.nombre.split(' ')[0] }} {{ suplente.nombre.split(' ')[1] }}</p>
              <p class="text-gray-300 text-xs">{{ suplente.cargo }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ==================== SECCIÓN 4 - BANCADAS POLÍTICAS ==================== -->
    <div 
      id="seccion4"
      ref="seccion4Ref" 
      class="scroll-section opacity-0 translate-y-8 transition-all duration-800 ease-out delay-400 z-10 mt-[5vw]"
      :class="{ 'animate-in': isSeccion4Visible }"
      style="min-height: 100vh; position: relative; background: transparent;"
    >
      <div class="container mx-auto px-4 py-10 z-10 relative">
        
        <!-- 4 Partidos Políticos - Estado Inicial -->
        <div v-if="!partidoSeleccionado" class="flex flex-col items-center justify-center min-h-[80vh]">
          <div class="flex justify-center gap-12 mb-12">
            <div v-for="partido in partidos" :key="partido.id" 
                 @click="seleccionarPartido(partido)"
                 class="cursor-pointer transition-all duration-300 hover:scale-105 text-center">
              <div class="w-32 h-32 rounded-full border-4 flex items-center justify-center mx-auto"
                   :style="{ borderColor: '#E4D294', backgroundColor: 'rgba(255,255,255,0.1)' }">
                <div v-html="partido.iconoBlanco" class="w-20 h-20"></div>
              </div>
              <p class="text-center text-white mt-3 text-lg font-semibold">{{ partido.nombre }}</p>
            </div>
          </div>
        </div>

        <!-- Estado con Partido Seleccionado -->
        <div v-else class="w-full">
          <!-- 4 Partidos reorganizados arriba -->
          <div class="flex justify-center gap-8 mb-8">
            <div v-for="partido in partidos" :key="partido.id" 
                 @click="seleccionarPartido(partido)"
                 class="cursor-pointer transition-all duration-300 text-center"
                 :class="{ 'transform scale-90': partidoSeleccionado?.id === partido.id }">
              <div class="w-20 h-20 rounded-full border-4 flex items-center justify-center mx-auto"
                   :style="{ borderColor: '#E4D294', backgroundColor: partidoSeleccionado?.id === partido.id ? 'rgba(228,210,148,0.2)' : 'rgba(255,255,255,0.1)' }">
                <div v-html="partidoSeleccionado?.id === partido.id ? partido.iconoDorado : partido.iconoBlanco" 
                     class="w-12 h-12"></div>
              </div>
              <p class="text-center text-white text-xs mt-1">{{ partido.nombreCorto }}</p>
            </div>
          </div>

          <!-- Barra Roja con Botón Suplentes/Titulares -->
          <div class="bg-red-700 rounded-lg px-6 py-3 mb-8 flex items-center justify-between">
            <button 
              @click="toggleTipoMiembros"
              class="bg-red-800 hover:bg-red-900 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
              {{ mostrarSuplentes ? 'VER TITULARES' : 'VER SUPLENTES' }}
            </button>
            <h3 class="text-white font-bold text-xl">{{ partidoSeleccionado?.nombre }}</h3>
            <div class="w-32"></div>
          </div>

          <!-- Grid dinámico según partido seleccionado -->
          <div v-if="partidoSeleccionado?.id === 'pdc'">
            <!-- PDC: 3 filas (6, 5, 5) -->
            <div class="grid grid-cols-6 gap-6 mb-6">
              <div v-for="(persona, index) in miembrosMostrar.slice(0,6)" :key="index" class="text-center">
                <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
                     style="border-color: #E4D294;">
                  <img :src="persona.imagen" :alt="persona.nombre" class="w-full h-full object-cover">
                </div>
                <p class="text-white font-semibold text-sm">{{ persona.nombre.split(' ')[0] }} {{ persona.nombre.split(' ')[1] }}</p>
                <p class="text-gray-300 text-xs">{{ persona.cargo }}</p>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-6 mb-6">
              <div v-for="(persona, index) in miembrosMostrar.slice(6,11)" :key="index" class="text-center">
                <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
                     style="border-color: #E4D294;">
                  <img :src="persona.imagen" :alt="persona.nombre" class="w-full h-full object-cover">
                </div>
                <p class="text-white font-semibold text-sm">{{ persona.nombre.split(' ')[0] }} {{ persona.nombre.split(' ')[1] }}</p>
                <p class="text-gray-300 text-xs">{{ persona.cargo }}</p>
              </div>
            </div>
            <div class="grid grid-cols-5 gap-6">
              <div v-for="(persona, index) in miembrosMostrar.slice(11,16)" :key="index" class="text-center">
                <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
                     style="border-color: #E4D294;">
                  <img :src="persona.imagen" :alt="persona.nombre" class="w-full h-full object-cover">
                </div>
                <p class="text-white font-semibold text-sm">{{ persona.nombre.split(' ')[0] }} {{ persona.nombre.split(' ')[1] }}</p>
                <p class="text-gray-300 text-xs">{{ persona.cargo }}</p>
              </div>
            </div>
          </div>

          <div v-else-if="partidoSeleccionado?.id === 'libre'">
            <!-- Libre: 3 filas de 4 -->
            <div class="grid grid-cols-4 gap-6 mb-6">
              <div v-for="(persona, index) in miembrosMostrar.slice(0,4)" :key="index" class="text-center">
                <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
                     style="border-color: #E4D294;">
                  <img :src="persona.imagen" :alt="persona.nombre" class="w-full h-full object-cover">
                </div>
                <p class="text-white font-semibold text-sm">{{ persona.nombre.split(' ')[0] }} {{ persona.nombre.split(' ')[1] }}</p>
                <p class="text-gray-300 text-xs">{{ persona.cargo }}</p>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-6 mb-6">
              <div v-for="(persona, index) in miembrosMostrar.slice(4,8)" :key="index" class="text-center">
                <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
                     style="border-color: #E4D294;">
                  <img :src="persona.imagen" :alt="persona.nombre" class="w-full h-full object-cover">
                </div>
                <p class="text-white font-semibold text-sm">{{ persona.nombre.split(' ')[0] }} {{ persona.nombre.split(' ')[1] }}</p>
                <p class="text-gray-300 text-xs">{{ persona.cargo }}</p>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-6">
              <div v-for="(persona, index) in miembrosMostrar.slice(8,12)" :key="index" class="text-center">
                <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
                     style="border-color: #E4D294;">
                  <img :src="persona.imagen" :alt="persona.nombre" class="w-full h-full object-cover">
                </div>
                <p class="text-white font-semibold text-sm">{{ persona.nombre.split(' ')[0] }} {{ persona.nombre.split(' ')[1] }}</p>
                <p class="text-gray-300 text-xs">{{ persona.cargo }}</p>
              </div>
            </div>
          </div>
<div v-else-if="partidoSeleccionado?.id === 'alianza'">
  <!-- Alianza Unidad: 2 filas de 3 -->
  <div class="grid grid-cols-3 gap-6 mb-6">
    <div v-for="(persona, index) in miembrosMostrar.slice(0,3)" :key="index" class="text-center">
      <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
           style="border-color: #E4D294;">
        <img :src="persona.imagen" :alt="persona.nombre" class="w-full h-full object-cover">
      </div>
      <p class="text-white font-semibold text-sm">{{ persona.nombre.split(' ')[0] }} {{ persona.nombre.split(' ')[1] }}</p>
      <p class="text-gray-300 text-xs">{{ persona.cargo }}</p>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-6 mb-6">
    <div v-for="(persona, index) in miembrosMostrar.slice(3,6)" :key="index" class="text-center">
      <div class="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 circle-shadow mb-2" 
           style="border-color: #E4D294;">
        <img :src="persona.imagen" :alt="persona.nombre" class="w-full h-full object-cover">
      </div>
      <p class="text-white font-semibold text-sm">{{ persona.nombre.split(' ')[0] }} {{ persona.nombre.split(' ')[1] }}</p>
      <p class="text-gray-300 text-xs">{{ persona.cargo }}</p>
    </div>
  </div>
  <!-- Tercera fila: solo 1 elemento en la primera columna -->
  <div class="grid grid-cols-3 gap-6">
    <div class="text-center">
      <div v-if="miembrosMostrar[6]" class="inline-block">
        <div class="w-28 h-28 rounded-full overflow-hidden border-4 circle-shadow mb-2" 
             style="border-color: #E4D294;">
          <img :src="miembrosMostrar[6].imagen" :alt="miembrosMostrar[6].nombre" class="w-full h-full object-cover">
        </div>
        <p class="text-white font-semibold text-sm">{{ miembrosMostrar[6].nombre.split(' ')[0] }} {{ miembrosMostrar[6].nombre.split(' ')[1] }}</p>
        <p class="text-gray-300 text-xs">{{ miembrosMostrar[6].cargo }}</p>
      </div>
    </div>
    <div></div>
    <div></div>
  </div>
</div>
          <div v-else-if="partidoSeleccionado?.id === 'sumate'">
            <!-- Sumate: 1 fila de 1 (centrado) -->
            <div class="flex justify-center">
              <div v-if="miembrosMostrar[0]" class="text-center">
                <div class="w-28 h-28 rounded-full overflow-hidden border-4 circle-shadow mb-2" 
                     style="border-color: #E4D294;">
                  <img :src="miembrosMostrar[0].imagen" :alt="miembrosMostrar[0].nombre" class="w-full h-full object-cover">
                </div>
                <p class="text-white font-semibold text-sm">{{ miembrosMostrar[0].nombre.split(' ')[0] }} {{ miembrosMostrar[0].nombre.split(' ')[1] }}</p>
                <p class="text-gray-300 text-xs">{{ miembrosMostrar[0].cargo }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useScrollEffects } from '@/composables/useScrollEffects'
import ScrollProgress from '@/components/UI/ScrollProgress.vue'
import { departamentosData } from '@/data/departamentos.js'

const departamentos = ref(departamentosData)

const { scrolled, scrollProgress, initScrollListener, removeScrollListener } = useScrollEffects()
const route = useRoute()

// Refs para cada sección
const seccion1Ref = ref(null)
const seccion2Ref = ref(null)
const seccion3Ref = ref(null)
const seccion4Ref = ref(null)

// Visibilidad de cada sección
const isSeccion1Visible = ref(true)
const isSeccion2Visible = ref(false)
const isSeccion3Visible = ref(false)
const isSeccion4Visible = ref(false)



const personasData = ref([
  {
    id: 1,
    nombre: 'Diego Esteban Mateo Ávila Navajas',
    cargoPartido: 'Presidencia PDC',
    cargo: 'Presidenta del Senado',
    imagen: '/senadores/g1/DIEGO ESTEBAN MATEO ÁVILA NAVAJAS.png',
    textoCompleto: 'La Dra. María González es Presidenta del Senado con más de 15 años de experiencia en derecho constitucional. Ha liderado importantes reformas legislativas y promovido la participación ciudadana.'
  },
  {
    id: 2,
    nombre: 'Carmen Soledad Chapetón Tancara',
    cargoPartido: 'Primera Vicepresidencia Unidad',
    cargo: 'Vicepresidente',
    imagen: '/senadores/g2/CARMEN SOLEDAD CHAPETON TANCARA.png',
    textoCompleto: 'El Lic. Carlos Mendoza se desempeña como Vicepresidente del Senado. Economista de profesión, ha trabajado en políticas de desarrollo económico y transparencia gubernamental.'
  },
  {
    id: 3,
    nombre: 'Khatia Lisbeth Quiroga Fernández',
    cargoPartido: 'Segunda Vicepresidencia Libre',
    cargo: 'Secretario General',
    imagen: '/senadores/g3/KHATIA LISBETH QUIROGA FERNÁNDEZ.png',
    textoCompleto: 'El Dr. Roberto Fernández es Secretario General con amplia trayectoria en gestión parlamentaria. Es reconocido por su labor en la modernización administrativa.'
  },
  {
    id: 4,
    nombre: 'Yasmin Estivariz Villarroel',
    cargoPartido: 'Primera Secretaria PDC',
    cargo: 'Directora de Comunicación',
    imagen: '/senadores/g1/YASMIN ESTIVARIZ VILLARROEL.png',
    textoCompleto: 'La Sra. Ana Paula Ríos es Directora de Comunicación. Periodista y comunicadora social, /senadores/g2/a implementado estrategias innovadoras para acercar el trabajo legislativo.'
  },
  {
    id: 5,
    nombre: 'Julio Diego Romaña',
    cargoPartido: 'Segunda Secretaria Libre',
    cargo: 'Jefe de Protocolo',
    imagen: '/senadores/g4/JULIO DIEGO ROMAÑA GALINDO.png',
    textoCompleto: 'El Arq. Luis Torrez es Jefe de Protocolo. Con más de 20 años organizando eventos diplomáticos, garantiza estándares internacionales.'
  },
  {
    id: 6,
    nombre: 'Rosa Tatiana Áñez Carrasco',
    cargoPartido: 'Tercera Secretaria Unidad',
    cargo: 'Coordinadora Legislativa',
    imagen: '/senadores/g2/ROSA TATIANA AÑEZ CARRASCO.png',
    textoCompleto: 'La Lic. Patricia Vargas es Coordinadora Legislativa. Especialista en políticas públicas, coordina el trabajo entre las diferentes comisiones.'
  }
])

// Organizar las personas en 3 columnas de 2 personas cada una
const columnasPersonas = computed(() => {
  const columnas = [[], [], []]
  personasData.value.forEach((persona, index) => {
    columnas[index % 3].push(persona)
  })
  return columnas
})
const selectedImage = ref({
  img: personasData.value[0].imagen,
  text: personasData.value[0].textoCompleto,
  nombre: personasData.value[0].nombre,
  cargo: personasData.value[0].cargo
})

// ==================== DATOS SECCIÓN 3 ====================
const departamentoSeleccionado = ref(null)

const crearEscudoDorado = (nombre) => `
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#D4AF37" stroke="#B8960C" stroke-width="2"/>
    <text x="50" y="55" text-anchor="middle" fill="#8B6914" font-size="10" font-weight="bold">${nombre.substring(0, 3)}</text>
  </svg>
`

const crearEscudoReal = (nombre, color) => `
  <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="${color}" stroke="#E4D294" stroke-width="2"/>
    <text x="50" y="55" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${nombre.substring(0, 3)}</text>
  </svg>
`



// Datos de senadores por departamento (simplificados)
const titularesPorDepartamento = {
  'LA PAZ': [
    { nombre: 'Bertha Nurmy Gutierrez', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { nombre: 'Daniel Antonio Ortiz', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { nombre: 'Erick Nelson Soruco', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { nombre: 'Freddy Castillo Chavez', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/4.jpg' }
  ],
  'SANTA CRUZ': [
    { nombre: 'Carlos Sánchez', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { nombre: 'Patricia Suárez', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { nombre: 'Roberto Fernández', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { nombre: 'Ana María', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/8.jpg' }
  ],
  'COCHABAMBA': [
    { nombre: 'Mónica Reyes', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/9.jpg' },
    { nombre: 'Fernando Torrico', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/10.jpg' },
    { nombre: 'Cecilia López', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/11.jpg' },
    { nombre: 'Javier Arce', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/12.jpg' }
  ],
  'POTOSÍ': [
    { nombre: 'René Joaquino', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/13.jpg' },
    { nombre: 'Lidia Mamani', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/14.jpg' },
    { nombre: 'Felipe Quispe', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/15.jpg' },
    { nombre: 'Juana Condori', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/16.jpg' }
  ],
  'CHUQUISACA': [
    { nombre: 'Gladys Alarcón', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/17.jpg' },
    { nombre: 'Marcelo Chirinos', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/18.jpg' },
    { nombre: 'Roxana Muñoz', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/19.jpg' },
    { nombre: 'Daniel Rojas', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/20.jpg' }
  ],
  'ORURO': [
    { nombre: 'Rubén Méndez', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/21.jpg' },
    { nombre: 'Nélida Sifuentes', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/22.jpg' },
    { nombre: 'Edgar Montaño', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/23.jpg' },
    { nombre: 'Betty Yañiquez', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/24.jpg' }
  ],
  'TARIJA': [
    { nombre: 'Rodrigo Paz', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/25.jpg' },
    { nombre: 'Sonia Gutiérrez', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/26.jpg' },
    { nombre: 'Edwin Castellanos', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/27.jpg' },
    { nombre: 'María Lema', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/28.jpg' }
  ],
  'BENI': [
    { nombre: 'Jeanine Áñez', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/29.jpg' },
    { nombre: 'Yerko Núñez', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/30.jpg' },
    { nombre: 'Adriana Salvatierra', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/31.jpg' },
    { nombre: 'Arturo Murillo', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/32.jpg' }
  ],
  'PANDO': [
    { nombre: 'Reina Cabrera', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { nombre: 'Carmelo Lenz', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/34.jpg' },
    { nombre: 'Gladys Torrico', cargo: 'Senadora Titular', imagen: 'https://randomuser.me/api/portraits/women/35.jpg' },
    { nombre: 'Richard Vásquez', cargo: 'Senador Titular', imagen: 'https://randomuser.me/api/portraits/men/36.jpg' }
  ]
}

const suplentesPorDepartamento = {
  'LA PAZ': [
    { nombre: 'Freddy Rioja Melgar', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/37.jpg' },
    { nombre: 'Reina Isabel Pallares', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/38.jpg' },
    { nombre: 'Cesia Roca Escalante', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/39.jpg' },
    { nombre: 'Villma Colque Camacho', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/40.jpg' }
  ],
  'SANTA CRUZ': [
    { nombre: 'Marcela Guerrero Vilca', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/41.jpg' },
    { nombre: 'Sichard Hans Soraide', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/42.jpg' },
    { nombre: 'Mabel Giordano', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/43.jpg' },
    { nombre: 'Marco Antonio Segovia', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/44.jpg' }
  ],
  'COCHABAMBA': [
    { nombre: 'Rolando Vacaflor', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { nombre: 'Richard Espada Ugarte', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { nombre: 'Hugo Marcelo Cortez', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/47.jpg' },
    { nombre: 'Aldo Sergio Villegas', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/48.jpg' }
  ],
  'POTOSÍ': [
    { nombre: 'Victor S. Quispe', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/49.jpg' },
    { nombre: 'Jesus Humberto Suarez', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/50.jpg' },
    { nombre: 'Maria Elena Pachacute', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/51.jpg' },
    { nombre: 'Royer Ivan Mamani', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/52.jpg' }
  ],
  'CHUQUISACA': [
    { nombre: 'Edwin Lopez Quiroga', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/53.jpg' },
    { nombre: 'Roxana Mamani', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/54.jpg' },
    { nombre: 'Marcelo Matias Cardona', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/55.jpg' },
    { nombre: 'Manfred Leo Perez', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/56.jpg' }
  ],
  'ORURO': [
    { nombre: 'Roger Mamani Coronado', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/57.jpg' },
    { nombre: 'Nilton Condori Alanoca', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/58.jpg' },
    { nombre: 'Luzmaya Zelaya Vega', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/59.jpg' },
    { nombre: 'Carolina Giese Urresti', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/60.jpg' }
  ],
  'TARIJA': [
    { nombre: 'Leonardo Roca Eguez', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/61.jpg' },
    { nombre: 'Susana Gabriela Ruiz', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/62.jpg' },
    { nombre: 'Lorgio Fernando Pareja', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/63.jpg' },
    { nombre: 'Lenny Mayra Ayala', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/64.jpg' }
  ],
  'BENI': [
    { nombre: 'Ramiro Mamani Ramirez', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/65.jpg' },
    { nombre: 'Ilse Fatima Davila', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/66.jpg' },
    { nombre: 'Kathia Natalia Miserendino', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/67.jpg' },
    { nombre: 'Jorge Antonio Quispe', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/68.jpg' }
  ],
  'PANDO': [
    { nombre: 'Claudia Cardenas', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/69.jpg' },
    { nombre: 'Cinthya Inga Gutierrez', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/70.jpg' },
    { nombre: 'Apolinar Rivera Muñoz', cargo: 'Senador Suplente', imagen: 'https://randomuser.me/api/portraits/men/71.jpg' },
    { nombre: 'Cesia Roca Escalante', cargo: 'Senadora Suplente', imagen: 'https://randomuser.me/api/portraits/women/72.jpg' }
  ]
}

const titulares = ref([])
const suplentes = ref([])

const seleccionarDepartamento = (dep) => {
  departamentoSeleccionado.value = dep
  titulares.value = titularesPorDepartamento[dep.nombre] || []
  suplentes.value = suplentesPorDepartamento[dep.nombre] || []
}

// ==================== DATOS SECCIÓN 4 ====================
const partidoSeleccionado = ref(null)
const mostrarSuplentes = ref(false)

// Datos de los senadores por partido
const senadoresData = [
  { nombre: 'Abdon Porcel Arancibia', suplente: 'Ilse Fatima Davila Arancibia', partido: 'libre' },
  { nombre: 'Bertha Nurmy Gutierrez Meneses De Mamani', suplente: 'Freddy Rioja Melgar', partido: 'pdc' },
  { nombre: 'Branko Goran Marinkovic Jovicevic', suplente: 'Kathia Natalia Miserendino Romero', partido: 'libre' },
  { nombre: 'Carol Carlo Duran', suplente: 'Jorge Antonio Quispe Flores', partido: 'libre' },
  { nombre: 'Cesar Mentasti Padilla', suplente: 'Marcela Guerrero Vilca', partido: 'alianza' },
  { nombre: 'Claudia Mallon Vargas', suplente: 'Apolinar Rivera Muñoz', partido: 'sumate' },
  { nombre: 'Daniel Antonio Ortiz Velasquez', suplente: 'Reina Isabel Pallares Morales', partido: 'pdc' },
  { nombre: 'Eliana Rina Acosta Quispe', suplente: 'Sichard Hans Soraide Castedo', partido: 'alianza' },
  { nombre: 'Erick Nelson Soruco Alpire', suplente: 'Cesia Roca Escalante', partido: 'pdc' },
  { nombre: 'Ernesto Suarez Sattori', suplente: 'Claudia Cardenas Velasquez', partido: 'libre' },
  { nombre: 'Freddy Castillo Chavez', suplente: 'Villma Colque Camacho', partido: 'pdc' },
  { nombre: 'Jose Roca Haensel', suplente: 'Mabel Giordano Sonnenschein', partido: 'alianza' },
  { nombre: 'Jose Sanchez Aguilar', suplente: 'Cinthya Inga Gutierrez Guzman', partido: 'libre' },
  { nombre: 'Leonor Rosalva Romero Gutierrez', suplente: 'Marco Antonio Segovia Vargas', partido: 'alianza' },
  { nombre: 'Maria Isabel Moreno Cortez', suplente: 'Rolando Vacaflor Gabriel Arana', partido: 'libre' },
  { nombre: 'Paola Limbania Lopez Zeballos', suplente: 'Richard Espada Ugarte', partido: 'pdc' },
  { nombre: 'Teresa Alarcon Arana', suplente: '', partido: 'pdc' },
  { nombre: 'Tomasa Yarhui Jacome', suplente: 'Hugo Marcelo Cortez Calvimontes', partido: 'libre' },
  { nombre: 'Wanda Ximena Medrano Hervas', suplente: 'Aldo Sergio Villegas Mora', partido: 'libre' },
  { nombre: 'Ana Maria Crispin Choque', suplente: 'Victor S. Quispe Santander', partido: 'pdc' },
  { nombre: 'Cintia Monica Puerta Campos', suplente: 'Jesus Humberto Suarez Eguez', partido: 'pdc' },
  { nombre: 'Jose Manuel Ormachea Mendienta', suplente: 'Maria Elena Pachacute Ticona', partido: 'libre' },
  { nombre: 'Judith Rosario Garcia Coca', suplente: 'Royer Ivan Mamani Garcia', partido: 'pdc' },
  { nombre: 'Maria Antonieta Alcon Sanchez', suplente: 'Edwin Lopez Quiroga', partido: 'pdc' },
  { nombre: 'Nicanor Gonzalo Cochi Condori', suplente: 'Roxana Mamani Colquehuanca', partido: 'pdc' },
  { nombre: 'Ana Karina Velasco Añez', suplente: 'Marcelo Matias Cardona Ibañez', partido: 'alianza' },
  { nombre: 'Bertha Cartagena Sanchez', suplente: 'Manfred Leo Perez Hassenteufel', partido: 'pdc' },
  { nombre: 'Betty Canaviri Villanueva', suplente: 'Roger Mamani Coronado', partido: 'libre' },
  { nombre: 'Carmen Soledad Chapeton Tancara', suplente: 'Nilton Condori Alanoca', partido: 'alianza' },
  { nombre: 'Diego Esteban Mateo Avila Navajas', suplente: 'Luzmaya Zelaya Vega', partido: 'pdc' },
  { nombre: 'Julio Diego Romaña Galindo', suplente: 'Carolina Giese Urresti', partido: 'libre' },
  { nombre: 'Kathia Lisbeth Quiroga Fernandez', suplente: 'Leonardo Roca Eguez', partido: 'libre' },
  { nombre: 'Marcelino Flores Ordoñez', suplente: 'Susana Gabriela Ruiz Zuleta', partido: 'pdc' },
  { nombre: 'Rosa Tatiana Añez Carrasco', suplente: 'Lorgio Fernando Pareja Saucedo', partido: 'alianza' },
  { nombre: 'Wilder Veliz Armas', suplente: 'Lenny Mayra Ayala Justiniano', partido: 'pdc' },
  { nombre: 'Yasmin Estivariz Villarroel', suplente: 'Ramiro Mamani Ramirez', partido: 'pdc' }
]

// Organizar por partido
const miembrosPorPartido = {
  pdc: { titulares: [], suplentes: [] },
  libre: { titulares: [], suplentes: [] },
  alianza: { titulares: [], suplentes: [] },
  sumate: { titulares: [], suplentes: [] }
}

senadoresData.forEach(s => {
  let partidoKey = s.partido
  if (partidoKey === 'pdc') {
    miembrosPorPartido.pdc.titulares.push({ nombre: s.nombre, cargo: 'Senador Titular', imagen: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg` })
    if (s.suplente) {
      miembrosPorPartido.pdc.suplentes.push({ nombre: s.suplente, cargo: 'Senador Suplente', imagen: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg` })
    }
  } else if (partidoKey === 'libre') {
    miembrosPorPartido.libre.titulares.push({ nombre: s.nombre, cargo: 'Senador Titular', imagen: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg` })
    if (s.suplente) {
      miembrosPorPartido.libre.suplentes.push({ nombre: s.suplente, cargo: 'Senador Suplente', imagen: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg` })
    }
  } else if (partidoKey === 'alianza') {
    miembrosPorPartido.alianza.titulares.push({ nombre: s.nombre, cargo: 'Senador Titular', imagen: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg` })
    if (s.suplente) {
      miembrosPorPartido.alianza.suplentes.push({ nombre: s.suplente, cargo: 'Senador Suplente', imagen: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg` })
    }
  } else if (partidoKey === 'sumate') {
    miembrosPorPartido.sumate.titulares.push({ nombre: s.nombre, cargo: 'Senador Titular', imagen: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg` })
    if (s.suplente) {
      miembrosPorPartido.sumate.suplentes.push({ nombre: s.suplente, cargo: 'Senador Suplente', imagen: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg` })
    }
  }
})

// Iconos SVG para partidos
const crearIconoPartido = (color, letra) => `
  <svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="${color}" stroke="#E4D294" stroke-width="2"/>
    <text x="50" y="65" text-anchor="middle" fill="white" font-size="40" font-weight="bold">${letra}</text>
  </svg>
`

const partidos = ref([
  { id: 'pdc', nombre: 'Partido Demócrata Cristiano', nombreCorto: 'PDC', iconoBlanco: crearIconoPartido('#FFFFFF', 'P'), iconoDorado: crearIconoPartido('#D4AF37', 'P') },
  { id: 'libre', nombre: 'Libre', nombreCorto: 'LIBRE', iconoBlanco: crearIconoPartido('#FFFFFF', 'L'), iconoDorado: crearIconoPartido('#D4AF37', 'L') },
  { id: 'alianza', nombre: 'Alianza Unidad', nombreCorto: 'AU', iconoBlanco: crearIconoPartido('#FFFFFF', 'A'), iconoDorado: crearIconoPartido('#D4AF37', 'A') },
  { id: 'sumate', nombre: 'Sumate', nombreCorto: 'SUMATE', iconoBlanco: crearIconoPartido('#FFFFFF', 'S'), iconoDorado: crearIconoPartido('#D4AF37', 'S') }
])

const miembrosMostrar = computed(() => {
  if (!partidoSeleccionado.value) return []
  const data = miembrosPorPartido[partidoSeleccionado.value.id]
  return mostrarSuplentes.value ? data.suplentes : data.titulares
})

const seleccionarPartido = (partido) => {
  if (partidoSeleccionado.value?.id === partido.id) {
    // Si es el mismo, no hacer nada o podrías resetear
  }
  partidoSeleccionado.value = partido
  mostrarSuplentes.value = false
}

const toggleTipoMiembros = () => {
  mostrarSuplentes.value = !mostrarSuplentes.value
}

// ==================== SCROLL OBSERVER ====================
const sections = {
  'seccion1': seccion1Ref,
  'seccion2': seccion2Ref,
  'seccion3': seccion3Ref,
  'seccion4': seccion4Ref
}

const scrollToSection = (id) => {
  const sectionRef = sections[id]
  if (sectionRef?.value) {
    sectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

let scrollObserver = null

const initScrollObserver = () => {
  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === seccion1Ref.value) {
            isSeccion1Visible.value = true;
            isSeccion2Visible.value = false;
            isSeccion3Visible.value = false;
            isSeccion4Visible.value = false;
          } else if (entry.target === seccion2Ref.value) {
            isSeccion1Visible.value = false;
            isSeccion2Visible.value = true;
            isSeccion3Visible.value = false;
            isSeccion4Visible.value = false;
          } else if (entry.target === seccion3Ref.value) {
            isSeccion1Visible.value = false;
            isSeccion2Visible.value = false;
            isSeccion3Visible.value = true;
            isSeccion4Visible.value = false;
          } else if (entry.target === seccion4Ref.value) {
            isSeccion1Visible.value = false;
            isSeccion2Visible.value = false;
            isSeccion3Visible.value = false;
            isSeccion4Visible.value = true;
          }
          entry.target.classList.add('animate-in');
        }
      });
    },
    { threshold: 0.3, rootMargin: '0px 0px 0px 0px' }
  );
  
  [seccion1Ref.value, seccion2Ref.value, seccion3Ref.value, seccion4Ref.value].forEach(section => {
    if (section) scrollObserver.observe(section);
  });
};

onMounted(async () => {
  initScrollListener();
  await nextTick();
  initScrollObserver();
  
  setTimeout(() => {
    if (seccion1Ref.value) {
      isSeccion1Visible.value = true;
      seccion1Ref.value.classList.add('animate-in');
    }
  }, 100);
  
  if (route.hash) {
    const id = route.hash.replace('#', '')
    setTimeout(() => scrollToSection(id), 500)
  }
});

watch(() => route.hash, (newHash) => {
  if (newHash) {
    const id = newHash.replace('#', '')
    scrollToSection(id)
  }
})

onUnmounted(() => {
  removeScrollListener();
  if (scrollObserver) scrollObserver.disconnect();
});

definePageMeta({ layout: 'alter8' });
</script>

<style scoped>
.text-style {
  font-family: 'Montserrat', Tahoma, Geneva, Verdana, sans-serif;
}

html, body {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
}

section, .scroll-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  transition: transform 0.6s cubic-bezier(0.25, 0.1, 0.3, 1.2);
}

.shadow-left-column {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 15px rgba(224, 54, 54, 0.3);
}

.shadow-right-column {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.5);
}

.circle-shadow {
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.4), 0 0 0 2px rgba(228, 210, 148, 0.3);
}

.circle-shadow-large {
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 3px rgba(228, 210, 148, 0.3);
}

.global-fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.8s ease-in-out, visibility 0.8s ease-in-out;
}

.global-fixed-background::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at 50% 30%, transparent 0%, rgba(0, 0, 0, 0.3) 80%, rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
  z-index: 1;
}

.global-fixed-background.show-fixed {
  opacity: 1;
  visibility: visible;
}

.seccion1-fondo {
  background-image: url('https://pxcdn.reduno.com.bo/reduno/112025/1762461432445.webp?cw=800&ch=450&extw=jpg');
}

.seccion3-fondo {
  background-image: url('https://pxcdn.reduno.com.bo/reduno/112025/1762461432445.webp?cw=800&ch=450&extw=jpg');
}

.seccion4-fondo {
  background-image: url('https://apisi.senado.gob.bo/images/a001535c-1750-49a8-b277-37b32b038c45_1759275539.jpeg');
}

.scroll-section {
  position: relative;
  width: 100%;
  z-index: 5;
}

section, .scroll-section {
  position: relative;
  z-index: 10;
}

.scroll-section > div {
  position: relative;
  z-index: 15;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
}

.drop-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.drop-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

@media (min-width: 1024px) {
  .container { max-width: 1280px; }
}
</style>

<style>
.scroll-section {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.scroll-section.animate-in {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.scroll-section.animate-in > * {
  animation: fadeInUpChild 0.6s ease-out forwards;
}

@keyframes fadeInUpChild {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

::-webkit-scrollbar {
  width: 10px;
  background: transparent;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(224, 54, 54, 0.4);
  border-radius: 10px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(224, 54, 54, 0.7);
}

html { scroll-behavior: smooth; }

footer {
  display: block !important;
  position: relative !important;
  z-index: 100 !important;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-section,
  .scroll-section.animate-in,
  .scroll-section.animate-in > * {
    transition: none !important;
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
</style>