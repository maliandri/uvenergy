'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Users,
  CreditCard,
  LogOut,
  Zap,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: '/admin/agenda', label: 'Agenda', icon: <Calendar className="w-5 h-5" /> },
  { href: '/admin/clientes', label: 'Clientes', icon: <Users className="w-5 h-5" /> },
  { href: '/admin/pagos', label: 'Pagos', icon: <CreditCard className="w-5 h-5" /> },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-64 flex flex-col"
      style={{ background: '#0A1A4A' }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#F5A623] rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#0A1A4A]" />
          </div>
          <span
            className="text-white font-bold text-lg"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            UV<span className="text-[#F5A623]">Energy</span>
          </span>
        </div>
        <div className="mt-1 ml-12 text-white/40 text-xs">Panel Admin</div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active =
            item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-[#F5A623] text-[#0A1A4A] shadow-lg'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6 border-t border-white/10 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
