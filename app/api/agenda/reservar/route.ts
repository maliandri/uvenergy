import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { createPreference } from '@/lib/mercadopago'
import { sendVerificationEmail, sendCitaCreada } from '@/lib/emails'
import { generateToken, addMinutes } from '@/lib/utils'
import { SERVICIOS } from '@/lib/servicios-data'
import type { Cliente, Servicio, Cita } from '@/lib/supabase/types'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { servicio_slug, fecha, hora_inicio, nombre, email, telefono, notas, pagar_senia } = body

    if (!servicio_slug || !fecha || !hora_inicio || !nombre || !email || !telefono) {
      return NextResponse.json({ error: 'Campos requeridos incompletos' }, { status: 400 })
    }

    const servicioData = SERVICIOS.find((s) => s.slug === servicio_slug)
    if (!servicioData) {
      return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 400 })
    }

    const supabase = await createServiceClient()

    // Verificar disponibilidad
    const { data: conflictoData } = await supabase
      .from('citas')
      .select('id')
      .eq('fecha', fecha)
      .eq('hora_inicio', hora_inicio + ':00')
      .in('estado', ['pendiente', 'confirmada'])
      .maybeSingle()

    if (conflictoData) {
      return NextResponse.json({ error: 'El horario seleccionado ya no está disponible' }, { status: 409 })
    }

    // Obtener o crear servicio en BD
    const { data: servicioExistente } = await supabase
      .from('servicios')
      .select('*')
      .eq('slug', servicio_slug)
      .maybeSingle()

    let servicio: Servicio

    if (!servicioExistente) {
      const { data: nuevoServicio, error: errServ } = await supabase
        .from('servicios')
        .insert({
          slug: servicioData.slug,
          nombre: servicioData.nombre,
          descripcion: servicioData.descripcion,
          duracion_minutos: servicioData.duracion,
          precio_base: servicioData.precioDesde,
          activo: true,
        } as any)
        .select()
        .single()

      if (errServ || !nuevoServicio) {
        return NextResponse.json({ error: 'Error creando servicio' }, { status: 500 })
      }
      servicio = nuevoServicio as unknown as Servicio
    } else {
      servicio = servicioExistente as unknown as Servicio
    }

    // Buscar o crear cliente
    const { data: clienteExistente } = await supabase
      .from('clientes')
      .select('*')
      .eq('email', email)
      .maybeSingle()

    let cliente: Cliente
    let necesitaVerificacion = false

    if (!clienteExistente) {
      const token = generateToken()
      const expira = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

      const { data: nuevoCliente, error: errCliente } = await supabase
        .from('clientes')
        .insert({
          nombre,
          email,
          telefono,
          verificado: false,
          token_verificacion: token,
          token_expira: expira,
        } as any)
        .select()
        .single()

      if (errCliente || !nuevoCliente) {
        return NextResponse.json({ error: 'Error creando cliente' }, { status: 500 })
      }
      cliente = nuevoCliente as unknown as Cliente
      necesitaVerificacion = true
      await sendVerificationEmail(email, nombre, token)
    } else {
      cliente = clienteExistente as unknown as Cliente
      if (!cliente.verificado) {
        const token = generateToken()
        const expira = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        await supabase
          .from('clientes')
          .update({ token_verificacion: token, token_expira: expira } as any)
          .eq('id', cliente.id)
        await sendVerificationEmail(email, nombre, token)
        necesitaVerificacion = true
      }
    }

    // Calcular hora_fin y crear cita
    const hora_fin = addMinutes(hora_inicio, servicioData.duracion)

    const { data: citaData, error: errCita } = await supabase
      .from('citas')
      .insert({
        cliente_id: cliente.id,
        servicio_id: servicio.id,
        fecha,
        hora_inicio: hora_inicio + ':00',
        hora_fin: hora_fin + ':00',
        estado: 'pendiente',
        notas: notas || null,
        pago_estado: 'sin_pago',
      } as any)
      .select()
      .single()

    if (errCita || !citaData) {
      return NextResponse.json({ error: 'Error al crear la cita' }, { status: 500 })
    }

    const cita = citaData as unknown as Cita

    if (!necesitaVerificacion) {
      await sendCitaCreada(email, nombre, servicioData.nombre, fecha, hora_inicio)
    }

    if (pagar_senia && servicio.precio_base) {
      const preference = await createPreference(cita, servicio, cliente)
      return NextResponse.json({
        cita_id: cita.id,
        necesita_verificacion: necesitaVerificacion,
        mp_preference_url: preference.init_point,
      })
    }

    return NextResponse.json({ cita_id: cita.id, necesita_verificacion: necesitaVerificacion })
  } catch (error) {
    console.error('Error en /api/agenda/reservar:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
