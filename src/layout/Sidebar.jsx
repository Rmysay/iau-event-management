import { getNavItems } from '../utils/constants.js'

export default function Sidebar({ page, setPage, open, setOpen, user, onLogout }) {
  const navItems = getNavItems(user?.role)

  return (
    <>
      {open && (
        <div onClick={() => setOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 40,
        }} />
      )}
      <aside style={{
        position: 'fixed', top: 0, left: open ? 0 : '-260px',
        width: 240, height: '100vh',
        background: 'var(--card)', borderRight: '1px solid var(--border)',
        zIndex: 50, transition: 'left .3s ease',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '20px 24px 18px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'linear-gradient(135deg,#e8b94f,#c0392b)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>🎓</div>
            <div>
              <div className="display" style={{ fontSize: 13, color: 'var(--gold)', lineHeight: 1.2, fontWeight: 700 }}>Istanbul Aydın</div>
              <div className="display" style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.2 }}>University</div>
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 6, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Event Management System
          </div>
        </div>

        <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }}>
          {navItems.map(n => {
            const active = page === n.id
            return (
              <button key={n.id} onClick={() => { setPage(n.id); setOpen(false) }} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                width: '100%', padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
                background: active ? 'rgba(232,185,79,.12)' : 'transparent',
                border:     active ? '1px solid rgba(232,185,79,.25)' : '1px solid transparent',
                color:      active ? 'var(--gold)' : 'var(--sub)',
                marginBottom: 4, fontSize: 14, fontWeight: active ? 600 : 400, transition: 'all .15s',
              }}>
                <span style={{ fontSize: 16 }}>{n.icon}</span>
                {n.label}
              </button>
            )
          })}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          {user ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: user.role === 'admin'
                    ? 'linear-gradient(135deg,#e8b94f,#c0392b)'
                    : 'linear-gradient(135deg,#4f8ef5,#a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#fff',
                }}>{user.name.charAt(0).toUpperCase()}</div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                  <div style={{ fontSize: 10, color: 'var(--gold)', textTransform: 'capitalize', letterSpacing: '.5px' }}>{user.role}</div>
                </div>
              </div>
              <button onClick={onLogout} style={{
                width: '100%', padding: '8px 0', borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'transparent', color: 'var(--muted)', fontSize: 13, cursor: 'pointer',
              }}>Sign Out</button>
            </div>
          ) : (
            <div style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
              Sign in with your<br/>IAU school email
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
