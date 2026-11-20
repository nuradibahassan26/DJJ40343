import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getProgressColor(percentage: number): string {
  if (percentage >= 80) return 'bg-green-500'
  if (percentage >= 50) return 'bg-yellow-500'
  if (percentage >= 20) return 'bg-orange-500'
  return 'bg-red-400'
}

export function getProgressLabel(percentage: number): string {
  if (percentage === 100) return 'Selesai'
  if (percentage >= 50) return 'Sedang Belajar'
  if (percentage > 0) return 'Baru Mula'
  return 'Belum Mula'
}

export function formatScore(score: number | null | undefined): string {
  if (score == null) return '-'
  return `${score.toFixed(0)}%`
}

export function getGrade(score: number): { grade: string; color: string } {
  if (score >= 90) return { grade: 'A', color: 'text-green-600' }
  if (score >= 80) return { grade: 'A-', color: 'text-green-500' }
  if (score >= 75) return { grade: 'B+', color: 'text-blue-600' }
  if (score >= 70) return { grade: 'B', color: 'text-blue-500' }
  if (score >= 65) return { grade: 'B-', color: 'text-blue-400' }
  if (score >= 60) return { grade: 'C+', color: 'text-yellow-600' }
  if (score >= 55) return { grade: 'C', color: 'text-yellow-500' }
  if (score >= 50) return { grade: 'C-', color: 'text-yellow-400' }
  return { grade: 'F', color: 'text-red-500' }
}
