<!-- components/HeroSection/HeroCarousel.vue -->
<template>
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
        v-for="(media, index) in filteredHeroMedia" 
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
    <PatrioticSeal :scrolled="scrolled" />
  </div>
</template>

<script setup>
import PatrioticSeal from './PatrioticSeal.vue'

const props = defineProps({
  scrolled: Boolean,
  currentMediaIndex: Number,
  filteredHeroMedia: Array
})
</script>