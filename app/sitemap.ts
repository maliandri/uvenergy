import { MetadataRoute } from 'next'
import { SERVICIOS } from '@/lib/servicios-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://uvenergy.com.ar'
  const now = new Date()

  const servicioUrls = SERVICIOS.map((s) => ({
    url: `${baseUrl}/servicios/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/agendar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...servicioUrls,
  ]
}
