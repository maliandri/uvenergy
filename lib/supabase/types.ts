export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      clientes: {
        Row: {
          id: string
          nombre: string
          email: string
          telefono: string | null
          verificado: boolean
          token_verificacion: string | null
          token_expira: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          email: string
          telefono?: string | null
          verificado?: boolean
          token_verificacion?: string | null
          token_expira?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          email?: string
          telefono?: string | null
          verificado?: boolean
          token_verificacion?: string | null
          token_expira?: string | null
          created_at?: string
        }
        Relationships: []
      }
      servicios: {
        Row: {
          id: string
          slug: string
          nombre: string
          descripcion: string | null
          duracion_minutos: number
          precio_base: number | null
          activo: boolean
        }
        Insert: {
          id?: string
          slug: string
          nombre: string
          descripcion?: string | null
          duracion_minutos?: number
          precio_base?: number | null
          activo?: boolean
        }
        Update: {
          id?: string
          slug?: string
          nombre?: string
          descripcion?: string | null
          duracion_minutos?: number
          precio_base?: number | null
          activo?: boolean
        }
        Relationships: []
      }
      disponibilidad: {
        Row: {
          id: string
          dia_semana: number | null
          hora_inicio: string
          hora_fin: string
          activo: boolean
        }
        Insert: {
          id?: string
          dia_semana?: number | null
          hora_inicio: string
          hora_fin: string
          activo?: boolean
        }
        Update: {
          id?: string
          dia_semana?: number | null
          hora_inicio?: string
          hora_fin?: string
          activo?: boolean
        }
        Relationships: []
      }
      citas: {
        Row: {
          id: string
          cliente_id: string | null
          servicio_id: string | null
          fecha: string
          hora_inicio: string
          hora_fin: string
          estado: string
          notas: string | null
          pago_id: string | null
          pago_estado: string
          monto_pagado: number | null
          created_at: string
        }
        Insert: {
          id?: string
          cliente_id?: string | null
          servicio_id?: string | null
          fecha: string
          hora_inicio: string
          hora_fin: string
          estado?: string
          notas?: string | null
          pago_id?: string | null
          pago_estado?: string
          monto_pagado?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          cliente_id?: string | null
          servicio_id?: string | null
          fecha?: string
          hora_inicio?: string
          hora_fin?: string
          estado?: string
          notas?: string | null
          pago_id?: string | null
          pago_estado?: string
          monto_pagado?: number | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'citas_cliente_id_fkey'
            columns: ['cliente_id']
            isOneToOne: false
            referencedRelation: 'clientes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'citas_servicio_id_fkey'
            columns: ['servicio_id']
            isOneToOne: false
            referencedRelation: 'servicios'
            referencedColumns: ['id']
          }
        ]
      }
      pagos: {
        Row: {
          id: string
          cita_id: string | null
          mp_payment_id: string | null
          mp_preference_id: string | null
          estado: string | null
          monto: number | null
          metodo: string | null
          raw_data: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          cita_id?: string | null
          mp_payment_id?: string | null
          mp_preference_id?: string | null
          estado?: string | null
          monto?: number | null
          metodo?: string | null
          raw_data?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          cita_id?: string | null
          mp_payment_id?: string | null
          mp_preference_id?: string | null
          estado?: string | null
          monto?: number | null
          metodo?: string | null
          raw_data?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'pagos_cita_id_fkey'
            columns: ['cita_id']
            isOneToOne: false
            referencedRelation: 'citas'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Cliente = Database['public']['Tables']['clientes']['Row']
export type Servicio = Database['public']['Tables']['servicios']['Row']
export type Disponibilidad = Database['public']['Tables']['disponibilidad']['Row']
export type Cita = Database['public']['Tables']['citas']['Row']
export type Pago = Database['public']['Tables']['pagos']['Row']
