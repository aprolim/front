// components/data/senateChamberStyles.js
// Este archivo contiene SOLO los estilos responsivos (media queries)

export const responsiveStyles = `
/* ========== MEDIA QUERIES RESPONSIVAS ========== */

/* Pantallas grandes (hasta 1200px) */
@media (max-width: 1200px) {
  .columns-container { 
    grid-template-columns: 220px 1fr 320px; 
    gap: 1rem; 
    padding: 1rem; 
  }
  .left-column { width: 220px; }
  .right-column { width: 320px; }
}

/* Tablets horizontales / laptops pequeñas (hasta 1024px) */
@media (max-width: 1024px) {
  .columns-container { 
    grid-template-columns: 1fr; 
    grid-template-rows: auto auto auto; 
    gap: 1rem; 
  }
  .left-column, .center-column, .right-column { width: 100%; }
  .left-column { max-height: 300px; }
  .hemicycle-container { min-height: 400px; }
  .right-column { max-height: 500px; }
}

/* Tablets verticales (hasta 768px) */
@media (max-width: 768px) {
  .columns-container { 
    gap: 0.75rem; 
    padding: 0.75rem; 
  }
  .hemicycle-container { min-height: 350px; }
  .senator-photo-circle { 
    width: 120px; 
    height: 120px; 
  }
  .photo-placeholder { font-size: 2rem; }
  .senator-name { font-size: 1.2rem; }
}

/* Móviles grandes (hasta 480px) */
@media (max-width: 480px) {
  .columns-container { 
    gap: 0.5rem; 
    padding: 0.5rem; 
  }
  .hemicycle-container { min-height: 300px; }
  .controls-panel { padding: 0.75rem; }
  .senator-photo-circle { 
    width: 100px; 
    height: 100px; 
  }
  .photo-placeholder { font-size: 1.8rem; }
  .senator-name { font-size: 1.1rem; }
  .info-row-first, .info-row-second { 
    grid-template-columns: 1fr; 
    gap: 0.75rem; 
  }
  .social-icons { gap: 0.75rem; }
  .social-icon { 
    font-size: 1.3rem; 
    width: 35px; 
    height: 35px; 
  }
}

/* Móviles pequeños (hasta 360px) */
@media (max-width: 360px) {
  .senator-photo-circle { 
    width: 80px; 
    height: 80px; 
  }
  .photo-placeholder { font-size: 1.5rem; }
  .senator-name { font-size: 1rem; }
  .pill-red, .pill-white { 
    font-size: 0.7rem; 
    padding: 0.15rem 0.2rem; 
  }
}
`