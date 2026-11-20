'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import Topbar from '@/components/layout/Topbar'
import ProgressBar from '@/components/dashboard/ProgressBar'
import { CHAPTERS } from '@/data/chapters'

const ACTIVITIES = [
  { key: 'notes',     icon: '📄', label: 'Nota Kuliah',       desc: 'Baca dan muat turun nota chapter ini',    color: '#3B82F6', path: 'notes' },
  { key: 'pre-quiz',  icon: '📝', label: 'Quiz Sebelum Kelas', desc: 'Uji pengetahuan awal sebelum kuliah',      color: '#8B5CF6', path: 'pre-quiz' },
  { key: 'post-quiz', icon: '📋', label: 'Quiz Selepas Kelas', desc: 'Uji pemahaman selepas kuliah',             color: '#EC4899', path: 'post-quiz' },
  { key: 'simulation',icon: '🔬', label: 'Simulasi Interaktif', desc: 'Eksperimen maya berkaitan topik',         color: '#10B981', path: 'simulation' },
  { key: 'games',     icon: '🎮', label: 'Permainan Kumpulan', desc: 'Aktiviti kumpulan interaktif',             color: '#F59E0B', path: 'games' },
]

// Demo completed activities per chapter
const DEMO_COMPLETED: Record<string, string[]> = {
  ch1: ['notes', 'pre-quiz', 'post-quiz', 'simulation', 'games'],
  ch2: ['notes', 'pre-quiz', 'post-quiz'],
  ch3: ['notes'],
  ch4: [], ch5: [], ch6: [], ch7: [],
}

export default function ChapterPage() {
  const params = useParams()
  const chapterId = params.id as string
  const chapter = CHAPTERS.find((c) => c.id === chapterId) ?? CHAPTERS[0]
  const completed = DEMO_COMPLETED[chapterId] ?? []
  const pct = Math.round((completed.length / ACTIVITIES.length) * 100)

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar
        title={`Bab ${chapter.chapterNo}: ${chapter.title}`}
        subtitle="Pilih aktiviti pembelajaran"
      />

      <div className="p-6 space-y-6">

        {/* Chapter Header */}
        <div
          className="rounded-2xl p-6 text-white"
          style={{ background: `linear-gradient(135deg, ${chapter.color}cc, ${chapter.color})` }}
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">{chapter.icon}</div>
            <div className="flex-1">
              <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">
                Bab {chapter.chapterNo}
              </span>
              <h1 className="text-xl font-bold mt-2">{chapter.title}</h1>
              <p className="text-white/80 text-sm mt-1">{chapter.description}</p>
              <div className="mt-4">
                <ProgressBar value={pct} height="md" colorClass="bg-white/80" />
                <p className="text-white/70 text-xs mt-1">{completed.length}/{ACTIVITIES.length} aktiviti selesai ({pct}%)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <Link href="/student/chapters" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
          ← Kembali ke senarai bab
        </Link>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTIVITIES.map((activity) => {
            const isDone = completed.includes(activity.key)
            return (
              <Link
                key={activity.key}
                href={`/student/chapter/${chapterId}/${activity.path}`}
              >
                <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group cursor-pointer hover:border-blue-200 relative overflow-hidden">
                  {isDone && (
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✅ Selesai</span>
                    </div>
                  )}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: activity.color + '15' }}
                  >
                    {activity.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {activity.label}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{activity.desc}</p>
                  <div
                    className="mt-4 text-xs font-medium flex items-center gap-1"
                    style={{ color: activity.color }}
                  >
                    {isDone ? 'Cuba semula →' : 'Mula sekarang →'}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
