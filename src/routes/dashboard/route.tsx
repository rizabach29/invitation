import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { GuestTable } from '@/components/dashboard/GuestTable'
import { GuestForm } from '@/components/dashboard/GuestForm'
import { WeddingDetailsForm } from '@/components/dashboard/WeddingDetailsForm'
import { GalleryManager } from '@/components/dashboard/GalleryManager'
import { MessagesViewer } from '@/components/dashboard/MessagesViewer'
import { supabase } from '@/lib/supabase'
import type { Guest } from '@/lib/types'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

type Tab = 'guests' | 'details' | 'gallery' | 'messages'

function DashboardLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('dashboardAuth') === 'true'
  )
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD
    if (password === adminPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('dashboardAuth', 'true')
    } else {
      setError('Invalid password')
      setTimeout(() => setError(''), 2000)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-2xl shadow-sm border border-charcoal/5 max-w-sm w-full"
        >
          <h1 className="font-serif text-2xl text-charcoal mb-1">Dashboard</h1>
          <p className="font-sans text-xs text-charcoal/40 mb-8">
            Enter admin password to continue
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 bg-cream/50 border border-charcoal/10 rounded-lg font-sans text-sm focus:outline-none focus:border-sage transition-colors"
          />
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-xs font-sans mt-2"
            >
              {error}
            </motion.p>
          )}
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-charcoal text-cream font-sans text-sm tracking-[0.1em] uppercase rounded-lg hover:bg-sage transition-colors"
          >
            Login
          </button>
        </motion.form>
      </div>
    )
  }

  return <DashboardContent />
}

function DashboardContent() {
  const [activeTab, setActiveTab] = useState<Tab>('guests')
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0, declined: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase.from('guests').select('rsvp_status')
      if (data) {
        setStats({
          total: data.length,
          confirmed: data.filter((g) => g.rsvp_status === 'confirmed').length,
          pending: data.filter((g) => g.rsvp_status === 'pending').length,
          declined: data.filter((g) => g.rsvp_status === 'declined').length,
        })
      }
    }
    fetchStats()
  }, [activeTab])

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'guests', label: 'Guests', icon: '👥' },
    { key: 'details', label: 'Details', icon: '💍' },
    { key: 'gallery', label: 'Gallery', icon: '📸' },
    { key: 'messages', label: 'Messages', icon: '💌' },
  ]

  const handleLogout = () => {
    sessionStorage.removeItem('dashboardAuth')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="border-b border-charcoal/5 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-serif text-xl text-charcoal">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-xs font-sans uppercase tracking-[0.15em] text-charcoal/30 hover:text-charcoal transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Guests', value: stats.total, color: 'text-charcoal' },
            { label: 'Confirmed', value: stats.confirmed, color: 'text-green-600' },
            { label: 'Pending', value: stats.pending, color: 'text-sage' },
            { label: 'Declined', value: stats.declined, color: 'text-red-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/60 border border-charcoal/5 rounded-xl p-5 text-center"
            >
              <p className={`font-serif text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white/40 p-1 rounded-xl border border-charcoal/5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-lg font-sans text-sm transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-charcoal/40 hover:text-charcoal/60'
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'guests' && <GuestsTab />}
            {activeTab === 'details' && <WeddingDetailsForm />}
            {activeTab === 'gallery' && <GalleryManager />}
            {activeTab === 'messages' && <MessagesViewer />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function GuestsTab() {
  const [showForm, setShowForm] = useState(false)
  const [editGuest, setEditGuest] = useState<Guest | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSaved = () => {
    setShowForm(false)
    setEditGuest(null)
    setRefreshKey((k) => k + 1)
  }

  const handleEdit = (guest: Guest) => {
    setEditGuest(guest)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl text-charcoal">Guest List</h2>
        <button
          onClick={() => { setEditGuest(null); setShowForm(!showForm) }}
          className="px-5 py-2 bg-charcoal text-cream font-sans text-xs tracking-[0.1em] uppercase rounded-lg hover:bg-sage transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Guest'}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <GuestForm guest={editGuest} onSaved={handleSaved} />
          </motion.div>
        )}
      </AnimatePresence>

      <GuestTable key={refreshKey} onEdit={handleEdit} onRefresh={() => setRefreshKey((k) => k + 1)} />
    </div>
  )
}
