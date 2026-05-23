import { useState } from 'react'
import { Input, Select, Textarea } from '../components/FormField.jsx'
import { CAT_COLORS } from '../utils/constants.js'

const CATEGORIES = Object.keys(CAT_COLORS)
const EMOJIS = ['🎓', '🏛️', '🚀', '🎨', '⚽', '🤖', '🎭', '🔬', '🎵', '📚', '🏆', '💡']

export default function CreateEventPage({ setPage, events, setEvents }) {
  const [form, setForm] = useState({
    title: '', date: '', location: '', category: 'Conference',
    seats: '', description: '', organizer: '', img: '🎓',
  })
  const [done, setDone] = useState(false)
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (done) return (
    <div style={{ maxWidth: 520, margin: '80px auto', padding: 24, textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>✦</div>
      <h2 className="display" style={{ fontSize: 28, color: 'var(--gold)', marginBottom: 12 }}>Event Published!</h2>
      <p style={{ color: 'var(--sub)', marginBottom: 28 }}>
        <strong style={{ color: 'var(--text)' }}>{form.title}</strong> is now live.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => {
          setDone(false)
          setForm({ title: '', date: '', location: '', category: 'Conference', seats: '', description: '', organizer: '', img: '🎓' })
        }} style={{
          padding: '12px 22px', borderRadius: 10, border: 'none',
          background: 'var(--gold)', color: '#0d0d0f', fontWeight: 700, cursor: 'pointer',
        }}>Create Another</button>
        <button onClick={() => setPage('events')} style={{
          padding: '12px 22px', borderRadius: 10, cursor: 'pointer',
          background: 'transparent', border: '1px solid var(--border)', color: 'var(--sub)',
        }}>View Events</button>
      </div>
    </div>
  )

  const canSubmit = form.title && form.date && form.location && form.seats

  const handleSubmit = () => {
    if (!canSubmit) return
    const newEvent = {
      id:          events.length + 1,
      title:       form.title,
      date:        form.date,
      location:    form.location,
      category:    form.category,
      seats:       parseInt(form.seats, 10),
      booked:      0,
      img:         form.img,
      status:      'Open',
      description: form.description,
      organizer:   form.organizer,
    }
    setEvents(prev => [...prev, newEvent])
    setDone(true)
  }

  return (
    <div style={{ maxWidth: 680, margin: '40px auto', padding: '0 24px 60px' }}>
      <h1 className="display gold-line fade-up" style={{ fontSize: 30, marginBottom: 8 }}>Create New Event</h1>
      <p style={{ color: 'var(--sub)', marginBottom: 32, marginTop: 14 }}>Fill in the details to publish a new campus event.</p>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: 32 }}>

        {/* Emoji picker */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10 }}>Event Icon</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {EMOJIS.map(e => (
              <button key={e} onClick={() => upd('img', e)} style={{
                width: 40, height: 40, borderRadius: 8, fontSize: 20, cursor: 'pointer',
                background: form.img === e ? 'rgba(232,185,79,.2)' : 'var(--ink)',
                border: form.img === e ? '2px solid var(--gold)' : '1px solid var(--border)',
              }}>{e}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <Input label="Event Title *" value={form.title} onChange={e => upd('title', e.target.value)} placeholder="e.g. IAU Spring Conference 2026" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <Input label="Date *"     value={form.date}  onChange={e => upd('date', e.target.value)}  placeholder="e.g. Sep 10, 2026" />
          <Input label="Capacity *" type="number" value={form.seats} onChange={e => upd('seats', e.target.value)} placeholder="e.g. 200" />
        </div>
        <div style={{ marginBottom: 20 }}>
          <Input label="Location *" value={form.location} onChange={e => upd('location', e.target.value)} placeholder="e.g. Engineering Faculty, Block A" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <Select label="Category" value={form.category} onChange={e => upd('category', e.target.value)} options={CATEGORIES} />
          <Input  label="Organizer" value={form.organizer} onChange={e => upd('organizer', e.target.value)} placeholder="e.g. Faculty of Engineering" />
        </div>
        <div style={{ marginBottom: 28 }}>
          <Textarea label="Description" value={form.description} onChange={e => upd('description', e.target.value)} placeholder="Describe the event for students…" />
        </div>

        <button onClick={handleSubmit} style={{
          width: '100%', padding: 14, borderRadius: 12, border: 'none',
          background: canSubmit ? 'var(--gold)' : 'var(--border)',
          color:      canSubmit ? '#0d0d0f'     : 'var(--muted)',
          fontWeight: 700, fontSize: 15,
          cursor: canSubmit ? 'pointer' : 'not-allowed',
        }}>Publish Event ✦</button>
      </div>
    </div>
  )
}
