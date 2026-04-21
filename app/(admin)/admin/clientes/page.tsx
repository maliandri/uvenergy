export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import { CheckCircle2, XCircle, Mail, Phone } from 'lucide-react'
import type { Cliente } from '@/lib/supabase/types'

export const metadata = { title: 'Clientes' }

type ClienteConCitas = Cliente & { citas: { count: number }[] }

export default async function ClientesPage() {
  const supabase = await createServiceClient()

  const { data } = await supabase
    .from('clientes')
    .select('*, citas(count)')
    .order('created_at', { ascending: false })

  const clientes = (data || []) as unknown as ClienteConCitas[]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[#0D1B3E] text-3xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Clientes
        </h1>
        <p className="text-[#5A6A8A] mt-1">{clientes.length} clientes registrados</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F4F6FB]">
                {['Nombre', 'Contacto', 'Verificado', 'Citas', 'Registro'].map((h) => (
                  <th key={h} className="text-left px-6 py-4 text-[#5A6A8A] text-sm font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {clientes.map((c) => (
                <tr key={c.id} className="hover:bg-[#F4F6FB] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#0D1B3E]">{c.nombre}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${c.email}`} className="flex items-center gap-1.5 text-sm text-[#5A6A8A] hover:text-[#0028A0] transition-colors">
                        <Mail className="w-3.5 h-3.5" />{c.email}
                      </a>
                      {c.telefono && (
                        <a href={`tel:${c.telefono}`} className="flex items-center gap-1.5 text-sm text-[#5A6A8A] hover:text-[#0028A0] transition-colors">
                          <Phone className="w-3.5 h-3.5" />{c.telefono}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {c.verificado
                      ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                      : <XCircle className="w-5 h-5 text-gray-300" />}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="info">{c.citas?.[0]?.count ?? 0} citas</Badge>
                  </td>
                  <td className="px-6 py-4 text-[#5A6A8A] text-sm">
                    {formatDate(c.created_at.split('T')[0])}
                  </td>
                </tr>
              ))}
              {clientes.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#5A6A8A]">
                    No hay clientes registrados todavía
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
