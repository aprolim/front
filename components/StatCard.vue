<!-- components/StatCard.vue - CORREGIDO -->
<template>
  <div class="text-center p-6 rounded-xl transition-transform hover:scale-105" :class="cardColor">
    <div class="text-5xl font-bold mb-4" :class="textColor">{{ number }}</div>
    <div class="flex justify-center mb-4">
      <i :class="`pi ${icon} text-3xl ${textColor}`"></i>
    </div>
    <p class="text-sm font-medium" :class="textColor + ' opacity-90'">{{ label }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  number: String,
  label: String,
  icon: String,
  color: {
    type: String,
    default: 'blue'
  }
})

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700'
  },
  green: {
    bg: 'bg-green-50', 
    text: 'text-green-700'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700'
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-700'
  }
}

const cardColor = computed(() => colorMap[props.color].bg)
const textColor = computed(() => colorMap[props.color].text)
</script>