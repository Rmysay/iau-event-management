import StatusBadge from '../components/StatusBadge.jsx'
import { CAT_COLORS } from '../utils/constants.js'
import { getCapacityPct } from '../utils/helpers.js'

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.v), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: '100%', background: CAT_COLORS[d.label] || 'var(--gold)',
            borderRadius: '4px 4px 0 0',
            height: Math.round((d.v / max) * 100) + 'px', opacity: .85,
          }}/>
          <span style={{ fontSize: 9, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.2 }}>{d.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage({ setPage, events, registrations }) {
  const total = events.reduce((a, e) => a + e.booked, 0)
  const open  = events.filter(e => e.status === 'Open').length

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <h1 className="display gold-line fade-up" style={{ fontSize: 30 }}>Admin Dashboard</h1>
        <button onClick={() => setPage('create-event')} style={{
          padding: '10px 22px', borderRadius: 10, border: 'none',
          background: 'var(--gold)', color: '#0d0d0f', fontWeight: 700, fontSize: 13, cursor: 'pointer',
        }}>+ Create Event</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 16, marginBottom: 36 }}>
        {[
          { label: 'Total Events',   value: events.length,        color: '#4f8ef5' },
          { label: 'Open Events',    value: open,                 color: '#22c55e' },
          { label: 'Total Bookings', value: total,                color: '#e8b94f' },
          { label: 'Registrations',  value: registrations.length, color: '#a855f7' },
        ].map((k, i) => (
          <div key={i} className="lift fade-up" style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '22px 20px', borderLeft: `3px solid ${k.color}`,
          }}>
            <div className="display" style={{ fontSize: 34, fontWeight: 900, color: k.color }}>{k.value}</div>
            <div style={{ color: 'var(--sub)', fontSize: 13, marginTop: 4 }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
          <h3 className="display" style={{ fontSize: 16, marginBottom: 20, color: 'var(--gold)' }}>Registrations by Category</h3>
          <BarChart data={events.map(e => ({ label: e.category, v: e.booked }))} />
        </div>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
          <h3 className="display" style={{ fontSize: 16, marginBottom: 20, color: 'var(--gold)' }}>Event Capacity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {events.map(ev => {
              const pct = getCapacityPct(ev.booked, ev.seats)
              const c   = CAT_COLORS[ev.category] || 'var(--gold)'
              return (
                <div key={ev.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--sub)', marginBottom: 4 }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{ev.title}</span>
                    <span style={{ color: c }}>{pct}%</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--border)', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: pct + '%', background: c, borderRadius: 3 }}/>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 className="display" style={{ fontSize: 16, color: 'var(--gold)' }}>Recent Registrations</h3>
          <button onClick={() => setPage('registrations')} style={{
            background: 'none', border: '1px solid var(--border)', color: 'var(--sub)',
            padding: '6px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer',
          }}>View All</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
              {['Name', 'Event', 'Date', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {registrations.slice(0, 4).map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 12 }}>{r.name}</td>
                <td style={{ padding: 12, color: 'var(--sub)' }}>{r.event}</td>
                <td style={{ padding: 12, color: 'var(--muted)' }}>{r.date}</td>
                <td style={{ padding: 12 }}><StatusBadge s={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
