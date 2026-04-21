import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createPreference } from '@/lib/mercadopago'

export async function POST(req: NextRequest) {
  try {
    const { cita_id } = await req.json()

    if (!cita_id) {
      return NextResponse.json({ error: 'cita_id requerido' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    const { data: cita } = await supabase
      .from('citas')
      .select('*, servicios(*), clientes(*)')
      .eq('id', cita_id)
      .single()

    if (!cita) {
      return NextResponse.json({ error: 'Cita no encontrada' }, { status: 404 })
    }

    const preference = await createPreference(cita, cita.servicios as any, cita.clientes as any)

    return NextResponse.json({
      init_point: preference.init_point,
      preference_id: preference.id,
    })
  } catch (error) {
    console.error('Error creando preferencia MP:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
