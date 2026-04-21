'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Zap, Sun, Wrench, Battery, Thermometer, Waves } from 'lucide-react'
import { SERVICIOS } from '@/lib/servicios-data'
import { formatCurrency } from '@/lib/utils'
import { useReveal } from '@/hooks/useReveal'

const iconMap: Record<string, React.ReactNode> = {
  sun: <Sun className="w-7 h-7" />,
  zap: <Zap className="w-7 h-7" />,
  tool: <Wrench className="w-7 h-7" />,
  battery: <Battery className="w-7 h-7" />,
  thermometer: <Thermometer className="w-7 h-7" />,
  waves: <Waves className="w-7 h-7" />,
}

export function ServiciosGrid() {
  const { ref } = useReveal()

  return (
    <section id="servicios" className="py-24 px-4 sm:px-6 bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="reveal text-center mb-16">
          <span className="text-[#F5A623] font-semibold text-sm tracking-widest uppercase">
            Lo que hacemos
          </span>
          <h2
            className="text-[#0D1B3E] text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Nuestros Servicios
          </h2>
          <p className="text-[#5A6A8A] text-lg max-w-2xl mx-auto">
            Soluciones completas de energía solar para hogares y empresas en toda la Patagonia.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICIOS.map((servicio, i) => (
            <ServicioCard key={servicio.slug} servicio={servicio} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicioCard({
  servicio,
  delay,
}: {
  servicio: (typeof SERVICIOS)[0]
  delay: number
}) {
  const { ref } = useReveal()

  return (
    <div
      ref={ref}
      className="reveal group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-[#0028A0]/20 transition-all duration-300"
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#0A1A4A]">
        <Image
          src={servicio.imagen}
          alt={servicio.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />
        {/* Icon overlay */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-[#F5A623] rounded-xl flex items-center justify-center text-[#0A1A4A] shadow-lg">
          {iconMap[servicio.icono]}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-[#0D1B3E] text-xl font-bold mb-2"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {servicio.nombre}
        </h3>
        <p className="text-[#5A6A8A] text-sm leading-relaxed mb-4 line-clamp-3">
          {servicio.descripcion}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-[#5A6A8A] text-xs">Desde</span>
            <div className="text-[#0028A0] font-bold text-lg">
              {formatCurrency(servicio.precioDesde)}
            </div>
          </div>
          <Link
            href={`/servicios/${servicio.slug}`}
            className="flex items-center gap-2 text-[#0028A0] font-semibold text-sm hover:gap-3 transition-all group/link"
          >
            Saber más
            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
