'use client'

import Topbar from '@/components/layout/Topbar'
import ProgressBar from '@/components/dashboard/ProgressBar'
import { CHAPTERS } from '@/data/chapters'
import { getGrade } from '@/lib/utils'

const DEMO_SCORES: Record<string, { pre?: number; post?: number; sim?: boolean; games?: boolean }> = {
  ch1: { pre: 80, post: 85, sim: true,  games: true  },
  ch2: { pre: 60, post: 70, sim: true,  games: false },
  ch3: { pre: 40, post: undefined, sim: false, games: false },
  ch4: {}, ch5: {}, ch6: {}, ch7: {},
}

export default function StudentProgressPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="📊 Pencapaian Saya" subtitle="Rekod markah dan kemajuan pembelajaran" />

      <div className="p-6 space-y-6 max-w-4xl mx-auto">

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Pre-Quiz Selesai',  value: '2/7',   icon: '📝', color: 'text-purple-600' },
            { label: 'Post-Quiz Selesai', value: '2/7',   icon: '📋', color: 'text-pink-600'   },
            { label: 'Simulasi Selesai',  value: '2/7',   icon: '🔬', color: 'text-green-600'  },
            { label: 'Games Selesai',     value: '1/7',   icon: '🎮', color: 'text-yellow-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Per-chapter breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Pencapaian Mengikut Bab</h2>
          </div>

          <div className="divide-y divide-gray-50">
            {CHAPTERS.map((ch) => {
              const score = DEMO_SCORES[ch.id] ?? {}
              const preScore  = score.pre
              const postScore = score.post
              const avgScore  = preScore != null && postScore != null
                ? Math.round((preScore + postScore) / 2)
                : preScore ?? postScore
              const grade = avgScore != null ? getGrade(avgScore) : null

              const done = [
                preScore != null,
                postScore != null,
                score.sim === true,
                score.games === true,
              ].filter(Boolean).length

              return (
                <div key={ch.id} className="px-6 py-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{ch.icon}</span>
                    <div className="flex-1">
                      <span
                        className="text-xs font-bold mr-2"
                        style={{ color: ch.color }}
                      >
                        Bab {ch.chapterNo}
                      </span>
                      <span className="text-sm font-medium text-gray-800">{ch.title}</span>
                    </div>
                    {grade && (
                      <span className={`text-sm font-bold ${grade.color}`}>Gred {grade.grade}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    <ScoreCell label="Pre-Quiz"  score={preScore}  />
                    <ScoreCell label="Post-Quiz" score={postScore} />
                    <StatusCell label="Simulasi" done={score.sim}  />
                    <StatusCell label="Games"    done={score.games} />
                  </div>

                  <ProgressBar value={Math.round((done / 4) * 100)} height="sm" />
                  <p className="text-xs text-gray-400 mt-1">{done}/4 aktiviti selesai</p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

function ScoreCell({ label, score }: { label: string; score?: number }) {
  const grade = score != null ? getGrade(score) : null
  return (
    <div className="bg-gray-50 rounded-lg p-2.5 text-center">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      {score != null ? (
        <>
          <div className={`text-sm font-bold ${grade?.color}`}>{score}%</div>
          <div className={`text-xs ${grade?.color}`}>Gred {grade?.grade}</div>
        </>
      ) : (
        <div className="text-sm text-gray-300">—</div>
      )}
    </div>
  )
}

function StatusCell({ label, done }: { label: string; done?: boolean }) {
  return (
    <div className={`rounded-lg p-2.5 text-center ${done ? 'bg-green-50' : 'bg-gray-50'}`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-lg">{done ? '✅' : '—'}</div>
    </div>
  )
}
