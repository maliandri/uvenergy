'use client'

import { useReveal } from '@/hooks/useReveal'

const pasos = [
  {
    numero: '01',
    titulo: 'Consulta gratuita',
    descripcion: 'Agendás una visita técnica sin costo. Evaluamos tu consumo y necesidades.',
    icon: '💬',
  },
  {
    numero: '02',
    titulo: 'Diagnóstico',
    descripcion: 'Nuestro técnico visita tu hogar o empresa y relevan el espacio para instalar.',
    icon: '🔍',
  },
  {
    numero: '03',
    titulo: 'Presupuesto',
    descripcion: 'Recibís un presupuesto detallado con diferentes opciones adaptadas a tu budget.',
    icon: '📋',
  },
  {
    numero: '04',
    titulo: 'Instalación',
    descripcion: 'El equipo certificado instala tu sistema en 1 a 3 días. Sin molestias.',
    icon: '⚡',
  },
  {
    numero: '05',
    titulo: 'Monitoreo',
    descripcion: 'Seguís tu producción de energía en tiempo real desde tu celular. Siempre.',
    icon: '📊',
  },
]

export function Proceso() {
  const { ref: titleRef } = useReveal()

  return (
    <section id="proceso" className="py-24 px-4 sm:px-6 bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="reveal text-center mb-16">
          <span className="text-[#F5A623] font-semibold text-sm tracking-widest uppercase">
            Paso a paso
          </span>
          <h2
            className="text-[#0D1B3E] text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Así trabajamos
          </h2>
          <p className="text-[#5A6A8A] text-lg max-w-2xl mx-auto">
            Un proceso claro y transparente, desde el primer contacto hasta la puesta en marcha.
          </p>
        </div>

        {/* Timeline desktop */}
        <div className="hidden lg:flex items-start gap-0 relative">
          {/* Connecting line */}
          <div
            className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#F5A623] via-[#0028A0] to-[#008CB4]"
            style={{ zIndex: 0 }}
          />

          {pasos.map((paso, i) => (
            <PasoCard key={paso.numero} paso={paso} index={i} />
          ))}
        </div>

        {/* Timeline mobile */}
        <div className="flex lg:hidden flex-col gap-6">
          {pasos.map((paso, i) => (
            <PasoCardMobile key={paso.numero} paso={paso} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PasoCard({ paso, index }: { paso: (typeof pasos)[0]; index: number }) {
  const { ref } = useReveal()
  return (
    <div
      ref={ref}
      className="reveal flex-1 flex flex-col items-center text-center relative z-10"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="w-20 h-20 rounded-full bg-white border-4 border-[#0028A0] flex items-center justify-center text-3xl mb-4 shadow-lg">
        {paso.icon}
      </div>
      <div
        className="text-[#F5A623] font-bold text-sm mb-1"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {paso.numero}
      </div>
      <h3
        className="text-[#0D1B3E] font-bold text-base mb-2"
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {paso.titulo}
      </h3>
      <p className="text-[#5A6A8A] text-sm leading-relaxed max-w-[160px]">{paso.descripcion}</p>
    </div>
  )
}

function PasoCardMobile({ paso, index }: { paso: (typeof pasos)[0]; index: number }) {
  const { ref } = useReveal()
  return (
    <div
      ref={ref}
      className="reveal flex items-start gap-5"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-white border-2 border-[#0028A0] flex items-center justify-center text-2xl shadow-md flex-shrink-0">
          {paso.icon}
        </div>
        {index < pasos.length - 1 && (
          <div className="w-0.5 h-12 bg-gradient-to-b from-[#0028A0] to-[#F4F6FB] mt-2" />
        )}
      </div>
      <div className="pt-1">
        <div className="text-[#F5A623] font-bold text-xs mb-0.5">{paso.numero}</div>
        <h3
          className="text-[#0D1B3E] font-bold text-base mb-1"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          {paso.titulo}
        </h3>
        <p className="text-[#5A6A8A] text-sm leading-relaxed">{paso.descripcion}</p>
      </div>
    </div>
  )
}
