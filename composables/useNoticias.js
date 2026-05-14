// composables/useNoticias.js
import { ref } from 'vue'

const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

export const useNoticias = () => {
  const noticiasImportantes = ref([])
  const ultimasNoticias = ref([])
  const todasLasNoticias = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Función para transformar datos del backend al formato del frontend
  const transformarNoticia = (item) => {
    // Limpiar HTML para obtener texto plano para la descripción
    const textoPlano = item.content?.replace(/<[^>]*>/g, '') || ''
    
    return {
      id: item._id,
      titulo: item.title,
      slug: item.slug,
      contenido: item.content,
      resumen: item.excerpt || textoPlano.substring(0, 200),
      // 🔥 NUEVOS CAMPOS para el carrusel
      descripcion: item.excerpt || textoPlano.substring(0, 150),
      descripcion2: textoPlano.length > 200 ? textoPlano.substring(150, 350) : '',
      fecha: item.publishedAt,
      publishedAt: item.publishedAt,
      imagen: item.featuredImage?.url,
      featuredImage: item.featuredImage,
      categoria: item.category,
      importante: item.category === 'legislacion' || item.views > 50,
      tipo: item.type,
      status: item.status,
      views: item.views,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }
  }

  const fetchTodasLasNoticias = async () => {
    console.log('📡 [fetchTodasLasNoticias] Iniciando...')
    
    if (loading.value) {
      console.log('📡 Ya hay una carga en curso, esperando...')
      return
    }
    
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/content?status=published&limit=100`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      console.log('📡 Respuesta recibida:', data)
      
      if (data.success && data.data && data.data.contents) {
        todasLasNoticias.value = data.data.contents.map(transformarNoticia)
        console.log(`✅ Cargadas ${todasLasNoticias.value.length} noticias del backend`)
        
        if (todasLasNoticias.value.length > 0) {
          console.log('📰 Primera noticia transformada:', {
            id: todasLasNoticias.value[0].id,
            titulo: todasLasNoticias.value[0].titulo?.substring(0, 50),
            descripcion: todasLasNoticias.value[0].descripcion?.substring(0, 80),
            descripcion2: todasLasNoticias.value[0].descripcion2?.substring(0, 80)
          })
        }
        
        // Noticias importantes: las de legislacion o con más de 50 vistas
        const importantes = todasLasNoticias.value.filter(n => n.importante === true)
        
        if (importantes.length >= 4) {
          noticiasImportantes.value = importantes.slice(0, 4)
          console.log(`✅ ${noticiasImportantes.value.length} noticias importantes (por filtro)`)
        } else {
          const otras = todasLasNoticias.value.filter(n => !n.importante)
          noticiasImportantes.value = [...importantes, ...otras].slice(0, 4)
          console.log(`✅ ${noticiasImportantes.value.length} noticias importantes (completadas)`)
        }
        
        const idsImportantes = new Set(noticiasImportantes.value.map(n => n.id))
        const noImportantes = todasLasNoticias.value.filter(n => !idsImportantes.has(n.id))
        ultimasNoticias.value = noImportantes.slice(0, 4)
        
        console.log(`✅ ${ultimasNoticias.value.length} últimas noticias asignadas`)
        
        console.log('📰 Títulos de noticias importantes:')
        noticiasImportantes.value.forEach((n, i) => {
          console.log(`   ${i+1}. ${n.titulo?.substring(0, 60)}...`)
          console.log(`      Descripción: ${n.descripcion?.substring(0, 60)}...`)
        })
        
      } else {
        throw new Error('Formato de respuesta inválido')
      }
    } catch (err) {
      error.value = err.message
      console.error('❌ Error:', err)
      noticiasImportantes.value = []
      ultimasNoticias.value = []
      todasLasNoticias.value = []
    } finally {
      loading.value = false
    }
  }

  const fetchNoticiasImportantes = async () => {
    await fetchTodasLasNoticias()
    return noticiasImportantes.value
  }

  const fetchUltimasNoticias = async () => {
    await fetchTodasLasNoticias()
    return ultimasNoticias.value
  }

  const fetchNoticiaBySlug = async (slug) => {
    console.log(`📡 [fetchNoticiaBySlug] Buscando: ${slug}`)
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/content/slug/${slug}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success && data.data) {
        const noticia = transformarNoticia(data.data)
        console.log(`✅ Noticia encontrada: ${noticia.titulo}`)
        return noticia
      } else {
        throw new Error('Noticia no encontrada')
      }
    } catch (err) {
      error.value = err.message
      console.error('❌ Error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    noticiasImportantes,
    ultimasNoticias,
    todasLasNoticias,
    loading,
    error,
    fetchTodasLasNoticias,
    fetchNoticiasImportantes,
    fetchUltimasNoticias,
    fetchNoticiaBySlug
  }
}