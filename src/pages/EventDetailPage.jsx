import { CAT_COLORS } from '../utils/constants.js'
import { getCapacityPct } from '../utils/helpers.js'

const IAU_LOGO = 'https://logowik.com/content/uploads/images/istanbul-aydin-university6728.logowik.com.webp'

export default function EventDetailPage({ setPage, user, events, viewEventId, setSelectedEvent }) {
  const ev = events.find(e => e.id === viewEventId)

  const handleBack = () => setPage(user ? 'events' : 'home')

  if (!ev) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--ink)' }}>
        {!user && <GuestHeader setPage={setPage} />}
        <div style={{ maxWidth: 600, margin: '80px auto', padding: 24, textAlign: 'center' }}>
          <h2 className="display" style={{ fontSize: 24, marginBottom: 12 }}>Event not found</h2>
          <button onClick={handleBack} style={{
            padding: '11px 24px', borderRadius: 10, border: 'none',
            background: 'var(--gold)', color: '#0d0d0f', fontWeight: 700, cursor: 'pointer',
          }}>← Go Back</button>
        </div>
      </div>
    )
  }

  const catColor = CAT_COLORS[ev.category] || '#e8b94f'
  const pct      = getCapacityPct(ev.booked, ev.seats)
  const isFull   = ev.status === 'Full'
  const isLogo   = ev.imgType === 'logo'

  const handleRegister = () => {
    if (!user) setPage('login')
    else { setSelectedEvent(ev.title); setPage('register') }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)' }}>

      {/* Minimal header for guests */}
      {!user && <GuestHeader setPage={setPage} />}

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 64px' }}>

        {/* Back */}
        <button onClick={handleBack} style={{
          background: 'none', border: 'none', color: 'var(--sub)',
          fontSize: 13, cursor: 'pointer', marginBottom: 28, padding: 0,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>← Back to Events</button>

        {/* Banner */}
        <div style={{
          height: 300, borderRadius: 20, overflow: 'hidden', marginBottom: 36,
          position: 'relative', border: '1px solid var(--border)',
          background: isLogo ? '#fff' : `linear-gradient(135deg, ${catColor}33, #16161a)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src={ev.img}
            alt={ev.title}
            style={{
              width: isLogo ? 'auto' : '100%',
              height: isLogo ? '55%' : '100%',
              objectFit: isLogo ? 'contain' : 'cover',
              display: 'block',
            }}
            onError={e => {
              e.target.style.display = 'none'
              e.target.parentElement.style.background = `linear-gradient(135deg, ${catColor}33, #16161a)`
            }}
          />
          {!isLogo && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(18,18,22,.75) 0%, transparent 55%)',
            }} />
          )}
          <div style={{ position: 'absolute', bottom: 18, right: 22, display: 'flex', gap: 8 }}>
            <span className="badge" style={{
              background: catColor + '33', color: catColor,
              backdropFilter: 'blur(8px)', border: `1px solid ${catColor}44`,
            }}>{ev.category}</span>
            <span className="badge" style={{
              background: isFull ? '#d94f4f33' : '#22c55e33',
              color:      isFull ? '#d94f4f'   : '#22c55e',
              backdropFilter: 'blur(8px)',
            }}>{ev.status}</span>
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>

          {/* Left */}
          <div>
            <h1 className="display fade-up" style={{ fontSize: 34, lineHeight: 1.2, marginBottom: 28 }}>{ev.title}</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                { icon: '📅', label: 'Date',      value: ev.date },
                { icon: '📍', label: 'Location',  value: ev.location },
                ev.organizer && { icon: '🏫', label: 'Organizer', value: ev.organizer },
              ].filter(Boolean).map((row, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                  padding: '14px 18px',
                  background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12,
                }}>
                  <span style={{ fontSize: 18, marginTop: 1 }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 3 }}>{row.label}</div>
                    <div style={{ color: 'var(--text)', fontSize: 14 }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {ev.description && (
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '24px 26px',
              }}>
                <h3 className="display" style={{ fontSize: 16, color: 'var(--gold)', marginBottom: 14 }}>About this Event</h3>
                <p style={{ color: 'var(--sub)', fontSize: 15, lineHeight: 1.85, margin: 0 }}>{ev.description}</p>
              </div>
            )}
          </div>

          {/* Right — registration card */}
          <div style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 18, padding: 26, position: 'sticky', top: 80,
          }}>
            <h3 className="display" style={{ fontSize: 15, marginBottom: 20, color: 'var(--gold)' }}>Registration</h3>

            {/* Capacity bar */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                <span style={{ color: 'var(--sub)' }}>Spots filled</span>
                <span style={{ color: catColor, fontWeight: 700 }}>{pct}%</span>
              </div>
              <div style={{ height: 8, background: 'var(--border)', borderRadius: 4 }}>
                <div style={{ height: '100%', width: pct + '%', background: catColor, borderRadius: 4, transition: 'width .5s ease' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginTop: 7 }}>
                <span>{ev.booked} registered</span>
                <span>{ev.seats - ev.booked} left</span>
              </div>
            </div>

            {/* Seat count */}
            <div style={{
              borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
              padding: '18px 0', marginBottom: 22,
            }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Total Capacity</div>
              <div className="display" style={{ fontSize: 28, fontWeight: 900 }}>
                {ev.seats} <span style={{ fontSize: 14, color: 'var(--sub)', fontWeight: 400 }}>seats</span>
              </div>
            </div>

            <button onClick={handleRegister} disabled={isFull} style={{
              width: '100%', padding: '13px 0', borderRadius: 12, border: 'none',
              background: isFull ? 'var(--border)' : 'var(--gold)',
              color:      isFull ? 'var(--muted)'  : '#0d0d0f',
              fontWeight: 700, fontSize: 15,
              cursor: isFull ? 'not-allowed' : 'pointer',
            }}>
              {isFull ? 'Sold Out' : user ? 'Register for this Event ✦' : 'Sign In to Register'}
            </button>

            {!user && !isFull && (
              <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
                Use your IAU school email<br />(@ogr.iau.edu.tr or @iau.edu.tr)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function GuestHeader({ setPage }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(13,13,15,.92)', backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', height: 64,
    }}>
      <button onClick={() => setPage('home')} style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, flexShrink: 0,
        }}>
          <img src={IAU_LOGO} alt="IAU" style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={e => { e.target.parentElement.textContent = '🎓' }} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <div className="display" style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 700, lineHeight: 1.2 }}>
            Istanbul Aydın University
          </div>
          <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Event Portal
          </div>
        </div>
      </button>
      <button onClick={() => setPage('login')} style={{
        padding: '9px 22px', borderRadius: 10, border: 'none',
        background: 'var(--gold)', color: '#0d0d0f',
        fontWeight: 700, fontSize: 13, cursor: 'pointer',
      }}>Sign In →</button>
    </header>
  )
}
