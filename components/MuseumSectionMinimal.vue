<template>
  <section class="museum-section" :class="{ 'dark-mode': darkMode }">
    <!-- Sección principal con nuevo diseño -->
    <div class="museum-container">

      <!-- Sobre el museo -->
      <div class="about-section">
        <div class="section-header">
          <div class="header-line"></div>
          <h2>Sobre el Museo</h2>
          <div class="header-line"></div>
        </div>
        
        <div class="about-content">
          <div class="about-text">
            <div class="senate-seal">
              <div class="seal-circle">
                <span>⚖️</span>
              </div>
              <div class="seal-text">
                <h4>Institución Oficial del Senado</h4>
                <p>Administrado bajo supervisión parlamentaria</p>
              </div>
            </div>
            
            <p class="museum-description">{{ museumData.description }}</p>
            
            <div class="">
              <div class="mission-card">
                <div class="mv-header" style="border-color: #E03636;">
                  <div class="mv-icon" style="background-color: #E03636;">🎯</div>
                  <h4>Misión</h4>
                </div>
              </div>
            </div>
          </div>
          
          <div class="about-image">
            <div class="image-container">
              <img src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=400&fit=crop" 
                   alt="Interior del museo" />
              <div class="image-overlay">
                <span>Patrimonio Cultural del Estado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Props
const props = defineProps({
  darkMode: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits([
  'collection-selected',
  'exhibition-selected',
  'program-registration',
  'virtual-tour-started',
  'donation-clicked'
])

// Datos del museo (actualizados)
const museumData = ref({
  name: "Museo Histórico del Senado",
  subtitle: "Preservando la memoria parlamentaria de Bolivia",
  location: "La Paz, Bolivia",
  foundedYear: "1985",
  heroImage: "https://images.unsplash.com/photo-1574323347402-f3c14b5b4c7a?w=1200&h=600&fit=crop",
  
  description: "El Museo Histórico del Senado es una institución dedicada a preservar, investigar y difundir el patrimonio histórico y cultural relacionado con la actividad parlamentaria de Bolivia. Nuestras colecciones incluyen documentos históricos, objetos ceremoniales, arte y archivos que narran la evolución del sistema legislativo boliviano.",
  
  mission: "Preservar y difundir el patrimonio histórico del Senado boliviano, promoviendo la educación cívica y el conocimiento de nuestras instituciones democráticas.",
  
  vision: "Ser el principal referente en la conservación de la memoria parlamentaria de Bolivia, reconocido por su excelencia en la investigación y divulgación histórica.",
  
  schedule: {
    "Lunes a Viernes": "9:00 - 18:00",
    "Sábados": "10:00 - 16:00",
    "Domingos": "10:00 - 14:00",
    "Feriados": "Cerrado"
  },
  
  pricing: [
    { category: "Adultos", amount: "Bs. 20", note: "Nacionales" },
    { category: "Adultos", amount: "Bs. 30", note: "Extranjeros" },
    { category: "Estudiantes", amount: "Bs. 10", note: "Con carnet" },
    { category: "Niños", amount: "Bs. 5", note: "6-12 años" },
    { category: "Tercera Edad", amount: "Gratis", note: "Mayores de 65" },
    { category: "Escuelas", amount: "Gratis", note: "Con reserva previa" }
  ],
  
  address: "Calle Comercio #123, Edificio del Senado, Zona Central",
  transport: ["🚇 Línea Roja - Estación Senado", "🚌 Líneas 1, 4, 7", "🚗 Estacionamiento disponible"],
  
  featuredCollections: [
    {
      id: 1,
      title: "Documentos Fundacionales",
      description: "Colección de actas constitucionales y documentos fundacionales de la República",
      image: "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&h=300&fit=crop",
      category: "Documentos",
      period: "1825-1900",
      curator: "Dra. María Fernández"
    },
    {
      id: 2,
      title: "Arte Parlamentario",
      description: "Pinturas y esculturas que retratan a los próceres del Senado boliviano",
      image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=300&fit=crop",
      category: "Arte",
      period: "Siglo XIX-XX",
      curator: "Lic. Carlos Méndez"
    },
    {
      id: 3,
      title: "Objetos Ceremoniales",
      description: "Mazas, bandas y otros objetos utilizados en ceremonias oficiales",
      image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=400&h=300&fit=crop",
      category: "Objetos",
      period: "1900-2000",
      curator: "Prof. Ana López"
    },
    {
      id: 4,
      title: "Archivo Fotográfico",
      description: "Fotografías históricas de sesiones y eventos parlamentarios",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      category: "Fotografía",
      period: "1900-Presente",
      curator: "Fot. Juan Rodríguez"
    }
  ],
  
  currentExhibitions: [
    {
      id: 1,
      title: "Mujeres en el Senado",
      description: "Exhibición que destaca la trayectoria de las primeras senadoras bolivianas",
      dateRange: "Mar 2024 - Ago 2024",
      sponsor: "Comisión de Género del Senado"
    },
    {
      id: 2,
      title: "200 años de Legislación",
      description: "Recorrido histórico por las leyes más importantes de Bolivia",
      dateRange: "Ene 2024 - Dic 2024",
      sponsor: "Fundación Cultural del Estado"
    }
  ],
  
  educationalPrograms: [
    {
      id: 1,
      icon: "👨‍🏫",
      title: "Visitas Guiadas Escolares",
      description: "Recorridos educativos adaptados para estudiantes de todos los niveles",
      participants: "Grupos de 20-40 personas",
      duration: "2 horas",
      free: true,
      price: "",
      buttonText: "Reservar Visita"
    },
    {
      id: 2,
      icon: "🎨",
      title: "Talleres de Historia",
      description: "Talleres prácticos sobre la historia parlamentaria boliviana",
      participants: "Individual o grupos pequeños",
      duration: "3 horas",
      free: false,
      price: "Bs. 50",
      buttonText: "Inscribirse"
    },
    {
      id: 3,
      icon: "🔍",
      title: "Investigación Histórica",
      description: "Acceso a archivos para investigadores y estudiantes universitarios",
      participants: "Investigadores",
      duration: "Por cita",
      free: true,
      price: "",
      buttonText: "Solicitar Acceso"
    },
    {
      id: 4,
      icon: "🎭",
      title: "Teatro Parlamentario",
      description: "Representaciones teatrales de sesiones históricas del Senado",
      participants: "Público general",
      duration: "1.5 horas",
      free: false,
      price: "Bs. 30",
      buttonText: "Ver Programación"
    }
  ],
  
  virtualTour: {
    previewImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
    features: [
      "Vista 360° de todas las salas",
      "Información detallada de cada pieza",
      "Audios guiados en español e inglés",
      "Recorridos temáticos",
      "Acceso desde cualquier dispositivo"
    ]
  },
  
  contact: {
    email: "museo@senado.bo",
    phone: "+591 (2) 220-5000",
    address: "Edificio del Senado, Piso 3, Oficina 301"
  },
  
  socialMedia: [
    { platform: "Facebook", icon: "📘", url: "https://facebook.com/museosenado" },
    { platform: "Twitter", icon: "🐦", url: "https://twitter.com/museosenado" },
    { platform: "Instagram", icon: "📷", url: "https://instagram.com/museosenado" },
    { platform: "YouTube", icon: "🎥", url: "https://youtube.com/museosenado" },
    { platform: "LinkedIn", icon: "💼", url: "https://linkedin.com/company/museosenado" }
  ]
})

// Estado reactivo
const newsletterEmail = ref('')
const currentYear = computed(() => new Date().getFullYear())

// Métodos de utilidad
const getTransportIcon = (transport) => {
  if (transport.includes("🚇")) return "🚇"
  if (transport.includes("🚌")) return "🚌"
  if (transport.includes("🚗")) return "🚗"
  return "📍"
}

const getCategoryColor = (category) => {
  const colors = {
    'Documentos': '#E03636',
    'Arte': '#E4D294',
    'Objetos': '#B1B1B1',
    'Fotografía': '#E03636'
  }
  return colors[category] || '#E03636'
}

const getSocialColor = (platform) => {
  const colors = {
    'Facebook': '#1877F2',
    'Twitter': '#1DA1F2',
    'Instagram': '#E4405F',
    'YouTube': '#FF0000',
    'LinkedIn': '#0A66C2'
  }
  return colors[platform] || '#E03636'
}

// Métodos principales
const openCollection = (collection) => {
  emit('collection-selected', collection)
  console.log('Colección seleccionada:', collection)
}

const openExhibition = (exhibition) => {
  emit('exhibition-selected', exhibition)
  console.log('Exhibición seleccionada:', exhibition)
}

const registerProgram = (program) => {
  emit('program-registration', program)
  alert(`Inscripción a: ${program.title}`)
}

const startVirtualTour = () => {
  emit('virtual-tour-started')
  window.open('/virtual-tour', '_blank')
}

const openTourGuide = () => {
  window.open('/guia-tour.pdf', '_blank')
}

const openDonationModal = () => {
  emit('donation-clicked')
  alert('Redirigiendo a página de donaciones...')
}

const openSponsorshipInfo = () => {
  window.open('/patrocinio', '_blank')
}

const openVolunteerForm = () => {
  window.open('/voluntariado', '_blank')
}

const openDirections = () => {
  const address = encodeURIComponent(museumData.value.address)
  window.open(`https://maps.google.com/?q=${address}`, '_blank')
}

// Métodos de scroll
const scrollToVisit = () => {
  document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToSchedule = () => {
  document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToPricing = () => {
  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToLocation = () => {
  document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

// Newsletter
const subscribeNewsletter = () => {
  if (newsletterEmail.value && newsletterEmail.value.includes('@')) {
    alert(`¡Gracias por suscribirte con: ${newsletterEmail.value}!`)
    newsletterEmail.value = ''
  } else {
    alert('Por favor, introduce un correo electrónico válido')
  }
}

// Exponer métodos
defineExpose({
  updateMuseumData: (newData) => {
    museumData.value = { ...museumData.value, ...newData }
  },
  startVirtualTour,
  subscribeNewsletter
})

// Inicialización
onMounted(() => {
  console.log('Componente Museo del Senado montado')
})
</script>

<style scoped>
/* Paleta de colores */
:root {
  --primary-red: #E03636;
  --primary-gold: #E4D294;
  --primary-gray: #B1B1B1;
  --dark-bg: #1a1a1a;
  --light-bg: #f8f9fa;
  --text-dark: #333333;
  --text-light: #ffffff;
}

.museum-section {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: var(--light-bg);
  color: var(--text-dark);
  position: relative;
}

.museum-section.dark-mode {
  background: var(--dark-bg);
  color: var(--text-light);
}

/* Hero Section - Rediseñada */
.museum-hero {
  position: relative;
  background: linear-gradient(135deg, var(--primary-red) 0%, #b32b2b 100%);
  color: white;
  padding: 4rem 1rem 6rem;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.1;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-text {
  padding-right: 2rem;
}

.title-container {
  margin-bottom: 2rem;
}

.senate-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.museum-title {
  font-size: 3.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 800;
  line-height: 1.1;
}

.title-underline {
  width: 100px;
  height: 4px;
  background: var(--primary-gold);
  margin: 1rem 0;
}

.museum-subtitle {
  font-size: 1.3rem;
  opacity: 0.95;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.hero-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.feature {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.feature-icon {
  background: rgba(255, 255, 255, 0.2);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.feature-text {
  font-size: 1rem;
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.hero-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero-btn.primary {
  background: var(--primary-gold);
  color: #333;
}

.hero-btn.primary:hover {
  background: #d4c183;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.hero-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.hero-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-3px);
}

.hero-image-container {
  position: relative;
}

.image-frame {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
}

.museum-hero-img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.image-frame:hover .museum-hero-img {
  transform: scale(1.05);
}

.image-badge {
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  background: var(--primary-red);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
}

.hero-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--primary-gold);
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  animation: bounce 2s infinite;
}

.scroll-indicator span {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

.scroll-arrow {
  font-size: 1.5rem;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}

/* Main Container */
.museum-container {
  max-width: 1200px;
  margin: -3rem auto 0;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

/* Info Cards Grid */
.info-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;
}

.info-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(228, 210, 148, 0.2);
}

.dark-mode .info-card {
  background: #2d2d2d;
  border-color: rgba(228, 210, 148, 0.1);
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-gold);
}

.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.card-content h4 {
  margin: 0 0 0.25rem 0;
  color: var(--primary-red);
  font-size: 1rem;
}

.card-content p {
  margin: 0;
  font-size: 0.85rem;
  color: #666;
}

.dark-mode .card-content p {
  color: #aaa;
}

.card-arrow {
  margin-left: auto;
  color: var(--primary-gray);
  font-size: 1.2rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.info-card:hover .card-arrow {
  opacity: 1;
}

/* Section Headers */
.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 4rem 0 2rem;
}

.header-line {
  flex: 1;
  height: 2px;
  background: var(--primary-gray);
}

.section-header h2 {
  font-size: 2.2rem;
  color: var(--primary-red);
  margin: 0;
  text-align: center;
}

.dark-mode .section-header h2 {
  color: var(--primary-gold);
}

.section-subtitle {
  text-align: center;
  color: var(--primary-gray);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* About Section */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.senate-seal {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(228, 210, 148, 0.1);
  border-radius: 15px;
  border: 1px solid rgba(228, 210, 148, 0.3);
}

.seal-circle {
  width: 60px;
  height: 60px;
  background: var(--primary-red);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

.seal-text h4 {
  margin: 0 0 0.25rem 0;
  color: var(--primary-red);
}

.seal-text p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--primary-gray);
}

.museum-description {
  line-height: 1.8;
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 2.5rem;
}

.dark-mode .museum-description {
  color: #ddd;
}

.mission-vision-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.mission-card, .vision-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  border-top: 4px solid;
}

.dark-mode .mission-card,
.dark-mode .vision-card {
  background: #2d2d2d;
}

.mv-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid;
}

.mv-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #333;
}

.mv-header h4 {
  margin: 0;
  font-size: 1.1rem;
}

.mission-card p, .vision-card p {
  margin: 0;
  line-height: 1.6;
  color: #555;
}

.dark-mode .mission-card p,
.dark-mode .vision-card p {
  color: #ccc;
}

.about-image .image-container {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.about-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 2rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
}

/* Practical Info Section */
.practical-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 3rem 0;
}

.practical-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(177, 177, 177, 0.2);
}

.dark-mode .practical-card {
  background: #2d2d2d;
  border-color: rgba(177, 177, 177, 0.1);
}

.practical-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(228, 210, 148, 0.3);
}

.practical-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #333;
}

.practical-header h3 {
  margin: 0;
  color: var(--primary-red);
  font-size: 1.3rem;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(228, 210, 148, 0.1);
  border-radius: 8px;
}

.day-circle {
  width: 35px;
  height: 35px;
  background: var(--primary-red);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.schedule-details {
  flex: 1;
}

.day {
  font-weight: 600;
  color: var(--primary-red);
  margin-right: 0.5rem;
}

.hours {
  color: #555;
  font-weight: 500;
}

.dark-mode .hours {
  color: #ccc;
}

.pricing-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.price-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(177, 177, 177, 0.3);
}

.price-item:last-child {
  border-bottom: none;
}

.price-category {
  display: flex;
  flex-direction: column;
}

.category {
  font-weight: 600;
  color: var(--primary-red);
}

.price-note {
  font-size: 0.85rem;
  color: var(--primary-gray);
}

.price-amount {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--primary-red);
}

.pricing-note {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(228, 210, 148, 0.1);
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
  color: var(--primary-red);
  font-weight: 500;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.address-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(224, 54, 54, 0.05);
  border-radius: 10px;
}

.address-icon {
  font-size: 1.5rem;
}

.address-details h4 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-red);
}

.address-details p {
  margin: 0;
  color: #555;
  line-height: 1.5;
}

.dark-mode .address-details p {
  color: #ccc;
}

.transport-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transport-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
}

.transport-icon {
  font-size: 1.2rem;
}

.directions-btn {
  background: var(--primary-red);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  margin-top: 1rem;
}

.directions-btn:hover {
  background: #c22e2e;
}

/* Collections Section */
.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.collection-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(228, 210, 148, 0.2);
}

.dark-mode .collection-card {
  background: #2d2d2d;
  border-color: rgba(228, 210, 148, 0.1);
}

.collection-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.collection-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.collection-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.collection-card:hover .collection-image img {
  transform: scale(1.1);
}

.collection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(224, 54, 54, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.collection-card:hover .collection-overlay {
  opacity: 1;
}

.overlay-text {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.collection-category {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.collection-info {
  padding: 1.5rem;
}

.collection-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.collection-header h4 {
  margin: 0;
  color: var(--primary-red);
  font-size: 1.2rem;
  flex: 1;
}

.collection-period {
  background: rgba(228, 210, 148, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  color: var(--primary-red);
  font-weight: 600;
}

.collection-desc {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.dark-mode .collection-desc {
  color: #aaa;
}

.collection-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.curator-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.curator-icon {
  color: var(--primary-gray);
}

.curator-name {
  font-size: 0.9rem;
  color: var(--primary-red);
  font-weight: 500;
}

.view-more {
  color: var(--primary-red);
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform 0.3s;
}

.collection-card:hover .view-more {
  transform: translateX(5px);
}

/* Exhibitions Section */
.exhibitions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.exhibition-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  border-left: 5px solid;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.dark-mode .exhibition-card {
  background: #2d2d2d;
}

.exhibition-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.exhibition-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.exhibition-badge {
  padding: 0.25rem 1rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
}

.exhibition-date {
  background: rgba(177, 177, 177, 0.2);
  padding: 0.25rem 1rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--primary-red);
}

.exhibition-content h3 {
  color: var(--primary-red);
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
}

.exhibition-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex: 1;
}

.dark-mode .exhibition-desc {
  color: #aaa;
}

.exhibition-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(177, 177, 177, 0.3);
}

.sponsor-info {
  display: flex;
  flex-direction: column;
}

.sponsor-label {
  font-size: 0.85rem;
  color: var(--primary-gray);
}

.sponsor-name {
  font-weight: 600;
  color: var(--primary-red);
}

.exhibition-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
}

.exhibition-btn:hover {
  transform: translateY(-2px);
}

/* Programs Section */
.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.program-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(228, 210, 148, 0.2);
}

.dark-mode .program-card {
  background: #2d2d2d;
  border-color: rgba(228, 210, 148, 0.1);
}

.program-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.program-icon {
  font-size: 2rem;
}

.program-title {
  flex: 1;
}

.program-title h4 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-red);
  font-size: 1.1rem;
}

.program-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
}

.program-desc {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex: 1;
}

.dark-mode .program-desc {
  color: #aaa;
}

.program-details {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--primary-gray);
}

.program-btn {
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.program-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Virtual Tour Section */
.virtual-tour-section {
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%);
  border-radius: 20px;
  padding: 4rem 2rem;
  margin: 4rem 0;
}

.dark-mode .virtual-tour-section {
  background: linear-gradient(135deg, #3d3d3d 0%, #2d2d2d 100%);
}

.virtual-tour-content {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.tour-info {
  color: white;
}

.tour-badge {
  display: inline-block;
  background: var(--primary-red);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.tour-info h2 {
  color: var(--primary-gold);
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
}

.tour-subtitle {
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.tour-features {
  list-style: none;
  padding: 0;
  margin: 2rem 0;
}

.tour-features li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  color: #ddd;
}

.feature-check {
  color: var(--primary-gold);
  font-weight: bold;
  font-size: 1.2rem;
}

.tour-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2.5rem;
}

.tour-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tour-btn.primary {
  background: var(--primary-gold);
  color: #333;
}

.tour-btn.primary:hover {
  background: #d4c183;
  transform: translateY(-3px);
}

.tour-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.tour-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.tour-preview .preview-container {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.tour-preview img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.play-button {
  width: 80px;
  height: 80px;
  background: var(--primary-red);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s;
}

.play-button:hover {
  transform: scale(1.1);
}

.preview-text {
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.preview-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--primary-gold);
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 800;
  font-size: 1.2rem;
}

/* Contact Section */
.contact-section {
  background: rgba(228, 210, 148, 0.1);
  border-radius: 20px;
  padding: 3rem;
  margin: 4rem 0;
}

.dark-mode .contact-section {
  background: rgba(228, 210, 148, 0.05);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3rem;
}

.contact-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.contact-icon {
  width: 50px;
  height: 50px;
  background: var(--primary-red);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.contact-header h3 {
  color: var(--primary-red);
  margin: 0;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  gap: 1rem;
}

.item-icon {
  font-size: 1.5rem;
  color: var(--primary-red);
}

.item-content h5 {
  margin: 0 0 0.25rem 0;
  color: var(--primary-red);
  font-size: 0.9rem;
}

.item-content a, .item-content span {
  color: #555;
  text-decoration: none;
  font-size: 0.95rem;
}

.dark-mode .item-content a,
.dark-mode .item-content span {
  color: #ccc;
}

.item-content a:hover {
  color: var(--primary-red);
  text-decoration: underline;
}

.social-section h4 {
  color: var(--primary-red);
  margin: 0 0 1.5rem 0;
}

.social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.social-card {
  padding: 1rem;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.social-card:hover {
  transform: translateY(-3px);
}

.social-icon {
  font-size: 1.5rem;
}

.social-name {
  font-size: 0.85rem;
  font-weight: 500;
}

.senate-info-card {
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  border: 2px solid var(--primary-red);
}

.dark-mode .senate-info-card {
  background: #2d2d2d;
}

.senate-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.senate-icon {
  font-size: 2rem;
  color: var(--primary-red);
}

.senate-header h4 {
  color: var(--primary-red);
  margin: 0;
}

.senate-info-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.dark-mode .senate-info-card p {
  color: #ccc;
}

.senate-link {
  color: var(--primary-red);
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.senate-link:hover {
  text-decoration: underline;
}

/* Donation Section */
.donation-section {
  margin: 4rem 0;
}

.donation-card {
  background: linear-gradient(135deg, var(--primary-red) 0%, #c22e2e 100%);
  border-radius: 20px;
  padding: 3rem;
  color: white;
}

.donation-content {
  max-width: 800px;
  margin: 0 auto;
}

.donation-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.donation-icon {
  font-size: 2.5rem;
}

.donation-header h3 {
  margin: 0;
  font-size: 1.8rem;
}

.donation-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.donation-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.donation-option {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-icon {
  font-size: 2rem;
}

.option-content h5 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.option-content p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

.option-btn {
  background: var(--primary-gold);
  color: #333;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: auto;
}

.option-btn:hover {
  background: #d4c183;
}

/* Footer */
.museum-footer {
  background: #2d2d2d;
  color: white;
  padding: 3rem 1rem 1rem;
  border-radius: 20px 20px 0 0;
  margin-top: 4rem;
}

.dark-mode .museum-footer {
  background: #1a1a1a;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo-circle {
  width: 70px;
  height: 70px;
  background: var(--primary-red);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.logo-text h3 {
  margin: 0 0 0.5rem 0;
  color: var(--primary-gold);
  font-size: 1.3rem;
}

.logo-text p {
  margin: 0;
  color: #aaa;
  font-size: 0.9rem;
}

.footer-newsletter h4 {
  color: var(--primary-gold);
  margin: 0 0 0.5rem 0;
}

.footer-newsletter p {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.newsletter-form input::placeholder {
  color: #888;
}

.newsletter-form button {
  padding: 0.75rem 1.5rem;
  background: var(--primary-red);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.newsletter-form button:hover:not(.disabled) {
  background: #c22e2e;
}

.newsletter-form button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  padding: 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.links-column h5 {
  color: var(--primary-gold);
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.links-column a {
  display: block;
  color: #aaa;
  text-decoration: none;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.links-column a:hover {
  color: var(--primary-gold);
}

.footer-bottom {
  padding: 2rem 0 0;
  text-align: center;
}

.footer-bottom p {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.footer-legal {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-legal a {
  color: #aaa;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s;
}

.footer-legal a:hover {
  color: var(--primary-gold);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .info-cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .about-content {
    grid-template-columns: 1fr;
  }
  
  .practical-grid {
    grid-template-columns: 1fr;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
  }
  
  .virtual-tour-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .donation-options {
    grid-template-columns: 1fr;
  }
  
  .footer-main {
    grid-template-columns: 1fr;
  }
  
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .museum-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .info-cards-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-line {
    width: 100px;
  }
  
  .mission-vision-grid {
    grid-template-columns: 1fr;
  }
  
  .collections-grid,
  .exhibitions-grid,
  .programs-grid {
    grid-template-columns: 1fr;
  }
  
  .tour-actions {
    flex-direction: column;
  }
  
  .social-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-links {
    grid-template-columns: 1fr;
  }
  
  .footer-legal {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>