import Sidebar from '@/components/layout/Sidebar'

export default function LecturerLayout({ children }: { children: React.ReactNode }) {
  const user = { name: 'Dr. Nuradiba binti Hassan', role: 'LECTURER' as const }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={user.role} userName={user.name} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}
