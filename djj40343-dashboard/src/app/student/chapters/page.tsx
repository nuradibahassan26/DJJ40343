'use client'

import Topbar from '@/components/layout/Topbar'
import ChapterCard from '@/components/dashboard/ChapterCard'
import { CHAPTERS } from '@/data/chapters'

const DEMO_PROGRESS: Record<string, { completed: number; total: number }> = {
  ch1: { completed: 5, total: 5 },
  ch2: { completed: 3, total: 5 },
  ch3: { completed: 1, total: 5 },
  ch4: { completed: 0, total: 5 },
  ch5: { completed: 0, total: 5 },
  ch6: { completed: 0, total: 5 },
  ch7: { completed: 0, total: 5 },
}

export default function ChaptersPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="📚 Bab Kursus" subtitle="DJJ40343 — 7 Topik Pembelajaran" />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CHAPTERS.map((chapter) => {
            const prog = DEMO_PROGRESS[chapter.id] ?? { completed: 0, total: 5 }
            const pct  = Math.round((prog.completed / prog.total) * 100)
            return (
              <ChapterCard
                key={chapter.id}
                chapter={chapter}
                percentage={pct}
                completedItems={prog.completed}
                totalItems={prog.total}
                basePath="/student"
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
