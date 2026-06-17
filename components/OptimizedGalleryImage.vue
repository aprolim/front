<template>
  <AppImage
    :src="src"
    :alt="alt || caption || 'Imagen'"
    :fallback-src="fallbackSrc"
    image-class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    :aspect-ratio="aspectRatio"
    :show-skeleton="true"
    :max-retries="3"
  />
</template>

<script setup lang="ts">
import AppImage from './AppImage.vue'

defineProps<{
  src: string
  alt?: string
  caption?: string
  fallbackSrc?: string
  aspectRatio?: string
}>()
</script>