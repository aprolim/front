// components/data/senateChamberStyles.js
export const senateChamberStyles = {
  // Sección principal
  section: 'relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 sm:py-12 lg:py-16 overflow-hidden',
  
  // Elementos decorativos
  decorTop: 'absolute top-0 right-0 w-64 h-64 bg-[#8B1A1A]/10 rounded-full blur-3xl',
  decorBottom: 'absolute bottom-0 left-0 w-64 h-64 bg-[#F9E076]/10 rounded-full blur-3xl',
  
  // Contenedor
  container: 'container mx-auto px-4 sm:px-6 lg:px-8 relative z-10',
  
  // Header
  header: 'text-center mb-8 sm:mb-12 lg:mb-16',
  title: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2',
  titleHighlight: 'text-[#F9E076]',
  subtitle: 'text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto',
  
  // Estadísticas
  statsContainer: 'flex flex-wrap justify-center gap-4 sm:gap-6 mt-6',
  statItem: 'bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20',
  statNumber: 'text-white font-bold text-lg sm:text-xl',
  statLabel: 'text-gray-300 text-xs sm:text-sm ml-2',
  statGreen: 'text-green-400 font-bold text-lg sm:text-xl',
  
  // Leyenda
  legendContainer: 'flex flex-wrap justify-center gap-4 sm:gap-6 mb-8 lg:mb-12',
  legendItem: 'flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm',
  legendDot: 'w-4 h-4 rounded-full',
  legendName: 'text-white font-medium text-xs sm:text-sm',
  legendCount: 'text-white font-bold text-xs sm:text-sm bg-white/20 px-2 py-0.5 rounded-full',
  
  // Mapa
  mapContainer: 'relative max-w-5xl mx-auto',
  mapBackground: 'absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-3xl border border-white/10 backdrop-blur-sm',
  mapContent: 'relative p-4 sm:p-6 lg:p-8',
  
  // Filas
  rowBase: 'flex justify-center gap-2 sm:gap-3 lg:gap-4 mb-2 sm:mb-3 lg:mb-4',
  row1: 'px-4 sm:px-8',
  row2: 'px-2 sm:px-4',
  row3: 'px-2 sm:px-4',
  row4: 'px-4 sm:px-8',
  
  // Escaños
  seatContainer: 'relative group cursor-pointer transition-all duration-300 hover:z-10',
  seatNumber: 'absolute inset-0 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs opacity-50 group-hover:opacity-100',
  seatGlow: 'absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300',
  
  // Estrado
  platform: 'mt-8 sm:mt-10 lg:mt-12 text-center',
  platformInner: 'inline-block bg-gradient-to-r from-[#8B1A1A] to-[#E03636] px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-t-2xl',
  platformText: 'text-white font-bold text-sm sm:text-base lg:text-lg',
  platformLine: 'h-2 bg-gradient-to-r from-[#8B1A1A] via-[#F9E076] to-[#007934] rounded-full',
  
  // Panel de información
  infoPanel: 'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 max-w-xs bg-gray-800 rounded-xl shadow-2xl border border-white/20 backdrop-blur-sm overflow-hidden transition-all duration-300 z-50',
  infoBar: 'h-1',
  infoContent: 'p-4',
  infoHeader: 'flex items-center gap-3 mb-3',
  infoAvatar: 'w-8 h-8 rounded-full',
  infoName: 'text-white font-bold text-sm sm:text-base',
  infoParty: 'text-gray-400 text-xs',
  infoGrid: 'grid grid-cols-2 gap-2 text-xs',
  infoItem: 'bg-white/10 rounded p-2',
  infoLabel: 'text-gray-400 block',
  infoValue: 'text-white font-medium',
  closeButton: 'absolute top-2 right-2 text-gray-400 hover:text-white transition-colors',
  
  // Regiones
  regionsContainer: 'mt-12 lg:mt-16',
  regionsTitle: 'text-white text-lg sm:text-xl lg:text-2xl font-bold text-center mb-6',
  regionsGrid: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4',
  regionCard: 'bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/10 transition-all duration-300',
  regionName: 'text-white font-bold text-xs sm:text-sm mb-2',
  partyBadge: 'text-[10px] px-2 py-0.5 rounded-full',
  regionTotal: 'mt-2 text-right text-white font-bold text-xs'
}