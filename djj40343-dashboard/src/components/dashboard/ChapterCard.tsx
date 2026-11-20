'use client'

import Link from 'next/link'
import ProgressBar from './ProgressBar'
import { Chapter } from '@/types/chapter'

interface ChapterCardProps {
  chapter: Chapter
  percentage: number
  completedItems: number
  totalItems: number
  basePath: string   // '/student' or '/lecturer'
}

export default function ChapterCard({
  chapter,
  percentage,
  completedItems,
  totalItems,
  basePath,
}: ChapterCardProps) {
  const isLocked = percentage === 0 && chapter.chapterNo > 1
  const statusLabel =
    percentage === 100 ? 'Selesai' :
    percentage > 0     ? 'Sedang Belajar' :
    'Belum Mula'

  const statusColor =
    percentage === 100 ? 'text-green-600 bg-green-50' :
    percentage > 0     ? 'text-yellow-700 bg-yellow-50' :
    'text-gray-500 bg-gray-100'

  return (
    <Link href={`${basePath}/chapter/${chapter.id}`}>
      <div className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer hover:border-blue-200">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ backgroundColor: chapter.color + '20' }}
          >
            {chapter.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: chapter.color }}
              >
                Bab {chapter.chapterNo}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor}`}>
                {statusLabel}
              </span>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-blue-700 transition-colors">
              {chapter.title}
            </h3>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar value={percentage} height="sm" />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-gray-500">{completedItems}/{totalItems} aktiviti</span>
          <span className="text-xs font-semibold" style={{ color: chapter.color }}>
            {percentage}%
          </span>
        </div>

        {/* Activity icons */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-50">
          {['📄', '📝', '📝', '🔬', '🎮'].map((icon, i) => (
            <span
              key={i}
              className={`text-base ${i < completedItems ? 'opacity-100' : 'opacity-30'}`}
              title={['Nota', 'Pre-Quiz', 'Post-Quiz', 'Simulasi', 'Games'][i]}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
