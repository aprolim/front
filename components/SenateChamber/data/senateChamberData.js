// components/SenateChamber/data/senateChamberData.js

// ============================================
// POSICIONES SVG
// ============================================
export const seatPositions = {
  upperLeft: [
    { x: 399, y: 303 }, { x: 405, y: 343 }, { x: 421, y: 380 },
    { x: 445, y: 412 }, { x: 477, y: 436 }, { x: 513, y: 455 },
    { x: 553, y: 465 }
  ],
  upperRight: [
    { x: 647, y: 465 }, { x: 687, y: 455 }, { x: 723, y: 436 },
    { x: 755, y: 412 }, { x: 779, y: 380 }, { x: 795, y: 343 },
    { x: 801, y: 303 }
  ],
  lowerLeft: [
    { x: 280, y: 252 }, { x: 283, y: 301 }, { x: 292, y: 349 },
    { x: 307, y: 395 }, { x: 328, y: 438 }, { x: 355, y: 477 },
    { x: 388, y: 511 }, { x: 423, y: 538 }, { x: 464, y: 559 },
    { x: 507, y: 573 }, { x: 553, y: 580 }
  ],
  lowerRight: [
    { x: 647, y: 580 }, { x: 693, y: 573 }, { x: 736, y: 559 },
    { x: 777, y: 538 }, { x: 812, y: 511 }, { x: 845, y: 477 },
    { x: 872, y: 438 }, { x: 893, y: 395 }, { x: 908, y: 349 },
    { x: 917, y: 301 }, { x: 920, y: 252 }
  ]
}

// ============================================
// ESTILOS DEL SENADO
// ============================================
export const senateChamberStyles = {
  senator: 'grid grid-cols-1 md:grid-cols-3 gap-4',
  senatorPhoto: 'w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48'
}

// ============================================
// PARTIDOS
// ============================================
export const defaultParties = [
  { id: 'Partido Demócrata Cristiano', name: 'Partido Demócrata Cristiano', shortName: 'PDC', color: '#016167', count: 16 },
  { id: 'Libre', name: 'Libre', shortName: 'LIBRE', color: '#FF0000', count: 12 },
  { id: 'Unidad', name: 'Unidad', shortName: 'UNIDAD', color: '#FFB848', count: 7 },
  { id: 'Autonomía para Bolivia Súmate', name: 'Autonomía para Bolivia Súmate', shortName: 'APB', color: '#511966', count: 1 }
]

// ============================================
// SENADORES - COMPLETO (36 senadores)
// ============================================
export const defaultSenators = [
  // ============ PDC - GOBIERNO (16 senadores) ============
  { 
    id: 1, seatNumber: 1, curve: 'upper', side: 'left', 
    name: "Diego Esteban Mateo Ávila Navajas", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Tarija", age: 52, profession: "Abogado", 
    email: "davila@senado.gob.bo", phone: "+591 71562341", office: "Edificio Presidente, Piso 10",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/DIEGO ESTEBAN MATEO ÁVILA NAVAJAS.png",
    comision:"Directiva Legislatura 2025-2026",
    comite:"",
    cargo:"Presidente"
  },
  { 
    id: 2, seatNumber: 2, curve: 'upper', side: 'left', 
    name: "Bertha Cartagena Sánchez", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Chuquisaca", age: 58, profession: "Socióloga", 
    email: "bcartagena@senado.gob.bo", phone: "+591 71456982", office: "Edificio Presidente, Piso 9",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/BERTHA CARTAGENA SANCHEZ.png",
    comision:"",
    comite:"Comité de Culturas, Interculturalidad y Patrimonio Cultural",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 3, seatNumber: 3, curve: 'upper', side: 'left', 
    name: "Daniel Antonio Ortiz Velásquez", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Chuquisaca", age: 55, profession: "Abogado", 
    email: "dortiz@senado.gob.bo", phone: "+591 71234567", office: "Edificio Presidente, Piso 9",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/DANIEL ANTONIO ORTIZ VELASQUEZ.png",
    comision:"Comisión de Constitución, Derechos Humanos, Legislación y Sistema Electoral",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  { 
    id: 4, seatNumber: 4, curve: 'upper', side: 'left', 
    name: "Nicanor Gonzalo Cochi Condorí", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "La Paz", age: 53, profession: "Ingeniero", 
    email: "ncochi@senado.gob.bo", phone: "+591 72567890", office: "Edificio Presidente, Piso 8",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/NICANOR GONZALO COCHI CONDORI.png",
    comision:"Comisión de Política Internacional y Protección al Migrante",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  {
    id: 5, seatNumber: 5, curve: 'upper', side: 'left', 
    name: "Ana María Crispin Choque", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "La Paz", age: 49, profession: "Educadora", 
    email: "acrispin@senado.gob.bo", phone: "+591 73456789", office: "Edificio Presidente, Piso 8",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/ANA MARIA CRISPIN CHOQUE.png",
    comision:"Comisión de Economía Plural, Producción e Industria",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  { 
    id: 6, seatNumber: 6, curve: 'upper', side: 'left', 
    name: "Wilder Véliz Armas", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Cochabamba", age: 51, profession: "Médico", 
    email: "wveliz@senado.gob.bo", phone: "+591 74567891", office: "Edificio Presidente, Piso 7",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/WILDER VELIZ ARMAS.png",
    comision:"",
    comite:"Comité de Justicia Plural y Consejo de la Magistratura.",
    cargo:"Secretario de Comite"
  },
  { 
    id: 7, seatNumber: 7, curve: 'upper', side: 'left', 
    name: "Judith Rosario García Coca", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Cochabamba", age: 47, profession: "Abogada", 
    email: "jgarcia@senado.gob.bo", phone: "+591 75678912", office: "Edificio Presidente, Piso 7",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/JUDITH ROSARIO GARCIA COCA.png",
    comision:"Comisión de Seguridad del Estado",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  { 
    id: 8, seatNumber: 15, curve: 'lower', side: 'left', 
    name: "Yasmín Estivariz Villarroel", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Oruro", age: 48, profession: "Ingeniera", 
    email: "yestivariz@senado.gob.bo", phone: "+591 76789123", office: "Edificio Presidente, Piso 6",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/YASMIN ESTIVARIZ VILLARROEL.png",
    comision:"Directiva Legislatura 2025-2026",
    comite:"",
    cargo:"Primera Secretaria"
  },
  { 
    id: 9, seatNumber: 16, curve: 'lower', side: 'left', 
    name: "Freddy Castillo Chávez", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Oruro", age: 56, profession: "Economista", 
    email: "fcastillo@senado.gob.bo", phone: "+591 77891234", office: "Edificio Presidente, Piso 6",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/FREDDY CASTILLO CHAVEZ.png",
    comision:"",
    comite:"Comité de Constitución, Legislación e Interpretación Legislativa y Constitucional.",
    cargo:"Secretario de Comite"
  },
  { 
    id: 10, seatNumber: 17, curve: 'lower', side: 'left', 
    name: "Maria Antonieta Alcón Sánchez", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Oruro", age: 54, profession: "Administradora", 
    email: "malcon@senado.gob.bo", phone: "+591 78912345", office: "Edificio Presidente, Piso 5",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/MARIA ANTONIETA ALCON SANCHEZ.png",
    comision:"",
    comite:"Comité de Educación, Salud, Ciencia, Tecnología y Deporte",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 11, seatNumber: 18, curve: 'lower', side: 'left', 
    name: "Bertha Nurmy Gutiérrez Meneces", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Potosí", age: 59, profession: "Trabajadora Social", 
    email: "bgutierrez@senado.gob.bo", phone: "+591 79123456", office: "Edificio Presidente, Piso 5",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/BERTHA NURMY GUTIERREZ MENESES.png",
    comision:"",
    comite:"Comité de Naciones y Pueblos Indígena Originario Campesinos",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 12, seatNumber: 19, curve: 'lower', side: 'left', 
    name: "Marcelino Flores Ordoñez", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Potosí", age: 62, profession: "Minero", 
    email: "mflores@senado.gob.bo", phone: "+591 70234567", office: "Edificio Presidente, Piso 4",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/MARCELINO FLORES ORDOÑEZ.png",
    comision:"",
    comite:"Comité de Energía, Hidrocarburos, Minería y Metalurgia",
    cargo:"Secretario de Comite"
  },
  { 
    id: 13, seatNumber: 20, curve: 'lower', side: 'left', 
    name: "Paola Limbania López Zeballos", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Santa Cruz", age: 45, profession: "Abogada", 
    email: "plopez@senado.gob.bo", phone: "+591 71345678", office: "Edificio Presidente, Piso 4",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/PAOLA LIMBANIA LOPEZ ZEBALLOS.png",
    comision:"",
    comite:"Comité de Seguridad del Estado y Lucha Contra el Narcotráfico",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 14, seatNumber: 21, curve: 'lower', side: 'left', 
    name: "Erick Nelson Soruco Alpire", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Beni", age: 50, profession: "Ganadero", 
    email: "esoruco@senado.gob.bo", phone: "+591 72456789", office: "Edificio Presidente, Piso 3",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/ERICK NELSON SORUCO ALPIRE.png",
    comision:"Comisión de Justicia Plural, Ministerio Público y Defensa del Estado",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  { 
    id: 15, seatNumber: 22, curve: 'lower', side: 'left', 
    name: "Cinthia Mónica Puerta Campos", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Pando", age: 43, profession: "Empresaria", 
    email: "cpuerta@senado.gob.bo", phone: "+591 73567890", office: "Edificio Presidente, Piso 3",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/CINTIA MONICA PUERTA CAMPOS.png",
    comision:"",
    comite:"Comité de Medio Ambiente, Biodiversidad, Amazonía, Áreas Protegidas y Cambio Climático",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 16, seatNumber: 23, curve: 'lower', side: 'left', 
    name: "José Sánchez Aguilar", 
    party: "Partido Demócrata Cristiano", partyShort: "PDC", partyColor: "#016167", bancada: "Gobierno", 
    department: "Oruro", age: 57, profession: "Ingeniero", 
    email: "jsanchez@senado.gob.bo", phone: "+591 74678901", office: "Edificio Presidente, Piso 2",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/JOSE SANCHEZ AGUILAR.png",
    comision:"Comisión de Política Social",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  // ============ UNIDAD - ALIADOS (7 senadores) ============
  { 
    id: 17, seatNumber: 8, curve: 'upper', side: 'right', 
    name: "Carmen Soledad Chapeton Tancara", 
    party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
    department: "La Paz", age: 52, profession: "Abogada", 
    email: "schapeton@senado.gob.bo", phone: "+591 75789012", office: "Edificio Aliados, Piso 10",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/CARMEN SOLEDAD CHAPETÓN TANCARA.png",
    comision:"Directiva Legislatura 2025-2026",
    comite:"",
    cargo:"Primera Vicepresidencia"
  },
  { 
    id: 18, seatNumber: 9, curve: 'upper', side: 'right', 
    name: "César Mentasti Padilla", 
    party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
    department: "Tarija", age: 58, profession: "Empresario", 
    email: "cmentasti@senado.gob.bo", phone: "+591 76890123", office: "Edificio Aliados, Piso 10",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/CESAR MENTASTI PADILLA.png",
    comision:"Comisión de Organización Territorial del Estado y Autonomías",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  { 
    id: 19, seatNumber: 10, curve: 'upper', side: 'right', 
    name: "Leonor Rosalva Romero Gutiérrez", 
    party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
    department: "Tarija", age: 55, profession: "Médica", 
    email: "lromero@senado.gob.bo", phone: "+591 77901234", office: "Edificio Aliados, Piso 9",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/LEONOR ROSALVA ROMERO GUTIERREZ.png",
    comision:"",
    comite:"Comité de Planificación, Presupuesto, Inversión Pública y Contraloría General del Estado",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 20, seatNumber: 14, curve: 'lower', side: 'right', 
    name: "Rosa Tatiana Áñez Carrasco", 
    party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
    department: "Santa Cruz", age: 49, profession: "Abogada", 
    email: "tanez@senado.gob.bo", phone: "+591 78123456", office: "Edificio Aliados, Piso 9",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/ROSA TATIANA AÑEZ CARRASCO.png",
    comision:"Directiva Legislatura 2025-2026",
    comite:"",
    cargo:"Tercera Secretaria"
  },
  { 
    id: 21, seatNumber: 13, curve: 'lower', side: 'right', 
    name: "José Roca Haensel", 
    party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
    department: "Beni", age: 61, profession: "Ganadero", 
    email: "jroca@senado.gob.bo", phone: "+591 79234567", office: "Edificio Aliados, Piso 8",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/JOSE ROCA HAENSEL.png",
    comision:"",
    comite:"Comité de Autonomías Municipales, Indigena Originario Campesinas y Regionales",
    cargo:"Secretario de Comite"
  },
  { 
    id: 22, seatNumber: 11, curve: 'lower', side: 'right', 
    name: "Ana Karina Velasco Añez", 
    party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
    department: "Beni", age: 47, profession: "Abogada", 
    email: "avelasco@senado.gob.bo", phone: "+591 70345678", office: "Edificio Aliados, Piso 8",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/ANA KARINA VELASCO ÁÑEZ.png",
    comision:"",
    comite:"Comité de Fuerzas Armadas y Policía Boliviana",
    cargo:"Secretaria de comite"
  },
  { 
    id: 23, seatNumber: 12, curve: 'lower', side: 'right', 
    name: "Eliana Rina Acosta Quispe", 
    party: "Unidad", partyShort: "UNIDAD", partyColor: "#FFB848", bancada: "Aliados", 
    department: "Pando", age: 44, profession: "Administradora", 
    email: "eacosta@senado.gob.bo", phone: "+591 71456789", office: "Edificio Aliados, Piso 7",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/ELIANA RINA ACOSTA QUISPE.png",
    comision:"Comisión de Planificación, Política Económica y Finanzas",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  // ============ APB SÚMATE - ALIADOS (1 senador) ============
  { 
    id: 24, seatNumber: 36, curve: 'upper', side: 'right', 
    name: "Claudia Mallón Vargas", 
    party: "Autonomía para Bolivia Súmate", partyShort: "APB", partyColor: "#511966", bancada: "Aliados", 
    department: "Cochabamba", age: 46, profession: "Abogada", 
    email: "cmallon@senado.gob.bo", phone: "+591 72567890", office: "Edificio Aliados, Piso 7",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/CLAUDIA MALLON VARGAS.png",
    comision:"",
    comite:"Comité de Vivienda, Regimen Laboral, Seguridad Industrial y Seguridad Social",
    cargo:"Secretaria de Comite"
  },
  // ============ LIBRE - OPOSICIÓN (12 senadores) ============
  { 
    id: 25, seatNumber: 29, curve: 'upper', side: 'right', 
    name: "José Manuel Ormachea Mendieta", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "La Paz", age: 59, profession: "Abogado", 
    email: "jormachea@senado.gob.bo", phone: "+591 73678901", office: "Edificio Oposición, Piso 10",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/JOSE MANUEL ORMACHEA MENDIETA.png",
    comision:"Comisión de Naciones y Pueblos Indígena Originario Campesinos, Culturas e Interculturalidad",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  { 
    id: 26, seatNumber: 27, curve: 'upper', side: 'right', 
    name: "Wanda Ximena Medrano Hervas", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Cochabamba", age: 48, profession: "Abogada", 
    email: "wmedrano@senado.gob.bo", phone: "+591 74789012", office: "Edificio Oposición, Piso 10",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/WANDA XIMENA MEDRANO HERVAS.png",
    comision:"",
    comite:"Comité de Relaciones Económicas Internacionales",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 27, seatNumber: 26, curve: 'upper', side: 'right', 
    name: "Branko Goran Marinković Jovicevic", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Santa Cruz", age: 54, profession: "Empresario", 
    email: "bmarinkovic@senado.gob.bo", phone: "+591 75890123", office: "Edificio Oposición, Piso 9",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/BRANKO GORAN MARINKOVIC JOVICEVIC.png",
    comision:"Comisión de Tierra y Territorio / Región Amazónica",
    comite:"",
    cargo:"Presidente de Comisión"
  },
  { 
    id: 28, seatNumber: 30, curve: 'lower', side: 'right', 
    name: "Kathia Lizbeth Quiroga Fernández", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Santa Cruz", age: 45, profession: "Abogada", 
    email: "kquiroga@senado.gob.bo", phone: "+591 76901234", office: "Edificio Oposición, Piso 9",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/KATHIA LISBETH QUIROGA FERNÁNDEZ.png",
    comision:"Directiva Legislatura 2025-2026",
    comite:"",
    cargo:"Segunda Vicepresidencia"
  },
  { 
    id: 29, seatNumber: 31, curve: 'lower', side: 'right', 
    name: "Tomasa Yarhui Jacome", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Chuquisaca", age: 62, profession: "Abogada", 
    email: "tyarhui@senado.gob.bo", phone: "+591 77123456", office: "Edificio Oposición, Piso 8",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/TOMASA YARHUI JACOME.png",
    comision:"",
    comite:"Comité de Sistema Electoral, Derechos Humanos y Equidad Social",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 30, seatNumber: 32, curve: 'lower', side: 'right', 
    name: "Abdon Porcel Arancibia", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Chuquisaca", age: 57, profession: "Abogado", 
    email: "aporcel@senado.gob.bo", phone: "+591 78234567", office: "Edificio Oposición, Piso 8",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g1/ABDON PORCEL ARANCIBIA.png",
    comision:"",
    comite:"Comité de Políticas Financiera, Monetaria, Tributaria y Seguros",
    cargo:"Secretario de Comite"
  },
  { 
    id: 31, seatNumber: 33, curve: 'lower', side: 'right', 
    name: "Teresa Alarcón Arana", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Potosí", age: 56, profession: "Docente", 
    email: "talarcon@senado.gob.bo", phone: "+591 79345678", office: "Edificio Oposición, Piso 7",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/TERESA ALARCON ARANA.png",
    comision:"",
    comite:"Comité de Asuntos Exteriores Interpelatorios y Organismos Internacionales",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 32, seatNumber: 34, curve: 'lower', side: 'right', 
    name: "Betty Canaviri Villanueva", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Potosí", age: 53, profession: "Educadora", 
    email: "bcanaviri@senado.gob.bo", phone: "+591 70456789", office: "Edificio Oposición, Piso 7",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/BETTY CANAVIRI VILLANUEVA.png",
    comision:"",
    comite:"Comité de Economía Plural, Desarrollo Productivo, Obras Públicas e Infraestructura",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 33, seatNumber: 35, curve: 'lower', side: 'right', 
    name: "María Isabel Moreno Cortez", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Tarija", age: 50, profession: "Abogada", 
    email: "mimoreno@senado.gob.bo", phone: "+591 71567890", office: "Edificio Oposición, Piso 6",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g2/MARIA ISABEL MORENO CORTEZ.png",
    comision:"",
    comite:"Comité de Ministerio Público y Defensa Legal del Estado",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 34, seatNumber: 24, curve: 'lower', side: 'right', 
    name: "Ernesto Suarez Sattori", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Beni", age: 55, profession: "Empresario", 
    email: "esuarez@senado.gob.bo", phone: "+591 72678901", office: "Edificio Oposición, Piso 6",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/ERNESTO SUAREZ SATTORI.png",
    comision:"",
    comite:"Comité de Autonomías Departamentales",
    cargo:"Secretario de Comite"
  },
  { 
    id: 35, seatNumber: 28, curve: 'lower', side: 'left', 
    name: "Carol Carlo Durán", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Pando", age: 49, profession: "Abogado", 
    email: "ccarlo@senado.gob.bo", phone: "+591 73789012", office: "Edificio Oposición, Piso 5",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/CAROL CARLO DURAN.png",
    comision:"",
    comite:"Comité de Tierra y Territorio, Recursos Naturales y Hoja de la Coca",
    cargo:"Secretaria de Comite"
  },
  { 
    id: 36, seatNumber: 25, curve: 'lower', side: 'left', 
    name: "Julio Diego Romaña Galindo", 
    party: "Libre", partyShort: "LIBRE", partyColor: "#FF0000", bancada: "Oposición", 
    department: "Pando", age: 52, profession: "Abogado", 
    email: "jromana@senado.gob.bo", phone: "+591 74890123", office: "Edificio Oposición, Piso 5",
    twitter: "https://twitter.com/", instagram: "https://instagram.com/", 
    youtube: "https://youtube.com/", linkedin: "https://linkedin.com/",
    photoUrl: "/new/titulares/g3/JULIO DIEGO ROMAÑA GALINDO.png",
    comision:"Directiva Legislatura 2025-2026",
    comite:"",
    cargo:"Segunda Secretaria"
  }
]