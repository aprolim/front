// composables/useNoticias.js - VERSIÓN CON SSR REAL
import { ref, computed } from 'vue'

const isServer = typeof window === 'undefined'
const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

console.log(`🔧 [useNoticias] API Base URL: ${API_BASE_URL}`)

const transformarNoticia = (item) => {
  if (!item) return null
  
  const textoPlano = item.content?.replace(/<[^>]*>/g, '') || ''
  
  return {
    id: item._id || item.id,
    titulo: item.title || 'Sin título',
    slug: item.slug,
    contenido: item.content || '',
    resumen: item.excerpt || textoPlano.substring(0, 200),
    descripcion: item.excerpt || textoPlano.substring(0, 150),
    descripcion2: textoPlano.length > 200 ? textoPlano.substring(150, 350) : '',
    fecha: item.publishedAt || item.createdAt,
    publishedAt: item.publishedAt || item.createdAt,
    imagen: item.featuredImage?.url || item.imagen,
    featuredImage: item.featuredImage,
    categoria: item.category || 'general',
    importante: item.category === 'legislacion' || item.views > 50 || item.importante,
    tipo: item.type || 'noticia',
    status: item.status,
    views: item.views || 0,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }
}

// Función que puede ser llamada tanto en SSR como en cliente
export const fetchNoticias = async () => {
  console.log(`📡 [useNoticias] ${isServer ? 'SSR - Servidor' : 'CSR - Cliente'} - Cargando noticias...`)
  
  try {
    const url = `${API_BASE_URL}/content?status=published&limit=100`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.success && data.data?.contents) {
      const todas = data.data.contents
        .map(transformarNoticia)
        .filter(Boolean)
      
      // Noticias importantes (máximo 4)
      const importantes = todas.filter(n => n.importante === true)
      const noticiasImportantes = importantes.length >= 4 
        ? importantes.slice(0, 4) 
        : [...importantes, ...todas.filter(n => !n.importante)].slice(0, 4)
      
      // Últimas noticias (4 más recientes que NO son importantes)
      const idsImportantes = new Set(noticiasImportantes.map(n => n.id))
      const ultimasNoticias = todas
        .filter(n => !idsImportantes.has(n.id))
        .sort((a, b) => new Date(b.publishedAt || b.fecha) - new Date(a.publishedAt || a.fecha))
        .slice(0, 4)
      
      console.log(`✅ [useNoticias] Cargadas ${todas.length} noticias (${noticiasImportantes.length} importantes, ${ultimasNoticias.length} últimas)`)
      
      return {
        noticiasImportantes,
        ultimasNoticias,
        todasLasNoticias: todas,
        error: null
      }
    }
    
    throw new Error('Formato de respuesta inválido')
    
  } catch (err) {
    console.error('❌ [useNoticias] Error:', err)
    return {
      noticiasImportantes: [],
      ultimasNoticias: [],
      todasLasNoticias: [],
      error: err.message
    }
  }
}

// Composable principal
export const useNoticias = () => {
  const noticiasImportantes = ref([])
  const ultimasNoticias = ref([])
  const todasLasNoticias = ref([])
  const loading = ref(true)
  const error = ref(null)
  const loaded = ref(false)
  
  const cargarDatos = async () => {
    if (loaded.value) {
      console.log('📦 [useNoticias] Datos ya cargados, omitiendo...')
      return
    }
    
    console.log(`🔄 [useNoticias] cargarDatos() ejecutándose en ${isServer ? 'SSR' : 'cliente'}`)
    
    loading.value = true
    const result = await fetchNoticias()
    
    noticiasImportantes.value = result.noticiasImportantes
    ultimasNoticias.value = result.ultimasNoticias
    todasLasNoticias.value = result.todasLasNoticias
    error.value = result.error
    loading.value = false
    loaded.value = true
    
    return result
  }
  
  const recargarDatos = async () => {
    console.log('🔄 [useNoticias] Recargando datos...')
    loaded.value = false
    await cargarDatos()
  }
  
  const fetchNoticiaBySlug = async (slug) => {
    console.log(`📡 [useNoticias] Buscando noticia: ${slug} en ${isServer ? 'SSR' : 'cliente'}`)
    
    try {
      const response = await fetch(`${API_BASE_URL}/content/slug/${slug}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success && data.data) {
        return transformarNoticia(data.data)
      }
      return null
    } catch (err) {
      console.error('❌ [useNoticias] Error:', err)
      return null
    }
  }
  
  return {
    noticiasImportantes: computed(() => noticiasImportantes.value),
    ultimasNoticias: computed(() => ultimasNoticias.value),
    todasLasNoticias: computed(() => todasLasNoticias.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    loaded: computed(() => loaded.value),
    cargarDatos,
    recargarDatos,
    fetchNoticiaBySlug,
    fetchNoticiasImportantes: cargarDatos,
    fetchUltimasNoticias: cargarDatos,
    fetchTodasLasNoticias: cargarDatos,
    limpiarCache: recargarDatos
  }
}