export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import type { Pago } from '@/lib/supabase/types'

export const metadata = { title: 'Pagos' }

type PagoConRelaciones = Pago & {
  citas: {
    fecha: string
    clientes: { nombre: string } | null
    servicios: { nombre: string } | null
  } | null
}

export default async function PagosPage() {
  const supabase = await createServiceClient()

  const { data } = await supabase
    .from('pagos')
    .select('*, citas(fecha, clientes(nombre), servicios(nombre))')
    .order('created_at', { ascending: false })
    .limit(100)

  const pagos = (data || []) as unknown as PagoConRelaciones[]

  const totalAprobado = pagos
    .filter((p) => p.estado === 'aprobado')
    .reduce((sum, p) => sum + (p.monto || 0), 0)

  const estadoBadge: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
    aprobado: 'success',
    pendiente: 'warning',
    rechazado: 'error',
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-[#0D1B3E] text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            Pagos
          </h1>
          <p className="text-[#5A6A8A] mt-1">Historial de transacciones</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-4 text-right">
          <div className="text-[#5A6A8A] text-sm">Total aprobado</div>
          <div className="text-[#0028A0] text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
            {formatCurrency(totalAprobado)}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F4F6FB]">
                {['Fecha', 'Cliente', 'Servicio', 'Monto', 'Método', 'Estado'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-[#5A6A8A] text-sm font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pagos.map((pago) => (
                <tr key={pago.id} className="hover:bg-[#F4F6FB] transition-colors">
                  <td className="px-6 py-4 text-sm text-[#5A6A8A]">
                    {new Date(pago.created_at).toLocaleDateString('es-AR')}
                  </td>
                  <td className="px-6 py-4 font-medium text-[#0D1B3E]">
                    {pago.citas?.clientes?.nombre || '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#5A6A8A]">
                    {pago.citas?.servicios?.nombre || '—'}
                  </td>
                  <td className="px-6 py-4 font-bold text-[#0028A0]">
                    {pago.monto ? formatCurrency(pago.monto) : '—'}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#5A6A8A] capitalize">
                    {pago.metodo || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={estadoBadge[pago.estado || ''] || 'default'}>
                      {pago.estado || '—'}
                    </Badge>
                  </td>
                </tr>
              ))}
              {pagos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#5A6A8A]">
                    No hay pagos registrados todavía
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
