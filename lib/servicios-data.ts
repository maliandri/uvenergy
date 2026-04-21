export const SERVICIOS = [
  {
    slug: 'kit-solar',
    nombre: 'Kit Solar Residencial',
    descripcion: 'Kits fotovoltaicos completos para hogares. Incluye paneles, inversor, estructura y cableado. Energía limpia y ahorro desde el primer día.',
    descripcionLarga: `Nuestros kits solares residenciales son la solución completa para llevar energía renovable a tu hogar en Patagonia. Cada kit incluye paneles fotovoltaicos de alta eficiencia, inversor de última generación, estructura de montaje galvanizada resistente al viento patagónico, cableado certificado y todos los accesorios necesarios para una instalación profesional.

Con un kit solar UV Energy podrás reducir tu factura eléctrica hasta un 90%, recuperar la inversión en 4 a 6 años y contribuir al cuidado del medio ambiente.`,
    precioDesde: 850000,
    imagen: '/uvKitsolar.bmp',
    icono: 'sun',
    color: '--accent-solar',
    beneficios: [
      'Reducción de hasta 90% en la factura eléctrica',
      'Paneles con 25 años de garantía',
      'Monitoreo en tiempo real vía app',
      'Instalación profesional incluida',
    ],
    duracion: 90,
  },
  {
    slug: 'on-grid',
    nombre: 'Sistema On Grid',
    descripcion: 'Sistemas conectados a la red eléctrica con inyección de excedentes. Medición bidireccional con tu distribuidora eléctrica.',
    descripcionLarga: `Los sistemas On Grid o conectados a la red son la opción más económica para usuarios residenciales y comerciales con acceso a la red eléctrica. Permiten aprovechar al máximo la energía solar durante el día e inyectar los excedentes a la red, generando créditos en tu factura.

Trabajamos con inversores certificados y realizamos todos los trámites ante la distribuidora eléctrica local para obtener el medidor bidireccional habilitado.`,
    precioDesde: 1200000,
    imagen: '/uvOnGrid.bmp',
    icono: 'zap',
    color: '--primary',
    beneficios: [
      'Inyección de excedentes a la red',
      'Medidor bidireccional habilitado',
      'Trámites ante distribuidora incluidos',
      'Monitoreo remoto del sistema',
    ],
    duracion: 120,
  },
  {
    slug: 'instalacion-paneles',
    nombre: 'Instalación de Paneles',
    descripcion: 'Servicio profesional de instalación para paneles que ya tenés. Mano de obra especializada, estructura y conexión eléctrica certificada.',
    descripcionLarga: `Si ya contás con tus paneles solares, ofrecemos el servicio profesional de instalación en Patagonia. Nuestro equipo certificado se encarga de toda la instalación: estructura de montaje adaptada a tu techo, cableado, conexión al inversor y puesta en marcha del sistema.

Trabajamos en techos de chapa, teja y losa, con estructuras diseñadas para soportar los vientos patagónicos y las cargas de nieve cuando corresponda.`,
    precioDesde: 180000,
    imagen: '/uvInstalacionPaneles.bmp',
    icono: 'tool',
    color: '--primary-mid',
    beneficios: [
      'Estructura galvanizada antiviento',
      'Electricistas matriculados',
      'Certificación eléctrica',
      'Garantía de instalación 2 años',
    ],
    duracion: 60,
  },
  {
    slug: 'kit-comercios-ups',
    nombre: 'Kit Comercios / UPS',
    descripcion: 'Soluciones de respaldo eléctrico y energía solar para comercios. UPS con baterías de larga duración para proteger tus equipos.',
    descripcionLarga: `Para comercios y empresas, ofrecemos sistemas de respaldo eléctrico (UPS) con baterías de ciclo profundo y opción de carga solar. Protegé tus equipos, sistemas de refrigeración y cámaras de seguridad ante cortes de luz.

Diseñamos sistemas a medida según el consumo y autonomía requerida. Ideal para supermercados, almacenes, farmacias, consultorios y cualquier comercio que no puede permitirse interrupciones en su operación.`,
    precioDesde: 650000,
    imagen: '/uvKitComerciosUPS.bmp',
    icono: 'battery',
    color: '--accent',
    beneficios: [
      'Autonomía de 4 a 24 horas',
      'Protección ante cortes de luz',
      'Carga solar opcional',
      'Monitoreo remoto del sistema',
    ],
    duracion: 90,
  },
  {
    slug: 'refrigeracion',
    nombre: 'Refrigeración Solar',
    descripcion: 'Equipos de refrigeración y aire acondicionado powered by solar. Ideal para zonas rurales o donde la energía es costosa.',
    descripcionLarga: `Nuestros sistemas de refrigeración solar son la solución ideal para zonas rurales, estancias y lugares donde el costo de la energía eléctrica convencional es muy alto. Combinamos paneles solares con equipos de refrigeración DC de alta eficiencia.

Desde heladeras solares DC hasta cámaras frigoríficas para la industria agropecuaria, diseñamos el sistema perfecto para mantener frescos tus alimentos, medicamentos o productos sin depender de la red eléctrica.`,
    precioDesde: 420000,
    imagen: '/uvRefrigeracion.bmp',
    icono: 'thermometer',
    color: '--accent',
    beneficios: [
      'Funciona sin red eléctrica',
      'Equipos DC de alta eficiencia',
      'Ideal para zonas rurales',
      'Temperatura estable 24/7',
    ],
    duracion: 60,
  },
  {
    slug: 'servicios-piscinas',
    nombre: 'Servicios para Piscinas',
    descripcion: 'Climatización y bombas solares para piscinas. Extendé la temporada de baño con calentadores solares y bombas de circulación DC.',
    descripcionLarga: `Aprovechá el sol patagónico para calentar tu piscina y reducir a cero el costo de bombeo. Instalamos colectores solares térmicos para calentamiento de agua, bombas de circulación DC alimentadas por paneles solares y sistemas completos de climatización de piscinas.

Con un sistema solar para piscinas, podés extender la temporada de baño 2 a 3 meses más y eliminar completamente los costos de electricidad del sistema de filtrado.`,
    precioDesde: 280000,
    imagen: '/uvServiciosPiscinas.bmp',
    icono: 'waves',
    color: '--accent',
    beneficios: [
      'Temporada extendida 2-3 meses',
      'Costo de bombeo $0',
      'Calentadores solares térmicos',
      'Instalación certificada',
    ],
    duracion: 60,
  },
]

export type ServicioData = typeof SERVICIOS[0]

export function getServicioBySlug(slug: string): ServicioData | undefined {
  return SERVICIOS.find(s => s.slug === slug)
}
