<template>
  <section class="museum-section">
    <!-- Sección con imagen de fondo -->
    <div class="background-image-section">
      
      <!-- Título: franja roja completa con texto blanco -->
      <div class="title-red-stripe">
        <div class="title-container">
          <h1 class="section-title">
            Museo Hist&oacute;rico
          </h1>
        </div>
      </div>
      
      <!-- Contenido con dos columnas -->
      <div class="content-wrapper">
        <!-- Columna 1 vacía (más angosta) -->
        <div class="empty-column">
        </div>
        
        <!-- Columna 2 con contenido (más ancha) -->
        <div class="content-column">
          <!-- Contenido TRANSPARENTE (sin fondo, sin blur) -->
          <div class="transparent-content">
            <h3 class="sub-title">Institución Oficial del Senado</h3>
            <p class="museum-description">
              El Museo Histórico del Senado es una institución dedicada a preservar, 
              investigar y difundir el patrimonio histórico y cultural relacionado 
              con la actividad parlamentaria de Bolivia. Nuestras colecciones incluyen 
              documentos históricos, objetos ceremoniales, arte y archivos que narran 
              la evolución del sistema legislativo boliviano.
            </p>
            
            <!-- Botón rojo con letras blancas -->
            <button class="continue-button">
              M&aacute;s informaci&oacute;n
              <svg class="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  darkMode: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
/* Variables */
:root {
  --primary-red: #E03636;
  --primary-gold: #E4D294;
  --white: #ffffff;
}

/* Reset y base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.museum-section {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  width: 100%;
}
.sub-title{
  font-size: 2rem;
  font-weight: 700;
  color: #575756;
}

/* Sección con imagen de fondo */
.background-image-section {
  background-image: url('./Recurso2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 600px;
  position: relative;
  width: 100%;
  padding-top: 80px; /* Espacio para la franja roja */
}

/* FRANJA ROJA COMPLETA para el título */
.title-red-stripe {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  color: white;
}

/* Contenedor para centrar el texto dentro de la franja */
.title-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 2rem;
}

/* Título blanco dentro de la franja roja */
.section-title {
  color: var(--white);
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  text-align: center;
  /* text-transform: uppercase; */
  letter-spacing: 1px;
}

/* Wrapper principal - empieza después de la franja roja */
.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  display: grid;
  grid-template-columns: 40% 60%; /* Col 1: 40%, Col 2: 60% */
  gap: 0;
  min-height: 520px; /* Altura total menos la franja */
}

/* Columna 1: Vacía (más angosta) */
.empty-column {
  /* Solo ocupa espacio */
  background-image: url('./Recurso3.png');
  background-size: cover; /* Cubre todo el contenedor */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* No repetir */
  background-attachment: fixed;
  display: block;
  width: 100%;
}

/* Columna 2: Con contenido - EMPUJADA A LA DERECHA */
.content-column {
  display: flex;
  width: 100%;
  padding-left: 0;
}

/* Contenido TRANSPARENTE - más a la derecha */
.transparent-content {
  background: transparent; /* Sin fondo */
  backdrop-filter: none; /* Sin blur */
  -webkit-backdrop-filter: none;
  padding: 2rem 0;
  width: 100%;
  max-width: 550px; /* Ancho máximo del contenido */
  margin-left: auto; /* Empuja a la derecha */
  margin-right: 8%; /* Más espacio del borde derecho */
}

.museum-description {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--white);
  margin-bottom: 2.5rem;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  color: #575756;
}

/* Botón rojo con letras blancas */
.continue-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--primary-red);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: red;
}

.continue-button:hover {
  background-color: #c22e2e;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}

.button-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s;
}

.continue-button:hover .button-arrow {
  transform: translateX(5px);
}

/* Responsive */
@media (max-width: 1200px) {
  .content-wrapper {
    grid-template-columns: 35% 65%;
  }
  
  .transparent-content {
    margin-right: 5%;
    max-width: 500px;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 1024px) {
  .background-image-section {
    min-height: 550px;
    padding-top: 70px;
  }
  
  .title-red-stripe {
    height: 70px;
  }
  
  .content-wrapper {
    grid-template-columns: 1fr;
    min-height: 480px;
  }
  
  .empty-column {
    display: none;
  }
  
  .content-column {
    justify-content: flex-end;
    padding-right: 40px;
  }
  
  .transparent-content {
    margin-right: 0;
    max-width: 500px;
    text-align: left;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .background-image-section {
    min-height: 500px;
    padding-top: 60px;
  }
  
  .title-red-stripe {
    height: 60px;
  }
  
  .content-wrapper {
    min-height: 440px;
  }
  
  .content-column {
    padding-right: 30px;
    padding-left: 30px;
    justify-content: center;
  }
  
  .transparent-content {
    max-width: 100%;
    text-align: center;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .museum-description {
    font-size: 1.1rem;
  }
  
  .continue-button {
    padding: 0.875rem 2rem;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .background-image-section {
    min-height: 450px;
    padding-top: 50px;
  }
  
  .title-red-stripe {
    height: 50px;
  }
  
  .content-wrapper {
    min-height: 400px;
  }
  
  .content-column {
    padding-right: 20px;
    padding-left: 20px;
  }
  
  .section-title {
    font-size: 1.6rem;
    letter-spacing: 0.5px;
  }
  
  .transparent-content {
    padding: 1.5rem 0;
  }
  
  .museum-description {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .continue-button {
    width: 100%;
    justify-content: center;
    padding: 1rem;
  }
}
</style>