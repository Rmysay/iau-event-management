export const CAT_COLORS = {
  Conference: '#4f8ef5',
  Workshop:   '#a855f7',
  Cultural:   '#ec4899',
  Sports:     '#22c55e',
  Science:    '#e8b94f',
  Social:     '#f97316',
}

export const getNavItems = (role) => {
  if (role === 'admin') return [
    { id: 'home',          icon: '◈', label: 'Home' },
    { id: 'dashboard',     icon: '▦', label: 'Dashboard' },
    { id: 'create-event',  icon: '✦', label: 'Create Event' },
    { id: 'registrations', icon: '≡', label: 'Registrations' },
  ]
  if (role === 'student') return [
    { id: 'home',          icon: '◈', label: 'Home' },
    { id: 'registrations', icon: '≡', label: 'My Registrations' },
  ]
  return [
    { id: 'home',   icon: '◈', label: 'Home' },
    { id: 'events', icon: '◉', label: 'Events' },
    { id: 'login',  icon: '→', label: 'Login / Register' },
  ]
}
