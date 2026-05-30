// composables/useScrollEffects.js - VERSIÓN COMPLETA CON LOGS
import { ref, readonly, onMounted, onUnmounted } from 'vue'

export function useScrollEffects() {
  const scrolled = ref(false)
  const scrollProgress = ref(0)
  let ticking = false
  let scrollListener = null

  console.log('🎯 [useScrollEffects] Composable inicializado')

  const handleScroll = () => {
    if (ticking || typeof window === 'undefined') return
    
    requestAnimationFrame(() => {
      const scrollPosition = window.scrollY
      const wasScrolled = scrolled.value
      scrolled.value = scrollPosition > 100
      
      if (wasScrolled !== scrolled.value) {
        console.log(`📜 [useScrollEffects] scrolled cambió: ${wasScrolled} -> ${scrolled.value}`)
      }
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.value = maxScroll > 0 ? (scrollPosition / maxScroll) * 100 : 0
      
      ticking = false
    })
    ticking = true
  }

  const initScrollListener = () => {
    if (typeof window === 'undefined') {
      console.log('⚠️ [useScrollEffects] window no disponible (SSR)')
      return
    }
    
    console.log('🎯 [useScrollEffects] Inicializando scroll listener')
    
    if (scrollListener) {
      window.removeEventListener('scroll', scrollListener)
    }
    
    scrollListener = handleScroll
    window.addEventListener('scroll', scrollListener, { passive: true })
    handleScroll()
  }

  const removeScrollListener = () => {
    if (typeof window === 'undefined') return
    console.log('🗑️ [useScrollEffects] Eliminando scroll listener')
    if (scrollListener) {
      window.removeEventListener('scroll', scrollListener)
      scrollListener = null
    }
  }

  onMounted(() => {
    console.log('✅ [useScrollEffects] onMounted - iniciando')
    initScrollListener()
  })
  
  onUnmounted(() => {
    console.log('🗑️ [useScrollEffects] onUnmounted - limpiando')
    removeScrollListener()
  })

  return {
    scrolled: readonly(scrolled),
    scrollProgress: readonly(scrollProgress),
    initScrollListener,
    removeScrollListener
  }
}