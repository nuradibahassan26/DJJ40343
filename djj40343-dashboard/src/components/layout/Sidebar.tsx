'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const studentNav = [
  { href: '/student/dashboard', icon: '🏠', label: 'Dashboard' },
  { href: '/student/chapters',  icon: '📚', label: 'Bab Kursus' },
  { href: '/student/tutorial',  icon: '📖', label: 'Tutorial Book' },
  { href: '/student/progress',  icon: '📊', label: 'Pencapaian Saya' },
]

const lecturerNav = [
  { href: '/lecturer/dashboard', icon: '🏠', label: 'Dashboard' },
  { href: '/lecturer/students',  icon: '👥', label: 'Senarai Pelajar' },
  { href: '/lecturer/reports',   icon: '📊', label: 'Laporan & Analitik' },
  { href: '/lecturer/manage',    icon: '⚙️', label: 'Urus Kandungan' },
]

interface SidebarProps {
  role: 'STUDENT' | 'LECTURER'
  userName: string
}

export default function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname()
  const navItems = role === 'LECTURER' ? lecturerNav : studentNav
  const initials = userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <aside className="w-64 min-h-screen bg-primary-800 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-primary-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-xl">
            ⚗️
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">DJJ40343</p>
            <p className="text-blue-200 text-xs leading-tight">Material Science</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-white text-primary-800'
                  : 'text-blue-100 hover:bg-primary-700 hover:text-white'
              )}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User info */}
      <div className="px-4 py-4 border-t border-primary-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{userName}</p>
            <p className="text-blue-200 text-xs">{role === 'LECTURER' ? 'Pensyarah' : 'Pelajar'}</p>
          </div>
          <Link
            href="/login"
            className="text-blue-200 hover:text-white text-xs"
            title="Log Keluar"
          >
            ⬅
          </Link>
        </div>
      </div>
    </aside>
  )
}
