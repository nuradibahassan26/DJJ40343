import Sidebar from '@/components/layout/Sidebar'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  // In production, get user from session (NextAuth)
  const user = { name: 'Ahmad Faris bin Azmi', role: 'STUDENT' as const }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={user.role} userName={user.name} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}
