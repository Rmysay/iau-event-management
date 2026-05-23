const inp = {
  background: 'var(--card)', border: '1px solid var(--border)',
  color: 'var(--text)', borderRadius: 10, padding: '11px 14px',
  width: '100%', fontSize: 14,
}

export function Label({ t }) {
  return (
    <label style={{
      fontSize: 12, color: 'var(--muted)', letterSpacing: '.5px',
      textTransform: 'uppercase', display: 'block', marginBottom: 6,
    }}>{t}</label>
  )
}

export function Input({ label, ...props }) {
  return (
    <div>
      {label && <Label t={label} />}
      <input style={inp} {...props} />
    </div>
  )
}

export function Select({ label, options, ...props }) {
  return (
    <div>
      {label && <Label t={label} />}
      <select style={inp} {...props}>
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </div>
  )
}

export function Textarea({ label, ...props }) {
  return (
    <div>
      {label && <Label t={label} />}
      <textarea style={{ ...inp, minHeight: 90, resize: 'vertical' }} {...props} />
    </div>
  )
}
