<template>
  <div class="tabs-container">
    <!-- Encabezado de pestañas -->
    <div class="tabs-header">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { 'active': activeTab === tab.id }]"
        @click="activeTab = tab.id"
        :disabled="pending"
      >
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Estado de carga (solo visible durante la navegación cliente) -->
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
const API_BASE_URL = 'http://localhost:3000/api/tabs';

// ==============================================
// FETCH SSR - Se ejecuta en servidor y cliente
// ==============================================
const { data, pending, error, refresh } = await useFetch(API_BASE_URL, {
  // SSR activado - se ejecuta en el servidor
  server: true,
  // No lazy - espera los datos antes de renderizar
  lazy: false,
  // Cachea por 60 segundos
  cache: 'default',
  // Transforma la respuesta para obtener solo lo necesario
  transform: (response) => {
    // Si la respuesta tiene estructura { success: true, data: {...} }
    if (response?.success && response?.data) {
      return response.data;
    }
    // Si la respuesta es directamente los datos
    if (response?.tabs) {
      return response;
    }
    // Fallback con estructura vacía
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
    // Encontrar el tab correspondiente
    const tab = tabs.value.find(t => t.id === tabId);
    
    // Crear slug del área
    const areaSlug = tab?.label
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || tabId;
    
    // Crear slug del ítem
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
// META TAGS PARA SEO (opcional)
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

/* Encabezado de pestañas */
.tabs-header {
  display: flex;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 0;
  border-bottom: 2px solid #E03636;
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 22px 24px;
  background: transparent;
  border: none;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  letter-spacing: 0.5px;
}

.tab-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tab-button:hover:not(:disabled) {
  background: rgba(224, 54, 54, 0.05);
  color: #E03636;
}

.tab-button.active {
  color: #E03636;
  font-weight: 700;
  background: white;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: #E03636;
  border-radius: 3px 3px 0 0;
}

/* Estados de carga y error */
.loading-state, .error-state {
  text-align: center;
  padding: 80px 20px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
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
  max-width: 400px;
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
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(224, 54, 54, 0.2);
}

.retry-button:hover {
  background: #c02e2e;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(224, 54, 54, 0.3);
}

/* Contenido de pestañas */
.tabs-content {
  padding: 48px 36px;
  background: white;
  min-height: 600px;
}

.tab-pane {
  animation: fadeIn 0.5s ease-out;
}

/* Encabezado de sección */
.section-header {
  text-align: center;
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #eee;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: #E03636;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: #E03636;
  border-radius: 2px;
}

.section-description {
  font-size: 16px;
  color: #666;
  max-width: 700px;
  margin: 24px auto 0;
  line-height: 1.6;
}

/* Grid de links */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

/* Tarjetas de link */
.link-card {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 16px;
  padding: 24px;
  text-decoration: none;
  color: inherit;
  border: 1px solid #eaeaea;
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
  transform-origin: top;
}

.link-card:hover {
  transform: translateY(-6px);
  border-color: #E03636;
  box-shadow: 0 12px 24px rgba(224, 54, 54, 0.15);
}

.link-card:hover::before {
  transform: scaleY(1);
}

/* Icono */
.link-icon {
  font-size: 40px;
  margin-right: 20px;
  color: #E03636;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 18px;
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
  font-weight: 300;
}

.link-card:hover .link-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Responsive */
@media (max-width: 1024px) {
  .links-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  .tabs-content {
    padding: 40px 24px;
  }
}

@media (max-width: 768px) {
  .tabs-header {
    flex-direction: column;
    border-bottom: none;
  }
  
  .tab-button {
    padding: 18px 24px;
    justify-content: flex-start;
    border-bottom: 1px solid #eaeaea;
  }
  
  .tab-button.active::after {
    height: 100%;
    width: 4px;
    bottom: 0;
    top: 0;
    right: auto;
    left: 0;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .tabs-content {
    padding: 32px 20px;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .section-description {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .tab-button {
    font-size: 15px;
    padding: 16px 20px;
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
    transform: rotate(90deg);
  }
  
  .link-card:hover .link-arrow {
    transform: rotate(90deg) translateY(5px);
  }
  
  .section-header {
    margin-bottom: 32px;
    padding-bottom: 16px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .section-title::after {
    width: 40px;
    bottom: -8px;
  }
  
  .section-description {
    font-size: 14px;
    margin-top: 16px;
  }
  
  .tabs-content {
    padding: 24px 16px;
  }
}

/* Estilos para impresión */
@media print {
  .tabs-header {
    border-bottom: 2px solid #000;
  }
  
  .tab-button {
    color: #000;
    background: none;
  }
  
  .tab-button.active {
    font-weight: bold;
  }
  
  .link-card {
    break-inside: avoid;
    border: 1px solid #ccc;
    box-shadow: none;
  }
  
  .link-arrow {
    display: none;
  }
}
</style>