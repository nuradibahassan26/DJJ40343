'use client'

import Topbar from '@/components/layout/Topbar'
import ProgressBar from '@/components/dashboard/ProgressBar'
import { CHAPTERS } from '@/data/chapters'
import Link from 'next/link'

// Demo student data
const STUDENTS = [
  { id: 's1', name: 'Ahmad Faris bin Azmi',       matric: 'AT210001' },
  { id: 's2', name: 'Siti Nabilah binti Zulkifli', matric: 'AT210002' },
  { id: 's3', name: 'Mohd Haziq bin Ibrahim',       matric: 'AT210003' },
  { id: 's4', name: 'Nurul Ain binti Kassim',       matric: 'AT210004' },
  { id: 's5', name: 'Faiz Aiman bin Roslan',        matric: 'AT210005' },
]

const STUDENT_PROGRESS: Record<string, number[]> = {
  // Array of % per chapter [ch1, ch2, ch3, ch4, ch5, ch6, ch7]
  s1: [100, 60, 20, 0, 0, 0, 0],
  s2: [100, 100, 100, 80, 40, 0, 0],
  s3: [100, 20, 0, 0, 0, 0, 0],
  s4: [100, 100, 60, 20, 0, 0, 0],
  s5: [80, 40, 0, 0, 0, 0, 0],
}

function getOverall(arr: number[]) {
  return Math.round(arr.reduce((s, v) => s + v, 0) / arr.length)
}

export default function LecturerDashboard() {
  const classAvg = Math.round(
    STUDENTS.reduce((s, st) => s + getOverall(STUDENT_PROGRESS[st.id]), 0) / STUDENTS.length
  )
  const chapterAvgs = CHAPTERS.map((_, ci) =>
    Math.round(STUDENTS.reduce((s, st) => s + (STUDENT_PROGRESS[st.id][ci] ?? 0), 0) / STUDENTS.length)
  )

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="Dashboard Pensyarah" subtitle="DJJ40343 — Gambaran Keseluruhan Kelas" />

      <div className="p-6 space-y-6">

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Jumlah Pelajar',    value: STUDENTS.length,            icon: '👥', color: 'text-blue-700' },
            { label: 'Avg. Kemajuan',      value: `${classAvg}%`,             icon: '📈', color: 'text-green-700' },
            { label: 'Pelajar Aktif',      value: STUDENTS.length,            icon: '✅', color: 'text-purple-700' },
            { label: 'Bab Paling Lemah',   value: `Bab ${chapterAvgs.indexOf(Math.min(...chapterAvgs)) + 1}`, icon: '⚠️', color: 'text-orange-600' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="text-2xl mb-2">{kpi.icon}</div>
              <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Chapter averages */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-800 mb-4">📊 Kemajuan Kelas Mengikut Bab</h2>
          <div className="space-y-3">
            {CHAPTERS.map((ch, i) => (
              <div key={ch.id} className="flex items-center gap-3">
                <span className="text-sm w-6 text-center">{ch.icon}</span>
                <span className="text-xs text-gray-600 w-32 truncate">Bab {ch.chapterNo}</span>
                <div className="flex-1">
                  <ProgressBar value={chapterAvgs[i]} height="sm" />
                </div>
                <span className="text-xs font-semibold text-gray-700 w-10 text-right">{chapterAvgs[i]}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Student quick view */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">👥 Kemajuan Pelajar</h2>
            <Link href="/lecturer/students" className="text-sm text-primary-700 font-medium hover:underline">
              Lihat semua →
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {STUDENTS.map((st) => {
              const prog = STUDENT_PROGRESS[st.id]
              const overall = getOverall(prog)
              return (
                <div key={st.id} className="flex items-center gap-4 px-5 py-3">
                  <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-800 font-bold text-sm flex-shrink-0">
                    {st.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{st.name}</p>
                    <p className="text-xs text-gray-400">{st.matric}</p>
                  </div>
                  <div className="w-28">
                    <ProgressBar value={overall} height="sm" />
                    <p className="text-xs text-gray-500 text-right mt-0.5">{overall}%</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/lecturer/students" className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold text-gray-800 text-sm">Senarai Pelajar</h3>
            <p className="text-xs text-gray-500 mt-1">Lihat pencapaian terperinci setiap pelajar</p>
          </Link>
          <Link href="/lecturer/reports" className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-800 text-sm">Laporan & Analitik</h3>
            <p className="text-xs text-gray-500 mt-1">Graf dan statistik kemajuan kelas</p>
          </Link>
          <Link href="/lecturer/manage" className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all">
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="font-semibold text-gray-800 text-sm">Urus Kandungan</h3>
            <p className="text-xs text-gray-500 mt-1">Upload nota, soalan kuiz, dan aktiviti</p>
          </Link>
        </div>

      </div>
    </div>
  )
}
