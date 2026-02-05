<!-- components/UI/ScrollProgress.vue -->
<template>
  <div 
    class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-opacity duration-500"
    :class="{ 'opacity-100': scrolled, 'opacity-0': !scrolled }"
  >
    <div 
      class="h-full bg-gradient-to-r from-[#D52B1E] via-[#F9E076] to-[#007934] transition-all duration-300"
      :style="{ width: scrollProgress + '%' }"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  scrolled: Boolean,
  scrollProgress: Number
})
</script>