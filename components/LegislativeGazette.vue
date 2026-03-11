<!-- components/LegislativeGazette.vue -->
<template>
  <div class="w-full min-h-screen flex flex-col bg-gray-50">
    <div class="relative  overflow-hidden mt-[4.2vw]">
        <h2 class="font-bold text-white leading-tight
                    text-[11px] xs:text-[14px] sm:text-[18px] md:text-[22px] 
                    lg:text-[26px] xl:text-[30px] 2xl:text-[39px] 
                    3xl:text-[58px] 4xl:text-[80px] 5xl:text-[102px] text-center
                    p-1 bg-[#E03636] shadow-2xl
                    ">
            Gaceta Legislativa 
        </h2>
    </div>

    <!-- Contenedor de 2 columnas -->
    <div class="flex-1 mx-auto px-4 pt-[4vw] ">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mx-auto">
      
        <!-- COLUMNA 1: Informe de gestion -->
        <div class="flex flex-col h-full group px-[6vw]">
          <!-- Imagen con overlay y efectos -->
          <div class="relative w-full h-[26vw] overflow-hidden shadow-xl mb-6 bg-white p-[0.6em]">
            <img 
              src="/images/gaceta-oficial.jpg" 
              alt="Gaceta Oficial" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          <!-- Botón Ver más centrado debajo de la imagen -->
          <div class="flex justify-center">
            <NuxtLink 
              to="/gaceta-oficial" 
              class="bg-[#E03636] hover:bg-[#C12F2F] text-white font-bold py-[.4em] px-[0.8em] rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Ver más
            </NuxtLink>
          </div>
        </div>

        <!-- COLUMNA 2: redactor -->
        <div class="flex flex-col h-full group px-[6vw]">
          <!-- Imagen con overlay y efectos -->
          <div class="relative w-full h-[26vw] overflow-hidden shadow-xl mb-6 bg-white p-[0.6em]">
            <img 
              src="/images/gaceta-historica.jpg" 
              alt="Gaceta Histórica" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
           
            
          </div>
          
          <!-- Botón Ver más centrado debajo de la imagen -->
          <div class="flex justify-center">
            <NuxtLink 
              to="/gaceta-historica" 
              class="bg-[#E03636] hover:bg-[#C12F2F] text-white font-bold py-[.4em] px-[0.8em] rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Ver más
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Este componente no necesita lógica específica
// Las rutas pueden ajustarse según sea necesario
</script>

<style scoped>
/* Animación para el borde de la franja */
@keyframes gentleGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(224, 54, 54, 0.2); }
  50% { box-shadow: 0 0 25px rgba(224, 54, 54, 0.4); }
}

.full-width-franja {
  animation: gentleGlow 3s ease-in-out infinite;
}

/* Asegurar que las columnas tengan la misma altura */
.grid > div {
  height: 100%;
}

/* Hover effects para los botones */
a {
  transition: all 0.3s ease;
}

a:hover {
  transform: translateY(-2px);
}
</style>