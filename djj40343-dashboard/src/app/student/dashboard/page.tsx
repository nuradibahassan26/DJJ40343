'use client'

import Topbar from '@/components/layout/Topbar'
import ChapterCard from '@/components/dashboard/ChapterCard'
import ProgressBar from '@/components/dashboard/ProgressBar'
import { CHAPTERS } from '@/data/chapters'

// Demo progress data — in production fetch from API
const DEMO_PROGRESS: Record<string, { completed: number; total: number }> = {
  ch1: { completed: 5, total: 5 },
  ch2: { completed: 3, total: 5 },
  ch3: { completed: 1, total: 5 },
  ch4: { completed: 0, total: 5 },
  ch5: { completed: 0, total: 5 },
  ch6: { completed: 0, total: 5 },
  ch7: { completed: 0, total: 5 },
}

export default function StudentDashboard() {
  const totalItems    = Object.values(DEMO_PROGRESS).reduce((s, v) => s + v.total, 0)
  const completedItems = Object.values(DEMO_PROGRESS).reduce((s, v) => s + v.completed, 0)
  const overallPct    = Math.round((completedItems / totalItems) * 100)

  const stats = [
    { label: 'Nota',       icon: '📄', done: 2,  total: 7 },
    { label: 'Pre-Quiz',   icon: '📝', done: 2,  total: 7 },
    { label: 'Post-Quiz',  icon: '📋', done: 1,  total: 7 },
    { label: 'Simulasi',   icon: '🔬', done: 1,  total: 7 },
    { label: 'Games',      icon: '🎮', done: 1,  total: 7 },
  ]

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="Dashboard Pelajar" subtitle="Selamat datang kembali, Ahmad Faris!" />

      <div className="p-6 space-y-6">

        {/* Overall Progress Card */}
        <div className="bg-primary-800 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-200 text-sm font-medium">Kemajuan Keseluruhan</p>
              <h2 className="text-3xl font-bold mt-1">{overallPct}%</h2>
              <p className="text-blue-100 text-sm mt-1">
                {completedItems} daripada {totalItems} aktiviti selesai
              </p>
            </div>
            <div className="text-5xl">🎓</div>
          </div>
          <ProgressBar
            value={overallPct}
            height="lg"
            colorClass="bg-accent-500"
          />
          <div className="flex justify-between text-xs text-blue-200 mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-lg font-bold text-gray-800">{stat.done}<span className="text-sm font-normal text-gray-400">/{stat.total}</span></div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Chapters Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">📚 Bab Kursus</h2>
            <span className="text-sm text-gray-500">7 topik</span>
          </div>
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

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">📖 Tutorial Book</h3>
            <p className="text-sm text-gray-500 mb-4">Buku rujukan lengkap untuk kursus DJJ40343.</p>
            <a
              href="/student/tutorial"
              className="inline-block px-4 py-2 bg-primary-800 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Buka Tutorial Book →
            </a>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h3 className="font-semibold text-gray-800 mb-3">📊 Pencapaian Saya</h3>
            <p className="text-sm text-gray-500 mb-4">Lihat markah dan gred untuk semua penilaian.</p>
            <a
              href="/student/progress"
              className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Lihat Pencapaian →
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
