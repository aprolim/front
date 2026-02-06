<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar Modificado -->
    <nav class="navbar">
      <div class="navbar-content">
        <div class="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Coat_of_arms_of_Bolivia.svg/800px-Coat_of_arms_of_Bolivia.svg.png" alt="Escudo de Bolivia" class="escudo-img" />
          <div class="logo-text">BOLIVIA</div>
        </div>
        <ul class="nav-links">
          <li><a href="#" class="nav-link active">Home</a></li>
          <li><a href="#" class="nav-link">Tours</a></li>
          <li><a href="#" class="nav-link">Hotels</a></li>
          <li><a href="#" class="nav-link">Services</a></li>
          <li><a href="#" class="nav-link">Contact</a></li>
        </ul>
        <button class="search-btn">Search</button>
      </div>
    </nav>

    <!-- Portada con carousel y franja roja -->
    <section class="portada">
      <!-- Franja roja transparente sobre la imagen -->
      <div class="red-overlay"></div>
      
      <div class="carousel">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          :class="['carousel-slide', { active: currentSlide === index }]"
          :style="{ backgroundImage: `url(${slide.image})` }"
        ></div>
        
        <div class="carousel-content">
          <h1>Descubre Bolivia</h1>
          <p>Explora la riqueza cultural y los paisajes impresionantes de nuestro país. Desde el Salar de Uyuni hasta las ruinas de Tiwanaku, Bolivia te espera.</p>
          <button class="carousel-btn">Explorar Tours</button>
        </div>
        
        <div class="carousel-indicators">
          <div 
            v-for="(slide, index) in slides" 
            :key="index"
            :class="['indicator', { active: currentSlide === index }]"
            @click="showSlide(index)"
          ></div>
        </div>
      </div>
    </section>

    <!-- Sección Noticias -->
    <section class="noticias">
      <h2 class="section-title">Noticias de Bolivia</h2>
      
      <div class="news-carousel">
        <div class="news-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="['tab', { active: activeTab === tab.id }]"
            @click="changeTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>
        
        <div class="news-container">
          <button class="nav-btn prev-btn" @click="prevNewsGroup">
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="news-items-wrapper">
            <div 
              v-for="(newsItem, index) in visibleNews" 
              :key="newsItem.id"
              class="news-item"
            >
              <div 
                class="news-img" 
                :style="{ backgroundImage: `url(${newsItem.image})` }"
              ></div>
              <div class="news-content">
                <h3>{{ newsItem.title }}</h3>
                <p>{{ newsItem.description }}</p>
              </div>
            </div>
          </div>
          
          <button class="nav-btn next-btn" @click="nextNewsGroup">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Sección Personas -->
    <section class="personas">
      <h2 class="section-title">Personalidades Bolivianas</h2>
      
      <div class="personas-container">
        <div 
          v-for="(persona, index) in personas" 
          :key="index"
          class="persona-card"
        >
          <div class="persona-img-wrapper">
            <!-- Fondo rojo transparente detrás -->
            <div class="persona-red-bg"></div>
            <!-- Imagen de fondo -->
            <div 
              class="persona-img" 
              :style="{ backgroundImage: `url(${persona.image})` }"
            ></div>
            <!-- Información sobre el fondo rojo -->
            <div class="persona-info-overlay">
              <h4>{{ persona.name }}</h4>
              <p>{{ persona.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Coat_of_arms_of_Bolivia.svg/400px-Coat_of_arms_of_Bolivia.svg.png" alt="Escudo de Bolivia" class="footer-escudo-img" />
          <div class="footer-logo-text">BOLIVIA</div>
        </div>
        
        <div class="flags-container">
          <div class="flag flag1"></div>
          <div class="flag flag2"></div>
          <div class="flag flag3"></div>
        </div>
        
        <div class="copyright">
          <p>&copy; 2023 Bolivia - Todos los derechos reservados. | Diseño inspirado en la riqueza cultural boliviana</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Variables reactivas
const currentSlide = ref(0)
const activeTab = ref('turismo')
const newsStartIndex = ref(0)
let slideInterval

// Datos del carousel
const slides = ref([
  { 
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
  }
])

// Datos de las pestañas
const tabs = ref([
  { id: 'turismo', label: 'Turismo' },
  { id: 'cultura', label: 'Cultura' },
  { id: 'eventos', label: 'Eventos' }
])

// Datos de noticias
const news = ref([
  { 
    id: 1,
    title: 'Incremento del turismo en el Salar de Uyuni',
    description: 'Las visitas al famoso Salar de Uyuni han aumentado un 35% este año, impulsando la economía local.',
    category: 'turismo',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 2,
    title: 'Festival de la Diablada en Oruro',
    description: 'El Carnaval de Oruro, Patrimonio de la Humanidad, prepara su edición más espectacular para el próximo año.',
    category: 'cultura',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
  },
  { 
    id: 3,
    title: 'Nueva ruta turística en el Amazonas boliviano',
    description: 'Se inaugura una nueva ruta ecoturística en la región amazónica de Bolivia, destacando la biodiversidad local.',
    category: 'turismo',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 4,
    title: 'Exposición de arte colonial en Sucre',
    description: 'Museo Nacional de Arte presenta una exposición única de arte colonial boliviano.',
    category: 'cultura',
    image: 'https://images.unsplash.com/photo-1580503541007-57d0a5d82a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 5,
    title: 'Conferencia internacional de turismo sostenible',
    description: 'Bolivia será sede de la conferencia internacional sobre turismo sostenible en América Latina.',
    category: 'eventos',
    image: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 6,
    title: 'Festival gastronómico en La Paz',
    description: 'Se realizará el festival anual de comida tradicional boliviana con chefs internacionales.',
    category: 'eventos',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80'
  },
  { 
    id: 7,
    title: 'Restauración del Palacio de Gobierno',
    description: 'Comienzan los trabajos de restauración del histórico Palacio de Gobierno en La Paz.',
    category: 'turismo',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  { 
    id: 8,
    title: 'Nuevo museo de historia natural',
    description: 'Se inaugura en Cochabamba un moderno museo de historia natural con especies endémicas.',
    category: 'cultura',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
])

// Datos de personas
const personas = ref([
  {
    name: 'Carlos Mesa',
    role: 'Ex Presidente e historiador',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80'
  },
  {
    name: 'María Luisa',
    role: 'Artista textil reconocida',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80'
  },
  {
    name: 'Juan Carlos',
    role: 'Chef de alta cocina boliviana',
    image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Luis Fernando',
    role: 'Director de orquesta',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2066&q=80'
  },
  {
    name: 'Roberto Sánchez',
    role: 'Escritor y poeta',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80'
  },
  {
    name: 'Ana María',
    role: 'Activista ambiental',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80'
  },
  {
    name: 'Miguel Ángel',
    role: 'Arquitecto premiado',
    image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80'
  },
  {
    name: 'Sofía Mendoza',
    role: 'Directora de cine',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80'
  },
  {
    name: 'José Luis',
    role: 'Médico investigador',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80'
  },
  {
    name: 'Carolina Ruiz',
    role: 'Deportista olímpica',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2067&q=80'
  }
])

// Computed properties
const filteredNews = computed(() => {
  return news.value.filter(item => item.category === activeTab.value)
})

const visibleNews = computed(() => {
  return filteredNews.value.slice(newsStartIndex.value, newsStartIndex.value + 3)
})

// Métodos
const showSlide = (index) => {
  currentSlide.value = index
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const changeTab = (tabId) => {
  activeTab.value = tabId
  newsStartIndex.value = 0
}

const nextNewsGroup = () => {
  const maxIndex = filteredNews.value.length - 3
  if (newsStartIndex.value < maxIndex) {
    newsStartIndex.value += 1
  } else {
    newsStartIndex.value = 0
  }
}

const prevNewsGroup = () => {
  if (newsStartIndex.value > 0) {
    newsStartIndex.value -= 1
  } else {
    const maxIndex = filteredNews.value.length - 3
    newsStartIndex.value = maxIndex > 0 ? maxIndex : 0
  }
}

// Lifecycle hooks
onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000)
  
  // Añadir evento de scroll para navbar
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const navbar = document.querySelector('.navbar')
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
}
</script>

<style scoped>
/* Variables de color */
:root {
  --rojo: #E03636;
  --rojo-solido: #E03636;
  --dorado: #E4D294;
  --gris: #B1B1B1;
  --blanco: #FFFFFF;
  --negro: #222222;
  --rojo-transparente: rgba(224, 54, 54, 0.85);
  --rojo-franja: rgba(224, 54, 54, 0.35); /* Rojo transparente para la franja */
}

/* Navbar Transparente con letras BLANCAS y subrayado permanente BLANCO */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: transparent;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.navbar.scrolled {
  background-color: var(--rojo-solido);
}

.navbar-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  height: 70px;
  width: 100%;
}

/* Logo en la izquierda - BLANCO */
.logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.escudo-img {
  width: 45px;
  height: 45px;
  object-fit: contain;
  filter: brightness(0) invert(1); /* Blanco */
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--blanco); /* Letras BLANCAS */
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}

/* Navegación en la izquierda - TODAS LAS LETRAS BLANCAS */
.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
  margin-right: auto;
  margin-left: 50px;
}

.nav-link {
  color: var(--blanco) !important; /* Letras BLANCAS siempre */
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
  font-size: 16px;
  padding: 5px 0;
  position: relative;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
  display: inline-block;
}

/* Subrayado permanente BLANCO siempre visible */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px; /* Subrayado más visible */
  background-color: var(--blanco) !important; /* Subrayado BLANCO siempre */
  transform: scaleX(1);
  transition: transform 0.3s ease;
}

.nav-link:hover::after {
  transform: scaleX(1.1);
}

/* Botón Search con letras BLANCAS */
.search-btn {
  background-color: transparent;
  border: 1px solid var(--blanco);
  color: var(--blanco) !important; /* Letras BLANCAS siempre */
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.search-btn:hover {
  background-color: var(--blanco);
  color: var(--rojo) !important;
}

/* Sección Portada con franja roja transparente */
.portada {
  height: 90vh;
  position: relative;
  overflow: hidden;
  margin-top: 70px; /* Para compensar el navbar fijo */
}

/* Franja roja transparente sobre la imagen */
.red-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--rojo-franja); /* Rojo 35% transparente */
  z-index: 1;
  pointer-events: none; /* Permite hacer clic en elementos debajo */
}

.carousel {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.carousel-slide.active {
  opacity: 1;
}

/* Contenido del carousel sobre la franja roja */
.carousel-content {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  text-align: left;
  color: var(--blanco);
  max-width: 500px;
  z-index: 2; /* Sobre la franja roja */
}

.carousel-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.carousel-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.carousel-btn {
  background-color: var(--rojo);
  color: var(--blanco);
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.carousel-btn:hover {
  background-color: #c53030;
}

.carousel-indicators {
  position: absolute;
  bottom: 100px;
  left: 60%;
  transform: translateX(-50%);
  display: flex;
  gap: 15px;
  z-index: 2; /* Sobre la franja roja */
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: var(--blanco);
}

/* Sección Noticias */
.noticias {
  padding: 80px 5%;
  background-color: var(--blanco);
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
  color: var(--rojo);
  font-size: 2.5rem;
  position: relative;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background-color: var(--dorado);
}

.news-carousel {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.news-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.tab {
  padding: 10px 25px;
  background-color: var(--gris);
  color: var(--blanco);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.tab.active {
  background-color: var(--rojo);
}

.tab:hover:not(.active) {
  background-color: #999999;
}

.news-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 0 60px;
}

.news-items-wrapper {
  display: flex;
  gap: 20px;
  width: 100%;
  justify-content: center;
  overflow: hidden;
}

.news-item {
  flex: 0 0 calc(33.333% - 14px);
  max-width: calc(33.333% - 14px);
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.news-item:hover {
  transform: translateY(-10px);
}

.news-img {
  height: 200px;
  width: 100%;
  background-size: cover;
  background-position: center;
}

.news-content {
  padding: 20px;
}

.news-content h3 {
  color: var(--rojo);
  margin-bottom: 10px;
  font-size: 1.3rem;
}

.news-content p {
  color: var(--negro);
  font-size: 0.95rem;
  line-height: 1.5;
}

.nav-btn {
  background-color: var(--rojo);
  color: var(--blanco);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.nav-btn:hover {
  background-color: #c53030;
  transform: translateY(-50%) scale(1.1);
}

.prev-btn {
  left: 0;
}

.next-btn {
  right: 0;
}

/* Sección Personas - Fondo rojo transparente DETRÁS de la imagen */
.personas {
  padding: 80px 5%;
  background-color: #f5f5f5;
}

.personas-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
}

.persona-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  height: 300px;
  position: relative;
}

.persona-card:hover {
  transform: translateY(-5px);
}

.persona-img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Fondo rojo transparente DETRÁS */
.persona-red-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--rojo-transparente);
  z-index: 1;
}

/* Imagen de fondo - DETRÁS del fondo rojo */
.persona-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;
  z-index: 0;
}

.persona-card:hover .persona-img {
  transform: scale(1.05);
}

/* Información sobre el fondo rojo */
.persona-info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: var(--blanco);
  padding: 15px;
  text-align: center;
  z-index: 2;
}

.persona-info-overlay h4 {
  margin-bottom: 5px;
  font-size: 1.1rem;
  font-weight: 600;
}

.persona-info-overlay p {
  font-size: 0.9rem;
  opacity: 0.95;
}

/* Footer */
.footer {
  background-color: var(--negro);
  color: var(--blanco);
  padding: 60px 5% 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 40px;
}

.footer-escudo-img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.footer-logo-text {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
}

.flags-container {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 40px;
  width: 100%;
}

.flag {
  height: 100px;
  flex: 1;
  max-width: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
}

.flag1 {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bandera_de_Bolivia_%28Estado%29.svg/1200px-Bandera_de_Bolivia_%28Estado%29.svg.png');
}

.flag2 {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Bolivia.svg/2560px-Flag_of_Bolivia.svg.png');
}

.flag3 {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bandera_de_Bolivia_%28Estado%29.svg/1200px-Bandera_de_Bolivia_%28Estado%29.svg.png');
}

.copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255,255,255,0.1);
  width: 100%;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 1200px) {
  .personas-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .personas-container {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .carousel-content {
    left: 70%;
  }
  
  .carousel-indicators {
    left: 70%;
  }
  
  .news-item {
    flex: 0 0 calc(50% - 10px);
    max-width: calc(50% - 10px);
  }
}

@media (max-width: 768px) {
  .navbar-content {
    flex-direction: column;
    height: auto;
    padding: 15px 5%;
  }
  
  .nav-links {
    margin: 20px 0;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-left: 0;
    margin-right: 0;
  }
  
  .personas-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .carousel-content {
    left: 50%;
    width: 90%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
  
  .carousel-indicators {
    left: 50%;
  }
  
  .news-item {
    flex: 0 0 100%;
    max-width: 100%;
  }
  
  .news-container {
    padding: 0 40px;
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .portada {
    margin-top: 120px; /* Más espacio para navbar móvil */
  }
}

@media (max-width: 576px) {
  .personas-container {
    grid-template-columns: repeat(1, 1fr);
  }
  
  .logo-text {
    font-size: 20px;
  }
  
  .footer-logo-text {
    font-size: 22px;
  }
  
  .news-container {
    padding: 0 30px;
  }
  
  .nav-links {
    gap: 15px;
  }
  
  .carousel-content h1 {
    font-size: 2rem;
  }
  
  .carousel-content p {
    font-size: 1rem;
  }
}
</style>