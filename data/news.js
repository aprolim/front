// data/news.js
export const featuredNews = [
  {
    id: 1,
    title: "Aprobación del Presupuesto General del Estado 2024",
    description: "El Senado Nacional aprobó en grande y en detalle el Presupuesto General del Estado para la gestión 2024, destinando el 65% a inversión pública y desarrollo social.",
    date: "18 ENE 2024",
    category: "SESIÓN PLENARIA",
    image: "https://www.lostiempos.com/sites/default/files/styles/noticia_detalle/public/media_imagen/2026/1/21/bloque.jpg?itok=5sLQZVlp",
    link: "/noticias/presupuesto-2024",
    type: "official",
    status: "approved",
    details: {
      senators: 36,
      percentage: "65%",
      destination: "inversión pública y desarrollo social"
    }
  },
  {
    id: 2,
    title: "Presentación del Informe de Fiscalización a Entidades Públicas",
    description: "La Comisión de Legislación presenta informe detallado sobre la fiscalización de 15 entidades públicas durante el último trimestre.",
    date: "20 ENE 2024",
    category: "COMISIÓN",
    link: "/comisiones/fiscalizacion",
    type: "commission",
    commission: "LEGISLACIÓN Y FISCALIZACIÓN",
    documents: [
      { name: "Informe_Completo.pdf", size: "2.4 MB", pages: 45 }
    ]
  },
  {
    id: 3,
    title: "Ley Marco de Protección a la Madre Tierra y Desarrollo Integral",
    description: "Propuesta legislativa para la protección ambiental y desarrollo sostenible, actualmente en fase de consulta pública.",
    date: "15 ENE 2024",
    category: "PROYECTO DE LEY",
    link: "/proyectos/ley-245",
    type: "bill",
    billNumber: "N° 245/2023-2024",
    status: "EN TRÁMITE",
    progress: 60
  }
]

export const latestNews = [
  {
    id: 4,
    title: "Reforma Educativa para áreas rurales aprobada",
    description: "Nueva ley busca mejorar la calidad educativa en comunidades rurales con programas de capacitación docente.",
    date: "22 ENE",
    category: "EDUCACIÓN",
    commission: "Comisión de Educación",
    image: "https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/noticias/reforma-educativa"
  },
  {
    id: 5,
    title: "Plan Nacional de Hospitales 2024-2026",
    description: "Inversión de $500M para modernizar 45 hospitales públicos en todo el territorio nacional.",
    date: "20 ENE",
    category: "SALUD",
    commission: "Comisión de Salud",
    image: "https://online.udla.edu.ec/images/estudiantes-maestria-salud_700w.webp",
    link: "/noticias/plan-hospitalario"
  },
  {
    id: 6,
    title: "Protección de bosques nativos ampliada",
    description: "Nueva legislación protege 2M hectáreas adicionales de bosques nativos contra deforestación ilegal.",
    date: "18 ENE",
    category: "MEDIO AMBIENTE",
    commission: "Comisión Ambiental",
    image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/noticias/proteccion-bosques"
  },
  {
    id: 7,
    title: "Nueva plataforma digital del Senado",
    description: "Sistema permite seguimiento en tiempo real de sesiones y participación ciudadana en proyectos de ley.",
    date: "16 ENE",
    category: "TECNOLOGÍA",
    commission: "Innovación Digital",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    link: "/noticias/plataforma-digital"
  }
]

export const quickLinks = [
  {
    title: 'Legisladores',
    description: 'Conoce a los representantes',
    link: '/legisladores',
    color: 'linear-gradient(135deg, #8B1A1A 0%, #5C1010 100%)',
    icon: '👥'
  },
  {
    title: 'Proyectos de Ley',
    description: 'Seguimiento legislativo',
    link: '/gestion-legislativa',
    color: 'linear-gradient(135deg, #F9E076 0%, #D4AF37 100%)',
    icon: '📋'
  },
  {
    title: 'Participación',
    description: 'Involúcrate activamente',
    link: '/participacion',
    color: 'linear-gradient(135deg, #007934 0%, #005C26 100%)',
    icon: '💬'
  },
  {
    title: 'Transparencia',
    description: 'Información pública',
    link: '/transparencia',
    color: 'linear-gradient(135deg, #575756 0%, #3A3A39 100%)',
    icon: '🔍'
  }
]