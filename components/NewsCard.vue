<!-- components/NewsCard.vue -->
<template>
  <div class="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
    <div class="h-48 bg-gray-300 overflow-hidden">
      <img 
        :src="news.image" 
        :alt="news.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          {{ news.category }}
        </span>
        <span class="text-gray-500 text-sm">{{ formatDate(news.date) }}</span>
      </div>
      <h3 class="text-lg font-bold mb-3 text-gray-900 group-hover:text-blue-600 line-clamp-2">
        {{ news.title }}
      </h3>
      <p class="text-gray-600 mb-4 line-clamp-3">{{ news.excerpt }}</p>
      <button class="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2">
        Leer más <i class="pi pi-arrow-right text-sm"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const props = defineProps({
  news: Object
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return format(date, 'dd MMMM yyyy', { locale: es })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>