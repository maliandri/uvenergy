'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const navLinks = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#proceso', label: 'Cómo trabajamos' },
  { href: '/#por-que', label: 'Por qué UV Energy' },
  { href: '/contacto', label: 'Contacto' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A1A4A]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-[#F5A623] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-[#0A1A4A]" />
          </div>
          <span className="font-bold text-xl text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            UV<span className="text-[#F5A623]">Energy</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <div className="hidden md:block">
          <Link href="/agendar">
            <Button variant="solar" size="sm">Agendá tu consulta</Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0A1A4A] border-t border-white/10 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-white/80 hover:text-white py-2 text-base font-medium border-b border-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/agendar" onClick={() => setOpen(false)}>
            <Button variant="solar" size="md" className="w-full mt-4">
              Agendá tu consulta
            </Button>
          </Link>
        </div>
      )}
    </header>
  )
}
