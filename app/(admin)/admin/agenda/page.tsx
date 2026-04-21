export const dynamic = 'force-dynamic'

import { createServiceClient } from '@/lib/supabase/server'
import { AgendaView } from '@/components/admin/AgendaView'

export const metadata = { title: 'Agenda' }

export default async function AgendaPage() {
  const supabase = await createServiceClient()

  const hoy = new Date().toISOString().split('T')[0]

  const { data: citas } = await supabase
    .from('citas')
    .select('*, clientes(nombre, email, telefono, verificado), servicios(nombre, slug)')
    .gte('fecha', hoy)
    .order('fecha', { ascending: true })
    .order('hora_inicio', { ascending: true })
    .limit(100)

  return <AgendaView citasIniciales={citas || []} />
}
