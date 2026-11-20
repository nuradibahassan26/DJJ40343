export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number  // index of correct option
  explanation?: string
}

export interface QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeTaken: number  // in seconds
  passed: boolean
}
