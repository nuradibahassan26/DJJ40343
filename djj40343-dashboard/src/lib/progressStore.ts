/**
 * Mock data store for demo purposes.
 * In production, replace with Prisma/DB calls.
 */

import { CHAPTERS } from '@/data/chapters'

export type AssessmentType = 'NOTES' | 'PRE_QUIZ' | 'POST_QUIZ' | 'SIMULATION' | 'GAMES' | 'TUTORIAL'

export interface ProgressEntry {
  userId: string
  chapterId: string
  type: AssessmentType
  completed: boolean
  score?: number
}

// In-memory store (resets on server restart – replace with DB in production)
const progressStore: ProgressEntry[] = []

export function getStudentProgress(userId: string) {
  return progressStore.filter((p) => p.userId === userId)
}

export function saveProgress(entry: ProgressEntry) {
  const idx = progressStore.findIndex(
    (p) => p.userId === entry.userId && p.chapterId === entry.chapterId && p.type === entry.type
  )
  if (idx >= 0) {
    progressStore[idx] = entry
  } else {
    progressStore.push(entry)
  }
}

export function getChapterProgress(userId: string, chapterId: string) {
  const types: AssessmentType[] = ['NOTES', 'PRE_QUIZ', 'POST_QUIZ', 'SIMULATION', 'GAMES']
  const userProgress = progressStore.filter(
    (p) => p.userId === userId && p.chapterId === chapterId
  )
  const completed = userProgress.filter((p) => p.completed).length
  return {
    completed,
    total: types.length,
    percentage: Math.round((completed / types.length) * 100),
    items: userProgress,
  }
}

export function getAllStudentsProgress(studentIds: string[]) {
  return studentIds.map((userId) => {
    const chapterStats = CHAPTERS.map((ch) => {
      const cp = getChapterProgress(userId, ch.id)
      return {
        chapterId: ch.id,
        chapterNo: ch.chapterNo,
        ...cp,
      }
    })
    const totalCompleted = chapterStats.reduce((sum, c) => sum + c.completed, 0)
    const totalItems = chapterStats.reduce((sum, c) => sum + c.total, 0)
    return {
      userId,
      overall: Math.round((totalCompleted / totalItems) * 100),
      chapters: chapterStats,
    }
  })
}
