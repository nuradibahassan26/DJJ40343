import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-800 to-primary-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo / Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-4xl">⚗️</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">
          DJJ40343
        </h1>
        <h2 className="text-xl font-semibold text-blue-200 mb-4">
          Material Science and Engineering
        </h2>
        <p className="text-blue-100 mb-10 text-sm leading-relaxed">
          Platform pembelajaran interaktif untuk kursus Material Science and Engineering.<br />
          Akses nota, kuiz, simulasi dan permainan kumpulan untuk 7 topik kursus.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-primary-800 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow"
          >
            Log Masuk
          </Link>
          <Link
            href="/register"
            className="px-8 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-colors shadow"
          >
            Daftar Akaun
          </Link>
        </div>

        {/* Course Topics Preview */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {[
            { no: '1.0', title: 'Introduction to Materials Science and Engineering' },
            { no: '2.0', title: 'Materials Structure and Interatomic Bonding' },
            { no: '3.0', title: 'Materials Properties of Metals and Failure' },
            { no: '4.0', title: 'Imperfections in Solids and Phase Diagram' },
            { no: '5.0', title: 'Metals and Alloys for Engineering Applications' },
            { no: '6.0', title: 'Corrosion of Metals' },
            { no: '7.0', title: 'Material Testing' },
          ].map((topic) => (
            <div
              key={topic.no}
              className="flex items-start gap-3 bg-white/10 backdrop-blur rounded-lg px-4 py-3"
            >
              <span className="text-accent-400 font-bold text-sm mt-0.5">{topic.no}</span>
              <span className="text-white text-sm">{topic.title}</span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-blue-200 text-xs">
          © 2024 DJJ40343 · Universiti Tun Hussein Onn Malaysia
        </p>
      </div>
    </main>
  )
}
