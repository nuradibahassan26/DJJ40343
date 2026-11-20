import { QuizResult } from '@/types/quiz'
import { getGrade } from '@/lib/utils'
import Link from 'next/link'

interface QuizResultCardProps {
  result: QuizResult
  chapterId: string
  quizType: 'pre' | 'post'
  onRetry: () => void
}

export default function QuizResultCard({ result, chapterId, quizType, onRetry }: QuizResultCardProps) {
  const { grade, color } = getGrade(result.score)
  const mins = Math.floor(result.timeTaken / 60)
  const secs = result.timeTaken % 60

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
      <div className="text-6xl mb-4">{result.passed ? '🎉' : '😔'}</div>
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        {result.passed ? 'Tahniah!' : 'Cuba Lagi!'}
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        {result.passed
          ? 'Anda telah lulus kuiz ini dengan cemerlang.'
          : 'Markah anda kurang dari 60%. Ulang kaji dan cuba lagi.'}
      </p>

      {/* Score circle */}
      <div className="flex flex-col items-center mb-6">
        <div className={`text-5xl font-bold ${color}`}>{result.score}%</div>
        <div className={`text-lg font-semibold ${color} mt-1`}>Gred {grade}</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-green-50 rounded-xl p-3">
          <div className="text-xl font-bold text-green-600">{result.correctAnswers}</div>
          <div className="text-xs text-gray-500">Betul</div>
        </div>
        <div className="bg-red-50 rounded-xl p-3">
          <div className="text-xl font-bold text-red-500">{result.totalQuestions - result.correctAnswers}</div>
          <div className="text-xs text-gray-500">Salah</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="text-sm font-bold text-blue-600">{mins}m {secs}s</div>
          <div className="text-xs text-gray-500">Masa</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {quizType === 'pre' && (
          <Link
            href={`/student/chapter/${chapterId}/notes`}
            className="w-full py-2.5 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
          >
            📄 Teruskan ke Nota Kuliah
          </Link>
        )}
        {quizType === 'post' && (
          <Link
            href={`/student/chapter/${chapterId}/simulation`}
            className="w-full py-2.5 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
          >
            🔬 Teruskan ke Simulasi
          </Link>
        )}
        <button
          onClick={onRetry}
          className="w-full py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
        >
          🔄 Cuba Semula
        </button>
        <Link
          href={`/student/chapter/${chapterId}`}
          className="w-full py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors text-center"
        >
          ← Kembali ke Bab
        </Link>
      </div>
    </div>
  )
}
