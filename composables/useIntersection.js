import { ref, onMounted, onUnmounted } from 'vue'

export const useIntersection = (options = {}) => {
  const elementRef = ref(null)
  const isIntersecting = ref(false)
  
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    once: false
  }
  
  const observerOptions = { ...defaultOptions, ...options }
  
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      isIntersecting.value = entry.isIntersecting
      
      // Si es 'once' y ya se intersectó, desconectar
      if (observerOptions.once && entry.isIntersecting) {
        observer.disconnect()
      }
    })
  }
  
  let observer = null
  
  onMounted(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(observerCallback, observerOptions)
      
      if (elementRef.value) {
        observer.observe(elementRef.value)
      }
    } else {
      // Fallback para navegadores que no soportan IntersectionObserver
      isIntersecting.value = true
    }
  })
  
  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
    }
  })
  
  return {
    elementRef,
    isIntersecting
  }
}

// También exportar una función factory para uso específico
export const createIntersectionObserver = (options) => {
  return useIntersection(options)
}