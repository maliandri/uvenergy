'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'

export function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return

    const particles: HTMLSpanElement[] = []
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('span')
      p.style.cssText = `
        position:absolute;
        width:${Math.random() * 4 + 2}px;
        height:${Math.random() * 4 + 2}px;
        background:${Math.random() > 0.5 ? '#F5A623' : '#4068C8'};
        border-radius:50%;
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 30}%;
        animation:particle-drift ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 3}s infinite;
        pointer-events:none;
      `
      container.appendChild(p)
      particles.push(p)
    }
    return () => particles.forEach(p => p.remove())
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0A1A4A 0%, #0028A0 50%, #2850B4 100%)',
      }}
    >
      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glowing orb */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F5A623, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 text-white text-sm font-medium animate-fade-in">
          <span className="text-[#F5A623] text-base">⚡</span>
          <span>+500 instalaciones en Patagonia</span>
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" />
        </div>

        {/* Headline */}
        <h1
          className="text-white font-extrabold mb-6 leading-tight animate-fade-in"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            animationDelay: '0.1s',
          }}
        >
          Energía solar para tu{' '}
          <span
            className="relative"
            style={{
              background: 'linear-gradient(135deg, #F5A623, #FFD166)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            hogar y negocio
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-white/80 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          Instalaciones profesionales de paneles solares en Neuquén, Río Negro y Chubut.
          Ahorrá en tu factura de luz desde el primer día.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <Link href="/agendar">
            <Button variant="solar" size="lg" className="group">
              Agendar consulta gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#servicios">
            <Button variant="secondary" size="lg">
              Ver servicios
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          {[
            { value: '+500', label: 'Instalaciones' },
            { value: '10+', label: 'Años de experiencia' },
            { value: '25', label: 'Años de garantía' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold text-[#F5A623]"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                {stat.value}
              </div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#servicios"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-float"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  )
}
