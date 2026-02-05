<!-- components/HeroSection/PatrioticSeal.vue -->
<template>
  <div 
    v-if="scrolled"
    class="absolute inset-0 flex items-center justify-center transition-all duration-700 z-20 opacity-20"
  >
    <div class="relative w-64 h-64 md:w-80 md:h-80">
      <!-- Banda tricolor animada -->
      <!-- <div class="absolute inset-0 flex flex-col rounded-full overflow-hidden shadow-2xl">
        <div class="flex-1 bg-[#D52B1E] animate-color-pulse-red"></div>
        <div class="flex-1 bg-[#F9E076] animate-color-pulse-yellow"></div>
        <div class="flex-1 bg-[#007934] animate-color-pulse-green"></div>
      </div> -->
      <!-- Escudo central -->
      <!-- <div class="absolute inset-8 bg-white rounded-full flex items-center justify-center shadow-inner">
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-[#8B1A1A]">SN</div>
          <div class="text-xs md:text-sm font-semibold text-gray-700 mt-1">SENADO NACIONAL</div>
        </div>
      </div> -->
        <div class="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full shadow-2xl">
          <img 
              src="/senadores.svg" 
              alt="Escudo Senado Nacional" 
              class="w-full h-full object-cover"
          />
        </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  scrolled: Boolean
})
</script>

<style scoped>
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
</style>