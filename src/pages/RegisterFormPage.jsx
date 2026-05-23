import { useState } from 'react'
import { Input, Select, Textarea } from '../components/FormField.jsx'

export default function RegisterFormPage({ setPage, user, events, registrations, setRegistrations, selectedEvent }) {
  const [form, setForm] = useState({
    name:   user?.name  || '',
    email:  user?.email || '',
    phone:  '',
    event:  selectedEvent || '',
    guests: '1',
    notes:  '',
  })
  const [done, setDone] = useState(false)
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  if (!user) {
    return (
      <div style={{ maxWidth: 520, margin: '80px auto', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🔒</div>
        <h2 className="display" style={{ fontSize: 24, marginBottom: 12 }}>Sign In Required</h2>
        <p style={{ color: 'var(--sub)', marginBottom: 28 }}>
          You must sign in with your IAU school email to register for events.
        </p>
        <button onClick={() => setPage('login')} style={{
          padding: '12px 28px', borderRadius: 10, border: 'none',
          background: 'var(--gold)', color: '#0d0d0f', fontWeight: 700, cursor: 'pointer',
        }}>Sign In →</button>
      </div>
    )
  }

  if (done) return (
    <div style={{ maxWidth: 520, margin: '80px auto', padding: 24, textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>✦</div>
      <h2 className="display" style={{ fontSize: 28, color: 'var(--gold)', marginBottom: 12 }}>You're Registered!</h2>
      <p style={{ color: 'var(--sub)', marginBottom: 8 }}>
        Successfully registered for <strong style={{ color: 'var(--text)' }}>{form.event}</strong>.
      </p>
      <p style={{ color: 'var(--sub)', marginBottom: 28, fontSize: 13 }}>
        Confirmation sent to <strong style={{ color: 'var(--text)' }}>{form.email}</strong>.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => {
          setDone(false)
          setForm({ name: user.name, email: user.email, phone: '', event: '', guests: '1', notes: '' })
        }} style={{
          padding: '12px 22px', borderRadius: 10, border: 'none',
          background: 'var(--gold)', color: '#0d0d0f', fontWeight: 700, cursor: 'pointer', fontSize: 14,
        }}>Register for Another</button>
        <button onClick={() => setPage('registrations')} style={{
          padding: '12px 22px', borderRadius: 10, cursor: 'pointer',
          background: 'transparent', border: '1px solid var(--border)', color: 'var(--sub)', fontSize: 14,
        }}>My Registrations</button>
      </div>
    </div>
  )

  const openEvents = events.filter(e => e.status === 'Open').map(e => ({
    value: e.title, label: `${e.title} · ${e.date}`,
  }))

  const canSubmit = form.name && form.email && form.event

  const handleSubmit = () => {
    if (!canSubmit) return
    const newReg = {
      id:     registrations.length + 1,
      name:   form.name,
      email:  form.email,
      event:  form.event,
      date:   new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Confirmed',
    }
    setRegistrations(prev => [...prev, newReg])
    setDone(true)
  }

  return (
    <div style={{ maxWidth: 620, margin: '40px auto', padding: '0 24px 60px' }}>
      <h1 className="display gold-line fade-up" style={{ fontSize: 30, marginBottom: 8 }}>Event Registration</h1>
      <p style={{ color: 'var(--sub)', marginBottom: 32, marginTop: 14 }}>
        Registering as <strong style={{ color: 'var(--gold)' }}>{user.email}</strong>
      </p>
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <Input label="Full Name *"    value={form.name}  onChange={e => upd('name', e.target.value)}  placeholder="Your name" />
          <Input label="School Email *" type="email" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="you@ogr.iau.edu.tr" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <Input  label="Phone Number" value={form.phone}  onChange={e => upd('phone', e.target.value)}  placeholder="+90 5xx xxx xx xx" />
          <Select label="Guests"       value={form.guests} onChange={e => upd('guests', e.target.value)} options={['1','2','3','4','5']} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <Select label="Select Event *" value={form.event} onChange={e => upd('event', e.target.value)}
            options={[{ value: '', label: '— Choose an event —' }, ...openEvents]} />
        </div>
        <div style={{ marginBottom: 28 }}>
          <Textarea label="Special Requests" value={form.notes} onChange={e => upd('notes', e.target.value)}
            placeholder="Dietary requirements, accessibility needs…" />
        </div>
        <button onClick={handleSubmit} style={{
          width: '100%', padding: 14, borderRadius: 12, border: 'none',
          background: canSubmit ? 'var(--gold)' : 'var(--border)',
          color:      canSubmit ? '#0d0d0f'     : 'var(--muted)',
          fontWeight: 700, fontSize: 15,
          cursor: canSubmit ? 'pointer' : 'not-allowed',
        }}>Confirm Registration ✦</button>
      </div>
    </div>
  )
}
