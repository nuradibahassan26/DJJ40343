'use client'

import { useState } from 'react'
import Topbar from '@/components/layout/Topbar'
import { CHAPTERS } from '@/data/chapters'

type ContentType = 'notes' | 'pre-quiz' | 'post-quiz' | 'simulation' | 'games' | 'tutorial'

const CONTENT_TYPES: { key: ContentType; label: string; icon: string; desc: string }[] = [
  { key: 'notes',      label: 'Nota Kuliah',         icon: '📄', desc: 'Upload fail PDF atau Powerpoint' },
  { key: 'pre-quiz',   label: 'Quiz Sebelum Kelas',  icon: '📝', desc: 'Tambah/edit soalan kuiz' },
  { key: 'post-quiz',  label: 'Quiz Selepas Kelas',  icon: '📋', desc: 'Tambah/edit soalan kuiz' },
  { key: 'simulation', label: 'Simulasi Interaktif', icon: '🔬', desc: 'Upload atau embed simulasi' },
  { key: 'games',      label: 'Permainan Kumpulan',  icon: '🎮', desc: 'Urus aktiviti kumpulan' },
  { key: 'tutorial',   label: 'Tutorial Book',       icon: '📖', desc: 'Upload buku tutorial PDF' },
]

export default function ManagePage() {
  const [selectedChapter, setSelectedChapter] = useState('ch1')
  const [selectedType, setSelectedType]       = useState<ContentType>('notes')
  const [uploadName, setUploadName]           = useState('')

  const chapter = CHAPTERS.find((c) => c.id === selectedChapter) ?? CHAPTERS[0]

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="⚙️ Urus Kandungan" subtitle="Upload nota, soalan kuiz, dan aktiviti pembelajaran" />

      <div className="p-6 space-y-6">

        {/* Chapter selector */}
        <div>
          <h2 className="font-semibold text-gray-700 text-sm mb-3">Pilih Bab</h2>
          <div className="flex flex-wrap gap-2">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChapter(ch.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all border ${
                  selectedChapter === ch.id
                    ? 'text-white border-transparent'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
                style={selectedChapter === ch.id ? { backgroundColor: ch.color, borderColor: ch.color } : {}}
              >
                <span>{ch.icon}</span>
                <span>Bab {ch.chapterNo}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content type tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CONTENT_TYPES.map((ct) => (
            <button
              key={ct.key}
              onClick={() => setSelectedType(ct.key)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                selectedType === ct.key
                  ? 'border-primary-800 bg-primary-50 text-primary-800'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
              }`}
            >
              <span className="text-xl">{ct.icon}</span>
              <span className="text-xs font-medium leading-tight">{ct.label}</span>
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <span>{CONTENT_TYPES.find((c) => c.key === selectedType)?.icon}</span>
                <span>{CONTENT_TYPES.find((c) => c.key === selectedType)?.label}</span>
                <span className="text-gray-400">—</span>
                <span style={{ color: chapter.color }}>Bab {chapter.chapterNo}</span>
              </h3>
              <p className="text-sm text-gray-500 mt-0.5">{chapter.title}</p>
            </div>
          </div>

          {/* Upload area */}
          {(selectedType === 'notes' || selectedType === 'tutorial' || selectedType === 'simulation') && (
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-3">☁️</div>
                <p className="font-medium text-gray-700">Seret fail ke sini atau klik untuk pilih</p>
                <p className="text-sm text-gray-400 mt-1">Disokong: PDF, PPT, PPTX (Maks: 50MB)</p>
                <button className="mt-4 px-5 py-2 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors">
                  Pilih Fail
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Fail</label>
                <input
                  type="text"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  placeholder={`Contoh: Nota_Bab${chapter.chapterNo}_DJJ40343`}
                />
              </div>

              <button className="px-6 py-2.5 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors">
                📤 Upload Fail
              </button>
            </div>
          )}

          {/* Quiz editor */}
          {(selectedType === 'pre-quiz' || selectedType === 'post-quiz') && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
                <strong>📝 Penyunting Kuiz</strong><br />
                Tambah, edit, atau padam soalan kuiz. Soalan sedia ada untuk bab ini boleh diubah suai.
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-xl hover:bg-green-700 transition-colors">
                ➕ Tambah Soalan Baru
              </button>

              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50">
                    <span className="text-sm text-gray-700">Soalan {n} — (soalan sedia ada)</span>
                    <div className="flex gap-2">
                      <button className="text-xs text-primary-700 hover:underline">Edit</button>
                      <button className="text-xs text-red-500 hover:underline">Padam</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Games config */}
          {selectedType === 'games' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
                <strong>🎮 Konfigurasi Permainan Kumpulan</strong><br />
                Tetapkan jenis permainan dan parameter untuk setiap bab.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Quiz Battle', 'Susun Istilah', 'Padankan Konsep', 'Trivia Kelas'].map((game) => (
                  <div key={game} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <span className="text-sm font-medium text-gray-700">{game}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-800" />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
