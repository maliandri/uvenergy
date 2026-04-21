'use client'

import { useState, useTransition } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate, formatTime } from '@/lib/utils'
import { CheckCircle2, XCircle, Phone, Mail } from 'lucide-react'
import type { Cita } from '@/lib/supabase/types'

type CitaWithRelations = Cita & {
  clientes: { nombre: string; email: string; telefono: string | null; verificado: boolean } | null
  servicios: { nombre: string; slug: string } | null
}

interface Props {
  citasIniciales: CitaWithRelations[]
}

const estadoConfig: Record<string, { label: string; badge: 'success' | 'warning' | 'error' | 'info' | 'default' }> = {
  confirmada: { label: 'Confirmada', badge: 'success' },
  pendiente: { label: 'Pendiente', badge: 'warning' },
  cancelada: { label: 'Cancelada', badge: 'error' },
  completada: { label: 'Completada', badge: 'info' },
}

export function AgendaView({ citasIniciales }: Props) {
  const [citas, setCitas] = useState(citasIniciales)
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [filtroFecha, setFiltroFecha] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  async function actualizarEstado(citaId: string, nuevoEstado: string) {
    startTransition(async () => {
      const res = await fetch('/api/admin/citas/actualizar-estado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cita_id: citaId, estado: nuevoEstado }),
      })

      if (res.ok) {
        setCitas((prev) =>
          prev.map((c) => (c.id === citaId ? { ...c, estado: nuevoEstado } : c))
        )
      }
    })
  }

  const citasFiltradas = citas.filter((c) => {
    if (filtroEstado !== 'todos' && c.estado !== filtroEstado) return false
    if (filtroFecha && c.fecha !== filtroFecha) return false
    return true
  })

  // Agrupar por fecha
  const porFecha = citasFiltradas.reduce<Record<string, CitaWithRelations[]>>((acc, cita) => {
    if (!acc[cita.fecha]) acc[cita.fecha] = []
    acc[cita.fecha].push(cita)
    return acc
  }, {})

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-[#0D1B3E] text-3xl font-bold"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          Agenda
        </h1>
        <p className="text-[#5A6A8A] mt-1">Gestión de citas y visitas técnicas</p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 flex flex-wrap gap-4 items-center">
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#0028A0]"
        >
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
          <option value="cancelada">Cancelada</option>
          <option value="completada">Completada</option>
        </select>

        <input
          type="date"
          value={filtroFecha}
          onChange={(e) => setFiltroFecha(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#0028A0]"
        />

        {(filtroEstado !== 'todos' || filtroFecha) && (
          <button
            onClick={() => { setFiltroEstado('todos'); setFiltroFecha('') }}
            className="text-[#5A6A8A] text-sm hover:text-[#0028A0] transition-colors"
          >
            Limpiar filtros ×
          </button>
        )}

        <span className="ml-auto text-[#5A6A8A] text-sm">
          {citasFiltradas.length} cita{citasFiltradas.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Citas agrupadas por fecha */}
      {Object.entries(porFecha).map(([fecha, citasDelDia]) => (
        <div key={fecha} className="mb-8">
          <h2
            className="text-[#0D1B3E] font-bold text-lg mb-4"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {formatDate(fecha)}
          </h2>
          <div className="space-y-4">
            {citasDelDia.map((cita) => (
              <CitaCard
                key={cita.id}
                cita={cita}
                onConfirmar={() => actualizarEstado(cita.id, 'confirmada')}
                onCancelar={() => actualizarEstado(cita.id, 'cancelada')}
                loading={isPending}
              />
            ))}
          </div>
        </div>
      ))}

      {citasFiltradas.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-[#5A6A8A]">
          No hay citas para mostrar
        </div>
      )}
    </div>
  )
}

function CitaCard({
  cita,
  onConfirmar,
  onCancelar,
  loading,
}: {
  cita: CitaWithRelations
  onConfirmar: () => void
  onCancelar: () => void
  loading: boolean
}) {
  const config = estadoConfig[cita.estado] || { label: cita.estado, badge: 'default' as const }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[#0028A0] font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
              {formatTime(cita.hora_inicio)} hs
            </span>
            <Badge variant={config.badge}>{config.label}</Badge>
            {cita.pago_estado === 'aprobado' && (
              <Badge variant="success">Seña paga</Badge>
            )}
          </div>

          <div className="font-semibold text-[#0D1B3E] text-base mb-1">
            {cita.clientes?.nombre || '—'}
          </div>
          <div className="text-[#5A6A8A] text-sm mb-2">
            {cita.servicios?.nombre}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-[#5A6A8A]">
            {cita.clientes?.email && (
              <a
                href={`mailto:${cita.clientes.email}`}
                className="flex items-center gap-1 hover:text-[#0028A0] transition-colors"
              >
                <Mail className="w-4 h-4" /> {cita.clientes.email}
              </a>
            )}
            {cita.clientes?.telefono && (
              <a
                href={`tel:${cita.clientes.telefono}`}
                className="flex items-center gap-1 hover:text-[#0028A0] transition-colors"
              >
                <Phone className="w-4 h-4" /> {cita.clientes.telefono}
              </a>
            )}
          </div>

          {cita.notas && (
            <div className="mt-3 p-3 bg-[#F4F6FB] rounded-xl text-sm text-[#5A6A8A] italic">
              "{cita.notas}"
            </div>
          )}
        </div>

        {cita.estado === 'pendiente' && (
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={onConfirmar}
              disabled={loading}
              className="flex items-center gap-1"
            >
              <CheckCircle2 className="w-4 h-4" /> Confirmar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onCancelar}
              disabled={loading}
              className="flex items-center gap-1 !border-red-300 !text-red-600 hover:!bg-red-50"
            >
              <XCircle className="w-4 h-4" /> Cancelar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
