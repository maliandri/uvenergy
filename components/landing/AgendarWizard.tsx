'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { SERVICIOS } from '@/lib/servicios-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { CheckCircle2, ChevronRight, Calendar, User, CreditCard } from 'lucide-react'

type Step = 1 | 2 | 3

interface FormData {
  servicio_slug: string
  fecha: string
  hora_inicio: string
  nombre: string
  email: string
  telefono: string
  notas: string
  pagar_senia: boolean
}

const HORARIOS_DEFAULT = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00',
]

export function AgendarWizard() {
  const searchParams = useSearchParams()
  const preselectedSlug = searchParams.get('servicio') || ''

  const [step, setStep] = useState<Step>(preselectedSlug ? 2 : 1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [mpUrl, setMpUrl] = useState('')

  const [form, setForm] = useState<FormData>({
    servicio_slug: preselectedSlug,
    fecha: '',
    hora_inicio: '',
    nombre: '',
    email: '',
    telefono: '',
    notas: '',
    pagar_senia: false,
  })

  const servicio = SERVICIOS.find((s) => s.slug === form.servicio_slug)

  const update = (key: keyof FormData, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }))

  async function handleSubmit() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/agenda/reservar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          servicio_slug: form.servicio_slug,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Hubo un error. Intentá de nuevo.')
        return
      }

      if (data.mp_preference_url) {
        setMpUrl(data.mp_preference_url)
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Error de conexión. Intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2
          className="text-[#0D1B3E] text-2xl font-bold mb-3"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          ¡Consulta registrada!
        </h2>
        <p className="text-[#5A6A8A] mb-2">
          Revisá tu email para verificar tu cuenta y confirmar el turno.
        </p>
        <p className="text-[#5A6A8A] text-sm">
          Nuestro equipo te contactará en las próximas horas.
        </p>
      </div>
    )
  }

  if (mpUrl) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <h2
          className="text-[#0D1B3E] text-2xl font-bold mb-4"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Tu turno está reservado
        </h2>
        <p className="text-[#5A6A8A] mb-6">
          Para confirmar el turno, abonás la seña del 30% ({servicio && formatCurrency(servicio.precioDesde * 0.3)}) vía MercadoPago.
        </p>
        <a href={mpUrl}>
          <Button variant="solar" size="lg" className="w-full">
            Pagar seña con MercadoPago
          </Button>
        </a>
        <button
          onClick={() => setSuccess(true)}
          className="mt-4 text-[#5A6A8A] text-sm hover:text-[#0028A0] transition-colors"
        >
          Pagar después → confirmar sin seña
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Progress */}
      <div className="px-8 pt-8 pb-0">
        <div className="flex items-center gap-3 mb-8">
          {([1, 2, 3] as Step[]).map((s) => (
            <div key={s} className="flex items-center gap-3 flex-1">
              <StepIndicator
                step={s}
                current={step}
                icon={s === 1 ? <CheckCircle2 className="w-4 h-4" /> : s === 2 ? <Calendar className="w-4 h-4" /> : <User className="w-4 h-4" />}
                label={s === 1 ? 'Servicio' : s === 2 ? 'Fecha y hora' : 'Tus datos'}
              />
              {s < 3 && (
                <div
                  className="flex-1 h-0.5 transition-colors"
                  style={{ background: step > s ? '#0028A0' : '#E5E7EB' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-8 pb-8">
        {/* Step 1: Servicio */}
        {step === 1 && (
          <div>
            <h2
              className="text-[#0D1B3E] text-2xl font-bold mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              ¿Qué servicio necesitás?
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {SERVICIOS.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => {
                    update('servicio_slug', s.slug)
                    setStep(2)
                  }}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${
                    form.servicio_slug === s.slug
                      ? 'border-[#0028A0] bg-[#0028A0]/5'
                      : 'border-gray-200 hover:border-[#0028A0]/40 hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[#0D1B3E]">{s.nombre}</div>
                    <div className="text-[#5A6A8A] text-sm mt-0.5">{s.descripcion.slice(0, 60)}...</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#5A6A8A] group-hover:text-[#0028A0] transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Fecha y hora */}
        {step === 2 && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="text-[#5A6A8A] text-sm hover:text-[#0028A0] mb-4 flex items-center gap-1 transition-colors"
            >
              ← Cambiar servicio
            </button>
            <h2
              className="text-[#0D1B3E] text-2xl font-bold mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Elegí fecha y horario
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0D1B3E] mb-2">Fecha</label>
              <input
                type="date"
                value={form.fecha}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => update('fecha', e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0028A0] focus:outline-none transition-colors"
              />
            </div>
            {form.fecha && (
              <div>
                <label className="block text-sm font-medium text-[#0D1B3E] mb-3">
                  Horario disponible — {formatDate(form.fecha)}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {HORARIOS_DEFAULT.map((h) => (
                    <button
                      key={h}
                      onClick={() => update('hora_inicio', h)}
                      className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        form.hora_inicio === h
                          ? 'border-[#0028A0] bg-[#0028A0] text-white'
                          : 'border-gray-200 text-[#0D1B3E] hover:border-[#0028A0]/40'
                      }`}
                    >
                      {h} hs
                    </button>
                  ))}
                </div>
              </div>
            )}
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-6"
              disabled={!form.fecha || !form.hora_inicio}
              onClick={() => setStep(3)}
            >
              Continuar
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {/* Step 3: Datos */}
        {step === 3 && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="text-[#5A6A8A] text-sm hover:text-[#0028A0] mb-4 flex items-center gap-1 transition-colors"
            >
              ← Cambiar fecha/hora
            </button>
            <h2
              className="text-[#0D1B3E] text-2xl font-bold mb-6"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              Tus datos
            </h2>

            {/* Resumen */}
            {servicio && (
              <div className="bg-[#F4F6FB] rounded-xl p-4 mb-6 text-sm">
                <div className="font-semibold text-[#0D1B3E] mb-1">{servicio.nombre}</div>
                <div className="text-[#5A6A8A]">
                  {form.fecha && formatDate(form.fecha)} a las {form.hora_inicio} hs
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0D1B3E] mb-1.5">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => update('nombre', e.target.value)}
                  placeholder="Tu nombre y apellido"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0028A0] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0D1B3E] mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0028A0] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0D1B3E] mb-1.5">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={(e) => update('telefono', e.target.value)}
                  placeholder="+54 9 294 XXX-XXXX"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0028A0] focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0D1B3E] mb-1.5">
                  Notas adicionales
                </label>
                <textarea
                  value={form.notas}
                  onChange={(e) => update('notas', e.target.value)}
                  placeholder="Ej: tengo 4 paneles ya comprados, necesito presupuesto de instalación..."
                  rows={3}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0028A0] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Opción de pagar seña */}
              {servicio?.precioDesde && (
                <div
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    form.pagar_senia
                      ? 'border-[#F5A623] bg-[#F5A623]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => update('pagar_senia', !form.pagar_senia)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        form.pagar_senia
                          ? 'border-[#F5A623] bg-[#F5A623]'
                          : 'border-gray-300'
                      }`}
                    >
                      {form.pagar_senia && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-[#0D1B3E] flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Abonar seña del 30% ({formatCurrency(servicio.precioDesde * 0.3)})
                      </div>
                      <div className="text-[#5A6A8A] text-xs mt-0.5">
                        Asegurate el turno pagando una seña vía MercadoPago
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}

            <Button
              variant="solar"
              size="lg"
              className="w-full mt-6"
              loading={loading}
              disabled={!form.nombre || !form.email || !form.telefono}
              onClick={handleSubmit}
            >
              {form.pagar_senia ? 'Reservar y pagar seña' : 'Reservar turno gratuito'}
            </Button>
            <p className="text-center text-[#5A6A8A] text-xs mt-3">
              Al reservar aceptás nuestros{' '}
              <a href="/terminos" className="text-[#0028A0] hover:underline">
                términos y condiciones
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function StepIndicator({
  step,
  current,
  icon,
  label,
}: {
  step: Step
  current: Step
  icon: React.ReactNode
  label: string
}) {
  const done = current > step
  const active = current === step

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
          done
            ? 'bg-green-500 text-white'
            : active
            ? 'bg-[#0028A0] text-white'
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        {done ? <CheckCircle2 className="w-4 h-4" /> : icon}
      </div>
      <span
        className={`text-xs font-medium hidden sm:block transition-colors ${
          active ? 'text-[#0028A0]' : done ? 'text-green-600' : 'text-gray-400'
        }`}
      >
        {label}
      </span>
    </div>
  )
}
