import { useState, useEffect } from 'react'
import { getEvents } from '../services/eventService.js'

export function useEvents() {
  const [events, setEvents]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents().then(data => { setEvents(data); setLoading(false) })
  }, [])

  return { events, loading }
}
