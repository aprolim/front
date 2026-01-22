<!-- components/ServiceCard.vue -->
<template>
  <NuxtLink :to="link" class="block group">
    <div class="bg-white rounded-xl shadow-lg p-8 h-full transition-all hover:shadow-2xl hover:-translate-y-1">
      <div class="w-16 h-16 rounded-lg flex items-center justify-center mb-6" :class="iconColor">
        <i :class="`pi ${icon} text-2xl text-white`"></i>
      </div>
      <h3 class="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600">{{ title }}</h3>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      <div class="flex items-center text-blue-600 font-medium">
        <span>Ver más</span>
        <i class="pi pi-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  icon: String,
  link: String,
  color: {
    type: String,
    default: 'blue'
  }
})

const colorMap = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  orange: 'bg-orange-600'
}

const iconColor = computed(() => colorMap[props.color])
</script>