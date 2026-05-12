// composables/useNoticias.js
import { ref } from 'vue'

// Usar la URL de tu backend remoto
const API_BASE_URL = 'http://demoback.senado.gob.bo/api'

export const useNoticias = () => {
  const noticiasImportantes = ref([])
  const ultimasNoticias = ref([])
  const todasLasNoticias = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchTodasLasNoticias = async () => {
    console.log('📡 [fetchTodasLasNoticias] Iniciando...')
    
    // Evitar múltiples llamadas simultáneas
    if (loading.value) {
      console.log('📡 Ya hay una carga en curso, esperando...')
      return
    }
    
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/content?type=news&status=published&limit=100`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      console.log('📡 Respuesta completa:', data)
      
      if (data.success && data.data && data.data.contents) {
        todasLasNoticias.value = data.data.contents
        console.log(`✅ Cargadas ${todasLasNoticias.value.length} noticias del backend`)
        
        // Mostrar las primeras noticias para depuración
        if (todasLasNoticias.value.length > 0) {
          console.log('📰 Primera noticia:', {
            id: todasLasNoticias.value[0].id,
            titulo: todasLasNoticias.value[0].titulo.substring(0, 50),
            importante: todasLasNoticias.value[0].importante
          })
        }
        
        // IMPORTANTE: Las noticias importantes son las que tienen importante = true
        // Según el JSON que mostraste, las primeras 4 tienen importante: true
        const importantes = todasLasNoticias.value.filter(n => n.importante === true)
        console.log(`📊 Noticias con importante=true: ${importantes.length}`)
        
        if (importantes.length > 0) {
          noticiasImportantes.value = importantes
          console.log(`✅ ${noticiasImportantes.value.length} noticias importantes asignadas`)
        } else {
          // Si no hay marcadas como importantes, tomar las primeras 4
          noticiasImportantes.value = todasLasNoticias.value.slice(0, 4)
          console.log(`⚠️ No hay noticias con importante=true, usando primeras 4`)
        }
        
        // Últimas noticias (excluyendo las importantes)
        const idsImportantes = new Set(noticiasImportantes.value.map(n => n.id))
        const noImportantes = todasLasNoticias.value.filter(n => !idsImportantes.has(n.id))
        ultimasNoticias.value = noImportantes.slice(0, 4)
        
        console.log(`✅ ${ultimasNoticias.value.length} últimas noticias asignadas`)
        
        // Verificar que los datos llegaron
        console.log('📰 Títulos de noticias importantes:')
        noticiasImportantes.value.forEach((n, i) => {
          console.log(`   ${i+1}. ${n.titulo.substring(0, 60)}...`)
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

  // Método para obtener una noticia por slug
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
        console.log(`✅ Noticia encontrada: ${data.data.titulo}`)
        return data.data
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
    // Estados
    noticiasImportantes,
    ultimasNoticias,
    todasLasNoticias,
    loading,
    error,
    // Métodos
    fetchTodasLasNoticias,
    fetchNoticiasImportantes,
    fetchUltimasNoticias,
    fetchNoticiaBySlug
  }
}