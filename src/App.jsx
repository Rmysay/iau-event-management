import { useState } from 'react'
import Sidebar           from './layout/Sidebar.jsx'
import TopBar            from './layout/TopBar.jsx'
import HomePage          from './pages/HomePage.jsx'
import DashboardPage     from './pages/DashboardPage.jsx'
import EventsPage        from './pages/EventsPage.jsx'
import EventDetailPage   from './pages/EventDetailPage.jsx'
import RegisterFormPage  from './pages/RegisterFormPage.jsx'
import RegistrationsPage from './pages/RegistrationsPage.jsx'
import LoginPage         from './pages/LoginPage.jsx'
import CreateEventPage   from './pages/CreateEventPage.jsx'
import { EVENTS }        from './services/eventService.js'
import { REGISTRATIONS } from './services/registrationService.js'

const MEMBER_PAGES = {
  home:            HomePage,
  dashboard:       DashboardPage,
  events:          EventsPage,
  'event-detail':  EventDetailPage,
  register:        RegisterFormPage,
  registrations:   RegistrationsPage,
  login:           LoginPage,
  'create-event':  CreateEventPage,
}

const GUEST_PAGES = {
  home:           HomePage,
  'event-detail': EventDetailPage,
  login:          LoginPage,
}

const ADMIN_ONLY = ['dashboard', 'create-event']

export default function App() {
  const [page, setPage]                   = useState('home')
  const [sideOpen, setSideOpen]           = useState(true)
  const [user, setUser]                   = useState(null)
  const [events, setEvents]               = useState(EVENTS)
  const [registrations, setRegistrations] = useState(REGISTRATIONS)
  const [selectedEvent, setSelectedEvent] = useState('')
  const [viewEventId, setViewEventId]     = useState(null)

  const handleLogin = (newUser) => {
    setUser(newUser)
    if (newUser.role === 'student') {
      const alreadyHas = registrations.some(r => r.email === newUser.email)
      if (!alreadyHas) {
        setRegistrations(prev => [
          ...prev,
          { id: prev.length + 1, name: newUser.name, email: newUser.email, event: 'IAU Tech Summit 2026',      date: 'May 2, 2026',  status: 'Confirmed' },
          { id: prev.length + 2, name: newUser.name, email: newUser.email, event: 'Entrepreneurship Workshop', date: 'May 8, 2026',  status: 'Confirmed' },
          { id: prev.length + 3, name: newUser.name, email: newUser.email, event: 'AI & Data Science Seminar', date: 'May 20, 2026', status: 'Pending'   },
        ])
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    setPage('home')
  }

  const pageProps = {
    setPage, user, setUser: handleLogin,
    events, setEvents,
    registrations, setRegistrations,
    selectedEvent, setSelectedEvent,
    viewEventId, setViewEventId,
  }

  // ── Guest layout: full-width, no sidebar or topbar ──────────────────────
  if (!user) {
    const GuestPage = GUEST_PAGES[page] || HomePage
    return <GuestPage {...pageProps} />
  }

  // ── Logged-in layout: sidebar + topbar ──────────────────────────────────
  const resolvedPage = ADMIN_ONLY.includes(page) && user.role !== 'admin' ? 'home' : page
  const Page = MEMBER_PAGES[resolvedPage] || HomePage

  return (
    <>
      <Sidebar
        page={resolvedPage} setPage={setPage}
        open={sideOpen} setOpen={setSideOpen}
        user={user} onLogout={handleLogout}
      />
      <div style={{ marginLeft: sideOpen ? 240 : 0, transition: 'margin-left .3s ease', minHeight: '100vh' }}>
        <TopBar page={resolvedPage} open={sideOpen} setOpen={setSideOpen} user={user} />
        <main>
          <Page {...pageProps} />
        </main>
      </div>
    </>
  )
}
