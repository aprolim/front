<!-- pages/noticias/[slug].vue -->
<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4 max-w-5xl">
      
      <button 
        @click="volverAtras"
        class="inline-flex items-center gap-2 text-[#E03636] hover:text-[#C12F2F] transition-colors mb-6 group"
      >
        <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Volver
      </button>

      <!-- Estado de carga -->
      <div v-if="cargando" class="flex justify-center items-center py-20">
        <div class="inline-block w-12 h-12 border-4 border-[#E03636] border-t-transparent rounded-full animate-spin"></div>
        <p class="ml-3 text-gray-500">Cargando noticia...</p>
      </div>

      <!-- Estado de error -->
      <div v-else-if="errorMsg" class="text-center py-12 bg-white rounded-xl">
        <p class="text-red-600 mb-4">{{ errorMsg }}</p>
        <button @click="recargar" class="bg-[#E03636] text-white px-4 py-2 rounded-lg hover:bg-[#C12F2F] transition">Reintentar</button>
      </div>

      <!-- Noticia encontrada -->
      <article v-else-if="noticiaData" class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="relative h-[400px] md:h-[500px] overflow-hidden">
          <img 
            :src="noticiaData.featuredImage?.url || noticiaData.imagen" 
            :alt="noticiaData.titulo"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-8">
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-[#E03636] text-white text-sm px-3 py-1 rounded-full">{{ noticiaData.categoria || 'Noticia' }}</span>
              <span v-if="noticiaData.importante" class="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full font-semibold">★ Importante</span>
            </div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{{ noticiaData.titulo }}</h1>
          </div>
        </div>

        <div class="p-6 md:p-8">
          <div class="flex items-center justify-between pb-6 mb-6 border-b">
            <p class="text-gray-500">{{ formatearFecha(noticiaData.publishedAt || noticiaData.fecha) }}</p>
            <button 
              @click="compartir"
              class="flex items-center gap-2 text-gray-500 hover:text-[#E03636] transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.05 4.11c-.05.23-.09.46-.09.7 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              Compartir
            </button>
          </div>
          
          <div class="prose prose-lg max-w-none text-gray-700" v-html="noticiaData.content || noticiaData.contenidoCompleto"></div>
        </div>
      </article>

      <!-- Noticia no encontrada -->
      <div v-else-if="!cargando && !errorMsg && noticiaData === null" class="text-center py-12 bg-white rounded-xl">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Noticia no encontrada</h1>
        <p class="text-gray-500 mb-6">Lo sentimos, la noticia que buscas no existe o ha sido removida.</p>
        <button @click="volverAtras" class="inline-block bg-[#E03636] text-white px-6 py-3 rounded-lg hover:bg-[#C12F2F] transition">Volver atrás</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Estados locales
const noticiaData = ref(null)
const cargando = ref(true)
const errorMsg = ref(null)

// Formatear fecha
const formatearFecha = (fecha) => {
  if (!fecha) return ''
  return new Date(fecha).toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
}

// Volver atrás
const volverAtras = () => {
  router.back()
}

// Compartir
const compartir = () => {
  if (noticiaData.value) {
    if (navigator.share) {
      navigator.share({
        title: noticiaData.value.titulo,
        text: noticiaData.value.excerpt || noticiaData.value.descripcion,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('¡Enlace copiado al portapapeles!')
    }
  }
}

// Recargar
const recargar = async () => {
  await cargarNoticia()
}

// Cargar noticia desde el backend
const cargarNoticia = async () => {
  cargando.value = true
  errorMsg.value = null
  
  try {
    const slug = route.params.slug
    console.log('🔍 Cargando noticia con slug:', slug)
    
    const response = await fetch(`http://demoback.senado.gob.bo/api/content/slug/${slug}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('📡 Respuesta:', data)
    
    if (data.success && data.data) {
      noticiaData.value = data.data
      console.log('✅ Noticia cargada:', noticiaData.value.titulo)
    } else {
      throw new Error('Noticia no encontrada')
    }
  } catch (err) {
    errorMsg.value = err.message
    console.error('❌ Error cargando noticia:', err)
    noticiaData.value = null
  } finally {
    cargando.value = false
  }
}

// Cargar noticia al montar
onMounted(() => {
  cargarNoticia()
})

definePageMeta({ layout: 'alter8' })

// SEO dinámico con watch
import { watch } from 'vue'

watch(noticiaData, (nuevaNoticia) => {
  if (nuevaNoticia) {
    useHead({
      title: `${nuevaNoticia.titulo} | Senado Bolivia`,
      meta: [
        { name: 'description', content: nuevaNoticia.excerpt || nuevaNoticia.descripcion },
        { property: 'og:title', content: nuevaNoticia.titulo },
        { property: 'og:description', content: nuevaNoticia.excerpt || nuevaNoticia.descripcion },
        { property: 'og:image', content: nuevaNoticia.featuredImage?.url || nuevaNoticia.imagen }
      ]
    })
  } else {
    useHead({ title: 'Noticia no encontrada | Senado Bolivia' })
  }
}, { immediate: true })
</script>

<style scoped>
.prose {
  font-family: 'Montserrat', Tahoma, Geneva, Verdana, sans-serif;
}
.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}
.prose h2, .prose h3 {
  color: #E03636;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}
.prose ul, .prose ol {
  margin: 1rem 0;
  padding-left: 2rem;
}
.prose li {
  margin: 0.5rem 0;
}
.prose img {
  border-radius: 12px;
  margin: 1.5rem 0;
  width: 100%;
}
</style>