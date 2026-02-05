<!-- components/UI/InstitutionalButton.vue -->
<template>
  <NuxtLink 
    :to="to" 
    class="ghost px-8 py-4 backdrop-blur-sm text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 group relative"
    :class="variant"
    :title="tooltip"
    :aria-label="ariaLabel"
  >
    <slot name="icon">
      <svg class="w-12 h-12 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </slot>
    
    <!-- Tooltip dinámico -->
    <div v-if="showTooltip" class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg">
      {{ tooltip }}
      <!-- Triángulo del tooltip -->
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
    
    <!-- Badge adicional -->
    <div v-if="badge" class="absolute -top-2 -right-2 bg-gradient-to-r from-[#8B1A1A] to-[#5C1010] text-white text-xs font-bold px-3 py-1 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-200 whitespace-nowrap shadow-lg border border-white/20">
      {{ badge }}
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    default: '/la-institucion'
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'with-badge', 'with-tooltip-bottom'].includes(value)
  },
  tooltip: {
    type: String,
    default: 'Ver información institucional'
  },
  ariaLabel: {
    type: String,
    default: 'Información Institucional del Senado'
  },
  badge: {
    type: String,
    default: ''
  },
  showTooltip: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
/* Variantes del botón */
.ghost {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.ghost:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Efecto de shimmer opcional */
.with-shimmer {
  position: relative;
  overflow: hidden;
}

.with-shimmer::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: transform 0.6s;
  opacity: 0;
}

.with-shimmer:hover::after {
  transform: rotate(45deg) translate(50%, 50%);
  opacity: 1;
}
</style>