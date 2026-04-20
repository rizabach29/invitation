import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Message } from '@/lib/types'

export function MessagesViewer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
      if (data) setMessages(data as Message[])
      setLoading(false)
    }
    fetchMessages()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this message?')) return
    await supabase.from('messages').delete().eq('id', id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return <p className="text-center font-sans text-sm text-charcoal/40 py-12">Loading...</p>
  }

  if (!messages.length) {
    return <p className="text-center font-sans text-sm text-charcoal/40 py-12">No messages yet</p>
  }

  return (
    <div className="space-y-3">
      <p className="font-sans text-xs text-charcoal/40 mb-4">
        {messages.length} message{messages.length !== 1 ? 's' : ''}
      </p>

      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-white/60 border border-charcoal/5 rounded-xl p-5 group hover:border-charcoal/10 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <p className="font-sans text-sm font-medium text-charcoal">
                  {msg.guest_name}
                </p>
                <span className="font-sans text-[10px] text-charcoal/30">
                  {formatDate(msg.created_at)}
                </span>
              </div>
              <p className="font-sans text-sm text-charcoal/60 leading-relaxed">
                {msg.message}
              </p>
            </div>
            <button
              onClick={() => handleDelete(msg.id)}
              className="text-[10px] font-sans uppercase tracking-wider text-charcoal/0 group-hover:text-charcoal/30 hover:!text-red-400 transition-colors flex-shrink-0"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
