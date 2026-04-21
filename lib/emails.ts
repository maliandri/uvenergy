import { Resend } from 'resend'
import { formatDate, formatTime, formatCurrency } from './utils'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM || 'no-reply@uvenergy.com.ar'
const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://uvenergy.com.ar'

export async function sendVerificationEmail(email: string, nombre: string, token: string) {
  const verifyUrl = `${BASE_URL}/api/auth/verify-client?token=${token}`

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: 'Verificá tu email — UV Energy',
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;background:#F4F6FB;font-family:'DM Sans',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FB;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,40,160,0.08);">
              <tr>
                <td style="background:linear-gradient(135deg,#0028A0,#2850B4);padding:40px;text-align:center;">
                  <h1 style="color:#ffffff;font-size:28px;margin:0;font-family:'Syne',Arial,sans-serif;">⚡ UV Energy</h1>
                  <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;">Energía Solar en Patagonia</p>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="color:#0D1B3E;font-size:22px;margin:0 0 16px;">Hola, ${nombre} 👋</h2>
                  <p style="color:#5A6A8A;line-height:1.6;margin:0 0 24px;">Para confirmar tu turno necesitamos verificar tu email. Hacé click en el botón de abajo:</p>
                  <div style="text-align:center;margin:32px 0;">
                    <a href="${verifyUrl}" style="background:#F5A623;color:#0D1B3E;text-decoration:none;padding:16px 40px;border-radius:8px;font-weight:700;font-size:16px;display:inline-block;">
                      ✅ Verificar mi email
                    </a>
                  </div>
                  <p style="color:#5A6A8A;font-size:13px;line-height:1.6;">Este link expira en 24 horas. Si no solicitaste este email, podés ignorarlo.</p>
                  <hr style="border:none;border-top:1px solid #E8EEF8;margin:24px 0;">
                  <p style="color:#5A6A8A;font-size:12px;margin:0;">UV Energy — Energía Solar en Patagonia, Argentina<br>
                  <a href="${BASE_URL}" style="color:#0028A0;">${BASE_URL}</a></p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  })
}

export async function sendCitaCreada(
  email: string,
  nombre: string,
  servicio: string,
  fecha: string,
  hora: string
) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Tu consulta está en camino — UV Energy`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <body style="margin:0;padding:0;background:#F4F6FB;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FB;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
              <tr>
                <td style="background:linear-gradient(135deg,#0028A0,#2850B4);padding:40px;text-align:center;">
                  <h1 style="color:#ffffff;font-size:28px;margin:0;">⚡ UV Energy</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="color:#0D1B3E;">¡Consulta recibida, ${nombre}!</h2>
                  <p style="color:#5A6A8A;line-height:1.6;">Recibimos tu solicitud de turno. Nuestro equipo la revisará y te confirmará en breve.</p>
                  <div style="background:#F4F6FB;border-radius:12px;padding:24px;margin:24px 0;">
                    <h3 style="color:#0028A0;margin:0 0 16px;">Detalle de tu consulta</h3>
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Servicio:</strong> ${servicio}</p>
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Fecha:</strong> ${formatDate(fecha)}</p>
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Hora:</strong> ${formatTime(hora)} hs</p>
                  </div>
                  <p style="color:#5A6A8A;font-size:13px;">Te avisaremos por email cuando el turno sea confirmado.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  })
}

export async function sendCitaConfirmada(
  email: string,
  nombre: string,
  servicio: string,
  fecha: string,
  hora: string
) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `✅ Turno confirmado — UV Energy`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <body style="margin:0;padding:0;background:#F4F6FB;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FB;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
              <tr>
                <td style="background:linear-gradient(135deg,#0028A0,#2850B4);padding:40px;text-align:center;">
                  <h1 style="color:#ffffff;font-size:28px;margin:0;">⚡ UV Energy</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <div style="text-align:center;margin-bottom:24px;">
                    <span style="font-size:48px;">✅</span>
                    <h2 style="color:#0D1B3E;margin:8px 0;">¡Turno confirmado!</h2>
                  </div>
                  <p style="color:#5A6A8A;line-height:1.6;">Hola ${nombre}, tu visita técnica está confirmada.</p>
                  <div style="background:#F4F6FB;border-radius:12px;padding:24px;margin:24px 0;border-left:4px solid #F5A623;">
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Servicio:</strong> ${servicio}</p>
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Fecha:</strong> ${formatDate(fecha)}</p>
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Hora:</strong> ${formatTime(hora)} hs</p>
                  </div>
                  <p style="color:#5A6A8A;font-size:13px;">Si necesitás cancelar o reprogramar, respondé este email con al menos 24 horas de anticipación.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  })
}

export async function sendRecordatorio(
  email: string,
  nombre: string,
  servicio: string,
  fecha: string,
  hora: string
) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `⏰ Recordatorio: tu turno es mañana — UV Energy`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <body style="margin:0;padding:0;background:#F4F6FB;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FB;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
              <tr>
                <td style="background:linear-gradient(135deg,#0028A0,#2850B4);padding:40px;text-align:center;">
                  <h1 style="color:#ffffff;font-size:28px;margin:0;">⚡ UV Energy</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="color:#0D1B3E;">Hola ${nombre}, tu turno es mañana 📅</h2>
                  <p style="color:#5A6A8A;line-height:1.6;">Te recordamos que mañana tenés una visita técnica con UV Energy.</p>
                  <div style="background:#F4F6FB;border-radius:12px;padding:24px;margin:24px 0;">
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Servicio:</strong> ${servicio}</p>
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Fecha:</strong> ${formatDate(fecha)}</p>
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Hora:</strong> ${formatTime(hora)} hs</p>
                  </div>
                  <p style="color:#5A6A8A;font-size:13px;">Asegurate de tener libre el acceso al lugar de instalación.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  })
}

export async function sendPagoAprobado(
  email: string,
  nombre: string,
  servicio: string,
  monto: number,
  citaId: string
) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `💳 Pago aprobado — UV Energy`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <body style="margin:0;padding:0;background:#F4F6FB;font-family:Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FB;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
              <tr>
                <td style="background:linear-gradient(135deg,#0028A0,#2850B4);padding:40px;text-align:center;">
                  <h1 style="color:#ffffff;font-size:28px;margin:0;">⚡ UV Energy</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="color:#0D1B3E;">¡Pago confirmado! 💳</h2>
                  <p style="color:#5A6A8A;">Hola ${nombre}, tu seña fue acreditada con éxito.</p>
                  <div style="background:#F4F6FB;border-radius:12px;padding:24px;margin:24px 0;border-left:4px solid #00C853;">
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Servicio:</strong> ${servicio}</p>
                    <p style="margin:8px 0;color:#0D1B3E;"><strong>Monto abonado:</strong> ${formatCurrency(monto)}</p>
                    <p style="margin:8px 0;color:#5A6A8A;font-size:13px;">Ref. cita: ${citaId}</p>
                  </div>
                  <p style="color:#5A6A8A;font-size:13px;">Guardá este email como comprobante. Te contactaremos para coordinar los detalles de la instalación.</p>
                </td>
              </tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  })
}
