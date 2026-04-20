import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Guest } from '@/lib/types'

interface GuestTableProps {
  onEdit: (guest: Guest) => void
  onRefresh: () => void
}

export function GuestTable({ onEdit, onRefresh }: GuestTableProps) {
  const [guests, setGuests] = useState<Guest[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | Guest['rsvp_status']>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGuests()
  }, [])

  const fetchGuests = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('guests')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setGuests(data as Guest[])
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this guest?')) return
    await supabase.from('guests').delete().eq('id', id)
    setGuests((prev) => prev.filter((g) => g.id !== id))
    onRefresh()
  }

  const copyLink = (slug: string) => {
    const url = `${window.location.origin}/invite/${slug}`
    navigator.clipboard.writeText(url)
  }

  const filtered = guests.filter((g) => {
    const matchSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.group_name?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || g.rsvp_status === filter
    return matchSearch && matchFilter
  })

  const statusColor: Record<string, string> = {
    confirmed: 'bg-green-50 text-green-600',
    pending: 'bg-yellow-50 text-yellow-600',
    declined: 'bg-red-50 text-red-400',
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search guests..."
          className="flex-1 px-4 py-2.5 bg-white border border-charcoal/10 rounded-lg font-sans text-sm focus:outline-none focus:border-gold transition-colors"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="px-4 py-2.5 bg-white border border-charcoal/10 rounded-lg font-sans text-sm focus:outline-none focus:border-gold"
        >
          <option value="all">All Status</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center font-sans text-sm text-charcoal/40 py-12">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center font-sans text-sm text-charcoal/40 py-12">No guests found</p>
      ) : (
        <div className="bg-white border border-charcoal/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-charcoal/5">
                  {['Name', 'Group', 'Status', 'Guests', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/40 font-medium"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((guest) => (
                  <tr
                    key={guest.id}
                    className="border-b border-charcoal/5 last:border-0 hover:bg-cream/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-sans text-sm text-charcoal">{guest.name}</p>
                      <p className="font-sans text-[10px] text-charcoal/30">{guest.slug}</p>
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-charcoal/50">
                      {guest.group_name || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-sans font-medium uppercase tracking-wider ${statusColor[guest.rsvp_status]}`}
                      >
                        {guest.rsvp_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-charcoal/50">
                      {guest.attendee_count}/{guest.max_attendees}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyLink(guest.slug)}
                          className="text-[10px] font-sans uppercase tracking-wider text-charcoal/30 hover:text-gold transition-colors"
                          title="Copy invitation link"
                        >
                          Link
                        </button>
                        <button
                          onClick={() => onEdit(guest)}
                          className="text-[10px] font-sans uppercase tracking-wider text-charcoal/30 hover:text-charcoal transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(guest.id)}
                          className="text-[10px] font-sans uppercase tracking-wider text-charcoal/30 hover:text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
