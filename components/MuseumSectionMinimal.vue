<template>
  <section class="museum-section text-[.4em] sm:text-[.6em] md:text-[clamp(6px,1.2vw,90px)]">
    <!-- Sección con imagen de fondo -->
    <div class="background-image-section">
      
      <!-- Título: franja roja completa con texto blanco -->
      <div class="title-red-stripe">
        <div class="title-container">
          <h1 class="section-title py-[.40em]">
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
        <div class="content-column pr-[5em]">
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

.museum-section {
  font-family: 'Montserrat', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  width: 100%;
}
.sub-title{
  font-size: 2em;
  font-weight: 700;
  color: #575756;
}

/* Sección con imagen de fondo */
.background-image-section {
  /* background-image: url('./Recurso2.png'); */
  /* background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  min-height: 600px;
  position: relative;
  width: 100%;
}

/* FRANJA ROJA COMPLETA para el título */
.title-red-stripe {
  background-color: #E03636;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  color: white;
}

/* Contenedor para centrar el texto dentro de la franja */
.title-container {
  width: 100%;
  padding: 0 2em;
}

/* Título blanco dentro de la franja roja */
.section-title {
  font-size: 2.5em;
  font-weight: 700;
  margin: 0;
  text-align: center;
  /* text-transform: uppercase; */
  /* letter-spacing: 1px; */
}

/* Wrapper principal - empieza después de la franja roja */
.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  display: grid;
  grid-template-columns: 38% 62%; /* Col 1: 40%, Col 2: 60% */
  gap: 0;
  min-height: 520px; /* Altura total menos la franja */
}

/* Columna 1: Vacía (más angosta) */
.empty-column {
  /* Solo ocupa espacio */
  /* background-image: url('./Recurso3.png'); */
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
  padding: 2em 0;
  width: 100%;
  margin-left: auto; /* Empuja a la derecha*/
  margin-right: auto;/* Más espacio del borde derecho*/
}

.museum-description {
  font-size: 1.2em;
  line-height: 1.7;
  color: var(--white);
  margin-bottom: 2.5em;
  font-weight: 400;
  /* text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); */
  color: #575756;
}

/* Botón rojo con letras blancas */
.continue-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75em;
  background-color: #E03636;
  color: white;
  border: none;
  padding: .5em .8em;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); */
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

</style>