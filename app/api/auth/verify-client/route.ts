import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/?verified=error', req.url))
  }

  const supabase = await createServiceClient()

  const { data } = await supabase
    .from('clientes')
    .select('id, token_expira, verificado')
    .eq('token_verificacion', token)
    .maybeSingle()

  const cliente = data as { id: string; token_expira: string | null; verificado: boolean } | null

  if (!cliente) {
    return NextResponse.redirect(new URL('/?verified=invalid', req.url))
  }

  if (cliente.token_expira && new Date(cliente.token_expira) < new Date()) {
    return NextResponse.redirect(new URL('/?verified=expired', req.url))
  }

  await supabase
    .from('clientes')
    .update({ verificado: true, token_verificacion: null, token_expira: null } as any)
    .eq('id', cliente.id)

  return NextResponse.redirect(new URL('/agendar/confirmacion?status=verified', req.url))
}
