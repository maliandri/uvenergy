import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { CTAAgenda } from '@/components/landing/CTAAgenda'
import { Button } from '@/components/ui/Button'
import { getServicioBySlug, SERVICIOS } from '@/lib/servicios-data'
import { formatCurrency } from '@/lib/utils'
import { CheckCircle2, Clock, ArrowRight } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const servicio = getServicioBySlug(slug)

  if (!servicio) {
    return { title: 'Servicio no encontrado' }
  }

  return {
    title: servicio.nombre,
    description: servicio.descripcion,
    alternates: {
      canonical: `https://uvenergy.com.ar/servicios/${slug}`,
    },
    openGraph: {
      title: `${servicio.nombre} | UV Energy`,
      description: servicio.descripcion,
      images: [{ url: servicio.imagen }],
    },
  }
}

export async function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }))
}

export default async function ServicioPage({ params }: Props) {
  const { slug } = await params
  const servicio = getServicioBySlug(slug)

  if (!servicio) notFound()

  const otrosServicios = SERVICIOS.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero del servicio */}
        <div
          className="relative pt-24 pb-16 px-4 sm:px-6 min-h-[50vh] flex items-end"
          style={{ background: 'linear-gradient(135deg, #0A1A4A, #0028A0)' }}
        >
          {/* Background image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={servicio.imagen}
              alt={servicio.nombre}
              fill
              className="object-cover opacity-20"
              unoptimized
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto w-full">
            <Link
              href="/#servicios"
              className="text-white/60 hover:text-white text-sm mb-6 inline-flex items-center gap-1 transition-colors"
            >
              ← Todos los servicios
            </Link>
            <h1
              className="text-white text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {servicio.nombre}
            </h1>
            <div className="flex items-center gap-6 text-white/70">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Visita de {servicio.duracion} min
              </span>
              <span>
                Desde{' '}
                <strong className="text-[#F5A623] text-lg">
                  {formatCurrency(servicio.precioDesde)}
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <section className="py-20 px-4 sm:px-6 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Descripción */}
            <div className="lg:col-span-2">
              <h2
                className="text-[#0D1B3E] text-3xl font-bold mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Sobre este servicio
              </h2>
              {servicio.descripcionLarga.split('\n\n').map((par, i) => (
                <p key={i} className="text-[#5A6A8A] leading-relaxed mb-4">
                  {par}
                </p>
              ))}

              <h3
                className="text-[#0D1B3E] text-xl font-bold mt-10 mb-5"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Beneficios incluidos
              </h3>
              <ul className="space-y-3">
                {servicio.beneficios.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                    <span className="text-[#0D1B3E]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar CTA */}
            <div>
              <div className="sticky top-24 bg-[#F4F6FB] rounded-2xl p-6 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-[#5A6A8A] text-sm mb-1">Precio desde</div>
                  <div
                    className="text-[#0028A0] text-4xl font-bold"
                    style={{ fontFamily: 'Syne, sans-serif' }}
                  >
                    {formatCurrency(servicio.precioDesde)}
                  </div>
                  <div className="text-[#5A6A8A] text-xs mt-1">*Precio final según relevamiento</div>
                </div>
                <Link href={`/agendar?servicio=${servicio.slug}`}>
                  <Button variant="solar" size="lg" className="w-full group">
                    Agendar consulta gratis
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="text-center text-[#5A6A8A] text-xs mt-4">
                  Consulta inicial sin costo ni compromiso
                </p>
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm text-[#5A6A8A]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0028A0]" />
                    Visita técnica: {servicio.duracion} minutos
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0028A0]" />
                    Presupuesto en 48 hs
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0028A0]" />
                    Sin compromiso de compra
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Otros servicios */}
        {otrosServicios.length > 0 && (
          <section className="py-16 px-4 sm:px-6 bg-[#F4F6FB]">
            <div className="max-w-5xl mx-auto">
              <h3
                className="text-[#0D1B3E] text-2xl font-bold mb-8"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Otros servicios que podrían interesarte
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otrosServicios.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servicios/${s.slug}`}
                    className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#0028A0]/30 hover:shadow-md transition-all"
                  >
                    <h4
                      className="text-[#0D1B3E] font-bold mb-2"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {s.nombre}
                    </h4>
                    <p className="text-[#5A6A8A] text-sm line-clamp-2">{s.descripcion}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTAAgenda />
      </main>
      <Footer />
    </>
  )
}
