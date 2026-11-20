'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import ProgressBar from '@/components/dashboard/ProgressBar'
import { CHAPTERS } from '@/data/chapters'
import { getGrade } from '@/lib/utils'

const STUDENTS = [
  { id: 's1', name: 'Ahmad Faris bin Azmi',         matric: 'AT210001', email: 'ahmad.faris@student.uthm.edu.my' },
  { id: 's2', name: 'Siti Nabilah binti Zulkifli',  matric: 'AT210002', email: 'siti.nabilah@student.uthm.edu.my' },
  { id: 's3', name: 'Mohd Haziq bin Ibrahim',         matric: 'AT210003', email: 'haziq@student.uthm.edu.my' },
  { id: 's4', name: 'Nurul Ain binti Kassim',         matric: 'AT210004', email: 'nurul.ain@student.uthm.edu.my' },
  { id: 's5', name: 'Faiz Aiman bin Roslan',          matric: 'AT210005', email: 'faiz.aiman@student.uthm.edu.my' },
  { id: 's6', name: 'Amirul Hakim bin Yusof',         matric: 'AT210006', email: 'amirul@student.uthm.edu.my' },
  { id: 's7', name: 'Nor Hidayah binti Mohd Said',   matric: 'AT210007', email: 'hidayah@student.uthm.edu.my' },
  { id: 's8', name: 'Zulfadli bin Azhar',             matric: 'AT210008', email: 'zulfadli@student.uthm.edu.my' },
]

// Pre/Post quiz scores per chapter: [pre, post] or null
type ChapterScore = { pre?: number; post?: number; sim?: boolean; games?: boolean }
const STUDENT_SCORES: Record<string, Record<string, ChapterScore>> = {
  s1: { ch1: { pre: 80, post: 85, sim: true, games: true  }, ch2: { pre: 60, post: 70, sim: true, games: false }, ch3: { pre: 40 }, ch4: {}, ch5: {}, ch6: {}, ch7: {} },
  s2: { ch1: { pre: 90, post: 95, sim: true, games: true  }, ch2: { pre: 80, post: 85, sim: true, games: true  }, ch3: { pre: 75, post: 80, sim: true, games: true }, ch4: { pre: 65, post: 70, sim: true, games: false }, ch5: { pre: 50 }, ch6: {}, ch7: {} },
  s3: { ch1: { pre: 60, post: 65, sim: true, games: false }, ch2: { pre: 40 },                                    ch3: {}, ch4: {}, ch5: {}, ch6: {}, ch7: {} },
  s4: { ch1: { pre: 85, post: 90, sim: true, games: true  }, ch2: { pre: 75, post: 80, sim: true, games: true  }, ch3: { pre: 65, post: 70, sim: true, games: false }, ch4: { pre: 55 }, ch5: {}, ch6: {}, ch7: {} },
  s5: { ch1: { pre: 70, post: 75, sim: true, games: false }, ch2: { pre: 55 },                                    ch3: {}, ch4: {}, ch5: {}, ch6: {}, ch7: {} },
  s6: { ch1: { pre: 95, post: 95, sim: true, games: true  }, ch2: { pre: 85, post: 90, sim: true, games: true  }, ch3: { pre: 80, post: 85, sim: true, games: true }, ch4: { pre: 70, post: 75, sim: true, games: true }, ch5: { pre: 65, post: 70, sim: true, games: false }, ch6: { pre: 60 }, ch7: {} },
  s7: { ch1: { pre: 75, post: 80, sim: true, games: true  }, ch2: { pre: 65, post: 70, sim: true, games: false }, ch3: { pre: 55, post: 60, sim: false, games: false }, ch4: { pre: 45 }, ch5: {}, ch6: {}, ch7: {} },
  s8: { ch1: { pre: 50, post: 55, sim: false, games: false }, ch2: { pre: 40 },                                   ch3: {}, ch4: {}, ch5: {}, ch6: {}, ch7: {} },
}

function getChapterProgress(scores: ChapterScore): number {
  let done = 0
  if (scores.pre   != null) done++
  if (scores.post  != null) done++
  if (scores.sim   === true) done++
  if (scores.games === true) done++
  return Math.round((done / 4) * 100)
}

function getOverall(id: string): number {
  const scores = STUDENT_SCORES[id] ?? {}
  const perChapter = CHAPTERS.map((ch) => getChapterProgress(scores[ch.id] ?? {}))
  return Math.round(perChapter.reduce((s, v) => s + v, 0) / perChapter.length)
}

export default function StudentsPage() {
  const [search, setSearch]           = useState('')
  const [selectedId, setSelectedId]   = useState<string | null>(null)
  const [filterChapter, setFilterChapter] = useState<string>('all')

  const filtered = STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.matric.toLowerCase().includes(search.toLowerCase())
  )

  const selectedStudent = STUDENTS.find((s) => s.id === selectedId)

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="👥 Senarai Pelajar" subtitle="Pencapaian dan kemajuan setiap pelajar" />

      <div className="p-6 space-y-6">

        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Cari nama atau no. matrik..."
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 bg-white"
          />
          <select
            value={filterChapter}
            onChange={(e) => setFilterChapter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="all">Semua Bab</option>
            {CHAPTERS.map((ch) => (
              <option key={ch.id} value={ch.id}>Bab {ch.chapterNo}: {ch.title.slice(0, 30)}...</option>
            ))}
          </select>
          <button className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors">
            📥 Export Excel
          </button>
        </div>

        {/* Summary table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Pelajar</th>
                {CHAPTERS.map((ch) => (
                  <th key={ch.id} className="text-center px-2 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    <span style={{ color: ch.color }}>Bab {ch.chapterNo}</span>
                  </th>
                ))}
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Keseluruhan</th>
                <th className="text-center px-4 py-3 font-semibold text-gray-600">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((st) => {
                const overall = getOverall(st.id)
                const grade   = getGrade(overall)
                return (
                  <tr key={st.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold text-xs flex-shrink-0">
                          {st.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 whitespace-nowrap">{st.name}</p>
                          <p className="text-xs text-gray-400">{st.matric}</p>
                        </div>
                      </div>
                    </td>
                    {CHAPTERS.map((ch) => {
                      const pct = getChapterProgress(STUDENT_SCORES[st.id]?.[ch.id] ?? {})
                      return (
                        <td key={ch.id} className="px-2 py-3 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`text-xs font-semibold ${
                              pct === 100 ? 'text-green-600' :
                              pct  > 0    ? 'text-yellow-600' : 'text-gray-300'
                            }`}>
                              {pct === 100 ? '✅' : pct > 0 ? `${pct}%` : '—'}
                            </span>
                          </div>
                        </td>
                      )
                    })}
                    <td className="px-4 py-3 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className={`font-bold text-sm ${grade.color}`}>{overall}%</span>
                        <span className={`text-xs ${grade.color}`}>{grade.grade}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setSelectedId(st.id === selectedId ? null : st.id)}
                        className="text-xs text-primary-700 font-medium hover:underline"
                      >
                        {st.id === selectedId ? 'Tutup' : 'Detail'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {selectedStudent && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold">
                  {selectedStudent.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-500">{selectedStudent.matric} · {selectedStudent.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedId(null)} className="text-gray-400 hover:text-gray-600 text-sm">✕ Tutup</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CHAPTERS.map((ch) => {
                const scores = STUDENT_SCORES[selectedStudent.id]?.[ch.id] ?? {}
                const pct    = getChapterProgress(scores)
                return (
                  <div key={ch.id} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{ch.icon}</span>
                      <span className="text-xs font-semibold" style={{ color: ch.color }}>Bab {ch.chapterNo}</span>
                      <span className="text-xs text-gray-500 truncate flex-1">{ch.title.slice(0, 25)}...</span>
                    </div>
                    <ProgressBar value={pct} height="sm" />
                    <div className="grid grid-cols-4 gap-1 mt-2">
                      {[
                        { label: 'Pre', val: scores.pre != null ? `${scores.pre}%` : '—' },
                        { label: 'Post', val: scores.post != null ? `${scores.post}%` : '—' },
                        { label: 'Sim', val: scores.sim ? '✅' : '—' },
                        { label: 'Games', val: scores.games ? '✅' : '—' },
                      ].map((item) => (
                        <div key={item.label} className="bg-gray-50 rounded-lg p-1.5 text-center">
                          <div className="text-xs text-gray-400">{item.label}</div>
                          <div className="text-xs font-semibold text-gray-700">{item.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
