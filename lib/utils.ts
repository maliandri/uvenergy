import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { randomBytes } from 'crypto'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateToken(): string {
  return randomBytes(32).toString('hex')
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date + 'T00:00:00'))
}

export function formatTime(time: string): string {
  return time.slice(0, 5)
}

export function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number)
  const total = hours * 60 + mins + minutes
  const h = Math.floor(total / 60).toString().padStart(2, '0')
  const m = (total % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}
