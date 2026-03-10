// components/data/modeNewsGridData.js
export const modeNewsGridData = {
  // NOTICIAS
  noticias: [
    { 
      id: 1, 
      titulo: 'Reforma Educativa para áreas rurales aprobada', 
      imagen: '/sesiones-portada/image1.png', 
      enlace: '/noticias/reforma-educativa' 
    },
    { 
      id: 2, 
      titulo: 'Plan Nacional de hidrocarburos 2024-2026', 
      imagen: '/sesiones-portada/image2.png', 
      enlace: '/noticias/plan-hospitalario' 
    },
    { 
      id: 3, 
      titulo: 'Sesiones en pleno ampliada para mitigar el cambio climático', 
      imagen: '/sesiones-portada/image3.png', 
      enlace: '/noticias/proteccion-bosques' 
    },
    { 
      id: 4, 
      titulo: 'Se reafirma la nueva constitucion', 
      imagen: '/sesiones-portada/image4.png', 
      enlace: '/noticias/plataforma-digital' 
    }
  ],

  // PROPS POR DEFECTO
  propsPorDefecto: {
    title: 'Últimas',
    subtitle: 'Información actualizada sobre las actividades legislativas del Senado Nacional',
    viewAllLink: '/noticias'
  },

  // CLASES RESPONSIVAS - TODO CON TAILWIND
  clases: {
    // Sección - padding vertical
    seccion: 'pt-4 xs:pt-5 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 2xl:pt-16 pb-8 xs:pb-10 sm:pb-12 md:pb-14 lg:pb-16 xl:pb-20 2xl:pb-24',
    
    // Decoración - tamaños de círculos
    decoracion: 'w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 2xl:w-64 2xl:h-64',
    
    // Contenedor - padding horizontal
    container: 'px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-14 2xl:px-12 3xl:px-20',
    
    // Header - margen inferior
    header: 'mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 2xl:mb-16',
    
    // Título principal
    titulo: 'inline-block text-[16px] xs:text-[14px] sm:text-[22px] md:text-[28px] lg:text-[36px] xl:text-[42px] 2xl:text-[60px] 3xl:text-[70px] 4xl:text-[90px] 5xl:text-[120px] font-bold',
    
    // Subtítulo
    subtitulo: 'text-[12px] xs:text-[10px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[28px] 4xl:text-[36px] 5xl:text-[52px] px-4 mx-auto',
    
    // GRID - 4 COLUMNAS: 1 en móvil, 2 en tablet pequeña, 4 desde md
    grid: 'grid grid-cols-4 gap-1 xs:gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-4 2xl:gap-6',
    
    // Tarjeta - bordes y alturas mínimas
    tarjeta: 'rounded-lg xs:rounded-xl sm:rounded-2xl h-[90px] xs:h-[100px] sm:h-[160px] md:min-h-[180px] lg:h-[220px] xl:h-[240px] 2xl:h-[390px] 3xl:h-[480px] 4xl:h-[640px] 5xl:h-[1080px]',
    
    // Espaciador interno (antes del contenido rojo)
    espaciador: 'h-[55px] xs:h-[80px] sm:h-[90px] md:h-[70px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px]',
    
    // Contenido de tarjeta (fondo rojo)
    contenidoTarjeta: 'p-1 xs:p-1.5 sm:p-2 md:p-2.5 lg:p-3 xl:p-4 2xl:p-5 h-[40px] xs:h-[43px] sm:h-[55px] md:h-[65px] lg:h-[80px] xl:h-[90px] 2xl:h-[110px] 3xl:h-[140px] 4xl:h-[160px] 5xl:h-[220px]',
    
    // Título de la noticia
    tituloNoticia: 'text-[5px] xs:text-[6px] sm:text-[7px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[17px] 3xl:text-[22px] 4xl:text-[28px] 5xl:text-[48px] mb-1 leading-tight font-bold',
    
    // Enlace "Leer más"
    enlace: 'text-[5px] xs:text-[6px] sm:text-[7px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px] 3xl:text-[18px] 4xl:text-[23px] 5xl:text-[38px] gap-0.5 xs:gap-1 font-bold',
    
    // Icono del enlace
    icono: 'w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4',
    
    // Contenedor del botón
    botonContainer: 'mt-2 xs:mt-3 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-16',
    
    // Botón "Ver todas"
    boton: 'px-2 xs:px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 2xl:px-10 py-1 xs:py-1.5 sm:py-1.5 md:py-2 lg:py-2.5 xl:py-3 2xl:py-4 text-[7px] xs:text-[8px] sm:text-[9px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[19px] 3xl:text-[24px] 4xl:text-[34px] 5xl:text-[56px] gap-1 xs:gap-1.5 sm:gap-2',
    
    // Icono del botón
    botonIcono: 'w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6'
  },

  // ANIMACIONES
  animaciones: {
    transitionDelay: (index) => `${index * 150}ms`
  }
}