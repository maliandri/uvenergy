import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { getPayment } from '@/lib/mercadopago'
import { sendPagoAprobado, sendCitaCreada } from '@/lib/emails'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    if (type !== 'payment') {
      return NextResponse.json({ received: true })
    }

    const paymentId = data?.id
    if (!paymentId) {
      return NextResponse.json({ received: true })
    }

    const payment = await getPayment(String(paymentId))
    const citaId = payment.external_reference

    if (!citaId) {
      return NextResponse.json({ received: true })
    }

    const supabase = await createServiceClient()

    const { data: cita } = await supabase
      .from('citas')
      .select('*, servicios(*), clientes(*)')
      .eq('id', citaId)
      .single()

    if (!cita) {
      return NextResponse.json({ received: true })
    }

    const estadoPago =
      payment.status === 'approved'
        ? 'aprobado'
        : payment.status === 'rejected'
        ? 'rechazado'
        : 'pendiente'

    // Registrar pago
    await supabase.from('pagos').insert({
      cita_id: citaId,
      mp_payment_id: String(paymentId),
      mp_preference_id: (payment as any).preference_id || null,
      estado: estadoPago,
      monto: payment.transaction_amount || null,
      metodo: payment.payment_method_id || null,
      raw_data: payment as any,
    })

    // Actualizar cita
    await supabase
      .from('citas')
      .update({
        pago_id: String(paymentId),
        pago_estado: estadoPago,
        monto_pagado: payment.transaction_amount || null,
      })
      .eq('id', citaId)

    // Enviar email si fue aprobado
    if (payment.status === 'approved') {
      const cliente = cita.clientes as any
      const servicio = cita.servicios as any

      await sendPagoAprobado(
        cliente.email,
        cliente.nombre,
        servicio.nombre,
        payment.transaction_amount || 0,
        citaId
      )
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error en webhook MP:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
