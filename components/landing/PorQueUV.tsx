'use client'

import { ShieldCheck, Wrench, BarChart3 } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const razones = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    titulo: 'Calidad certificada',
    descripcion:
      'Usamos únicamente paneles y equipos con certificaciones internacionales (IEC, CE, UL). Garantía de 25 años en paneles y 10 años en mano de obra.',
    color: '#F5A623',
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    titulo: 'Instalación profesional',
    descripcion:
      'Equipo de electricistas matriculados con más de 10 años instalando en Patagonia. Conocemos el clima, el viento y las particularidades de la región.',
    color: '#0028A0',
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    titulo: 'Monitoreo incluido',
    descripcion:
      'Todos nuestros sistemas incluyen monitoreo remoto en tiempo real vía app. Sabés exactamente cuánto generás y cuánto ahorrás cada día.',
    color: '#008CB4',
  },
]

function RazonCard({
  razon,
  delay,
}: {
  razon: (typeof razones)[0]
  delay: number
}) {
  const { ref } = useReveal()
  return (
    <div
      ref={ref}
      className="reveal text-center p-8 rounded-2xl bg-[#F4F6FB] hover:shadow-lg transition-all duration-300"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white"
        style={{ background: razon.color }}
      >
        {razon.icon}
      </div>
      <h3
        className="text-[#0D1B3E] text-xl font-bold mb-4"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {razon.titulo}
      </h3>
      <p className="text-[#5A6A8A] leading-relaxed">{razon.descripcion}</p>
    </div>
  )
}

export function PorQueUV() {
  const { ref } = useReveal()

  return (
    <section id="por-que" className="py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <span className="text-[#F5A623] font-semibold text-sm tracking-widest uppercase">
            Nuestra diferencia
          </span>
          <h2
            className="text-[#0D1B3E] text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            ¿Por qué UV Energy?
          </h2>
          <p className="text-[#5A6A8A] text-lg max-w-2xl mx-auto">
            Somos la empresa líder en instalaciones solares en la Patagonia con más de una
            década de experiencia y 500+ proyectos exitosos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {razones.map((razon, i) => (
            <RazonCard key={razon.titulo} razon={razon} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}
