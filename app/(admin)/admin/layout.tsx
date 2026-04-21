import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ background: '#F4F6FB' }}>
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 min-h-screen">{children}</main>
    </div>
  )
}
