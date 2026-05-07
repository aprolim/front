<!-- pages/legisladores-nacionales.vue -->
<template>
  <div class="min-h-screen text-style">
    <!-- Fondos fijos para cada sección -->
    <div class="global-fixed-background seccion1-fondo" :class="{ 'show-fixed': isSeccion1Visible }"></div>
    <div class="global-fixed-background seccion3-fondo" :class="{ 'show-fixed': isSeccion3Visible }"></div>
    <div class="global-fixed-background seccion4-fondo" :class="{ 'show-fixed': isSeccion4Visible }"></div>
    
    <!-- ==================== SECCIÓN 1 ==================== -->
    <section 
      id="directiva-camaral"
      class="relative h-screen overflow-y-auto transition-all duration-500"
      ref="seccion1Ref"
    >
      <div class="text-[3vw] w-full text-center mt-[4.1vw] bg-white relative py-[.1vh]">
        <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right"></div>
        <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left"></div>
        <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down"></div>
        <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up"></div>
        
        <h2 class="text-[#E03636] font-semibold py-[-1.3vw]">
          Directiva Camaral
        </h2>
        <p class="text-gray-500 translate-y-[-.5vw] text-[.35em]">Selecciona un senador para ver detalles</p>
      </div>
      <div class="mx-[5vw] px-4 z-10 relative mt-[2.3vh]">
        <div class="flex flex-row gap-[2vw] h-full items-center">
          
          <div class="w-[60%] p-[1.5vh] rounded-2xl shadow-left-column" 
              :style="{ backgroundColor: 'rgba(190, 0, 0, 0.60)' }">
            
            <div class="grid grid-cols-3 gap-[.6vh] mb-[1.8vh]">
              <div v-for="persona in fila1" :key="persona.id" 
                class="text-center cursor-pointer group"
                @click="selectedImage = { 
                  img: persona.imagen, 
                  text: persona.textoCompleto, 
                  nombre: persona.nombre, 
                  apellido: persona.apellido, 
                  cargo: persona.cargo 
                }"
              >
                <div class="relative w-[16vh] h-[16vh] mx-auto">
                  <div class="w-full h-full rounded-full overflow-hidden border-4 circle-shadow transition-all duration-300 group-hover:scale-[1.3] group-hover:relative group-hover:z-50" 
                      style="border-color: #E4D294;">
                    <nuxt-img 
                      :src="persona.imagen" 
                      :alt="persona.nombre" 
                      format="webp"
                      quality="85"
                      loading="lazy" 
                      decoding="async"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p class="mt-2 text-white font-semibold drop-shadow text-[2.3vh]">{{ persona.nombre }}</p>
                <p class="text-white font-semibold drop-shadow text-[2.3vh]">{{ persona.apellido }}</p>
                <p class="text-gray-200 drop-shadow text-[1.8vh]">{{ persona.cargoPartido.toUpperCase() }}</p>
                <p class="text-gray-200 drop-shadow text-[1.8vh]">{{ persona.partido.toUpperCase() }}</p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-[.6vh]">
              <div v-for="persona in fila2" :key="persona.id" 
                class="text-center cursor-pointer group"
                @click="selectedImage = { 
                  img: persona.imagen, 
                  text: persona.textoCompleto, 
                  nombre: persona.nombre, 
                  apellido: persona.apellido, 
                  cargo: persona.cargo 
                }"
              >
                <div class="relative w-[16vh] h-[16vh] mx-auto">
                  <div class="w-full h-full rounded-full overflow-hidden border-4 circle-shadow transition-all duration-300 group-hover:scale-[1.3] group-hover:relative group-hover:z-50" 
                      style="border-color: #E4D294;">
                    <nuxt-img 
                      :src="persona.imagen" 
                      :alt="persona.nombre" 
                      format="webp"
                      quality="85"
                      loading="lazy" 
                      decoding="async"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p class="mt-2 text-white font-semibold drop-shadow text-[2.3vh]">{{ persona.nombre }}</p>
                <p class="text-white font-semibold drop-shadow text-[2.3vh]">{{ persona.apellido }}</p>
                <p class="text-gray-200 drop-shadow text-[1.8vh]">{{ persona.cargoPartido.toUpperCase() }}</p>
                <p class="text-gray-200 drop-shadow text-[1.8vh]">{{ persona.partido.toUpperCase() }}</p>
              </div>
            </div>
          </div>
          
          <div class="w-[40%] flex flex-col items-center justify-center p-[3.0vh] rounded-2xl shadow-right-column"
              :style="{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }">
            <div class="w-[29vh] h-[29vh] rounded-full overflow-hidden mb-[.9vh] transition-all duration-300 circle-shadow-large border-[.4vh]" 
                style="border-color: #E4D294;">
              <nuxt-img 
                :src="selectedImage.img" 
                :alt="selectedImage.nombre" 
                format="webp"
                quality="85"
                loading="lazy" 
                decoding="async"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="text-[2.9vh] font-bold text-white drop-shadow-lg text-center">
              {{ selectedImage.nombre }}
            </h3>
            <h3 class="text-[2.9vh] font-bold text-white drop-shadow-lg mb-[.8vh] text-center">
              {{ selectedImage.apellido }}
            </h3>
            <p class="text-gray-100 drop-shadow-lg mb-[.8vh] text-center text-[2.0vh]">
              {{ selectedImage.cargo }}
            </p>
            <div class="text-center">
              <p class="text-white drop-shadow-lg leading-relaxed text-[1.9vh] text-justify">
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

    <!-- ==================== SECCIÓN 2 - COMISIONES Y COMITES ==================== -->
    <div 
      id="comisiones-y-comites"
      ref="seccion2Ref" 
      class="scroll-section opacity-0 transition-all duration-800 ease-out z-10"
      :class="{ 'animate-in': isSeccion2Visible }"
      style="height: 100vh; position: relative; background: white; overflow-y: auto;"
    >
      <div class="mx-[5vw] mt-[4.2vw] px-4 ">
        <div class="bg-[#E03636] rounded-lg mb-[3.5vh]">
          <h2 class="text-[5vh] font-bold text-center text-white py-[0.5vw] tracking-wide">
            COMISIONES Y COMITÉS
          </h2>
        </div>

        <div class="flex flex-col md:flex-row gap-6">
          
          <div class="w-full md:w-[40%] space-y-[.2vw]">
            <button
              v-for="comision in comisionesList"
              :key="comision.id"
              @click="seleccionarComision(comision)"
              :class="[
                'w-full py-[.1vh] px-4 rounded-lg font-semibold transition-all duration-300 text-left text-[2.4vh]',
                comisionSeleccionada?.id === comision.id 
                  ? 'bg-[#E03636] text-white' 
                  : 'bg-white text-[#E03636] border border-[#E03636] hover:bg-[#E03636] hover:text-white'
              ]"
              class="text-[1.2vw]"
            >
              {{ comision.nombre }}
            </button>
          </div>

          <div class="w-full md:w-[60%] bg-gray-400/90 rounded-lg pt-[1vw] text-[1vw] mt-[-1.8vh]">
            <div v-if="comisionSeleccionada">
              <h3 class="text-[3.5vh] font-bold text-white drop-shadow-md text-center">
                {{ comisionSeleccionada.nombre }}
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div v-for="(miembro, idx) in comisionSeleccionada.miembrosGrupo1" :key="'g1-'+idx" class="flex items-center gap-0 p-[1vw] rounded-lg pl-[2vw]">
                  <nuxt-img 
                    :src="miembro.foto" 
                    :alt="miembro.nombre" 
                    format="webp"
                    quality="85"
                    loading="lazy" 
                    decoding="async"
                    class="w-[14vh] h-[14vh] rounded-full object-cover transition-all duration-700 hover:scale-[3.2] hover:z-50"
                  />
                  <div class="text-white text-center text-[2vh]">
                    <p class="font-bold drop-shadow-md">{{ miembro.cargo }}</p>
                    <p class="drop-shadow-md">{{ miembro.nombre }}</p>
                    <p class="drop-shadow-md">{{ miembro.apellido }}</p>
                    <p class="drop-shadow-md">{{ miembro.partido }}</p>
                  </div>
                </div>
              </div>

              <div class="py-[.4vw] bg-[#E03636]">
                <h4 class="font-semibold text-white text-[1em] text-center">{{ comisionSeleccionada.tituloLinea1 }}</h4>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div v-for="(miembro, idx) in comisionSeleccionada.miembrosGrupo2" :key="'g2-'+idx" class="flex items-center gap-0 p-[1vw] rounded-lg pl-[2vw]">
                  <nuxt-img 
                    :src="miembro.foto" 
                    :alt="miembro.nombre" 
                    format="webp"
                    quality="85"
                    loading="lazy" 
                    decoding="async"
                    class="w-[14vh] h-[14vh] rounded-full object-cover transition-all duration-700 hover:scale-[3.2] hover:z-50"
                  />
                  <div class="text-white text-center text-[2vh]">
                    <p class="font-bold drop-shadow-md">{{ miembro.cargo }}</p>
                    <p class="drop-shadow-md">{{ miembro.nombre }}</p>
                    <p class="drop-shadow-md">{{ miembro.apellido }}</p>
                    <p class="drop-shadow-md">{{ miembro.partido }}</p>
                  </div>
                </div>
              </div>

              <div class="py-[.4vw] bg-[#E03636]">
                <h4 class="text-[1em] font-semibold text-white text-center">{{ comisionSeleccionada.tituloLinea2 }}</h4>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div v-for="(miembro, idx) in comisionSeleccionada.miembrosGrupo3" :key="'g3-'+idx" class="flex items-center gap-0 p-[1vw] rounded-lg pl-[2vw]">
                  <nuxt-img 
                    :src="miembro.foto" 
                    :alt="miembro.nombre" 
                    format="webp"
                    quality="85"
                    loading="lazy" 
                    decoding="async"
                    class="w-[14vh] h-[14vh] rounded-full object-cover transition-all duration-700 hover:scale-[3.2] hover:z-50"
                  />
                  <div class="text-white text-center text-[2vh]">
                    <p class="font-bold drop-shadow-md">{{ miembro.cargo }}</p>
                    <p class="drop-shadow-md">{{ miembro.nombre }}</p>
                    <p class="drop-shadow-md">{{ miembro.apellido }}</p>
                    <p class="drop-shadow-md">{{ miembro.partido }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="flex items-center justify-center h-96">
              <p class="text-gray-500 text-lg">Seleccione una comisión o comité para ver sus miembros</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ==================== SECCIÓN 3 ==================== -->
    <div 
      id="brigadas-parlamentarias"
      ref="seccion3Ref" 
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-200 z-10"
      :class="{ 'animate-in': isSeccion3Visible }"
      style="height: 100vh; position: relative; background: transparent; display: flex; flex-direction: column; overflow-y: auto;"
    >
      <div class="w-full text-center mt-[4.1vw] mb-0 relative py-[.2em] flex-shrink-0">
        <div class="absolute top-0 left-0 h-[2px] bg-[#E4D294] animate-slide-right"></div>
        <div class="absolute bottom-0 right-0 h-[2px] bg-[#E4D294] animate-slide-left"></div>
        <div class="absolute top-0 right-0 w-[2px] bg-[#E4D294] animate-slide-down"></div>
        <div class="absolute bottom-0 left-0 w-[2px] bg-[#E4D294] animate-slide-up"></div>
        
        <h2 class="text-[3vw] text-white font-semibold bg-[#E03636]">
          Brigadas Parlamentarias
        </h2>
      </div>
      
      <div class="mx-auto px-4 z-10 relative w-full flex-1 flex flex-col justify-center">
        <div v-if="!departamentoSeleccionado" class="flex flex-col items-center justify-center">
          <div class="grid grid-cols-5 gap-8 mb-8">
            <div v-for="dep in departamentos.slice(0,5)" :key="dep.id" 
                @click="seleccionarDepartamento(dep)"
                class="cursor-pointer transition-all duration-300 hover:scale-[1.5] text-center group relative hover:z-50">
              <div v-html="dep.escudoDorado" 
                  class="w-[15vw] h-[15vw] mx-auto transition-all duration-300 group-hover:opacity-0"></div>
              <div v-html="dep.escudoReal" 
                  class="w-[15vw] h-[15vw] mx-auto absolute top-0 left-0 right-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:z-10"></div>
              <p class="text-center text-white mt-2 text-[2.4vh] font-semibold relative z-0">{{ dep.nombre }}</p>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-8">
            <div v-for="dep in departamentos.slice(5,9)" :key="dep.id" 
                @click="seleccionarDepartamento(dep)"
                class="cursor-pointer transition-all duration-300 hover:scale-[1.5] text-center group relative hover:z-50">
              <div v-html="dep.escudoDorado" 
                  class="w-[15vw] h-[15vw] mx-auto transition-all duration-300 group-hover:opacity-0"></div>
              <div v-html="dep.escudoReal" 
                  class="w-[15vw] h-[15vw] mx-auto absolute top-0 left-0 right-0 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:z-10"></div>
              <p class="text-center text-white mt-2 text-[2.4vh] font-semibold relative z-0">{{ dep.nombre }}</p>
            </div>
          </div>
        </div>
        
        <transition name="fade-fast" mode="out-in">
          <div v-if="departamentoSeleccionado" :key="departamentoSeleccionado?.id" class="w-full flex flex-col justify-center items-center px-[5vw]">
            <div class="grid grid-cols-9 gap-5">
              <div v-for="dep in departamentos" :key="dep.id" 
                  @click="seleccionarDepartamento(dep)"
                  class="cursor-pointer text-center group relative">
                <div v-html="departamentoSeleccionado?.id === dep.id ? dep.escudoReal : dep.escudoDorado" 
                    class="w-[7.5vw] h-[7.5vw] mx-auto transition-all duration-500 group-hover:opacity-0 group-hover:scale-[2.0] group-hover:translate-y-[2vw]"></div>
                <div v-html="dep.escudoReal" 
                    class="w-[5.5vw] h-[5.5vw] mx-auto absolute top-0 left-0 right-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-[2.0] group-hover:translate-y-[2vw] group-hover:z-50"></div>
                <p class="text-center text-white text-[2.0vh] mt-1 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">{{ dep.nombre }}</p>
              </div>
            </div>
            
            <div class="bg-[rgba(190,0,0,0.6)] pt-[2vw] px-[2vw] pb-[1vw] rounded-lg w-full">
              <div class="grid grid-cols-5 gap-2 mb-[1vw]">
                <div class="text-center">
                  <div class="text-[1.5vh] mt-[4vw] inline-block px-1 py-2 rounded-full text-white font-semibold w-[12vw]" 
                      :style="{ backgroundColor: 'rgba(224, 54, 54, 0.8)' }">
                    {{ departamentoSeleccionado?.nombre }}
                  </div>
                </div>
                <div v-for="(titular, index) in titulares" :key="'titular-'+index" class="text-center">
                  <div class="w-[12vh] h-[12vh] mx-auto rounded-full overflow-hidden mb-2 transition-all duration-300 hover:scale-[3.3]">
                    <nuxt-img 
                      :src="titular.imagen" 
                      :alt="titular.nombre" 
                      format="webp"
                      quality="85"
                      loading="lazy" 
                      decoding="async"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="text-[1.4vh] text-white font-semibold">{{ titular.nombre }}</p>
                  <p class="text-[1.4vh] text-white font-semibold">{{ titular.apellido }}</p>
                  <p v-if="titular.nombre" class="text-gray-300 text-[1.4vh]">{{ titular.partido.toUpperCase() }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-5 gap-2">
                <div class="text-center">
                  <div class="text-[1.5vh] mt-[5vw] inline-block px-6 py-2 rounded-full text-white font-semibold w-[12vw]" 
                      :style="{ backgroundColor: 'rgba(224, 54, 54, 0.8)' }">
                    {{ departamentoSeleccionado?.nombre }}
                  </div>
                </div>
                <div v-for="(suplente, index) in suplentes" :key="'suplente-'+index" class="text-center">
                  <div class="w-[12vh] h-[12vh] mx-auto rounded-full overflow-hidden mb-2 transition-all duration-300 hover:scale-[3.3]">
                    <nuxt-img 
                      :src="suplente.imagen" 
                      :alt="suplente.nombre" 
                      format="webp"
                      quality="85"
                      loading="lazy" 
                      decoding="async"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <p class="text-white font-semibold text-[1.4vh]">{{ suplente.nombre }}</p>
                  <p class="text-white font-semibold text-[1.4vh]">{{ suplente.apellido }}</p>
                  <p v-if="suplente.nombre" class="text-gray-300 text-[1.4vh]">{{ suplente.partido.toUpperCase() }}</p>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- ==================== SECCIÓN 4 ==================== -->
    <div 
      id="bancadas-politicas"
      ref="seccion4Ref" 
      class="scroll-section opacity-0 transition-all duration-800 ease-out delay-400 z-10"
      :class="{ 'animate-in': isSeccion4Visible }"
      style="height: 100vh; position: relative; background: transparent; overflow-y: auto;"
    >
      <div class="w-full text-center mt-[4.1vw] bg-white relative flex-shrink-0">
        <div class="absolute top-0 left-0 h-[1px] bg-[#E4D294] animate-slide-right"></div>
        <div class="absolute bottom-0 right-0 h-[1px] bg-[#E4D294] animate-slide-left"></div>
        <div class="absolute top-0 right-0 w-[1px] bg-[#E4D294] animate-slide-down"></div>
        <div class="absolute bottom-0 left-0 w-[1px] bg-[#E4D294] animate-slide-up"></div>
        
        <h2 class="text-[3vw] text-[#E03636] font-semibold bg-white">
          Bancadas Políticas
        </h2>
      </div>

      <div class="mx-[5vw] px-4 z-10 relative pb-8">
        <transition name="fade-scale" mode="out-in">
          <div v-if="!partidoSeleccionado" key="initial" class="flex flex-col items-center justify-center" style="min-height: 80vh;">
            <div class="flex justify-center gap-12">
              <div v-for="partido in partidos" :key="partido.id" 
                  @click="seleccionarPartido(partido)"
                  class="cursor-pointer transition-all duration-300 hover:scale-105 text-center items-center">
                <div v-html="partido.iconoBlanco" class="w-[18vw] h-[18vw] mx-auto"></div>
                <p class="text-center text-white mt-3 text-[2.5vh] font-semibold">{{ partido.nombre }}</p>
              </div>
            </div>
          </div>
        </transition>

        <transition name="fade-scale" mode="out-in">
          <div v-if="partidoSeleccionado" key="selected" class="w-full">
            <div class="flex justify-center gap-8 mb-2">
              <div v-for="partido in partidos" :key="partido.id" 
                  @click="seleccionarPartido(partido)"
                  class="cursor-pointer transition-all duration-300 text-center"
                  :class="{ 'transform scale-90': partidoSeleccionado?.id === partido.id }">
                <div class="w-[12vh] h-[12vh] rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:scale-[2.3] hover:translate-y-[2vw]"
                    :style="{ backgroundColor: partidoSeleccionado?.id === partido.id ? 'rgba(228,210,148,0.2)' : 'rgba(255,255,255,0.1)' }">
                  <div v-html="partidoSeleccionado?.id === partido.id ? partido.iconoDorado : partido.iconoBlanco" 
                      class="w-full h-full"></div>
                </div>
                <p class="text-center text-white text-xs mt-1">{{ partido.nombreCorto }}</p>
              </div>
            </div>

            <div class="bg-red-700 rounded-lg px-6 py-1 flex items-center justify-between">
              <button 
                @click="toggleTipoMiembros"
                class="bg-[#E03636] hover:bg-red-900 text-white font-semibold px-[1.5vw] py-[.1vw] rounded-lg transition-colors">
                {{ mostrarSuplentes ? 'VER TITULARES' : 'VER SUPLENTES' }}
              </button>
              <h3 class="text-white font-bold text-[2vw]">{{ partidoSeleccionado?.nombre }}</h3>
              <div class="w-[15vw]"></div>
            </div>

            <transition name="fade-scale" mode="out-in">
              <div :key="mostrarSuplentes ? 'suplentes' : 'titulares'" class="-mt-1 bg-[rgba(190,0,0,0.6)] ">
                <div v-if="partidoSeleccionado?.id === 'pdc'" class="group pt-2 rounded-lg aspect-[3000/800] w-100 m-auto">
                  <div class="grid grid-cols-6 mb-[.5vw]">
                    <div v-for="(persona, index) in miembrosMostrar.slice(0,6)" :key="persona.nombre" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[6] hover:relative hover:z-40">
                        <nuxt-img 
                          :src="persona.imagen" 
                          :alt="persona.nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ persona.nombre}}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ persona.apellido}}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ persona.departamento }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-5 mb-[.5vw]">
                    <div v-for="(persona, index) in miembrosMostrar.slice(6,11)" :key="persona.nombre" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[6] hover:relative hover:z-40">
                        <nuxt-img 
                          :src="persona.imagen" 
                          :alt="persona.nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ persona.nombre}}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ persona.apellido}}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ persona.departamento }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-5">
                    <div v-for="(persona, index) in miembrosMostrar.slice(11,16)" :key="persona.nombre" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[6] hover:relative hover:z-40 hover:translate-y-[-12vh]">
                        <nuxt-img 
                          :src="persona.imagen" 
                          :alt="persona.nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ persona.nombre}}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ persona.apellido}}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ persona.departamento }}</p>
                    </div>
                  </div>
                </div>

                <div v-else-if="partidoSeleccionado?.id === 'libre'" class="group pt-2 rounded-lg aspect-[3000/800] w-100 m-auto">
                  <div class="grid grid-cols-4 mb-[.5vw]">
                    <div v-for="(persona, index) in miembrosMostrar.slice(0,4)" :key="persona.nombre" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[3] hover:relative hover:z-40">
                        <nuxt-img 
                          :src="persona.imagen" 
                          :alt="persona.nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ persona.nombre}}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ persona.apellido}}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ persona.departamento }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-4 mb-[.5vw]">
                    <div v-for="(persona, index) in miembrosMostrar.slice(4,8)" :key="persona.nombre" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[3] hover:relative hover:z-40">
                        <nuxt-img 
                          :src="persona.imagen" 
                          :alt="persona.nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ persona.nombre}}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ persona.apellido}}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ persona.departamento }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-4">
                    <div v-for="(persona, index) in miembrosMostrar.slice(8,12)" :key="persona.nombre" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[3] hover:relative hover:z-40">
                        <nuxt-img 
                          :src="persona.imagen" 
                          :alt="persona.nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ persona.nombre}}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ persona.apellido}}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ persona.departamento }}</p>
                    </div>
                  </div>
                </div>

                <div v-else-if="partidoSeleccionado?.id === 'alianza'" class="group pt-2 rounded-lg aspect-[3000/800] w-100 m-auto">
                  <div class="grid grid-cols-3 mb-[.5vw]">
                    <div v-for="(persona, index) in miembrosMostrar.slice(0,3)" :key="persona.nombre" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[3] hover:relative hover:z-40">
                        <nuxt-img 
                          :src="persona.imagen" 
                          :alt="persona.nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ persona.nombre}}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ persona.apellido}}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ persona.departamento }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-3 mb-[.5vw]">
                    <div v-for="(persona, index) in miembrosMostrar.slice(3,6)" :key="persona.nombre" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[3] hover:relative hover:z-40">
                        <nuxt-img 
                          :src="persona.imagen" 
                          :alt="persona.nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ persona.nombre}}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ persona.apellido}}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ persona.departamento }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-3">
                    <div v-if="miembrosMostrar[6]" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[3] hover:relative hover:z-40">
                        <nuxt-img 
                          :src="miembrosMostrar[6].imagen" 
                          :alt="miembrosMostrar[6].nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ miembrosMostrar[6].nombre }}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ miembrosMostrar[6].apellido }}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ miembrosMostrar[6].departamento }}</p>
                    </div>
                    <div></div>
                    <div></div>
                  </div>
                </div>

                <div v-else-if="partidoSeleccionado?.id === 'sumate'" class="group pt-2 rounded-lg aspect-[3000/800] w-100 m-auto">
                  <div class="flex justify-center">
                    <div v-if="miembrosMostrar[0]" class="text-center">
                      <div class="w-[10vh] h-[10vh] mx-auto rounded-full overflow-hidden mb-1 transition-all duration-300 hover:scale-[3] hover:relative hover:z-40">
                        <nuxt-img 
                          :src="miembrosMostrar[0].imagen" 
                          :alt="miembrosMostrar[0].nombre" 
                          format="webp"
                          quality="85"
                          loading="lazy" 
                          decoding="async"
                          class="w-full h-full object-cover"
                        />
                      </div>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.2vw]">{{ miembrosMostrar[0].nombre }}</p>
                      <p class="text-white font-semibold text-[1.6vh] drop-shadow-lg mt-[-.3vw]">{{ miembrosMostrar[0].apellido }}</p>
                      <p class="text-gray-200 text-[1.4vh] drop-shadow-lg">{{ miembrosMostrar[0].departamento }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </transition>
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
import { partidosData } from '~/data/partidos'

const departamentos = ref(departamentosData)
const partidos = ref(partidosData)

const { scrolled, scrollProgress, initScrollListener, removeScrollListener } = useScrollEffects()
const route = useRoute()

const seccion1Ref = ref(null)
const seccion2Ref = ref(null)
const seccion3Ref = ref(null)
const seccion4Ref = ref(null)

const isSeccion1Visible = ref(true)
const isSeccion2Visible = ref(false)
const isSeccion3Visible = ref(false)
const isSeccion4Visible = ref(false)

const fila1 = ref([
  {
    id: 1,
    nombre: 'Diego Esteban Mateo',
    apellido: 'Ávila Navajas',
    cargoPartido: 'Presidencia',
    partido: 'PDC',
    cargo: 'Presidenta del Senado',
    imagen: '/senadores/g1/DIEGO ESTEBAN MATEO ÁVILA NAVAJAS.png',
    textoCompleto: 'Diego Esteban Mateo Ávila Navajas es economista y docente nacido en Tarija, con amplia experiencia en gestión pública y cooperación internacional. Como actual Presidente del Senado (2025–2026), lidera una gestión enfocada en la transparencia, el diálogo político y el desarrollo productivo, buscando fortalecer la institucionalidad legislativa y la estabilidad democrática de Bolivia.'
  },
  {
    id: 2,
    nombre: 'Carmen Soledad',
    apellido:'Chapetón Tancara',
    cargoPartido: 'Primera Vicepresidencia',
    partido: 'Unidad',
    cargo: 'Vicepresidente',
    imagen: '/senadores/g2/CARMEN SOLEDAD CHAPETON TANCARA.png',
    textoCompleto: 'C. Soledad Chapetón Tancara, nació en El Alto, es Licenciada en Cs. de la Educación de la UMSA. Fue asambleísta Constituyente y la primera mujer Alcaldesa de El Alto. Su gestión destacó por la Construcción de la Terminal Metropolitana, el Jach’a Uta, la  Estación de bomberos, la revolución del pavimento, impulso más de 80 centros infantiles entre otros proyectos y programas. Actualmente es Senadora, con trayectoria en liderazgo y servicio público.'
  },
  {
    id: 3,
    nombre: 'Khatia Lisbeth',
    apellido: 'Quiroga Fernández',
    cargoPartido: 'Segunda Vicepresidencia',
    partido: 'Libre',
    cargo: 'Secretario General',
    imagen: '/senadores/g3/KHATIA LISBETH QUIROGA FERNÁNDEZ.png',
    textoCompleto: 'Kathia Quiroga Fernández, ingeniera en Sistemas y abogada, es Segunda Vicepresidenta de la Cámara de Senadores para el periodo 2025-2026. Su gestión impulsa la autonomía mediante un nuevo pacto fiscal, la aprobación urgente de la ley 50/50, reformas al sistema de justicia y un medio ambiente libre de contaminación minera.'
  }
])

const fila2 = ref([
  {
    id: 4,
    nombre: 'Yasmin',
    apellido:'Quiroga Fernández',
    cargoPartido: 'Primera Secretaria',
    partido: 'PDC',
    cargo: 'Directora de Comunicación',
    imagen: '/senadores/g1/YASMIN ESTIVARIZ VILLARROEL.png',
    textoCompleto: `Yasmin Estívariz Villarroel, licenciada en Psicología del departamento de Oruro, destaca por su labor altruista y su compromiso en favor de niños con discapacidad.

Actualmente ejerce el cargo de Primera Secretaria del Senado, gestión 2025–2026,  donde promueve alianzas estratégicas institucionales para beneficiar a este sector vulnerable.

Asimismo, impulsa iniciativas legislativas orientadas a la protección del medio ambiente frente a la minería ilegal, desarrollando una gestión comprometida con el progreso de Oruro y el bienestar de su población.`
  },
  {
    id: 5,
    nombre: 'Julio',
    apellido:'Diego Romaña',
    cargoPartido: 'Segunda Secretaria',
    partido: 'Libre',
    cargo: 'Jefe de Protocolo',
    imagen: '/senadores/g4/JULIO DIEGO ROMAÑA GALINDO.png',
    textoCompleto: 'Julio Diego Romaña Galindo es Ingeniero Agrónomo y docente de la Universidad Amazónica de Pando, a sus 33 años fue Vicerrector más joven en la universidad, Senador titular en la gestión 2020-2025 desempeñó funciones como Segundo Secretario y Presidente de la Comisión de Organización Territorial del Estado y Autonomías en dos ocasiones. Actualmente es el Segundo Secretario de la Cámara de Senadores, su gestión, fiscalización y legislación están enfocada en la incorporación a la red vial fundamental y tramo carreteros buscando transparencia, el dialogo y una democracia participativa e equilibrada.'
  },
  {
    id: 6,
    nombre: 'Rosa Tatiana',
    apellido:'Áñez Carrasco',
    cargoPartido: 'Tercera Secretaria',
    partido: 'Unidad',
    cargo: 'Coordinadora Legislativa',
    imagen: '/senadores/g2/ROSA TATIANA AÑEZ CARRASCO.png',
    textoCompleto: 'Rosa Tatiana Añez Carrasco, abogada de profesión con especialidad en Derecho Procesal Penal, destacando en los diferentes cargos desempeñados, docente universitaria, dos veces Diputada uninominal, proyectista de importantes Leyes para su región, en la actualidad enfocada en el ejercicio de la Tercera Secretaria del Senado, buscando fortalecer la democracia.'
  }
])

const selectedImage = ref({
  img: fila1.value[0].imagen,
  text: fila1.value[0].textoCompleto,
  nombre: fila1.value[0].nombre,
  apellido: fila1.value[0].apellido,
  cargo: fila1.value[0].cargo
})

// ==================== DATOS SECCIÓN 2 ====================
const comisionesList = ref([
  { id: 1, nombre: 'Comisión de Constitución, Derechos Humanos, Legislación y Sistema Electoral' },
  { id: 2, nombre: 'Comisión de Justicia Plural, Ministerio Público y Defensa Legal del Estado' },
  { id: 3, nombre: 'Comisión de Seguridad del Estado, Fuerzas Armadas y Policía Boliviana' },
  { id: 4, nombre: 'Comisión de Organización Territorial del Estado y Autonomías' },
  { id: 5, nombre: 'Comisión de Planificación, Política Económica y Finanzas' },
  { id: 6, nombre: 'Comisión de Economía Plural, Producción,Industria e Industrialización' },
  { id: 7, nombre: 'Comisión de Naciones y Pueblos Indígena Originario Campesinos e Interculturalidad' },
  { id: 8, nombre: 'Comisión de Política Social, Educación y Salud' },
  { id: 9, nombre: 'Comisión de Política Internacional' },
  { id: 10, nombre: 'Comisión de Tierra y Territorio, Recursos Naturales y Medio Ambiente' }
])

const comisionSeleccionada = ref(null)

const comisionesData = {
  1: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g1/DANIEL ANTONIO ORTIZ VELASQUEZ.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Daniel Antonio', apellido:'Ortiz Velasquez', partido: 'PDC' },
      { foto: '/new/suplentes/g1/REINA ISABEL PALLARES MORALES.png', cargo: 'SENADORA SUPLENTE', nombre: 'Reina Isabel', apellido:'Pallares Morales', partido: 'PDC' }
    ],
    tituloLinea1: 'COMITE DE CONSTITUCIÓN, LEGISLACIÓN E INTERPRETACIÓN LEGISLATIVA Y CONSTITUCIONAL',
    miembrosGrupo2: [
      { foto: '/new/titulares/g2/FREDDY CASTILLO CHAVEZ.png', cargo: 'SECRETARIO DE COMITÉ', nombre: 'Freddy', apellido:'Castillo Chavez', partido: 'PDC' },
      { foto: '/new/suplentes/g2/VILLMA COLQUE CAMACHO.png', cargo: 'SENADORA SUPLENTE', nombre: 'Villma ', apellido:'Colque Camacho', partido: 'PDC' }
    ],
    tituloLinea2: 'COMITE DE CONSTITUCIÓN, LEGISLACIÓN E INTERPRETACIÓN LEGISLATIVA Y CONSTITUCIONAL',
    miembrosGrupo3: [
      { foto: '/new/titulares/g1/TOMASA YARHUI JACOME.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Tomasa', apellido:'Yarhui Jacome', partido: 'PDC' },
      { foto: '/new/suplentes/g1/HUGO MARCELO CORTEZ CALVIMONTES.png', cargo: 'SENADOR SUPLENTE', nombre: 'Hugo Marcelo', apellido:'Cortez Calvimontes', partido: 'PDC' }
    ]
  },
  2: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g3/ERICK NELSON SORUCO ALPIRE.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Erick Nelson', apellido:'Soruco Alpire', partido: 'PDC' },
      { foto: '/new/suplentes/g3/CESIA ROCA ESCALANTE.png', cargo: 'SENADORA SUPLENTE', nombre: 'Cesia', apellido:'Roca Escalante', partido: 'PDC' }
    ],
    tituloLinea1: 'COMITÉ DE JUSTICIA PLURAL Y CONSEJO DE LA MAGISTRATURA',
    miembrosGrupo2: [
      { foto: '/new/titulares/g1/WILDER VELIZ ARMAS.png', cargo: 'SECRETARIO DE COMITÉ', nombre: 'Wilder', apellido:'Veliz Armas', partido: 'PDC' },
      { foto: '/new/suplentes/g1/LENNY MAYRA AYALA JUSTINIANO.png', cargo: 'SENADORA SUPLENTE', nombre: 'Lenny Mayra', apellido:'Ayala Justiniano', partido: 'PDC' }
    ],
    tituloLinea2: 'COMITÉ DE MINISTERIO PÚBLICO Y DEFENSA LEGAL DEL ESTADO',
    miembrosGrupo3: [
      { foto: '/new/titulares/g2/MARIA ISABEL MORENO CORTEZ.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Maria Isabel', apellido:'Moreno Cortez', partido: 'LIBRE' },
      { foto: '/new/suplentes/g2/ROLANDO VACAFLOR GABRIEL ARANA.png', cargo: 'SENADOR SUPLENTE', nombre: 'Rolando Vacaflor', apellido:'Gabriel Arana', partido: 'LIBRE' }
    ]
  },
  3: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g1/JUDITH ROSARIO GARCIA COCA.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Judith Rosario', apellido:'Garcia Coca', partido: 'PDC' },
      { foto: '/new/suplentes/g1/ROYER IVAN MAMANI GARCIA.png', cargo: 'SENADOR SUPLENTE', nombre: 'Royer Ivan', apellido:'Mamani Garcia', partido: 'PDC' }
    ],
    tituloLinea1: 'COMITÉ DE FUERZAS ARMADAS Y POLICÍA BOLIVIANA',
    miembrosGrupo2: [
      { foto: '/new/titulares/g3/ANA KARINA VELASCO ÁÑEZ.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Ana Karina', apellido:'Velasco Áñez', partido: 'UNIDAD' },
      { foto: '/new/suplentes/g3/MARCELO MATIAS CARDONA IBAÑEZ.png', cargo: 'SENADOR SUPLENTE', nombre: 'Marcelo Matias', apellido:'Cardona Ibañez', partido: 'UNIDAD' }
    ],
    tituloLinea2: 'COMITÉ DE SEGURIDAD DEL ESTADO Y LUCHA CONTRA EL NARCOTRÁFICO',
    miembrosGrupo3: [
      { foto: '/new/titulares/g3/PAOLA LIMBANIA LOPEZ ZEBALLOS.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Paola Limbania', apellido:'Lopez Zeballos', partido: 'PDC' },
      { foto: '/new/suplentes/g3/RICHARD ESPADA UGARTE.png', cargo: 'SENADOR SUPLENTE', nombre: 'Richard', apellido:'Espada Ugarte', partido: 'PDC' }
    ]
  },
  4: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g2/CESAR MENTASTI PADILLA.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Cesar', apellido:'Mentasti Padilla', partido: 'UNIDAD' },
      { foto: '/new/suplentes/g2/MARCELA GUERRERO VILCA.png', cargo: 'SENADORA SUPLENTE', nombre: 'Marcela', apellido:'Guerrero Vilca', partido: 'UNIDAD' }
    ],
    tituloLinea1: 'COMITÉ DE AUTONOMÍAS MUNICIPALES, INDÍGENA ORIGINARIO CAMPESINAS Y REGIONALES',
    miembrosGrupo2: [
      { foto: '/new/titulares/g3/JOSE ROCA HAENSEL.png', cargo: 'SECRETARIO DE COMITÉ', nombre: 'Jose', apellido:'Roca Haensel', partido: 'UNIDAD' },
      { foto: '/new/suplentes/g3/MABEL GIORDANO SONNENSCHEIN.png', cargo: 'SENADORA SUPLENTE', nombre: 'Mabel', apellido:'Giordano Sonnenschein', partido: 'UNIDAD' }
    ],
    tituloLinea2: 'COMITÉ DE AUTONOMÍAS DEPARTAMENTALES',
    miembrosGrupo3: [
      { foto: '/new/titulares/g3/ERNESTO SUAREZ SATTORI.png', cargo: 'SECRETARIO DE COMITÉ', nombre: 'Ernesto', apellido:'Suarez Sattori', partido: 'LIBRE' },
      { foto: '/new/suplentes/g3/CLAUDIA CARDENAS VELASQUEZ.png', cargo: 'SENADORA SUPLENTE', nombre: 'Claudia', apellido:'Cardenas Velasquez', partido: 'LIBRE' }
    ]
  },
  5: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g3/ELIANA RINA ACOSTA QUISPE.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Eliana Rina', apellido:'Acosta Quispe', partido: 'UNIDAD' },
      { foto: '/new/suplentes/g3/SICHARD HANS SORAIDE CASTEDO.png', cargo: 'SENADOR SUPLENTE', nombre: 'Sichard Hans', apellido:'Soraide Castedo', partido: 'UNIDAD' }
    ],
    tituloLinea1: 'COMITÉ DE PLANIFICACIÓN, PRESUPUESTO, INVERSIÓN PÚBLICA Y CONTRALORÍA GENERAL DEL ESTADO',
    miembrosGrupo2: [
      { foto: '/new/titulares/g2/LEONOR ROSALVA ROMERO GUTIERREZ.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Leonor Rosalva', apellido:'Romero Gutierrez', partido: 'UNIDAD' },
      { foto: '/new/suplentes/g2/MARCO ANTONIO SEGOVIA VARGAS.png', cargo: 'SENADOR SUPLENTE', nombre: 'Marco Antonio', apellido:'Segovia Vargas', partido: 'UNIDAD' }
    ],
    tituloLinea2: 'COMITÉ DE POLÍTICAS FINANCIERA, MONETARIA, TRIBUTARIA Y SEGUROS',
    miembrosGrupo3: [
      { foto: '/new/titulares/g1/ABDON PORCEL ARANCIBIA.png', cargo: 'SECRETARIO DE COMITÉ', nombre: 'Abdon', apellido:'Porcel Arancibia', partido: 'LIBRE' },
      { foto: '/new/suplentes/g1/ILSE FATIMA DAVILA ARANCIBIA.png', cargo: 'SENADORA SUPLENTE', nombre: 'Ilse Fatima', apellido:'Davila Arancibia', partido: 'LIBRE' }
    ]
  },
  6: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g1/ANA MARIA CRISPIN CHOQUE.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Ana Maria', apellido:'Crispin Choque', partido: 'PDC' },
      { foto: '/new/suplentes/g1/VICTOR SEVERO QUISPE SANTANDER.png', cargo: 'SENADOR SUPLENTE', nombre: 'Victor Severo', apellido:'Quispe Santander', partido: 'PDC' }
    ],
    tituloLinea1: 'COMITÉ DE ENERGÍA, HIDROCARBUROS, MINERÍA Y METALURGIA',
    miembrosGrupo2: [
      { foto: '/new/titulares/g2/MARCELINO FLORES ORDOÑEZ.png', cargo: 'SECRETARIODE COMITÉ', nombre: 'Marcelino', apellido:'Flores Ordoñez', partido: 'PDC' },
      { foto: '/new/suplentes/g2/SUSANA GABRIELA RUIZ ZULETA.png', cargo: 'SENADORA SUPLENTE', nombre: 'Susana Gabriela', apellido:'Ruiz Zuleta', partido: 'PDC' }
    ],
    tituloLinea2: 'COMITÉ DE ECONOMÍA PLURAL, DESARROLLO PRODUCTIVO, OBRAS PÚBLICAS E INFRAESTRUCTURA',
    miembrosGrupo3: [
      { foto: '/new/titulares/g2/BETTY CANAVIRI VILLANUEVA.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Betty', apellido:'Canaviri Villanueva', partido: 'LIBRE' },
      { foto: '/new/suplentes/g2/ROGER MAMANI CORONADO.png', cargo: 'SENADOR SUPLENTE', nombre: 'Roger', apellido:'Mamani Coronado', partido: 'LIBRE' }
    ]
  },
  7: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g1/JOSE MANUEL ORMACHEA MENDIETA.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Jose Manuel', apellido:'Ormachea Mendieta', partido: 'LIBRE' },
      { foto: '/new/suplentes/g1/MARIA ELENA PACHACUTE TICONA.png', cargo: 'SENADORA SUPLENTE', nombre: 'Maria Elena', apellido:'Pachacute Ticona', partido: 'LIBRE' }
    ],
    tituloLinea1: 'COMITÉ DE NACIONES Y PUEBLOS INDÍGENA ORIGINARIO CAMPESINOS',
    miembrosGrupo2: [
      { foto: '/new/titulares/g2/BERTHA NURMY GUTIERREZ MENESES.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Bertha Nurmy', apellido:'Gutierrez Meneses', partido: 'PDC' },
      { foto: '/new/suplentes/g2/FREDDY RIOJA MELGAR.png', cargo: 'SENADOR SUPLENTE', nombre: 'Freddy', apellido:'Rioja Melgar', partido: 'PDC' }
    ],
    tituloLinea2: 'COMITÉ DE CULTURAS, INTERCULTURALIDAD Y PATRIMONIO CULTURAL',
    miembrosGrupo3: [
      { foto: '/new/titulares/g1/BERTHA CARTAGENA SANCHEZ.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Bertha', apellido:'Cartagena Sanchez', partido: 'PDC' },
      { foto: '/new/suplentes/g1/MANFRED LEO PEREZ HASSENTEUFEL.png', cargo: 'SENADOR SUPLENTE', nombre: 'Manfred Leo', apellido:'Perez Hassenteufel', partido: 'PDC' }
    ]
  },
  8: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g2/JOSE SANCHEZ AGUILAR.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Jose', apellido:'Sanchez Aguilar', partido: 'LIBRE' },
      { foto: '/new/suplentes/g2/CINTHYA INGA GUTIERREZ GUZMAN.png', cargo: 'SENADORA SUPLENTE', nombre: 'Cinthya Inga', apellido:'Gutierrez Guzman', partido: 'LIBRE' }
    ],
    tituloLinea1: 'COMITÉ DE EDUCACIÓN, SALUD, CIENCIA, TECNOLOGÍA Y DEPORTES',
    miembrosGrupo2: [
      { foto: '/new/titulares/g2/MARIA ANTONIETA ALCON SANCHEZ.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Maria Antonieta', apellido:'Alcon Sanchez', partido: 'PDC' },
      { foto: '/new/suplentes/g2/EDWIN LOPEZ QUIROGA.png', cargo: 'SENADOR SUPLENTE', nombre: 'Edwin', apellido:'Lopez Quiroga', partido: 'PDC' }
    ],
    tituloLinea2: 'COMITÉ DE VIVIENDA, RÉGIMEN LABORAL, SEGURIDAD INDUSTRIAL Y SEGURIDAD SOCIAL',
    miembrosGrupo3: [
      { foto: '/new/titulares/g1/CLAUDIA MALLON VARGAS.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Claudia', apellido:'Mallon Vargas', partido: 'APB SUMATE' },
      { foto: '/new/suplentes/g1/APOLINAR RIVERA MUÑOZ.png', cargo: 'SENADOR SUPLENTE', nombre: 'Apolinar', apellido:'Rivera Muñoz', partido: 'APB SUMATE' }
    ]
  },
  9: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g1/NICANOR GONZALO COCHI CONDORI.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Nicanor Gonzalo', apellido:'Cochi Condori', partido: 'PDC' },
      { foto: '/new/suplentes/g1/ROXANA MAMANI COLQUEHUANCA.png', cargo: 'SENADORA SUPLENTE', nombre: 'Roxana', apellido:'Mamani Colquehuanca', partido: 'PDC' }
    ],
    tituloLinea1: 'COMITÉ DE ASUNTOS EXTERIORES, INTERPARLAMENTARIOS Y ORGANISMOS INTERNACIONALES',
    miembrosGrupo2: [
      { foto: '/new/titulares/g2/TERESA ALARCON ARANA.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Teresa', apellido:'Alarcon Arana', partido: 'PDC' },
    ],
    tituloLinea2: 'COMITÉ DE RELACIONES ECONÓMICAS INTERNACIONALES',
    miembrosGrupo3: [
      { foto: '/new/titulares/g1/WANDA XIMENA MEDRANO HERVAS.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Wanda Ximena', apellido:'Medrano Hervas', partido: 'LIBRE' },
      { foto: '/new/suplentes/g1/ALDO SERGIO VILLEGAS MORA.png', cargo: 'SENADOR SUPLENTE', nombre: 'Aldo Sergio', apellido:'Villegas Mora', partido: 'LIBRE' }
    ]
  },
  10: {
    miembrosGrupo1: [
      { foto: '/new/titulares/g3/BRANKO GORAN MARINKOVIC JOVICEVIC.png', cargo: 'PRESIDENTE DE COMISIÓN', nombre: 'Branko Goran', apellido:'Marinkovic Jovicevic', partido: 'LIBRE' },
      { foto: '/new/suplentes/g3/KATHIA NATALIA MISERENDINO ROMERO.png', cargo: 'SENADORA SUPLENTE', nombre: 'Kathia Natalia', apellido:'Miserendino Romero', partido: 'LIBRE' }
    ],
    tituloLinea1: 'COMITÉ DE TIERRA Y TERRITORIO, RECURSOS NATURALES Y HOJA DE LA COCA',
    miembrosGrupo2: [
      { foto: '/new/titulares/g3/CAROL CARLO DURAN.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Carol', apellido:'Carlo Duran', partido: 'LIBRE' },
      { foto: '/new/suplentes/g3/JORGE ANTONIO QUISPE FLORES.png', cargo: 'SENADOR SUPLENTE', nombre: 'Jorge Antonio', apellido:'Quispe Flores', partido: 'LIBRE' }
    ],
    tituloLinea2: 'COMITÉ DE MEDIO AMBIENTE, BIODIVERSIDAD, AMAZONÍA, ÁREAS PROTEGIDAS Y CAMBIO CLIMÁTICO',
    miembrosGrupo3: [
      { foto: '/new/titulares/g3/CINTIA MONICA PUERTA CAMPOS.png', cargo: 'SECRETARIA DE COMITÉ', nombre: 'Cintia Monica', apellido:'Puerta Campos', partido: 'PDC' },
      { foto: '/new/suplentes/g3/JESUS HUMBERTO SUAREZ EGUEZ.png', cargo: 'SENADOR SUPLENTE', nombre: 'Jesus Humberto', apellido:'Suarez Eguez', partido: 'PDC' }
    ]
  }
}

const seleccionarComision = (comision) => {
  comisionSeleccionada.value = {
    ...comision,
    ...comisionesData[comision.id]
  }
}
seleccionarComision(comisionesList.value[0])

// ==================== DATOS SECCIÓN 3 ====================
const departamentoSeleccionado = ref(null)

const titularesPorDepartamento = {
  'LA PAZ': [],
  'SANTA CRUZ': [],
  'COCHABAMBA': [],
  'POTOSÍ': [],
  'CHUQUISACA': [],
  'ORURO': [],
  'TARIJA': [],
  'BENI': [],
  'PANDO': []
}

const suplentesPorDepartamento = {
  'LA PAZ': [],
  'SANTA CRUZ': [],
  'COCHABAMBA': [],
  'POTOSÍ': [],
  'CHUQUISACA': [],
  'ORURO': [],
  'TARIJA': [],
  'BENI': [],
  'PANDO': []
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

const senadoresData = [
  { tnombre: 'Cintia Monica', tapellido:'Puerta Campos', snombre: 'Jesus Humberto', sapellido:'Suarez Eguez', partido: 'pdc', departamento:'Pando', imagen:'new/titulares/g3/CINTIA MONICA PUERTA CAMPOS.png', imagensu:'new/suplentes/g3/JESUS HUMBERTO SUAREZ EGUEZ.png', pos:116 },
  { tnombre: 'Paola Limbania', tapellido:'Lopez Zeballos', snombre: 'Richard', sapellido:'Espada Ugarte', partido: 'pdc', departamento:'Santa Cruz', imagen:'new/titulares/g3/PAOLA LIMBANIA LOPEZ ZEBALLOS.png', imagensu:'new/suplentes/g3/RICHARD ESPADA UGARTE.png', pos:114 },
  { tnombre: 'Diego Esteban Mateo', tapellido:'Avila Navajas', snombre: 'Luzmaya', sapellido:'Zelaya Vega', partido: 'pdc', departamento:'Tarija', imagen:'new/titulares/g2/DIEGO ESTEBAN MATEO ÁVILA NAVAJAS.png', imagensu:'new/suplentes/g2/LUZMAYA ZELAYA VEGA.png', pos:113 },
  { tnombre: 'Maria Isabel', tapellido:'Moreno Cortez', snombre: 'Rolando Vacaflor', sapellido:'Gabriel Arana', partido: 'libre', departamento:'Tarija', imagen:'new/titulares/g2/MARIA ISABEL MORENO CORTEZ.png', imagensu:'new/suplentes/g2/ROLANDO VACAFLOR GABRIEL ARANA.png', pos:207 },
  { tnombre: 'Yasmin', tapellido:'Estivariz Villarroel', snombre: 'Ramiro', sapellido:'Mamani Ramirez', partido: 'pdc', departamento:'Oruro', imagen:'new/titulares/g2/YASMIN ESTIVARIZ VILLARROEL.png', imagensu:'new/suplentes/g2/RAMIRO MAMANI RAMIREZ.png', pos:107},
  { tnombre: 'Wilder', tapellido:'Veliz Armas', snombre: 'Lenny Mayra', sapellido:'Ayala Justiniano', partido: 'pdc', departamento:'Cochabamba', imagen:'new/titulares/g1/WILDER VELIZ ARMAS.png', imagensu:'new/suplentes/g1/LENNY MAYRA AYALA JUSTINIANO.png', pos:105 },
  { tnombre: 'Judith Rosario', tapellido:'Garcia Coca', snombre: 'Royer Ivan', sapellido:'Mamani Garcia', partido: 'pdc', departamento:'Cochabamba', imagen:'new/titulares/g1/JUDITH ROSARIO GARCIA COCA.png', imagensu:'new/suplentes/g1/ROYER IVAN MAMANI GARCIA.png', pos:106 },
  { tnombre: 'Nicanor Gonzalo', tapellido:'Cochi Condori', snombre: 'Roxana', sapellido:'Mamani Colquehuanca', partido: 'pdc', departamento:'La Paz', imagen:'new/titulares/g1/NICANOR GONZALO COCHI CONDORI.png', imagensu:'new/suplentes/g1/ROXANA MAMANI COLQUEHUANCA.png', pos:103 },
  { tnombre: 'Bertha', tapellido:'Cartagena Sanchez', snombre: 'Manfred Leo', sapellido:'Perez Hassenteufel', partido: 'pdc', departamento:'Chuquisaca', imagen:'new/titulares/g1/BERTHA CARTAGENA SANCHEZ.png', imagensu:'new/suplentes/g1/MANFRED LEO PEREZ HASSENTEUFEL.png', pos:101 },
  { tnombre: 'Bertha Nurmy', tapellido:'Gutierrez Meneses De Mamani', snombre: 'Freddy', sapellido:'Rioja Melgar', partido: 'pdc', departamento:'Potosí', imagen:'new/titulares/g2/BERTHA NURMY GUTIERREZ MENESES.png', imagensu:'new/suplentes/g2/FREDDY RIOJA MELGAR.png', pos:110 },
  { tnombre: 'Marcelino', tapellido:'Flores Ordoñez', snombre: 'Susana Gabriela', sapellido:'Ruiz Zuleta', partido: 'pdc', departamento:'Potosí', imagen:'new/titulares/g2/MARCELINO FLORES ORDOÑEZ.png', imagensu:'new/suplentes/g2/SUSANA GABRIELA RUIZ ZULETA.png', pos:111 },
  { tnombre: 'Branko Goran', tapellido:'Marinkovic Jovicevic', snombre: 'Kathia Natalia', sapellido:'Miserendino Romero', partido: 'libre', departamento:'Santa Cruz', imagen:'new/titulares/g3/BRANKO GORAN MARINKOVIC JOVICEVIC.png', imagensu:'new/suplentes/g3/KATHIA NATALIA MISERENDINO ROMERO.png', pos:208 },
  { tnombre: 'Carol', tapellido:'Carlo Duran', snombre: 'Jorge Antonio', sapellido:'Quispe Flores', partido: 'libre', departamento:'Pando', imagen:'new/titulares/g3/CAROL CARLO DURAN.png', imagensu:'new/suplentes/g3/JORGE ANTONIO QUISPE FLORES.png', pos:211 },
  { tnombre: 'Cesar', tapellido:'Mentasti Padilla', snombre: 'Marcela', sapellido:'Guerrero Vilca', partido: 'alianza', departamento:'Tarija', imagen:'new/titulares/g2/CESAR MENTASTI PADILLA.png', imagensu:'new/suplentes/g2/MARCELA GUERRERO VILCA.png', pos:302 },
  { tnombre: 'Claudia', tapellido:'Mallon Vargas', snombre: 'Apolinar', sapellido:'Rivera Muñoz', partido: 'sumate', departamento:'Cochabamba', imagen:'new/titulares/g1/CLAUDIA MALLON VARGAS.png', imagensu:'new/suplentes/g1/APOLINAR RIVERA MUÑOZ.png', pos:401 },
  { tnombre: 'Daniel Antonio', tapellido:'Ortiz Velasquez', snombre: 'Reina Isabel', sapellido:'Pallares Morales', partido: 'pdc', departamento:'Chuquisaca', imagen:'new/titulares/g1/DANIEL ANTONIO ORTIZ VELASQUEZ.png', imagensu:'new/suplentes/g1/REINA ISABEL PALLARES MORALES.png', pos:102 },
  { tnombre: 'Erick Nelson', tapellido:'Soruco Alpire', snombre: 'Cesia', sapellido:'Roca Escalante', partido: 'pdc', departamento:'Beni', imagen:'new/titulares/g3/ERICK NELSON SORUCO ALPIRE.png', imagensu:'new/suplentes/g3/CESIA ROCA ESCALANTE.png', pos:115 },
  { tnombre: 'Ernesto', tapellido:'Suarez Sattori', snombre: 'Claudia', sapellido:'Cardenas Velasquez', partido: 'libre', departamento:'Beni', imagen:'new/titulares/g3/ERNESTO SUAREZ SATTORI.png', imagensu:'new/suplentes/g3/CLAUDIA CARDENAS VELASQUEZ.png', pos:210 },
  { tnombre: 'Freddy', tapellido:'Castillo Chavez', snombre: 'Villma', sapellido:'Colque Camacho', partido: 'pdc', departamento:'Oruro', imagen:'new/titulares/g2/FREDDY CASTILLO CHAVEZ.png', imagensu:'new/suplentes/g2/VILLMA COLQUE CAMACHO.png', pos:108 },
  { tnombre: 'Jose', tapellido:'Roca Haensel', snombre: 'Mabel', sapellido:'Giordano Sonnenschein', partido: 'alianza', departamento:'Beni', imagen:'new/titulares/g3/JOSE ROCA HAENSEL.png', imagensu:'new/suplentes/g3/MABEL GIORDANO SONNENSCHEIN.png', pos:305 },
  { tnombre: 'Leonor Rosalva', tapellido:'Romero Gutierrez', snombre: 'Marco Antonio', sapellido:'Segovia Vargas', partido: 'alianza', departamento:'Tarija', imagen:'new/titulares/g2/LEONOR ROSALVA ROMERO GUTIERREZ.png', imagensu:'new/suplentes/g2/MARCO ANTONIO SEGOVIA VARGAS.png', pos:303 },
  { tnombre: 'Teresa', tapellido:'Alarcon Arana', snombre: '', sapellido:'', partido: 'pdc', departamento:'Potosí', imagen:'new/titulares/g2/TERESA ALARCON ARANA.png', imagensu:'', pos:112 },
  { tnombre: 'Tomasa', tapellido:'Yarhui Jacome', snombre: 'Hugo Marcelo', sapellido:'Cortez Calvimontes', partido: 'libre', departamento:'Chuquisaca', imagen:'new/titulares/g1/TOMASA YARHUI JACOME.png', imagensu:'new/suplentes/g1/HUGO MARCELO CORTEZ CALVIMONTES.png', pos:201 },
  { tnombre: 'Wanda Ximena', tapellido:'Medrano Hervas', snombre: 'Aldo Sergio', sapellido:'Villegas Mora', partido: 'libre', departamento:'Cochabamba', imagen:'new/titulares/g1/WANDA XIMENA MEDRANO HERVAS.png', imagensu:'new/suplentes/g1/ALDO SERGIO VILLEGAS MORA.png', pos:204 },
  { tnombre: 'Ana Maria', tapellido:'Crispin Choque', snombre: 'Victor S.', sapellido:'Quispe Santander', partido: 'pdc', departamento:'La Paz', imagen:'new/titulares/g1/ANA MARIA CRISPIN CHOQUE.png', imagensu:'new/suplentes/g1/VICTOR SEVERO QUISPE SANTANDER.png', pos:104 },
  { tnombre: 'Jose Manuel', tapellido:'Ormachea Mendienta', snombre: 'Maria Elena', sapellido:'Pachacute Ticona', partido: 'libre', departamento:'La Paz', imagen:'new/titulares/g1/JOSE MANUEL ORMACHEA MENDIETA.png', imagensu:'new/suplentes/g1/MARIA ELENA PACHACUTE TICONA.png', pos:203},
  { tnombre: 'Maria Antonieta', tapellido:'Alcon Sanchez', snombre: 'Edwin', sapellido:'Lopez Quiroga', partido: 'pdc', departamento:'Oruro', imagen:'new/titulares/g2/MARIA ANTONIETA ALCON SANCHEZ.png', imagensu:'new/suplentes/g2/EDWIN LOPEZ QUIROGA.png', pos:109 },
  { tnombre: 'Ana Karina', tapellido:'Velasco Añez', snombre: 'Marcelo Matias', sapellido:'Cardona Ibañez', partido: 'alianza', departamento:'Beni', imagen:'new/titulares/g3/ANA KARINA VELASCO ÁÑEZ.png', imagensu:'new/suplentes/g3/MARCELO MATIAS CARDONA IBAÑEZ.png', pos:306 },
  { tnombre: 'Betty', tapellido:'Canaviri Villanueva', snombre: 'Roger', sapellido:'Mamani Coronado', partido: 'libre', departamento:'Potosí', imagen:'new/titulares/g2/BETTY CANAVIRI VILLANUEVA.png', imagensu:'new/suplentes/g2/ROGER MAMANI CORONADO.png', pos:206 },
  { tnombre: 'Carmen Soledad', tapellido:'Chapeton Tancara', snombre: 'Nilton', sapellido:'Condori Alanoca', partido: 'alianza', departamento:'La Paz', imagen:'new/titulares/g1/CARMEN SOLEDAD CHAPETÓN TANCARA.png', imagensu:'new/suplentes/g1/NILTON CONDORI ALANOCA.png', pos:301 },
  { tnombre: 'Julio Diego', tapellido:'Romaña Galindo', snombre: 'Carolina', sapellido:'Giese Urresti', partido: 'libre', departamento:'Pando', imagen:'new/titulares/g3/JULIO DIEGO ROMAÑA GALINDO.png', imagensu:'new/suplentes/g3/CAROLINA GIESE URRESTI.png', pos:212 },
  { tnombre: 'Kathia Lisbeth', tapellido:'Quiroga Fernandez', snombre: 'Leonardo', sapellido:'Roca Eguez', partido: 'libre', departamento:'Santa Cruz', imagen:'new/titulares/g3/KATHIA LISBETH QUIROGA FERNÁNDEZ.png', imagensu:'new/suplentes/g3/LEONARDO ROCA EGUEZ.png', pos:209 },
  { tnombre: 'Rosa Tatiana', tapellido:'Añez Carrasco', snombre: 'Lorgio Fernando', sapellido:'Pareja Saucedo', partido: 'alianza', departamento:'Santa Cruz', imagen:'new/titulares/g3/ROSA TATIANA AÑEZ CARRASCO.png', imagensu:'new/suplentes/g3/LORGIO FERNANDO PAREJA SAUCEDO.png', pos:304 },
  { tnombre: 'Abdon', tapellido:'Porcel Arancibia', snombre: 'Ilse Fatima', sapellido:'Davila Arancibia', partido: 'libre', departamento:'Chuquisaca', imagen:'/new/titulares/g1/ABDON PORCEL ARANCIBIA.png', imagensu:'new/suplentes/g1/ILSE FATIMA DAVILA ARANCIBIA.png', pos:202},
  { tnombre: 'Jose', tapellido:'Sanchez Aguilar', snombre: 'Cinthya Inga', sapellido:'Gutierrez Guzman', partido: 'libre', departamento:'Oruro', imagen:'new/titulares/g2/JOSE SANCHEZ AGUILAR.png', imagensu:'new/suplentes/g2/CINTHYA INGA GUTIERREZ GUZMAN.png', pos:205 },
  { tnombre: 'Eliana Rina', tapellido:'Acosta Quispe', snombre: 'Sichard Hans', sapellido:'Soraide Castedo', partido: 'alianza', departamento:'Pando', imagen:'new/titulares/g3/ELIANA RINA ACOSTA QUISPE.png', imagensu:'new/suplentes/g3/SICHARD HANS SORAIDE CASTEDO.png', pos:307 },
]

const sorted = senadoresData.sort((a, b) => a.pos - b.pos);
for (let i = 0; i < sorted.length; i++) {
  const item = sorted[i];
  const depto = item.departamento.toUpperCase();
  titularesPorDepartamento[depto].push({ 
    nombre: item.tnombre, 
    partido: item.partido, 
    imagen: item.imagen,
    apellido: item.tapellido 
  });
  suplentesPorDepartamento[depto].push({ 
    nombre: item.snombre, 
    partido: item.partido, 
    imagen: item.imagensu,
    apellido: item.sapellido 
  });
}

const miembrosPorPartido = {
  pdc: { titulares: [], suplentes: [] },
  libre: { titulares: [], suplentes: [] },
  alianza: { titulares: [], suplentes: [] },
  sumate: { titulares: [], suplentes: [] }
}

const partidoMap = {
  pdc: miembrosPorPartido.pdc,
  libre: miembrosPorPartido.libre,
  alianza: miembrosPorPartido.alianza,
  sumate: miembrosPorPartido.sumate
};

for (let i = 0; i < senadoresData.length; i++) {
  const s = senadoresData[i];
  const target = partidoMap[s.partido];
  if (target) {
    target.titulares.push({
      nombre: s.tnombre,
      apellido: s.tapellido,
      partido: s.partido,
      departamento: s.departamento,
      imagen: s.imagen
    });
    if (s.snombre) {
      target.suplentes.push({
        nombre: s.snombre,
        apellido: s.sapellido,
        partido: s.partido,
        departamento: s.departamento,
        imagen: s.imagensu
      });
    }
  }
}

const miembrosMostrar = computed(() => {
  if (!partidoSeleccionado.value) return []
  const data = miembrosPorPartido[partidoSeleccionado.value.id]
  return mostrarSuplentes.value ? data.suplentes : data.titulares
})

const seleccionarPartido = (partido) => {
  partidoSeleccionado.value = partido
  mostrarSuplentes.value = false
}

const toggleTipoMiembros = () => {
  mostrarSuplentes.value = !mostrarSuplentes.value
}

// ==================== SCROLL OBSERVER ====================
const sections = {
  'directiva-camaral': seccion1Ref,
  'comisiones-y-comites': seccion2Ref,
  'brigadas-parlamentarias': seccion3Ref,
  'bancadas-politicas': seccion4Ref
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

// ==================== PRECARGA INTELIGENTE (SOLO CLIENTE) ====================
let scrollTimer = null
let scrollHandler = null

const precargarImagenesCriticas = () => {
  const imagenesCriticas = [
    '/senadores/g1/DIEGO ESTEBAN MATEO ÁVILA NAVAJAS.png',
    '/senadores/g2/CARMEN SOLEDAD CHAPETON TANCARA.png',
    '/senadores/g3/KHATIA LISBETH QUIROGA FERNÁNDEZ.png',
    '/senadores/g1/YASMIN ESTIVARIZ VILLARROEL.png',
    '/senadores/g4/JULIO DIEGO ROMAÑA GALINDO.png',
    '/senadores/g2/ROSA TATIANA AÑEZ CARRASCO.png'
  ]
  
  imagenesCriticas.forEach(src => {
    const img = new Image()
    img.src = src
  })
}

const setupPreloadOnScroll = () => {
  scrollHandler = () => {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      const scrollY = window.scrollY
      const windowH = window.innerHeight
      
      if (seccion2Ref.value && scrollY + windowH + 300 >= seccion2Ref.value.offsetTop) {
        const imagenesSeccion2 = [
          '/new/titulares/g1/DANIEL ANTONIO ORTIZ VELASQUEZ.png',
          '/new/titulares/g2/FREDDY CASTILLO CHAVEZ.png',
          '/new/titulares/g3/ERICK NELSON SORUCO ALPIRE.png',
          '/new/titulares/g1/JUDITH ROSARIO GARCIA COCA.png'
        ]
        imagenesSeccion2.forEach(src => {
          const img = new Image()
          img.src = src
        })
      }
      
      if (seccion3Ref.value && scrollY + windowH + 300 >= seccion3Ref.value.offsetTop) {
        const imagenesSeccion3 = [
          '/new/titulares/g1/ANA MARIA CRISPIN CHOQUE.png',
          '/new/titulares/g2/CARMEN SOLEDAD CHAPETÓN TANCARA.png',
          '/new/titulares/g3/KATHIA LISBETH QUIROGA FERNÁNDEZ.png'
        ]
        imagenesSeccion3.forEach(src => {
          const img = new Image()
          img.src = src
        })
      }
    }, 500)
  }
  
  window.addEventListener('scroll', scrollHandler)
}

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
  
  // Precarga solo en cliente (después de que el DOM esté listo)
  if (process.client) {
    // Pequeño delay para no bloquear la carga inicial
    setTimeout(() => {
      precargarImagenesCriticas()
      setupPreloadOnScroll()
    }, 500)
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
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
    clearTimeout(scrollTimer)
  }
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
  background-image: url('/legisladores nacionales/fondo directiva.jpg');
}

.seccion3-fondo {
  background-image: url('/legisladores nacionales/fondo departamentos.jpg');
}

.seccion4-fondo {
  background-image: url('/legisladores nacionales/fondo partidos.jpg');
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

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.6s ease-in;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@keyframes slide-right {
  0% { width: 0%; left: 0; }
  50% { width: 100%; left: 0; }
  100% { width: 0%; left: 100%; }
}

@keyframes slide-left {
  0% { width: 0%; right: 0; }
  50% { width: 100%; right: 0; }
  100% { width: 0%; right: 100%; }
}

@keyframes slide-down {
  0% { height: 0%; top: 0; }
  50% { height: 100%; top: 0; }
  100% { height: 0%; top: 100%; }
}

@keyframes slide-up {
  0% { height: 0%; bottom: 0; }
  50% { height: 100%; bottom: 0; }
  100% { height: 0%; bottom: 100%; }
}

.animate-slide-right {
  animation: slide-right 4s ease-in-out infinite;
}

.animate-slide-left {
  animation: slide-left 4s ease-in-out infinite;
}

.animate-slide-down {
  animation: slide-down 4s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 4s ease-in-out infinite;
}
/* Oculta el título del SVG */
svg title {
  display: none;
}

/* O también puedes hacer: */
.group svg title {
  display: none;
}
</style>