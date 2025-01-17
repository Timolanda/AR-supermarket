import Dashboard from '../components/Dashboard'
import ThreeDBackground from '../components/ThreeDBackground'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <ThreeDBackground />
      <div className="relative z-10">
        <Dashboard />
      </div>
    </main>
  )
}

