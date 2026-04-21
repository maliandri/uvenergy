'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/landing/Navbar'
import { Footer } from '@/components/landing/Footer'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'
import { Suspense } from 'react'

function ConfirmacionContent() {
  const params = useSearchParams()
  const status = params.get('status')

  const config = {
    success: {
      icon: <CheckCircle2 className="w-16 h-16 text-green-500" />,
      title: '¡Pago aprobado!',
      message: 'Tu seña fue procesada exitosamente. Te enviamos un email de confirmación.',
      color: 'text-green-600',
    },
    failure: {
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      title: 'Pago no completado',
      message: 'El pago no pudo procesarse. Tu cita quedó registrada sin seña.',
      color: 'text-red-600',
    },
    pending: {
      icon: <Clock className="w-16 h-16 text-yellow-500" />,
      title: 'Pago pendiente',
      message: 'Tu pago está siendo procesado. Te notificaremos cuando se acredite.',
      color: 'text-yellow-600',
    },
    default: {
      icon: <CheckCircle2 className="w-16 h-16 text-[#0028A0]" />,
      title: '¡Consulta registrada!',
      message: 'Recibimos tu solicitud. Te contactaremos para confirmar el turno.',
      color: 'text-[#0028A0]',
    },
  }

  const c = config[(status as keyof typeof config) || 'default'] || config.default

  return (
    <div className="text-center">
      <div className="flex justify-center mb-6">{c.icon}</div>
      <h1
        className={`text-3xl font-bold mb-4 ${c.color}`}
        style={{ fontFamily: 'Syne, sans-serif' }}
      >
        {c.title}
      </h1>
      <p className="text-[#5A6A8A] text-lg mb-8 max-w-md mx-auto">{c.message}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button variant="primary">Volver al inicio</Button>
        </Link>
        <Link href="/agendar">
          <Button variant="outline">Agendar otra consulta</Button>
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmacionPage() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center"
        style={{ background: '#F4F6FB' }}
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 max-w-lg w-full">
          <Suspense fallback={<div className="text-center text-[#5A6A8A]">Cargando...</div>}>
            <ConfirmacionContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
