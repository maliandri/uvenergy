import Link from 'next/link'
import { Zap, Phone, Mail, MapPin, Globe } from 'lucide-react'
import { SERVICIOS } from '@/lib/servicios-data'

export function Footer() {
  return (
    <footer
      className="text-white py-16 px-4 sm:px-6"
      style={{ background: '#0A1A4A' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#F5A623] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#0A1A4A]" />
              </div>
              <span
                className="font-bold text-2xl"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                UV<span className="text-[#F5A623]">Energy</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Energía solar profesional en Patagonia. Más de 10 años instalando el futuro
              energético en Neuquén, Río Negro y Chubut.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: <Globe className="w-5 h-5" />, href: '#', label: 'Instagram' },
                { icon: <Globe className="w-5 h-5" />, href: '#', label: 'Facebook' },
                { icon: <Globe className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-[#F5A623] hover:text-[#0A1A4A] transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4
              className="text-white font-bold text-base mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Servicios
            </h4>
            <ul className="space-y-3">
              {SERVICIOS.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="text-white/60 hover:text-[#F5A623] text-sm transition-colors"
                  >
                    {s.nombre}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-white font-bold text-base mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Empresa
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/#por-que', label: '¿Por qué UV Energy?' },
                { href: '/#proceso', label: 'Cómo trabajamos' },
                { href: '/contacto', label: 'Contacto' },
                { href: '/agendar', label: 'Agendá tu consulta' },
                { href: '/admin/login', label: 'Acceso admin' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-[#F5A623] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4
              className="text-white font-bold text-base mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F5A623] mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">
                  Patagonia Argentina
                  <br />
                  Neuquén, Río Negro y Chubut
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <a
                  href="tel:+549294XXXXXXX"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  +54 9 294 XXX-XXXX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <a
                  href="mailto:info@uvenergy.com.ar"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  info@uvenergy.com.ar
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} UV Energy. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/politica-privacidad" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
