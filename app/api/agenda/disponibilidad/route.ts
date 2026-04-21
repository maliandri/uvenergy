import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const fecha = searchParams.get('fecha')

  if (!fecha) {
    return NextResponse.json({ error: 'Fecha requerida' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { data } = await supabase
    .from('citas')
    .select('hora_inicio, hora_fin')
    .eq('fecha', fecha)
    .in('estado', ['pendiente', 'confirmada'])

  const citas = (data || []) as Array<{ hora_inicio: string; hora_fin: string }>
  const ocupados = citas.map((c) => c.hora_inicio.slice(0, 5))

  const todosHorarios = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
  const disponibles = todosHorarios.filter((h) => !ocupados.includes(h))

  return NextResponse.json({ disponibles, ocupados })
}
