import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponete en contacto con UV Energy. Instalaciones solares en Patagonia.',
  alternates: { canonical: 'https://uvenergy.com.ar/contacto' },
}

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6" style={{ background: '#F4F6FB' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#F5A623] font-semibold text-sm tracking-widest uppercase">
              Hablemos
            </span>
            <h1
              className="text-[#0D1B3E] text-4xl md:text-5xl font-bold mt-3 mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Contacto
            </h1>
            <p className="text-[#5A6A8A] text-lg">
              ¿Tenés preguntas? Estamos para ayudarte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Info */}
            <div className="space-y-6">
              {[
                {
                  icon: <Phone className="w-6 h-6" />,
                  titulo: 'Teléfono',
                  contenido: '+54 9 294 XXX-XXXX',
                  link: 'tel:+549294XXXXXXX',
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  titulo: 'Email',
                  contenido: 'info@uvenergy.com.ar',
                  link: 'mailto:info@uvenergy.com.ar',
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  titulo: 'Zona de cobertura',
                  contenido: 'Neuquén, Río Negro y Chubut',
                  link: null,
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  titulo: 'Horario de atención',
                  contenido: 'Lunes a Viernes 9:00 - 18:00 hs',
                  link: null,
                },
              ].map((item) => (
                <div
                  key={item.titulo}
                  className="bg-white rounded-2xl p-6 border border-gray-100 flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-[#0028A0]/10 rounded-xl flex items-center justify-center text-[#0028A0] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0D1B3E] mb-1">{item.titulo}</div>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-[#5A6A8A] hover:text-[#0028A0] transition-colors"
                      >
                        {item.contenido}
                      </a>
                    ) : (
                      <div className="text-[#5A6A8A]">{item.contenido}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Formulario básico */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2
                className="text-[#0D1B3E] text-2xl font-bold mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Envianos un mensaje
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0D1B3E] mb-1.5">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0028A0] focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0D1B3E] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0028A0] focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0D1B3E] mb-1.5">
                    Mensaje
                  </label>
                  <textarea
                    rows={5}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0028A0] focus:outline-none transition-colors resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0028A0] text-white font-semibold py-3.5 rounded-xl hover:bg-[#2850B4] transition-colors"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
