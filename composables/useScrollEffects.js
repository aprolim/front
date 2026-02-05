// composables/useScrollEffects.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollEffects() {
  const scrolled = ref(false)
  const scrollProgress = ref(0)
  
  const handleScroll = () => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return
    
    const scrollPosition = window.scrollY
    
    // Calcular progreso de scroll (0% a 100%)
    const progress = Math.min(scrollPosition / (window.innerHeight * 0.5), 1) * 100
    scrollProgress.value = progress
    
    // Activar estado "scrolled" cuando se haya hecho scroll suficiente
    scrolled.value = scrollPosition > 100
  }

  const initScrollListener = () => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Llamar inicialmente
  }

  const removeScrollListener = () => {
    if (typeof window === 'undefined') return
    
    window.removeEventListener('scroll', handleScroll)
  }

  return {
    scrolled,
    scrollProgress,
    initScrollListener,
    removeScrollListener
  }
}