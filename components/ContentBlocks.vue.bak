<!-- components/ContentBlocks.vue -->
<template>
  <div class="content-blocks">
    <div 
      v-for="(block, index) in blocks" 
      :key="index"
      class="block-item"
      :class="`block-${block.type}`"
    >
      <!-- Párrafo normal -->
      <div v-if="block.type === 'paragraph'" class="prose prose-lg max-w-none text-gray-700">
        <p>{{ block.content }}</p>
      </div>

      <!-- Cita -->
      <div v-else-if="block.type === 'quote'" class="quote-block my-8 p-6 bg-gray-50 border-l-4 border-[#E03636] rounded-r-lg">
        <svg class="w-8 h-8 text-[#E03636] mb-3 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
        <p class="text-xl italic text-gray-700 leading-relaxed">{{ block.content }}</p>
        <p v-if="block.author" class="text-sm font-semibold text-[#E03636] mt-3">— {{ block.author }}</p>
      </div>

      <!-- Imagen -->
      <div v-else-if="block.type === 'image'" class="image-block my-8">
        <div class="relative rounded-xl overflow-hidden shadow-lg">
          <img 
            :src="block.url" 
            :alt="block.alt || 'Imagen'"
            class="w-full h-auto"
            loading="lazy"
          />
        </div>
        <p v-if="block.caption" class="text-sm text-gray-500 text-center mt-2">{{ block.caption }}</p>
      </div>

      <!-- Video -->
      <div v-else-if="block.type === 'video'" class="video-block my-8">
        <div class="relative aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe 
            :src="block.url" 
            :title="block.title || 'Video'"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <p v-if="block.caption" class="text-sm text-gray-500 text-center mt-2">{{ block.caption }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  blocks: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>

<style scoped>
.quote-block {
  transition: all 0.3s ease;
}

.quote-block:hover {
  background-color: #fef2f2;
}

.video-block iframe,
.image-block img {
  transition: transform 0.3s ease;
}

.video-block:hover iframe,
.image-block:hover img {
  transform: scale(1.01);
}

/* Animación de entrada para cada bloque */
.block-item {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.block-item:nth-child(1) { animation-delay: 0.05s; }
.block-item:nth-child(2) { animation-delay: 0.1s; }
.block-item:nth-child(3) { animation-delay: 0.15s; }
.block-item:nth-child(4) { animation-delay: 0.2s; }
.block-item:nth-child(5) { animation-delay: 0.25s; }
.block-item:nth-child(6) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>