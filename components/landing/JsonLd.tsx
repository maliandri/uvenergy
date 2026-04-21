import { SERVICIOS } from '@/lib/servicios-data'

export function JsonLdLocalBusiness() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'UV Energy',
    description:
      'Instalación profesional de paneles solares y sistemas de energía solar en Patagonia, Argentina.',
    url: 'https://uvenergy.com.ar',
    telephone: '+54-9-294-XXX-XXXX',
    email: 'info@uvenergy.com.ar',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Neuquén',
      addressCountry: 'AR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -38.9516,
      longitude: -68.0591,
    },
    areaServed: ['Neuquén', 'Río Negro', 'Chubut'],
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Energía Solar',
      itemListElement: SERVICIOS.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.nombre,
          description: s.descripcion,
          url: `https://uvenergy.com.ar/servicios/${s.slug}`,
        },
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
