<template>
  <div class="tabs-container">
    <!-- Encabezado de pestañas -->
    <div class="tabs-header">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { 'active': activeTab === tab.id }]"
        @click="activeTab = tab.id"
        :style="activeTab === tab.id ? activeTabStyle : {}"
      >
        <span class="tab-icon" v-html="tab.icon"></span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Contenido de pestañas -->
    <div class="tabs-content">
      <!-- Pestaña Legislación -->
      <div v-if="activeTab === 'legislacion'" class="tab-pane fade-in">
        <div class="section-header">
          <h2 class="section-title">Área de Legislación</h2>
          <p class="section-description">Acceda a toda la información relacionada con los proyectos de ley y legislación</p>
        </div>
        <div class="links-grid">
          <NuxtLink 
            v-for="link in legislacionLinks" 
            :key="link.id"
            :to="link.path" 
            class="link-card"
          >
            <div class="link-icon" v-html="link.icon"></div>
            <div class="link-content">
              <h3 class="link-title">{{ link.label }}</h3>
              <p class="link-description">{{ link.description }}</p>
            </div>
            <div class="link-arrow">›</div>
          </NuxtLink>
        </div>
      </div>

      <!-- Pestaña Fiscalización -->
      <div v-if="activeTab === 'fiscalizacion'" class="tab-pane fade-in">
        <div class="section-header">
          <h2 class="section-title">Área de Fiscalización</h2>
          <p class="section-description">Sistema de control y seguimiento de actividades institucionales</p>
        </div>
        <div class="links-grid">
          <NuxtLink 
            v-for="link in fiscalizacionLinks" 
            :key="link.id"
            :to="link.path" 
            class="link-card"
          >
            <div class="link-icon" v-html="link.icon"></div>
            <div class="link-content">
              <h3 class="link-title">{{ link.label }}</h3>
              <p class="link-description">{{ link.description }}</p>
            </div>
            <div class="link-arrow">›</div>
          </NuxtLink>
        </div>
      </div>

      <!-- Pestaña Gestión -->
      <div v-if="activeTab === 'gestion'" class="tab-pane fade-in">
        <div class="section-header">
          <h2 class="section-title">Área de Gestión</h2>
          <p class="section-description">Documentación y resoluciones de gestión institucional</p>
        </div>
        <div class="links-grid">
          <NuxtLink 
            v-for="link in gestionLinks" 
            :key="link.id"
            :to="link.path" 
            class="link-card"
          >
            <div class="link-icon" v-html="link.icon"></div>
            <div class="link-content">
              <h3 class="link-title">{{ link.label }}</h3>
              <p class="link-description">{{ link.description }}</p>
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

const activeTab = ref('legislacion');

const tabs = [
  { id: 'legislacion', label: 'Legislación', icon: '📋' },
  { id: 'fiscalizacion', label: 'Fiscalización', icon: '🔍' },
  { id: 'gestion', label: 'Gestión', icon: '⚙️' }
];

// Estilo para pestaña activa con los colores especificados
const activeTabStyle = computed(() => ({
  background: '#E03636',
  color: 'white'
}));

// Función para generar rutas (ajustar según tu estructura)
const generatePath = (area, link) => {
  const areaSlug = area.toLowerCase().replace(/\s+/g, '-');
  const linkSlug = link.toLowerCase().replace(/\s+/g, '-');
  return `/${areaSlug}/${linkSlug}`;
};

// Enlaces para Legislación
const legislacionLinks = [
  {
    id: 'leyes-tratamiento',
    label: 'Proyectos de Ley en Tratamiento',
    description: 'Proyectos actualmente en proceso legislativo',
    icon: '📄',
    path: generatePath('Legislación', 'Proyectos de Ley en Tratamiento')
  },
  {
    id: 'leyes-aprobados',
    label: 'Proyectos de Ley Aprobados',
    description: 'Proyectos que han sido aprobados por la cámara',
    icon: '✅',
    path: generatePath('Legislación', 'Proyectos de Ley Aprobados')
  },
  {
    id: 'leyes-sancionados',
    label: 'Proyectos de Ley Sancionados',
    description: 'Proyectos que han recibido sanción oficial',
    icon: '🏛️',
    path: generatePath('Legislación', 'Proyectos de Ley Sancionados')
  },
  {
    id: 'leyes-modificaciones',
    label: 'Proyectos de Ley con Modificaciones',
    description: 'Proyectos que han sido modificados durante el proceso',
    icon: '🔄',
    path: generatePath('Legislación', 'Proyectos de Ley con Modificaciones')
  },
  {
    id: 'leyes-promulgadas',
    label: 'Leyes Promulgadas',
    description: 'Leyes que han sido promulgadas oficialmente',
    icon: '📜',
    path: generatePath('Legislación', 'Leyes Promulgadas')
  },
  {
    id: 'leyes-rechazados',
    label: 'Proyectos de Ley Rechazados',
    description: 'Proyectos que no han superado el proceso legislativo',
    icon: '❌',
    path: generatePath('Legislación', 'Proyectos de Ley Rechazados')
  }
];

// Enlaces para Fiscalización
const fiscalizacionLinks = [
  {
    id: 'informe-escrito',
    label: 'Petición de Informe Escrito',
    description: 'Solicitudes formales de información por escrito',
    icon: '✍️',
    path: generatePath('Fiscalización', 'Petición de Informe Escrito')
  },
  {
    id: 'informe-oral',
    label: 'Petición de Informe Oral',
    description: 'Solicitudes de información mediante presentaciones orales',
    icon: '🗣️',
    path: generatePath('Fiscalización', 'Petición de Informe Oral')
  }
];

// Enlaces para Gestión
const gestionLinks = [
  {
    id: 'resoluciones-camarales',
    label: 'Resoluciones Camarales',
    description: 'Documentos oficiales de resolución institucional',
    icon: '📋',
    path: generatePath('Gestión', 'Resoluciones Camarales')
  },
  {
    id: 'declaraciones-camarales',
    label: 'Declaraciones Camarales',
    description: 'Declaraciones oficiales de la cámara',
    icon: '📢',
    path: generatePath('Gestión', 'Declaraciones Camarales')
  },
  {
    id: 'minutas-comunicacion',
    label: 'Minutas de Comunicación',
    description: 'Registros de comunicación institucional',
    icon: '📧',
    path: generatePath('Gestión', 'Minutas de Comunicación')
  }
];
</script>

<style scoped>
.tabs-container {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

.tabs-header {
  display: flex;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  padding: 0;
  border-bottom: 2px solid #E4D294;
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 22px 24px;
  background: #E4D294;
  border: none;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  letter-spacing: 0.5px;
}

.tab-button:hover {
  background: rgba(224, 54, 54, 0.08);
  color: #E03636;
}

.tab-button.active {
  color: white;
  font-weight: 700;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(224, 54, 54, 0.2);
}

.tab-button.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #E4D294;
  border-radius: 2px 2px 0 0;
}

.tab-icon {
  font-size: 22px;
  transition: transform 0.3s ease;
}

.tab-button.active .tab-icon {
  transform: scale(1.1);
}

.tabs-content {
  padding: 36px;
  background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
  min-height: 500px;
}

.tab-pane {
  animation: fadeIn 0.4s ease-out;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 2px solid #E4D294;
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

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

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
  border-color: #E4D294;
  box-shadow: 0 12px 24px rgba(224, 54, 54, 0.1);
}

.link-card:hover::before {
  transform: scaleY(1);
}

.link-icon {
  font-size: 32px;
  margin-right: 20px;
  color: #E03636;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.link-card:hover .link-icon {
  transform: scale(1.1) rotate(5deg);
}

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