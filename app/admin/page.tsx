import Header from '../../components/Header'
import Footer from '../../components/Footer'
import AdminDashboard from '../../components/AdminDashboard'

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  )
}
