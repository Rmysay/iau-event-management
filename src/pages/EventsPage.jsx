import { useState } from 'react'
import EventCard from '../components/EventCard.jsx'

export default function EventsPage({ setPage, user, events, setSelectedEvent, setViewEventId }) {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')
  const cats = ['All', ...Array.from(new Set(events.map(e => e.category)))]

  const filtered = events.filter(e =>
    (cat === 'All' || e.category === cat) &&
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 className="display gold-line fade-up" style={{ fontSize: 30, marginBottom: 6 }}>Campus Events</h1>
        {!user && (
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 10 }}>
            Sign in with your IAU school email to register for events.{' '}
            <span onClick={() => setPage('login')} style={{ color: 'var(--gold)', cursor: 'pointer' }}>Login →</span>
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
        <input
          placeholder="Search events…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: '1 1 220px', padding: '10px 16px', borderRadius: 10,
            background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 14,
          }}
        />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '8px 16px', borderRadius: 999, fontSize: 13, cursor: 'pointer',
              background: cat === c ? 'var(--gold)' : 'var(--card)',
              color:      cat === c ? '#0d0d0f'     : 'var(--sub)',
              border:     cat === c ? 'none'        : '1px solid var(--border)',
              fontWeight: cat === c ? 700 : 400,
            }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 20 }}>
        {filtered.length
          ? filtered.map(ev => (
              <EventCard key={ev.id} ev={ev}
                onViewDetail={() => { setViewEventId(ev.id); setPage('event-detail') }}
                onRegister={() => {
                  if (!user) setPage('login')
                  else { setSelectedEvent(ev.title); setPage('register') }
                }}
              />
            ))
          : <p style={{ color: 'var(--muted)', gridColumn: '1/-1' }}>No events match your search.</p>
        }
      </div>
    </div>
  )
}
