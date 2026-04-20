import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { generateSlug } from '@/lib/utils'
import type { Guest } from '@/lib/types'

interface GuestFormProps {
  guest: Guest | null
  onSaved: () => void
}

export function GuestForm({ guest, onSaved }: GuestFormProps) {
  const [name, setName] = useState(guest?.name || '')
  const [slug, setSlug] = useState(guest?.slug || '')
  const [phone, setPhone] = useState(guest?.phone || '')
  const [groupName, setGroupName] = useState(guest?.group_name || '')
  const [maxAttendees, setMaxAttendees] = useState(guest?.max_attendees || 1)
  const [saving, setSaving] = useState(false)

  const handleNameChange = (value: string) => {
    setName(value)
    if (!guest) setSlug(generateSlug(value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      name: name.trim(),
      slug: slug.trim(),
      phone: phone.trim(),
      group_name: groupName.trim(),
      max_attendees: maxAttendees,
    }

    if (guest) {
      await supabase
        .from('guests')
        .update({ ...payload, updated_at: new Date().toISOString() })
        .eq('id', guest.id)
    } else {
      await supabase.from('guests').insert(payload)
    }

    setSaving(false)
    onSaved()
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-white border border-charcoal/10 rounded-lg font-sans text-sm focus:outline-none focus:border-sage transition-colors'
  const labelClass =
    'block font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/40 mb-1.5'

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/60 border border-charcoal/5 rounded-xl p-6 space-y-4"
    >
      <h3 className="font-serif text-lg text-charcoal mb-4">
        {guest ? 'Edit Guest' : 'Add New Guest'}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            className={inputClass}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className={labelClass}>Slug (URL)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className={inputClass}
            placeholder="john-doe"
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="+62..."
          />
        </div>
        <div>
          <label className={labelClass}>Group</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className={inputClass}
            placeholder="Family, Friends..."
          />
        </div>
        <div>
          <label className={labelClass}>Max Attendees</label>
          <input
            type="number"
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(parseInt(e.target.value) || 1)}
            min={1}
            max={10}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-charcoal text-cream font-sans text-xs tracking-[0.1em] uppercase rounded-lg hover:bg-sage transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : guest ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
}
