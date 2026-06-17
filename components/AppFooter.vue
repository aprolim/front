<template>
  <footer class="back-image w-full footer-section">
    <div class="mx-auto">
      <div class="text-center">
        <!-- Escudo superior -->
        <div class="flex items-center justify-center gap-3 py-8">
          <div class="flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 3xl:w-48 3xl:h-48 4xl:w-64 4xl:h-64 5xl:w-96 5xl:h-96">
            <!-- ✅ IMAGEN CON REINTENTOS AUTOMÁTICOS -->
            <SafeImage 
              src="/2R.png" 
              alt="Escudo Senado Nacional"
              image-class="w-full h-full object-cover"
              :max-retries="8"
              :persistent="true"
              loading-strategy="eager"
            />
          </div>
        </div>
        
        <!-- Franja roja inferior con información -->
        <div class="sub-footer py-8 text-[.1em] sm:text-[.4em] md:text-[.6em] lg:text-[.7em] xl:text-[.8em] 2xl:text-[1em] 3xl:text-[1.2em] 4xl:text-[1.6em] 5xl:text-[2.5em]">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-12 gap-6 items-center">
              <!-- Columna izquierda -->
              <div class="col-span-3 flex items-center justify-start space-x-3">
                <!-- ✅ IMAGEN CON REINTENTOS AUTOMÁTICOS -->
                <SafeImage 
                  src="/footer-img/Recurso 8.png" 
                  alt="Senado Bolivia"
                  image-class="h-[2em] w-auto object-contain"
                  :max-retries="8"
                  :persistent="true"
                  loading-strategy="lazy"
                />
                <div>
                  <a href="https://diputados.gob.bo/" target="_blank" class="text-white hover:underline">https://diputados.gob.bo/</a>
                </div>
              </div>
              
              <!-- Columna central -->
              <div class="col-span-6 text-center">
                <p>Calle Comercio esquina Colón - Telf.: (591) 2158701 - www.senado.gob.bo - La Paz - Bolivia</p>
              </div>
              
              <!-- Columna derecha -->
              <div class="col-span-3 flex items-center justify-end space-x-3">
                <!-- ✅ IMAGEN CON REINTENTOS AUTOMÁTICOS -->
                <SafeImage 
                  src="/footer-img/Recurso 7.png" 
                  alt="Escudo Senado"
                  image-class="h-[2.5em] w-auto object-contain"
                  :max-retries="8"
                  :persistent="true"
                  loading-strategy="lazy"
                />
                <div class="text-right">
                  <a href="https://www.vicepresidencia.gob.bo/" target="_blank" class="text-white hover:underline">https://www.vicepresidencia.gob.bo/</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import SafeImage from '@/components/SafeImage.vue'
</script>

<style scoped>
.footer-section {
  width: 100%;
  flex-shrink: 0;
  min-height: 250px;
  position: relative;
  z-index: 10;
  /* SIN propiedades de snap */
}

.back-image {
  background-image: url('/footer-main.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(224, 54, 54, 0.7);
}

.sub-footer {
  background-color: rgba(198, 18, 16, 0.6);
}
</style>