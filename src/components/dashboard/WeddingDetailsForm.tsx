import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { WeddingDetails, LoveStoryEntry } from '@/lib/types'

export function WeddingDetailsForm() {
  const [details, setDetails] = useState<WeddingDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Form state
  const [groomName, setGroomName] = useState('')
  const [brideName, setBrideName] = useState('')
  const [weddingDate, setWeddingDate] = useState('')
  const [ceremonyVenue, setCeremonyVenue] = useState('')
  const [ceremonyAddress, setCeremonyAddress] = useState('')
  const [ceremonyTime, setCeremonyTime] = useState('')
  const [receptionVenue, setReceptionVenue] = useState('')
  const [receptionAddress, setReceptionAddress] = useState('')
  const [receptionTime, setReceptionTime] = useState('')
  const [loveStory, setLoveStory] = useState<LoveStoryEntry[]>([])

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('wedding_details')
        .select('*')
        .limit(1)
        .single()

      if (data) {
        const d = data as WeddingDetails
        setDetails(d)
        setGroomName(d.groom_name)
        setBrideName(d.bride_name)
        setWeddingDate(d.wedding_date?.slice(0, 16) || '')
        setCeremonyVenue(d.ceremony_venue)
        setCeremonyAddress(d.ceremony_address)
        setCeremonyTime(d.ceremony_time)
        setReceptionVenue(d.reception_venue)
        setReceptionAddress(d.reception_address)
        setReceptionTime(d.reception_time)
        setLoveStory(d.love_story || [])
      }
      setLoading(false)
    }
    fetch()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const payload = {
      groom_name: groomName,
      bride_name: brideName,
      wedding_date: weddingDate,
      ceremony_venue: ceremonyVenue,
      ceremony_address: ceremonyAddress,
      ceremony_time: ceremonyTime,
      reception_venue: receptionVenue,
      reception_address: receptionAddress,
      reception_time: receptionTime,
      love_story: loveStory,
      updated_at: new Date().toISOString(),
    }

    if (details) {
      await supabase.from('wedding_details').update(payload).eq('id', details.id)
    } else {
      await supabase.from('wedding_details').insert(payload)
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addStoryEntry = () => {
    setLoveStory([...loveStory, { year: new Date().getFullYear(), title: '', description: '' }])
  }

  const updateStoryEntry = (index: number, field: keyof LoveStoryEntry, value: string | number) => {
    const updated = [...loveStory]
    updated[index] = { ...updated[index], [field]: value }
    setLoveStory(updated)
  }

  const removeStoryEntry = (index: number) => {
    setLoveStory(loveStory.filter((_, i) => i !== index))
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-white border border-charcoal/10 rounded-lg font-sans text-sm focus:outline-none focus:border-gold transition-colors'
  const labelClass =
    'block font-sans text-[10px] uppercase tracking-[0.15em] text-charcoal/40 mb-1.5'

  if (loading) {
    return <p className="text-center font-sans text-sm text-charcoal/40 py-12">Loading...</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Names & Date */}
      <div className="bg-white/60 border border-charcoal/5 rounded-xl p-6">
        <h3 className="font-serif text-lg text-charcoal mb-4">Couple & Date</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Groom Name</label>
            <input type="text" value={groomName} onChange={(e) => setGroomName(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Bride Name</label>
            <input type="text" value={brideName} onChange={(e) => setBrideName(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Wedding Date & Time</label>
            <input type="datetime-local" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} required className={inputClass} />
          </div>
        </div>
      </div>

      {/* Ceremony */}
      <div className="bg-white/60 border border-charcoal/5 rounded-xl p-6">
        <h3 className="font-serif text-lg text-charcoal mb-4">Ceremony</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Venue</label>
            <input type="text" value={ceremonyVenue} onChange={(e) => setCeremonyVenue(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input type="text" value={ceremonyAddress} onChange={(e) => setCeremonyAddress(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Time (HH:MM)</label>
            <input type="time" value={ceremonyTime} onChange={(e) => setCeremonyTime(e.target.value)} required className={inputClass} />
          </div>
        </div>
      </div>

      {/* Reception */}
      <div className="bg-white/60 border border-charcoal/5 rounded-xl p-6">
        <h3 className="font-serif text-lg text-charcoal mb-4">Reception</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Venue</label>
            <input type="text" value={receptionVenue} onChange={(e) => setReceptionVenue(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input type="text" value={receptionAddress} onChange={(e) => setReceptionAddress(e.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Time (HH:MM)</label>
            <input type="time" value={receptionTime} onChange={(e) => setReceptionTime(e.target.value)} required className={inputClass} />
          </div>
        </div>
      </div>

      {/* Love Story */}
      <div className="bg-white/60 border border-charcoal/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg text-charcoal">Love Story Timeline</h3>
          <button
            type="button"
            onClick={addStoryEntry}
            className="text-xs font-sans uppercase tracking-[0.1em] text-charcoal/30 hover:text-gold transition-colors"
          >
            + Add Entry
          </button>
        </div>

        <div className="space-y-4">
          {loveStory.map((entry, i) => (
            <div key={i} className="grid grid-cols-[80px_1fr_2fr_auto] gap-3 items-start">
              <div>
                <label className={labelClass}>Year</label>
                <input
                  type="number"
                  value={entry.year}
                  onChange={(e) => updateStoryEntry(i, 'year', parseInt(e.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  value={entry.title}
                  onChange={(e) => updateStoryEntry(i, 'title', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <input
                  type="text"
                  value={entry.description}
                  onChange={(e) => updateStoryEntry(i, 'description', e.target.value)}
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => removeStoryEntry(i)}
                className="mt-5 text-xs text-charcoal/30 hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-charcoal text-cream font-sans text-xs tracking-[0.1em] uppercase rounded-lg hover:bg-gold transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Details'}
        </button>
        {saved && (
          <span className="font-sans text-xs text-green-600">Saved successfully!</span>
        )}
      </div>
    </form>
  )
}
