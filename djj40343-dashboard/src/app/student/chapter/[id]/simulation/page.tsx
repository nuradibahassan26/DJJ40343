'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Topbar from '@/components/layout/Topbar'
import { CHAPTERS } from '@/data/chapters'

interface SimulationDef {
  id: string
  title: string
  description: string
  type: 'crystal' | 'stress' | 'phase' | 'corrosion' | 'generic'
}

function getSimulations(chapterNo: number): SimulationDef[] {
  const sims: Record<number, SimulationDef[]> = {
    1: [
      { id: 'mat-class', title: 'Klasifikasi Bahan', description: 'Susun bahan mengikut kategori: logam, polimer, seramik dan komposit', type: 'generic' },
      { id: 'mat-prop', title: 'Peta Sifat Bahan', description: 'Terokai hubungan antara sifat mekanik pelbagai bahan kejuruteraan', type: 'generic' },
    ],
    2: [
      { id: 'crystal-bcc', title: 'Visualisasi Struktur BCC', description: 'Putar dan terokai unit sel Body-Centered Cubic dalam 3D', type: 'crystal' },
      { id: 'crystal-fcc', title: 'Visualisasi Struktur FCC', description: 'Terokai unit sel Face-Centered Cubic dan kira bilangan atom', type: 'crystal' },
      { id: 'bonding', title: 'Simulasi Ikatan Atom', description: 'Visualisasi ikatan ionik, kovalen dan metalik', type: 'crystal' },
    ],
    3: [
      { id: 'stress-strain', title: 'Graf Tegasan-Terikan', description: 'Jana dan terokai keluk tegasan-terikan untuk pelbagai bahan', type: 'stress' },
      { id: 'fracture', title: 'Simulasi Pembesaran Retak', description: 'Lihat bagaimana retak merebak dalam bahan pada beban berbeza', type: 'stress' },
    ],
    4: [
      { id: 'phase-fe-c', title: 'Rajah Fasa Fe-C Interaktif', description: 'Klik mana-mana titik dalam rajah fasa Fe-C untuk melihat fasa yang hadir', type: 'phase' },
      { id: 'lever-rule', title: 'Kalkulator Hukum Lever', description: 'Kira pecahan fasa secara interaktif menggunakan hukum lever', type: 'phase' },
    ],
    5: [
      { id: 'heat-treatment', title: 'Simulasi Rawatan Haba', description: 'Jalankan rawatan haba maya: quench, temper, anneal dan normalise', type: 'generic' },
      { id: 'microstructure', title: 'Penjelajah Mikrostruktur', description: 'Lihat perubahan mikrostruktur keluli pada komposisi dan rawatan berbeza', type: 'generic' },
    ],
    6: [
      { id: 'galvanic', title: 'Sel Galvanik Interaktif', description: 'Bina sel galvanik dan lihat logam mana yang mengalami kakisan', type: 'corrosion' },
      { id: 'protection', title: 'Perlindungan Katodik', description: 'Simulasi perlindungan katodik menggunakan anod korban', type: 'corrosion' },
    ],
    7: [
      { id: 'tensile', title: 'Mesin Ujian Tegangan Maya', description: 'Jalankan ujian tegangan maya pada sampel bahan berbeza', type: 'stress' },
      { id: 'hardness', title: 'Ujian Kekerasan Interaktif', description: 'Simulasi ujian Brinell, Rockwell dan Vickers', type: 'generic' },
    ],
  }
  return sims[chapterNo] ?? []
}

export default function SimulationPage() {
  const params    = useParams()
  const chapterId = params.id as string
  const chapter   = CHAPTERS.find((c) => c.id === chapterId) ?? CHAPTERS[0]
  const sims      = getSimulations(chapter.chapterNo)

  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar title="🔬 Simulasi Interaktif" subtitle={`Bab ${chapter.chapterNo}: ${chapter.title}`} />

      <div className="p-6 space-y-6">
        <Link href={`/student/chapter/${chapterId}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
          ← Kembali ke aktiviti bab
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sims.map((sim) => (
            <div key={sim.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div
                className="h-40 flex items-center justify-center text-5xl"
                style={{ background: `linear-gradient(135deg, ${chapter.color}15, ${chapter.color}30)` }}
              >
                {sim.type === 'crystal'   ? '⚛️' :
                 sim.type === 'stress'    ? '🔧' :
                 sim.type === 'phase'     ? '📊' :
                 sim.type === 'corrosion' ? '🔴' : '🔬'}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-1">{sim.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{sim.description}</p>
                <button
                  onClick={() => setActive(sim.id)}
                  className="w-full py-2 text-sm font-medium rounded-xl transition-colors"
                  style={{
                    backgroundColor: active === sim.id ? chapter.color : chapter.color + '15',
                    color: active === sim.id ? '#fff' : chapter.color,
                  }}
                >
                  {active === sim.id ? '▶ Sedang Berjalan' : 'Mula Simulasi'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Simulation area */}
        {active && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">
                {sims.find((s) => s.id === active)?.title}
              </h3>
              <button onClick={() => setActive(null)} className="text-sm text-gray-400 hover:text-gray-600">✕ Tutup</button>
            </div>
            <div
              className="rounded-xl min-h-64 flex flex-col items-center justify-center text-center p-8"
              style={{ background: `linear-gradient(135deg, ${chapter.color}10, ${chapter.color}20)` }}
            >
              <div className="text-5xl mb-4">🔬</div>
              <p className="text-gray-600 font-medium">Simulasi interaktif akan dimuatkan di sini</p>
              <p className="text-sm text-gray-400 mt-2 max-w-md">
                Integrasikan simulasi HTML5/WebGL atau embed URL simulasi luaran
                (seperti PhET simulations) dalam komponen ini.
              </p>
              <div className="mt-4 flex gap-2 text-xs text-gray-400">
                <span className="bg-gray-100 px-2 py-1 rounded">PhET Interactive</span>
                <span className="bg-gray-100 px-2 py-1 rounded">WebGL / Three.js</span>
                <span className="bg-gray-100 px-2 py-1 rounded">HTML5 Canvas</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Link href={`/student/chapter/${chapterId}/post-quiz`} className="text-sm text-gray-500 hover:text-gray-800">
            ← Post-Quiz
          </Link>
          <Link
            href={`/student/chapter/${chapterId}/games`}
            className="px-6 py-2.5 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
          >
            Teruskan ke Permainan Kumpulan →
          </Link>
        </div>
      </div>
    </div>
  )
}
