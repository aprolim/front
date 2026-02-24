<template>
  <div class="tabs-container">
    <!-- Encabezado de pestañas - CON ESTILOS CORREGIDOS -->
    <div class="tabs-header">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { 'active': activeTab === tab.id }]"
        @click="activeTab = tab.id"
        :disabled="pending"
        :style="activeTab === tab.id ? activeTabStyle : {}"
      >
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Estado de carga -->
    <div v-if="pending" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando información...</p>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="refresh" class="retry-button">Reintentar</button>
    </div>

    <!-- Contenido de pestañas -->
    <div v-else class="tabs-content">
      <div 
        v-for="tab in tabs" 
        :key="tab.id"
        v-show="activeTab === tab.id"
        class="tab-pane fade-in"
      >
        <div class="section-header">
          <h2 class="section-title">{{ areas[tab.id]?.titulo || tab.label }}</h2>
          <p class="section-description">{{ areas[tab.id]?.descripcion || '' }}</p>
        </div>
        
        <div class="links-grid">
          <NuxtLink 
            v-for="link in getLinksForTab(tab.id)" 
            :key="link.id"
            :to="link.path" 
            class="link-card"
          >
            <div class="link-icon" v-html="link.icono"></div>
            <div class="link-content">
              <h3 class="link-title">{{ link.titulo }}</h3>
              <p class="link-description">{{ link.descripcion }}</p>
            </div>
            <div class="link-arrow">›</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// ==============================================
// CONFIGURACIÓN DE LA API
// ==============================================
const API_BASE_URL = 'http://10.0.0.20/api/tabs';

// Estilo para pestaña activa
const activeTabStyle = computed(() => ({
  background: '#706F6F',
  color: 'white'
}));

// ==============================================
// FETCH SSR - Se ejecuta en servidor y cliente
// ==============================================
const { data, pending, error, refresh } = await useFetch(API_BASE_URL, {
  server: true,
  lazy: false,
  cache: 'default',
  transform: (response) => {
    if (response?.success && response?.data) {
      return response.data;
    }
    if (response?.tabs) {
      return response;
    }
    console.warn('⚠️ Estructura de respuesta inesperada:', response);
    return {
      tabs: [],
      areas: {},
      links: {}
    };
  }
});

// ==============================================
// ESTADO REACTIVO
// ==============================================
const activeTab = ref('');

// ==============================================
// COMPUTED PROPERTIES
// ==============================================

// Tabs desde la API
const tabs = computed(() => {
  return data.value?.tabs || [
    { id: 'legislacion', label: 'Legislación', icono: '📋' },
    { id: 'fiscalizacion', label: 'Fiscalización', icono: '🔍' },
    { id: 'gestion', label: 'Gestión', icono: '⚙️' }
  ];
});

// Áreas desde la API
const areas = computed(() => {
  return data.value?.areas || {
    legislacion: {
      titulo: 'Área de Legislación',
      descripcion: 'Acceda a toda la información relacionada con los proyectos de ley y legislación'
    },
    fiscalizacion: {
      titulo: 'Área de Fiscalización',
      descripcion: 'Sistema de control y seguimiento de actividades institucionales'
    },
    gestion: {
      titulo: 'Área de Gestión',
      descripcion: 'Documentación y resoluciones de gestión institucional'
    }
  };
});

// Links desde la API
const rawLinks = computed(() => {
  return data.value?.links || {
    legislacion: [],
    fiscalizacion: [],
    gestion: []
  };
});

// ==============================================
// PROCESAR LINKS CON PATHS GENERADOS
// ==============================================
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

// ==============================================
// FUNCIONES AUXILIARES
// ==============================================

/**
 * Genera un path amigable para SEO basado en el título
 */
const generatePath = (tabId, item) => {
  try {
    const tab = tabs.value.find(t => t.id === tabId);
    
    const areaSlug = tab?.label
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || tabId;
    
    const itemSlug = item.titulo
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'item';
    
    return `/${areaSlug}/${itemSlug}`;
  } catch (err) {
    console.warn('Error generando path:', err);
    return `/${tabId}/item`;
  }
};

/**
 * Obtiene los links para una pestaña específica
 */
const getLinksForTab = (tabId) => {
  return linksPorTab.value[tabId] || [];
};

// ==============================================
// INICIALIZACIÓN
// ==============================================

// Establecer la primera pestaña como activa si hay tabs disponibles
if (tabs.value.length > 0 && !activeTab.value) {
  activeTab.value = tabs.value[0].id;
}

// ==============================================
// META TAGS PARA SEO
// ==============================================
useHead({
  title: 'Gestión Legislativa - Senado de Bolivia',
  meta: [
    {
      name: 'description',
      content: 'Acceda a toda la información sobre legislación, fiscalización y gestión del Senado de Bolivia'
    }
  ]
});

// ==============================================
// LOG DE DEPURACIÓN (solo en desarrollo)
// ==============================================
if (import.meta.dev) {
  watchEffect(() => {
    console.log('📊 Tabs Component - Datos cargados:', {
      tabs: tabs.value.length,
      areas: Object.keys(areas.value).length,
      links: Object.keys(rawLinks.value).reduce((acc, key) => {
        acc[key] = rawLinks.value[key]?.length || 0;
        return acc;
      }, {})
    });
  });
}
</script>

<style scoped>
.tabs-container {
  font-family: 'Montserrat', system-ui, -apple-system, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
}

/* Encabezado de pestañas - CORREGIDO */
.tabs-header {
  display: flex;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 0;
  border-bottom: 2px solid black;
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 22px 24px;
  background: #000;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  letter-spacing: 0.5px;
}

.tab-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.tab-button:hover:not(:disabled) {
  background: #575756;
}

.tab-button.active {
  color: white;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(224, 54, 54, 0.2);
}

.tab-button.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: black;
  border-radius: 2px 2px 0 0;
}

/* Estados de carga y error */
.loading-state, .error-state {
  text-align: center;
  padding: 60px 20px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #E03636;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state p {
  color: #E03636;
  margin-bottom: 20px;
  font-size: 16px;
}

.retry-button {
  background: #E03636;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #c02e2e;
}

/* Contenido de pestañas */
.tabs-content {
  padding: 36px;
  background: transparent;
  min-height: 500px;
}

.tab-pane {
  animation: fadeIn 0.4s ease-out;
}

/* Encabezado de sección - CORREGIDO */
.section-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 24px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #E03636;
  margin-bottom: 12px;
  letter-spacing: 0.5px;
}

.section-description {
  font-size: 16px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Grid de links */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

/* Tarjetas de link - CORREGIDAS */
.link-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 24px;
  text-decoration: none;
  color: inherit;
  border: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.link-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #E03636;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.link-card:hover {
  transform: translateY(-6px);
  border-color: #E03636;
  box-shadow: 0 12px 24px rgba(224, 54, 54, 0.1);
}

.link-card:hover::before {
  transform: scaleY(1);
}

/* Icono */
.link-icon {
  font-size: 32px;
  margin-right: 20px;
  color: #E03636;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.link-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.link-card:hover .link-icon {
  transform: scale(1.1) rotate(5deg);
}

/* Contenido del link */
.link-content {
  flex: 1;
}

.link-title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.4;
}

.link-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

/* Flecha indicadora */
.link-arrow {
  font-size: 28px;
  color: #E03636;
  margin-left: 16px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.link-card:hover .link-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.4s ease-out;
}

/* Responsive */
@media (max-width: 1024px) {
  .links-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .tabs-header {
    flex-direction: column;
  }
  
  .tab-button {
    padding: 20px;
    justify-content: flex-start;
    padding-left: 28px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  .tab-button.active {
    transform: translateX(4px);
  }
  
  .links-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .tabs-content {
    padding: 28px 20px;
  }
  
  .section-title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .tab-button {
    font-size: 15px;
    padding: 18px 20px;
  }
  
  .link-card {
    padding: 20px;
    flex-direction: column;
    text-align: center;
  }
  
  .link-icon {
    margin-right: 0;
    margin-bottom: 16px;
  }
  
  .link-content {
    margin-bottom: 16px;
  }
  
  .link-arrow {
    margin-left: 0;
  }
  
  .section-header {
    margin-bottom: 30px;
  }
  
  .section-title {
    font-size: 22px;
  }
  
  .section-description {
    font-size: 14px;
  }
}
</style>