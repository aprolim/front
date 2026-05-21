// composables/useScrollEffects.js
import { ref } from 'vue'

export function useScrollEffects() {
  const scrolled = ref(false)
  const scrollProgress = ref(0)
  
  const handleScroll = () => {
    if (typeof window === 'undefined') return
    
    const scrollPosition = window.scrollY
    const progress = Math.min(scrollPosition / (window.innerHeight * 0.5), 1) * 100
    scrollProgress.value = progress
    scrolled.value = scrollPosition > 100
  }

  const initScrollListener = () => {
    if (typeof window === 'undefined') return
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
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