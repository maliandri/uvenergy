'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Zap, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Credenciales incorrectas')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0A1A4A, #0028A0)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-[#F5A623] rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-[#0A1A4A]" />
            </div>
            <span
              className="text-white text-3xl font-bold"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              UV<span className="text-[#F5A623]">Energy</span>
            </span>
          </div>
          <p className="text-white/60 mt-2 text-sm">Panel de Administración</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1
            className="text-[#0D1B3E] text-2xl font-bold mb-6 text-center"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            Iniciar sesión
          </h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#0D1B3E] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#0028A0] focus:outline-none transition-colors"
                placeholder="admin@uvenergy.com.ar"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0D1B3E] mb-1.5">Contraseña</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:border-[#0028A0] focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Entrar al panel
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
