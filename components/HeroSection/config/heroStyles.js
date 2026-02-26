// components/HeroSection/config/heroStyles.js

// Clases para el tooltip (texto que aparece al hacer hover)
export const tooltipTextClasses = `
  text-[clamp(0.4rem,.8vw,1rem)] 
  sm:text-[clamp(0.4rem,1.3vw,0.9rem)] 
  md:text-[clamp(0.5rem,1.4vw,1.0rem)] 
  lg:text-[clamp(0.9rem,1.4vw,1.5rem)] 
  xl:text-[clamp(0.9rem,1.4vw,1.6rem)] 
  2xl:text-[clamp(1.1rem,1.4vw,1.8rem)] 
  3xl:text-[clamp(1.2rem,1.5vw,1.8rem)] 
  4xl:text-[clamp(1.3rem,1.8vw,2.5rem)] 
  5xl:text-[clamp(1.5rem,1.2vw,3rem)]
`

// Clases para los SVGs (tamaños responsivos)
export const svgSizeClasses = `
  w-[25px] h-[25px] 
  sm:w-[35px] sm:h-[35px] 
  md:w-[45px] md:h-[45px] 
  lg:w-[65px] lg:h-[65px] 
  xl:w-[73px] xl:h-[73px] 
  2xl:w-[100px] 2xl:h-[100px] 
  3xl:w-[120px] 3xl:h-[120px] 
  4xl:w-[180px] 4xl:h-[180px] 
  5xl:w-[250px] 5xl:h-[250px]
`

// Clases para el espaciador entre botones y franja
export const spacerClasses = `
  h-2 sm:h-2.5 md:h-5 lg:h-8 xl:h-10 2xl:h-12 3xl:h-16 4xl:h-20 5xl:h-32
`

// Clases para el padding del tooltip
export const tooltipPaddingClasses = `
  px-2 py-1 sm:px-1 sm:py-0.5 md:px-2 md:py-1 
  lg:px-3 lg:py-1.5 xl:px-3 xl:py-1.5 
  2xl:px-3 2xl:py-2 3xl:px-4 3xl:py-2.5 
  4xl:px-6 4xl:py-2.5 5xl:px-8 5xl:py-4
`

// Tamaño del triángulo del tooltip
export const triangleSize = 'border-8 4xl:border-[20px]'

// Clases para el texto de la franja
export const bannerTextClasses = `
  text-[clamp(.4rem,1.8vw,.9rem)] 
  sm:text-[clamp(1rem,2.6vw,1.8rem)] 
  md:text-[clamp(1.3rem,2.5vw,2rem)] 
  lg:text-[clamp(1.8rem,2.8vw,3rem)] 
  xl:text-[clamp(2rem,2.8vw,3.5rem)] 
  2xl:text-[clamp(2.5rem,2.5vw,4rem)] 
  3xl:text-[clamp(3.0rem,2.8vw,4.1rem)] 
  4xl:text-[clamp(3.5rem,2.5vw,5rem)] 
  5xl:text-[clamp(5rem,2.5vw,7rem)]
`

// Clases para los círculos decorativos de la franja
export const bannerCircleClasses = `
  text-[clamp(0.4rem,1.2vw,.9rem)] 
  sm:-translate-y-1 
  md:text-[clamp(0.4rem,1.2vw,1.1rem)] md:-translate-y-1 
  lg:text-[clamp(0.8rem,3vw,1.2rem)] lg:-translate-y-1 
  xl:-translate-y-2 
  2xl:-translate-y-1 2xl:text-[clamp(1.1rem,1.7vw,1.8rem)] 
  3xl:text-[clamp(1.1rem,1.5vw,3.4rem)] 
  5xl:text-[clamp(2rem,1.3vw,4.5rem)] 5xl:-translate-y-4
`