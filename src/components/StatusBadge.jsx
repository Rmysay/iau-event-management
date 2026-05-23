export default function StatusBadge({ s }) {
  const c = s === 'Confirmed' ? '#22c55e'
          : s === 'Pending'   ? '#e8b94f'
          : s === 'Cancelled' ? '#d94f4f'
          : '#4f8ef5'
  return (
    <span className="badge" style={{ background: c + '22', color: c }}>{s}</span>
  )
}
