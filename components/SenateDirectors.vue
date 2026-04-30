<template>
  <div class="relative z-10 mx-auto min-h-screen flex flex-col w-full text-[1.5vw]">
    <!-- Espaciador superior -->
    <div class="h-[4.4vw]"></div>
    
    <!-- Título -->
    <h2 class="font-bold text-white leading-tight text-center bg-[#575756]
              text-[1.4em]
              p-1">
      Directiva Camaral
      <small class="font-normal block text-[.4em] mt-0 leading-none text-[#ccc]">
        Selecciona un senador para ver detalles
      </small>
    </h2>

    <!-- Tres columnas -->
    <div class="mx-auto px-[2.5vw] mt-[2vw] flex-1 text-[1.60vw]">
      <div class="flex justify-center items-stretch gap-[1.25em] h-full">
        
        <!-- COLUMNA IZQUIERDA (transparente, 5% más pequeña) -->
        <div class="w-[30%] bg-transparent rounded-2xl shadow-xl border border-white/20 p-[1.25em] origin-right text-[#000]">
          <div class="h-full flex flex-col text-[.7em] text-justify">
            <p class="text-center text-[1.2em] text-[#E03636]">Rol Institucional de la Directiva</p>
            <br>
            <div class="font-extralight">
              La Directiva de la Cámara de Senadores de Bolivia es el órgano colegiado responsable de la conducción política del ente legislativo. Conformada por una presidencia, dos vicepresidencias y tres secretarías, su estructura garantiza la pluralidad al integrar tanto al bloque de mayoría como al de minoría.
            </div>
            <br>
            <div>
                Sus funciones institucionales son determinantes: coordina las relaciones con otros órganos del Estado, elabora la agenda semanal y fija el calendario de actividades. Además, tiene la potestad de supervisar el sistema administrativo y dictar resoluciones de cumplimiento obligatorio para las comisiones, asegurando siempre el respeto a las normas constitucionales.
            </div>
          </div>
        </div>

        <!-- COLUMNA CENTRAL (rojo transparente) -->
        <div class="w-[40%] bg-[#E03636]/80 rounded-2xl shadow-2xl border border-white/20 p-[.5em] scale-105">
          <!-- Grid de 2 columnas con 6 fotos -->
          <div class="grid grid-cols-2 h-full content-center">
            <div 
              v-for="(senador, index) in senadores" 
              :key="index"
              @click="selectedSenador = senador"
              class="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105 pt-[.25em]"
              :class="{ 'rounded-[.45em] scale-105 m-[.8em] border border-[#E4D294]': selectedSenador?.nombre === senador.nombre }"
              >
              <!-- :class="{ 'ring-4 ring-yellow-600/50 rounded-lg scale-105': selectedSenador?.nombre === senador.nombre }" -->
              <!-- Foto circular con borde dorado opaco -->
              <div class="w-[5em] h-[5em] rounded-full overflow-hidden border-[.20em] border-[#E4D294] shadow-lg mb-[.1em]">
                <img 
                  :src="senador.foto" 
                  :alt="senador.nombre"
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Texto blanco (cargo) -->
              <p class="text-white text-[0.7em] text-center font-medium " >{{ senador.cargo }}</p>
            </div>
          </div>
        </div>

        <!-- COLUMNA DERECHA (transparente, 5% más pequeña) -->
        <div class="w-[30%] bg-transparent rounded-2xl shadow-xl border border-white/20 p-4 origin-left text-[#000] text-[1.4vw]">
          <div v-if="selectedSenador" class="h-full flex flex-col items-center justify-center">
            <!-- Foto del senador seleccionado -->
            <div class="w-[12em] h-[12em] rounded-full overflow-hidden border-[.25em] border-[#E4D294] shadow-2xl mb-[.50em]">
              <img 
                :src="selectedSenador.foto" 
                :alt="selectedSenador.nombre"
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Cargo en negro -->
            <p class="text-[#E03636] text-center mt-2 font-extrabold uppercase ">{{ selectedSenador.cargo }}</p>
            <!-- Nombre en rojo -->
            <h3 class="text-[#E03636] font-light text-[.9em] text-center">{{ selectedSenador.nombre }}</h3>
            <!-- Función específica en texto blanco -->
            <p class="text-justify mt-4 text-[.7em]">{{ selectedSenador.funcion }}</p>
          </div>
          <div v-else class="h-full flex items-center justify-center">
            <p class="text-center">Selecciona un senador para ver sus detalles</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const senadores = ref([
  {
    nombre: 'Diego Esteban Mateo Ávila Navajas',
    cargo: 'Presidente',
    funcion: 'El Presidente representa a la Cámara y dirige sus sesiones, garantizando el orden y el cumplimiento del reglamento. Aprueba la agenda legislativa, remite asuntos a comisiones y firma leyes sancionadas. Además, supervisa la administración, dirige el presupuesto anual y puede presidir la Asamblea Legislativa ante ausencia del Vicepresidente del Estado.',
    foto: '/senadores/g1/DIEGO ESTEBAN MATEO ÁVILA NAVAJAS.png'
  },
  {
    nombre: 'Yasmin Estivariz Villarroel',
    cargo: 'Primera Secretaría',
    funcion: 'La Primera Secretaria es responsable de la lectura del Orden del Día, correspondencia y documentos durante el debate. Comprueba el quórum, registra votaciones y firma obligatoriamente las leyes y resoluciones. Además, vigila los procedimientos legislativos, registra la asistencia para fines remunerativos y convoca a senadores suplentes cuando corresponde.',
    foto: '/senadores/g1/YASMIN ESTIVARIZ VILLARROEL.png'
  },
  {
    nombre: 'Carmen Soledad Chapeton Tancara',
    cargo: 'Primera Vicepresidencia',
    funcion: 'La Primera Vicepresidente reemplaza al Presidente ante ausencias temporales y coordina las relaciones institucionales con otros órganos del Estado y organismos internacionales. Además, apoya a la Presidencia en la vinculación con bancadas, brigadas departamentales y la sociedad civil, ejerciendo también tuición sobre los medios de comunicación de la Cámara.',
    foto: '/senadores/g2/CARMEN SOLEDAD CHAPETON TANCARA.png'
  },
  {
    nombre: 'Julio Diego Romaña Galindo',
    cargo: 'Segunda Secretaría',
    funcion: 'El Segundo Secretario supervisa la redacción de actas y dirige las publicaciones oficiales de la Cámara. Sus funciones incluyen el seguimiento a las Peticiones de Informe hacia los órganos Ejecutivo, Judicial y Electoral para garantizar el cumplimiento de plazos, además de refrendar leyes, resoluciones y declaraciones aprobadas.',
    foto: '/senadores/g4/JULIO DIEGO ROMAÑA GALINDO.png'
  },
  {
    nombre: 'Khatia Lisbeth Quiroga Fernández',
    cargo: 'Segunda Vicepresidencia',
    funcion: 'La Segunda Vicepresidente reemplaza al Presidente o al Primer Vicepresidente ante ausencias o impedimentos. Sus funciones incluyen promover la modernización legislativa e institucional, además de apoyar a la Primera Vicepresidencia en el seguimiento de relaciones con organismos interparlamentarios y en la vinculación de la Cámara con la sociedad civil.',
    foto: '/senadores/g3/KHATIA LISBETH QUIROGA FERNÁNDEZ.png'
  },
  {
    nombre: 'Rosa Tatiana añez Carrasco',
    cargo: 'Tercera Secretaría',
    funcion: 'La Tercera Secretaria vigila y evalúa los sistemas de apoyo técnico y administrativo, informando periódicamente a la Directiva. Apoya a la Presidencia en la elaboración del presupuesto anual y controla su ejecución. Además, coordina las relaciones con medios de comunicación, la seguridad de la Cámara y la Unidad de Ceremonial Legislativo.',
    foto: '/senadores/g2/ROSA TATIANA AÑEZ CARRASCO.png'
  }
])

const selectedSenador = ref(null)
selectedSenador.value=senadores.value[0]
</script>

<style scoped>
/* Eliminar backdrop-blur-sm ya que los fondos son transparentes */
.border-3 {
  border-width: 3px;
}

/* Animación suave al seleccionar */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Asegurar que las columnas tengan la misma altura */
.items-stretch {
  align-items: stretch;
}

/* Para que el anillo se vea bien cuando está seleccionado */
.ring-4 {
  ring-width: 4px;
}
</style>