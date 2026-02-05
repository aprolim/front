// composables/useScrollTransitions.js
export const useScrollTransitions = () => {
  const animatedElements = ref(new Set())
  
  const initScrollTransitions = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            animatedElements.add(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )
    
    return observer
  }
  
  return {
    animatedElements,
    initScrollTransitions
  }
}