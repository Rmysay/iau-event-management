import { useState } from 'react'
import StatusBadge from '../components/StatusBadge.jsx'

export default function RegistrationsPage({ user, registrations }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const myRegistrations = user?.role === 'student'
    ? registrations.filter(r => r.email === user.email)
    : registrations

  const rows = myRegistrations.filter(r =>
    (filter === 'All' || r.status === filter) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) ||
     r.event.toLowerCase().includes(search.toLowerCase()))
  )

  const isStudent = user?.role === 'student'

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <h1 className="display gold-line fade-up" style={{ fontSize: 30, marginBottom: 28 }}>
        {isStudent ? 'My Registrations' : 'All Registrations'}
      </h1>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24, alignItems: 'center' }}>
        <input
          placeholder={isStudent ? 'Search by event…' : 'Search by name or event…'}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: '1 1 200px', padding: '10px 16px', borderRadius: 10,
            background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 14,
          }}
        />
        {['All', 'Confirmed', 'Pending', 'Cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '8px 16px', borderRadius: 999, fontSize: 13, cursor: 'pointer',
            background: filter === s ? 'var(--gold)' : 'var(--card)',
            color:      filter === s ? '#0d0d0f'     : 'var(--sub)',
            border:     filter === s ? 'none'        : '1px solid var(--border)',
            fontWeight: filter === s ? 700 : 400,
          }}>{s}</button>
        ))}
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,.03)', borderBottom: '1px solid var(--border)' }}>
              {(isStudent
                ? ['#', 'Event', 'Date', 'Status']
                : ['#', 'Name', 'Email', 'Event', 'Date', 'Status', 'Action']
              ).map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 16px', fontWeight: 600, color: 'var(--muted)', fontSize: 12, letterSpacing: '.5px', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{r.id}</td>
                {!isStudent && <td style={{ padding: '14px 16px', fontWeight: 500 }}>{r.name}</td>}
                {!isStudent && <td style={{ padding: '14px 16px', color: 'var(--sub)' }}>{r.email}</td>}
                <td style={{ padding: '14px 16px', color: 'var(--sub)' }}>{r.event}</td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)' }}>{r.date}</td>
                <td style={{ padding: '14px 16px' }}><StatusBadge s={r.status} /></td>
                {!isStudent && (
                  <td style={{ padding: '14px 16px' }}>
                    <button style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--sub)', padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer' }}>View</button>
                  </td>
                )}
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={isStudent ? 4 : 7} style={{ padding: 32, textAlign: 'center', color: 'var(--muted)' }}>
                  {isStudent ? "You haven't registered for any events yet." : 'No registrations found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 16, color: 'var(--muted)', fontSize: 13 }}>
        Showing {rows.length} of {myRegistrations.length} {isStudent ? 'registration' : 'record'}{myRegistrations.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}
