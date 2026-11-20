'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    matricNo: '',
    role: 'STUDENT',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Kata laluan tidak sepadan.')
      return
    }
    if (form.password.length < 6) {
      setError('Kata laluan mestilah sekurang-kurangnya 6 aksara.')
      return
    }

    setLoading(true)
    // Demo: redirect after short delay
    // In production: POST to /api/auth/register
    setTimeout(() => {
      if (form.role === 'STUDENT') {
        router.push('/student/dashboard')
      } else {
        router.push('/lecturer/dashboard')
      }
    }, 800)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              ⚗️
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Daftar Akaun</h1>
            <p className="text-gray-500 text-sm mt-1">DJJ40343 — Material Science & Engineering</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Daftar sebagai</label>
              <div className="grid grid-cols-2 gap-2">
                {['STUDENT', 'LECTURER'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, role: r })}
                    className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                      form.role === r
                        ? 'bg-primary-800 text-white border-primary-800'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-primary-400'
                    }`}
                  >
                    {r === 'STUDENT' ? '👨‍🎓 Pelajar' : '👩‍🏫 Pensyarah'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penuh</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Nama penuh anda"
                required
              />
            </div>

            {form.role === 'STUDENT' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. Matrik</label>
                <input
                  type="text"
                  value={form.matricNo}
                  onChange={(e) => setForm({ ...form, matricNo: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Contoh: AT210001"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mel</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kata Laluan</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Min. 6 aksara"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sahkan Kata Laluan</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ulang kata laluan"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary-800 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-60"
            >
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Sudah ada akaun?{' '}
            <Link href="/login" className="text-primary-700 font-medium hover:underline">
              Log masuk di sini
            </Link>
          </p>
        </div>

        <p className="text-center text-blue-200 text-xs mt-6">
          © 2024 DJJ40343 · UTHM
        </p>
      </div>
    </main>
  )
}
