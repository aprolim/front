<!-- components/News/NewsGrid.vue -->
<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16" ref="gridRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const gridRef = ref(null)

defineExpose({
  gridRef
})
</script>