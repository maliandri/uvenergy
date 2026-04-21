export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { formatCurrency } from '@/lib/utils'
import { Calendar, Users, Clock, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export const metadata = { title: 'Dashboard' }

export default async function AdminDashboard() {
  const supabase = await createServiceClient()

  const hoy = new Date().toISOString().split('T')[0]
  const inicioSemana = new Date()
  inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay())
  const semana = inicioSemana.toISOString().split('T')[0]
  const inicioMes = new Date()
  inicioMes.setDate(1)
  const mes = inicioMes.toISOString().split('T')[0]

  const [citasHoyRes, citasSemanaRes, pendientesRes, pagosMesRes, ultimasCitasRes] =
    await Promise.all([
      supabase.from('citas').select('*', { count: 'exact', head: true }).eq('fecha', hoy),
      supabase.from('citas').select('*', { count: 'exact', head: true }).gte('fecha', semana),
      supabase.from('citas').select('*', { count: 'exact', head: true }).eq('estado', 'pendiente'),
      supabase.from('pagos').select('monto').gte('created_at', mes).eq('estado', 'aprobado'),
      supabase
        .from('citas')
        .select('id, estado, fecha, hora_inicio, clientes(nombre, email), servicios(nombre)')
        .order('created_at', { ascending: false })
        .limit(5),
    ])

  const pagosMes = pagosMesRes.data as Array<{ monto: number | null }> | null
  const ultimasCitas = ultimasCitasRes.data as Array<{
    id: string
    estado: string
    fecha: string
    hora_inicio: string
    clientes: { nombre: string; email: string } | null
    servicios: { nombre: string } | null
  }> | null

  const totalMes = (pagosMes || []).reduce((sum, p) => sum + (p.monto || 0), 0)

  const metrics = [
    {
      label: 'Citas hoy',
      value: citasHoyRes.count || 0,
      icon: <Calendar className="w-6 h-6" />,
      color: '#0028A0',
      bg: '#EBF0FF',
    },
    {
      label: 'Citas esta semana',
      value: citasSemanaRes.count || 0,
      icon: <Clock className="w-6 h-6" />,
      color: '#008CB4',
      bg: '#E0F5FA',
    },
    {
      label: 'Pendientes de confirmar',
      value: pendientesRes.count || 0,
      icon: <Users className="w-6 h-6" />,
      color: '#F5A623',
      bg: '#FEF5E4',
    },
    {
      label: 'Pagos del mes',
      value: formatCurrency(totalMes),
      icon: <DollarSign className="w-6 h-6" />,
      color: '#22C55E',
      bg: '#DCFCE7',
    },
  ]

  const estadoBadge: Record<string, 'success' | 'warning' | 'error' | 'info' | 'default'> = {
    confirmada: 'success',
    pendiente: 'warning',
    cancelada: 'error',
    completada: 'info',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#0D1B3E] text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Dashboard
        </h1>
        <p className="text-[#5A6A8A] mt-1">Resumen de actividad — UV Energy</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[#5A6A8A] text-sm mb-1">{m.label}</p>
                <div className="text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: m.color }}>
                  {m.value}
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: m.bg, color: m.color }}>
                {m.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Últimas citas */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[#0D1B3E] font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>
            Últimas citas
          </h2>
          <a href="/admin/agenda" className="text-[#0028A0] text-sm font-medium hover:underline">
            Ver todas →
          </a>
        </div>
        <div className="divide-y divide-gray-50">
          {(ultimasCitas || []).map((cita) => (
            <div key={cita.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-[#0D1B3E]">{cita.clientes?.nombre || '—'}</div>
                <div className="text-[#5A6A8A] text-sm">
                  {cita.servicios?.nombre} · {cita.fecha} {cita.hora_inicio.slice(0, 5)} hs
                </div>
              </div>
              <Badge variant={estadoBadge[cita.estado] || 'default'}>{cita.estado}</Badge>
            </div>
          ))}
          {(ultimasCitas || []).length === 0 && (
            <div className="px-6 py-8 text-center text-[#5A6A8A]">No hay citas todavía</div>
          )}
        </div>
      </div>
    </div>
  )
}
