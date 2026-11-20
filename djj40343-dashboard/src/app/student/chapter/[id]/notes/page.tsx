'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Topbar from '@/components/layout/Topbar'
import { CHAPTERS } from '@/data/chapters'

export default function NotesPage() {
  const params = useParams()
  const chapterId = params.id as string
  const chapter = CHAPTERS.find((c) => c.id === chapterId) ?? CHAPTERS[0]

  return (
    <div className="flex-1 overflow-y-auto">
      <Topbar
        title={`📄 Nota — Bab ${chapter.chapterNo}`}
        subtitle={chapter.title}
      />

      <div className="p-6 space-y-6 max-w-4xl mx-auto">
        <Link href={`/student/chapter/${chapterId}`} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800">
          ← Kembali ke aktiviti bab
        </Link>

        {/* PDF/Slide viewer placeholder */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div
            className="p-5 flex items-center gap-3"
            style={{ background: `linear-gradient(135deg, ${chapter.color}15, ${chapter.color}05)` }}
          >
            <span className="text-3xl">{chapter.icon}</span>
            <div>
              <h2 className="font-bold text-gray-800">Nota Kuliah — Bab {chapter.chapterNo}</h2>
              <p className="text-sm text-gray-500">{chapter.title}</p>
            </div>
          </div>

          {/* Simulated PDF viewer */}
          <div className="bg-gray-50 border-t border-gray-100 min-h-96 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Nota PDF akan dipaparkan di sini</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-md">
              Upload fail PDF nota kuliah untuk Bab {chapter.chapterNo} dalam sistem pengurusan kandungan.
              Pelajar boleh membaca terus dalam browser atau memuat turun.
            </p>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors">
                📥 Muat Turun Nota
              </button>
              <button className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors">
                🔍 Skrin Penuh
              </button>
            </div>
          </div>
        </div>

        {/* Key topics */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="font-bold text-gray-800 mb-4">📌 Topik Utama Bab {chapter.chapterNo}</h3>
          <div className="space-y-2">
            {getChapterTopics(chapter.chapterNo).map((topic, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: chapter.color }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Complete button */}
        <div className="flex justify-between items-center">
          <Link
            href={`/student/chapter/${chapterId}`}
            className="text-sm text-gray-500 hover:text-gray-800"
          >
            ← Kembali
          </Link>
          <Link
            href={`/student/chapter/${chapterId}/pre-quiz`}
            className="px-6 py-2.5 bg-primary-800 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
          >
            Teruskan ke Pre-Quiz →
          </Link>
        </div>
      </div>
    </div>
  )
}

function getChapterTopics(chapterNo: number): string[] {
  const topics: Record<number, string[]> = {
    1: [
      'Definisi dan skop sains bahan',
      'Klasifikasi bahan: logam, polimer, seramik, komposit, semikonduktor',
      'Hubungan antara struktur, sifat, pemprosesan dan prestasi',
      'Sifat bahan: mekanik, elektrik, termal, optik dan magnetik',
      'Aplikasi bahan dalam kejuruteraan moden',
      'Bahan termaju dan nanoteknologi',
    ],
    2: [
      'Struktur atom dan model Bohr',
      'Ikatan primer: ionik, kovalen, metalik',
      'Ikatan sekunder: van der Waals, ikatan hidrogen',
      'Struktur kristal: BCC, FCC, HCP',
      'Miller indices dan satah kristal',
      'Polimorfisme dan alotropi',
    ],
    3: [
      'Tegasan (stress) dan terikan (strain)',
      'Modulus Young dan hukum Hooke',
      'Kekuatan alah dan kekuatan tegangan muktamad',
      'Kemuluran, kekerasan, dan keliatan',
      'Kegagalan rapuh vs kegagalan mulur',
      'Mekanik patah dan faktor intensiti tegasan',
      'Kegagalan lelah dan merangkak',
    ],
    4: [
      'Kecacatan titik: kekosongan, atom selitan, atom gantian',
      'Dislokasi tepi dan ulir',
      'Sempadan bijian dan sempadan fasa',
      'Rajah fasa satu komponen',
      'Rajah fasa Fe-C',
      'Hukum Lever untuk sistem dua fasa',
      'Transformasi fasa dan rawatan haba',
    ],
    5: [
      'Klasifikasi logam dan aloi',
      'Keluli karbon rendah, sederhana dan tinggi',
      'Keluli aloi dan stainless steel',
      'Rawatan haba: penaikan, penyejukan pantas, temper',
      'Aluminium aloi dan aplikasinya',
      'Aloi titanium untuk industri penerbangan',
      'Superalloy berasaskan nikel',
    ],
    6: [
      'Definisi dan mekanisme kakisan',
      'Sel elektrokimia dan deret elektromotorik',
      'Jenis kakisan: galvanik, celah, lubang, intergranular',
      'Kakisan tegasan (stress corrosion cracking)',
      'Perlindungan katodik: anod korban dan arus tepi',
      'Salutan dan inhibitor kakisan',
      'Kos ekonomi kakisan dan pencegahan',
    ],
    7: [
      'Ujian tegangan: keluk tegasan-terikan',
      'Ujian mampatan dan lenturan',
      'Ujian kekerasan: Brinell, Rockwell, Vickers',
      'Ujian impak: Charpy dan Izod',
      'Ujian lelah dan merangkak',
      'Ujian tidak musnah (NDT): ultrasonik, sinar-X, partikel magnet',
      'Pemilihan kaedah ujian dalam industri',
    ],
  }
  return topics[chapterNo] ?? []
}
