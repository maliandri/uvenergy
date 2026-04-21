'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

export function CTAAgenda() {
  const { ref } = useReveal()

  return (
    <section
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0028A0, #0A1A4A)',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F5A623, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-2xl"
        style={{ background: 'radial-gradient(circle, #008CB4, transparent)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={ref} className="reveal text-center">
          <span className="text-[#F5A623] font-semibold text-sm tracking-widest uppercase">
            ¡Empezá hoy!
          </span>
          <h2
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 leading-tight"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            ¿Listo para pasarte a la{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #F5A623, #FFD166)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              energía solar?
            </span>
          </h2>
          <p className="text-white/70 text-xl mb-10 max-w-2xl mx-auto">
            La consulta inicial es{' '}
            <strong className="text-white">100% gratuita y sin compromiso</strong>. Nuestro
            técnico visita tu hogar o empresa y te entrega un presupuesto en 48 hs.
          </p>

          <Link href="/agendar">
            <Button variant="solar" size="lg" className="text-xl px-10 py-5 group">
              Agendá tu visita técnica
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 text-white/60 text-sm">
            <a
              href="tel:+549294XXXXXXX"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              +54 9 294 XXX-XXXX
            </a>
            <a
              href="mailto:info@uvenergy.com.ar"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@uvenergy.com.ar
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Patagonia, Argentina
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
