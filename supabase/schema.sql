-- UV Energy — Schema SQL para Supabase
-- Ejecutar en el SQL Editor de Supabase

-- Clientes verificados
CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telefono TEXT,
  verificado BOOLEAN DEFAULT false,
  token_verificacion TEXT,
  token_expira TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Servicios disponibles para agendar
CREATE TABLE IF NOT EXISTS servicios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  duracion_minutos INTEGER DEFAULT 60,
  precio_base NUMERIC(10,2),
  activo BOOLEAN DEFAULT true
);

-- Disponibilidad horaria (configurada por el admin)
CREATE TABLE IF NOT EXISTS disponibilidad (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dia_semana INTEGER, -- 0=Dom, 1=Lun, ... 6=Sab
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  activo BOOLEAN DEFAULT true
);

-- Citas / Turnos
CREATE TABLE IF NOT EXISTS citas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id UUID REFERENCES clientes(id),
  servicio_id UUID REFERENCES servicios(id),
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  estado TEXT DEFAULT 'pendiente', -- pendiente | confirmada | cancelada | completada
  notas TEXT,
  pago_id TEXT,
  pago_estado TEXT DEFAULT 'sin_pago', -- sin_pago | pendiente | aprobado | rechazado
  monto_pagado NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pagos (historial detallado)
CREATE TABLE IF NOT EXISTS pagos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cita_id UUID REFERENCES citas(id),
  mp_payment_id TEXT,
  mp_preference_id TEXT,
  estado TEXT,
  monto NUMERIC(10,2),
  metodo TEXT,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE citas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE disponibilidad ENABLE ROW LEVEL SECURITY;

-- Solo service_role puede hacer todo (para las API routes con service key)
CREATE POLICY "service_role_all_clientes" ON clientes
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_role_all_citas" ON citas
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_role_all_pagos" ON pagos
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "public_read_servicios" ON servicios
  FOR SELECT USING (activo = true);

CREATE POLICY "service_role_all_servicios" ON servicios
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "public_read_disponibilidad" ON disponibilidad
  FOR SELECT USING (activo = true);

CREATE POLICY "service_role_all_disponibilidad" ON disponibilidad
  FOR ALL USING (auth.role() = 'service_role');

-- Datos iniciales de disponibilidad (Lun-Vie 9-18hs)
INSERT INTO disponibilidad (dia_semana, hora_inicio, hora_fin) VALUES
  (1, '09:00', '18:00'), -- Lunes
  (2, '09:00', '18:00'), -- Martes
  (3, '09:00', '18:00'), -- Miércoles
  (4, '09:00', '18:00'), -- Jueves
  (5, '09:00', '18:00')  -- Viernes
ON CONFLICT DO NOTHING;

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_citas_fecha ON citas(fecha);
CREATE INDEX IF NOT EXISTS idx_citas_estado ON citas(estado);
CREATE INDEX IF NOT EXISTS idx_citas_cliente_id ON citas(cliente_id);
CREATE INDEX IF NOT EXISTS idx_clientes_email ON clientes(email);
CREATE INDEX IF NOT EXISTS idx_clientes_token ON clientes(token_verificacion);
CREATE INDEX IF NOT EXISTS idx_pagos_cita_id ON pagos(cita_id);
CREATE INDEX IF NOT EXISTS idx_pagos_mp_payment_id ON pagos(mp_payment_id);
