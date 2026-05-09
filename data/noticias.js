// data/noticias.js

const slugify = (texto) => {
  if (!texto) return 'noticia'
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const formatearFecha = (fechaStr) => {
  if (!fechaStr) return 'Fecha no disponible'
  const fecha = new Date(fechaStr)
  return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

const generarContenidoCompleto = (titulo, categoria) => {
  return `
    <p>En una sesión histórica del Senado, ${titulo.toLowerCase()}. La iniciativa fue presentada por senadores de diferentes fuerzas políticas y recibió amplio respaldo en la Cámara Alta.</p>
    <p>El proyecto establece un marco normativo claro que permitirá regular y promover el desarrollo del sector. Se estima que su implementación beneficiará a millones de bolivianos en todo el territorio nacional.</p>
    <p>Durante el debate, legisladores de distintos departamentos destacaron la importancia de esta norma para el desarrollo equitativo del país. Se realizaron varias modificaciones al texto original para incorporar sugerencias de diferentes sectores sociales.</p>
    <p>La comisión de ${categoria} será la encargada de dar seguimiento a la implementación de esta ley, que entrará en vigencia 90 días después de su promulgación por el Poder Ejecutivo.</p>
    <p>Organizaciones sociales y gremiales manifestaron su respaldo a la iniciativa, destacando el trabajo conjunto entre el Legislativo y la sociedad civil para alcanzar este importante logro.</p>
  `
}

const imagenesOriginales = [
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1529101091764-c3526daf3e28?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=500&fit=crop'
]

// 4 NOTICIAS IMPORTANTES
const noticiasImportantes = [
  {
    id: 1,
    importante: true,
    titulo: 'Tarija en su aniversario: Leyes, inversión y agenda nacional en una sesión que proyecta desarrollo para Bolivia',
    descripcion: 'En el marco del aniversario del departamento de Tarija, la Cámara de Senadores realizó una sesión especial donde se aprobaron importantes leyes que beneficiarán al desarrollo productivo de la región. Se destinaron más de Bs 500 millones para proyectos de infraestructura vial y energética.',
    descripcion2: 'El presidente del Senado destacó el compromiso del gobierno nacional con el desarrollo equitativo de todos los departamentos, anunciando la construcción de la planta procesadora de uva y la ampliación del aeropuerto Capitán Oriel Lea Plaza.',
    fecha: '2026-04-15',
    fechaFormateada: '15 de abril de 2026',
    imagen: imagenesOriginales[0],
    slug: 'tarija-en-su-aniversario',
    categoria: 'Sesión Especial',
    contenidoCompleto: generarContenidoCompleto('Tarija en su aniversario', 'Sesión Especial')
  },
  {
    id: 2,
    importante: true,
    titulo: 'Senado aprueba Ley General de Aguas para garantizar el acceso al agua potable en todo el territorio nacional',
    descripcion: 'Por unanimidad, la Cámara Alta aprobó la nueva Ley General de Aguas que garantiza el acceso al agua potable como derecho fundamental. La normativa establece mecanismos de distribución equitativa y protección de fuentes hídricas.',
    descripcion2: 'La ley contempla la creación de un fondo de inversión de Bs 1.200 millones para proyectos de riego tecnificado y plantas de tratamiento en áreas rurales y periurbanas. Se estima beneficiar a más de 2 millones de bolivianos.',
    fecha: '2026-04-10',
    fechaFormateada: '10 de abril de 2026',
    imagen: imagenesOriginales[1],
    slug: 'ley-general-de-aguas',
    categoria: 'Medio Ambiente',
    contenidoCompleto: generarContenidoCompleto('la Ley General de Aguas', 'Medio Ambiente')
  },
  {
    id: 3,
    importante: true,
    titulo: 'Comisión de Constitución aprueba dictamen de reforma parcial del sistema judicial',
    descripcion: 'La Comisión de Constitución, Derechos Humanos y Legislación aprobó el proyecto de ley de reforma parcial del Órgano Judicial, que incluye la renovación de altas cortes y mecanismos de transparencia en la elección de autoridades.',
    descripcion2: 'El senador presidente de la comisión señaló que la reforma busca fortalecer la independencia judicial y agilizar los procesos. Se prevé que el pleno del Senado trate el proyecto en las próximas dos semanas.',
    fecha: '2026-04-05',
    fechaFormateada: '5 de abril de 2026',
    imagen: imagenesOriginales[2],
    slug: 'reforma-sistema-judicial',
    categoria: 'Justicia',
    contenidoCompleto: generarContenidoCompleto('la reforma del sistema judicial', 'Justicia')
  },
  {
    id: 4,
    importante: true,
    titulo: 'Bolivia y Chile retoman diálogo bilateral en mesa técnica convocada por el Senado',
    descripcion: 'Representantes del Senado boliviano y del Congreso chileno se reunieron en una mesa técnica para abordar temas de integración fronteriza, comercio bilateral y cooperación en materia hídrica.',
    descripcion2: 'El encuentro, realizado en la ciudad de La Paz, contó con la participación de senadores de ambas naciones quienes acordaron establecer una agenda de trabajo conjunta y próximos encuentros en la ciudad de Antofagasta.',
    fecha: '2026-04-01',
    fechaFormateada: '1 de abril de 2026',
    imagen: imagenesOriginales[3],
    slug: 'dialogo-bilateral-bolivia-chile',
    categoria: 'Relaciones Internacionales',
    contenidoCompleto: generarContenidoCompleto('el diálogo bilateral entre Bolivia y Chile', 'Relaciones Internacionales')
  }
]

// 4 ÚLTIMAS NOTICIAS
const ultimasNoticias = [
  {
    id: 5,
    importante: false,
    titulo: 'Senado impulsa proyecto de ley para fortalecer la seguridad ciudadana',
    fecha: '2026-03-28',
    fechaFormateada: '28 de marzo de 2026',
    imagen: imagenesOriginales[0],
    slug: 'seguridad-ciudadana-senado',
    categoria: 'Seguridad',
    contenidoCompleto: generarContenidoCompleto('la ley de seguridad ciudadana', 'Seguridad')
  },
  {
    id: 6,
    importante: false,
    titulo: 'Comisión de Economía analiza incentivos para el sector productivo',
    fecha: '2026-03-25',
    fechaFormateada: '25 de marzo de 2026',
    imagen: imagenesOriginales[1],
    slug: 'incentivos-sector-productivo',
    categoria: 'Economía',
    contenidoCompleto: generarContenidoCompleto('los incentivos al sector productivo', 'Economía')
  },
  {
    id: 7,
    importante: false,
    titulo: 'Senado declara de prioridad nacional la educación técnica y tecnológica',
    fecha: '2026-03-22',
    fechaFormateada: '22 de marzo de 2026',
    imagen: imagenesOriginales[2],
    slug: 'educacion-tecnica-prioridad',
    categoria: 'Educación',
    contenidoCompleto: generarContenidoCompleto('la educación técnica y tecnológica', 'Educación')
  },
  {
    id: 8,
    importante: false,
    titulo: 'Comisión de Salud aprueba proyecto de ley de medicamentos genéricos',
    fecha: '2026-03-20',
    fechaFormateada: '20 de marzo de 2026',
    imagen: imagenesOriginales[3],
    slug: 'ley-medicamentos-genericos',
    categoria: 'Salud',
    contenidoCompleto: generarContenidoCompleto('la ley de medicamentos genéricos', 'Salud')
  }
]

// Generar 92 noticias adicionales
const categorias = ['Seguridad', 'Economía', 'Educación', 'Salud', 'Infraestructura', 'Energía', 'Cultura', 'Deporte', 'Tecnología', 'Turismo', 'Agricultura', 'Minería']
const noticiasAdicionales = []

for (let i = 1; i <= 92; i++) {
  const categoria = categorias[i % categorias.length]
  const dia = 19 - Math.floor(i / 8)
  const fecha = `2026-03-${dia.toString().padStart(2, '0')}`
  const titulo = `Senado avanza en proyecto de ley sobre ${categoria.toLowerCase()} para beneficio del país`
  
  noticiasAdicionales.push({
    id: 8 + i,
    importante: false,
    titulo: titulo,
    fecha: fecha,
    fechaFormateada: formatearFecha(fecha),
    imagen: imagenesOriginales[i % imagenesOriginales.length],
    slug: slugify(titulo),
    categoria: categoria,
    contenidoCompleto: generarContenidoCompleto(titulo.toLowerCase(), categoria)
  })
}

const todasLasNoticias = [...noticiasImportantes, ...ultimasNoticias, ...noticiasAdicionales]
todasLasNoticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))

export const fetchNoticias = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...todasLasNoticias])
    }, 100)
  })
}

export const getNoticiasImportantes = () => {
  return noticiasImportantes
}

export const getUltimasNoticias = () => {
  return ultimasNoticias
}

export const getNoticiasPaginadas = (pagina = 1, porPagina = 12) => {
  const inicio = (pagina - 1) * porPagina
  return todasLasNoticias.slice(inicio, inicio + porPagina)
}

export const getNoticiaBySlug = (slug) => {
  return todasLasNoticias.find(n => n.slug === slug)
}

export const getTotalPaginas = (porPagina = 12) => {
  return Math.ceil(todasLasNoticias.length / porPagina)
}