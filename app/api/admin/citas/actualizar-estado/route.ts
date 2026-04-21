import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendCitaConfirmada } from '@/lib/emails'

export async function POST(req: NextRequest) {
  try {
    const { cita_id, estado } = await req.json()

    const estadosValidos = ['pendiente', 'confirmada', 'cancelada', 'completada']
    if (!estadosValidos.includes(estado)) {
      return NextResponse.json({ error: 'Estado inválido' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    const { data: citaData } = await supabase
      .from('citas')
      .select('id, fecha, hora_inicio, clientes(nombre, email), servicios(nombre)')
      .eq('id', cita_id)
      .single()

    if (!citaData) {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 })
    }

    await supabase.from('citas').update({ estado } as any).eq('id', cita_id)

    const cita = citaData as unknown as {
      id: string; fecha: string; hora_inicio: string
      clientes: { nombre: string; email: string } | null
      servicios: { nombre: string } | null
    }

    if (estado === 'confirmada' && cita.clientes?.email) {
      await sendCitaConfirmada(
        cita.clientes.email,
        cita.clientes.nombre,
        cita.servicios?.nombre || '',
        cita.fecha,
        cita.hora_inicio
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error actualizando estado:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
