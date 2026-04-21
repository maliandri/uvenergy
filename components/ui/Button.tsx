'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'solar' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  asChild?: never
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'bg-[#0028A0] text-white hover:bg-[#2850B4] focus:ring-[#0028A0] shadow-lg hover:shadow-xl hover:-translate-y-0.5':
            variant === 'primary',
          'bg-white/10 text-white border border-white/30 hover:bg-white/20 focus:ring-white':
            variant === 'secondary',
          'bg-[#F5A623] text-[#0D1B3E] hover:bg-[#E8960F] focus:ring-[#F5A623] shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-bold':
            variant === 'solar',
          'border-2 border-[#0028A0] text-[#0028A0] hover:bg-[#0028A0] hover:text-white focus:ring-[#0028A0]':
            variant === 'outline',
          'text-[#0028A0] hover:bg-[#0028A0]/10 focus:ring-[#0028A0]':
            variant === 'ghost',
        },
        {
          'text-sm px-4 py-2 gap-1.5': size === 'sm',
          'text-base px-6 py-3 gap-2': size === 'md',
          'text-lg px-8 py-4 gap-2.5': size === 'lg',
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  )
}
