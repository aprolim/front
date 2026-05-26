<!-- components/LegislativeGazette.vue - Versión simplificada sin modal interno -->
<template>
  <div class="w-full min-h-screen flex flex-col bg-gray-50">
    <div class="relative overflow-hidden mt-[4.2vw]">
      <h2 class="font-bold text-white leading-tight
                text-[11px] xs:text-[14px] sm:text-[18px] md:text-[22px] 
                lg:text-[26px] xl:text-[30px] 2xl:text-[39px] 
                3xl:text-[58px] 4xl:text-[80px] 5xl:text-[102px] text-center
                p-1 bg-[#E03636] shadow-2xl">
        Gaceta Legislativa 
      </h2>
    </div>

    <div class="flex-1 mx-auto px-4 flex items-center">
      <div class="grid grid-cols-1 gap-8 mx-auto w-full max-w-4xl">
        <div class="flex flex-col h-full group px-[6vw]">
          <div class="relative w-full h-[26vw] overflow-hidden shadow-xl mb-6 bg-white p-[0.6em] rounded-lg">
            <img 
              src="/images/gaceta-historica.jpg" 
              alt="Gaceta Histórica" 
              class="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 cursor-pointer rounded"
              @click="abrirUltimoTomoRedactor"
            />
          </div>
          
          <div class="flex justify-center">
            <button 
              @click="abrirModalRedactor"
              class="bg-[#E03636] hover:bg-[#C12F2F] text-white font-bold py-[.4em] px-[0.8em] rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Ver todos los tomos
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()

const { 
  tomos, 
  tomosFaltantes, 
  obtenerAñosUnicos, 
  obtenerTomosPorAño, 
  obtenerUltimoTomo 
} = useRedactorTomos()

const abrirModalRedactor = () => {
  modalStore.openModal('redactor', {
    tomos,
    tomosFaltantes,
    obtenerTomosPorAño,
    obtenerUltimoTomo,
    añosDisponibles: obtenerAñosUnicos()
  })
}

const abrirUltimoTomoRedactor = () => {
  const ultimoTomo = obtenerUltimoTomo()
  if (ultimoTomo && ultimoTomo.pdfUrl) {
    window.open(ultimoTomo.pdfUrl, '_blank')
  } else {
    alert('No hay tomos disponibles para visualizar')
  }
}
</script>