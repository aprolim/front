// plugins/clean-console.client.ts
export default defineNuxtPlugin(() => {
  
  const originalError = console.error
  const originalWarn = console.warn
  const originalLog = console.log
  
  // Lista de mensajes a silenciar completamente
  const silentMessages: string[] = [
    // WebSocket / Vite HMR
    'WebSocket', 'websocket', 'failed to connect', 'vite', 'hmr',
    // Permissions Policy
    'Permissions policy', 'compute-pressure', 'is not allowed',
    // Passive event listeners
    'Added non-passive event listener', 'scroll-blocking', 'touchstart', 'touchmove',
    // Timeout violations
    'setTimeout', 'handler took', 'Violation',
    // YouTube específico (esto es clave)
    'base.js', 'm=r78Drb', 'dQw4w9WgXcQ', 'youtube.com', 'ytimg',
    'loadNewVideoConfig', 'player', '_.YC', '_.FD', '_.qc',
    // Imágenes 404 (el AdaptiveImageLoader ya los maneja)
    '404', '.png', '.jpg', '.jpeg', '.webp'
  ]
  
  const shouldSilence = (message: string): boolean => {
    if (!message) return false
    const msg = message.toString().toLowerCase()
    return silentMessages.some(silent => msg.includes(silent.toLowerCase()))
  }
  
  // Silenciar console.error
  console.error = (...args: any[]) => {
    const firstArg = args[0]?.toString() || ''
    if (shouldSilence(firstArg)) return
    originalError.apply(console, args)
  }
  
  // Silenciar console.warn
  console.warn = (...args: any[]) => {
    const firstArg = args[0]?.toString() || ''
    if (shouldSilence(firstArg)) return
    originalWarn.apply(console, args)
  }
  
  // En producción, silenciar todo
  if (typeof window !== 'undefined' && window.location?.hostname !== 'localhost') {
    console.log = () => {}
    console.info = () => {}
    console.debug = () => {}
    console.warn = () => {}
    console.error = () => {}
  } else {
    // En desarrollo, mantener logs útiles
    console.log = (...args: any[]) => {
      const firstArg = args[0]?.toString() || ''
      if (firstArg.includes('[SW]') ||
          firstArg.includes('✅') ||
          firstArg.includes('📦') ||
          firstArg.includes('🚀') ||
          firstArg.includes('Cargadas')) {
        originalLog.apply(console, args)
      }
    }
  }
})