import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { AgendarWizard } from '@/components/landing/AgendarWizard'

export const metadata = {
  title: 'Agendá tu consulta',
  description:
    'Reservá tu visita técnica gratuita con UV Energy. Elegí servicio, fecha y horario.',
}

export default function AgendarPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6" style={{ background: '#F4F6FB' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#F5A623] font-semibold text-sm tracking-widest uppercase">
              Primer paso
            </span>
            <h1
              className="text-[#0D1B3E] text-4xl md:text-5xl font-bold mt-3 mb-4"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Agendá tu consulta
            </h1>
            <p className="text-[#5A6A8A] text-lg">
              La consulta inicial es <strong>100% gratuita y sin compromiso</strong>.
              Elegí el servicio, la fecha y completá tus datos.
            </p>
          </div>
          <AgendarWizard />
        </div>
      </main>
      <Footer />
    </>
  )
}
