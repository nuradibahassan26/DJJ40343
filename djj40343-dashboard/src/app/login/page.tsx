'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Demo: hardcoded credentials
    // Replace with real NextAuth signIn() in production
    if (form.email === 'student@demo.com' && form.password === 'demo123') {
      setTimeout(() => router.push('/student/dashboard'), 500)
    } else if (form.email === 'lecturer@demo.com' && form.password === 'demo123') {
      setTimeout(() => router.push('/lecturer/dashboard'), 500)
    } else {
      setError('E-mel atau kata laluan tidak sah. Cuba: student@demo.com / demo123')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              ⚗️
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Log Masuk</h1>
            <p className="text-gray-500 text-sm mt-1">DJJ40343 — Material Science & Engineering</p>
          </div>

          {/* Demo hint */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 text-xs text-blue-700">
            <strong>Demo:</strong><br />
            Pelajar: <code>student@demo.com</code> / <code>demo123</code><br />
            Pensyarah: <code>lecturer@demo.com</code> / <code>demo123</code>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mel
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kata Laluan
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="••••••••"
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
              {loading ? 'Log masuk...' : 'Log Masuk'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Belum ada akaun?{' '}
            <Link href="/register" className="text-primary-700 font-medium hover:underline">
              Daftar di sini
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
