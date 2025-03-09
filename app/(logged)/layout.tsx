import ProtectedRoute from '@/components/ProtectedRoute'
import { Sidebar } from '@/components/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <ProtectedRoute>
        <Sidebar />
        {children}
      </ProtectedRoute>
    </div>
  )
}
