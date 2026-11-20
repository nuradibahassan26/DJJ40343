'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Topbar from '@/components/layout/Topbar'
import { CHAPTERS } from '@/data/chapters'

interface GameDef {
  id: string
  title: string
  type: string
  players: string
  duration: string
  description: string
  emoji: string
}

function getGames(chapterNo: number): GameDef[] {
  const baseGames: GameDef[] = [
    {
      id: 'quiz-battle',
      title: 'Quiz Battle Kumpulan',
      type: 'Kuiz Kompetitif',
      players: '2–6 pemain',
      duration: '15–20 minit',
      description: 'Bertanding menjawab soalan kuiz dalam masa nyata. Markah tertinggi menang!',
      emoji: '⚔️',
    },
    {
      id: 'word-scramble',
      title: 'Susun Istilah',
      type: 'Perbendaharaan Kata',
      players: '1–4 pemain',
      duration: '10 minit',
      description: `Susun semula huruf untuk membentuk istilah penting dalam Bab ${chapterNo}.`,
      emoji: '🔤',
    },
    {
      id: 'match-pairs',
      title: 'Padankan Konsep',
      type: 'Pemadanan',
      players: '1–2 pemain',
      duration: '10 minit',
      description: 'Padankan istilah dengan definisi atau gambar berkaitan topik bab ini.',
      emoji: '🃏',
    },
    {
      id: 'kahoot-style',
      title: 'Trivia Kelas',
      type: 'Trivia Interaktif',
      players: 'Seluruh kelas',
      duration: '20–30 minit',
      description: 'Pensyarah mengehos, pelajar menjawab secara serentak menggunakan kod bilik.',
      emoji: '🏆',
    },
  ]
  return baseGames
}

export default function GamesPage() {
  const params    = useParams()
  const chapterId = params.id as string
  const chapter   = CHAPTERS.find((c) => c.id === chapterId) ?? CHAPTERS[0]
  const games     = getGames(chapter.chapterNo)

  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [roomCode, setRoomCode]     = useState('')

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="🎮 Permainan Kumpulan Interaktif" subtitle={`Bab ${chapter.chapterNo}: ${chapter.title}`} />

      <div className="p-6 space-y-6">
        <Link href={`/student/chapter/${chapterId}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
          ← Kembali ke aktiviti bab
        </Link>

        {/* Info banner */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-2xl">🎯</span>
          <div>
            <h3 className="font-semibold text-amber-800 text-sm">Pembelajaran Melalui Permainan</h3>
            <p className="text-amber-700 text-xs mt-1">
              Aktiviti kumpulan ini direka untuk memperkukuh pemahaman konsep melalui interaksi yang seronok.
              Sertai atau cipta bilik permainan untuk bermain bersama rakan sekelas.
            </p>
          </div>
        </div>

        {/* Games grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {games.map((game) => (
            <div key={game.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: chapter.color + '15' }}
                >
                  {game.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{game.title}</h3>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: chapter.color }}
                  >
                    {game.type}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-3">{game.description}</p>
              <div className="flex gap-3 text-xs text-gray-400 mb-4">
                <span>👥 {game.players}</span>
                <span>⏱ {game.duration}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveGame(game.id)}
                  className="flex-1 py-2 text-sm font-medium rounded-xl transition-colors text-white"
                  style={{ backgroundColor: chapter.color }}
                >
                  Cipta Bilik
                </button>
                <button
                  onClick={() => setActiveGame(game.id + '-join')}
                  className="flex-1 py-2 text-sm font-medium rounded-xl border transition-colors hover:bg-gray-50"
                  style={{ borderColor: chapter.color, color: chapter.color }}
                >
                  Sertai
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Join/Create Room Dialog */}
        {activeGame && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">
                {activeGame.endsWith('-join') ? '🚪 Sertai Bilik' : '➕ Cipta Bilik Baru'}
              </h3>
              <button onClick={() => setActiveGame(null)} className="text-gray-400 hover:text-gray-600 text-sm">✕ Tutup</button>
            </div>

            {activeGame.endsWith('-join') ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Masukkan kod bilik yang diberikan oleh rakan atau pensyarah anda:</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="Contoh: MAT001"
                    maxLength={6}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button className="px-5 py-2.5 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors">
                    Sertai
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 mb-2">Kod Bilik Anda</p>
                  <div
                    className="text-3xl font-bold font-mono tracking-widest"
                    style={{ color: chapter.color }}
                  >
                    {Math.random().toString(36).toUpperCase().slice(2, 8)}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Kongsi kod ini dengan rakan untuk menyertai</p>
                </div>
                <button className="w-full py-2.5 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors">
                  Mula Permainan
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between">
          <Link href={`/student/chapter/${chapterId}/simulation`} className="text-sm text-gray-500 hover:text-gray-800">
            ← Simulasi
          </Link>
          <Link
            href={`/student/chapter/${chapterId}`}
            className="px-6 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors"
          >
            ✅ Selesai Bab {chapter.chapterNo}
          </Link>
        </div>
      </div>
    </div>
  )
}
