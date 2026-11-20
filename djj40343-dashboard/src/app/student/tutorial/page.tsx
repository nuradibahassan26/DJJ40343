'use client'

import Topbar from '@/components/layout/Topbar'
import { CHAPTERS } from '@/data/chapters'
import Link from 'next/link'

const TUTORIAL_SECTIONS = [
  { title: 'Pendahuluan', pages: '1–5', desc: 'Pengenalan kepada buku tutorial dan cara penggunaan' },
  { title: 'Bab 1: Introduction to Materials Science', pages: '6–25', desc: 'Konsep asas, klasifikasi bahan, dan hubungan struktur-sifat' },
  { title: 'Bab 2: Structure & Interatomic Bonding', pages: '26–55', desc: 'Struktur atom, ikatan primer dan sekunder, struktur kristal' },
  { title: 'Bab 3: Properties of Metals and Failure', pages: '56–85', desc: 'Sifat mekanik, kegagalan bahan, dan mekanik patah' },
  { title: 'Bab 4: Imperfections & Phase Diagram', pages: '86–115', desc: 'Kecacatan kristal, dislokasi, dan rajah fasa Fe-C' },
  { title: 'Bab 5: Metals and Alloys', pages: '116–145', desc: 'Aloi logam, rawatan haba, dan aplikasi kejuruteraan' },
  { title: 'Bab 6: Corrosion of Metals', pages: '146–165', desc: 'Mekanisme kakisan, jenis kakisan, dan pencegahan' },
  { title: 'Bab 7: Material Testing', pages: '166–195', desc: 'Kaedah ujian musnah dan tidak musnah' },
  { title: 'Lampiran A: Jadual Sifat Bahan', pages: '196–205', desc: 'Jadual rujukan sifat mekanik, termal, dan elektrik pelbagai bahan' },
  { title: 'Lampiran B: Rajah Fasa Penting', pages: '206–215', desc: 'Koleksi rajah fasa untuk sistem logam utama' },
  { title: 'Glosari Istilah', pages: '216–225', desc: 'Senarai istilah teknikal dalam bahasa Melayu dan Inggeris' },
]

export default function TutorialPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="📖 Tutorial Book" subtitle="Buku Rujukan DJJ40343 — Material Science and Engineering" />

      <div className="p-6 space-y-6 max-w-4xl mx-auto">

        {/* Book cover */}
        <div className="bg-primary-800 rounded-2xl p-8 text-white flex items-center gap-6">
          <div className="text-7xl">📖</div>
          <div>
            <h1 className="text-2xl font-bold">Tutorial Book</h1>
            <h2 className="text-lg text-blue-200 mt-1">DJJ40343 Material Science and Engineering</h2>
            <p className="text-blue-100 text-sm mt-2">Universiti Tun Hussein Onn Malaysia</p>
            <p className="text-blue-200 text-xs mt-1">225 halaman · 7 Bab · 2 Lampiran</p>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-white text-primary-800 text-sm font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                📥 Muat Turun PDF
              </button>
              <button className="px-4 py-2 bg-accent-500 text-white text-sm font-semibold rounded-xl hover:bg-accent-600 transition-colors">
                📖 Baca Online
              </button>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-800">Kandungan Buku</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {TUTORIAL_SECTIONS.map((section, i) => (
              <div key={i} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                <span className="text-xs font-mono text-gray-400 w-16 flex-shrink-0 mt-0.5">{section.pages}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 group-hover:text-primary-800 transition-colors text-sm">{section.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{section.desc}</p>
                </div>
                <span className="text-gray-300 group-hover:text-primary-800 transition-colors">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links to chapters */}
        <div>
          <h2 className="font-bold text-gray-800 mb-3">📚 Terus ke Pembelajaran Chapter</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHAPTERS.map((ch) => (
              <Link
                key={ch.id}
                href={`/student/chapter/${ch.id}`}
                className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 px-4 py-3 hover:shadow-sm hover:border-blue-200 transition-all group"
              >
                <span className="text-xl">{ch.icon}</span>
                <div>
                  <span
                    className="text-xs font-bold"
                    style={{ color: ch.color }}
                  >
                    Bab {ch.chapterNo}
                  </span>
                  <p className="text-sm text-gray-700 group-hover:text-primary-800 transition-colors leading-tight">
                    {ch.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
