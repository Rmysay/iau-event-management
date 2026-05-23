import { useState } from 'react'
import { Input } from '../components/FormField.jsx'

const IAU_LOGO = 'https://logowik.com/content/uploads/images/istanbul-aydin-university6728.logowik.com.webp'

export default function LoginPage({ setPage, setUser }) {
  const [mode, setMode]   = useState('login')
  const [form, setForm]   = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    setError('')
    const email = form.email.trim().toLowerCase()

    if (!email.endsWith('@ogr.iau.edu.tr')) {
      setError('Please use your IAU school email (@ogr.iau.edu.tr)')
      return
    }
    if (!form.password) {
      setError('Password is required.')
      return
    }
    if (mode === 'signup') {
      if (!form.name.trim()) { setError('Full name is required.'); return }
      if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    }

    const username = email.split('@')[0]
    const role = username.startsWith('admin') ? 'admin' : 'student'
    const name = mode === 'signup'
      ? form.name.trim()
      : username.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

    setUser({ name, email, role })
    setPage(role === 'admin' ? 'dashboard' : 'home')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)' }}>
      {/* Guest header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(13,13,15,.92)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', padding: '0 40px', height: 64,
      }}>
        <button onClick={() => setPage('home')} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4,
          }}>
            <img src={IAU_LOGO} alt="IAU" style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={e => { e.target.parentElement.textContent = '🎓' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div className="display" style={{ fontSize: 14, color: 'var(--gold)', fontWeight: 700, lineHeight: 1.2 }}>Istanbul Aydın University</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Event Portal</div>
          </div>
        </button>
      </header>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>🎓</div>
          <div className="display" style={{ fontSize: 22, color: 'var(--text)', marginBottom: 4 }}>Istanbul Aydın University</div>
          <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Event Management System</div>
          <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 10 }}>
            {mode === 'login' ? 'Sign in with your school email' : 'Register with your school email'}
          </div>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20, padding: '36px 32px' }}>
          <div style={{ display: 'flex', background: 'var(--ink)', borderRadius: 10, padding: 4, marginBottom: 28 }}>
            {['login', 'signup'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError('') }} style={{
                flex: 1, padding: 9, borderRadius: 8, border: 'none', cursor: 'pointer',
                background: mode === m ? 'var(--gold)' : 'transparent',
                color:      mode === m ? '#0d0d0f'     : 'var(--sub)',
                fontWeight: mode === m ? 700 : 400, fontSize: 13,
              }}>{m === 'login' ? 'Sign In' : 'Sign Up'}</button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {mode === 'signup' && (
              <Input label="Full Name" value={form.name} onChange={e => upd('name', e.target.value)} placeholder="Your full name" />
            )}
            <Input label="School Email" type="email" value={form.email} onChange={e => upd('email', e.target.value)} placeholder="you@ogr.iau.edu.tr" />
            <Input label="Password" type="password" value={form.password} onChange={e => upd('password', e.target.value)} placeholder="••••••••" />
            {mode === 'signup' && (
              <Input label="Confirm Password" type="password" value={form.confirm} onChange={e => upd('confirm', e.target.value)} placeholder="••••••••" />
            )}
          </div>

          {error && (
            <div style={{
              marginTop: 14, padding: '10px 14px', borderRadius: 8,
              background: 'rgba(217,79,79,.12)', border: '1px solid rgba(217,79,79,.3)',
              color: '#d94f4f', fontSize: 13,
            }}>{error}</div>
          )}

          <button onClick={handleSubmit} style={{
            marginTop: 24, width: '100%', padding: 14, borderRadius: 12, border: 'none',
            background: 'var(--gold)', color: '#0d0d0f', fontWeight: 700, fontSize: 15, cursor: 'pointer',
          }}>{mode === 'login' ? 'Sign In →' : 'Create Account →'}</button>

          <div style={{ marginTop: 20, padding: 14, background: 'rgba(255,255,255,.03)', borderRadius: 10, border: '1px solid var(--border)' }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '1px' }}>Accepted Email Format</div>
            <div style={{ fontSize: 12, color: 'var(--sub)', lineHeight: 1.8 }}>
              <span style={{ color: 'var(--text)' }}>you@ogr.iau.edu.tr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
