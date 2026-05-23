import { useState } from 'react'
import EventCard from '../components/EventCard.jsx'
import { CAT_COLORS } from '../utils/constants.js'

const IAU_LOGO = 'https://logowik.com/content/uploads/images/istanbul-aydin-university6728.logowik.com.webp'

// ── Guest full-page landing ───────────────────────────────────────────────
function GuestHomePage({ setPage, events, setViewEventId }) {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')

  const cats     = ['All', ...Array.from(new Set(events.map(e => e.category)))]
  const filtered = events.filter(e =>
    (cat === 'All' || e.category === cat) &&
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  const goToDetail = (ev) => { setViewEventId(ev.id); setPage('event-detail') }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', flexDirection: 'column' }}>

      {/* ── Sticky header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(13,13,15,.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 64,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 8, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4,
            flexShrink: 0,
          }}>
            <img src={IAU_LOGO} alt="IAU" style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={e => { e.target.parentElement.textContent = '🎓' }} />
          </div>
          <div>
            <div className="display" style={{ fontSize: 15, color: 'var(--gold)', fontWeight: 700, lineHeight: 1.2 }}>
              Istanbul Aydın University
            </div>
            <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Event Portal
            </div>
          </div>
        </div>
        <button onClick={() => setPage('login')} style={{
          padding: '9px 22px', borderRadius: 10, border: 'none',
          background: 'var(--gold)', color: '#0d0d0f',
          fontWeight: 700, fontSize: 13, cursor: 'pointer',
        }}>Sign In →</button>
      </header>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(160deg, #0f0f12 0%, #1a1808 50%, #0f0f12 100%)',
        padding: '80px 24px 90px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Large background logo watermark */}
        <img
          src={IAU_LOGO}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-4%', top: '50%',
            transform: 'translateY(-50%)',
            width: 520, height: 520,
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: 0.04,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
        {/* Second watermark on left, smaller */}
        <img
          src={IAU_LOGO}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-5%', bottom: '-10%',
            width: 320, height: 320,
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: 0.03,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        {/* Gold radial glow */}
        <div style={{
          position: 'absolute', left: '50%', top: '40%',
          transform: 'translate(-50%, -50%)',
          width: 800, height: 400,
          background: 'radial-gradient(ellipse, rgba(232,185,79,.1) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* IAU logo badge */}
          <div style={{
            width: 100, height: 100, borderRadius: 24,
            background: '#fff',
            margin: '0 auto 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 10,
            boxShadow: '0 0 0 1px rgba(232,185,79,.3), 0 12px 48px rgba(0,0,0,.5)',
          }}>
            <img src={IAU_LOGO} alt="Istanbul Aydın University"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={e => { e.target.parentElement.innerHTML = '<span style="font-size:52px">🎓</span>' }} />
          </div>

          {/* Pill badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(232,185,79,.12)', border: '1px solid rgba(232,185,79,.25)',
            color: 'var(--gold)', borderRadius: 999,
            padding: '5px 16px', fontSize: 12, fontWeight: 600,
            letterSpacing: '1px', textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
            Academic Year 2025 / 2026
          </div>

          <h1 className="display" style={{
            fontSize: 'clamp(30px, 5vw, 58px)',
            color: '#fff', marginBottom: 16, lineHeight: 1.1,
            letterSpacing: '-0.5px',
          }}>
            Istanbul Aydın<br />
            <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>University Events</em>
          </h1>

          <p style={{
            color: 'var(--sub)', fontSize: 16, lineHeight: 1.7,
            maxWidth: 480, margin: '0 auto 36px',
          }}>
            Discover academic conferences, cultural festivals, workshops, and more.
            Sign in with your school email to register for any event.
          </p>

          <button onClick={() => setPage('login')} style={{
            padding: '14px 36px', borderRadius: 12, border: 'none',
            background: 'var(--gold)', color: '#0d0d0f',
            fontWeight: 700, fontSize: 15, cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(232,185,79,.35)',
          }}>
            Sign In to Register →
          </button>
        </div>
      </div>

      {/* ── Events section ── */}
      <div style={{ flex: 1, maxWidth: 1160, margin: '0 auto', width: '100%', padding: '44px 24px 64px' }}>

        {/* Search bar — top of events */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <span style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            fontSize: 16, color: 'var(--muted)', pointerEvents: 'none',
          }}>🔍</span>
          <input
            placeholder="Search events by name or keyword…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '13px 18px 13px 46px', boxSizing: 'border-box',
              borderRadius: 12, fontSize: 14,
              background: 'var(--card)', border: '1px solid var(--border)',
              color: 'var(--text)', outline: 'none',
            }}
          />
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
          {cats.map(c => {
            const color = CAT_COLORS[c]
            return (
              <button key={c} onClick={() => setCat(c)} style={{
                padding: '7px 18px', borderRadius: 999, fontSize: 13, cursor: 'pointer',
                background: cat === c ? (color || 'var(--gold)') : 'var(--card)',
                color:      cat === c ? '#fff' : 'var(--sub)',
                border:     cat === c ? 'none' : '1px solid var(--border)',
                fontWeight: cat === c ? 700 : 400,
                transition: 'all .15s',
              }}>{c}</button>
            )
          })}
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--muted)', alignSelf: 'center' }}>
            {filtered.length === events.length
              ? `${events.length} events`
              : `${filtered.length} of ${events.length}`}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 24 }}>
            {filtered.map(ev => (
              <EventCard key={ev.id} ev={ev}
                onViewDetail={() => goToDetail(ev)}
                onRegister={() => setPage('login')}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 14 }}>🔍</div>
            <div style={{ fontSize: 16, marginBottom: 8 }}>No events found</div>
            <div style={{ fontSize: 13 }}>Try a different search term or category.</div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid var(--border)', padding: '22px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12,
      }}>
        <span style={{ color: 'var(--muted)', fontSize: 12 }}>
          © 2026 Istanbul Aydın University — Event Management System
        </span>
        <button onClick={() => setPage('login')} style={{
          background: 'none', border: '1px solid var(--border)',
          color: 'var(--sub)', cursor: 'pointer', fontSize: 12,
          padding: '6px 14px', borderRadius: 8,
        }}>Student / Staff Login →</button>
      </footer>
    </div>
  )
}

// ── Logged-in home (inside sidebar layout) ───────────────────────────────
function MemberHomePage({ setPage, user, events, setSelectedEvent, setViewEventId }) {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')

  const cats     = ['All', ...Array.from(new Set(events.map(e => e.category)))]
  const filtered = events.filter(e =>
    (cat === 'All' || e.category === cat) &&
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  const goToDetail = (ev) => { setViewEventId(ev.id); setPage('event-detail') }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 60px' }}>

      {/* Welcome hero strip */}
      <div style={{
        background: 'linear-gradient(120deg, #0f0f12 0%, #1a1808 100%)',
        border: '1px solid var(--border)', borderRadius: 18,
        padding: '36px 40px', marginBottom: 32,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background logo watermark */}
        <img src={IAU_LOGO} alt="" aria-hidden="true" style={{
          position: 'absolute', right: -30, top: '50%',
          transform: 'translateY(-50%)',
          width: 220, height: 220,
          objectFit: 'contain',
          filter: 'brightness(0) invert(1)',
          opacity: 0.05,
          pointerEvents: 'none',
        }} />
        {/* Gold glow */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%',
          background: 'radial-gradient(ellipse at right center, rgba(232,185,79,.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 5, flexShrink: 0,
            boxShadow: '0 4px 20px rgba(0,0,0,.3)',
          }}>
            <img src={IAU_LOGO} alt="IAU"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={e => { e.target.parentElement.textContent = '🎓' }} />
          </div>
          <div>
            <div className="display" style={{ fontSize: 22, color: 'var(--gold)', fontWeight: 700 }}>
              Istanbul Aydın University
            </div>
            <div style={{ color: 'var(--sub)', fontSize: 13, marginTop: 3 }}>
              Welcome back, <strong style={{ color: 'var(--text)' }}>{user.name}</strong>
              <span style={{
                marginLeft: 10, fontSize: 11, padding: '2px 8px', borderRadius: 999,
                background: user.role === 'admin' ? 'rgba(232,185,79,.15)' : 'rgba(79,142,245,.15)',
                color: user.role === 'admin' ? 'var(--gold)' : '#4f8ef5',
                textTransform: 'capitalize', fontWeight: 600,
              }}>{user.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <span style={{
          position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
          fontSize: 16, color: 'var(--muted)', pointerEvents: 'none',
        }}>🔍</span>
        <input
          placeholder="Search campus events…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '13px 18px 13px 46px', boxSizing: 'border-box',
            borderRadius: 12, fontSize: 14,
            background: 'var(--card)', border: '1px solid var(--border)',
            color: 'var(--text)', outline: 'none',
          }}
        />
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: '7px 16px', borderRadius: 999, fontSize: 13, cursor: 'pointer',
            background: cat === c ? 'var(--gold)' : 'var(--card)',
            color:      cat === c ? '#0d0d0f'     : 'var(--sub)',
            border:     cat === c ? 'none'        : '1px solid var(--border)',
            fontWeight: cat === c ? 700 : 400, transition: 'all .15s',
          }}>{c}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--muted)', alignSelf: 'center' }}>
          {filtered.length} event{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

      {/* Events grid */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
          {filtered.map(ev => (
            <EventCard key={ev.id} ev={ev}
              onViewDetail={() => goToDetail(ev)}
              onRegister={() => { setSelectedEvent(ev.title); setPage('register') }}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 15, marginBottom: 6 }}>No events found</div>
          <div style={{ fontSize: 13 }}>Try a different search or category filter.</div>
        </div>
      )}
    </div>
  )
}

// ── Root export ───────────────────────────────────────────────────────────
export default function HomePage(props) {
  return props.user
    ? <MemberHomePage {...props} />
    : <GuestHomePage  {...props} />
}
