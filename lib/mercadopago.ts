import { MercadoPagoConfig, Preference, Payment } from 'mercadopago'
import type { Cita, Servicio, Cliente } from './supabase/types'

export const mpClient = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
})

export async function createPreference(cita: Cita, servicio: Servicio, cliente: Cliente) {
  const preference = new Preference(mpClient)
  const senia = Number(servicio.precio_base) * 0.3

  return await preference.create({
    body: {
      items: [
        {
          id: cita.id,
          title: `Seña - ${servicio.nombre} | UV Energy`,
          quantity: 1,
          unit_price: senia,
          currency_id: 'ARS',
        },
      ],
      payer: {
        name: cliente.nombre,
        email: cliente.email,
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/agendar/confirmacion?cita=${cita.id}&status=success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/agendar/confirmacion?cita=${cita.id}&status=failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/agendar/confirmacion?cita=${cita.id}&status=pending`,
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_URL}/api/mercadopago/webhook`,
      external_reference: cita.id,
    },
  })
}

export async function getPayment(paymentId: string) {
  const payment = new Payment(mpClient)
  return await payment.get({ id: paymentId })
}
