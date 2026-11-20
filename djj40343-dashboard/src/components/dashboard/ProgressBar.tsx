'use client'

import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number       // 0-100
  className?: string
  colorClass?: string
  showLabel?: boolean
  height?: 'sm' | 'md' | 'lg'
}

export default function ProgressBar({
  value,
  className,
  colorClass,
  showLabel = false,
  height = 'md',
}: ProgressBarProps) {
  const heightMap = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
  const color = colorClass ?? (
    value >= 80 ? 'bg-green-500' :
    value >= 50 ? 'bg-yellow-500' :
    value >= 20 ? 'bg-orange-500' :
    'bg-red-400'
  )

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', heightMap[height])}>
        <div
          className={cn('rounded-full transition-all duration-700', heightMap[height], color)}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-gray-500 mt-1">{value}%</span>
      )}
    </div>
  )
}
