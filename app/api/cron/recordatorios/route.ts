import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendRecordatorio } from '@/lib/emails'

export async function GET(req: NextRequest) {
  // Verifica Authorization header para seguridad del cron
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createServiceClient()

  // Citas confirmadas para mañana
  const manana = new Date()
  manana.setDate(manana.getDate() + 1)
  const fechaManana = manana.toISOString().split('T')[0]

  const { data: citas } = await supabase
    .from('citas')
    .select('*, clientes(*), servicios(*)')
    .eq('fecha', fechaManana)
    .eq('estado', 'confirmada')

  let enviados = 0

  for (const cita of citas || []) {
    const cliente = cita.clientes as any
    const servicio = cita.servicios as any

    if (cliente?.email) {
      await sendRecordatorio(
        cliente.email,
        cliente.nombre,
        servicio.nombre,
        cita.fecha,
        cita.hora_inicio
      )
      enviados++
    }
  }

  return NextResponse.json({ enviados, fecha: fechaManana })
}
