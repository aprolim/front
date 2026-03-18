<!-- pages/detalle-proyecto/[id].vue -->
<template>
  <div class="proyecto-detalle">
    <!-- Header -->
    <h1>{{ proyecto.titulo }}</h1>
    
    <!-- Barra de navegación de secciones -->
    <div class="secciones-nav bg-gray-100 p-4 sticky top-0">
      <button @click="scrollToSection('info')">Información</button>
      <button @click="scrollToSection('debates')">Debates</button>
      <button @click="scrollToSection('votaciones')">Votaciones</button>
      <button @click="scrollToSection('comentarios')">Comentarios</button>
      <button @click="scrollToSection('documentos')">Documentos</button>
    </div>
    
    <!-- Secciones con IDs -->
    <section id="info" class="seccion">
      <h2>Información General</h2>
      <p>{{ proyecto.descripcion }}</p>
    </section>
    
    <section id="debates" class="seccion">
      <h2>Debates</h2>
      <div v-for="debate in proyecto.debates" :key="debate.id">
        {{ debate.titulo }}
      </div>
    </section>
    
    <section id="votaciones" class="seccion">
      <h2>Votaciones</h2>
      <!-- contenido -->
    </section>
    
    <section id="comentarios" class="seccion">
      <h2>Comentarios</h2>
      <div v-for="comentario in proyecto.comentarios" :key="comentario.id">
        {{ comentario.texto }}
      </div>
    </section>
    
    <section id="documentos" class="seccion">
      <h2>Documentos</h2>
      <!-- contenido -->
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Datos del proyecto (simulados)
const proyecto = ref({})

// Cargar datos del proyecto
const { id } = route.params
const { seccion } = route.query // Leer el query parameter

// Función para hacer scroll a una sección
const scrollToSection = (sectionId, options = { behavior: 'smooth' }) => {
  console.log(`📜 Haciendo scroll a: #${sectionId}`)
  
  // Esperar a que el DOM esté listo
  setTimeout(() => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Opcional: Resaltar la sección
      element.classList.add('highlight-section')
      setTimeout(() => {
        element.classList.remove('highlight-section')
      }, 2000)
    } else {
      console.warn(`⚠️ No se encontró el elemento con id: ${sectionId}`)
    }
  }, 300) // Pequeño delay para asegurar que el DOM cargó
}

// Cuando el componente se monta
onMounted(async () => {
  // Cargar datos del proyecto
  await cargarProyecto(id)
  
  // Si hay una sección en el query, hacer scroll
  if (route.query.seccion) {
    scrollToSection(route.query.seccion)
  }
  
  // Si hay un hash, también hacer scroll (por si acaso)
  if (route.hash) {
    const hashId = route.hash.substring(1) // quitar el #
    scrollToSection(hashId)
  }
})

// Watch para cuando cambia la ruta (por si navegas dentro de la misma página)
watch(() => route.query.seccion, (nuevaSeccion, viejaSeccion) => {
  if (nuevaSeccion && nuevaSeccion !== viejaSeccion) {
    scrollToSection(nuevaSeccion)
  }
})

// Función para actualizar la URL sin recargar
const cambiarSeccion = (seccionId) => {
  router.push({
    query: { ...route.query, seccion: seccionId },
    hash: `#${seccionId}`
  })
  // El scroll se hará automáticamente por el watch
}
</script>

<style scoped>
.seccion {
  min-height: 500px;
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;
}

.highlight-section {
  background-color: #fff3cd;
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
}

.secciones-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.secciones-nav button {
  padding: 8px 16px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.secciones-nav button:hover {
  background-color: #d0d0d0;
  transform: translateY(-2px);
}
</style>