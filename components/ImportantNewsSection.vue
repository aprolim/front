<template>
  <div class="tabs-container font-montserrat mx-auto rounded-[24px] overflow-hidden isolate">
    <!-- Header de Tabs -->
    <div class="text-center mb-4 xs:mb-5 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12 2xl:mb-16">
      <h2 class="font-bold text-white leading-tight [text-shadow:_0_0_2px_#000] 
      inline-block text-[16px] xs:text-[14px] sm:text-[22px] md:text-[28px] lg:text-[36px] xl:text-[42px] 2xl:text-[60px] 3xl:text-[70px] 4xl:text-[90px] 5xl:text-[120px]">
        <span>
          Gesti&oacute;n
        </span>
        <span class="text-[#E03636] ml-1 sm:ml-2">
          Legislativa
        </span>
      </h2>
      <!-- <p class="mx-auto text-gray-600 text-[12px] xs:text-[10px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] 2xl:text-[28px] 4xl:text-[36px] 5xl:text-[52px] px-4" 
          style="text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
        {{ subtitle }}
      </p> -->
    </div>

    <!-- Header de Tabs con bordes redondeados -->
    <div class="tabs-header flex flex-row">
      <button 
        v-for="(tab, index) in tabs" 
        :key="tab.id"
        :class="[
          'tab-button w-full sm:flex-1 flex items-center justify-center bg-black border-none text-white font-semibold cursor-pointer transition-all duration-300',
          'gap-0.5 sm:gap-1',
          'px-1 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4',
          'text-[7px] sm:text-[8px] md:text-[11px] lg:text-[14px] xl:text-[17px] 2xl:text-[20px] 3xl:text-[26px] 4xl:text-[38px] 5xl:text-[57px]',
          index === 0 ? 'rounded-le-[24px]' : '',
          index === tabs.length - 1 ? 'rounded-ri-[24px]' : '',
          { 
            'active bg-[#706F6F]': activeTab === tab.id,
            'hover:bg-[#3A3A3A]': activeTab !== tab.id
          }
        ]"
        @click="activeTab = tab.id"
        :disabled="pending"
        :style="activeTab === tab.id ? activeTabStyle : {}"
      >
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Estado de Carga -->
    <div v-if="pending" class="loading-state flex flex-col items-center justify-center min-h-[80px]">
      <div class="spinner w-4 h-4 border-2 border-gray-200 border-t-[#E03636] rounded-full animate-spin mb-0.5"></div>
      <p class="text-[6px] sm:text-[7px] md:text-[8px]">Cargando...</p>
    </div>

    <!-- Estado de Error -->
    <div v-else-if="error" class="error-state text-center min-h-[80px] flex flex-col items-center justify-center">
      <p class="text-red-600 text-[6px] sm:text-[7px] md:text-[8px] mb-0.5">{{ error }}</p>
      <button @click="refresh" class="retry-button bg-[#E03636] text-white rounded hover:bg-opacity-90 transition px-1 py-0.5 text-[5px] sm:text-[6px] md:text-[7px]">
        Reintentar
      </button>
    </div>

    <!-- Contenido de Tabs -->
    <div v-else class="tabs-content px-1 sm:px-2 md:px-3 lg:px-4 xl:px-5 py-2 sm:py-3 md:py-4 lg:py-5 xl:py-6 min-h-[150px] md:min-h-[180px] lg:min-h-[250px] 2xl:min-h-[320px] 3xl:min-h-[360px] 4xl:min-h-[450px] 5xl:min-h-[550px]">
      <div 
        v-for="tab in tabs" 
        :key="tab.id"
        v-show="activeTab === tab.id"
        class="tab-pane fade-in"
      >
        <!-- Header de Sección -->
        <div class="section-header text-center pb-0.5 sm:pb-1 mb-1 sm:mb-2">
          <h2 class="section-title font-bold text-[#E03636] text-[9px] sm:text-[10px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[19px] 3xl:text-[24px] 4xl:text-[35px] 5xl:text-[52px] mb-0">
            {{ areas[tab.id]?.titulo || tab.label }}
          </h2>
          <p class="section-description text-gray-600 text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[11px] 2xl:text-[16px] 3xl:text-[19px] 4xl:text-[30px] 5xl:text-[45px] mx-auto">
            {{ areas[tab.id]?.descripcion || '' }}
          </p>
        </div>
        
        <!-- Grid de Tarjetas -->
        <div class="links-grid grid gap-1 sm:gap-1.5 md:gap-2 xl:gap-4 3xl:gap-6 5xl:gap-9 grid-cols-3">
          <NuxtLink 
            v-for="link in getLinksForTab(tab.id)" 
            :key="link.id"
            :to="link.path" 
            class="link-card flex items-center bg-white bg-opacity-85 backdrop-blur-[10px] 
              rounded-sm sm:rounded-md md:rounded-lg lg:rounded-xl shadow-sm hover:shadow-md 
              p-1 sm:p-1.5 md:p-2
              hover:-translate-y-0.5 transition-all duration-300
              text-gray-900 no-underline
              group"
            @mouseenter="hoveredCard = link.id"
            @mouseleave="hoveredCard = null"
          >
            <!-- Contenedor del icono con tamaño fijo -->
            <div 
              class="icon-container flex-shrink-0 
                m-2.5 sm:m-3 md:m-3 lg:m-4 xl:m-5 2xl:m-6 3xl:m-8 4xl:m-10 5xl:m-12
                w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 
                2xl:w-20 2xl:h-20 3xl:w-24 3xl:h-24 4xl:w-28 4xl:h-28 5xl:w-32 5xl:h-32
                rounded-full transition-all duration-300"
              :class="{
                'bg-[#E03636]': hoveredCard === link.id,
                'scale-110': hoveredCard === link.id
              }"
            >
              <div 
                class="w-full h-full flex items-center justify-center transition-colors duration-300"
                :class="hoveredCard === link.id ? 'text-white' : 'text-[#E03636]'"
              >
                <!-- Inyectamos el SVG y forzamos su tamaño -->
                <div class="svg-wrapper w-[97%] h--[97%]" v-html="link.icono"></div>
              </div>
            </div>
            
            <div class="link-content flex-1 min-w-0">
              <h3 class="link-title font-semibold text-gray-900
                text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[13px] 
                2xl:text-[17px] 3xl:text-[22px] 4xl:text-[32px] 5xl:text-[50px] 
                mb-0 leading-tight truncate">
                {{ link.titulo }}
              </h3>
              <p class="link-description text-gray-600
                text-[5px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[12px] 
                2xl:text-[16px] 3xl:text-[19px] 4xl:text-[30px] 5xl:text-[45px]
                leading-tight line-clamp-2">
                {{ link.descripcion }}
              </p>
            </div>
            
            <div class="link-arrow text-[#E03636] ml-0.5 flex-shrink-0
              text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[18px] 
              2xl:text-[22px] 3xl:text-[27px] 4xl:text-[35px] 5xl:text-[70px]">
              ›
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Estado para controlar qué tarjeta está en hover
const hoveredCard = ref(null);

const API_BASE_URL = 'http://demoback.senado.gob.bo/api/tabs';
const activeTabStyle = computed(() => ({
  background: '#706F6F',
  color: 'white'
}));

const { data, pending, error, refresh } = await useFetch(API_BASE_URL, {
  server: true,
  lazy: false,
  cache: 'default',
  transform: (response) => {
    if (response?.success && response?.data) return response.data;
    if (response?.tabs) return response;
    return { tabs: [], areas: {}, links: {} };
  }
});

const activeTab = ref('');

const tabs = computed(() => data.value?.tabs || []);
const areas = computed(() => data.value?.areas || {});
const rawLinks = computed(() => data.value?.links || {});

const linksPorTab = computed(() => {
  const processed = {};
  if (rawLinks.value) {
    Object.keys(rawLinks.value).forEach(tabId => {
      processed[tabId] = (rawLinks.value[tabId] || []).map(item => ({
        ...item,
        path: generatePath(tabId, item)
      }));
    });
  }
  return processed;
});

const generatePath = (tabId, item) => {
  // ✅ PRIORIDAD 1: Si el item ya tiene un path, usarlo directamente
  if (item.path) {
    console.log('📌 Usando path existente:', item.path);
    return item.path;
  }
  
  // ✅ PRIORIDAD 2: Si no hay path, generar uno (solo por si acaso)
  try {
    const tab = tabs.value.find(t => t.id === tabId);
    const areaSlug = tab?.label?.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || tabId;
    const itemSlug = item.titulo?.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
    return `/${areaSlug}/${itemSlug}`;
  } catch (err) { 
    return `/${tabId}/item`; 
  }
};
const getLinksForTab = (tabId) => linksPorTab.value[tabId] || [];

if (tabs.value.length > 0 && !activeTab.value) activeTab.value = tabs.value[0].id;

useHead({
  title: 'Gestión Legislativa - Senado de Bolivia',
  meta: [{ name: 'description', content: 'Acceda a toda la información sobre legislación...' }]
});
</script>

<style scoped>
/* Animación de fade in */
@keyframes fadeIn { 
  from { 
    opacity: 0; 
    transform: translateY(5px); 
  } 
  to { 
    opacity: 1; 
    transform: translateY(0); 
  } 
}

.fade-in { 
  animation: fadeIn 0.2s ease-out; 
}

/* Spinner personalizado */
.spinner {
  border-radius: 50%;
  border: 2px solid #e2e8f0;
  border-top-color: #E03636;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Para compatibilidad con navegadores antiguos */
.tabs-container {
  isolation: isolate;
}

/* Soporte para backdrop-filter */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-\[10px\] {
    backdrop-filter: blur(10px);
  }
}

/* ESTILOS PARA ICONOS SVG */
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Wrapper para forzar el tamaño del SVG */
.svg-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-wrapper svg {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  display: block !important;
}

/* Eliminamos los width/height fijos de los SVG inyectados */
.svg-wrapper svg[width],
.svg-wrapper svg[height] {
  width: 100% !important;
  height: 100% !important;
}

/* Clases para el hover - basado en el estado de la tarjeta */
.bg-\[\#E03636\] {
  background-color: #E03636 !important;
}

.scale-110 {
  transform: scale(1.1) !important;
}

.text-white {
  color: white !important;
}

.text-\[\#E03636\] {
  color: #E03636 !important;
}

/* Aseguramos que el hover funcione en toda la tarjeta */
.link-card {
  cursor: pointer;
}

/* Utilidades adicionales */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.min-w-0 {
  min-width: 0;
}

/* Bordes redondeados */
.rounded-le-\[24px\] {
  border-top-left-radius: 24px;
}

.rounded-ri-\[24px\] {
  border-top-right-radius: 24px;
}
</style>