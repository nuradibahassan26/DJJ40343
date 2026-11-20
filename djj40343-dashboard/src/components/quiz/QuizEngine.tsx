'use client'

import { useState, useEffect, useCallback } from 'react'
import { QuizQuestion, QuizResult } from '@/types/quiz'

interface QuizEngineProps {
  title: string
  questions: QuizQuestion[]
  onComplete: (result: QuizResult) => void
}

export default function QuizEngine({ title, questions, onComplete }: QuizEngineProps) {
  const [current, setCurrent]       = useState(0)
  const [selected, setSelected]     = useState<number | null>(null)
  const [answered, setAnswered]     = useState<boolean[]>(new Array(questions.length).fill(false))
  const [scores, setScores]         = useState<boolean[]>(new Array(questions.length).fill(false))
  const [showExplain, setShowExplain] = useState(false)
  const [timeLeft, setTimeLeft]     = useState(questions.length * 60)   // 60s per question
  const [finished, setFinished]     = useState(false)

  const finishQuiz = useCallback(() => {
    if (finished) return
    setFinished(true)
    const correct = scores.filter(Boolean).length
    onComplete({
      score:          Math.round((correct / questions.length) * 100),
      totalQuestions: questions.length,
      correctAnswers: correct,
      timeTaken:      questions.length * 60 - timeLeft,
      passed:         correct / questions.length >= 0.6,
    })
  }, [finished, scores, questions.length, timeLeft, onComplete])

  useEffect(() => {
    if (finished) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timer); finishQuiz(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [finished, finishQuiz])

  const handleSelect = (optIdx: number) => {
    if (answered[current]) return
    setSelected(optIdx)
    const isCorrect = optIdx === questions[current].correctAnswer
    const newAnswered = [...answered]; newAnswered[current] = true
    const newScores   = [...scores];   newScores[current]   = isCorrect
    setAnswered(newAnswered)
    setScores(newScores)
    setShowExplain(true)
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
      setShowExplain(false)
    } else {
      finishQuiz()
    }
  }

  const q = questions[current]
  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const progress = ((current + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-xs text-gray-400">Soalan {current + 1} / {questions.length}</p>
        </div>
        <div className={`text-sm font-bold px-3 py-1.5 rounded-xl ${
          timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-700'
        }`}>
          ⏱ {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div className="bg-primary-800 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <p className="font-semibold text-gray-800 leading-relaxed mb-5 text-sm">
          {current + 1}. {q.question}
        </p>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let classes = 'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all text-sm '
            if (!answered[current]) {
              classes += 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
            } else if (i === q.correctAnswer) {
              classes += 'border-green-500 bg-green-50'
            } else if (i === selected && i !== q.correctAnswer) {
              classes += 'border-red-400 bg-red-50'
            } else {
              classes += 'border-gray-100 opacity-60'
            }

            return (
              <div key={i} className={classes} onClick={() => handleSelect(i)}>
                <span className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
                  i === q.correctAnswer && answered[current]
                    ? 'bg-green-500 border-green-500 text-white'
                    : i === selected && i !== q.correctAnswer && answered[current]
                    ? 'bg-red-400 border-red-400 text-white'
                    : 'border-gray-300 text-gray-500'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-gray-700 leading-relaxed">{opt}</span>
              </div>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplain && q.explanation && (
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
            <strong>💡 Penjelasan:</strong> {q.explanation}
          </div>
        )}
      </div>

      {/* Next button */}
      {answered[current] && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
          >
            {current < questions.length - 1 ? 'Soalan Seterusnya →' : 'Selesai Quiz ✓'}
          </button>
        </div>
      )}
    </div>
  )
}
