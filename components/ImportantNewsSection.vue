<template>
  <div class="tabs-container font-montserrat mx-auto rounded-[24px] overflow-hidden isolate">
    <!-- Header de Tabs -->
    <div class="tabs-header flex flex-row border-b-2 border-black">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="[
          'tab-button w-full sm:flex-1 flex items-center justify-center bg-black border-none text-white font-semibold cursor-pointer transition-all duration-300',
          'gap-0.5 sm:gap-1',
          'px-1 py-1 sm:px-2 sm:py-1.5 md:px-3 md:py-2 lg:px-4 lg:py-3 xl:px-5 xl:py-4',
          'text-[7px] sm:text-[8px] md:text-[11px] lg:text-[14px] xl:text-[17px] 2xl:text-[20px] 3xl:text-[26px] 4xl:text-[38px] 5xl:text-[57px]',
          { 'active bg-[#706F6F]': activeTab === tab.id }
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
        <div class="section-header text-center pb-0.5 sm:pb-1 mb-1 sm:mb-2 border-b border-[#E03636] border-opacity-30">
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
              hover:-translate-y-0.5 hover:bg-opacity-95 transition-all duration-300
              text-gray-900 no-underline"
          >
            <!-- Icono con control de tamaño responsivo usando solo Tailwind -->
            <div 
              class="link-icon text-[#E03636] flex-shrink-0 
                m-2.5
                sm:m-3
                md:m-3
                lg:m-4
                xl:m-5
                2xl:m-6
                3xl:m-8
                4xl:m-10
                5xl:m-12
                w-4 h-4
                sm:w-6 sm:h-6              
                md:w-7 md:h-7           
                lg:w-8 lg:h-8           
                xl:w-10 xl:h-10            
                2xl:w-12 2xl:h-12          
                3xl:w-16 3xl:h-16
                4xl:w-20 4xl:h-20
                5xl:w-28 5xl:h-28"
              v-html="link.icono"
            ></div>
            
            <div class="link-content flex-1 min-w-0">
              <h3 class="link-title font-semibold text-gray-900 
                text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[13px] 2xl:text-[17px] 3xl:text-[22px] 4xl:text-[32px] 5xl:text-[50px] 
                mb-0 leading-tight truncate">
                {{ link.titulo }}
              </h3>
              <p class="link-description text-gray-600 
                text-[5px] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[12px] 2xl:text-[16px] 3xl:text-[19px] 4xl:text-[30px] 5xl:text-[45px]
                leading-tight line-clamp-2">
                {{ link.descripcion }}
              </p>
            </div>
            
            <div class="link-arrow text-[#E03636] ml-0.5 flex-shrink-0
              text-[10px] sm:text-[12px] md:text-[13px] lg:text-[15px] xl:text-[18px] 2xl:text-[22px] 3xl:text-[27px] 4xl:text-[35px] 5xl:text-[70px]">
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

const API_BASE_URL = 'http://10.0.0.20/api/tabs';

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
  try {
    const tab = tabs.value.find(t => t.id === tabId);
    const areaSlug = tab?.label?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || tabId;
    const itemSlug = item.titulo?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'item';
    return `/${areaSlug}/${itemSlug}`;
  } catch (err) { return `/${tabId}/item`; }
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

/* ESTILOS PARA ICONOS SVG - heredan tamaño del contenedor */
.link-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.link-icon svg {
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  transition: cubic-bezier(0.785, 0.135, 0.15, 0.86);
}

/* Utilidades adicionales de Tailwind que necesitamos */
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
</style>