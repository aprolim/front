// composables/useRedactorTomos.js
export const useRedactorTomos = () => {
  const tomos = [
    {
      tomo: "I",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_I_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "I",
      periodo: "2025-2026",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_I_2025-2026.pdf",
      disponible: true
    },
    {
      tomo: "II",
      periodo: "2023",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_II_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "III",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_III_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "IV",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_IV_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "V",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_V_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "VI",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_VI_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "VII",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_VII_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "VIII",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_VIII_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "IX",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_IX_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "X",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_X_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "XI",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_XI_2023-2024.pdf",
      disponible: true
    },
    {
      tomo: "XII",
      periodo: "2023-2024",
      pdfUrl: "/pdfs/redactor/REDACTOR_TOMO_XII_2023-2024.pdf",
      disponible: true
    }
    // Tomos faltantes (ejemplo: XIII, XIV, etc. - no disponibles)
  ]

  const tomosFaltantes = [
    { tomo: "XIII", periodo: "No publicado", disponible: false },
    { tomo: "XIV", periodo: "No publicado", disponible: false }
  ]

  return { tomos, tomosFaltantes }
}