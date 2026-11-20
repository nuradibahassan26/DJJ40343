'use client'

import Topbar from '@/components/layout/Topbar'
import ProgressBar from '@/components/dashboard/ProgressBar'
import { CHAPTERS } from '@/data/chapters'

const STUDENTS = [
  { id: 's1', name: 'Ahmad Faris' },
  { id: 's2', name: 'Siti Nabilah' },
  { id: 's3', name: 'Mohd Haziq' },
  { id: 's4', name: 'Nurul Ain' },
  { id: 's5', name: 'Faiz Aiman' },
  { id: 's6', name: 'Amirul Hakim' },
  { id: 's7', name: 'Nor Hidayah' },
  { id: 's8', name: 'Zulfadli' },
]

// Chapter averages (demo)
const CHAPTER_AVGS = [82, 68, 54, 42, 20, 10, 5]

// Class distribution (demo)
const GRADE_DIST = [
  { grade: 'A/A-',  count: 2, color: '#22C55E' },
  { grade: 'B+/B',  count: 3, color: '#3B82F6' },
  { grade: 'B-/C+', count: 2, color: '#F59E0B' },
  { grade: 'C/C-',  count: 1, color: '#F97316' },
  { grade: 'F',     count: 0, color: '#EF4444' },
]

const WEEKLY_ACTIVITY = [
  { week: 'Minggu 1', active: 8 },
  { week: 'Minggu 2', active: 8 },
  { week: 'Minggu 3', active: 7 },
  { week: 'Minggu 4', active: 6 },
  { week: 'Minggu 5', active: 7 },
  { week: 'Minggu 6', active: 5 },
]

export default function ReportsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="📈 Laporan & Analitik" subtitle="Analisis prestasi kelas DJJ40343" />

      <div className="p-6 space-y-6">

        {/* Export buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors">
            📥 Export Excel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors">
            📄 Export PDF
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
            🖨️ Cetak Laporan
          </button>
        </div>

        {/* Chapter performance */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4">📊 Purata Pencapaian Mengikut Bab</h2>
          <div className="space-y-4">
            {CHAPTERS.map((ch, i) => (
              <div key={ch.id} className="flex items-center gap-3">
                <span className="text-sm">{ch.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">Bab {ch.chapterNo}: {ch.title.slice(0, 40)}...</span>
                    <span className="font-bold" style={{ color: ch.color }}>{CHAPTER_AVGS[i]}%</span>
                  </div>
                  <ProgressBar value={CHAPTER_AVGS[i]} height="md" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade distribution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-800 mb-4">🎓 Taburan Gred Kelas</h2>
            <div className="space-y-3">
              {GRADE_DIST.map((g) => (
                <div key={g.grade} className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold w-10 text-center py-1 rounded-lg text-white"
                    style={{ backgroundColor: g.color }}
                  >
                    {g.grade}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all flex items-center pl-2"
                      style={{ width: `${(g.count / STUDENTS.length) * 100}%`, backgroundColor: g.color }}
                    >
                      {g.count > 0 && (
                        <span className="text-xs text-white font-bold">{g.count}</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-16 text-right">{g.count} pelajar</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-800 mb-4">📅 Aktiviti Mingguan</h2>
            <div className="flex items-end gap-2 h-32">
              {WEEKLY_ACTIVITY.map((w) => (
                <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-bold text-gray-700">{w.active}</span>
                  <div
                    className="w-full rounded-t-lg bg-primary-800 transition-all"
                    style={{ height: `${(w.active / STUDENTS.length) * 100}%` }}
                  />
                  <span className="text-xs text-gray-400 text-center leading-tight">{w.week.replace('Minggu ', 'M')}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">Bilangan pelajar aktif per minggu</p>
          </div>
        </div>

        {/* Student ranking */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4">🏆 Ranking Pelajar (Demo)</h2>
          <div className="space-y-2">
            {[
              { name: 'Amirul Hakim bin Yusof',       pct: 78, rank: 1 },
              { name: 'Siti Nabilah binti Zulkifli',  pct: 68, rank: 2 },
              { name: 'Nurul Ain binti Kassim',         pct: 55, rank: 3 },
              { name: 'Nor Hidayah binti Mohd Said',   pct: 48, rank: 4 },
              { name: 'Ahmad Faris bin Azmi',           pct: 40, rank: 5 },
              { name: 'Faiz Aiman bin Roslan',          pct: 35, rank: 6 },
              { name: 'Mohd Haziq bin Ibrahim',          pct: 25, rank: 7 },
              { name: 'Zulfadli bin Azhar',             pct: 20, rank: 8 },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  s.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                  s.rank === 2 ? 'bg-gray-300 text-gray-700' :
                  s.rank === 3 ? 'bg-amber-600 text-white' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {s.rank}
                </span>
                <span className="text-sm text-gray-700 flex-1">{s.name}</span>
                <div className="w-28">
                  <ProgressBar value={s.pct} height="sm" />
                </div>
                <span className="text-xs font-semibold text-gray-700 w-8 text-right">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
