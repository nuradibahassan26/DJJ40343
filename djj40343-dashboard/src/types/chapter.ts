export type AssessmentType = 'NOTES' | 'PRE_QUIZ' | 'POST_QUIZ' | 'SIMULATION' | 'GAMES' | 'TUTORIAL'

export interface Chapter {
  id: string
  chapterNo: number
  title: string
  description: string
  color: string
  icon: string
}

export interface Assessment {
  id: string
  chapterId: string
  type: AssessmentType
  title: string
  maxScore: number
  order: number
}

export interface StudentProgress {
  id: string
  userId: string
  assessmentId: string
  score?: number
  completed: boolean
  attempts: number
  completedAt?: string
}

export interface ChapterProgress {
  chapterId: string
  chapterNo: number
  title: string
  totalItems: number
  completedItems: number
  percentage: number
  assessments: AssessmentProgress[]
}

export interface AssessmentProgress {
  type: AssessmentType
  completed: boolean
  score?: number
}
