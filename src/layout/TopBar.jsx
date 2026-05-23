import { getNavItems } from '../utils/constants.js'

export default function TopBar({ page, open, setOpen, user }) {
  const allItems = [
    ...getNavItems('admin'),
    ...getNavItems('student'),
    ...getNavItems(null),
  ]
  const label = allItems.find(n => n.id === page)?.label || ''

  return (
    <header style={{
      height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', borderBottom: '1px solid var(--border)',
      background: 'var(--ink)', position: 'sticky', top: 0, zIndex: 30,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={() => setOpen(o => !o)} style={{
          background: 'none', border: 'none', color: 'var(--text)', fontSize: 20, cursor: 'pointer',
        }}>☰</button>
        <span style={{ color: 'var(--sub)', fontSize: 13 }}>
          IAU Events / <span style={{ color: 'var(--text)' }}>{label}</span>
        </span>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '1px' }}>MAY 2026</span>
        {user ? (
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: user.role === 'admin'
              ? 'linear-gradient(135deg,#e8b94f,#c0392b)'
              : 'linear-gradient(135deg,#4f8ef5,#a855f7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: '#fff',
            title: user.name,
          }}>{user.name.charAt(0).toUpperCase()}</div>
        ) : (
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--card)', border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15,
          }}>👤</div>
        )}
      </div>
    </header>
  )
}
