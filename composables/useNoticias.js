// composables/useNoticias.js - VERSIÓN COMPLETA CORREGIDA
import { ref, computed } from 'vue'

const isServer = typeof window === 'undefined'
const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

console.log(`🔧 [useNoticias] API Base URL: ${API_BASE_URL}`)

const transformarNoticia = (item) => {
  if (!item) return null
  
  const textoPlano = item.content?.replace(/<[^>]*>/g, '') || ''
  
  const esImportante = item.category === 'importante'
  
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
    categoria: item.category,
    importante: esImportante,
    tipo: item.type || 'noticia',
    status: item.status,
    views: item.views || 0,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt
  }
}

// Función para cargar SOLO noticias importantes
export const fetchNoticiasImportantes = async () => {
  console.log(`📡 [useNoticias] Cargando noticias IMPORTANTES...`)
  
  const url = `${API_BASE_URL}/content?status=published&category=importante&limit=100`
  console.log(`📍 URL importantes: ${url}`)
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.success && data.data?.contents) {
      const noticias = data.data.contents
        .map(transformarNoticia)
        .filter(Boolean)
      
      console.log(`✅ [useNoticias] Cargadas ${noticias.length} noticias IMPORTANTES`)
      return noticias
    }
    return []
  } catch (err) {
    console.error('❌ Error cargando importantes:', err)
    return []
  }
}

// Función para cargar SOLO noticias NO importantes (últimas)
export const fetchNoticiasUltimas = async () => {
  console.log(`📡 [useNoticias] Cargando NOTICIAS NO IMPORTANTES...`)
  
  const url = `${API_BASE_URL}/content?status=published&category=noticia&limit=100`
  console.log(`📍 URL últimas: ${url}`)
  
  try {
    const response = await fetch(url)
    const data = await response.json()
    
    if (data.success && data.data?.contents) {
      const noticias = data.data.contents
        .map(transformarNoticia)
        .filter(Boolean)
      
      console.log(`✅ [useNoticias] Cargadas ${noticias.length} noticias NO IMPORTANTES`)
      return noticias
    }
    return []
  } catch (err) {
    console.error('❌ Error cargando últimas:', err)
    return []
  }
}

// 🔥 FUNCIÓN PARA ORDENAR NOTICIAS POR FECHA (más reciente primero)
const ordenarPorFecha = (noticias) => {
  return [...noticias].sort((a, b) => {
    const fechaA = new Date(a.publishedAt || a.fecha || 0)
    const fechaB = new Date(b.publishedAt || b.fecha || 0)
    return fechaB - fechaA // Descendente (más reciente primero)
  })
}

// Función que carga ambas (para mantener compatibilidad)
export const fetchNoticias = async () => {
  console.log(`📡 [useNoticias] Cargando todas las noticias (importantes + últimas)...`)
  
  const [noticiasImportantes, ultimasNoticias] = await Promise.all([
    fetchNoticiasImportantes(),
    fetchNoticiasUltimas()
  ])
  
  // 🔥 COMBINAR Y ORDENAR POR FECHA
  const todasLasNoticias = ordenarPorFecha([...noticiasImportantes, ...ultimasNoticias])
  
  console.log(`📊 [useNoticias] Total combinado: ${todasLasNoticias.length} noticias`)
  
  // 🔥 LOG DE FECHAS PARA DEPURACIÓN
  if (todasLasNoticias.length > 0) {
    console.log('   📅 Primeras 5 fechas (ordenadas):')
    todasLasNoticias.slice(0, 5).forEach((n, i) => {
      console.log(`      ${i+1}. ${n.titulo.substring(0, 40)}... → ${n.publishedAt}`)
    })
  }
  
  return {
    noticiasImportantes: noticiasImportantes.slice(0, 4),
    ultimasNoticias: ultimasNoticias.slice(0, 4),
    todasLasNoticias: todasLasNoticias,
    error: null
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
    console.log(`📡 [useNoticias] Buscando noticia: ${slug}`)
    
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