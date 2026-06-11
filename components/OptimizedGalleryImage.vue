<template>
  <div class="relative overflow-hidden rounded-xl shadow-lg bg-gray-200 group cursor-pointer" style="aspect-ratio: 4/3">
    <!-- NuxtImage con optimización automática -->
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :quality="quality"
      format="webp"
      loading="lazy"
      decoding="async"
      :modifiers="modifiers"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      @error="handleError"
    />
    
    <!-- Fondo rojo transparente con texto -->
    <div class="absolute bottom-0 left-0 right-0 bg-[#E03636]/80 backdrop-blur-sm py-2 px-2">
      <p class="text-white text-xs md:text-sm font-medium line-clamp-2 text-center">
        {{ caption }}
      </p>
    </div>

    <!-- Borde al hover -->
    <div class="absolute inset-0 border-2 border-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    <div class="absolute inset-[3px] border border-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  width: { type: Number, default: 400 },
  height: { type: Number, default: 300 },
  quality: { type: Number, default: 75 }
})

// Modificadores para NuxtImage
const modifiers = computed(() => ({
  width: props.width,
  height: props.height,
  quality: props.quality,
  format: 'webp',
  fit: 'cover'
}))

const handleError = (event) => {
  console.warn(`Error cargando imagen: ${props.src}`)
  // Fallback a imagen por defecto
  event.target.src = '/images/placeholder.jpg'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>