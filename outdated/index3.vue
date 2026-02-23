<template>
  <div>
    <h1>Mi Página con el Hemiciclo</h1>
    
    <!-- <SenateChamber
      :senators="misSenadores"
      :parties="misPartidos"
      :background-image="miImagenFondo"
      :show-footer="true"
      @senator-selected="handleSenatorSelected"
    > -->
    <SenateChamber
      :show-footer="false"
      @senator-selected="handleSenatorSelected"
    >
      <template #header>
        <div class="custom-header">
          <h2>Distribución del Senado 2024</h2>
          <p>Selecciona un senador para ver detalles</p>
        </div>
      </template>
    </SenateChamber>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SenateChamber from '@/components/SenateChamber.vue'

// Tus datos personalizados
const misSenadores = ref([
  // ... tus datos de senadores
])

const misPartidos = ref([
  // ... tus datos de partidos
])

const backgroundImage = 'https://images.unsplash.com/photo-1689308271305-58e75832289b?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

const handleSenatorSelected = (senator) => {
  console.log('Senador seleccionado:', senator)
}
</script>