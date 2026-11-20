'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Topbar from '@/components/layout/Topbar'
import QuizEngine from '@/components/quiz/QuizEngine'
import QuizResultCard from '@/components/quiz/QuizResultCard'
import { CHAPTERS } from '@/data/chapters'
import { QUIZ_QUESTIONS } from '@/data/quizQuestions'
import { QuizResult } from '@/types/quiz'

export default function PreQuizPage() {
  const params    = useParams()
  const chapterId = params.id as string
  const chapter   = CHAPTERS.find((c) => c.id === chapterId) ?? CHAPTERS[0]
  const questions = QUIZ_QUESTIONS[chapterId]?.preQuiz ?? []

  const [result, setResult]   = useState<QuizResult | null>(null)
  const [started, setStarted] = useState(false)

  if (!started) {
    return (
      <div className="flex-1 overflow-y-auto">
        <Topbar title="📝 Quiz Sebelum Kelas" subtitle={`Bab ${chapter.chapterNo}: ${chapter.title}`} />
        <div className="p-6">
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Quiz Sebelum Kelas</h2>
            <p className="text-gray-500 text-sm mb-6">
              Quiz ini untuk menilai pengetahuan awal anda sebelum menghadiri kuliah.<br />
              Terdapat <strong>{questions.length} soalan</strong>. Masa: <strong>{questions.length} minit</strong>.
            </p>
            <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 text-sm text-yellow-800 mb-6 text-left">
              <strong>📌 Arahan:</strong>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Jawab semua soalan dalam masa yang ditetapkan</li>
                <li>Setiap soalan hanya ada satu jawapan yang betul</li>
                <li>Markah lulus: 60%</li>
                <li>Anda boleh mencuba semula selepas melihat jawapan</li>
              </ul>
            </div>
            <button
              onClick={() => setStarted(true)}
              className="w-full py-3 bg-primary-800 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            >
              Mula Quiz →
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (result) {
    return (
      <div className="flex-1 overflow-y-auto">
        <Topbar title="📝 Keputusan Quiz Sebelum Kelas" subtitle={`Bab ${chapter.chapterNo}: ${chapter.title}`} />
        <div className="p-6">
          <QuizResultCard
            result={result}
            chapterId={chapterId}
            quizType="pre"
            onRetry={() => { setResult(null); setStarted(false) }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="📝 Quiz Sebelum Kelas" subtitle={`Bab ${chapter.chapterNo}: ${chapter.title}`} />
      <div className="p-6">
        <QuizEngine
          title={`Pre-Quiz — Bab ${chapter.chapterNo}`}
          questions={questions}
          onComplete={(r) => setResult(r)}
        />
      </div>
    </div>
  )
}
