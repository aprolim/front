<template>
  <div class="relative z-10 mx-auto min-h-screen flex flex-col w-full text-[1.47vw]">
    <!-- Espaciador superior -->
    <div class="h-[4.4vw]"></div>
    
    <!-- Título -->
    <h2 class="font-bold text-white leading-tight text-center bg-[#575756]
              text-[1.37em]
              p-1">
      Directiva Camaral
      <small class="font-normal block text-[.39em] mt-0 leading-none text-[#ccc]">
        Selecciona un senador para ver detalles
      </small>
    </h2>

    <!-- Tres columnas -->
    <div class="mx-auto px-[2.45vw] flex-1 text-[1.57vw] w-full flex items-center">
      <div class="flex justify-center gap-[1.22em] w-full">
        
        <!-- COLUMNA IZQUIERDA -->
        <div class="w-[30%] bg-transparent rounded-2xl shadow-xl border border-white/20 p-[1.22em] origin-right text-[#000] flex items-center">
          <div class="flex flex-col text-[.68em] text-justify w-full">
            <p class="text-center text-[1.17em] text-[#A54A4A]">Rol Institucional de la Directiva</p>
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

        <!-- COLUMNA CENTRAL -->
        <div class="w-[40%] bg-[#8A1B19]/80 rounded-2xl shadow-2xl border border-white/20 p-[.49em] flex items-center">
          <div class="grid grid-cols-2 gap-y-4 w-full">
            <div 
              v-for="(senador, index) in senadores" 
              :key="index"
              @click="selectedSenador = senador"
              class="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105 py-2"
              :class="{ 'rounded-[.44em] scale-105 border border-[#fff] bg-[#A54A4A]/20': selectedSenador?.nombre === senador.nombre }"
              >
              <div class="w-[4.9em] h-[4.9em] rounded-full overflow-hidden border-[.19em] border-[#E4D294] shadow-lg">
                <SafeImage 
                  :src="senador.foto" 
                  :alt="senador.nombre"
                  image-class="w-full h-full object-cover"
                  :max-retries="8"
                  :persistent="true"
                  loading-strategy="eager"
                />
              </div>
              <p class="text-white text-[0.68em] text-center font-medium mt-1">{{ senador.cargo }}</p>
            </div>
          </div>
        </div>

        <!-- COLUMNA DERECHA -->
        <div class="w-[30%] bg-transparent rounded-2xl shadow-xl border border-white/20 p-4 origin-left text-[#000] text-[1.37vw] flex items-center">
          <div v-if="selectedSenador" class="w-full flex flex-col items-center justify-center">
            <div class="w-[11.7em] h-[11.7em] rounded-full overflow-hidden border-[.24em] border-[#E4D294] shadow-2xl mb-[.49em]">
              <SafeImage 
                :src="selectedSenador.foto" 
                :alt="selectedSenador.nombre"
                image-class="w-full h-full object-cover"
                :max-retries="8"
                :persistent="true"
                loading-strategy="eager"
              />
            </div>
            <p class="text-[#A54A4A] text-center mt-2 font-extrabold uppercase">{{ selectedSenador.cargo }}</p>
            <h3 class="text-[#A54A4A] font-light text-[.88em] text-center">{{ selectedSenador.nombre }}</h3>
            <p class="text-justify mt-4 text-[.68em]">{{ selectedSenador.funcion }}</p>
          </div>
          <div v-else class="w-full flex items-center justify-center">
            <p class="text-center">Selecciona un senador para ver sus detalles</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SafeImage from '@/components/SafeImage.vue'

const senadores = ref([
  {
    nombre: 'Diego Esteban Mateo Ávila Navajas',
    cargo: 'Presidente',
    funcion: 'El Presidente representa a la Cámara y dirige sus sesiones, garantizando el orden y el cumplimiento del reglamento. Aprueba la agenda legislativa, remite asuntos a comisiones y firma leyes sancionadas. Además, supervisa la administración, dirige el presupuesto anual y puede presidir la Asamblea Legislativa ante ausencia del Vicepresidente del Estado.',
    foto: '/new/titulares/g2/DIEGO ESTEBAN MATEO ÁVILA NAVAJAS.png'
  },
  {
    nombre: 'Yasmin Estivariz Villarroel',
    cargo: 'Primera Secretaría',
    funcion: 'La Primera Secretaria es responsable de la lectura del Orden del Día, correspondencia y documentos durante el debate. Comprueba el quórum, registra votaciones y firma obligatoriamente las leyes y resoluciones. Además, vigila los procedimientos legislativos, registra la asistencia para fines remunerativos y convoca a senadores suplentes cuando corresponde.',
    foto: '/new/titulares/g2/YASMIN ESTIVARIZ VILLARROEL.png'
  },
  {
    nombre: 'Carmen Soledad Chapeton Tancara',
    cargo: 'Primera Vicepresidencia',
    funcion: 'La Primera Vicepresidente reemplaza al Presidente ante ausencias temporales y coordina las relaciones institucionales con otros órganos del Estado y organismos internacionales. Además, apoya a la Presidencia en la vinculación con bancadas, brigadas departamentales y la sociedad civil, ejerciendo también tuición sobre los medios de comunicación de la Cámara.',
    foto: '/new/titulares/g1/CARMEN SOLEDAD CHAPETÓN TANCARA.png'
  },
  {
    nombre: 'Julio Diego Romaña Galindo',
    cargo: 'Segunda Secretaría',
    funcion: 'El Segundo Secretario supervisa la redacción de actas y dirige las publicaciones oficiales de la Cámara. Sus funciones incluyen el seguimiento a las Peticiones de Informe hacia los órganos Ejecutivo, Judicial y Electoral para garantizar el cumplimiento de plazos, además de refrendar leyes, resoluciones y declaraciones aprobadas.',
    foto: '/new/titulares/g3/JULIO DIEGO ROMAÑA GALINDO.png'
  },
  {
    nombre: 'Khatia Lisbeth Quiroga Fernández',
    cargo: 'Segunda Vicepresidencia',
    funcion: 'La Segunda Vicepresidente reemplaza al Presidente o al Primer Vicepresidente ante ausencias o impedimentos. Sus funciones incluyen promover la modernización legislativa e institucional, además de apoyar a la Primera Vicepresidencia en el seguimiento de relaciones con organismos interparlamentarios y en la vinculación de la Cámara con la sociedad civil.',
    foto: '/new/titulares/g3/KATHIA LISBETH QUIROGA FERNÁNDEZ.png'
  },
  {
    nombre: 'Rosa Tatiana Añez Carrasco',
    cargo: 'Tercera Secretaría',
    funcion: 'La Tercera Secretaria vigila y evalúa los sistemas de apoyo técnico y administrativo, informando periódicamente a la Directiva. Apoya a la Presidencia en la elaboración del presupuesto anual y controla su ejecución. Además, coordina las relaciones con medios de comunicación, la seguridad de la Cámara y la Unidad de Ceremonial Legislativo.',
    foto: '/new/titulares/g3/ROSA TATIANA AÑEZ CARRASCO.png'
  }
])

const selectedSenador = ref(senadores.value[0])
</script>

<style scoped>
.border-3 {
  border-width: 3px;
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>