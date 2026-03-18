<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Demostración: Hash vs Query</h1>
    
    <div class="grid grid-cols-2 gap-8">
      <!-- COLUMNA HASH -->
      <div class="border p-4 rounded">
        <h2 class="text-xl font-bold mb-4 text-blue-600">🔗 HASH (#)</h2>
        <p class="text-sm text-gray-600 mb-4">NUNCA recarga la página</p>
        
        <div class="space-y-2">
          <button @click="cambiarHash('departamento', 'lapaz')" 
                  class="bg-blue-500 px-3 py-1 rounded block w-full">
            #departamento=lapaz
          </button>
          <button @click="cambiarHash('comision', 'justicia')" 
                  class="bg-blue-500 px-3 py-1 rounded block w-full">
            #comision=justicia
          </button>
          <button @click="cambiarHashMultiple" 
                  class="bg-blue-500 px-3 py-1 rounded block w-full">
            #departamento=lapaz&comision=justicia
          </button>
          <button @click="limpiarHash" 
                  class="bg-gray-500 px-3 py-1 rounded block w-full">
            Limpiar Hash
          </button>
        </div>
        
        <div class="mt-4 p-2 bg-gray-100 rounded">
          <p><strong>Hash actual:</strong> {{ hashActual }}</p>
          <p><strong>Parámetros:</strong> {{ JSON.stringify(hashParams) }}</p>
        </div>
      </div>
      
      <!-- COLUMNA QUERY -->
      <div class="border p-4 rounded">
        <h2 class="text-xl font-bold mb-4 text-green-600">❓ QUERY (?)</h2>
        <p class="text-sm text-gray-600 mb-4">Con router.push() NO recarga</p>
        
        <div class="space-y-2">
          <button @click="cambiarQuery('departamento', 'lapaz')" 
                  class="bg-green-500 text-white px-3 py-1 rounded block w-full">
            ?departamento=lapaz
          </button>
          <button @click="cambiarQuery('comision', 'justicia')" 
                  class="bg-green-500 text-white px-3 py-1 rounded block w-full">
            ?comision=justicia
          </button>
          <button @click="cambiarQueryMultiple" 
                  class="bg-green-500 text-white px-3 py-1 rounded block w-full">
            ?departamento=lapaz&comision=justicia
          </button>
          <button @click="limpiarQuery" 
                  class="bg-gray-500 text-white px-3 py-1 rounded block w-full">
            Limpiar Query
          </button>
        </div>
        
        <div class="mt-4 p-2 bg-gray-100 rounded">
          <p><strong>Query actual:</strong> {{ JSON.stringify($route.query) }}</p>
        </div>
        
        <!-- Botón que SÍ recarga -->
        <div class="mt-4 pt-4 border-t">
          <p class="text-sm text-red-600 mb-2">⚠️ Esto SÍ recarga:</p>
          <a :href="`/proyectos?departamento=lapaz`" 
             class="bg-red-500 text-white px-3 py-1 rounded block w-full text-center">
            Link normal ?departamento=lapaz (RECARGA)
          </a>
        </div>
      </div>
    </div>
    
    <!-- Contador de recargas -->
    <div class="mt-8 p-4 bg-yellow-100 rounded">
      <p><strong>Recargas de página:</strong> {{ recargas }}</p>
      <p><strong>Cambios de hash:</strong> {{ cambiosHash }}</p>
      <p><strong>Cambios de query (con router):</strong> {{ cambiosQuery }}</p>
    </div>
    
    <!-- Elementos para scroll (hash) -->
    <div class="mt-96">
      <div id="departamento=lapaz" class="bg-blue-100 p-8 m-4">
        🟦 Sección: departamento-lapaz (scroll automático con hash)
      </div>
      <div id="comision=justicia" class="bg-green-100 p-8 m-4">
        🟩 Sección: comision-justicia
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Contadores
const recargas = ref(0)
const cambiosHash = ref(0)
const cambiosQuery = ref(0)

// Detectar recarga
onMounted(() => {
  recargas.value++
  console.log('🔄 Página recargada #', recargas.value)
})

// ===== FUNCIONES PARA HASH =====
const hashActual = computed(() => route.hash)
const hashParams = computed(() => {
  const hash = route.hash
  if (!hash) return {}
  
  const params = {}
  const pairs = hash.substring(1).split('&')
  pairs.forEach(pair => {
    const [key, value] = pair.split('=')
    if (key) params[key] = value || true
  })
  return params
})

const cambiarHash = (key, value) => {
  const nuevosParams = { ...hashParams.value, [key]: value }
  const hashString = Object.entries(nuevosParams)
    .map(([k, v]) => v === true ? k : `${k}=${v}`)
    .join('&')
  
  router.push({ hash: `#${hashString}` })
  cambiosHash.value++
}

const cambiarHashMultiple = () => {
  router.push({ hash: '#departamento=lapaz&comision=justicia' })
  cambiosHash.value++
}

const limpiarHash = () => {
  router.push({ hash: '' })
  cambiosHash.value++
}

// ===== FUNCIONES PARA QUERY =====
const cambiarQuery = (key, value) => {
  router.push({
    query: {
      ...route.query,
      [key]: value
    }
  })
  cambiosQuery.value++
}

const cambiarQueryMultiple = () => {
  router.push({
    query: {
      departamento: 'lapaz',
      comision: 'justicia'
    }
  })
  cambiosQuery.value++
}

const limpiarQuery = () => {
  router.push({ query: {} })
  cambiosQuery.value++
}

// Watches
watch(() => route.hash, (newHash, oldHash) => {
  console.log('📍 Hash cambió:', oldHash, '→', newHash)
})

watch(() => route.query, (newQuery, oldQuery) => {
  console.log('📊 Query cambió:', oldQuery, '→', newQuery)
}, { deep: true })
</script>