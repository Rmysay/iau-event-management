import { CAT_COLORS } from '../utils/constants.js'
import { getCapacityPct } from '../utils/helpers.js'

export default function EventCard({ ev, onViewDetail, onRegister }) {
  const pct      = getCapacityPct(ev.booked, ev.seats)
  const catColor = CAT_COLORS[ev.category] || '#e8b94f'
  const isLogo   = ev.imgType === 'logo'

  return (
    <div className="lift" style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 16, overflow: 'hidden',
    }}>
      {/* Image banner */}
      <div onClick={onViewDetail} style={{
        height: 160, overflow: 'hidden', cursor: 'pointer', position: 'relative',
        background: isLogo ? '#fff' : `linear-gradient(135deg, ${catColor}33, #16161a)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img
          src={ev.img}
          alt={ev.title}
          style={{
            width: isLogo ? 'auto' : '100%',
            height: isLogo ? '75%' : '100%',
            objectFit: isLogo ? 'contain' : 'cover',
            display: 'block',
          }}
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background = `linear-gradient(135deg, ${catColor}33, #16161a)`
          }}
        />
        {/* Gradient overlay for photo images */}
        {!isLogo && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(18,18,22,.6) 0%, transparent 60%)',
          }} />
        )}
      </div>

      <div style={{ padding: '18px 20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span className="badge" style={{ background: catColor + '22', color: catColor }}>{ev.category}</span>
          <span className="badge" style={{
            background: ev.status === 'Full' ? '#d94f4f22' : '#22c55e22',
            color:      ev.status === 'Full' ? '#d94f4f'   : '#22c55e',
          }}>{ev.status}</span>
        </div>

        <h3
          onClick={onViewDetail}
          className="display"
          style={{ fontSize: 17, marginBottom: 8, lineHeight: 1.3, cursor: 'pointer' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
          onMouseLeave={e => e.currentTarget.style.color = ''}
        >{ev.title}</h3>

        <div style={{ color: 'var(--sub)', fontSize: 12, marginBottom: 4 }}>📅 {ev.date}</div>
        <div style={{ color: 'var(--sub)', fontSize: 12, marginBottom: 10 }}>📍 {ev.location}</div>

        {ev.description && (
          <div style={{
            color: 'var(--muted)', fontSize: 12, lineHeight: 1.5, marginBottom: 12,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {ev.description}
          </div>
        )}

        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginBottom: 5 }}>
            <span>{ev.booked} / {ev.seats} registered</span><span>{pct}%</span>
          </div>
          <div style={{ height: 4, background: 'var(--border)', borderRadius: 2 }}>
            <div style={{ height: '100%', width: pct + '%', background: catColor, borderRadius: 2 }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onViewDetail} style={{
            flex: 1, padding: '9px 0', borderRadius: 8,
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--sub)', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>Details</button>
          <button
            onClick={onRegister}
            disabled={ev.status === 'Full'}
            style={{
              flex: 2, padding: '9px 0', borderRadius: 8, border: 'none',
              background: ev.status === 'Full' ? 'var(--border)' : 'var(--gold)',
              color:      ev.status === 'Full' ? 'var(--muted)'  : '#0d0d0f',
              fontWeight: 600, fontSize: 13,
              cursor: ev.status === 'Full' ? 'not-allowed' : 'pointer',
            }}
          >{ev.status === 'Full' ? 'Sold Out' : 'Register →'}</button>
        </div>
      </div>
    </div>
  )
}
