// composables/useRedactorTomos.js
export const useRedactorTomos = () => {
  const tomos = [
    // Tomo I - 2023-2024
    {
      id: 1,
      tomo: "I",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo I",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_I_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo I - 2025-2026
    {
      id: 2,
      tomo: "I",
      periodo: "2025-2026",
      año: 2026,
      titulo: "Gaceta Legislativa - Tomo I",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_I_2025-2026.pdf",
      portada: "/images/portadas/2025-2026/default.jpg",
      disponible: true
    },
    // Tomo II
    {
      id: 3,
      tomo: "II",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo II",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_II_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo III
    {
      id: 4,
      tomo: "III",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo III",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_III_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo IV
    {
      id: 5,
      tomo: "IV",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo IV",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_IV_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo V
    {
      id: 6,
      tomo: "V",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo V",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_V_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo VI
    {
      id: 7,
      tomo: "VI",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo VI",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_VI_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo VII
    {
      id: 8,
      tomo: "VII",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo VII",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_VII_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo VIII
    {
      id: 9,
      tomo: "VIII",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo VIII",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_VIII_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo IX
    {
      id: 10,
      tomo: "IX",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo IX",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_IX_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo X
    {
      id: 11,
      tomo: "X",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo X",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_X_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo XI
    {
      id: 12,
      tomo: "XI",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo XI",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_XI_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    },
    // Tomo XII
    {
      id: 13,
      tomo: "XII",
      periodo: "2023-2024",
      año: 2024,
      titulo: "Gaceta Legislativa - Tomo XII",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_XII_2023-2024.pdf",
      portada: "/images/portadas/2023-2024/default.jpg",
      disponible: true
    }
  ]

  const tomosFaltantes = [
    { tomo: "XIII", periodo: "Próximamente", disponible: false },
    { tomo: "XIV", periodo: "Próximamente", disponible: false },
    { tomo: "XV", periodo: "Próximamente", disponible: false }
  ]

  // Obtener años únicos
  const obtenerAñosUnicos = () => {
    const años = new Set()
    tomos.forEach(tomo => {
      if (tomo.año) {
        años.add(tomo.año)
      }
    })
    return Array.from(años).sort((a, b) => b - a)
  }

  // Obtener tomos por año
  const obtenerTomosPorAño = (año) => {
    return tomos.filter(tomo => tomo.año === año)
      .sort((a, b) => romanoAEntero(a.tomo) - romanoAEntero(b.tomo))
  }

  // Obtener portada por año y tomo
  const obtenerPortada = (año, tomo) => {
    const tomoInfo = tomos.find(t => t.año === año && t.tomo === tomo)
    return tomoInfo?.portada || "/images/portadas/default.jpg"
  }

  // Función auxiliar para convertir romano a entero
  const romanoAEntero = (romano) => {
    const romanos = {
      'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
      'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
      'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15
    }
    return romanos[romano] || 0
  }

  // Obtener último tomo
  const obtenerUltimoTomo = () => {
    const tomosDisponibles = tomos.filter(t => t.disponible)
    if (tomosDisponibles.length === 0) return null
    
    return tomosDisponibles.sort((a, b) => {
      const getYear = (tomo) => tomo.año || 0
      const yearCompare = getYear(b) - getYear(a)
      if (yearCompare !== 0) return yearCompare
      return romanoAEntero(b.tomo) - romanoAEntero(a.tomo)
    })[0]
  }

  return { 
    tomos, 
    tomosFaltantes,
    obtenerAñosUnicos,
    obtenerTomosPorAño,
    obtenerPortada,
    obtenerUltimoTomo,
    romanoAEntero
  }
}