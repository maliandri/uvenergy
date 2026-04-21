import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export function Card({ children, className, hover = false, glass = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-300',
        glass
          ? 'bg-white/10 backdrop-blur-md border-white/20'
          : 'bg-white border-gray-100 shadow-sm',
        hover && 'hover:shadow-xl hover:-translate-y-1 hover:border-[#0028A0]/20 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
